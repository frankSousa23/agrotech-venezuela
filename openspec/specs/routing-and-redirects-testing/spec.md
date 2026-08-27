# routing-and-redirects-testing Specification

## Purpose

Tests Next.js routing configuration, friendly aliases, and OpenAPI documentation endpoint validation.

## Requirements

### Requirement: Redirect Resolution
The test suite SHALL verify that routing redirects defined in `next.config.ts` correctly point aliases (`/mapa`, `/mapas`, `/docs`, `/swagger`) to their canonical paths.

#### Scenario: Redirecting "/mapas"
- **WHEN** user or bot requests "/mapas"
- **THEN** response redirects to "/dashboard/mapa" with 307 Temporary Redirect.
