## MODIFIED Requirements

### Requirement: Role-Adaptive Cartographic and UI Ergonomics
The platform interface and WebGIS viewers SHALL adapt their display density, vocabulary, and interactive tool availability dynamically based on the active user role (`FARMER`, `AGRONOMIST`/`TECH`, `AUDITOR`/`JURY`, `ADMIN`, `GUEST`), maintaining consistent role-adapted capabilities across both the primary WebGIS explorer (`/dashboard/mapa`) and embedded dashboard viewers.

#### Scenario: Farmer Role Experience
- **WHEN** user is logged in with `FARMER` role or operates in *Modo Productor Fácil*
- **THEN** the map and parcel controls SHALL prioritize large touch targets (minimum 44px), 1-click automatic preset boundaries ("Tablón Auto"), vernacular terminology (sacos, tablones), and direct voice-assistance handoff.

#### Scenario: Agronomist / Technical Role Experience
- **WHEN** user is logged in with `AGRONOMIST` or `TECH` role
- **THEN** the map SHALL expose advanced telemetry tools, Sentinel-1 SAR dual-polarization cross-validation layers, Kamprath soil chemistry dosers, and ESRI Shapefile/KML precision machinery export dialogs.

#### Scenario: Auditor / Jury Role Experience
- **WHEN** an evaluator or juror audits the platform
- **THEN** the interface SHALL provide direct links to the certified 252-test matrix, TRL 4 software prototype dossier, OpenAPI Swagger explorer, and MapBiomas CC BY 4.0 data compliance certifications.

#### Scenario: Role Parity Across Map Viewers
- **WHEN** a user switches role (e.g. from FARMER to TECH) while inspecting any map view
- **THEN** all map controls, layer toolbars, and contextual diagnostic badges SHALL update reactively to match the active role's operational scope without page reloads.
