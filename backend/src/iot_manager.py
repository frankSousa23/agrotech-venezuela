"""
IoT Edge & Predictive Irrigation Manager - Agrotech Venezuela
Centraliza la ingesta de telemetría de nodos de suelo (ESP32 / LoRaWAN / RS485 NPK),
gestión de actuadores hidráulicos y algoritmo de riego predictivo acoplado a NASA POWER.
"""

from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from pydantic import BaseModel, Field
import logging
import uuid

logger = logging.getLogger(__name__)

# Modelos Pydantic para Validación de Telemetría y Comandos IoT
class IoTNodeRegister(BaseModel):
    parcel_id: str
    node_name: str
    node_type: str = "SOIL_NPK_NODE"  # SOIL_NPK_NODE, WEATHER_STATION, VALVE_ACTUATOR
    hardware_uid: str
    lat: float
    lng: float
    api_secret_key: Optional[str] = None

class TelemetryPayload(BaseModel):
    hardware_uid: str
    soil_moisture_pct: float = Field(..., ge=0.0, le=100.0)
    soil_temp_c: float = Field(..., ge=-10.0, le=60.0)
    ph: Optional[float] = Field(None, ge=3.0, le=11.0)
    nitrogen_mg_kg: Optional[float] = Field(None, ge=0.0, le=500.0)
    phosphorus_mg_kg: Optional[float] = Field(None, ge=0.0, le=500.0)
    potassium_mg_kg: Optional[float] = Field(None, ge=0.0, le=1000.0)
    ec_us_cm: Optional[float] = Field(None, ge=0.0, le=10000.0)
    battery_voltage: float = Field(..., ge=2.5, le=5.5)
    solar_voltage: Optional[float] = None
    raw_rssi: Optional[int] = None

class ActuatorCommand(BaseModel):
    actuator_id: str
    target_state: str  # "ON", "OFF", "AUTO"
    duration_minutes: Optional[int] = 30
    reason: Optional[str] = "Manual override"

