'use client';

import React, { useState, useMemo } from 'react';
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
  Sliders,
  Tractor,
  Users,
  Info,
  MapPin,
  Settings2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  calculateOperationalRoi, 
  FarmingProfile, 
  ROI_DEFAULTS 
} from '@/lib/agronomy/roiCostEngine';
import { useUIMode } from '@/lib/context/UIModeContext';
import AgroTooltip from '@/components/ui/AgroTooltip';

export interface LinkedParcelData {
  id?: string;
  name?: string;
  areaHa?: number;
  crop?: string;
  ph?: number;
  texture?: string;
}

export interface ImpactRoiWidgetProps {
  initialAreaHa?: number;
  cropName?: string;
  initialProfile?: FarmingProfile;
  initialParcel?: LinkedParcelData;
}

export default function ImpactRoiWidget({
  initialAreaHa = 20,
  cropName = 'Maíz Blanco Harinero',
  initialProfile,
  initialParcel
}: ImpactRoiWidgetProps) {
  const { isFarmerMode } = useUIMode();

  // Estados principales de simulación
  const effectiveArea = initialParcel?.areaHa ?? initialAreaHa;
  const effectiveCrop = initialParcel?.crop ?? cropName;

  const [areaHa, setAreaHa] = useState<number>(effectiveArea);
  const [profile, setProfile] = useState<FarmingProfile>(
    initialProfile ?? (isFarmerMode ? 'smallholder_manual' : 'mechanized')
  );

  // Parámetros de costeo ajustables - Mecanizado
  const [fertSavingsHa, setFertSavingsHa] = useState<number>(ROI_DEFAULTS.MECHANIZED.fertilizerSavingsPerHa);
  const [dieselLitersHa, setDieselLitersHa] = useState<number>(ROI_DEFAULTS.MECHANIZED.dieselSavedLitersPerHa);
  const [dieselPrice, setDieselPrice] = useState<number>(ROI_DEFAULTS.MECHANIZED.dieselPricePerLiter);

  // Parámetros de costeo ajustables - Pequeño Productor / Conuco
  const [sacksSavedHa, setSacksSavedHa] = useState<number>(ROI_DEFAULTS.SMALLHOLDER.fertilizerSacksSavedPerHa);
  const [sackPrice, setSackPrice] = useState<number>(ROI_DEFAULTS.SMALLHOLDER.sackPriceUsd);
  const [jornalesSavedHa, setJornalesSavedHa] = useState<number>(ROI_DEFAULTS.SMALLHOLDER.jornalesSavedPerHa);
  const [jornalRate, setJornalRate] = useState<number>(ROI_DEFAULTS.SMALLHOLDER.jornalRateUsd);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Cálculo del motor desacoplado de ROI
  const roi = useMemo(() => {
    return calculateOperationalRoi({
      areaHa,
      cropName: effectiveCrop,
      profile,
      // Mecanizado
      fertilizerSavingsPerHa: fertSavingsHa,
      dieselSavedLitersPerHa: dieselLitersHa,
      dieselPricePerLiter: dieselPrice,
      // Pequeño Productor
      fertilizerSacksSavedPerHa: sacksSavedHa,
      sackPriceUsd: sackPrice,
      jornalesSavedPerHa: jornalesSavedHa,
      jornalRateUsd: jornalRate,
    });
  }, [
    areaHa,
    effectiveCrop,
    profile,
    fertSavingsHa,
    dieselLitersHa,
    dieselPrice,
    sacksSavedHa,
    sackPrice,
    jornalesSavedHa,
    jornalRate,
  ]);

  return (
    <div className={styles.roiContainer} id="impact_roi_widget">
      {/* Banner de Parcela Vinculada si está presente */}
      {initialParcel?.name && (
        <div className={styles.parcelBanner} id="roi_linked_parcel_badge">
          <MapPin size={14} />
          <span>
            Parcela Vinculada: <strong>{initialParcel.name}</strong> ({areaHa} ha) • Cultivo: <strong>{effectiveCrop}</strong>
            {initialParcel.ph && ` • pH: ${initialParcel.ph}`}
          </span>
        </div>
      )}

      {/* Encabezado */}
      <div className={styles.widgetHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.badgeRow}>
            <span className={styles.badgePill}>
              <Sparkles size={14} /> Retorno de Inversión (ROI) Agronómico
            </span>
            <span className={styles.badgeVerra}>
              <ShieldCheck size={14} /> Flujo de Caja Operativo Real
            </span>
          </div>
          <h3 className={styles.heading}>
            Retorno Operativo en Finca y Beneficio de Cosecha
          </h3>
          <p className={styles.subheading}>
            Modelado sobre insumos reales, combustible o jornales y rendimiento comercial en Venezuela (desacoplado de especulación de carbono).
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
            max={profile === 'smallholder_manual' ? '25' : '150'}
            step="1"
            value={areaHa}
            onChange={(e) => setAreaHa(parseInt(e.target.value, 10))}
            className={styles.rangeInput}
          />
          <div className={styles.quickButtonsRow}>
            {(profile === 'smallholder_manual' ? [1, 2, 5, 10, 20] : [5, 15, 30, 60, 100]).map((quick) => (
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

      {/* Selector de Perfil Operativo (Mecanizado vs Pequeño Productor / Conuco) */}
      <div className={styles.profileToggleRow} id="roi_profile_selector">
        <div className={styles.profileToggleLabel}>
          <span>Perfil Productivo:</span>
          <AgroTooltip
            title="Selección de Escala y Maquinaria"
            text="Adapta el cálculo entre fincas mecanizadas con tractor y pequeños productores/conuqueros que adquieren sacos en agrotienda y emplean jornales manuales."
          />
        </div>

        <div className={styles.profileButtonGroup}>
          <button
            type="button"
            id="profile_btn_mechanized"
            className={`${styles.profileButton} ${profile === 'mechanized' ? styles.profileButtonActive : ''}`}
            onClick={() => setProfile('mechanized')}
          >
            <Tractor size={15} />
            <span>Mecanizado (Tractor & Granel)</span>
          </button>
          <button
            type="button"
            id="profile_btn_smallholder"
            className={`${styles.profileButton} ${profile === 'smallholder_manual' ? styles.profileButtonActive : ''}`}
            onClick={() => setProfile('smallholder_manual')}
          >
            <Users size={15} />
            <span>Pequeño Productor (Manual & Sacos)</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Settings2 size={13} />
          <span>{showAdvanced ? 'Ocultar Parámetros' : 'Calibrar Costos'}</span>
          {showAdvanced ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Parámetros Avanzados Ajustables (Si está abierto) */}
      {showAdvanced && (
        <div className={styles.customParamsContainer} id="roi_advanced_params_box">
          <div className={styles.customParamsGrid}>
            {profile === 'smallholder_manual' ? (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Sacos Ahorrados (50 kg / ha):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={sacksSavedHa}
                    onChange={(e) => setSacksSavedHa(parseFloat(e.target.value) || 0)}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Precio Saco en Agrotienda ($ USD):</label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={sackPrice}
                    onChange={(e) => setSackPrice(parseFloat(e.target.value) || 0)}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Jornales Ahorrados por ha:</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={jornalesSavedHa}
                    onChange={(e) => setJornalesSavedHa(parseFloat(e.target.value) || 0)}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Costo del Jornal ($ USD/día):</label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={jornalRate}
                    onChange={(e) => setJornalRate(parseFloat(e.target.value) || 0)}
                    className={styles.numberInput}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Ahorro Fertilizante Granel ($/ha):</label>
                  <input
                    type="number"
                    step="10"
                    min="0"
                    value={fertSavingsHa}
                    onChange={(e) => setFertSavingsHa(parseFloat(e.target.value) || 0)}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Gasoil Ahorrado (Litros/ha):</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={dieselLitersHa}
                    onChange={(e) => setDieselLitersHa(parseFloat(e.target.value) || 0)}
                    className={styles.numberInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Precio Gasoil ($ USD/Litro):</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    value={dieselPrice}
                    onChange={(e) => setDieselPrice(parseFloat(e.target.value) || 0)}
                    className={styles.numberInput}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Banner Vernacular para Modo Campesino Fácil o Pequeño Productor */}
      {(isFarmerMode || profile === 'smallholder_manual') && (
        <div className={styles.vernacularBanner} id="roi_vernacular_banner">
          <div className={styles.vernacularIcon}>
            <Users size={18} />
          </div>
          <div>
            <strong style={{ fontSize: '0.85rem', color: '#86efac', display: 'block', marginBottom: '2px' }}>
              Impacto Tangible en Campo:
            </strong>
            <p className={styles.vernacularText}>
              {roi.vernacular.formattedHighlight}.
              {roi.vernacular.jornalesSaved > 0 && ` Ahorras ~${roi.vernacular.jornalesSaved} jornales de trabajo manual por evitar sobreaplicación.`}
            </p>
          </div>
        </div>
      )}

      {/* Grid de Resumen de Impacto Financiero Operativo */}
      <div className={styles.kpiSummaryGrid}>
        {/* KPI 1: Fertilizante */}
        <div className={styles.kpiCard} id="kpi_fertilizer_savings">
          <div className={styles.kpiIcon} style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
            <DollarSign size={20} />
          </div>
          <div>
            <div className={styles.kpiLabel}>
              {profile === 'smallholder_manual' ? 'Ahorro en Sacos de Abono' : 'Ahorro Fertilizante / Cal'}
            </div>
            <div className={styles.kpiValue} style={{ color: '#4ade80' }}>
              ${roi.totalFertilizerSavings.toLocaleString()} USD
            </div>
            <div className={styles.kpiSub}>
              {profile === 'smallholder_manual' 
                ? `~${roi.vernacular.sacksFertilizerSaved} sacos comerciales no gastados`
                : `-$${Math.round(roi.totalFertilizerSavings / areaHa)} USD/ha optimizado`}
            </div>
          </div>
        </div>

        {/* KPI 2: Operativo (Diesel o Jornales) */}
        <div className={styles.kpiCard} id="kpi_operational_savings">
          <div className={styles.kpiIcon} style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
            {profile === 'smallholder_manual' ? <Users size={20} /> : <Tractor size={20} />}
          </div>
          <div>
            <div className={styles.kpiLabel}>
              {profile === 'smallholder_manual' ? 'Ahorro en Jornales Manuales' : 'Ahorro Diesel y Maquinaria'}
            </div>
            <div className={styles.kpiValue} style={{ color: '#fbbf24' }}>
              +${roi.totalOperationalSavings.toLocaleString()} USD
            </div>
            <div className={styles.kpiSub}>
              {profile === 'smallholder_manual'
                ? `~${roi.vernacular.jornalesSaved} días de mano de obra evitados`
                : `Menos pasadas de tractor ($0.60/L gasoil)`}
            </div>
          </div>
        </div>

        {/* KPI 3: Rendimiento Cosecha */}
        <div className={styles.kpiCard} id="kpi_yield_revenue">
          <div className={styles.kpiIcon} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <div className={styles.kpiLabel}>Plus Rendimiento Cosecha</div>
            <div className={styles.kpiValue} style={{ color: '#38bdf8' }}>
              +${roi.totalExtraYieldRevenue.toLocaleString()} USD
            </div>
            <div className={styles.kpiSub}>
              +{roi.totalExtraYieldTons} Ton ({roi.vernacular.extraSacksHarvested} sacos extra)
            </div>
          </div>
        </div>

        {/* KPI 4: Riego / Bombeo PAW */}
        <div className={styles.kpiCard} id="kpi_irrigation_savings">
          <div className={styles.kpiIcon} style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
            <Droplets size={20} />
          </div>
          <div>
            <div className={styles.kpiLabel}>Ahorro Riego / Bombeo</div>
            <div className={styles.kpiValue} style={{ color: '#c084fc' }}>
              +${roi.totalIrrigationSavings.toLocaleString()} USD
            </div>
            <div className={styles.kpiSub}>
              💧 {roi.totalWaterSavedM3.toLocaleString()} m³ agua protegida
            </div>
          </div>
        </div>

        {/* KPI Highlight: Flujo de Caja Operativo Neto Real (Desacoplado de Carbono) */}
        <div className={styles.kpiCardHighlight} id="kpi_net_operational_profit" style={{ gridColumn: '1 / -1' }}>
          <div className={styles.kpiIcon} style={{ background: '#059669', color: '#ffffff' }}>
            <Sparkles size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div className={styles.kpiLabel} style={{ color: '#a7f3d0', fontSize: '0.85rem', fontWeight: 700 }}>
                Retorno Operativo Neto en Finca (Bolsillo del Productor)
              </div>
              <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.3)', color: '#a7f3d0', padding: '2px 8px', borderRadius: '4px' }}>
                Flujo de Caja Real en Venezuela
              </span>
            </div>
            <div className={styles.kpiValueLarge}>
              +${roi.netOperationalProfit.toLocaleString()} USD
            </div>
            <div className={styles.kpiSub} style={{ color: '#d1fae5' }}>
              Equivalente a <strong>+${roi.netProfitPerHa} USD/ha</strong> de margen operativo neto adicional por manejo inteligente de insumos y suelo.
            </div>
          </div>
        </div>
      </div>

      {/* 🌿 Módulo Desacoplado: Simulación Ambiental & Bonos de Carbono (ESG) */}
      <div className={styles.esgSimulationCard} id="roi_esg_carbon_simulation">
        <div className={styles.esgHeader}>
          <div className={styles.esgTitleGroup}>
            <Leaf size={16} color="#38bdf8" />
            <h4 className={styles.esgTitle}>
              Proyección Ambiental y Potencial de Bonos Verdes (ESG)
            </h4>
          </div>
          <span className={styles.esgBadge}>
            Simulación Prospectiva / No Sumado al Flujo Operativo
          </span>
        </div>

        <div className={styles.esgMetricsGrid}>
          <div className={styles.esgMetricBox}>
            <div className={styles.esgMetricLabel}>Captura de Carbono Estimada</div>
            <div className={styles.esgMetricValue}>
              {roi.esgSimulation.annualCo2SequesteredTons} <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>tCO₂e/año</span>
            </div>
            <div className={styles.esgMetricSub}>Bajo labranza reducida y coberturas</div>
          </div>

          <div className={styles.esgMetricBox}>
            <div className={styles.esgMetricLabel}>Valor Teórico en Mercados Verdes</div>
            <div className={styles.esgMetricValue}>
              +${roi.esgSimulation.potentialCarbonCreditRevenueUsd.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>USD/año</span>
            </div>
            <div className={styles.esgMetricSub}>A ${roi.esgSimulation.carbonPriceUsdPerTon} USD/tCO₂e certificado</div>
          </div>
        </div>

        <p className={styles.esgDisclaimer}>
          <strong>Nota de Rigor Financiero:</strong> {roi.esgSimulation.disclaimer}
        </p>
      </div>

      {/* Comparador Split-Screen: Tradicional vs Agrotech */}
      <div className={styles.splitScreenContainer}>
        {/* Lado Tradicional */}
        <div className={styles.practiceColumnTraditional}>
          <div className={styles.columnHeader}>
            <div className={styles.columnBadgeTrad}>
              <AlertTriangle size={15} /> Práctica Convencional (A Ciegas)
            </div>
            <h4 className={styles.columnTitle}>
              {profile === 'smallholder_manual' ? 'Conuco Tradicional sin Calibración' : 'Manejo Extensivo sin Mapas'}
            </h4>
            <span className={styles.costBadgeTrad}>
              {profile === 'smallholder_manual' ? 'Gasto Excesivo: ~$420 USD/ha' : 'Costo Insumos: ~$480 USD/ha'}
            </span>
          </div>

          <ul className={styles.practiceList}>
            <li className={styles.practiceItemTrad}>
              <span className={styles.bulletTrad}>✕</span>
              <div>
                <strong>{profile === 'smallholder_manual' ? 'Compra Innecesaria de Sacos:' : 'Fertilización Química al Voleo:'}</strong>
                <p>
                  {profile === 'smallholder_manual' 
                    ? 'Compra de sacos de fórmula completa a $38-$45 sin saber si el suelo ya tiene fósforo acumulado.' 
                    : 'Aplicación uniforme sin mapas de fertilidad; sobrecostos del 30% y quema de raíces.'}
                </p>
              </div>
            </li>
            <li className={styles.practiceItemTrad}>
              <span className={styles.bulletTrad}>✕</span>
              <div>
                <strong>{profile === 'smallholder_manual' ? 'Jornales Desperdiciados:' : 'Encalado Empírico sin Laboratorio:'}</strong>
                <p>
                  {profile === 'smallholder_manual'
                    ? 'Días de trabajo manual reaplicando pesticidas de mochila por no anticipar ventanas agroclimáticas.'
                    : 'Uso de cal sin PRNT conocido o balance Ca:Mg, bloqueando fósforo asimilable en suelos ácidos.'}
                </p>
              </div>
            </li>
            <li className={styles.practiceItemTrad}>
              <span className={styles.bulletTrad}>✕</span>
              <div>
                <strong>Degradación de Materia Orgánica:</strong>
                <p>Pérdida anual de fertilidad natural (-1.2% MO por década) y menor retención de humedad en raíces.</p>
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
            <h4 className={styles.columnTitle}>
              {profile === 'smallholder_manual' ? 'Manejo Eficiente Campesino' : 'Agricultura Regenerativa de Precisión'}
            </h4>
            <span className={styles.costBadgeAgro}>
              {profile === 'smallholder_manual' ? 'Ahorro Inmediato: ~25-30% en Sacos' : 'Costo Insumos: ~$360 USD/ha (-25%)'}
            </span>
          </div>

          <ul className={styles.practiceList}>
            <li className={styles.practiceItemAgro}>
              <span className={styles.bulletAgro}>✓</span>
              <div>
                <strong>{profile === 'smallholder_manual' ? 'Dosis Exacta en Sacos y Kilos:' : 'Tasa Variable (VRA) para GPS y Dron:'}</strong>
                <p>
                  {profile === 'smallholder_manual'
                    ? 'Recomendaciones en medidas cotidianas (sacos de 50 kg) que evitan gastar de más en la agrotienda local.'
                    : 'Ahorro de $120 USD/ha aplicando únicamente lo requerido según la reflectancia Sentinel-2 y textura.'}
                </p>
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
                <strong>Microrriego Predictivo NASA POWER:</strong>
                <p>Balance hídrico P - ETc que ahorra hasta {roi.totalWaterSavedM3.toLocaleString()} m³ de agua y energía de bombeo.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
