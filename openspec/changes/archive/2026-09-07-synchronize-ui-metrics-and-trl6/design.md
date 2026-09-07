## Context

See `proposal.md` for motivation. While the documentation, official award dossiers, recompiled PDFs, and test suite baseline were calibrated to TRL 6 and 233 passing tests (179 Jest + 54 Pytest), four UI components continue to display outdated "TRL 7" labels and "227 tests" badges. This creates a cosmetic cognitive discrepancy for evaluators inspecting the live Next.js application.

## Goals / Non-Goals

**Goals:**
- Harmonize all user-visible text, navigation links, header badges, and modal tour cards to reflect **TRL 6** maturity (*Prototipo Demostrado en Entorno Relevante*).
- Synchronize all user-visible test count badges to reflect the current **233 passing automated tests** (179 Jest + 54 Pytest).
- Ensure 0 regressions across all 233 automated tests and preserve clean Next.js 16 production build.

**Non-Goals:**
- Modifying underlying backend APIs or algorithms (Shoelace, Kamprath, Saxton-Rawls, GDD, Sentinel-1 radar).
- Altering the already calibrated PDF documents, which are already synchronized with TRL 6 and 233 tests.

## Decisions

### Decision 1: Precise Wording for TRL 6
- **Rationale**: TRL 6 in international NASA/Horizon Europe standards signifies a system/subsystem model or prototype demonstration in a relevant environment. In Agrotech Venezuela, this corresponds to demonstration using multi-temporal satellite data and field conditions in Portuguesa, Zulia, and Monagas.
- **Implementation**:
  - Short badge: `TRL 6` / `TRL 6 Demostrado`.
  - Full title: `Nivel de Madurez TRL 6 (Prototipo Demostrado en Entorno Relevante)`.
  - Tour label: `Ficha Técnica Institucional TRL 6`.

### Decision 2: Synchronize Automated Test Counts in Postulación Dashboard
- **Rationale**: Update `227 tests` to `233 tests (179 Jest + 54 Pytest)` to match the latest test suite execution without breaking any layout constraints.

## Risks / Trade-offs

- **[Risk]** Test assertion failure if a test expects exact legacy strings in UI components.
  - **Mitigation**: Grep analysis confirmed no test in `__tests__/` asserts exact TRL strings in `page.tsx`, `layout.tsx`, `postulacion/page.tsx`, or `DemoTourModal.tsx`. We will run `npm test` to verify immediately after application.
