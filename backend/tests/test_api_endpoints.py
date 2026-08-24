import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "HEALTHY"
    assert data["cache_active"] is True

def test_profile_post_endpoint():
    payload = {
        "latitude": 9.324,
        "longitude": -69.112,
        "force_refresh": True
    }
    response = client.post("/api/v1/spatial/profile", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "mapbiomas_lulc" in data
    assert "agroclimate" in data
    assert "sentinel_vegetation" in data
    assert "detected_zone" in data
    assert data["coordinates"]["latitude"] == 9.324
    assert data["coordinates"]["longitude"] == -69.112

def test_mapbiomas_get_endpoint():
    response = client.get("/api/v1/spatial/mapbiomas?latitude=8.985&longitude=-71.724")
    assert response.status_code == 200
    data = response.json()
    assert "annual_series" in data
    assert "2024" in data["annual_series"]

def test_climate_get_endpoint():
    response = client.get("/api/v1/spatial/climate?latitude=10.15&longitude=-67.45")
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data

def test_sentinel_ndvi_get_endpoint():
    response = client.get("/api/v1/spatial/sentinel-ndvi?latitude=8.55&longitude=-71.2")
    assert response.status_code == 200
    data = response.json()
    assert "latest_metrics" in data
    assert "ndvi" in data["latest_metrics"]

def test_cache_stats_endpoint():
    response = client.get("/api/v1/cache/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_cached_spatial_points" in data
