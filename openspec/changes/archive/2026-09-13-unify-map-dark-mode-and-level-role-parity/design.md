## Context

See `proposal.md` for motivation. Currently, the WebGIS maps in `LeafletMapInner.tsx` and the Folium dashboard in `backend/src/viz_utils.py` utilize CartoDB Dark Matter tiles (`cartocdn.com/dark_all/...`), which now enforce paid API keys by projecting repeated diagonal watermark banners across every tile. Furthermore, secondary map viewers like `MapBiomasViewer.tsx` and `VenezuelaStateMapViewer.tsx` lack dark mode controls and unified role-level parity.

## Goals / Non-Goals

**Goals:**
- Eliminate all tile watermarks and API key requirements across all map viewers by adopting Esri World Dark Gray Canvas HD (`server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`).
- Unify dark mode controls across all map viewers (`MultiLevelMapViewer`, `MapBiomasViewer`, `VenezuelaStateMapViewer`) and Streamlit Folium (`viz_utils.py`).
- Maintain seamless reactivity with the global theme toggle (`SunlightThemeToggle.tsx`) without Leaflet lifecycle collision.
- Guarantee role-adapted cartographic controls (`FARMER`, `TECH`, `AUDITOR`, `GUEST`) across all map contexts.
- Keep 100% test coverage and ensure all 252+ tests pass cleanly.

**Non-Goals:**
- Modifying offline vector GeoJSON geometries or Shoelace/Haversine geodesy engines.
- Replacing the primary satellite provider (Esri World Imagery) or standard OSM/Topo basemaps which already work flawlessly without watermarks.
- Introducing heavy external map styling libraries (e.g., Mapbox GL JS or MapLibre GL); Leaflet native remains the standard.

## Decisions

1. **Provider Selection: Esri World Dark Gray Canvas HD vs. Stamen / Stadia / Mapbox**
   - *Chosen*: Esri World Dark Gray Canvas Base (`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`).
   - *Rationale*: 100% free public access, unmetered, high-speed CDN, CORS `*`, zero API key requirements, and maximum visual contrast for agricultural overlays.
   - *Alternatives considered*:
     - Stadia / Stamen: Requires account signup and API key.
     - Mapbox: Strict token requirement and metered billing.
     - CSS `invert()` filter on OSM: Inconsistent color rendering and degraded performance on mobile.

2. **Unified Layer State & Controls Architecture**
   - In `LeafletMapInner.tsx` and `VenezuelaStateMapInner.tsx`, update the tile layer instantiation so `activeLayer === 'dark'` mounts `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}` with attribution `&copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors`.
   - In `MapBiomasViewer.tsx`, expose the `btn_layer_dark` ("Modo Oscuro") button alongside Satellite and Topo, syncing with the parent or component state.
   - In `backend/src/viz_utils.py`, update `get_base_map(style='dark')` to use the Esri World Dark Gray Canvas tile URL instead of `CartoDB dark_matter`.

3. **Role & Theme Reactivity**
   - Connect map container classes and basemap defaults with `UIModeContext` and `SunlightThemeToggle` tokens, ensuring high-visibility styling for farmers and advanced telemetry for technical roles.

## Risks / Trade-offs

- [Risk] Leaflet tile flashing when switching between satellite and dark basemaps.
  → *Mitigation*: Ensure clean layer disposal (`map.removeLayer(tileLayerRef.current)`) before mounting the new tile layer, preserving smooth transitions.
- [Risk] Outdated Jest mocks expecting CartoDB URLs in test suites.
  → *Mitigation*: Update unit and integration tests (`unifiedWebGIS.test.tsx`, `leafletMap.test.tsx`) to assert the new Esri Dark Gray URL.
