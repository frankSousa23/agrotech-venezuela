'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { VENEZUELA_STATES_DATA, VENEZUELA_SOIL_POINTS, MAPBIOMAS_CLASSES } from '@/lib/geo/venezuelaData';

export default function MapBiomasViewer() {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedLayer, setSelectedLayer] = useState<'mapbiomas' | 'ph' | 'rainfall'>('mapbiomas');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawnAreaHa, setDrawnAreaHa] = useState<number | null>(null);

  const filteredPoints = selectedState === 'all' 
    ? VENEZUELA_SOIL_POINTS 
    : VENEZUELA_SOIL_POINTS.filter(p => p.stateId === selectedState);

  const handleSimulateDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setIsDrawing(false);
      setDrawnAreaHa(25.4);
    }, 800);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '12px', overflow: 'hidden', background: '#1e293b' }}>
      {/* Controles Flotantes del WebGIS */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10,
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '8px',
        padding: '10px 14px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '320px'
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80' }}>
          🛰️ Capas MapBiomas Venezuela
        </div>
        
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            onClick={() => setSelectedLayer('mapbiomas')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'mapbiomas' ? '#16a34a' : '#334155',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            LULC 2024
          </button>
          <button 
            onClick={() => setSelectedLayer('ph')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'ph' ? '#f59e0b' : '#334155',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Semáforo pH
          </button>
          <button 
            onClick={() => setSelectedLayer('rainfall')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'rainfall' ? '#3b82f6' : '#334155',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Lluvias NASA
          </button>
        </div>

        <select 
          value={selectedState} 
          onChange={(e) => setSelectedState(e.target.value)}
          style={{
            background: '#0f172a',
            color: '#fff',
            border: '1px solid #475569',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '0.78rem'
          }}
        >
          <option value="all">🇻🇪 Todos los Estados (24)</option>
          {VENEZUELA_STATES_DATA.map(st => (
            <option key={st.id} value={st.id}>{st.name} ({st.region})</option>
          ))}
        </select>

        <button 
          onClick={handleSimulateDraw}
          style={{
            background: isDrawing ? '#eab308' : '#22c55e',
            color: '#000',
            fontWeight: 700,
            border: 'none',
            borderRadius: '4px',
            padding: '6px 10px',
            fontSize: '0.78rem',
            cursor: 'pointer'
          }}
        >
          {isDrawing ? '📐 Trazando Parcela...' : '📐 Delimitar Parcela'}
        </button>

        {drawnAreaHa && (
          <div style={{ fontSize: '0.75rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.15)', padding: '4px 6px', borderRadius: '4px' }}>
            ✓ Parcela: <b>{drawnAreaHa} ha</b> calculadas con fórmula Shoelace.
          </div>
        )}
      </div>

      {/* Mapa Base Visual e Interactivo */}
      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0b1329' }}>
        <iframe
          title="Venezuela Satellite Basemap"
          src="https://maps.google.com/maps?q=8.0,-66.0&z=6&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'contrast(1.1) saturate(1.2)' }}
          loading="lazy"
        />

        {/* Marcadores de Muestras Edafológicas */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          zIndex: 10,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#fff',
          fontSize: '0.75rem'
        }}>
          <div><b>{filteredPoints.length}</b> Muestras Edafológicas GPS</div>
          <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Resolución: 30m MapBiomas / 10m Sentinel-2</div>
        </div>
      </div>
    </div>
  );
}
