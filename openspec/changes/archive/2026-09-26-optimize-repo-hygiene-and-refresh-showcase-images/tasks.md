# Tasks

## 1. Repository Hygiene & Dead Asset Purge

- [x] 1.1 Purge unreferenced duplicate images `docs/flujo_inteligencia_agricola.jpg` and `public/images/flujo_inteligencia_agricola.jpg`, and verify with `git status` that only `public/images/flujo_inteligencia_agricola.png` remains.
- [x] 1.2 Untrack `slides_png/` from Git tracking (`git rm -r --cached slides_png`) while preserving local directory and verify untracked state in Git.
- [x] 1.3 Update `.gitignore` with `slides_png/`, `*.webm`, `*.mov`, `*.tmp`, and `*.bak` rules, and verify that `git status` reports clean ignore status.

## 2. Refresh Showcase Screenshots & Visual Documentation

- [x] 2.1 Refresh `docs/images/showcase/06_perfil_postulacion_mapbiomas.png` with clean high-resolution capture reflecting 278 automated passing tests, `Criterios Oficiales Anexo II`, and zero development overlay error badges.
- [x] 2.2 Refresh `docs/images/showcase/01_webgis_3_niveles.png` with clean capture showing the complete sidebar navigation hierarchy including `Manual & Guías`.
- [x] 2.3 Refresh `docs/images/showcase/03_retorno_inversion_costeo.png` with clean capture devoid of Next.js development overlay badges.
- [x] 2.4 Verify all 6 showcase images in `docs/images/showcase/` exist, render cleanly, and are correctly linked without broken links in `README.md` and `docs/SHOWCASE.md`.

## 3. Frontend Image Loading & Performance

- [x] 3.1 Add `loading="lazy"` and `decoding="async"` attributes to the static precision agriculture workflow infographic image in `src/app/dashboard/postulacion/page.tsx` and verify JSX compilation.

## 4. Verification & Validation Audit

- [x] 4.1 Run full Jest frontend test suite (`npm test`) and verify 224/224 tests pass across 33 suites.
- [x] 4.2 Run Pytest backend test suite (`npm run test:backend`) and verify 54/54 tests pass across 17 modules.
- [x] 4.3 Run TypeScript typecheck (`npm run typecheck`) and verify 0 compilation errors.
- [x] 4.4 Run Next.js 16 production build (`npm run build`) and verify all 32 routes compile cleanly.
