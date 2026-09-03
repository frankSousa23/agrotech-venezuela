## MODIFIED Requirements

### Requirement: Native DOM Map Mount
The system SHALL initialize Leaflet map instances using `L.map(containerRef.current)` inside a `useEffect` hook without depending on `react-leaflet` Context.

#### Scenario: Mounting Map in Sandboxed Iframe
- **WHEN** user loads `/dashboard/mapa` inside an iframe or sandboxed cloud preview
- **THEN** the map canvas initializes within 50ms without hanging on the loading fallback.
