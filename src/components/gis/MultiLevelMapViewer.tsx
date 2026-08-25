'use client';

import { useState, useMemo } from 'react';
import { VENEZUELA_STATES_DATA, StateGeoData, MAPBIOMAS_CLASSES, SOIL_PH_RANGES } from '@/lib/geo/venezuelaData';
import { VENEZUELA_MUNICIPALITIES_DATA, MunicipalityGeoData, getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { calculatePolygonAreaHa } from '@/lib/geo/spatialUtils';
import { useAuth } from '@/lib/auth/authContext';
import { 
  Layers, 
  MapPin, 
  Navigation, 
  Sparkles, 
  Maximize2, 
  Droplets, 
  FlaskConical, 
  Compass, 
  Save,
  CheckCircle2,
  ChevronRight,
  Eye,
  Info
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
  const { user } = useAuth();
  const [currentLevel, setCurrentLevel] = useState<MapLevel>(initialLevel);
  const [selectedStateId, setSelectedStateId] = useState<string>(initialStateId);
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<string>('turen');
  const [activeLayer, setActiveLayer] = useState<'satellite' | 'mapbiomas' | 'ph' | 'rainfall'>('mapbiomas');

  // Herramienta de delimitación de parcela
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnParcelArea, setDrawnParcelArea] = useState<number | null>(null);
  const [parcelName, setParcelName] = useState('Tablón Nuevo — Parcela 1');
  const [saveSuccess, setSaveSuccess] = useState(false);

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
  const handleSelectState = (stateId: string) => {
    setSelectedStateId(stateId);
    const munis = getMunicipalitiesByState(stateId);
    if (munis.length > 0) {
      setSelectedMunicipalityId(munis[0].id);
    }
    setCurrentLevel(2);
  };

  const handleSelectMunicipality = (muniId: string) => {
    setSelectedMunicipalityId(muniId);
    setCurrentLevel(3);
  };

  const handleSimulateDraw = () => {
    setIsDrawing(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setIsDrawing(false);
      // Coordenadas simuladas de tablón en el municipio actual
      const [lat, lng] = currentMunicipality.center;
      const coords: [number, number][] = [
        [lat - 0.003, lng - 0.003],
        [lat + 0.003, lng - 0.003],
        [lat + 0.003, lng + 0.003],
        [lat - 0.003, lng + 0.003],
      ];
      const area = calculatePolygonAreaHa(coords);
      setDrawnParcelArea(area > 0 ? area : 36.4);
    }, 600);
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

  // Coordenadas y Zoom según nivel
  const mapCenter = useMemo(() => {
    if (currentLevel === 1) return { lat: 8.0, lng: -66.0, zoom: 6 };
    if (currentLevel === 2) return { lat: currentState.center[0], lng: currentState.center[1], zoom: 9 };
    return { lat: currentMunicipality.center[0], lng: currentMunicipality.center[1], zoom: 14 };
  }, [currentLevel, currentState, currentMunicipality]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '620px', borderRadius: '16px', overflow: 'hidden', background: '#0b1329', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* 🧭 Barra Superior de Migas de Pan (Breadcrumb Navigation) */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: 14,
        right: 14,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '10px',
        padding: '8px 16px',
        color: '#fff',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
          <button 
            onClick={() => setCurrentLevel(1)}
            style={{
              background: currentLevel === 1 ? '#16a34a' : 'transparent',
              color: '#fff',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            🇻🇪 Venezuela (Nivel 1)
          </button>

          <ChevronRight size={14} color="#64748b" />

          <button 
            onClick={() => setCurrentLevel(2)}
            style={{
              background: currentLevel === 2 ? '#0284c7' : 'transparent',
              color: '#fff',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            📍 {currentState.name} (Nivel 2)
          </button>

          {currentLevel === 3 && (
            <>
              <ChevronRight size={14} color="#64748b" />
              <div style={{ background: '#d97706', padding: '4px 8px', borderRadius: '6px', fontWeight: 600 }}>
                🚜 {currentMunicipality.name} (Micro-Parcela)
              </div>
            </>
          )}
        </div>

        {/* Selector de Capas */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}><Layers size={14} style={{ display: 'inline', marginRight: 2 }} /> Capa:</span>
          <button 
            onClick={() => setActiveLayer('mapbiomas')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'mapbiomas' ? '#16a34a' : '#1e293b',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            MapBiomas 2024
          </button>
          <button 
            onClick={() => setActiveLayer('ph')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'ph' ? '#d97706' : '#1e293b',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Semáforo pH
          </button>
          <button 
            onClick={() => setActiveLayer('rainfall')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'rainfall' ? '#0284c7' : '#1e293b',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Lluvias NASA
          </button>
          <button 
            onClick={() => setActiveLayer('satellite')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'satellite' ? '#9333ea' : '#1e293b',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Sentinel-2 L2A
          </button>
        </div>
      </div>

      {/* 🗺️ Panel Lateral Flotante de Información Territorial */}
      <div style={{
        position: 'absolute',
        top: 75,
        left: 14,
        zIndex: 15,
        width: '320px',
        maxHeight: 'calc(100% - 90px)',
        overflowY: 'auto',
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '16px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Nivel 1: Selección de Estado */}
        {currentLevel === 1 && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80', marginBottom: '8px' }}>
              🇻🇪 Nivel 1: División Nacional (24 Estados)
            </div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Explorar Estado Agrícola:</label>
            <select
              value={selectedStateId}
              onChange={(e) => handleSelectState(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px',
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

            <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '8px', fontSize: '0.78rem' }}>
              <div><b>Capital:</b> {currentState.capital}</div>
              <div><b>Precipitación Anual:</b> {currentState.annualRainfallMm} mm/año</div>
              <div><b>pH Promedio:</b> {currentState.averagePh}</div>
              <div><b>Cultivos Clave:</b> {currentState.mainCrops.join(', ')}</div>
            </div>

            <button
              onClick={() => setCurrentLevel(2)}
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '8px',
                background: '#0284c7',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer'
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {stateMunicipalities.map(muni => (
                <div 
                  key={muni.id}
                  onClick={() => handleSelectMunicipality(muni.id)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: selectedMunicipalityId === muni.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                    border: selectedMunicipalityId === muni.id ? '1px solid #38bdf8' : '1px solid transparent',
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
                marginTop: '10px',
                padding: '6px',
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

            <div style={{ padding: '8px', background: 'rgba(30, 41, 59, 0.7)', borderRadius: '8px', fontSize: '0.76rem', marginBottom: '10px' }}>
              <div><b>Suelo Dominante:</b> {currentMunicipality.soilTexture}</div>
              <div><b>Riego:</b> {currentMunicipality.hasIrrigationSystem ? '✓ Sistema Activo' : 'Secano Estacional'}</div>
              <div><b>Destacado:</b> {currentMunicipality.agriculturalHighlights}</div>
            </div>

            {/* Delimitar Parcela */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={handleSimulateDraw}
                disabled={isDrawing}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: isDrawing ? '#d97706' : '#22c55e',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {isDrawing ? '📐 Trazando en Satélite...' : '📐 Delimitar Mi Parcela (GPS)'}
              </button>

              {drawnParcelArea && (
                <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#86efac', fontWeight: 600 }}>
                    ✓ Superficie: <b>{drawnParcelArea} ha</b> (Shoelace Geodésico)
                  </div>
                  
                  <input
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
                    onClick={handleSaveToUserFarm}
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
                    <Save size={14} /> Guardar en Mis Tierras
                  </button>

                  {saveSuccess && (
                    <div style={{ color: '#4ade80', fontSize: '0.72rem', marginTop: '6px', textAlign: 'center' }}>
                      ✓ Guardado exitosamente en tu Cuaderno de Campo.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🗺️ Mapa Base Dinámico con Transición Suave */}
      <div style={{ width: '100%', height: '100%', minHeight: '620px', position: 'relative' }}>
        <iframe
          key={`${mapCenter.lat}-${mapCenter.lng}-${mapCenter.zoom}`}
          title="Agrotech Venezuela Multi-Level WebGIS"
          src={`https://maps.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=${mapCenter.zoom}&t=${activeLayer === 'satellite' ? 'k' : 'm'}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '620px', filter: activeLayer === 'mapbiomas' ? 'contrast(1.15) saturate(1.3)' : 'none' }}
          loading="lazy"
        />

        {/* Leyenda Flotante Inferior Derecha */}
        <div style={{
          position: 'absolute',
          bottom: 14,
          right: 14,
          zIndex: 15,
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#fff',
          fontSize: '0.72rem',
          maxWidth: '260px'
        }}>
          <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: '4px' }}>
            🛰️ Capa Activa: {activeLayer.toUpperCase()}
          </div>
          <div style={{ color: '#94a3b8' }}>
            Nivel actual: <b>{currentLevel === 1 ? 'Nacional (Macro)' : currentLevel === 2 ? 'Estadal / Municipal' : 'Micro-Parcela Sentinel-2'}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
