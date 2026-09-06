'use client';

import React from 'react';
import { 
  SoilTextureType, 
  REGIONAL_SOIL_HYDRAULICS, 
  evaluateSoilWaterStatus 
} from '@/lib/agronomy/pedotransferEngine';
import { Droplets, Gauge, AlertTriangle, CheckCircle2, Waves, Layers } from 'lucide-react';

export interface SoilMoistureCardProps {
  moisturePct: number;
  texture?: SoilTextureType;
  onTextureChange?: (newTexture: SoilTextureType) => void;
  rainForecastMm?: number;
  cropName?: string;
  isInteractive?: boolean;
  onMoistureChange?: (newMoisture: number) => void;
}

export default function SoilMoistureCard({
  moisturePct,
  texture = 'franco',
  onTextureChange,
  rainForecastMm = 0.0,
  cropName = 'Cultivo General',
  isInteractive = false,
  onMoistureChange
}: SoilMoistureCardProps) {
  const evalResult = evaluateSoilWaterStatus(moisturePct, texture, rainForecastMm);
  const props = REGIONAL_SOIL_HYDRAULICS[texture];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPTIMO': return '#22c55e';
      case 'ESTRES_LEVE': return '#eab308';
      case 'ESTRES_CRITICO': return '#ef4444';
      case 'SATURADO_ANXIA': return '#3b82f6';
      default: return '#94a3b8';
    }
  };

  const statusColor = getStatusColor(evalResult.status);

  return (
    <div 
      style={{
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
        border: `1px solid ${evalResult.isDeficit ? 'rgba(234, 179, 8, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '16px',
        padding: '1.25rem',
        color: '#f8fafc',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
      data-testid="soil-moisture-card"
    >
      {/* Cabecera de la Tarjeta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}
          >
            <Droplets size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Humedad & Potencial Mátrico</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{cropName}</div>
          </div>
        </div>

        {/* Badge de Estado Hídrico */}
        <span 
          style={{
            background: `${statusColor}22`,
            border: `1px solid ${statusColor}66`,
            color: statusColor,
            fontSize: '0.75rem',
            padding: '3px 10px',
            borderRadius: '20px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {evalResult.status === 'OPTIMO' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
          {evalResult.status.replace('_', ' ')}
        </span>
      </div>

      {/* Selector de Textura Edafológica */}
      <div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Layers size={13} /> Textura de Suelo Calibrada:
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['arenoso', 'franco', 'arcilloso'] as SoilTextureType[]).map(t => {
            const isSelected = texture === t;
            const tProps = REGIONAL_SOIL_HYDRAULICS[t];
            return (
              <button
                key={t}
                onClick={() => onTextureChange && onTextureChange(t)}
                disabled={!onTextureChange}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isSelected ? '#38bdf8' : '#94a3b8',
                  cursor: onTextureChange ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
                title={tProps.description}
              >
                {t === 'arenoso' ? 'Arenoso' : t === 'franco' ? 'Franco (Mansa)' : 'Arcilloso (Brava)'}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Principal: Humedad VWC vs Potencial Mátrico */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Humedad VWC</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>
            {moisturePct.toFixed(1)}<span style={{ fontSize: '0.9rem', color: '#94a3b8', marginLeft: '2px' }}>%</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
            Umbral: <b>{props.criticalMoistureTheta}%</b>
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Gauge size={13} /> Potencial Mátrico (ψ_m)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: evalResult.matricPotentialKPa <= -100 ? '#ef4444' : '#38bdf8', marginTop: '2px' }}>
            {evalResult.matricPotentialKPa.toFixed(0)}<span style={{ fontSize: '0.85rem', color: '#94a3b8', marginLeft: '2px' }}>kPa</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
            Marchitez: <b>-1500 kPa</b>
          </div>
        </div>
      </div>

      {/* Barra de Progreso PAW (Plant-Available Water) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
          <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Agua Fácilmente Disponible (PAW)</span>
          <b style={{ color: evalResult.plantAvailableWaterPct < 50 ? '#facc15' : '#4ade80' }}>
            {evalResult.plantAvailableWaterPct}%
          </b>
        </div>
        <div 
          style={{
            height: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Marcador del 50% umbral de riego */}
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'rgba(255, 255, 255, 0.5)',
              zIndex: 2
            }}
            title="Umbral de Riego Crítico (50% PAW)"
          />
          <div 
            style={{
              height: '100%',
              width: `${Math.min(100, Math.max(0, evalResult.plantAvailableWaterPct))}%`,
              background: evalResult.plantAvailableWaterPct < 50 
                ? 'linear-gradient(90deg, #ef4444, #eab308)' 
                : 'linear-gradient(90deg, #10b981, #06b6d4)',
              transition: 'width 0.4s ease'
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>
          <span>0% (PMP {props.wiltingPointTheta}%)</span>
          <span>50% (Riego)</span>
          <span>100% (CC {props.fieldCapacityTheta}%)</span>
        </div>
      </div>

      {/* Slider Interactivo si está habilitado */}
      {isInteractive && onMoistureChange && (
        <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
            <span>Simular Humedad VWC:</span>
            <b>{moisturePct}%</b>
          </label>
          <input 
            type="range"
            min="5"
            max="60"
            step="0.5"
            value={moisturePct}
            onChange={e => onMoistureChange(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer', marginTop: '4px' }}
          />
        </div>
      )}

      {/* Mensaje de Diagnóstico de Riego */}
      <div 
        style={{
          fontSize: '0.8rem',
          color: '#cbd5e1',
          background: 'rgba(15, 23, 42, 0.4)',
          padding: '0.6rem 0.8rem',
          borderRadius: '8px',
          borderLeft: `3px solid ${statusColor}`
        }}
      >
        {evalResult.statusLabel}
      </div>
    </div>
  );
}
