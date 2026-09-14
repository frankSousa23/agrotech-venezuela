/**
 * Motor de Cálculo de Retorno de Inversión (ROI) y Costeo Agrícola Venezolano
 * 
 * Desacopla estrictamente el ROI operativo financiero (flujo de caja real en finca)
 * de las simulaciones prospectivas de bonos de carbono / SOC (ESG).
 * 
 * Incorpora doble perfil operativo:
 * 1. Agroindustrial Mecanizado (Tractor GPS, VRA Shapefile, gasoil L/ha, fertilizante a granel)
 * 2. Pequeño Productor / Conuquero Manual (Sin maquinaria, sacos de 50 kg en agrotienda, jornales de campo)
 */

export type FarmingProfile = 'mechanized' | 'smallholder_manual';

export interface RoiParameters {
  areaHa: number;
  cropName?: string;
  profile: FarmingProfile;
  
  // Parámetros Mecanizados (Opcionales con defaults de campo venezolano)
  fertilizerSavingsPerHa?: number; // USD/ha por optimización VRA (default: $120)
  dieselPricePerLiter?: number; // USD/L gasoil (default: $0.60)
  dieselSavedLitersPerHa?: number; // L/ha ahorrados en pasadas (default: 16)
  tractorDepreciationSavedPerHa?: number; // USD/ha desgaste evitado (default: $15)

  // Parámetros Pequeño Productor / Conuco (Opcionales con defaults)
  fertilizerSacksSavedPerHa?: number; // Sacos de 50 kg ahorrados por no sobreaplicar (default: 3.5)
  sackPriceUsd?: number; // USD por saco de 50 kg en agrotienda (default: $38.0)
  jornalesSavedPerHa?: number; // Días de trabajo manual ahorrados por calibración (default: 2.5)
  jornalRateUsd?: number; // USD por jornal campesino (default: $12.0)

  // Parámetros Comunes
  irrigationSavingsUsdPerHa?: number; // USD/ha bombeo/energía ahorrada por PAW (default: $25)
  waterSavedM3PerHa?: number; // m3/ha agua protegida (default: 180)
  extraYieldTonPerHa?: number; // Ton/ha de rendimiento adicional (default: 2.3)
  cropPricePerTon?: number; // USD/Ton precio en silo/mercado (default: $220)

  // Parámetros de Simulación Ecológica Desacoplada (ESG / Verra VCS)
  carbonSequestrationTco2PerHa?: number; // tCO2e/ha/año (default: 1.8)
  carbonPriceUsdPerTon?: number; // USD/tCO2e certificado (default: $25)
}

export interface VernacularRoiSummary {
  sacksFertilizerSaved: number;
  jornalesSaved: number;
  extraSacksHarvested: number;
  areaInTablones: number;
  formattedHighlight: string;
}

export interface EsgSimulationResult {
  annualCo2SequesteredTons: number;
  potentialCarbonCreditRevenueUsd: number;
  carbonPriceUsdPerTon: number;
  disclaimer: string;
}

export interface OperationalRoiResult {
  profile: FarmingProfile;
  areaHa: number;
  cropName: string;
  
  // Desglose de Ahorros Operativos Reales (USD)
  totalFertilizerSavings: number;
  totalOperationalSavings: number; // Diesel en mecanizado o Jornales en pequeño productor
  totalIrrigationSavings: number;
  totalExtraYieldRevenue: number;
  
  // Métricas de Rendimiento Agronómico Físico
  totalExtraYieldTons: number;
  totalWaterSavedM3: number;
  
  // KPI Principal: Flujo de Caja Operativo Neto Real (Desacoplado de Carbono)
  netOperationalProfit: number;
  netProfitPerHa: number;
  
  // Equivalencias Vernaculares para Modo Campesino Fácil
  vernacular: VernacularRoiSummary;
  
  // Simulación Ambiental Desacoplada (No sumada al beneficio neto)
  esgSimulation: EsgSimulationResult;
}

