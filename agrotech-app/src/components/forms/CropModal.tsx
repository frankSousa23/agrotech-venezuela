"use client";
import { useState } from 'react';
import styles from './Modal.module.css';

interface CropModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CropModal({ onClose, onSuccess }: CropModalProps) {
  const [formData, setFormData] = useState({ 
    name: '', scientificName: '', idealPhMin: '', idealPhMax: '', waterReq: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          idealPhMin: formData.idealPhMin ? parseFloat(formData.idealPhMin) : null,
          idealPhMax: formData.idealPhMax ? parseFloat(formData.idealPhMax) : null,
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        setError(data.error || "Error al crear el cultivo.");
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
        <h2>Añadir Nuevo Cultivo</h2>
        
        {error && (
          <div style={{ padding: '0.5rem', background: 'rgba(255,0,0,0.1)', color: 'red', borderRadius: '4px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            placeholder="Nombre común (Ej: Maíz)" 
            required 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            placeholder="Nombre Científico (Opcional)" 
            value={formData.scientificName}
            onChange={e => setFormData({...formData, scientificName: e.target.value})} 
          />
          <div className={styles.row}>
            <input 
              type="number" step="0.1" placeholder="pH Min Ideal" 
              value={formData.idealPhMin}
              onChange={e => setFormData({...formData, idealPhMin: e.target.value})} 
            />
            <input 
              type="number" step="0.1" placeholder="pH Max Ideal" 
              value={formData.idealPhMax}
              onChange={e => setFormData({...formData, idealPhMax: e.target.value})} 
            />
          </div>
          <input 
            placeholder="Req. Hídrico (Ej: 500-800 mm)" 
            value={formData.waterReq}
            onChange={e => setFormData({...formData, waterReq: e.target.value})} 
          />
          
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.btnSecondary}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Cultivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
