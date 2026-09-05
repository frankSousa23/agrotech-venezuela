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
  Radio,
  Download,
  Printer,
  Award,
  HelpCircle,
  CheckSquare
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
            <CheckCircle2 size={13} /> 197 Tests Automatizados Pasando (145 Jest + 52 Pytest)
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

      {/* Expediente Oficial Premio MapBiomas Venezuela 2026 & Descargas */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Award size={22} color="#f59e0b" /> Expediente Oficial Premio MapBiomas Venezuela 2026
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Documentación oficial, bases de la convocatoria, matriz de evaluación y artículos técnicos descargables:
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginTop: '0.8rem'
        }}>
          {/* Tarjeta 1: Bases del Premio */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.8rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  Bases Oficiales (10 Págs.)
                </span>
                <BookOpen size={16} color="#fbbf24" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: '0 0 0.4rem 0' }}>
                Bases de la 2da Edición 2026
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                Convocatoria oficial de la Red MapBiomas Venezuela, Provita, Wataniba y LSIGMA-USB. 4 categorías, cronograma y Anexos I y II.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link 
                href="/docs/BASES_PREMIO_MAPBIOMAS_2026.md" 
                target="_blank"
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem', padding: '6px 10px' }}
              >
                <FileText size={14} /> Ver MD
              </Link>
              <a 
                href="/docs/Bases_Premio_MapBiomas_Venezuela_2026.pdf" 
                download="Bases_Premio_MapBiomas_Venezuela_2026.pdf"
                className="btn-primary" 
                style={{ fontSize: '0.78rem', padding: '6px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Download size={14} /> PDF
              </a>
            </div>
          </div>

          {/* Tarjeta 2: Preguntas Frecuentes */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.8rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  Aclaratorias (6 Págs.)
                </span>
                <HelpCircle size={16} color="#38bdf8" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: '0 0 0.4rem 0' }}>
                Preguntas Frecuentes del Premio
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                20 respuestas oficiales: formatos aceptados, límites de 10.000 palabras, exclusión de códigos de cómputo y requisitos.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link 
                href="/docs/PREGUNTAS_FRECUENTES_PREMIO_2026.md" 
                target="_blank"
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem', padding: '6px 10px' }}
              >
                <FileText size={14} /> Ver MD
              </Link>
              <a 
                href="/docs/Preguntas_Frecuentes_Premio_MapBiomas_2026.pdf" 
                download="Preguntas_Frecuentes_Premio_MapBiomas_2026.pdf"
                className="btn-primary" 
                style={{ fontSize: '0.78rem', padding: '6px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Download size={14} /> PDF
              </a>
            </div>
          </div>

          {/* Tarjeta 3: Matriz de Cumplimiento de Criterios */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.8rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  Autoevaluación Anexo II
                </span>
                <CheckSquare size={16} color="#4ade80" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: '0 0 0.4rem 0' }}>
                Matriz de Cumplimiento de Criterios
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                Demostración punto por punto frente a los 6 criterios del jurado: Complejidad 20%, Originalidad 20%, Claridad 15%, Resultados 20%, Aporte General 20% y MapBiomas 5%.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link 
                href="/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md" 
                target="_blank"
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem', padding: '6px 10px' }}
              >
                <FileText size={14} /> Ver Matriz
              </Link>
              <a 
                href="/docs/Guia_Postulacion_MapBiomas_2026.pdf" 
                download="Guia_Postulacion_MapBiomas_2026.pdf"
                className="btn-primary" 
                style={{ fontSize: '0.78rem', padding: '6px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Download size={14} /> Guía PDF
              </a>
            </div>
          </div>

          {/* Tarjeta 4: Artículo Científico Técnico */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.8rem'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  Paper Técnico
                </span>
                <FlaskConical size={16} color="#c084fc" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: '0 0 0.4rem 0' }}>
                Artículo Científico: Actualidad y Futuro
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                Manuscrito formal de validación TRL 7, penetración radar SAR Banda C, formulación Shoelace WGS84, casos de estudio y hoja de ruta 2026–2030.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link 
                href="/docs/ARTICULO_CIENTIFICO_DRAFT.md" 
                target="_blank"
                className="btn-secondary" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem', padding: '6px 10px' }}
              >
                <FileText size={14} /> Ver Paper
              </Link>
              <a 
                href="/docs/Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf" 
                download="Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf"
                className="btn-primary" 
                style={{ fontSize: '0.78rem', padding: '6px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Download size={14} /> PDF Oficial
              </a>
            </div>
          </div>
        </div>

        {/* Barra de Acciones Globales de Exportación */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.92rem', color: '#fff', fontWeight: 700 }}>
              ¿Deseas imprimir o exportar la ficha completa para comités técnicos?
            </h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8' }}>
              Descarga el formulario oficial de postulación o genera una copia impresa/PDF del expediente institucional.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a 
              href="/docs/Formulario_Postulacion_MapBiomas_2026.pdf" 
              download="Formulario_Postulacion_MapBiomas_2026.pdf"
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
            >
              <Download size={15} /> Formulario Oficial PDF
            </a>
            <button 
              type="button"
              onClick={() => window.print()} 
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Printer size={15} /> Imprimir / Guardar en PDF
            </button>
          </div>
        </div>
      </section>

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

          <div className={styles.scienceCard}>
            <h3 className={styles.scienceTitle}>
              <FlaskConical size={16} /> Calibración Edafológica Regional
            </h3>
            <div className={styles.scienceFormula}>
              Kamprath Al³⁺ | Ca:Mg 3:1 | Yeso CaSO₄·2H₂O
            </div>
            <p className={styles.scienceDesc}>
              Modelos geo-diferenciados: Neutralización de Al³⁺ en sabanas orientales, magnesio en Sur del Lago y yeso agrícola en Aridisoles de Quíbor/Lara.
            </p>
          </div>

          <div className={styles.scienceCard}>
            <h3 className={styles.scienceTitle}>
              <Cpu size={16} /> Prescripción VRA Maquinaria & Drones
            </h3>
            <div className={styles.scienceFormula}>
              ESRI VRA Shapefile | KML Dron | Ficha Cabina
            </div>
            <p className={styles.scienceDesc}>
              Exportación universal tri-modal: consolas GPS de tractor (John Deere/Trimble), planes de vuelo para drones y cartilla de ajuste analógico.
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
