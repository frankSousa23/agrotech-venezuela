import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={`${styles.header} glass-panel`}>
        <div className={styles.logo}>
          <span>🌱</span>
          Agrotech Venezuela
        </div>
        <nav>
          <button className="btn-secondary">Iniciar Sesión</button>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Información Inteligente de Suelos</h1>
          <p>
            Plataforma integral para agrónomos y productores. Analiza suelos, recibe recomendaciones 
            de cultivos precisas y visualiza estadísticas de producción vegetal en todo el territorio nacional.
          </p>
          <div className={styles.heroButtons}>
            <button className="btn-primary">Explorar Mapa de Suelos</button>
            <button className={`btn-secondary ${styles.outlineBtn}`}>Ver Catálogo de Cultivos</button>
          </div>
        </section>

        <section className={styles.grid}>
          <div className={`${styles.card} glass-panel`}>
            <div className={styles.cardIcon}>🗺️</div>
            <h2>Mapa Interactivo</h2>
            <p>
              Visualiza las regiones edafológicas de Venezuela. Explora polígonos de suelos, 
              capas de nutrientes y cruza datos con variables climáticas locales de manera visual.
            </p>
          </div>
          <div className={`${styles.card} glass-panel`}>
            <div className={styles.cardIcon}>🌾</div>
            <h2>Recomendación Específica</h2>
            <p>
              Algoritmos que cruzan los datos fisicoquímicos de tu suelo (pH, materia orgánica) 
              con requerimientos nutricionales para sugerir los cultivos más rentables.
            </p>
          </div>
          <div className={`${styles.card} glass-panel`}>
            <div className={styles.cardIcon}>📊</div>
            <h2>Dashboards Estadísticos</h2>
            <p>
              Accede a reportes detallados y dashboards de rendimiento de siembras por estado 
              y época del año para tomar mejores decisiones en la producción vegetal.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
