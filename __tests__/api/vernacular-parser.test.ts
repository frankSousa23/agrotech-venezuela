import { parseVernacularSpeech, TRADITIONAL_UNIT_CONVERSIONS } from '@/lib/farmer/vernacularParser';

describe('Offline Campesino Vernacular Voice Parser Suite', () => {
  describe('1. Acción y Detección de Modismos de Fertilización', () => {
    it('debe mapear "tirar urea" a FERTILIZACION y convertir sacos a kg', () => {
      const res = parseVernacularSpeech('Le tiré tres sacos de urea al maizal en el lote 2');
      expect(res.normalizedAction).toBe('FERTILIZACION');
      expect(res.detectedCrop).toBe('Maíz');
      expect(res.detectedInput).toContain('Urea');
      expect(res.metricQuantity).toBe(150); // 3 sacos * 50kg = 150kg
      expect(res.metricUnit).toBe('kg');
      expect(res.detectedParcelName).toBe('Lote 2');
    });

    it('debe identificar "reabono" como fertilización', () => {
      const res = parseVernacularSpeech('Hoy toca el reabono en el tablón norte');
      expect(res.normalizedAction).toBe('FERTILIZACION');
    });
  });

  describe('2. Sanidad y Manejo Fitosanitario', () => {
    it('debe mapear "echar veneno a la candelilla" a FITOSANITARIO y convertir canecas a litros', () => {
      const res = parseVernacularSpeech('Eché dos canecas de veneno para la candelilla en la caña');
      expect(res.normalizedAction).toBe('FITOSANITARIO');
      expect(res.detectedCrop).toBe('Caña de Azúcar');
      expect(res.metricQuantity).toBe(40); // 2 canecas * 20L = 40L
      expect(res.metricUnit).toBe('L');
    });

    it('debe reconocer "fumigar" y "matar monte"', () => {
      const res = parseVernacularSpeech('Tengo que fumigar para matar monte antes de sembrar');
      expect(res.normalizedAction).toBe('FITOSANITARIO');
    });
  });

  describe('3. Encalado y Corrección de Suelos', () => {
    it('debe mapear "tirar cal dolomitica" a ENCALADO', () => {
      const res = parseVernacularSpeech('Vamos a tirar cal dolomitica en el potrero');
      expect(res.normalizedAction).toBe('ENCALADO');
      expect(res.detectedInput).toContain('Cal Dolomítica');
    });

    it('debe detectar yeso agrícola para desalitrar', () => {
      const res = parseVernacularSpeech('Aplicamos yeso agricola para desalitrar el suelo');
      expect(res.normalizedAction).toBe('ENCALADO');
      expect(res.detectedInput).toContain('Yeso');
    });
  });

  describe('4. Siembra, Riego y Cosecha', () => {
    it('debe reconocer labores de siembra tradicional ("meter semilla", "chuzear")', () => {
      const res = parseVernacularSpeech('Ayer terminamos de meter semilla de frijol');
      expect(res.normalizedAction).toBe('SIEMBRA');
      expect(res.detectedCrop).toBe('Frijol Bayo');
    });

    it('debe reconocer labores de riego', () => {
      const res = parseVernacularSpeech('Abrir el agua para regar los tomates');
      expect(res.normalizedAction).toBe('RIEGO');
      expect(res.detectedCrop).toBe('Tomate Cherry');
    });

    it('debe reconocer labores de cosecha', () => {
      const res = parseVernacularSpeech('Recogí cincuenta sacos de arroz en la tablita');
      expect(res.normalizedAction).toBe('COSECHA');
      expect(res.detectedCrop).toBe('Arroz');
      expect(res.metricQuantity).toBe(2500); // 50 sacos * 50kg = 2500kg
    });
  });

  describe('5. Conversión de Unidades Tradicionales', () => {
    it('debe validar la tabla de conversiones vernáculas campesinas', () => {
      expect(TRADITIONAL_UNIT_CONVERSIONS.saco.factor).toBe(50);
      expect(TRADITIONAL_UNIT_CONVERSIONS.tambor.factor).toBe(200);
      expect(TRADITIONAL_UNIT_CONVERSIONS.caneca.factor).toBe(20);
      expect(TRADITIONAL_UNIT_CONVERSIONS.tablita.factor).toBe(0.5);
      expect(TRADITIONAL_UNIT_CONVERSIONS.tablon.factor).toBe(1.0);
    });
  });
});
