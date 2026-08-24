import pytest
from src.crop_yield_predictor import CropYieldPredictor

def test_crop_yield_predictor_maize():
    predictor = CropYieldPredictor()
    # Condiciones óptimas para Maíz en Portuguesa (pH 6.4, Lluvia 1400mm, Temp 27°C)
    features = {
        "ph": 6.4,
        "organic_matter_pct": 3.4,
        "avg_temperature_c": 27.0,
        "annual_rainfall_mm": 1300.0,
        "clay_pct": 20.0,
        "sentinel_ndvi": 0.78
    }

    result = predictor.predict(features)
    assert "predictions" in result
    assert len(result["predictions"]) >= 6
    
    top = result["predictions"][0]
    assert top["suitability_score_pct"] >= 80.0
    assert top["projected_yield_ton_ha"]["expected"] > 0
    assert "planting_season" in top["recommended_planting_season"].lower() or "ciclo" in top["recommended_planting_season"].lower()

def test_crop_yield_predictor_limiting_factor():
    predictor = CropYieldPredictor()
    # Suelo muy ácido (pH 4.6)
    features = {
        "ph": 4.6,
        "organic_matter_pct": 1.5,
        "avg_temperature_c": 27.0,
        "annual_rainfall_mm": 1300.0,
        "clay_pct": 20.0,
        "sentinel_ndvi": 0.60
    }

    result = predictor.predict(features)
    # Pasturas tropicales o cultivos tolerantes a acidez deben superar al maíz sensible
    pasturas = next(p for p in result["predictions"] if "pasturas" in p["crop_id"])
    maiz = next(p for p in result["predictions"] if "maiz" in p["crop_id"])
    
    assert pasturas["suitability_score_pct"] > maiz["suitability_score_pct"]
    assert maiz["primary_limiting_factor"] is not None
