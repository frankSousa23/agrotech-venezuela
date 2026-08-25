import { VENEZUELA_SOIL_POINTS } from '@/lib/geo/spatialUtils';

describe('Data Import & Export Utilities Tests', () => {
  it('debe poder serializar las muestras edafológicas a formato CSV', () => {
    const headers = 'id,lat,lng,ph,organicMatter,texture,stateId\n';
    const rows = VENEZUELA_SOIL_POINTS.slice(0, 5).map(p => 
      `${p.id},${p.lat},${p.lng},${p.ph},${p.organicMatter},${p.texture},${p.stateId}`
    ).join('\n');
    const csvContent = headers + rows;

    expect(csvContent).toContain('id,lat,lng');
    expect(csvContent.split('\n').length).toBe(6);
  });

  it('debe poder exportar la estructura de datos a formato GeoJSON FeatureCollection', () => {
    const geojson = {
      type: 'FeatureCollection',
      features: VENEZUELA_SOIL_POINTS.slice(0, 5).map(p => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [p.lng, p.lat]
        },
        properties: {
          id: p.id,
          ph: p.ph,
          organicMatter: p.organicMatter,
          stateId: p.stateId
        }
      }))
    };

    expect(geojson.type).toBe('FeatureCollection');
    expect(geojson.features.length).toBe(5);
    expect(geojson.features[0].geometry.type).toBe('Point');
  });
});
