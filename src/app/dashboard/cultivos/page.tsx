"use client";

import { useEffect, useState, useMemo } from 'react';
import styles from './page.module.css';
import CropModal from '@/components/forms/CropModal';
import { 
  Sprout, 
  Search, 
  Plus, 
  Upload, 
  Droplets, 
  FlaskConical, 
  Leaf
} from 'lucide-react';

export default function CultivosPage() {
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const fetchCrops = () => {
    setLoading(true);
    fetch('/api/crops')
      .then(res => res.json())
      .then(data => {
        setCrops(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
      alert('Error al importar o archivo con formato incompatible');
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const filteredCrops = useMemo(() => {
    return crops.filter((crop: any) => {
      const matchesSearch = 
        crop.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (crop.scientificName && crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (crop.description && crop.description.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesCategory = true;
      if (categoryFilter === 'saf') {
        matchesCategory = crop.name?.toLowerCase().includes('cacao') || 
                          crop.name?.toLowerCase().includes('café') || 
                          crop.name?.toLowerCase().includes('açaí') || 
                          crop.name?.toLowerCase().includes('copoazú');
      } else if (categoryFilter === 'cereales') {
        matchesCategory = crop.name?.toLowerCase().includes('maíz') || 
                          crop.name?.toLowerCase().includes('arroz') || 
                          crop.name?.toLowerCase().includes('sorgo');
      } else if (categoryFilter === 'leguminosas') {
        matchesCategory = crop.name?.toLowerCase().includes('frijol') || 
                          crop.name?.toLowerCase().includes('caraota') || 
                          crop.name?.toLowerCase().includes('soya') ||
                          crop.name?.toLowerCase().includes('quinchoncho');
      }

      return matchesSearch && matchesCategory;
    });
  }, [crops, searchQuery, categoryFilter]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-pill badge-emerald">Catálogo Edafológico</span>
            <span className="badge-pill badge-cyan">42 Variedades Estratégicas</span>
          </div>
          <h1 className={styles.title}>Catálogo de Cultivos & Compatibilidad</h1>
          <p className={styles.subtitle}>
            Parámetros de tolerancia edáfica, rango de pH óptimo y requerimiento hídrico para Venezuela.
          </p>
        </div>

        <div className={styles.headerActions}>
          <label className="btn-secondary" style={{ cursor: 'pointer' }}>
            <Upload size={16} />
            <span>Subir CSV</span>
            <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileUpload} />
          </label>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            <span>Añadir Cultivo</span>
          </button>
        </div>
      </header>

      {/* Barra de Búsqueda y Filtros */}
      <div className={`${styles.filterBar} glass-panel`}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por cultivo, nombre científico o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.categoryPills}>
          <button 
            className={`${styles.pillBtn} ${categoryFilter === 'all' ? styles.pillBtnActive : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            Todos ({crops.length})
          </button>
          <button 
            className={`${styles.pillBtn} ${categoryFilter === 'cereales' ? styles.pillBtnActive : ''}`}
            onClick={() => setCategoryFilter('cereales')}
          >
            🌾 Cereales
          </button>
          <button 
            className={`${styles.pillBtn} ${categoryFilter === 'leguminosas' ? styles.pillBtnActive : ''}`}
            onClick={() => setCategoryFilter('leguminosas')}
          >
            🌱 Leguminosas
          </button>
          <button 
            className={`${styles.pillBtn} ${categoryFilter === 'saf' ? styles.pillBtnActive : ''}`}
            onClick={() => setCategoryFilter('saf')}
          >
            🛡️ SAF / Agroforestal
          </button>
        </div>
      </div>

      {showModal && (
        <CropModal 
          onClose={() => setShowModal(false)} 
          onSuccess={() => fetchCrops()} 
        />
      )}
      
      {loading ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div className={styles.spinner}></div>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Cargando catálogo agronómico...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredCrops.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem 2rem', gridColumn: '1 / -1', textAlign: 'center' }}>
              <Sprout size={48} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>
                No se encontraron cultivos
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                No hay coincidencias para &quot;{searchQuery}&quot;. Intenta otra búsqueda o limpia los filtros.
              </p>
            </div>
          ) : (
            filteredCrops.map((crop: any) => (
              <div key={crop.id} className={`${styles.card} glass-panel`}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cropName}>{crop.name}</h3>
                    <p className={styles.scientificName}>{crop.scientificName || 'Especie tropical'}</p>
                  </div>
                  <div className={styles.cropIconWrapper}>
                    <Leaf size={20} color="#10b981" />
                  </div>
                </div>

                <p className={styles.cropDesc}>
                  {crop.description || 'Cultivo evaluado en la base de datos agronómica de Agrotech Venezuela.'}
                </p>

                <div className={styles.metricsBox}>
                  <div className={styles.metricItem}>
                    <div className={styles.metricLabel}>
                      <FlaskConical size={14} /> Rango pH Óptimo
                    </div>
                    <div className={styles.metricValue} style={{ color: '#059669' }}>
                      {crop.idealPhMin || '5.5'} – {crop.idealPhMax || '7.0'}
                    </div>
                  </div>

                  <div className={styles.metricItem}>
                    <div className={styles.metricLabel}>
                      <Droplets size={14} /> Requerimiento Hídrico
                    </div>
                    <div className={styles.metricValue} style={{ color: '#0284c7' }}>
                      {crop.waterReq || 'Medio (1,200 mm)'}
                    </div>
                  </div>
                </div>

                {/* pH bar visualizer */}
                <div className={styles.phVisualizer}>
                  <div className={styles.phVisualizerLabels}>
                    <span>Ácido (4.5)</span>
                    <span>Neutro (7.0)</span>
                    <span>Alcalino (8.5)</span>
                  </div>
                  <div className={styles.phBarTrack}>
                    <div 
                      className={styles.phBarHighlight}
                      style={{
                        left: `${Math.max(0, (((crop.idealPhMin || 5.5) - 4.5) / 4) * 100)}%`,
                        width: `${Math.min(100, (((crop.idealPhMax || 7.0) - (crop.idealPhMin || 5.5)) / 4) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
