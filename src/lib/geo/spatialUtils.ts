import { VENEZUELA_STATES_DATA, StateGeoData } from './venezuelaData';
import { VENEZUELA_GEOJSON } from './venezuelaGeoJson';

export interface ParcelGeometry {
  name: string;
  coordinates: [number, number][]; // [lat, lng] array
  areaHectares: number;
  perimeterMeters: number;
  centroid: [number, number];
  detectedState: StateGeoData | null;
}

export interface CropSuitabilityResult {
  cropName: string;
  scientificName: string;
  suitabilityScore: number; // 0 - 100
  suitabilityLevel: 'Excelente' | 'Alta' | 'Moderada' | 'Baja' | 'No Recomendado';
  limitingFactor: string | null;
  estimatedYieldKgHa: number;
  isAgroforestry?: boolean;
  orinocoCompliant?: boolean;
}

export interface SoilAmendmentRecommendation {
  needsLiming: boolean;
  limeTonsPerHa: number;
  totalLimeTons: number;
  limeType: string;
  organicMatterNeededTonsHa: number;
  fertilizerPlan: {
    nitrogenKgHa: number;
    phosphorusKgHa: number;
    potassiumKgHa: number;
    commercialFormula: string;
  };
  anthropicDepletionAdjustmentNotes?: string;
  technicalNotes: string[];
}

/**
 * Algoritmo de Ray-Casting para determinar si un punto [lat, lng] está dentro de un polígono GeoJSON [lng, lat]
 */
export function isPointInPolygon(point: [number, number], polygon: number[][]): boolean {
  const [lat, lng] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]; // [lng, lat]
    const [xj, yj] = polygon[j]; // [lng, lat]

    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

type CoordinateInput = [number, number] | { lat: number; lng: number };

function normalizeCoords(coords: CoordinateInput[]): [number, number][] {
  return coords.map(c => {
    if (Array.isArray(c)) return c;
    return [c.lat, c.lng];
  });
}

/**
 * Calcula el área esférica de un polígono en hectáreas usando la fórmula esferoidal de Shoelace
 */
export function calculatePolygonAreaHa(inputCoords: CoordinateInput[]): number {
  const coords = normalizeCoords(inputCoords);
  if (coords.length < 3) return 0;

  const EARTH_RADIUS = 6378137; // metros
  let totalArea = 0;

  const radCoords = coords.map(([lat, lng]) => [
    (lat * Math.PI) / 180,
    (lng * Math.PI) / 180,
  ]);

  for (let i = 0; i < radCoords.length; i++) {
    const j = (i + 1) % radCoords.length;
    const [lat1, lng1] = radCoords[i];
    const [lat2, lng2] = radCoords[j];

    totalArea += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }

  totalArea = Math.abs((totalArea * EARTH_RADIUS * EARTH_RADIUS) / 2.0);
  const hectares = totalArea / 10000;
  return Math.round(hectares * 100) / 100;
}

/**
 * Calcula el perímetro de un polígono en metros usando la fórmula de Haversine
 */
export function calculatePolygonPerimeterMeters(inputCoords: CoordinateInput[]): number {
  const coords = normalizeCoords(inputCoords);
  if (coords.length < 2) return 0;

  const EARTH_RADIUS = 6378137;
  let totalPerimeter = 0;

  for (let i = 0; i < coords.length; i++) {
    const j = (i + 1) % coords.length;
    const [lat1, lng1] = coords[i];
    const [lat2, lng2] = coords[j];

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalPerimeter += EARTH_RADIUS * c;
  }

  return Math.round(totalPerimeter * 10) / 10;
}

export function calculatePolygonPerimeterKm(coords: CoordinateInput[]): number {
  const meters = calculatePolygonPerimeterMeters(coords);
  return Math.round((meters / 1000) * 100) / 100;
}


/**
 * Calcula el centroide geométrico de un conjunto de coordenadas
 */
export function calculateCentroid(coords: [number, number][]): [number, number] {
  if (coords.length === 0) return [7.85, -66.5];
  const sumLat = coords.reduce((acc, c) => acc + c[0], 0);
  const sumLng = coords.reduce((acc, c) => acc + c[1], 0);
  return [sumLat / coords.length, sumLng / coords.length];
}

