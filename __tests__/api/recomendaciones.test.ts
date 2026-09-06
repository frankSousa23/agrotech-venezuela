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

  it('debe calcular métricas del modelo comercial Carbon Pooling (85% agricultor / 15% Agrotech)', () => {
    // Parcela de 45 ha con 2.6% MO en manejo regenerativo
    const areaHa = 45.0;
    const sequestrationRateTcHa = 0.55 + 0.15; // 0.70 tC/ha/año
    const annualCo2eHa = sequestrationRateTcHa * 3.667; // ~2.57 tCO2e/ha/año
    const totalAnnualCo2e = annualCo2eHa * areaHa; // ~115.5 tCO2e/año
    const creditPriceUsd = 18.5;
    const grossRevenueUsd = totalAnnualCo2e * creditPriceUsd; // ~$2,137 USD/año

    const farmerNetRevenueUsd = Math.round(grossRevenueUsd * 0.85);
    const platformTakeRateUsd = Math.round(grossRevenueUsd * 0.15);

    expect(farmerNetRevenueUsd).toBeGreaterThan(1500);
    expect(platformTakeRateUsd).toBeGreaterThan(250);
    expect(farmerNetRevenueUsd + platformTakeRateUsd).toBeCloseTo(Math.round(grossRevenueUsd), 0);

    // Escala del Pool Regional de 5,000 ha
    const regionalPoolGrossUsd = Math.round(annualCo2eHa * 5000 * creditPriceUsd);
    expect(regionalPoolGrossUsd).toBeGreaterThan(200000); // > $200k USD/año transables
  });
});
