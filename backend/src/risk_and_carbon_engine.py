"""
Agricultural Risk & Soil Carbon Modeling Engine - Agrotech Venezuela (Semana 2 - Día 10)
Módulo para la cuantificación de riesgos agroclimáticos (Sequía, Encharcamiento, Acidez, Calor)
y modelado de captura de Carbono Orgánico del Suelo (SOC) y créditos de carbono equivalentes (CO2e).
"""

import logging
from typing import Any, Dict

logger = logging.getLogger(__name__)


class RiskAndCarbonEngine:
    """Motor de evaluación de riesgos agronómicos y balances de captura de carbono."""

    def evaluate_risks(self, feature_dict: Dict[str, Any]) -> Dict[str, Any]:
        """Evalúa los 4 riesgos agroclimáticos principales para la parcela."""
        ph = float(feature_dict.get("ph", 6.2))
        rain = float(feature_dict.get("annual_rainfall_mm", 1450.0))
        temp = float(feature_dict.get("avg_temperature_c", 26.5))
        ndwi = float(feature_dict.get("sentinel_ndwi", 0.25))
        clay = float(feature_dict.get("clay_pct", 25.0))

        # 1. Riesgo de Sequía / Estrés Hídrico
        if ndwi < 0.10 or rain < 850.0:
            drought_level = "ALTO"
            drought_score = 78
            drought_action = "Implementar riego por goteo/aspersión y cobertura vegetal (mulching)."
        elif ndwi < 0.22 or rain < 1200.0:
            drought_level = "MODERADO"
            drought_score = 45
            drought_action = "Monitorear humedad del suelo en épocas de estiaje (Enero - Abril)."
        else:
            drought_level = "BAJO"
            drought_score = 15
            drought_action = "Disponibilidad hídrica adecuada."

        # 2. Riesgo de Encharcamiento / Asfixia Radicular
        if clay > 45.0 and rain > 1600.0:
            flood_level = "ALTO"
            flood_score = 82
            flood_action = "Construcción obligatoria de drenajes agrícolas profundos y camellones."
        elif clay > 35.0 or rain > 1800.0:
            flood_level = "MODERADO"
            flood_score = 48
            flood_action = "Mantener zanjas de drenaje perimetrales limpias."
        else:
            flood_level = "BAJO"
            flood_score = 12
            flood_action = "Buen drenaje natural del perfil edáfico."

        # 3. Riesgo de Acidez Crítica y Toxicidad por Aluminio
        if ph < 5.0:
            acidity_level = "CRÍTICO"
            acidity_score = 90
            acidity_action = (
                "Encalado urgente con Cal Dolomítica (CaCO3 + MgCO3) para desbloquear Fósforo."
            )
        elif ph < 5.8:
            acidity_level = "MODERADO"
            acidity_score = 55
            acidity_action = "Aplicar enmiendas calcáreas periódicas cada 2 ciclos de cultivo."
        else:
            acidity_level = "BAJO"
            acidity_score = 10
            acidity_action = "pH en rango equilibrado para asimilación nutricional."

        # 4. Riesgo de Estrés Térmico
        if temp > 30.0:
            thermal_level = "ALTO"
            thermal_score = 72
            thermal_action = (
                "Seleccionar variedades tolerantes a altas temperaturas y sombrío temporal."
            )
        elif temp > 27.5:
            thermal_level = "MODERADO"
            thermal_score = 40
            thermal_action = "Condiciones tropicales estándar."
        else:
            thermal_level = "BAJO"
            thermal_score = 15
            thermal_action = "Clima templado a fresco favorable."

        overall_risk_index = round(
            (drought_score + flood_score + acidity_score + thermal_score) / 4.0, 1
        )

        return {
            "overall_risk_index_pct": overall_risk_index,
            "overall_risk_category": (
                "ALTO"
                if overall_risk_index > 60
                else "MODERADO" if overall_risk_index > 35 else "BAJO"
            ),
            "risk_breakdown": {
                "drought_stress": {
                    "level": drought_level,
                    "score": drought_score,
                    "mitigation": drought_action,
                },
                "waterlogging_flood": {
                    "level": flood_level,
                    "score": flood_score,
                    "mitigation": flood_action,
                },
                "soil_acidity_aluminum": {
                    "level": acidity_level,
                    "score": acidity_score,
                    "mitigation": acidity_action,
                },
                "thermal_extreme": {
                    "level": thermal_level,
                    "score": thermal_score,
                    "mitigation": thermal_action,
                },
            },
        }

    def model_carbon_sequestration(
        self,
        feature_dict: Dict[str, Any],
        parcel_area_ha: float = 10.0,
        verified_diary_practices: Any = None,
        sar_oracle_ratio_db: Any = None,
    ) -> Dict[str, Any]:
        """
        Calcula el stock actual de Carbono Orgánico del Suelo (SOC) y el potencial de fijación de CO2
        anual bajo diferentes prácticas de manejo regenerativo, acoplado a bitácora empírica y
        oráculo radar Sentinel-1 SAR para certificación Verra VCS / IPCC Tier 2.
        """
        om_pct = float(feature_dict.get("organic_matter_pct", 3.0))
        clay_pct = float(feature_dict.get("clay_pct", 25.0))

        # Densidad aparente estimada (g/cm3) según textura
        bulk_density = round(1.55 - (om_pct * 0.05) - (clay_pct * 0.003), 2)
        depth_cm = 30.0  # Primeros 30 cm de perfil arable

        # Stock de carbono actual (Ton C / ha) = %MO * 0.58 (Factor van Bemmelen) * Densidad * Profundidad * 100
        current_soc_ton_c_ha = round((om_pct * 0.58) * bulk_density * (depth_cm / 10.0), 2)
        total_current_soc_ton = round(current_soc_ton_c_ha * parcel_area_ha, 1)

        # Ajuste empírico si se han verificado labores de campo en la bitácora
        diary_list = verified_diary_practices or []
        ground_truth_bonus = 0.0
        if "SIEMBRA_DIRECTA" in diary_list:
            ground_truth_bonus += 0.35
        if "ABONO_VERDE" in diary_list:
            ground_truth_bonus += 0.25
        if "ENCALADO_DOLOMITICO" in diary_list:
            ground_truth_bonus += 0.15

        # Potencial de secuestro anual según manejo (Ton CO2e / ha / año)
        # Factor C a CO2 = 44 / 12 = 3.67
        reg_base = round(1.95 + (ground_truth_bonus * 3.67), 2)

        scenarios = {
            "agroforestry_shaded_cacao_coffee": {
                "practice": "Sistemas Agroforestales (Cacao/Café bajo Sombra)",
                "annual_co2_seq_ton_ha_yr": 3.85,
                "total_annual_co2_seq_ton": round(3.85 * parcel_area_ha, 1),
            },
            "silvopastoral_grazing": {
                "practice": "Pastoreo Racional Silvopastoril con Árboles Forrajeros",
                "annual_co2_seq_ton_ha_yr": 2.40,
                "total_annual_co2_seq_ton": round(2.40 * parcel_area_ha, 1),
            },
            "regenerative_no_till_cover_crops": {
                "practice": "Siembra Directa + Cultivos de Cobertura (Rotación Soya-Maíz)",
                "annual_co2_seq_ton_ha_yr": reg_base,
                "total_annual_co2_seq_ton": round(reg_base * parcel_area_ha, 1),
                "empirical_bonus_applied": ground_truth_bonus > 0,
            },
            "conventional_tillage": {
                "practice": "Labranza Convencional Intensiva",
                "annual_co2_seq_ton_ha_yr": -0.45,  # Emisión neta
                "total_annual_co2_seq_ton": round(-0.45 * parcel_area_ha, 1),
            },
        }

        # Auditoría MRV y Oráculo Radar Sentinel-1 SAR
        uncertainty_penalty = 40.0  # Penalización base por incertidumbre en Tier 1
        sar_verified = False

        if diary_list:
            uncertainty_penalty -= 15.0  # Verificación empírica en terreno

        if sar_oracle_ratio_db is not None and float(sar_oracle_ratio_db) > -12.0:
            uncertainty_penalty -= 15.0  # Rugosidad confirmada por radar SAR C-Band
            sar_verified = True

        mrv_verification = {
            "baseline_uncertainty_pct": 40.0,
            "final_uncertainty_penalty_pct": round(uncertainty_penalty, 1),
            "ground_truth_practices_detected": diary_list,
            "sar_oracle_roughness_verified": sar_verified,
            "sar_cross_ratio_db": sar_oracle_ratio_db,
            "certification_tier": "TIER_2_VERRA_GOLD" if uncertainty_penalty <= 15.0 else "TIER_1_STANDARD",
            "net_certifiable_issuance_factor": round(1.0 - (uncertainty_penalty / 100.0), 2),
        }

        return {
            "soil_metrics": {
                "current_organic_matter_pct": om_pct,
                "estimated_bulk_density_g_cm3": bulk_density,
                "current_soc_ton_c_per_ha": current_soc_ton_c_ha,
                "total_farm_soc_stock_ton_c": total_current_soc_ton,
                "analyzed_area_ha": parcel_area_ha,
            },
            "annual_sequestration_scenarios": scenarios,
            "mrv_verification": mrv_verification,
        }
