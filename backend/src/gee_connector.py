"""
Google Earth Engine (GEE) Connector - Agrotech Venezuela
Módulo de conexión y extracción de datos espaciales para MapBiomas Venezuela
Asset Colección 3: projects/mapbiomas-public/assets/venezuela/lulc/collection3/mapbiomas_venezuela_collection3_coverage_v1
Serie histórica: 1985 - 2024
"""

import os
import logging
from typing import Dict, Any, List, Optional
import json

logger = logging.getLogger(__name__)

MAPBIOMAS_ASSET_COLLECTION_3 = "projects/mapbiomas-public/assets/venezuela/lulc/collection3/mapbiomas_venezuela_collection3_coverage_v1"

# Catálogo y Leyenda Oficial de Clases MapBiomas Venezuela
MAPBIOMAS_LEGEND_CODES = {
    1: {"name": "Bosque / Formación Forestal", "category": "Natural", "color": "#129912"},
    3: {"name": "Bosque Inundable", "category": "Natural", "color": "#006400"},
    4: {"name": "Manglar", "category": "Natural", "color": "#04381d"},
    11: {"name": "Humedal / Herbazal Inundable", "category": "Natural", "color": "#45c2a5"},
    12: {"name": "Formación Campestre / Sabana", "category": "Natural", "color": "#bbfcac"},
    15: {"name": "Pastizal / Ganadería", "category": "Antrópica", "color": "#ffd966"},
    18: {"name": "Agricultura / Cultivos", "category": "Antrópica", "color": "#e974ed"},
    19: {"name": "Cultivo Temporal (Maíz, Arroz)", "category": "Antrópica", "color": "#c27ba0"},
    20: {"name": "Cultivo Perenne (Cacao, Café, Caña)", "category": "Antrópica", "color": "#741b47"},
    21: {"name": "Mosaico Agropecuario", "category": "Antrópica", "color": "#ffe082"},
    24: {"name": "Área Urbana e Infraestructura", "category": "Antrópica", "color": "#af2a2a"},
    25: {"name": "Otra Área No Vegetada", "category": "No Vegetada", "color": "#ffaa5f"},
    30: {"name": "Minería", "category": "Antrópica", "color": "#8a2be2"},
    33: {"name": "Cuerpo de Agua / Río / Lago", "category": "Agua", "color": "#0064ff"}
}

