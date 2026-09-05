## Context

See `proposal.md` for motivation. Currently, `src/lib/geo/spatialUtils.ts` applies a single linear rule-of-thumb (`deltaPh * 1.8`) for all acidic soils, lacking distinction between high-weathered Ultisols/Oxisoles (requiring Kamprath aluminum neutralization) and alkaline sodic Aridisols (which need Agricultural Gypsum instead of lime). The voice assistant in `src/lib/hooks/useVoiceAssistant.ts` captures raw transcripts without parsing agrarian vernacular expressions or traditional Venezuelan units (sacos, tambores, tablones). Export capabilities currently produce standard GeoJSON points and CSV without VRA attributes for GPS tractor consoles (ESRI Shapefile), drones, or analog tractor cabin cards.

## Goals / Non-Goals

**Goals:**
- Implement a regional pedological amendment strategy in `src/lib/geo/spatialUtils.ts` differentiating Eastern Sabanas/Llanos (Kamprath $Al^{3+}$), Sur del Lago (alluvial Ca:Mg balance), and Quíbor/Lara (Agricultural Gypsum $CaSO_4 \cdot 2H_2O$).
- Build an offline-first Venezuelan agrarian vernacular parser (`src/lib/farmer/vernacularParser.ts`) converting traditional units (sacos, tambores, canecas, tablones) and spoken tasks into structured field diary logs.
- Build a universal machinery prescription exporter (`src/lib/geo/machineryExporter.ts`) generating downloadable packages with ESRI Shapefiles (VRA attributes), Drone KML/GeoJSON, and 1-page printable cabin calibration cards.
- Integrate interactive triggers in `/dashboard/tierras` and `/dashboard/recomendaciones`.
- Maintain 100% test coverage with zero TypeScript errors and update institutional dossiers.

**Non-Goals:**
- Implementing proprietary proprietary binary CAN-bus tractor drivers.
- Requiring remote LLM connectivity for basic dialect parsing (must run offline).

## Decisions

### Decision 1: Strategy Pattern for Regional Pedology
- **Choice**: Structure soil amendment recommendations into three distinct engines based on geographic coordinates and territorial detection:
  1. `AcidicWeatheredStrategy`: Kamprath aluminum-neutralization logic for Monagas, Anzoátegui, Guárico, and Bolívar.
  2. `AlluvialLeachedStrategy`: Calcium/Magnesium ratio optimization for Sur del Lago and high-rainfall river basins.
  3. `SodicReclamationStrategy`: Gypsum requirement formula ($GR$) displacing sodium ($Na^+$) in Lara (Quíbor) and Falcón, strictly inhibiting calcium carbonate.
- **Alternatives Considered**: Keeping a single linear equation with minor coefficient adjustments. Rejected because treating sodic Aridisols with calcium carbonate exacerbates structural degradation.

### Decision 2: Offline-First Client-Side Lexical Parser
- **Choice**: Implement `parseVernacularSpeech(text: string)` using determinist regex tokenizers, phonetic normalizers, and traditional conversion constants in TypeScript.
- **Alternatives Considered**: Sending every voice audio snippet to Google Gemini AI. Rejected because Venezuelan rural fields frequently have zero cellular connectivity; the core parser must function offline inside the PWA.

### Decision 3: Multi-Format Machinery Export Architecture
- **Choice**: Produce self-contained prescription packages generated in-browser:
  - ESRI Shapefile payload format (SHP/SHX/DBF/PRJ) with 10-char uppercase DBF attributes (`RATE_LIME`, `RATE_NPK`, `AREA_HA`, `LOTE_ID`).
  - Drone KML/GeoJSON flight boundary missions.
  - Printable HTML/CSS 1-page cabin guide for conventional tractors without onboard computers.
- **Alternatives Considered**: Relying exclusively on GeoJSON. Rejected because legacy tractor GPS consoles (John Deere GreenStar, Trimble AgGPS) require Shapefiles.

## Risks / Trade-offs

- **[Risk]** Spoken transcripts with heavy rural accents or engine background noise could fail strict regex matches.
  - **Mitigation**: Implement fuzzy keyword matching and present an interactive visual confirmation card with 1-click correction before committing to IndexedDB.
- **[Risk]** Shapefile projection confusion between WGS84 geographic and local UTM projected systems.
  - **Mitigation**: Include explicit `.prj` definition files (WGS 84 / UTM zone 19N for Venezuela Central/Eastern and zone 18N for Western) alongside the export package.
