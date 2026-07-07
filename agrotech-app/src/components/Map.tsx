"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './Map.module.css';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Coordenadas centrales de Venezuela
const VENEZUELA_CENTER: [number, number] = [7.5218, -66.5897];

export default function InteractiveMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={styles.mapPlaceholder}>Cargando mapa...</div>;

  return (
    <div className={styles.mapWrapper}>
      <MapContainer 
        center={VENEZUELA_CENTER} 
        zoom={6} 
        scrollWheelZoom={true} 
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marcador de Ejemplo */}
        <Marker position={[10.4806, -66.9036]} icon={icon}>
          <Popup>
            <b>Caracas</b> <br /> Oficina Central Agrotech
          </Popup>
        </Marker>
        
        {/* Polígono de Ejemplo: Representando una región edafológica (Zulia) */}
        <Polygon 
          positions={[
            [11.0, -71.5],
            [11.0, -71.0],
            [9.0, -71.0],
            [9.0, -72.0],
            [10.0, -72.5]
          ]} 
          color="#2d4c3b" 
          fillColor="#3e6b52" 
          fillOpacity={0.4}
        >
          <Popup>
            <b>Suelos del Zulia</b> <br /> Alta humedad, textura franco-arcillosa.
          </Popup>
        </Polygon>
      </MapContainer>
    </div>
  );
}
