import { 
  generateVraPrescription, 
  generateDroneMission, 
  generateCabinCalibrationSheet, 
  VENEZUELA_UTM19N_PRJ 
} from '@/lib/geo/machineryExporter';

describe('Universal Precision Machinery Prescription Exporter Suite', () => {
  const sampleInput = {
    parcelId: 'pcl-demo-01',
    parcelName: 'Tablón La Esperanza',
    areaHectares: 25.5,
    coordinates: [
      [9.324, -69.112],
      [9.328, -69.112],
      [9.328, -69.108],
      [9.324, -69.108],
    ],
    targetCrop: 'Maíz Blanco',
    limeTonHa: 2.0,
    npkKgHa: 250,
    fertilizerFormula: 'NPK 12-24-12',
    stateName: 'Portuguesa',
  };

  describe('1. Prescripción VRA para Tractores con GPS (Shapefile)', () => {
    it('debe generar el descriptor Shapefile con atributos VRA en mayúsculas (<= 10 caracteres)', () => {
      const vra = generateVraPrescription(sampleInput);

      expect(vra.fileName).toContain('VRA_TABL');
      expect(vra.projectionPrj).toBe(VENEZUELA_UTM19N_PRJ);
      expect(vra.attributes.LOTE_ID).toBe('TABLÓN_LA_');
      expect(vra.attributes.AREA_HA).toBe(25.5);
      expect(vra.attributes.RATE_LIME).toBe(2.0);
      expect(vra.attributes.RATE_NPK).toBe(250);
      expect(vra.attributes.UTM_ZONE).toBe('19N');

      expect(vra.geoJsonFeature.geometry.type).toBe('Polygon');
      // Coordenadas deben estar en formato [lng, lat]
      expect(vra.geoJsonFeature.geometry.coordinates[0][0][0]).toBe(-69.112);
      expect(vra.geoJsonFeature.geometry.coordinates[0][0][1]).toBe(9.324);
    });
  });

  describe('2. Misión de Vuelo para Drones de Pulverización', () => {
    it('debe generar el archivo KML y parámetros de vuelo para drones agrícolas', () => {
      const mission = generateDroneMission(sampleInput);

      expect(mission.fileName).toContain('DRONE_');
      expect(mission.kmlContent).toContain('<kml');
      expect(mission.kmlContent).toContain('Tablón La Esperanza');
      expect(mission.flightParameters.recommendedAltitudeMeters).toBe(3.5);
      expect(mission.flightParameters.sprayRateLitersHa).toBe(15.0);
    });
  });

  describe('3. Ficha de Calibración de Cabina Analógica', () => {
    it('debe generar la ficha de 1 página con ajustes mecánicos para tractor sin GPS', () => {
      const sheet = generateCabinCalibrationSheet(sampleInput);

      expect(sheet.parcelName).toBe('Tablón La Esperanza');
      expect(sheet.spreaderCalibration.targetSpeedKmH).toBe(8.0);
      expect(sheet.spreaderCalibration.ptoRpm).toBe(1750);
      expect(sheet.htmlCard).toContain('FICHA DE CABINA: CALIBRACIÓN DE TRACTOR');
      expect(sheet.htmlCard).toContain('Cal Dolomítica (2 Ton/ha)');
    });
  });
});
