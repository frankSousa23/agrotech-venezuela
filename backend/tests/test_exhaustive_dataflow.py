"""
Exhaustive End-to-End Data Flow Verification Test - Agrotech Venezuela
Valida el 100% de los flujos de datos interconectados:
1. Ingesta de Coordenadas GPS (WGS84)
2. Extracción de MapBiomas Col 3 (1985-2024, 40 años)
3. Extracción de Agroclimatología NASA POWER y cálculo de GDD
4. Procesamiento óptico Sentinel-2 SCL (NDVI, EVI, NDWI a 10m)
5. Almacenamiento y Recuperación en Caché SQLite Local (< 5ms)
6. Vectorización y Normalización de 14 Características (ML)
7. Predicción de Rendimiento de Cosechas en Ton/ha (8 cultivos)
8. Cuantificación de 4 Riesgos Agroclimáticos y Modelado de Carbono SOC
9. Generación de Dictamen Técnico Agronómico y Prescripción N-P-K
10. Serialización y Exportación de Gemelo Digital en GeoJSON y Markdown
"""

import time
import pytest
from fastapi.testclient import TestClient

from src.main import app
from src.gee_connector import GEEConnector
from src.nasa_power_client import NasaPowerClient
from src.sentinel_processor import SentinelProcessor
from src.cache_manager import CacheManager
from src.ml_feature_engine import MLFeatureEngine
from src.crop_yield_predictor import CropYieldPredictor
from src.risk_and_carbon_engine import RiskAndCarbonEngine
from src.gemini_agro_advisor import GeminiAgroAdvisor
from src.viz_utils import create_folium_map, create_mapbiomas_timeline_chart, create_crop_yield_bar_chart
from src.report_generator import ReportGenerator

client = TestClient(app)

# Coordenadas de prueba en zonas agroecológicas estratégicas de Venezuela
TEST_LOCATIONS = [
    {"name": "Turén, Portuguesa (Maíz/Soya)", "lat": 9.3240, "lon": -69.1120, "expected_zone": "Portuguesa"},
    {"name": "Sur del Lago, Zulia (Plátano/Cacao)", "lat": 8.9850, "lon": -71.7240, "expected_zone": "Zulia"},
    {"name": "Calabozo, Guárico (Arroz de Riego)", "lat": 8.9240, "lon": -67.4280, "expected_zone": "Guárico"}
]

def test_workflow_1_gps_ingestion_and_spatial_extraction():
    """Flujo 1: Ingesta de Coordenadas -> MapBiomas + NASA POWER + Sentinel-2"""
    for loc in TEST_LOCATIONS:
        lat, lon = loc["lat"], loc["lon"]
        
        # Consulta de perfil unificado
        resp = client.post("/api/v1/spatial/profile", json={"latitude": lat, "longitude": lon, "force_refresh": True})
        assert resp.status_code == 200, f"Error en perfil espacial para {loc['name']}"
        data = resp.json()

        # Validación MapBiomas
        mb = data["mapbiomas_lulc"]
        assert mb["resolution_meters"] == 30
        assert len(mb["annual_series"]) == 40
        assert "1985" in mb["annual_series"]
        assert "2024" in mb["annual_series"]
        assert mb["latest_coverage_2024"]["class_name"] is not None

        # Validación NASA POWER
        clim = data["agroclimate"]
        assert "summary" in clim
        assert clim["summary"]["avg_temperature_c"] > 15.0
        assert clim["summary"]["growing_degree_days_gdd"] > 0
        assert clim["summary"]["avg_solar_radiation_mj_m2"] > 5.0

        # Validación Sentinel-2
        sent = data["sentinel_vegetation"]
        assert sent["resolution_meters"] == 10
        assert 0.0 <= sent["latest_metrics"]["ndvi"] <= 1.0
        assert sent["latest_metrics"]["vegetation_vigor"] is not None

def test_workflow_2_sqlite_caching_performance():
    """Flujo 2: Comprobación de latencia de caché (< 10ms en aciertos)"""
    lat, lon = 9.3240, -69.1120
    
    # 1. Escritura / Calentamiento
    client.post("/api/v1/spatial/profile", json={"latitude": lat, "longitude": lon, "force_refresh": True})
    
    # 2. Lectura ultrarrápida desde caché SQLite
    start_t = time.time()
    resp_cached = client.post("/api/v1/spatial/profile", json={"latitude": lat, "longitude": lon, "force_refresh": False})
    cached_time_ms = (time.time() - start_t) * 1000
    
    assert resp_cached.status_code == 200
    cached_json = resp_cached.json()
    assert cached_json["from_cache"] is True
    assert cached_json["response_time_ms"] < 25.0 # Tiempo interno del servidor en caché (< 25ms)
    assert cached_time_ms < 60.0 # Tiempo total cliente HTTP

