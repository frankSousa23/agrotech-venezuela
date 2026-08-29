## Why

To bridge macro-scale satellite Earth observation (Sentinel-2, Sentinel-1 SAR Radar, NASA POWER, MapBiomas) with in-situ micro-scale precision agriculture, Agrotech Venezuela requires a comprehensive IoT and Edge Automation architecture. This enables registered producers to pair physical and simulated sensor nodes (ESP32 + RS485 NPK/Moisture probes) directly with their georeferenced parcels, ingest live soil telemetry, and automate irrigation pumps and valves using predictive agro-climatic intelligence.

## What Changes

- **User-Associated IoT Node & Actuator Registry**: Establishes data schemas and management workflows for registering ESP32 sensor nodes and electrovalve actuators linked to authenticated producer accounts (`FARMER` / `AGRONOMIST`) and their parcels.
- **High-Throughput IoT Telemetry Ingestion Gateway**: Implements a dedicated API layer in FastAPI (`/api/iot/telemetry`, `/api/iot/nodes`, `/api/iot/actuators`) supporting token-authenticated ESP32 device pings, SQLite WAL offline caching, and real-time streaming.
- **Predictive Irrigation Decision Engine**: Implements an agronomic water balance algorithm fusing in-situ volumetric soil moisture ($VWC\%$) with NASA POWER precipitation forecasts to avoid unnecessary pumping when rain is imminent.
- **WebGIS Digital Twin Overlay**: Integrates live IoT node pins, soil health badges (NPK, pH, Moisture), and valve toggle switches directly into the Leaflet multi-level map viewer and farm management dashboards.

## Capabilities

### New Capabilities
- `smart-iot-node-registry`: Device provisioning and parcel association for IoT sensor nodes and hydraulic actuators linked to registered users.
- `iot-telemetry-ingestion-api`: Token-authenticated API gateway for ingesting, validating, and streaming high-frequency soil and environmental telemetry.
- `predictive-irrigation-engine`: Agro-climatic water balance and automated actuation model combining real-time sensor metrics with satellite weather forecasts.
- `webgis-iot-digital-twin`: Interactive WebGIS geospatial overlay rendering live node status, moisture rings, and remote actuator controls.

### Modified Capabilities
- None.

## Impact

- **Database**: Extends schema with `IoTNode`, `IoTTelemetry`, and `IoTActuator` entities linked to `User` and `Parcel`.
- **Backend (FastAPI)**: Adds `backend/src/iot_manager.py` and router `/api/iot/`.
- **Frontend (WebGIS & Dashboard)**: Adds IoT overlay layer to `src/components/gis/MultiLevelMapViewer.tsx` and farm management cards in `src/app/dashboard/tierras/`.
- **Testing**: Adds comprehensive test suites for device authentication, telemetry validation, and predictive irrigation logic.
