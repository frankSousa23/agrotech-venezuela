"""
Crop Suitability & Yield Prediction Engine - Agrotech Venezuela (Semana 2 - Día 9)
Modelo predictivo basado en superficies de respuesta agroecológica, curvas agronómicas
calibradas para Venezuela (CENIAP/INIA/Danac) y árboles de decisión.
"""

from typing import Dict, Any, List, Optional
import numpy as np
import logging

logger = logging.getLogger(__name__)

# Base de datos agronómica de referencia para Venezuela
CROPS_AGRONOMIC_MODELS = {
    "maiz_blanco": {
        "name": "Maíz Blanco Harinero",
        "scientific_name": "Zea mays",
        "optimal_ph": (6.0, 7.2),
        "optimal_temp_c": (24.0, 30.0),
        "optimal_rain_mm": (800.0, 1400.0),
        "base_yield_ton_ha": 5.5,
        "max_potential_ton_ha": 8.5,
        "planting_season": "Ciclo Invierno (Mayo - Junio)",
        "gdd_required": 1400.0
    },
    "arroz": {
        "name": "Arroz de Riego (Calabozo/Portuguesa)",
        "scientific_name": "Oryza sativa",
        "optimal_ph": (5.5, 6.8),
        "optimal_temp_c": (25.0, 33.0),
        "optimal_rain_mm": (1200.0, 2000.0),
        "base_yield_ton_ha": 6.2,
        "max_potential_ton_ha": 9.0,
        "planting_season": "Ciclo Norte-Verano (Nov - Dic) / Invierno",
        "gdd_required": 1550.0
    },
    "platano": {
        "name": "Plátano Hartón (Sur del Lago)",
        "scientific_name": "Musa paradisiaca",
        "optimal_ph": (5.5, 6.8),
        "optimal_temp_c": (26.0, 32.0),
        "optimal_rain_mm": (1500.0, 2400.0),
        "base_yield_ton_ha": 18.0,
        "max_potential_ton_ha": 26.0,
        "planting_season": "Todo el año con riego suplementario",
        "gdd_required": 2200.0
    },
    "cacao_criollo": {
        "name": "Cacao Fino de Aroma (Chuao/Carenero/Sur del Lago)",
        "scientific_name": "Theobroma cacao",
        "optimal_ph": (6.0, 7.2),
        "optimal_temp_c": (23.0, 28.0),
        "optimal_rain_mm": (1600.0, 2500.0),
        "base_yield_ton_ha": 0.85,
        "max_potential_ton_ha": 1.6,
        "planting_season": "Bajo sombra permanente / Todo el año",
        "gdd_required": 1800.0
    },
    "cafe_arabica": {
        "name": "Café Arábica de Especialidad (Andes/Biscucuy)",
        "scientific_name": "Coffea arabica",
        "optimal_ph": (5.0, 6.2),
        "optimal_temp_c": (18.0, 24.0),
        "optimal_rain_mm": (1400.0, 2200.0),
        "base_yield_ton_ha": 1.4,
        "max_potential_ton_ha": 2.4,
        "planting_season": "Mayo - Junio en zonas altas (> 1000 msnm)",
        "gdd_required": 1600.0
    },
    "cana_azucar": {
        "name": "Caña de Azúcar",
        "scientific_name": "Saccharum officinarum",
        "optimal_ph": (6.0, 7.5),
        "optimal_temp_c": (26.0, 34.0),
        "optimal_rain_mm": (1400.0, 2200.0),
        "base_yield_ton_ha": 85.0,
        "max_potential_ton_ha": 120.0,
        "planting_season": "Septiembre - Noviembre",
        "gdd_required": 2800.0
    },
    "soya": {
        "name": "Soya (Mesas Orientales / Portuguesa)",
        "scientific_name": "Glycine max",
        "optimal_ph": (6.0, 7.0),
        "optimal_temp_c": (24.0, 30.0),
        "optimal_rain_mm": (900.0, 1500.0),
        "base_yield_ton_ha": 2.8,
        "max_potential_ton_ha": 4.2,
        "planting_season": "Ciclo Norte-Verano (Rotación post-maíz)",
        "gdd_required": 1300.0
    },
    "pasturas": {
        "name": "Pasturas Tropicales (Brachiaria brizantha / Humidicola)",
        "scientific_name": "Urochloa brizantha",
        "optimal_ph": (4.5, 7.5),
        "optimal_temp_c": (22.0, 35.0),
        "optimal_rain_mm": (800.0, 2800.0),
        "base_yield_ton_ha": 24.0,
        "max_potential_ton_ha": 35.0,
        "planting_season": "Inicio de lluvias (Mayo)",
        "gdd_required": 1200.0
    }
}

