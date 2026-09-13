## MODIFIED Requirements

### Requirement: Watermark-Free Base Tiles
The system SHALL use OpenStreetMap or Esri World Topo tiles for thematic layers, Esri World Dark Gray Canvas HD tiles for dark mode basemaps, and Esri World Imagery for satellite layers across all WebGIS views (Next.js and Streamlit Folium), strictly excluding tile endpoints that inject watermarks or require API keys.

#### Scenario: Rendering Thematic Layer
- **WHEN** user views `/dashboard/mapa` or `/dashboard` on thematic/pH/Rainfall/SAR layers
- **THEN** the map canvas renders clean cartographic tiles without any watermark text.

#### Scenario: Rendering Dark Mode Layer Without API Key or Watermark
- **WHEN** user activates the dark mode basemap in any WebGIS view or in the Streamlit Folium dashboard
- **THEN** the map canvas renders Esri World Dark Gray Canvas HD tiles with HTTP 200 responses, zero CORS restrictions, and without diagonal watermark banners.
