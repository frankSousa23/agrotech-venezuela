import { IN_MEMORY_PARCELS } from '@/app/api/parcels/route';
import { IN_MEMORY_LOGS } from '@/app/api/field-logs/route';
import { 
  calculatePolygonAreaHa, 
  calculatePolygonPerimeterMeters, 
  calculateCentroid,
  detectStateFromCoords 
} from '@/lib/geo/spatialUtils';
import { MAPBIOMAS_ATTRIBUTION, MAPBIOMAS_CLASSES } from '@/lib/geo/venezuelaData';

describe('Comprehensive System Audit Suite — Frontend & Agronomic Dataflow', () => {
  describe('1. Cuaderno de Campo Digital (Field Diary QA)', () => {
    it('debe contener registros válidos para todas las categorías agronómicas clave', () => {
      const requiredTypes = ['ENCALADO', 'SIEMBRA', 'FERTILIZACION', 'COSECHA', 'OBSERVACION'];
      const presentTypes = new Set(IN_MEMORY_LOGS.map(l => l.logType));

      requiredTypes.forEach(t => {
        expect(presentTypes.has(t as any)).toBe(true);
      });
    });

    it('debe validar que los registros de encalado y fertilización tengan dosis especificadas', () => {
      const nutrientLogs = IN_MEMORY_LOGS.filter(l => l.logType === 'ENCALADO' || l.logType === 'FERTILIZACION');
      nutrientLogs.forEach(log => {
        expect(log.dosage).toBeDefined();
        expect(log.dosage?.length).toBeGreaterThan(3);
      });
    });

    it('debe validar que los registros de cosecha reporten rendimientos positivos en Ton/ha', () => {
      const harvestLogs = IN_MEMORY_LOGS.filter(l => l.logType === 'COSECHA');
      expect(harvestLogs.length).toBeGreaterThan(0);
      harvestLogs.forEach(log => {
        expect(log.yieldTonHa).toBeDefined();
        expect(log.yieldTonHa).toBeGreaterThan(0);
      });
    });
  });

  describe('2. Visor WebGIS Multi-Nivel & Geometría Shoelace', () => {
    it('debe calcular áreas con Shoelace geodésico esferoidal WGS84 con alta fidelidad', () => {
      // Coordenadas [lat, lng] de un cuadrilátero de prueba (~0.01 x 0.01 grados en Portuguesa)
      const testCoordinates: [number, number][] = [
        [9.320, -69.115],
        [9.320, -69.105],
        [9.330, -69.105],
        [9.330, -69.115],
        [9.320, -69.115]
      ];

      const areaHa = calculatePolygonAreaHa(testCoordinates);
      expect(areaHa).toBeGreaterThan(110);
      expect(areaHa).toBeLessThan(130);
    });

    it('debe calcular el perímetro geodésico con fórmula de Haversine', () => {
      const testCoordinates: [number, number][] = [
        [9.320, -69.115],
        [9.320, -69.105],
        [9.330, -69.105],
        [9.330, -69.115],
        [9.320, -69.115]
      ];

      const perimeterM = calculatePolygonPerimeterMeters(testCoordinates);
      expect(perimeterM).toBeGreaterThan(4000);
      expect(perimeterM).toBeLessThan(5000);
    });

    it('debe calcular centroides geométricos exactos de parcelas', () => {
      const testCoordinates: [number, number][] = [
        [9.320, -69.115],
        [9.320, -69.105],
        [9.330, -69.105],
        [9.330, -69.115]
      ];

      const centroid = calculateCentroid(testCoordinates);
      expect(centroid[0]).toBeCloseTo(9.325, 3);
      expect(centroid[1]).toBeCloseTo(-69.110, 3);
    });

    it('debe detectar el estado territorial correcto por Ray-Casting', () => {
      const state = detectStateFromCoords(9.324, -69.112);
      expect(state).toBeDefined();
      expect(state.id).toBe('portuguesa');
    });

    it('debe certificar la inclusión formal de atribución legal a MapBiomas y clases de cobertura', () => {
      expect(MAPBIOMAS_ATTRIBUTION).toBeDefined();
      expect(MAPBIOMAS_ATTRIBUTION.text).toContain('MapBiomas Venezuela');
      expect(MAPBIOMAS_ATTRIBUTION.url).toContain('terminos-de-uso');
      expect(MAPBIOMAS_CLASSES.length).toBeGreaterThanOrEqual(6);
    });
  });
});
