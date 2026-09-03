'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UIMode = 'farmer' | 'specialist';

export interface UIModeContextType {
  mode: UIMode;
  isFarmerMode: boolean;
  isSpecialistMode: boolean;
  setMode: (mode: UIMode) => void;
  toggleMode: () => void;
}

export const UIModeContext = createContext<UIModeContextType | undefined>(undefined);

export const UI_MODE_STORAGE_KEY = 'agrotech_ui_mode';

export function UIModeProvider({ 
  children,
  initialMode
}: { 
  children: React.ReactNode;
  initialMode?: UIMode;
}) {
  const [mode, setModeState] = useState<UIMode>(initialMode || 'farmer');

  useEffect(() => {
    if (initialMode) return;
    try {
      const stored = localStorage.getItem(UI_MODE_STORAGE_KEY);
      if (stored === 'farmer' || stored === 'specialist') {
        setModeState(stored);
      }
    } catch {
      // Fallback gracefully if localStorage is unavailable
    }
  }, [initialMode]);

  const setMode = (newMode: UIMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(UI_MODE_STORAGE_KEY, newMode);
    } catch {
      // Ignore
    }
  };

  const toggleMode = () => {
    setMode(mode === 'farmer' ? 'specialist' : 'farmer');
  };

  const value: UIModeContextType = {
    mode,
    isFarmerMode: mode === 'farmer',
    isSpecialistMode: mode === 'specialist',
    setMode,
    toggleMode
  };

  return (
    <UIModeContext.Provider value={value}>
      {children}
    </UIModeContext.Provider>
  );
}

export function useUIMode(): UIModeContextType {
  const context = useContext(UIModeContext);
  if (!context) {
    return {
      mode: 'farmer',
      isFarmerMode: true,
      isSpecialistMode: false,
      setMode: () => {},
      toggleMode: () => {}
    };
  }
  return context;
}
