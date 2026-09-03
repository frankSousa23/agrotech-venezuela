'use client';

import React from 'react';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import styles from './page.module.css';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  FlaskConical, 
  BookOpen, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  Activity,
  Globe,
  Waves,
  TreePine,
  ExternalLink,
  Radio
} from 'lucide-react';

export default function PostulacionPage() {
  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '1rem' }}>
        <BackButton fallbackHref="/dashboard" label="Volver al Dashboard" />
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.badgeRow}>
          <span className={styles.trlBadge}>
            <ShieldCheck size={14} /> Nivel de Madurez TRL 7 (Sistema Validado en Entorno Real)
          </span>
          <span className="badge-pill badge-emerald">
            <CheckCircle2 size={13} /> 144 Tests Automatizados Pasando (93 Jest + 51 Pytest)
          </span>
          <span className="badge-pill badge-cyan">
            <Globe size={13} /> 24 Estados & 335 Municipios Activos
          </span>
          <span className="badge-pill badge-cyan" style={{ border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}>
            <Compass size={13} /> Tour Demo 5 Pasos Disponible
          </span>
        </div>

        <h1 className={styles.title}>
          Ficha Técnica & Perfil Institucional de Postulación
        </h1>
        <p className={styles.subtitle}>
          Memorando técnico, rigor científico, métricas de impacto socioeconómico y guía rápida de evaluación para comités técnicos y evaluadores.
        </p>
      </header>

      {/* Hero Overview */}
      <div className={styles.heroCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', marginBottom: '4px' }}>
              Agrotech Venezuela — Frank Sousa (2026)
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              Inteligencia Edafo-Climática, Observación Satelital e IA Generativa Prescriptiva
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Link 
              href="/docs/MEMORANDO_POSTULACION.md" 
              className="btn-secondary"
              target="_blank"
              style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8', fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <FileText size={15} /> Ver Memorando Markdown
            </Link>
            <Link 
              href="/api-docs" 
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <Cpu size={15} /> Swagger OpenAPI 3.0
            </Link>
          </div>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.kpiBox}>
            <span className={styles.kpiLabel}>Cobertura Territorial</span>
            <span className={styles.kpiValue}>100%</span>
            <span className={styles.kpiMeta}>24 Entidades Federales Continental</span>
          </div>

          <div className={styles.kpiBox}>
            <span className={styles.kpiLabel}>Muestras Edafológicas GPS</span>
            <span className={styles.kpiValue}>1,245</span>
            <span className={styles.kpiMeta}>Perfiles químicos calibrados</span>
          </div>

          <div className={styles.kpiBox}>
            <span className={styles.kpiLabel}>Serie Histórica Satelital</span>
            <span className={styles.kpiValue}>40 Años</span>
            <span className={styles.kpiMeta}>MapBiomas Col 3 (1985–2024)</span>
          </div>

          <div className={styles.kpiBox}>
            <span className={styles.kpiLabel}>Resiliencia Rural</span>
            <span className={styles.kpiValue}>Offline</span>
            <span className={styles.kpiMeta}>Caché SQLite WAL & IndexedDB</span>
          </div>
        </div>
      </div>

      {/* Recorrido Rápido de Evaluación (5 Minutos) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Compass size={22} color="#38bdf8" /> Guía de Evaluación en 5 Minutos para el Jurado
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Ruta paso a paso para auditar la plataforma en vivo (o pulsa <b>🎬 Tour Demo</b> en la barra superior para el recorrido interactivo guiado):
          </span>
        </div>

        <div className={styles.tourGrid}>
          <div className={styles.tourCard}>
            <div>
              <span className={styles.tourStepBadge}>Paso 1 (0:00 - 1:00)</span>
              <h3 className={styles.tourCardTitle}>1. Acceso Sandbox Sin Barreras</h3>
              <p className={styles.tourCardDesc}>
                Explora como invitado sin necesidad de registrarte. Las parcelas y labores se guardan en IndexedDB localmente.
              </p>
            </div>
            <div className={styles.tourCardAction}>
              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}>
                Ir al Dashboard <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className={styles.tourCard}>
            <div>
              <span className={styles.tourStepBadge}>Paso 2 (1:00 - 2:00)</span>
              <h3 className={styles.tourCardTitle}>2. WebGIS Satelital Multi-Escala</h3>
              <p className={styles.tourCardDesc}>
                Visualiza los 3 niveles: 1. Mapa Nacional ➔ 2. Mosaico Municipal ➔ 3. Trazo interactivo de Micro-Parcela con Shoelace Geodésico.
              </p>
            </div>
            <div className={styles.tourCardAction}>
              <Link href="/dashboard/mapa?mode=multilevel&intent=draw" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}>
                Abrir Visor Satelital <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className={styles.tourCard}>
            <div>
              <span className={styles.tourStepBadge}>Paso 3 (2:00 - 3:00)</span>
              <h3 className={styles.tourCardTitle}>3. Simulador & Gemini Territorial</h3>
              <p className={styles.tourCardDesc}>
                Ajusta los sliders de pH y materia orgánica para observar el cálculo reactivo de encalado NPK y consultar al agente de IA.
              </p>
            </div>
            <div className={styles.tourCardAction}>
              <Link href="/dashboard/recomendaciones" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}>
                Probar Simulador <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className={styles.tourCard}>
            <div>
              <span className={styles.tourStepBadge}>Paso 4 (3:00 - 3:45)</span>
              <h3 className={styles.tourCardTitle}>4. Laboratorio Agro-IoT & ESP32</h3>
              <p className={styles.tourCardDesc}>
                Simula micro-riego con corte transversal SVG animado, telemetría NPK y supresión de bombeo ante lluvia satelital NASA POWER.
              </p>
            </div>
            <div className={styles.tourCardAction}>
              <Link href="/dashboard/iot" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}>
                Explorar Lab IoT <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className={styles.tourCard}>
            <div>
              <span className={styles.tourStepBadge}>Paso 5 (3:45 - 4:30)</span>
              <h3 className={styles.tourCardTitle}>5. Cuaderno de Campo & Fenología</h3>
              <p className={styles.tourCardDesc}>
                Prueba las plantillas fenológicas (Siembra, Encalado, Reabono V6, Cosecha) y el cálculo de Grados Día de Crecimiento (GDD).
              </p>
            </div>
            <div className={styles.tourCardAction}>
              <Link href="/dashboard/bitacora" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}>
                Ver Bitácora <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className={styles.tourCard}>
            <div>
              <span className={styles.tourStepBadge}>Paso 6 (4:30 - 5:00)</span>
              <h3 className={styles.tourCardTitle}>6. Arquitectura Abierta & APIs</h3>
              <p className={styles.tourCardDesc}>
                Audita la documentación interactiva OpenAPI 3.0 en `/api-docs` y la descarga de parcelas en GeoJSON para maquinaria.
              </p>
            </div>
            <div className={styles.tourCardAction}>
              <Link href="/api-docs" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}>
                Explorar APIs <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rigor Científico y Algoritmos */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FlaskConical size={22} color="#10b981" /> Fundamentación Científica y Algoritmos de Precisión
          </h2>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            Modelos matemáticos integrados en el código:
          </span>
        </div>

        <div className={styles.scienceGrid}>
          <div className={styles.scienceCard}>
            <h3 className={styles.scienceTitle}>
              <Globe size={16} /> Shoelace Geodésico WGS84
            </h3>
            <div className={styles.scienceFormula}>
              Área = (R²/2·10⁴)·|∑(λ_{'{i+1}'} - λ_{'{i-1}'})·sin(φ_i)|
            </div>
            <p className={styles.scienceDesc}>
              Cálculo de área exacta de parcelas sobre el elipsoide WGS84 sin distorsión de proyección mercator en latitudes tropicales.
            </p>
          </div>

          <div className={styles.scienceCard}>
            <h3 className={styles.scienceTitle}>
              <Waves size={16} /> Radar SAR Sentinel-1 Banda C
            </h3>
            <div className={styles.scienceFormula}>
              σ° (dB) = 10 · log₁₀(DN² / A_σ) | Ratio = σ°_VH / σ°_VV
            </div>
            <p className={styles.scienceDesc}>
              Estimación de humedad y saturación edáfica en los primeros 5 cm de suelo penetrando 100% la nubosidad tropical.
            </p>
          </div>

          <div className={styles.scienceCard}>
            <h3 className={styles.scienceTitle}>
              <Activity size={16} /> Grados Día de Crecimiento (GDD)
            </h3>
            <div className={styles.scienceFormula}>
              GDD = max(((min(T_max, 30) + max(T_min, 10))/2) - 10, 0)
            </div>
            <p className={styles.scienceDesc}>
              Acumulación térmica diaria calibrada para el trópico acoplada a balances hídricos mensuales de evapotranspiración (P - ETc).
            </p>
          </div>

          <div className={styles.scienceCard}>
            <h3 className={styles.scienceTitle}>
              <TreePine size={16} /> Carbono Orgánico (SOC) IPCC Tier 2
            </h3>
            <div className={styles.scienceFormula}>
              SOC_stock = SOC% × Densidad × 30cm × (1 - Pedregosidad) × 0.1
            </div>
            <p className={styles.scienceDesc}>
              Cuantificación de stock y secuestro anual (tCO₂e/ha/año) para certificación bajo estándares Verra VCS / IPCC.
            </p>
          </div>
        </div>
      </section>

      {/* Matriz de Impacto Social, Económico y ODS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <ShieldCheck size={22} color="#f59e0b" /> Matriz de Impacto Cuantificable y Alineación con ODS
          </h2>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            Impacto directo en el campo venezolano:
          </span>
        </div>

        <div className={styles.impactGrid}>
          <div className={styles.impactCard} style={{ borderLeftColor: '#ef4444' }}>
            <span className={styles.impactOds}>ODS 1 • Fin de la Pobreza</span>
            <h3 className={styles.impactTitle}>Barrera \$0 en Diagnóstico</h3>
            <p className={styles.impactDesc}>
              Democratización del acceso a diagnóstico edafoclimático para pequeños productores sin costo de laboratorio tradicional (\$150).
            </p>
          </div>

          <div className={styles.impactCard} style={{ borderLeftColor: '#f59e0b' }}>
            <span className={styles.impactOds}>ODS 2 • Hambre Cero</span>
            <h3 className={styles.impactTitle}>+75% Rendimiento en Granos</h3>
            <p className={styles.impactDesc}>
              Incremento del rendimiento del maíz de 3.5 t/ha a 6.2+ t/ha mediante corrección de pH y nutrición balanceada.
            </p>
          </div>

          <div className={styles.impactCard} style={{ borderLeftColor: '#10b981' }}>
            <span className={styles.impactOds}>ODS 12 • Producción Responsable</span>
            <h3 className={styles.impactTitle}>-40% Pérdida de Fertilizantes</h3>
            <p className={styles.impactDesc}>
              Neutralización del aluminio intercambiable (Al³⁺) para evitar el desperdicio masivo de fósforo y nitrógeno en cuencas.
            </p>
          </div>

          <div className={styles.impactCard} style={{ borderLeftColor: '#0284c7' }}>
            <span className={styles.impactOds}>ODS 13 • Acción por el Clima</span>
            <h3 className={styles.impactTitle}>3.85 tCO₂e/ha/año Secuestradas</h3>
            <p className={styles.impactDesc}>
              Monitoreo satelital y certificación de prácticas de labranza mínima, abonos verdes y sistemas agroforestales (SAF).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
