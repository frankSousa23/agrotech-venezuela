## 1. Discrepancy & Ground Truth Detector

- [x] 1.1 Implement `backend/src/mapbiomas_discrepancy_detector.py` comparing Sentinel-2/SAR against MapBiomas baseline and verify with unit tests in `backend/tests/test_mapbiomas_discrepancy.py`
- [x] 1.2 Expose discrepancy evaluation in FastAPI router (`backend/src/main.py`) and verify `/api/mapbiomas/discrepancy` endpoint returns structured alert payload

## 2. Machine Learning Pipeline Coupling

- [x] 2.1 Update `backend/src/ml_feature_engine.py` to encode MapBiomas historical transition matrices in the feature vector and verify feature extraction unit tests
- [x] 2.2 Update `backend/src/crop_yield_predictor.py` to apply soil legacy modifiers to suitability and yield curves, and verify with pytest suite
- [x] 2.3 Enhance the Streamlit dashboard MapBiomas tab (`backend/streamlit_app.py`) to display real-time discrepancy alerts and yield modifier impacts

## 3. Publication Exporter & Automated PDF Generator

- [x] 3.1 Create publication generator script `scripts/generate_prize_pdf.py` that compiles parcel digital twin telemetry, visual charts, and scientific manuscript into a publication-ready PDF, and verify by running script
- [x] 3.2 Integrate report download actions and verify generated document format complies with MapBiomas Prize rules (< 10,000 words, proper citations)

## 4. End-to-End Testing & Validation

- [x] 4.1 Execute full frontend test suite (`npm test`) and type check (`npx tsc --noEmit`) to verify 0 regressions
- [x] 4.2 Execute full backend test suite (`cd backend && py -m pytest tests`) to verify all spatial and ML test suites pass
