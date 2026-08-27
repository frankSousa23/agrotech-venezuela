## Context

To provide rigorous, reproducible quality guarantees across all environments, we are expanding our test suite with 4 new dedicated Jest test suites covering Search/Omnibox, Routing Redirects, WCAG Contrast/Themes, and Native GIS Engine integrity.

## Goals / Non-Goals

**Goals:**
- Implement 4 new Jest test suites with 20+ automated assertions.
- Verify exact WCAG 2.1 AAA luminance ratios for Dark and Sunlight themes.
- Test routing aliases (`/mapa`, `/mapas`, `/docs`, `/swagger`).
- Verify search matching logic with accent normalization.
- Update `AGENTS.md` and `README.md` with the new test counts.

**Non-Goals:**
- Modifying production UI features (this is purely test suite expansion and validation).

## Decisions

### 1. Test Suite Partitioning
- `command-palette-and-search.test.ts`: Tests data search, diacritics removal (`normalize('NFD')`), crop searching, and keyboard shortcuts.
- `routing-and-redirects.test.ts`: Evaluates redirect table from `next.config.ts`.
- `theme-and-contrast.test.ts`: Uses standard W3C formula for relative luminance to verify contrast ratios.
- `native-gis-lifecycle.test.ts`: Tests state styling functions across all 7 layers (thematic, satellite, ph, rainfall, mapbiomas, sar, dark).
