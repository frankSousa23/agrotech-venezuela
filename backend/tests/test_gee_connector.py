import pytest
from src.gee_connector import GEEConnector, MAPBIOMAS_LEGEND_CODES

def test_mapbiomas_legend_codes():
    assert 1 in MAPBIOMAS_LEGEND_CODES  # Bosque
    assert 15 in MAPBIOMAS_LEGEND_CODES # Pastizal
    assert 18 in MAPBIOMAS_LEGEND_CODES # Agricultura
    assert 33 in MAPBIOMAS_LEGEND_CODES # Agua
    assert MAPBIOMAS_LEGEND_CODES[18]["category"] == "Antrópica"

def test_pixel_history_structure():
    connector = GEEConnector()
    # Coordenadas de Sur del Lago, Zulia
    result = connector.get_pixel_history(lat=8.985, lon=-71.724)
    
    assert "annual_series" in result
    assert "latest_coverage_2024" in result
    assert len(result["annual_series"]) == 40 # 1985 a 2024
    assert "1985" in result["annual_series"]
    assert "2024" in result["annual_series"]
    assert "detected_transitions_count" in result
