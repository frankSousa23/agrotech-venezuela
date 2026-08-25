'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { VENEZUELA_STATES_DATA, VENEZUELA_SOIL_POINTS } from '@/lib/geo/venezuelaData';
import { calculatePolygonAreaHa } from '@/lib/geo/spatialUtils';
import type { ActiveLayerType } from './LeafletMapInner';

const LeafletMapInner = dynamic(() => import('./LeafletMapInner'), {
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
      color: '#4ade80',
      fontSize: '0.9rem',
      fontWeight: 600
    }}>
      🛰️ Cargando Visor Satelital MapBiomas Venezuela...
    </div>
  )
});

export default function MapBiomasViewer() {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedLayer, setSelectedLayer] = useState<ActiveLayerType>('mapbiomas');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);

  const filteredPoints = useMemo(() => {
    return selectedState === 'all' 
      ? VENEZUELA_SOIL_POINTS 
      : VENEZUELA_SOIL_POINTS.filter(p => p.stateId.toLowerCase() === selectedState.toLowerCase());
  }, [selectedState]);

  const mapCenter = useMemo(() => {
    if (selectedState === 'all') {
      return { lat: 8.0, lng: -66.0, zoom: 6 };
    }
    const stateObj = VENEZUELA_STATES_DATA.find(s => s.id === selectedState);
    return stateObj ? { lat: stateObj.center[0], lng: stateObj.center[1], zoom: 8 } : { lat: 8.0, lng: -66.0, zoom: 6 };
  }, [selectedState]);

  const handleAddPoint = useCallback((point: [number, number]) => {
    setDrawnPoints(prev => [...prev, point]);
  }, []);

  const handleSimulateDraw = () => {
    const coords: [number, number][] = [
      [mapCenter.lat - 0.005, mapCenter.lng - 0.005],
      [mapCenter.lat + 0.005, mapCenter.lng - 0.005],
      [mapCenter.lat + 0.005, mapCenter.lng + 0.005],
      [mapCenter.lat - 0.005, mapCenter.lng + 0.005],
    ];
    setDrawnPoints(coords);
  };

  const drawnAreaHa = useMemo(() => {
    return calculatePolygonAreaHa(drawnPoints);
  }, [drawnPoints]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '520px', borderRadius: '12px', overflow: 'hidden', background: '#0b1329' }}>
      {/* Controles Flotantes del WebGIS */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '10px',
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
        
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button 
            id="btn_biomas_lulc"
            onClick={() => setSelectedLayer('mapbiomas')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
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
            id="btn_biomas_sat"
            onClick={() => setSelectedLayer('satellite')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'satellite' ? '#9333ea' : '#334155',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: selectedLayer === 'satellite' ? 700 : 400
            }}
          >
            Satélite HD
          </button>
          <button 
            id="btn_biomas_ph"
            onClick={() => setSelectedLayer('ph')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
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
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              background: selectedLayer === 'rainfall' ? '#3b82f6' : '#334155',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: selectedLayer === 'rainfall' ? 700 : 400
            }}
          >
            Lluvias NASA
          </button>
        </div>

        <select 
          id="select_biomas_state"
          value={selectedState} 
          onChange={(e) => setSelectedState(e.target.value)}
          style={{
            background: '#0f172a',
            color: '#fff',
            border: '1px solid #475569',
            borderRadius: '4px',
            padding: '6px 8px',
            fontSize: '0.78rem'
          }}
        >
          <option value="all">🇻🇪 Todos los Estados (24)</option>
          {VENEZUELA_STATES_DATA.map(st => (
            <option key={st.id} value={st.id}>{st.name} ({st.region})</option>
          ))}
        </select>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            id="btn_biomas_draw"
            onClick={handleSimulateDraw}
            style={{
              flex: 1,
              background: '#22c55e',
              color: '#000',
              fontWeight: 700,
              border: 'none',
              borderRadius: '4px',
              padding: '6px 10px',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            📐 Delimitar Parcela
          </button>
          {drawnPoints.length > 0 && (
            <button
              onClick={() => setDrawnPoints([])}
              style={{
                background: '#475569',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 10px',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Borrar
            </button>
          )}
        </div>

        {drawnAreaHa > 0 && (
          <div style={{ fontSize: '0.75rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.15)', padding: '6px 8px', borderRadius: '4px', border: '1px solid #22c55e' }}>
            ✓ Superficie: <b>{drawnAreaHa} ha</b> (Shoelace WGS84)
          </div>
        )}
      </div>

      {/* Mapa Base Visual e Interactivo Leaflet */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <LeafletMapInner
          currentLevel={selectedState === 'all' ? 1 : 2}
          selectedStateId={selectedState === 'all' ? 'portuguesa' : selectedState}
          selectedMunicipalityId="turen"
          activeLayer={selectedLayer}
          mapCenter={mapCenter}
          isDrawing={isDrawing}
          drawnPoints={drawnPoints}
          onAddPoint={handleAddPoint}
          onSelectState={(stId) => setSelectedState(stId)}
          onSelectMunicipality={() => {}}
          showSoilPoints={true}
        />

        {/* Marcadores de Muestras Edafológicas Footer */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          zIndex: 1000,
          background: 'rgba(15, 23, 42, 0.88)',
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
