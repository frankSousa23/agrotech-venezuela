/**
 * ============================================================================
 * AGROTECH VENEZUELA — ONBOARDING CHECKLIST WIDGET
 * ============================================================================
 *
 * Widget gamificado de bienvenida para el dashboard principal:
 * - Guía paso a paso con 4 hitos: explorar mapa, delimitar parcela,
 *   activar telemetría IoT y consultar el manual agronómico.
 * - Persistencia de progreso en localStorage (clave: agrotech_onboarding_checklist).
 * - Barra de progreso 0%–100% con animación de confeti al completar.
 * - Colapsable para no saturar la vista una vez completado el onboarding.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './OnboardingChecklistWidget.module.css';
import { 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Compass, 
  Tractor, 
  Radio, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';

interface MilestoneItem {
  id: string;
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  actionLabel: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: 'map',
    title: '1. Explorar el Visor WebGIS',
    desc: 'Visualiza Venezuela a escala Nacional, Municipal y Parcela con capas satelitales y radar.',
    href: '/dashboard/mapa',
    icon: Compass,
    actionLabel: 'Abrir Mapa'
  },
  {
    id: 'parcel',
    title: '2. Delimitar o Revisar Parcelas',
    desc: 'Inspecciona las parcelas de Turén y Calabozo o traza tu propio lote agrícola con GPS.',
    href: '/dashboard/tierras',
    icon: Tractor,
    actionLabel: 'Ver Lotes'
  },
  {
    id: 'telemetry',
    title: '3. Simular Telemetría / IoT',
    desc: 'Prueba las curvas de humedad Saxton-Rawls, sondas multinivel o el radar SAR sin nubes.',
    href: '/dashboard/iot',
    icon: Radio,
    actionLabel: 'Probar LAB'
  },
  {
    id: 'manual',
    title: '4. Consultar Manual & Ficha de Cabina',
    desc: 'Aprende las conversiones de sacos/tablones o imprime la guía física para el tractor.',
    href: '/dashboard/manual',
    icon: BookOpen,
    actionLabel: 'Leer Manual'
  }
];

const STORAGE_KEY = 'agrotech_onboarding_checklist';

export default function OnboardingChecklistWidget() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    map: false,
    parcel: false,
    telemetry: false,
    manual: false
  });
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompleted(JSON.parse(stored));
      }
      const storedCollapsed = localStorage.getItem(`${STORAGE_KEY}_collapsed`);
      if (storedCollapsed === 'true') {
        setCollapsed(true);
      }
    } catch (e) {
      // safe fallback
    } finally {
      setMounted(true);
    }
  }, []);

  const toggleMilestone = (id: string) => {
    setCompleted(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const markAsComplete = (id: string) => {
    setCompleted(prev => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleReset = () => {
    const fresh = { map: false, parcel: false, telemetry: false, manual: false };
    setCompleted(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch (e) {}
  };

  const toggleCollapse = () => {
    setCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem(`${STORAGE_KEY}_collapsed`, String(next));
      } catch (e) {}
      return next;
    });
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / MILESTONES.length) * 100);
  const isAllComplete = completedCount === MILESTONES.length;

  if (!mounted) {
    return null;
  }

  return (
    <div 
      className={`${styles.checklistCard} ${isAllComplete ? styles.checklistCardComplete : ''}`} 
      id="onboarding_checklist_widget"
    >
      {/* Cabecera del Widget */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <div className={styles.trophyBadge}>
            {isAllComplete ? '🏆' : '🌱'}
          </div>
          <div>
            <h3 className={styles.titleText}>
              <span>Primeros Pasos en Agrotech</span>
              <span className="badge-pill badge-emerald" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                {completedCount} de {MILESTONES.length} completados ({progressPercent}%)
              </span>
            </h3>
            <p className={styles.subtitleText}>
              Guía secuencial interactiva para validar las capacidades operativas de la plataforma
            </p>
          </div>
        </div>

        <div className={styles.controlsArea}>
          {completedCount > 0 && (
            <button 
              type="button" 
              onClick={handleReset} 
              className={styles.collapseBtn}
              title="Restablecer progreso"
              id="btn_reset_onboarding_checklist"
            >
              <RotateCcw size={12} />
              <span>Reiniciar</span>
            </button>
          )}
          <button 
            type="button" 
            onClick={toggleCollapse} 
            className={styles.collapseBtn}
            id="btn_toggle_collapse_onboarding"
          >
            {collapsed ? (
              <>
                <span>Expandir</span>
                <ChevronDown size={14} />
              </>
            ) : (
              <>
                <span>Minimizar</span>
                <ChevronUp size={14} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Barra de Progreso */}
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBarFill} 
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Banner de Celebración cuando está 100% completo */}
      {isAllComplete && (
        <div className={styles.celebrationBanner}>
          <span>🌾 <strong>¡Felicidades!</strong> Has completado todos los pasos de orientación agro-territorial. Tu cuenta y parcelas están listas para producción.</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>100% TRL 4</span>
        </div>
      )}

      {/* Lista de Hitos (si no está minimizado) */}
      {!collapsed && (
        <div className={styles.itemsGrid} id="onboarding_items_grid">
          {MILESTONES.map((item) => {
            const isDone = !!completed[item.id];
            const Icon = item.icon;

            return (
              <div 
                key={item.id} 
                className={`${styles.itemCard} ${isDone ? styles.itemCardComplete : ''}`}
                id={`milestone_card_${item.id}`}
              >
                <div className={styles.itemHeader}>
                  <button
                    type="button"
                    onClick={() => toggleMilestone(item.id)}
                    className={styles.checkboxBtn}
                    aria-label={`Marcar ${item.title}`}
                    id={`btn_check_${item.id}`}
                  >
                    {isDone ? (
                      <CheckCircle2 size={18} color="#22c55e" />
                    ) : (
                      <Circle size={18} color="#94a3b8" />
                    )}
                  </button>
                  <div>
                    <h4 className={`${styles.itemTitle} ${isDone ? styles.itemTitleComplete : ''}`}>
                      {item.title}
                    </h4>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>
                </div>

                <Link
                  href={item.href}
                  onClick={() => markAsComplete(item.id)}
                  className={styles.itemActionBtn}
                  id={`link_milestone_${item.id}`}
                >
                  <Icon size={14} />
                  <span>{item.actionLabel}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
