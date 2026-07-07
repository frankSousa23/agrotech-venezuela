"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function CultivosPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // En un caso real esto se manejaría con React Query o Next.js Server Components.
  // Aquí usamos fetch para conectarnos a las rutas API (Route Handlers) recién creadas.
  useEffect(() => {
    fetch('/api/crops')
      .then(res => res.json())
      .then(data => {
        setCrops(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Catálogo de Cultivos</h1>
        <button className="btn-primary"><span>+</span> Añadir Cultivo</button>
      </header>
      
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
