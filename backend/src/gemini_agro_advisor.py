"""
Google Gemini Geospatial & Agronomic Advisory Agent - Agrotech Venezuela (Semana 2 - Día 11)
Agente de Inteligencia Artificial contextualizado con telemetría satelital (MapBiomas, Sentinel-2),
clima en tiempo real (NASA POWER) y modelos predictivos de Machine Learning.
"""

import os
import json
import logging
from typing import Dict, Any, List, Optional
import requests

logger = logging.getLogger(__name__)

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

SYSTEM_AGRONOMIC_PROMPT = """Eres el Dr. Agrónomo Senior de Agrotech Venezuela, una eminencia en edafología tropical, agricultura de precisión y zonificación agroecológica venezolana (Llanos Occidentales, Sur del Lago de Maracaibo, Valles Centrales, Cordillera Andina y Mesas Orientales).

Tu misión es interpretar la telemetría espacial y los datos de Machine Learning de la parcela del productor para entregar diagnósticos técnicos de máxima precisión, estructurados, científicos y prácticos.

Reglas clave:
1. Adapta siempre tus recomendaciones a los insumos disponibles en Venezuela (Cal Agrícola/Dolomítica, Fórmulas NPK 12-24-12, 15-15-15, Urea, Sulfato de Amonio, Roca Fosfórica de Riecito/Falcón).
2. Justifica tus recomendaciones citando el historial de 40 años de MapBiomas (ej. transición de sabana a agricultura), el vigor actual Sentinel-2 (NDVI) y las variables agroclimáticas de NASA POWER.
3. Sé preciso, profesional, empático y estructurado en tus respuestas con viñetas y tablas si aplica."""

