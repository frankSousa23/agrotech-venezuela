## Why

Recent system enhancements introduced native Leaflet ref architecture, a global Command Palette (`Ctrl+K`), the `/api-docs` interactive Swagger route, routing redirects, and high-contrast Sunlight mode. To guarantee 100% data integrity, error-free navigation, and flawless cross-environment execution (Localhost, Google AI Studio, Cloud Run, Docker, and Mobile), we must expand the automated test suite with dedicated E2E and unit test suites for all these new capabilities.

## What Changes

- **1. Command Palette & Search Test Suite (`__tests__/api/command-palette-and-search.test.ts`)**: Validate state search, crop filtering, accent-tolerant matching, and keyboard shortcut triggers.
- **2. Routing & Redirects Test Suite (`__tests__/api/routing-and-redirects.test.ts`)**: Verify Next.js URL redirects (`/mapa`, `/mapas`, `/docs`, `/swagger` -> 307) and OpenAPI Swagger page integrity (`/api-docs`).
- **3. Theme & Contrast Audit Test Suite (`__tests__/api/theme-and-contrast.test.ts`)**: Verify CSS token compliance, Sunlight theme overrides, and WCAG AAA readability contrast across all screens.
- **4. Native GIS Engine Lifecycle Test Suite (`__tests__/api/native-gis-lifecycle.test.ts`)**: Test pure Leaflet instance creation, layer group management, Shoelace parcel calculations, and memory cleanup.

## Capabilities

### New Capabilities
- `command-palette-and-search-testing`: Automated verification for global omnibox search and keyboard navigation.
- `routing-and-redirects-testing`: Automated checks for friendly URL routing and OpenAPI Swagger routes.
- `theme-and-contrast-audit-testing`: Color contrast and theme token integrity test suite.
- `native-gis-lifecycle-testing`: Geospatial layer management and Leaflet DOM engine testing.

### Modified Capabilities
<!-- None -->

## Impact

- **Test Files**: `__tests__/api/command-palette-and-search.test.ts`, `__tests__/api/routing-and-redirects.test.ts`, `__tests__/api/theme-and-contrast.test.ts`, `__tests__/api/native-gis-lifecycle.test.ts`.
- **Documentation**: Updates to `AGENTS.md` and `README.md` reflecting the expanded test suite (75+ Jest tests + 39 Pytest tests = 114+ tests).
