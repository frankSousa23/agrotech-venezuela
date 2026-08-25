import { VENEZUELA_SOIL_POINTS } from '@/lib/geo/spatialUtils';

describe('Soils Database & Sampling Points Tests', () => {
  it('debe tener un conjunto amplio de muestras edafológicas georreferenciadas', () => {
    expect(VENEZUELA_SOIL_POINTS.length).toBeGreaterThan(10);
  });

  it('todas las muestras deben tener coordenadas válidas dentro del territorio venezolano', () => {
    for (const point of VENEZUELA_SOIL_POINTS) {
      expect(point.lat).toBeGreaterThanOrEqual(0.6); // Extremo sur Amazonas
      expect(point.lat).toBeLessThanOrEqual(12.5); // Extremo norte Falcón/Península
      expect(point.lng).toBeGreaterThanOrEqual(-73.5); // Extremo oeste Zulia
      expect(point.lng).toBeLessThanOrEqual(-59.5); // Extremo este Delta
      expect(point.ph).toBeGreaterThan(3.5);
      expect(point.ph).toBeLessThan(9.0);
    }
  });
});
