# Spec Delta: routing-and-redirects-testing

## MODIFIED Requirements

### Requirement: Redirect Resolution
The test suite SHALL verify that routing redirects defined in `next.config.ts` correctly point aliases (`/mapa`, `/mapas`, `/docs`, `/swagger`, `/dashboard/visor`, `/visor`, `/dashboard/costos`, `/costos`, `/registro`, `/login`, and root module shortcuts) to their canonical paths.

#### Scenario: Redirecting "/mapas"
- **WHEN** user or bot requests "/mapas"
- **THEN** response redirects to "/dashboard/mapa" with 307 Temporary Redirect.

#### Scenario: Redirecting legacy visor and costs paths
- **WHEN** user requests "/dashboard/visor" or "/dashboard/costos"
- **THEN** response redirects to "/dashboard/mapa" or "/dashboard/tierras" respectively.

#### Scenario: Redirecting legacy registration path
- **WHEN** user requests "/registro"
- **THEN** response redirects to "/auth/register".

## ADDED Requirements

### Requirement: Branded Custom 404 Experience
The system SHALL provide a branded `src/app/not-found.tsx` with AgroTech glassmorphism design, navigation recovery options, and a direct trigger for the global search palette.

#### Scenario: Visiting an undefined route
- **WHEN** a user navigates to a non-existent URL (e.g. `/ruta-inexistente`)
- **THEN** the system displays the branded 404 page with options to return to the Dashboard or launch search with `Ctrl+K`.
