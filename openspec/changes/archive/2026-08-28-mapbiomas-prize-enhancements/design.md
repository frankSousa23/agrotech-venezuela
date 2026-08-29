## Context

Agrotech Venezuela features a unified microservices architecture with Next.js 16 (WebGIS), FastAPI (Spatial, ML & Gemini AI), Streamlit (Dashboard), and SQLite/PostgreSQL caching. The current MapBiomas integration operates as an analytical baseline and attribution layer. To compete in the MapBiomas Prize 2026, we require algorithmic coupling between historical MapBiomas raster classes, real-time Sentinel-2 optical/SAR observations, ML yield adjustments, and an automated publication compiler.

## Goals / Non-Goals

**Goals:**
- Implement a bi-directional Discrepancy & Ground Truth Detection module (`backend/src/mapbiomas_discrepancy_detector.py`) comparing real-time Sentinel-2/SAR against MapBiomas 2024.
- Integrate MapBiomas transition metrics directly into `MLFeatureEngine` (`backend/src/ml_feature_engine.py`) and `CropYieldPredictor` (`backend/src/crop_yield_predictor.py`).
- Implement an automated report and publication generator script (`scripts/generate_prize_pdf.py`) that exports the digital twin, scientific manuscript, and charts into a PDF format (< 10,000 words).
- Expose the discrepancy alerts and ML yield legacy adjustments in both WebGIS and Streamlit dashboard.

**Non-Goals:**
- Creating custom raster tile generation pipelines from scratch (we consume existing GeoTIFF / Earth Engine / GeoJSON sources).
- Altering the core Leaflet native `useRef` rendering cycle in Next.js.

## Decisions

### 1. Discrepancy & Ground Truth Heuristic
- **Decision**: Evaluate spectral divergence between the baseline MapBiomas 2024 class and current Sentinel-2 indices (NDVI, NDWI, EVI) filtered through Sentinel-1 SAR VV/VH radar backscatter.
- **Rationale**: Optical signals alone may suffer from seasonal dry-season defoliation. Adding C-band SAR penetration ensures false-positive deforestation alerts are suppressed during dry spells.
- **Alternatives considered**: Optical-only NDVI thresholds (prone to dry-season cloud and drought false alarms).

### 2. Deep ML Feature Vector Coupling
- **Decision**: Add `mapbiomas_transition_id`, `years_under_agriculture`, and `soil_compaction_legacy_risk` into the 16-dimensional feature vector in `MLFeatureEngine`.
- **Rationale**: Directly affects yield potential calculations in `CropYieldPredictor` by applying agronomic soil physics penalties or bonuses.
- **Alternatives considered**: Post-prediction multiplier without feature vector integration (less statistically sound and weaker for academic peer review).

### 3. Automated Prize Document Generation
- **Decision**: Provide a standalone CLI tool `scripts/generate_prize_pdf.py` using standard Python reporting libraries (or Markdown-to-PDF with Matplotlib/Seaborn vector charts) that ingests `docs/mapbiomas_premio_2026/ARTICULO_CIENTIFICO_DRAFT.md` and generates formatted submission PDFs with dynamic parcel benchmarks.
- **Rationale**: Allows rapid reproducibility, offline packaging, and parameterization for any Venezuelan agricultural region (Turén, Calabozo, Sur del Lago, etc.).
- **Alternatives considered**: Manual Word/LaTeX editing (non-reproducible from software).

## Risks / Trade-offs

- **[Risk: Cloud Cover in Tropical Rainy Seasons]** → **Mitigation**: Fallback to Sentinel-1 C-band SAR backscatter radar analysis and Scene Classification Layer (SCL) filtering.
- **[Risk: Computation Overhead on Multi-scale Queries]** → **Mitigation**: Cache discrepancy classifications in the existing SQLite WAL spatial cache (`cache_manager.py`) with 4-decimal geodetic hashing.
