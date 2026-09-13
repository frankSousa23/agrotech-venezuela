/**
 * ============================================================================
 * AGROTECH VENEZUELA — VISOR CARTOGRÁFICO NATIVO LEAFLET (LeafletMapInner.tsx)
 * ============================================================================
 * 
 * Componente cliente nativo puro (L.map con useRef):
 * - Cero dependencias de react-leaflet para 100% de compatibilidad con
 *   React 19, Turbopack, iframes, entornos sandboxed y contenedores Cloud / VPS.
 * - Jerarquía Geoespacial Multi-Escala: Nivel 1 Nacional, Nivel 2 Municipal, Nivel 3 Parcela.
 * - Capas: Satélite Esri HD, Semáforo de pH, Lluvias NASA, MapBiomas LULC.
 * - Trazado interactivo de polígonos de parcela con fórmula Shoelace WGS84.
 * - Muestras edafológicas GPS con popups interactivos.
 */

'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VENEZUELA_STATES_DATA, StateGeoData, VENEZUELA_SOIL_POINTS } from '@/lib/geo/venezuelaData';
import { VENEZUELA_MUNICIPALITIES_DATA, MunicipalityGeoData } from '@/lib/geo/venezuelaMunicipalities';
import { calculatePolygonAreaHa, calculatePolygonPerimeterMeters } from '@/lib/geo/spatialUtils';

