import {
  normalizeSoilTexture,
  calculatePAW,
  estimateMatricPotentialKPa,
  evaluateSoilWaterStatus,
  REGIONAL_SOIL_HYDRAULICS
} from '@/lib/agronomy/pedotransferEngine';

describe('Saxton-Rawls Regional Pedotransfer & PAW Engine Suite', () => {
  describe('1. Normalización Vernácula & Técnica de Texturas Regionales', () => {
    it('debe identificar suelos arenosos de sabana oriental y oxisoles', () => {
      expect(normalizeSoilTexture('Arenoso')).toBe('arenoso');
      expect(normalizeSoilTexture('Franco-arenoso Oxisol')).toBe('arenoso');
      expect(normalizeSoilTexture('Arena fina de sabana')).toBe('arenoso');
    });

    it('debe identificar vertisoles arcillosos y Tierra Brava', () => {
      expect(normalizeSoilTexture('Vertisol Arcilloso')).toBe('arcilloso');
      expect(normalizeSoilTexture('Tierra Brava pesada')).toBe('arcilloso');
      expect(normalizeSoilTexture('Arcilla expansiva')).toBe('arcilloso');
    });

    it('debe asignar suelo franco por defecto o para Tierra Mansa equilibrada', () => {
      expect(normalizeSoilTexture('Franco')).toBe('franco');
      expect(normalizeSoilTexture('Franco-limoso')).toBe('franco');
      expect(normalizeSoilTexture(null)).toBe('franco');
      expect(normalizeSoilTexture('')).toBe('franco');
    });
  });

  describe('2. Parámetros Hidráulicos Edafológicos Calibrados', () => {
    it('debe mantener umbrales físicos rigurosos para cada orden de suelo', () => {
      const sand = REGIONAL_SOIL_HYDRAULICS.arenoso;
      expect(sand.fieldCapacityTheta).toBe(14.0);
      expect(sand.wiltingPointTheta).toBe(6.0);
      expect(sand.criticalMoistureTheta).toBe(9.0);

      const loam = REGIONAL_SOIL_HYDRAULICS.franco;
      expect(loam.fieldCapacityTheta).toBe(28.0);
      expect(loam.wiltingPointTheta).toBe(14.0);
      expect(loam.criticalMoistureTheta).toBe(20.0);

      const clay = REGIONAL_SOIL_HYDRAULICS.arcilloso;
      expect(clay.fieldCapacityTheta).toBe(44.0);
      expect(clay.wiltingPointTheta).toBe(28.0);
      expect(clay.criticalMoistureTheta).toBe(35.0);
    });
  });

  describe('3. Cálculo de Agua Fácilmente Disponible (PAW)', () => {
    it('debe retornar 0% si la humedad es menor o igual al punto de marchitez permanente', () => {
      expect(calculatePAW(5.0, 14.0, 6.0)).toBe(0.0);
      expect(calculatePAW(6.0, 14.0, 6.0)).toBe(0.0);
      expect(calculatePAW(27.0, 44.0, 28.0)).toBe(0.0);
    });

    it('debe retornar 100% si la humedad alcanza o supera la capacidad de campo', () => {
      expect(calculatePAW(14.0, 14.0, 6.0)).toBe(100.0);
      expect(calculatePAW(18.0, 14.0, 6.0)).toBe(100.0);
      expect(calculatePAW(44.0, 44.0, 28.0)).toBe(100.0);
    });

    it('debe demostrar que 30% de humedad en vertisol arcilloso representa déficit hídrico severo', () => {
      // En suelo arcilloso (FC: 44, PWP: 28), 30% representa solo 12.5% de PAW
      const pawClay = calculatePAW(30.0, 44.0, 28.0);
      expect(pawClay).toBe(12.5);
      expect(pawClay).toBeLessThan(50.0); // Crítico

      // En cambio en suelo franco (FC: 28, PWP: 14), 30% supera la capacidad de campo (100% PAW)
      const pawLoam = calculatePAW(30.0, 28.0, 14.0);
      expect(pawLoam).toBe(100.0);
    });
  });

  describe('4. Estimación de Potencial Mátrico (ψ_m)', () => {
    it('debe calcular potenciales mátricos negativos coherentes con la succión radicular', () => {
      const potOptimal = estimateMatricPotentialKPa(28.0, 'franco');
      expect(potOptimal).toBeLessThanOrEqual(-33.0);
      expect(potOptimal).toBeGreaterThan(-40.0);

      const potDryClay = estimateMatricPotentialKPa(25.0, 'arcilloso');
      expect(potDryClay).toBeLessThanOrEqual(-1500.0); // Marchitez severa
    });
  });

  describe('5. Evaluación Integral de Decisión de Riego Predictivo', () => {
    it('debe recomendar riego cuando PAW < 50% y no hay lluvia inminente', () => {
      const eval1 = evaluateSoilWaterStatus(29.0, 'arcilloso', 0.0);
      expect(eval1.isDeficit).toBe(true);
      expect(eval1.plantAvailableWaterPct).toBeLessThan(50.0);
      expect(eval1.recommendedAction).toBe('IRRIGATE');
      expect(eval1.status).toBe('ESTRES_LEVE');
    });

    it('debe suprimir riego si hay déficit pero NASA POWER pronostica lluvia >= 5mm', () => {
      const eval2 = evaluateSoilWaterStatus(29.0, 'arcilloso', 8.5);
      expect(eval2.isDeficit).toBe(true);
      expect(eval2.recommendedAction).toBe('SUPPRESS_RAIN');
    });

    it('debe permanecer en reposo cuando el suelo está en rango óptimo', () => {
      const eval3 = evaluateSoilWaterStatus(25.0, 'franco', 0.0);
      expect(eval3.isDeficit).toBe(false);
      expect(eval3.plantAvailableWaterPct).toBeGreaterThanOrEqual(50.0);
      expect(eval3.recommendedAction).toBe('NONE');
      expect(eval3.status).toBe('OPTIMO');
    });
  });
});
