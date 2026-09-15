## Context

See `proposal.md` for motivation. The Agrotech Venezuela platform has undergone multiple feature additions and agronomic calibrations (including rural vernacular normalization, offline conflict quarantine, and decoupled ROI operational costing). As a result:
1. Two new frontend test suites (`roiCostEngine.test.ts` and `ImpactRoiWidget.test.ts`) were added, bringing the total suite count to 33 Jest suites (224 tests) and 17 Pytest modules (54 tests), totaling 278 automated tests.
2. Next.js 16 compiles 32 production routes cleanly.
3. On viewports below 640px, the mobile top bar had 6 buttons where `SunlightThemeToggle` occupied 110px due to its static text label, crowding the hamburger menu button.
4. Several markdown and source files still cited outdated counts (252 or 267 tests, 31 routes).

## Goals / Non-Goals

**Goals:**
- Eliminate mobile header button congestion on screens < 640px by equipping `SunlightThemeToggle` with an `iconOnly` prop.
- Register all 33 test suites in `scripts/test_summary.js` so that `npm run test:summary` renders the exact 278 automated tests.
- Synchronize all 14 identified repository documentation and UI surfaces to reflect 278 tests, 32 routes, TRL 4, and decoupled ROI costing.
- Update `__tests__/api/security-and-dossier.test.ts` assertions to validate the updated 278 tests and 32 routes without regression.
- Execute full build and verification to guarantee absolute stability for project freeze.

**Non-Goals:**
- Adding new user-facing features or modifying agronomic calculation formulas.
- Changing database schemas or Docker configurations.
- Altering the archived OpenSpec change records.

## Decisions

### Decision 1: `iconOnly` Pattern for `SunlightThemeToggle`
- **Choice**: Add an optional `iconOnly?: boolean` prop (default `false`) to [`SunlightThemeToggle.tsx`](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/src/components/layout/SunlightThemeToggle.tsx). When `true`, render a compact `32x32px` button displaying only the icon (`Sun`, `Moon`, `SunMedium`) and set `aria-label={config.label}`. In `src/app/dashboard/layout.tsx`, pass `iconOnly` in the `.mobileBar` while leaving the desktop `.desktopUtilityBar` unchanged.
- **Alternatives Considered**:
  - *Pure CSS `display: none` on `span`*: Works, but leaves `minWidth: '110px'` on the button container unless overridden with `!important` or new media query classes.
  - *Prop-driven*: Matches existing architecture in `FarmerModeToggle` (`iconOnly`) and `DemoTourModal` (`iconOnly`), ensuring consistency across layout controls.

### Decision 2: Categorization of Missing Test Suites in `scripts/test_summary.js`
- **Choice**: Place `roiCostEngine.test.ts` (5 tests) under `Agronomía & Física Edafológica` and `ImpactRoiWidget.test.ts` (6 tests) under `Usabilidad Rural Dual-Mode & Prescripciones`.
- **Alternatives Considered**: Creating a new category, which would needlessly lengthen the terminal ASCII matrix.

### Decision 3: Atomic Synchronization of Documentation and Test Guard
- **Choice**: Synchronize `MEMORANDO_POSTULACION.md` (and its public copy) alongside `__tests__/api/security-and-dossier.test.ts` in the same operation so CI and local test runs stay green at every step.

## Risks / Trade-offs

- **[Risk]** Updating `MEMORANDO_POSTULACION.md` without updating `security-and-dossier.test.ts` causes Jest test failure.
  → **Mitigation**: Update both synchronously and verify with `npm test`.
- **[Risk]** Discrepancy between `docs/` and `public/docs/` mirror files.
  → **Mitigation**: Update both copies simultaneously for `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `PITCH_DECK.md`, and `MEMORANDO_POSTULACION.md`.
