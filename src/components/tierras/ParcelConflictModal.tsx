'use client';

import React, { useState } from 'react';
import { ParcelConflict, Parcel } from '@/types/parcel';
import { useUIMode } from '@/lib/context/UIModeContext';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Server, 
  Smartphone, 
  GitMerge, 
  X, 
  Layers, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface ParcelConflictModalProps {
  conflict: ParcelConflict;
  onResolve: (choice: 'keep_server' | 'keep_client' | 'merged', mergedAttributes?: Partial<Parcel>) => Promise<void>;
  onClose: () => void;
}

export default function ParcelConflictModal({ conflict, onResolve, onClose }: ParcelConflictModalProps) {
  const { isFarmerMode } = useUIMode();
  const [resolving, setResolving] = useState(false);
  const [selectedMergeChoice, setSelectedMergeChoice] = useState<'server' | 'client'>('client');
  const [useClientGeometry, setUseClientGeometry] = useState(true);
  const [useClientSoil, setUseClientSoil] = useState(true);

  const server = conflict.serverVersion;
  const client = conflict.clientVersion;

  const handleResolve = async (choice: 'keep_server' | 'keep_client' | 'merged') => {
    try {
      setResolving(true);
      if (choice === 'merged') {
        const merged: Partial<Parcel> = {
          name: client.name || server.name,
          currentCrop: client.currentCrop || server.currentCrop,
          areaHectares: useClientGeometry ? client.areaHectares : server.areaHectares,
          polygonGeoJson: useClientGeometry ? client.polygonGeoJson : server.polygonGeoJson,
          centerLat: useClientGeometry ? client.centerLat : server.centerLat,
          centerLng: useClientGeometry ? client.centerLng : server.centerLng,
          soilTexture: useClientSoil ? (client.soilTexture || server.soilTexture) : server.soilTexture,
          ph: useClientSoil ? (client.ph ?? server.ph) : server.ph,
          organicMatter: useClientSoil ? (client.organicMatter ?? server.organicMatter) : server.organicMatter
        };
        await onResolve('merged', merged);
      } else {
        await onResolve(choice);
      }
    } finally {
      setResolving(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="conflict-title"
    >
      <div 
        style={{
          width: '100%',
          maxWidth: isFarmerMode ? '680px' : '820px',
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
          border: '1px solid rgba(234, 179, 8, 0.4)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(234, 179, 8, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          color: '#f8fafc'
        }}
      >
        {/* Cabecera del Modal */}
        <div 
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(234, 179, 8, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(234, 179, 8, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#facc15'
              }}
            >
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 id="conflict-title" style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#facc15' }}>
                {isFarmerMode 
                  ? 'Compadre, detectamos dos versiones de este lote' 
                  : `Disputa de Concurrencia de Parcela [${conflict.parcelId}]`}
              </h2>
              <p style={{ fontSize: '0.85rem', margin: 0, color: '#94a3b8' }}>
                {isFarmerMode 
                  ? 'Guardaste cambios en campo sin señal y hay una copia previa. ¿Con cuál nos quedamos?' 
                  : `Colisión de versiones detectada al sincronizar: Servidor (v${server.version}) vs Cliente (v${client.version})`}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={resolving}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Cerrar ventana"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido según UI Mode */}
        <div style={{ padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
          {isFarmerMode ? (
            /* Modo Productor Fácil: Comparación de 2 tarjetas táctiles */
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Copia de Campo (Cliente) */}
                <div 
                  style={{
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '2px solid #22c55e',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4ade80', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Smartphone size={14} /> Copia de Campo (Móvil)
                      </span>
                      <span style={{ background: '#16a34a', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                        Más reciente
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#fff' }}>
                      {client.name}
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>📐 Superficie: <b>{client.areaHectares} ha</b></div>
                      <div>🌾 Cultivo: <b>{client.currentCrop || 'No especificado'}</b></div>
                      <div>🌱 Suelo: <b>{client.soilTexture || 'Franco'} (pH {client.ph || 6.2})</b></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleResolve('keep_client')}
                    disabled={resolving}
                    style={{
                      marginTop: '1.25rem',
                      width: '100%',
                      background: '#16a34a',
                      color: '#fff',
                      border: 'none',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)'
                    }}
                  >
                    <CheckCircle2 size={18} /> Guardar la de Campo
                  </button>
                </div>

                {/* Copia de Oficina (Servidor) */}
                <div 
                  style={{
                    background: 'rgba(56, 189, 248, 0.05)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Server size={14} /> Copia de Oficina (Nube)
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#fff' }}>
                      {server.name}
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>📐 Superficie: <b>{server.areaHectares} ha</b></div>
                      <div>🌾 Cultivo: <b>{server.currentCrop || 'No especificado'}</b></div>
                      <div>🌱 Suelo: <b>{server.soilTexture || 'Franco'} (pH {server.ph || 6.2})</b></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleResolve('keep_server')}
                    disabled={resolving}
                    style={{
                      marginTop: '1.25rem',
                      width: '100%',
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    Mantener la de Oficina
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Modo Técnico: Comparador detallado con fusión de atributos */
            <div>
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr 1fr',
                  gap: '8px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ fontWeight: 700, color: '#94a3b8' }}>Parámetro</div>
                <div style={{ fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Server size={14} /> Servidor (v{server.version})
                </div>
                <div style={{ fontWeight: 700, color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Smartphone size={14} /> Local Offline (v{client.version})
                </div>

                <div style={{ color: '#cbd5e1' }}>Nombre del Lote</div>
                <div style={{ color: '#f1f5f9' }}>{server.name}</div>
                <div style={{ color: '#f1f5f9', fontWeight: server.name !== client.name ? 700 : 400 }}>{client.name}</div>

                <div style={{ color: '#cbd5e1' }}>Área (Shoelace ha)</div>
                <div style={{ color: '#f1f5f9' }}>{server.areaHectares} ha</div>
                <div style={{ color: '#f1f5f9', fontWeight: server.areaHectares !== client.areaHectares ? 700 : 400 }}>{client.areaHectares} ha</div>

                <div style={{ color: '#cbd5e1' }}>Centroide [Lat, Lng]</div>
                <div style={{ color: '#f1f5f9', fontFamily: 'monospace' }}>[{server.centerLat.toFixed(4)}, {server.centerLng.toFixed(4)}]</div>
                <div style={{ color: '#f1f5f9', fontFamily: 'monospace' }}>[{client.centerLat.toFixed(4)}, {client.centerLng.toFixed(4)}]</div>

                <div style={{ color: '#cbd5e1' }}>Cultivo Declarado</div>
                <div style={{ color: '#f1f5f9' }}>{server.currentCrop || 'N/A'}</div>
                <div style={{ color: '#f1f5f9' }}>{client.currentCrop || 'N/A'}</div>

                <div style={{ color: '#cbd5e1' }}>Textura & pH</div>
                <div style={{ color: '#f1f5f9' }}>{server.soilTexture || 'Franco'} (pH {server.ph || 6.2})</div>
                <div style={{ color: '#f1f5f9' }}>{client.soilTexture || 'Franco'} (pH {client.ph || 6.2})</div>

                <div style={{ color: '#cbd5e1' }}>Última Edición</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{server.updated_at ? new Date(server.updated_at).toLocaleString('es-VE') : 'N/A'}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{client.updated_at ? new Date(client.updated_at).toLocaleString('es-VE') : 'N/A'}</div>
              </div>

              {/* Controles de Fusión Selectiva */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#facc15', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GitMerge size={16} /> Reglas de Fusión Personalizada (Merge)
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={useClientGeometry} 
                      onChange={e => setUseClientGeometry(e.target.checked)} 
                    />
                    Adoptar geometría y área del cliente móvil
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={useClientSoil} 
                      onChange={e => setUseClientSoil(e.target.checked)} 
                    />
                    Adoptar datos de suelo del cliente móvil
                  </label>
                </div>
              </div>

              {/* Botonera Técnica */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => handleResolve('keep_server')}
                  disabled={resolving}
                  style={{
                    background: 'rgba(148, 163, 184, 0.15)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Conservar Servidor
                </button>
                <button 
                  onClick={() => handleResolve('merged')}
                  disabled={resolving}
                  style={{
                    background: 'rgba(56, 189, 248, 0.2)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.5)',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <GitMerge size={16} /> Aplicar Fusión
                </button>
                <button 
                  onClick={() => handleResolve('keep_client')}
                  disabled={resolving}
                  style={{
                    background: '#16a34a',
                    color: '#fff',
                    border: 'none',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle2 size={16} /> Sobreescribir con Local
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
