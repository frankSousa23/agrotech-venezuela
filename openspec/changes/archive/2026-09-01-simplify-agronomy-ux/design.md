## Context

See proposal.md for motivation. We need to implement a global dark mode and reorganize the UI to follow agronomic logic without losing the existing capabilities. The current `SunlightThemeToggle.tsx` handles only binary states (normal vs sunlight) and is not persistent across all screens natively. 

## Goals / Non-Goals

**Goals:**
- Implement a 3-state global theme system: Default (Light), Dark Mode, and Sunlight Mode.
- Refactor `DashboardLayout` sidebar into grouped categories.
- Ensure views like `recomendaciones` and `bitacora` gracefully block access if no parcel exists.

**Non-Goals:**
- Removing advanced views (Arquitectura, Geoestadísticas) entirely; they will just be moved to a secondary "Herramientas Avanzadas" group.
- Rewriting the backend API; this is purely a frontend UX/UI refactor.

## Decisions

1. **Global Theme State via Next.js HTML Data Attribute**:
   - We will use `data-theme` attribute on the `<body>` or `<html>` tag to allow CSS variables to override across the entire application instantly.
   - Alternatives considered: React Context (too much boilerplate, can cause hydration mismatches), CSS Media Queries (doesn't allow manual overrides).

2. **Refactoring Sidebar into Sections**:
   - Instead of a flat list, we will map navigation items into predefined groups: `Fase 1: Mi Terreno`, `Fase 2: Diagnóstico`, `Fase 3: Operación`, and `Herramientas Avanzadas`.
   - The labels will be hardcoded strings in the `NAV_ITEMS` array mapped to the new friendly names.

3. **Empty States Interception**:
   - We will fetch `parcels` on `recomendaciones` and `bitacora`. If length is 0, we render `EmptyStateCard` instead of the main component body.

## Risks / Trade-offs

- [Hydration Mismatch Risk] → Since theme might be read from `localStorage`, Next.js SSR might render Light mode before client switches to Dark. Mitigation: Use a lightweight inline script in the root layout to set the `data-theme` attribute before React hydrates.
- [Mobile Usability] → Re-grouping might make the sidebar taller. Mitigation: Ensure the mobile menu has smooth scrolling and collapsible sections if needed (though the list is short enough to just group visually).
