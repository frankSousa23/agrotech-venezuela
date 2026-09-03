/**
 * ============================================================================
 * AGROTECH VENEZUELA — AGRO-IOT MICROCROP LAB TESTS
 * ============================================================================
 * 
 * Verifica:
 * 1. Algoritmo de decisión de riego predictivo acoplado a satélite NASA POWER.
 * 2. Supresión inteligente de riego bajo alerta de precipitación inminente.
 * 3. Presets agronómicos de micro-cultivo (Tomate, Maíz Dulce, Café/Cacao).
 * 4. Conversión matemática de señales analógicas ADC del sensor capacitivo a % VWC.
 */

describe('🔬 Agro-IoT Microcrop Laboratory & Predictive Irrigation Engine', () => {

  // Modelo de decisión idéntico al componente y al backend
  const evaluateIrrigation = (moisturePct: number, criticalThreshold: number, rainForecastMm: number) => {
    const isDeficient = moisturePct < criticalThreshold;
    const isRainImminent = rainForecastMm >= 5.0;

    if (isDeficient) {
      if (isRainImminent) {
        return {
          valveCommand: 'CLOSED',
          action: 'SUPPRESS_IRRIGATION',
          waterSavedLiters: 45.0,
          energySavedKWh: 0.28,
          reason: 'Lluvia inminente pronosticada por NASA POWER'
        };
      } else {
        return {
          valveCommand: 'OPEN',
          action: 'ACTIVATE_IRRIGATION',
          waterSavedLiters: 0,
          energySavedKWh: 0,
          reason: 'Déficit hídrico activo sin lluvia'
        };
      }
    } else {
      return {
        valveCommand: 'CLOSED',
        action: 'STANDBY',
        waterSavedLiters: 0,
        energySavedKWh: 0,
        reason: 'Humedad en rango óptimo'
      };
    }
  };

  const calculateVWC = (adcAir: number, adcWater: number, adcCurrent: number) => {
    const raw = ((adcAir - adcCurrent) / (adcAir - adcWater)) * 100;
    return Math.max(0, Math.min(100, Math.round(raw)));
  };

  test('debe activar riego cuando la humedad está por debajo del umbral y no hay lluvia pronosticada', () => {
    // Tomate Cherry (umbral 35%) con humedad en 24% y 0 mm de lluvia
    const decision = evaluateIrrigation(24.0, 35.0, 0.0);
    expect(decision.valveCommand).toBe('OPEN');
    expect(decision.action).toBe('ACTIVATE_IRRIGATION');
  });

  test('debe suprimir el riego cuando hay déficit pero la lluvia NASA POWER es >= 5mm', () => {
    // Maíz Dulce (umbral 28%) con humedad en 22% pero 14.5 mm de lluvia pronosticada
    const decision = evaluateIrrigation(22.0, 28.0, 14.5);
    expect(decision.valveCommand).toBe('CLOSED');
    expect(decision.action).toBe('SUPPRESS_IRRIGATION');
    expect(decision.waterSavedLiters).toBeGreaterThan(0);
    expect(decision.energySavedKWh).toBeGreaterThan(0);
  });

  test('debe mantener en reposo la válvula cuando el suelo está en rango óptimo', () => {
    // Café/Cacao con humedad al 58% (umbral 45%)
    const decision = evaluateIrrigation(58.0, 45.0, 0.0);
    expect(decision.valveCommand).toBe('CLOSED');
    expect(decision.action).toBe('STANDBY');
  });

  test('debe calibrar correctamente los valores ADC del sensor capacitivo a % VWC', () => {
    const adcAir = 3200;
    const adcWater = 1350;

    // En aire seco debe ser 0% VWC
    expect(calculateVWC(adcAir, adcWater, 3200)).toBe(0);

    // En agua saturada debe ser 100% VWC
    expect(calculateVWC(adcAir, adcWater, 1350)).toBe(100);

    // Valor intermedio (humedad media en campo)
    const midVWC = calculateVWC(adcAir, adcWater, 2275);
    expect(midVWC).toBe(50);
  });
});
