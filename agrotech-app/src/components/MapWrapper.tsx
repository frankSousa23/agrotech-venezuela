"use client";

import dynamic from 'next/dynamic';

// Importar el mapa dinámicamente deshabilitando SSR para evitar errores de 'window is not defined'
const InteractiveMap = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc', borderRadius: '16px' }}>Cargando mapa interactivo...</div>
});

export default InteractiveMap;
