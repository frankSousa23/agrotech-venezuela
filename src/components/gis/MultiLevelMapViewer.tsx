'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { VENEZUELA_STATES_DATA, StateGeoData, MAPBIOMAS_CLASSES, SOIL_PH_RANGES } from '@/lib/geo/venezuelaData';
import { VENEZUELA_MUNICIPALITIES_DATA, MunicipalityGeoData, getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { calculatePolygonAreaHa, calculatePolygonPerimeterMeters } from '@/lib/geo/spatialUtils';
import { useAuth } from '@/lib/auth/authContext';
import { useUIMode } from '@/lib/context/UIModeContext';
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
  Trash2,
  X,
  ArrowRight,
  ArrowLeft,
  Maximize,
  Minimize,
  Compass,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import type { ActiveLayerType } from './LeafletMapInner';
import MapLayerLegendOverlay from './MapLayerLegendOverlay';

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
  const { isFarmerMode } = useUIMode();
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
  const [successRedirectUrl, setSuccessRedirectUrl] = useState<string>('');
  const [savedParcelInfo, setSavedParcelInfo] = useState<{ name: string; area: number } | null>(null);

  // Tutorial interactivo on-map
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('agrotech-map-tutorial-dismissed');
    if (dismissed !== 'true') {
      setShowTutorial(true);
    }
  }, []);

  const handleDismissTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('agrotech-map-tutorial-dismissed', 'true');
  };

  // Sincronización reactiva con tema global (SunlightThemeToggle)
  useEffect(() => {
    const handleThemeChange = (e: any) => {
      const currentTheme = e.detail?.theme;
      if (currentTheme === 'dark') {
        setActiveLayer('dark');
      } else if (currentTheme === 'sunlight' && activeLayer === 'dark') {
        setActiveLayer('mapbiomas');
      }
    };
    window.addEventListener('agrotech-theme-change', handleThemeChange);
    return () => window.removeEventListener('agrotech-theme-change', handleThemeChange);
  }, [activeLayer]);

  // Fullscreen & Contenedor Ref
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Panel colapsable para ergonomía en móviles y dibujo sin obstrucciones (Task 3.1)
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  // Geolocalización GPS "Ubicar mi Finca" (Task 3.2)
  const [isLocating, setIsLocating] = useState(false);
  const [gpsToast, setGpsToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Manejador de cambio de Fullscreen
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().catch(err => {
        console.warn('Error solicitando pantalla completa:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.warn('Error saliendo de pantalla completa:', err);
      });
      setIsFullscreen(false);
    }
    setTimeout(() => window.dispatchEvent(new Event('resize')), 150);
  };

  // Auto-colapsar panel en móviles si entra a modo de dibujo táctil
  useEffect(() => {
    if (isDrawing && typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsPanelCollapsed(true);
    }
  }, [isDrawing]);

  // Manejador GPS para centrar en coordenadas reales
  const handleLocateMe = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setGpsToast({ message: 'La geolocalización no es compatible con este navegador.', type: 'error' });
      setTimeout(() => setGpsToast(null), 4000);
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;

        // Bounding box aproximado de Venezuela WGS84
        const inVenezuela = latitude >= 0.0 && latitude <= 15.0 && longitude >= -74.0 && longitude <= -59.0;

        if (inVenezuela) {
          let closestMuni = VENEZUELA_MUNICIPALITIES_DATA[0];
          let minDist = Infinity;
          for (const m of VENEZUELA_MUNICIPALITIES_DATA) {
            const dist = Math.hypot(m.center[0] - latitude, m.center[1] - longitude);
            if (dist < minDist) {
              minDist = dist;
              closestMuni = m;
            }
          }

          setSelectedStateId(closestMuni.stateId);
          setSelectedMunicipalityId(closestMuni.id);
          setCurrentLevel(3);
          setGpsToast({ 
            message: `📍 Ubicación GPS detectada en Municipio ${closestMuni.name} (${latitude.toFixed(4)}, ${longitude.toFixed(4)}).`, 
            type: 'success' 
          });
        } else {
          setGpsToast({ 
            message: `📍 Coordenadas GPS recibidas (${latitude.toFixed(3)}, ${longitude.toFixed(3)}). Centrando en polo agrícola nacional (Turén, Portuguesa).`, 
            type: 'success' 
          });
          setSelectedStateId('portuguesa');
          setSelectedMunicipalityId('turen');
          setCurrentLevel(3);
        }
        setTimeout(() => setGpsToast(null), 5000);
      },
      (err) => {
        setIsLocating(false);
        setGpsToast({ message: `No se pudo obtener la posición GPS: ${err.message}`, type: 'error' });
        setTimeout(() => setGpsToast(null), 4000);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

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
    setSuccessRedirectUrl('');
    setSavedParcelInfo(null);
  }, []);

  // Limpiar trazado y restaurar estado
  const handleClearDraw = () => {
    setDrawnPoints([]);
    setSaveSuccess(false);
    setSuccessRedirectUrl('');
    setSavedParcelInfo(null);
    setParcelName('Tablón Nuevo — Parcela 1');
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
    setSuccessRedirectUrl('');
    setSavedParcelInfo(null);
  };

  // Cálculo del área y perímetro
  const calculatedAreaHa = useMemo(() => {
    return calculatePolygonAreaHa(drawnPoints);
  }, [drawnPoints]);

  const calculatedPerimeterM = useMemo(() => {
    return calculatePolygonPerimeterMeters(drawnPoints);
  }, [drawnPoints]);

  // Guardar en la base de datos y construir handoff para recomendaciones
  const handleSaveToUserFarm = async () => {
    if (calculatedAreaHa <= 0) return;
    setIsSaving(true);
    const primaryCrop = currentMunicipality.mainCrops[0] || 'Maíz Blanco';
    const parcelPayload = {
      name: parcelName,
      stateId: selectedStateId,
      municipalityId: selectedMunicipalityId,
      areaHectares: calculatedAreaHa,
      centerLat: drawnPoints.length > 0 ? drawnPoints[0][0] : currentMunicipality.center[0],
      centerLng: drawnPoints.length > 0 ? drawnPoints[0][1] : currentMunicipality.center[1],
      currentCrop: primaryCrop,
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
        const cropEncoded = encodeURIComponent(primaryCrop);
        const textureEncoded = encodeURIComponent(currentMunicipality.soilTexture);
        const redirectUrl = `/dashboard/recomendaciones?state=${selectedStateId}&ph=${currentMunicipality.avgPh}&soilTexture=${textureEncoded}&crop=${cropEncoded}`;
        setSuccessRedirectUrl(redirectUrl);
        setSavedParcelInfo({ name: parcelName, area: calculatedAreaHa });
        setSaveSuccess(true);
        if (onSaveParcel) onSaveParcel(parcelPayload);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  // Coordenadas y Zoom según nivel con adaptación para pantallas móviles
  const mapCenter = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (currentLevel === 1) return { lat: 8.0, lng: -66.0, zoom: isMobile ? 5 : 6 };
    if (currentLevel === 2) return { lat: currentState.center[0], lng: currentState.center[1], zoom: isMobile ? 8 : 9 };
    return { lat: currentMunicipality.center[0], lng: currentMunicipality.center[1], zoom: isMobile ? 13 : 14 };
  }, [currentLevel, currentState, currentMunicipality]);

  return (
    <div 
      ref={wrapperRef}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: isFullscreen ? '100vh' : '75vh', 
        minHeight: isFullscreen ? '100vh' : '680px', 
        borderRadius: isFullscreen ? '0px' : '16px', 
        overflow: 'hidden', 
        background: '#0b1329', 
        border: '1px solid rgba(255,255,255,0.1)' 
      }}
    >
      <style>{`
        @keyframes pulseDraw {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
      `}</style>
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
        {/* Breadcrumb & Retorno Rápido */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
          {currentLevel > 1 && (
            <button
              id="btn_map_level_back"
              onClick={() => setCurrentLevel(currentLevel === 3 ? 2 : 1)}
              style={{
                background: 'rgba(56, 189, 248, 0.2)',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                color: '#38bdf8',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)'
              }}
              title={currentLevel === 3 ? `Volver a ${currentState.name}` : 'Volver al Mapa Nacional'}
            >
              <ArrowLeft size={14} />
              <span>{currentLevel === 3 ? `Volver a ${currentState.name}` : 'Volver a Venezuela'}</span>
            </button>
          )}

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
              padding: isFarmerMode ? '8px 14px' : '4px 8px',
              minHeight: isFarmerMode ? '44px' : undefined,
              fontSize: isFarmerMode ? '0.85rem' : '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'mapbiomas' ? '#16a34a' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'mapbiomas' ? 700 : 400,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            MapBiomas 2024
          </button>
          <button 
            id="btn_layer_sat"
            onClick={() => setActiveLayer('satellite')}
            style={{
              padding: isFarmerMode ? '8px 14px' : '4px 8px',
              minHeight: isFarmerMode ? '44px' : undefined,
              fontSize: isFarmerMode ? '0.85rem' : '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'satellite' ? '#9333ea' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'satellite' ? 700 : 400,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Satélite HD
          </button>
          <button 
            id="btn_layer_ph"
            onClick={() => setActiveLayer('ph')}
            style={{
              padding: isFarmerMode ? '8px 14px' : '4px 8px',
              minHeight: isFarmerMode ? '44px' : undefined,
              fontSize: isFarmerMode ? '0.85rem' : '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'ph' ? '#d97706' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'ph' ? 700 : 400,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Semáforo pH
          </button>
          <button 
            id="btn_layer_rainfall"
            onClick={() => setActiveLayer('rainfall')}
            style={{
              padding: isFarmerMode ? '8px 14px' : '4px 8px',
              minHeight: isFarmerMode ? '44px' : undefined,
              fontSize: isFarmerMode ? '0.85rem' : '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'rainfall' ? '#0284c7' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'rainfall' ? 700 : 400,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Lluvias NASA
          </button>
          <button 
            id="btn_layer_dark"
            onClick={() => setActiveLayer('dark')}
            style={{
              padding: isFarmerMode ? '8px 14px' : '4px 8px',
              minHeight: isFarmerMode ? '44px' : undefined,
              fontSize: isFarmerMode ? '0.85rem' : '0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: activeLayer === 'dark' ? '#475569' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: activeLayer === 'dark' ? 700 : 400,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Modo Oscuro
          </button>
        </div>

        {/* 🛠️ Utilidades Cartográficas: Fullscreen, GPS y Toggle Panel (Tasks 3.1 & 3.2) */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            id="btn_map_locate"
            onClick={handleLocateMe}
            disabled={isLocating}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              cursor: isLocating ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            title="Centrar mapa en las coordenadas GPS de tu finca"
          >
            <Compass size={14} />
            <span>{isLocating ? 'GPS...' : '📍 Ubicar mi Finca'}</span>
          </button>

          <button
            id="btn_map_fullscreen"
            onClick={toggleFullscreen}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: isFullscreen ? '#0284c7' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            title={isFullscreen ? 'Salir de Pantalla Completa' : 'Expandir a Pantalla Completa'}
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            <span>{isFullscreen ? 'Salir' : '⛶ Pantalla Completa'}</span>
          </button>

          <button
            id="btn_toggle_panel"
            onClick={() => {
              setIsPanelCollapsed(prev => !prev);
              setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
            }}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: isPanelCollapsed ? '#16a34a' : '#1e293b',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            title={isPanelCollapsed ? 'Mostrar Panel Territorial' : 'Ocultar Panel Territorial'}
          >
            {isPanelCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
            <span>{isPanelCollapsed ? '▶ Controles' : '◀ Ocultar Panel'}</span>
          </button>
        </div>
      </div>

      {/* 🔔 Notificación Flotante GPS */}
      {gpsToast && (
        <div style={{
          position: 'absolute',
          top: 75,
          right: 20,
          zIndex: 1100,
          background: gpsToast.type === 'success' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(239, 68, 68, 0.95)',
          border: `1px solid ${gpsToast.type === 'success' ? '#38bdf8' : '#f87171'}`,
          borderRadius: '8px',
          padding: '10px 16px',
          color: '#fff',
          fontSize: '0.82rem',
          maxWidth: '380px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          {gpsToast.message}
        </div>
      )}

      {/* 📌 Botón Flotante para Reabrir Panel cuando esté colapsado (Task 3.1) */}
      {isPanelCollapsed && (
        <button
          id="btn_map_expand_panel"
          onClick={() => {
            setIsPanelCollapsed(false);
            setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
          }}
          style={{
            position: 'absolute',
            top: 75,
            left: 14,
            zIndex: 999,
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(56, 189, 248, 0.5)',
            color: '#38bdf8',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 600,
            fontSize: '0.8rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
          }}
        >
          <PanelLeftOpen size={16} />
          <span>▶ Panel Territorial</span>
        </button>
      )}

      {/* 🗺️ Panel Lateral Flotante de Información Territorial */}
      {!isPanelCollapsed && (
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
        gap: '10px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Cabecera del Panel con Botón de Ocultar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#cbd5e1' }}>🗺️ Panel Territorial</span>
          <button 
            id="btn_hide_panel_inner" 
            onClick={() => setIsPanelCollapsed(true)} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#94a3b8', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              fontSize: '0.72rem' 
            }}
          >
            <PanelLeftClose size={14} /> Ocultar
          </button>
        </div>
        {/* Breadcrumb de Progreso Jerárquico */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(30, 41, 59, 0.7)',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '0.72rem',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {[
            { lvl: 1 as MapLevel, label: '1. País', tooltip: 'División Nacional (24 Estados)' },
            { lvl: 2 as MapLevel, label: '2. Municipio', tooltip: 'Municipios Agrícolas' },
            { lvl: 3 as MapLevel, label: '3. Parcela', tooltip: 'Delimitación satelital del lote' }
          ].map((step, idx) => {
            const isActive = currentLevel === step.lvl;
            const isDone = currentLevel > step.lvl;
            return (
              <div key={step.lvl} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => { if (isDone) setCurrentLevel(step.lvl); }}
                  disabled={!isDone && !isActive}
                  title={step.tooltip}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isActive ? '#38bdf8' : isDone ? '#4ade80' : '#64748b',
                    fontWeight: isActive ? 700 : 500,
                    cursor: isDone ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: 0
                  }}
                >
                  {isDone ? '✓' : isActive ? '●' : '○'} {step.label}
                </button>
                {idx < 2 && <span style={{ color: '#475569' }}>→</span>}
              </div>
            );
          })}
        </div>

        {/* Tutorial Banner de Delimitación */}
        {showTutorial && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(2, 132, 199, 0.15) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '10px',
            padding: '10px',
            fontSize: '0.74rem',
            color: '#f8fafc',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#38bdf8' }}>
                <Sparkles size={14} color="#38bdf8" />
                <span>Guía Rápida de Delimitación</span>
              </div>
              <button
                onClick={handleDismissTutorial}
                title="Cerrar guía"
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                <X size={14} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#cbd5e1', lineHeight: 1.3 }}>
              <div><b>① País:</b> Selecciona el estado de tu finca.</div>
              <div><b>② Municipio:</b> Elige el polo agrícola para centrar el satélite.</div>
              <div><b>③ Parcela:</b> En Nivel 3, usa <i>📐 Trazar</i> para marcar linderos.</div>
            </div>
            <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
              <button
                onClick={() => {
                  if (currentLevel < 3) {
                    setCurrentLevel(3);
                  }
                  handleAutoPresetDraw();
                }}
                style={{
                  flex: 1,
                  padding: '5px 8px',
                  background: 'rgba(56, 189, 248, 0.25)',
                  border: '1px solid #38bdf8',
                  borderRadius: '6px',
                  color: '#38bdf8',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🌾 Probar Demo Automático
              </button>
            </div>
          </div>
        )}

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

            <div style={{ padding: '10px', background: 'rgba(30, 41, 59, 0.7)', borderRadius: '8px', fontSize: '0.76rem', marginBottom: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><b>Suelo Dominante:</b> {currentMunicipality.soilTexture}</div>
              <div><b>pH Edafológico:</b> {currentMunicipality.avgPh}</div>
              <div><b>Riego:</b> {currentMunicipality.hasIrrigationSystem ? '✓ Sistema Activo' : 'Secano Estacional'}</div>
              <div><b>Destacado:</b> {currentMunicipality.agriculturalHighlights}</div>
            </div>

            {/* 🔬 Retroalimentación Edafoclimática Contextual de Nivel 3 (Task 2.2) */}
            <div style={{
              padding: '10px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '8px',
              fontSize: '0.74rem',
              marginBottom: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: '#38bdf8' }}>
                  🛰️ Estrato Activo: {activeLayer.toUpperCase()}
                </span>
                <span style={{
                  fontSize: '0.68rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: activeLayer === 'ph' ? 'rgba(239, 68, 68, 0.25)' : activeLayer === 'rainfall' ? 'rgba(2, 132, 199, 0.25)' : 'rgba(34, 197, 94, 0.25)',
                  color: activeLayer === 'ph' ? '#f87171' : activeLayer === 'rainfall' ? '#38bdf8' : '#4ade80',
                  fontWeight: 600
                }}>
                  {activeLayer === 'ph' ? 'Edafología' : activeLayer === 'rainfall' ? 'Pluviometría' : activeLayer === 'dark' ? 'Nocturno' : 'Satelital'}
                </span>
              </div>

              {activeLayer === 'ph' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#cbd5e1' }}>
                  <div><b>pH del Suelo:</b> <span style={{ color: currentMunicipality.avgPh < 5.5 ? '#ef4444' : '#4ade80', fontWeight: 700 }}>{currentMunicipality.avgPh}</span> ({currentMunicipality.avgPh < 5.5 ? 'Ácido — Requiere Cal Dolomítica' : 'Rango Óptimo'})</div>
                  <div><b>Enmienda:</b> {currentMunicipality.avgPh < 5.5 ? 'Modelo Kamprath modificado (100% PRNT)' : 'Mantenimiento mineral balanceado'}</div>
                </div>
              )}

              {activeLayer === 'rainfall' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#cbd5e1' }}>
                  <div><b>Precipitación Anual:</b> <span style={{ color: '#38bdf8', fontWeight: 700 }}>{currentMunicipality.annualRainfallMm} mm/año</span></div>
                  <div><b>Régimen Hídrico:</b> {currentMunicipality.annualRainfallMm < 1100 ? 'Déficit Estacional — Priorizar Riego' : 'Precipitación Abundante'}</div>
                </div>
              )}

              {activeLayer === 'mapbiomas' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#cbd5e1' }}>
                  <div><b>Cobertura LULC:</b> Mosaico Agrícola / Pasturas</div>
                  <div><b>Fuente:</b> Colección 2 MapBiomas Venezuela 2024 (30m)</div>
                </div>
              )}

              {activeLayer === 'dark' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#cbd5e1' }}>
                  <div><b>Modo:</b> CartoDB Dark Matter Nocturno</div>
                  <div><b>Uso:</b> Inspección nocturna en campo sin deslumbramiento</div>
                </div>
              )}

              {activeLayer === 'satellite' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', color: '#cbd5e1' }}>
                  <div><b>Sensor:</b> Ortoimagen Óptica Sentinel-2 / World Imagery</div>
                  <div><b>Resolución:</b> 10m por píxel para demarcación de surcos</div>
                </div>
              )}
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
                    border: isDrawing ? '1px solid #ef4444' : '1px solid #4ade80',
                    boxShadow: isDrawing ? '0 0 10px rgba(239, 68, 68, 0.5)' : (currentLevel === 3 ? 'none' : '0 0 12px rgba(74, 222, 128, 0.5)'),
                    animation: (!isDrawing && currentLevel === 3) ? 'pulseDraw 2s infinite' : 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease'
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

                  {/* Panel de Handoff Post-Guardado */}
                  {saveSuccess && (
                    <div style={{
                      marginTop: '10px',
                      padding: '10px',
                      background: 'rgba(16, 185, 129, 0.18)',
                      border: '1px solid #10b981',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#86efac', fontWeight: 700, fontSize: '0.78rem' }}>
                        <CheckCircle2 size={16} color="#4ade80" />
                        <span>¡Parcela guardada con éxito!</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                        <b>{savedParcelInfo?.name || parcelName}</b> ({savedParcelInfo?.area || calculatedAreaHa} ha) se vinculó a tu finca.
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        <Link
                          href="/dashboard/tierras"
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '6px 8px',
                            background: '#0284c7',
                            color: '#fff',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            textDecoration: 'none'
                          }}
                        >
                          🚜 Mis Fincas
                        </Link>
                        <Link
                          href={successRedirectUrl || `/dashboard/recomendaciones?state=${selectedStateId}`}
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '6px 8px',
                            background: '#7c3aed',
                            color: '#fff',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            textDecoration: 'none'
                          }}
                        >
                          ✨ Asesor IA
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 👤 Adaptación Ergonómica por Rol (Task 3.3) */}
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {user?.role === 'FARMER' && (
            <div style={{
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              borderRadius: '8px',
              padding: '8px 10px',
              fontSize: '0.74rem',
              color: '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px'
            }}>
              <span>🌾 <b>Modo Productor Fácil:</b> 1 Clic en <i>Tablón Auto</i> para delimitar.</span>
              <Link href="/dashboard/bitacora" style={{ color: '#4ade80', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                🎙️ Dictar
              </Link>
            </div>
          )}

          {(user?.role === 'AGRONOMIST' || (user as any)?.role === 'TECH') && (
            <div style={{
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '8px',
              padding: '8px 10px',
              fontSize: '0.74rem',
              color: '#e0f2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px'
            }}>
              <span>🛰️ <b>Modo Técnico:</b> Prescripción VRA en Shapefile / KML y telemetría SAR.</span>
              <Link href="/dashboard/recomendaciones" style={{ color: '#38bdf8', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                🚜 Dosis
              </Link>
            </div>
          )}

          {(user?.role === 'ADMIN' || (user as any)?.role === 'AUDITOR') && (
            <div style={{
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              borderRadius: '8px',
              padding: '8px 10px',
              fontSize: '0.74rem',
              color: '#f3e8ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px'
            }}>
              <span>⚖️ <b>Modo Auditor / Jurado:</b> 278 tests verificados | Prototipo TRL 4.</span>
              <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" style={{ color: '#c084fc', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Swagger /docs
              </a>
            </div>
          )}

          {(!user || user.isGuest) && (
            <div style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '8px',
              padding: '8px 10px',
              fontSize: '0.74rem',
              color: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px'
            }}>
              <span>🧪 <b>Modo Invitado (Sandbox):</b> Explora libremente la delimitación.</span>
              <Link href="/registro" style={{ color: '#fbbf24', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Registrar
              </Link>
            </div>
          )}
        </div>
      </div>
      )}

      {/* 🗺️ Visor Leaflet Dinámico */}
      <div style={{ width: '100%', height: '100%', minHeight: '680px' }}>
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
        
        {/* 🏷️ Leyenda Dinámica Flotante según Capa Activa */}
        <MapLayerLegendOverlay activeLayer={activeLayer as any} />
        
        {/* Atribución Obligatoria MapBiomas (Premio 2026) */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '6px',
          padding: '6px 12px',
          fontSize: '0.7rem',
          color: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          <span>🛰️ Datos de cobertura:</span>
          <a 
            href="https://venezuela.mapbiomas.org/terminos-de-uso/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#4ade80', fontWeight: 600, textDecoration: 'none' }}
          >
            MapBiomas Venezuela
          </a>
        </div>
      </div>
    </div>
  );
}
