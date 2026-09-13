'use client';

import React, { useState, useEffect } from 'react';
import styles from './AgronomicGlossaryDrawer.module.css';
import { BookOpen, X, Search, Sparkles, Tag, HelpCircle } from 'lucide-react';

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'VERNACULAR' | 'SOIL' | 'SATELLITE' | 'CARBON_CLIMATE';
  categoryLabel: string;
  definition: string;
  metricEquivalence?: string;
  practicalTip?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'saco',
    term: '1 Saco (Abono / Cal / Semilla)',
    category: 'VERNACULAR',
    categoryLabel: 'Unidad Campesina',
    definition: 'Medida tradicional de ensacado de polipropileno utilizada en los llanos y el campo venezolano para graneles secos.',
    metricEquivalence: '1 saco = 50.0 kg (0.05 Toneladas métricas)',
    practicalTip: 'Para una dosis de 1.5 Ton/ha de cal dolomítica, requieres exactamente 30 sacos por hectárea.',
  },
  {
    id: 'tambor',
    term: '1 Tambor (Líquidos / Riego)',
    category: 'VERNACULAR',
    categoryLabel: 'Unidad Campesina',
    definition: 'Tambor cilíndrico metálico o plástico de almacenamiento de insumos foliares, biofertilizantes líquidos o agua.',
    metricEquivalence: '1 tambor = 200 Litros (0.2 m³)',
    practicalTip: 'Útil para preparar caldos microbiológicos o biol artesanal para fertirriego.',
  },
  {
    id: 'caneca',
    term: '1 Caneca / Pimpina',
    category: 'VERNACULAR',
    categoryLabel: 'Unidad Campesina',
    definition: 'Recipiente manual de transporte para pesticidas, coadyuvantes o micronutrientes líquidos.',
    metricEquivalence: '1 caneca = 20 Litros (5 galones aprox.)',
    practicalTip: '1 tambor equivale a 10 canecas de 20 L.',
  },
  {
    id: 'tablon',
    term: '1 Tablón',
    category: 'VERNACULAR',
    categoryLabel: 'Unidad Campesina',
    definition: 'Subdivisión tradicional de siembra delimitada por canales o guardarrayas en fincas maiceras y cañeras.',
    metricEquivalence: '1 tablón = 1.0 Hectárea (10,000 m²)',
    practicalTip: 'El WebGIS georreferencia cada tablón como un polígono autónomo con gemelo digital.',
  },
  {
    id: 'ph',
    term: 'Acidez del Suelo (pH)',
    category: 'SOIL',
    categoryLabel: 'Edafología',
    definition: 'Potencial de hidrógeno del suelo. Menor a 5.5 indica acidez alta con liberación de aluminio tóxico (Al³⁺). De 6.0 a 6.8 es el rango dulce donde los macronutrientes están 100% asimilables.',
    metricEquivalence: 'Escala logarítmica de 0 a 14',
    practicalTip: 'En suelos con pH < 5.5, hasta el 70% del fertilizante fosfatado queda atrapado y se desperdicia si no se encala primero.',
  },
  {
    id: 'kamprath',
    term: 'Modelo Kamprath de Encalado',
    category: 'SOIL',
    categoryLabel: 'Edafología',
    definition: 'Ecuación científica regionalizada para sabanas y trópico que neutraliza el aluminio intercambiable sin sobre-encalar.',
    metricEquivalence: 'Dosis (t/ha) = (1.5 × Al³⁺ [meq/100g] × 100) / PRNT',
    practicalTip: 'El sistema calcula automáticamente la dosis precisa según el suelo de cada estado venezolano.',
  },
  {
    id: 'yeso-agricola',
    term: 'Yeso Agrícola (CaSO₄·2H₂O)',
    category: 'SOIL',
    categoryLabel: 'Edafología',
    definition: 'Sulfato de calcio dihidratado usado para desplazar el sodio (Na⁺) en suelos salino-sódicos alcalinos (como el Valle de Quíbor, Lara) sin elevar el pH.',
    metricEquivalence: 'Dosis típica: 2.5 t/ha en suelos con pH ≥ 7.4 y CE alta',
    practicalTip: 'A diferencia de la cal (CaCO3), el yeso no alcaliniza el suelo.',
  },
  {
    id: 'sar-c-band',
    term: 'Radar SAR Sentinel-1 (Banda C)',
    category: 'SATELLITE',
    categoryLabel: 'Teledetección',
    definition: 'Radar satelital de microondas activas de la Agencia Espacial Europea que penetra cobertura densa de nubes y lluvias tropicales para medir rugosidad del dosel y humedad de suelo.',
    metricEquivalence: 'Retrodispersión en decibelios (dB) con polarizaciones cruzadas VH y VV',
    practicalTip: 'Garantiza monitoreo continuo en el Sur del Lago y Guayana durante los 8 meses de mayor nubosidad.',
  },
  {
    id: 'ndvi',
    term: 'Índice de Vigor Vegetal (NDVI)',
    category: 'SATELLITE',
    categoryLabel: 'Teledetección',
    definition: 'Índice espectral normalizado entre el infrarrojo cercano (NIR) y el rojo visible (RED) que mide la actividad clorofílica y biomasa foliar fotosintéticamente activa.',
    metricEquivalence: 'Rango de -1.0 a +1.0 (>0.7 dosel óptimo, <0.2 suelo seco)',
    practicalTip: 'Útil para generar mapas de fertilización nitrogenada a tasa variable (VRA).',
  },
  {
    id: 'gdd',
    term: 'Grados Día de Crecimiento (GDD)',
    category: 'CARBON_CLIMATE',
    categoryLabel: 'Agroclimatología',
    definition: 'Suma térmica acumulada de calor que una planta necesita para avanzar de una fase fenológica a otra, calculada a partir de temperaturas mínimas y máximas sobre una base biológica (10°C).',
    metricEquivalence: 'GDD = Σ [((Tmax + Tmin)/2) - Tbase]',
    practicalTip: 'Permite predecir con exactitud milimétrica el día del reabono nitrogenado (V6) y la fecha de cosecha.',
  },
  {
    id: 'mrv',
    term: 'Protocolo MRV (Monitoreo, Reporte y Verificación)',
    category: 'CARBON_CLIMATE',
    categoryLabel: 'Mercados de Carbono',
    definition: 'Marco metodológico bajo estándares internacionales (Verra VCS / IPCC Tier 2) que audita la reducción de emisiones y secuestro de carbono en el suelo para emitir créditos monetizables.',
    metricEquivalence: '1 Bono = 1 Tonelada Métrica de CO₂ equivalente secuestrada (tCO₂e)',
    practicalTip: 'El Oráculo Radar SAR de Agrotech reduce la incertidumbre de auditoría del 40% al 10%, maximizando el valor del bono.',
  },
];

