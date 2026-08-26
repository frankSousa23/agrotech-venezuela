import { 
  calculatePolygonAreaHectares, 
  calculatePolygonPerimeterKm, 
  detectStateForPoint, 
  calculatePointSuitability,
  calculatePolygonAreaHa,
  calculatePolygonPerimeterMeters
} from '@/lib/geo/spatialUtils';
import { 
  calculateMapBiomasTrajectory, 
  calculateMapBiomasAgua, 
  evaluateOrinocoConservationShield 
} from '@/lib/geo/mapbiomasTrajectory';
import { estimateVenezuelaAgroClimate } from '@/lib/geo/nasaPowerService';
import { estimateSarRadarBackscatter } from '@/lib/geo/sarRadarService';
import { calculateHydroThermalGdd } from '@/lib/geo/hydroThermalEngine';
import { getMunicipalitiesByState, VENEZUELA_MUNICIPALITIES_DATA } from '@/lib/geo/venezuelaMunicipalities';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';

describe('Spatial & Geodetic Algorithms Tests', () => {
  it('debe calcular correctamente el área de un polígono en hectáreas usando Shoelace geodésico', () => {
    // Parcela de ~1km x 1km en Turén (~100 hectáreas)
    const polygon = [
      { lat: 9.3200, lng: -69.1100 },
      { lat: 9.3290, lng: -69.1100 },
      { lat: 9.3290, lng: -69.1000 },
      { lat: 9.3200, lng: -69.1000 }
    ];
    const areaHa = calculatePolygonAreaHectares(polygon);
    expect(areaHa).toBeGreaterThan(90);
    expect(areaHa).toBeLessThan(130);
  });

  it('debe soportar coordenadas en formato tupla [lat, lng] para calculatePolygonAreaHa', () => {
    const coords: [number, number][] = [
      [9.3200, -69.1100],
      [9.3290, -69.1100],
      [9.3290, -69.1000],
      [9.3200, -69.1000]
    ];
    const areaHa = calculatePolygonAreaHa(coords);
    const perimM = calculatePolygonPerimeterMeters(coords);
    expect(areaHa).toBeGreaterThan(90);
    expect(perimM).toBeGreaterThan(3500);
  });

  it('debe calcular el perímetro en kilómetros usando Haversine', () => {
    const polygon = [
      { lat: 9.3200, lng: -69.1100 },
      { lat: 9.3290, lng: -69.1100 },
      { lat: 9.3290, lng: -69.1000 },
      { lat: 9.3200, lng: -69.1000 }
    ];
    const perimKm = calculatePolygonPerimeterKm(polygon);
    expect(perimKm).toBeGreaterThan(3.5);
    expect(perimKm).toBeLessThan(4.5);
  });

  it('debe detectar el estado territorial correcto por Point-in-Polygon (Ray Casting)', () => {
    const state = detectStateForPoint(9.3240, -69.1120);
    expect(state).toBeDefined();
    expect(state?.id).toBe('portuguesa');
  });

  it('debe calcular aptitud multicriterio AHP considerando pH y materia orgánica', () => {
    const result = calculatePointSuitability(9.3240, -69.1120, 6.2, 3.2);
    expect(result).toBeDefined();
    expect(result.suitabilityScore).toBeGreaterThan(70);
    expect(result.recommendedCrops.length).toBeGreaterThan(0);
  });

  it('debe recuperar municipios filtrados por estado para el Visor WebGIS Nivel 2', () => {
    const portuguesMunis = getMunicipalitiesByState('portuguesa');
    expect(portuguesMunis.length).toBeGreaterThanOrEqual(1);
    expect(portuguesMunis.some(m => m.id === 'turen')).toBe(true);
  });

  it('debe calcular la serie temporal de 40 años de MapBiomas (1985-2024)', () => {
    const traj = calculateMapBiomasTrajectory(9.3240, -69.1120);
    expect(traj).toBeDefined();
    expect(traj.yearsTracked).toBe(40);
    expect(traj.yearlySeries.length).toBe(40);
    expect(traj.yearsInAnthropicUse).toBeGreaterThanOrEqual(0);
    expect(traj.currentClass2024).toBeDefined();
  });

  it('debe activar el Escudo de Conservación al sur del río Orinoco', () => {
    // Coordenada en Amazonas (Lat 3.12, Lon -65.54)
    const shieldSouth = evaluateOrinocoConservationShield(3.12, -65.54, 'Bosque');
    expect(shieldSouth.shieldActive).toBe(true);
    expect(shieldSouth.recommendedAgroforestryCrops.length).toBeGreaterThan(0);

    // Coordenada en Portuguesa (Norte del Orinoco)
    const shieldNorth = evaluateOrinocoConservationShield(9.32, -69.11, 'Agricultura');
    expect(shieldNorth.shieldActive).toBe(false);
  });

  it('debe estimar datos agroclimáticos NASA POWER coherentes para el territorio nacional', () => {
    const climate = estimateVenezuelaAgroClimate(9.3240, -69.1120);
    expect(climate.annualPrecipitationMm).toBeGreaterThan(500);
    expect(climate.avgTemperatureC).toBeGreaterThan(15);
    expect(climate.wetSeasonMonths.length).toBeGreaterThan(0);
  });

  it('debe calcular la retrodispersión de Radar SAR Sentinel-1 (Banda C) libre de nubes', () => {
    const sar = estimateSarRadarBackscatter(9.3240, -69.1120, 1400);
    expect(sar.sensor).toBe('Sentinel-1A');
    expect(sar.backscatterVV_dB).toBeLessThan(0);
    expect(sar.backscatterVH_dB).toBeLessThan(sar.backscatterVV_dB);
    expect(sar.soilMoistureIndexPct).toBeGreaterThanOrEqual(0);
    expect(sar.soilMoistureIndexPct).toBeLessThanOrEqual(100);
    expect(sar.cloudPenetrationStatus).toContain('100% libre de interferencia');
  });

  it('debe computar el reporte de Grados Día de Crecimiento (GDD) y balance hídrico mensual', () => {
    const gdd = calculateHydroThermalGdd('Maíz Blanco Harinero', 27.5, 1450);
    expect(gdd.totalGddRequired).toBe(1650);
    expect(gdd.dailyAvgGdd).toBeGreaterThan(5);
    expect(gdd.predictedCycleDays).toBeGreaterThan(90);
    expect(gdd.predictedCycleDays).toBeLessThan(180);
    expect(gdd.milestones.length).toBe(5);
    expect(gdd.monthlyWaterBalance.length).toBe(12);
  });
});

