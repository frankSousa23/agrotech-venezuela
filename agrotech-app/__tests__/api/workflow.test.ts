import { 
  calculatePolygonAreaHa, 
  calculatePolygonPerimeterMeters, 
  calculateCentroid, 
  detectStateFromCoords,
  evaluateCropSuitability,
  calculateSoilAmendments,
  ParcelGeometry
} from '@/lib/geo/spatialUtils';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';

describe('Workflow Integral de Plataforma: Gemelo Digital y Prescripción de Finca', () => {
  // Caso de Estudio 1: Finca Platanera en el Sur del Lago de Maracaibo (Zulia)
  describe('Flujo de Finca en Zona Ácida (Sur del Lago, Zulia)', () => {
    // Polígono de 4 vértices en Santa Bárbara del Zulia [8.98, -71.72]
    const zuliaFarmCoords: [number, number][] = [
      [8.980, -71.720],
      [8.980, -71.710],
      [8.970, -71.710],
      [8.970, -71.720]
    ];

    it('Paso 1: Delimitación de polígono y cálculo geodésico de superficie y perímetro', () => {
      const areaHa = calculatePolygonAreaHa(zuliaFarmCoords);
      const perimeterM = calculatePolygonPerimeterMeters(zuliaFarmCoords);
      const centroid = calculateCentroid(zuliaFarmCoords);

      expect(areaHa).toBeGreaterThan(100);
      expect(perimeterM).toBeGreaterThan(3000);
      expect(centroid[0]).toBeCloseTo(8.975, 3);
      expect(centroid[1]).toBeCloseTo(-71.715, 3);
    });

    it('Paso 2: Detección territorial automática del estado Zulia y sus coberturas MapBiomas', () => {
      const centroid = calculateCentroid(zuliaFarmCoords);
      const detectedState = detectStateFromCoords(centroid[0], centroid[1]);

      expect(detectedState.id).toBe('zulia');
      expect(detectedState.name).toBe('Zulia');
      expect(detectedState.region).toBe('Zuliana');
      expect(detectedState.mapbiomasCover.pasture).toBeGreaterThan(30);
    });

    it('Paso 3: Diagnóstico edafológico y ranking de cultivos (AHP)', () => {
      const detectedState = detectStateFromCoords(8.975, -71.715);
      const suitability = evaluateCropSuitability(
        detectedState.avgPh,
        detectedState.organicMatterPct,
        detectedState.soilTexture,
        detectedState.annualRainfallMm
      );

      expect(suitability.length).toBeGreaterThan(5);
      // Plátano debe estar en los primeros lugares debido al suelo franco-arcilloso y alta lluvia
      const platano = suitability.find(c => c.cropName.includes('Plátano'));
      expect(platano).toBeDefined();
      expect(platano!.suitabilityScore).toBeGreaterThanOrEqual(75);
    });

    it('Paso 4: Prescripción de enmiendas y cálculo exacto de cal dolomítica para el total de la finca', () => {
      const areaHa = calculatePolygonAreaHa(zuliaFarmCoords);
      const detectedState = detectStateFromCoords(8.975, -71.715);
      const amendments = calculateSoilAmendments(detectedState.avgPh, detectedState.organicMatterPct, areaHa, 'Plátano');

      expect(amendments.needsLiming).toBe(true);
      expect(amendments.limeTonsPerHa).toBeGreaterThan(0);
      expect(amendments.totalLimeTons).toBe(Math.round(amendments.limeTonsPerHa * areaHa * 10) / 10);
      expect(amendments.fertilizerPlan.commercialFormula).toBeDefined();
      expect(amendments.technicalNotes.length).toBeGreaterThan(0);
    });

    it('Paso 5: Serialización de Gemelo Digital a GeoJSON estándar', () => {
      const areaHa = calculatePolygonAreaHa(zuliaFarmCoords);
      const perimeterM = calculatePolygonPerimeterMeters(zuliaFarmCoords);
      const centroid = calculateCentroid(zuliaFarmCoords);
      const detectedState = detectStateFromCoords(centroid[0], centroid[1]);

      const parcel: ParcelGeometry = {
        name: 'Hacienda El Platanal Sur',
        coordinates: zuliaFarmCoords,
        areaHectares: areaHa,
        perimeterMeters: perimeterM,
        centroid,
        detectedState
      };

      const geojson = {
        type: 'Feature',
        properties: {
          name: parcel.name,
          areaHa: parcel.areaHectares,
          perimeterM: parcel.perimeterMeters,
          state: parcel.detectedState?.name,
          avgPh: parcel.detectedState?.avgPh
        },
        geometry: {
          type: 'Polygon',
          coordinates: [parcel.coordinates.map(([lat, lng]) => [lng, lat])]
        }
      };

      expect(geojson.type).toBe('Feature');
      expect(geojson.geometry.type).toBe('Polygon');
      expect(geojson.geometry.coordinates[0].length).toBe(4);
      expect(geojson.properties.areaHa).toBe(areaHa);
    });
  });

  // Caso de Estudio 2: Finca Cerealera en Turén (Portuguesa)
  describe('Flujo de Finca Cerealera en Suelo Óptimo (Turén, Portuguesa)', () => {
    const portugesaCoords: [number, number][] = [
      [9.320, -69.120],
      [9.320, -69.110],
      [9.310, -69.110],
      [9.310, -69.120]
    ];

    it('Paso 1: Detecta Portuguesa y verifica alta aptitud para Maíz sin requerir encalado', () => {
      const centroid = calculateCentroid(portugesaCoords);
      const state = detectStateFromCoords(centroid[0], centroid[1]);
      expect(state.id).toBe('portuguesa');

      const suitability = evaluateCropSuitability(state.avgPh, state.organicMatterPct, state.soilTexture, state.annualRainfallMm);
      const maiz = suitability.find(c => c.cropName.includes('Maíz'));
      expect(maiz).toBeDefined();
      expect(maiz!.suitabilityScore).toBeGreaterThanOrEqual(85);

      const amendments = calculateSoilAmendments(state.avgPh, state.organicMatterPct, 50, 'Maíz');
      expect(amendments.needsLiming).toBe(false);
      expect(amendments.totalLimeTons).toBe(0);
    });
  });
});
