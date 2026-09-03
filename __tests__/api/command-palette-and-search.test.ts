/**
 * ============================================================================
 * AGROTECH VENEZUELA — COMMAND PALETTE & SEARCH TESTS
 * ============================================================================
 * 
 * Verifica:
 * 1. Indexación completa de las 24 entidades federales venezolanas.
 * 2. Catálogo de herramientas y módulos del ecosistema WebGIS.
 * 3. Búsqueda tolerante a tildes y mayúsculas/minúsculas.
 * 4. Filtrado por cultivos estratégicos y requerimientos agroclimáticos.
 */

import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';

describe('🔍 Command Palette & Omnibox Search Engine', () => {
  // Función auxiliar de normalización idéntica a la UI
  const normalize = (text: string) =>
    text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const searchItems = (query: string, items: Array<{ title: string; subtitle: string }>) => {
    const q = normalize(query.trim());
    if (!q) return items;
    return items.filter(
      item => normalize(item.title).includes(q) || normalize(item.subtitle).includes(q)
    );
  };

  const statesCatalog = VENEZUELA_STATES_DATA.map(st => ({
    id: st.id,
    title: `🇻🇪 ${st.name}`,
    subtitle: `Capital: ${st.capital} • Región ${st.region} • pH: ${st.averagePh} • ${st.annualRainfallMm} mm/año`,
    crops: st.mainCrops
  }));

  const toolsCatalog = [
    { title: 'Visor WebGIS (3 Niveles)', subtitle: 'Explorador Nacional, Municipal y Micro-Parcelas Sentinel-2' },
    { title: 'Mis Tierras & Fincas', subtitle: 'Gestión de lotes delimitados y diagnósticos satelitales' },
    { title: 'Cuaderno de Campo Digital', subtitle: 'Bitácora cronológica de siembras, encalados y fertilización' },
    { title: 'Simulador Edafológico & Asesor Gemini AI', subtitle: 'Prescripción NPK, curvas de encalado y dictamen IA' },
    { title: '🔬 Laboratorio Agro-IoT & Micro-Cultivo', subtitle: 'Simulador de riego predictivo, ESP32 y sensores in-situ' },
    { title: 'Calculadora de Créditos de Carbono MRV', subtitle: 'Cuantificación SOC y valoración económica IPCC Tier 2' },
    { title: 'Geoestadísticas Agroclimáticas', subtitle: 'Series temporales multianuales de lluvia y temperatura' },
    { title: 'Panel de Administración', subtitle: 'Aprobación de productores y auditoría de seguridad' },
  ];

  test('debe indexar exactamente las 24 entidades federales de Venezuela', () => {
    expect(statesCatalog.length).toBe(24);
    const portuguesas = statesCatalog.filter(s => s.id === 'portuguesa');
    expect(portuguesas.length).toBe(1);
    expect(portuguesas[0].subtitle).toContain('Guanare');
  });

  test('debe encontrar estados sin importar acentos o mayúsculas (Táchira, Mérida, Guárico)', () => {
    const resTachira = searchItems('tachira', statesCatalog);
    expect(resTachira.length).toBeGreaterThanOrEqual(1);
    expect(resTachira[0].title).toContain('Táchira');

    const resMerida = searchItems('MERIDA', statesCatalog);
    expect(resMerida.length).toBeGreaterThanOrEqual(1);
    expect(resMerida[0].title).toContain('Mérida');

    const resGuarico = searchItems('guarico', statesCatalog);
    expect(resGuarico.length).toBeGreaterThanOrEqual(1);
    expect(resGuarico[0].title).toContain('Guárico');
  });

  test('debe filtrar herramientas esenciales por palabra clave', () => {
    const resBitacora = searchItems('bitacora', toolsCatalog);
    expect(resBitacora.length).toBe(1);
    expect(resBitacora[0].title).toContain('Cuaderno de Campo Digital');

    const resCarbon = searchItems('carbono', toolsCatalog);
    expect(resCarbon.length).toBe(1);
    expect(resCarbon[0].title).toContain('Calculadora de Créditos de Carbono');

    const resWebGIS = searchItems('sentinel', toolsCatalog);
    expect(resWebGIS.length).toBe(1);
    expect(resWebGIS[0].title).toContain('Visor WebGIS');

    const resIoT = searchItems('iot', toolsCatalog);
    expect(resIoT.length).toBe(1);
    expect(resIoT[0].title).toContain('Laboratorio Agro-IoT');
  });

  test('debe retornar resultados por cultivo agronómico asociado a los estados', () => {
    const maizStates = VENEZUELA_STATES_DATA.filter(st =>
      st.mainCrops.some(c => normalize(c).includes('maiz') || normalize(c).includes('maíz'))
    );
    expect(maizStates.length).toBeGreaterThanOrEqual(3);
    const stateNames = maizStates.map(s => s.name);
    expect(stateNames).toContain('Portuguesa');
    expect(stateNames).toContain('Guárico');
  });

  test('debe manejar consultas vacías o con espacios sin lanzar excepciones', () => {
    const emptyQuery = searchItems('   ', toolsCatalog);
    expect(emptyQuery.length).toBe(toolsCatalog.length);
  });
});
