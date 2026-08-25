export interface StateGeoData {
  id: string;
  name: string;
  region: string;
  capital: string;
  center: [number, number]; // [lat, lng]
  bounds: [[number, number], [number, number]];
  annualRainfallMm: number;
  averageTempC: number;
  mainCrops: string[];
  soilTextureDominant: string;
  soilTexture?: string;
  dominantSoil?: string;
  averagePh: number;
  avgPh?: number;
  organicMatterPct?: number;
  mapbiomasCoverPercentage: {
    forest: number;
    savanna: number;
    agriculture: number;
    pasture: number;
    water: number;
  };
  mapbiomasCover?: {
    forest: number;
    savanna: number;
    agriculture: number;
    pasture: number;
    water: number;
  };
}


export interface CropData {
  id: string;
  name: string;
  scientificName: string;
  category: 'Cereal' | 'Leguminosa' | 'Tubérculo' | 'Frutal' | 'Estimulante' | 'Industrial' | 'Forraje';
  idealPhMin: number;
  idealPhMax: number;
  minOrganicMatterPct: number;
  annualRainfallMinMm: number;
  annualRainfallMaxMm: number;
  idealTempMinC: number;
  idealTempMaxC: number;
  potentialYieldKgHa: number;
  optimalSoilTextures: string[];
  growingSeasonDays: number;
  fertilizerRequirementKgHa: {
    n: number;
    p2o5: number;
    k2o: number;
  };
  recommendedCommercialFormula: string;
  isAgroforestry?: boolean;
}

export interface SoilSamplePoint {
  id: string;
  lat: number;
  lng: number;
  ph: number;
  organicMatter: number;
  texture: string;
  stateId: string;
  nitrogenPpm?: number;
  phosphorusPpm?: number;
  potassiumPpm?: number;
  samplingDate: string;
}

