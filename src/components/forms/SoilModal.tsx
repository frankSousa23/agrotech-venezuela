'use client';

import { useState } from 'react';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';

interface SoilModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SoilModal({ isOpen = true, onClose, onSuccess }: SoilModalProps) {
  const [state, setState] = useState('portuguesa');
  const [locationName, setLocationName] = useState('');
  const [lat, setLat] = useState('9.3240');
  const [lng, setLng] = useState('-69.1120');
  const [ph, setPh] = useState('6.2');
  const [om, setOm] = useState('3.2');
  const [texture, setTexture] = useState('Franco-limoso');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/soils', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state,
          locationName,
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          ph: parseFloat(ph),
          organicMatter: parseFloat(om),
          texture
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
        maxWidth: '520px',
        width: '90%',
        color: '#fff'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#38bdf8' }}>🧪 Registrar Muestra Edafológica GPS</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Estado / Región:</label>
            <select
              value={state}
              onChange={e => setState(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
            >
              {VENEZUELA_STATES_DATA.map(st => (
                <option key={st.id} value={st.id}>{st.name} ({st.region})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Nombre de la Finca / Lote:</label>
            <input 
              required
              value={locationName}
              onChange={e => setLocationName(e.target.value)}
              placeholder="ej: Finca La Esperanza - Tablón 4"
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Latitud GPS:</label>
              <input 
                type="number"
                step="0.0001"
                value={lat}
                onChange={e => setLat(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Longitud GPS:</label>
              <input 
                type="number"
                step="0.0001"
                value={lng}
                onChange={e => setLng(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>pH:</label>
              <input 
                type="number"
                step="0.1"
                value={ph}
                onChange={e => setPh(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Materia Orgánica (%):</label>
              <input 
                type="number"
                step="0.1"
                value={om}
                onChange={e => setOm(e.target.value)}
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
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#0284c7', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
            >
              {submitting ? 'Guardando...' : 'Guardar Muestra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
