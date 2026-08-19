"use client";

import dynamic from 'next/dynamic';

const MapBiomasViewer = dynamic(() => import('./MapBiomasViewer'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: 'calc(100vh - 120px)',
      minHeight: '620px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#121915',
      borderRadius: '16px',
      color: '#a7f3d0',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🛰️</div>
        <p style={{ fontWeight: 600 }}>Cargando Visor WebGIS Agrotech Venezuela...</p>
        <p style={{ fontSize: '0.85rem', color: '#6ee7b7' }}>Preparando capas MapBiomas y perfiles edáficos</p>
      </div>
    </div>
  )
});

export default function MapBiomasWrapper() {
  return <MapBiomasViewer />;
}
