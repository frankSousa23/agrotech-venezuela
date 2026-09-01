## Context

See `proposal.md – Why` for motivation. The current multi-level map viewer (`MultiLevelMapViewer.tsx`) exposes the draw tool only at Nivel 3 of a 3-step hierarchy with no in-UI guidance. The draw state is managed entirely in local component state (`isDrawing`, `drawnPoints`, `parcelName`). The Recomendaciones page already reads `?state` and `?ph` via `useSearchParams` but ignores `soilTexture` and `crop`. No link from the map's save success to downstream views currently exists.

## Goals / Non-Goals

**Goals:**
- Add a zero-new-dependency tutorial layer on top of existing components
- Wire parcel save to downstream navigation via query params only (no new APIs)
- Ensure clean state reset so the map canvas is always trustworthy after clear
- Keep all changes isolated to a small number of files with no schema migrations

**Non-Goals:**
- Real-time multi-user parcel sharing
- Server-side parcel context hydration (query params are sufficient)
- Changes to the parcel data model or `/api/parcels` schema
- Modifying the backend FastAPI service

## Decisions

### 1. Tutorial banner rendered in `MultiLevelMapViewer` local state only

**Decision**: The tutorial banner is a local UI component inside `MultiLevelMapViewer.tsx`, collapsed via a `showTutorial` useState boolean. Dismiss state is stored in `localStorage` under key `agrotech-map-tutorial-dismissed` and read in `useEffect` on mount.

**Why**: No backend call needed; agronomists work on the same browser repeatedly. Avoids adding a new API route or persisting a trivial UI preference to the database.

**Alternative considered**: User preferences table in Prisma. Rejected — too heavy for a one-off dismiss.

---

### 2. Intent detected via `?intent=draw` query param, not a new route

**Decision**: `MapaContent` reads `searchParams.get('intent')`. If `'draw'`, `initialMode` is forced to `'multilevel'` regardless of the `?mode` param.

**Why**: Preserves backwards compatibility with existing links (`/dashboard/mapa`, `/dashboard/mapa?mode=multilevel`). No router changes needed.

---

### 3. Post-save navigation via query params (no global state)

**Decision**: On successful `POST /api/parcels`, the success panel builds the Recomendaciones URL inline:
```
/dashboard/recomendaciones?state=<stateId>&ph=<ph>&soilTexture=<texture>&crop=<crop>
```
`RecomendacionesContent` reads these via `useSearchParams` (it already does this for `?state` and `?ph`) and initialises `simTexture` and `simTexture` from the new params.

**Why**: No global state store (Zustand/Context) is needed. The Recomendaciones page already uses `useSearchParams`; extending it is a one-liner per param.

**Alternative considered**: React Context or localStorage for parcel handoff. Rejected — query params are shareable, bookmarkable, and require no cleanup.

---

### 4. Level breadcrumb as a simple inline component inside the panel

**Decision**: A small inline `LevelBreadcrumb` sub-component (defined in the same file as `MultiLevelMapViewer`) renders the three steps with conditional ✓ / active / locked states based on `currentLevel`.

**Why**: Avoids adding a new file for a trivial stateless UI. The component does not need props other than `currentLevel`.

---

### 5. Dashboard Step 2 link updated with `?mode=multilevel&intent=draw`

**Decision**: In `src/app/dashboard/page.tsx`, the Step 2 link changes from `/dashboard/mapa` to `/dashboard/mapa?mode=multilevel&intent=draw`.

**Why**: Minimal change. No logic change in the dashboard page; the entire routing intent is encoded in the URL.

## Risks / Trade-offs

- **Query param URL length**: Adding four params keeps URLs well under browser limits (~200 chars). No risk.
- **soilTexture param collisions**: Texture values contain spaces (e.g., "Franco-limoso"). These will be `encodeURIComponent`-encoded by `Link href` automatically. The receiving page must decode via `searchParams.get('soilTexture')` which Next.js handles natively.
- **Stale tutorial localStorage key**: If the key name changes in a future release, old users will see the banner again once. Acceptable.
- **Map opens at Turén by default (Nivel 3)**: Not addressed in this change — the map always centres on the municipality the user selects in Nivel 2, which is the correct behaviour. The default municipality on load is Turén only until the user clicks through the hierarchy.

## Migration Plan

1. No database migrations required.
2. No new npm dependencies.
3. Changes are purely additive UI — existing functionality is preserved.
4. Rollback: revert the three modified files; no data cleanup needed.

## Open Questions

None. All design decisions are resolved.
