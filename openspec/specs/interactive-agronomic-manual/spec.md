# Capability: Interactive Agronomic Manual

## Purpose

Provides an integrated, searchable, and printable agronomic user manual and field guide directly within `/dashboard/manual`, delivering role-specific operating procedures, audio summaries, and offline-ready tractor cabin quick sheets.

## Requirements

### Requirement: Interactive Chapter-Based User Manual Route
The platform SHALL provide a dedicated, full-featured manual route at `/dashboard/manual` accessible from the main navigation sidebar, presenting comprehensive guides organized into modular chapters for all core system capabilities.

#### Scenario: Navigating to the User Manual
- **WHEN** any user clicks on "Manual & Guías" in the navigation sidebar or visits `/dashboard/manual`
- **THEN** the system renders the interactive manual viewer displaying the chapter directory, search bar, role filter badges, and content viewport.

#### Scenario: Reading Field Operations Chapter
- **WHEN** a user selects the "Operaciones de Campo & Modo Productor" chapter
- **THEN** the system displays step-by-step instructions for parcel registration, vernacular voice dictation, offline syncing, and reading moisture indicators without technical jargon.

### Requirement: Role-Adaptive Content Filtering and Real-Time Search
The manual interface SHALL allow users to filter procedures by target persona (`FARMER`, `AGRONOMIST`, `ADMIN`, `GUEST`) and perform instant client-side keyword searches across all chapter titles, descriptions, and operational steps.

#### Scenario: Filtering for Farmer Role
- **WHEN** user selects the "🌾 Productor" filter tab
- **THEN** the chapter index immediately highlights farmer-specific workflows (4 Puertas, glosario de sacos/tablones, notas de voz) while deemphasizing complex GIS APIs.

#### Scenario: Filtering for Agronomist / Tech Role
- **WHEN** user selects the "🛰️ Agrónomo / Técnico" filter tab
- **THEN** the manual highlights Sentinel-1 SAR cloud penetration, Kamprath soil amendment models, VRA export formats for GPS tractors, and carbon MRV workflows.

#### Scenario: Real-Time Keyword Search
- **WHEN** user types "radar" or "kamprath" into the manual search input
- **THEN** the view instantly filters the visible chapters and sections to only those matching the search query, highlighting matching text.

### Requirement: Printable Tractor Cabin Reference Sheet
The manual SHALL provide an exportable and printable single-page "Ficha de Cabina para Tractor" that formats essential field operations, key vernacular unit conversions (1 saco = 50 kg, 1 tambor = 200 L, 1 caneca = 20 L, 1 tablón = 1.0 ha), and offline emergency guidelines into a high-contrast, printer-friendly layout.

#### Scenario: Triggering Cabin Sheet Print Preview
- **WHEN** user clicks "Imprimir Ficha de Cabina" in the manual header
- **THEN** the system opens the browser print dialog with CSS media print styling configured for standard paper sizes (Letter/A4), hiding sidebar navigation and chrome.
