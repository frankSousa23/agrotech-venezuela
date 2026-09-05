import { calculatePointSuitability } from '@/lib/geo/spatialUtils';

describe('Recommendations & Liming Engine Tests', () => {
  it('debe prescribir encalado con Cal Dolomítica cuando el pH es menor a 5.5', () => {
    const res = calculatePointSuitability(9.3240, -69.1120, 5.0, 2.5);
    expect(res.limingDoseTonHa).toBeGreaterThan(0);
    expect(res.recommendationText.toLowerCase()).toContain('cal');
  });

  it('debe prescribir Yeso Agrícola y prohibir cal en suelos alcalinos/sódicos de Quíbor (Lara)', () => {
    // Coordenadas aproximadas de Quíbor / Valle de Jiménez, Lara (lat: 9.92, lng: -69.62)
    const res = calculatePointSuitability(9.9200, -69.6200, 7.8, 1.8);
    expect(res.pedologicalZone).toBe('QUIBOR_SEMIARID');
    expect(res.amendmentCategory).toBe('GYPSUM');
    expect(res.limingDoseTonHa).toBe(0);
    expect(res.recommendationText.toLowerCase()).toContain('yeso');
  });

  it('debe prescribir Cal Dolomítica con garantía de magnesio en cuenca Sur del Lago', () => {
    // Coordenadas de Sur del Lago / Santa Bárbara del Zulia (lat: 8.98, lng: -71.90)
    const res = calculatePointSuitability(8.9800, -71.9000, 5.2, 2.8);
    expect(res.pedologicalZone).toBe('SUR_DEL_LAGO');
    expect(res.amendmentCategory).toBe('LIME');
    expect(res.recommendationText.toLowerCase()).toContain('cal dolomítica');
  });

  it('no debe requerir encalado correctivo cuando el pH está en el rango óptimo (6.2 - 6.8)', () => {
    const res = calculatePointSuitability(9.3240, -69.1120, 6.5, 3.5);
    expect(res.limingDoseTonHa).toBe(0);
  });
});
