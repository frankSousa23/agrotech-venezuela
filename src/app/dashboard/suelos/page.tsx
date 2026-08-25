"use client";

import { useEffect, useState, useMemo } from 'react';
import styles from './page.module.css';
import SoilModal from '@/components/forms/SoilModal';
import { 
  FlaskConical, 
  Search, 
  Plus, 
  Download, 
  FileSpreadsheet, 
  MapPin, 
  Filter
} from 'lucide-react';

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
        setSoils(Array.isArray(data) ? data : []);
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
          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-pill badge-amber">Edafología Nacional</span>
            <span className="badge-pill badge-emerald">1,245 Perfiles Georreferenciados</span>
          </div>
          <h1 className={styles.title}>Perfiles Edafológicos & Muestras de Suelo</h1>
          <p className={styles.subtitle}>
            Registro de fertilidad química, pH, textura y niveles de Materia Orgánica en las regiones agrícolas de Venezuela.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button className="btn-secondary" onClick={() => handleExport('csv')} title="Descargar como CSV">
            <Download size={16} />
            <span>CSV</span>
          </button>
          <button className="btn-secondary" onClick={() => handleExport('excel')} title="Descargar como Excel">
            <FileSpreadsheet size={16} />
            <span>Excel</span>
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            <span>Añadir Muestra</span>
          </button>
        </div>
      </header>

      {/* Barra de Filtros y Búsqueda */}
      <div className={`${styles.filterBar} glass-panel`}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, estado, región o textura..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterControls}>
          <Filter size={16} color="var(--text-muted)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Rango de pH:</span>
          <select 
            value={phFilter} 
            onChange={(e) => setPhFilter(e.target.value)}
            className={styles.selectInput}
          >
            <option value="all">Todos los Rangos</option>
            <option value="acid">Muy Ácido (&lt; 5.5)</option>
            <option value="moderate">Moderadamente Ácido (5.5 - 6.5)</option>
            <option value="optimal">Óptimo / Neutro (&gt; 6.5)</option>
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
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div className={styles.spinner}></div>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Cargando datos edafológicos...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredSoils.length === 0 ? (
            <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '3.5rem 2rem', textAlign: 'center' }}>
              <FlaskConical size={48} color="#8c5836" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>
                No se encontraron perfiles de suelo
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                No hay muestras que coincidan con los filtros actuales. Prueba modificando los parámetros.
              </p>
            </div>
          ) : (
            filteredSoils.map((soil: any) => {
              const isAcid = soil.ph && soil.ph < 5.5;
              const isModerate = soil.ph && soil.ph >= 5.5 && soil.ph <= 6.5;

              return (
                <div key={soil.id} className={`${styles.card} glass-panel`}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2 className={styles.soilName}>{soil.name}</h2>
                      {soil.region && (
                        <div className={styles.regionBadge}>
                          <MapPin size={12} />
                          <span>{soil.region.name}</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.phBadge} style={{
                      background: isAcid ? 'rgba(239, 68, 68, 0.12)' : isModerate ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                      color: isAcid ? '#ef4444' : isModerate ? '#f59e0b' : '#059669',
                      border: `1px solid ${isAcid ? 'rgba(239, 68, 68, 0.3)' : isModerate ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                    }}>
                      pH {soil.ph || '-'}
                    </div>
                  </div>
                  
                  <p className={styles.description}>{soil.description || 'Sin descripción técnica registrada.'}</p>
                  
                  <div className={styles.statsGrid}>
                    <div className={styles.statBox}>
                      <span className={styles.statLabel}>M. Orgánica</span>
                      <span className={styles.statValue}>{soil.organicMatter ? `${soil.organicMatter}%` : '-'}</span>
                    </div>
                    <div className={styles.statBox}>
                      <span className={styles.statLabel}>Nitrógeno (N)</span>
                      <span className={styles.statValue}>{soil.nitrogen || '-'}</span>
                    </div>
                    <div className={styles.statBox}>
                      <span className={styles.statLabel}>Fósforo (P)</span>
                      <span className={styles.statValue}>{soil.phosphorus || '-'}</span>
                    </div>
                    <div className={styles.statBox}>
                      <span className={styles.statLabel}>Potasio (K)</span>
                      <span className={styles.statValue}>{soil.potassium || '-'}</span>
                    </div>
                  </div>
                  
                  {soil.texture && (
                    <div className={styles.textureInfo}>
                      <span className={styles.textureLabel}>Textura edafológica:</span>
                      <strong className={styles.textureValue}>{soil.texture}</strong>
                    </div>
                  )}

                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <a
                      href={`/dashboard/mapa?state=${soil.region?.name ? soil.region.name.toLowerCase() : 'portuguesa'}&level=2`}
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--primary-accent)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <MapPin size={13} /> Ver Mapa Regional WebGIS ➔
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