// Defaults de Referencia Nacional (Venezuela 2026)
export const ROI_DEFAULTS = {
  MECHANIZED: {
    fertilizerSavingsPerHa: 120,
    dieselPricePerLiter: 0.60,
    dieselSavedLitersPerHa: 16,
    tractorDepreciationSavedPerHa: 15,
  },
  SMALLHOLDER: {
    fertilizerSacksSavedPerHa: 3.5,
    sackPriceUsd: 38.0,
    jornalesSavedPerHa: 2.5,
    jornalRateUsd: 12.0,
  },
  COMMON: {
    irrigationSavingsUsdPerHa: 25,
    waterSavedM3PerHa: 180,
    extraYieldTonPerHa: 2.3,
    cropPricePerTon: 220,
    carbonSequestrationTco2PerHa: 1.8,
    carbonPriceUsdPerTon: 25,
  }
};

/**
 * Calcula el Retorno Operativo de Inversión Agronómico desvinculado de carbono.
 */
export function calculateOperationalRoi(params: RoiParameters): OperationalRoiResult {
  const areaHa = Math.max(0.1, params.areaHa || 1);
  const cropName = params.cropName || 'Maíz Blanco Harinero';
  const profile = params.profile || 'mechanized';

  let totalFertilizerSavings = 0;
  let totalOperationalSavings = 0;

  if (profile === 'smallholder_manual') {
    const sacksSavedPerHa = params.fertilizerSacksSavedPerHa ?? ROI_DEFAULTS.SMALLHOLDER.fertilizerSacksSavedPerHa;
    const sackPrice = params.sackPriceUsd ?? ROI_DEFAULTS.SMALLHOLDER.sackPriceUsd;
    const jornalesSavedPerHa = params.jornalesSavedPerHa ?? ROI_DEFAULTS.SMALLHOLDER.jornalesSavedPerHa;
    const jornalRate = params.jornalRateUsd ?? ROI_DEFAULTS.SMALLHOLDER.jornalRateUsd;

    totalFertilizerSavings = Math.round(areaHa * sacksSavedPerHa * sackPrice);
    totalOperationalSavings = Math.round(areaHa * jornalesSavedPerHa * jornalRate);
  } else {
    const fertPerHa = params.fertilizerSavingsPerHa ?? ROI_DEFAULTS.MECHANIZED.fertilizerSavingsPerHa;
    const dieselLiters = params.dieselSavedLitersPerHa ?? ROI_DEFAULTS.MECHANIZED.dieselSavedLitersPerHa;
    const dieselPrice = params.dieselPricePerLiter ?? ROI_DEFAULTS.MECHANIZED.dieselPricePerLiter;
    const tractorDepreciation = params.tractorDepreciationSavedPerHa ?? ROI_DEFAULTS.MECHANIZED.tractorDepreciationSavedPerHa;

    totalFertilizerSavings = Math.round(areaHa * fertPerHa);
    totalOperationalSavings = Math.round(areaHa * ((dieselLiters * dieselPrice) + tractorDepreciation));
  }

  // Ahorro en riego / bombeo energético
  const irrigationPerHa = params.irrigationSavingsUsdPerHa ?? ROI_DEFAULTS.COMMON.irrigationSavingsUsdPerHa;
  const totalIrrigationSavings = Math.round(areaHa * irrigationPerHa);

  // Rendimiento adicional y venta de cosecha
  const yieldIncreasePerHa = params.extraYieldTonPerHa ?? ROI_DEFAULTS.COMMON.extraYieldTonPerHa;
  const cropPrice = params.cropPricePerTon ?? ROI_DEFAULTS.COMMON.cropPricePerTon;
  const totalExtraYieldTons = Math.round(areaHa * yieldIncreasePerHa * 10) / 10;
  const totalExtraYieldRevenue = Math.round(totalExtraYieldTons * cropPrice);

  // Ahorro de agua en metros cúbicos
  const waterPerHa = params.waterSavedM3PerHa ?? ROI_DEFAULTS.COMMON.waterSavedM3PerHa;
  const totalWaterSavedM3 = Math.round(areaHa * waterPerHa);

  // FLUJO DE CAJA NETO OPERATIVO: Estrictamente ingresos y ahorros tangibles
  const netOperationalProfit = totalFertilizerSavings + totalOperationalSavings + totalIrrigationSavings + totalExtraYieldRevenue;
  const netProfitPerHa = Math.round((netOperationalProfit / areaHa) * 10) / 10;

  // Conversión Vernacular para Modo Campesino Fácil
  const vernacular = getVernacularRoiSummary({
    areaHa,
    profile,
    totalFertilizerSavings,
    totalExtraYieldTons,
    params,
  });

  // Simulación Ambiental Desacoplada (ESG / Verra VCS)
  const esgSimulation = calculateEsgSimulation({
    areaHa,
    carbonSequestrationTco2PerHa: params.carbonSequestrationTco2PerHa ?? ROI_DEFAULTS.COMMON.carbonSequestrationTco2PerHa,
    carbonPriceUsdPerTon: params.carbonPriceUsdPerTon ?? ROI_DEFAULTS.COMMON.carbonPriceUsdPerTon,
  });

  return {
    profile,
    areaHa,
    cropName,
    totalFertilizerSavings,
    totalOperationalSavings,
    totalIrrigationSavings,
    totalExtraYieldRevenue,
    totalExtraYieldTons,
    totalWaterSavedM3,
    netOperationalProfit,
    netProfitPerHa,
    vernacular,
    esgSimulation,
  };
}

