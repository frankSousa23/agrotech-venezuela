/**
 * ============================================================================
 * AGROTECH VENEZUELA — INTERRUPTOR MODO PLENO SOL (SunlightThemeToggle.tsx)
 * ============================================================================
 * 
 * Permite a los productores activar el modo de alto contraste para operar
 * directamente en campo bajo la luz solar intensa o en cabina de tractor.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';

export default function SunlightThemeToggle() {
  const [isSunlightMode, setIsSunlightMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('agrotech_theme');
    if (savedTheme === 'sunlight') {
      setIsSunlightMode(true);
      document.documentElement.setAttribute('data-theme', 'sunlight');
    }
  }, []);

  const toggleTheme = () => {
    if (isSunlightMode) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('agrotech_theme', 'dark');
      setIsSunlightMode(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'sunlight');
      localStorage.setItem('agrotech_theme', 'sunlight');
      setIsSunlightMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: isSunlightMode ? '#fef08a' : 'rgba(30, 41, 59, 0.7)',
        color: isSunlightMode ? '#854d0e' : '#fbbf24',
        border: isSunlightMode ? '1px solid #eab308' : '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '8px',
        padding: '6px 10px',
        fontSize: '0.78rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      title={isSunlightMode ? 'Volver a Modo Nocturno' : 'Activar Modo Pleno Sol (Alto Contraste)'}
    >
      {isSunlightMode ? <Sun size={14} /> : <Sun size={14} />}
      <span>{isSunlightMode ? 'Pleno Sol ☀️' : 'Modo Sol'}</span>
    </button>
  );
}
