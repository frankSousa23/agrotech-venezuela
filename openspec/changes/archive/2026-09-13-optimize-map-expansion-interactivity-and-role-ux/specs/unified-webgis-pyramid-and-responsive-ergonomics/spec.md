## MODIFIED Requirements

### Requirement: Unified 3-Level Cartographic Hierarchy
The WebGIS viewer SHALL provide continuous navigation from the 24 Venezuelan state GeoJSON boundaries (Level 1) through municipal agricultural zones (Level 2) down to parcel-level drawing and satellite orthoimagery (Level 3) without requiring mode-switching tabs, ensuring elastic spatial bounds that eliminate viewport clipping and provide full container expansion.

#### Scenario: Navigating from National to Municipal Scope
- **WHEN** user clicks on an individual state polygon (e.g., Portuguesa) in Level 1
- **THEN** the map SHALL smoothly zoom to Level 2 (municipal view), display relevant municipality borders, and update the breadcrumb to indicate active hierarchy.

#### Scenario: Elastic Viewport Bounds Without Half-Cut Clipping
- **WHEN** the map initializes or the browser window is resized on wide screens or mobile displays
- **THEN** the Leaflet map instance SHALL apply cushioned boundary constraints (`maxBoundsViscosity: 0.55` over `[-1.0, -76.0]` to `[16.0, -57.0]`) and auto-expand to fill 100% of the available container height (`75vh`, min-height 680px) without freezing, clipping tiles, or showing half-cut deadzones.

### Requirement: Mobile Touch Ergonomics and Scroll-Trap Prevention
The map interface SHALL maintain safe vertical page scrolling on touch devices while enabling fluid panning and zooming within map controls, providing collapsible control panels and fullscreen expansion.

#### Scenario: Scrolling Past Map on Mobile
- **WHEN** a mobile user drags their finger along the outer map margins or uses single-finger vertical drag
- **THEN** the page SHALL scroll vertically without becoming trapped in map drag events.

#### Scenario: Collapsing Control Panel for Uninhibited Touch Drawing
- **WHEN** a mobile or desktop user clicks the collapse panel toggle (`[◀ Ocultar Panel]`)
- **THEN** the floating territorial control panel SHALL retract, leaving the satellite map canvas 100% unobstructed for polygon vertex placement.

## ADDED Requirements

### Requirement: Interactive Layer Fidelity and Dark Mode Basemaps
The WebGIS viewer SHALL provide authentic visual and raster feedback for all layer toggle buttons across all three hierarchical levels, rendering genuine CartoDB Dark Matter tiles for dark mode and dynamic edaphoclimatic overlays for Level 3 micro-parcels.

#### Scenario: Switching to Dark Mode Basemap
- **WHEN** user clicks the `btn_layer_dark` ("Modo Oscuro") button
- **THEN** the map tile provider SHALL switch to CartoDB Dark Matter tiles (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`) providing high-contrast nighttime cartography.

#### Scenario: Switching Thematic Layers on Level 3 Micro-Parcels
- **WHEN** user toggles between "Semáforo pH", "Lluvias NASA", or "MapBiomas 2024" while viewing a Level 3 parcel
- **THEN** the viewer SHALL display contextual edaphoclimatic badges and localized thematic halos reflecting the parcel's specific pH, rainfall, and land use history.

### Requirement: Cartographic Utilities (Fullscreen and GPS Geolocation)
The WebGIS toolbar SHALL provide direct 1-click tools for browser fullscreen expansion and user GPS geolocation to facilitate in-field agricultural operation.

#### Scenario: Triggering Fullscreen Mode
- **WHEN** an operator in tractor cabin or field inspection clicks the Fullscreen toggle (`[⛶ Pantalla Completa]`)
- **THEN** the map container SHALL expand to the full device viewport with `map.invalidateSize()` called immediately.

#### Scenario: Centering on Current In-Field Position
- **WHEN** a producer clicks the GPS location button (`[📍 Ubicar mi Finca]`)
- **THEN** the system SHALL query `navigator.geolocation.getCurrentPosition` and animate the camera with `flyTo` directly to the producer's latitude and longitude within Venezuelan territory.
