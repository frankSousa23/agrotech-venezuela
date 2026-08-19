"use client";

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polygon, Polyline, CircleMarker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './MapBiomasViewer.module.css';
import { 
  VENEZUELA_STATES_DATA, 
  SAMPLE_SOIL_POINTS, 
  MAPBIOMAS_CLASSES, 
  SOIL_PH_RANGES,
  StateGeoData,
  SoilSamplePoint 
} from '@/lib/geo/venezuelaData';
import { VENEZUELA_GEOJSON } from '@/lib/geo/venezuelaGeoJson';
import { 
  ParcelGeometry, 
  calculatePolygonAreaHa, 
  calculatePolygonPerimeterMeters, 
  calculateCentroid, 
  detectStateFromCoords 
} from '@/lib/geo/spatialUtils';
import ParcelDiagnosticModal from './ParcelDiagnosticModal';

// Coordenadas centrales de Venezuela y límites geográficos
const VENEZUELA_CENTER: [number, number] = [7.85, -66.5];
const DEFAULT_ZOOM = 6;

// Icono personalizado para puntos de muestreo de suelo (Leaflet)
const soilMarkerIcon = L.divIcon({
  className: 'custom-soil-marker',
  html: `
    <div style="
      background: #10b981;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.8), 0 2px 6px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: white;
      cursor: pointer;
    ">🌱</div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});

// Proveedores de Mapas Base
const BASE_MAPS = {
  satellite: {
    name: '🛰️ Satélite Esri HD',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics'
  },
  dark: {
    name: '🌙 CartoDB Oscuro',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  },
  topo: {
    name: '⛰️ Relieve Topográfico',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap (CC-BY-SA)'
  },
  street: {
    name: '🗺️ OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  }
};

// Componente para controlar el zoom/centrado del mapa de forma reactiva
function MapViewController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2, easeLinearity: 0.25 });
  }, [center, zoom, map]);
  return null;
}

// Componente para rastrear eventos del cursor y dibujo en el mapa
function MapEventHandler({ 
  onMove, 
  isDrawing, 
  onAddPoint 
}: { 
  onMove: (lat: number, lng: number) => void;
  isDrawing: boolean;
  onAddPoint: (point: [number, number]) => void;
}) {
  useMapEvents({
    mousemove(e) {
      onMove(e.latlng.lat, e.latlng.lng);
    },
    click(e) {
      if (isDrawing) {
        onAddPoint([e.latlng.lat, e.latlng.lng]);
      }
    }
  });
  return null;
}

export default function MapBiomasViewer() {
  const [mounted, setMounted] = useState(false);
  const [baseMapKey, setBaseMapKey] = useState<keyof typeof BASE_MAPS>('satellite');
  const [activeLayer, setActiveLayer] = useState<'mapbiomas' | 'ph' | 'fertility' | 'rain'>('mapbiomas');
  const [showSamplePoints, setShowSamplePoints] = useState(true);
  const [layerOpacity, setLayerOpacity] = useState(0.65);
  const [selectedState, setSelectedState] = useState<StateGeoData | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<SoilSamplePoint | null>(null);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number }>({ lat: 7.85, lng: -66.5 });
  const [mapCenter, setMapCenter] = useState<[number, number]>(VENEZUELA_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [showLegend, setShowLegend] = useState(true);

  // Estados de Dibujo de Parcelas (Gemelo Digital)
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);
  const [activeParcel, setActiveParcel] = useState<ParcelGeometry | null>(null);
  const [savedParcels, setSavedParcels] = useState<ParcelGeometry[]>([]);

  useEffect(() => {
    setMounted(true);
    setSelectedState(VENEZUELA_STATES_DATA[1]); // Portuguesa por defecto
  }, []);

  // Cálculo en tiempo real del área dibujada
  const currentDrawnAreaHa = useMemo(() => {
    return calculatePolygonAreaHa(drawnPoints);
  }, [drawnPoints]);

  // Estilos dinámicos para los polígonos GeoJSON
  const getFeatureStyle = (feature: any) => {
    const props = feature?.properties;
    const isSelected = selectedState?.id === props?.id;
    let fillColor = '#10b981';

    if (activeLayer === 'mapbiomas') {
      const cover = props?.mapbiomasCover;
      if (cover) {
        if (cover.forest > 50) fillColor = '#129912';
        else if (cover.pasture > 35) fillColor = '#ffd966';
        else if (cover.agriculture > 20) fillColor = '#e974ed';
        else if (cover.savanna > 15) fillColor = '#bbfcac';
        else fillColor = '#3e6b52';
      }
    } else if (activeLayer === 'ph') {
      const ph = props?.avgPh || 6.0;
      if (ph < 5.5) fillColor = '#ef4444';
      else if (ph <= 6.5) fillColor = '#f59e0b';
      else if (ph <= 7.5) fillColor = '#10b981';
      else fillColor = '#3b82f6';
    } else if (activeLayer === 'fertility') {
      const fertility = props?.fertilityLevel;
      if (fertility === 'Alta') fillColor = '#10b981';
      else if (fertility === 'Media') fillColor = '#eab308';
      else fillColor = '#f97316';
    } else if (activeLayer === 'rain') {
      const rain = props?.annualRainfallMm || 1200;
      if (rain > 1800) fillColor = '#0284c7';
      else if (rain > 1200) fillColor = '#38bdf8';
      else fillColor = '#cbd5e1';
    }

    return {
      fillColor: fillColor,
      weight: isSelected ? 3 : 1.5,
      opacity: 1,
      color: isSelected ? '#34d399' : '#ffffff',
      dashArray: isSelected ? '' : '3',
      fillOpacity: isSelected ? Math.min(layerOpacity + 0.25, 0.95) : layerOpacity
    };
  };

  const handleStateSelect = (stateId: string) => {
    if (!stateId) {
      setSelectedState(null);
      setMapCenter(VENEZUELA_CENTER);
      setMapZoom(DEFAULT_ZOOM);
      return;
    }
    const stateData = VENEZUELA_STATES_DATA.find(s => s.id === stateId);
    if (stateData) {
      setSelectedState(stateData);
      setMapCenter(stateData.center);
      setMapZoom(7);
    }
  };

  const onEachFeature = (feature: any, layer: L.Layer) => {
    layer.on({
      click: () => {
        if (isDrawing) return;
        const stateId = feature.properties?.id;
        const stateData = VENEZUELA_STATES_DATA.find(s => s.id === stateId);
        if (stateData) {
          setSelectedState(stateData);
          setMapCenter(stateData.center);
          setMapZoom(7);
        }
      },
      mouseover: (e) => {
        if (isDrawing) return;
        const target = e.target;
        target.setStyle({
          weight: 3,
          color: '#34d399',
          fillOpacity: Math.min(layerOpacity + 0.2, 0.95)
        });
      },
      mouseout: (e) => {
        if (isDrawing) return;
        const target = e.target;
        target.setStyle(getFeatureStyle(feature));
      }
    });
  };

  // Manejadores del Dibujo de Parcelas
  const handleAddDrawingPoint = (point: [number, number]) => {
    setDrawnPoints(prev => [...prev, point]);
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setDrawnPoints([]);
    setSelectedState(null);
  };

  const finishDrawing = () => {
    if (drawnPoints.length < 3) {
      alert('Debes marcar al menos 3 puntos en el mapa para delimitar una parcela.');
      return;
    }

    const area = calculatePolygonAreaHa(drawnPoints);
    const perimeter = calculatePolygonPerimeterMeters(drawnPoints);
    const centroid = calculateCentroid(drawnPoints);
    const detectedState = detectStateFromCoords(centroid[0], centroid[1]);

    const newParcel: ParcelGeometry = {
      name: `Parcela Agrícola #${savedParcels.length + 1}`,
      coordinates: drawnPoints,
      areaHectares: area,
      perimeterMeters: perimeter,
      centroid,
      detectedState
    };

    setSavedParcels(prev => [...prev, newParcel]);
    setActiveParcel(newParcel);
    setIsDrawing(false);
    setDrawnPoints([]);
  };

  const cancelDrawing = () => {
    setIsDrawing(false);
    setDrawnPoints([]);
  };

  const resetView = () => {
    setMapCenter(VENEZUELA_CENTER);
    setMapZoom(DEFAULT_ZOOM);
    setSelectedState(null);
    setSelectedPoint(null);
    setIsDrawing(false);
  };

  if (!mounted) {
    return (
      <div className={styles.gisContainer}>
        <div className={styles.mapPlaceholder}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>🛰️ Inicializando Visor WebGIS Agrotech...</p>
            <p style={{ fontSize: '0.85rem', color: '#6ee7b7' }}>Cargando capas satelitales y datos territoriales de Venezuela...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gisContainer}>
      {/* Modal de Diagnóstico de Parcela (Gemelo Digital) */}
      {activeParcel && (
        <ParcelDiagnosticModal 
          parcel={activeParcel} 
          onClose={() => setActiveParcel(null)} 
        />
      )}

      {/* Barra Superior de Herramientas Flotante */}
      <div className={styles.topToolbar}>
        <div className={styles.toolbarGroup}>
          <span className={styles.toolbarLabel}>Capa:</span>
          <select 
            className={styles.selectInput}
            value={activeLayer}
            onChange={(e) => setActiveLayer(e.target.value as any)}
          >
            <option value="mapbiomas">🌱 Coberturas (MapBiomas LULC)</option>
            <option value="ph">🧪 Clasificación de pH Edafológico</option>
            <option value="fertility">⭐ Fertilidad del Suelo</option>
            <option value="rain">🌧️ Precipitación Anual (mm)</option>
          </select>
        </div>

        <div className={styles.toolbarGroup}>
          <span className={styles.toolbarLabel}>Fondo:</span>
          <select 
            className={styles.selectInput}
            value={baseMapKey}
            onChange={(e) => setBaseMapKey(e.target.value as any)}
          >
            {Object.entries(BASE_MAPS).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.toolbarGroup}>
          <span className={styles.toolbarLabel}>Estado:</span>
          <select 
            className={styles.selectInput}
            value={selectedState?.id || ''}
            onChange={(e) => handleStateSelect(e.target.value)}
          >
            <option value="">-- Todo el País --</option>
            {VENEZUELA_STATES_DATA.map(st => (
              <option key={st.id} value={st.id}>{st.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.toolbarGroup}>
          <div className={styles.opacityControl}>
            <span className={styles.toolbarLabel}>Opacidad:</span>
            <input 
              type="range" 
              min="0.1" 
              max="0.9" 
              step="0.05"
              value={layerOpacity}
              onChange={(e) => setLayerOpacity(parseFloat(e.target.value))}
              className={styles.opacitySlider}
            />
            <span style={{ fontSize: '0.75rem', width: '28px' }}>{Math.round(layerOpacity * 100)}%</span>
          </div>
        </div>

        {/* Herramienta de Dibujo y Catastro */}
        <div className={styles.toolbarGroup}>
          {!isDrawing ? (
            <button 
              className={styles.btnAction}
              onClick={startDrawing}
              title="Dibujar polígono de parcela/finca sobre el mapa"
            >
              <span>📐</span> Delimitar Parcela
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                className={styles.btnAction}
                style={{ background: '#10b981' }}
                onClick={finishDrawing}
                disabled={drawnPoints.length < 3}
              >
                <span>✔</span> Finalizar ({drawnPoints.length} pts)
              </button>
              <button 
                className={styles.btnSecondary}
                style={{ background: 'rgba(239, 68, 68, 0.3)', borderColor: '#ef4444' }}
                onClick={cancelDrawing}
              >
                ✕ Cancelar
              </button>
            </div>
          )}

          <button 
            className={showSamplePoints ? styles.btnAction : styles.btnSecondary}
            onClick={() => setShowSamplePoints(!showSamplePoints)}
            title="Activar o desactivar puntos de muestras de suelo GPS"
          >
            <span>📍</span> Puntos GPS ({SAMPLE_SOIL_POINTS.length})
          </button>

          <button 
            className={styles.btnSecondary}
            onClick={resetView}
            title="Centrar mapa en Venezuela"
          >
            <span>🔄</span> Centrar
          </button>
        </div>
      </div>

      {/* HUD Flotante de Instrucciones de Dibujo */}
      {isDrawing && (
        <div style={{
          position: 'absolute',
          top: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1100,
          background: 'rgba(5, 150, 105, 0.95)',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '9999px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
          border: '1px solid #34d399',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span>📍 Haz clic en el mapa satelital para trazar los vértices de tu finca</span>
          {drawnPoints.length >= 3 && (
            <span style={{ background: '#047857', padding: '2px 8px', borderRadius: '6px' }}>
              Área: {currentDrawnAreaHa} ha
            </span>
          )}
        </div>
      )}

      {/* Contenedor del Mapa Leaflet */}
      <div className={styles.mapWrapper}>
        <MapContainer
          center={VENEZUELA_CENTER}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          className={styles.mapElement}
          zoomControl={false}
        >
          <MapViewController center={mapCenter} zoom={mapZoom} />
          <MapEventHandler 
            onMove={(lat, lng) => setCursorCoords({ lat, lng })}
            isDrawing={isDrawing}
            onAddPoint={handleAddDrawingPoint}
          />

          <TileLayer
            key={baseMapKey}
            url={BASE_MAPS[baseMapKey].url}
            attribution={BASE_MAPS[baseMapKey].attribution}
          />

          {/* Polígonos GeoJSON de Estados y Regiones */}
          <GeoJSON
            key={`${activeLayer}-${layerOpacity}-${selectedState?.id || 'all'}`}
            data={VENEZUELA_GEOJSON as any}
            style={getFeatureStyle}
            onEachFeature={onEachFeature}
          />

          {/* Polígono y Vértices en proceso de Dibujo */}
          {drawnPoints.length > 1 && (
            <>
              <Polyline 
                positions={drawnPoints} 
                color="#10b981" 
                weight={3} 
                dashArray="4, 4" 
              />
              {drawnPoints.length >= 3 && (
                <Polygon 
                  positions={drawnPoints} 
                  color="#10b981" 
                  fillColor="#34d399" 
                  fillOpacity={0.35} 
                />
              )}
            </>
          )}

          {drawnPoints.map((pt, idx) => (
            <CircleMarker 
              key={idx} 
              center={pt} 
              radius={6} 
              color="#ffffff" 
              fillColor="#059669" 
              fillOpacity={1} 
              weight={2} 
            />
          ))}

          {/* Parcelas Guardadas previamente */}
          {savedParcels.map((parcel, idx) => (
            <Polygon 
              key={idx} 
              positions={parcel.coordinates} 
              color="#3b82f6" 
              fillColor="#60a5fa" 
              fillOpacity={0.4}
              eventHandlers={{
                click: () => setActiveParcel(parcel)
              }}
            >
              <Popup>
                <div style={{ color: '#1a1a1a', padding: '4px' }}>
                  <strong style={{ color: '#2563eb' }}>{parcel.name}</strong>
                  <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                    Área: <strong>{parcel.areaHectares} ha</strong>
                  </div>
                  <button 
                    style={{
                      marginTop: '6px',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.75rem'
                    }}
                    onClick={() => setActiveParcel(parcel)}
                  >
                    Ver Gemelo Digital
                  </button>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Marcadores de Muestras de Suelo GPS */}
          {showSamplePoints && SAMPLE_SOIL_POINTS.map((sp) => (
            <Marker 
              key={sp.id} 
              position={sp.coords} 
              icon={soilMarkerIcon}
              eventHandlers={{
                click: () => {
                  setSelectedPoint(sp);
                }
              }}
            >
              <Popup>
                <div style={{ color: '#1a1a1a', minWidth: '180px', padding: '4px' }}>
                  <strong style={{ color: '#059669', fontSize: '0.95rem' }}>{sp.farmName}</strong>
                  <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '2px' }}>
                    {sp.municipality}, Edo. {sp.state}
                  </div>
                  <div style={{ margin: '8px 0', borderTop: '1px solid #eee', paddingTop: '6px' }}>
                    <p style={{ margin: '2px 0', fontSize: '0.8rem' }}><strong>Código:</strong> {sp.code}</p>
                    <p style={{ margin: '2px 0', fontSize: '0.8rem' }}><strong>pH:</strong> {sp.ph} | <strong>M.O:</strong> {sp.organicMatter}%</p>
                    <p style={{ margin: '2px 0', fontSize: '0.8rem' }}><strong>Aptitud:</strong> {sp.suitabilityScore}%</p>
                    <p style={{ margin: '2px 0', fontSize: '0.8rem', color: '#047857' }}>
                      <strong>Recomendación:</strong> {sp.recommendedCrop}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Drawer Inspector de Estado Seleccionado */}
      {selectedState && !isDrawing && (
        <div className={styles.inspectorDrawer}>
          <div className={styles.drawerHeader}>
            <div>
              <h3 className={styles.drawerTitle}>Estado {selectedState.name}</h3>
              <div className={styles.drawerSubtitle}>{selectedState.region} • Cap: {selectedState.capital}</div>
            </div>
            <button className={styles.closeBtn} onClick={() => setSelectedState(null)}>✕</button>
          </div>

          {/* Sección Cobertura MapBiomas */}
          <div className={styles.coverSection}>
            <div className={styles.sectionTitle}>
              <span>🌱</span> Cobertura del Suelo (MapBiomas)
            </div>
            <div className={styles.coverStackedBar}>
              <div 
                className={styles.coverSegment} 
                style={{ width: `${selectedState.mapbiomasCover.forest}%`, background: '#129912' }} 
                title={`Bosques: ${selectedState.mapbiomasCover.forest}%`}
              />
              <div 
                className={styles.coverSegment} 
                style={{ width: `${selectedState.mapbiomasCover.pasture}%`, background: '#ffd966' }} 
                title={`Pastizales: ${selectedState.mapbiomasCover.pasture}%`}
              />
              <div 
                className={styles.coverSegment} 
                style={{ width: `${selectedState.mapbiomasCover.agriculture}%`, background: '#e974ed' }} 
                title={`Agricultura: ${selectedState.mapbiomasCover.agriculture}%`}
              />
              <div 
                className={styles.coverSegment} 
                style={{ width: `${selectedState.mapbiomasCover.savanna}%`, background: '#bbfcac' }} 
                title={`Sabanas: ${selectedState.mapbiomasCover.savanna}%`}
              />
              <div 
                className={styles.coverSegment} 
                style={{ width: `${selectedState.mapbiomasCover.water}%`, background: '#0064ff' }} 
                title={`Agua: ${selectedState.mapbiomasCover.water}%`}
              />
            </div>

            <div className={styles.coverLegendList}>
              <div className={styles.coverLegendItem}>
                <span className={styles.colorDot} style={{ background: '#129912' }}></span>
                <span>Bosque: <strong>{selectedState.mapbiomasCover.forest}%</strong></span>
              </div>
              <div className={styles.coverLegendItem}>
                <span className={styles.colorDot} style={{ background: '#ffd966' }}></span>
                <span>Pastos: <strong>{selectedState.mapbiomasCover.pasture}%</strong></span>
              </div>
              <div className={styles.coverLegendItem}>
                <span className={styles.colorDot} style={{ background: '#e974ed' }}></span>
                <span>Agrícola: <strong>{selectedState.mapbiomasCover.agriculture}%</strong></span>
              </div>
              <div className={styles.coverLegendItem}>
                <span className={styles.colorDot} style={{ background: '#bbfcac' }}></span>
                <span>Sabana: <strong>{selectedState.mapbiomasCover.savanna}%</strong></span>
              </div>
            </div>
          </div>

          {/* Ficha Edafológica */}
          <div className={styles.coverSection}>
            <div className={styles.sectionTitle}>
              <span>🧪</span> Perfil Fisicoquímico Promedio
            </div>
            <div className={styles.edaphicGrid}>
              <div className={styles.edaphicBox}>
                <span className={styles.edaphicLabel}>pH Prom.</span>
                <span className={styles.edaphicValue} style={{
                  color: selectedState.avgPh < 5.5 ? '#ef4444' : selectedState.avgPh <= 6.5 ? '#f59e0b' : '#10b981'
                }}>
                  {selectedState.avgPh}
                </span>
              </div>
              <div className={styles.edaphicBox}>
                <span className={styles.edaphicLabel}>M. Orgánica</span>
                <span className={styles.edaphicValue}>{selectedState.organicMatterPct}%</span>
              </div>
              <div className={styles.edaphicBox}>
                <span className={styles.edaphicLabel}>Lluvia Anual</span>
                <span className={styles.edaphicValue}>{selectedState.annualRainfallMm} mm</span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: '4px 0' }}>
              <strong>Orden de Suelo:</strong> {selectedState.dominantSoil}
            </p>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: '4px 0' }}>
              <strong>Textura:</strong> {selectedState.soilTexture}
            </p>
          </div>

          {/* Cultivos Estratégicos */}
          <div className={styles.coverSection}>
            <div className={styles.sectionTitle}>
              <span>🌾</span> Cultivos de Alta Aptitud
            </div>
            <div className={styles.cropsTagContainer}>
              {selectedState.mainCrops.map((crop, i) => (
                <span key={i} className={styles.cropTag}>{crop}</span>
              ))}
            </div>
          </div>

          <button 
            className={styles.btnAction} 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              window.location.href = `/dashboard/recomendaciones?state=${selectedState.id}`;
            }}
          >
            <span>🔬</span> Ver Recomendaciones Detalladas
          </button>
        </div>
      )}

      {/* Leyenda Dinámica Flotante Inferior */}
      <div className={styles.bottomLegend}>
        <div className={styles.legendHeader} onClick={() => setShowLegend(!showLegend)}>
          <span>📑 Leyenda Científica: {
            activeLayer === 'mapbiomas' ? 'Coberturas MapBiomas' :
            activeLayer === 'ph' ? 'Escala de pH del Suelo' :
            activeLayer === 'fertility' ? 'Fertilidad Edafológica' : 'Precipitación'
          }</span>
          <span style={{ fontSize: '0.75rem' }}>{showLegend ? '▼' : '▲'}</span>
        </div>

        {showLegend && (
          <div className={styles.legendItems}>
            {activeLayer === 'mapbiomas' && MAPBIOMAS_CLASSES.map(cls => (
              <div key={cls.id} className={styles.legendItem}>
                <span className={styles.colorDot} style={{ background: cls.color }}></span>
                <span>{cls.name}</span>
              </div>
            ))}

            {activeLayer === 'ph' && SOIL_PH_RANGES.map((rng, i) => (
              <div key={i} className={styles.legendItem}>
                <span className={styles.colorDot} style={{ background: rng.color }}></span>
                <span>{rng.label}</span>
              </div>
            ))}

            {activeLayer === 'fertility' && (
              <>
                <div className={styles.legendItem}>
                  <span className={styles.colorDot} style={{ background: '#10b981' }}></span>
                  <span>Alta Fertilidad (Mollisols/Aluviales)</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.colorDot} style={{ background: '#eab308' }}></span>
                  <span>Fertilidad Media (Inceptisols/Vertisols)</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.colorDot} style={{ background: '#f97316' }}></span>
                  <span>Baja Fertilidad (Ultisols/Oxisols)</span>
                </div>
              </>
            )}

            {activeLayer === 'rain' && (
              <>
                <div className={styles.legendItem}>
                  <span className={styles.colorDot} style={{ background: '#0284c7' }}></span>
                  <span>Alta (&gt; 1800 mm/año)</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.colorDot} style={{ background: '#38bdf8' }}></span>
                  <span>Moderada (1200 - 1800 mm)</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.colorDot} style={{ background: '#cbd5e1' }}></span>
                  <span>Baja (&lt; 1200 mm)</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Barra de Estado Inferior Derecha */}
      <div className={styles.statusBar}>
        <span>Lat: {cursorCoords.lat.toFixed(4)}°</span>
        <span>Lng: {cursorCoords.lng.toFixed(4)}°</span>
        <span>Zoom: {mapZoom}</span>
        <span>Datum: WGS84</span>
      </div>
    </div>
  );
}
