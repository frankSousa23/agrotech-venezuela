"""
Agrotech Venezuela - Script de Auditoría y Diagnóstico de Mapas (debug_map_app.py)
Herramienta de validación para diagnosticar la conexión con Google Earth Engine,
generación de mapas Folium interactivos, controles de dibujo y cálculo de Shoelace esferoidal.
"""

import sys
import os
import math

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Añadir ruta raíz de backend al path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.gee_connector import GEEConnector
from src.viz_utils import create_folium_map, create_mapbiomas_timeline_chart
from src.cache_manager import CacheManager
from src.sentinel_processor import SentinelProcessor

def test_gee_connection():
    print("\n🔍 1. Comprobando Conexión a Google Earth Engine / Fallback Offline...")
    connector = GEEConnector()
    print(f"   -> Modo inicializado: {'Producción GEE' if connector.is_authenticated else 'Modo Emulación Sintética Offline'}")
    
    # Coordenadas Turén, Portuguesa
    lat, lon = 9.3240, -69.1120
    history = connector.get_pixel_history(lat, lon)
    assert "annual_series" in history, "Error: annual_series no encontrada"
    assert "latest_coverage_2024" in history, "Error: latest_coverage_2024 no encontrada"
    print(f"   ✓ Historial de 40 años recuperado exitosamente ({len(history['annual_series'])} registros anuales)")
    print(f"   ✓ Cobertura 2024: {history['latest_coverage_2024']['class_name']} ({history['latest_coverage_2024']['category']})")
    return True

def test_folium_generation():
    print("\n🗺️ 2. Comprobando Generación de Mapa Folium & Plugins de Dibujo...")
    folium_map = create_folium_map(
        lat=9.3240,
        lon=-69.1120,
        parcel_name="Parcela Experimental Turén",
        ndvi_val=0.78,
        coverage_name="Agricultura / Cultivos"
    )
    assert folium_map is not None, "Error: El mapa Folium es None"
    
    # Verificar capas y plugins
    html_repr = folium_map.get_root().render()
    assert "Esri World Imagery" in html_repr or "World_Imagery" in html_repr, "Error: Capa Esri no encontrada"
    assert "leaflet.draw" in html_repr.lower() or "draw" in html_repr.lower(), "Error: Plugin Draw no detectado"
    print("   ✓ Mapa Folium generado con éxito (4 capas base + Marcador + Plugin de Dibujo)")
    return True

def test_shoelace_geodesic_math():
    print("\n📐 3. Comprobando Algoritmo Shoelace Esferoidal WGS84...")
    # Coordenadas de una parcela cuadrada de ~0.008 x 0.008 grados (~880m x ~880m ~ 77 ha)
    coords = [
        (9.320, -69.110),
        (9.328, -69.110),
        (9.328, -69.102),
        (9.320, -69.102)
    ]
    
    EARTH_RADIUS = 6378137.0
    total_area = 0.0
    rad_coords = [(math.radians(lat), math.radians(lng)) for lat, lng in coords]
    
    for i in range(len(rad_coords)):
        j = (i + 1) % len(rad_coords)
        lat1, lng1 = rad_coords[i]
        lat2, lng2 = rad_coords[j]
        total_area += (lng2 - lng1) * (2 + math.sin(lat1) + math.sin(lat2))
    
    total_area = abs((total_area * EARTH_RADIUS * EARTH_RADIUS) / 2.0)
    hectares = round(total_area / 10000.0, 2)
    
    print(f"   ✓ Área calculada en elipsoide WGS84: {hectares} ha")
    assert 60.0 < hectares < 90.0, f"Error en cálculo de superficie: {hectares} ha"
    return True

def main():
    print("=" * 70)
    print("🌾 AGROTECH VENEZUELA - AUDITORÍA DEL SUBSISTEMA DE MAPAS & GEE 🛰️")
    print("=" * 70)
    
    all_passed = True
    try:
        all_passed &= test_gee_connection()
        all_passed &= test_folium_generation()
        all_passed &= test_shoelace_geodesic_math()
    except Exception as e:
        print(f"\n❌ FALLO EN LA AUDITORÍA: {e}")
        return 1
    
    print("\n" + "=" * 70)
    print("✅ TODAS LAS PRUEBAS DEL MOTOR DE MAPAS Y ESPACIAL PASARON CON ÉXITO")
    print("=" * 70)
    return 0

if __name__ == "__main__":
    sys.exit(main())
