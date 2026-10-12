"use client";

import React, { useMemo } from 'react';
import { calculateMapBiomasTrajectory, MapBiomasTrajectoryResult } from '@/lib/geo/mapbiomasTrajectory';
import { History, ShieldAlert, Sparkles, Sprout, ArrowRight, Layers, FileText, CheckCircle2 } from 'lucide-react';

export interface MapBiomas40YearTrajectoryCardProps {
  lat?: number;
  lon?: number;
  currentOrganicMatterPct?: number;
  onApplyRegenerativeDose?: (limingTons: number, bags50kg: number) => void;
}

export function formatRegenerativeLimingBags(tonsPerHa: number): { tons: number; bags50kg: number; label: string } {
  const safeTons = Math.max(0, tonsPerHa);
  const bags = Math.round(safeTons * 20); // 1 t = 1000 kg = 20 sacos de 50 kg
  return {
    tons: safeTons,
    bags50kg: bags,
    label: `${safeTons.toFixed(1)} t/ha (${bags} sacos de 50 kg por hectárea)`
  };
}

export default function MapBiomas40YearTrajectoryCard({
  lat = 9.324,
  lon = -69.112,
  currentOrganicMatterPct = 3.2,
  onApplyRegenerativeDose
}: MapBiomas40YearTrajectoryCardProps) {
  const trajectory: MapBiomasTrajectoryResult = useMemo(() => {
    return calculateMapBiomasTrajectory(lat, lon);
  }, [lat, lon]);

  const limingRecommendation = useMemo(() => {
    // Si la pérdida de MO es severa o el suelo tiene más de 15 años en uso antrópico
    const suggestedTons = trajectory.yearsInAnthropicUse > 20 ? 1.5 : trajectory.yearsInAnthropicUse > 10 ? 1.0 : 0.5;
    return formatRegenerativeLimingBags(suggestedTons);
  }, [trajectory.yearsInAnthropicUse]);

  return (
    <div 
      className="glass-panel" 
      style={{
        padding: '1.25rem',
        borderRadius: '16px',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        background: 'rgba(15, 23, 42, 0.65)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
      data-testid="mapbiomas-40year-trajectory-card"
    >
      {/* Encabezado MapBiomas Colección 3.0 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={20} color="#10b981" />
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
              Memoria Territorial MapBiomas Venezuela (1985–2024)
            </h3>
          </div>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            40 años continuos de historia satelital en coordenadas {lat.toFixed(3)}°N, {lon.toFixed(3)}°W
          </p>
        </div>

        <span className="badge-pill badge-emerald" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
          Colección 3.0 • {trajectory.trajectoryType}
        </span>
      </div>

      {/* Línea de tiempo visual simplificada 1985 -> 2024 */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          background: 'rgba(30, 41, 59, 0.6)',
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        {/* Estado en 1985 */}
        <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '10px' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
            Cobertura 1985 (Hace 40 años):
          </span>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#4ade80', marginTop: '2px' }}>
            {trajectory.initialClass1985}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
            Suelo con alta porosidad biológica y dosel natural.
          </div>
        </div>

        {/* Estado en 2024 */}
        <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '10px' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
            Cobertura Actual (2024):
          </span>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fbbf24', marginTop: '2px' }}>
            {trajectory.currentClass2024}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
            {trajectory.yearsInAnthropicUse} años continuos de uso agrícola/antrópico.
          </div>
        </div>

        {/* Desgaste de Materia Orgánica */}
        <div style={{ borderLeft: '3px solid #ef4444', paddingLeft: '10px' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
            Pérdida Estimada de M.O.:
          </span>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f87171', marginTop: '2px' }}>
            -{trajectory.organicMatterDepletionPercent}% de Materia Orgánica
          </div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px' }}>
            M.O. actual estimada: ~{currentOrganicMatterPct}%
          </div>
        </div>
      </div>

      {/* Diagnóstico Pedagógico y Prescripción Regenerativa */}
      <div 
        style={{
          background: 'rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>
          <Sparkles size={16} />
          ¿Por qué importa esto para tu cosecha?
        </div>
        <p style={{ margin: 0, fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.45 }}>
          Por cada 1% de materia orgánica perdida en estos 40 años, el suelo retiene aproximadamente <b>15,000 a 20,000 litros menos de agua de lluvia por hectárea</b> en los primeros 20 cm. Esto hace que tu cultivo sea el doble de vulnerable a sequías de verano.
        </p>

        <div style={{ borderTop: '1px solid rgba(16, 185, 129, 0.2)', paddingTop: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.78rem', color: '#6ee7b7', fontWeight: 600 }}>
            🌾 Receta de Regeneración Rápida de la Esponja del Suelo:
          </span>
          <div style={{ fontSize: '0.82rem', color: '#f8fafc', marginTop: '3px' }}>
            • <b>Enmienda de Cal Agrícola:</b> {limingRecommendation.label} para activar bacterias benéficas.
            <br />
            • <b>Abono Verde:</b> Siembra Canavalia o Crotalaria entre cosechas para recuperar 1.2% de M.O. en 2 años.
          </div>
        </div>

        {onApplyRegenerativeDose && (
          <div style={{ marginTop: '6px' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '6px 12px', width: 'fit-content' }}
              onClick={() => onApplyRegenerativeDose(limingRecommendation.tons, limingRecommendation.bags50kg)}
            >
              <CheckCircle2 size={14} /> Aplicar {limingRecommendation.tons} t/ha al Simulador
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
