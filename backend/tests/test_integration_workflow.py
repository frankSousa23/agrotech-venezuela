import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_full_pipeline_consistency_portuguesa():
    """Valida el pipeline completo para una coordenada agrícola en Turén, Portuguesa."""
    payload = {
        "latitude": 9.324,
        "longitude": -69.112,
        "force_refresh": True
    }
    response = client.post("/api/v1/spatial/profile", json=payload)
    assert response.status_code == 200
    data = response.json()

    # 1. MapBiomas
    mb = data["mapbiomas_lulc"]
    assert mb["resolution_meters"] == 30
    assert len(mb["annual_series"]) == 40
    assert "Agricultura" in mb["latest_coverage_2024"]["class_name"]

    # 2. NASA POWER Agroclimatología
    clim = data["agroclimate"]
    assert "summary" in clim
    assert clim["summary"]["avg_temperature_c"] >= 20.0
    assert clim["summary"]["growing_degree_days_gdd"] > 0

    # 3. Sentinel-2
    sent = data["sentinel_vegetation"]
    assert sent["resolution_meters"] == 10
    assert sent["cloud_masking_algorithm"] is not None
    assert 0.0 <= sent["latest_metrics"]["ndvi"] <= 1.0

    # 4. Zona
    assert "Portuguesa" in data["detected_zone"]

def test_full_pipeline_consistency_zulia():
    """Valida el pipeline para una coordenada en Sur del Lago de Maracaibo, Zulia."""
    payload = {
        "latitude": 8.985,
        "longitude": -71.724,
        "force_refresh": False
    }
    response = client.post("/api/v1/spatial/profile", json=payload)
    assert response.status_code == 200
    data = response.json()

    assert "Zulia" in data["detected_zone"] or "Maracaibo" in data["detected_zone"]
    assert data["mapbiomas_lulc"]["latest_coverage_2024"] is not None
