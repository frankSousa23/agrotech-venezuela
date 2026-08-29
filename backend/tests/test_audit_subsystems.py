import pytest
from src.sentinel_processor import SentinelProcessor
from src.ml_feature_engine import MLFeatureEngine
from src.mapbiomas_discrepancy_detector import MapBiomasDiscrepancyDetector
from src.risk_and_carbon_engine import RiskAndCarbonEngine
from src.crop_yield_predictor import CropYieldPredictor

def test_sentinel_radar_backscatter_and_vigor_audit():
    """Valida los rangos físicos de índices satelitales ópticos y clasificación de vigor."""
    processor = SentinelProcessor()
    
    # Clasificación de vigor en parcelas
    assert "Muy Alto" in processor._classify_ndvi_vigor(0.85)
    assert "Alto" in processor._classify_ndvi_vigor(0.68)
    assert "Moderado" in processor._classify_ndvi_vigor(0.48)
    assert "Bajo" in processor._classify_ndvi_vigor(0.22)

    profile = processor.get_parcel_vegetation_profile(lat=9.324, lon=-69.112)
    assert profile["resolution_meters"] == 10
    assert 0.0 <= profile["latest_metrics"]["ndvi"] <= 1.0

def test_ml_feature_engine_legacy_compaction_indices():
    """Valida la generación de vector de 16 variables con compactación histórica y riesgo de transición."""
    engine = MLFeatureEngine()
    
    soil = {"ph": 6.2, "organic_matter_pct": 3.2, "texture": "Franco-limoso"}
    climate = {"summary": {"avg_temperature_c": 27.5, "accumulated_rainfall_mm": 1200.0, "growing_degree_days_gdd": 450.0, "avg_solar_radiation_mj_m2": 18.5}}
    sentinel = {"latest_metrics": {"ndvi": 0.72, "ndwi": 0.15}}
    mapbiomas = {
        "annual_series": {
            "2020": {"class_id": 15},
            "2021": {"class_id": 15},
            "2022": {"class_id": 18},
            "2023": {"class_id": 18},
            "2024": {"class_id": 18}
        }
    }

    result = engine.build_feature_vector(soil, climate, sentinel, mapbiomas)
    features = result["features_dict"]
    vector = result["feature_vector"]

    assert len(result["feature_names"]) == 16
    assert len(vector) == 16
    assert 0.0 <= features["soil_compaction_legacy_index"] <= 1.0
    assert 0.0 <= features["mapbiomas_transition_risk_score"] <= 1.0

    normalized = engine.normalize_vector(vector)
    assert len(normalized) == 16
    for val in normalized:
        assert 0.0 <= val <= 1.0

def test_mapbiomas_groundtruth_discrepancy_alert_trigger():
    """Audita la activación determinista de alertas de deforestación y conversión de pasturas."""
    detector = MapBiomasDiscrepancyDetector()
    
    # Bosque clasificado en MapBiomas (3) pero con NDVI bajo y SAR bajo (anomalía crítica de deforestación)
    alert = detector.evaluate_discrepancy(
        lat=9.324,
        lon=-69.112,
        mapbiomas_class_id=3,
        sentinel_metrics={"ndvi": 0.32, "evi": 0.21, "ndwi": -0.15},
        sar_backscatter_db=-18.5
    )
    
    assert alert["discrepancy_detected"] is True
    assert alert["discrepancy_type"] == "DEFORESTATION_OR_CLEARING_ALERT"
    assert alert["confidence_score"] >= 0.85
    assert "Deforestación" in alert["diagnostic_summary"]

def test_risk_and_carbon_audit():
    """Audita el modelo de riesgo multidimensional y secuestro de carbono bajo manejo regenerativo."""
    engine = RiskAndCarbonEngine()
    features = {
        "ph": 6.2,
        "organic_matter_pct": 3.2,
        "annual_rainfall_mm": 1300.0,
        "avg_temperature_c": 27.5,
        "sentinel_ndwi": 0.18,
        "clay_pct": 24.0
    }

    carbon = engine.model_carbon_sequestration(features, parcel_area_ha=48.5)
    assert carbon["soil_metrics"]["total_farm_soc_stock_ton_c"] > 100.0
    assert "agroforestry_shaded_cacao_coffee" in carbon["annual_sequestration_scenarios"]
