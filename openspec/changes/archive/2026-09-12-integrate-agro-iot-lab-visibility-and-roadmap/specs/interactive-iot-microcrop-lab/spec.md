## ADDED Requirements

### Requirement: Dashboard and Guided Intentions Navigation Linkage
The system SHALL provide prominent direct entry points to the IoT Laboratory (`/dashboard/iot`) from the primary Dashboard Overview header (`/dashboard`), the onboarding workflow guide, and the guided intentions assistant modal ("¿Qué necesitas hacer hoy?").

#### Scenario: Navigating to IoT Lab from Dashboard Header
- **WHEN** user views the primary Dashboard Overview header
- **THEN** a dedicated action button "🔬 Lab IoT (Pruebas)" is visible and clicking it navigates to `/dashboard/iot`.

#### Scenario: Selecting IoT Lab Intention in Guided Modal
- **WHEN** user opens the Intentions modal ("¿Qué necesitas hacer hoy?")
- **THEN** an intention item "Probar sensores y microrriego (Lab IoT)" is listed, and clicking it redirects to `/dashboard/iot`.

### Requirement: Phased Controlled Environment to Field Roadmap Articulation
The platform documentation and user interface SHALL explicitly frame the IoT Laboratory as a phased empirical research roadmap: Phase 1 as an affordable controlled-environment testbed (<$35 BYOD) for sensor calibration and predictive irrigation suppression, and Phase 2 as a long-term macro-territorial scaling vision coupled with WebGIS digital twins and satellite radar.

#### Scenario: Reading Controlled Environment Research Framing
- **WHEN** user or evaluator reviews the IoT laboratory banner or platform documentation
- **THEN** the text clearly distinguishes the immediate controlled-environment testbed scope from the future macro-scale deployment roadmap.
