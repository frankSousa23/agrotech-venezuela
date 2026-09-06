/**
 * ============================================================================
 * AGROTECH VENEZUELA — ALMACENAMIENTO Y ACOPLAMIENTO DE BITÁCORA DE CAMPO
 * ============================================================================
 * 
 * Gestiona el acceso unificado a las labores registradas en la bitácora
 * (siembra directa, abonos verdes, encalado dolomítico, rotación de cultivos)
 * para acoplar la verdad de campo (Ground Truth) al motor MRV de créditos de carbono.
 */

import { InMemFieldLog, IN_MEMORY_LOGS } from '@/app/api/field-logs/route';

export interface VerifiedRegenerativePractice {
  practiceKey: 'SIEMBRA_DIRECTA' | 'ABONO_VERDE' | 'ENCALADO_DOLOMITICO' | 'PASTOREO_ROTATIVO';
  title: string;
  verifiedAt: string;
  parcelId: string;
  socBonusRateTcHaYr: number; // Incremento en tC/ha/año
  auditTrailId: string;
}

export function getParcelVerifiedDiaryPractices(
  parcelId: string, 
  customLogs?: InMemFieldLog[]
): VerifiedRegenerativePractice[] {
  const logs = customLogs || IN_MEMORY_LOGS.filter(l => l.parcelId === parcelId);
  const practices: VerifiedRegenerativePractice[] = [];

  logs.forEach(log => {
    const desc = `${log.title} ${log.description} ${log.dosage || ''}`.toLowerCase();
    
    if (log.logType === 'ENCALADO' || desc.includes('dolomita') || desc.includes('cal')) {
      practices.push({
        practiceKey: 'ENCALADO_DOLOMITICO',
        title: 'Encalado con Cal Dolomítica (Estabilización de pH y Fósforo)',
        verifiedAt: log.date,
        parcelId: log.parcelId,
        socBonusRateTcHaYr: 0.15,
        auditTrailId: log.clientLogId || log.id
      });
    }

    if (log.logType === 'SIEMBRA' && (desc.includes('directa') || desc.includes('cero labranza') || desc.includes('cobertura'))) {
      practices.push({
        practiceKey: 'SIEMBRA_DIRECTA',
        title: 'Siembra Directa sobre Rastrojo / Cero Labranza',
        verifiedAt: log.date,
        parcelId: log.parcelId,
        socBonusRateTcHaYr: 0.35,
        auditTrailId: log.clientLogId || log.id
      });
    }

    if (desc.includes('abono verde') || desc.includes('leguminosa') || desc.includes('mucuna') || desc.includes('crotalaria')) {
      practices.push({
        practiceKey: 'ABONO_VERDE',
        title: 'Incorporación de Abonos Verdes y Leguminosas Fijadoras',
        verifiedAt: log.date,
        parcelId: log.parcelId,
        socBonusRateTcHaYr: 0.25,
        auditTrailId: log.clientLogId || log.id
      });
    }
  });

  return practices;
}

export function calculateEmpiricalSocAdjustment(practices: VerifiedRegenerativePractice[]): {
  totalSocBonusTcHaYr: number;
  totalCo2eBonusTonHaYr: number;
  practiceCount: number;
  verifiedPracticeKeys: string[];
} {
  const uniqueKeys = new Set<string>();
  let totalBonus = 0;

  practices.forEach(p => {
    if (!uniqueKeys.has(p.practiceKey)) {
      uniqueKeys.add(p.practiceKey);
      totalBonus += p.socBonusRateTcHaYr;
    }
  });

  return {
    totalSocBonusTcHaYr: parseFloat(totalBonus.toFixed(2)),
    totalCo2eBonusTonHaYr: parseFloat((totalBonus * 3.667).toFixed(2)),
    practiceCount: uniqueKeys.size,
    verifiedPracticeKeys: Array.from(uniqueKeys)
  };
}
