## ADDED Requirements

### Requirement: Educational Sandbox Scope and Hardware-Agnostic Policy
The IoT Laboratory view (`/dashboard/iot`) SHALL clearly define itself as a decoupled educational simulation sandbox and an open BYOD (Bring Your Own Device) testing environment, explicitly stating that Agrotech Venezuela does not manufacture physical hardware and that no physical sensors are required to use the core satellite and agronomic intelligence platform.

#### Scenario: Viewing IoT Laboratory Scope
- **WHEN** user navigates to `/dashboard/iot`
- **THEN** the interface displays an informational banner clarifying that the laboratory is an isolated testbed for small-scale experiments (indoor/outdoor) and simulation, and that physical hardware is completely optional.

#### Scenario: Operating Platform Without Hardware
- **WHEN** a farmer or agronomic advisor operates the platform without any physical IoT sensor connected
- **THEN** all satellite radar (Sentinel-1), vegetation index (Sentinel-2), historical data (MapBiomas), and weather forecast (NASA POWER) calculations remain 100% operational with zero degradation.
