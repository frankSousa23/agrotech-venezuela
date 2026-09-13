## Purpose

Provides an autonomous and self-contained laboratory sandbox for IoT micro-crop testing, featuring dynamic fluid animation, a 24-hour moisture historiador, and 1-click climate stress simulations.

## Requirements

### Requirement: Microcrop Cross-Section Dynamic Fluid Simulation
The system SHALL animate irrigation waterflow through the micro-drip tubing and simulate root water absorption in the cross-section SVG when the irrigation solenoid valve is opened.

#### Scenario: Visualizing Active Irrigation Pulse
- **WHEN** user or automatic threshold triggers the solenoid valve to OPEN
- **THEN** the interface SHALL render pulsating water droplets along the emitter line, expand the root hydration zone in real time, and increment the simulated volumetric flow meter.

### Requirement: 24-Hour Telemetry Time-Series Historiador
The system SHALL display an interactive 24-hour simulated time-series chart showing volumetric water content (VWC %), critical wilting point threshold, and automated irrigation events.

#### Scenario: Inspecting Diurnal Moisture Oscillation
- **WHEN** user selects the Telemetry tab in the IoT Lab
- **THEN** the interface SHALL render a continuous 24-hour curve highlighting daytime transpirational decline, automated irrigation replenishment, and rain-induced suppression events.

### Requirement: 1-Click Climatic and Sensor Stress Testing
The system SHALL provide immediate simulation triggers for extreme heatwaves, heavy rainfall suppression, and open-circuit sensor disconnections.

#### Scenario: Simulating Heavy Rain Suppression
- **WHEN** user activates the "Simular Tormenta NASA POWER" trigger
- **THEN** the system SHALL immediately close the irrigation valve, log rainfall accumulation, and increment water and energy savings counters.
