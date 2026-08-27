/**
 * ============================================================================
 * AGROTECH VENEZUELA — VISOR ESTATAL LEAFLET (VenezuelaStateMapInner.tsx)
 * ============================================================================
 * 
 * Componente cliente dedicado para la exploración territorial de Venezuela:
 * - Renderiza los 24 estados federales con polígonos vectoriales GeoJSON.
 * - Soporte para capas temáticas: División Territorial, Satélite Esri HD,
 *   Semáforo de pH del suelo, Precipitación NASA y Cobertura MapBiomas.
 * - Animación cinemática fluida (flyTo) al seleccionar cualquier estado.
 * - Tooltips interactivos con nombres y capitales estadales.
 */

'use client';

import React, { useEffect, useMemo } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Polygon, 
  Tooltip, 
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import { VENEZUELA_STATES_DATA, StateGeoData } from '@/lib/geo/venezuelaData';
import MapResizeSynchronizer from './MapResizeSynchronizer';
import MapLayerLegendOverlay from './MapLayerLegendOverlay';

export type ActiveMapLayer = 'thematic' | 'satellite' | 'ph' | 'rainfall' | 'mapbiomas' | 'sar' | 'dark';

interface VenezuelaStateMapInnerProps {
  selectedStateId: string;
  activeLayer: ActiveMapLayer;
  onSelectState: (stateId: string) => void;
}

// Controlador de cámara de Leaflet para animación flyTo
function MapCameraController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.1,
      easeLinearity: 0.25
    });
  }, [center, zoom, map]);
  return null;
}

// Función auxiliar para calcular colores según la capa activa
function getStatePolygonStyle(
  state: StateGeoData, 
  isSelected: boolean, 
  activeLayer: ActiveMapLayer
): L.PathOptions {
  const ph = state.averagePh || 6.2;
  const rain = state.annualRainfallMm || 1200;
  const cover = state.mapbiomasCoverPercentage || { agriculture: 25, forest: 40 };

  let fillColor = '#16a34a'; // default verde

  if (activeLayer === 'thematic') {
    // Color por Región Agroecológica
    switch (state.region) {
      case 'Llanos': fillColor = '#d97706'; break;       // Ámbar
      case 'Andes': fillColor = '#059669'; break;        // Esmeralda
      case 'Zulia': fillColor = '#0284c7'; break;        // Azul
      case 'Guayana': fillColor = '#15803d'; break;      // Verde Bosque
      case 'Centro-Occidente': fillColor = '#ca8a04'; break; // Amarillo
      case 'Centro': fillColor = '#9333ea'; break;       // Púrpura
      case 'Oriente': fillColor = '#ea580c'; break;      // Naranja
      default: fillColor = '#2563eb';
    }
  } else if (activeLayer === 'ph') {
    // Semáforo de Acidez Edafológica
    if (ph < 5.2) fillColor = '#ef4444';      // Muy Ácido (Rojo)
    else if (ph < 6.0) fillColor = '#f97316'; // Moderadamente Ácido (Naranja)
    else if (ph <= 7.2) fillColor = '#10b981'; // Óptimo (Verde)
    else fillColor = '#0284c7';                // Alcalino / Calcáreo (Azul)
  } else if (activeLayer === 'rainfall') {
    // Precipitación Anual NASA POWER
    if (rain < 800) fillColor = '#fed7aa';     // Árido / Semiárido
    else if (rain < 1400) fillColor = '#38bdf8'; // Húmedo
    else if (rain < 2000) fillColor = '#0284c7'; // Muy Húmedo
    else fillColor = '#1e40af';                 // Pluvial / Selva
  } else if (activeLayer === 'mapbiomas') {
    // Vocación Agrícola vs Bosques MapBiomas
    if (cover.agriculture > 35) fillColor = '#d946ef'; // Agrícola Intenso
    else if (cover.forest > 60) fillColor = '#047857';  // Forestal
    else fillColor = '#eab308';                         // Pastizales / Mosaicos
  } else if (activeLayer === 'sar') {
    // Radar Sentinel-1 SAR: Saturación de humedad libre de nubes
    if (rain > 1800) fillColor = '#3b82f6';     // Alta humedad / Anegamiento
    else if (rain > 1100) fillColor = '#06b6d4'; // Humedad óptima
    else fillColor = '#cbd5e1';                 // Suelo seco / alta rugosidad
  } else if (activeLayer === 'satellite' || activeLayer === 'dark') {
    fillColor = isSelected ? '#22c55e' : '#38bdf8';
  }

  return {
    fillColor,
    fillOpacity: isSelected ? 0.65 : (activeLayer === 'satellite' ? 0.25 : 0.45),
    color: isSelected ? '#facc15' : '#ffffff',
    weight: isSelected ? 3.5 : 1.5,
    opacity: 0.95,
    dashArray: isSelected ? '' : '3',
  };
}

