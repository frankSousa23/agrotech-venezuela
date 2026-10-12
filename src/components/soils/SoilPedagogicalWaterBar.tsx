"use client";

import React, { useMemo } from 'react';
import { SoilTextureType } from '@/lib/agronomy/pedotransferEngine';
import { Droplets, AlertTriangle, CheckCircle2, ShieldAlert, Waves, Clock } from 'lucide-react';

export interface SoilPedagogicalWaterBarProps {
  texture: SoilTextureType;
  moisturePct: number;
  fieldCapacity: number;
  wiltingPoint: number;
  criticalThreshold: number;
  saturationTheta: number;
  cropName?: string;
}

export type WaterZoneType = 'wilting' | 'stress' | 'comfort' | 'saturation';

export function getWaterZone(
  moisturePct: number,
  wiltingPoint: number,
  criticalThreshold: number,
  fieldCapacity: number
): { zone: WaterZoneType; label: string; badgeClass: string; color: string; description: string } {
  if (moisturePct <= wiltingPoint) {
    return {
      zone: 'wilting',
      label: 'Marchitez Crítica',
      badgeClass: 'badge-rose',
      color: '#ef4444',
      description: 'La tierra está demasiado seca. Las raíces no tienen fuerza para succionar agua y la planta corre riesgo de muerte.'
    };
  }
  if (moisturePct < criticalThreshold) {
    return {
      zone: 'stress',
      label: 'Estrés Hídrico (Alerta)',
      badgeClass: 'badge-amber',
      color: '#f59e0b',
      description: 'La humedad está por debajo del umbral de confort. La planta cierra sus hojas y frena su crecimiento. ¡Momento de regar!'
    };
  }
  if (moisturePct <= fieldCapacity) {
    return {
      zone: 'comfort',
      label: 'Confort Radicular Óptimo',
      badgeClass: 'badge-emerald',
      color: '#10b981',
      description: 'Humedad ideal (la esponja del suelo en equilibrio). Las raíces absorben agua y nutrientes libremente.'
    };
  }
  return {
    zone: 'saturation',
    label: 'Encharcamiento / Asfixia',
    badgeClass: 'badge-cyan',
    color: '#06b6d4',
    description: 'Suelo saturado de agua. El exceso drena por gravedad y puede provocar asfixia o pudrición de raíz si no hay buen drenaje.'
  };
}

export function calculateDaysOfAutonomy(moisturePct: number, wiltingPoint: number, dailyEtcMm = 4.5): number {
  if (moisturePct <= wiltingPoint) return 0;
  // Lámina de agua útil en 30 cm (300 mm) de suelo
  const usefulDepthMm = ((moisturePct - wiltingPoint) / 100) * 300;
  return Math.max(0, parseFloat((usefulDepthMm / dailyEtcMm).toFixed(1)));
}

