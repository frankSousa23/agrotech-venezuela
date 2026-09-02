# interactive-api-docs-explorer Specification

## Purpose

Provides a dedicated interactive API documentation page at `/api-docs` that allows developers and researchers to inspect and test all FastAPI endpoints.

## Requirements

### Requirement: Interactive OpenAPI Documentation Page
The system SHALL serve an `/api-docs` route inside Next.js App Router providing full interactive documentation of the backend endpoints.

#### Scenario: Navigating to API Docs
- **WHEN** user clicks "API OpenAPI / Swagger" in the sidebar navigation
- **THEN** the `/api-docs` page renders with an interactive Swagger UI explorer without 404 errors.

### Requirement: Direct Return Navigation to Dashboard from API Docs
The `/api-docs` page header SHALL display a high-visibility return button (`Volver al Dashboard`) that allows developers and agronomists to exit the technical documentation and return to the main dashboard.

#### Scenario: Returning to Dashboard from API Docs
- **WHEN** user clicks the "Volver al Dashboard" button in `/api-docs`
- **THEN** the system navigates directly to `/dashboard` restoring sidebar navigation.
