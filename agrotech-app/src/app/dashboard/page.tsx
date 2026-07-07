import MapWrapper from '@/components/MapWrapper';
import styles from './page.module.css';

export default function DashboardOverview() {
  return (
    <div className={styles.dashboardOverview}>
      <header className={styles.header}>
        <h1>Panel de Control</h1>
        <p className={styles.subtitle}>Resumen del territorio venezolano y estadísticas de los estudios recientes.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass-panel`}>
          <h3>Muestras de Suelo (Mes)</h3>
          <p className={styles.statNumber} style={{ color: 'var(--primary)' }}>1,245</p>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <h3>Cultivos Recomendados</h3>
          <p className={styles.statNumber} style={{ color: 'var(--secondary)' }}>42</p>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <h3>Regiones Mapeadas</h3>
          <p className={styles.statNumber} style={{ color: 'var(--accent)' }}>24</p>
        </div>
      </div>

      <section className={styles.mapSection}>
        <h2>Mapa Interactivo Regional</h2>
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <MapWrapper />
        </div>
      </section>
    </div>
  )
}
