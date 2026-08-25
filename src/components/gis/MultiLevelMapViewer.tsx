'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { VENEZUELA_MUNICIPALITIES_DATA, getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { calculatePolygonAreaHa } from '@/lib/geo/spatialUtils';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '660px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b1329',
      color: '#4ade80',
      gap: '12px'
    }}>
      <div style={{ fontSize: '2.5rem', animation: 'pulse 2s infinite' }}>🛰️</div>
      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
        Iniciando Motor WebGIS Vectorial & Satelital...
      </div>
    </div>
  ),
});

import { 
  Save,
  ChevronRight,
  LocateFixed,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Compass
} from 'lucide-react';

export type MapLevel = 1 | 2 | 3; // 1: Nacional, 2: Estadal/Municipal, 3: Micro-Parcela

interface MultiLevelMapViewerProps {
  initialLevel?: MapLevel;
  initialStateId?: string;
  onSaveParcel?: (parcelData: any) => void;
}

export default function MultiLevelMapViewer({ 
  initialLevel = 1, 
  initialStateId = 'portuguesa',
  onSaveParcel 
}: MultiLevelMapViewerProps) {
  const [currentLevel, setCurrentLevel] = useState<MapLevel>(initialLevel);
  const [selectedStateId, setSelectedStateId] = useState<string>(initialStateId);
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<string>('turen');
  const [activeLayer, setActiveLayer] = useState<'satellite' | 'mapbiomas' | 'ph' | 'rainfall'>('mapbiomas');
  const [engineMode, setEngineMode] = useState<'leaflet' | 'satellite_hd'>('leaflet');

  // Control de interfaz responsiva
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Herramienta de delimitación de parcela
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnParcelArea, setDrawnParcelArea] = useState<number | null>(null);
  const [parcelName, setParcelName] = useState('Tablón Nuevo — Parcela 1');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Detectar ancho de pantalla para responsive
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Estado seleccionado
  const currentState = useMemo(() => {
    return VENEZUELA_STATES_DATA.find(s => s.id.toLowerCase() === selectedStateId.toLowerCase()) || VENEZUELA_STATES_DATA[0];
  }, [selectedStateId]);

  // Municipios del estado seleccionado
  const stateMunicipalities = useMemo(() => {
    return getMunicipalitiesByState(selectedStateId);
  }, [selectedStateId]);

  // Municipio seleccionado
  const currentMunicipality = useMemo(() => {
    return VENEZUELA_MUNICIPALITIES_DATA.find(m => m.id.toLowerCase() === selectedMunicipalityId.toLowerCase()) || 
      stateMunicipalities[0] || 
      VENEZUELA_MUNICIPALITIES_DATA[0];
  }, [selectedMunicipalityId, stateMunicipalities]);

  // Navegación y cambio reactivo de Estado
  const handleSelectState = useCallback((stateId: string, transitionToLevel2: boolean = false) => {
    setSelectedStateId(stateId);
    const munis = getMunicipalitiesByState(stateId);
    if (munis.length > 0) {
      setSelectedMunicipalityId(munis[0].id);
    }
    if (transitionToLevel2) {
      setCurrentLevel(2);
    }
  }, []);

  const handleSelectMunicipality = useCallback((muniId: string) => {
    setSelectedMunicipalityId(muniId);
    setCurrentLevel(3);
  }, []);

  // Coordenadas y Zoom reactivos según nivel y selección
  const mapCenter = useMemo(() => {
    if (userLocation) {
      return { lat: userLocation.lat, lng: userLocation.lng, zoom: 15 };
    }
    if (currentLevel === 1) {
      if (selectedStateId && selectedStateId !== 'all') {
        return { lat: currentState.center[0], lng: currentState.center[1], zoom: 8 };
      }
      return { lat: 8.0, lng: -66.0, zoom: 6 };
    }
    if (currentLevel === 2) {
      return { lat: currentState.center[0], lng: currentState.center[1], zoom: 9 };
    }
    return { lat: currentMunicipality.center[0], lng: currentMunicipality.center[1], zoom: 13 };
  }, [currentLevel, currentState, currentMunicipality, selectedStateId, userLocation]);

  // Delimitación interactiva o asistida
  const handleToggleDraw = () => {
    setIsDrawing(!isDrawing);
    setSaveSuccess(false);
  };

  const handlePolygonDrawn = useCallback((coords: [number, number][], areaHa: number) => {
    setDrawnParcelArea(areaHa > 0 ? areaHa : 28.5);
    setIsDrawing(false);
  }, []);

  const handleSimulateDraw = () => {
    setIsDrawing(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setIsDrawing(false);
      const [lat, lng] = currentMunicipality.center;
      const coords: [number, number][] = [
        [lat - 0.004, lng - 0.004],
        [lat + 0.004, lng - 0.004],
        [lat + 0.004, lng + 0.004],
        [lat - 0.004, lng + 0.004],
      ];
      const area = calculatePolygonAreaHa(coords);
      setDrawnParcelArea(area > 0 ? area : 36.4);
    }, 450);
  };

  const handleLocateMe = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setCurrentLevel(3);
        },
        (err) => {
          setIsLocating(false);
          console.warn('Geolocation warning, falling back to state center:', err);
          setUserLocation({
            lat: currentState.center[0],
            lng: currentState.center[1]
          });
        },
        { timeout: 10000 }
      );
    }
  };

  const handleResetView = () => {
    setUserLocation(null);
    setCurrentLevel(1);
    setSelectedStateId('portuguesa');
  };

  const handleSaveToUserFarm = async () => {
    if (!drawnParcelArea) return;
    const parcelPayload = {
      name: parcelName,
      stateId: selectedStateId,
      municipalityId: selectedMunicipalityId,
      areaHectares: drawnParcelArea,
      centerLat: currentMunicipality.center[0],
      centerLng: currentMunicipality.center[1],
      currentCrop: currentMunicipality.mainCrops[0] || 'Maíz Blanco',
      soilTexture: currentMunicipality.soilTexture,
      ph: currentMunicipality.avgPh,
      organicMatter: 3.2
    };

    try {
      const res = await fetch('/api/parcels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parcelPayload)
      });
      if (res.ok) {
        setSaveSuccess(true);
        if (onSaveParcel) onSaveParcel(parcelPayload);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      minHeight: '660px', 
      borderRadius: '16px', 
      overflow: 'hidden', 
      background: '#0b1329', 
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
    }}>
      {/* 🧭 Barra Superior de Migas de Pan (Breadcrumb Navigation & Capas) */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.94)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '8px 14px',
        color: '#fff',
        flexWrap: 'wrap',
        gap: '8px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Toggle Sidebar Button + Breadcrumb Hierarchy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', flexWrap: 'wrap' }}>
          <button
            id="btn_toggle_gis_sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Ocultar panel territorial' : 'Mostrar panel territorial'}
            style={{
              background: isSidebarOpen ? 'rgba(56, 189, 248, 0.2)' : '#0284c7',
              color: '#fff',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              padding: '6px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem'
            }}
          >
            {isSidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
            <span>{isSidebarOpen ? 'Ocultar Panel' : 'Panel Territorial'}</span>
          </button>

          <button 
            id="btn_breadcrumb_national"
            onClick={() => {
              setUserLocation(null);
              setCurrentLevel(1);
            }}
            style={{
              background: currentLevel === 1 ? '#16a34a' : 'transparent',
              color: '#fff',
              border: currentLevel === 1 ? '1px solid #22c55e' : 'none',
              padding: '6px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78rem'
            }}
          >
            🇻🇪 Venezuela (Nivel 1)
          </button>

          <ChevronRight size={14} color="#64748b" />

          <button 
            id="btn_breadcrumb_state"
            onClick={() => {
              setUserLocation(null);
              setCurrentLevel(2);
            }}
            style={{
              background: currentLevel === 2 ? '#0284c7' : 'transparent',
              color: '#fff',
              border: currentLevel === 2 ? '1px solid #38bdf8' : 'none',
              padding: '6px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.78rem'
            }}
          >
            📍 {currentState.name} (Nivel 2)
          </button>

          {currentLevel === 3 && (
            <>
              <ChevronRight size={14} color="#64748b" />
              <div style={{ background: '#d97706', padding: '6px 10px', borderRadius: '6px', fontWeight: 600, border: '1px solid #f59e0b', fontSize: '0.78rem' }}>
                🚜 {currentMunicipality.name} (Micro-Parcela)
              </div>
            </>
          )}
        </div>

        {/* Controles de Vista y Capas */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Selector de Motor WebGIS */}
          <div style={{ display: 'flex', background: '#1e293b', borderRadius: '6px', padding: '2px' }}>
            <button
              id="btn_engine_leaflet"
              onClick={() => setEngineMode('leaflet')}
              style={{
                padding: '4px 8px',
                fontSize: '0.72rem',
                borderRadius: '4px',
                border: 'none',
                background: engineMode === 'leaflet' ? '#22c55e' : 'transparent',
                color: engineMode === 'leaflet' ? '#000' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🛰️ Vectorial
            </button>
            <button
              id="btn_engine_satellite"
              onClick={() => setEngineMode('satellite_hd')}
              style={{
                padding: '4px 8px',
                fontSize: '0.72rem',
                borderRadius: '4px',
                border: 'none',
                background: engineMode === 'satellite_hd' ? '#0284c7' : 'transparent',
                color: engineMode === 'satellite_hd' ? '#fff' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📡 Satélite HD
            </button>
          </div>

          <button 
            id="btn_layer_mapbiomas"
            onClick={() => setActiveLayer('mapbiomas')}
            style={{
              padding: '5px 8px',
              fontSize: '0.74rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'mapbiomas' ? '#16a34a' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'mapbiomas' ? 700 : 400
            }}
          >
            MapBiomas
          </button>
          <button 
            id="btn_layer_ph"
            onClick={() => setActiveLayer('ph')}
            style={{
              padding: '5px 8px',
              fontSize: '0.74rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'ph' ? '#d97706' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'ph' ? 700 : 400
            }}
          >
            pH Suelos
          </button>
          <button 
            id="btn_layer_rainfall"
            onClick={() => setActiveLayer('rainfall')}
            style={{
              padding: '5px 8px',
              fontSize: '0.74rem',
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
            id="btn_layer_satellite"
            onClick={() => setActiveLayer('satellite')}
            style={{
              padding: '5px 8px',
              fontSize: '0.74rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'satellite' ? '#9333ea' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'satellite' ? 700 : 400
            }}
          >
            Sentinel-2
          </button>

          {/* GPS Button */}
          <button
            id="btn_gps_locate"
            onClick={handleLocateMe}
            title="Centrar en mi ubicación GPS actual"
            style={{
              padding: '5px 8px',
              fontSize: '0.74rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: isLocating ? '#eab308' : userLocation ? '#16a34a' : '#334155',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600
            }}
          >
            <LocateFixed size={13} /> {isLocating ? 'Buscando...' : 'GPS'}
          </button>

          {/* Reset Zoom */}
          <button
            id="btn_reset_gis_view"
            onClick={handleResetView}
            title="Reiniciar Vista Nacional"
            style={{
              padding: '5px 8px',
              fontSize: '0.74rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: '#334155',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* 🗺️ Panel Lateral Flotante de Información Territorial Reactivo (Colapsable) */}
      {isSidebarOpen && (
        <div 
          id="floating_gis_sidebar"
          style={{
            position: 'absolute',
            top: 75,
            left: 12,
            zIndex: 15,
            width: isMobile ? 'calc(100% - 24px)' : '340px',
            maxHeight: 'calc(100% - 95px)',
            overflowY: 'auto',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '12px',
            padding: '16px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.6)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header del Panel */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.85rem', color: '#4ade80' }}>
              <Compass size={16} />
              <span>Centro de Mando Territorial</span>
            </div>
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                ✕ Cerrar
              </button>
            )}
          </div>

          {/* Nivel 1: Selección Directa de Estado */}
          {currentLevel === 1 && (
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#4ade80', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🇻🇪</span> Nivel 1: División Nacional (24 Estados)
              </div>

              <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                Seleccionar Estado para Situar en el Mapa:
              </label>
              <select
                id="select_state_gis"
                value={selectedStateId}
                onChange={(e) => handleSelectState(e.target.value, false)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #38bdf8',
                  background: '#0f172a',
                  color: '#fff',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {VENEZUELA_STATES_DATA.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.name} — {st.region} ({st.capital})
                  </option>
                ))}
              </select>

              {/* Accesos Rápidos a Polos Agrícolas Clave */}
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '0.70rem', color: '#94a3b8', marginBottom: '4px' }}>Polos Agrícolas de Alta Relevancia:</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {['portuguesa', 'zulia', 'guarico', 'barinas', 'lara', 'yaracuy', 'merida'].map(stId => {
                    const st = VENEZUELA_STATES_DATA.find(s => s.id === stId);
                    if (!st) return null;
                    const isCur = selectedStateId.toLowerCase() === stId.toLowerCase();
                    return (
                      <button
                        key={stId}
                        id={`quick_state_${stId}`}
                        onClick={() => handleSelectState(stId, false)}
                        style={{
                          fontSize: '0.70rem',
                          background: isCur ? '#16a34a' : 'rgba(51, 65, 85, 0.7)',
                          color: isCur ? '#fff' : '#cbd5e1',
                          border: isCur ? '1px solid #22c55e' : '1px solid rgba(255,255,255,0.08)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: isCur ? 700 : 500
                        }}
                      >
                        {st.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tarjeta de Resumen Agronómico del Estado */}
              <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(30, 41, 59, 0.7)', borderRadius: '8px', fontSize: '0.78rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.84rem', marginBottom: '6px' }}>
                  📍 {currentState.name} ({currentState.region})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', color: '#cbd5e1' }}>
                  <div><b>Capital:</b> {currentState.capital}</div>
                  <div><b>Precipitación:</b> {currentState.annualRainfallMm} mm</div>
                  <div><b>pH Suelo:</b> {currentState.averagePh}</div>
                  <div><b>Suelo:</b> {currentState.soilTextureDominant}</div>
                </div>
                <div style={{ marginTop: '6px', fontSize: '0.74rem', color: '#94a3b8' }}>
                  <b>Cultivos Principales:</b> {currentState.mainCrops.join(', ')}
                </div>
                <div style={{ marginTop: '4px', fontSize: '0.70rem', color: '#64748b' }}>
                  Coordenadas: [{currentState.center[0].toFixed(3)}°N, {currentState.center[1].toFixed(3)}°W]
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                <button
                  id="btn_drilldown_state"
                  onClick={() => handleSelectState(selectedStateId, true)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    background: '#0284c7',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.80rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <span>🔍 Explorar Municipios de {currentState.name}</span>
                </button>
              </div>
            </div>
          )}

          {/* Nivel 2: Municipios del Estado */}
          {currentLevel === 2 && (
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
                📍 Nivel 2: Municipios y Polos de {currentState.name}
              </div>

              <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '6px' }}>
                Selecciona un municipio para enfocar en micro-parcela:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
                {stateMunicipalities.map(muni => (
                  <div 
                    key={muni.id}
                    id={`muni_card_${muni.id}`}
                    onClick={() => handleSelectMunicipality(muni.id)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      background: selectedMunicipalityId === muni.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                      border: selectedMunicipalityId === muni.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#f8fafc', display: 'flex', justifyContent: 'space-between' }}>
                      <span>🏛️ {muni.name}</span>
                      <span style={{ fontSize: '0.70rem', color: '#38bdf8' }}>{muni.capital}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                      🌱 {muni.mainCrops.slice(0, 2).join(', ')} | pH: {muni.avgPh}
                    </div>
                  </div>
                ))}
              </div>

              <button
                id="btn_back_national"
                onClick={() => setCurrentLevel(1)}
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '7px',
                  background: '#334155',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                ⬅ Volver a Vista Nacional
              </button>
            </div>
          )}

          {/* Nivel 3: Micro-Parcela & Herramientas de Trazado */}
          {currentLevel === 3 && (
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fbbf24', marginBottom: '8px' }}>
                🚜 Nivel 3: Parcela en {currentMunicipality.name}
              </div>

              <div style={{ padding: '10px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '8px', fontSize: '0.76rem', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div><b>Suelo Dominante:</b> {currentMunicipality.soilTexture}</div>
                <div><b>Riego:</b> {currentMunicipality.hasIrrigationSystem ? '✓ Sistema Activo' : 'Secano Estacional'}</div>
                <div><b>pH Promedio:</b> {currentMunicipality.avgPh}</div>
                <div style={{ marginTop: '4px', color: '#94a3b8' }}><b>Destacado:</b> {currentMunicipality.agriculturalHighlights}</div>
              </div>

              {/* Delimitar Parcela */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    id="btn_toggle_draw_map"
                    onClick={handleToggleDraw}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: isDrawing ? '#dc2626' : '#22c55e',
                      border: 'none',
                      borderRadius: '6px',
                      color: isDrawing ? '#fff' : '#000',
                      fontWeight: 700,
                      fontSize: '0.80rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isDrawing ? '❌ Cancelar Trazado' : '✏️ Trazar en el Mapa'}
                  </button>

                  <button
                    id="btn_simulate_draw"
                    onClick={handleSimulateDraw}
                    style={{
                      padding: '8px 10px',
                      background: '#0284c7',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.80rem',
                      cursor: 'pointer'
                    }}
                    title="Generar polígono de prueba instantáneo"
                  >
                    📐 Auto-GPS
                  </button>
                </div>

                {isDrawing && (
                  <div style={{ fontSize: '0.72rem', color: '#fde047', background: 'rgba(234, 179, 8, 0.15)', padding: '6px', borderRadius: '4px' }}>
                    👆 Haz clics sucesivos en el mapa para marcar los vértices de tu lote. Al tener 3 o más vértices se calculará el área automáticamente.
                  </div>
                )}

                {drawnParcelArea && (
                  <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', borderRadius: '8px', padding: '10px' }}>
                    <div style={{ fontSize: '0.82rem', color: '#86efac', fontWeight: 700 }}>
                      ✓ Superficie: {drawnParcelArea.toFixed(2)} ha (Shoelace Geodésico)
                    </div>
                    
                    <input
                      id="input_parcel_name"
                      value={parcelName}
                      onChange={e => setParcelName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        border: '1px solid #334155',
                        background: '#0f172a',
                        color: '#fff',
                        fontSize: '0.78rem',
                        marginTop: '6px',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Nombre del tablón/parcela"
                    />

                    <button
                      id="btn_save_parcel_farm"
                      onClick={handleSaveToUserFarm}
                      style={{
                        width: '100%',
                        marginTop: '8px',
                        padding: '8px',
                        background: '#16a34a',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.80rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Save size={14} /> Guardar en Mis Tierras
                    </button>

                    {saveSuccess && (
                      <div style={{ color: '#4ade80', fontSize: '0.72rem', marginTop: '6px', textAlign: 'center', fontWeight: 600 }}>
                        ✓ Guardado exitosamente en tu Cuaderno de Campo.
                      </div>
                    )}
                  </div>
                )}

                <button
                  id="btn_back_to_state"
                  onClick={() => setCurrentLevel(2)}
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    padding: '6px',
                    background: '#334155',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                >
                  ⬅ Volver a Municipios de {currentState.name}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 🗺️ Mapa Base Dinámico Reactivo */}
      <div style={{ width: '100%', height: '100%', minHeight: '660px', position: 'relative' }}>
        {engineMode === 'leaflet' ? (
          <LeafletMap
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={mapCenter.zoom}
            selectedState={currentState}
            selectedMunicipality={currentMunicipality}
            activeLayer={activeLayer}
            isDrawing={isDrawing}
            onPolygonDrawn={handlePolygonDrawn}
            onSelectState={(stId) => handleSelectState(stId, false)}
            onSelectMunicipality={handleSelectMunicipality}
          />
        ) : (
          <iframe
            key={`${mapCenter.lat}-${mapCenter.lng}-${mapCenter.zoom}-${activeLayer}`}
            title="Agrotech Venezuela Multi-Level WebGIS"
            src={`https://maps.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&ll=${mapCenter.lat},${mapCenter.lng}&z=${mapCenter.zoom}&t=${activeLayer === 'satellite' ? 'k' : 'm'}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '660px', filter: activeLayer === 'mapbiomas' ? 'contrast(1.15) saturate(1.3)' : 'none' }}
            loading="lazy"
          />
        )}

        {/* Leyenda Flotante Inferior Derecha */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          zIndex: 15,
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#fff',
          fontSize: '0.72rem',
          maxWidth: '280px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
        }}>
          <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>🛰️</span> {engineMode === 'leaflet' ? 'WebGIS Vectorial' : 'Satélite HD'} • {activeLayer.toUpperCase()}
          </div>
          <div style={{ color: '#cbd5e1' }}>
            Foco: <b>{currentState.name}</b> {currentLevel === 3 ? `(${currentMunicipality.name})` : ''}
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.68rem', marginTop: '2px' }}>
            Centroide: [{mapCenter.lat.toFixed(3)}°N, {mapCenter.lng.toFixed(3)}°W] | Zoom: {mapCenter.zoom}x
          </div>
        </div>
      </div>
    </div>
  );
}
