import pytest
from src.ml_feature_engine import MLFeatureEngine

def test_feature_vector_builder():
    engine = MLFeatureEngine()
    soil = {"ph": 6.4, "organic_matter_pct": 3.2, "texture": "Franco-limoso"}
    climate = {"summary": {"avg_temperature_c": 27.2, "accumulated_rainfall_mm": 1650.0, "growing_degree_days_gdd": 450.0, "avg_solar_radiation_mj_m2": 19.1}}
    sentinel = {"latest_metrics": {"ndvi": 0.76, "ndwi": 0.32}}
    mapbiomas = {"annual_series": {"2020": {"class_id": 18}, "2024": {"class_id": 18}}}

    result = engine.build_feature_vector(soil, climate, sentinel, mapbiomas)
    
    assert "features_dict" in result
    assert "feature_vector" in result
    assert len(result["feature_vector"]) == len(engine.FEATURE_NAMES)
    assert result["features_dict"]["ph"] == 6.4
    assert result["features_dict"]["sentinel_ndvi"] == 0.76

def test_vector_normalizer():
    engine = MLFeatureEngine()
    raw_vector = [6.4, 3.2, 20.0, 65.0, 15.0, 1650.0, 27.2, 450.0, 19.1, 0.76, 0.32, 1.0, 0.0, 0.0]
    norm_vec = engine.normalize_vector(raw_vector)
    
    assert len(norm_vec) == len(raw_vector)
    for val in norm_vec:
        assert 0.0 <= val <= 1.0
