import pytest
from src.risk_and_carbon_engine import RiskAndCarbonEngine

def test_risk_evaluation():
    engine = RiskAndCarbonEngine()
    features = {
        "ph": 4.8,
        "annual_rainfall_mm": 750.0,
        "avg_temperature_c": 31.0,
        "sentinel_ndwi": 0.08,
        "clay_pct": 18.0
    }

    risks = engine.evaluate_risks(features)
    assert "overall_risk_index_pct" in risks
    assert risks["overall_risk_index_pct"] > 40.0
    assert risks["risk_breakdown"]["drought_stress"]["level"] == "ALTO"
    assert risks["risk_breakdown"]["soil_acidity_aluminum"]["level"] == "CRÍTICO"

def test_carbon_sequestration_modeling():
    engine = RiskAndCarbonEngine()
    features = {
        "organic_matter_pct": 3.8,
        "clay_pct": 30.0
    }

    carbon = engine.model_carbon_sequestration(features, parcel_area_ha=20.0)
    assert "soil_metrics" in carbon
    assert carbon["soil_metrics"]["current_soc_ton_c_per_ha"] > 0
    assert carbon["soil_metrics"]["total_farm_soc_stock_ton_c"] > 0
    
    scenarios = carbon["annual_sequestration_scenarios"]
    assert "agroforestry_shaded_cacao_coffee" in scenarios
    assert scenarios["agroforestry_shaded_cacao_coffee"]["total_annual_co2_seq_ton"] > 50.0
