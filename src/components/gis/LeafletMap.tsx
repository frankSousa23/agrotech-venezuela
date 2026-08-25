'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VENEZUELA_SOIL_POINTS, VENEZUELA_STATES_DATA, StateGeoData } from '@/lib/geo/venezuelaData';
import { MunicipalityGeoData, getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { calculatePolygonAreaHa } from '@/lib/geo/spatialUtils';

// Corregir rutas de iconos por defecto de Leaflet si se usan markers
try {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
} catch {
  // ignore
}

interface LeafletMapProps {
  center: [number, number]; // [lat, lng]
  zoom: number;
  selectedState: StateGeoData;
  selectedMunicipality?: MunicipalityGeoData;
  activeLayer: 'satellite' | 'mapbiomas' | 'ph' | 'rainfall';
  isDrawing?: boolean;
  onPolygonDrawn?: (coords: [number, number][], areaHa: number) => void;
  onSelectState?: (stateId: string) => void;
  onSelectMunicipality?: (muniId: string) => void;
}

function getTileConfig(layer: 'satellite' | 'mapbiomas' | 'ph' | 'rainfall') {
  switch (layer) {
    case 'satellite':
      return {
        url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        attribution: 'Google Hybrid Satellite | Sentinel-2 L2A',
        subdomains: [] as string[],
      };
    case 'mapbiomas':
      return {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution: 'CartoDB Voyager | MapBiomas Venezuela Colección 3',
        subdomains: ['a', 'b', 'c', 'd'],
      };
    case 'ph':
      return {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: 'CartoDB Dark | Red Edafológica pH Agrotech',
        subdomains: ['a', 'b', 'c', 'd'],
      };
    case 'rainfall':
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: 'OpenStreetMap | NASA POWER Agro-Climatology',
        subdomains: ['a', 'b', 'c'],
      };
  }
}

