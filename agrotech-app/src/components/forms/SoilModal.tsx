"use client";
import { useState } from 'react';
import styles from './Modal.module.css';

interface SoilModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function SoilModal({ onClose, onSuccess }: SoilModalProps) {
  const [formData, setFormData] = useState({ 
    name: '', description: '', ph: '', organicMatter: '', nitrogen: '', phosphorus: '', potassium: '', texture: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/soils', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ph: formData.ph ? parseFloat(formData.ph) : null,
          organicMatter: formData.organicMatter ? parseFloat(formData.organicMatter) : null,
          nitrogen: formData.nitrogen ? parseFloat(formData.nitrogen) : null,
          phosphorus: formData.phosphorus ? parseFloat(formData.phosphorus) : null,
          potassium: formData.potassium ? parseFloat(formData.potassium) : null,
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        setError(data.error || "Error al registrar el suelo.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} glass-panel`} onClick={e => e.stopPropagation()}>
        <h2>Añadir Muestra de Suelo</h2>
        
        {error && (
          <div style={{ padding: '0.5rem', background: 'rgba(255,0,0,0.1)', color: 'red', borderRadius: '4px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            placeholder="Identificador (Ej: Muestra Lote A)" 
            required 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            placeholder="Descripción / Ubicación" 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})} 
          />
          
          <div className={styles.row}>
            <input 
              type="number" step="0.1" placeholder="Nivel de pH" 
              value={formData.ph}
              onChange={e => setFormData({...formData, ph: e.target.value})} 
            />
            <input 
              type="number" step="0.1" placeholder="Materia Orgánica %" 
              value={formData.organicMatter}
              onChange={e => setFormData({...formData, organicMatter: e.target.value})} 
            />
          </div>

          <div className={styles.row}>
            <input 
              type="number" step="0.1" placeholder="Nitrógeno (N)" 
              value={formData.nitrogen}
              onChange={e => setFormData({...formData, nitrogen: e.target.value})} 
            />
            <input 
              type="number" step="0.1" placeholder="Fósforo (P)" 
              value={formData.phosphorus}
              onChange={e => setFormData({...formData, phosphorus: e.target.value})} 
            />
            <input 
              type="number" step="0.1" placeholder="Potasio (K)" 
              value={formData.potassium}
              onChange={e => setFormData({...formData, potassium: e.target.value})} 
            />
          </div>

          <input 
            placeholder="Textura (Ej: Franco-arcilloso)" 
            value={formData.texture}
            onChange={e => setFormData({...formData, texture: e.target.value})} 
          />
          
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.btnSecondary}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Suelo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
