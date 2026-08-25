/**
 * ============================================================================
 * AGROTECH VENEZUELA — VISOR CARTOGRÁFICO NATIVO LEAFLET (LeafletMapInner.tsx)
 * ============================================================================
 * 
 * Componente cliente puro (renderizado exclusivamente en browser, SSR: false).
 * 
 * Capacidades Principales:
 * 1. Jerarquía Geoespacial Multi-Escala (Nivel 1 Nacional, Nivel 2 Municipal, Nivel 3 Parcela).
 * 2. Capas Dinámicas: MapBiomas 2024 (LULC), Satélite Esri HD, Semáforo de Acidez Edafológica pH,
 *    Precipitación Anual NASA POWER y Modo Oscuro CartoDB.
 * 3. Transición Cinemática Fluida: Animación 'flyTo' con interpolación cúbica al cambiar de nivel.
 * 4. Trazado Interactivo de Polígonos de Parcela con cálculo en tiempo real de Shoelace (ha).
 * 5. Puntos de Muestreo Edafológico GPS con Popups analíticos interactivos.
 */

'use client';

import React, { useEffect, useMemo } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Polygon, 
  CircleMarker, 
  Marker, 
  Popup, 
  Tooltip, 
  useMap, 
  useMapEvents 
} from 'react-leaflet';
import L from 'leaflet';
import { VENEZUELA_STATES_DATA, StateGeoData, VENEZUELA_SOIL_POINTS } from '@/lib/geo/venezuelaData';
import { VENEZUELA_MUNICIPALITIES_DATA, MunicipalityGeoData } from '@/lib/geo/venezuelaMunicipalities';
import { calculatePolygonAreaHa, calculatePolygonPerimeterMeters } from '@/lib/geo/spatialUtils';

