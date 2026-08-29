"""
Unit tests for MapBiomas Discrepancy & Ground Truth Detector
"""

import pytest
from src.mapbiomas_discrepancy_detector import MapBiomasDiscrepancyDetector

def test_concordant_forest():
    detector = MapBiomasDiscrepancyDetector()
    res = detector.evaluate_discrepancy(
        lat=9.324,
        lon=-69.112,
        mapbiomas_class_id=3, # Bosque
        sentinel_metrics={"ndvi": 0.78, "evi": 0.60, "ndwi": 0.35},
        sar_backscatter_db=-8.5
    )
    assert not res["discrepancy_detected"]
    assert res["ground_truth_status"] == "VERIFIED_CONCORDANT"
    assert res["severity"] == "NORMAL"

def test_deforestation_alert():
    detector = MapBiomasDiscrepancyDetector()
    res = detector.evaluate_discrepancy(
        lat=9.324,
        lon=-69.112,
        mapbiomas_class_id=3, # Bosque
        sentinel_metrics={"ndvi": 0.25, "evi": 0.15, "ndwi": 0.05},
        sar_backscatter_db=-18.2
    )
    assert res["discrepancy_detected"]
    assert res["discrepancy_type"] == "DEFORESTATION_OR_CLEARING_ALERT"
    assert res["severity"] == "CRITICA"
    assert res["ground_truth_status"] == "ANOMALY_DETECTED"

def test_pasture_to_cropland():
    detector = MapBiomasDiscrepancyDetector()
    res = detector.evaluate_discrepancy(
        lat=9.324,
        lon=-69.112,
        mapbiomas_class_id=15, # Pastura
        sentinel_metrics={"ndvi": 0.82, "evi": 0.68, "ndwi": 0.30},
        sar_backscatter_db=-10.0
    )
    assert res["discrepancy_detected"]
    assert res["discrepancy_type"] == "PASTURE_TO_CROPLAND_CONVERSION"
