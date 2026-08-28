"""
============================================================================
AGROTECH VENEZUELA — BACKEND ESPACIAL, ML & GEMINI AI (main.py)
============================================================================

Servicio backend de alto rendimiento en FastAPI (Python 3.13):
1. Ingesta Satelital Automatizada:
   - MapBiomas Colección 3 (1985-2024): 40 años de trayectoria de cobertura del suelo.
   - Sentinel-2 L2A Copernicus: Índices espectrales (NDVI, EVI, NDWI) con máscara SCL (10m).
   - NASA POWER Climatology: Radiación, temperatura, lluvia y Grados Día de Desarrollo (GDD).
2. Caché Geoespacial SQLite WAL:
   - Hashing geodésico a 4 decimales (~11m de resolución) con latencias < 25ms.
3. Machine Learning Agronómico & Edafología:
   - Predictor de idoneidad y rendimiento en Ton/ha para 8 cadenas estratégicas.
   - Análisis de riesgos agroclimáticos y captura de Carbono Orgánico del Suelo (SOC).
4. Agente Asesor Google Gemini AI:
   - Dictámenes técnicos estructurados adaptados a insumos comerciales en Venezuela.
"""

import time
import logging
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, Query, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from src.gee_connector import GEEConnector
from src.nasa_power_client import NasaPowerClient
from src.sentinel_processor import SentinelProcessor
from src.cache_manager import CacheManager
from src.ml_feature_engine import MLFeatureEngine
from src.crop_yield_predictor import CropYieldPredictor
from src.risk_and_carbon_engine import RiskAndCarbonEngine
from src.gemini_agro_advisor import GeminiAgroAdvisor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("agrotech-backend")

import asyncio
from contextlib import asynccontextmanager

async def periodic_cache_purge():
    while True:
        try:
            logger.info("Iniciando purga programada de la caché SQLite (registros expirados).")
            cache_mgr.clear_expired()
            logger.info("Purga de caché completada exitosamente.")
        except Exception as e:
            logger.error(f"Error durante la purga de la caché: {e}")
        # Run once a day (86400 seconds)
        await asyncio.sleep(86400)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: register the periodic task
    logger.info("Registrando tarea en segundo plano para purga de caché SQLite...")
    task = asyncio.create_task(periodic_cache_purge())
    yield
    # Shutdown
    task.cancel()

app = FastAPI(
    title="Agrotech Venezuela - Spatial, ML & Gemini AI Backend Engine",
    version="2.0.0",
    description="API REST y de Inteligencia Artificial para ingesta satelital (MapBiomas, Sentinel-2, NASA POWER), Machine Learning agronómico y orquestación con Google Gemini.",
    lifespan=lifespan
)

# CORS para integración con Next.js y apps móviles
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instanciación de Servicios y Motores
cache_mgr = CacheManager()
gee_conn = GEEConnector()
nasa_client = NasaPowerClient()
sentinel_proc = SentinelProcessor(gee_connector=gee_conn)

feature_engine = MLFeatureEngine()
yield_predictor = CropYieldPredictor()
risk_carbon_engine = RiskAndCarbonEngine()
gemini_advisor = GeminiAgroAdvisor()

# Schemas Pydantic (Swagger Documentation)
class CoordinateQuery(BaseModel):
    latitude: float = Field(..., ge=-4.5, le=13.5, description="Latitud en Venezuela (WGS84)", json_schema_extra={"example": 9.324})
    longitude: float = Field(..., ge=-73.5, le=-59.5, description="Longitud en Venezuela (WGS84)", json_schema_extra={"example": -69.112})
    ph: Optional[float] = Field(6.2, ge=3.5, le=9.5, description="pH del suelo (opcional)")
    organic_matter_pct: Optional[float] = Field(3.0, ge=0.2, le=12.0, description="Materia Orgánica % (opcional)")
    texture: Optional[str] = Field("Franco-limoso", description="Textura del suelo (opcional)")
    parcel_area_ha: Optional[float] = Field(10.0, ge=0.1, le=10000.0, description="Área en hectáreas del polígono (calculado vía Shoelace geodésico)")
    force_refresh: bool = Field(False, description="Forzar consulta satelital en vivo omitiendo caché")

