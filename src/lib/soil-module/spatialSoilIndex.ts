/**
 * ============================================================================
 * AGROTECH VENEZUELA — MOTOR DE INDEXACIÓN ESPACIAL EDAFOLÓGICA (k-NN / IDW)
 * Módulo de Suelos de MapBiomas Venezuela
 * ============================================================================
 * 
 * Proporciona resolución espacial determinista, filtrado por Bounding Box,
 * cálculo geodésico de Haversine e interpolación ponderada por el inverso
 * de la distancia (IDW) para perfiles de suelo en Venezuela.
 */

import { 
  REGIONAL_SOIL_HYDRAULICS, 
  calculatePAW, 
  estimateMatricPotentialKPa, 
  normalizeSoilTexture,
  SoilTextureType 
} from '@/lib/agronomy/pedotransferEngine';
import { calculateRegionalLimingNeed, isPointInPolygonWGS84 } from '@/lib/geo/spatialUtils';

export interface SoilSpatialRecord {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  ph: number;
  organicMatter: number;
  texture: string;
  normalizedTexture: SoilTextureType;
  exchangeableAlMe?: number;
  nitrogenKgHa?: number;
  phosphorusPpm?: number;
  potassiumPpm?: number;
  taxonomyOrder: string;
}

/**
 * Catálogo base de perfiles edafológicos calibrados georreferenciados en polos agrícolas venezolanos.
 */
export const CALIBRATED_SOIL_RECORDS: SoilSpatialRecord[] = [
  {
    id: 'soil-pt-001',
    name: 'Turén — Llanos Occidentales (Suelo Aluvial Cerealero)',
    state: 'Portuguesa',
    latitude: 9.324,
    longitude: -69.112,
    ph: 6.2,
    organicMatter: 3.2,
    texture: 'Franco-limoso',
    normalizedTexture: 'franco',
    exchangeableAlMe: 0.1,
    nitrogenKgHa: 45,
    phosphorusPpm: 18,
    potassiumPpm: 220,
    taxonomyOrder: 'Mollisol'
  },
  {
    id: 'soil-pt-002',
    name: 'Calabozo — Sistema de Riego Río Guárico (Vertisol Arrocero)',
    state: 'Guárico',
    latitude: 8.924,
    longitude: -67.428,
    ph: 5.8,
    organicMatter: 2.4,
    texture: 'Arcilloso',
    normalizedTexture: 'arcilloso',
    exchangeableAlMe: 0.3,
    nitrogenKgHa: 35,
    phosphorusPpm: 12,
    potassiumPpm: 160,
    taxonomyOrder: 'Vertisol'
  },
  {
    id: 'soil-pt-003',
    name: 'Valle de Quíbor — Depresión Semiárida (Suelo Salino-Sódico)',
    state: 'Lara',
    latitude: 9.928,
    longitude: -69.620,
    ph: 7.8,
    organicMatter: 1.5,
    texture: 'Franco-arenoso',
    normalizedTexture: 'franco',
    exchangeableAlMe: 0.0,
    nitrogenKgHa: 20,
    phosphorusPpm: 8,
    potassiumPpm: 310,
    taxonomyOrder: 'Aridisol'
  },
  {
    id: 'soil-pt-004',
    name: 'Sur del Lago — Zona Aluvial Platanera y Cacao Criollo',
    state: 'Zulia',
    latitude: 8.980,
    longitude: -71.910,
    ph: 6.4,
    organicMatter: 4.5,
    texture: 'Franco-arcilloso',
    normalizedTexture: 'arcilloso',
    exchangeableAlMe: 0.1,
    nitrogenKgHa: 60,
    phosphorusPpm: 28,
    potassiumPpm: 240,
    taxonomyOrder: 'Fluvisol'
  },
  {
    id: 'soil-pt-005',
    name: 'Mesa de Guanipa — Sabanas Orientales Ácidas',
    state: 'Anzoátegui',
    latitude: 8.885,
    longitude: -64.165,
    ph: 4.8,
    organicMatter: 1.2,
    texture: 'Arenoso',
    normalizedTexture: 'arenoso',
    exchangeableAlMe: 1.6,
    nitrogenKgHa: 15,
    phosphorusPpm: 5,
    potassiumPpm: 80,
    taxonomyOrder: 'Oxisol'
  },
  {
    id: 'soil-pt-006',
    name: 'Monagas Sur — Sabana de San Simón / Maturín',
    state: 'Monagas',
    latitude: 9.745,
    longitude: -63.180,
    ph: 4.6,
    organicMatter: 1.1,
    texture: 'Arenoso',
    normalizedTexture: 'arenoso',
    exchangeableAlMe: 1.9,
    nitrogenKgHa: 12,
    phosphorusPpm: 4,
    potassiumPpm: 70,
    taxonomyOrder: 'Ultisol'
  },
  {
    id: 'soil-pt-007',
    name: 'Barinas — Valle del Río Santo Domingo',
    state: 'Barinas',
    latitude: 8.622,
    longitude: -70.207,
    ph: 5.9,
    organicMatter: 2.8,
    texture: 'Franco-limoso',
    normalizedTexture: 'franco',
    exchangeableAlMe: 0.2,
    nitrogenKgHa: 38,
    phosphorusPpm: 15,
    potassiumPpm: 190,
    taxonomyOrder: 'Inceptisol'
  },
  {
    id: 'soil-pt-008',
    name: 'Yaracuy — Valle de Chivacoa / San Felipe',
    state: 'Yaracuy',
    latitude: 10.155,
    longitude: -68.895,
    ph: 6.6,
    organicMatter: 3.6,
    texture: 'Franco',
    normalizedTexture: 'franco',
    exchangeableAlMe: 0.0,
    nitrogenKgHa: 50,
    phosphorusPpm: 22,
    potassiumPpm: 230,
    taxonomyOrder: 'Alfisol'
  }
];

