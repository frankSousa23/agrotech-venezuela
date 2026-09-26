# Spec Delta: command-palette-and-quick-jump

## MODIFIED Requirements

### Requirement: Global Command Palette Interaction
The system SHALL provide a modal dialog accessible via `Ctrl+K` (or `Cmd+K`), an omnibar trigger button in the desktop utility bar, a dedicated mobile search trigger button in the mobile navigation bar, and an open event dispatcher. The modal overlay MUST be rendered using React Portal mounted directly to `document.body` to guarantee unconstrained viewport positioning and prevent occlusion by parent stacking contexts or backdrop filters.

#### Scenario: Searching for a State
- **WHEN** user presses `Ctrl+K` and types "Portuguesa"
- **THEN** the palette displays Portuguesa with its capital, rainfall, and pH, and clicking it redirects to the state map viewer.

#### Scenario: Searching for a Crop
- **WHEN** user types "Maiz"
- **THEN** the palette suggests "Maíz Blanco Harinero" and navigates to the crop agronomic specification.

#### Scenario: Opening Command Palette from Mobile Bar
- **WHEN** a user on a mobile viewport taps the search button in the mobile header
- **THEN** the command palette modal opens via event dispatching on top of all page content without clipping.

#### Scenario: Unobstructed Overlay Rendering Over Map Panes
- **WHEN** the command palette is opened while on `/dashboard/mapa` with active Leaflet layers and controls
- **THEN** the modal backdrop and dialog render strictly above all Leaflet map panes, control containers, and drawers.

## ADDED Requirements

### Requirement: Categorized Filtering and Expanded Agricultural Catalog
The system SHALL index all primary platform modules (including Manual, Postulación, Arquitectura, Swagger API Docs, Suelos), key Venezuelan agricultural poles (including Turén, Calabozo, Quíbor, Santa Bárbara del Zulia), and provide category filtering chips.

#### Scenario: Filtering by Agricultural Poles
- **WHEN** user clicks the "Estados & Polos" category pill or searches "Turen"
- **THEN** the palette filters the results to display Turén with regional hub details and direct link to the territorial map.

#### Scenario: Selecting Quick Actions
- **WHEN** user selects a quick action such as "Dictar en bitácora" or "Delimitar parcela"
- **THEN** the system navigates directly to the designated workflow target with pre-set action intents.
