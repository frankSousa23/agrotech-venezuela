## Why

The current codebase is highly functional and passes all tests, but has accumulated several linting warnings and a minor error across the frontend (TypeScript/Next.js) and backend (Python/FastAPI). Addressing these code quality issues now prevents technical debt accumulation, ensures consistent coding standards, and maintains the project's high bar for code quality (7.11/10 in pylint) as it prepares for the MapBiomas 2026 award submission.

## What Changes

- **Frontend (TypeScript/Next.js)**:
  - Fix the `prefer-const` error in `src/components/ui/ToastProvider.tsx` (reassign `let bg` to `const`).
  - Remove unused imports and variables across multiple components (e.g., unused Lucide icons like `Flame`, `MapPin`, `Mail`, etc.) to clear the 90 `@typescript-eslint/no-unused-vars` warnings.
  - Address missing dependencies in `useEffect` arrays in `Tierras`, `Bitacora`, and `LeafletMap` components where appropriate.
- **Backend (Python)**:
  - Remove unused imports (e.g., `typing.Optional`, `typing.List`, `json`, `plotly.express`) flagged by Pylint.
  - Fix line-too-long warnings in `report_generator.py`, `risk_and_carbon_engine.py`, and others by wrapping strings or adjusting formatting.
  - Improve exception handling in `nasa_power_client.py` and `sentinel_processor.py` (avoiding bare `except Exception:` where possible, or adding pylint disable pragmas if intended).
  - Update logging to use lazy formatting (`%s`) instead of f-strings in `nasa_power_client.py` and `sentinel_processor.py`.

## Capabilities

### New Capabilities
- None. This is a pure code-quality and refactoring change.

### Modified Capabilities
- None. `skip_specs: true` has been set in `.openspec.yaml`.

## Impact

- **Affected Code**: `src/` (Next.js components) and `backend/src/` (Python modules).
- **APIs/Systems**: No behavioral or API contract changes.
- **Dependencies**: No dependency changes.
