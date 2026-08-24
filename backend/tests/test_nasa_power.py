import pytest
from src.nasa_power_client import NasaPowerClient

def test_nasa_power_gdd_calculation():
    client = NasaPowerClient()
    tmax_mock = {"20260101": 32.0, "20260102": 30.0, "20260103": 28.0}
    tmin_mock = {"20260101": 20.0, "20260102": 18.0, "20260103": 16.0}
    
    gdd = client.calculate_growing_degree_days(tmax_mock, tmin_mock, base_temp=10.0)
    assert gdd > 0.0
    # Día 1: ((30 + 20) / 2) - 10 = 15
    # Día 2: ((30 + 18) / 2) - 10 = 14
    # Día 3: ((28 + 16) / 2) - 10 = 12 -> Total = 41
    assert gdd == 41.0

def test_nasa_power_daily_structure():
    client = NasaPowerClient(timeout_seconds=5)
    # Coordenadas de Turén, Portuguesa
    result = client.fetch_daily_agroclimate(lat=9.324, lon=-69.112, start_date="20260101", end_date="20260110")
    
    assert "summary" in result
    assert "coordinates" in result
    assert result["summary"]["avg_temperature_c"] > 10.0
    assert "accumulated_rainfall_mm" in result["summary"]
    assert "avg_solar_radiation_mj_m2" in result["summary"]
    assert "growing_degree_days_gdd" in result["summary"]
