/**
 * ============================================================================
 * AGROTECH VENEZUELA — VISOR ESTATAL LEAFLET (VenezuelaStateMapInner.tsx)
 * ============================================================================
 * 
 * Componente cliente nativo de Leaflet puro (L.map con useRef):
 * - Cero dependencias de contexto react-leaflet para 100% de resiliencia en
 *   entornos sandboxed, iframes, despliegues Cloud Run / VPS y React 19.
 * - Renderiza los 24 estados federales con polígonos vectoriales y tooltips.
 * - Soporte para capas temáticas: División Territorial, Satélite Esri HD,
 *   Semáforo de pH del suelo, Precipitación NASA, MapBiomas y Radar SAR.
 * - Animación cinemática fluida (flyTo) y ResizeObserver integrado.
 */

'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VENEZUELA_STATES_DATA, StateGeoData } from '@/lib/geo/venezuelaData';
import MapLayerLegendOverlay from './MapLayerLegendOverlay';

export type ActiveMapLayer = 'thematic' | 'satellite' | 'ph' | 'rainfall' | 'mapbiomas' | 'sar' | 'dark';

interface VenezuelaStateMapInnerProps {
  selectedStateId: string;
  activeLayer: ActiveMapLayer;
  onSelectState: (stateId: string) => void;
}

