"use client";

import { useEffect, useState, useMemo } from 'react';
import styles from './page.module.css';
import SoilModal from '@/components/forms/SoilModal';

export default function SuelosPage() {
  const [soils, setSoils] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [phFilter, setPhFilter] = useState('all');

  const fetchSoils = () => {
    setLoading(true);
    fetch('/api/soils')
      .then(res => res.json())
      .then(data => {
        setSoils(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchSoils();
  }, []);

  const handleExport = (format: string) => {
    window.location.href = `/api/export/stats?format=${format}`;
  };

  const filteredSoils = useMemo(() => {
    return soils.filter(s => {
      const matchesSearch = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.region && s.region.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.texture && s.texture.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesPh = true;
      if (phFilter === 'acid') matchesPh = s.ph && s.ph < 5.5;
      else if (phFilter === 'moderate') matchesPh = s.ph && s.ph >= 5.5 && s.ph <= 6.5;
      else if (phFilter === 'optimal') matchesPh = s.ph && s.ph > 6.5;

      return matchesSearch && matchesPh;
    });
  }, [soils, searchQuery, phFilter]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Perfiles Edafológicos y Muestras de Suelo</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Base científica de análisis fisicoquímicos georreferenciados en el territorio nacional.
          </p>
        </div>
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

      {/* Barra de Filtros y Búsqueda */}
      <div className="glass-panel" style={{ padding: '12px 18px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1, minWidth: '240px' }}>
          <span style={{ fontSize: '1.1rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por nombre, estado, región o textura..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '0.9rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Filtro de pH:</span>
          <select 
            value={phFilter} 
            onChange={(e) => setPhFilter(e.target.value)}
            style={{
              background: 'rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: 'var(--text-main)'
            }}
          >
            <option value="all">Todos los Rangos</option>
            <option value="acid">Muy Ácido (&lt; 5.5)</option>
            <option value="moderate">Moderado (5.5 - 6.5)</option>
            <option value="optimal">Óptimo (&gt; 6.5)</option>
          </select>
        </div>
      </div>

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
          {filteredSoils.length === 0 ? (
            <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '2.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600 }}>No se encontraron perfiles de suelo con los filtros seleccionados.</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Intenta ajustar la búsqueda o añade una nueva muestra científica.
              </p>
            </div>
          ) : (
            filteredSoils.map((soil: any) => (
              <div key={soil.id} className={`${styles.card} glass-panel`}>
                <div className={styles.cardHeader}>
                  <h2>{soil.name}</h2>
                  {soil.region && <span className={styles.badge}>{soil.region.name}</span>}
                </div>
                
                <p className={styles.description}>{soil.description || 'Sin descripción detallada'}</p>
                
                <div className={styles.statsGrid}>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>pH</span>
                    <span className={styles.statValue} style={{
                      color: soil.ph && soil.ph < 5.5 ? '#ef4444' : soil.ph && soil.ph <= 6.5 ? '#f59e0b' : '#10b981'
                    }}>
                      {soil.ph || '-'}
                    </span>
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
