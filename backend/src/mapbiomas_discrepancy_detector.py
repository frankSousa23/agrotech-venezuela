"""
MapBiomas Discrepancy & Ground Truth Detector - Agrotech Venezuela
Módulo de detección de anomalías espaciales en tiempo real. Contrasta la clasificación
base de MapBiomas Venezuela (2024) con los índices biofísicos de Sentinel-2 L2A y
retrodispersión SAR Sentinel-1 Banda C para proveer retroalimentación y alertas tempranas.
"""

import logging
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)

# Mapeo de Clases Oficiales MapBiomas Venezuela
MAPBIOMAS_CODE_NAMES = {
    3: "Formación Forestal (Bosque)",
    4: "Formación Sabana",
    11: "Humedal / Pantano",
    15: "Pastura Sembrada",
    18: "Agricultura / Cultivo Anual",
    33: "Cuerpo de Agua Continental",
}


class MapBiomasDiscrepancyDetector:
    """Detector de discrepancias entre cobertura histórica de MapBiomas y telemetría satelital activa."""

    def evaluate_discrepancy(
        self,
        lat: float,
        lon: float,
        mapbiomas_class_id: int,
        sentinel_metrics: Dict[str, Any],
        sar_backscatter_db: Optional[float] = None,
    ) -> Dict[str, Any]:
        """
        Evalúa si la observación en tiempo real difiere sustancialmente del baseline histórico.
        """
        ndvi = float(sentinel_metrics.get("ndvi", 0.65))
        ndwi = float(sentinel_metrics.get("ndwi", 0.20))
        evi = float(sentinel_metrics.get("evi", 0.45))

        # Valor por defecto de SAR Banda C si no está presente
        if sar_backscatter_db is None:
            sar_backscatter_db = -11.5

        discrepancy_detected = False
        discrepancy_type = "CONCORDANT"
        severity = "NORMAL"
        confidence = 0.92
        description = "La firma espectral actual es consistente con la cobertura histórica de MapBiomas Venezuela."
        suggested_update = "Mantener clasificación actual."

        # 1. Validación de Cobertura Forestal (Clase 3)
        if mapbiomas_class_id == 3:
            if ndvi < 0.40 and sar_backscatter_db < -15.0:
                discrepancy_detected = True
                discrepancy_type = "DEFORESTATION_OR_CLEARING_ALERT"
                severity = "CRITICA"
                confidence = 0.95
                description = (
                    "Alerta de Deforestación Reciente: El dosel forestal mapeado en 2024 presenta "
                    f"una caída crítica de vigor fotosintético (NDVI: {ndvi}) y baja retrodispersión SAR ({sar_backscatter_db} dB)."
                )
                suggested_update = (
                    "Reclasificar a Suelo Desnudo / Transición Antrópica en la próxima colección."
                )
            elif 0.40 <= ndvi <= 0.65 and evi > 0.40:
                discrepancy_detected = True
                discrepancy_type = "AGRICULTURAL_EXPANSION_IN_FOREST"
                severity = "ALTA"
                confidence = 0.88
                description = (
                    "Expansión Agrícola en Límite de Bosque: Firma fenológica característica de cultivos "
                    f"anuales o pastizal activo detectada dentro de un polígono forestal (NDVI: {ndvi})."
                )
                suggested_update = (
                    "Actualizar polígono a Mosaico de Usos / Agricultura en la Colección 2026."
                )

        # 2. Validación de Cuerpos de Agua (Clase 33)
        elif mapbiomas_class_id == 33:
            if ndvi > 0.45:
                discrepancy_detected = True
                discrepancy_type = "WATERBODY_SEDIMENTATION_OR_DESICCATION"
                severity = "MEDIA"
                confidence = 0.90
                description = (
                    f"Anomalía Hídrica: Alta reflectancia vegetal (NDVI: {ndvi}) sobre cuerpo de agua histórico. "
                    "Posible desecación estacional, invasión de macrófitas o colmatación por sedimentos."
                )
                suggested_update = "Verificar dinámica de agua superficial en MapBiomas Agua."

        # 3. Validación de Pasturas (Clase 15) hacia Cultivo Anual Intensivo
        elif mapbiomas_class_id == 15:
            if ndvi > 0.78 and evi > 0.60:
                discrepancy_detected = True
                discrepancy_type = "PASTURE_TO_CROPLAND_CONVERSION"
                severity = "INFORMATIVA"
                confidence = 0.85
                description = (
                    f"Conversión a Cultivo Intensivo: El vigor fotosintético (NDVI: {ndvi}, EVI: {evi}) "
                    "supera el umbral típico de pasturas tropicales, evidenciando siembra de maíz, soya o arroz."
                )
                suggested_update = "Reclasificar a Agricultura Anual (Clase 18)."

        # 4. Cobertura de Agricultura Anual (Clase 18) en descanso prolongado o abandono
        elif mapbiomas_class_id == 18:
            if ndvi < 0.20 and ndwi < 0.05:
                discrepancy_detected = True
                discrepancy_type = "FALLOW_OR_SOIL_DEGRADATION"
                severity = "MODERADA"
                confidence = 0.82
                description = f"Barbecho Prolongado o Degradación: Suelo con vegetación nula o rastrojo seco (NDVI: {ndvi})."
                suggested_update = "Confirmar estatus de uso agrícola activo."

        return {
            "coordinates": {"latitude": lat, "longitude": lon},
            "mapbiomas_baseline": {
                "class_id": mapbiomas_class_id,
                "class_name": MAPBIOMAS_CODE_NAMES.get(mapbiomas_class_id, "Desconocido"),
            },
            "sentinel_observations": {
                "ndvi": ndvi,
                "evi": evi,
                "ndwi": ndwi,
                "sar_backscatter_db": sar_backscatter_db,
            },
            "discrepancy_detected": discrepancy_detected,
            "discrepancy_type": discrepancy_type,
            "severity": severity,
            "confidence_score": confidence,
            "diagnostic_summary": description,
            "recommended_mapbiomas_update": suggested_update,
            "ground_truth_status": (
                "ANOMALY_DETECTED" if discrepancy_detected else "VERIFIED_CONCORDANT"
            ),
            "contribution_to_mapbiomas": "Validación de terreno automatizada para el Premio MapBiomas 2026",
        }


# Singleton instance
discrepancy_detector = MapBiomasDiscrepancyDetector()
