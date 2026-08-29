## Context

Agrotech Venezuela features microservices for multi-level WebGIS cartography, satellite SAR radar penetration, and edaphic liming prescriptions. To close the loop between satellite telemetry and field-level execution, this architecture incorporates an IoT Edge layer connecting ESP32 microcontrollers, RS485 soil probes (NPK, Moisture, EC, pH), and automated electrovalves directly to registered user accounts and their farm parcels.

## Goals / Non-Goals

**Goals:**
- Define relational schema extensions (`IoTNode`, `IoTTelemetry`, `IoTActuator`) linked to authenticated producers and parcels.
- Implement token-authenticated FastAPI ingestion endpoints (`/api/iot/telemetry`, `/api/iot/nodes`, `/api/iot/actuators`) with high-throughput SQLite WAL caching.
- Build an agro-climatic predictive irrigation model that suppresses pumping when NASA POWER predicts imminent rainfall ($P \ge 5.0\text{ mm}$ within 6 hours).
- Integrate an interactive WebGIS digital twin overlay displaying node statuses, moisture rings, and manual/automatic valve toggle switches.

**Non-Goals:**
- Custom LoRaWAN gateway protocol development (standard HTTP/MQTT bridges are utilized).
- Physical PCB fabrication (firmware targets standard ESP32 boards).

## Decisions

### 1. Device Authentication & Security
- **Decision**: Authenticate device pings via `X-Device-Token` headers mapped to `IoTNode.apiSecretKey`.
- **Rationale**: Minimal computational and payload overhead suitable for battery-powered ESP32 nodes in deep sleep.

### 2. Dual Real/Simulated Ingestion Pipeline
- **Decision**: Provide both live hardware endpoints and a realistic IoT simulator in `backend/src/iot_manager.py`.
- **Rationale**: Allows immediate user onboarding, testing, and UI evaluation without requiring immediate physical hardware deployment.

### 3. Predictive Rain-Aware Actuation Engine
- **Decision**: Couple in-situ soil moisture depletion ($VWC\%$) with NASA POWER hourly precipitation forecasts before dispatching valve OPEN commands.
- **Rationale**: Eliminates irrigation wastage, reduces diesel/electricity costs, and prevents root hypoxia from over-saturation.

## Risks / Trade-offs

- **[Risk: Rural connectivity drops]** → **Mitigation**: ESP32 stores offline buffer in flash memory; server flags nodes as `OFFLINE` after 60 minutes of inactivity.
- **[Risk: Actuator power failure]** → **Mitigation**: Fail-safe normally closed (NC) solenoid valves and timeout auto-shutoff pulses.
