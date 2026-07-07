"use client";

import { useEffect, useState } from 'react';
import styles from '../suelos/page.module.css';

export default function RecomendacionesPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/recomendaciones')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Recomendaciones Agronómicas</h1>
      </header>

      {loading ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p>Analizando compatibilidades...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {recommendations.length === 0 ? (
            <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center' }}>
              <p>No hay recomendaciones generadas en el sistema.</p>
            </div>
          ) : (
            recommendations.map((rec: any) => (
              <div key={rec.id} className={`${styles.card} glass-panel`} style={{
                borderLeft: `4px solid ${
                  rec.suitability === 'Alta' ? '#10b981' : 
                  rec.suitability === 'Media' ? '#f59e0b' : '#ef4444'
                }`
              }}>
                <div className={styles.cardHeader}>
                  <h2>{rec.crop.name} <span style={{fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>en</span> {rec.soil.name}</h2>
                  <span className={styles.badge} style={{
                    background: rec.suitability === 'Alta' ? '#10b981' : 
                                rec.suitability === 'Media' ? '#f59e0b' : '#ef4444'
                  }}>
                    {rec.suitability}
                  </span>
                </div>
                
                <p className={styles.description} style={{ marginTop: '0.5rem' }}>
                  {rec.notes || 'Análisis de compatibilidad estándar.'}
                </p>

                <div className={styles.textureInfo}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}><strong>Requerimiento Hídrico:</strong> {rec.crop.waterReq || 'N/A'}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Ubicación:</strong> {rec.soil.region?.name || 'Región desconocida'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
