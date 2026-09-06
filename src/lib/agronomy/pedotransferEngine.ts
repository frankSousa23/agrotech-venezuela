/**
 * ============================================================================
 * AGROTECH VENEZUELA — MOTOR DE CALIBRACIÓN PEDOTRANSFERENCIAL SAXTON-RAWLS
 * ============================================================================
 * 
 * Modela la física hídrica del suelo y el Agua Fácilmente Aprovechable (PAW)
 * para los tres grandes perfiles edafológicos agro-productivos de Venezuela:
 * 1. Arenoso (Sabanas Orientales - Monagas, Anzoátegui, Guárico)
 * 2. Franco / "Tierra Mansa" (Valles Altos, Yaracuy, Portuguesa franco, Aragua)
 * 3. Arcilloso / "Tierra Brava" (Vertisoles de Portuguesa/Turén, Sur del Lago, Barinas)
 */

export type SoilTextureType = 'arenoso' | 'franco' | 'arcilloso';

export interface SoilHydraulicProperties {
  texture: SoilTextureType;
  displayName: string;
  fieldCapacityTheta: number;      // θ_FC (%) a -33 kPa
  wiltingPointTheta: number;       // θ_PWP (%) a -1500 kPa
  criticalMoistureTheta: number;   // θ_crit (%) umbral de estrés (PAW ~50%)
  saturationTheta: number;         // θ_sat (%) porosidad total
  bulkDensityGcm3: number;         // Densidad aparente (g/cm³)
  clayPercent: number;
  sandPercent: number;
  description: string;
}

export const REGIONAL_SOIL_HYDRAULICS: Record<SoilTextureType, SoilHydraulicProperties> = {
  arenoso: {
    texture: 'arenoso',
    displayName: 'Arenoso / Sabanas Orientales',
    fieldCapacityTheta: 14.0,
    wiltingPointTheta: 6.0,
    criticalMoistureTheta: 9.0,
    saturationTheta: 38.0,
    bulkDensityGcm3: 1.55,
    clayPercent: 8.0,
    sandPercent: 82.0,
    description: 'Suelos de sabana ligera con rápida infiltración y baja retención de humedad.'
  },
  franco: {
    texture: 'franco',
    displayName: 'Franco / "Tierra Mansa"',
    fieldCapacityTheta: 28.0,
    wiltingPointTheta: 14.0,
    criticalMoistureTheta: 20.0,
    saturationTheta: 46.0,
    bulkDensityGcm3: 1.35,
    clayPercent: 20.0,
    sandPercent: 40.0,
    description: 'Suelos equilibrados ideales para cereales y hortalizas, con óptima aireación y retención.'
  },
  arcilloso: {
    texture: 'arcilloso',
    displayName: 'Arcilloso / "Tierra Brava" (Vertisoles)',
    fieldCapacityTheta: 44.0,
    wiltingPointTheta: 28.0,
    criticalMoistureTheta: 35.0,
    saturationTheta: 54.0,
    bulkDensityGcm3: 1.18,
    clayPercent: 55.0,
    sandPercent: 15.0,
    description: 'Vertisoles pesados de alta capilaridad; 30% de humedad se encuentra cerca del punto de marchitez.'
  }
};

/**
 * Normaliza cualquier denominación vernacular o técnica a una de las 3 categorías principales.
 */
export function normalizeSoilTexture(rawTexture?: string | null): SoilTextureType {
  if (!rawTexture) return 'franco';
  const clean = rawTexture.toLowerCase().trim();

  if (clean.includes('aren') || clean.includes('oxisol')) {
    return 'arenoso';
  }
  if (clean.includes('arcill') || clean.includes('vertisol') || clean.includes('brava')) {
    return 'arcilloso';
  }
  return 'franco';
}

/**
 * Calcula el porcentaje de Agua Fácilmente Disponible para la Planta (PAW).
 * PAW (%) = ((θ - θ_PWP) / (θ_FC - θ_PWP)) * 100
 */
export function calculatePAW(moisturePct: number, fc: number, pwp: number): number {
  if (moisturePct <= pwp) return 0.0;
  if (moisturePct >= fc) return 100.0;
  const paw = ((moisturePct - pwp) / (fc - pwp)) * 100.0;
  return Number(Math.max(0.0, Math.min(100.0, paw)).toFixed(1));
}

/**
 * Estima el potencial mátrico del suelo (ψ_m en kPa negativo) según la curva Saxton-Rawls.
 */
