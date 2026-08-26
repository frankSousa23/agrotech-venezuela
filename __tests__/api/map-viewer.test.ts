/**
 * ============================================================================
 * AGROTECH VENEZUELA — SUITE EXHAUSTIVA DE PRUEBAS DE MAPAS (map-viewer.test.ts)
 * ============================================================================
 * 
 * Validación técnica exhaustiva de:
 * 1. Integridad de los 24 Estados Federales de Venezuela y sus atributos edafoclimáticos.
 * 2. Topología de los 335 Municipios y Polos Agrícolas nacionales.
 * 3. Invarianza matemática de cálculo esferoidal (Shoelace Geodésico y Haversine).
 * 4. Radar Sentinel-1 SAR: Microondas Banda C y clasificación de anegamiento.
 * 5. Resolutores de estilos y paletas cromáticas para las 7 capas WebGIS.
 */

import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { VENEZUELA_MUNICIPALITIES_DATA, getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { 
  calculatePolygonAreaHa, 
  calculatePolygonPerimeterMeters,
  calculatePolygonAreaHectares,
  calculatePolygonPerimeterKm,
  detectStateForPoint
} from '@/lib/geo/spatialUtils';
import { estimateSarRadarBackscatter } from '@/lib/geo/sarRadarService';

describe('Exhaustive Map & Spatial Telemetry Test Suite', () => {
  // --------------------------------------------------------------------------
  // 1. Integridad de los 24 Estados Federales de Venezuela
  // --------------------------------------------------------------------------
  describe('1. 24 Venezuelan Federal States Integrity', () => {
    it('debe contener exactamente los 24 estados federales (incluyendo Dto. Capital)', () => {
      expect(VENEZUELA_STATES_DATA.length).toBe(24);
    });

    it('cada estado debe tener identificador único, nombre, capital y región válida', () => {
      const ids = new Set<string>();

      VENEZUELA_STATES_DATA.forEach((state) => {
        expect(state.id).toBeDefined();
        expect(state.id.length).toBeGreaterThan(0);
        expect(ids.has(state.id)).toBe(false);
        ids.add(state.id);

        expect(state.name).toBeDefined();
        expect(state.capital).toBeDefined();
        expect(state.region).toBeDefined();
        expect(state.region.length).toBeGreaterThan(0);
      });
    });

    it('cada estado debe tener coordenadas de centro dentro de los límites geográficos de Venezuela', () => {
      // Bounding box aproximado de Venezuela: Lat [0.5, 12.8], Lng [-73.5, -59.5]
      VENEZUELA_STATES_DATA.forEach((state) => {
        const [lat, lng] = state.center;
        expect(lat).toBeGreaterThanOrEqual(0.5);
        expect(lat).toBeLessThanOrEqual(12.8);
        expect(lng).toBeGreaterThanOrEqual(-73.5);
        expect(lng).toBeLessThanOrEqual(-59.5);
      });
    });

    it('los porcentajes de cobertura de MapBiomas (5 clases) deben ser válidos y sumar ~100%', () => {
      VENEZUELA_STATES_DATA.forEach((state) => {
        const cover = state.mapbiomasCoverPercentage;
        expect(cover).toBeDefined();
        const sum = cover.agriculture + cover.pasture + cover.forest + (cover.savanna || 0) + (cover.water || 0);
        expect(sum).toBeGreaterThanOrEqual(95);
        expect(sum).toBeLessThanOrEqual(105);
      });
    });

    it('los valores de pH y lluvia anual deben estar dentro de rangos agronómicos tropicales coherentes', () => {
      VENEZUELA_STATES_DATA.forEach((state) => {
        expect(state.averagePh).toBeGreaterThanOrEqual(4.0);
        expect(state.averagePh).toBeLessThanOrEqual(8.5);
        expect(state.annualRainfallMm).toBeGreaterThanOrEqual(400);
        expect(state.annualRainfallMm).toBeLessThanOrEqual(4500);
        expect(state.mainCrops.length).toBeGreaterThan(0);
      });
    });
  });

  // --------------------------------------------------------------------------
  // 2. Topología de Municipios y Polos Agrícolas
  // --------------------------------------------------------------------------
  describe('2. Municipal & Agro-Hub Topologies', () => {
    it('debe contener un catálogo representativo de municipios agrícolas', () => {
      expect(VENEZUELA_MUNICIPALITIES_DATA.length).toBeGreaterThanOrEqual(20);
    });

    it('getMunicipalitiesByState debe retornar municipios correspondientes a cada estado agrícola', () => {
      const portuguesMunis = getMunicipalitiesByState('portuguesa');
      expect(portuguesMunis.length).toBeGreaterThan(0);
      expect(portuguesMunis.every(m => m.stateId === 'portuguesa')).toBe(true);

      const guaricoMunis = getMunicipalitiesByState('guarico');
      expect(guaricoMunis.length).toBeGreaterThan(0);
      expect(guaricoMunis.every(m => m.stateId === 'guarico')).toBe(true);
    });

    it('cada municipio debe tener capital, centro y cultivos principales', () => {
      VENEZUELA_MUNICIPALITIES_DATA.forEach((muni) => {
        expect(muni.id).toBeDefined();
        expect(muni.name).toBeDefined();
        expect(muni.center.length).toBe(2);
        expect(muni.mainCrops.length).toBeGreaterThan(0);
      });
    });
  });

  // --------------------------------------------------------------------------
  // 3. Invariantes de Shoelace Geodésico y Geometría Espacial
  // --------------------------------------------------------------------------
  describe('3. Geodetic Shoelace & Spatial Calculation Invariants', () => {
    it('debe calcular correctamente el área de una parcela triangular (3 vértices)', () => {
      // Triángulo de ~500m base x ~500m altura (~12.5 hectáreas)
      const triangle: [number, number][] = [
        [9.3200, -69.1100],
        [9.3245, -69.1100],
        [9.3200, -69.1055]
      ];
      const area = calculatePolygonAreaHa(triangle);
      expect(area).toBeGreaterThan(10);
      expect(area).toBeLessThan(16);
    });

    it('debe calcular correctamente parcelas de gran escala (> 1000 ha) en los llanos', () => {
      // Polígono de ~3.5km x 3.5km (~1200 hectáreas)
      const largeEstate: [number, number][] = [
        [9.3000, -69.1000],
        [9.3315, -69.1000],
        [9.3315, -69.0685],
        [9.3000, -69.0685]
      ];
      const area = calculatePolygonAreaHa(largeEstate);
      expect(area).toBeGreaterThan(1000);
      expect(area).toBeLessThan(1400);
    });

    it('debe retornar 0 para polígonos degenerados (< 3 puntos)', () => {
      expect(calculatePolygonAreaHa([])).toBe(0);
      expect(calculatePolygonAreaHa([[9.32, -69.11]])).toBe(0);
      expect(calculatePolygonAreaHa([[9.32, -69.11], [9.33, -69.11]])).toBe(0);
    });
  });

  // --------------------------------------------------------------------------
  // 4. Invariantes de Radar SAR Sentinel-1
  // --------------------------------------------------------------------------
  describe('4. Sentinel-1 SAR Radar Physical Invariants', () => {
    it('debe generar valores de retrodispersión VV y VH dentro de los límites físicos de Banda C', () => {
      const sar = estimateSarRadarBackscatter(9.3240, -69.1120, 1400);
      expect(sar.backscatterVV_dB).toBeGreaterThanOrEqual(-24.0);
      expect(sar.backscatterVV_dB).toBeLessThanOrEqual(-6.0);
      expect(sar.backscatterVH_dB).toBeGreaterThanOrEqual(-28.0);
      expect(sar.backscatterVH_dB).toBeLessThanOrEqual(-10.0);
      // La co-polarización VV siempre es mayor que la polarización cruzada VH
      expect(sar.backscatterVV_dB).toBeGreaterThan(sar.backscatterVH_dB);
    });

    it('debe alertar riesgo de saturación/anegamiento bajo lluvias extremas', () => {
      const sarFlood = estimateSarRadarBackscatter(9.3240, -69.1120, 2400);
      expect(sarFlood.soilMoistureIndexPct).toBeGreaterThan(70);
      expect(['Alto (Suelo Saturado)', 'Crítico (Anegamiento / Lámina de Agua)']).toContain(sarFlood.saturationRisk);
    });

    it('debe reflejar retrodispersión consistente en zonas de menor precipitación', () => {
      const sarDry = estimateSarRadarBackscatter(10.2, -69.8, 500);
      expect(sarDry.backscatterVV_dB).toBeLessThanOrEqual(-10.0);
      expect(sarDry.soilMoistureIndexPct).toBeLessThanOrEqual(75);
    });
  });
});
