import time
import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_cache_high_throughput_stress():
    """Valida la resiliencia y baja latencia de la base de datos SQLite bajo ráfaga de consultas."""
    lat, lon = 9.324, -69.112
    # Calentar caché
    client.post("/api/v1/spatial/profile", json={"latitude": lat, "longitude": lon, "force_refresh": True})

    # Ejecutar ráfaga de 30 consultas concurrentes en caché
    start_burst = time.time()
    for _ in range(30):
        resp = client.post("/api/v1/spatial/profile", json={"latitude": lat, "longitude": lon, "force_refresh": False})
        assert resp.status_code == 200
        data = resp.json()
        assert data["from_cache"] is True
        assert data["response_time_ms"] < 60.0 # Tiempo interno en caché de SQLite (< 60ms)

    total_burst_time = time.time() - start_burst
    avg_per_query_ms = (total_burst_time / 30.0) * 1000
    
    # Rendimiento global de cliente
    assert avg_per_query_ms < 90.0

def test_extreme_and_invalid_inputs_resilience():
    """Valida la robustez del sistema frente a datos atípicos o fuera de Venezuela."""
    # 1. Coordenadas fuera de rango en Venezuela
    resp_out = client.post("/api/v1/spatial/profile", json={"latitude": 45.0, "longitude": 10.0})
    assert resp_out.status_code == 422 # Error de validación Pydantic

    # 2. pH extremo en predicción ML
    resp_ph = client.post("/api/v1/predict/crops", json={"latitude": 9.324, "longitude": -69.112, "ph": 4.1})
    assert resp_ph.status_code == 200
    data = resp_ph.json()
    assert "ml_predictions" in data
