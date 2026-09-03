## ADDED Requirements

### Requirement: End-to-End FastAPI Telemetry Ingestion Bridge
The platform SHALL provide a dedicated Route Handler (`/api/iot/telemetry`) in Next.js 16 acting as a secure gateway to forward sensor payloads to the FastAPI backend (`/api/v1/iot/telemetry`), returning real-time actuator directives with graceful fallback to local simulation when the backend microservice is offline.

#### Scenario: Transmitting Telemetry to FastAPI Backend
- **WHEN** user or automated node submits a telemetry payload via `/api/iot/telemetry` while FastAPI is running
- **THEN** the request is forwarded to port 8000 and the server response includes the actuator status (`OPEN` or `CLOSED`), telemetry ID, and processed timestamp.

#### Scenario: Offline Fallback When Backend is Unreachable
- **WHEN** `/api/iot/telemetry` is invoked while the FastAPI service is unreachable
- **THEN** the route gracefully returns a calculated local telemetry decision with status `local_simulated: true` without failing or throwing unhandled 500 errors.
