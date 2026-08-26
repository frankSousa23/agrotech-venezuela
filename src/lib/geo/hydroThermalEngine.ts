/**
 * ============================================================================
 * AGROTECH VENEZUELA — MOTOR HIDRO-TÉRMICO & GDD (hydroThermalEngine.ts)
 * ============================================================================
 * 
 * Modelado agroclimático de precisión:
 * - Grados Día de Crecimiento (GDD - Growing Degree Days): Base 10°C, Techo 30°C.
 * - Predicción fenológica: Fechas estimadas de Emergencia, Floración y Cosecha.
 * - Balance Hídrico del Suelo: Precipitación Efectiva vs Evapotranspiración (ETc).
 */

export interface PhenologyMilestone {
  stageName: string;
  accumulatedGdd: number;
  estimatedDaysAfterSowing: number;
  description: string;
}

export interface MonthlyWaterBalance {
  month: string;
  rainfallMm: number;
  evapotranspirationEt0Mm: number;
  waterDeficitOrSurplusMm: number;
  status: 'Déficit (Riego Requerido)' | 'Balance Óptimo' | 'Exceso (Monitorear Drenaje)';
}

export interface HydroThermalReport {
  cropName: string;
  baseTempC: number;
  upperTempC: number;
  totalGddRequired: number;
  dailyAvgGdd: number;
  predictedCycleDays: number;
  milestones: PhenologyMilestone[];
  monthlyWaterBalance: MonthlyWaterBalance[];
  annualRainfallMm: number;
  annualEt0Mm: number;
  netWaterDeficitMm: number;
}

const CROP_GDD_REQUIREMENTS: Record<string, { totalGdd: number; base: number; upper: number; kc: number }> = {
  'Maíz': { totalGdd: 1650, base: 10.0, upper: 30.0, kc: 1.15 },
  'Maíz Blanco Harinero': { totalGdd: 1650, base: 10.0, upper: 30.0, kc: 1.15 },
  'Arroz': { totalGdd: 1800, base: 10.0, upper: 32.0, kc: 1.20 },
  'Caña de Azúcar': { totalGdd: 3200, base: 12.0, upper: 34.0, kc: 1.25 },
  'Café': { totalGdd: 2400, base: 10.0, upper: 28.0, kc: 0.95 },
  'Cacao': { totalGdd: 2800, base: 12.0, upper: 30.0, kc: 1.05 },
  'Soya': { totalGdd: 1450, base: 10.0, upper: 30.0, kc: 1.10 },
  'Ajonjolí': { totalGdd: 1300, base: 12.0, upper: 32.0, kc: 0.90 }
};

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/**
 * Calcula el reporte hidro-térmico y de GDD para un cultivo en un estado o lat/lng.
 */
export function calculateHydroThermalGdd(
  cropName: string = 'Maíz Blanco Harinero',
  avgTempC: number = 27.5,
  annualRainfallMm: number = 1450
): HydroThermalReport {
  const cropConfig = CROP_GDD_REQUIREMENTS[cropName] || CROP_GDD_REQUIREMENTS['Maíz'];

  // GDD diario promedio = ((min(Tmax, 30) + max(Tmin, 10)) / 2) - Tbase
  const tMax = Math.min(cropConfig.upper, avgTempC + 5.5);
  const tMin = Math.max(cropConfig.base, avgTempC - 5.5);
  const dailyAvgGdd = Math.max(1.0, ((tMax + tMin) / 2) - cropConfig.base);

  const predictedCycleDays = Math.round(cropConfig.totalGdd / dailyAvgGdd);

  // Hitos Fenológicos
  const milestones: PhenologyMilestone[] = [
    {
      stageName: 'Emergencia / VE',
      accumulatedGdd: Math.round(cropConfig.totalGdd * 0.08),
      estimatedDaysAfterSowing: Math.round(predictedCycleDays * 0.08),
      description: 'Aparición del coleóptilo y primeras hojas verdaderas.'
    },
    {
      stageName: 'Desarrollo Vegetativo / V6-V8',
      accumulatedGdd: Math.round(cropConfig.totalGdd * 0.30),
      estimatedDaysAfterSowing: Math.round(predictedCycleDays * 0.30),
      description: 'Diferenciación de espiga y máxima demanda de Nitrógeno (N).'
    },
    {
      stageName: 'Floración / Antesis (R1)',
      accumulatedGdd: Math.round(cropConfig.totalGdd * 0.52),
      estimatedDaysAfterSowing: Math.round(predictedCycleDays * 0.52),
      description: 'Polinización crítica. Cero tolerancia a estrés hídrico.'
    },
    {
      stageName: 'Llenado de Granos / R3-R4',
      accumulatedGdd: Math.round(cropConfig.totalGdd * 0.78),
      estimatedDaysAfterSowing: Math.round(predictedCycleDays * 0.78),
      description: 'Acumulación de almidón y biomasa fotosintética.'
    },
    {
      stageName: 'Madurez Fisiológica / R6 (Cosecha)',
      accumulatedGdd: cropConfig.totalGdd,
      estimatedDaysAfterSowing: predictedCycleDays,
      description: 'Punto negro en base del grano; humedad óptima para recolección.'
    }
  ];

  // Balance Hídrico Mensual (Curva de lluvias bimodal venezolana)
  const monthlyRainWeights = [0.02, 0.02, 0.03, 0.07, 0.12, 0.16, 0.17, 0.16, 0.12, 0.08, 0.03, 0.02];
  const monthlyEt0Base = [125, 130, 145, 140, 120, 110, 105, 112, 118, 122, 115, 120];

  let totalEt0 = 0;
  const monthlyWaterBalance: MonthlyWaterBalance[] = MONTHS.map((m, i) => {
    const rain = Math.round(annualRainfallMm * monthlyRainWeights[i]);
    const et0 = Math.round(monthlyEt0Base[i] * (avgTempC / 26.0) * cropConfig.kc);
    totalEt0 += et0;
    const diff = rain - et0;

    let status: MonthlyWaterBalance['status'] = 'Balance Óptimo';
    if (diff < -30) status = 'Déficit (Riego Requerido)';
    else if (diff > 60) status = 'Exceso (Monitorear Drenaje)';

    return {
      month: m,
      rainfallMm: rain,
      evapotranspirationEt0Mm: et0,
      waterDeficitOrSurplusMm: diff,
      status
    };
  });

  return {
    cropName,
    baseTempC: cropConfig.base,
    upperTempC: cropConfig.upper,
    totalGddRequired: cropConfig.totalGdd,
    dailyAvgGdd: parseFloat(dailyAvgGdd.toFixed(1)),
    predictedCycleDays,
    milestones,
    monthlyWaterBalance,
    annualRainfallMm,
    annualEt0Mm: totalEt0,
    netWaterDeficitMm: annualRainfallMm - totalEt0
  };
}
