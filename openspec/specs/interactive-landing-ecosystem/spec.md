# Capability: Interactive Landing Ecosystem

## Purpose

Presents an elevated, interactive landing page on the root route (`/`) showcasing the full-stack space-earth architecture, multi-region satellite demos, and role-based onboarding.

## Requirements

### Requirement: Elevated Landing Page Hero & Regional Simulator
The root landing page SHALL render a hero section with mission statements, live statistics, and an interactive 4-region digital twin switcher (Turén, Sur del Lago, Andes, Amazonas).

#### Scenario: Switching Regional Demonstrations
- **WHEN** user selects a region tab (e.g. Sur del Lago or Andes)
- **THEN** the preview card dynamically updates coordinates, 40-year land cover history, soil pH, moisture persistence, and crop suitability.

#### Scenario: Navigating to Authentication and Quick Access
- **WHEN** user clicks on the Login / Sandbox button in the navbar or hero CTAs
- **THEN** the system navigates to `/auth/login` with access to the role switcher (Farmer, Agronomist, Admin, Guest).

### Requirement: Institutional Postulation & Impact Showcase on Landing
The landing page SHALL render a dedicated section featuring the project's institutional dossier link, TRL 6 verification, and SDG/ODS impact matrix.

#### Scenario: Accessing the Project Profile from Landing
- **WHEN** a reviewer or guest clicks "Ficha de Postulación & Dossier Técnico" on the landing page
- **THEN** the system navigates directly to `/dashboard/postulacion` allowing immediate inspection of technical and scientific credentials.

### Requirement: Semantic Navigation Menus and Responsive Tablet Retention
The root landing page SHALL provide structured navigation organized into semantic dropdown categories (such as Field Modules, Science & Data, and Institutional Postulation TRL 6) and MUST maintain horizontal navigation links across viewports down to 880px before collapsing into the mobile navigation drawer.

#### Scenario: Interacting with Semantic Navigation Dropdowns on Desktop
- **WHEN** user hovers over or focuses a semantic menu trigger (e.g. "🌾 Módulos de Campo" or "🔬 Ciencia & Datos") on a viewport ≥ 880px
- **THEN** the dropdown menu opens with backdrop blur, displaying direct links to specialized submodules with icons and descriptions without clipping the hero content.

#### Scenario: Tablet Viewport Navigation Retention
- **WHEN** user accesses the landing page on a viewport between 880px and 1140px
- **THEN** the top navigation links and semantic dropdowns remain visible and interactable without prematurely collapsing into the mobile hamburger menu.

#### Scenario: Mobile Viewport Fallback
- **WHEN** user accesses the landing page on a viewport narrower than 880px
- **THEN** the top navigation bar collapses the links into the mobile hamburger drawer and displays a compact primary CTA.
