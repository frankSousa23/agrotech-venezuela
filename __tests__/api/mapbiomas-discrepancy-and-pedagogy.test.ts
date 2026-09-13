import { evaluateMapBiomasDiscrepancy } from '@/lib/geo/discrepancyService';
import { GET as discrepancyGET, POST as discrepancyPOST } from '@/app/api/mapbiomas/discrepancy/route';
import { TERRITORIAL_PRESETS } from '@/components/agronomy/TerritorialPresetBar';
import { GLOSSARY_TERMS } from '@/components/layout/AgronomicGlossaryDrawer';

describe('MapBiomas Discrepancy & Pedagogical UI Expansion QA Suite', () => {
  describe('1. MapBiomas Ground-Truth Discrepancy Service', () => {
    it('debe validar cobertura concordante cuando los índices concuerdan con el baseline', () => {
      const res = evaluateMapBiomasDiscrepancy(9.324, -69.112, 18, {
        ndvi: 0.68,
        evi: 0.45,
        ndwi: 0.18,
        sarDb: -11.5,
      });

      expect(res.groundTruthStatus).toBe('VERIFIED_CONCORDANT');
      expect(res.discrepancyDetected).toBe(false);
      expect(res.confidenceScore).toBeGreaterThanOrEqual(0.9);
      expect(res.mapbiomasBaseline.classId).toBe(18);
    });

    it('debe disparar alerta de deforestación reciente en formación forestal (Clase 3)', () => {
      const res = evaluateMapBiomasDiscrepancy(7.5, -65.2, 3, {
        ndvi: 0.28,
        sarDb: -16.5,
      });

      expect(res.groundTruthStatus).toBe('ANOMALY_DETECTED');
      expect(res.discrepancyDetected).toBe(true);
      expect(res.discrepancyType).toBe('DEFORESTATION_OR_CLEARING_ALERT');
      expect(res.severity).toBe('CRITICA');
    });

    it('debe detectar expansión agrícola en límite de bosque (Clase 3)', () => {
      const res = evaluateMapBiomasDiscrepancy(8.1, -70.5, 3, {
        ndvi: 0.55,
        evi: 0.48,
        sarDb: -12.0,
      });

      expect(res.groundTruthStatus).toBe('ANOMALY_DETECTED');
      expect(res.discrepancyType).toBe('AGRICULTURAL_EXPANSION_IN_FOREST');
      expect(res.severity).toBe('ALTA');
    });

    it('debe detectar anomalía hídrica o desecación en cuerpo de agua (Clase 33)', () => {
      const res = evaluateMapBiomasDiscrepancy(9.9, -67.5, 33, {
        ndvi: 0.52,
      });

      expect(res.groundTruthStatus).toBe('ANOMALY_DETECTED');
      expect(res.discrepancyType).toBe('WATERBODY_SEDIMENTATION_OR_DESICCATION');
    });

    it('debe detectar intensificación de pastura hacia cultivo anual (Clase 15)', () => {
      const res = evaluateMapBiomasDiscrepancy(9.1, -69.5, 15, {
        ndvi: 0.82,
        evi: 0.65,
      });

      expect(res.groundTruthStatus).toBe('ANOMALY_DETECTED');
      expect(res.discrepancyType).toBe('PASTURE_TO_CROPLAND_CONVERSION');
    });
  });

  describe('2. Endpoint API /api/mapbiomas/discrepancy', () => {
    it('debe procesar solicitudes GET con parámetros de consulta', async () => {
      const req = new Request('http://localhost:3000/api/mapbiomas/discrepancy?lat=9.324&lon=-69.112&classId=18');
      const response = await discrepancyGET(req);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.mapbiomasBaseline.classId).toBe(18);
    });

    it('debe procesar solicitudes POST con payload JSON', async () => {
      const req = new Request('http://localhost:3000/api/mapbiomas/discrepancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: 7.5,
          lon: -65.2,
          classId: 3,
          metrics: { ndvi: 0.25, sarDb: -17.0 },
        }),
      });

      const response = await discrepancyPOST(req);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.discrepancyDetected).toBe(true);
      expect(json.data.discrepancyType).toBe('DEFORESTATION_OR_CLEARING_ALERT');
    });
  });

  describe('3. Escenarios Agroecológicos Emblemáticos (Territorial Presets)', () => {
    it('debe contener exactamente los 4 escenarios emblemáticos venezolanos', () => {
      expect(TERRITORIAL_PRESETS).toHaveLength(4);
      const ids = TERRITORIAL_PRESETS.map(p => p.id);
      expect(ids).toContain('turen');
      expect(ids).toContain('sur_del_lago');
      expect(ids).toContain('quibor');
      expect(ids).toContain('merida');
    });

    it('debe configurar los parámetros edafológicos correctos para cada escenario', () => {
      const turen = TERRITORIAL_PRESETS.find(p => p.id === 'turen')!;
      expect(turen.stateId).toBe('portuguesa');
      expect(turen.ph).toBe(6.4);
      expect(turen.crop).toContain('Maíz Blanco');

      const surDelLago = TERRITORIAL_PRESETS.find(p => p.id === 'sur_del_lago')!;
      expect(surDelLago.stateId).toBe('zulia');
      expect(surDelLago.ph).toBe(5.2);
      expect(surDelLago.crop).toContain('Cacao Criollo');

      const quibor = TERRITORIAL_PRESETS.find(p => p.id === 'quibor')!;
      expect(quibor.stateId).toBe('lara');
      expect(quibor.ph).toBe(7.8);
      expect(quibor.keyTech).toContain('Yeso Agrícola');

      const merida = TERRITORIAL_PRESETS.find(p => p.id === 'merida')!;
      expect(merida.stateId).toBe('merida');
      expect(merida.ph).toBe(5.4);
      expect(merida.organicMatterPct).toBe(4.5);
    });
  });

  describe('4. Glosario Agronómico & Vernacular Campesino', () => {
    it('debe incluir las 4 unidades vernáculas venezolanas normadas', () => {
      const saco = GLOSSARY_TERMS.find(t => t.id === 'saco');
      expect(saco).toBeDefined();
      expect(saco?.metricEquivalence).toContain('50.0 kg');

      const tambor = GLOSSARY_TERMS.find(t => t.id === 'tambor');
      expect(tambor).toBeDefined();
      expect(tambor?.metricEquivalence).toContain('200 Litros');

      const caneca = GLOSSARY_TERMS.find(t => t.id === 'caneca');
      expect(caneca).toBeDefined();
      expect(caneca?.metricEquivalence).toContain('20 Litros');

      const tablon = GLOSSARY_TERMS.find(t => t.id === 'tablon');
      expect(tablon).toBeDefined();
      expect(tablon?.metricEquivalence).toContain('1.0 Hectárea');
    });

    it('debe incluir términos científicos edafológicos, satelitales y de carbono MRV', () => {
      const kamprath = GLOSSARY_TERMS.find(t => t.id === 'kamprath');
      expect(kamprath).toBeDefined();
      expect(kamprath?.category).toBe('SOIL');

      const sar = GLOSSARY_TERMS.find(t => t.id === 'sar-c-band');
      expect(sar).toBeDefined();
      expect(sar?.category).toBe('SATELLITE');

      const mrv = GLOSSARY_TERMS.find(t => t.id === 'mrv');
      expect(mrv).toBeDefined();
      expect(mrv?.category).toBe('CARBON_CLIMATE');
    });
  });
});
