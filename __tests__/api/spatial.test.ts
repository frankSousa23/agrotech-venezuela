import { 
  calculatePolygonAreaHectares, 
  calculatePolygonPerimeterKm, 
  detectStateForPoint, 
  calculatePointSuitability 
} from '@/lib/geo/spatialUtils';

describe('Spatial & Geodetic Algorithms Tests', () => {
  it('debe calcular correctamente el área de un polígono en hectáreas usando Shoelace geodésico', () => {
    // Parcela de ~1km x 1km en Turén (~100 hectáreas)
    const polygon = [
      { lat: 9.3200, lng: -69.1100 },
      { lat: 9.3290, lng: -69.1100 },
      { lat: 9.3290, lng: -69.1000 },
      { lat: 9.3200, lng: -69.1000 }
    ];
    const areaHa = calculatePolygonAreaHectares(polygon);
    expect(areaHa).toBeGreaterThan(90);
    expect(areaHa).toBeLessThan(130);
  });

  it('debe calcular el perímetro en kilómetros usando Haversine', () => {
    const polygon = [
      { lat: 9.3200, lng: -69.1100 },
      { lat: 9.3290, lng: -69.1100 },
      { lat: 9.3290, lng: -69.1000 },
      { lat: 9.3200, lng: -69.1000 }
    ];
    const perimKm = calculatePolygonPerimeterKm(polygon);
    expect(perimKm).toBeGreaterThan(3.5);
    expect(perimKm).toBeLessThan(4.5);
  });

  it('debe detectar el estado territorial correcto por Point-in-Polygon (Ray Casting)', () => {
    const state = detectStateForPoint(9.3240, -69.1120);
    expect(state).toBeDefined();
    expect(state.id).toBe('portuguesa');
  });

  it('debe calcular aptitud multicriterio AHP considerando pH y materia orgánica', () => {
    const result = calculatePointSuitability(9.3240, -69.1120, 6.2, 3.2);
    expect(result).toBeDefined();
    expect(result.suitabilityScore).toBeGreaterThan(70);
    expect(result.recommendedCrops.length).toBeGreaterThan(0);
  });
});
