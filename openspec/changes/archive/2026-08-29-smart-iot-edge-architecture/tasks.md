## 1. IoT Data Models & Device Registry

- [x] 1.1 Define Prisma and Python schemas for `IoTNode`, `IoTTelemetry`, and `IoTActuator` linked to User and Parcel
- [x] 1.2 Implement device registration and token validation middleware in `backend/src/iot_manager.py`

## 2. Ingestion Gateway & Predictive Irrigation

- [x] 2.1 Implement `/api/iot/telemetry` endpoint with telemetry validation and SQLite WAL persistence
- [x] 2.2 Implement predictive irrigation engine integrating in-situ soil moisture with NASA POWER precipitation forecasts

## 3. WebGIS Digital Twin & Dashboard UI

- [x] 3.1 Create WebGIS IoT overlay layer rendering georeferenced sensor nodes, moisture indicators, and valve controls
- [x] 3.2 Add IoT telemetry drawer and manual override switches in farm management dashboard

## 4. Testing & Verification

- [x] 4.1 Create unit and integration test suite (`backend/tests/test_iot_manager.py`) verifying token auth, telemetry ingestion, and rain-suppressed actuation
- [x] 4.2 Execute full frontend (`npm test`) and backend (`py -m pytest tests`) test suites to ensure 100% green status