export default function LeafletMap({
  center,
  zoom,
  selectedState,
  selectedMunicipality,
  activeLayer,
  isDrawing = false,
  onPolygonDrawn,
  onSelectState,
  onSelectMunicipality,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const vectorsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const drawingLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  // Referencias mutables a callbacks para event listeners sin re-inicializaciones
  const callbacksRef = useRef({
    onSelectState,
    onSelectMunicipality,
    onPolygonDrawn,
    isDrawing,
  });

  useEffect(() => {
    callbacksRef.current = {
      onSelectState,
      onSelectMunicipality,
      onPolygonDrawn,
      isDrawing,
    };
  }, [onSelectState, onSelectMunicipality, onPolygonDrawn, isDrawing]);

  // 1. Inicializar Mapa Leaflet una sola vez al montar en cliente
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapInstanceRef.current) return;

    if ((container as any)._leaflet_id) {
      delete (container as any)._leaflet_id;
    }

    // Instanciar mapa
    const map = L.map(container, {
      center: [center[0], center[1]],
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
      preferCanvas: true,
      fadeAnimation: true,
    });

    // Control de zoom
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    if (L.control.scale) {
      L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);
    }

    // Capa base inicial de tiles
    const tileConf = getTileConfig(activeLayer);
    const tile = L.tileLayer(tileConf.url, {
      maxZoom: 20,
      attribution: tileConf.attribution,
      subdomains: tileConf.subdomains,
    }).addTo(map);
    tileLayerRef.current = tile;

    // Grupos de capas
    const vectorsGroup = L.layerGroup().addTo(map);
    const drawingGroup = L.layerGroup().addTo(map);
    vectorsLayerGroupRef.current = vectorsGroup;
    drawingLayerGroupRef.current = drawingGroup;

    mapInstanceRef.current = map;
    setIsMapReady(true);

    // Click handler para dibujo interactivo
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (!callbacksRef.current.isDrawing) return;
      const newPt: [number, number] = [e.latlng.lat, e.latlng.lng];
      setDrawnPoints((prev) => {
        const updated = [...prev, newPt];
        if (drawingLayerGroupRef.current) {
          drawingLayerGroupRef.current.clearLayers();

          // Vértices
          updated.forEach((pt, idx) => {
            const marker = L.circleMarker(pt, {
              radius: 6,
              color: '#22c55e',
              fillColor: '#86efac',
              fillOpacity: 1,
              weight: 2,
            });
            marker.bindTooltip(`Vértice ${idx + 1}`, { permanent: true, direction: 'top' });
            drawingLayerGroupRef.current?.addLayer(marker);
          });

          // Polilínea
          if (updated.length >= 2) {
            const polyline = L.polyline(updated, {
              color: '#22c55e',
              weight: 3,
              dashArray: '5, 5',
            });
            drawingLayerGroupRef.current?.addLayer(polyline);
          }

          // Polígono
          if (updated.length >= 3) {
            const polygon = L.polygon(updated, {
              color: '#16a34a',
              fillColor: '#22c55e',
              fillOpacity: 0.38,
              weight: 2.5,
            });
            drawingLayerGroupRef.current?.addLayer(polygon);

            const area = calculatePolygonAreaHa(updated);
            if (callbacksRef.current.onPolygonDrawn) {
              callbacksRef.current.onPolygonDrawn(updated, area);
            }
          }
        }
        return updated;
      });
    });

    // Invalidation de tamaño para renderizado nítido inmediato
    const inv = () => {
      try {
        map.invalidateSize();
      } catch {
        // ignore
      }
    };
    inv();
    const timer1 = setTimeout(inv, 100);
    const timer2 = setTimeout(inv, 350);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        inv();
      });
      resizeObserver.observe(container);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (resizeObserver) resizeObserver.disconnect();
      try {
        map.remove();
      } catch {
        // ignore
      }
      mapInstanceRef.current = null;
      tileLayerRef.current = null;
      vectorsLayerGroupRef.current = null;
      drawingLayerGroupRef.current = null;
    };
  }, []); // Montaje único en cliente

  // 2. Transición reactiva de cámara al cambiar centro o zoom
  const targetLat = center[0];
  const targetLng = center[1];
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;
    const map = mapInstanceRef.current;
    try {
      map.flyTo([targetLat, targetLng], zoom, {
        duration: 0.6,
        easeLinearity: 0.25,
      });
    } catch {
      try {
        map.setView([targetLat, targetLng], zoom);
      } catch {
        // ignore
      }
    }
  }, [targetLat, targetLng, zoom, isMapReady]);

  // 3. Conmutación reactiva de Capa Base (Tiles)
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;
    const map = mapInstanceRef.current;
    if (tileLayerRef.current) {
      try {
        map.removeLayer(tileLayerRef.current);
      } catch {
        // ignore
      }
    }

    const conf = getTileConfig(activeLayer);
    try {
      const tile = L.tileLayer(conf.url, {
        maxZoom: 20,
        attribution: conf.attribution,
        subdomains: conf.subdomains,
      }).addTo(map);
      tileLayerRef.current = tile;
    } catch (err) {
      console.error('Error al actualizar capa base de tiles:', err);
    }
  }, [activeLayer, isMapReady]);

  // 4. Renderizado reactivo de Estados, Municipios y Edafología
  const currentStId = selectedState.id;
  const currentMuniId = selectedMunicipality?.id;
  useEffect(() => {
    if (!mapInstanceRef.current || !vectorsLayerGroupRef.current || !isMapReady) return;
    const group = vectorsLayerGroupRef.current;
    group.clearLayers();

    // Polígonos de Estados
    VENEZUELA_STATES_DATA.forEach((st) => {
      const isSelected = st.id.toLowerCase() === currentStId.toLowerCase();
      const [[latMin, lngMin], [latMax, lngMax]] = st.bounds;
      const bounds = [[latMin, lngMin], [latMax, lngMax]] as L.LatLngBoundsExpression;

      const rect = L.rectangle(bounds, {
        color: isSelected ? '#22c55e' : 'rgba(255, 255, 255, 0.35)',
        weight: isSelected ? 3 : 1,
        fillColor: isSelected ? '#16a34a' : 'transparent',
        fillOpacity: isSelected ? 0.22 : 0.02,
        dashArray: isSelected ? undefined : '3, 4',
      });

      rect.on('click', () => {
        if (callbacksRef.current.onSelectState) {
          callbacksRef.current.onSelectState(st.id);
        }
      });

      rect.bindTooltip(
        `<div style="font-family: system-ui, sans-serif; font-size: 12px; color: #0f172a; padding: 2px 4px;">
          <b style="color: #16a34a; font-size: 13px;">${st.name}</b><br/>
          <span>Capital: ${st.capital}</span><br/>
          <span style="color: #475569;">Cultivos: ${st.mainCrops.slice(0, 2).join(', ')}</span>
        </div>`,
        { permanent: false, direction: 'center' }
      );

      group.addLayer(rect);
    });

    // Marcadores de Municipios del Estado Seleccionado
    const munis = getMunicipalitiesByState(currentStId);
    munis.forEach((muni) => {
      const isMuniSelected = currentMuniId && currentMuniId.toLowerCase() === muni.id.toLowerCase();
      const marker = L.circleMarker(muni.center, {
        radius: isMuniSelected ? 9 : 6,
        color: isMuniSelected ? '#38bdf8' : '#facc15',
        fillColor: isMuniSelected ? '#0284c7' : '#eab308',
        fillOpacity: 0.9,
        weight: isMuniSelected ? 3 : 2,
      });

      marker.on('click', () => {
        if (callbacksRef.current.onSelectMunicipality) {
          callbacksRef.current.onSelectMunicipality(muni.id);
        }
      });

      marker.bindPopup(`
        <div style="font-family: system-ui, sans-serif; font-size: 12px; color: #0f172a; min-width: 190px; line-height: 1.4;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <h4 style="margin: 0; color: #0369a1; font-size: 13px;">🏛️ ${muni.name}</h4>
            <span style="background: #e0f2fe; color: #0369a1; padding: 1px 6px; border-radius: 4px; font-weight: 700; font-size: 10px;">pH ${muni.avgPh}</span>
          </div>
          <p style="margin: 0 0 2px 0;"><b>Capital:</b> ${muni.capital}</p>
          <p style="margin: 0 0 2px 0;"><b>Suelo:</b> ${muni.soilTexture}</p>
          <p style="margin: 0 0 4px 0;"><b>Cultivos Clave:</b> ${muni.mainCrops.join(', ')}</p>
          <p style="margin: 0; font-size: 11px; color: #475569; border-top: 1px solid #e2e8f0; padding-top: 4px;">${muni.agriculturalHighlights}</p>
        </div>
      `);

      group.addLayer(marker);
    });

    // Muestras Edafológicas
    if (activeLayer === 'ph' || activeLayer === 'mapbiomas' || activeLayer === 'satellite') {
      const statePoints = VENEZUELA_SOIL_POINTS.filter(
        (p) => p.stateId.toLowerCase() === currentStId.toLowerCase()
      );
      statePoints.forEach((point) => {
        let phColor = '#22c55e';
        if (point.ph < 5.5) phColor = '#ef4444';
        else if (point.ph < 6.0) phColor = '#f59e0b';
        else if (point.ph > 7.5) phColor = '#3b82f6';

        const sampleMarker = L.circleMarker([point.lat, point.lng], {
          radius: 5,
          color: '#ffffff',
          fillColor: phColor,
          fillOpacity: 0.9,
          weight: 1.5,
        });

        sampleMarker.bindTooltip(
          `<div style="font-family: system-ui, sans-serif; font-size: 11px;">
            <b>Muestra Edafológica</b><br/>
            pH: <span style="color:${phColor}; font-weight:700;">${point.ph}</span> | ${point.texture}<br/>
            Materia Orgánica: ${point.organicMatter}%
          </div>`,
          { direction: 'top' }
        );

        group.addLayer(sampleMarker);
      });
    }
  }, [currentStId, currentMuniId, activeLayer, isMapReady]);

  // 5. Gestión del estado de dibujo
  useEffect(() => {
    if (!isDrawing && drawingLayerGroupRef.current) {
      drawingLayerGroupRef.current.clearLayers();
      setDrawnPoints([]);
    }
  }, [isDrawing]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '660px' }}>
      <div
        id="leaflet_map_container"
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '660px',
          background: '#0b1329',
          zIndex: 1,
        }}
      />
    </div>
  );
}