export const VENEZUELA_STATES_DATA: StateGeoData[] = [
  {
    id: "portuguesa",
    name: "Portuguesa",
    region: "Llanos Occidentales",
    capital: "Guanare",
    center: [9.324, -69.112],
    bounds: [[8.4, -70.1], [9.9, -68.4]],
    annualRainfallMm: 1650,
    averageTempC: 27.5,
    mainCrops: ["Maíz Blanco", "Arroz", "Soya", "Caña de Azúcar", "Ajonjolí"],
    soilTextureDominant: "Franco-limoso",
    averagePh: 6.2,
    mapbiomasCoverPercentage: { forest: 18, savanna: 12, agriculture: 54, pasture: 14, water: 2 }
  },
  {
    id: "zulia",
    name: "Zulia",
    region: "Sur del Lago y Costa Occidental",
    capital: "Maracaibo",
    center: [8.985, -71.724],
    bounds: [[8.4, -73.0], [11.8, -70.5]],
    annualRainfallMm: 1850,
    averageTempC: 28.5,
    mainCrops: ["Plátano", "Palma Aceitera", "Cacao Criollo", "Yuca", "Pasturas"],
    soilTextureDominant: "Franco-arcilloso",
    averagePh: 5.4,
    mapbiomasCoverPercentage: { forest: 32, savanna: 8, agriculture: 28, pasture: 24, water: 8 }
  },
  {
    id: "guarico",
    name: "Guárico",
    region: "Llanos Centrales",
    capital: "San Juan de los Morros",
    center: [8.924, -67.428],
    bounds: [[7.6, -68.0], [10.0, -65.5]],
    annualRainfallMm: 1250,
    averageTempC: 28.0,
    mainCrops: ["Arroz", "Maíz", "Sorgo", "Pasturas"],
    soilTextureDominant: "Vertisol Arcilloso",
    averagePh: 6.8,
    mapbiomasCoverPercentage: { forest: 14, savanna: 42, agriculture: 22, pasture: 20, water: 2 }
  },
  {
    id: "barinas",
    name: "Barinas",
    region: "Llanos Occidentales",
    capital: "Barinas",
    center: [8.622, -70.207],
    bounds: [[7.5, -71.5], [9.3, -68.8]],
    annualRainfallMm: 1750,
    averageTempC: 27.0,
    mainCrops: ["Maíz", "Plátano", "Yuca", "Cacao", "Pasturas"],
    soilTextureDominant: "Franco",
    averagePh: 5.8,
    mapbiomasCoverPercentage: { forest: 28, savanna: 25, agriculture: 20, pasture: 25, water: 2 }
  },
  {
    id: "aragua",
    name: "Aragua",
    region: "Centro",
    capital: "Maracay",
    center: [10.246, -67.595],
    bounds: [[9.3, -67.9], [10.6, -66.8]],
    annualRainfallMm: 1100,
    averageTempC: 25.5,
    mainCrops: ["Caña de Azúcar", "Hortalizas", "Cacao Criollo (Chuao)", "Cítricos"],
    soilTextureDominant: "Franco",
    averagePh: 6.7,
    mapbiomasCoverPercentage: { forest: 45, savanna: 10, agriculture: 25, pasture: 15, water: 5 }
  },
  {
    id: "merida",
    name: "Mérida",
    region: "Andes",
    capital: "Mérida",
    center: [8.598, -71.144],
    bounds: [[7.9, -71.9], [9.2, -70.6]],
    annualRainfallMm: 1400,
    averageTempC: 19.0,
    mainCrops: ["Café Arábica", "Papa", "Hortalizas", "Zanahoria", "Fresas"],
    soilTextureDominant: "Franco-arenoso",
    averagePh: 5.6,
    mapbiomasCoverPercentage: { forest: 58, savanna: 12, agriculture: 18, pasture: 10, water: 2 }
  },
  {
    id: "monagas",
    name: "Monagas",
    region: "Oriente",
    capital: "Maturín",
    center: [9.745, -63.185],
    bounds: [[8.5, -64.2], [10.3, -62.2]],
    annualRainfallMm: 1350,
    averageTempC: 27.5,
    mainCrops: ["Soya", "Maíz", "Palma Aceitera", "Pino Caribe"],
    soilTextureDominant: "Franco-arenoso",
    averagePh: 4.9,
    mapbiomasCoverPercentage: { forest: 35, savanna: 30, agriculture: 20, pasture: 12, water: 3 }
  },
  {
    id: "tachira",
    name: "Táchira",
    region: "Andes",
    capital: "San Cristóbal",
    center: [7.766, -72.225],
    bounds: [[7.3, -72.5], [8.6, -71.6]],
    annualRainfallMm: 1600,
    averageTempC: 22.0,
    mainCrops: ["Café Arábica", "Caña Panelera", "Hortalizas", "Pasto de Corte"],
    soilTextureDominant: "Franco",
    averagePh: 5.5,
    mapbiomasCoverPercentage: { forest: 52, savanna: 8, agriculture: 22, pasture: 16, water: 2 }
  },
  {
    id: "lara",
    name: "Lara",
    region: "Centroccidente",
    capital: "Barquisimeto",
    center: [10.067, -69.347],
    bounds: [[9.4, -70.8], [10.8, -68.9]],
    annualRainfallMm: 850,
    averageTempC: 26.0,
    mainCrops: ["Caña de Azúcar", "Cebolla", "Pimentón", "Café", "Piña"],
    soilTextureDominant: "Franco-arcilloso",
    averagePh: 7.1,
    mapbiomasCoverPercentage: { forest: 25, savanna: 35, agriculture: 25, pasture: 14, water: 1 }
  },
  {
    id: "yaracuy",
    name: "Yaracuy",
    region: "Centroccidente",
    capital: "San Felipe",
    center: [10.339, -68.742],
    bounds: [[9.8, -69.2], [10.8, -68.2]],
    annualRainfallMm: 1450,
    averageTempC: 26.5,
    mainCrops: ["Naranja", "Caña de Azúcar", "Maíz", "Aguacate", "Plátano"],
    soilTextureDominant: "Franco",
    averagePh: 6.4,
    mapbiomasCoverPercentage: { forest: 42, savanna: 10, agriculture: 32, pasture: 14, water: 2 }
  },
  {
    id: "falcon",
    name: "Falcón",
    region: "Occidente",
    capital: "Coro",
    center: [11.404, -69.673],
    bounds: [[10.3, -71.2], [12.2, -68.3]],
    annualRainfallMm: 600,
    averageTempC: 28.5,
    mainCrops: ["Melón", "Patilla", "Sábila (Aloe)", "Cocotero", "Caprinos"],
    soilTextureDominant: "Franco-arenoso Calcáreo",
    averagePh: 7.6,
    mapbiomasCoverPercentage: { forest: 22, savanna: 48, agriculture: 12, pasture: 15, water: 3 }
  },
  {
    id: "carabobo",
    name: "Carabobo",
    region: "Centro",
    capital: "Valencia",
    center: [10.183, -68.0],
    bounds: [[9.8, -68.4], [10.6, -67.6]],
    annualRainfallMm: 1200,
    averageTempC: 26.0,
    mainCrops: ["Cítricos", "Maíz", "Cambur", "Cacao", "Pasturas"],
    soilTextureDominant: "Franco",
    averagePh: 6.3,
    mapbiomasCoverPercentage: { forest: 40, savanna: 15, agriculture: 25, pasture: 16, water: 4 }
  },
  {
    id: "cojedes",
    name: "Cojedes",
    region: "Llanos Centrales",
    capital: "San Carlos",
    center: [9.661, -68.582],
    bounds: [[8.5, -69.2], [10.0, -68.0]],
    annualRainfallMm: 1400,
    averageTempC: 27.5,
    mainCrops: ["Arroz", "Maíz", "Sorgo", "Ñame", "Pasturas"],
    soilTextureDominant: "Franco-limoso",
    averagePh: 5.9,
    mapbiomasCoverPercentage: { forest: 25, savanna: 35, agriculture: 20, pasture: 18, water: 2 }
  },
  {
    id: "anzoategui",
    name: "Anzoátegui",
    region: "Oriente",
    capital: "Barcelona",
    center: [8.934, -64.444],
    bounds: [[7.7, -65.7], [10.3, -63.7]],
    annualRainfallMm: 1100,
    averageTempC: 28.0,
    mainCrops: ["Maní", "Soya", "Maíz", "Sorgo", "Patilla"],
    soilTextureDominant: "Franco-arenoso",
    averagePh: 5.2,
    mapbiomasCoverPercentage: { forest: 20, savanna: 48, agriculture: 16, pasture: 14, water: 2 }
  },
  {
    id: "sucre",
    name: "Sucre",
    region: "Oriente",
    capital: "Cumaná",
    center: [10.453, -63.504],
    bounds: [[10.0, -64.5], [10.8, -61.9]],
    annualRainfallMm: 1250,
    averageTempC: 27.0,
    mainCrops: ["Cacao Trinitario/Criollo", "Café", "Cocotero", "Yuca"],
    soilTextureDominant: "Franco",
    averagePh: 5.8,
    mapbiomasCoverPercentage: { forest: 55, savanna: 15, agriculture: 18, pasture: 8, water: 4 }
  },
  {
    id: "miranda",
    name: "Miranda",
    region: "Centro",
    capital: "Los Teques",
    center: [10.25, -66.5],
    bounds: [[9.9, -67.2], [10.6, -65.5]],
    annualRainfallMm: 1500,
    averageTempC: 25.0,
    mainCrops: ["Cacao Carenero Superior", "Plátano", "Hortalizas", "Flores"],
    soilTextureDominant: "Franco-arcilloso",
    averagePh: 5.7,
    mapbiomasCoverPercentage: { forest: 52, savanna: 10, agriculture: 22, pasture: 12, water: 4 }
  },
  {
    id: "trujillo",
    name: "Trujillo",
    region: "Andes",
    capital: "Trujillo",
    center: [9.366, -70.433],
    bounds: [[8.9, -71.0], [9.9, -70.0]],
    annualRainfallMm: 1350,
    averageTempC: 22.5,
    mainCrops: ["Café", "Caña Panelera", "Plátano", "Piña", "Hortalizas"],
    soilTextureDominant: "Franco",
    averagePh: 5.9,
    mapbiomasCoverPercentage: { forest: 48, savanna: 12, agriculture: 26, pasture: 12, water: 2 }
  },
  {
    id: "apure",
    name: "Apure",
    region: "Llanos del Sur",
    capital: "San Fernando de Apure",
    center: [7.887, -67.472],
    bounds: [[6.0, -72.0], [8.2, -66.5]],
    annualRainfallMm: 1600,
    averageTempC: 28.5,
    mainCrops: ["Frijol", "Maíz de Vega", "Yuca", "Pasturas Inundables"],
    soilTextureDominant: "Arcillo-limoso",
    averagePh: 5.1,
    mapbiomasCoverPercentage: { forest: 15, savanna: 58, agriculture: 6, pasture: 15, water: 6 }
  },
  {
    id: "bolivar",
    name: "Bolívar",
    region: "Guayana",
    capital: "Ciudad Bolívar",
    center: [6.333, -63.5],
    bounds: [[3.9, -67.5], [8.4, -60.5]],
    annualRainfallMm: 2100,
    averageTempC: 27.0,
    mainCrops: ["Yuca Amarga", "Cacao", "Frutales Amazónicos", "Pasturas"],
    soilTextureDominant: "Oxisol Ácido",
    averagePh: 4.5,
    mapbiomasCoverPercentage: { forest: 72, savanna: 18, agriculture: 3, pasture: 4, water: 3 }
  },
  {
    id: "amazonas",
    name: "Amazonas",
    region: "Amazonía",
    capital: "Puerto Ayacucho",
    center: [3.167, -65.5],
    bounds: [[0.6, -67.9], [6.2, -63.3]],
    annualRainfallMm: 2800,
    averageTempC: 26.5,
    mainCrops: ["Yuca", "Cacao Silvestre", "Copuazú", "Tupiro", "Agroforestería Indígena"],
    soilTextureDominant: "Espodosol/Oxisol",
    averagePh: 4.2,
    mapbiomasCoverPercentage: { forest: 88, savanna: 6, agriculture: 1, pasture: 1, water: 4 }
  },
  {
    id: "delta_amacuro",
    name: "Delta Amacuro",
    region: "Delta",
    capital: "Tucupita",
    center: [9.064, -61.503],
    bounds: [[7.6, -62.7], [10.1, -59.8]],
    annualRainfallMm: 2200,
    averageTempC: 27.5,
    mainCrops: ["Palmito", "Arroz de Humedal", "Plátano", "Yuca", "Cacao"],
    soilTextureDominant: "Histosol Orgánico/Fango",
    averagePh: 4.8,
    mapbiomasCoverPercentage: { forest: 65, savanna: 10, agriculture: 5, pasture: 5, water: 15 }
  },
  {
    id: "nueva_esparta",
    name: "Nueva Esparta",
    region: "Insular",
    capital: "La Asunción",
    center: [10.997, -63.911],
    bounds: [[10.7, -64.4], [11.2, -63.7]],
    annualRainfallMm: 500,
    averageTempC: 28.0,
    mainCrops: ["Ají Dulce Margariteño", "Tomate Margariteño", "Berenjena"],
    soilTextureDominant: "Franco-arenoso",
    averagePh: 7.4,
    mapbiomasCoverPercentage: { forest: 28, savanna: 35, agriculture: 10, pasture: 5, water: 22 }
  },
  {
    id: "vargas",
    name: "La Guaira",
    region: "Central Litoral",
    capital: "La Guaira",
    center: [10.601, -66.932],
    bounds: [[10.4, -67.4], [10.7, -66.3]],
    annualRainfallMm: 750,
    averageTempC: 27.5,
    mainCrops: ["Cacao", "Frutales Tropicales", "Hortalizas de Ladera"],
    soilTextureDominant: "Franco-pedregoso",
    averagePh: 6.6,
    mapbiomasCoverPercentage: { forest: 60, savanna: 15, agriculture: 10, pasture: 5, water: 10 }
  },
  {
    id: "distrito_capital",
    name: "Distrito Capital",
    region: "Capital",
    capital: "Caracas",
    center: [10.488, -66.903],
    bounds: [[10.3, -67.1], [10.6, -66.8]],
    annualRainfallMm: 950,
    averageTempC: 22.0,
    mainCrops: ["Agricultura Urbana", "Hortalizas Hidropónicas", "Flores"],
    soilTextureDominant: "Franco",
    averagePh: 6.5,
    mapbiomasCoverPercentage: { forest: 45, savanna: 10, agriculture: 5, pasture: 5, water: 35 }
  }
];

