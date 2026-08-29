import pytest
from src.iot_manager import IoTManager, IoTNodeRegister, TelemetryPayload, ActuatorCommand

def test_iot_node_registration_and_token_validation():
    """Valida el registro de nodos ESP32 y la validación estricta de tokens de seguridad."""
    manager = IoTManager()
    
    # Registro de nuevo nodo de prueba en Guárico
    new_node = manager.register_node(IoTNodeRegister(
        parcel_id="pcl-guarico-01",
        node_name="Nodo Arroz Calabozo V1",
        node_type="SOIL_NPK_NODE",
        hardware_uid="ESP32-CALABOZO-01",
        lat=8.924,
        lng=-67.428,
        api_secret_key="secret_calabozo_token"
    ))
    
    assert new_node["id"].startswith("node-")
    assert new_node["is_online"] is True
    assert manager.validate_device_token("ESP32-CALABOZO-01", "secret_calabozo_token") is True
    assert manager.validate_device_token("ESP32-CALABOZO-01", "wrong_token") is False

def test_iot_telemetry_processing_and_predictive_irrigation():
    """Valida la ingesta de telemetría de suelo y la decisión de riego."""
    manager = IoTManager()
    
    # Simulación de nodo demo Portuguesa (Humedad normal: 45%)
    payload = TelemetryPayload(
        hardware_uid="ESP32-94:B9:7E:11:01",
        soil_moisture_pct=45.0,
        soil_temp_c=26.5,
        ph=6.4,
        nitrogen_mg_kg=40.0,
        phosphorus_mg_kg=22.0,
        potassium_mg_kg=130.0,
        ec_us_cm=1100.0,
        battery_voltage=4.15,
        solar_voltage=5.2
    )
    
    result = manager.process_telemetry(payload, token="sec_iot_node_turen_001")
    assert result["status"] == "success"
    assert result["soil_health_status"] == "OPTIMO"
    assert result["predictive_irrigation"]["action"] == "STANDBY"
    assert result["predictive_irrigation"]["valve_command"] == "CLOSED"

def test_predictive_irrigation_rain_suppression():
    """Valida la supresión de riego cuando la lluvia pronosticada de NASA POWER supera los 5mm."""
    manager = IoTManager()
    
    # 1. Caso: Humedad crítica (<30%) pero lluvia inminente (10mm) -> Suprime bombeo
    decision_suppressed = manager.evaluate_predictive_irrigation(
        moisture_pct=22.0,
        forecast_rain_6h_mm=10.0
    )
    assert decision_suppressed["action"] == "SUPPRESS_IRRIGATION"
    assert decision_suppressed["valve_command"] == "CLOSED"
    assert decision_suppressed["energy_saved"] is True
    assert "NASA POWER pronostica" in decision_suppressed["reason"]

    # 2. Caso: Humedad crítica (<30%) y sin lluvia (0mm) -> Activa riego
    decision_activated = manager.evaluate_predictive_irrigation(
        moisture_pct=22.0,
        forecast_rain_6h_mm=0.0
    )
    assert decision_activated["action"] == "ACTIVATE_IRRIGATION"
    assert decision_activated["valve_command"] == "OPEN"
    assert decision_activated["pulse_duration_minutes"] > 0
    assert decision_activated["energy_saved"] is False

def test_actuator_state_override():
    """Valida el control manual y automático de actuadores y electroválvulas."""
    manager = IoTManager()
    
    cmd = ActuatorCommand(
        actuator_id="act-turen-01",
        target_state="ON",
        duration_minutes=45,
        reason="Test manual override"
    )
    res = manager.set_actuator_state("act-turen-01", cmd)
    assert res["status"] == "command_acknowledged"
    assert res["actuator"]["state"] == "ON"
