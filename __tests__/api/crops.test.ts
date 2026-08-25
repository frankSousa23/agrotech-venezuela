import { VENEZUELA_CROPS } from '@/lib/geo/spatialUtils';

describe('Crops & Agronomic Database Tests', () => {
  it('debe contener los 8 cultivos estratégicos de Venezuela', () => {
    expect(VENEZUELA_CROPS.length).toBeGreaterThanOrEqual(8);
    const names = VENEZUELA_CROPS.map(c => c.name);
    expect(names).toContain('Maíz Blanco');
    expect(names).toContain('Arroz');
    expect(names).toContain('Cacao Criollo');
    expect(names).toContain('Plátano');
    expect(names).toContain('Café Arábica');
    expect(names).toContain('Caña de Azúcar');
    expect(names).toContain('Soya');
  });

  it('cada cultivo debe tener rangos óptimos de pH y requerimiento hídrico', () => {
    for (const crop of VENEZUELA_CROPS) {
      expect(crop.idealPhMin).toBeGreaterThanOrEqual(4.0);
      expect(crop.idealPhMax).toBeLessThanOrEqual(8.5);
      expect(crop.idealPhMin).toBeLessThan(crop.idealPhMax);
      expect(crop.annualRainfallMinMm).toBeGreaterThan(0);
    }
  });
});
