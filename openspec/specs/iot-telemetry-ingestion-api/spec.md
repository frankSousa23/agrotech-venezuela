# Capability: IoT Telemetry Ingestion API

## Purpose

Provides a high-throughput, token-authenticated REST/MQTT telemetry ingestion gateway supporting real-time soil and atmospheric data streams.

## Requirements

### Requirement: Token-Authenticated Telemetry Ingestion
The IoT gateway SHALL authenticate incoming device requests using device tokens, validating payload schemas for moisture, temperature, pH, N-P-K, EC, and battery status.

#### Scenario: Ingesting Valid Soil Telemetry Packet
- **WHEN** an ESP32 node posts valid telemetry with a matching device token
- **THEN** the system stores the record in time-series history and responds with HTTP 200 containing any pending actuator command overrides.

#### Scenario: Rejecting Unauthorized or Malformed Telemetry
- **WHEN** a telemetry packet arrives with an invalid token or out-of-range sensor values
- **THEN** the gateway rejects the request with HTTP 401/422 and logs a security anomaly.
