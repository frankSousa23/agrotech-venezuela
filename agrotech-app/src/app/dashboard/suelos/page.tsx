"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import SoilModal from '@/components/forms/SoilModal';

export default function SuelosPage() {
  const [soils, setSoils] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchSoils = () => {
    setLoading(true);
    fetch('/api/soils')
      .then(res => res.json())
      .then(data => {
        setSoils(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSoils();
  }, []);

  const handleExport = (format: string) => {
    window.location.href = `/api/export/stats?format=${format}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Perfiles Edafológicos</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button className="btn-secondary" onClick={() => handleExport('csv')} title="Descargar como CSV">
            <span>⬇</span> CSV
          </button>
          <button className="btn-secondary" onClick={() => handleExport('excel')} title="Descargar como Excel">
            <span>⬇</span> Excel
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <span>+</span> Añadir Muestra
          </button>
        </div>
      </header>

      {showModal && (
        <SoilModal 
          onClose={() => setShowModal(false)} 
          onSuccess={() => fetchSoils()} 
        />
      )}
      
      {loading ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p>Cargando datos de suelos...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {soils.length === 0 ? (
            <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center' }}>
              <p>No hay suelos registrados aún.</p>
            </div>
          ) : (
            soils.map((soil: any) => (
              <div key={soil.id} className={`${styles.card} glass-panel`}>
                <div className={styles.cardHeader}>
                  <h2>{soil.name}</h2>
                  {soil.region && <span className={styles.badge}>{soil.region.name}</span>}
                </div>
                
                <p className={styles.description}>{soil.description || 'Sin descripción'}</p>
                
                <div className={styles.statsGrid}>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>pH</span>
                    <span className={styles.statValue}>{soil.ph || '-'}</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>M.O.</span>
                    <span className={styles.statValue}>{soil.organicMatter ? `${soil.organicMatter}%` : '-'}</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>Nitrógeno</span>
                    <span className={styles.statValue}>{soil.nitrogen || '-'}</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>Fósforo</span>
                    <span className={styles.statValue}>{soil.phosphorus || '-'}</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>Potasio</span>
                    <span className={styles.statValue}>{soil.potassium || '-'}</span>
                  </div>
                </div>
                
                {soil.texture && (
                  <div className={styles.textureInfo}>
                    <span>Textura: </span>
                    <strong>{soil.texture}</strong>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
