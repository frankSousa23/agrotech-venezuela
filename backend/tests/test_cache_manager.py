import os
import pytest
import tempfile
import gc
from src.cache_manager import CacheManager

def test_cache_set_and_get():
    temp_dir = tempfile.mkdtemp()
    temp_db_path = os.path.join(temp_dir, "test_cache.db")

    try:
        manager = CacheManager(db_path=temp_db_path)
        lat, lon = 9.324, -69.112
        
        # Debe ser nulo antes de insertar
        assert manager.get_cached_profile(lat, lon) is None
        
        # Guardar en caché
        mapbiomas_payload = {"latest": "Agricultura"}
        climate_payload = {"temp": 28.5}
        manager.set_cached_profile(lat, lon, mapbiomas_data=mapbiomas_payload, climate_data=climate_payload)
        
        # Recuperar y validar
        cached = manager.get_cached_profile(lat, lon)
        assert cached is not None
        assert cached["from_cache"] is True
        assert cached["mapbiomas"]["latest"] == "Agricultura"
        assert cached["climate"]["temp"] == 28.5
        assert cached["hit_count"] == 1

        # Segundo hit
        cached_2 = manager.get_cached_profile(lat, lon)
        assert cached_2["hit_count"] == 2
        
        # Estadísticas
        stats = manager.get_stats()
        assert stats["total_cached_spatial_points"] == 1
    finally:
        del manager
        gc.collect()
        if os.path.exists(temp_db_path):
            try:
                os.remove(temp_db_path)
                os.rmdir(temp_dir)
            except Exception:
                pass
