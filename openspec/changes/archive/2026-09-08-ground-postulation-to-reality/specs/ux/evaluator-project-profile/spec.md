## MODIFIED Requirements

### Requirement: Interactive Evaluator Tour Route
The system SHALL provide a dedicated route at `/dashboard/postulacion` presenting the project's technical architecture, TRL 4 status (functional software prototype validated in local development environment), live platform metrics with 233 passing automated tests (179 Jest + 54 Pytest), technical article format download, and a 5-step guided evaluation sequence.

#### Scenario: Navigating to Project Profile & Postulation View
- **WHEN** user or evaluator navigates to `/dashboard/postulacion`
- **THEN** the view renders the Executive Summary, TRL 4 verification badge, 233 automated test count badge, Categoría General indicator, Technical Article download link, interactive 5-minute evaluator tour steps, agronomic modeling cards, and direct links to live tools.

#### Scenario: Following the 5-Minute Evaluator Tour
- **WHEN** the evaluator interacts with the 5 tour milestones
- **THEN** each step outlines the exact operational route (1. Guest Sandbox, 2. WebGIS Multiescala, 3. Asesor Gemini & Simulador, 4. Cuaderno de Campo, 5. APIs OpenAPI 3.0) with direct action buttons.
