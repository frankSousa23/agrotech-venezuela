import { calculatePointSuitability } from '@/lib/geo/spatialUtils';
import { getHistoricalTrajectory } from '@/lib/geo/mapbiomasTrajectory';
import { getNasaAgroclimateSummary } from '@/lib/geo/nasaPowerService';

describe('End-to-End Frontend Agronomic Workflow Tests', () => {
  it('debe ejecutar el pipeline completo de diagnóstico territorial', async () => {
    const lat = 9.3240;
    const lon = -69.1120;
    const ph = 6.2;
    const om = 3.2;

    // 1. Trayectoria MapBiomas
    const trajectory = getHistoricalTrajectory(lat, lon);
    expect(trajectory).toBeDefined();
    expect(trajectory.historyYears.length).toBe(40);
    expect(trajectory.currentClass2024).toBeDefined();

    // 2. Clima NASA POWER
    const climate = await getNasaAgroclimateSummary(lat, lon);
    expect(climate).toBeDefined();
    expect(climate.annualRainfallMm).toBeGreaterThan(500);

    // 3. Aptitud y Prescripción
    const suitability = calculatePointSuitability(lat, lon, ph, om);
    expect(suitability.suitabilityScore).toBeGreaterThan(60);
    expect(suitability.recommendedCrops.some(c => c.includes('Maíz'))).toBe(true);
  });

  it('debe identificar factores limitantes en suelos ácidos (pH < 5.0)', () => {
    const suitability = calculatePointSuitability(8.9850, -71.7240, 4.6, 2.0);
    expect(suitability.limitingFactors.length).toBeGreaterThan(0);
    expect(suitability.limitingFactors.some(f => f.toLowerCase().includes('acidez') || f.toLowerCase().includes('ph'))).toBe(true);
  });
});
