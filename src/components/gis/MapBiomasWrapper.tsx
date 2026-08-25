'use client';

import dynamic from 'next/dynamic';

const MapBiomasViewer = dynamic(() => import('./MapBiomasViewer'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '520px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(15, 23, 42, 0.6)',
      borderRadius: '12px',
      color: '#4ade80',
      fontWeight: 600,
      fontSize: '0.95rem'
    }}>
      🛰️ Cargando Visor WebGIS y Capas MapBiomas Venezuela...
    </div>
  ),
});

export default function MapBiomasWrapper() {
  return <MapBiomasViewer />;
}
