/**
 * ============================================================================
 * AGROTECH VENEZUELA — IMPACT & ROI WIDGET CONTRACT TESTS
 * ============================================================================
 * 
 * Verifica el desacoplamiento estricto del ROI operativo de los créditos de carbono,
 * la lógica de doble perfil (Mecanizado vs Pequeño Productor / Conuco),
 * la conversión vernacular y la ingesta dinámica de parcelas reales.
 */

import {
  calculateOperationalRoi,
  calculateEsgSimulation,
  getVernacularRoiSummary,
  ROI_DEFAULTS,
  FarmingProfile,
  RoiParameters
} from '@/lib/agronomy/roiCostEngine';
import { LinkedParcelData } from '@/components/agronomy/ImpactRoiWidget';

describe('ImpactRoiWidget & Engine Integration Suite', () => {
  describe('1. Desacoplamiento Financiero del Flujo Operativo vs Carbono', () => {
    it('debe certificar que el retorno neto operativo es exactamente la suma de insumos, labor/diesel, riego y cosecha', () => {
      const params: RoiParameters = {
        areaHa: 20,
        cropName: 'Maíz Blanco Harinero',
        profile: 'mechanized',
      };

      const result = calculateOperationalRoi(params);

      // Verificamos la igualdad estricta
      const sumComponents =
        result.totalFertilizerSavings +
        result.totalOperationalSavings +
        result.totalIrrigationSavings +
        result.totalExtraYieldRevenue;

      expect(result.netOperationalProfit).toBe(sumComponents);

      // Verificamos que los créditos de carbono NO forman parte del monto
      expect(result.esgSimulation.potentialCarbonCreditRevenueUsd).toBeGreaterThan(0);
      expect(result.netOperationalProfit).not.toBe(
        sumComponents + result.esgSimulation.potentialCarbonCreditRevenueUsd
      );
    });

    it('debe mantener la simulación ESG como entidad analítica independiente con advertencia metodológica', () => {
      const esg = calculateEsgSimulation({ areaHa: 15 });
      expect(esg.annualCo2SequesteredTons).toBe(27); // 15 ha * 1.8 tCO2e
      expect(esg.potentialCarbonCreditRevenueUsd).toBe(675); // 27 * $25
      expect(esg.disclaimer).toContain('NO forma parte del flujo de caja operativo');
    });
  });

  describe('2. Perfil de Pequeño Productor / Conuco (Manual sin Maquinaria)', () => {
    it('debe costear en base a sacos comerciales de 50 kg y jornales campesinos', () => {
      const params: RoiParameters = {
        areaHa: 3,
        cropName: 'Caraota Negra',
        profile: 'smallholder_manual',
        fertilizerSacksSavedPerHa: 4,
        sackPriceUsd: 40,
        jornalesSavedPerHa: 3,
        jornalRateUsd: 12,
        extraYieldTonPerHa: 1.5,
        cropPricePerTon: 800,
      };

      const result = calculateOperationalRoi(params);

      // 3 ha * 4 sacos * $40 = $480 USD
      expect(result.totalFertilizerSavings).toBe(480);
      // 3 ha * 3 jornales * $12 = $108 USD
      expect(result.totalOperationalSavings).toBe(108);
      // 3 ha * 1.5 Ton * $800 = $3,600 USD
      expect(result.totalExtraYieldRevenue).toBe(3600);

      expect(result.profile).toBe('smallholder_manual');
      expect(result.netOperationalProfit).toBe(
        result.totalFertilizerSavings +
        result.totalOperationalSavings +
        result.totalIrrigationSavings +
        result.totalExtraYieldRevenue
      );
    });

    it('debe generar resumen vernacular para Modo Campesino Fácil', () => {
      const summary = getVernacularRoiSummary({
        areaHa: 5,
        profile: 'smallholder_manual',
        totalFertilizerSavings: 700,
        totalExtraYieldTons: 10,
        params: {
          areaHa: 5,
          profile: 'smallholder_manual',
          fertilizerSacksSavedPerHa: 4,
          jornalesSavedPerHa: 2,
        },
      });

      expect(summary.sacksFertilizerSaved).toBe(20); // 5 * 4
      expect(summary.jornalesSaved).toBe(10); // 5 * 2
      expect(summary.extraSacksHarvested).toBe(200); // 10 Ton * 20 sacos/Ton
      expect(summary.areaInTablones).toBe(5);
      expect(summary.formattedHighlight).toContain('20 sacos de abono ahorrados');
      expect(summary.formattedHighlight).toContain('+200 sacos cosechados');
    });
  });

  describe('3. Ingestión Dinámica de Datos Reales de Parcelas', () => {
    it('debe mapear correctamente un objeto LinkedParcelData a parámetros de simulación ROI', () => {
      const parcel: LinkedParcelData = {
        id: 'parcel-turen-01',
        name: 'Finca Santa Inés - Lote 4',
        areaHa: 45.5,
        crop: 'Maíz Blanco Harinero',
        ph: 5.6,
        texture: 'Franco-arcilloso',
      };

      // Simulamos la resolución de parámetros como hace el componente
      const effectiveArea = parcel.areaHa ?? 20;
      const effectiveCrop = parcel.crop ?? 'Cultivo';

      const result = calculateOperationalRoi({
        areaHa: effectiveArea,
        cropName: effectiveCrop,
        profile: 'mechanized',
      });

      expect(result.areaHa).toBe(45.5);
      expect(result.cropName).toBe('Maíz Blanco Harinero');
      expect(result.totalFertilizerSavings).toBe(Math.round(45.5 * ROI_DEFAULTS.MECHANIZED.fertilizerSavingsPerHa));
      expect(result.netOperationalProfit).toBeGreaterThan(15000);
    });
  });
});