class ChatConsultQuery(BaseModel):
    latitude: float = Field(..., ge=-4.5, le=13.5, description="Latitud (WGS84) para proveer contexto espacial a Gemini")
    longitude: float = Field(..., ge=-73.5, le=-59.5, description="Longitud (WGS84) para proveer contexto espacial a Gemini")
    message: str = Field(..., min_length=1, description="Pregunta o consulta del productor")
    conversation_history: Optional[List[Dict[str, str]]] = Field(default=[], description="Historial de mensajes previos")

class SpatialProfileResponse(BaseModel):
    coordinates: Dict[str, float]
    from_cache: bool
    response_time_ms: float
    mapbiomas_lulc: Dict[str, Any]
    agroclimate: Dict[str, Any]
    sentinel_vegetation: Dict[str, Any]
    detected_zone: str

@app.get("/health", tags=["Salud"])
def health_check():
    """Comprueba el estado operativo del backend, ML y conectores espaciales."""
    return {
        "status": "HEALTHY",
        "service": "Agrotech Spatial, ML & Gemini Backend",
        "version": "2.0.0",
        "gee_authenticated": gee_conn.is_authenticated,
        "gemini_active": bool(gemini_advisor.api_key),
        "cache_active": True
    }

@app.post("/api/v1/spatial/profile", response_model=SpatialProfileResponse, tags=["Perfil Espacial"])
def get_unified_spatial_profile(query: CoordinateQuery):
    """
    Ingesta de Coordenadas GPS y generación del Perfil Integral.
    Consulta MapBiomas Colección 3 (40 años), NASA POWER y Sentinel-2.
    """
    start_time = time.time()
    lat, lon = query.latitude, query.longitude

    if not query.force_refresh:
        cached = cache_mgr.get_cached_profile(lat, lon)
        if cached:
            elapsed_ms = round((time.time() - start_time) * 1000, 2)
            cache_mgr.record_query_metrics(lat, lon, cache_hit=True, response_time_ms=elapsed_ms)
            return SpatialProfileResponse(
                coordinates={"latitude": lat, "longitude": lon},
                from_cache=True,
                response_time_ms=elapsed_ms,
                mapbiomas_lulc=cached.get("mapbiomas", {}),
                agroclimate=cached.get("climate", {}),
                sentinel_vegetation=cached.get("sentinel", {}),
                detected_zone=_identify_agro_zone(lat, lon)
            )

    mapbiomas_data = gee_conn.get_pixel_history(lat, lon)
    climate_data = nasa_client.fetch_daily_agroclimate(lat, lon)
    sentinel_data = sentinel_proc.get_parcel_vegetation_profile(lat, lon)
    agro_zone = _identify_agro_zone(lat, lon)

    cache_mgr.set_cached_profile(
        lat=lat,
        lon=lon,
        mapbiomas_data=mapbiomas_data,
        climate_data=climate_data,
        sentinel_data=sentinel_data,
        soil_data={"zone": agro_zone}
    )

    elapsed_ms = round((time.time() - start_time) * 1000, 2)
    cache_mgr.record_query_metrics(lat, lon, cache_hit=False, response_time_ms=elapsed_ms)

    return SpatialProfileResponse(
        coordinates={"latitude": lat, "longitude": lon},
        from_cache=False,
        response_time_ms=elapsed_ms,
        mapbiomas_lulc=mapbiomas_data,
        agroclimate=climate_data,
        sentinel_vegetation=sentinel_data,
        detected_zone=agro_zone
    )

