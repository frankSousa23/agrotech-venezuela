import { VENEZUELA_STATES_DATA } from './venezuelaData';

export interface GeoJsonFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    region: string;
    dominantSoil: string;
    avgPh: number;
    annualRainfallMm: number;
    mapbiomasCover: {
      forest: number;
      pasture: number;
      agriculture: number;
      savanna: number;
      water: number;
      urbanOther: number;
    };
    mainCrops: string[];
    soilTexture: string;
    fertilityLevel: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][]; // [lng, lat] GeoJSON format
  };
}

export interface GeoJsonFeatureCollection {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

// Polígonos vectoriales representativos optimizados de los estados venezolanos
export const VENEZUELA_GEOJSON: GeoJsonFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "zulia",
        name: "Zulia",
        region: "Zuliana",
        dominantSoil: "Inceptisols / Entisols (Sur del Lago)",
        avgPh: 5.6,
        annualRainfallMm: 1450,
        mapbiomasCover: { forest: 32, pasture: 41, agriculture: 14, savanna: 3, water: 8, urbanOther: 2 },
        mainCrops: ["Plátano", "Palma Aceitera", "Pastos", "Cacao Porcelana"],
        soilTexture: "Franco-arcilloso",
        fertilityLevel: "Alta"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-71.3, 11.8],
          [-71.0, 11.2],
          [-70.8, 10.5],
          [-70.9, 9.8],
          [-71.1, 9.1],
          [-71.4, 8.5],
          [-72.4, 8.4],
          [-72.6, 9.3],
          [-73.3, 9.8],
          [-72.4, 11.2],
          [-71.8, 11.8],
          [-71.3, 11.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "portuguesa",
        name: "Portuguesa",
        region: "Los Llanos Occidentales",
        dominantSoil: "Mollisols / Alfisols (Granero de Venezuela)",
        avgPh: 6.4,
        annualRainfallMm: 1650,
        mapbiomasCover: { forest: 18, pasture: 34, agriculture: 42, savanna: 4, water: 1, urbanOther: 1 },
        mainCrops: ["Maíz Blanco", "Arroz", "Ajonjolí", "Girasol", "Caña de Azúcar"],
        soilTexture: "Franco-limoso",
        fertilityLevel: "Alta"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-69.1, 9.8],
          [-68.6, 9.3],
          [-68.8, 8.8],
          [-69.6, 8.6],
          [-70.2, 9.1],
          [-69.8, 9.7],
          [-69.1, 9.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "guarico",
        name: "Guárico",
        region: "Los Llanos Centrales",
        dominantSoil: "Vertisols / Alfisols",
        avgPh: 6.8,
        annualRainfallMm: 1200,
        mapbiomasCover: { forest: 14, pasture: 48, agriculture: 26, savanna: 9, water: 2, urbanOther: 1 },
        mainCrops: ["Arroz (Calabozo)", "Maíz", "Sorgo", "Pasturas Brachiaria"],
        soilTexture: "Arcilloso",
        fertilityLevel: "Media"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-67.5, 10.0],
          [-66.0, 9.8],
          [-65.2, 9.2],
          [-65.0, 8.3],
          [-66.2, 7.6],
          [-67.8, 7.8],
          [-68.0, 8.7],
          [-67.5, 9.5],
          [-67.5, 10.0]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "barinas",
        name: "Barinas",
        region: "Los Llanos Occidentales",
        dominantSoil: "Inceptisols / Ultisols",
        avgPh: 5.8,
        annualRainfallMm: 1800,
        mapbiomasCover: { forest: 31, pasture: 45, agriculture: 18, savanna: 4, water: 1, urbanOther: 1 },
        mainCrops: ["Plátano", "Maíz", "Arroz", "Cacao", "Ganadería"],
        soilTexture: "Franco-arenoso",
        fertilityLevel: "Media"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-70.2, 9.1],
          [-69.6, 8.6],
          [-68.8, 8.3],
          [-69.2, 7.5],
          [-70.5, 7.3],
          [-71.3, 7.8],
          [-71.1, 8.5],
          [-70.2, 9.1]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "merida",
        name: "Mérida",
        region: "Los Andes",
        dominantSoil: "Andisols de Alta Montaña",
        avgPh: 5.2,
        annualRainfallMm: 1900,
        mapbiomasCover: { forest: 62, pasture: 16, agriculture: 15, savanna: 5, water: 1, urbanOther: 1 },
        mainCrops: ["Papa", "Zanahoria", "Café de Especialidad", "Ajo", "Fresas"],
        soilTexture: "Franco con alta materia orgánica",
        fertilityLevel: "Alta"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-71.4, 9.1],
          [-70.8, 8.9],
          [-70.6, 8.4],
          [-71.2, 8.1],
          [-71.9, 8.2],
          [-72.0, 8.8],
          [-71.4, 9.1]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "aragua",
        name: "Aragua",
        region: "Central",
        dominantSoil: "Mollisols de Valles Lacustres",
        avgPh: 6.9,
        annualRainfallMm: 980,
        mapbiomasCover: { forest: 48, pasture: 18, agriculture: 22, savanna: 2, water: 4, urbanOther: 6 },
        mainCrops: ["Caña de Azúcar", "Hortalizas", "Cacao Chuao", "Frutales"],
        soilTexture: "Franco-limoso",
        fertilityLevel: "Alta"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-67.8, 10.5],
          [-67.2, 10.5],
          [-66.8, 10.1],
          [-67.0, 9.4],
          [-67.5, 9.5],
          [-67.8, 10.1],
          [-67.8, 10.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "carabobo",
        name: "Carabobo",
        region: "Central",
        dominantSoil: "Inceptisols / Alfisols",
        avgPh: 6.5,
        annualRainfallMm: 1100,
        mapbiomasCover: { forest: 44, pasture: 22, agriculture: 20, savanna: 2, water: 4, urbanOther: 8 },
        mainCrops: ["Cítricos", "Hortalizas", "Maíz", "Tubérculos"],
        soilTexture: "Franco",
        fertilityLevel: "Media"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-68.4, 10.5],
          [-67.8, 10.5],
          [-67.8, 10.0],
          [-68.0, 9.7],
          [-68.4, 9.8],
          [-68.4, 10.5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "lara",
        name: "Lara",
        region: "Centro Occidental",
        dominantSoil: "Aridisols / Alfisols Semiáridos",
        avgPh: 7.4,
        annualRainfallMm: 650,
        mapbiomasCover: { forest: 28, pasture: 32, agriculture: 25, savanna: 12, water: 1, urbanOther: 2 },
        mainCrops: ["Cebolla", "Pimentón", "Tomate", "Caña de Azúcar", "Piña"],
        soilTexture: "Franco-arenoso calcáreo",
        fertilityLevel: "Media"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-70.5, 10.8],
          [-69.3, 10.7],
          [-68.9, 10.1],
          [-69.5, 9.4],
          [-70.4, 9.6],
          [-70.8, 10.2],
          [-70.5, 10.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "yaracuy",
        name: "Yaracuy",
        region: "Centro Occidental",
        dominantSoil: "Mollisols / Inceptisols Aluviales",
        avgPh: 6.6,
        annualRainfallMm: 1400,
        mapbiomasCover: { forest: 46, pasture: 22, agriculture: 28, savanna: 2, water: 1, urbanOther: 1 },
        mainCrops: ["Cítricos", "Aguacate", "Plátano", "Caña de Azúcar"],
        soilTexture: "Franco-limoso",
        fertilityLevel: "Alta"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-69.0, 10.7],
          [-68.4, 10.6],
          [-68.3, 10.1],
          [-68.8, 10.0],
          [-69.0, 10.7]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "monagas",
        name: "Monagas",
        region: "Nororiental",
        dominantSoil: "Ultisols / Oxisols de Mesas Orientales",
        avgPh: 4.8,
        annualRainfallMm: 1350,
        mapbiomasCover: { forest: 38, pasture: 26, agriculture: 22, savanna: 10, water: 3, urbanOther: 1 },
        mainCrops: ["Soya", "Pino Caribe", "Palma Aceitera", "Maíz"],
        soilTexture: "Arenoso a franco-arenoso ácido",
        fertilityLevel: "Baja"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-63.8, 10.2],
          [-62.7, 10.1],
          [-62.3, 9.4],
          [-63.2, 8.8],
          [-64.1, 9.2],
          [-63.8, 10.2]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "anzoategui",
        name: "Anzoátegui",
        region: "Nororiental",
        dominantSoil: "Entisols / Ultisols de Mesa",
        avgPh: 5.1,
        annualRainfallMm: 1050,
        mapbiomasCover: { forest: 22, pasture: 38, agriculture: 20, savanna: 17, water: 2, urbanOther: 1 },
        mainCrops: ["Maní", "Sorgo", "Soya", "Melón", "Ganadería"],
        soilTexture: "Arenoso",
        fertilityLevel: "Baja"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-65.2, 10.2],
          [-64.2, 10.2],
          [-64.1, 9.2],
          [-63.6, 8.3],
          [-64.5, 7.8],
          [-65.5, 8.4],
          [-65.2, 9.5],
          [-65.2, 10.2]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "bolivar",
        name: "Bolívar",
        region: "Guayana",
        dominantSoil: "Oxisols del Escudo Guayanés",
        avgPh: 4.6,
        annualRainfallMm: 2400,
        mapbiomasCover: { forest: 78, pasture: 8, agriculture: 3, savanna: 8, water: 3, urbanOther: 0.5 },
        mainCrops: ["Yuca", "Cacao Amazónico", "Frutales Amazónicos", "Pasturas"],
        soilTexture: "Arenoso-arcilloso ácido",
        fertilityLevel: "Baja"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-66.0, 7.8],
          [-63.5, 8.2],
          [-61.5, 8.5],
          [-60.5, 5.0],
          [-62.0, 4.0],
          [-64.5, 4.5],
          [-66.0, 6.0],
          [-66.0, 7.8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "falcon",
        name: "Falcón",
        region: "Centro Occidental",
        dominantSoil: "Aridisols / Entisols Costeros",
        avgPh: 7.8,
        annualRainfallMm: 450,
        mapbiomasCover: { forest: 24, pasture: 30, agriculture: 16, savanna: 26, water: 2, urbanOther: 2 },
        mainCrops: ["Melón", "Patilla", "Cebolla", "Caprinos", "Sábila"],
        soilTexture: "Franco-arenoso salino",
        fertilityLevel: "Baja"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-71.0, 11.9],
          [-69.8, 12.2],
          [-68.3, 11.0],
          [-68.5, 10.5],
          [-70.5, 10.6],
          [-71.0, 11.2],
          [-71.0, 11.9]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "tachira",
        name: "Táchira",
        region: "Los Andes",
        dominantSoil: "Inceptisols Andinos",
        avgPh: 5.4,
        annualRainfallMm: 1750,
        mapbiomasCover: { forest: 55, pasture: 26, agriculture: 14, savanna: 3, water: 1, urbanOther: 1 },
        mainCrops: ["Café", "Caña Panelera", "Pasturas de Altura", "Hortalizas"],
        soilTexture: "Franco-arcilloso",
        fertilityLevel: "Media"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-72.4, 8.4],
          [-71.9, 8.2],
          [-71.8, 7.5],
          [-72.4, 7.3],
          [-72.5, 8.0],
          [-72.4, 8.4]
        ]]
      }
    }
  ]
};
