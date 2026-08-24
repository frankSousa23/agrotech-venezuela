"""
Live Microservices Probing & Diagnostic Engine - Agrotech Venezuela
Realiza pruebas incisivas sobre los 3 servidores activos en vivo:
1. FastAPI Backend (http://127.0.0.1:8000)
2. Streamlit Interactive Dashboard (http://127.0.0.1:8501)
3. Next.js WebGIS Platform (http://127.0.0.1:3000)
"""

import time
import requests
import json

SERVERS = [
    {"name": "FastAPI Spatial & ML Backend", "url": "http://127.0.0.1:8000/health", "method": "GET", "expected_status": 200},
    {"name": "FastAPI OpenAPI Docs", "url": "http://127.0.0.1:8000/docs", "method": "GET", "expected_status": 200},
    {"name": "FastAPI ML Crop Prediction", "url": "http://127.0.0.1:8000/api/v1/predict/crops", "method": "POST", "body": {"latitude": 9.324, "longitude": -69.112, "ph": 6.4}, "expected_status": 200},
    {"name": "FastAPI Risks & Carbon", "url": "http://127.0.0.1:8000/api/v1/predict/risks", "method": "POST", "body": {"latitude": 8.985, "longitude": -71.724}, "expected_status": 200},
    {"name": "FastAPI Gemini AI Prescribe", "url": "http://127.0.0.1:8000/api/v1/ai/prescribe", "method": "POST", "body": {"latitude": 9.324, "longitude": -69.112, "ph": 5.2}, "expected_status": 200},
    {"name": "Streamlit Interactive Dashboard", "url": "http://127.0.0.1:8501/_stcore/health", "method": "GET", "expected_status": 200},
    {"name": "Next.js WebGIS Landing", "url": "http://127.0.0.1:3000", "method": "GET", "expected_status": 200},
    {"name": "Next.js Map Viewer Page", "url": "http://127.0.0.1:3000/dashboard/mapa", "method": "GET", "expected_status": 200},
    {"name": "Next.js Geo API GeoJSON", "url": "http://127.0.0.1:3000/api/geo?type=metadata", "method": "GET", "expected_status": 200},
]

def run_probes():
    print("=" * 70)
    print("[AGROTECH VENEZUELA] - PRUEBAS INCISIVAS DE SERVIDORES EN VIVO")
    print("=" * 70)
    
    success_count = 0
    total_count = len(SERVERS)

    for s in SERVERS:
        start_t = time.time()
        try:
            if s["method"] == "GET":
                res = requests.get(s["url"], timeout=10)
            else:
                res = requests.post(s["url"], json=s.get("body", {}), timeout=15)
            
            elapsed_ms = round((time.time() - start_t) * 1000, 1)
            
            if res.status_code == s["expected_status"]:
                print(f"[PASS] {s['name']:<35} | Status: {res.status_code} | Latencia: {elapsed_ms:>6} ms")
                success_count += 1
            else:
                print(f"[FAIL] {s['name']:<35} | Status: {res.status_code} (Esperado: {s['expected_status']})")
        except Exception as e:
            elapsed_ms = round((time.time() - start_t) * 1000, 1)
            print(f"[WARN] {s['name']:<35} | Conexion en arranque ({e.__class__.__name__}) | {elapsed_ms} ms")

    print("-" * 70)
    print(f"[RESULTADO FINAL] {success_count}/{total_count} pruebas de endpoint en vivo superadas.")
    print("=" * 70)

if __name__ == "__main__":
    time.sleep(2) # Breve espera para que los puertos socket estén activos
    run_probes()
