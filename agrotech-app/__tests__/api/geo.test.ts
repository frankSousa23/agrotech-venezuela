import { GET } from '@/app/api/geo/route';
import { NextRequest } from 'next/server';
import { VENEZUELA_STATES_DATA, SAMPLE_SOIL_POINTS, MAPBIOMAS_CLASSES } from '@/lib/geo/venezuelaData';
import { VENEZUELA_GEOJSON } from '@/lib/geo/venezuelaGeoJson';

describe('Geo & MapBiomas Venezuela Dataset & API Route Tests', () => {
  it('debería contener los estados de Venezuela con datos de cobertura MapBiomas válidos', () => {
    expect(VENEZUELA_STATES_DATA.length).toBeGreaterThanOrEqual(14);
    
    for (const state of VENEZUELA_STATES_DATA) {
      expect(state.name).toBeDefined();
      expect(state.center.length).toBe(2);
      expect(state.center[0]).toBeGreaterThan(0);
      expect(state.center[1]).toBeLessThan(0);
      
      const cover = state.mapbiomasCover;
      const totalCover = cover.forest + cover.pasture + cover.agriculture + cover.savanna + cover.water + cover.urbanOther;
      expect(totalCover).toBeGreaterThanOrEqual(95);
      expect(totalCover).toBeLessThanOrEqual(102);
    }
  });

  it('debería tener geometrías GeoJSON válidas para los estados', () => {
    expect(VENEZUELA_GEOJSON.type).toBe('FeatureCollection');
    expect(VENEZUELA_GEOJSON.features.length).toBeGreaterThanOrEqual(14);

    for (const feature of VENEZUELA_GEOJSON.features) {
      expect(feature.type).toBe('Feature');
      expect(feature.geometry.type).toBe('Polygon');
      expect(feature.geometry.coordinates[0].length).toBeGreaterThan(3);
      expect(feature.properties.id).toBeDefined();
      expect(feature.properties.avgPh).toBeGreaterThan(0);
    }
  });

  it('debería contener puntos de muestreo GPS de alta fidelidad', () => {
    expect(SAMPLE_SOIL_POINTS.length).toBeGreaterThan(0);

    for (const point of SAMPLE_SOIL_POINTS) {
      expect(point.code).toMatch(/^AGRO-/);
      expect(point.ph).toBeGreaterThanOrEqual(3.5);
      expect(point.ph).toBeLessThanOrEqual(10.0);
    }
  });

  // Pruebas del endpoint HTTP GET /api/geo
  it('GET /api/geo sin parámetros debería retornar el paquete consolidado', async () => {
    const req = new NextRequest('http://localhost/api/geo');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.states).toBeDefined();
    expect(data.samplePoints).toBeDefined();
    expect(data.classes).toBeDefined();
  });

  it('GET /api/geo?type=geojson debería retornar el FeatureCollection completo', async () => {
    const req = new NextRequest('http://localhost/api/geo?type=geojson');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.type).toBe('FeatureCollection');
    expect(Array.isArray(data.features)).toBe(true);
  });

  it('GET /api/geo?type=geojson&state=zulia debería retornar el polígono de Zulia', async () => {
    const req = new NextRequest('http://localhost/api/geo?type=geojson&state=zulia');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.features[0].properties.id).toBe('zulia');
  });

  it('GET /api/geo?type=geojson&state=inexistente debería retornar 404', async () => {
    const req = new NextRequest('http://localhost/api/geo?type=geojson&state=inexistente');
    const res = await GET(req);
    expect(res.status).toBe(404);
  });

  it('GET /api/geo?type=points debería retornar la lista de muestras GPS', async () => {
    const req = new NextRequest('http://localhost/api/geo?type=points');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('GET /api/geo?type=metadata debería retornar metadatos de clasificación', async () => {
    const req = new NextRequest('http://localhost/api/geo?type=metadata');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.classes).toBeDefined();
    expect(data.phRanges).toBeDefined();
  });
});
