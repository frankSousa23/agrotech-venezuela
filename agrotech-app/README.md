# Agrotech Venezuela 🌾🛰️

**Plataforma Integral de Inteligencia Edafo-Climática, Visión Satelital (WebGIS), Machine Learning Agronómico y Prescripción Asistida por IA.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Next.js 16](https://img.shields.io/badge/Next.js-16%20(Turbopack)-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-2.0-009688.svg)](https://fastapi.tiangolo.com/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.62-FF4B4B.svg)](https://streamlit.io/)
[![Python 3.13](https://img.shields.io/badge/Python-3.13-blue.svg)](https://www.python.org/)
[![PostgreSQL 15](https://img.shields.io/badge/PostgreSQL-15-336791.svg)](https://www.postgresql.org/)
[![Tests: 63 Passing](https://img.shields.io/badge/Tests-63%20Passing-brightgreen.svg)]()

Inspirada y potenciada con las clasificaciones de cobertura y uso del suelo (LULC) de **MapBiomas Venezuela** (1985–2024), **Sentinel-2 L2A (Copernicus)** y **NASA POWER**, Agrotech transforma la observación satelital en **decisiones agronómicas precisas, prescriptivas y de acción directa** para agrónomos, productores e investigadores agrícolas.

---

## 🌟 Visión e Innovación Tecnológica (Nivel Competición)

| Dimensión | MapBiomas Venezuela (Observacional) | Agrotech Venezuela (Prescriptivo y Acción) |
| :--- | :--- | :--- |
| **Ingreso de Datos** | Consulta manual en visor o descarga de rasters. | **Automático por Coordenadas GPS $(Lat, Lon)$**: Ingesta satelital de 40 años sin fricción. |
| **Resolución Espacial** | 30 metros (Landsat). | **10 metros a nivel de parcela** (Sentinel-2 L2A con máscara de nubes SCL). |
| **Clima en Tiempo Real** | Climatología general. | **NASA POWER Diario**: Temperatura, radiación solar y Grados Día de Desarrollo (**GDD**). |
| **Modelado de Cosecha** | No disponible. | **Machine Learning Predictivo**: Estimación de rendimiento en **Ton/ha** para 8 cultivos estratégicos. |
| **Prescripción Agronómica** | No prescriptivo. | **Calculadora de Encalado ($CaCO_3$) y Plan Nutricional $N-P-K$** adaptado a insumos venezolanos. |
| **Inteligencia Artificial** | No disponible. | **Agente Google Gemini AI**: Diagnósticos técnicos estructurados y chat agronómico. |
| **Resiliencia Rural** | Dependencia 100% de internet estable. | **Base de Datos SQLite en Caché Local (< 5ms)** y compatibilidad PWA Offline. |

---

## 🗺️ Módulos Principales del Sistema

1. **Visor WebGIS Multidimensional (`/dashboard/mapa`)**: 4 Mapas base satelitales, capas temáticas MapBiomas LULC, semáforo de pH del suelo y Geo-Inspector lateral.
2. **Delimitador de Fincas y Gemelo Digital (`ParcelDiagnosticModal`)**: Trazo de parcelas con cálculo geodésico de hectáreas (Shoelace) y exportación a GeoJSON.
3. **Dashboard Interactivo de Prescripción (Streamlit en `:8501`)**: Sliders reactivos de suelo, gráfico de línea temporal MapBiomas 1985-2024 y descarga de informes.
4. **Motor Predictivo de Machine Learning y Carbono**: Rendimientos proyectados en Ton/ha, riesgos agroclimáticos y balance de secuestro de carbono (**SOC**).
5. **Agente Asesor con Google Gemini AI**: Prescripciones técnicas y chat agronómico interactivo.

---

## 🚀 Guía de Inicio Rápido

```bash
# Iniciar con Docker Compose
docker-compose up -d --build
```
- Plataforma WebGIS: [http://localhost:3000](http://localhost:3000)
- Dashboard Streamlit: [http://localhost:8501](http://localhost:8501)
- Swagger FastAPI: [http://localhost:8000/docs](http://localhost:8000/docs)
- Swagger Next.js: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧪 Pruebas Automatizadas (63 Tests)

```bash
# Tests de Backend (Pytest - 33 tests)
cd backend && py -m pytest tests

# Tests de Frontend (Jest - 30 tests)
cd agrotech-app && npm test
```

---

## 📄 Licencia y Atribución

- **Licencia de Software**: MIT License (Copyright 2026 Frank Sousa - Agrotech Venezuela).
- **Atribución MapBiomas**: Datos LULC referenciados bajo licencia **Creative Commons Atribución 4.0 (CC BY 4.0)** (Provita, LSIGMA USB, Wataniba y RAISG).
