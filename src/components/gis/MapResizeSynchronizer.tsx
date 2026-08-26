/**
 * ============================================================================
 * AGROTECH VENEZUELA — SINCRONIZADOR DE TAMAÑO LEAFLET (MapResizeSynchronizer.tsx)
 * ============================================================================
 * 
 * Componente interno de Leaflet que asegura que el canvas del mapa
 * recalcule sus dimensiones (invalidateSize) ante cambios de layout,
 * orientación o transiciones entre modos y pestañas.
 */

'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapResizeSynchronizer() {
  const map = useMap();

  useEffect(() => {
    // Invalida tamaño inmediatamente al montar
    const timer1 = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const timer2 = setTimeout(() => {
      map.invalidateSize();
    }, 600);

    // Escucha cambios de tamaño de ventana
    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [map]);

  return null;
}
