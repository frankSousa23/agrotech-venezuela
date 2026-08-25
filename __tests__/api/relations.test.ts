import { VENEZUELA_STATES_DATA, detectStateForPoint } from '@/lib/geo/spatialUtils';

describe('State-Crop Relations & Spatial Alignment Tests', () => {
  it('debe tener los 24 estados federales de Venezuela mapeados', () => {
    expect(VENEZUELA_STATES_DATA.length).toBe(24);
  });

  it('cada estado debe tener delimitación válida, región y cultivos insignia', () => {
    for (const state of VENEZUELA_STATES_DATA) {
      expect(state.name).toBeDefined();
      expect(state.region).toBeDefined();
      expect(state.annualRainfallMm).toBeGreaterThan(0);
      expect(state.mainCrops.length).toBeGreaterThan(0);
    }
  });

  it('debe alinear correctamente las coordenadas de los Llanos Occidentales con Portuguesa y Barinas', () => {
    const stPortuguesa = detectStateForPoint(9.3240, -69.1120);
    expect(stPortuguesa.name).toBe('Portuguesa');

    const stBarinas = detectStateForPoint(8.6220, -70.2070);
    expect(stBarinas.name).toBe('Barinas');
  });
});
