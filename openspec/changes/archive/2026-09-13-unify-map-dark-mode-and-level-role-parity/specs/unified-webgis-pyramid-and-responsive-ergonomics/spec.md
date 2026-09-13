## MODIFIED Requirements

### Requirement: Interactive Layer Fidelity and Dark Mode Basemaps
The WebGIS viewer SHALL provide authentic visual and raster feedback for all layer toggle buttons across all three hierarchical levels, rendering watermark-free Esri World Dark Gray Canvas HD tiles without requiring API keys for dark mode, and dynamic edaphoclimatic overlays for Level 3 micro-parcels.

#### Scenario: Switching to Dark Mode Basemap
- **WHEN** user clicks the `btn_layer_dark` ("Modo Oscuro") button
- **THEN** the map tile provider SHALL switch to Esri World Dark Gray Canvas HD tiles (`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`) without requesting any API key or rendering watermark text.

#### Scenario: Switching Thematic Layers on Level 3 Micro-Parcels
- **WHEN** user toggles between "Semáforo pH", "Lluvias NASA", or "MapBiomas 2024" while viewing a Level 3 parcel
- **THEN** the viewer SHALL display contextual edaphoclimatic badges and localized thematic halos reflecting the parcel's specific pH, rainfall, and land use history.

## ADDED Requirements

### Requirement: Cross-Viewer Basemap and Hierarchy Parity
All map viewers in the platform, including the dashboard overview viewer (`MapBiomasViewer`) and the state explorer (`VenezuelaStateMapViewer`), SHALL provide consistent access to Dark Mode basemaps and hierarchical level status indicators.

#### Scenario: Toggling Dark Mode on Dashboard Overview Map
- **WHEN** user views the embedded map on `/dashboard` and clicks the Dark Mode toggle
- **THEN** the map tile provider SHALL switch to Esri World Dark Gray Canvas HD tiles with instant visual confirmation.

#### Scenario: Synchronizing Map Basemap with Global Sunlight Theme
- **WHEN** user toggles the global high-contrast sun/dark theme in the application header
- **THEN** all active map instances SHALL evaluate the active theme and synchronize the appropriate basemap without crashing Leaflet instances.