@app.post("/api/v1/predict/crops", tags=["Machine Learning"])
def predict_crops_and_yield(query: CoordinateQuery):
    """
    Día 9: Predicción de Idoneidad y Rendimiento de Cultivos con Machine Learning.
    Integra telemetría satelital con el motor de características y superficies de respuesta agronómica.
    """
    # 1. Obtener perfil espacial (vía caché o en vivo)
    spatial_profile = get_unified_spatial_profile(query)
    
    soil_profile = {
        "ph": query.ph,
        "organic_matter_pct": query.organic_matter_pct,
        "texture": query.texture
    }

    # 2. Vectorizar features (Día 8)
    feat_result = feature_engine.build_feature_vector(
        soil_profile=soil_profile,
        agroclimate=spatial_profile.agroclimate,
        sentinel_metrics=spatial_profile.sentinel_vegetation,
        mapbiomas_history=spatial_profile.mapbiomas_lulc
    )

    # 3. Ejecutar predicción de rendimiento y aptitud (Día 9)
    predictions = yield_predictor.predict(feat_result["features_dict"])

    return {
        "coordinates": {"latitude": query.latitude, "longitude": query.longitude},
        "detected_zone": spatial_profile.detected_zone,
        "feature_summary": feat_result["features_dict"],
        "ml_predictions": predictions
    }

@app.post("/api/v1/predict/risks", tags=["Machine Learning"])
def predict_risks_and_carbon(query: CoordinateQuery):
    """
    Día 10: Evaluación de Riesgos Agroclimáticos y Modelado de Captura de Carbono (SOC / CO2e).
    """
    spatial_profile = get_unified_spatial_profile(query)
    soil_profile = {"ph": query.ph, "organic_matter_pct": query.organic_matter_pct, "texture": query.texture}
    
    feat_result = feature_engine.build_feature_vector(
        soil_profile=soil_profile,
        agroclimate=spatial_profile.agroclimate,
        sentinel_metrics=spatial_profile.sentinel_vegetation,
        mapbiomas_history=spatial_profile.mapbiomas_lulc
    )

    risks = risk_carbon_engine.evaluate_risks(feat_result["features_dict"])
    carbon = risk_carbon_engine.model_carbon_sequestration(feat_result["features_dict"], query.parcel_area_ha or 10.0)

    return {
        "coordinates": {"latitude": query.latitude, "longitude": query.longitude},
        "agroclimatic_risks": risks,
        "soil_carbon_sequestration": carbon
    }

@app.post("/api/v1/ai/prescribe", tags=["Google Gemini AI"])
def generate_ai_prescription(query: CoordinateQuery):
    """
    Día 11: Generador de Prescripción Técnica Agronómica con Google Gemini AI.
    Inyecta todo el contexto satelital, edafológico y predictivo en el modelo de lenguaje agronómico.
    """
    spatial_profile = get_unified_spatial_profile(query)
    soil_profile = {"ph": query.ph, "organic_matter_pct": query.organic_matter_pct, "texture": query.texture}

    feat_result = feature_engine.build_feature_vector(
        soil_profile=soil_profile,
        agroclimate=spatial_profile.agroclimate,
        sentinel_metrics=spatial_profile.sentinel_vegetation,
        mapbiomas_history=spatial_profile.mapbiomas_lulc
    )

    ml_predictions = yield_predictor.predict(feat_result["features_dict"])
    risks = risk_carbon_engine.evaluate_risks(feat_result["features_dict"])

    parcel_context = {
        "coordinates": {"latitude": query.latitude, "longitude": query.longitude},
        "detected_zone": spatial_profile.detected_zone,
        "mapbiomas": spatial_profile.mapbiomas_lulc,
        "climate": spatial_profile.agroclimate,
        "sentinel": spatial_profile.sentinel_vegetation,
        "soil": soil_profile,
        "ml_predictions": ml_predictions,
        "risks": risks
    }

    ai_prescription = gemini_advisor.generate_technical_prescription(parcel_context)

    return {
        "coordinates": {"latitude": query.latitude, "longitude": query.longitude},
        "ai_report": ai_prescription,
        "key_metrics": {
            "top_crop": ml_predictions["top_recommended_crop"],
            "risk_index": risks["overall_risk_index_pct"],
            "ndvi_vigor": spatial_profile.sentinel_vegetation.get("latest_metrics", {}).get("vegetation_vigor")
        }
    }

