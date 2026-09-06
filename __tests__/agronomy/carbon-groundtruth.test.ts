import { 
  getParcelVerifiedDiaryPractices, 
  calculateEmpiricalSocAdjustment 
} from '@/lib/diary/fieldDiaryStorage';
import { verifySarMrvOracle } from '@/lib/geo/sarRadarService';
import { InMemFieldLog } from '@/app/api/field-logs/route';

describe('MRV Ground Truth Coupling & Sentinel-1 SAR Radar Oracle Suite', () => {
  const mockCustomLogs: InMemFieldLog[] = [
    {
      id: 'log-gt-01',
      clientLogId: 'offline-gt-uuid-1',
      parcelId: 'parc-test-gt',
      userId: 'usr-farmer-01',
      logType: 'ENCALADO',
      title: 'Encalado con Cal Dolomítica',
      description: 'Aplicación para corregir aluminio y aportar magnesio',
      dosage: '2.0 Ton/ha',
      date: '2026-02-10'
    },
    {
      id: 'log-gt-02',
      clientLogId: 'offline-gt-uuid-2',
      parcelId: 'parc-test-gt',
      userId: 'usr-farmer-01',
      logType: 'SIEMBRA',
      title: 'Siembra Directa sobre Rastrojo de Soya',
      description: 'Cero labranza en rotación conservacionista',
      dosage: '75.000 semillas/ha',
      date: '2026-02-20'
    },
    {
      id: 'log-gt-03',
      clientLogId: 'offline-gt-uuid-3',
      parcelId: 'parc-test-gt',
      userId: 'usr-farmer-01',
      logType: 'OBSERVACION',
      title: 'Incorporación de Abono Verde Mucuna',
      description: 'Siembra de leguminosa fijadora de nitrógeno y biomasa',
      date: '2026-03-01'
    }
  ];

  describe('1. Extracción de Prácticas Regenerativas Verificadas de la Bitácora', () => {
    it('debe detectar las 3 prácticas regenerativas empíricas a partir de los registros de campo', () => {
      const practices = getParcelVerifiedDiaryPractices('parc-test-gt', mockCustomLogs);
      expect(practices.length).toBe(3);

      const keys = practices.map(p => p.practiceKey);
      expect(keys).toContain('ENCALADO_DOLOMITICO');
      expect(keys).toContain('SIEMBRA_DIRECTA');
      expect(keys).toContain('ABONO_VERDE');
    });

    it('debe calcular el ajuste de tasa de secuestro SOC empírico acumulado', () => {
      const practices = getParcelVerifiedDiaryPractices('parc-test-gt', mockCustomLogs);
      const adjustment = calculateEmpiricalSocAdjustment(practices);

      // Siembra directa (0.35) + Abono verde (0.25) + Encalado dolomítico (0.15) = 0.75 tC/ha/año
      expect(adjustment.totalSocBonusTcHaYr).toBe(0.75);
      expect(adjustment.totalCo2eBonusTonHaYr).toBeCloseTo(0.75 * 3.667, 1);
      expect(adjustment.practiceCount).toBe(3);
    });
  });

  describe('2. Oráculo Sentinel-1 SAR Radar para Verra VCS / MRV', () => {
    it('debe verificar la rugosidad de dosel mediante polarización cruzada VH/VV', () => {
      const oracle = verifySarMrvOracle(9.324, -69.112, 1400);

      expect(oracle.roughnessThreshold_dB).toBe(-12.0);
      expect(oracle.backscatterVV_dB).toBeDefined();
      expect(oracle.backscatterVH_dB).toBeDefined();
      expect(oracle.crossRatio_dB).toBeDefined();

      // Si rugosidad confirmada, colapsa el castigo por incertidumbre del 40% al 10%
      if (oracle.biomassRoughnessVerified) {
        expect(oracle.uncertaintyPenaltyPct).toBe(10.0);
        expect(oracle.auditConfidenceLevel).toContain('ALTA');
      } else {
        expect(oracle.uncertaintyPenaltyPct).toBe(40.0);
      }

      // Debe incluir prueba criptográfica de auditoría trazable
      expect(oracle.cryptographicAuditProof).toMatch(/^0x[0-9a-fA-F]+/);
    });
  });
});
