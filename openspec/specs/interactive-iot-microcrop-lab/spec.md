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
