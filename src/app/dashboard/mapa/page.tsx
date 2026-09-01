'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import VenezuelaStateMapViewer from '@/components/gis/VenezuelaStateMapViewer';
import MultiLevelMapViewer, { MapLevel } from '@/components/gis/MultiLevelMapViewer';
import styles from './page.module.css';
import { Map, Layers, Sparkles } from 'lucide-react';

function MapaContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state') || 'portuguesa';
  const levelParam = parseInt(searchParams.get('level') || '1', 10) as MapLevel;
  const intentParam = searchParams.get('intent');
  const initialMode = (searchParams.get('mode') === 'multilevel' || intentParam === 'draw') ? 'multilevel' : 'state';
  const [activeMode, setActiveMode] = useState<'state' | 'multilevel'>(initialMode);

  return (
    <div className={styles.mapViewerWrapper}>
      {/* Selector de Modo de Visualización */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '8px 14px',
        marginBottom: '12px',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#94a3b8' }}>
          <Layers size={16} color="#22c55e" />
          <span style={{ fontWeight: 600, color: '#f8fafc' }}>Modo Cartográfico:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            id="btn_mode_state_explorer"
            onClick={() => setActiveMode('state')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: activeMode === 'state' ? '#16a34a' : '#1e293b',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: activeMode === 'state' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            🇻🇪 Explorador Estatal (24 Estados)
          </button>

          <button
            id="btn_mode_multilevel"
            onClick={() => setActiveMode('multilevel')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: activeMode === 'multilevel' ? '#2563eb' : '#1e293b',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: activeMode === 'multilevel' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            🛰️ Multi-Escala & Delimitación de Parcelas (Niveles 1-2-3)
          </button>
        </div>
      </div>

      {activeMode === 'state' ? (
        <VenezuelaStateMapViewer initialStateId={stateParam} />
      ) : (
        <MultiLevelMapViewer 
          initialLevel={(levelParam >= 1 && levelParam <= 3) ? levelParam : 1} 
          initialStateId={stateParam} 
        />
      )}
    </div>
  );
}

export default function MapaPage() {
  return (
    <div className={styles.mapPageContainer}>
      <div className={styles.mapHeader}>
        <div>
          <h1 className={styles.headerTitle}>
            <Map size={28} color="#22c55e" />
            Visor WebGIS Multi-Escala de Venezuela
          </h1>
          <p className={styles.headerSubtitle}>
            Exploración cartográfica continua: Nivel 1 (Nacional) ➔ Nivel 2 (Municipios Agrícolas) ➔ Nivel 3 (Micro-Parcela Sentinel-2)
          </p>
        </div>
      </div>

      {/* KPI Stats Rápidos */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiIcon} style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80' }}>
            🇻🇪
          </div>
          <div>
            <div className={styles.kpiValue}>24</div>
            <div className={styles.kpiLabel}>Estados Georreferenciados</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIcon} style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            🏛️
          </div>
          <div>
            <div className={styles.kpiValue}>335</div>
            <div className={styles.kpiLabel}>Municipios y Polos Agrícolas</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIcon} style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>
            🛰️
          </div>
          <div>
            <div className={styles.kpiValue}>10m</div>
            <div className={styles.kpiLabel}>Resolución Sentinel-2 L2A</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIcon} style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
            📈
          </div>
          <div>
            <div className={styles.kpiValue}>40 Años</div>
            <div className={styles.kpiLabel}>Trayectoria LULC MapBiomas</div>
          </div>
        </div>
      </div>

      {/* Contenedor del Visor con Suspense */}
      <Suspense fallback={
        <div style={{ padding: '3rem', textAlign: 'center', color: '#4ade80', background: '#0b1329', borderRadius: '16px' }}>
          🛰️ Cargando Visor WebGIS Multi-Escala...
        </div>
      }>
        <MapaContent />
      </Suspense>
    </div>
  );
}

