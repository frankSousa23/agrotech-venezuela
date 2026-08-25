"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { 
  Download, 
  TreePine, 
  Wheat, 
  Tractor, 
  FlaskConical, 
  Leaf, 
  FileSpreadsheet
} from 'lucide-react';

export default function EstadisticasPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredStates = selectedRegion === 'all' 
    ? VENEZUELA_STATES_DATA 
    : VENEZUELA_STATES_DATA.filter(s => s.region.toLowerCase().includes(selectedRegion.toLowerCase()));

  const handleExport = (format: string) => {
    window.location.href = `/api/export/stats?format=${format}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-pill badge-emerald">Telemetría Satelital</span>
            <span className="badge-pill badge-cyan">MapBiomas Colección 3</span>
          </div>
          <h1 className={styles.title}>Analítica Territorial & Geoestadísticas</h1>
          <p className={styles.subtitle}>
            Balance nacional de uso de suelo, transiciones de cobertura vegetal, acidez edafológica y potencial de secuestro de carbono en Venezuela.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button className="btn-secondary" onClick={() => handleExport('csv')}>
            <Download size={16} />
            <span>CSV</span>
          </button>
          <button className="btn-secondary" onClick={() => handleExport('excel')}>
            <FileSpreadsheet size={16} />
            <span>Excel</span>
          </button>
        </div>
      </header>

      {/* Métricas Principales */}
      <div className={styles.metricsGrid}>
        <div className={`${styles.metricCard} glass-panel`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Frontera Agrícola</span>
            <div className={styles.metricIconContainer} style={{ background: 'rgba(233, 116, 237, 0.15)', color: '#d946ef' }}>
              <Tractor size={18} />
            </div>
          </div>
          <div className={styles.metricValue} style={{ color: '#d946ef' }}>
            ~8.4 M ha
          </div>
          <span className={styles.metricSubtext}>Cultivos anuales y perennes</span>
        </div>

        <div className={`${styles.metricCard} glass-panel`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Pastizales & Ganadería</span>
            <div className={styles.metricIconContainer} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Wheat size={18} />
            </div>
          </div>
          <div className={styles.metricValue} style={{ color: '#f59e0b' }}>
            ~21.6 M ha
          </div>
          <span className={styles.metricSubtext}>Mosaicos pecuarios y pasturas</span>
        </div>

        <div className={`${styles.metricCard} glass-panel`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Formaciones Boscosas</span>
            <div className={styles.metricIconContainer} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669' }}>
              <TreePine size={18} />
            </div>
          </div>
          <div className={styles.metricValue} style={{ color: '#059669' }}>
            ~47.8 M ha
          </div>
          <span className={styles.metricSubtext}>52.1% del territorio continental</span>
        </div>

        <div className={`${styles.metricCard} glass-panel`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Déficit de Encalado</span>
            <div className={styles.metricIconContainer} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
              <FlaskConical size={18} />
            </div>
          </div>
          <div className={styles.metricValue} style={{ color: '#ef4444' }}>
            45.2%
          </div>
          <span className={styles.metricSubtext}>Suelos ácidos que requieren cal</span>
        </div>
      </div>

      {/* Gráficas y Balances Comparativos */}
      <div className={styles.chartsGrid}>
        {/* Distribución Agrícola por Estados */}
        <div className={`${styles.chartCard} glass-panel`}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>
              <Tractor size={18} color="#d946ef" />
              <span>Ocupación de Suelo por Estado (%)</span>
            </h3>
            <select 
              className={styles.selectInput}
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">Todas las Regiones</option>
              <option value="Llanos">Los Llanos</option>
              <option value="Andes">Los Andes</option>
              <option value="Central">Central</option>
              <option value="Zuliana">Zuliana</option>
              <option value="Nororiental">Nororiental</option>
            </select>
          </div>

          <div className={styles.legendRow}>
            <span className={styles.legendItem}><span style={{ background: '#d946ef' }}></span> Agrícola</span>
            <span className={styles.legendItem}><span style={{ background: '#f59e0b' }}></span> Pastizales</span>
            <span className={styles.legendItem}><span style={{ background: '#059669' }}></span> Bosques</span>
          </div>

          <div className={styles.stateBarsList}>
            {filteredStates.slice(0, 7).map((st) => {
              const domSoil = st.dominantSoil || st.soilTextureDominant || 'Franco';
              const cover = st.mapbiomasCover || st.mapbiomasCoverPercentage || { agriculture: 25, pasture: 20, forest: 35 };
              return (
                <div key={st.id} className={styles.stateBarItem}>
                  <div className={styles.stateBarHeader}>
                    <a 
                      href={`/dashboard/mapa?state=${st.id}&level=2`} 
                      style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                      title="Explorar este estado en el Visor WebGIS"
                    >
                      <span className={styles.stateName}>📍 {st.name} ({domSoil.split(' ')[0]})</span>
                    </a>
                    <span className={styles.stateMetric}>{cover.agriculture}% Agrícola</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div 
                      className={styles.barFill} 
                      style={{ width: `${cover.agriculture}%`, background: '#d946ef' }} 
                      title={`Agrícola: ${cover.agriculture}%`}
                    />
                    <div 
                      className={styles.barFill} 
                      style={{ width: `${cover.pasture}%`, background: '#f59e0b' }} 
                      title={`Pastos: ${cover.pasture}%`}
                    />
                    <div 
                      className={styles.barFill} 
                      style={{ width: `${cover.forest}%`, background: '#059669' }} 
                      title={`Bosques: ${cover.forest}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Balance Edafológico de Acidez y pH */}
        <div className={`${styles.chartCard} glass-panel`}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>
              <FlaskConical size={18} color="#059669" />
              <span>Balance Nacional de Acidez del Suelo</span>
            </h3>
          </div>

          <div className={styles.phBalanceGrid}>
            <div className={styles.phBox} style={{ borderLeft: '4px solid #ef4444' }}>
              <span className={styles.phBoxLabel}>Muy Ácido (&lt; 5.5 pH)</span>
              <div className={styles.phPercent} style={{ color: '#ef4444' }}>45%</div>
              <span className={styles.phBoxDesc}>
                Sur del Lago, Monagas, Bolívar (Requiere encalado CaCO₃)
              </span>
            </div>

            <div className={styles.phBox} style={{ borderLeft: '4px solid #f59e0b' }}>
              <span className={styles.phBoxLabel}>Ligeramente Ácido (5.5 - 6.5)</span>
              <div className={styles.phPercent} style={{ color: '#f59e0b' }}>30%</div>
              <span className={styles.phBoxDesc}>
                Llanos Occidentales, Barinas, Cojedes
              </span>
            </div>

            <div className={styles.phBox} style={{ borderLeft: '4px solid #10b981' }}>
              <span className={styles.phBoxLabel}>Óptimo / Neutro (6.5 - 7.5)</span>
              <div className={styles.phPercent} style={{ color: '#10b981' }}>20%</div>
              <span className={styles.phBoxDesc}>
                Portuguesa (Turén), Valles de Aragua / Carabobo
              </span>
            </div>

            <div className={styles.phBox} style={{ borderLeft: '4px solid #0284c7' }}>
              <span className={styles.phBoxLabel}>Alcalino / Calcáreo (&gt; 7.5)</span>
              <div className={styles.phPercent} style={{ color: '#0284c7' }}>5%</div>
              <span className={styles.phBoxDesc}>
                Valle de Quíbor (Lara), Costas de Falcón
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Huella de Carbono y Sostenibilidad Agroambiental */}
      <div className={`${styles.carbonCard} glass-panel`}>
        <div className={styles.carbonContent}>
          <div className="badge-pill badge-emerald">
            <Leaf size={14} /> SOSTENIBILIDAD & IMPACTO AMBIENTAL
          </div>
          <h3 className={styles.carbonTitle}>
            Potencial de Captura de Carbono en Suelos Venezolanos
          </h3>
          <p className={styles.carbonDesc}>
            La transición de pasturas degradadas hacia sistemas silvopastoriles y cultivos agroforestales 
            (como <strong>Cacao Criollo de Sombra</strong> en Chuao y Barlovento o <strong>Café de Especialidad</strong> en Mérida) 
            permite capturar entre <strong>2.5 y 4.8 toneladas de CO₂ por hectárea/año</strong>.
          </p>
        </div>

        <div className={styles.carbonMetricBox}>
          <div className={styles.carbonMetricNumber}>+3.2 M</div>
          <span className={styles.carbonMetricSubtext}>
            Toneladas de CO₂ eq/año capturables mediante enmiendas orgánicas y manejo regenerativo
          </span>
        </div>
      </div>
    </div>
  );
}
