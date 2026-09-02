## MODIFIED Requirements

### Requirement: Global Venezuela Map Initialization
The WebGIS viewer SHALL initialize centered on Venezuela with strict territorial boundaries (`maxBounds: [[0.6, -73.4], [12.5, -59.8]]`), maximum viscosity bounce, and load vector geometries for all 24 federal entities without allowing the camera to pan outside Venezuelan sovereign territory or zoom out beyond national scope.

#### Scenario: Successful Initial Map Render with Territorial Anchoring
- **WHEN** user navigates to `/dashboard/mapa` on any device (desktop or mobile)
- **THEN** the system displays the interactive map of Venezuela showing 24 state boundaries, prevents panning beyond Venezuelan coordinates, and constrains minimum zoom to maintain national framing.

#### Scenario: Restricting Unbounded Map Dragging
- **WHEN** user attempts to drag or flick the map camera outside Venezuela's geographic perimeter
- **THEN** Leaflet enforces `maxBoundsViscosity: 1.0` snapping the camera back within territorial boundaries.
