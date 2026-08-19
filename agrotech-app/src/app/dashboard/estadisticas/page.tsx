"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { VENEZUELA_STATES_DATA, MAPBIOMAS_CLASSES } from '@/lib/geo/venezuelaData';

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
          <h1 className={styles.title}>Analítica Territorial & Geoestadísticas</h1>
          <p className={styles.subtitle}>
            Balance nacional de uso de suelo MapBiomas, acidez edafológica y potencial productivo de Venezuela.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" onClick={() => handleExport('csv')}>
            <span>⬇</span> Exportar CSV
          </button>
          <button className="btn-secondary" onClick={() => handleExport('excel')}>
            <span>⬇</span> Exportar Excel
          </button>
        </div>
      </header>

      {/* Métricas Principales */}
      <div className={styles.metricsGrid}>
        <div className={`${styles.metricCard} glass-panel`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Frontera Agrícola</span>
            <span>🚜</span>
          </div>
          <div className={styles.metricValue} style={{ color: '#e974ed' }}>
            ~8.4 M ha
          </div>
          <span className={styles.metricSubtext}>Cultivos anuales y perennes</span>
        </div>

        <div className={`${styles.metricCard} glass-panel`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Pastizales & Ganadería</span>
            <span>🌾</span>
          </div>
          <div className={styles.metricValue} style={{ color: '#ffd966' }}>
            ~21.6 M ha
          </div>
          <span className={styles.metricSubtext}>Mosaicos pecuarios y pasturas</span>
        </div>

        <div className={`${styles.metricCard} glass-panel`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Formaciones Boscosas</span>
            <span>🌳</span>
          </div>
          <div className={styles.metricValue} style={{ color: '#129912' }}>
            ~47.8 M ha
          </div>
          <span className={styles.metricSubtext}>52.1% del territorio nacional</span>
        </div>

        <div className={`${styles.metricCard} glass-panel`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Déficit de Encalado</span>
            <span>🧪</span>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className={styles.chartTitle}>
              <span>🚜</span> Ocupación Agrícola por Estado (%)
            </h3>
            <select 
              style={{
                background: 'rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.8rem'
              }}
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

          <div className={styles.stateBarsList}>
            {filteredStates.slice(0, 7).map((st) => (
              <div key={st.id} className={styles.stateBarItem}>
                <div className={styles.stateBarHeader}>
                  <span>{st.name} ({st.dominantSoil.split(' ')[0]})</span>
                  <span style={{ color: 'var(--primary)' }}>{st.mapbiomasCover.agriculture}% Agrícola</span>
                </div>
                <div className={styles.barTrack}>
                  <div 
                    className={styles.barFill} 
                    style={{ width: `${st.mapbiomasCover.agriculture}%`, background: '#e974ed' }} 
                    title={`Agrícola: ${st.mapbiomasCover.agriculture}%`}
                  />
                  <div 
                    className={styles.barFill} 
                    style={{ width: `${st.mapbiomasCover.pasture}%`, background: '#ffd966' }} 
                    title={`Pastos: ${st.mapbiomasCover.pasture}%`}
                  />
                  <div 
                    className={styles.barFill} 
                    style={{ width: `${st.mapbiomasCover.forest}%`, background: '#129912' }} 
                    title={`Bosques: ${st.mapbiomasCover.forest}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Balance Edafológico de Acidez y pH */}
        <div className={`${styles.chartCard} glass-panel`}>
          <h3 className={styles.chartTitle}>
            <span>🧪</span> Balance de Acidez del Suelo en Venezuela
          </h3>

          <div className={styles.phBalanceGrid}>
            <div className={styles.phBox} style={{ borderLeft: '4px solid #ef4444' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Muy Ácido (&lt; 5.5 pH)</span>
              <div className={styles.phPercent} style={{ color: '#ef4444' }}>45%</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Sur del Lago, Monagas, Bolívar (Requiere encalado)
              </span>
            </div>

            <div className={styles.phBox} style={{ borderLeft: '4px solid #f59e0b' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ligeramente Ácido (5.5 - 6.5)</span>
              <div className={styles.phPercent} style={{ color: '#f59e0b' }}>30%</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Llanos Occidentales, Barinas, Cojedes
              </span>
            </div>

            <div className={styles.phBox} style={{ borderLeft: '4px solid #10b981' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Óptimo / Neutro (6.5 - 7.5)</span>
              <div className={styles.phPercent} style={{ color: '#10b981' }}>20%</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Portuguesa (Turén), Valles de Aragua/Carabobo
              </span>
            </div>

            <div className={styles.phBox} style={{ borderLeft: '4px solid #3b82f6' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Alcalino / Calcáreo (&gt; 7.5)</span>
              <div className={styles.phPercent} style={{ color: '#3b82f6' }}>5%</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Valle de Quíbor (Lara), Costas de Falcón
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Huella de Carbono y Sostenibilidad Agroambiental */}
      <div className={styles.carbonCard}>
        <div>
          <span style={{ background: '#059669', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
            🌿 SOSTENIBILIDAD & IMPACTO AMBIENTAL
          </span>
          <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.25rem' }}>
            Potencial de Captura de Carbono en Suelos Venezolanos
          </h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', opacity: 0.9 }}>
            La transición de pasturas degradadas hacia sistemas silvopastoriles y cultivos agroforestales 
            (como <strong>Cacao Criollo de Sombra</strong> en Chuao y Barlovento o <strong>Café de Especialidad</strong> en Mérida) 
            permite capturar entre <strong>2.5 y 4.8 toneladas de $CO_2$ por hectárea/año</strong>.
          </p>
        </div>

        <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
            +3.2 M
          </div>
          <span style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>
            Ton $CO_2$ eq/año capturables mediante enmiendas orgánicas
          </span>
        </div>
      </div>
    </div>
  );
}