export const VENEZUELA_CROPS: CropData[] = [
  {
    id: "maiz_blanco",
    name: "Maíz Blanco",
    scientificName: "Zea mays",
    category: "Cereal",
    idealPhMin: 5.8,
    idealPhMax: 7.0,
    minOrganicMatterPct: 2.2,
    annualRainfallMinMm: 800,
    annualRainfallMaxMm: 1500,
    idealTempMinC: 22,
    idealTempMaxC: 32,
    potentialYieldKgHa: 6800,
    optimalSoilTextures: ["Franco", "Franco-limoso", "Franco-arcilloso"],
    growingSeasonDays: 120,
    fertilizerRequirementKgHa: { n: 140, p2o5: 70, k2o: 60 },
    recommendedCommercialFormula: "NPK 12-24-12 + Urea 46% Fraccionada"
  },
  {
    id: "arroz",
    name: "Arroz",
    scientificName: "Oryza sativa",
    category: "Cereal",
    idealPhMin: 5.5,
    idealPhMax: 7.2,
    minOrganicMatterPct: 2.0,
    annualRainfallMinMm: 1200,
    annualRainfallMaxMm: 2200,
    idealTempMinC: 24,
    idealTempMaxC: 34,
    potentialYieldKgHa: 7200,
    optimalSoilTextures: ["Vertisol Arcilloso", "Arcilloso", "Franco-arcilloso"],
    growingSeasonDays: 130,
    fertilizerRequirementKgHa: { n: 150, p2o5: 60, k2o: 70 },
    recommendedCommercialFormula: "NPK 15-15-15 + Sulfato de Amonio"
  },
  {
    id: "platano",
    name: "Plátano",
    scientificName: "Musa paradisiaca",
    category: "Frutal",
    idealPhMin: 5.5,
    idealPhMax: 6.8,
    minOrganicMatterPct: 3.0,
    annualRainfallMinMm: 1500,
    annualRainfallMaxMm: 2500,
    idealTempMinC: 24,
    idealTempMaxC: 32,
    potentialYieldKgHa: 18500,
    optimalSoilTextures: ["Franco-aluvial", "Franco-limoso", "Franco"],
    growingSeasonDays: 300,
    fertilizerRequirementKgHa: { n: 200, p2o5: 50, k2o: 300 },
    recommendedCommercialFormula: "NPK 12-12-17-2 (Alto en Potasio)"
  },
  {
    id: "cacao_criollo",
    name: "Cacao Criollo",
    scientificName: "Theobroma cacao",
    category: "Estimulante",
    idealPhMin: 6.0,
    idealPhMax: 7.2,
    minOrganicMatterPct: 3.5,
    annualRainfallMinMm: 1400,
    annualRainfallMaxMm: 2400,
    idealTempMinC: 22,
    idealTempMaxC: 30,
    potentialYieldKgHa: 1100,
    optimalSoilTextures: ["Franco", "Franco-arcilloso", "Franco-limoso"],
    growingSeasonDays: 365,
    fertilizerRequirementKgHa: { n: 80, p2o5: 40, k2o: 100 },
    recommendedCommercialFormula: "Compost Orgánico + Roca Fosfórica Riecito",
    isAgroforestry: true
  },
  {
    id: "cafe_arabica",
    name: "Café Arábica",
    scientificName: "Coffea arabica",
    category: "Estimulante",
    idealPhMin: 5.2,
    idealPhMax: 6.5,
    minOrganicMatterPct: 3.2,
    annualRainfallMinMm: 1300,
    annualRainfallMaxMm: 2000,
    idealTempMinC: 17,
    idealTempMaxC: 24,
    potentialYieldKgHa: 1600,
    optimalSoilTextures: ["Franco", "Franco-arenoso"],
    growingSeasonDays: 365,
    fertilizerRequirementKgHa: { n: 120, p2o5: 40, k2o: 120 },
    recommendedCommercialFormula: "NPK 17-6-18-2 + Enmienda Orgánica",
    isAgroforestry: true
  },
  {
    id: "cana_azucar",
    name: "Caña de Azúcar",
    scientificName: "Saccharum officinarum",
    category: "Industrial",
    idealPhMin: 6.0,
    idealPhMax: 7.5,
    minOrganicMatterPct: 2.0,
    annualRainfallMinMm: 1200,
    annualRainfallMaxMm: 2000,
    idealTempMinC: 23,
    idealTempMaxC: 33,
    potentialYieldKgHa: 85000,
    optimalSoilTextures: ["Franco", "Franco-arcilloso"],
    growingSeasonDays: 360,
    fertilizerRequirementKgHa: { n: 160, p2o5: 80, k2o: 180 },
    recommendedCommercialFormula: "NPK 14-14-14 + Cloruro de Potasio"
  },
  {
    id: "soya",
    name: "Soya",
    scientificName: "Glycine max",
    category: "Leguminosa",
    idealPhMin: 5.8,
    idealPhMax: 6.8,
    minOrganicMatterPct: 2.0,
    annualRainfallMinMm: 700,
    annualRainfallMaxMm: 1300,
    idealTempMinC: 22,
    idealTempMaxC: 31,
    potentialYieldKgHa: 2800,
    optimalSoilTextures: ["Franco", "Franco-limoso"],
    growingSeasonDays: 105,
    fertilizerRequirementKgHa: { n: 20, p2o5: 70, k2o: 60 },
    recommendedCommercialFormula: "Inoculante Bradyrhizobium + Superfosfato Triple"
  },
  {
    id: "pasturas",
    name: "Pasturas Tropicales",
    scientificName: "Brachiaria brizantha",
    category: "Forraje",
    idealPhMin: 4.8,
    idealPhMax: 7.2,
    minOrganicMatterPct: 1.5,
    annualRainfallMinMm: 900,
    annualRainfallMaxMm: 2600,
    idealTempMinC: 20,
    idealTempMaxC: 35,
    potentialYieldKgHa: 22000,
    optimalSoilTextures: ["Franco", "Franco-arenoso", "Arcilloso"],
    growingSeasonDays: 365,
    fertilizerRequirementKgHa: { n: 100, p2o5: 40, k2o: 50 },
    recommendedCommercialFormula: "Urea 46% + Roca Fosfórica Riecito"
  }
];