class IoTManager:
    """Motor de gestión de dispositivos, telemetría y decisiones de riego predictivo."""

    def __init__(self):
        # Almacén en memoria de nodos y telemetría demostrativa
        self.nodes_db: Dict[str, Dict[str, Any]] = {}
        self.telemetry_history: List[Dict[str, Any]] = []
        self.actuators_db: Dict[str, Dict[str, Any]] = {}
        self._seed_demo_nodes()

    def _seed_demo_nodes(self):
        """Inicializa nodos de prueba para los 4 vértices del tablón de prueba en Portuguesa."""
        demo_nodes = [
            {
                "id": "node-turen-01",
                "parcel_id": "pcl-portuguesa-01",
                "node_name": "Nodo Vértice NE - Tablón Maíz A1",
                "node_type": "SOIL_NPK_NODE",
                "hardware_uid": "ESP32-94:B9:7E:11:01",
                "api_secret_key": "sec_iot_node_turen_001",
                "lat": 9.328,
                "lng": -69.108,
                "battery_level": 94,
                "solar_voltage": 5.12,
                "is_online": True,
                "last_ping_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "node-turen-02",
                "parcel_id": "pcl-portuguesa-01",
                "node_name": "Nodo Vértice SE - Tablón Maíz A2",
                "node_type": "SOIL_NPK_NODE",
                "hardware_uid": "ESP32-94:B9:7E:11:02",
                "api_secret_key": "sec_iot_node_turen_002",
                "lat": 9.321,
                "lng": -69.107,
                "battery_level": 88,
                "solar_voltage": 4.95,
                "is_online": True,
                "last_ping_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "node-turen-valve-01",
                "parcel_id": "pcl-portuguesa-01",
                "node_name": "Actuador Electroválvula Riego Principal",
                "node_type": "VALVE_ACTUATOR",
                "hardware_uid": "ESP32-VALVE-01",
                "api_secret_key": "sec_iot_valve_turen_001",
                "lat": 9.324,
                "lng": -69.112,
                "battery_level": 100,
                "solar_voltage": 12.4,
                "is_online": True,
                "last_ping_at": datetime.now(timezone.utc).isoformat()
            }
        ]

        for n in demo_nodes:
            self.nodes_db[n["hardware_uid"]] = n

        # Actuador vinculado
        self.actuators_db["act-turen-01"] = {
            "id": "act-turen-01",
            "node_id": "node-turen-valve-01",
            "parcel_id": "pcl-portuguesa-01",
            "name": "Electroválvula Goteo Sector A",
            "state": "OFF",
            "is_auto_mode": True,
            "flow_rate_lpm": 30.0,
            "total_water_m3": 142.5,
            "last_activated_at": None
        }

    def register_node(self, payload: IoTNodeRegister) -> Dict[str, Any]:
        """Registra un nuevo dispositivo en el sistema."""
        node_id = f"node-{uuid.uuid4().hex[:8]}"
        secret = payload.api_secret_key or f"sec_{uuid.uuid4().hex[:16]}"
        
        node_record = {
            "id": node_id,
            "parcel_id": payload.parcel_id,
            "node_name": payload.node_name,
            "node_type": payload.node_type,
            "hardware_uid": payload.hardware_uid,
            "api_secret_key": secret,
            "lat": payload.lat,
            "lng": payload.lng,
            "battery_level": 100,
            "solar_voltage": 5.0,
            "is_online": True,
            "last_ping_at": datetime.now(timezone.utc).isoformat()
        }
        
        self.nodes_db[payload.hardware_uid] = node_record
        return node_record

    def validate_device_token(self, hardware_uid: str, token: str) -> bool:
        """Valida que el token coincida con el nodo registrado."""
        node = self.nodes_db.get(hardware_uid)
        if not node:
            return False
        return node.get("api_secret_key") == token

    def process_telemetry(
        self,
        payload: TelemetryPayload,
        token: str,
        forecast_rain_6h_mm: float = 0.0
    ) -> Dict[str, Any]:
        """
        Procesa la telemetría del nodo, actualiza su estado y calcula la orden de riego.
        """
        if not self.validate_device_token(payload.hardware_uid, token):
            raise ValueError("Token de autenticación de dispositivo inválido.")

        node = self.nodes_db[payload.hardware_uid]
        now_str = datetime.now(timezone.utc).isoformat()
        
        # Actualizar estado de vida del nodo
        battery_pct = int(min(100, max(0, (payload.battery_voltage - 3.2) / (4.2 - 3.2) * 100)))
        node["battery_level"] = battery_pct
        node["solar_voltage"] = payload.solar_voltage
        node["last_ping_at"] = now_str
        node["is_online"] = True

        # Almacenar registro de telemetría
        telemetry_entry = {
            "id": f"tel-{uuid.uuid4().hex[:8]}",
            "node_id": node["id"],
            "hardware_uid": payload.hardware_uid,
            "parcel_id": node["parcel_id"],
            "soil_moisture_pct": payload.soil_moisture_pct,
            "soil_temp_c": payload.soil_temp_c,
            "ph": payload.ph,
            "nitrogen_mg_kg": payload.nitrogen_mg_kg,
            "phosphorus_mg_kg": payload.phosphorus_mg_kg,
            "potassium_mg_kg": payload.potassium_mg_kg,
            "ec_us_cm": payload.ec_us_cm,
            "raw_rssi": payload.raw_rssi,
            "recorded_at": now_str
        }
        self.telemetry_history.append(telemetry_entry)

        # Evaluar decisión de riego predictivo
        decision = self.evaluate_predictive_irrigation(
            moisture_pct=payload.soil_moisture_pct,
            forecast_rain_6h_mm=forecast_rain_6h_mm
        )

        return {
            "status": "success",
            "node_id": node["id"],
            "recorded_at": now_str,
            "soil_health_status": self._classify_soil_status(payload.soil_moisture_pct, payload.ph),
            "predictive_irrigation": decision
        }

    def evaluate_predictive_irrigation(
        self,
        moisture_pct: float,
        forecast_rain_6h_mm: float,
        critical_threshold: float = 30.0
    ) -> Dict[str, Any]:
        """
        Algoritmo híbrido de riego:
        - Si humedad < 30% pero lluvia inminente >= 5mm -> Suprime riego (Ahorro energético).
        - Si humedad < 30% y no llueve -> Activa pulso de riego.
        - Si humedad >= 30% -> Suelo en rango óptimo.
        """
        is_deficient = moisture_pct < critical_threshold
        rain_imminent = forecast_rain_6h_mm >= 5.0

        if is_deficient:
            if rain_imminent:
                return {
                    "action": "SUPPRESS_IRRIGATION",
                    "reason": f"Déficit detectado ({moisture_pct}%), pero NASA POWER pronostica {forecast_rain_6h_mm} mm de lluvia en las próximas 6h. Ahorro de combustible/agua activado.",
                    "valve_command": "CLOSED",
                    "pulse_duration_minutes": 0,
                    "energy_saved": True
                }
            else:
                return {
                    "action": "ACTIVATE_IRRIGATION",
                    "reason": f"Humedad crítica ({moisture_pct}%) sin lluvia pronosticada ({forecast_rain_6h_mm} mm). Pulso de compensación hídrica requerido.",
                    "valve_command": "OPEN",
                    "pulse_duration_minutes": 35,
                    "energy_saved": False
                }
        else:
            return {
                "action": "STANDBY",
                "reason": f"Humedad edáfica en rango óptimo ({moisture_pct}%).",
                "valve_command": "CLOSED",
                "pulse_duration_minutes": 0,
                "energy_saved": True
            }

    def _classify_soil_status(self, moisture_pct: float, ph: Optional[float]) -> str:
        if moisture_pct < 25.0:
            return "ESTRES_HIDRICO_SEVERO"
        elif moisture_pct < 40.0:
            return "HUMEDAD_MODERADA"
        elif moisture_pct > 80.0:
            return "RIESGO_ANXIA_RADICULAR"
        return "OPTIMO"

    def list_nodes_by_parcel(self, parcel_id: str) -> List[Dict[str, Any]]:
        """Retorna todos los nodos asociados a una parcela con su última lectura."""
        nodes = [n for n in self.nodes_db.values() if n["parcel_id"] == parcel_id]
        result = []
        for n in nodes:
            # Obtener última telemetría
            last_tel = next((t for t in reversed(self.telemetry_history) if t["node_id"] == n["id"]), None)
            result.append({
                **n,
                "latest_telemetry": last_tel
            })
        return result

    def set_actuator_state(self, actuator_id: str, command: ActuatorCommand) -> Dict[str, Any]:
        """Ejecuta un comando manual o automático sobre un actuador."""
        actuator = self.actuators_db.get(actuator_id)
        if not actuator:
            raise KeyError(f"Actuador {actuator_id} no encontrado.")

        actuator["state"] = command.target_state
        actuator["last_activated_at"] = datetime.now(timezone.utc).isoformat()
        return {
            "status": "command_acknowledged",
            "actuator": actuator,
            "command": command.model_dump()
        }

# Instancia singleton del gestor IoT
iot_manager = IoTManager()
