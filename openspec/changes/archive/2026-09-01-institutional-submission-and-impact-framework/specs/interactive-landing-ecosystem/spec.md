## MODIFIED Requirements

### Requirement: Elevated Landing Page Hero & Regional Simulator
The root landing page SHALL render a hero section with mission statements, live statistics, and an interactive 4-region digital twin switcher (Turén, Sur del Lago, Andes, Amazonas).

#### Scenario: Switching Regional Demonstrations
- **WHEN** user selects a region tab (e.g. Sur del Lago or Andes)
- **THEN** the preview card dynamically updates coordinates, 40-year land cover history, soil pH, moisture persistence, and crop suitability.

#### Scenario: Navigating to Authentication and Quick Access
- **WHEN** user clicks on the Login / Sandbox button in the navbar or hero CTAs
- **THEN** the system navigates to `/auth/login` with access to the role switcher (Farmer, Agronomist, Admin, Guest).

## ADDED Requirements

### Requirement: Institutional Postulation & Impact Showcase on Landing
The landing page SHALL render a dedicated section featuring the project's institutional dossier link, TRL 7 verification, and SDG/ODS impact matrix.

#### Scenario: Accessing the Project Profile from Landing
- **WHEN** a reviewer or guest clicks "Ficha de Postulación & Dossier Técnico" on the landing page
- **THEN** the system navigates directly to `/dashboard/postulacion` allowing immediate inspection of technical and scientific credentials.
