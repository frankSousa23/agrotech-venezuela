import pytest
from src.sentinel_processor import SentinelProcessor, SCL_CLASSES

def test_scl_cloud_classes_definition():
    assert SCL_CLASSES[4] == "VEGETATION"
    assert SCL_CLASSES[8] == "CLOUD_MEDIUM_PROBABILITY"
    assert SCL_CLASSES[9] == "CLOUD_HIGH_PROBABILITY"
    assert SCL_CLASSES[3] == "CLOUD_SHADOWS"

def test_sentinel_ndvi_vigor_classification():
    processor = SentinelProcessor()
    assert "Muy Alto" in processor._classify_ndvi_vigor(0.82)
    assert "Alto" in processor._classify_ndvi_vigor(0.65)
    assert "Moderado" in processor._classify_ndvi_vigor(0.45)
    assert "Bajo" in processor._classify_ndvi_vigor(0.20)

def test_sentinel_parcel_profile():
    processor = SentinelProcessor()
    result = processor.get_parcel_vegetation_profile(lat=9.324, lon=-69.112)
    
    assert "latest_metrics" in result
    assert "ndvi" in result["latest_metrics"]
    assert "evi" in result["latest_metrics"]
    assert "ndwi" in result["latest_metrics"]
    assert result["resolution_meters"] == 10
