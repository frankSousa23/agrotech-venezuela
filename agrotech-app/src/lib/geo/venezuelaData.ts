// Datos y estadísticas territoriales y agroambientales de Venezuela inspirados en MapBiomas
export interface StateGeoData {
  id: string;
  name: string;
  capital: string;
  region: string;
  center: [number, number];
  areaKm2: number;
  dominantSoil: string;
  avgPh: number;
  annualRainfallMm: number;
  elevationM: number;
  mapbiomasCover: {
    forest: number;      // % Bosque
    pasture: number;     // % Pasto / Ganadería
    agriculture: number; // % Agricultura intensiva y cultivos
    savanna: number;     // % Sabana y formación natural no boscosa
    water: number;       // % Cuerpos de agua
    urbanOther: number;  // % Urbano y otros
  };
  mainCrops: string[];
  soilTexture: string;
  organicMatterPct: number;
  fertilityLevel: 'Alta' | 'Media' | 'Baja';
}

export interface SoilSamplePoint {
  id: string;
  code: string;
  farmName: string;
  state: string;
  municipality: string;
  coords: [number, number];
  date: string;
  ph: number;
  organicMatter: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  texture: string;
  suitabilityScore: number; // 0 - 100
  recommendedCrop: string;
}

export const VENEZUELA_STATES_DATA: StateGeoData[] = [
  {
    id: 'zulia',
    name: 'Zulia',
    capital: 'Maracaibo',
    region: 'Zuliana',
    center: [10.25, -71.95],
    areaKm2: 63100,
    dominantSoil: 'Inceptisols / Entisols (Sur del Lago)',
    avgPh: 5.6,
    annualRainfallMm: 1450,
    elevationM: 25,
    mapbiomasCover: { forest: 32, pasture: 41, agriculture: 14, savanna: 3, water: 8, urbanOther: 2 },
    mainCrops: ['Plátano', 'Palma Aceitera', 'Pastos Guinea/Brachiaria', 'Cacao Porcelana', 'Yuca'],
    soilTexture: 'Franco-arcilloso',
    organicMatterPct: 4.1,
    fertilityLevel: 'Alta'
  },
  {
    id: 'portuguesa',
    name: 'Portuguesa',
    capital: 'Guanare',
    region: 'Los Llanos Occidentales',
    center: [9.15, -69.25],
    areaKm2: 15200,
    dominantSoil: 'Mollisols / Alfisols (Granero de Venezuela)',
    avgPh: 6.4,
    annualRainfallMm: 1650,
    elevationM: 180,
    mapbiomasCover: { forest: 18, pasture: 34, agriculture: 42, savanna: 4, water: 1, urbanOther: 1 },
    mainCrops: ['Maíz Blanco', 'Maíz Amarillo', 'Arroz', 'Ajonjolí', 'Girasol', 'Caña de Azúcar'],
    soilTexture: 'Franco-limoso',
    organicMatterPct: 3.2,
    fertilityLevel: 'Alta'
  },
  {
    id: 'guarico',
    name: 'Guárico',
    capital: 'San Juan de los Morros',
    region: 'Los Llanos Centrales',
    center: [8.8, -66.4],
    areaKm2: 64986,
    dominantSoil: 'Vertisols / Alfisols',
    avgPh: 6.8,
    annualRainfallMm: 1200,
    elevationM: 120,
    mapbiomasCover: { forest: 14, pasture: 48, agriculture: 26, savanna: 9, water: 2, urbanOther: 1 },
    mainCrops: ['Arroz (Sistema de Riego Calabozo)', 'Maíz', 'Sorgo', 'Pasturas Brachiaria', 'Tomate'],
    soilTexture: 'Arcilloso (Suelos expansivos)',
    organicMatterPct: 2.1,
    fertilityLevel: 'Media'
  },
  {
    id: 'barinas',
    name: 'Barinas',
    capital: 'Barinas',
    region: 'Los Llanos Occidentales',
    center: [8.1, -70.2],
    areaKm2: 35200,
    dominantSoil: 'Inceptisols / Ultisols',
    avgPh: 5.8,
    annualRainfallMm: 1800,
    elevationM: 160,
    mapbiomasCover: { forest: 31, pasture: 45, agriculture: 18, savanna: 4, water: 1, urbanOther: 1 },
    mainCrops: ['Plátano', 'Maíz', 'Arroz', 'Cacao', 'Ganadería Doble Propósito'],
    soilTexture: 'Franco-arenoso a franco',
    organicMatterPct: 2.8,
    fertilityLevel: 'Media'
  },
  {
    id: 'aragua',
    name: 'Aragua',
    capital: 'Maracay',
    region: 'Central',
    center: [10.15, -67.45],
    areaKm2: 7014,
    dominantSoil: 'Mollisols de Valles Lacustres',
    avgPh: 6.9,
    annualRainfallMm: 980,
    elevationM: 450,
    mapbiomasCover: { forest: 48, pasture: 18, agriculture: 22, savanna: 2, water: 4, urbanOther: 6 },
    mainCrops: ['Caña de Azúcar', 'Hortalizas', 'Cacao Chuao (Origen Fino)', 'Frutales'],
    soilTexture: 'Franco-limoso',
    organicMatterPct: 3.8,
    fertilityLevel: 'Alta'
  },
  {
    id: 'carabobo',
    name: 'Carabobo',
    capital: 'Valencia',
    region: 'Central',
    center: [10.1, -68.0],
    areaKm2: 4650,
    dominantSoil: 'Inceptisols / Alfisols',
    avgPh: 6.5,
    annualRainfallMm: 1100,
    elevationM: 500,
    mapbiomasCover: { forest: 44, pasture: 22, agriculture: 20, savanna: 2, water: 4, urbanOther: 8 },
    mainCrops: ['Cítricos', 'Hortalizas', 'Maíz', 'Tubérculos', 'Pecuario'],
    soilTexture: 'Franco',
    organicMatterPct: 3.1,
    fertilityLevel: 'Media'
  },
  {
    id: 'merida',
    name: 'Mérida',
    capital: 'Mérida',
    region: 'Los Andes',
    center: [8.55, -71.2],
    areaKm2: 11300,
    dominantSoil: 'Andisols de Alta Montaña',
    avgPh: 5.2,
    annualRainfallMm: 1900,
    elevationM: 1600,
    mapbiomasCover: { forest: 62, pasture: 16, agriculture: 15, savanna: 5, water: 1, urbanOther: 1 },
    mainCrops: ['Papa', 'Zanahoria', 'Café de Especialidad', 'Ajo', 'Fresas', 'Flores'],
    soilTexture: 'Franco con alta materia orgánica',
    organicMatterPct: 5.8,
    fertilityLevel: 'Alta'
  },
  {
    id: 'tachira',
    name: 'Táchira',
    capital: 'San Cristóbal',
    region: 'Los Andes',
    center: [7.8, -72.2],
    areaKm2: 11100,
    dominantSoil: 'Inceptisols Andinos',
    avgPh: 5.4,
    annualRainfallMm: 1750,
    elevationM: 1200,
    mapbiomasCover: { forest: 55, pasture: 26, agriculture: 14, savanna: 3, water: 1, urbanOther: 1 },
    mainCrops: ['Café', 'Caña Panelera', 'Pasturas de Altura', 'Hortalizas', 'Frutales'],
    soilTexture: 'Franco-arcilloso',
    organicMatterPct: 4.6,
    fertilityLevel: 'Media'
  },
  {
    id: 'lara',
    name: 'Lara',
    capital: 'Barquisimeto',
    region: 'Centro Occidental',
    center: [10.0, -69.6],
    areaKm2: 19800,
    dominantSoil: 'Aridisols / Alfisols Semiáridos',
    avgPh: 7.4,
    annualRainfallMm: 650,
    elevationM: 550,
    mapbiomasCover: { forest: 28, pasture: 32, agriculture: 25, savanna: 12, water: 1, urbanOther: 2 },
    mainCrops: ['Cebolla', 'Pimentón', 'Tomate', 'Caña de Azúcar (Valle del Turbio)', 'Piña', 'Agave Cocui'],
    soilTexture: 'Franco-arenoso a calcáreo',
    organicMatterPct: 1.7,
    fertilityLevel: 'Media'
  },
  {
    id: 'yaracuy',
    name: 'Yaracuy',
    capital: 'San Felipe',
    region: 'Centro Occidental',
    center: [10.35, -68.75],
    areaKm2: 7100,
    dominantSoil: 'Mollisols / Inceptisols Aluviales',
    avgPh: 6.6,
    annualRainfallMm: 1400,
    elevationM: 250,
    mapbiomasCover: { forest: 46, pasture: 22, agriculture: 28, savanna: 2, water: 1, urbanOther: 1 },
    mainCrops: ['Naranja / Cítricos', 'Aguacate (Hass/Criollo)', 'Plátano', 'Caña de Azúcar', 'Maíz'],
    soilTexture: 'Franco-limoso muy fértil',
    organicMatterPct: 3.5,
    fertilityLevel: 'Alta'
  },
  {
    id: 'monagas',
    name: 'Monagas',
    capital: 'Maturín',
    region: 'Nororiental',
    center: [9.6, -63.2],
    areaKm2: 28900,
    dominantSoil: 'Ultisols / Oxisols de Mesas Orientales',
    avgPh: 4.8,
    annualRainfallMm: 1350,
    elevationM: 70,
    mapbiomasCover: { forest: 38, pasture: 26, agriculture: 22, savanna: 10, water: 3, urbanOther: 1 },
    mainCrops: ['Soya', 'Pino Caribe', 'Palma Aceitera', 'Maíz', 'Pasturas Ácidas'],
    soilTexture: 'Arenoso a franco-arenoso muy ácido',
    organicMatterPct: 1.4,
    fertilityLevel: 'Baja'
  },
  {
    id: 'anzoategui',
    name: 'Anzoátegui',
    capital: 'Barcelona',
    region: 'Nororiental',
    center: [8.9, -64.4],
    areaKm2: 43300,
    dominantSoil: 'Entisols / Ultisols de Mesa',
    avgPh: 5.1,
    annualRainfallMm: 1050,
    elevationM: 90,
    mapbiomasCover: { forest: 22, pasture: 38, agriculture: 20, savanna: 17, water: 2, urbanOther: 1 },
    mainCrops: ['Maní', 'Sorgo', 'Soya', 'Melón', 'Ganadería'],
    soilTexture: 'Arenoso',
    organicMatterPct: 1.2,
    fertilityLevel: 'Baja'
  },
  {
    id: 'cojedes',
    name: 'Cojedes',
    capital: 'San Carlos',
    region: 'Los Llanos Centrales',
    center: [9.3, -68.3],
    areaKm2: 14800,
    dominantSoil: 'Vertisols / Inceptisols',
    avgPh: 6.3,
    annualRainfallMm: 1450,
    elevationM: 120,
    mapbiomasCover: { forest: 26, pasture: 46, agriculture: 21, savanna: 5, water: 1, urbanOther: 1 },
    mainCrops: ['Arroz', 'Maíz', 'Tabaco', 'Pastizales para Carne'],
    soilTexture: 'Franco-arcilloso',
    organicMatterPct: 2.4,
    fertilityLevel: 'Media'
  },
  {
    id: 'falcon',
    name: 'Falcón',
    capital: 'Coro',
    region: 'Centro Occidental',
    center: [11.2, -69.7],
    areaKm2: 24800,
    dominantSoil: 'Aridisols / Entisols Costeros',
    avgPh: 7.8,
    annualRainfallMm: 450,
    elevationM: 30,
    mapbiomasCover: { forest: 24, pasture: 30, agriculture: 16, savanna: 26, water: 2, urbanOther: 2 },
    mainCrops: ['Melón', 'Patilla', 'Cebolla', 'Caprinos/Ovinos', 'Sábila (Aloe Vera)'],
    soilTexture: 'Franco-arenoso a salino',
    organicMatterPct: 1.1,
    fertilityLevel: 'Baja'
  },
  {
    id: 'bolivar',
    name: 'Bolívar',
    capital: 'Ciudad Bolívar',
    region: 'Guayana',
    center: [6.5, -63.5],
    areaKm2: 240520,
    dominantSoil: 'Oxisols del Escudo Guayanés',
    avgPh: 4.6,
    annualRainfallMm: 2400,
    elevationM: 220,
    mapbiomasCover: { forest: 78, pasture: 8, agriculture: 3, savanna: 8, water: 3, urbanOther: 0.5 },
    mainCrops: ['Yuca Amarga/Dulce', 'Cacao Amazónico', 'Frutales Amazónicos (Copaoazú)', 'Pasturas'],
    soilTexture: 'Arenoso-arcilloso ácido',
    organicMatterPct: 2.9,
    fertilityLevel: 'Baja'
  },
  {
    id: 'miranda',
    name: 'Miranda',
    capital: 'Los Teques',
    region: 'Capital / Central',
    center: [10.25, -66.5],
    areaKm2: 7950,
    dominantSoil: 'Inceptisols de Barlovento y Altos',
    avgPh: 6.2,
    annualRainfallMm: 1600,
    elevationM: 300,
    mapbiomasCover: { forest: 58, pasture: 14, agriculture: 18, savanna: 2, water: 2, urbanOther: 6 },
    mainCrops: ['Cacao Barlovento (Carenero Superior)', 'Plátano', 'Hortalizas de Altura', 'Flores'],
    soilTexture: 'Franco-arcillo-limoso',
    organicMatterPct: 4.0,
    fertilityLevel: 'Alta'
  },
  {
    id: 'sucre',
    name: 'Sucre',
    capital: 'Cumaná',
    region: 'Nororiental',
    center: [10.4, -63.4],
    areaKm2: 11800,
    dominantSoil: 'Inceptisols / Alfisols de Paria',
    avgPh: 6.1,
    annualRainfallMm: 1500,
    elevationM: 100,
    mapbiomasCover: { forest: 64, pasture: 12, agriculture: 18, savanna: 2, water: 2, urbanOther: 2 },
    mainCrops: ['Cacao Río Caribe/Paria', 'Café', 'Coco', 'Caña de Azúcar'],
    soilTexture: 'Franco-arcilloso',
    organicMatterPct: 3.7,
    fertilityLevel: 'Alta'
  },
  {
    id: 'trujillo',
    name: 'Trujillo',
    capital: 'Trujillo',
    region: 'Los Andes',
    center: [9.35, -70.45],
    areaKm2: 7400,
    dominantSoil: 'Andisols / Inceptisols',
    avgPh: 5.5,
    annualRainfallMm: 1650,
    elevationM: 950,
    mapbiomasCover: { forest: 52, pasture: 24, agriculture: 20, savanna: 2, water: 1, urbanOther: 1 },
    mainCrops: ['Café', 'Plátano', 'Hortalizas', 'Piña', 'Caña Panelera'],
    soilTexture: 'Franco',
    organicMatterPct: 4.3,
    fertilityLevel: 'Media'
  }
];

