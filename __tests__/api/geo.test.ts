import { GET } from '@/app/api/geo/route';
import { NextRequest } from 'next/server';

describe('API Geo & Spatial Route Tests', () => {
  it('debe retornar FeatureCollection GeoJSON por defecto', async () => {
    const req = new NextRequest('http://localhost:3000/api/geo?type=geojson');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.type).toBe('FeatureCollection');
    expect(Array.isArray(data.features)).toBe(true);
    expect(data.features.length).toBeGreaterThan(0);
  });

  it('debe retornar muestras edafológicas GPS cuando type=points', async () => {
    const req = new NextRequest('http://localhost:3000/api/geo?type=points');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('lat');
    expect(data[0]).toHaveProperty('lng');
    expect(data[0]).toHaveProperty('ph');
  });

  it('debe filtrar muestras por estado específico (ej: portuguesa)', async () => {
    const req = new NextRequest('http://localhost:3000/api/geo?type=points&state=portuguesa');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].stateId).toBe('portuguesa');
  });

  it('debe retornar metadatos de clasificación cuando type=metadata', async () => {
    const req = new NextRequest('http://localhost:3000/api/geo?type=metadata');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('mapbiomasClasses');
    expect(data).toHaveProperty('phRanges');
  });
});
