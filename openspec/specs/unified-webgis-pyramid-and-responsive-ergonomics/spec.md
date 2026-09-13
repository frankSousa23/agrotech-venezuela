## Purpose

Unifies multi-scale cartographic exploration into a continuous 3-level hierarchy with mobile touch ergonomics, safe scroll handling, and responsive layer controls.

## Requirements

### Requirement: Unified 3-Level Cartographic Hierarchy
The WebGIS viewer SHALL provide continuous navigation from the 24 Venezuelan state GeoJSON boundaries (Level 1) through municipal agricultural zones (Level 2) down to parcel-level drawing and satellite orthoimagery (Level 3) without requiring mode-switching tabs.

#### Scenario: Navigating from National to Municipal Scope
- **WHEN** user clicks on an individual state polygon (e.g., Portuguesa) in Level 1
- **THEN** the map SHALL smoothly zoom to Level 2 (municipal view), display relevant municipality borders, and update the breadcrumb to indicate active hierarchy.

### Requirement: Mobile Touch Ergonomics and Scroll-Trap Prevention
The map interface SHALL maintain safe vertical page scrolling on touch devices while enabling fluid panning and zooming within map controls.

#### Scenario: Scrolling Past Map on Mobile
- **WHEN** a mobile user drags their finger along the outer map margins or uses single-finger vertical drag
- **THEN** the page SHALL scroll vertically without becoming trapped in map drag events.
