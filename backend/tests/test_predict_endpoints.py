import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_predict_crops_endpoint():
    payload = {
        "latitude": 9.324,
        "longitude": -69.112,
        "ph": 6.4,
        "organic_matter_pct": 3.2,
        "texture": "Franco-limoso"
    }
    response = client.post("/api/v1/predict/crops", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "ml_predictions" in data
    assert len(data["ml_predictions"]["predictions"]) > 0
    assert data["ml_predictions"]["top_recommended_crop"] is not None

def test_predict_risks_endpoint():
    payload = {
        "latitude": 8.985,
        "longitude": -71.724,
        "ph": 4.8,
        "organic_matter_pct": 4.2,
        "parcel_area_ha": 25.0
    }
    response = client.post("/api/v1/predict/risks", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "agroclimatic_risks" in data
    assert "soil_carbon_sequestration" in data
    assert data["soil_carbon_sequestration"]["soil_metrics"]["analyzed_area_ha"] == 25.0

def test_ai_prescribe_endpoint():
    payload = {
        "latitude": 10.15,
        "longitude": -67.45,
        "ph": 6.8,
        "organic_matter_pct": 3.5
    }
    response = client.post("/api/v1/ai/prescribe", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "ai_report" in data
    assert "key_metrics" in data
    assert data["ai_report"]["status"] == "SUCCESS"

def test_ai_consult_chat_endpoint():
    payload = {
        "latitude": 9.324,
        "longitude": -69.112,
        "message": "¿Cuál es la mejor fecha para sembrar maíz en Portuguesa?",
        "conversation_history": []
    }
    response = client.post("/api/v1/ai/consult", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
