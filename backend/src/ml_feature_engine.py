"""
ML Feature Engineering & Vector Normalizer - Agrotech Venezuela (Semana 2 - Día 8)
Módulo para la consolidación, normalización y preprocesamiento de vectores
multidimensionales a partir de fuentes satelitales (MapBiomas, Sentinel-2),
agroclimáticas (NASA POWER) y fisicoquímicas del suelo.
"""

from typing import Dict, Any, List, Optional
import numpy as np
import logging

logger = logging.getLogger(__name__)

# Textura edafológica estimada a porcentajes granulométricos (Arena, Limo, Arcilla)
TEXTURE_GRANULOMETRY = {
    "arcilloso": {"sand": 20.0, "silt": 25.0, "clay": 55.0},
    "franco-arcilloso": {"sand": 35.0, "silt": 35.0, "clay": 30.0},
    "franco-limoso": {"sand": 20.0, "silt": 65.0, "clay": 15.0},
    "franco": {"sand": 40.0, "silt": 40.0, "clay": 20.0},
    "franco-arenoso": {"sand": 65.0, "silt": 25.0, "clay": 10.0},
    "arenoso": {"sand": 85.0, "silt": 10.0, "clay": 5.0},
    "default": {"sand": 40.0, "silt": 40.0, "clay": 20.0}
}

class MLFeatureEngine:
    """Motor de ingeniería de características para modelos predictivos agronómicos."""

    FEATURE_NAMES = [
        "ph",
        "organic_matter_pct",
        "sand_pct",
        "silt_pct",
        "clay_pct",
        "annual_rainfall_mm",
        "avg_temperature_c",
        "growing_degree_days_gdd",
        "solar_radiation_mj_m2",
        "sentinel_ndvi",
        "sentinel_ndwi",
        "mapbiomas_agri_history_ratio",
        "mapbiomas_forest_history_ratio",
        "mapbiomas_pasture_history_ratio"
    ]

    def build_feature_vector(
        self,
        soil_profile: Dict[str, Any],
        agroclimate: Dict[str, Any],
        sentinel_metrics: Dict[str, Any],
        mapbiomas_history: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Construye el vector estructurado de características a partir de los datos espaciales.
        """
        # 1. Variables de Suelo
        ph = float(soil_profile.get("ph", 6.2))
        om = float(soil_profile.get("organic_matter_pct", soil_profile.get("organicMatter", 3.0)))
        texture_str = str(soil_profile.get("texture", "Franco")).lower()
        
        granulo = TEXTURE_GRANULOMETRY.get(texture_str, TEXTURE_GRANULOMETRY["default"])
        for k in TEXTURE_GRANULOMETRY.keys():
            if k in texture_str:
                granulo = TEXTURE_GRANULOMETRY[k]
                break

        # 2. Variables Agroclimáticas (NASA POWER)
        clim_summary = agroclimate.get("summary", {})
        temp = float(clim_summary.get("avg_temperature_c", 26.5))
        rainfall = float(clim_summary.get("accumulated_rainfall_mm", 1450.0))
        gdd = float(clim_summary.get("growing_degree_days_gdd", 420.0))
        rad = float(clim_summary.get("avg_solar_radiation_mj_m2", 18.2))

        # 3. Variables de Vegetación (Sentinel-2 L2A SCL)
        sent_metrics = sentinel_metrics.get("latest_metrics", {})
        ndvi = float(sent_metrics.get("ndvi", 0.70))
        ndwi = float(sent_metrics.get("ndwi", 0.25))

        # 4. Variables Históricas (MapBiomas 40 Años)
        annual_series = mapbiomas_history.get("annual_series", {})
        total_years = max(1, len(annual_series))
        agri_years = sum(1 for y in annual_series.values() if y.get("class_id") in [18, 19, 20, 21])
        forest_years = sum(1 for y in annual_series.values() if y.get("class_id") in [1, 3, 4])
        pasture_years = sum(1 for y in annual_series.values() if y.get("class_id") == 15)

        agri_ratio = round(agri_years / total_years, 3)
        forest_ratio = round(forest_years / total_years, 3)
        pasture_ratio = round(pasture_years / total_years, 3)

        features = {
            "ph": ph,
            "organic_matter_pct": om,
            "sand_pct": granulo["sand"],
            "silt_pct": granulo["silt"],
            "clay_pct": granulo["clay"],
            "annual_rainfall_mm": rainfall,
            "avg_temperature_c": temp,
            "growing_degree_days_gdd": gdd,
            "solar_radiation_mj_m2": rad,
            "sentinel_ndvi": ndvi,
            "sentinel_ndwi": ndwi,
            "mapbiomas_agri_history_ratio": agri_ratio,
            "mapbiomas_forest_history_ratio": forest_ratio,
            "mapbiomas_pasture_history_ratio": pasture_ratio
        }

        feature_array = [features[col] for col in self.FEATURE_NAMES]

        return {
            "feature_names": self.FEATURE_NAMES,
            "features_dict": features,
            "feature_vector": feature_array
        }

    def normalize_vector(self, vector: List[float]) -> List[float]:
        """Normalización Min-Max estándar para modelos de redes y aprendizaje supervisado."""
        v = np.array(vector, dtype=np.float64)
        # Rango esperado para cada feature
        ranges = [
            (3.5, 9.0),   # ph
            (0.5, 8.0),   # om
            (0.0, 100.0), # sand
            (0.0, 100.0), # silt
            (0.0, 100.0), # clay
            (300.0, 3000.0), # rainfall
            (10.0, 38.0), # temp
            (50.0, 900.0), # gdd
            (5.0, 30.0),  # rad
            (0.0, 1.0),   # ndvi
            (-0.5, 0.8),  # ndwi
            (0.0, 1.0),   # agri_ratio
            (0.0, 1.0),   # forest_ratio
            (0.0, 1.0)    # pasture_ratio
        ]

        normalized = []
        for i, val in enumerate(v):
            min_v, max_v = ranges[i]
            norm_val = (val - min_v) / (max_v - min_v) if max_v > min_v else 0.5
            normalized.append(round(float(np.clip(norm_val, 0.0, 1.0)), 4))

        return normalized