export default function AgronomicGlossaryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredTerms = GLOSSARY_TERMS.filter((t) => {
    const matchesCat = activeCategory === 'ALL' || t.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      (t.metricEquivalence && t.metricEquivalence.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <>
      {/* Botón Flotante de Activación */}
      <button
        type="button"
        id="btn_open_glossary_drawer"
        className={styles.floatingButton}
        onClick={() => setIsOpen(true)}
        title="Glosario de Campo & Diccionario Edafológico"
        aria-label="Abrir Glosario Agronómico"
      >
        <BookOpen size={18} />
        <span className={styles.btnLabel}>Glosario de Campo</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsOpen(false)}
          id="glossary_drawer_backdrop"
        />
      )}

      {/* Panel Deslizante Lateral (Drawer) */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        id="agronomic_glossary_drawer"
      >
        {/* Cabecera del Drawer */}
        <div className={styles.drawerHeader}>
          <div className={styles.headerTitleRow}>
            <div className={styles.headerIcon}>
              <BookOpen size={20} color="#34d399" />
            </div>
            <div>
              <h3 className={styles.drawerTitle}>Glosario Agronómico & Vernacular</h3>
              <p className={styles.drawerSubtitle}>
                Traductor de términos campesinos, edafológicos y satelitales
              </p>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            id="btn_close_glossary_drawer"
            aria-label="Cerrar glosario"
          >
            <X size={20} />
          </button>
        </div>

        {/* Búsqueda y Filtros */}
        <div className={styles.controlsArea}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              id="glossary_search_input"
              type="text"
              placeholder="Buscar concepto (ej: saco, pH, SAR, VRA, Kamprath)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
              >
                ✕
              </button>
            )}
          </div>

          {/* Categorías */}
          <div className={styles.categoriesRow}>
            {[
              { id: 'ALL', label: 'Todos' },
              { id: 'VERNACULAR', label: '🧑‍🌾 Vernacular' },
              { id: 'SOIL', label: '🧪 Edafología' },
              { id: 'SATELLITE', label: '🛰️ Satélites/SAR' },
              { id: 'CARBON_CLIMATE', label: '🌿 Carbono & Clima' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.categoryChip} ${
                  activeCategory === cat.id ? styles.categoryChipActive : ''
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Términos */}
        <div className={styles.termsList}>
          {filteredTerms.length === 0 ? (
            <div className={styles.emptyState}>
              <HelpCircle size={32} color="#94a3b8" />
              <p>No se encontraron conceptos para &quot;{searchQuery}&quot;</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                }}
                className={styles.resetBtn}
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            filteredTerms.map((t) => (
              <div key={t.id} className={styles.termCard} id={`term_${t.id}`}>
                <div className={styles.termCardHeader}>
                  <h4 className={styles.termTitle}>{t.term}</h4>
                  <span className={styles.categoryBadge}>{t.categoryLabel}</span>
                </div>

                <p className={styles.termDefinition}>{t.definition}</p>

                {t.metricEquivalence && (
                  <div className={styles.equivalenceBox}>
                    <strong>⚖️ Equivalencia Métrica / Fórmula:</strong>
                    <div>{t.metricEquivalence}</div>
                  </div>
                )}

                {t.practicalTip && (
                  <div className={styles.tipBox}>
                    <span>💡 <strong>Consejo de Campo:</strong> {t.practicalTip}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pie del Drawer */}
        <div className={styles.drawerFooter}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            Agrotech Venezuela • Compatible con Asistente por Voz y Modo Productor
          </span>
        </div>
      </aside>
    </>
  );
}
