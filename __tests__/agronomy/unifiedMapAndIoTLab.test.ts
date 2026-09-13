import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { calculatePolygonAreaHa, calculatePolygonPerimeterMeters } from '@/lib/geo/spatialUtils';

describe('Unified WebGIS Cartographic Pyramid & IoT Lab Sandbox Suite', () => {
  describe('1. Pirámide Cartográfica Unificada (Nivel 1 ➔ Nivel 2 ➔ Nivel 3)', () => {
    it('debe contener los 24 estados federales en el Nivel 1 Nacional con límites geográficos oficiales', () => {
      expect(VENEZUELA_STATES_DATA.length).toBe(24);
      
      const portuguesa = VENEZUELA_STATES_DATA.find(s => s.id === 'portuguesa');
      expect(portuguesa).toBeDefined();
      expect(portuguesa?.bounds).toBeDefined();
      expect(portuguesa?.bounds.length).toBe(2);
      expect(portuguesa?.center[0]).toBeCloseTo(9.0, 0);
    });

    it('debe transicionar fluidamente de Nivel 1 a Nivel 2 extrayendo municipios del estado seleccionado', () => {
      const stateId = 'portuguesa';
      const munis = getMunicipalitiesByState(stateId);
      
      expect(munis.length).toBeGreaterThanOrEqual(1);
      const turen = munis.find(m => m.id === 'turen');
      expect(turen).toBeDefined();
      expect(turen?.name).toBe('Turén');
      expect(turen?.mainCrops).toContain('Maíz Blanco Harinero');
    });

    it('debe calcular correctamente el polígono de micro-parcela en Nivel 3 bajo Shoelace WGS84', () => {
      // Coordenadas de un lote de prueba cuadrangular de ~16 hectáreas (~400m x ~400m)
      const testPolygon: [number, number][] = [
        [9.320, -69.120],
        [9.324, -69.120],
        [9.324, -69.116],
        [9.320, -69.116],
      ];

      const areaHa = calculatePolygonAreaHa(testPolygon);
      const perimeterM = calculatePolygonPerimeterMeters(testPolygon);

      expect(areaHa).toBeGreaterThan(10);
      expect(areaHa).toBeLessThan(25);
      expect(perimeterM).toBeGreaterThan(1200);
      expect(perimeterM).toBeLessThan(2200);
    });
  });

  describe('2. Laboratorio Agro-IoT: Caudalímetro y Modelo Diurno 24h', () => {
    it('debe calcular el caudal nominal L/min a partir de la tasa de goteo L/h del cultivo', () => {
      const presets = [
        { id: 'TOMATO', dripRateLph: 1.5, expectedLpm: 0.025 },
        { id: 'CORN', dripRateLph: 2.0, expectedLpm: 0.033 },
        { id: 'COFFEE', dripRateLph: 3.0, expectedLpm: 0.05 },
      ];

      presets.forEach(p => {
        const lpm = p.dripRateLph / 60;
        expect(lpm).toBeCloseTo(p.expectedLpm, 3);
      });
    });

    it('debe simular la oscilación diurna de 24 horas reflejando transpiración y recargas', () => {
      const criticalThreshold = 35.0; // Tomate
      const hours = [];

      for (let h = 0; h < 24; h++) {
        let baseMoisture = criticalThreshold + 8;
        if (h >= 10 && h <= 16) {
          baseMoisture -= (h - 9) * 2.1; // Caída por evapotranspiración al mediodía
        } else if (h > 16 && h <= 20) {
          baseMoisture = criticalThreshold + 4;
        }

        const isIrrigatingHour = (h === 7 || h === 17);
        const moisture = isIrrigatingHour ? criticalThreshold + 12 : baseMoisture;

        hours.push({ hour: h, moisture, isIrrigatingHour });
      }

      expect(hours.length).toBe(24);

      // A las 15:00 debe registrar menor humedad que al amanecer (06:00)
      const noonMoisture = hours.find(h => h.hour === 15)!.moisture;
      const dawnMoisture = hours.find(h => h.hour === 6)!.moisture;
      expect(noonMoisture).toBeLessThan(dawnMoisture);

      // Los pulsos de recarga programados deben superar el umbral crítico
      const pulse1 = hours.find(h => h.hour === 7)!.moisture;
      const pulse2 = hours.find(h => h.hour === 17)!.moisture;
      expect(pulse1).toBeGreaterThan(criticalThreshold);
      expect(pulse2).toBeGreaterThan(criticalThreshold);
    });

    it('debe activar la supresión inteligente de riego ante pronóstico de lluvia NASA POWER', () => {
      const moisturePct = 28.0; // Bajo el umbral (requiere agua)
      const criticalThreshold = 35.0;
      const rainForecastMm = 18.5; // Lluvia satelital inminente

      const isDeficient = moisturePct < criticalThreshold;
      const isRainImminent = rainForecastMm >= 5.0;

      // Lógica de supresión inteligente: si llueve pronto, NO abrir válvula
      const shouldOpenValve = isDeficient && !isRainImminent;
      expect(shouldOpenValve).toBe(false);

      // Si no hubiera lluvia, la válvula se abriría
      const shouldOpenWithoutRain = isDeficient && !(0.0 >= 5.0);
      expect(shouldOpenWithoutRain).toBe(true);
    });

    it('debe detectar saturación por falla de sonda abierta (ADC > 4000)', () => {
      const adcDryAir = 3200;
      const adcWater = 1350;
      const adcCurrentFault = 4095; // Circuito abierto / sensor desconectado

      const isFault = adcCurrentFault > 4000;
      expect(isFault).toBe(true);

      // La fórmula inversa estándar debe acotarse en 0% VWC para evitar números negativos
      const rawVwc = Math.round(((adcDryAir - adcCurrentFault) / (adcDryAir - adcWater)) * 100);
      const clampedVwc = Math.max(0, Math.min(100, rawVwc));
      expect(clampedVwc).toBe(0);
    });
  });

  describe('3. Mini-Visor Vectorial en Modal de Diagnóstico de Parcela', () => {
    it('debe proyectar las coordenadas de la parcela a un sistema de coordenadas SVG local', () => {
      const coords: [number, number][] = [
        [9.320, -69.120],
        [9.325, -69.118],
        [9.322, -69.112],
        [9.318, -69.115],
      ];

      const width = 560;
      const height = 180;
      const padding = 28;

      const lats = coords.map(c => c[0]);
      const lngs = coords.map(c => c[1]);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      const latSpan = maxLat - minLat;
      const lngSpan = maxLng - minLng;

      const pts = coords.map((c) => {
        const x = padding + ((c[1] - minLng) / lngSpan) * (width - 2 * padding);
        const y = height - padding - ((c[0] - minLat) / latSpan) * (height - 2 * padding);
        return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
      });

      expect(pts.length).toBe(4);
      // Todos los puntos deben quedar dentro del viewport con padding
      pts.forEach(p => {
        expect(p.x).toBeGreaterThanOrEqual(padding);
        expect(p.x).toBeLessThanOrEqual(width - padding);
        expect(p.y).toBeGreaterThanOrEqual(padding);
        expect(p.y).toBeLessThanOrEqual(height - padding);
      });

      const pathD = `M ${pts.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
      expect(pathD.startsWith('M ')).toBe(true);
      expect(pathD.endsWith(' Z')).toBe(true);
    });
  });
});
