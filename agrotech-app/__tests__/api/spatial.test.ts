import { 
  calculatePolygonAreaHa, 
  calculatePolygonPerimeterMeters, 
  calculateCentroid, 
  detectStateFromCoords,
  evaluateCropSuitability,
  calculateSoilAmendments
} from '@/lib/geo/spatialUtils';

describe('Spatial & Agronomic Precision Engine Tests', () => {
  const mockSquareCoords: [number, number][] = [
    [9.0, -69.0],
    [9.0, -68.9],
    [8.9, -68.9],
    [8.9, -69.0]
  ];

  it('should calculate positive area in hectares for a valid polygon', () => {
    const area = calculatePolygonAreaHa(mockSquareCoords);
    expect(area).toBeGreaterThan(1000); // 0.1 degree x 0.1 degree is ~11km x 11km ~= 12,000 ha
  });

  it('should calculate positive perimeter in meters', () => {
    const perimeter = calculatePolygonPerimeterMeters(mockSquareCoords);
    expect(perimeter).toBeGreaterThan(10000); // > 10 km
  });

  it('should calculate accurate centroid', () => {
    const centroid = calculateCentroid(mockSquareCoords);
    expect(centroid[0]).toBeCloseTo(8.95, 2);
    expect(centroid[1]).toBeCloseTo(-68.95, 2);
  });

  it('should detect the nearest Venezuelan state accurately', () => {
    // Coordenadas cercanas a Guanare, Portuguesa [9.15, -69.25]
    const state = detectStateFromCoords(9.1, -69.2);
    expect(state.id).toBe('portuguesa');
  });

  it('should evaluate crop suitability based on edaphic factors', () => {
    // Suelo óptimo de Portuguesa (pH 6.4, MO 3.2%, Franco-limoso, Lluvia 1650mm)
    const results = evaluateCropSuitability(6.4, 3.2, 'Franco-limoso', 1650);
    expect(results.length).toBeGreaterThan(5);
    
    // Maíz o Arroz deberían tener alta puntuación en suelo óptimo
    const topCrop = results[0];
    expect(topCrop.suitabilityScore).toBeGreaterThanOrEqual(80);
    expect(topCrop.estimatedYieldKgHa).toBeGreaterThan(0);
  });

  it('should calculate liming requirement correctly when pH is acidic (< 5.8)', () => {
    // Suelo muy ácido del Sur del Lago (pH 4.8)
    const amendments = calculateSoilAmendments(4.8, 2.0, 50, 'Plátano');
    expect(amendments.needsLiming).toBe(true);
    expect(amendments.limeTonsPerHa).toBeGreaterThan(1.5);
    expect(amendments.totalLimeTons).toBe(amendments.limeTonsPerHa * 50);
    expect(amendments.fertilizerPlan.nitrogenKgHa).toBeGreaterThan(0);
  });

  it('should not require lime when soil pH is balanced (>= 5.8)', () => {
    const amendments = calculateSoilAmendments(6.5, 3.5, 20, 'Maíz');
    expect(amendments.needsLiming).toBe(false);
    expect(amendments.totalLimeTons).toBe(0);
  });
});
