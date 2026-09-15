## Why

Following the completion of the decoupled ROI operational costing and the integration of the 5-stage precision agriculture workflow infographic, a comprehensive responsive UI/UX and codebase audit revealed that several documentation files, components, and scripts still reference outdated test counts (252 or 267 tests instead of 278, and 31 routes instead of 32). Additionally, the mobile top bar on viewport widths under 640px experienced width congestion because the theme toggle button rendered a 110px label with text.

This change consolidates the final stability, mobile ergonomics, and metric synchronization across all 14 affected repository surfaces, locking the project into a pristine, verifiable state for the MapBiomas Venezuela 2026 evaluation period without further changes.

## What Changes

- **Mobile Ergonomics**: Add `iconOnly?: boolean` prop to `SunlightThemeToggle.tsx` and activate it in the mobile header bar of `src/app/dashboard/layout.tsx`, reducing mobile header consumption by ~78px and eliminating wrap/overflow risks on screens down to 360px.
- **Test Summary Script Enhancement**: Update `scripts/test_summary.js` to register `roiCostEngine.test.ts` (5 tests) and `ImpactRoiWidget.test.ts` (6 tests), bringing the certified count to 278 automated tests across 33 Jest suites and 17 Pytest modules.
- **Universal Status & Metric Synchronization**: Synchronize all technical dossiers, pitch decks, guides, guidelines, and components to 278 tests (224 Jest + 54 Pytest), 32 clean production routes, TRL 4, and decoupled operational ROI vs separate ESG carbon simulation:
  - `src/components/layout/DemoTourModal.tsx`
  - `src/components/gis/MultiLevelMapViewer.tsx`
  - `src/app/dashboard/postulacion/page.tsx`
  - `public/docs/ARTICULO_TECNICO_DRAFT.md`
  - `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md` and `public/docs/POSTULACION_EXPEDIENTE_PREMIO_2026.md`
  - `PITCH_DECK.md` and `public/docs/PITCH_DECK.md`
  - `docs/MEMORANDO_POSTULACION.md` and `public/docs/MEMORANDO_POSTULACION.md`
  - `__tests__/api/security-and-dossier.test.ts`
  - `DEVELOPING.md`
  - `AUDITORIA_GLOBAL_SISTEMA_2026.md`
  - `AGENTS.md`
  - `openspec/specs/system-status-synchronization/spec.md`
- **Integrity & Stability Certification**: Execute `npm test`, `npm run test:backend`, `npm run test:all`, `npm run test:summary`, `npm run typecheck`, and `npm run build` to confirm 100% passing test execution and 0 build or lint errors.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `system-status-synchronization`: Update certified quality metrics to 278 tests passing (224 Jest in 33 suites + 54 Pytest in 17 modules), 32 Next.js 16 routes, and decoupled operational ROI costing across all documentation surfaces.
- `mobile-touch-ergonomics`: Refine mobile top bar controls to support an icon-only theme toggle button, preventing header crowding on viewports below 640px.

## Impact

- **UI/UX**: More breathing room and zero horizontal overflow on mobile screens (< 640px).
- **Documentation**: 100% coherence across all markdown and public download files.
- **Testing**: `scripts/test_summary.js` reports 278 tests matching Jest and Pytest outputs.
- **Dependencies/APIs**: Zero breaking changes, zero API schema modifications.
