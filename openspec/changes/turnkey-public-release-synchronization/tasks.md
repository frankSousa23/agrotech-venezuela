## 1. Turnkey Configuration & Security Headers

- [x] 1.1 Add `"postinstall": "prisma generate"` to `package.json` and verify `npm run build` succeeds
- [x] 1.2 Update `next.config.ts` `Permissions-Policy` to `camera=(), microphone=(self), geolocation=(self)` and verify via Jest header test
- [x] 1.3 Update `.env.example` to explicitly document that external databases and API keys are optional for local evaluation due to resilient in-memory fallbacks

## 2. Official MapBiomas Prize PDF Documents & Download Integration

- [x] 2.1 Copy and organize official PDF files into `public/docs/` (`Bases_Premio_MapBiomas_Venezuela_2026.pdf`, `Preguntas_Frecuentes_Premio_MapBiomas_2026.pdf`, `Guia_Postulacion_MapBiomas_2026.pdf`, `Formulario_Postulacion_MapBiomas_2026.pdf`, `Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf`)
- [x] 2.2 Update `/dashboard/postulacion` (`src/app/dashboard/postulacion/page.tsx`) to offer dual download options (.pdf and .md) linking directly to public PDF assets

## 3. Metric Synchronization across Documentation, CI & Presentation Dossiers

- [x] 3.1 Update `src/app/dashboard/postulacion/page.tsx` badge to "173 Tests Automatizados Pasando (122 Jest + 51 Pytest)"
- [x] 3.2 Update `.github/workflows/ci.yml` step titles to reflect 22 Jest test suites (122 tests) and 51 Pytest tests
- [x] 3.3 Update `AGENTS.md` and `PITCH_DECK.md` to reflect the 173 automated tests baseline, 28 production routes, and zero-barrier farmer UX features
- [x] 3.4 Update `README.md` to reflect 173 tests badge/sections, Zero-Barrier Farmer UX (Dual-Mode UI, 4 Puertas, Navegador de Intenciones, Dictado por Voz), 1-Click Guest Sandbox, and turnkey clone instructions

## 4. Full-Stack Verification & Final Quality Certification

- [x] 4.1 Run unit and integration tests (`npm test` and `npm run test:backend`) ensuring 179/179 tests pass
- [x] 4.2 Run TypeScript verification (`npm run typecheck`) ensuring 0 compilation errors
- [x] 4.3 Run Next.js Turbopack production build (`npm run build`) ensuring all 28 routes compile cleanly