export function estimateMatricPotentialKPa(moisturePct: number, texture: SoilTextureType): number {
  const props = REGIONAL_SOIL_HYDRAULICS[texture];
  if (moisturePct >= props.saturationTheta) {
    return -5.0; // Casi saturación / agua gravitacional
  }
  if (moisturePct >= props.fieldCapacityTheta) {
    // Entre saturación y capacidad de campo (-5 a -33 kPa)
    const ratio = (props.saturationTheta - moisturePct) / (props.saturationTheta - props.fieldCapacityTheta);
    return Number((-5.0 - ratio * 28.0).toFixed(1));
  }
  if (moisturePct <= props.wiltingPointTheta) {
    // Por debajo del punto de marchitez permanente (-1500 a -2000 kPa)
    const deficit = (props.wiltingPointTheta - moisturePct) / Math.max(1, props.wiltingPointTheta);
    return Number((-1500.0 - deficit * 500.0).toFixed(1));
  }

  // Entre capacidad de campo y marchitez permanente (-33 a -1500 kPa)
  const paw = calculatePAW(moisturePct, props.fieldCapacityTheta, props.wiltingPointTheta);
  // Relación logarítmica característica de desorción
  const logPot = -33.0 * Math.pow(props.fieldCapacityTheta / Math.max(1, moisturePct), texture === 'arcilloso' ? 5.2 : 3.8);
  return Number(Math.max(-1500.0, Math.min(-33.0, logPot)).toFixed(1));
}

export interface SoilWaterEvaluation {
  texture: SoilTextureType;
  displayName: string;
  moisturePct: number;
  plantAvailableWaterPct: number;
  matricPotentialKPa: number;
  criticalThreshold: number;
  fieldCapacity: number;
  wiltingPoint: number;
  isDeficit: boolean;
  status: 'OPTIMO' | 'ESTRES_LEVE' | 'ESTRES_CRITICO' | 'SATURADO_ANXIA';
  statusLabel: string;
  recommendedAction: 'NONE' | 'IRRIGATE' | 'SUPPRESS_RAIN' | 'DRAINAGE_CHECK';
}

/**
 * Evalúa el estado hídrico del cultivo integrando textura y pronóstico de lluvia de NASA POWER.
 */
export function evaluateSoilWaterStatus(
  moisturePct: number,
  rawTexture: string = 'franco',
  forecastRain6hMm: number = 0.0
): SoilWaterEvaluation {
  const texture = normalizeSoilTexture(rawTexture);
  const props = REGIONAL_SOIL_HYDRAULICS[texture];
  const paw = calculatePAW(moisturePct, props.fieldCapacityTheta, props.wiltingPointTheta);
  const matricPotential = estimateMatricPotentialKPa(moisturePct, texture);

  const isDeficit = moisturePct < props.criticalMoistureTheta || paw < 50.0;
  const isSaturated = moisturePct >= props.saturationTheta * 0.95;
  const rainImminent = forecastRain6hMm >= 5.0;

  let status: SoilWaterEvaluation['status'] = 'OPTIMO';
  let statusLabel = 'Humedad óptima para absorción radicular';
  let recommendedAction: SoilWaterEvaluation['recommendedAction'] = 'NONE';

  if (isSaturated) {
    status = 'SATURADO_ANXIA';
    statusLabel = 'Riesgo de asfixia radicular por exceso de agua';
    recommendedAction = 'DRAINAGE_CHECK';
  } else if (moisturePct <= props.wiltingPointTheta) {
    status = 'ESTRES_CRITICO';
    statusLabel = 'Estrés hídrico severo: suelo en punto de marchitez permanente';
    recommendedAction = rainImminent ? 'SUPPRESS_RAIN' : 'IRRIGATE';
  } else if (isDeficit) {
    status = 'ESTRES_LEVE';
    statusLabel = `Déficit hídrico (${paw}% PAW): agotamiento por encima del 50%`;
    recommendedAction = rainImminent ? 'SUPPRESS_RAIN' : 'IRRIGATE';
  }

  return {
    texture,
    displayName: props.displayName,
    moisturePct,
    plantAvailableWaterPct: paw,
    matricPotentialKPa: matricPotential,
    criticalThreshold: props.criticalMoistureTheta,
    fieldCapacity: props.fieldCapacityTheta,
    wiltingPoint: props.wiltingPointTheta,
    isDeficit,
    status,
    statusLabel,
    recommendedAction
  };
}
