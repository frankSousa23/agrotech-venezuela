# Capability: Evaluator Project Profile

## Purpose
Provides a dedicated, interactive project profile and 5-minute evaluator tour route (`/dashboard/postulacion`) inside the application for institutional juries and reviewers.

## Requirements

### Requirement: Interactive Evaluator Tour Route
The system SHALL provide a dedicated route at `/dashboard/postulacion` presenting the project's technical architecture, TRL 4 status (functional software prototype validated in local development environment), live platform metrics with 233 passing automated tests (179 Jest + 54 Pytest), technical article format download, and a 5-step guided evaluation sequence, synchronized with sidebar navigation badges in `layout.tsx` and an integrated, connection-resilient API documentation portal at `/api-docs`.

#### Scenario: Navigating to Project Profile & Postulation View
- **WHEN** user or evaluator navigates to `/dashboard/postulacion`
- **THEN** the view renders the Executive Summary, TRL 4 verification badge, 233 automated test count badge, Categoría General indicator, Technical Article download link, interactive 5-minute evaluator tour steps, agronomic modeling cards, and direct links to live tools.

#### Scenario: Inspecting Dashboard Sidebar Navigation Badges
- **WHEN** user inspects the sidebar navigation menu across any `/dashboard/*` page
- **THEN** the "Ficha de Postulación" navigation item consistently displays a `TRL 4` badge matching the postulation dossier.

#### Scenario: Exploring OpenAPI Documentation Portal
- **WHEN** an evaluator or developer accesses `/api-docs`
- **THEN** the view provides access to both FastAPI endpoints and Next.js native API routes, offering friendly guidance if the Python backend is in standby.

#### Scenario: Following the 5-Minute Evaluator Tour
- **WHEN** the evaluator interacts with the 5 tour milestones
- **THEN** each step outlines the exact operational route (1. Guest Sandbox, 2. WebGIS Multiescala, 3. Asesor Gemini & Simulador, 4. Cuaderno de Campo, 5. APIs OpenAPI 3.0) with direct action buttons.
