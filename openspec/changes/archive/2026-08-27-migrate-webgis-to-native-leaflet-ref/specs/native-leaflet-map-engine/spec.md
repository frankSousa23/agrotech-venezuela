## Purpose

Replaces `react-leaflet` wrapper components with pure native Leaflet (`L.map`) attached directly to HTML DOM container elements using React `useRef`.

## ADDED Requirements

### Requirement: Native DOM Map Mount
The system SHALL initialize Leaflet map instances using `L.map(containerRef.current)` inside a `useEffect` hook without depending on `react-leaflet` Context.

#### Scenario: Mounting Map in Sandboxed Iframe
- **WHEN** user loads `/dashboard/mapa` inside an iframe or Google AI Studio preview
- **THEN** the map canvas initializes within 50ms without hanging on the loading fallback.
