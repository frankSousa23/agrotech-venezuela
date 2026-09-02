# Capability: Evaluator Project Profile

## Purpose
Provides a dedicated, interactive project profile and 5-minute evaluator tour route (`/dashboard/postulacion`) inside the application for institutional juries and reviewers.

## Requirements

### Requirement: Interactive Evaluator Tour Route
The system SHALL provide a dedicated route at `/dashboard/postulacion` presenting the project's technical architecture, TRL 7 status, live platform metrics, and a 5-step guided evaluation sequence.

#### Scenario: Navigating to Project Profile & Postulation View
- **WHEN** user or evaluator navigates to `/dashboard/postulacion`
- **THEN** the view renders the Executive Summary, TRL 7 verification badge, interactive 5-minute evaluator tour steps, scientific algorithm cards, and direct links to live tools.

#### Scenario: Following the 5-Minute Evaluator Tour
- **WHEN** the evaluator interacts with the 5 tour milestones
- **THEN** each step outlines the exact operational route (1. Guest Sandbox, 2. WebGIS Multiescala, 3. Asesor Gemini & Simulador, 4. Cuaderno de Campo, 5. APIs OpenAPI 3.0) with direct action buttons.
