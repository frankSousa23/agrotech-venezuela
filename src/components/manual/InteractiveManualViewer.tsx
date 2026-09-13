'use client';

import React, { useState, useMemo } from 'react';
import styles from './InteractiveManualViewer.module.css';
import { 
  MANUAL_CHAPTERS, 
  ManualChapter, 
  TargetRole 
} from '@/lib/manual/manualContent';
import CabinReferenceSheet from './CabinReferenceSheet';
import { 
  Search, 
  BookOpen, 
  Volume2, 
  Lightbulb, 
  Printer, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Filter
} from 'lucide-react';

export default function InteractiveManualViewer() {
  const [activeChapterId, setActiveChapterId] = useState<string>(MANUAL_CHAPTERS[0].id);
  const [selectedRole, setSelectedRole] = useState<TargetRole>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCabinSheet, setShowCabinSheet] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);

  // Filtrado reactivo por rol y por búsqueda
  const filteredChapters = useMemo(() => {
    return MANUAL_CHAPTERS.filter((chapter) => {
      const matchesRole = 
        selectedRole === 'ALL' || 
        chapter.targetRoles.includes('ALL') || 
        chapter.targetRoles.includes(selectedRole);

      if (!matchesRole) return false;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const titleMatch = chapter.title.toLowerCase().includes(q);
      const summaryMatch = chapter.summary.toLowerCase().includes(q);
      const sectionMatch = chapter.sections.some(
        s => s.title.toLowerCase().includes(q) || 
             s.summary.toLowerCase().includes(q) ||
             (s.formulaOrCode && s.formulaOrCode.toLowerCase().includes(q))
      );

      return titleMatch || summaryMatch || sectionMatch;
    });
  }, [selectedRole, searchQuery]);

  // Mantener capítulo activo coherente con la lista filtrada
  const activeChapter = useMemo(() => {
    const found = filteredChapters.find(c => c.id === activeChapterId);
    return found || filteredChapters[0] || MANUAL_CHAPTERS[0];
  }, [filteredChapters, activeChapterId]);

  // Manejo de lectura por voz nativa Web Speech API
  const handleReadSummary = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('La síntesis de voz no está disponible en este navegador.');
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const textToSpeak = `${activeChapter.title}. ${activeChapter.summary}. ${activeChapter.sections.map(s => `${s.title}: ${s.summary}`).join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-VE';
    utterance.rate = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  // Navegación de capítulos anterior / siguiente
  const currentIndex = filteredChapters.findIndex(c => c.id === activeChapter.id);
  const prevChapter = currentIndex > 0 ? filteredChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < filteredChapters.length - 1 ? filteredChapters[currentIndex + 1] : null;

  if (showCabinSheet) {
    return <CabinReferenceSheet onBack={() => setShowCabinSheet(false)} />;
  }

  return (
    <div className={styles.container} id="interactive_manual_viewer">
      {/* Barra Superior */}
      <div className={styles.topBar}>
        <div className={styles.topBarInfo}>
          <div className={styles.topBarIcon}>📖</div>
          <div>
            <h1 className={styles.topBarTitle}>Manual de Campo & Guía Agronómica</h1>
            <p className={styles.topBarSubtitle}>
              Documentación interactiva, factores vernaculares campesinos y metodologías científicas para Venezuela
            </p>
          </div>
        </div>

        <div className={styles.topBarActions}>
          <button 
            type="button" 
            id="btn_toggle_cabin_sheet"
            className={styles.cabinSheetBtn}
            onClick={() => setShowCabinSheet(true)}
            title="Abrir la hoja imprimible de cabina para tractoristas"
          >
            <Printer size={16} />
            <span>🖨️ Ficha de Cabina Imprimible</span>
          </button>
        </div>
      </div>

      {/* Controles de Búsqueda y Filtros de Roles */}
      <div className={styles.filterControls}>
        <div className={styles.searchRow}>
          <Search size={18} className={styles.searchIcon} />
          <input
            id="manual_search_input"
            type="text"
            placeholder="Buscar por procedimiento, fórmula o término (ej: Kamprath, radar SAR, sacos, tolva, PAW)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => setSearchQuery('')}
              className={styles.clearBtn}
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.roleTabs} id="manual_role_tabs">
          {[
            { id: 'ALL', label: 'Todos los Capítulos' },
            { id: 'FARMER', label: '🌾 Productor Fácil' },
            { id: 'AGRONOMIST', label: '🛰️ Agrónomo / Técnico' },
            { id: 'ADMIN', label: '🛡️ Administrador' },
            { id: 'GUEST', label: '🚀 Modo Invitado' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              id={`role_tab_${tab.id.toLowerCase()}`}
              className={`${styles.roleTab} ${selectedRole === tab.id ? styles.roleTabActive : ''}`}
              onClick={() => setSelectedRole(tab.id as TargetRole)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rejilla Principal (Capítulos a la Izquierda, Contenido a la Derecha) */}
      <div className={styles.mainLayout}>
        {/* Sidebar de Capítulos */}
        <aside className={styles.sidebarChapters}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', padding: '6px 10px', textTransform: 'uppercase' }}>
            Capítulos ({filteredChapters.length})
          </div>
          {filteredChapters.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              id={`chapter_nav_${chapter.id}`}
              className={`${styles.chapterBtn} ${activeChapter.id === chapter.id ? styles.chapterBtnActive : ''}`}
              onClick={() => setActiveChapterId(chapter.id)}
            >
              <span className={styles.chapterIcon}>{chapter.icon}</span>
              <div style={{ overflow: 'hidden' }}>
                <div className={styles.chapterLabel}>{chapter.shortTitle}</div>
                <div style={{ fontSize: '0.67rem', color: '#64748b' }}>
                  {chapter.estimatedReadMinutes} min de lectura
                </div>
              </div>
            </button>
          ))}
          {filteredChapters.length === 0 && (
            <div style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.82rem' }}>
              No hay capítulos con &quot;{searchQuery}&quot;
            </div>
          )}
        </aside>

        {/* Visor de Contenido del Capítulo */}
        <main className={styles.contentViewport} id="manual_content_viewport">
          <div className={styles.chapterHeader}>
            <div className={styles.chapterHeaderTop}>
              <div className={styles.badgeRow}>
                <span className="badge-pill badge-emerald">{activeChapter.category}</span>
                <span className="badge-pill badge-cyan">⏱️ {activeChapter.estimatedReadMinutes} Minutos</span>
                {activeChapter.targetRoles.filter(r => r !== 'ALL').map(r => (
                  <span key={r} className="badge-pill badge-outline">{r}</span>
                ))}
              </div>

              <button 
                type="button" 
                onClick={handleReadSummary}
                className={styles.audioBar}
                title="Escuchar audio resumen del capítulo"
                id="btn_read_chapter_audio"
              >
                <Volume2 size={15} />
                <span>{speaking ? 'Detener Voz' : '🔊 Escuchar Resumen'}</span>
              </button>
            </div>

            <h2 className={styles.chapterTitle}>
              <span>{activeChapter.icon}</span>
              <span>{activeChapter.title}</span>
            </h2>
            <p className={styles.chapterSummary}>{activeChapter.summary}</p>
          </div>

          {/* Secciones del Capítulo */}
          <div>
            {activeChapter.sections.map((section, sIdx) => (
              <article key={section.id || sIdx} className={styles.sectionBlock} id={`section_${section.id}`}>
                <h3 className={styles.sectionTitle}>
                  <span>{section.title}</span>
                  {section.badge && (
                    <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                      {section.badge}
                    </span>
                  )}
                </h3>

                <p className={styles.sectionSummary}>{section.summary}</p>

                {section.steps && section.steps.length > 0 && (
                  <div className={styles.stepsList}>
                    {section.steps.map((st, i) => (
                      <div key={i} className={styles.stepItem}>
                        <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.formulaOrCode && (
                  <div className={styles.codeBox}>
                    {section.formulaOrCode}
                  </div>
                )}

                {section.practicalTip && (
                  <div className={styles.tipBox}>
                    <Lightbulb size={18} color="#34d399" style={{ flexShrink: 0 }} />
                    <span><strong>Consejo Práctico:</strong> {section.practicalTip}</span>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Paginación entre Capítulos */}
          <div className={styles.paginationRow}>
            {prevChapter ? (
              <button
                type="button"
                id="btn_prev_chapter"
                onClick={() => setActiveChapterId(prevChapter.id)}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ChevronLeft size={16} />
                <span>Anterior: {prevChapter.shortTitle}</span>
              </button>
            ) : <div />}

            {nextChapter && (
              <button
                type="button"
                id="btn_next_chapter"
                onClick={() => setActiveChapterId(nextChapter.id)}
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Siguiente: {nextChapter.shortTitle}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
