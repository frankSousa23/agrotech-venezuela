import { VENEZUELA_MUNICIPALITIES_DATA } from './venezuelaMunicipalities';

export interface MunicipalFeature {
  type: 'Feature';
  id: string;
  properties: {
    id: string;
    name: string;
    stateId: string;
    capital: string;
    mainCrops: string[];
    soilTexture: string;
    avgPh: number;
    annualRainfallMm: number;
    hasIrrigationSystem: boolean;
    agriculturalHighlights: string;
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][]; // [lng, lat] GeoJSON format
  };
}

export interface MunicipalFeatureCollection {
  type: 'FeatureCollection';
  features: MunicipalFeature[];
}

export const VENEZUELA_MUNICIPALITIES_GEOJSON: MunicipalFeatureCollection = {
  type: 'FeatureCollection',
  features: VENEZUELA_MUNICIPALITIES_DATA.map(m => {
    const [[latMin, lngMin], [latMax, lngMax]] = m.bounds;
    return {
      type: 'Feature',
      id: m.id,
      properties: {
        id: m.id,
        name: m.name,
        stateId: m.stateId,
        capital: m.capital,
        mainCrops: m.mainCrops,
        soilTexture: m.soilTexture,
        avgPh: m.avgPh,
        annualRainfallMm: m.annualRainfallMm,
        hasIrrigationSystem: m.hasIrrigationSystem,
        agriculturalHighlights: m.agriculturalHighlights
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [lngMin, latMin],
          [lngMax, latMin],
          [lngMax, latMax],
          [lngMin, latMax],
          [lngMin, latMin]
        ]]
      }
    };
  })
};

export function getMunicipalGeoJsonByState(stateId: string): MunicipalFeatureCollection {
  return {
    type: 'FeatureCollection',
    features: VENEZUELA_MUNICIPALITIES_GEOJSON.features.filter(f => f.properties.stateId.toLowerCase() === stateId.toLowerCase())
  };
}
