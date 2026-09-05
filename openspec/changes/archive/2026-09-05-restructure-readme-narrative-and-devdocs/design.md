## Context

See `proposal.md` for motivation. Currently, `README.md` contains 254 lines interweaving high-level agricultural impact with low-level deployment instructions, port bindings (3000, 8000, 8501, 5444), Docker profiles, and testing commands. Evaluators and investors face technical cognitive overload, while developers must parse through agricultural domain context to find execution commands.

## Goals / Non-Goals

**Goals:**
- Create `DEVELOPING.md` as the dedicated developer hub containing local installation, Docker profiles, microservice architecture diagrams, testing suites, and environment variable documentation.
- Refactor `README.md` to be impact-first, structuring capabilities around the 3-pillar farmer journey (*Accesibilidad y Adopción Rural*, *Inteligencia Agronómica y Observación Satelital*, *Sostenibilidad, Retorno Económico y Validación Institucional*).
- Formulate each core capability as *Technical Feature + Agricultural Problem Solved = Tangible Yield/Field Benefit*.
- Update test metrics across documents to 182 verified passing tests (130 Jest + 52 Pytest).

**Non-Goals:**
- Changing application source code, API routes, or React components.
- Modifying automated test suites or altering database schemas.

## Decisions

### Decision 1: Create DEVELOPING.md as the Canonical Developer Guide
- **Choice**: Extract all deployment, microservices architecture, Docker Compose, and testing commands into `DEVELOPING.md`.
- **Rationale**: Follows standard open-source conventions (like Next.js or Supabase), keeping the repository landing page focused on product value while giving engineers an immediate, deep technical reference.
- **Alternatives Considered**: 
  - Keeping everything in `README.md` with collapsible `<details>` blocks: Still creates visual clutter and fails to solve the audience dichotomy.
  - Using `ARCHITECTURE.md` instead of `DEVELOPING.md`: While architecture is included, developers primarily need to run and test the system locally, making `DEVELOPING.md` a more comprehensive title.

### Decision 2: 3-Pillar Farmer Journey Modular Taxonomy
- **Choice**: Group the 16 operational modules into 3 narrative pillars:
  1. *Pilar I: Accesibilidad y Adopción Rural (Cero Barrera de Entrada)*
  2. *Pilar II: Inteligencia Agronómica y Observación Satelital Sin Nubes*
  3. *Pilar III: Sostenibilidad, Retorno Económico y Validación Institucional*
- **Rationale**: Replaces an uninviting flat list of 16 items with a coherent story that demonstrates how a Venezuelan producer discovers, monitors, and monetizes their crop.

### Decision 3: Strict Value Translation Formula
- **Choice**: Present technical features through the lens of: *Capacidad Técnica + Problema Agrícola Real = Beneficio Tangible Directo*.
- **Rationale**: Demonstrates to juries, prize committees (MapBiomas 2026), and non-technical stakeholders that complex capabilities (SAR Banda C, GDD, Shoelace WGS84, IndexedDB PWA) exist to solve concrete field emergencies (cloud cover in rainy season, crop failure from mistimed planting, lack of rural connectivity).

## Risks / Trade-offs

- **[Risk]** Developers cloning the repo might miss the deployment commands if they only glance at the README.
  - **Mitigation**: Place a prominent banner and callout box at the top of `README.md` with a direct link to `DEVELOPING.md`, plus an immediate 1-click sandbox access section.