// Puntos de muestreo geoespacial de alta fidelidad para el visor GIS
export const SAMPLE_SOIL_POINTS: SoilSamplePoint[] = [
  {
    id: 'sp-01',
    code: 'AGRO-ZUL-042',
    farmName: 'Hacienda San José - Sur del Lago',
    state: 'Zulia',
    municipality: 'Colón',
    coords: [8.985, -71.724],
    date: '2026-02-10',
    ph: 5.4,
    organicMatter: 4.8,
    nitrogen: 0.22,
    phosphorus: 14.5,
    potassium: 160.0,
    texture: 'Franco-Arcilloso',
    suitabilityScore: 94,
    recommendedCrop: 'Plátano / Cacao Porcelana'
  },
  {
    id: 'sp-02',
    code: 'AGRO-POR-108',
    farmName: 'Finca Agropecuaria La Espiga',
    state: 'Portuguesa',
    municipality: 'Turén',
    coords: [9.324, -69.112],
    date: '2026-03-01',
    ph: 6.5,
    organicMatter: 3.4,
    nitrogen: 0.16,
    phosphorus: 22.0,
    potassium: 210.0,
    texture: 'Franco-Limoso',
    suitabilityScore: 98,
    recommendedCrop: 'Maíz Blanco / Soya'
  },
  {
    id: 'sp-03',
    code: 'AGRO-GUA-077',
    farmName: 'Parcela 14 - Sistema de Riego Calabozo',
    state: 'Guárico',
    municipality: 'Miranda',
    coords: [8.924, -67.432],
    date: '2026-01-20',
    ph: 6.9,
    organicMatter: 2.2,
    nitrogen: 0.11,
    phosphorus: 9.8,
    potassium: 140.0,
    texture: 'Arcilloso',
    suitabilityScore: 91,
    recommendedCrop: 'Arroz Inundado'
  },
  {
    id: 'sp-04',
    code: 'AGRO-MER-019',
    farmName: 'Finca El Páramo',
    state: 'Mérida',
    municipality: 'Rangel (Mucuchíes)',
    coords: [8.752, -70.912],
    date: '2026-02-18',
    ph: 5.1,
    organicMatter: 6.2,
    nitrogen: 0.28,
    phosphorus: 18.2,
    potassium: 110.0,
    texture: 'Franco-Arenoso Andino',
    suitabilityScore: 89,
    recommendedCrop: 'Papa / Ajo'
  },
  {
    id: 'sp-05',
    code: 'AGRO-ARA-031',
    farmName: 'Hacienda Cacao Chuao',
    state: 'Aragua',
    municipality: 'Santiago Mariño',
    coords: [10.495, -67.531],
    date: '2026-01-14',
    ph: 6.6,
    organicMatter: 4.2,
    nitrogen: 0.19,
    phosphorus: 16.4,
    potassium: 185.0,
    texture: 'Franco Aluvial',
    suitabilityScore: 97,
    recommendedCrop: 'Cacao Fino de Aroma'
  },
  {
    id: 'sp-06',
    code: 'AGRO-BAR-055',
    farmName: 'Fundo Santa Inés',
    state: 'Barinas',
    municipality: 'Barinas',
    coords: [8.481, -70.145],
    date: '2026-03-05',
    ph: 5.7,
    organicMatter: 2.6,
    nitrogen: 0.12,
    phosphorus: 8.0,
    potassium: 95.0,
    texture: 'Franco-Arenoso',
    suitabilityScore: 86,
    recommendedCrop: 'Maíz / Pasturas Brizantha'
  },
  {
    id: 'sp-07',
    code: 'AGRO-MON-089',
    farmName: 'Plantación Mesa de Guanipa',
    state: 'Monagas',
    municipality: 'Aguasay',
    coords: [9.421, -63.782],
    date: '2026-02-25',
    ph: 4.7,
    organicMatter: 1.3,
    nitrogen: 0.07,
    phosphorus: 5.2,
    potassium: 55.0,
    texture: 'Arenoso Ácido',
    suitabilityScore: 72,
    recommendedCrop: 'Soya (con Encalado) / Pino Caribe'
  },
  {
    id: 'sp-08',
    code: 'AGRO-LAR-063',
    farmName: 'Valle de Quíbor - Fundo El Cují',
    state: 'Lara',
    municipality: 'Jiménez',
    coords: [9.932, -69.621],
    date: '2026-01-29',
    ph: 7.6,
    organicMatter: 1.8,
    nitrogen: 0.10,
    phosphorus: 21.0,
    potassium: 240.0,
    texture: 'Franco-Calcáreo',
    suitabilityScore: 92,
    recommendedCrop: 'Cebolla / Pimentón (Riego por Goteo)'
  }
];