export const VENEZUELA_SOIL_POINTS: SoilSamplePoint[] = [
  { id: "S-TUR-01", lat: 9.324, lng: -69.112, ph: 6.2, organicMatter: 3.2, texture: "Franco-limoso", stateId: "portuguesa", samplingDate: "2026-02-15" },
  { id: "S-TUR-02", lat: 9.351, lng: -69.135, ph: 6.0, organicMatter: 2.9, texture: "Franco-limoso", stateId: "portuguesa", samplingDate: "2026-02-18" },
  { id: "S-SDL-01", lat: 8.985, lng: -71.724, ph: 5.4, organicMatter: 4.1, texture: "Franco-arcilloso", stateId: "zulia", samplingDate: "2026-01-20" },
  { id: "S-SDL-02", lat: 9.042, lng: -71.789, ph: 5.2, organicMatter: 3.8, texture: "Franco-aluvial", stateId: "zulia", samplingDate: "2026-01-22" },
  { id: "S-CAL-01", lat: 8.924, lng: -67.428, ph: 6.8, organicMatter: 2.4, texture: "Vertisol Arcilloso", stateId: "guarico", samplingDate: "2026-03-02" },
  { id: "S-BAR-01", lat: 8.622, lng: -70.207, ph: 5.8, organicMatter: 3.0, texture: "Franco", stateId: "barinas", samplingDate: "2026-02-10" },
  { id: "S-CHU-01", lat: 10.491, lng: -67.531, ph: 6.4, organicMatter: 4.5, texture: "Franco", stateId: "aragua", samplingDate: "2026-02-28" },
  { id: "S-MER-01", lat: 8.225, lng: -71.815, ph: 5.6, organicMatter: 4.2, texture: "Franco-arenoso", stateId: "merida", samplingDate: "2026-01-15" },
  { id: "S-MAT-01", lat: 9.745, lng: -63.185, ph: 4.9, organicMatter: 1.8, texture: "Franco-arenoso", stateId: "monagas", samplingDate: "2026-02-05" },
  { id: "S-TAC-01", lat: 7.766, lng: -72.225, ph: 5.5, organicMatter: 3.6, texture: "Franco", stateId: "tachira", samplingDate: "2026-01-30" },
  { id: "S-LAR-01", lat: 10.067, lng: -69.347, ph: 7.1, organicMatter: 2.1, texture: "Franco-arcilloso", stateId: "lara", samplingDate: "2026-02-12" },
  { id: "S-YAR-01", lat: 10.339, lng: -68.742, ph: 6.4, organicMatter: 3.4, texture: "Franco", stateId: "yaracuy", samplingDate: "2026-02-25" }
];

