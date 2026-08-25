'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { VENEZUELA_STATES_DATA, StateGeoData, MAPBIOMAS_CLASSES, SOIL_PH_RANGES } from '@/lib/geo/venezuelaData';
import { VENEZUELA_MUNICIPALITIES_DATA, MunicipalityGeoData, getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { calculatePolygonAreaHa, calculatePolygonPerimeterMeters } from '@/lib/geo/spatialUtils';
import { useAuth } from '@/lib/auth/authContext';
import { 
  Layers, 
  MapPin, 
  Navigation, 
  Sparkles, 
  Droplets, 
  FlaskConical, 
  Save, 
  ChevronRight, 
  RotateCcw,
  MousePointerClick,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import type { ActiveLayerType } from './LeafletMapInner';

// Importación dinámica de Leaflet con SSR deshabilitado para Next.js App Router
const LeafletMapInner = dynamic(() => import('./LeafletMapInner'), {
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
      gap: '12px',
      borderRadius: '16px'
    }}>
      <div style={{ fontSize: '2rem' }}>🛰️</div>
      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
        Iniciando Motor WebGIS Leaflet & Capas Satelitales de Venezuela...
      </div>
      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
        Resolución 10m Sentinel-2 / 30m MapBiomas
      </div>
    </div>
  )
});

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
  const { user } = useAuth();
  const [currentLevel, setCurrentLevel] = useState<MapLevel>(initialLevel);
  const [selectedStateId, setSelectedStateId] = useState<string>(initialStateId);
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<string>('turen');
  const [activeLayer, setActiveLayer] = useState<ActiveLayerType>('mapbiomas');

  // Herramienta interactiva de delimitación de parcela
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);
  const [parcelName, setParcelName] = useState('Tablón Nuevo — Parcela 1');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Estado seleccionado
  const currentState = useMemo(() => {
    return VENEZUELA_STATES_DATA.find(s => s.id === selectedStateId) || VENEZUELA_STATES_DATA[0];
  }, [selectedStateId]);

  // Municipios del estado seleccionado
  const stateMunicipalities = useMemo(() => {
    return getMunicipalitiesByState(selectedStateId);
  }, [selectedStateId]);

  // Municipio seleccionado
  const currentMunicipality = useMemo(() => {
    return VENEZUELA_MUNICIPALITIES_DATA.find(m => m.id === selectedMunicipalityId) || stateMunicipalities[0] || VENEZUELA_MUNICIPALITIES_DATA[0];
  }, [selectedMunicipalityId, stateMunicipalities]);

  // Navegación jerárquica
  const handleSelectState = useCallback((stateId: string) => {
    setSelectedStateId(stateId);
    const munis = getMunicipalitiesByState(stateId);
    if (munis.length > 0) {
      setSelectedMunicipalityId(munis[0].id);
    }
    setCurrentLevel(2);
  }, []);

  const handleSelectMunicipality = useCallback((muniId: string) => {
    setSelectedMunicipalityId(muniId);
    setCurrentLevel(3);
  }, []);

  // Agregar vértice en el mapa
  const handleAddPoint = useCallback((point: [number, number]) => {
    setDrawnPoints(prev => [...prev, point]);
    setSaveSuccess(false);
  }, []);

  // Limpiar trazado
  const handleClearDraw = () => {
    setDrawnPoints([]);
    setSaveSuccess(false);
    setIsDrawing(false);
  };

  // Trazado rápido predefinido sobre la parcela actual
  const handleAutoPresetDraw = () => {
    const [lat, lng] = currentMunicipality.center;
    const coords: [number, number][] = [
      [lat - 0.004, lng - 0.004],
      [lat + 0.004, lng - 0.004],
      [lat + 0.004, lng + 0.004],
      [lat - 0.004, lng + 0.004],
    ];
    setDrawnPoints(coords);
    setIsDrawing(false);
    setSaveSuccess(false);
  };

  // Cálculo del área y perímetro
  const calculatedAreaHa = useMemo(() => {
    return calculatePolygonAreaHa(drawnPoints);
  }, [drawnPoints]);

  const calculatedPerimeterM = useMemo(() => {
    return calculatePolygonPerimeterMeters(drawnPoints);
  }, [drawnPoints]);

  // Guardar en la base de datos
  const handleSaveToUserFarm = async () => {
    if (calculatedAreaHa <= 0) return;
    setIsSaving(true);
    const parcelPayload = {
      name: parcelName,
      stateId: selectedStateId,
      municipalityId: selectedMunicipalityId,
      areaHectares: calculatedAreaHa,
      centerLat: drawnPoints.length > 0 ? drawnPoints[0][0] : currentMunicipality.center[0],
      centerLng: drawnPoints.length > 0 ? drawnPoints[0][1] : currentMunicipality.center[1],
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
    } finally {
      setIsSaving(false);
    }
  };

  // Coordenadas y Zoom según nivel
  const mapCenter = useMemo(() => {
    if (currentLevel === 1) return { lat: 8.0, lng: -66.0, zoom: 6 };
    if (currentLevel === 2) return { lat: currentState.center[0], lng: currentState.center[1], zoom: 9 };
    return { lat: currentMunicipality.center[0], lng: currentMunicipality.center[1], zoom: 14 };
  }, [currentLevel, currentState, currentMunicipality]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '640px', borderRadius: '16px', overflow: 'hidden', background: '#0b1329', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* 🧭 Barra Superior de Migas de Pan (Breadcrumb Navigation & Capas) */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: 14,
        right: 14,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '10px',
        padding: '8px 16px',
        color: '#fff',
        flexWrap: 'wrap',
        gap: '8px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
          <button 
            id="btn_breadcrumb_national"
            onClick={() => setCurrentLevel(1)}
            style={{
              background: currentLevel === 1 ? '#16a34a' : 'transparent',
              color: '#fff',
              border: currentLevel === 1 ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.1)',
              padding: '4px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s'
            }}
          >
            🇻🇪 Venezuela (Nivel 1)
          </button>

          <ChevronRight size={14} color="#64748b" />

          <button 
            id="btn_breadcrumb_state"
            onClick={() => setCurrentLevel(2)}
            style={{
              background: currentLevel === 2 ? '#0284c7' : 'transparent',
              color: '#fff',
              border: currentLevel === 2 ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
              padding: '4px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            📍 {currentState.name} (Nivel 2)
          </button>

          {currentLevel === 3 && (
            <>
              <ChevronRight size={14} color="#64748b" />
              <div style={{ background: '#d97706', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, border: '1px solid #facc15' }}>
                🚜 {currentMunicipality.name} (Micro-Parcela)
              </div>
            </>
          )}
        </div>

        {/* Selector de Capas */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            <Layers size={14} style={{ display: 'inline', marginRight: 2 }} /> Capa:
          </span>
          <button 
            id="btn_layer_mapbiomas"
            onClick={() => setActiveLayer('mapbiomas')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'mapbiomas' ? '#16a34a' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'mapbiomas' ? 700 : 400
            }}
          >
            MapBiomas 2024
          </button>
          <button 
            id="btn_layer_sat"
            onClick={() => setActiveLayer('satellite')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
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
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'ph' ? '#d97706' : '#1e293b',
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
              padding: '4px 8px',
              fontSize: '0.75rem',
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
            id="btn_layer_dark"
            onClick={() => setActiveLayer('dark')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'dark' ? '#475569' : '#1e293b',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Modo Oscuro
          </button>
        </div>
      </div>

      {/* 🗺️ Panel Lateral Flotante de Información Territorial */}
      <div style={{
        position: 'absolute',
        top: 75,
        left: 14,
        zIndex: 999,
        width: '330px',
        maxHeight: 'calc(100% - 90px)',
        overflowY: 'auto',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '16px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Nivel 1: Selección de Estado */}
        {currentLevel === 1 && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80', marginBottom: '8px' }}>
              🇻🇪 Nivel 1: División Nacional (24 Estados)
            </div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Explorar Estado Agrícola:</label>
            <select
              id="select_state_level1"
              value={selectedStateId}
              onChange={(e) => handleSelectState(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#fff',
                fontSize: '0.82rem',
                marginTop: '4px'
              }}
            >
              {VENEZUELA_STATES_DATA.map(st => (
                <option key={st.id} value={st.id}>{st.name} — {st.region}</option>
              ))}
            </select>

            <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(30, 41, 59, 0.7)', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><b>Capital:</b> {currentState.capital}</div>
              <div><b>Precipitación Anual:</b> {currentState.annualRainfallMm} mm/año</div>
              <div><b>pH Promedio:</b> <span style={{ color: currentState.averagePh < 5.5 ? '#ef4444' : '#4ade80', fontWeight: 700 }}>{currentState.averagePh}</span></div>
              <div><b>Cultivos Clave:</b> {currentState.mainCrops.join(', ')}</div>
              <div><b>Suelo Dominante:</b> {currentState.soilTextureDominant}</div>
            </div>

            <button
              id="btn_see_municipalities"
              onClick={() => setCurrentLevel(2)}
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '9px',
                background: '#0284c7',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              🔍 Ver Municipios de {currentState.name}
            </button>
          </div>
        )}

        {/* Nivel 2: Selección de Municipio */}
        {currentLevel === 2 && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
              📍 Nivel 2: Municipios de {currentState.name}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
              {stateMunicipalities.map(muni => (
                <div 
                  key={muni.id}
                  onClick={() => handleSelectMunicipality(muni.id)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: selectedMunicipalityId === muni.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                    border: selectedMunicipalityId === muni.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#f8fafc' }}>
                    🏛️ {muni.name} ({muni.capital})
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                    🌱 {muni.mainCrops.slice(0, 2).join(', ')} | pH: {muni.avgPh}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentLevel(1)}
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '7px',
                background: '#334155',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              ⬅ Volver a Vista Nacional
            </button>
          </div>
        )}

        {/* Nivel 3: Micro-Parcela & Herramientas de Trazado */}
        {currentLevel === 3 && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', marginBottom: '8px' }}>
              🚜 Nivel 3: Parcela en {currentMunicipality.name}
            </div>

            <div style={{ padding: '10px', background: 'rgba(30, 41, 59, 0.7)', borderRadius: '8px', fontSize: '0.76rem', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><b>Suelo Dominante:</b> {currentMunicipality.soilTexture}</div>
              <div><b>pH Edafológico:</b> {currentMunicipality.avgPh}</div>
              <div><b>Riego:</b> {currentMunicipality.hasIrrigationSystem ? '✓ Sistema Activo' : 'Secano Estacional'}</div>
              <div><b>Destacado:</b> {currentMunicipality.agriculturalHighlights}</div>
            </div>

            {/* Delimitar Parcela con Clics Reales */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  id="btn_draw_toggle"
                  onClick={() => setIsDrawing(!isDrawing)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: isDrawing ? '#ef4444' : '#22c55e',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <MousePointerClick size={14} />
                  {isDrawing ? 'Finalizar Clics' : '📐 Trazar con Clics'}
                </button>

                <button
                  id="btn_draw_preset"
                  onClick={handleAutoPresetDraw}
                  style={{
                    padding: '8px',
                    background: '#0284c7',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                  title="Generar polígono de ejemplo en esta coordenada"
                >
                  Tablón Auto
                </button>

                {drawnPoints.length > 0 && (
                  <button
                    id="btn_draw_clear"
                    onClick={handleClearDraw}
                    style={{
                      padding: '8px',
                      background: '#475569',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                    title="Borrar trazado"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {isDrawing && (
                <div style={{ padding: '6px 8px', background: 'rgba(234, 179, 8, 0.15)', border: '1px solid #eab308', borderRadius: '6px', fontSize: '0.72rem', color: '#fef08a' }}>
                  👆 <b>Modo Dibujo Activo:</b> Haz clic en el mapa satelital para colocar vértices de tu finca ({drawnPoints.length} marcados).
                </div>
              )}

              {drawnPoints.length >= 3 && (
                <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '0.82rem', color: '#86efac', fontWeight: 700 }}>
                    ✓ Superficie: <b>{calculatedAreaHa} ha</b>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                    Perímetro: {calculatedPerimeterM} m | Shoelace WGS84
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
                      marginTop: '8px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Nombre del tablón/parcela"
                  />

                  <button
                    id="btn_save_parcel"
                    onClick={handleSaveToUserFarm}
                    disabled={isSaving}
                    style={{
                      width: '100%',
                      marginTop: '8px',
                      padding: '8px',
                      background: '#16a34a',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Save size={14} /> {isSaving ? 'Guardando...' : 'Guardar en Mis Tierras'}
                  </button>

                  {saveSuccess && (
                    <div style={{ color: '#4ade80', fontSize: '0.74rem', marginTop: '6px', textAlign: 'center', fontWeight: 600 }}>
                      ✓ Guardado exitosamente en tu Cuaderno de Campo.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🗺️ Visor Leaflet Dinámico */}
      <div style={{ width: '100%', height: '100%', minHeight: '640px' }}>
        <LeafletMapInner
          currentLevel={currentLevel}
          selectedStateId={selectedStateId}
          selectedMunicipalityId={selectedMunicipalityId}
          activeLayer={activeLayer}
          mapCenter={mapCenter}
          isDrawing={isDrawing}
          drawnPoints={drawnPoints}
          onAddPoint={handleAddPoint}
          onSelectState={handleSelectState}
          onSelectMunicipality={handleSelectMunicipality}
          showSoilPoints={true}
        />
      </div>
    </div>
  );
}
