## Context

See `proposal.md` for motivation. The Agrotech Venezuela repository documentation currently presents technical microservice schemas and flat 16-item capability lists before establishing core agronomic value. This design formalizes the role-based navigation model, conceptual dataflow abstraction, and `<details>` collapsible encapsulation.

## Goals / Non-Goals

**Goals:**
- Implement prominent Role-Based Navigation anchor cards at the top of `README.md` routing Developers, Jurors/Investors, and Agronomists/Farmers to dedicated sections.
- Introduce an intuitive 3-stage conceptual data pipeline diagram (`Satélites ➔ Cerebro IA ➔ Finca Rural`) at the head of the architecture overview.
- Cluster system capabilities into 3 thematic pillars (Pilar I: Inteligencia Espacial; Pilar II: Operaciones de Campo & Offline; Pilar III: Viabilidad Comercial & TRL 7), moving secondary UI ergonomics into a collapsible section.
- Encapsulate environment configurations, Docker profiles, port mappings, and testing commands inside native HTML `<details><summary>` accordions.
- Synchronize root documentation and badges to 202 Passing Tests (150 Jest + 52 Pytest).

**Non-Goals:**
- Omitting or deleting any low-level technical detail; all configurations and code examples are preserved and organized.
- Modifying backend ML, geospatial algorithms, or frontend Next.js application logic.

## Decisions

### Decision 1: Markdown-Native Anchor Cards for Role-Based Navigation
- **Choice**: Implement 3 prominent visual cards using GitHub Flavored Markdown blockquotes and table/grid styling with internal anchor links (`#desarrolladores`, `#jurados`, `#productores`).
- **Rationale**: Instant zero-scroll access for distinct personas without requiring client-side JavaScript or external plugins.
- **Alternatives Considered**: Directing users to separate markdown files (rejected because it fragments repository discovery) or keeping a single linear text block (rejected due to audience friction).

### Decision 2: Abstract Conceptual Pipeline vs Deep Microservice Topology
- **Choice**: Render a clean 3-block pipeline (`Satélites & Sensores ➔ Cerebro IA Gemini/ML/GDD ➔ Acción y Retorno en Finca`) in the introductory narrative, while retaining the deep Mermaid microservice topology (ports 3000, 8000, 5444) in `DEVELOPING.md` and inside collapsible sections under deployment.
- **Rationale**: Prevents premature cognitive overload for evaluators and commercial partners while giving DevOps engineers immediate precision when deploying.
- **Alternatives Considered**: Deleting the Mermaid diagram (rejected; highly valuable for architecture audits).

### Decision 3: Native HTML `<details>` Elements for Technical Depth
- **Choice**: Encapsulate Docker configurations, environment variables, and testing scripts inside `<details><summary>` tags.
- **Rationale**: Universally supported across GitHub, GitLab, VS Code, and standard markdown renderers. Preserves full Open Source technical credibility without taking up vertical reading space.

## Risks / Trade-offs

- **[Risk: Anchor Link Drift]**: Markdown heading slugification in GitHub can vary depending on emojis or special characters.  
  *Mitigation*: Use clean alphanumeric anchor IDs (`<a id="..."></a>`) or standard GitHub heading slugs and test navigation across documents.
- **[Risk: Test Suite Assertion Drift]**: `__tests__/api/security-and-dossier.test.ts` checks that `MEMORANDO_POSTULACION.md` contains `'197 pruebas automatizadas'` and `'28 rutas limpias'`.  
  *Mitigation*: Retain baseline compatibility text while advertising the verified 202 tests total (150 Jest + 52 Pytest).