/**
 * Distancia esferoidal de Haversine en kilómetros entre dos coordenadas WGS84.
 */
export function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371.0088; // Radio medio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface MatchedSoilPoint {
  soil: SoilSpatialRecord;
  distanceKm: number;
}

/**
 * Búsqueda k-NN con pre-filtro de Bounding Box y ordenamiento geodésico.
 */
export function findNearestSoils(
  lat: number,
  lon: number,
  maxDistanceKm: number = 250,
  k: number = 3
): MatchedSoilPoint[] {
  // Pre-filtro por Bounding Box aproximado (1 grado ~ 111 km)
  const degThreshold = (maxDistanceKm / 111.0) * 1.25;
  const minLat = lat - degThreshold;
  const maxLat = lat + degThreshold;
  const minLon = lon - degThreshold;
  const maxLon = lon + degThreshold;

  const candidates = CALIBRATED_SOIL_RECORDS.filter(
    s => s.latitude >= minLat && s.latitude <= maxLat && s.longitude >= minLon && s.longitude <= maxLon
  );

  // Si no hay candidatos en el radio estrecho, evaluar todos
  const listToRank = candidates.length > 0 ? candidates : CALIBRATED_SOIL_RECORDS;

  const ranked: MatchedSoilPoint[] = listToRank
    .map(soil => ({
      soil,
      distanceKm: haversineDistanceKm(lat, lon, soil.latitude, soil.longitude)
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return ranked.slice(0, k);
}

export interface SoilPointAnalysisResult {
  query: { latitude: number; longitude: number };
  closestRecord: SoilSpatialRecord;
  distanceKm: number;
  interpolated: {
    ph: number;
    organicMatter: number;
    exchangeableAlMe: number;
    texture: string;
    normalizedTexture: SoilTextureType;
  };
  hydraulics: {
    fieldCapacityTheta: number;
    wiltingPointTheta: number;
    criticalMoistureTheta: number;
    saturationTheta: number;
    plantAvailableWaterPct: number;
    matricPotentialKPa: number;
    bulkDensityGcm3: number;
  };
  recommendations: {
    pedologicalZone: string;
    amendmentCategory: string;
    limeTonsPerHa: number;
    gypsumTonsPerHa?: number;
    limeType: string;
    notes?: string;
  };
  mapbiomasContext: {
    referenceCollection: string;
    ecosystemSuitability: string;
  };
}

/**
 * Evaluación edafológica espacial completa para un punto (lat, lon) de Venezuela.
 */
export function evaluatePointSoil(lat: number, lon: number): SoilPointAnalysisResult {
  const matches = findNearestSoils(lat, lon, 350, 3);
  const primaryMatch = matches[0];
  const primarySoil = primaryMatch ? primaryMatch.soil : CALIBRATED_SOIL_RECORDS[0];
  const dist = primaryMatch ? Math.round(primaryMatch.distanceKm * 10) / 10 : 0;

  // Interpolación IDW si hay vecinos a menos de 100 km
  let interpPh = primarySoil.ph;
  let interpOm = primarySoil.organicMatter;
  let interpAl = primarySoil.exchangeableAlMe ?? 0.1;

  const validNeighbors = matches.filter(m => m.distanceKm <= 120);
  if (validNeighbors.length > 1) {
    let weightSum = 0;
    let phSum = 0;
    let omSum = 0;
    let alSum = 0;

    for (const n of validNeighbors) {
      const d = Math.max(1.0, n.distanceKm);
      const w = 1.0 / (d * d);
      weightSum += w;
      phSum += n.soil.ph * w;
      omSum += n.soil.organicMatter * w;
      alSum += (n.soil.exchangeableAlMe ?? 0.1) * w;
    }

    if (weightSum > 0) {
      interpPh = Math.round((phSum / weightSum) * 100) / 100;
      interpOm = Math.round((omSum / weightSum) * 10) / 10;
      interpAl = Math.round((alSum / weightSum) * 100) / 100;
    }
  }

  const texture = primarySoil.normalizedTexture;
  const hydProps = REGIONAL_SOIL_HYDRAULICS[texture];

  // Suposición de humedad de campo típica al 75% del rango aprovechable
  const sampleMoisture = hydProps.wiltingPointTheta + (hydProps.fieldCapacityTheta - hydProps.wiltingPointTheta) * 0.75;
  const paw = calculatePAW(sampleMoisture, hydProps.fieldCapacityTheta, hydProps.wiltingPointTheta);
  const matricPot = estimateMatricPotentialKPa(sampleMoisture, texture);

  // Enmienda química regional
  const liming = calculateRegionalLimingNeed(
    interpPh,
    interpOm,
    primarySoil.state,
    1.0,
    { exchangeableAlMe: interpAl }
  );

  return {
    query: { latitude: lat, longitude: lon },
    closestRecord: primarySoil,
    distanceKm: dist,
    interpolated: {
      ph: interpPh,
      organicMatter: interpOm,
      exchangeableAlMe: interpAl,
      texture: primarySoil.texture,
      normalizedTexture: texture
    },
    hydraulics: {
      fieldCapacityTheta: hydProps.fieldCapacityTheta,
      wiltingPointTheta: hydProps.wiltingPointTheta,
      criticalMoistureTheta: hydProps.criticalMoistureTheta,
      saturationTheta: hydProps.saturationTheta,
      plantAvailableWaterPct: paw,
      matricPotentialKPa: matricPot,
      bulkDensityGcm3: hydProps.bulkDensityGcm3
    },
    recommendations: {
      pedologicalZone: liming.pedologicalZone,
      amendmentCategory: liming.amendmentCategory,
      limeTonsPerHa: liming.limeTonsPerHa,
      gypsumTonsPerHa: liming.gypsumTonsPerHa ?? 0,
      limeType: liming.limeType,
      notes: liming.regionalSoilNotes ?? ''
    },
    mapbiomasContext: {
      referenceCollection: 'MapBiomas Venezuela Colección 3.0 (1985–2024)',
      ecosystemSuitability:
        interpPh < 5.5
          ? 'Suelo ácido tropical con potencial cerealero previa neutralización Kamprath.'
          : 'Suelo de fertilidad favorable para cultivos y pasturas de producción forrajera.'
    }
  };
}

export interface SoilIntersectionResult {
  summary: {
    totalAreaHa: number;
    perimeterMeters: number;
    centroid: { latitude: number; longitude: number };
    predominantTexture: string;
    compositePh: number;
    compositeOrganicMatterPct: number;
  };
  hydraulicCapacity: {
    weightedPawPct: number;
    totalAvailableWaterM3: number;
    wiltingPointThresholdM3: number;
  };
  bulkAmendments: {
    requiresLiming: boolean;
    recommendedAmendment: string;
    rateTonHa: number;
    totalProductTons: number;
    equivalent50kgSacks: number;
    gypsumRateTonHa?: number;
    totalGypsumTons?: number;
    notes?: string;
  };
  matchedSamplesCount: number;
}

/**
 * Evalúa un polígono GeoJSON (coordenadas [lng, lat]) intersectando las muestras espaciales.
 */
export function evaluateSoilPolygonIntersection(
  polygonCoordinates: number[][][],
  areaHectares: number = 100.0,
  perimeterMeters: number = 4000.0
): SoilIntersectionResult {
  const outerRing = polygonCoordinates[0] || [];

  // Calcular centroide del polígono
  let latSum = 0;
  let lonSum = 0;
  for (const pt of outerRing) {
    lonSum += pt[0];
    latSum += pt[1];
  }
  const centroidLat = outerRing.length > 0 ? latSum / outerRing.length : 9.324;
  const centroidLon = outerRing.length > 0 ? lonSum / outerRing.length : -69.112;

  // Buscar puntos que caen estrictamente dentro del polígono
  const pointsInside = CALIBRATED_SOIL_RECORDS.filter(soil => {
    return isPointInPolygonWGS84(soil.latitude, soil.longitude, polygonCoordinates);
  });

  // Si no hay puntos dentro, usar los 3 más cercanos al centroide
  const effectivePoints =
    pointsInside.length > 0
      ? pointsInside
      : findNearestSoils(centroidLat, centroidLon, 300, 3).map(m => m.soil);

  const matchedCount = effectivePoints.length;

  let sumPh = 0;
  let sumOm = 0;
  let sumAl = 0;
  for (const p of effectivePoints) {
    sumPh += p.ph;
    sumOm += p.organicMatter;
    sumAl += p.exchangeableAlMe ?? 0.1;
  }

  const compositePh = Math.round((sumPh / matchedCount) * 100) / 100;
  const compositeOm = Math.round((sumOm / matchedCount) * 10) / 10;
  const compositeAl = Math.round((sumAl / matchedCount) * 100) / 100;

  const leadSoil = effectivePoints[0] || CALIBRATED_SOIL_RECORDS[0];
  const texture = leadSoil.normalizedTexture;
  const hydProps = REGIONAL_SOIL_HYDRAULICS[texture];

  // Cálculo de agua en el perfil superior de 0-30 cm (0.3 m)
  // Capacidad de retención en m³ = Área (m²) * profundidad (0.3m) * (θ_FC - θ_PWP) / 100
  const areaM2 = areaHectares * 10000;
  const availableFraction = (hydProps.fieldCapacityTheta - hydProps.wiltingPointTheta) / 100.0;
  const totalWaterM3 = Math.round(areaM2 * 0.3 * availableFraction);
  const wiltingM3 = Math.round(areaM2 * 0.3 * (hydProps.wiltingPointTheta / 100.0));

  const liming = calculateRegionalLimingNeed(
    compositePh,
    compositeOm,
    leadSoil.state,
    areaHectares,
    { exchangeableAlMe: compositeAl }
  );

  const totalProductTons = liming.totalLimeTons;
  const totalSacks = Math.ceil((totalProductTons * 1000) / 50);

  return {
    summary: {
      totalAreaHa: Math.round(areaHectares * 10) / 10,
      perimeterMeters: Math.round(perimeterMeters * 10) / 10,
      centroid: { latitude: Math.round(centroidLat * 10000) / 10000, longitude: Math.round(centroidLon * 10000) / 10000 },
      predominantTexture: leadSoil.texture,
      compositePh,
      compositeOrganicMatterPct: compositeOm
    },
    hydraulicCapacity: {
      weightedPawPct: 82.5,
      totalAvailableWaterM3: totalWaterM3,
      wiltingPointThresholdM3: wiltingM3
    },
    bulkAmendments: {
      requiresLiming: liming.needsLiming,
      recommendedAmendment: liming.amendmentCategory === 'GYPSUM' ? (liming.gypsumType || liming.limeType) : liming.limeType,
      rateTonHa: liming.needsLiming ? liming.limeTonsPerHa : (liming.gypsumTonsPerHa ?? 0),
      totalProductTons: liming.needsLiming ? totalProductTons : (liming.totalGypsumTons ?? 0),
      equivalent50kgSacks: Math.ceil(((liming.needsLiming ? totalProductTons : (liming.totalGypsumTons ?? 0)) * 1000) / 50),
      gypsumRateTonHa: liming.gypsumTonsPerHa ?? 0,
      totalGypsumTons: liming.totalGypsumTons ?? 0,
      notes: liming.regionalSoilNotes ?? ''
    },
    matchedSamplesCount: matchedCount
  };
}
