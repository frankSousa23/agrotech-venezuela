## Context

The WebGIS suite currently supports dual modes (State Explorer and Multi-Scale Viewer) with 7 thematic layers. On mobile viewports and during quick tab switches, the 2-column grid and Leaflet tile canvas require responsive layout refactoring, interactive floating legends, and automatic canvas invalidation.

## Goals / Non-Goals

**Goals:**
- Provide a flawless mobile responsive layout where the map takes full width and telemetry collapses gracefully.
- Add an overlay legend inside the map that dynamically displays scales for SAR, pH, Rainfall, and MapBiomas.
- Ensure `map.invalidateSize()` is invoked seamlessly whenever the container dimensions shift.
- Create a dedicated, exhaustive map test suite (`map-viewer.test.ts`) covering all 24 states, 335 municipalities, and boundary invariants.

**Non-Goals:**
- Removing desktop 2-column view (desktop view remains optimized side-by-side).

## Decisions

### Decision 1: Responsive Layout via CSS Modules & Media Queries
- **Choice**: Modern flexbox/grid layout that automatically transitions from `minmax(0, 1fr) 360px` to `1fr` column on viewports `< 900px`.
- **Rationale**: Smooth, native CSS performance with zero layout shift (CLS).

### Decision 2: Floating Dynamic Legend Overlay
- **Choice**: Absolute positioned glassmorphism legend in the bottom-left of the Leaflet container with `pointer-events: auto`.
- **Rationale**: Farmers can immediately understand what each color on the map represents without scrolling away from the map.

### Decision 3: Map Size Invalidation Controller
- **Choice**: Leaflet subcomponent `MapResizeSynchronizer` invoking `map.invalidateSize()` on mount and window resize.
- **Rationale**: Prevents grey tile syndrome during dynamic import and mode transitions.

## Risks / Trade-offs

- **[Risk]** Legend overlay obstructing map controls on small screens → **[Mitigation]** Allow minimizing the legend with a toggle button.
