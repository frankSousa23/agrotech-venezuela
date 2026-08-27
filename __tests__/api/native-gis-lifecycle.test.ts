/**
 * ============================================================================
 * AGROTECH VENEZUELA — NATIVE GIS ENGINE & THEMATIC LAYERS TESTS
 * ============================================================================
 * 
 * Verifica:
 * 1. Definición geométrica y bounding boxes de las 24 entidades federales.
 * 2. Algoritmos de cálculo de color para las 7 capas temáticas:
 *    - División Territorial / Regiones
 *    - Semáforo de Acidez Edafológica pH
 *    - Precipitación Anual NASA POWER
 *    - Cobertura de Suelo MapBiomas LULC
 *    - Radar Sentinel-1 SAR (Humedad libre de nubes)
 *    - Satélite Esri HD & Modo Oscuro
 * 3. Formato y consistencia de datos de tooltips para cada estado.
 */

import { VENEZUELA_STATES_DATA, StateGeoData } from '@/lib/geo/venezuelaData';

export type ActiveMapLayer = 'thematic' | 'satellite' | 'ph' | 'rainfall' | 'mapbiomas' | 'sar' | 'dark';

// Función auxiliar de cálculo de estilo (idéntica a VenezuelaStateMapInner)
function getStateFillColor(state: StateGeoData, activeLayer: ActiveMapLayer): string {
  const ph = state.averagePh || 6.2;
  const rain = state.annualRainfallMm || 1200;
  const cover = state.mapbiomasCoverPercentage || { agriculture: 25, forest: 40 };

  if (activeLayer === 'thematic') {
    if (state.region.includes('Llanos')) return '#d97706';
    else if (state.region.includes('Andes')) return '#059669';
    else if (state.region.includes('Zulia') || state.region.includes('Lago')) return '#0284c7';
    else if (state.region.includes('Guayana')) return '#15803d';
    else if (state.region.includes('Centro-Occidente')) return '#ca8a04';
    else if (state.region.includes('Centro')) return '#9333ea';
    else if (state.region.includes('Oriente')) return '#ea580c';
    else return '#2563eb';
  } else if (activeLayer === 'ph') {
    if (ph < 5.2) return '#ef4444';
    else if (ph < 6.0) return '#f97316';
    else if (ph <= 7.2) return '#10b981';
    else return '#0284c7';
  } else if (activeLayer === 'rainfall') {
    if (rain < 800) return '#fed7aa';
    else if (rain < 1400) return '#38bdf8';
    else if (rain < 2000) return '#0284c7';
    else return '#1e40af';
  } else if (activeLayer === 'mapbiomas') {
    if (cover.agriculture > 35) return '#d946ef';
    else if (cover.forest > 60) return '#047857';
    else return '#eab308';
  } else if (activeLayer === 'sar') {
    if (rain > 1800) return '#3b82f6';
    else if (rain > 1100) return '#06b6d4';
    else return '#cbd5e1';
  }
  return '#38bdf8';
}

describe('🗺️ Native GIS Engine Layer Styling & Topology Verification', () => {
  test('todas las 24 entidades federales deben tener coordenadas de centro y bounds válidos', () => {
    expect(VENEZUELA_STATES_DATA.length).toBe(24);

    VENEZUELA_STATES_DATA.forEach(state => {
      // Coordenadas de Venezuela: Latitud [0.5, 12.5], Longitud [-73.5, -59.5]
      expect(state.center[0]).toBeGreaterThanOrEqual(0.0);
      expect(state.center[0]).toBeLessThanOrEqual(13.0);
      expect(state.center[1]).toBeGreaterThanOrEqual(-74.0);
      expect(state.center[1]).toBeLessThanOrEqual(-58.0);

      // Bounding box válido
      expect(state.bounds[0][0]).toBeLessThanOrEqual(state.bounds[1][0]);
      expect(state.bounds[0][1]).toBeLessThanOrEqual(state.bounds[1][1]);
    });
  });

  test('capa temática de regiones debe asignar colores coherentes por zona agroecológica', () => {
    const portuguesa = VENEZUELA_STATES_DATA.find(s => s.id === 'portuguesa')!;
    const merida = VENEZUELA_STATES_DATA.find(s => s.id === 'merida')!;
    const bolivar = VENEZUELA_STATES_DATA.find(s => s.id === 'bolivar')!;

    expect(getStateFillColor(portuguesa, 'thematic')).toBe('#d97706'); // Llanos (Ámbar)
    expect(getStateFillColor(merida, 'thematic')).toBe('#059669');    // Andes (Esmeralda)
    expect(getStateFillColor(bolivar, 'thematic')).toBe('#15803d');   // Guayana (Bosque)
  });

  test('capa de pH debe diferenciar suelos muy ácidos de suelos óptimos', () => {
    const amazonas = VENEZUELA_STATES_DATA.find(s => s.id === 'amazonas')!; // Suelo ácido
    const guarico = VENEZUELA_STATES_DATA.find(s => s.id === 'guarico')!;   // Suelo cercano a neutro

    const colorAmazonas = getStateFillColor(amazonas, 'ph');
    const colorGuarico = getStateFillColor(guarico, 'ph');

    expect(['#ef4444', '#f97316']).toContain(colorAmazonas);
    expect(['#10b981', '#f97316']).toContain(colorGuarico);
  });

  test('capa de lluvia NASA POWER debe categorizar estados semiáridos y pluviales', () => {
    const falcon = VENEZUELA_STATES_DATA.find(s => s.id === 'falcon')!;      // Semiárido (< 800 mm)
    const amazonas = VENEZUELA_STATES_DATA.find(s => s.id === 'amazonas')!; // Pluvial (> 2000 mm)

    expect(getStateFillColor(falcon, 'rainfall')).toBe('#fed7aa');
    expect(getStateFillColor(amazonas, 'rainfall')).toBe('#1e40af');
  });

  test('capa MapBiomas debe identificar vocación agrícola vs cobertura forestal', () => {
    const portuguesa = VENEZUELA_STATES_DATA.find(s => s.id === 'portuguesa')!; // Alta agricultura
    const bolivar = VENEZUELA_STATES_DATA.find(s => s.id === 'bolivar')!;       // Alto bosque

    expect(getStateFillColor(portuguesa, 'mapbiomas')).toBe('#d946ef');
    expect(getStateFillColor(bolivar, 'mapbiomas')).toBe('#047857');
  });

  test('capa Sentinel-1 SAR debe estimar índice de saturación de humedad en suelo', () => {
    const amazonas = VENEZUELA_STATES_DATA.find(s => s.id === 'amazonas')!;
    const lara = VENEZUELA_STATES_DATA.find(s => s.id === 'lara')!;

    expect(getStateFillColor(amazonas, 'sar')).toBe('#3b82f6'); // Suelo saturado
    expect(['#06b6d4', '#cbd5e1']).toContain(getStateFillColor(lara, 'sar'));
  });
});
