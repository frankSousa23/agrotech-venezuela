'use client';

import React, { useState } from 'react';
import styles from './ImpactRoiWidget.module.css';
import { 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Sliders
} from 'lucide-react';

interface ImpactRoiWidgetProps {
  initialAreaHa?: number;
  cropName?: string;
}

export default function ImpactRoiWidget({
  initialAreaHa = 20,
  cropName = 'Maíz Blanco Harinero'
}: ImpactRoiWidgetProps) {
  const [areaHa, setAreaHa] = useState<number>(initialAreaHa);
  const [selectedPractice, setSelectedPractice] = useState<'both' | 'traditional' | 'agrotech'>('both');

  // Constantes de modelado agronómico y financiero (Venezuela 2026)
  const FERTILIZER_SAVING_PER_HA = 120; // $120 USD/ha ahorrados por VRA y cal dolomítica precisa
  const YIELD_INCREASE_TON_HA = 2.3; // +2.3 Ton/ha adicionales por nutrición balanceada
  const CROP_PRICE_PER_TON = 220; // $220 USD/Ton precio referencial de grano en silo
  const CARBON_SEQUESTRATION_TCO2_HA = 1.8; // 1.8 tCO2e/ha/año secuestradas bajo labranza mínima y SAF
  const CARBON_PRICE_PER_TON = 25; // $25 USD por crédito Verra VCS certificado
  const WATER_SAVING_M3_HA = 180; // 180 m3 (180,000 L) de agua ahorrados por microrriego predictivo NASA POWER

  // Cálculos dinámicos escalados a la superficie
  const totalFertilizerSavings = Math.round(areaHa * FERTILIZER_SAVING_PER_HA);
  const totalExtraYieldTons = Math.round(areaHa * YIELD_INCREASE_TON_HA * 10) / 10;
  const totalExtraYieldRevenue = Math.round(areaHa * YIELD_INCREASE_TON_HA * CROP_PRICE_PER_TON);
  const totalCarbonSequestration = Math.round(areaHa * CARBON_SEQUESTRATION_TCO2_HA * 10) / 10;
  const totalCarbonRevenue = Math.round(areaHa * CARBON_SEQUESTRATION_TCO2_HA * CARBON_PRICE_PER_TON);
  const totalWaterSavedM3 = Math.round(areaHa * WATER_SAVING_M3_HA);
  const totalNetEconomicBenefit = totalFertilizerSavings + totalExtraYieldRevenue + totalCarbonRevenue;

  return (
    <div className={styles.roiContainer} id="impact_roi_widget">
      {/* Encabezado */}
      <div className={styles.widgetHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.badgeRow}>
            <span className={styles.badgePill}>
              <Sparkles size={14} /> Simulador Pedagógico de Impacto & ROI
            </span>
            <span className={styles.badgeVerra}>
              <ShieldCheck size={14} /> Metodología IPCC Tier 2 / Verra VCS
            </span>
          </div>
          <h3 className={styles.heading}>
            Retorno de Inversión (ROI) y Beneficio Ecosistémico
          </h3>
          <p className={styles.subheading}>
            Contrasta el costo oculto de la agricultura empírica frente al margen regenerativo guiado por satélites e IA edafológica.
          </p>
        </div>

        {/* Selector de Superficie */}
        <div className={styles.sliderBox}>
          <div className={styles.sliderLabelRow}>
            <span className={styles.sliderLabel}>
              <Sliders size={15} /> Superficie de Finca / Lote:
            </span>
            <span className={styles.sliderValue} id="roi_area_display">{areaHa} ha</span>
          </div>
          <input
            id="roi_farm_size_slider"
            type="range"
            min="1"
            max="150"
            step="1"
            value={areaHa}
            onChange={(e) => setAreaHa(parseInt(e.target.value, 10))}
            className={styles.rangeInput}
          />
          <div className={styles.quickButtonsRow}>
            {[5, 15, 30, 60, 100].map((quick) => (
              <button
                key={quick}
                type="button"
                className={`${styles.quickBtn} ${areaHa === quick ? styles.quickBtnActive : ''}`}
                onClick={() => setAreaHa(quick)}
              >
                {quick} ha
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Resumen de Impacto Financiero y Ecológico */}
      <div className={styles.kpiSummaryGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiIcon} style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
            <DollarSign size={20} />
          </div>
          <div>
            <div className={styles.kpiLabel}>Ahorro en Fertilizantes/Cal</div>
            <div className={styles.kpiValue} style={{ color: '#4ade80' }}>
              ${totalFertilizerSavings.toLocaleString()} USD
            </div>
            <div className={styles.kpiSub}>-${FERTILIZER_SAVING_PER_HA} USD/ha en insumos químicos</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIcon} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <div className={styles.kpiLabel}>Plus Rendimiento Cosecha</div>
            <div className={styles.kpiValue} style={{ color: '#38bdf8' }}>
              +${totalExtraYieldRevenue.toLocaleString()} USD
            </div>
            <div className={styles.kpiSub}>+{totalExtraYieldTons} Ton extra ({cropName})</div>
          </div>
        </div>

        <div className={styles.kpiCard}>
          <div className={styles.kpiIcon} style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
            <Leaf size={20} />
          </div>
          <div>
            <div className={styles.kpiLabel}>Bonos de Carbono MRV</div>
            <div className={styles.kpiValue} style={{ color: '#c084fc' }}>
              +${totalCarbonRevenue.toLocaleString()} USD/año
            </div>
            <div className={styles.kpiSub}>{totalCarbonSequestration} tCO2e secuestradas</div>
          </div>
        </div>

        <div className={styles.kpiCardHighlight}>
          <div className={styles.kpiIcon} style={{ background: '#059669', color: '#ffffff' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div className={styles.kpiLabel} style={{ color: '#a7f3d0' }}>Beneficio Neto Estimado / Año</div>
            <div className={styles.kpiValueLarge}>
              +${totalNetEconomicBenefit.toLocaleString()} USD
            </div>
            <div className={styles.kpiSub} style={{ color: '#d1fae5' }}>
              💧 {totalWaterSavedM3.toLocaleString()} m³ agua protegida
            </div>
          </div>
        </div>
      </div>

      {/* Comparador Split-Screen: Tradicional vs Agrotech */}
      <div className={styles.splitScreenContainer}>
        {/* Lado Tradicional */}
        <div className={styles.practiceColumnTraditional}>
          <div className={styles.columnHeader}>
            <div className={styles.columnBadgeTrad}>
              <AlertTriangle size={15} /> Práctica Convencional (A Ciegas)
            </div>
            <h4 className={styles.columnTitle}>Manejo Tradicional Descalibrado</h4>
            <span className={styles.costBadgeTrad}>Costo Insumos: ~$480 USD/ha</span>
          </div>

          <ul className={styles.practiceList}>
            <li className={styles.practiceItemTrad}>
              <span className={styles.bulletTrad}>✕</span>
              <div>
                <strong>Fertilización Química al Voleo:</strong>
                <p>Aplicación uniforme sin mapas de fertilidad; sobrecostos del 30% y quema de raíces.</p>
              </div>
            </li>
            <li className={styles.practiceItemTrad}>
              <span className={styles.bulletTrad}>✕</span>
              <div>
                <strong>Encalado Empírico sin Laboratorio:</strong>
                <p>Uso de cal sin PRNT conocido o balance Ca:Mg, bloqueando fósforo asimilable en suelos ácidos.</p>
              </div>
            </li>
            <li className={styles.practiceItemTrad}>
              <span className={styles.bulletTrad}>✕</span>
              <div>
                <strong>Degradación de Materia Orgánica:</strong>
                <p>Pérdida anual de fertilidad natural (-1.2% MO por década) y pérdida de retención hídrica.</p>
              </div>
            </li>
            <li className={styles.practiceItemTrad}>
              <span className={styles.bulletTrad}>✕</span>
              <div>
                <strong>Emisiones Netas sin Certificación:</strong>
                <p>Emisiones fugitivas de N2O por urea al voleo y $0 de ingresos por sostenibilidad.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Lado Agrotech Venezuela */}
        <div className={styles.practiceColumnAgrotech}>
          <div className={styles.columnHeader}>
            <div className={styles.columnBadgeAgro}>
              <CheckCircle2 size={15} /> Agrotech Venezuela (Prescripción IA)
            </div>
            <h4 className={styles.columnTitle}>Agricultura Regenerativa de Precisión</h4>
            <span className={styles.costBadgeAgro}>Costo Insumos: ~$360 USD/ha (-25%)</span>
          </div>

          <ul className={styles.practiceList}>
            <li className={styles.practiceItemAgro}>
              <span className={styles.bulletAgro}>✓</span>
              <div>
                <strong>Tasa Variable (VRA) para GPS y Dron:</strong>
                <p>Ahorro de $120 USD/ha aplicando únicamente lo requerido según la reflectancia Sentinel-2 y textura.</p>
              </div>
            </li>
            <li className={styles.practiceItemAgro}>
              <span className={styles.bulletAgro}>✓</span>
              <div>
                <strong>Calibración Edafológica Kamprath / Yeso:</strong>
                <p>Neutralización del aluminio tóxico y balance Ca:Mg (3:1) que eleva la asimilación de fósforo al 85%.</p>
              </div>
            </li>
            <li className={styles.practiceItemAgro}>
              <span className={styles.bulletAgro}>✓</span>
              <div>
                <strong>Secuestro de Carbono Verra VCS (+1.8 tCO2e/ha):</strong>
                <p>Recuperación continua de biomasa y suelo, certificable para monetización de bonos internacionales.</p>
              </div>
            </li>
            <li className={styles.practiceItemAgro}>
              <span className={styles.bulletAgro}>✓</span>
              <div>
                <strong>Oráculo Radar SAR Sin Nubes & Lab IoT:</strong>
                <p>Validación de humedad Saxton-Rawls que reduce la incertidumbre de auditoría del 40% al 10%.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
