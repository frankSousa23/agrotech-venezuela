'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MultiLevelMapViewer, { MapLevel } from '@/components/gis/MultiLevelMapViewer';
import styles from './page.module.css';
import { Map, Layers, Sparkles } from 'lucide-react';

function MapaContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state') || 'portuguesa';
  const levelParam = parseInt(searchParams.get('level') || '1', 10) as MapLevel;
  const intentParam = searchParams.get('intent');

  // Pirámide cartográfica unificada continua:
  // Si el usuario viene a trazar parcela (intent=draw) iniciamos en Nivel 3.
  // Si especificó un nivel válido (1-3), lo respetamos. Si vino con ?state= sin nivel, iniciamos en Nivel 2.
  const resolvedLevel: MapLevel = intentParam === 'draw' 
    ? 3 
    : (levelParam >= 1 && levelParam <= 3) 
      ? levelParam 
      : (searchParams.has('state') ? 2 : 1);

  return (
    <div className={styles.mapViewerWrapper}>
      {/* Indicador Superior de Jerarquía Cartográfica Unificada */}
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
          <span style={{ fontWeight: 600, color: '#f8fafc' }}>Pirámide Cartográfica Unificada:</span>
          <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
            1. Nacional (24 Estados) ──► 2. Municipal (Polos Agrícolas) ──► 3. Micro-Parcela Sentinel-2
          </span>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', padding: '4px 10px', borderRadius: '9999px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <Sparkles size={12} /> Navegación Continua Multi-Escala
        </div>
      </div>

      <MultiLevelMapViewer 
        initialLevel={resolvedLevel} 
        initialStateId={stateParam} 
      />
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

