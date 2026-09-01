## 1. Frontend Lint Fixes

- [x] 1.1 Fix `prefer-const` error in `src/components/ui/ToastProvider.tsx` (line 86) and verify by running `npm run lint`.
- [x] 1.2 Remove unused Lucide-react icons and variables across UI components (e.g., `Flame` in `CommandPalette.tsx`, `Moon` in `SunlightThemeToggle.tsx`, etc.) and verify by ensuring no `@typescript-eslint/no-unused-vars` warnings remain in `npm run lint`.
- [x] 1.3 Add missing dependencies to `useEffect` arrays in `src/app/dashboard/bitacora/page.tsx`, `tierras/page.tsx`, `LeafletMap.tsx`, and `LeafletMapInner.tsx` and verify by running `npm run lint`.

## 2. Backend Lint Fixes

- [x] 2.1 Remove unused Python imports (`typing.Optional`, `typing.List`, `json`, `plotly.express`) across `viz_utils.py`, `report_generator.py`, `ml_feature_engine.py`, and `risk_and_carbon_engine.py` and verify via `pylint`.
- [x] 2.2 Fix `line-too-long` violations (lines > 100 chars) in `report_generator.py` and `risk_and_carbon_engine.py` by breaking strings or wrapping lines, verifying with `pylint`.
- [x] 2.3 Improve broad exception handling (`broad-exception-caught`) and formatting (`logging-fstring-interpolation`) in `nasa_power_client.py` and `sentinel_processor.py` and verify with `pylint`.

## 3. Global Verification

- [x] 3.1 Run frontend test suite (`npm test`) and backend test suite (`py -m pytest tests`) to verify that the linting refactors did not introduce functional regressions.
