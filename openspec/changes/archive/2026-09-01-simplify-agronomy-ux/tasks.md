## 1. Theme Configuration & Toggle

- [x] 1.1 Create/Modify the root layout to inject an inline script preventing theme hydration flash and set the default `data-theme` attribute to 'light'. Verify by inspecting the HTML root tag on initial load.
- [x] 1.2 Update global CSS variables (`page.module.css`, `layout.module.css`, etc.) to support `[data-theme='dark']` mapping. Verify by manually setting the attribute in dev tools and ensuring colors invert.
- [x] 1.3 Refactor `SunlightThemeToggle.tsx` into a 3-way toggle (Light, Dark, Sunlight) saving preference to `localStorage` and updating the `data-theme` attribute. Verify by clicking the toggle and persisting state across reloads.

## 2. Navigation Sidebar Restructuring

- [x] 2.1 Update `NAV_ITEMS` in `src/app/dashboard/layout.tsx` to use the new agronomic naming convention (e.g., "Mapa Satelital", "Suelos y Nutrientes", "Asesor IA"). Verify by checking the sidebar text in the browser.
- [x] 2.2 Group the `NAV_ITEMS` visually in the sidebar under section headers: "Fase 1: Identificación", "Fase 2: Diagnóstico", "Fase 3: Operación". Verify by observing the new visual hierarchy in the UI.

## 3. Empty States Implementation

- [x] 3.1 Fetch the user's `parcels` in `src/app/dashboard/recomendaciones/page.tsx` and if empty, render the `EmptyStateCard` prompting them to define a parcel. Verify by logging in as a new user and navigating to Recommendations.
- [x] 3.2 Fetch the user's `parcels` in `src/app/dashboard/bitacora/page.tsx` and apply the same empty state logic. Verify by visiting the Field Diary without any parcels and confirming the fallback displays.

## 4. Verification & Testing

- [x] 4.1 Run the frontend test suite (`npm test`) to ensure the layout modifications and component refactors did not break any existing snapshot or integration tests. Verify a passing test output.
