## Context

See `proposal.md` for motivation and background. Antigravity audit verified that while backend and Next.js 16 routes operate at 100% functionality, specific CSS rules and container flex setups produce text clipping, multi-line button wrapping, and distorted micro-buttons across responsive viewports (specifically on 375px–420px mobile devices and 1280px–1366px laptop screens).

## Goals / Non-Goals

**Goals:**
- Guarantee 100% visual containment of text, badges, formulas, and action buttons across viewports from 360px up to 1920px.
- Prevent button text from breaking into unnatural single-syllable vertical lines.
- Preserve circular 18px geometry of the `AgroTooltip` "?" help button under all mobile media queries.
- Enable smooth horizontal touch scrolling for extensive mathematical formulas and IoT lab tabs without causing full-page viewport blowout.
- Ensure all parcel cards, crop advisor rankings, and mobile header bars fit within their card boundaries.

**Non-Goals:**
- Modifying agronomic algorithms, satellite pipelines, or backend API contracts.
- Redesigning color palettes or replacing the glassmorphism aesthetic.

## Decisions

### Decision 1: Scoped Touch Target Selectors vs. Blanket `button` Tag
- **Choice**: In `src/app/globals.css`, replace the blanket `button` selector under `@media (max-width: 640px)` with targeted CTA classes (`.btn-primary`, `.btn-secondary`, `.btn-accent`, `.actionBtn`, `form button[type="submit"]`), while explicitly enforcing `flex-shrink: 0; min-width: 18px !important; min-height: 18px !important; max-width: 18px; max-height: 18px; aspect-ratio: 1 / 1` on `.triggerBtn` in `AgroTooltip.module.css`.
- **Alternatives Considered**: Using CSS `all: unset` on micro-buttons (discarded as it breaks hover, border, and background styles).

### Decision 2: Mobile Topbar Element Hierarchy (< 420px)
- **Choice**: In `src/app/dashboard/layout.tsx` and `layout.module.css`:
  - Hide the verbose text label on `🎬 Tour Demo` in mobile viewports (displaying icon-only or routing it to the slide-out drawer).
  - Convert `Salir` to an icon-only button on screens `< 640px` (or keep full label only in drawer).
  - This reduces the right-side element footprint from ~284px to ~140px, fitting comfortably within 375px–390px screens alongside the logo and back button.
- **Alternatives Considered**: Hiding the topbar entirely on mobile (rejected because users need the hamburger toggle, theme switch, and back navigation).

### Decision 3: Mathematical Formula Container with Touch Scroll
- **Choice**: In `src/app/dashboard/postulacion/page.module.css`, equip `.scienceFormula` with:
  ```css
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  ```
- **Alternatives Considered**: Wrapping the formula across lines (rejected because breaking mathematical subscript and summation characters impairs scientific readability).

### Decision 4: Responsive Flex Wrapping and Grid Adaptation
- **Choice**:
  - In `tierras/page.module.css`: Add `flex-wrap: wrap; gap: 0.5rem;` to `.cardActions`, and `white-space: nowrap; flex-shrink: 0;` to `.areaBadge`.
  - In `recomendaciones/page.module.css`: Change `.cropsResultsGrid` from `repeat(2, 1fr)` to `repeat(auto-fit, minmax(240px, 1fr))` with `@media (max-width: 640px) { grid-template-columns: 1fr; }`.
  - In `page.module.css`: Adjust `.navLinks` gap to `0.85rem` and collapse nav links at `<= 1140px`.

## Risks / Trade-offs

- **[Risk] Touch targets too small if un-styled** → **Mitigation**: All primary interactive buttons, form selects, and inputs strictly retain 44px min-height for outdoor gloved-finger ergonomics.
- **[Risk] Horizontal formula scroll visibility** → **Mitigation**: Styled with subtle visual padding and scroll indicators so the user intuitively knows they can swipe horizontally.