class GEEConnector:
    """Gestor de conexión y consultas a Google Earth Engine y MapBiomas Venezuela."""

    def __init__(self, service_account_email: Optional[str] = None, private_key_file: Optional[str] = None):
        self.is_authenticated = False
        self.service_account = service_account_email or os.getenv("GEE_SERVICE_ACCOUNT")
        self.key_file = private_key_file or os.getenv("GEE_PRIVATE_KEY_PATH")
        self._initialize_gee()

    def _initialize_gee(self):
        """Inicializa la sesión con Earth Engine usando cuenta de servicio o autenticación local."""
        try:
            import ee
            if self.service_account and self.key_file and os.path.exists(self.key_file):
                credentials = ee.ServiceAccountCredentials(self.service_account, self.key_file)
                ee.Initialize(credentials)
                self.is_authenticated = True
                logger.info("GEE inicializado exitosamente con Service Account.")
            else:
                try:
                    ee.Initialize()
                    self.is_authenticated = True
                    logger.info("GEE inicializado con credenciales locales por defecto.")
                except Exception:
                    self.is_authenticated = False
                    logger.info("GEE en modo Simulación/Offline (sin credenciales activas).")
        except ImportError:
            self.is_authenticated = False
            logger.info("Librería earthengine-api no instalada o en modo de desarrollo.")

    def get_pixel_history(self, lat: float, lon: float) -> Dict[str, Any]:
        """
        Extrae la serie temporal completa de 40 años (1985–2024) para las coordenadas dadas.
        Retorna la clase de cobertura para cada año y la matriz de transición histórica.
        """
        if self.is_authenticated:
            try:
                import ee
                point = ee.Geometry.Point([lon, lat])
                image = ee.Image(MAPBIOMAS_ASSET_COLLECTION_3)
                
                # Consultar los valores de las bandas de cada año (classification_1985 ... classification_2024)
                sampled = image.reduceRegion(
                    reducer=ee.Reducer.first(),
                    geometry=point,
                    scale=30
                ).getInfo()
                
                return self._parse_gee_pixel_data(sampled, lat, lon)
            except Exception as e:
                logger.error(f"Falla en consulta GEE ({e}). Utilizando simulador estandarizado.")
                return self._generate_simulated_pixel_history(lat, lon)
        else:
            return self._generate_simulated_pixel_history(lat, lon)

    def _parse_gee_pixel_data(self, sampled_data: Dict[str, Any], lat: float, lon: float) -> Dict[str, Any]:
        """Formatea los datos brutos de GEE en una estructura JSON estándar de Agrotech."""
        annual_series = {}
        transitions = []
        last_class_id = None

        years = list(range(1985, 2025))
        for yr in years:
            band_name = f"classification_{yr}"
            class_id = sampled_data.get(band_name)
            if class_id is not None:
                class_info = MAPBIOMAS_LEGEND_CODES.get(int(class_id), {
                    "name": "Clase Desconocida", "category": "Otros", "color": "#999999"
                })
                annual_series[str(yr)] = {
                    "class_id": int(class_id),
                    "class_name": class_info["name"],
                    "category": class_info["category"],
                    "color": class_info["color"]
                }
                
                if last_class_id is not None and last_class_id != int(class_id):
                    transitions.append({
                        "year": yr,
                        "from_class": MAPBIOMAS_LEGEND_CODES.get(last_class_id, {}).get("name", "N/A"),
                        "to_class": class_info["name"]
                    })
                last_class_id = int(class_id)

        latest_class = annual_series.get("2024", annual_series.get(list(annual_series.keys())[-1] if annual_series else "1985"))

        return {
            "source": "MAPBIOMAS_VENEZUELA_COLLECTION_3",
            "asset_id": MAPBIOMAS_ASSET_COLLECTION_3,
            "coordinates": {"latitude": lat, "longitude": lon},
            "resolution_meters": 30,
            "latest_coverage_2024": latest_class,
            "annual_series": annual_series,
            "detected_transitions_count": len(transitions),
            "transitions_log": transitions
        }

    def _generate_simulated_pixel_history(self, lat: float, lon: float) -> Dict[str, Any]:
        """
        Genera una trayectoria histórica verosímil y estandarizada según las zonas ecológicas
        de Venezuela (Portuguesa, Zulia, Guárico, Llanos, Andes) para desarrollo y pruebas.
        """
        # Clasificación base según ubicación
        if -70.5 < lon < -68.5 and 8.5 < lat < 10.0:  # Portuguesa / Granero
            initial_class, final_class = 12, 18  # Sabana natural -> Agricultura intensiva
            trans_year = 1998
        elif -72.5 < lon < -71.0 and 8.5 < lat < 10.5:  # Zulia / Sur del Lago
            initial_class, final_class = 1, 15  # Bosque -> Pastizal / Plátano
            trans_year = 2004
        elif -71.8 < lon < -70.5 and 7.8 < lat < 9.2:  # Andes / Mérida
            initial_class, final_class = 1, 20  # Bosque nublado -> Cultivo perenne (Café/Papa)
            trans_year = 1995
        else:
            initial_class, final_class = 15, 18
            trans_year = 2010

        annual_series = {}
        transitions = []

        for yr in range(1985, 2025):
            curr_id = initial_class if yr < trans_year else final_class
            class_info = MAPBIOMAS_LEGEND_CODES.get(curr_id, {"name": "Cultivo", "category": "Antrópica", "color": "#e974ed"})
            annual_series[str(yr)] = {
                "class_id": curr_id,
                "class_name": class_info["name"],
                "category": class_info["category"],
                "color": class_info["color"]
            }

        transitions.append({
            "year": trans_year,
            "from_class": MAPBIOMAS_LEGEND_CODES[initial_class]["name"],
            "to_class": MAPBIOMAS_LEGEND_CODES[final_class]["name"]
        })

        return {
            "source": "MAPBIOMAS_VENEZUELA_COLLECTION_3_SIMULATED",
            "asset_id": MAPBIOMAS_ASSET_COLLECTION_3,
            "coordinates": {"latitude": lat, "longitude": lon},
            "resolution_meters": 30,
            "latest_coverage_2024": annual_series["2024"],
            "annual_series": annual_series,
            "detected_transitions_count": len(transitions),
            "transitions_log": transitions
        }
