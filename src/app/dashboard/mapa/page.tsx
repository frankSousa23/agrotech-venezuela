'use client';

import MultiLevelMapViewer from '@/components/gis/MultiLevelMapViewer';
import styles from './page.module.css';
import { Map, Layers, Compass, Sprout, Satellite } from 'lucide-react';

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

      {/* Contenedor del Visor */}
      <div className={styles.mapViewerWrapper}>
        <MultiLevelMapViewer initialLevel={1} initialStateId="portuguesa" />
      </div>
    </div>
  );
}
