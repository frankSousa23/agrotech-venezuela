'use client';

import React from 'react';
import { useUIMode } from '@/lib/context/UIModeContext';
import styles from './FarmerModeToggle.module.css';
import { Sprout, Microscope, Sparkles } from 'lucide-react';

interface FarmerModeToggleProps {
  iconOnly?: boolean;
  className?: string;
}

export default function FarmerModeToggle({ iconOnly = false, className = '' }: FarmerModeToggleProps) {
  const { mode, isFarmerMode, setMode, toggleMode } = useUIMode();

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={toggleMode}
        className={`${styles.iconOnlyBtn} ${className}`}
        title={isFarmerMode ? 'Modo Productor Activo (Clic para cambiar a Modo Técnico)' : 'Modo Técnico Activo (Clic para cambiar a Modo Productor)'}
        aria-label="Alternar Modo Productor / Modo Técnico"
      >
        {isFarmerMode ? (
          <span style={{ fontSize: '1rem' }} role="img" aria-label="Modo Productor">👨‍🌾</span>
        ) : (
          <Microscope size={17} color="#38bdf8" />
        )}
      </button>
    );
  }

  return (
    <div 
      className={`${styles.toggleContainer} ${className}`}
      role="group" 
      aria-label="Selector de Modo de Visualización"
    >
      <button
        type="button"
        onClick={() => setMode('farmer')}
        className={`${styles.toggleBtn} ${isFarmerMode ? styles.activeFarmer : ''}`}
        aria-pressed={isFarmerMode}
        title="Vista sencilla con lenguaje amigable, 4 tareas principales y sin tecnicismos complejos"
      >
        <Sprout size={14} />
        <span>Modo Productor</span>
      </button>

      <button
        type="button"
        onClick={() => setMode('specialist')}
        className={`${styles.toggleBtn} ${!isFarmerMode ? styles.activeSpecialist : ''}`}
        aria-pressed={!isFarmerMode}
        title="Vista completa para agrónomos y jurados con radar SAR, capas satelitales y telemetría"
      >
        <Microscope size={14} />
        <span>Modo Técnico</span>
      </button>
    </div>
  );
}
