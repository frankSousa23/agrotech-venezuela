/**
 * ============================================================================
 * AGROTECH VENEZUELA — VISOR TERRITORIAL DE ESTADOS (VenezuelaStateMapViewer.tsx)
 * ============================================================================
 * 
 * Contenedor principal que orquesta:
 * 1. Importación dinámica con SSR deshabilitado (ssr: false) de Leaflet.
 * 2. Barra de control superior con capas temáticas y selector rápido de estados.
 * 3. Ficha Técnica Reactiva de Telemetría Edafoclimática del estado activo.
 * 4. Sincronización bidireccional entre eventos de clic en el mapa y la UI.
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { VENEZUELA_STATES_DATA, StateGeoData } from '@/lib/geo/venezuelaData';
import { estimateSarRadarBackscatter } from '@/lib/geo/sarRadarService';
import type { ActiveMapLayer } from './VenezuelaStateMapInner';
import { 
  Layers, 
  MapPin, 
  Droplets, 
  Thermometer, 
  FlaskConical, 
  Sprout, 
  Sparkles, 
  Compass, 
  ArrowRight,
  ExternalLink,
  Info,
  Radio
} from 'lucide-react';

// Carga dinámica de Leaflet para Next.js 16 App Router
const VenezuelaStateMapInner = dynamic(() => import('./VenezuelaStateMapInner'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '620px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b1329',
      color: '#4ade80',
      borderRadius: '16px',
      gap: '12px'
    }}>
      <div style={{ fontSize: '2.5rem', animation: 'pulse 2s infinite' }}>🛰️</div>
      <div style={{ fontWeight: 600, fontSize: '1rem' }}>
        Iniciando Mapa Global de Venezuela & Polígonos Estadales...
      </div>
      <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
        Cargando geometrías vectoriales de 24 entidades federales
      </div>
    </div>
  )
});

interface VenezuelaStateMapViewerProps {
  initialStateId?: string;
  onStateSelect?: (stateId: string) => void;
}

export default function VenezuelaStateMapViewer({
  initialStateId = 'portuguesa',
  onStateSelect
}: VenezuelaStateMapViewerProps) {
  const [selectedStateId, setSelectedStateId] = useState<string>(initialStateId);
  const [activeLayer, setActiveLayer] = useState<ActiveMapLayer>('thematic');

  // Estado activo
  const selectedState = useMemo<StateGeoData>(() => {
    return VENEZUELA_STATES_DATA.find(s => s.id === selectedStateId) || VENEZUELA_STATES_DATA[0];
  }, [selectedStateId]);

  // Manejador de selección de estado
  const handleSelectState = useCallback((stateId: string) => {
    setSelectedStateId(stateId);
    if (onStateSelect) {
      onStateSelect(stateId);
    }
  }, [onStateSelect]);

  // Categorización visual del pH
  const phStatus = useMemo(() => {
    const ph = selectedState.averagePh;
    if (ph < 5.2) return { label: 'Muy Ácido (Encalado Requerido)', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
    if (ph < 6.0) return { label: 'Moderadamente Ácido', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' };
    if (ph <= 7.2) return { label: 'Rango Óptimo Agronómico', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
    return { label: 'Alcalino / Calcáreo', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.15)' };
  }, [selectedState.averagePh]);

  const cover = selectedState.mapbiomasCoverPercentage || { agriculture: 30, pasture: 25, forest: 40, water: 5 };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      width: '100%',
      background: 'transparent'
    }}>
      {/* 🧭 Barra de Control Superior */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '12px',
        padding: '10px 16px',
        color: '#fff',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Selector de Estado Desplegable */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={18} color="#22c55e" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>Estado Activo:</span>
          <select
            id="select_venezuela_state"
            value={selectedStateId}
            onChange={(e) => handleSelectState(e.target.value)}
            style={{
              background: '#0f172a',
              color: '#fff',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {VENEZUELA_STATES_DATA.map((st) => (
              <option key={st.id} value={st.id}>
                📍 {st.name} ({st.region})
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Capas Temáticas */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Layers size={14} /> Capas:
          </span>

          <button
            id="btn_layer_thematic"
            onClick={() => setActiveLayer('thematic')}
            style={{
              padding: '5px 10px',
              fontSize: '0.76rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'thematic' ? '#16a34a' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'thematic' ? 700 : 400
            }}
          >
            Regiones
          </button>

          <button
            id="btn_layer_satellite"
            onClick={() => setActiveLayer('satellite')}
            style={{
              padding: '5px 10px',
              fontSize: '0.76rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'satellite' ? '#9333ea' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'satellite' ? 700 : 400
            }}
          >
            Satélite HD
          </button>

          <button
            id="btn_layer_ph"
            onClick={() => setActiveLayer('ph')}
            style={{
              padding: '5px 10px',
              fontSize: '0.76rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'ph' ? '#f59e0b' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'ph' ? 700 : 400
            }}
          >
            Semáforo pH
          </button>

          <button
            id="btn_layer_rainfall"
            onClick={() => setActiveLayer('rainfall')}
            style={{
              padding: '5px 10px',
              fontSize: '0.76rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'rainfall' ? '#0284c7' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'rainfall' ? 700 : 400
            }}
          >
            Lluvias NASA
          </button>

          <button
            id="btn_layer_mapbiomas"
            onClick={() => setActiveLayer('mapbiomas')}
            style={{
              padding: '5px 10px',
              fontSize: '0.76rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'mapbiomas' ? '#d946ef' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'mapbiomas' ? 700 : 400
            }}
          >
            MapBiomas
          </button>

          <button
            id="btn_layer_sar"
            onClick={() => setActiveLayer('sar')}
            style={{
              padding: '5px 10px',
              fontSize: '0.76rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'sar' ? '#0ea5e9' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'sar' ? 700 : 400
            }}
          >
            📡 Radar SAR (Sin Nubes)
          </button>
        </div>
      </div>

      {/* 🗺️ Grid Principal: Mapa a la Izquierda, Ficha a la Derecha */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 360px',
        gap: '14px',
        minHeight: '620px'
      }}>
        {/* Contenedor del Mapa Leaflet */}
        <div style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          background: '#0b1329'
        }}>
          <VenezuelaStateMapInner
            selectedStateId={selectedStateId}
            activeLayer={activeLayer}
            onSelectState={handleSelectState}
          />
        </div>

        {/* 📊 Ficha Informativa y Telemetría del Estado Activo */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: '20px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          overflowY: 'auto',
          maxHeight: '680px'
        }}>
          {/* Cabecera del Estado */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#38bdf8', fontWeight: 700 }}>
                Entidad Federal
              </span>
              <span style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '2px 8px', borderRadius: '999px', border: '1px solid #22c55e' }}>
                Región {selectedState.region}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 2px 0', color: '#f8fafc' }}>
              🇻🇪 {selectedState.name}
            </h2>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Capital: <b>{selectedState.capital}</b> | Coordenadas: [{selectedState.center[0].toFixed(2)}°, {selectedState.center[1].toFixed(2)}°]
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

          {/* KPI Agroclimáticos Rápidos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Droplets size={12} color="#38bdf8" /> Lluvia Anual
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>
                {selectedState.annualRainfallMm} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>mm/año</span>
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Thermometer size={12} color="#fbbf24" /> Temp. Promedio
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24', marginTop: '2px' }}>
                {selectedState.averageTempC} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>°C</span>
              </div>
            </div>
          </div>

          {/* Perfil Edafológico (Suelo y pH) */}
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4ade80', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FlaskConical size={14} /> Perfil Edafológico Promedio
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Suelo Dominante:</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc' }}>{selectedState.soilTextureDominant}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Acidez (pH):</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: phStatus.color }}>{selectedState.averagePh}</span>
            </div>

            <div style={{ fontSize: '0.72rem', color: phStatus.color, background: phStatus.bg, padding: '4px 8px', borderRadius: '6px', fontWeight: 600, textAlign: 'center' }}>
              {phStatus.label}
            </div>
          </div>

          {/* Vocación Agrícola y Cultivos Clave */}
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fbbf24', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sprout size={14} /> Cultivos Estratégicos
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selectedState.mainCrops.map((crop, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  🌱 {crop}
                </span>
              ))}
            </div>
          </div>

          {/* Balance de Cobertura MapBiomas */}
          <div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Uso del Suelo MapBiomas 2024</span>
              <span>{cover.agriculture}% Agrícola</span>
            </div>
            <div style={{ height: '8px', width: '100%', background: '#334155', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${cover.agriculture}%`, background: '#d946ef' }} title={`Agrícola: ${cover.agriculture}%`} />
              <div style={{ width: `${cover.pasture}%`, background: '#f59e0b' }} title={`Pastos: ${cover.pasture}%`} />
              <div style={{ width: `${cover.forest}%`, background: '#059669' }} title={`Bosque: ${cover.forest}%`} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px' }}>
              <span style={{ color: '#d946ef' }}>■ {cover.agriculture}% Agrícola</span>
              <span style={{ color: '#f59e0b' }}>■ {cover.pasture}% Pastos</span>
              <span style={{ color: '#059669' }}>■ {cover.forest}% Bosques</span>
            </div>
          </div>

          {/* Telemetría Radar SAR Sentinel-1 */}
          <div style={{ 
            background: activeLayer === 'sar' ? 'rgba(14, 165, 233, 0.15)' : 'rgba(30, 41, 59, 0.6)', 
            padding: '10px 12px', 
            borderRadius: '12px', 
            border: activeLayer === 'sar' ? '1px solid #0ea5e9' : '1px solid rgba(255, 255, 255, 0.05)' 
          }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#38bdf8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Radio size={14} /> Sentinel-1 SAR (Radar Sin Nubes)
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#cbd5e1', marginBottom: '2px' }}>
              <span>Retrodispersión VV:</span>
              <b style={{ color: '#38bdf8' }}>{estimateSarRadarBackscatter(selectedState.center[0], selectedState.center[1], selectedState.annualRainfallMm).backscatterVV_dB} dB</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#cbd5e1', marginBottom: '4px' }}>
              <span>Saturación de Humedad:</span>
              <b style={{ color: '#4ade80' }}>{estimateSarRadarBackscatter(selectedState.center[0], selectedState.center[1], selectedState.annualRainfallMm).soilMoistureIndexPct}%</b>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontStyle: 'italic' }}>
              {estimateSarRadarBackscatter(selectedState.center[0], selectedState.center[1], selectedState.annualRainfallMm).saturationRisk}
            </div>
          </div>

          {/* Botón de Enlace al Simulador */}
          <a
            href={`/dashboard/recomendaciones?state=${selectedState.id}&ph=${selectedState.averagePh}`}
            style={{
              marginTop: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#16a34a',
              color: '#fff',
              textDecoration: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.82rem',
              transition: 'background 0.2s',
              textAlign: 'center'
            }}
          >
            <Sparkles size={16} /> Evaluar con Simulador IA <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