export const SAMPLE_SOIL_POINTS: SoilSamplePoint[] = [
  ...VENEZUELA_SOIL_POINTS,
  { id: "S-TUR-03", lat: 9.310, lng: -69.090, ph: 6.4, organicMatter: 3.5, texture: "Franco-limoso", stateId: "portuguesa", samplingDate: "2026-02-20" },
  { id: "S-SDL-03", lat: 8.950, lng: -71.690, ph: 5.6, organicMatter: 4.3, texture: "Franco-arcilloso", stateId: "zulia", samplingDate: "2026-01-25" },
  { id: "S-CAL-02", lat: 8.900, lng: -67.400, ph: 6.9, organicMatter: 2.6, texture: "Vertisol Arcilloso", stateId: "guarico", samplingDate: "2026-03-05" },
  { id: "S-BAR-02", lat: 8.600, lng: -70.180, ph: 5.9, organicMatter: 3.1, texture: "Franco", stateId: "barinas", samplingDate: "2026-02-12" },
  { id: "S-CHU-02", lat: 10.500, lng: -67.520, ph: 6.5, organicMatter: 4.8, texture: "Franco", stateId: "aragua", samplingDate: "2026-03-01" },
  { id: "S-MER-02", lat: 8.240, lng: -71.800, ph: 5.7, organicMatter: 4.0, texture: "Franco-arenoso", stateId: "merida", samplingDate: "2026-01-18" },
  { id: "S-MAT-02", lat: 9.720, lng: -63.160, ph: 5.0, organicMatter: 1.9, texture: "Franco-arenoso", stateId: "monagas", samplingDate: "2026-02-08" },
  { id: "S-TAC-02", lat: 7.780, lng: -72.210, ph: 5.4, organicMatter: 3.8, texture: "Franco", stateId: "tachira", samplingDate: "2026-02-02" },
  { id: "S-LAR-02", lat: 10.080, lng: -69.330, ph: 7.2, organicMatter: 2.0, texture: "Franco-arcilloso", stateId: "lara", samplingDate: "2026-02-15" },
  { id: "S-YAR-02", lat: 10.350, lng: -68.720, ph: 6.3, organicMatter: 3.6, texture: "Franco", stateId: "yaracuy", samplingDate: "2026-02-28" }
];

