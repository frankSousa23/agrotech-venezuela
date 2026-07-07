"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import CropModal from '@/components/forms/CropModal';

export default function CultivosPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchCrops = () => {
    setLoading(true);
    fetch('/api/crops')
      .then(res => res.json())
      .then(data => {
        setCrops(data);
        setLoading(false);
      });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/import/crops', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      alert('Cultivos importados con éxito');
      fetchCrops();
    } else {
      alert('Error al importar o permisos insuficientes');
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Catálogo de Cultivos</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label className="btn-secondary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <span>📁</span> Subir CSV
            <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileUpload} />
          </label>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <span>+</span> Añadir Cultivo
          </button>
        </div>
      </header>

      {showModal && (
        <CropModal 
          onClose={() => setShowModal(false)} 
          onSuccess={() => fetchCrops()} 
        />
      )}
      
      {loading ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p>Cargando la base de datos de cultivos...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {crops.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', gridColumn: '1 / -1', textAlign: 'center' }}>
              <p>No hay cultivos registrados todavía en la base de datos.</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Utiliza el botón "Añadir Cultivo" para agregar el primero.</p>
            </div>
          ) : (
            crops.map((crop: any) => (
              <div key={crop.id} className={`${styles.card} glass-panel`}>
                <h3>{crop.name}</h3>
                <p className={styles.scientificName}>{crop.scientificName || 'Nombre científico no especificado'}</p>
                <p>{crop.description}</p>
                <div className={styles.metrics}>
                  <span>pH Ideal: {crop.idealPhMin || '?'} - {crop.idealPhMax || '?'}</span>
                  <span>Agua: {crop.waterReq || 'N/A'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
