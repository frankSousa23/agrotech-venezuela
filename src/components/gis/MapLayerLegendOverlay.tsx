/**
 * ============================================================================
 * AGROTECH VENEZUELA — LEYENDA DINÁMICA FLOTANTE (MapLayerLegendOverlay.tsx)
 * ============================================================================
 * 
 * Widget flotante sobre el mapa Leaflet:
 * - Se adapta dinámicamente según la capa activa (SAR, pH, Lluvia, MapBiomas, Regiones).
 * - Permite colapsar / expandir para optimizar la visibilidad en dispositivos móviles.
 */

'use client';

import React, { useState } from 'react';
import type { ActiveMapLayer } from './VenezuelaStateMapInner';
import { Layers, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface MapLayerLegendOverlayProps {
  activeLayer: ActiveMapLayer;
}

export default function MapLayerLegendOverlay({ activeLayer }: MapLayerLegendOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (activeLayer === 'satellite' || activeLayer === 'dark') {
    return (
      <div style={{
        position: 'absolute',
        bottom: '18px',
        left: '18px',
        zIndex: 999,
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '8px',
        padding: '6px 12px',
        fontSize: '0.72rem',
        color: '#94a3b8',
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <Info size={12} color="#38bdf8" /> Capa: Satélite Esri HD (Resolución Espacial Submétrica)
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute',
      bottom: '18px',
      left: '18px',
      zIndex: 999,
      background: 'rgba(15, 23, 42, 0.92)',
      backdropFilter: 'blur(14px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '12px',
      padding: isExpanded ? '10px 14px' : '6px 10px',
      color: '#fff',
      boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
      fontSize: '0.75rem',
      maxWidth: '280px',
      pointerEvents: 'auto',
      transition: 'all 0.25s ease'
    }}>
      {/* Barra de Título con Toggle */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          gap: '8px',
          fontWeight: 700,
          color: '#38bdf8'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={13} />
          <span>
            {activeLayer === 'thematic' && 'Regiones Agroecológicas'}
            {activeLayer === 'ph' && 'Semáforo de Acidez (pH)'}
            {activeLayer === 'rainfall' && 'Precipitación Anual NASA'}
            {activeLayer === 'mapbiomas' && 'Uso del Suelo MapBiomas'}
            {activeLayer === 'sar' && 'Radar SAR Sentinel-1 (dB)'}
          </span>
        </div>
        {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </div>

      {/* Contenido de la Leyenda */}
      {isExpanded && (
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {activeLayer === 'thematic' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '0.7rem' }}>
              <div><span style={{ color: '#d97706' }}>■</span> Llanos</div>
              <div><span style={{ color: '#059669' }}>■</span> Andes</div>
              <div><span style={{ color: '#0284c7' }}>■</span> Zulia</div>
              <div><span style={{ color: '#15803d' }}>■</span> Guayana</div>
              <div><span style={{ color: '#ca8a04' }}>■</span> Centro-Occ.</div>
              <div><span style={{ color: '#9333ea' }}>■</span> Centro</div>
              <div><span style={{ color: '#ea580c' }}>■</span> Oriente</div>
            </div>
          )}

          {activeLayer === 'ph' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.7rem' }}>
              <div><span style={{ color: '#ef4444' }}>■</span> &lt; 5.2 (Muy Ácido • Encalado)</div>
              <div><span style={{ color: '#f97316' }}>■</span> 5.2 - 6.0 (Moderadamente Ácido)</div>
              <div><span style={{ color: '#10b981' }}>■</span> 6.0 - 7.2 (Rango Óptimo Agronómico)</div>
              <div><span style={{ color: '#0284c7' }}>■</span> &gt; 7.2 (Alcalino / Calcáreo)</div>
            </div>
          )}

          {activeLayer === 'rainfall' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.7rem' }}>
              <div><span style={{ color: '#fed7aa' }}>■</span> &lt; 800 mm (Semiárido / Riego)</div>
              <div><span style={{ color: '#38bdf8' }}>■</span> 800 - 1400 mm (Húmedo Óptimo)</div>
              <div><span style={{ color: '#0284c7' }}>■</span> 1400 - 2000 mm (Muy Húmedo)</div>
              <div><span style={{ color: '#1e40af' }}>■</span> &gt; 2000 mm (Pluvial / Selva)</div>
            </div>
          )}

          {activeLayer === 'mapbiomas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.7rem' }}>
              <div><span style={{ color: '#d946ef' }}>■</span> Agrícola Intenso (&gt; 35%)</div>
              <div><span style={{ color: '#047857' }}>■</span> Bosques Nativos (&gt; 60%)</div>
              <div><span style={{ color: '#eab308' }}>■</span> Pastizales y Sabanas</div>
            </div>
          )}

          {activeLayer === 'sar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.7rem' }}>
              <div><span style={{ color: '#3b82f6' }}>■</span> &gt; 1800mm (Alta Humedad / Anegamiento)</div>
              <div><span style={{ color: '#06b6d4' }}>■</span> 1100 - 1800mm (Humedad Óptima)</div>
              <div><span style={{ color: '#cbd5e1' }}>■</span> &lt; 1100mm (Suelo Seco / Rugosidad)</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
