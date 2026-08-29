# Capability: Smart IoT Node Registry

## Purpose

Manages the lifecycle, security credentials, and parcel associations of physical and virtual IoT hardware nodes and actuators for authenticated users.

## Requirements

### Requirement: IoT Device Provisioning and Parcel Association
The system SHALL allow authenticated producers to register IoT sensor nodes (SOIL_NPK_NODE, WEATHER_STATION) and actuators (VALVE_ACTUATOR) with unique hardware identifiers, GPS coordinates, and token secrets.

#### Scenario: Registering a 7-in-1 Soil Node
- **WHEN** user submits a new node with hardware UID, token, and parcel ID
- **THEN** the system creates the IoTNode record linked to the user's parcel and issues device authentication headers.

#### Scenario: Node Health and Heartbeat Status
- **WHEN** a node does not send telemetry for over 60 minutes
- **THEN** the system marks its connection status as OFFLINE and flags a maintenance warning.
