## Context

Agrotech Venezuela features rich agronomic, geospatial, and AI capabilities, paired with dual-mode ergonomics (*Modo Productor Fácil* for smallholders and *Modo Técnico* for engineers). The system includes contextual floating guides (`QuickStartWizard`, `IntentionsModal`, `DemoTourModal`, `AgronomicGlossaryDrawer`). However, usability audits revealed three operational friction points:
1. **No Dedicated Reference Manual**: Users seeking exhaustive operational instructions, machinery calibration guides, or offline tractor cabin sheets must rely on scattered tooltips rather than a centralized, searchable `/dashboard/manual` route.
2. **Role Switcher Disparity**: The sidebar compact role switcher currently exposes `🚜 Prod`, `🌱 Agrón`, and `🛡️ Admin`, but omits `🚀 Invitado` (only available from `/dashboard/admin`), making it harder for jurors and evaluators to quickly preview the isolated guest sandbox.
3. **Lack of Guided Progress Tracking**: New users landing on `/dashboard` see a static 4-step explanation card but lack an interactive, gamified checklist that reflects their actual progress and guides their initial session from 0% to 100%.
4. **Mobile Floating Overlap**: The floating "Glosario de Campo" button on ultra-compact mobile viewports (< 380px) can overlap with map bottom controls or navigation elements.

## Goals / Non-Goals

**Goals:**
- Provide a dedicated, responsive, and searchable agronomic user manual route at `/dashboard/manual`.
- Deliver a 1-page printable tractor cabin reference sheet (`CabinReferenceSheet.tsx`) optimized for `@media print` with essential conversion factors (sacos, tambores, canecas, tablones) and field emergency protocols.
- Add `🚀 Invitado` to the compact role switcher in `src/app/dashboard/layout.tsx` for 1-click access to the ephemeral guest sandbox.
- Implement an interactive "Primeros Pasos en Agrotech" gamified checklist widget (`OnboardingChecklistWidget.tsx`) embedded on `/dashboard`, persisting completion across sessions via `localStorage`.
- Optimize mobile ergonomics and safe-area offsets for floating drawer buttons.

**Non-Goals:**
- Creating a separate CMS or external documentation backend; all manual chapters and guides are statically compiled and client-searchable with zero network latency.
- Modifying backend PostgreSQL schemas or altering the 252 existing automated tests.

## Decisions

### 1. Dedicated Route `/dashboard/manual` vs. Modal-Only Documentation
- **Decision**: Create a first-class route `/dashboard/manual` with deep-linking support for each chapter (`#productor`, `#tecnico`, `#maquinaria`, `#sar`, `#carbono`, `#iot`, `#admin`).
- **Rationale**: While floating modals (`HelpModal`, `IntentionsModal`) are ideal for quick hints, users and field agronomists need a bookmarkable, readable, and printable guide that doesn't obstruct active work.
- **Alternatives Considered**: Expanding the existing `HelpModal` or `DemoTourModal`. Rejected because reading lengthy machinery manuals inside a modal dialog degrades reading comfort.

### 2. Embedded Tractor Cabin Sheet Print Architecture
- **Decision**: Include a dedicated "Ficha de Cabina para Tractor" view within `/dashboard/manual` with `@media print` styling that automatically strips headers, footers, and sidebars, rendering a high-contrast black/white single-page format.
- **Rationale**: Venezuelan farmers frequently operate in remote areas without internet or power. A physical printed cheat-sheet in the tractor cabin with verified conversion units (sacos to kg, tambores to liters) ensures operational continuity.
- **Alternatives Considered**: Generating a server-side PDF with Puppeteer or ReportLab. Rejected to avoid heavy server dependencies and keep 100% client-side instant responsiveness.

### 3. Role Switcher 4-Way Segmented Control
- **Decision**: Update `src/app/dashboard/layout.tsx` to display a 4-button segmented control: `🚜 Prod`, `🌱 Agrón`, `🛡️ Admin`, `🚀 Demo`.
- **Rationale**: Demonstrates parity across all supported user personas and allows instant 1-click evaluation of the isolated ephemeral sandbox seeded with Turén and Calabozo parcel data.
- **Alternatives Considered**: Dropdown menu. Rejected because 1-click segmented buttons offer faster feedback and transparency for evaluators.

### 4. Interactive Onboarding Checklist with LocalStorage Persistence
- **Decision**: Build `OnboardingChecklistWidget.tsx` to track 4 core milestones:
  1. 🛰️ Explorar Visor WebGIS (`/dashboard/mapa`).
  2. 📍 Delimitar o Inspeccionar Parcela (`/dashboard/tierras`).
  3. 📡 Telemetría o Clima IoT (`/dashboard/iot`).
  4. 📖 Consultar Manual o Glosario (`/dashboard/manual`).
- **Rationale**: Gamified micro-progress bars (0% → 25% → 50% → 75% → 100%) motivate users to complete onboarding, while providing direct action triggers that take them straight to the corresponding feature.

## Risks / Trade-offs

- **[Risk]**: Hydration mismatch when reading `localStorage` for onboarding progress on initial server render.
  - **Mitigation**: Use a `useEffect` initialization pattern with default fallback state (`{ map: false, parcel: false, telemetry: false, manual: false }`) and a `mounted` flag before rendering interactive checkbox states.
- **[Risk]**: Mobile sidebar space constraints when adding a 4th role button (`🚀 Demo`).
  - **Mitigation**: Use compact icon + abbreviated label (`🚜 Prod`, `🌱 Agrón`, `🛡️ Admin`, `🚀 Demo`) with `font-size: 0.62rem` and flex-wrap tolerance.
- **[Risk]**: Print layout clipping on various paper sizes (Letter vs. A4).
  - **Mitigation**: Use percentage-based grid columns, compact margins (`@page { margin: 10mm; }`), and high-contrast typography in `CabinReferenceSheet.module.css`.
