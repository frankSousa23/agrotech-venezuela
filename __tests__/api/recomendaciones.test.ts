import { calculatePointSuitability } from '@/lib/geo/spatialUtils';

describe('Recommendations & Liming Engine Tests', () => {
  it('debe prescribir encalado con Cal Dolomítica cuando el pH es menor a 5.5', () => {
    const res = calculatePointSuitability(9.3240, -69.1120, 5.0, 2.5);
    expect(res.limingDoseTonHa).toBeGreaterThan(0);
    expect(res.recommendationText.toLowerCase()).toContain('cal');
  });

  it('no debe requerir encalado correctivo cuando el pH está en el rango óptimo (6.2 - 6.8)', () => {
    const res = calculatePointSuitability(9.3240, -69.1120, 6.5, 3.5);
    expect(res.limingDoseTonHa).toBe(0);
  });
});