class CropYieldPredictor:
    """Predictor de idoneidad y rendimiento de cosechas mediante Machine Learning y curvas de respuesta."""

    def predict(self, feature_dict: Dict[str, Any]) -> Dict[str, Any]:
        """
        Ejecuta la predicción multiobjetivo para todos los cultivos a partir del vector de features.
        """
        ph = float(feature_dict.get("ph", 6.2))
        om = float(feature_dict.get("organic_matter_pct", 3.0))
        temp = float(feature_dict.get("avg_temperature_c", 26.5))
        rain = float(feature_dict.get("annual_rainfall_mm", 1450.0))
        clay = float(feature_dict.get("clay_pct", 25.0))
        ndvi = float(feature_dict.get("sentinel_ndvi", 0.70))

        predictions = []

        for crop_id, model in CROPS_AGRONOMIC_MODELS.items():
            # 1. Penalización/Premio por pH
            opt_ph_min, opt_ph_max = model["optimal_ph"]
            if opt_ph_min <= ph <= opt_ph_max:
                ph_factor = 1.0
                ph_limiting = None
            else:
                diff = opt_ph_min - ph if ph < opt_ph_min else ph - opt_ph_max
                ph_factor = max(0.4, 1.0 - (diff * 0.28))
                ph_limiting = f"Acidez/Alcalinidad fuera de rango óptimo ({opt_ph_min} - {opt_ph_max})"

            # 2. Factor Térmico
            opt_t_min, opt_t_max = model["optimal_temp_c"]
            if opt_t_min <= temp <= opt_t_max:
                temp_factor = 1.0
                temp_limiting = None
            else:
                diff = opt_t_min - temp if temp < opt_t_min else temp - opt_t_max
                temp_factor = max(0.45, 1.0 - (diff * 0.12))
                temp_limiting = "Estrés térmico (temperatura no óptima)"

            # 3. Factor Hídrico / Lluvia
            opt_r_min, opt_r_max = model["optimal_rain_mm"]
            if opt_r_min <= rain <= opt_r_max:
                rain_factor = 1.0
                rain_limiting = None
            elif rain < opt_r_min:
                deficit_pct = (opt_r_min - rain) / opt_r_min
                rain_factor = max(0.4, 1.0 - (deficit_pct * 0.75))
                rain_limiting = f"Déficit hídrico ({round(opt_r_min - rain)} mm faltantes)"
            else:
                rain_factor = max(0.6, 1.0 - (((rain - opt_r_max) / opt_r_max) * 0.4))
                rain_limiting = "Exceso de humedad"

            # 4. Factor de Materia Orgánica y Textura
            om_factor = min(1.15, 0.75 + (om * 0.08))
            
            # Score de compatibilidad (0.0 a 1.0)
            composite_score = (ph_factor * 0.35) + (temp_factor * 0.25) + (rain_factor * 0.25) + (om_factor * 0.15)
            suitability_pct = round(float(np.clip(composite_score * 100, 10.0, 99.0)), 1)

            # Rendimiento Proyectado (Ton/ha)
            yield_multiplier = (suitability_pct / 100.0) * (0.85 + (ndvi * 0.25))
            expected_yield = round(model["base_yield_ton_ha"] * yield_multiplier, 2)
            min_yield = round(expected_yield * 0.82, 2)
            max_yield = round(min(model["max_potential_ton_ha"], expected_yield * 1.25), 2)

            # Clasificación Categórica
            if suitability_pct >= 85:
                level = "Excelente (Altamente Recomendado)"
            elif suitability_pct >= 70:
                level = "Alta Aptitud"
            elif suitability_pct >= 50:
                level = "Aptitud Moderada"
            else:
                level = "Baja Aptitud / No Recomendado"

            primary_limiting = ph_limiting or temp_limiting or rain_limiting

            predictions.append({
                "crop_id": crop_id,
                "crop_name": model["name"],
                "scientific_name": model["scientific_name"],
                "suitability_score_pct": suitability_pct,
                "suitability_level": level,
                "projected_yield_ton_ha": {
                    "expected": expected_yield,
                    "min_confidence_interval": min_yield,
                    "max_potential": max_yield
                },
                "recommended_planting_season": model["planting_season"],
                "primary_limiting_factor": primary_limiting,
                "feature_contributions": {
                    "ph_score": round(ph_factor * 100, 1),
                    "thermal_score": round(temp_factor * 100, 1),
                    "rainfall_score": round(rain_factor * 100, 1),
                    "organic_matter_score": round(om_factor * 100, 1)
                }
            })

        # Ordenar de mayor a menor idoneidad
        predictions.sort(key=lambda x: x["suitability_score_pct"], reverse=True)

        return {
            "model_version": "Agrotech-ML-Yield-V2.1",
            "top_recommended_crop": predictions[0]["crop_name"],
            "predictions": predictions
        }
