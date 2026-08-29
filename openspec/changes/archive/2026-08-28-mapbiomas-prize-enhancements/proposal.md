## Why

To maximize competitiveness in the **2nd Edition of the MapBiomas Venezuela Prize 2026** across the *General* and *Public Policy & Environmental Management* categories, Agrotech Venezuela requires deeper scientific integration and verifiable contributions to MapBiomas. Specifically, we must turn MapBiomas from a passive reference into an active bi-directional validation tool, inject historical land cover transition metrics directly into our Machine Learning yield prediction algorithms, and provide an automated export pipeline that compiles the Digital Twin data into a complete scientific publication PDF under 10,000 words.

## What Changes

- **Ground Truth & Discrepancy Detection**: Compare Sentinel-2 live NDVI/EVI and SAR radar against MapBiomas 2024 baseline classification at parcel scale to detect recent deforestation, agricultural expansion, or land degradation anomalies.
- **Deep ML Feature Integration**: Incorporate MapBiomas historical transition matrices (e.g., Forest→Agriculture, Pasture→Agriculture, Continuous Agriculture) into `MLFeatureEngine` and `CropYieldPredictor`, adjusting yield curves and limiting factors based on soil legacy.
- **Automated Scientific Paper & Report Generator**: Provide an export pipeline and script (`scripts/generate_prize_pdf.py` or API endpoint) that compiles parcel telemetries, charts, and the draft scientific paper into a formatted submission artifact.
- **UI Feedback & Alert Integration**: Display discrepancy alerts in WebGIS and Streamlit dashboard, allowing agronomists to confirm ground truth status.

## Capabilities

### New Capabilities
- `mapbiomas-discrepancy-detection`: Real-time comparison between Sentinel-2 optical/SAR observations and MapBiomas baseline land cover to detect discrepancies, deforestation alerts, and land conversion.
- `mapbiomas-ml-yield-integration`: Mathematical incorporation of MapBiomas historical transition categories into the ML feature vector for crop yield projections and soil legacy modifiers.
- `prize-publication-exporter`: Automated generation of formatted scientific reports and PDF submission documents containing parcel digital twins, charts, and narrative content for the MapBiomas Prize.

### Modified Capabilities
- `carbon-credits-mrv-calculator`: Refine MRV calculation requirements to account for specific MapBiomas land cover transition vectors and soil organic carbon degradation factors.

## Impact

- **Backend**: Update `ml_feature_engine.py`, `crop_yield_predictor.py`, and create discrepancy analysis routines.
- **Frontend / Dashboard**: Add discrepancy alert banners in `MultiLevelMapViewer.tsx` and Streamlit dashboard.
- **Documentation & Tooling**: Add report generation scripts and complete scientific draft assets under `docs/mapbiomas_premio_2026/`.
