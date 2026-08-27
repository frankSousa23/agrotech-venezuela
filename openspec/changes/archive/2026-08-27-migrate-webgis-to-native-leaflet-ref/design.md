## Context

In cloud-hosted sandboxes (such as Google AI Studio, Cloud Run, and embedded WebContainers), React 19's context propagation inside dynamic chunks occasionally fails when using `react-leaflet` v5 wrappers. This causes `<MapContainer>` to fail silent hydration, freezing the UI in the dynamic loader fallback.

## Goals / Non-Goals

**Goals:**
- Migrate `VenezuelaStateMapInner.tsx` and `LeafletMapInner.tsx` from `react-leaflet` JSX wrappers to direct Leaflet native DOM API (`L.map(containerRef.current)`).
- Retain 100% of geospatial features: 24 State polygons, 335 Municipalities, pH / Rainfall / SAR Radar layers, Tooltips, `flyTo` camera motion, and Shoelace polygon drawing.
- Eliminate any possibility of `"Map container is already initialized"` by tracking the `L.Map` instance in a React `useRef`.
- Ensure automatic canvas sizing via integrated `ResizeObserver`.

**Non-Goals:**
- Altering core mathematical algorithms (Shoelace, Haversine, GDD remain unchanged).

## Decisions

### 1. Leaflet Native Ref Pattern
- Create maps inside `useEffect` using `L.map(containerRef.current, { center, zoom, zoomControl: true })`.
- Store the map instance in `mapRef = useRef<L.Map | null>(null)`.
- On component unmount, invoke `mapRef.current.remove()` and reset the ref to `null`.

### 2. Layer Groups & Vector Management
- Use dedicated `L.layerGroup` instances for base tiles, GeoJSON state polygons, and parcel markers.
- Update layers imperatively when `selectedStateId` or `activeLayer` props change, avoiding expensive full map reconstructions.

### 3. Integrated ResizeObserver
- Attach a `ResizeObserver` directly to the `containerRef.current` element to call `map.invalidateSize()` whenever DOM bounds change.
