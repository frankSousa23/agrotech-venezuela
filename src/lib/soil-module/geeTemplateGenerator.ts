/**
 * ============================================================================
 * AGROTECH VENEZUELA — GENERADOR DE SCRIPTS GOOGLE EARTH ENGINE (GEE)
 * Módulo de Suelos de MapBiomas Venezuela
 * ============================================================================
 * 
 * Genera código JavaScript modular y listo para ejecutar en el Code Editor
 * de Google Earth Engine (https://code.earthengine.google.com/), permitiendo
 * a los investigadores de MapBiomas (Provita, LSIGMA USB, Wataniba)
 * procesar física de suelos Saxton-Rawls y enmiendas Kamprath sobre matrices
 * satelitales nacionales.
 */

export interface GeeTemplateOptions {
  includeVisualizationPalettes?: boolean;
  defaultPrnt?: number;
  maxLimingRateTonHa?: number;
  generatedDate?: string;
}

/**
 * Genera el script modular completo para Google Earth Engine.
 */
export function generateMapBiomasGeeScript(options: GeeTemplateOptions = {}): string {
  const prnt = options.defaultPrnt ?? 85.0;
  const maxLime = options.maxLimingRateTonHa ?? 3.0;
  const dateStr = options.generatedDate ?? new Date().toISOString().split('T')[0];

  return `/**
 * ==============================================================================
 * MAPBIOMAS VENEZUELA — MÓDULO DE SUELOS (GOOGLE EARTH ENGINE ENGINE)
 * ==============================================================================
 * Desarrollado por: Ing. Frank Alfonso Sousa Mota (Agrotech Venezuela - UNERG)
 * Integración: Red MapBiomas Venezuela (Provita, LSIGMA USB, Wataniba, RAISG)
 * Versión: 1.2.0 | Fecha de Generación: ${dateStr}
 * Licencia: MIT / Atribución CC BY 4.0 MapBiomas Venezuela
 * 
 * Uso en GEE Code Editor:
 *   var AgrotechSoil = require('users/agrotech/venezuela:soil_module');
 *   // O copiar y pegar directamente este script en el editor.
 * ==============================================================================
 */

// 1. DICCIONARIO DE PARÁMETROS HIDRÁULICOS REGIONALES SAXTON-RAWLS (USDA/ARS)
var SOIL_HYDRAULICS = {
  'arenoso': {
    fc: 14.0,       // Capacidad de Campo θ_FC (%) a -33 kPa
    pwp: 6.0,       // Marchitez Permanente θ_PWP (%) a -1500 kPa
    crit: 9.0,      // Umbral Crítico PAW 50%
    sat: 38.0,      // Saturación θ_sat (%)
    bulkDensity: 1.55 // Densidad aparente (g/cm³)
  },
  'franco': {
    fc: 28.0,
    pwp: 14.0,
    crit: 20.0,
    sat: 46.0,
    bulkDensity: 1.35
  },
  'arcilloso': {
    fc: 44.0,
    pwp: 28.0,
    crit: 35.0,
    sat: 54.0,
    bulkDensity: 1.18
  }
};

// 2. PALETAS DE COLOR CARTOGRÁFICAS OFICIALES
var SOIL_PALETTES = {
  paw: ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850'],
  ph: ['#e41a1c', '#ff7f00', '#ffff33', '#4daf4a', '#377eb8'],
  lime: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494']
};

/**
 * Calcula el Agua Fácilmente Aprovechable por la Planta (PAW %) como imagen raster en GEE.
 * Ecuación: PAW = clamp(((θ - θ_PWP) / (θ_FC - θ_PWP)) * 100, 0, 100)
 * 
 * @param {ee.Image} smImage - Imagen de humedad volumétrica de suelo (θ%).
 * @param {ee.Image|number} fc - Capacidad de campo (-33 kPa).
 * @param {ee.Image|number} pwp - Punto de marchitez permanente (-1500 kPa).
 * @return {ee.Image} Raster de PAW en porcentaje (0-100%).
 */
function computePAW(smImage, fc, pwp) {
  var fcImg = ee.Image(fc);
  var pwpImg = ee.Image(pwp);
  
  return smImage.expression(
    'clamp(((SM - PWP) / (FC - PWP)) * 100.0, 0.0, 100.0)', {
      'SM': smImage,
      'FC': fcImg,
      'PWP': pwpImg
    }
  ).rename('PAW_PERCENT');
}

/**
 * Calcula la dosis de encalado según el Modelo Kamprath Modificado para Sabanas Ácidas.
 * Ecuación: Dosis Cal (t/ha) = 1.5 * Al³⁺ * (100 / PRNT)
 * 
 * @param {ee.Image} phImage - Imagen de pH en agua.
 * @param {ee.Image} alImage - Imagen de aluminio intercambiable (meq/100g o cmol(+)/kg).
 * @param {number} prnt - Poder Relativo de Neutralización Total (por defecto ${prnt}%).
 * @return {ee.Image} Raster de dosis de cal en toneladas por hectárea.
 */
function computeKamprathLiming(phImage, alImage, prnt) {
  var prntVal = prnt || ${prnt};
  var factor = ee.Number(1.5).multiply(ee.Number(100.0).divide(prntVal));
  
  var lime = alImage.multiply(factor);
  
  // Condicional: Solo aplicar si pH < 5.8, y limitar a ${maxLime} t/ha para evitar bloqueo de micronutrientes
  return lime
    .where(phImage.gte(5.8), 0.0)
    .clamp(0.0, ${maxLime})
    .rename('LIME_RATE_TON_HA');
}

/**
 * Evalúa necesidad de Yeso Agrícola (CaSO4·2H2O) para remediación de suelos salino-sódicos (Lara/Quíbor).
 * @param {ee.Image} phImage - Imagen de pH.
 * @return {ee.Image} Dosis de yeso (t/ha).
 */
function computeGypsumReclamation(phImage) {
  // En suelos alcalinos salino-sódicos (pH >= 7.4), se prescribe yeso agrícola a 2.5 t/ha
  return ee.Image(0.0)
    .where(phImage.gte(7.4), 2.5)
    .rename('GYPSUM_RATE_TON_HA');
}

/**
 * Muestra cómo aplicar el Módulo de Suelos sobre la Colección 3.0 de MapBiomas Venezuela.
 */
function runDemonstration() {
  // Coordenadas emblemáticas: Polo Agrícola de Turén, Portuguesa
  var turenPoint = ee.Geometry.Point([-69.112, 9.324]);
  Map.centerObject(turenPoint, 11);
  Map.setOptions('HYBRID');

  print('🌾 Módulo de Suelos de MapBiomas Venezuela inicializado correctamente.');
  print('Parámetros Saxton-Rawls disponibles:', SOIL_HYDRAULICS);
}

// Exportación modular para soporte en GEE
exports.SOIL_HYDRAULICS = SOIL_HYDRAULICS;
exports.SOIL_PALETTES = SOIL_PALETTES;
exports.computePAW = computePAW;
exports.computeKamprathLiming = computeKamprathLiming;
exports.computeGypsumReclamation = computeGypsumReclamation;
exports.runDemonstration = runDemonstration;
`;
}
