import { VENEZUELA_STATES_DATA } from './venezuelaData';

export const VENEZUELA_GEOJSON = {
  type: "FeatureCollection",
  features: VENEZUELA_STATES_DATA.map(state => ({
    type: "Feature",
    id: state.id,
    properties: {
      id: state.id,
      name: state.name,
      region: state.region,
      capital: state.capital,
      annualRainfallMm: state.annualRainfallMm,
      averageTempC: state.averageTempC,
      mainCrops: state.mainCrops,
      soilTextureDominant: state.soilTextureDominant,
      averagePh: state.averagePh,
      mapbiomasCoverPercentage: state.mapbiomasCoverPercentage
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [state.bounds[0][1], state.bounds[0][0]], // [lng, lat]
          [state.bounds[1][1], state.bounds[0][0]],
          [state.bounds[1][1], state.bounds[1][0]],
          [state.bounds[0][1], state.bounds[1][0]],
          [state.bounds[0][1], state.bounds[0][0]]
        ]
      ]
    }
  }))
};
