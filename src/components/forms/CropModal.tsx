'use client';

import { useState } from 'react';

interface CropModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CropModal({ isOpen = true, onClose, onSuccess }: CropModalProps) {
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [phMin, setPhMin] = useState('5.5');
  const [phMax, setPhMax] = useState('7.0');
  const [waterReq, setWaterReq] = useState('Medio (1,200 mm)');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          scientificName,
          idealPhMin: parseFloat(phMin),
          idealPhMax: parseFloat(phMax),
          waterReq
        })
      });
      if (res.ok) {
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '480px',
        width: '90%',
        color: '#fff'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#4ade80' }}>🌱 Añadir Nuevo Cultivo</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Nombre Común:</label>
            <input 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ej: Maíz Blanco Harinero"
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Nombre Científico:</label>
            <input 
              required
              value={scientificName}
              onChange={e => setScientificName(e.target.value)}
              placeholder="ej: Zea mays"
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>pH Mínimo:</label>
              <input 
                type="number"
                step="0.1"
                value={phMin}
                onChange={e => setPhMin(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>pH Máximo:</label>
              <input 
                type="number"
                step="0.1"
                value={phMax}
                onChange={e => setPhMax(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#334155', color: '#fff', cursor: 'pointer' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#16a34a', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
            >
              {submitting ? 'Guardando...' : 'Guardar Cultivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
