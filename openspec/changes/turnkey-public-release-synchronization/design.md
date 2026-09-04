## Context

See `proposal.md` for motivation. The Agrotech Venezuela repository is entering its v1.0 public release phase. The architecture consists of a Next.js 16 WebGIS frontend, a Python FastAPI microservice, and a Streamlit prescription dashboard. Automated tests currently pass across 22 Jest suites (122 tests) and 17 Pytest modules (51 tests) totaling 173 tests, with 0 TypeScript compilation errors and 28 Turbopack production routes.

The technical design must resolve friction points in onboarding (package lifecycle hooks, security policy headers, official PDF document distribution, and cross-document metric consistency) without touching core agronomic algorithms.

## Goals / Non-Goals

**Goals:**
- Provide zero-friction `git clone` execution where running `npm install` automatically triggers `prisma generate` via `postinstall`.
- Ensure `Permissions-Policy` in `next.config.ts` explicitly allows `microphone=(self)` to prevent browser blocking of the native Web Speech API in production.
- Populate `public/docs/` with official PDF documents and provide dual-format (.pdf and .md) downloads on `/dashboard/postulacion`.
- Reconcile and unify all test metrics and capability descriptions across `README.md`, `AGENTS.md`, `PITCH_DECK.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion` to 173 tests.
- Maintain 100% test pass rate (173/173) and 0 TypeScript errors.

**Non-Goals:**
- Modifying underlying spatial Shoelace or SAR radar algorithms.
- Changing database schemas or altering existing API response contracts.
- Adding third-party PDF compilation server dependencies (documents are served statically from `public/docs/`).

## Decisions

### Decision 1: Use `package.json` `postinstall` hook for Prisma Client generation
- **Rationale**: External developers or CI workers who clone a project typically run `npm install` and then `npm run dev`. Without `postinstall`, if they forget `npx prisma generate`, `@prisma/client` types are missing in `node_modules`, causing build/dev friction.
- **Alternatives considered**:
  - *Keep `npx prisma generate` in `npm run build` only*: Leaves `npm run dev` prone to missing client on fresh clone.
  - *Pre-commit check*: Only protects contributors, not cloners.

### Decision 2: Configure `Permissions-Policy: microphone=(self)` in Next.js HTTP headers
- **Rationale**: Next.js defensive headers in `next.config.ts` had `microphone=()`, which completely disallows the microphone API across all origins. Changing to `microphone=(self)` strictly confines microphone access to the app's own origin, allowing Web Speech API speech-to-text dictation while keeping camera blocked (`camera=()`).
- **Alternatives considered**:
  - *Remove `Permissions-Policy` entirely*: Weakens browser security posture.
  - *Keep `microphone=()`*: Breaks the native voice assistant on HTTPS/production deployments.

### Decision 3: Dual-format distribution (PDF + Markdown) in `public/docs/`
- **Rationale**: Academic evaluators and prize judges require formal binary PDFs (such as the official MapBiomas Prize Rules, FAQs, submission guidelines, and scientific paper), while developers appreciate fast markdown previews in GitHub. Placing static PDFs directly in `public/docs/` makes them immediately downloadable without dynamic server-side rendering latency or extra dependencies.
- **Alternatives considered**:
  - *Dynamic PDF generation on request*: Adds heavy dependencies (`puppeteer` or `pdfkit`) and slows down response times.
  - *Markdown only*: Less formal for jury evaluation and postulation committees.

### Decision 4: Single-source numerical baseline of 173 passing tests
- **Rationale**: The verified suite contains 122 Jest frontend tests and 51 Pytest backend tests. Synchronizing this exact count across `README.md`, `AGENTS.md`, `PITCH_DECK.md`, `ci.yml`, and the `/dashboard/postulacion` UI eliminates confusion during public evaluation.

## Risks / Trade-offs

- **[Risk]** `npm install` runs `postinstall` which requires internet/binary access for Prisma engine binaries.
  → *Mitigation*: Prisma 5 engines download standard pre-compiled binaries for the target OS; if offline, Prisma uses its cached global engines.
- **[Risk]** PDF files in `public/docs/` increase Git repo size.
  → *Mitigation*: Official award PDFs are compact (< 2MB combined), well within Git recommendations and standard for documentation bundles.
