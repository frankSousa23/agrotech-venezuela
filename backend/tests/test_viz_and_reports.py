import pytest
from src.viz_utils import create_folium_map, create_mapbiomas_timeline_chart, create_crop_yield_bar_chart, create_carbon_scenarios_chart
from src.report_generator import ReportGenerator

def test_folium_map_generation():
    m = create_folium_map(lat=9.324, lon=-69.112, parcel_name="Finca Turén")
    assert m is not None
    # Verificar que el mapa contiene capas
    rendered = m._repr_html_()
    assert "Esri World Imagery" in rendered or "folium" in rendered.lower()

def test_plotly_charts_generation():
    annual_series = {
        "1985": {"class_name": "Formación Campestre / Sabana", "category": "Natural"},
        "2024": {"class_name": "Agricultura / Cultivos", "category": "Antrópica"}
    }
    fig_timeline = create_mapbiomas_timeline_chart(annual_series)
    assert fig_timeline is not None

    preds = [
        {"crop_name": "Maíz Blanco", "suitability_score_pct": 92.0, "projected_yield_ton_ha": {"expected": 6.8}},
        {"crop_name": "Soya", "suitability_score_pct": 84.0, "projected_yield_ton_ha": {"expected": 3.2}}
    ]
    fig_yield = create_crop_yield_bar_chart(preds)
    assert fig_yield is not None

    scenarios = {
        "agroforestry": {"practice": "Agroforestería", "total_annual_co2_seq_ton": 38.5}
    }
    fig_carbon = create_carbon_scenarios_chart(scenarios)
    assert fig_carbon is not None

def test_report_generator_markdown_and_geojson():
    report_md = ReportGenerator.generate_markdown_report(
        parcel_name="Finca Santa Elena",
        lat=9.324,
        lon=-69.112,
        zone="Portuguesa",
        area_ha=30.0,
        soil={"ph": 6.2, "organic_matter_pct": 3.4},
        climate={"summary": {"accumulated_rainfall_mm": 1450, "avg_temperature_c": 27.0, "growing_degree_days_gdd": 420}},
        sentinel={"latest_metrics": {"ndvi": 0.76, "ndwi": 0.28, "vegetation_vigor": "Alto"}},
        mapbiomas={"latest_coverage_2024": {"class_name": "Agricultura"}, "detected_transitions_count": 1},
        ml_preds={"top_recommended_crop": "Maíz Blanco", "predictions": [{"crop_name": "Maíz Blanco", "suitability_score_pct": 90, "suitability_level": "Excelente", "projected_yield_ton_ha": {"expected": 6.5}, "recommended_planting_season": "Ciclo Invierno"}]},
        risks={"overall_risk_index_pct": 25, "overall_risk_category": "BAJO", "risk_breakdown": {}},
        ai_prescription="Dictamen agronómico favorable."
    )

    assert "Finca Santa Elena" in report_md
    assert "Maíz Blanco" in report_md
    assert "Dictamen agronómico favorable." in report_md

    geojson_obj = ReportGenerator.generate_geojson_feature(
        parcel_name="Finca Santa Elena",
        lat=9.324,
        lon=-69.112,
        area_ha=30.0,
        metrics={"ndvi": 0.76}
    )

    assert geojson_obj["type"] == "FeatureCollection"
    assert len(geojson_obj["features"]) == 1
    assert geojson_obj["features"][0]["geometry"]["type"] == "Polygon"
    assert geojson_obj["features"][0]["properties"]["area_ha"] == 30.0
