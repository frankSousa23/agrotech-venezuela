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
import { Sun, Moon, SunMedium } from 'lucide-react';

type Theme = 'light' | 'dark' | 'sunlight';

export default function SunlightThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('agrotech-theme') as Theme;
    if (savedTheme && ['light', 'dark', 'sunlight'].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'sunlight'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('agrotech-theme', nextTheme);
    setTheme(nextTheme);
  };

  const getConfig = () => {
    switch (theme) {
      case 'dark':
        return {
          label: 'Modo Oscuro',
          icon: <Moon size={14} />,
          bg: 'rgba(30, 41, 59, 0.7)',
          color: '#cbd5e1',
          border: '1px solid rgba(203, 213, 225, 0.3)'
        };
      case 'sunlight':
        return {
          label: 'Pleno Sol ☀️',
          icon: <Sun size={14} />,
          bg: '#fef08a',
          color: '#854d0e',
          border: '1px solid #eab308'
        };
      case 'light':
      default:
        return {
          label: 'Modo Claro',
          icon: <SunMedium size={14} />,
          bg: 'rgba(255, 255, 255, 0.9)',
          color: '#0f172a',
          border: '1px solid #cbd5e1'
        };
    }
  };

  const config = getConfig();

  return (
    <button
      onClick={cycleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: config.bg,
        color: config.color,
        border: config.border,
        borderRadius: '8px',
        padding: '6px 10px',
        fontSize: '0.78rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '110px',
        justifyContent: 'center'
      }}
      title='Cambiar apariencia visual'
    >
      {config.icon}
      <span>{config.label}</span>
    </button>
  );
}
