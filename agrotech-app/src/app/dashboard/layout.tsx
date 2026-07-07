import styles from './layout.module.css';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={`${styles.sidebar} glass-panel`}>
        <div className={styles.logo}>
          <span>🌱</span> Agrotech
        </div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem}>
            <span>📊</span> Resumen
          </Link>
          <Link href="/dashboard/mapa" className={styles.navItem}>
            <span>🗺️</span> Mapa de Suelos
          </Link>
          <Link href="/dashboard/cultivos" className={styles.navItem}>
            <span>🌾</span> Cultivos
          </Link>
          <Link href="/dashboard/suelos" className={styles.navItem}>
            <span>🧪</span> Suelos
          </Link>
          <Link href="/dashboard/recomendaciones" className={styles.navItem}>
            <span>💡</span> Recomendaciones
          </Link>
          <Link href="/" className={styles.navItem} style={{ marginTop: 'auto' }}>
            <span>🏠</span> Volver a Inicio
          </Link>
        </nav>
      </aside>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  )
}