/**
 * Genera el resumen en unidades vernaculares del campo venezolano.
 */
export function getVernacularRoiSummary(input: {
  areaHa: number;
  profile: FarmingProfile;
  totalFertilizerSavings: number;
  totalExtraYieldTons: number;
  params: RoiParameters;
}): VernacularRoiSummary {
  const { areaHa, profile, totalFertilizerSavings, totalExtraYieldTons, params } = input;
  const sackPrice = params.sackPriceUsd ?? ROI_DEFAULTS.SMALLHOLDER.sackPriceUsd;

  let sacksFertilizerSaved: number;
  let jornalesSaved: number;

  if (profile === 'smallholder_manual') {
    const sacksPerHa = params.fertilizerSacksSavedPerHa ?? ROI_DEFAULTS.SMALLHOLDER.fertilizerSacksSavedPerHa;
    const jornalesPerHa = params.jornalesSavedPerHa ?? ROI_DEFAULTS.SMALLHOLDER.jornalesSavedPerHa;
    sacksFertilizerSaved = Math.round(areaHa * sacksPerHa);
    jornalesSaved = Math.round(areaHa * jornalesPerHa);
  } else {
    sacksFertilizerSaved = Math.round(totalFertilizerSavings / sackPrice);
    jornalesSaved = Math.round(areaHa * 2); // Equivalente de labor ahorrada
  }

  // 1 Tonelada = 20 sacos de 50 kg
  const extraSacksHarvested = Math.round(totalExtraYieldTons * 20);
  const areaInTablones = Math.round(areaHa * 10) / 10; // 1 tablón tradicional ≈ 1 ha

  const formattedHighlight = `${sacksFertilizerSaved} sacos de abono ahorrados y +${extraSacksHarvested} sacos cosechados en ${areaInTablones} tablón(es)`;

  return {
    sacksFertilizerSaved,
    jornalesSaved,
    extraSacksHarvested,
    areaInTablones,
    formattedHighlight,
  };
}

/**
 * Calcula la simulación prospectiva de secuestro de carbono (ESG) aislada del balance financiero.
 */
export function calculateEsgSimulation(input: {
  areaHa: number;
  carbonSequestrationTco2PerHa?: number;
  carbonPriceUsdPerTon?: number;
}): EsgSimulationResult {
  const areaHa = Math.max(0.1, input.areaHa);
  const seqPerHa = input.carbonSequestrationTco2PerHa ?? ROI_DEFAULTS.COMMON.carbonSequestrationTco2PerHa;
  const carbonPrice = input.carbonPriceUsdPerTon ?? ROI_DEFAULTS.COMMON.carbonPriceUsdPerTon;

  const annualCo2SequesteredTons = Math.round(areaHa * seqPerHa * 10) / 10;
  const potentialCarbonCreditRevenueUsd = Math.round(annualCo2SequesteredTons * carbonPrice);

  return {
    annualCo2SequesteredTons,
    potentialCarbonCreditRevenueUsd,
    carbonPriceUsdPerTon: carbonPrice,
    disclaimer: 'Simulación prospectiva para certificación ambiental o bonos verdes bajo estándar Verra VCS / IPCC Tier 2. Este valor representa potencial ecológico y NO forma parte del flujo de caja operativo inmediato en finca.',
  };
}