export default function VenezuelaStateMapInner({
  selectedStateId,
  activeLayer,
  onSelectState
}: VenezuelaStateMapInnerProps) {
  const selectedState = useMemo(() => {
    return VENEZUELA_STATES_DATA.find(s => s.id === selectedStateId) || VENEZUELA_STATES_DATA[0];
  }, [selectedStateId]);

  // Centro y zoom enfocado
  const mapCenter = useMemo<[number, number]>(() => {
    if (!selectedStateId || selectedStateId === 'all') {
      return [7.85, -66.0];
    }
    return [selectedState.center[0], selectedState.center[1]];
  }, [selectedStateId, selectedState]);

  const mapZoom = useMemo(() => {
    if (!selectedStateId || selectedStateId === 'all') return 6;
    return 8;
  }, [selectedStateId]);

  // Capa Base TileLayer URL (Sin marcas de agua)
  const tileLayerUrl = useMemo(() => {
    if (activeLayer === 'satellite') {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
    return 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  }, [activeLayer]);

  const tileLayerAttribution = useMemo(() => {
    if (activeLayer === 'satellite') {
      return '&copy; Esri &mdash; World Imagery (High Resolution)';
    }
    return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  }, [activeLayer]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ width: '100%', height: '100%', minHeight: '620px', background: '#0b1329' }}
        scrollWheelZoom={true}
      >
        <MapCameraController center={mapCenter} zoom={mapZoom} />
        <MapResizeSynchronizer />

        <TileLayer
          url={tileLayerUrl}
          attribution={tileLayerAttribution}
          maxZoom={18}
        />

        {/* Polígonos de los 24 Estados de Venezuela */}
        {VENEZUELA_STATES_DATA.map((state) => {
          const isSelected = state.id === selectedStateId;
          const polygonCoords: [number, number][] = [
            [state.bounds[0][0], state.bounds[0][1]],
            [state.bounds[0][0], state.bounds[1][1]],
            [state.bounds[1][0], state.bounds[1][1]],
            [state.bounds[1][0], state.bounds[0][1]],
          ];

          return (
            <Polygon
              key={state.id}
              positions={polygonCoords}
              pathOptions={getStatePolygonStyle(state, isSelected, activeLayer)}
              eventHandlers={{
                click: () => onSelectState(state.id),
                mouseover: (e) => {
                  const layer = e.target;
                  if (!isSelected) {
                    layer.setStyle({
                      fillOpacity: 0.75,
                      weight: 2.5,
                      color: '#38bdf8'
                    });
                  }
                },
                mouseout: (e) => {
                  const layer = e.target;
                  if (!isSelected) {
                    layer.setStyle(getStatePolygonStyle(state, false, activeLayer));
                  }
                }
              }}
            >
              <Tooltip sticky direction="top" opacity={0.95}>
                <div style={{ padding: '4px 6px', textAlign: 'center', fontSize: '0.8rem', color: '#0f172a' }}>
                  <b>🇻🇪 {state.name}</b>
                  <div style={{ fontSize: '0.72rem', color: '#475569' }}>
                    Capital: {state.capital} | Región {state.region}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600, marginTop: '2px' }}>
                    pH: {state.averagePh} | {state.annualRainfallMm} mm/año
                  </div>
                </div>
              </Tooltip>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* 🏷️ Leyenda Dinámica Flotante según Capa Activa */}
      <MapLayerLegendOverlay activeLayer={activeLayer} />
    </div>
  );
}