export const MAPBIOMAS_CLASSES = [
  { id: 3, name: "Formación Forestal (Bosque)", color: "#129912", category: "Natural" },
  { id: 4, name: "Formación Sabana", color: "#BDB76B", category: "Natural" },
  { id: 11, name: "Humedal / Pantano", color: "#45C2A5", category: "Natural" },
  { id: 15, name: "Pastura Sembrada", color: "#FFD966", category: "Antrópico" },
  { id: 18, name: "Agricultura / Cultivo Anual", color: "#E974ED", category: "Antrópico" },
  { id: 33, name: "Cuerpo de Agua Continental", color: "#0064FF", category: "Agua" }
];

export const SOIL_PH_RANGES = [
  { label: "Fuertemente Ácido (pH < 5.0)", min: 0, max: 4.99, color: "#ef4444", status: "Alerta Toxicidad Al" },
  { label: "Moderadamente Ácido (pH 5.0 - 5.8)", min: 5.0, max: 5.89, color: "#f97316", status: "Requiere Encalado" },
  { label: "Ligeramente Ácido / Ideal (pH 5.9 - 6.8)", min: 5.9, max: 6.89, color: "#22c55e", status: "Óptimo General" },
  { label: "Neutro a Ligeramente Alcalino (pH 6.9 - 7.6)", min: 6.9, max: 7.6, color: "#3b82f6", status: "Favorable Granos" },
  { label: "Alcalino (pH > 7.6)", min: 7.61, max: 14.0, color: "#a855f7", status: "Riesgo Clorosis Fe" }
];

