'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './TerritorialPresetBar.module.css';
import { Compass, Sparkles, Check, ArrowRight } from 'lucide-react';

export interface TerritorialPreset {
  id: 'turen' | 'sur_del_lago' | 'quibor' | 'merida';
  name: string;
  regionLabel: string;
  stateId: string;
  stateName: string;
  crop: string;
  ph: number;
  organicMatterPct: number;
  soilTexture: string;
  badge: string;
  icon: string;
  description: string;
  keyTech: string;
}

export const TERRITORIAL_PRESETS: TerritorialPreset[] = [
  {
    id: 'turen',
    name: 'Turén',
    regionLabel: 'Llanos Occidentales (Portuguesa)',
    stateId: 'portuguesa',
    stateName: 'Portuguesa',
    crop: 'Maíz Blanco Harinero',
    ph: 6.4,
    organicMatterPct: 3.2,
    soilTexture: 'Franco-arcilloso',
    badge: 'Granero Cerealero',
    icon: '🌾',
    description: 'Faja cerealera nacional: alto potencial de mecanización, siembra directa y respuesta balanceada a NPK 12-24-12.',
    keyTech: 'Fertilización de Fondo NPK + Reabono Urea V6',
  },
  {
    id: 'sur_del_lago',
    name: 'Sur del Lago',
    regionLabel: 'Cuenca del Catatumbo (Zulia)',
    stateId: 'zulia',
    stateName: 'Zulia',
    crop: 'Cacao Criollo Fino de Aroma',
    ph: 5.2,
    organicMatterPct: 3.8,
    soilTexture: 'Franco-limoso',
    badge: 'Llanura Aluvial Húmeda',
    icon: '🍫',
    description: 'Suelos ácidos aluviales con alta humedad: corrección con encalado dolomítico Kamprath y SAF bajo sombra.',
    keyTech: 'Encalado Dolomítico 2.2 Ton/ha + SAF Cacao',
  },
  {
    id: 'quibor',
    name: 'Valle de Quíbor',
    regionLabel: 'Depresión Semiárida (Lara)',
    stateId: 'lara',
    stateName: 'Lara',
    crop: 'Cebolla Roja / Pimentón',
    ph: 7.8,
    organicMatterPct: 1.8,
    soilTexture: 'Franco-arenoso',
    badge: 'Valle Semiárido Hortícola',
    icon: '🧅',
    description: 'Suelo alcalino salino-sódico en zona de riego por goteo: recuperación con Yeso Agrícola (CaSO4·2H2O).',
    keyTech: 'Yeso Agrícola 2.5 Ton/ha + Microrriego',
  },
  {
    id: 'merida',
    name: 'Páramo de Mérida',
    regionLabel: 'Cordillera Altoandina (Mérida)',
    stateId: 'merida',
    stateName: 'Mérida',
    crop: 'Papa Criolla Altoandina',
    ph: 5.4,
    organicMatterPct: 4.5,
    soilTexture: 'Franco-humífero',
    badge: 'Agricultura en Ladera',
    icon: '🥔',
    description: 'Agricultura de alta montaña: microclimas fríos, terrazas de conservación, control de erosión y GDD base 6°C.',
    keyTech: 'Siembra en Contorno + Materia Orgánica 4.5%',
  },
];

export interface TerritorialPresetBarProps {
  activePresetId?: string;
  onSelectPreset?: (preset: TerritorialPreset) => void;
  navigateOnClick?: boolean;
  compact?: boolean;
}

export default function TerritorialPresetBar({
  activePresetId,
  onSelectPreset,
  navigateOnClick = false,
  compact = false,
}: TerritorialPresetBarProps) {
  const router = useRouter();

  const handleClick = (preset: TerritorialPreset) => {
    if (onSelectPreset) {
      onSelectPreset(preset);
    } else if (navigateOnClick) {
      router.push(
        `/dashboard/recomendaciones?stateId=${preset.stateId}&crop=${encodeURIComponent(
          preset.crop
        )}&ph=${preset.ph}&soilTexture=${encodeURIComponent(preset.soilTexture)}`
      );
    }
  };

  return (
    <div className={styles.presetContainer} id="territorial_presets_bar">
      <div className={styles.headerRow}>
        <div className={styles.headerTitle}>
          <Compass size={18} className={styles.iconAccent} />
          <span>Escenarios Agroecológicos Emblemáticos en 1 Clic</span>
        </div>
        <span className={styles.headerSubtitle}>
          Demostración rápida para evaluadores y productores
        </span>
      </div>

      <div className={`${styles.presetsGrid} ${compact ? styles.presetsGridCompact : ''}`}>
        {TERRITORIAL_PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id || activePresetId === preset.stateId;

          return (
            <button
              key={preset.id}
              type="button"
              id={`btn_preset_${preset.id}`}
              className={`${styles.presetCard} ${isActive ? styles.presetCardActive : ''}`}
              onClick={() => handleClick(preset)}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardEmoji}>{preset.icon}</span>
                <span className={styles.cardBadge}>{preset.badge}</span>
                {isActive && <Check size={16} className={styles.checkIcon} />}
              </div>

              <div className={styles.cardContent}>
                <h4 className={styles.presetName}>{preset.name}</h4>
                <div className={styles.regionLabel}>{preset.regionLabel}</div>
                <div className={styles.cropTarget}>
                  🌱 <strong>{preset.crop}</strong>
                </div>

                {!compact && (
                  <>
                    <p className={styles.presetDesc}>{preset.description}</p>
                    <div className={styles.keyTechPill}>
                      ⚡ {preset.keyTech}
                    </div>
                  </>
                )}

                <div className={styles.parametersRow}>
                  <span className={styles.paramTag}>pH {preset.ph}</span>
                  <span className={styles.paramTag}>MO {preset.organicMatterPct}%</span>
                  <span className={styles.paramTag}>{preset.soilTexture}</span>
                </div>
              </div>

              {navigateOnClick && !onSelectPreset && (
                <div className={styles.actionArrow}>
                  <span>Probar Escenario</span>
                  <ArrowRight size={14} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