/**
 * Detecta en qué estado de Venezuela cae un punto (usando Ray-Casting sobre GeoJSON con fallback a proximidad)
 */
export function detectStateFromCoords(lat: number, lng: number): StateGeoData {
  // 1. Verificar intersección poligonal exacta (Point in Polygon)
  for (const feature of VENEZUELA_GEOJSON.features) {
    const ring = feature.geometry.coordinates[0];
    if (isPointInPolygon([lat, lng], ring)) {
      const matched = VENEZUELA_STATES_DATA.find(s => s.id === feature.properties.id);
      if (matched) return matched;
    }
  }

  // 2. Fallback de proximidad geodésica si el punto cae en fronteras
  let closestState = VENEZUELA_STATES_DATA[0];
  let minDistance = Infinity;

  for (const state of VENEZUELA_STATES_DATA) {
    const [sLat, sLng] = state.center;
    const dist = Math.hypot(lat - sLat, lng - sLng);
    if (dist < minDistance) {
      minDistance = dist;
      closestState = state;
    }
  }

  return closestState;
}

/**
 * Algoritmo Multicriterio Edafo-Agrícola para calcular Idoneidad de Cultivos con Inteligencia Territorial
 */
export function evaluateCropSuitability(
  ph: number,
  organicMatter: number,
  soilTexture: string,
  annualRainfall: number,
  options?: {
    lat?: number;
    lng?: number;
    anthropicYears?: number;
    isSouthOfOrinoco?: boolean;
    waterPersistence?: number;
  }
): CropSuitabilityResult[] {
  const CROPS_DATABASE = [
    {
      name: 'Maíz Blanco Harinero',
      scientificName: 'Zea mays',
      optimalPh: [6.0, 7.2],
      minPh: 5.5,
      maxPh: 7.8,
      optimalRain: [800, 1400],
      preferredTexture: ['Franco-limoso', 'Franco', 'Franco-arcilloso'],
      baseYield: 5500,
      isAgroforestry: false,
      blockedSouthOrinoco: true,
    },
    {
      name: 'Arroz de Riego / Secano',
      scientificName: 'Oryza sativa',
      optimalPh: [5.5, 7.0],
      minPh: 5.0,
      maxPh: 7.5,
      optimalRain: [1200, 2000],
      preferredTexture: ['Arcilloso', 'Franco-arcilloso', 'Vertisols'],
      baseYield: 6200,
      isAgroforestry: false,
      blockedSouthOrinoco: true,
    },
    {
      name: 'Plátano / Banano',
      scientificName: 'Musa paradisiaca',
      optimalPh: [5.5, 6.8],
      minPh: 5.0,
      maxPh: 7.5,
      optimalRain: [1400, 2200],
      preferredTexture: ['Franco-arcilloso', 'Franco', 'Franco Aluvial'],
      baseYield: 18000,
      isAgroforestry: false,
      blockedSouthOrinoco: false,
    },
    {
      name: 'Cacao Criollo Fino de Aroma (SAF Bajo Dosel)',
      scientificName: 'Theobroma cacao',
      optimalPh: [5.5, 7.0],
      minPh: 5.0,
      maxPh: 7.5,
      optimalRain: [1400, 2600],
      preferredTexture: ['Franco Aluvial', 'Franco-arcilloso', 'Franco'],
      baseYield: 950,
      isAgroforestry: true,
      blockedSouthOrinoco: false,
    },
    {
      name: 'Açaí / Manaca Amazónica',
      scientificName: 'Euterpe oleracea',
      optimalPh: [4.5, 6.5],
      minPh: 4.0,
      maxPh: 7.0,
      optimalRain: [1800, 3200],
      preferredTexture: ['Franco', 'Arcilloso', 'Hidromórfico'],
      baseYield: 4500,
      isAgroforestry: true,
      blockedSouthOrinoco: false,
    },
    {
      name: 'Copoazú / Cacao Blanco',
      scientificName: 'Theobroma grandiflorum',
      optimalPh: [4.8, 6.5],
      minPh: 4.2,
      maxPh: 7.0,
      optimalRain: [1600, 3000],
      preferredTexture: ['Franco', 'Franco-arcilloso'],
      baseYield: 3800,
      isAgroforestry: true,
      blockedSouthOrinoco: false,
    },
    {
      name: 'Café Arábica Especialidad',
      scientificName: 'Coffea arabica',
      optimalPh: [5.0, 6.2],
      minPh: 4.8,
      maxPh: 6.8,
      optimalRain: [1400, 2200],
      preferredTexture: ['Franco', 'Franco con alta materia orgánica', 'Franco-arenoso'],
      baseYield: 1400,
      isAgroforestry: true,
      blockedSouthOrinoco: false,
    },
    {
      name: 'Caña de Azúcar',
      scientificName: 'Saccharum officinarum',
      optimalPh: [6.0, 7.5],
      minPh: 5.5,
      maxPh: 8.0,
      optimalRain: [1200, 2000],
      preferredTexture: ['Franco-limoso', 'Franco', 'Franco-arcilloso'],
      baseYield: 85000,
      isAgroforestry: false,
      blockedSouthOrinoco: true,
    },
    {
      name: 'Soya / Oleaginosas',
      scientificName: 'Glycine max',
      optimalPh: [6.0, 7.0],
      minPh: 5.6,
      maxPh: 7.4,
      optimalRain: [900, 1500],
      preferredTexture: ['Franco-limoso', 'Franco', 'Arenoso a franco-arenoso'],
      baseYield: 2800,
      isAgroforestry: false,
      blockedSouthOrinoco: true,
    },
    {
      name: 'Sorgo Forrajero / Granífero',
      scientificName: 'Sorghum bicolor',
      optimalPh: [5.5, 8.5],
      minPh: 5.0,
      maxPh: 8.8,
      optimalRain: [450, 950],
      preferredTexture: ['Franco-arenoso', 'Franco', 'Vertisols'],
      baseYield: 4200,
      isAgroforestry: false,
      blockedSouthOrinoco: false,
    },
    {
      name: 'Pasturas Tropicales (Brachiaria / Guinea)',
      scientificName: 'Urochloa brizantha',
      optimalPh: [4.8, 7.0],
      minPh: 4.2,
      maxPh: 8.0,
      optimalRain: [800, 2500],
      preferredTexture: ['Franco-arenoso', 'Arcilloso', 'Arenoso', 'Franco'],
      baseYield: 25000,
      isAgroforestry: false,
      blockedSouthOrinoco: false,
    }
  ];

  const isSouth = options?.isSouthOfOrinoco ?? false;

  return CROPS_DATABASE.map(crop => {
    let score = 100;
    let limitingFactor: string | null = null;

    // Bloqueo estricto del Escudo del Orinoco para monocultivos de deforestación
    if (isSouth && crop.blockedSouthOrinoco) {
      return {
        cropName: crop.name,
        scientificName: crop.scientificName,
        suitabilityScore: 15,
        suitabilityLevel: 'No Recomendado' as const,
        limitingFactor: '🛡️ Bloqueado por Escudo de Conservación Orinoco (Priorizar Sistemas Agroforestales SAF)',
        estimatedYieldKgHa: 0,
        isAgroforestry: crop.isAgroforestry,
        orinocoCompliant: false,
      };
    }

    // 1. Evaluación de pH (40% de ponderación)
    if (ph < crop.optimalPh[0] || ph > crop.optimalPh[1]) {
      const phDiff = ph < crop.optimalPh[0] ? crop.optimalPh[0] - ph : ph - crop.optimalPh[1];
      score -= Math.min(phDiff * 30, 45);
      limitingFactor = ph < crop.optimalPh[0] ? 'Suelo excesivamente ácido para este cultivo' : 'pH alcalino / calcáreo';
    }

    // 2. Evaluación de Materia Orgánica (25% de ponderación)
    if (organicMatter < 2.0) {
      score -= 15;
      if (!limitingFactor) limitingFactor = 'Bajo contenido de materia orgánica (< 2.0%)';
    } else if (organicMatter > 3.5) {
      score += 5;
    }

    // 3. Evaluación de Pluviometría (20% de ponderación)
    if (annualRainfall < crop.optimalRain[0] * 0.75) {
      score -= 20;
      if (!limitingFactor) limitingFactor = 'Déficit hídrico (requiere sistema de riego suplementario)';
    } else if (annualRainfall > crop.optimalRain[1] * 1.3) {
      score -= 15;
      if (!limitingFactor) limitingFactor = 'Exceso hídrico (riesgo de asfixia radicular/hongos)';
    }

    // 4. MapBiomas Agua: Persistencia hídrica
    if (options?.waterPersistence !== undefined && options.waterPersistence < 45 && crop.optimalRain[0] > 1200) {
      score -= 15;
      if (!limitingFactor) limitingFactor = 'Microcuenca con baja persistencia de agua superficial (MapBiomas Agua)';
    }

    // 5. Textura (15% de ponderación)
    const textureMatch = crop.preferredTexture.some(t => 
      soilTexture.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(soilTexture.toLowerCase())
    );
    if (!textureMatch) {
      score -= 10;
    }

    // 6. Bonus para Sistemas Agroforestales en zonas con alta trayectoria o al sur del Orinoco
    if (crop.isAgroforestry && (isSouth || (options?.anthropicYears && options.anthropicYears > 20))) {
      score += 8;
    }

    const finalScore = Math.max(10, Math.min(99, Math.round(score)));

    let suitabilityLevel: CropSuitabilityResult['suitabilityLevel'] = 'Moderada';
    if (finalScore >= 90) suitabilityLevel = 'Excelente';
    else if (finalScore >= 75) suitabilityLevel = 'Alta';
    else if (finalScore >= 55) suitabilityLevel = 'Moderada';
    else if (finalScore >= 40) suitabilityLevel = 'Baja';
    else suitabilityLevel = 'No Recomendado';

    const yieldModifier = finalScore / 100;
    const estimatedYieldKgHa = Math.round(crop.baseYield * yieldModifier);

    return {
      cropName: crop.name,
      scientificName: crop.scientificName,
      suitabilityScore: finalScore,
      suitabilityLevel,
      limitingFactor: finalScore >= 85 ? null : limitingFactor,
      estimatedYieldKgHa,
      isAgroforestry: crop.isAgroforestry,
      orinocoCompliant: isSouth ? crop.isAgroforestry : true,
    };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

/**
 * Calculadora de Prescripción y Enmiendas Edafológicas con Memoria Territorial
 */
export function calculateSoilAmendments(
  ph: number,
  organicMatter: number,
  areaHectares: number,
  targetCropName: string = 'Maíz',
  anthropicYears: number = 0
): SoilAmendmentRecommendation {
  const needsLiming = ph < 5.8;
  let limeTonsPerHa = 0;
  let limeType = 'No requerida';

  if (needsLiming) {
    const deltaPh = 6.2 - ph;
    limeTonsPerHa = Math.round((deltaPh * 1.8) * 10) / 10;
    limeType = ph < 5.0 ? 'Cal Dolomítica (CaCO3 + MgCO3 al 85% PRNT)' : 'Carbonato de Calcio Agrícola';
  }

  const totalLimeTons = Math.round(limeTonsPerHa * areaHectares * 10) / 10;

  // Enmienda de Materia Orgánica ajustada por trayectoria histórica
  let organicMatterNeededTonsHa = 0;
  let anthropicNotes = '';

  if (organicMatter < 2.5) {
    organicMatterNeededTonsHa = Math.round((3.0 - organicMatter) * 2.5 * 10) / 10;
  }

  if (anthropicYears >= 20) {
    organicMatterNeededTonsHa += 3.0; // Compensación por 20+ años de uso intensivo
    anthropicNotes = `⚠️ Trayectoria MapBiomas: ${anthropicYears} años bajo uso antrópico continuo detectados. Se añade un suplemento de +3.0 Ton/ha de materia orgánica para restaurar la fracción húmica y el carbono del suelo.`;
  } else if (anthropicYears >= 10) {
    organicMatterNeededTonsHa += 1.5;
    anthropicNotes = `ℹ️ Trayectoria MapBiomas: ${anthropicYears} años de uso continuo. Se sugiere plan de abono verde y siembra directa.`;
  }

  // Plan de Fertilización Base Recomendado (kg/ha)
  let n = 120;
  let p = 60;
  let k = 80;
  let formula = 'NPK 12-24-12 + Urea al macollamiento';

  if (targetCropName.toLowerCase().includes('arroz')) {
    n = 140; p = 50; k = 60; formula = 'NPK 15-15-15 + Sulfato de Amonio';
  } else if (targetCropName.toLowerCase().includes('cacao') || targetCropName.toLowerCase().includes('saf')) {
    n = 80; p = 40; k = 100; formula = 'Fórmula Agroforestal Orgánica / Harina de Rocas + 10-20-20';
  } else if (targetCropName.toLowerCase().includes('plátano')) {
    n = 180; p = 50; k = 250; formula = 'Cloruro de Potasio (KCl) + Urea fraccionada';
  } else if (targetCropName.toLowerCase().includes('sorgo')) {
    n = 90; p = 40; k = 40; formula = 'NPK 15-15-15 + Sulfato de Amonio en dosis reducida';
  }

  const technicalNotes: string[] = [];
  if (needsLiming) {
    technicalNotes.push(`Aplicar ${limeTonsPerHa} Ton/ha de ${limeType} 30 a 45 días antes de la siembra con pase de rastra.`);
  }
  if (organicMatterNeededTonsHa > 0) {
    technicalNotes.push(`Incorporar ${organicMatterNeededTonsHa} Ton/ha de compost maduro o gallinaza descompuesta para recuperar la microfauna edáfica.`);
  }
  if (anthropicNotes) {
    technicalNotes.push(anthropicNotes);
  }
  technicalNotes.push(`Fraccionar el nitrógeno en 2 aplicaciones: 30% a la siembra y 70% a los 25-35 días post-emergencia.`);

  return {
    needsLiming,
    limeTonsPerHa,
    totalLimeTons,
    limeType,
    organicMatterNeededTonsHa: Math.round(organicMatterNeededTonsHa * 10) / 10,
    fertilizerPlan: {
      nitrogenKgHa: n,
      phosphorusKgHa: p,
      potassiumKgHa: k,
      commercialFormula: formula
    },
    anthropicDepletionAdjustmentNotes: anthropicNotes || undefined,
    technicalNotes
  };
}

// Re-exportar datos y constantes edafológicas
export { VENEZUELA_STATES_DATA, VENEZUELA_CROPS, VENEZUELA_SOIL_POINTS } from './venezuelaData';

// Alias de conveniencia
export const calculatePolygonAreaHectares = calculatePolygonAreaHa;
export const detectStateForPoint = detectStateFromCoords;

export function calculatePointSuitability(lat: number, lng: number, ph: number, organicMatter: number) {
  const state = detectStateFromCoords(lat, lng);
  const results = evaluateCropSuitability(ph, organicMatter, state.soilTextureDominant, state.annualRainfallMm, { lat, lng });
  const topResult = results[0] || { suitabilityScore: 75, cropName: 'Maíz Blanco' };
  const amendments = calculateSoilAmendments(ph, organicMatter, state.soilTextureDominant, topResult.cropName, 1.0);
  
  const limitingFactors: string[] = [];
  if (ph < 5.5) limitingFactors.push('Acidez del suelo (pH < 5.5)');
  if (organicMatter < 2.5) limitingFactors.push('Baja materia orgánica');

  return {
    suitabilityScore: topResult.suitabilityScore,
    recommendedCrops: results.map(r => r.cropName),
    topCrop: topResult.cropName,
    limingDoseTonHa: amendments.limeTonsPerHa,
    recommendationText: amendments.needsLiming ? `Aplicar ${amendments.limeTonsPerHa} Ton/ha de ${amendments.limeType}` : 'Suelo en rango óptimo',
    limitingFactors
  };
}