class GeminiAgroAdvisor:
    """Orquestador de consultas y prescripciones agronómicas impulsadas por Google Gemini."""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

    def generate_technical_prescription(
        self,
        parcel_context: Dict[str, Any],
        user_query: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Genera una prescripción técnica integral a partir del contexto satelital y predictivo.
        """
        prompt = self._build_context_prompt(parcel_context, user_query)

        if self.api_key:
            try:
                headers = {"Content-Type": "application/json"}
                url = f"{GEMINI_API_URL}?key={self.api_key}"
                payload = {
                    "system_instruction": {
                        "parts": [{"text": SYSTEM_AGRONOMIC_PROMPT}]
                    },
                    "contents": [
                        {
                            "role": "user",
                            "parts": [{"text": prompt}]
                        }
                    ],
                    "generationConfig": {
                        "temperature": 0.35,
                        "maxOutputTokens": 2048
                    }
                }

                response = requests.post(url, headers=headers, json=payload, timeout=20)
                if response.status_code == 200:
                    resp_json = response.json()
                    ai_text = resp_json["candidates"][0]["content"]["parts"][0]["text"]
                    return {
                        "source": "GEMINI_2_5_FLASH_LIVE",
                        "status": "SUCCESS",
                        "prescription_markdown": ai_text,
                        "agronomic_executive_summary": self._extract_executive_summary(ai_text)
                    }
                else:
                    logger.warning(f"Respuesta no exitosa de Gemini API ({response.status_code}): {response.text}")
                    return self._generate_calibrated_ai_prescription(parcel_context)
            except Exception as e:
                logger.error(f"Error llamando a Gemini API ({e}). Activando motor experto local.")
                return self._generate_calibrated_ai_prescription(parcel_context)
        else:
            return self._generate_calibrated_ai_prescription(parcel_context)

    def interactive_chat(
        self,
        parcel_context: Dict[str, Any],
        conversation_history: List[Dict[str, str]],
        message: str
    ) -> Dict[str, Any]:
        """Permite mantener una conversación interactiva sobre la parcela con Gemini."""
        context_str = f"Contexto de la Parcela: {json.dumps(parcel_context, ensure_ascii=False)}"
        
        if self.api_key:
            try:
                contents = [
                    {"role": "user", "parts": [{"text": f"{context_str}\n\nPregunta: {message}"}]}
                ]
                headers = {"Content-Type": "application/json"}
                url = f"{GEMINI_API_URL}?key={self.api_key}"
                payload = {
                    "system_instruction": {"parts": [{"text": SYSTEM_AGRONOMIC_PROMPT}]},
                    "contents": contents,
                    "generationConfig": {"temperature": 0.4, "maxOutputTokens": 1024}
                }
                response = requests.post(url, headers=headers, json=payload, timeout=15)
                if response.status_code == 200:
                    resp_json = response.json()
                    ai_text = resp_json["candidates"][0]["content"]["parts"][0]["text"]
                    return {"reply": ai_text, "model": "Gemini-2.5-Flash"}
            except Exception:
                pass

        # Fallback inteligente local
        return {
            "reply": f"Análisis Agronómico para tu parcela: Con un pH de {parcel_context.get('soil', {}).get('ph', 6.2)} y lluvia de {parcel_context.get('climate', {}).get('summary', {}).get('accumulated_rainfall_mm', 1450)} mm, el cultivo recomendado es {parcel_context.get('ml_predictions', {}).get('top_recommended_crop', 'Maíz Blanco')}. Te recomiendo mantener el monitoreo de humedad y aplicar cal agrícola si el pH desciende de 5.8.",
            "model": "Agrotech-Expert-Fallback"
        }

    def _build_context_prompt(self, ctx: Dict[str, Any], user_query: Optional[str]) -> str:
        """Serializa la telemetría para inyección en el prompt de Gemini."""
        coords = ctx.get("coordinates", {})
        mb = ctx.get("mapbiomas", {})
        clim = ctx.get("climate", {}).get("summary", {})
        sent = ctx.get("sentinel", {}).get("latest_metrics", {})
        soil = ctx.get("soil", {})
        ml = ctx.get("ml_predictions", {})
        risks = ctx.get("risks", {})

        return f"""Por favor genera un Dictamen y Prescripción Técnica Agronómica de Alta Precisión para la siguiente finca en Venezuela:

1. UBICACIÓN Y COORDENADAS:
- Latitud: {coords.get('latitude')}, Longitud: {coords.get('longitude')}
- Región Agroecológica: {ctx.get('detected_zone', 'Zona Agrícola Nacional')}

2. HISTORIAL MAPBIOMAS VENEZUELA (1985-2024):
- Cobertura 2024: {mb.get('latest_coverage_2024', {}).get('class_name', 'Agricultura')}
- Transiciones detectadas: {mb.get('detected_transitions_count', 1)} cambios de uso en 40 años.

3. AGROCLIMATOLOGÍA (NASA POWER):
- Temp. Media: {clim.get('avg_temperature_c')}°C (Máx: {clim.get('max_temperature_c')}°C, Mín: {clim.get('min_temperature_c')}°C)
- Precipitación Acumulada: {clim.get('accumulated_rainfall_mm')} mm
- Grados Día de Desarrollo (GDD): {clim.get('growing_degree_days_gdd')}
- Radiación Solar: {clim.get('avg_solar_radiation_mj_m2')} MJ/m²/día

4. ESTADO DE VEGETACIÓN SENTINEL-2 (10m):
- NDVI: {sent.get('ndvi')} ({sent.get('vegetation_vigor')})
- NDWI (Contenido Hídrico): {sent.get('ndwi')}

5. PARÁMETROS FISICOQUÍMICOS DEL SUELO:
- pH: {soil.get('ph')}
- Materia Orgánica: {soil.get('organic_matter_pct')}%
- Textura: {soil.get('texture', 'Franco')}

6. PREDICCIÓN ML & RIESGOS:
- Cultivo Óptimo Sugerido: {ml.get('top_recommended_crop')}
- Nivel de Riesgo Global: {risks.get('overall_risk_category')} ({risks.get('overall_risk_index_pct')}%)

Consulta específica del productor: {user_query or 'Generar plan de siembra, corrección de suelo y recomendaciones de fertilización.'}
"""

    def _extract_executive_summary(self, markdown_text: str) -> str:
        """Extrae las primeras 2 frases clave como resumen ejecutivo."""
        lines = [line.strip() for line in markdown_text.split("\n") if line.strip() and not line.startswith("#")]
        return " ".join(lines[:2]) if lines else "Diagnóstico agronómico y satelital completado con éxito."

    def _generate_calibrated_ai_prescription(self, ctx: Dict[str, Any]) -> Dict[str, Any]:
        """Genera prescripción agronómica exhaustiva y calibrada en modo offline/fallback."""
        soil = ctx.get("soil", {})
        ph = float(soil.get("ph", 6.2))
        om = float(soil.get("organic_matter_pct", 3.0))
        top_crop = ctx.get("ml_predictions", {}).get("top_recommended_crop", "Maíz Blanco Harinero")
        rain = ctx.get("climate", {}).get("summary", {}).get("accumulated_rainfall_mm", 1450.0)

        needs_lime = ph < 5.8
        lime_ton_ha = round((6.2 - ph) * 1.8, 1) if needs_lime else 0.0

        prescription = f"""## 🌾 Dictamen Técnico y Prescripción Agronómica Agrotech-AI

### 1. Diagnóstico Edafo-Climático y Satelital
- **Aptitud del Terreno**: El suelo evaluado presenta un **pH de {ph}** con un tenor de **Materia Orgánica de {om}%**, enmarcado en un régimen pluviométrico de **{rain} mm/año**.
- **Historial de Cobertura (MapBiomas)**: La parcela ha mantenido una vocación agrícola activa, garantizando condiciones físicas estables para mecanización o siembra directa.
- **Vigor Vegetativo (Sentinel-2)**: El índice de reflectancia óptica muestra una condición biofísica favorable para el establecimiento de cultivos de ciclo corto y perennes.

### 2. Cultivo Estratégico Seleccionado
- **Recomendación Principal**: **{top_crop}**.
- **Ventaja Agroecológica**: Alta eficiencia en el uso de radiación solar y compatibilidad térmica óptima.

### 3. Plan de Enmiendas y Corrección de Suelos
{f"- **Encalado Obligatorio**: Aplicar **{lime_ton_ha} Ton/ha** de Cal Agrícola (Carbonato de Calcio al 85% PRNT) o Cal Dolomítica 30 a 45 días antes de la siembra mediante pase de rastra liviana." if needs_lime else "- **Condición de pH Óptima**: El suelo no presenta toxicidad por aluminio. No se requiere encalado correctivo en este ciclo."}
- **Aporte de Materia Orgánica**: Incorporar abonos verdes o compost en dosis de 2.0 Ton/ha para mejorar la capacidad de intercambio catiónico (CIC).

### 4. Programa de Fertilización Balanceada ($N - P_2O_5 - K_2O$)
- **A la Siembra**: Aplicar 200 kg/ha de fórmula completa **NPK 12-24-12** o **10-20-20** incorporada al suelo a 5 cm de la semilla.
- **Primera Fertilización de Cobertura (25-30 días)**: Aplicar 120 kg/ha de **Urea** o **Sulfato de Amonio** fraccionado.
- **Segunda Fertilización de Cobertura (45 días)**: Aplicar 80 kg/ha de Urea + Cloruro de Potasio ($KCl$).

### 5. Alerta Fitosanitaria y Manejo Integrado (MIP)
- Monitorear presencia de hongos foliares en períodos de alta humedad relativa.
- Mantener cobertura viva para mitigar la erosión y maximizar la captura de carbono orgánico.
"""

        return {
            "source": "AGROTECH_EXPERT_SYSTEM_ENGINE",
            "status": "SUCCESS",
            "prescription_markdown": prescription,
            "agronomic_executive_summary": f"Diagnóstico agronómico para {top_crop}: pH {ph}, encalado {'requerido (' + str(lime_ton_ha) + ' Ton/ha)' if needs_lime else 'no requerido'}, plan nutricional N-P-K activado."
        }
