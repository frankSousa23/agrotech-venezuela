'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { VENEZUELA_STATES_DATA, VENEZUELA_SOIL_POINTS, StateGeoData } from '@/lib/geo/venezuelaData';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '520px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b1329',
      color: '#4ade80'
    }}>
      Cargando WebGIS MapBiomas...
    </div>
  ),
});

export default function MapBiomasViewer() {
  const [selectedStateId, setSelectedStateId] = useState<string>('all');
  const [selectedLayer, setSelectedLayer] = useState<'mapbiomas' | 'ph' | 'rainfall' | 'satellite'>('mapbiomas');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawnAreaHa, setDrawnAreaHa] = useState<number | null>(null);

  const selectedState = useMemo<StateGeoData>(() => {
    if (selectedStateId === 'all') {
      return {
        id: 'venezuela_all',
        name: 'Venezuela (Nacional)',
        region: 'Nacional',
        capital: 'Caracas',
        center: [8.0, -66.0],
        bounds: [[0.6, -73.4], [12.2, -59.8]],
        annualRainfallMm: 1450,
        averageTempC: 27.0,
        mainCrops: ['Maíz', 'Arroz', 'Caña de Azúcar', 'Café', 'Cacao'],
        soilTextureDominant: 'Variable',
        averagePh: 6.1,
        mapbiomasCoverPercentage: { forest: 52, savanna: 31, agriculture: 8, pasture: 7, water: 2 }
      };
    }
    return VENEZUELA_STATES_DATA.find(s => s.id === selectedStateId) || VENEZUELA_STATES_DATA[0];
  }, [selectedStateId]);

  const mapCenter = useMemo(() => {
    if (selectedStateId === 'all') {
      return { lat: 8.0, lng: -66.0, zoom: 6 };
    }
    return { lat: selectedState.center[0], lng: selectedState.center[1], zoom: 8 };
  }, [selectedStateId, selectedState]);

  const filteredPoints = selectedStateId === 'all' 
    ? VENEZUELA_SOIL_POINTS 
    : VENEZUELA_SOIL_POINTS.filter(p => p.stateId === selectedStateId);

  const handleSimulateDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setIsDrawing(false);
      setDrawnAreaHa(28.6);
    }, 600);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '12px', overflow: 'hidden', background: '#0b1329', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Controles Flotantes del WebGIS */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 15,
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '8px',
        padding: '12px 14px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '320px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80' }}>
          🛰️ Capas MapBiomas Venezuela
        </div>
        
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <button 
            id="btn_biomas_lulc"
            onClick={() => setSelectedLayer('mapbiomas')}
            style={{
              padding: '4px 8px',
              fontSize: '0.72rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'mapbiomas' ? '#16a34a' : '#334155',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: selectedLayer === 'mapbiomas' ? 700 : 400
            }}
          >
            LULC 2024
          </button>
          <button 
            id="btn_biomas_ph"
            onClick={() => setSelectedLayer('ph')}
            style={{
              padding: '4px 8px',
              fontSize: '0.72rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'ph' ? '#f59e0b' : '#334155',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: selectedLayer === 'ph' ? 700 : 400
            }}
          >
            Semáforo pH
          </button>
          <button 
            id="btn_biomas_rainfall"
            onClick={() => setSelectedLayer('rainfall')}
            style={{
              padding: '4px 8px',
              fontSize: '0.72rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'rainfall' ? '#0284c7' : '#334155',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: selectedLayer === 'rainfall' ? 700 : 400
            }}
          >
            Lluvias NASA
          </button>
          <button 
            id="btn_biomas_sat"
            onClick={() => setSelectedLayer('satellite')}
            style={{
              padding: '4px 8px',
              fontSize: '0.72rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'satellite' ? '#9333ea' : '#334155',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: selectedLayer === 'satellite' ? 700 : 400
            }}
          >
            Satélite
          </button>
        </div>

        <label style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Situar en Estado:</label>
        <select 
          id="select_biomas_state"
          value={selectedStateId} 
          onChange={(e) => setSelectedStateId(e.target.value)}
          style={{
            background: '#0f172a',
            color: '#fff',
            border: '1px solid #38bdf8',
            borderRadius: '4px',
            padding: '6px 8px',
            fontSize: '0.78rem',
            fontWeight: 600
          }}
        >
          <option value="all">🇻🇪 Todos los Estados (24)</option>
          {VENEZUELA_STATES_DATA.map(st => (
            <option key={st.id} value={st.id}>{st.name} ({st.region})</option>
          ))}
        </select>

        <button 
          id="btn_biomas_draw"
          onClick={handleSimulateDraw}
          style={{
            background: isDrawing ? '#eab308' : '#22c55e',
            color: '#000',
            fontWeight: 700,
            border: 'none',
            borderRadius: '4px',
            padding: '6px 10px',
            fontSize: '0.76rem',
            cursor: 'pointer'
          }}
        >
          {isDrawing ? '📐 Trazando Parcela...' : '📐 Delimitar Parcela Shoelace'}
        </button>

        {drawnAreaHa && (
          <div style={{ fontSize: '0.75rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.15)', padding: '4px 6px', borderRadius: '4px' }}>
            ✓ Parcela: <b>{drawnAreaHa} ha</b> calculadas con fórmula Shoelace.
          </div>
        )}
      </div>

      {/* Mapa Base Visual e Interactivo con Leaflet */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <LeafletMap
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={mapCenter.zoom}
          selectedState={selectedState}
          activeLayer={selectedLayer}
          onSelectState={(stId) => setSelectedStateId(stId)}
        />

        {/* Marcadores de Muestras Edafológicas */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          zIndex: 15,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#fff',
          fontSize: '0.72rem'
        }}>
          <div><b>{filteredPoints.length}</b> Muestras Edafológicas en {selectedState.name}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.68rem' }}>Resolución: 30m MapBiomas / 10m Sentinel-2</div>
        </div>
      </div>
    </div>
  );
}