// Fix para marcadores vectoriales en Next.js (evita errores de rutas 404 en assets de Leaflet)
const vertexIcon = L.divIcon({
  className: 'custom-vertex-marker',
  html: `<div style="
    background: #fbbf24;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #0f172a;
    box-shadow: 0 0 6px #f59e0b;
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

/**
 * MapViewController: Controlador reactivo para animar la cámara de Leaflet
 * Utiliza 'map.flyTo' cuando las propiedades de centro o zoom cambian.
 */
function MapViewController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [center, zoom, map]);
  return null;
}

/**
 * MapDrawingHandler: Intercepta eventos de clic sobre el canvas del mapa
 * Cuando 'isDrawing' está activo, añade las coordenadas [lat, lng] al polígono de la micro-parcela.
 */
function MapDrawingHandler({
  isDrawing,
  onAddPoint
}: {
  isDrawing: boolean;
  onAddPoint: (point: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      if (isDrawing) {
        onAddPoint([e.latlng.lat, e.latlng.lng]);
      }
    }
  });
  return null;
}

export type ActiveLayerType = 'satellite' | 'mapbiomas' | 'ph' | 'rainfall' | 'dark' | 'streets';

export interface LeafletMapInnerProps {
  currentLevel: 1 | 2 | 3;
  selectedStateId: string;
  selectedMunicipalityId: string;
  activeLayer: ActiveLayerType;
  mapCenter: { lat: number; lng: number; zoom: number };
  isDrawing: boolean;
  drawnPoints: [number, number][];
  onAddPoint: (point: [number, number]) => void;
  onSelectState: (stateId: string) => void;
  onSelectMunicipality: (muniId: string) => void;
  showSoilPoints?: boolean;
}

export default function LeafletMapInner({
  currentLevel,
  selectedStateId,
  selectedMunicipalityId,
  activeLayer,
  mapCenter,
  isDrawing,
  drawnPoints,
  onAddPoint,
  onSelectState,
  onSelectMunicipality,
  showSoilPoints = true
}: LeafletMapInnerProps) {

  // Tile layer URL & attribution
  const tileConfig = useMemo(() => {
    if (activeLayer === 'satellite' || activeLayer === 'mapbiomas') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attr: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      };
    }
    if (activeLayer === 'dark') {
      return {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attr: '&copy; CartoDB &copy; OpenStreetMap contributors'
      };
    }
    if (activeLayer === 'streets') {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attr: '&copy; OpenStreetMap contributors'
      };
    }
    return {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attr: 'Esri World Imagery'
    };
  }, [activeLayer]);

  // Funciones de estilo para GeoJSON según capa activa
  const getStateColor = (state: StateGeoData) => {
    if (activeLayer === 'ph') {
      if (state.averagePh < 5.2) return '#ef4444'; // Muy ácido
      if (state.averagePh < 6.0) return '#f59e0b'; // Moderadamente ácido
      if (state.averagePh < 7.0) return '#22c55e'; // Óptimo
      return '#3b82f6'; // Alcalino / Neutro alto
    }
    if (activeLayer === 'rainfall') {
      if (state.annualRainfallMm < 1000) return '#fbbf24';
      if (state.annualRainfallMm < 1500) return '#38bdf8';
      if (state.annualRainfallMm < 2200) return '#0284c7';
      return '#1e3a8a';
    }
    if (activeLayer === 'mapbiomas') {
      const cover = state.mapbiomasCoverPercentage;
      if (cover.agriculture && cover.agriculture > 25) return '#e879f9'; // Rosa agricultura
      if (cover.pasture && cover.pasture > 30) return '#facc15'; // Amarillo pastizal
      return '#10b981'; // Verde bosque / sabana
    }
    return '#3b82f6';
  };

  const getMuniColor = (muni: MunicipalityGeoData) => {
    if (activeLayer === 'ph') {
      if (muni.avgPh < 5.2) return '#ef4444';
      if (muni.avgPh < 6.0) return '#f59e0b';
      return '#22c55e';
    }
    if (activeLayer === 'rainfall') {
      if (muni.annualRainfallMm < 1100) return '#f59e0b';
      if (muni.annualRainfallMm < 1600) return '#0284c7';
      return '#1e40af';
    }
    return '#22c55e';
  };

  // Filtrar municipios del estado seleccionado
  const stateMunicipalities = useMemo(() => {
    return VENEZUELA_MUNICIPALITIES_DATA.filter(m => m.stateId.toLowerCase() === selectedStateId.toLowerCase());
  }, [selectedStateId]);

  return (
    <MapContainer
      center={[mapCenter.lat, mapCenter.lng]}
      zoom={mapCenter.zoom}
      style={{ width: '100%', height: '100%', minHeight: '620px', background: '#0b1329' }}
      zoomControl={true}
      attributionControl={false}
    >
      <MapViewController center={[mapCenter.lat, mapCenter.lng]} zoom={mapCenter.zoom} />
      <MapDrawingHandler isDrawing={isDrawing} onAddPoint={onAddPoint} />

      <TileLayer url={tileConfig.url} attribution={tileConfig.attr} maxZoom={19} />

      {/* ======================================================== */}
      {/* 🇻🇪 NIVEL 1: Polígonos de los 24 Estados de Venezuela       */}
      {/* ======================================================== */}
      {currentLevel === 1 && VENEZUELA_STATES_DATA.map(state => {
        const isSelected = state.id === selectedStateId;
        const color = getStateColor(state);
        const boundsCoords: [number, number][] = [
          [state.bounds[0][0], state.bounds[0][1]],
          [state.bounds[1][0], state.bounds[0][1]],
          [state.bounds[1][0], state.bounds[1][1]],
          [state.bounds[0][0], state.bounds[1][1]]
        ];

        return (
          <React.Fragment key={state.id}>
            <Polygon
              positions={boundsCoords}
              pathOptions={{
                color: isSelected ? '#ffffff' : color,
                weight: isSelected ? 3 : 1.5,
                fillColor: color,
                fillOpacity: isSelected ? 0.45 : 0.22,
                dashArray: isSelected ? '4, 4' : undefined
              }}
              eventHandlers={{
                click: () => onSelectState(state.id)
              }}
            >
              <Tooltip sticky>
                <div style={{ padding: '4px', fontSize: '0.82rem' }}>
                  <b style={{ color: '#16a34a' }}>🇻🇪 {state.name}</b> ({state.region})<br />
                  🌱 <b>Cultivos:</b> {state.mainCrops.slice(0, 3).join(', ')}<br />
                  🧪 <b>pH Promedio:</b> {state.averagePh} | 🌧️ <b>Lluvia:</b> {state.annualRainfallMm} mm
                </div>
              </Tooltip>
            </Polygon>

            <CircleMarker
              center={state.center}
              radius={isSelected ? 8 : 5}
              pathOptions={{
                color: '#ffffff',
                fillColor: isSelected ? '#38bdf8' : color,
                fillOpacity: 0.9,
                weight: 2
              }}
              eventHandlers={{
                click: () => onSelectState(state.id)
              }}
            >
              <Tooltip permanent={isSelected} direction="top" offset={[0, -5]}>
                <span style={{ fontWeight: 600, fontSize: '0.75rem' }}>{state.name}</span>
              </Tooltip>
            </CircleMarker>
          </React.Fragment>
        );
      })}

      {/* ======================================================== */}
      {/* 🏛️ NIVEL 2: Municipios del Estado Seleccionado           */}
      {/* ======================================================== */}
      {currentLevel === 2 && stateMunicipalities.map(muni => {
        const isSelected = muni.id === selectedMunicipalityId;
        const color = getMuniColor(muni);
        const boundsCoords: [number, number][] = [
          [muni.bounds[0][0], muni.bounds[0][1]],
          [muni.bounds[1][0], muni.bounds[0][1]],
          [muni.bounds[1][0], muni.bounds[1][1]],
          [muni.bounds[0][0], muni.bounds[1][1]]
        ];

        return (
          <React.Fragment key={muni.id}>
            <Polygon
              positions={boundsCoords}
              pathOptions={{
                color: isSelected ? '#38bdf8' : color,
                weight: isSelected ? 3 : 2,
                fillColor: color,
                fillOpacity: isSelected ? 0.5 : 0.25
              }}
              eventHandlers={{
                click: () => onSelectMunicipality(muni.id)
              }}
            >
              <Tooltip sticky>
                <div style={{ padding: '4px', fontSize: '0.82rem' }}>
                  <b style={{ color: '#38bdf8' }}>🏛️ Municipio {muni.name}</b><br />
                  <b>Capital:</b> {muni.capital}<br />
                  <b>Suelo Dominante:</b> {muni.soilTexture} (pH {muni.avgPh})<br />
                  <b>Cultivos Principales:</b> {muni.mainCrops.join(', ')}
                </div>
              </Tooltip>
            </Polygon>

            <CircleMarker
              center={muni.center}
              radius={isSelected ? 9 : 6}
              pathOptions={{
                color: '#ffffff',
                fillColor: isSelected ? '#fbbf24' : '#22c55e',
                fillOpacity: 0.95,
                weight: 2
              }}
              eventHandlers={{
                click: () => onSelectMunicipality(muni.id)
              }}
            >
              <Tooltip permanent direction="top" offset={[0, -6]}>
                <span style={{ fontWeight: 700, fontSize: '0.78rem' }}>{muni.name}</span>
              </Tooltip>
            </CircleMarker>
          </React.Fragment>
        );
      })}

      {/* ======================================================== */}
      {/* 🚜 NIVEL 3: Micro-Parcela Sentinel-2 y Trazado de GPS    */}
      {/* ======================================================== */}
      {currentLevel === 3 && (
        <>
          {/* Marcador del centro del municipio actual */}
          <CircleMarker
            center={[mapCenter.lat, mapCenter.lng]}
            radius={7}
            pathOptions={{
              color: '#ffffff',
              fillColor: '#d97706',
              fillOpacity: 0.9,
              weight: 2
            }}
          >
            <Tooltip permanent direction="bottom">
              <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>📍 Centro Micro-Región</span>
            </Tooltip>
          </CircleMarker>

          {/* Vértices y Polígono Trazado por el usuario */}
          {drawnPoints.length > 0 && (
            <>
              {drawnPoints.map((pt, idx) => (
                <Marker key={idx} position={pt} icon={vertexIcon}>
                  <Tooltip direction="top" offset={[0, -4]}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Vértice #{idx + 1}</span>
                  </Tooltip>
                </Marker>
              ))}

              {drawnPoints.length >= 3 && (
                <Polygon
                  positions={drawnPoints}
                  pathOptions={{
                    color: '#22c55e',
                    weight: 3,
                    fillColor: '#4ade80',
                    fillOpacity: 0.35,
                    dashArray: isDrawing ? '6, 6' : undefined
                  }}
                >
                  <Popup>
                    <div style={{ padding: '6px', fontSize: '0.85rem' }}>
                      <h4 style={{ margin: '0 0 4px 0', color: '#16a34a' }}>🌾 Parcela Delimitada</h4>
                      <p style={{ margin: '2px 0' }}>
                        <b>Superficie:</b> {calculatePolygonAreaHa(drawnPoints)} ha
                      </p>
                      <p style={{ margin: '2px 0' }}>
                        <b>Perímetro:</b> {calculatePolygonPerimeterMeters(drawnPoints)} m
                      </p>
                      <p style={{ margin: '2px 0', color: '#64748b', fontSize: '0.75rem' }}>
                        Fórmula Shoelace Geodésico WGS84
                      </p>
                    </div>
                  </Popup>
                </Polygon>
              )}
            </>
          )}
        </>
      )}

      {/* ======================================================== */}
      {/* 🧪 Puntos de Muestras Edafológicas GPS (Capas de Suelo)   */}
      {/* ======================================================== */}
      {showSoilPoints && VENEZUELA_SOIL_POINTS.map(pt => {
        if (currentLevel > 1 && pt.stateId.toLowerCase() !== selectedStateId.toLowerCase()) {
          return null;
        }

        const phColor = pt.ph < 5.2 ? '#ef4444' : pt.ph < 6.0 ? '#f59e0b' : '#22c55e';

        return (
          <CircleMarker
            key={pt.id}
            center={[pt.lat, pt.lng]}
            radius={4.5}
            pathOptions={{
              color: '#ffffff',
              fillColor: phColor,
              fillOpacity: 0.9,
              weight: 1.5
            }}
          >
            <Popup>
              <div style={{ padding: '6px', fontSize: '0.8rem', minWidth: '180px' }}>
                <b style={{ color: '#0284c7' }}>🧪 Muestra GPS #{pt.id}</b><br />
                <b>pH:</b> <span style={{ color: phColor, fontWeight: 700 }}>{pt.ph}</span> ({pt.ph < 5.5 ? 'Ácido' : 'Fértil'})<br />
                <b>Textura:</b> {pt.texture}<br />
                <b>Materia Orgánica:</b> {pt.organicMatter}%<br />
                <b>Fecha Muestreo:</b> {pt.samplingDate}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
