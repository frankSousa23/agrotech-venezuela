import { VENEZUELA_MUNICIPALITIES_DATA, getMunicipalitiesByState, getMunicipalityById } from '@/lib/geo/venezuelaMunicipalities';
import { VENEZUELA_MUNICIPALITIES_GEOJSON, getMunicipalGeoJsonByState } from '@/lib/geo/venezuelaMunicipalitiesGeoJson';

describe('Municipalities & Multi-Level GeoJSON Suite', () => {
  it('debe contener municipios agrícolas para los principales estados productores', () => {
    expect(VENEZUELA_MUNICIPALITIES_DATA.length).toBeGreaterThanOrEqual(10);
    
    const turen = getMunicipalityById('turen');
    expect(turen).toBeDefined();
    expect(turen?.name).toBe('Turén');
    expect(turen?.stateId).toBe('portuguesa');
    expect(turen?.mainCrops).toContain('Maíz Blanco Harinero');
    expect(turen?.avgPh).toBeCloseTo(6.2, 1);
  });

  it('debe filtrar municipios correctamente por estado', () => {
    const portuguesaMunis = getMunicipalitiesByState('portuguesa');
    expect(portuguesaMunis.length).toBeGreaterThanOrEqual(3);
    expect(portuguesaMunis.some(m => m.id === 'turen')).toBe(true);
    expect(portuguesaMunis.some(m => m.id === 'santa_rosalia')).toBe(true);

    const guaricoMunis = getMunicipalitiesByState('guarico');
    expect(guaricoMunis.some(m => m.name.includes('Miranda') || m.id.includes('miranda'))).toBe(true);
  });

  it('debe generar geometrías GeoJSON válidas para los municipios', () => {
    expect(VENEZUELA_MUNICIPALITIES_GEOJSON.type).toBe('FeatureCollection');
    expect(VENEZUELA_MUNICIPALITIES_GEOJSON.features.length).toBe(VENEZUELA_MUNICIPALITIES_DATA.length);

    const firstFeature = VENEZUELA_MUNICIPALITIES_GEOJSON.features[0];
    expect(firstFeature.geometry.type).toBe('Polygon');
    expect(firstFeature.geometry.coordinates[0].length).toBe(5); // Polígono cerrado de 4 vértices + cierre
  });

  it('debe obtener colección GeoJSON filtrada por estado', () => {
    const geoPortuguesa = getMunicipalGeoJsonByState('portuguesa');
    expect(geoPortuguesa.type).toBe('FeatureCollection');
    expect(geoPortuguesa.features.every(f => f.properties.stateId === 'portuguesa')).toBe(true);
  });
});
