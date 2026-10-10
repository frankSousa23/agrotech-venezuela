/**
 * ============================================================================
 * AGROTECH VENEZUELA — SUITE DE PRUEBAS DEL MÓDULO DE SUELOS MAPBIOMAS
 * Integración Federada, Intersección Espacial y Exportación
 * ============================================================================
 */

import { 
  haversineDistanceKm, 
  findNearestSoils, 
  evaluatePointSoil, 
  evaluateSoilPolygonIntersection 
} from '@/lib/soil-module/spatialSoilIndex';
import { generateMapBiomasGeeScript } from '@/lib/soil-module/geeTemplateGenerator';
import { buildSoilGeoJsonFeatureCollection } from '@/app/api/v1/soil/export/geojson/route';
import { GET as getSoilPoint } from '@/app/api/v1/soil/point/route';
import { POST as postSoilIntersect } from '@/app/api/v1/soil/intersect/route';
import { GET as getSoilGeoJson } from '@/app/api/v1/soil/export/geojson/route';
import { GET as getGeeScript } from '@/app/api/v1/soil/export/gee-script/route';

describe('Módulo de Suelos MapBiomas — Motor Espacial e Indexación k-NN', () => {
  it('calcula correctamente la distancia de Haversine entre Turén y Calabozo', () => {
    // Turén: (9.324, -69.112), Calabozo: (8.924, -67.428)
    const dist = haversineDistanceKm(9.324, -69.112, 8.924, -67.428);
    expect(dist).toBeGreaterThan(180);
    expect(dist).toBeLessThan(210);
  });

  it('resuelve el polo de Turén como el perfil más cercano para coordenadas cerealeras de Portuguesa', () => {
    const nearest = findNearestSoils(9.330, -69.120, 100, 1);
    expect(nearest.length).toBe(1);
    expect(nearest[0].soil.name).toContain('Turén');
    expect(nearest[0].distanceKm).toBeLessThan(10);
  });

  it('evalúa correctamente la enmienda Kamprath para sabanas ácidas orientales', () => {
    // Mesa de Guanipa, Anzoátegui: (8.885, -64.165)
    const evaluation = evaluatePointSoil(8.885, -64.165);
    expect(evaluation.interpolated.ph).toBeLessThan(5.2);
    expect(evaluation.interpolated.normalizedTexture).toBe('arenoso');
    expect(evaluation.recommendations.limeTonsPerHa).toBeGreaterThan(0.5);
    expect(evaluation.recommendations.pedologicalZone).toBe('LLANOS_SABANA');
  });

  it('evalúa suelo alcalino en Quíbor prescribiendo yeso y cero cal agrícola', () => {
    // Quíbor, Lara: (9.928, -69.620)
    const evaluation = evaluatePointSoil(9.928, -69.620);
    expect(evaluation.interpolated.ph).toBeGreaterThan(7.4);
    expect(evaluation.recommendations.gypsumTonsPerHa).toBeGreaterThan(1.0);
    expect(evaluation.recommendations.limeTonsPerHa).toBe(0);
  });
});

describe('Módulo de Suelos MapBiomas — Intersección Poligonal y Exportadores', () => {
  const samplePolygonGeoJson = [
    [
      [-69.15, 9.30],
      [-69.08, 9.30],
      [-69.08, 9.35],
      [-69.15, 9.35],
      [-69.15, 9.30]
    ]
  ];

  it('calcula métricas zonales agregadas y volumen de agua en polígonos agrícolas', () => {
    const result = evaluateSoilPolygonIntersection(samplePolygonGeoJson, 150.0, 5200.0);
    expect(result.summary.totalAreaHa).toBe(150.0);
    expect(result.hydraulicCapacity.totalAvailableWaterM3).toBeGreaterThan(0);
    expect(result.bulkAmendments).toBeDefined();
    expect(result.matchedSamplesCount).toBeGreaterThan(0);
  });

  it('genera un script sintácticamente válido para Google Earth Engine', () => {
    const script = generateMapBiomasGeeScript({ defaultPrnt: 85.0 });
    expect(script).toContain('AgrotechSoil');
    expect(script).toContain('computePAW');
    expect(script).toContain('computeKamprathLiming');
    expect(script).toContain('SOIL_HYDRAULICS');
    expect(script).toContain('SOIL_PALETTES');
  });

  it('construye una FeatureCollection GeoJSON estandarizada RFC 7946', () => {
    const geoJson = buildSoilGeoJsonFeatureCollection();
    expect(geoJson.type).toBe('FeatureCollection');
    expect(geoJson.features.length).toBeGreaterThan(4);
    
    const first = geoJson.features[0];
    expect(first.geometry.type).toBe('Point');
    expect(first.geometry.coordinates.length).toBe(2);
    expect(first.properties.fieldCapacityTheta).toBeDefined();
    expect(first.properties.ph).toBeDefined();
  });
});

describe('Módulo de Suelos MapBiomas — Endpoints API Federados (/api/v1/soil/*)', () => {
  it('GET /api/v1/soil/point retorna HTTP 200 con cabeceras CORS y datos válidos', async () => {
    const req = new Request('http://localhost:3000/api/v1/soil/point?lat=9.324&lon=-69.112');
    const res = await getSoilPoint(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.closestRecord.name).toContain('Turén');
    expect(json.data.hydraulics.fieldCapacityTheta).toBeGreaterThan(0);
  });

  it('GET /api/v1/soil/point responde HTTP 400 ante parámetros incompletos', async () => {
    const req = new Request('http://localhost:3000/api/v1/soil/point?lat=9.324');
    const res = await getSoilPoint(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it('POST /api/v1/soil/intersect procesa polígonos GeoJSON con agregación de enmiendas', async () => {
    const payload = {
      type: 'Polygon',
      coordinates: [
        [
          [-69.15, 9.30],
          [-69.08, 9.30],
          [-69.08, 9.35],
          [-69.15, 9.35],
          [-69.15, 9.30]
        ]
      ],
      areaHectares: 120.0
    };

    const req = new Request('http://localhost:3000/api/v1/soil/intersect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const res = await postSoilIntersect(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.summary.totalAreaHa).toBe(120.0);
    expect(json.data.bulkAmendments).toBeDefined();
  });

  it('GET /api/v1/soil/export/geojson entrega archivo application/geo+json', async () => {
    const res = await getSoilGeoJson();
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/geo+json');
    expect(res.headers.get('Content-Disposition')).toContain('attachment');
  });

  it('GET /api/v1/soil/export/gee-script entrega archivo application/javascript para Earth Engine', async () => {
    const req = new Request('http://localhost:3000/api/v1/soil/export/gee-script?prnt=85');
    const res = await getGeeScript(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/javascript');
    expect(res.headers.get('Content-Disposition')).toContain('mapbiomas_soil_engine.js');
  });
});
