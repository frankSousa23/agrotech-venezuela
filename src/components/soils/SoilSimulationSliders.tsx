"use client";

import React from 'react';
import { SoilTextureType } from '@/lib/agronomy/pedotransferEngine';

export interface SoilSimulationParams {
  sandPct: number;
  clayPct: number;
  ph: number;
  organicMatterPct: number;
  exchangeableAlMe: number;
  currentMoisturePct: number;
  texture: SoilTextureType;
}

interface SoilSimulationSlidersProps {
  params: SoilSimulationParams;
  onChange: (updated: SoilSimulationParams) => void;
}

export default function SoilSimulationSliders({ params, onChange }: SoilSimulationSlidersProps) {
  const siltPct = Math.max(0, 100 - (params.sandPct + params.clayPct));

  const applyPreset = (preset: {
    sandPct: number;
    clayPct: number;
    ph: number;
    organicMatterPct: number;
    exchangeableAlMe: number;
    moisture: number;
    texture: SoilTextureType;
  }) => {
    onChange({
      sandPct: preset.sandPct,
      clayPct: preset.clayPct,
      ph: preset.ph,
      organicMatterPct: preset.organicMatterPct,
      exchangeableAlMe: preset.exchangeableAlMe,
      currentMoisturePct: preset.moisture,
      texture: preset.texture
    });
  };

  const updateSand = (val: number) => {
    const newSand = Math.max(0, Math.min(95, val));
    const maxClay = 100 - newSand;
    const newClay = Math.min(params.clayPct, maxClay);
    const text: SoilTextureType = newSand > 65 ? 'arenoso' : newClay > 40 ? 'arcilloso' : 'franco';
    onChange({ ...params, sandPct: newSand, clayPct: newClay, texture: text });
  };

  const updateClay = (val: number) => {
    const newClay = Math.max(0, Math.min(90, val));
    const maxSand = 100 - newClay;
    const newSand = Math.min(params.sandPct, maxSand);
    const text: SoilTextureType = newSand > 65 ? 'arenoso' : newClay > 40 ? 'arcilloso' : 'franco';
    onChange({ ...params, sandPct: newSand, clayPct: newClay, texture: text });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Botones de Presets Agrícolas de Venezuela */}
      <div>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
          Presets Agrícolas Regionales:
        </span>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            onClick={() => applyPreset({ sandPct: 40, clayPct: 20, ph: 6.2, organicMatterPct: 3.2, exchangeableAlMe: 0.1, moisture: 24, texture: 'franco' })}
          >
            🌾 Turén (Cereales)
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            onClick={() => applyPreset({ sandPct: 15, clayPct: 55, ph: 5.8, organicMatterPct: 2.4, exchangeableAlMe: 0.3, moisture: 38, texture: 'arcilloso' })}
          >
            🌾 Calabozo (Vertisol)
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            onClick={() => applyPreset({ sandPct: 82, clayPct: 8, ph: 4.8, organicMatterPct: 1.2, exchangeableAlMe: 1.6, moisture: 10, texture: 'arenoso' })}
          >
            🧪 Guanipa (Oxisol Ácido)
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            onClick={() => applyPreset({ sandPct: 50, clayPct: 15, ph: 7.8, organicMatterPct: 1.5, exchangeableAlMe: 0.0, moisture: 18, texture: 'franco' })}
          >
            🧅 Quíbor (Salino-Sódico)
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            onClick={() => applyPreset({ sandPct: 25, clayPct: 45, ph: 6.4, organicMatterPct: 4.5, exchangeableAlMe: 0.1, moisture: 35, texture: 'arcilloso' })}
          >
            🍫 Sur del Lago (Aluvial)
          </button>
        </div>
      </div>

      {/* Sliders de Textura */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span>Arena (%):</span>
            <span style={{ fontWeight: 700, color: '#f59e0b' }}>{params.sandPct}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="95"
            value={params.sandPct}
            onChange={e => updateSand(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#f59e0b' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span>Arcilla (%):</span>
            <span style={{ fontWeight: 700, color: '#ef4444' }}>{params.clayPct}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            value={params.clayPct}
            onChange={e => updateClay(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#ef4444' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span>Limo Residual (%):</span>
            <span style={{ fontWeight: 700, color: '#38bdf8' }}>{siltPct}%</span>
          </div>
          <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '10px' }}>
            <div style={{ height: '100%', width: `${siltPct}%`, background: '#38bdf8', borderRadius: '3px' }} />
          </div>
        </div>
      </div>

      {/* Sliders Químicos e Hidráulicos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span>pH del Suelo:</span>
            <span style={{ fontWeight: 700, color: params.ph < 5.5 ? '#f59e0b' : '#10b981' }}>{params.ph.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="8.5"
            step="0.1"
            value={params.ph}
            onChange={e => onChange({ ...params, ph: Number(e.target.value) })}
            style={{ width: '100%', accentColor: params.ph < 5.5 ? '#f59e0b' : '#10b981' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span>Aluminio Intercambiable (Al³⁺):</span>
            <span style={{ fontWeight: 700, color: '#f87171' }}>{params.exchangeableAlMe.toFixed(1)} meq</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="3.5"
            step="0.1"
            value={params.exchangeableAlMe}
            onChange={e => onChange({ ...params, exchangeableAlMe: Number(e.target.value) })}
            style={{ width: '100%', accentColor: '#f87171' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span>Humedad Actual (θ %):</span>
            <span style={{ fontWeight: 700, color: '#06b6d4' }}>{params.currentMoisturePct}%</span>
          </div>
          <input
            type="range"
            min="6"
            max="50"
            value={params.currentMoisturePct}
            onChange={e => onChange({ ...params, currentMoisturePct: Number(e.target.value) })}
            style={{ width: '100%', accentColor: '#06b6d4' }}
          />
        </div>
      </div>
    </div>
  );
}
