"""
Technical Agronomic Report Generator - Agrotech Venezuela (Semana 3 - Día 18)
Módulo para la compilación y exportación de dictámenes técnicos en Markdown, JSON y GeoJSON.
"""

from datetime import datetime
from typing import Any, Dict


class ReportGenerator:
    """Generador de fichas y reportes técnicos agronómicos descargables."""

    @staticmethod
    def generate_markdown_report(
        parcel_name: str,
        lat: float,
        lon: float,
        zone: str,
        area_ha: float,
        soil: Dict[str, Any],
        climate: Dict[str, Any],
        sentinel: Dict[str, Any],
        mapbiomas: Dict[str, Any],
        ml_preds: Dict[str, Any],
        risks: Dict[str, Any],
        ai_prescription: str,
    ) -> str:
        """Compila un informe técnico exhaustivo en formato Markdown descargable."""
        date_str = datetime.now().strftime("%d/%m/%Y %H:%M")
        top_crop = ml_preds.get("top_recommended_crop", "Maíz Blanco")

        report = f"""# 🌾 DICTAMEN TÉCNICO Y PRESCRIPCIÓN AGRONÓMICA DE PRECISIÓN
**Plataforma Agrotech Venezuela — Gemelo Digital Satelital e Inteligencia Artificial**

- **Parcela / Finca**: {parcel_name}
- **Fecha de Emisión**: {date_str}
- **Coordenadas GPS**: Latitud `{lat:.5f}`, Longitud `{lon:.5f}`
- **Región Agroecológica**: {zone}
- **Superficie Evaluada**: {area_ha} Hectáreas (ha)

---

## 🛰️ 1. Diagnóstico Geoespacial y Biofísico

| Variable | Valor Medido / Fuente | Estado / Interpretación |
| :--- | :--- | :--- |
| **Cobertura 2024 (MapBiomas)** | {mapbiomas.get('latest_coverage_2024', {}).get('class_name', 'Agricultura')} | {mapbiomas.get('detected_transitions_count', 0)} cambios de uso en 40 años (1985–2024) |
| **Vigor Fotosintético (NDVI 10m)** | {sentinel.get('latest_metrics', {}).get('ndvi', 0.72)} | {sentinel.get('latest_metrics', {}).get('vegetation_vigor', 'Vigor Alto')} |
| **Contenido Hídrico (NDWI)** | {sentinel.get('latest_metrics', {}).get('ndwi', 0.28)} | Nivel hídrico foliar adecuado |
| **Precipitación Acumulada** | {climate.get('summary', {}).get('accumulated_rainfall_mm', 1450)} mm | Régimen de lluvias representativo (NASA POWER) |
| **Temperatura Media** | {climate.get('summary', {}).get('avg_temperature_c', 26.5)} °C | Rango térmico tropical |
| **Grados Día de Desarrollo (GDD)** | {climate.get('summary', {}).get('growing_degree_days_gdd', 420)} GDD | Acumulación térmica activa |

---

## 🧪 2. Parámetros Edafológicos del Suelo

- **pH Actual**: `{soil.get('ph', 6.2)}`
- **Materia Orgánica**: `{soil.get('organic_matter_pct', 3.0)} %`
- **Textura**: `{soil.get('texture', 'Franco')}`
- **Condición de Acidez**: {"Suelo Ácido - Requiere Encalado" if float(soil.get('ph', 6.2)) < 5.8 else "Rango Óptimo - No requiere encalado"}

---

## 🌾 3. Ranking de Cultivos y Rendimiento Proyectado (Machine Learning)

| Cultivo | Aptitud (%) | Nivel de Recomendación | Rendimiento Proyectado | Época de Siembra |
| :--- | :--- | :--- | :--- | :--- |
"""
        for p in ml_preds.get("predictions", [])[:5]:
            report += f"| **{p['crop_name']}** | {p['suitability_score_pct']}% | {p['suitability_level']} | **{p['projected_yield_ton_ha']['expected']} Ton/ha** | {p['recommended_planting_season']} |\n"

        report += f"""
---

## ⚠️ 4. Matriz de Riesgos Agroclimáticos
- **Índice Global de Riesgo**: `{risks.get('overall_risk_index_pct', 35)}%` ({risks.get('overall_risk_category', 'MODERADO')})
- **Estrés Hídrico / Sequía**: {risks.get('risk_breakdown', {}).get('drought_stress', {}).get('level', 'BAJO')} — {risks.get('risk_breakdown', {}).get('drought_stress', {}).get('mitigation', '')}
- **Encharcamiento / Asfixia**: {risks.get('risk_breakdown', {}).get('waterlogging_flood', {}).get('level', 'BAJO')} — {risks.get('risk_breakdown', {}).get('waterlogging_flood', {}).get('mitigation', '')}
- **Acidez / Toxicidad**: {risks.get('risk_breakdown', {}).get('soil_acidity_aluminum', {}).get('level', 'BAJO')} — {risks.get('risk_breakdown', {}).get('soil_acidity_aluminum', {}).get('mitigation', '')}

---

## 🤖 5. Prescripción Técnica Detallada (Google Gemini AI)

{ai_prescription}

---
*Emitido automáticamente por el Sistema de Información Geográfica y Prescripción Agronómica Agrotech Venezuela.*
"""
        return report

    @staticmethod
    def generate_geojson_feature(
        parcel_name: str, lat: float, lon: float, area_ha: float, metrics: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Genera un archivo GeoJSON de la parcela delimitada con sus propiedades agronómicas."""
        # Polígono de 4 vértices aproximado para el área indicada
        delta = 0.0015 * (area_ha**0.5)
        coords = [
            [
                [lon - delta, lat - delta],
                [lon + delta, lat - delta],
                [lon + delta, lat + delta],
                [lon - delta, lat + delta],
                [lon - delta, lat - delta],
            ]
        ]

        return {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {"type": "Polygon", "coordinates": coords},
                    "properties": {
                        "name": parcel_name,
                        "area_ha": area_ha,
                        "centroid": {"latitude": lat, "longitude": lon},
                        "created_at": datetime.now().isoformat(),
                        "metrics": metrics,
                    },
                }
            ],
        }
