# interactive-iot-microcrop-lab Specification

## Purpose

Provides an interactive sandbox and educational micro-crop laboratory to learn, simulate, and calibrate IoT sensor nodes, predictive drip irrigation logic, and edge-hardware integration.

## Requirements

### Requirement: Interactive Micro-Crop Cross-Section Simulation
The system SHALL provide a dedicated view (`/dashboard/iot`) featuring an animated SVG cross-section of a micro-crop showing live soil moisture layers, root hydration dynamics, and visual drip irrigation droplets when the actuator valve is triggered.

#### Scenario: Observing Micro-Drip Activation
- **WHEN** user or automatic logic activates irrigation
- **THEN** animated water droplets descend from the drip line and the root zone transitions from dry brown to hydrated blue-green.

### Requirement: NASA POWER Predictive Irrigation Suppression
The laboratory SHALL simulate real-time coordination between in-situ soil moisture and satellite precipitation forecasts, automatically suppressing irrigation pulses when forecast rainfall exceeds 5 mm within 6 hours.

#### Scenario: Suppressing Irrigation on Imminent Rainfall
- **WHEN** soil moisture is below critical threshold (< 30%) and user toggles rainfall alert (>= 5 mm)
- **THEN** the system keeps the solenoid valve closed and displays cumulative water (L) and energy (kWh) savings.

### Requirement: Hardware Assembly and Calibration Guides
The view SHALL present interactive hardware wiring diagrams, an Arduino C++ firmware snippet for ESP32 DevKit v1 with copy-to-clipboard functionality, and a calibration tool converting raw ADC values into volumetric soil water content (% VWC).

#### Scenario: Accessing ESP32 Firmware Snippet
- **WHEN** user clicks "Ver Código Firmware ESP32"
- **THEN** a syntax-highlighted code viewer displays the complete, production-ready Arduino sketch with device authentication headers.

### Requirement: End-to-End FastAPI Telemetry Ingestion Bridge
The platform SHALL provide a dedicated Route Handler (`/api/iot/telemetry`) in Next.js 16 acting as a secure gateway to forward sensor payloads to the FastAPI backend (`/api/v1/iot/telemetry`), returning real-time actuator directives with graceful fallback to local simulation when the backend microservice is offline.

#### Scenario: Transmitting Telemetry to FastAPI Backend
- **WHEN** user or automated node submits a telemetry payload via `/api/iot/telemetry` while FastAPI is running
- **THEN** the request is forwarded to port 8000 and the server response includes the actuator status (`OPEN` or `CLOSED`), telemetry ID, and processed timestamp.

#### Scenario: Offline Fallback When Backend is Unreachable
- **WHEN** `/api/iot/telemetry` is invoked while the FastAPI service is unreachable
- **THEN** the route gracefully returns a calculated local telemetry decision with status `local_simulated: true` without failing or throwing unhandled 500 errors.

### Requirement: Educational Sandbox Scope and Hardware-Agnostic Policy
The IoT Laboratory view (`/dashboard/iot`) SHALL clearly define itself as a decoupled educational simulation sandbox and an open BYOD (Bring Your Own Device) testing environment, explicitly stating that Agrotech Venezuela does not manufacture physical hardware and that no physical sensors are required to use the core satellite and agronomic intelligence platform.

#### Scenario: Viewing IoT Laboratory Scope
- **WHEN** user navigates to `/dashboard/iot`
- **THEN** the interface displays an informational banner clarifying that the laboratory is an isolated testbed for small-scale experiments (indoor/outdoor) and simulation, and that physical hardware is completely optional.

#### Scenario: Operating Platform Without Hardware
- **WHEN** a farmer or agronomic advisor operates the platform without any physical IoT sensor connected
- **THEN** all satellite radar (Sentinel-1), vegetation index (Sentinel-2), historical data (MapBiomas), and weather forecast (NASA POWER) calculations remain 100% operational with zero degradation.