// Límites geográficos oficiales de Venezuela WGS84 para confinamiento estricto
const VENEZUELA_BOUNDS: L.LatLngBoundsLiteral = [
  [0.6, -73.4],  // Suroeste (Amazonas / Frontera Colombia-Brasil)
  [12.5, -59.8]  // Noreste (Fachada Atlántica / Paria / Delta)
];

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
    if (state.region.includes('Llanos')) fillColor = '#d97706';
    else if (state.region.includes('Andes')) fillColor = '#059669';
    else if (state.region.includes('Zulia') || state.region.includes('Lago')) fillColor = '#0284c7';
    else if (state.region.includes('Guayana')) fillColor = '#15803d';
    else if (state.region.includes('Centro-Occidente')) fillColor = '#ca8a04';
    else if (state.region.includes('Centro')) fillColor = '#9333ea';
    else if (state.region.includes('Oriente')) fillColor = '#ea580c';
    else fillColor = '#2563eb';
  } else if (activeLayer === 'ph') {
    if (ph < 5.2) fillColor = '#ef4444';      // Muy Ácido (Rojo)
    else if (ph < 6.0) fillColor = '#f97316'; // Moderadamente Ácido (Naranja)
    else if (ph <= 7.2) fillColor = '#10b981'; // Óptimo (Verde)
    else fillColor = '#0284c7';                // Alcalino / Calcáreo (Azul)
  } else if (activeLayer === 'rainfall') {
    if (rain < 800) fillColor = '#fed7aa';     // Árido / Semiárido
    else if (rain < 1400) fillColor = '#38bdf8'; // Húmedo
    else if (rain < 2000) fillColor = '#0284c7'; // Muy Húmedo
    else fillColor = '#1e40af';                 // Pluvial / Selva
  } else if (activeLayer === 'mapbiomas') {
    if (cover.agriculture > 35) fillColor = '#d946ef'; // Agrícola Intenso
    else if (cover.forest > 60) fillColor = '#047857';  // Forestal
    else fillColor = '#eab308';                         // Pastizales / Mosaicos
  } else if (activeLayer === 'sar') {
    if (rain > 1800) fillColor = '#3b82f6';     // Alta humedad
    else if (rain > 1100) fillColor = '#06b6d4'; // Humedad óptima
    else fillColor = '#cbd5e1';                 // Suelo seco
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
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const polygonLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const selectedState = useMemo(() => {
    return VENEZUELA_STATES_DATA.find(s => s.id === selectedStateId) || VENEZUELA_STATES_DATA[0];
  }, [selectedStateId]);

  // Centro y zoom calculado
  const mapCenter = useMemo<[number, number]>(() => {
    if (!selectedStateId || selectedStateId === 'all') {
      return [7.85, -66.0];
    }
    return [selectedState.center[0], selectedState.center[1]];
  }, [selectedStateId, selectedState]);

  const mapZoom = useMemo(() => {
    if (!selectedStateId || selectedStateId === 'all') {
      if (typeof window !== 'undefined' && window.innerWidth < 640) return 5;
      return 6;
    }
    return 8;
  }, [selectedStateId]);

  // Capa base TileLayer URL (Sin marcas de agua)
  const tileConfig = useMemo(() => {
    if (activeLayer === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri &mdash; World Imagery (High Resolution)'
      };
    }
    return {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    };
  }, [activeLayer]);

  // 1. Inicialización Nativa del Mapa Leaflet
  useEffect(() => {
    if (!containerRef.current || mapInstanceRef.current) return;

    const map = L.map(containerRef.current, {
      center: mapCenter,
      zoom: mapZoom,
      minZoom: 4.8,
      maxBounds: VENEZUELA_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
      scrollWheelZoom: true
    });

    const tileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 18
    }).addTo(map);

    const polygonLayerGroup = L.layerGroup().addTo(map);

    tileLayerRef.current = tileLayer;
    polygonLayerGroupRef.current = polygonLayerGroup;
    mapInstanceRef.current = map;

    // ResizeObserver reactivo para redimensionamiento en iframe / ventana
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(containerRef.current);

    // Timeout escalonado de seguridad para inicialización de iframe
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      tileLayerRef.current = null;
      polygonLayerGroupRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Sincronización de Capa de Teselas
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(tileConfig.url);
  }, [tileConfig]);

  // 3. Sincronización de Polígonos de los 24 Estados
  useEffect(() => {
    if (!mapInstanceRef.current || !polygonLayerGroupRef.current) return;

    polygonLayerGroupRef.current.clearLayers();

    VENEZUELA_STATES_DATA.forEach((state) => {
      const isSelected = state.id === selectedStateId;
      const polygonCoords: [number, number][] = [
        [state.bounds[0][0], state.bounds[0][1]],
        [state.bounds[0][0], state.bounds[1][1]],
        [state.bounds[1][0], state.bounds[1][1]],
        [state.bounds[1][0], state.bounds[0][1]],
      ];

      const polygon = L.polygon(polygonCoords, getStatePolygonStyle(state, isSelected, activeLayer));

      // Tooltip agronómico nativo
      polygon.bindTooltip(`
        <div style="padding: 4px 6px; text-align: center; font-size: 0.8rem; color: #0f172a;">
          <b>🇻🇪 ${state.name}</b>
          <div style="font-size: 0.72rem; color: #475569;">
            Capital: ${state.capital} | Región ${state.region}
          </div>
          <div style="font-size: 0.7rem; color: #16a34a; font-weight: 600; margin-top: 2px;">
            pH: ${state.averagePh} | ${state.annualRainfallMm} mm/año
          </div>
        </div>
      `, {
        sticky: true,
        direction: 'top',
        opacity: 0.95
      });

      polygon.on('click', () => {
        onSelectState(state.id);
      });

      polygon.on('mouseover', () => {
        if (!isSelected) {
          polygon.setStyle({
            fillOpacity: 0.75,
            weight: 2.5,
            color: '#38bdf8'
          });
        }
      });

      polygon.on('mouseout', () => {
        if (!isSelected) {
          polygon.setStyle(getStatePolygonStyle(state, false, activeLayer));
        }
      });

      polygonLayerGroupRef.current?.addLayer(polygon);
    });
  }, [selectedStateId, activeLayer, onSelectState]);

  // 4. Animación Cinemática de Cámara (flyTo)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(mapCenter, mapZoom, {
      duration: 1.1,
      easeLinearity: 0.25
    });
  }, [mapCenter, mapZoom]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '620px', 
          background: '#0b1329',
          borderRadius: '16px',
          overflow: 'hidden'
        }} 
      />

      {/* 🏷️ Leyenda Dinámica Flotante según Capa Activa */}
      <MapLayerLegendOverlay activeLayer={activeLayer} />
    </div>
  );
}
