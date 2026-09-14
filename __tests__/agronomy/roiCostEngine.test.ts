import {
  calculateOperationalRoi,
  calculateEsgSimulation,
  getVernacularRoiSummary,
  ROI_DEFAULTS,
} from '@/lib/agronomy/roiCostEngine';

describe('roiCostEngine - Desacoplamiento de ROI y Costeo para Pequeños Productores', () => {
  describe('1. Desacoplamiento Estricto del ROI Operativo vs Créditos de Carbono', () => {
    it('debe calcular el retorno operativo neto excluyendo completamente los ingresos por carbono', () => {
      const areaHa = 10;
      const result = calculateOperationalRoi({
        areaHa,
        cropName: 'Maíz Blanco Harinero',
        profile: 'mechanized',
      });

      // Verificación de la suma de flujo de caja operativo
      const expectedOperationalSum =
        result.totalFertilizerSavings +
        result.totalOperationalSavings +
        result.totalIrrigationSavings +
        result.totalExtraYieldRevenue;

      expect(result.netOperationalProfit).toBe(expectedOperationalSum);

      // Verificación de que los bonos de carbono NO están sumados al beneficio neto
      expect(result.netOperationalProfit).not.toBe(
        expectedOperationalSum + result.esgSimulation.potentialCarbonCreditRevenueUsd
      );

      // Verificación de que la simulación ESG existe por separado con su disclaimer
      expect(result.esgSimulation.annualCo2SequesteredTons).toBe(18); // 10 ha * 1.8 tCO2e/ha
      expect(result.esgSimulation.potentialCarbonCreditRevenueUsd).toBe(450); // 18 * $25
      expect(result.esgSimulation.disclaimer).toContain('NO forma parte del flujo de caja operativo');
    });
  });

  describe('2. Perfil de Pequeño Productor / Conuco (Manual)', () => {
    it('debe calcular los ahorros en sacos de 50 kg y jornales de campo manual', () => {
      const areaHa = 2.5; // Parcela típica de conuco o pequeño productor
      const result = calculateOperationalRoi({
        areaHa,
        cropName: 'Frijol / Caraota Negra',
        profile: 'smallholder_manual',
        fertilizerSacksSavedPerHa: 4,
        sackPriceUsd: 40.0,
        jornalesSavedPerHa: 3,
        jornalRateUsd: 15.0,
      });

      // 2.5 ha * 4 sacos/ha = 10 sacos * $40 = $400 USD
      expect(result.totalFertilizerSavings).toBe(400);

      // 2.5 ha * 3 jornales/ha = 7.5 jornales * $15 = $112.5 -> redondeado a $113 USD
      expect(result.totalOperationalSavings).toBe(113);

      expect(result.profile).toBe('smallholder_manual');
      expect(result.netOperationalProfit).toBeGreaterThan(500);
    });

    it('debe usar los defaults venezolanos cuando no se especifican precios de saco o jornal', () => {
      const areaHa = 2;
      const result = calculateOperationalRoi({
        areaHa,
        profile: 'smallholder_manual',
      });

      // Defaults: 3.5 sacos/ha a $38/saco = $133/ha * 2 ha = $266
      expect(result.totalFertilizerSavings).toBe(266);
      // Defaults: 2.5 jornales/ha a $12/jornal = $30/ha * 2 ha = $60
      expect(result.totalOperationalSavings).toBe(60);
    });
  });

  describe('3. Perfil Agroindustrial Mecanizado', () => {
    it('debe calcular ahorros en diesel de tractor y depreciación de maquinaria', () => {
      const areaHa = 50;
      const result = calculateOperationalRoi({
        areaHa,
        profile: 'mechanized',
        dieselPricePerLiter: 0.60,
        dieselSavedLitersPerHa: 16,
        tractorDepreciationSavedPerHa: 15,
        fertilizerSavingsPerHa: 120,
      });

      // 50 ha * $120/ha = $6,000 USD
      expect(result.totalFertilizerSavings).toBe(6000);

      // 16 L * $0.60 = $9.6 + $15 = $24.6/ha * 50 ha = $1,230 USD
      expect(result.totalOperationalSavings).toBe(1230);
    });
  });

  describe('4. Traducción Vernacular para Modo Campesino Fácil', () => {
    it('debe generar equivalencias exactas en sacos de abono, jornales y sacos de cosecha', () => {
      const areaHa = 4;
      const result = calculateOperationalRoi({
        areaHa,
        profile: 'smallholder_manual',
        extraYieldTonPerHa: 2.0, // 2 Ton/ha * 4 ha = 8 Ton = 160 sacos de 50 kg
      });

      expect(result.vernacular.sacksFertilizerSaved).toBe(14); // 4 ha * 3.5 sacos
      expect(result.vernacular.jornalesSaved).toBe(10); // 4 ha * 2.5 jornales
      expect(result.vernacular.extraSacksHarvested).toBe(160); // 8 Ton * 20 sacos/Ton
      expect(result.vernacular.areaInTablones).toBe(4);
      expect(result.vernacular.formattedHighlight).toContain('14 sacos de abono ahorrados y +160 sacos cosechados');
    });
  });

  describe('5. Simulación Aislada de Bonos de Carbono (ESG)', () => {
    it('debe modelar la captura de carbono con parámetros IPCC Tier 2 / Verra VCS sin alterar la caja de la finca', () => {
      const sim = calculateEsgSimulation({
        areaHa: 30,
        carbonSequestrationTco2PerHa: 2.0,
        carbonPriceUsdPerTon: 30,
      });

      expect(sim.annualCo2SequesteredTons).toBe(60);
      expect(sim.potentialCarbonCreditRevenueUsd).toBe(1800);
      expect(sim.disclaimer).toContain('NO forma parte del flujo de caja operativo');
    });
  });
});
