"use client";

import React from 'react';
import { Sprout, FlaskConical, HelpCircle } from 'lucide-react';

export type SoilDisplayMode = 'didactic' | 'technical';

export interface SoilModeSwitcherProps {
  currentMode: SoilDisplayMode;
  onChangeMode: (mode: SoilDisplayMode) => void;
}

export default function SoilModeSwitcher({ currentMode, onChangeMode }: SoilModeSwitcherProps) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '6px 10px',
        gap: '8px',
        flexWrap: 'wrap'
      }}
      data-testid="soil-mode-switcher"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}>
        <span style={{ fontWeight: 600, color: '#f8fafc' }}>Vista Edafológica:</span>
        <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
          {currentMode === 'didactic' ? 'Lenguaje Didáctico & Esponja MapBiomas' : 'Curva Matricial van Genuchten (pF)'}
        </span>
      </div>

      <div style={{ display: 'inline-flex', background: 'rgba(30, 41, 59, 0.8)', padding: '3px', borderRadius: '8px', gap: '4px' }}>
        <button
          type="button"
          onClick={() => onChangeMode('didactic')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: currentMode === 'didactic' ? 700 : 500,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: currentMode === 'didactic' ? '#10b981' : 'transparent',
            color: currentMode === 'didactic' ? '#ffffff' : '#94a3b8',
            boxShadow: currentMode === 'didactic' ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none'
          }}
          data-testid="btn-mode-didactic"
        >
          <Sprout size={14} />
          <span>Modo Didáctico MapBiomas</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeMode('technical')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: currentMode === 'technical' ? 700 : 500,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: currentMode === 'technical' ? '#06b6d4' : 'transparent',
            color: currentMode === 'technical' ? '#ffffff' : '#94a3b8',
            boxShadow: currentMode === 'technical' ? '0 2px 8px rgba(6, 182, 212, 0.3)' : 'none'
          }}
          data-testid="btn-mode-technical"
        >
          <FlaskConical size={14} />
          <span>Modo Técnico (pF)</span>
        </button>
      </div>
    </div>
  );
}
