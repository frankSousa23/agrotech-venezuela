/**
 * Catálogo Geoespacial de Municipios Agrícolas Clave de Venezuela 🌾🇻🇪
 * Representa la escala meso (Nivel 2) del WebGIS Agrotech.
 */

import { VENEZUELA_STATES_DATA } from './venezuelaData';

export interface MunicipalityGeoData {
  id: string;
  name: string;
  stateId: string;
  capital: string;
  center: [number, number]; // [lat, lng]
  bounds: [[number, number], [number, number]];
  mainCrops: string[];
  soilTexture: string;
  avgPh: number;
  annualRainfallMm: number;
  hasIrrigationSystem: boolean;
  agriculturalHighlights: string;
}

export const VENEZUELA_MUNICIPALITIES_DATA: MunicipalityGeoData[] = [
  // PORTUGUESA (El Granero de Venezuela)
  {
    id: "turen",
    name: "Turén",
    stateId: "portuguesa",
    capital: "Villa Bruzual",
    center: [9.324, -69.112],
    bounds: [[9.15, -69.30], [9.50, -68.90]],
    mainCrops: ["Maíz Blanco Harinero", "Soya / Oleaginosas", "Ajonjolí", "Girasol"],
    soilTexture: "Franco-limoso (Inceptisol fértil)",
    avgPh: 6.2,
    annualRainfallMm: 1550,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Epicentro cerealero nacional con más de 120.000 ha de cultivo intensivo mecanizado."
  },
  {
    id: "santa_rosalia",
    name: "Santa Rosalía",
    stateId: "portuguesa",
    capital: "El Playón",
    center: [9.280, -68.950],
    bounds: [[9.10, -69.10], [9.45, -68.75]],
    mainCrops: ["Arroz de Riego / Secano", "Maíz Blanco Harinero", "Soya"],
    soilTexture: "Vertisol Arcilloso",
    avgPh: 6.0,
    annualRainfallMm: 1600,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Principal productor de arroz de secano y maíz en los llanos occidentales bajos."
  },
  {
    id: "esteller",
    name: "Esteller",
    stateId: "portuguesa",
    capital: "Píritu",
    center: [9.370, -69.180],
    bounds: [[9.25, -69.35], [9.55, -69.05]],
    mainCrops: ["Maíz Blanco Harinero", "Sorgo Granífero", "Caña de Azúcar"],
    soilTexture: "Franco",
    avgPh: 6.1,
    annualRainfallMm: 1500,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Zona de alta tecnificación agrícola y rotación maíz-oleaginosas."
  },
  {
    id: "paez_portuguesa",
    name: "Páez",
    stateId: "portuguesa",
    capital: "Acarigua",
    center: [9.550, -69.200],
    bounds: [[9.40, -69.35], [9.70, -69.05]],
    mainCrops: ["Caña de Azúcar", "Maíz", "Pasturas Tropicales"],
    soilTexture: "Franco-arcilloso",
    avgPh: 6.3,
    annualRainfallMm: 1450,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Nodo agroindustrial y de procesamiento de granos y azúcar más grande del país."
  },
  {
    id: "guanare",
    name: "Guanare",
    stateId: "portuguesa",
    capital: "Guanare",
    center: [9.040, -69.740],
    bounds: [[8.85, -69.95], [9.25, -69.50]],
    mainCrops: ["Caña de Azúcar", "Maíz", "Ganadería Bovina"],
    soilTexture: "Franco-aluvial",
    avgPh: 6.4,
    annualRainfallMm: 1650,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Valle fértil del Río Guanare con intensa producción cañera y ganadera."
  },

  // GUÁRICO (El Corazón de los Llanos y Arroz)
  {
    id: "francisco_de_miranda_guarico",
    name: "Francisco de Miranda",
    stateId: "guarico",
    capital: "Calabozo",
    center: [8.924, -67.428],
    bounds: [[8.65, -67.75], [9.20, -67.15]],
    mainCrops: ["Arroz de Riego / Secano", "Maíz", "Piscicultura"],
    soilTexture: "Vertisol Arcilloso pesado",
    avgPh: 6.8,
    annualRainfallMm: 1300,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Sistema de Riego Río Guárico (SRRG) con 40.000 ha de arroz bajo inundación controlada."
  },
  {
    id: "zaraza",
    name: "Pedro Zaraza",
    stateId: "guarico",
    capital: "Zaraza",
    center: [9.350, -65.320],
    bounds: [[9.10, -65.60], [9.60, -65.05]],
    mainCrops: ["Maíz Amarillo", "Sorgo", "Ganadería Bovina Carne"],
    soilTexture: "Franco-arenoso (Oxisol/Ultisol)",
    avgPh: 5.5,
    annualRainfallMm: 1100,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Llanos orientales de Guárico con sabanas dedicadas a cereales y cría extensiva."
  },
  {
    id: "leonardo_infante",
    name: "Leonardo Infante",
    stateId: "guarico",
    capital: "Valle de la Pascua",
    center: [9.210, -66.010],
    bounds: [[8.90, -66.30], [9.50, -65.70]],
    mainCrops: ["Maíz", "Sorgo", "Ganadería Doble Propósito"],
    soilTexture: "Franco",
    avgPh: 5.8,
    annualRainfallMm: 1200,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Centro de acopio y comercialización ganadera y cerealera del centro-oriente."
  },

  // ZULIA (Sur del Lago & Cuenca Lechera)
  {
    id: "colon_zulia",
    name: "Colón",
    stateId: "zulia",
    capital: "San Carlos del Zulia",
    center: [8.985, -71.724],
    bounds: [[8.70, -72.00], [9.25, -71.45]],
    mainCrops: ["Plátano / Banano", "Palma Aceitera", "Lácteos / Ganadería"],
    soilTexture: "Franco-arcilloso aluvial",
    avgPh: 5.4,
    annualRainfallMm: 2200,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Principal cuenca platanera de exportación y ganadería de alta producción láctea."
  },
  {
    id: "sucre_zulia",
    name: "Sucre (Sur del Lago)",
    stateId: "zulia",
    capital: "Bobures",
    center: [9.230, -71.180],
    bounds: [[9.00, -71.40], [9.45, -70.95]],
    mainCrops: ["Caña de Azúcar", "Cacao Criollo Fino de Aroma", "Plátano"],
    soilTexture: "Franco-limoso",
    avgPh: 6.2,
    annualRainfallMm: 2400,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Hogar del histórico Central Azucarero Venezuela y plantaciones de cacao fino ancestral."
  },
  {
    id: "rosario_de_perija",
    name: "Rosario de Perijá",
    stateId: "zulia",
    capital: "La Villa del Rosario",
    center: [10.320, -72.310],
    bounds: [[10.10, -72.60], [10.55, -72.00]],
    mainCrops: ["Ganadería de Carne", "Leche", "Pasturas Tropicales", "Yuca"],
    soilTexture: "Franco",
    avgPh: 5.7,
    annualRainfallMm: 1600,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Capital ganadera de la subregión Perijá con genética bovina adaptada al trópico."
  },

  // BARINAS (Piedemonte Andino-Llanero)
  {
    id: "pedraza",
    name: "Pedraza",
    stateId: "barinas",
    capital: "Ciudad Bolivia",
    center: [8.350, -70.580],
    bounds: [[8.10, -70.90], [8.60, -70.30]],
    mainCrops: ["Plátano", "Arroz", "Ganadería Bovina Doble Propósito", "Cacao"],
    soilTexture: "Franco-arenoso aluvial",
    avgPh: 5.6,
    annualRainfallMm: 2100,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Abundancia hídrica de los ríos andinos con excelente aptitud forrajera y platanera."
  },
  {
    id: "ezequiel_zamora_barinas",
    name: "Ezequiel Zamora",
    stateId: "barinas",
    capital: "Santa Bárbara",
    center: [7.820, -71.180],
    bounds: [[7.55, -71.50], [8.10, -70.85]],
    mainCrops: ["Palma Aceitera", "Ganadería", "Piscicultura (Cachama)"],
    soilTexture: "Franco-arcilloso ácido",
    avgPh: 5.2,
    annualRainfallMm: 2500,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Eje agroindustrial de palma africana y granjas acuícolas de agua dulce."
  },

  // LARA (Valles de Riego & Ganadería Especializada)
  {
    id: "jimenez_lara",
    name: "Jiménez",
    stateId: "lara",
    capital: "Quíbor",
    center: [9.930, -69.620],
    bounds: [[9.75, -69.85], [10.15, -69.40]],
    mainCrops: ["Cebolla", "Tomate", "Pimentón", "Melón"],
    soilTexture: "Franco-calcáreo",
    avgPh: 7.6,
    annualRainfallMm: 600,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Valle de Quíbor: principal productor nacional de cebolla y hortalizas bajo riego presurizado."
  },
  {
    id: "torres_lara",
    name: "Torres",
    stateId: "lara",
    capital: "Carora",
    center: [10.170, -70.080],
    bounds: [[9.80, -70.50], [10.50, -69.70]],
    mainCrops: ["Ganadería Raza Carora (Leche)", "Caña de Azúcar", "Uva de Vino"],
    soilTexture: "Franco-arcilloso",
    avgPh: 7.2,
    annualRainfallMm: 750,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Cuna de la Raza Carora (bovino lechero tropical) y viñedos de renombre internacional."
  },

  // MÉRIDA (Agricultura de Piso Alto y Valles)
  {
    id: "rangel_merida",
    name: "Rangel",
    stateId: "merida",
    capital: "Mucuchíes",
    center: [8.750, -70.920],
    bounds: [[8.60, -71.10], [8.90, -70.75]],
    mainCrops: ["Papa Semilla y Comercial", "Zanahoria", "Ajo", "Hortalizas de Hoja"],
    soilTexture: "Franco-arenoso andino (Andisol)",
    avgPh: 5.5,
    annualRainfallMm: 1100,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Páramo merideño: principal reservorio de semilla de papa y hortalizas de altura de Venezuela."
  },
  {
    id: "alberto_adriani",
    name: "Alberto Adriani",
    stateId: "merida",
    capital: "El Vigía",
    center: [8.620, -71.650],
    bounds: [[8.45, -71.85], [8.80, -71.45]],
    mainCrops: ["Plátano", "Frutales Tropicales (Lechosa, Maracuyá)", "Palma"],
    soilTexture: "Franco",
    avgPh: 5.8,
    annualRainfallMm: 2300,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Nodo logístico y de distribución agroalimentaria del occidente andino-zuliano."
  },

  // TÁCHIRA (Hortalizas y Café Especialidad)
  {
    id: "jauregui_tachira",
    name: "Jáuregui",
    stateId: "tachira",
    capital: "La Grita",
    center: [8.130, -71.980],
    bounds: [[7.95, -72.15], [8.30, -71.80]],
    mainCrops: ["Ferias de Hortalizas (Papa, Zanahoria, Repollo, Cebollín)"],
    soilTexture: "Franco",
    avgPh: 5.7,
    annualRainfallMm: 1350,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Centro de las Ferias del Consumo: abastece el 60% de las hortalizas frescas consumidas en Caracas y el centro."
  },
  {
    id: "junin_tachira",
    name: "Junín",
    stateId: "tachira",
    capital: "Rubio",
    center: [7.710, -72.350],
    bounds: [[7.55, -72.50], [7.90, -72.20]],
    mainCrops: ["Café Arábica Especialidad", "Cacao", "Caña Panelera"],
    soilTexture: "Franco-arcilloso de ladera",
    avgPh: 5.3,
    annualRainfallMm: 1800,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Histórica ciudad pontálida del café venezolano con microclimas excepcionales."
  },

  // MONAGAS & ANZOÁTEGUI (Oriente Cerealero y Sabana)
  {
    id: "maturin_monagas",
    name: "Maturín",
    stateId: "monagas",
    capital: "Maturín",
    center: [9.745, -63.185],
    bounds: [[9.40, -63.55], [10.10, -62.80]],
    mainCrops: ["Soya / Oleaginosas", "Maíz", "Palma Aceitera", "Pino Caribe"],
    soilTexture: "Franco-arenoso (Ultisol muy ácido)",
    avgPh: 4.9,
    annualRainfallMm: 1400,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Frontera agrícola oriental con suelos ácidos altamente respondedores al encalado dolomítico."
  },
  {
    id: "aragua_de_barcelona_anzoategui",
    name: "Aragua",
    stateId: "anzoategui",
    capital: "Aragua de Barcelona",
    center: [9.450, -64.830],
    bounds: [[9.20, -65.10], [9.70, -64.55]],
    mainCrops: ["Maíz Amarillo", "Sorgo", "Ganadería Bovina"],
    soilTexture: "Franco-arcilloso",
    avgPh: 5.6,
    annualRainfallMm: 1150,
    hasIrrigationSystem: false,
    agriculturalHighlights: "Mesas de Anzoátegui con topografía plana ideal para siembra directa a gran escala."
  },

  // ARAGUA & YARACUY (Valles Centrales y Cacao)
  {
    id: "costa_de_oro_aragua",
    name: "Costa de Oro",
    stateId: "aragua",
    capital: "Ocumare de la Costa",
    center: [10.491, -67.531],
    bounds: [[10.35, -67.75], [10.60, -67.35]],
    mainCrops: ["Cacao Criollo Fino de Aroma (Choroní / Ocumare)", "Plátano", "Frutales"],
    soilTexture: "Franco-aluvial costero",
    avgPh: 6.4,
    annualRainfallMm: 1750,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Cuna del Cacao Criollo Chuao y Ocumare 61, reconocido mundialmente como el más aromático del planeta."
  },
  {
    id: "bruzual_yaracuy",
    name: "Bruzual",
    stateId: "yaracuy",
    capital: "Chivacoa",
    center: [10.160, -68.900],
    bounds: [[10.00, -69.05], [10.35, -68.75]],
    mainCrops: ["Maíz Blanco Harinero", "Caña de Azúcar", "Cítricos"],
    soilTexture: "Franco fértil aluvial",
    avgPh: 6.3,
    annualRainfallMm: 1400,
    hasIrrigationSystem: true,
    agriculturalHighlights: "Valle del Río Yaracuy con altísimos rendimientos por hectárea en maíz blanco."
  }
];

export function getMunicipalitiesByState(stateId: string): MunicipalityGeoData[] {
  const munis = VENEZUELA_MUNICIPALITIES_DATA.filter(m => m.stateId.toLowerCase() === stateId.toLowerCase());
  if (munis.length > 0) return munis;

  const st = VENEZUELA_STATES_DATA.find(s => s.id.toLowerCase() === stateId.toLowerCase());
  if (st) {
    return [{
      id: `${st.id}_capital`,
      name: `Distrito Agrícola ${st.capital}`,
      stateId: st.id,
      capital: st.capital,
      center: st.center,
      bounds: st.bounds,
      mainCrops: st.mainCrops,
      soilTexture: st.soilTextureDominant || 'Franco',
      avgPh: st.averagePh || 6.2,
      annualRainfallMm: st.annualRainfallMm || 1200,
      hasIrrigationSystem: false,
      agriculturalHighlights: `Polo agrícola y pecuario principal del Estado ${st.name} (${st.region}).`
    }];
  }
  return [];
}

export function getMunicipalityById(id: string): MunicipalityGeoData | undefined {
  return VENEZUELA_MUNICIPALITIES_DATA.find(m => m.id.toLowerCase() === id.toLowerCase());
}