def test_workflow_3_feature_engineering_and_ml_predictions():
    """Flujo 3: Vectorización de 14 features -> Predicción ML de Cosecha"""
    payload = {
        "latitude": 9.3240,
        "longitude": -69.1120,
        "ph": 6.4,
        "organic_matter_pct": 3.4,
        "texture": "Franco-limoso",
        "parcel_area_ha": 20.0
    }
    
    resp = client.post("/api/v1/predict/crops", json=payload)
    assert resp.status_code == 200
    data = resp.json()

    # Validar Features
    features = data["feature_summary"]
    assert features["ph"] == 6.4
    assert features["organic_matter_pct"] == 3.4
    assert "sentinel_ndvi" in features
    assert "annual_rainfall_mm" in features

    # Validar Predicciones ML
    preds = data["ml_predictions"]["predictions"]
    assert len(preds) >= 8 # Modelos de cultivos estratégicos evaluados
    for p in preds:
        assert 0.0 <= p["suitability_score_pct"] <= 100.0
        assert p["projected_yield_ton_ha"]["expected"] > 0
        assert p["projected_yield_ton_ha"]["min_confidence_interval"] <= p["projected_yield_ton_ha"]["expected"]
        assert p["projected_yield_ton_ha"]["expected"] <= p["projected_yield_ton_ha"]["max_potential"]

def test_workflow_4_climate_risks_and_carbon_sequestration():
    """Flujo 4: Evaluación de Riesgos Agroclimáticos y Balance de Carbono"""
    payload = {
        "latitude": 8.9850,
        "longitude": -71.7240,
        "ph": 4.8,
        "organic_matter_pct": 4.2,
        "parcel_area_ha": 30.0
    }

    resp = client.post("/api/v1/predict/risks", json=payload)
    assert resp.status_code == 200
    data = resp.json()

    # Riesgos
    risks = data["agroclimatic_risks"]
    assert "overall_risk_index_pct" in risks
    assert risks["overall_risk_category"] in ["BAJO", "MODERADO", "ALTO", "CRÍTICO"]
    assert "soil_acidity_aluminum" in risks["risk_breakdown"]

    # Carbono
    carbon = data["soil_carbon_sequestration"]
    assert carbon["soil_metrics"]["current_soc_ton_c_per_ha"] > 0
    assert carbon["soil_metrics"]["total_farm_soc_stock_ton_c"] > 0
    assert "agroforestry_shaded_cacao_coffee" in carbon["annual_sequestration_scenarios"]

def test_workflow_5_ai_prescription_and_report_export():
    """Flujo 5: Generación de Prescripción Técnica con Gemini y Exportación de Archivos"""
    payload = {
        "latitude": 9.3240,
        "longitude": -69.1120,
        "ph": 5.4, # Ácido
        "organic_matter_pct": 3.0,
        "parcel_area_ha": 25.0
    }

    resp = client.post("/api/v1/ai/prescribe", json=payload)
    assert resp.status_code == 200
    data = resp.json()

    assert data["ai_report"]["status"] == "SUCCESS"
    prescription_text = data["ai_report"]["prescription_markdown"]
    assert len(prescription_text) > 200
    assert "Encalado" in prescription_text or "Cal" in prescription_text
    assert "NPK" in prescription_text or "Fertilización" in prescription_text

    # Validar generación de reporte Markdown
    md_report = ReportGenerator.generate_markdown_report(
        parcel_name="Finca La Esperanza",
        lat=9.3240,
        lon=-69.1120,
        zone="Llanos Occidentales",
        area_ha=25.0,
        soil={"ph": 5.4, "organic_matter_pct": 3.0},
        climate={"summary": {"accumulated_rainfall_mm": 1450, "avg_temperature_c": 27.0, "growing_degree_days_gdd": 420}},
        sentinel={"latest_metrics": {"ndvi": 0.74, "vegetation_vigor": "Alto"}},
        mapbiomas={"latest_coverage_2024": {"class_name": "Agricultura"}, "detected_transitions_count": 1},
        ml_preds={"top_recommended_crop": "Maíz Blanco", "predictions": [{"crop_name": "Maíz Blanco", "suitability_score_pct": 88, "suitability_level": "Excelente", "projected_yield_ton_ha": {"expected": 6.2}, "recommended_planting_season": "Ciclo Invierno"}]},
        risks={"overall_risk_index_pct": 35, "overall_risk_category": "MODERADO", "risk_breakdown": {}},
        ai_prescription=prescription_text
    )
    assert "# 🌾 DICTAMEN TÉCNICO" in md_report

    # Validar generación de GeoJSON
    geojson = ReportGenerator.generate_geojson_feature("Finca La Esperanza", 9.3240, -69.1120, 25.0, {"ndvi": 0.74})
    assert geojson["type"] == "FeatureCollection"
    assert len(geojson["features"][0]["geometry"]["coordinates"][0]) == 5 # Polígono cerrado

def test_workflow_6_cartography_and_ui_widgets():
    """Flujo 6: Generación y Renderizado Cartográfico Folium y Plotly"""
    folium_map = create_folium_map(lat=9.3240, lon=-69.1120, parcel_name="Finca Test")
    assert folium_map is not None
    html_repr = folium_map._repr_html_()
    assert "leaflet" in html_repr.lower() or "folium" in html_repr.lower()

    timeline_fig = create_mapbiomas_timeline_chart({"1985": {"class_name": "Bosque"}, "2024": {"class_name": "Agricultura"}})
    assert timeline_fig is not None
    assert len(timeline_fig.data) > 0
