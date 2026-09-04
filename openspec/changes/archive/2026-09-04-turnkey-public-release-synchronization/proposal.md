## Why

Agrotech Venezuela is preparing for its v1.0 public repository launch for teachers, university evaluators, MapBiomas Prize judges, developers, and agricultural producers. A comprehensive exploration revealed that while the core system is extremely solid (173 passing automated tests, zero TypeScript errors, 28 clean Next.js routes, resilient in-memory fallbacks), several critical synchronization gaps exist:
1. Key documentation files (`README.md`, `AGENTS.md`, `PITCH_DECK.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`) display outdated test metrics (stating 109, 144, 148, or 160 tests instead of the current 173 passing tests: 122 Jest + 51 Pytest).
2. `next.config.ts` enforces `Permissions-Policy: microphone=()`, which blocks browser Web Speech API voice dictation on HTTPS/production deployments.
3. `package.json` lacks an automated `"postinstall": "prisma generate"` script, creating friction if external cloners run `npm install` and immediately `npm run dev`.
4. The official MapBiomas Prize 2026 documents in `public/docs/` are only stored in Markdown, lacking direct PDF binary download assets for judges and evaluators who clone the repo.
5. The `README.md` and presentation assets do not yet reflect the recently implemented Zero-Barrier Farmer UX (Dual-Mode UI, 4 Puertas del Productor, Intentions Navigator, Colloquial Field Glossary, Multi-Guest Sandbox Isolation).

Resolving these issues now ensures a flawless, zero-friction, turnkey experience for anyone cloning, auditing, or deploying the repository.

## What Changes

- **Add `"postinstall": "prisma generate"` to `package.json`**: Guarantees the Prisma Client is generated immediately upon `npm install` without manual intervention.
- **Update `Permissions-Policy` in `next.config.ts`**: Allow `microphone=(self)` so native Web Speech API voice dictation operates securely on the origin without permission denial.
- **Deploy Official Award PDFs to `public/docs/`**: Provide compiled/official PDF files for the MapBiomas Prize 2026 dossier (Bases, Preguntas Frecuentes, Guía de Postulación, Formulario de Postulación, and Scientific Paper) with dual-format (.pdf and .md) download links on `/dashboard/postulacion`.
- **Synchronize Test Metrics to 173 Passing Tests**: Update badges, headers, and descriptions across `README.md`, `AGENTS.md`, `PITCH_DECK.md`, `ci.yml`, and `/dashboard/postulacion` to accurately reflect the verified 173 automated tests (122 Jest + 51 Pytest).
- **Synchronize `README.md` with Current System Capabilities**: Document the Zero-Barrier Farmer UX, Dual-Mode UI (`Modo Productor Fácil` vs `Modo Técnico`), 4 Puertas del Productor, Intentions Navigator, Native Voice Dictation, 1-Click Guest Sandbox isolation, and explicit zero-barrier local execution instructions.
- **Update `.env.example`**: Emphasize that all external API keys and databases are optional for local evaluation due to resilient in-memory and simulated geo-climatic fallbacks.

## Capabilities

### New Capabilities
*(None. All changes modify and synchronize existing capabilities).*

### Modified Capabilities
- `production-readiness-and-hygiene`: Add automated `postinstall` Prisma generation and explicit zero-barrier runtime fallback documentation for public evaluators.
- `api-security-and-defensive-headers`: Update `Permissions-Policy` to permit `microphone=(self)` alongside `geolocation=(self)` for Web Speech API voice input.
- `prize-publication-exporter`: Provide official binary PDF files alongside markdown files in `public/docs/` and dual download actions on `/dashboard/postulacion`.
- `system-status-synchronization`: Synchronize all metrics to 173 automated tests (122 Jest + 51 Pytest), 28 routes, and document Zero-Barrier Farmer UX and Guest Sandbox capabilities.

## Impact

- **Affected Code**: `package.json`, `next.config.ts`, `src/app/dashboard/postulacion/page.tsx`, `public/docs/`.
- **Documentation & CI**: `README.md`, `AGENTS.md`, `PITCH_DECK.md`, `.env.example`, `.github/workflows/ci.yml`.
- **APIs & Dependencies**: No breaking API changes; no new npm or python dependencies required.
- **Compatibility**: 100% backward-compatible. Enhances onboarding for external evaluators and unblocks voice dictation on production deployments.