export default function SoilPedagogicalWaterBar({
  texture,
  moisturePct,
  fieldCapacity,
  wiltingPoint,
  criticalThreshold,
  saturationTheta,
  cropName = 'tu cultivo'
}: SoilPedagogicalWaterBarProps) {
  const maxScale = Math.max(saturationTheta, moisturePct, 50);

  const zoneInfo = useMemo(() => {
    return getWaterZone(moisturePct, wiltingPoint, criticalThreshold, fieldCapacity);
  }, [moisturePct, wiltingPoint, criticalThreshold, fieldCapacity]);

  const daysOfAutonomy = useMemo(() => {
    return calculateDaysOfAutonomy(moisturePct, wiltingPoint);
  }, [moisturePct, wiltingPoint]);

  // Porcentajes de ancho relativos a maxScale
  const wiltingWidthPct = (wiltingPoint / maxScale) * 100;
  const stressWidthPct = ((criticalThreshold - wiltingPoint) / maxScale) * 100;
  const comfortWidthPct = ((fieldCapacity - criticalThreshold) / maxScale) * 100;
  const satWidthPct = ((maxScale - fieldCapacity) / maxScale) * 100;

  // Posición del puntero actual
  const currentPosPct = Math.min(100, Math.max(0, (moisturePct / maxScale) * 100));

  const textureVernacularName = 
    texture === 'arenoso' ? 'Suelo Ligero / Sabana ("Colador")' :
    texture === 'arcilloso' ? 'Suelo Pesado ("Tierra Brava" Vertisol)' :
    'Suelo Franco ("Tierra Mansa" Equilibrada)';

  return (
    <div 
      className="glass-panel" 
      style={{
        padding: '1.25rem',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(15, 23, 42, 0.65)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}
      data-testid="soil-pedagogical-water-bar"
    >
      {/* Cabecera didáctica */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Droplets size={20} color="#38bdf8" />
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
              La Esponja de tu Suelo & Confort Hídrico
            </h3>
          </div>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            {textureVernacularName} • Humedad Actual: <b style={{ color: zoneInfo.color }}>{moisturePct}%</b>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className={`badge-pill ${zoneInfo.badgeClass}`} style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
            {zoneInfo.label}
          </span>
        </div>
      </div>

      {/* Barra de 4 Zonas Continuas */}
      <div style={{ position: 'relative', paddingTop: '10px', paddingBottom: '24px' }}>
        <div 
          style={{ 
            height: '24px', 
            borderRadius: '9999px', 
            overflow: 'hidden', 
            display: 'flex', 
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            position: 'relative'
          }}
        >
          {/* Zona 1: Marchitez (Rojo) */}
          <div 
            style={{ width: `${wiltingWidthPct}%`, background: 'rgba(239, 68, 68, 0.65)', borderRight: '1px dashed rgba(255,255,255,0.4)' }} 
            title={`Zona Marchitez: 0% a ${wiltingPoint}%`}
          />
          {/* Zona 2: Estrés Hídrico (Ámbar) */}
          <div 
            style={{ width: `${stressWidthPct}%`, background: 'rgba(245, 158, 11, 0.65)', borderRight: '1px dashed rgba(255,255,255,0.4)' }} 
            title={`Zona Estrés: ${wiltingPoint}% a ${criticalThreshold}%`}
          />
          {/* Zona 3: Confort Radicular (Verde) */}
          <div 
            style={{ width: `${comfortWidthPct}%`, background: 'rgba(16, 185, 129, 0.75)', borderRight: '1px dashed rgba(255,255,255,0.4)' }} 
            title={`Zona Confort: ${criticalThreshold}% a ${fieldCapacity}%`}
          />
          {/* Zona 4: Encharcamiento / Drenaje (Cian) */}
          <div 
            style={{ width: `${satWidthPct}%`, background: 'rgba(6, 182, 212, 0.6)' }} 
            title={`Zona Saturación: > ${fieldCapacity}%`}
          />
        </div>

        {/* Aguja Marcadora de Humedad Actual */}
        <div 
          style={{
            position: 'absolute',
            left: `${currentPosPct}%`,
            top: '4px',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          <div 
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#ffffff',
              border: `3px solid ${zoneInfo.color}`,
              boxShadow: `0 0 10px ${zoneInfo.color}`,
              marginBottom: '2px'
            }}
          />
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f8fafc', background: 'rgba(15, 23, 42, 0.9)', padding: '1px 5px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>
            {moisturePct}%
          </div>
        </div>

        {/* Etiquetas de Puntos Notables */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: '6px', fontWeight: 600 }}>
          <span>0% (Seco)</span>
          <span style={{ color: '#ef4444' }}>Marchitez: {wiltingPoint}%</span>
          <span style={{ color: '#10b981' }}>Cap. Campo: {fieldCapacity}%</span>
          <span style={{ color: '#06b6d4' }}>Saturación: {saturationTheta}%</span>
        </div>
      </div>

      {/* Diagnóstico en Lenguaje Campesino y Autonomía Hídrica */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          background: 'rgba(30, 41, 59, 0.5)',
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            {zoneInfo.zone === 'comfort' && <CheckCircle2 size={13} color="#10b981" />}
            {zoneInfo.zone === 'stress' && <AlertTriangle size={13} color="#f59e0b" />}
            {zoneInfo.zone === 'wilting' && <ShieldAlert size={13} color="#ef4444" />}
            {zoneInfo.zone === 'saturation' && <Waves size={13} color="#06b6d4" />}
            Diagnóstico de Campo:
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            {zoneInfo.description}
          </p>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={13} color="#38bdf8" />
            Autonomía Hídrica Estimada:
          </div>
          <div style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#f8fafc', fontWeight: 700 }}>
            {daysOfAutonomy > 0 ? (
              <span>~{daysOfAutonomy} días de agua útil <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>(para {cropName})</span></span>
            ) : (
              <span style={{ color: '#ef4444' }}>0 días • Requiere riego o lluvia urgente</span>
            )}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
            Basado en consumo típico regional de 4.5 mm/día y 30 cm de raíz.
          </div>
        </div>
      </div>
    </div>
  );
}