@app.post("/api/v1/ai/consult", tags=["Google Gemini AI"])
def consult_gemini_advisor(query: ChatConsultQuery):
    """
    Día 11: Asistente Conversacional Geoespacial interactivo impulsado por Gemini.
    """
    # Construir contexto de coordenadas rápido
    spatial_data = get_unified_spatial_profile(CoordinateQuery(latitude=query.latitude, longitude=query.longitude))
    parcel_context = {
        "coordinates": {"latitude": query.latitude, "longitude": query.longitude},
        "zone": spatial_data.detected_zone,
        "mapbiomas_2024": spatial_data.mapbiomas_lulc.get("latest_coverage_2024", {}),
        "climate": spatial_data.agroclimate.get("summary", {}),
        "sentinel": spatial_data.sentinel_vegetation.get("latest_metrics", {})
    }

    reply = gemini_advisor.interactive_chat(
        parcel_context=parcel_context,
        conversation_history=query.conversation_history or [],
        message=query.message
    )

    return reply

@app.get("/api/v1/spatial/mapbiomas", tags=["MapBiomas"])
def get_mapbiomas_history(
    latitude: float = Query(..., ge=-4.5, le=13.5),
    longitude: float = Query(..., ge=-73.5, le=-59.5)
):
    return gee_conn.get_pixel_history(latitude, longitude)

@app.get("/api/v1/spatial/climate", tags=["NASA POWER"])
def get_climate_data(
    latitude: float = Query(..., ge=-4.5, le=13.5),
    longitude: float = Query(..., ge=-73.5, le=-59.5),
    start_date: Optional[str] = Query(None, pattern=r"^\d{8}$"),
    end_date: Optional[str] = Query(None, pattern=r"^\d{8}$")
):
    return nasa_client.fetch_daily_agroclimate(latitude, longitude, start_date, end_date)

@app.get("/api/v1/spatial/sentinel-ndvi", tags=["Sentinel-2"])
def get_sentinel_ndvi(
    latitude: float = Query(..., ge=-4.5, le=13.5),
    longitude: float = Query(..., ge=-73.5, le=-59.5)
):
    return sentinel_proc.get_parcel_vegetation_profile(latitude, longitude)

@app.get("/api/v1/cache/stats", tags=["Caché & Optimización"])
def get_cache_statistics():
    return cache_mgr.get_stats()

def _identify_agro_zone(lat: float, lon: float) -> str:
    if -70.5 < lon < -68.5 and 8.0 < lat < 10.0:
        return "Llanos Occidentales (Portuguesa / Barinas) - Polo Cerealero"
    elif -68.5 < lon < -65.0 and 7.5 < lat < 10.0:
        return "Llanos Centrales (Guárico / Cojedes) - Arroz y Ganadería"
    elif -73.0 < lon < -71.0 and 8.5 < lat < 11.5:
        return "Cuenca del Lago de Maracaibo (Zulia) - Sur del Lago"
    elif -72.5 < lon < -70.0 and 7.5 < lat < 9.5:
        return "Cordillera de Los Andes (Mérida / Táchira / Trujillo) - Café y Hortalizas"
    elif -68.5 < lon < -66.5 and 9.8 < lat < 10.8:
        return "Valles Centrales (Aragua / Carabobo) - Caña y Frutales"
    elif -65.0 < lon < -61.5 and 8.0 < lat < 10.8:
        return "Mesas Orientales (Monagas / Anzoátegui) - Soya y Palma"
    else:
        return "Territorio Agroecológico Nacional"