// Generador diferido de icono vectorial para los vértices de parcelas (seguro para SSR y pruebas)
const getVertexIcon = () => {
  if (typeof L !== 'undefined' && typeof L.divIcon === 'function') {
    return L.divIcon({
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
  }
  return undefined as any;
};

// Límites geográficos oficiales de Venezuela WGS84 con zona de amortiguamiento elástica
export const VENEZUELA_BOUNDS: L.LatLngBoundsLiteral = [
  [-1.0, -76.0],  // Suroeste amortiguado (Orinoquía / Amazonía / Frontera)
  [16.0, -57.0]   // Noreste amortiguado (Mar Caribe / Fachada Atlántica / Delta)
];

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
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const vectorLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const drawingLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const soilLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // Configuración de teselas sin marcas de agua y soporte para Modo Oscuro CartoDB
  const tileConfig = useMemo(() => {
    if (activeLayer === 'satellite' || activeLayer === 'mapbiomas') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attr: 'Tiles &copy; Esri &mdash; World Imagery (High Resolution)'
      };
    }
    if (activeLayer === 'dark') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        attr: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, &copy; OpenStreetMap contributors'
      };
    }
    return {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    };
  }, [activeLayer]);

  // Estilos de color para estados
  const getStateColor = (state: StateGeoData) => {
    if (activeLayer === 'ph') {
      if (state.averagePh < 5.2) return '#ef4444';
      if (state.averagePh < 6.0) return '#f59e0b';
      if (state.averagePh < 7.0) return '#22c55e';
      return '#3b82f6';
    }
    if (activeLayer === 'rainfall') {
      if (state.annualRainfallMm < 1000) return '#fbbf24';
      if (state.annualRainfallMm < 1500) return '#38bdf8';
      if (state.annualRainfallMm < 2200) return '#0284c7';
      return '#1e3a8a';
    }
    if (activeLayer === 'mapbiomas') {
      const cover = state.mapbiomasCoverPercentage;
      if (cover.agriculture && cover.agriculture > 25) return '#e879f9';
      if (cover.pasture && cover.pasture > 30) return '#facc15';
      return '#10b981';
    }
    return '#3b82f6';
  };

  // Estilos de color para municipios
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

  // 1. Inicialización Nativa del Mapa
  useEffect(() => {
    if (!containerRef.current || mapInstanceRef.current) return;

    const map = L.map(containerRef.current, {
      center: [mapCenter.lat, mapCenter.lng],
      zoom: mapCenter.zoom,
      minZoom: 4.5,
      maxBounds: VENEZUELA_BOUNDS,
      maxBoundsViscosity: 0.55,
      zoomControl: true,
      scrollWheelZoom: true
    });

    const tileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attr,
      maxZoom: 19
    }).addTo(map);

    const vectorGroup = L.layerGroup().addTo(map);
    const drawingGroup = L.layerGroup().addTo(map);
    const soilGroup = L.layerGroup().addTo(map);

    tileLayerRef.current = tileLayer;
    vectorLayerGroupRef.current = vectorGroup;
    drawingLayerGroupRef.current = drawingGroup;
    soilLayerGroupRef.current = soilGroup;
    mapInstanceRef.current = map;

    // Listener de clic para trazado de parcelas
    map.on('click', (e) => {
      // Usar referencia actualizada para isDrawing
      if ((window as any).__isDrawingMode) {
        onAddPoint([e.latlng.lat, e.latlng.lng]);
      }
    });

    // ResizeObserver reactivo para iframe y pantallas responsivas
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(containerRef.current);

    const handleOrientationChange = () => {
      setTimeout(() => map.invalidateSize(), 200);
    };
    window.addEventListener('orientationchange', handleOrientationChange);

    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('orientationchange', handleOrientationChange);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      tileLayerRef.current = null;
      vectorLayerGroupRef.current = null;
      drawingLayerGroupRef.current = null;
      soilLayerGroupRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mantener flag global de dibujo sincronizado y touch-action adaptativo
  useEffect(() => {
    (window as any).__isDrawingMode = isDrawing;
    if (containerRef.current) {
      containerRef.current.style.touchAction = isDrawing ? 'none' : 'pan-y';
    }
  }, [isDrawing]);

  // 2. Sincronización de Capa de Teselas
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(tileConfig.url);
  }, [tileConfig]);

  // 3. Sincronización de Vectores (Nivel 1 Estados & Nivel 2 Municipios)
  useEffect(() => {
    if (!mapInstanceRef.current || !vectorLayerGroupRef.current) return;

    vectorLayerGroupRef.current.clearLayers();

    // NIVEL 1: 24 Estados
    if (currentLevel === 1) {
      VENEZUELA_STATES_DATA.forEach(state => {
        const isSelected = state.id === selectedStateId;
        const color = getStateColor(state);
        const boundsCoords: [number, number][] = [
          [state.bounds[0][0], state.bounds[0][1]],
          [state.bounds[1][0], state.bounds[0][1]],
          [state.bounds[1][0], state.bounds[1][1]],
          [state.bounds[0][0], state.bounds[1][1]]
        ];

        const polygon = L.polygon(boundsCoords, {
          color: isSelected ? '#ffffff' : color,
          weight: isSelected ? 3 : 1.5,
          fillColor: color,
          fillOpacity: isSelected ? 0.45 : 0.22,
          dashArray: isSelected ? '4, 4' : undefined
        });

        polygon.bindTooltip(`
          <div style="padding: 4px; font-size: 0.82rem;">
            <b style="color: #16a34a;">🇻🇪 ${state.name}</b> (${state.region})<br />
            🌱 <b>Cultivos:</b> ${state.mainCrops.slice(0, 3).join(', ')}<br />
            🧪 <b>pH Promedio:</b> ${state.averagePh} | 🌧️ <b>Lluvia:</b> ${state.annualRainfallMm} mm<br />
            <span style="color: #38bdf8; font-size: 0.75rem;">👆 Haz clic para explorar municipios</span>
          </div>
        `, { sticky: true });

        polygon.on('mouseover', () => {
          if (!isSelected) {
            polygon.setStyle({
              fillOpacity: 0.55,
              weight: 2.5,
              color: '#38bdf8'
            });
          }
        });

        polygon.on('mouseout', () => {
          if (!isSelected) {
            polygon.setStyle({
              fillOpacity: 0.22,
              weight: 1.5,
              color: color
            });
          }
        });

        polygon.on('click', () => onSelectState(state.id));
        vectorLayerGroupRef.current?.addLayer(polygon);

        const marker = L.circleMarker(state.center, {
          color: '#ffffff',
          fillColor: isSelected ? '#38bdf8' : color,
          fillOpacity: 0.9,
          weight: 2,
          radius: isSelected ? 8 : 5
        });

        marker.bindTooltip(`<span style="font-weight: 600; font-size: 0.75rem;">${state.name}</span>`, {
          permanent: isSelected,
          direction: 'top',
          offset: [0, -5]
        });

        marker.on('click', () => onSelectState(state.id));
        vectorLayerGroupRef.current?.addLayer(marker);
      });
    }

    // NIVEL 2: Municipios
    if (currentLevel === 2) {
      const stateMunicipalities = VENEZUELA_MUNICIPALITIES_DATA.filter(
        m => m.stateId.toLowerCase() === selectedStateId.toLowerCase()
      );

      stateMunicipalities.forEach(muni => {
        const isSelected = muni.id === selectedMunicipalityId;
        const color = getMuniColor(muni);
        const boundsCoords: [number, number][] = [
          [muni.bounds[0][0], muni.bounds[0][1]],
          [muni.bounds[1][0], muni.bounds[0][1]],
          [muni.bounds[1][0], muni.bounds[1][1]],
          [muni.bounds[0][0], muni.bounds[1][1]]
        ];

        const polygon = L.polygon(boundsCoords, {
          color: isSelected ? '#38bdf8' : color,
          weight: isSelected ? 3 : 2,
          fillColor: color,
          fillOpacity: isSelected ? 0.5 : 0.25
        });

        polygon.bindTooltip(`
          <div style="padding: 4px; font-size: 0.82rem;">
            <b style="color: #38bdf8;">🏛️ Municipio ${muni.name}</b><br />
            <b>Capital:</b> ${muni.capital}<br />
            <b>Suelo Dominante:</b> ${muni.soilTexture} (pH ${muni.avgPh})<br />
            <b>Cultivos Principales:</b> ${muni.mainCrops.join(', ')}
          </div>
        `, { sticky: true });

        polygon.on('click', () => onSelectMunicipality(muni.id));
        vectorLayerGroupRef.current?.addLayer(polygon);

        const marker = L.circleMarker(muni.center, {
          color: '#ffffff',
          fillColor: isSelected ? '#fbbf24' : '#22c55e',
          fillOpacity: 0.95,
          weight: 2,
          radius: isSelected ? 9 : 6
        });

        marker.bindTooltip(`<span style="font-weight: 700; font-size: 0.78rem;">${muni.name}</span>`, {
          permanent: true,
          direction: 'top',
          offset: [0, -6]
        });

        marker.on('click', () => onSelectMunicipality(muni.id));
        vectorLayerGroupRef.current?.addLayer(marker);
      });
    }

    // NIVEL 3: Marcador central
    if (currentLevel === 3) {
      const centerMarker = L.circleMarker([mapCenter.lat, mapCenter.lng], {
        color: '#ffffff',
        fillColor: '#d97706',
        fillOpacity: 0.9,
        weight: 2,
        radius: 7
      });

      centerMarker.bindTooltip(`<span style="font-weight: 700; font-size: 0.75rem;">📍 Centro Micro-Región</span>`, {
        permanent: true,
        direction: 'bottom'
      });

      vectorLayerGroupRef.current?.addLayer(centerMarker);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel, selectedStateId, selectedMunicipalityId, activeLayer, onSelectState, onSelectMunicipality]);

  // 4. Sincronización de Dibujo de Parcela (Vértices + Polígono Shoelace)
  useEffect(() => {
    if (!mapInstanceRef.current || !drawingLayerGroupRef.current) return;

    drawingLayerGroupRef.current.clearLayers();

    if (currentLevel === 3 && drawnPoints.length > 0) {
      drawnPoints.forEach((pt, idx) => {
        const marker = L.marker(pt, { icon: getVertexIcon() });
        marker.bindTooltip(`<span style="font-size: 0.7rem; font-weight: 600;">Vértice #${idx + 1}</span>`, {
          direction: 'top',
          offset: [0, -4]
        });
        drawingLayerGroupRef.current?.addLayer(marker);
      });

      if (drawnPoints.length >= 3) {
        const area = calculatePolygonAreaHa(drawnPoints);
        const perim = calculatePolygonPerimeterMeters(drawnPoints);

        // Color y estilo contextual según la capa temática activa (Task 2.2)
        let strokeColor = '#22c55e';
        let fillColor = '#4ade80';
        let layerBadgeText = '';

        const currentMuni = VENEZUELA_MUNICIPALITIES_DATA.find(m => m.id === selectedMunicipalityId);
        const avgPh = currentMuni?.avgPh ?? 6.2;
        const rainfall = currentMuni?.annualRainfallMm ?? 1400;

        if (activeLayer === 'ph') {
          if (avgPh < 5.2) {
            strokeColor = '#ef4444';
            fillColor = '#f87171';
            layerBadgeText = `🧪 Suelo Muy Ácido (pH ${avgPh}) — Requiere Cal`;
          } else if (avgPh < 6.0) {
            strokeColor = '#f59e0b';
            fillColor = '#fbbf24';
            layerBadgeText = `🧪 Suelo Moderadamente Ácido (pH ${avgPh})`;
          } else {
            strokeColor = '#10b981';
            fillColor = '#34d399';
            layerBadgeText = `🧪 pH Óptimo (pH ${avgPh})`;
          }
        } else if (activeLayer === 'rainfall') {
          if (rainfall < 1000) {
            strokeColor = '#f59e0b';
            fillColor = '#fde047';
            layerBadgeText = `🌧️ Zona Semiárida (${rainfall} mm/año) — Riego Clave`;
          } else if (rainfall < 1600) {
            strokeColor = '#0284c7';
            fillColor = '#38bdf8';
            layerBadgeText = `🌧️ Régimen Pluvial Medio (${rainfall} mm/año)`;
          } else {
            strokeColor = '#1e40af';
            fillColor = '#60a5fa';
            layerBadgeText = `🌧️ Zona Pluvial Alta (${rainfall} mm/año) — Drenaje Crítico`;
          }
        } else if (activeLayer === 'dark') {
          strokeColor = '#38bdf8';
          fillColor = '#0284c7';
          layerBadgeText = '🌙 Modo Nocturno CartoDB Dark Matter';
        } else if (activeLayer === 'satellite') {
          strokeColor = '#fbbf24';
          fillColor = '#f59e0b';
          layerBadgeText = '🛰️ Ortoimagen Sentinel-2 L2A Alta Resolución';
        } else {
          // mapbiomas
          strokeColor = '#16a34a';
          fillColor = '#4ade80';
          layerBadgeText = '🌱 Cobertura Agrícola MapBiomas 2024';
        }

        const polygon = L.polygon(drawnPoints, {
          color: strokeColor,
          weight: 3,
          fillColor: fillColor,
          fillOpacity: 0.38,
          dashArray: isDrawing ? '6, 6' : undefined
        });

        polygon.bindPopup(`
          <div style="padding: 6px; font-size: 0.85rem;">
            <h4 style="margin: 0 0 4px 0; color: ${strokeColor};">🌾 Parcela Delimitada</h4>
            <p style="margin: 2px 0;"><b>Superficie:</b> ${area} ha</p>
            <p style="margin: 2px 0;"><b>Perímetro:</b> ${perim} m</p>
            ${layerBadgeText ? `<div style="margin-top: 4px; padding: 4px 6px; background: #0f172a; border-radius: 4px; font-size: 0.75rem; color: ${strokeColor}; font-weight: 600;">${layerBadgeText}</div>` : ''}
            <p style="margin: 4px 0 0 0; color: #64748b; font-size: 0.72rem;">Fórmula Shoelace Geodésico WGS84</p>
          </div>
        `);

        drawingLayerGroupRef.current?.addLayer(polygon);
      }
    }
  }, [currentLevel, drawnPoints, isDrawing, activeLayer, selectedMunicipalityId]);

  // 5. Sincronización de Muestras Edafológicas GPS
  useEffect(() => {
    if (!mapInstanceRef.current || !soilLayerGroupRef.current) return;

    soilLayerGroupRef.current.clearLayers();

    if (showSoilPoints) {
      VENEZUELA_SOIL_POINTS.forEach(pt => {
        if (currentLevel > 1 && pt.stateId.toLowerCase() !== selectedStateId.toLowerCase()) {
          return;
        }

        const phColor = pt.ph < 5.2 ? '#ef4444' : pt.ph < 6.0 ? '#f59e0b' : '#22c55e';

        const marker = L.circleMarker([pt.lat, pt.lng], {
          color: '#ffffff',
          fillColor: phColor,
          fillOpacity: 0.9,
          weight: 1.5,
          radius: 4.5
        });

        marker.bindPopup(`
          <div style="padding: 6px; font-size: 0.8rem; min-width: 180px;">
            <b style="color: #0284c7;">🧪 Muestra GPS #${pt.id}</b><br />
            <b>pH:</b> <span style="color: ${phColor}; font-weight: 700;">${pt.ph}</span> (${pt.ph < 5.5 ? 'Ácido' : 'Fértil'})<br />
            <b>Textura:</b> ${pt.texture}<br />
            <b>Materia Orgánica:</b> ${pt.organicMatter}%<br />
            <b>Fecha Muestreo:</b> ${pt.samplingDate}
          </div>
        `);

        soilLayerGroupRef.current?.addLayer(marker);
      });
    }
  }, [showSoilPoints, currentLevel, selectedStateId]);

  // 6. Animación Cinemática de Cámara
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([mapCenter.lat, mapCenter.lng], mapCenter.zoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [mapCenter.lat, mapCenter.lng, mapCenter.zoom]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '380px', 
        background: '#0b1329',
        borderRadius: '12px',
        overflow: 'hidden'
      }} 
    />
  );
}