// Definición y paleta oficial de clases MapBiomas Venezuela
export const MAPBIOMAS_CLASSES = [
  { id: 'forest', name: 'Formaciones Boscosas', color: '#129912', description: 'Bosques densos, nublados y de galería' },
  { id: 'pasture', name: 'Pastizales y Ganadería', color: '#ffd966', description: 'Pasturas cultivadas y mosaicos pecuarios' },
  { id: 'agriculture', name: 'Agricultura y Cultivos', color: '#e974ed', description: 'Cultivos anuales (maíz, arroz) y perennes (cacao, café, caña)' },
  { id: 'savanna', name: 'Sabanas y No Boscosas', color: '#bbfcac', description: 'Sabanas naturales de los llanos y tepuyes' },
  { id: 'water', name: 'Cuerpos de Agua', color: '#0064ff', description: 'Ríos, lagos, lagunas y represas' },
  { id: 'urbanOther', name: 'Urbano e Infraestructura', color: '#af2a2a', description: 'Ciudades, vías, minería e infraestructura' }
];

// Rangos de clasificación de pH edafológico
export const SOIL_PH_RANGES = [
  { label: 'Muy Ácido (< 5.5)', color: '#ef4444', desc: 'Requiere encalado obligatorio (Sur del Lago, Monagas, Guayana)' },
  { label: 'Ligeramente Ácido (5.5 - 6.5)', color: '#f59e0b', desc: 'Apto para café, maíz, plátano y leguminosas' },
  { label: 'Óptimo / Neutro (6.5 - 7.5)', color: '#10b981', desc: 'Excelente disponibilidad nutricional (Portuguesa, Aragua)' },
  { label: 'Alcalino / Calcáreo (> 7.5)', color: '#3b82f6', desc: 'Suelos semiáridos (Lara, Falcón)' }
];
