## Purpose

Provides a dedicated interactive API documentation page at `/api-docs` that allows developers and researchers to inspect and test all FastAPI endpoints.

## ADDED Requirements

### Requirement: Interactive OpenAPI Documentation Page
The system SHALL serve an `/api-docs` route inside Next.js App Router providing full interactive documentation of the backend endpoints.

#### Scenario: Navigating to API Docs
- **WHEN** user clicks "API OpenAPI / Swagger" in the sidebar navigation
- **THEN** the `/api-docs` page renders with an interactive Swagger UI explorer without 404 errors.
