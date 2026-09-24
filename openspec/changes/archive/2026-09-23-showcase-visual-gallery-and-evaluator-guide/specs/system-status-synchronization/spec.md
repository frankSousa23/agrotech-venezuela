# Spec Delta

## MODIFIED Requirements

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities organized under an agile, non-redundant structure, isolating technical environment setup into `DEVELOPING.md`, articulating capabilities via clear visual ASCII pipelines and embedded official infographics, and framing economic ROI and carbon accounting as algorithmic projection tools and simulated modeling scenarios. The README SHALL explicitly feature:
1. The **interactive agronomic manual** (`/dashboard/manual`) with role-based content filtering.
2. The **printable tractor cabin reference sheet** as part of the Rural Inclusion pillar.
3. The **5-stage data workflow infographic**.
4. The **visual platform showcase gallery** linking to `docs/SHOWCASE.md`.
5. The **1-click direct access table** for in-browser reading of the 7 compiled official MapBiomas Prize PDFs in `docs/mapbiomas_premio_2026/`.
6. The **fast-track Evaluator Rubric Guide** (`docs/GUIA_EVALUADOR.md`) mapped to the 7 official award criteria.
7. A **collapsible automated test summary breakdown** displaying the categorized execution results of all 278 automated tests.
8. Prominent technical framing of **Sentinel-1 SAR C-Band radar (5.405 GHz VV/VH)** for overcoming the tropical cloud barrier (>75% cloud cover during the commercial rainy season) across Venezuelan agricultural lowlands.

#### Scenario: Discovering System Capabilities from README
- **WHEN** an evaluator, investor, or agricultural decision-maker inspects `README.md`
- **THEN** the document introduces Agrotech Venezuela through a concise overview that includes the visual showcase gallery, the 1-click PDF access table, the evaluator rubric guide, the interactive agronomic manual, the 5-stage data lifecycle infographic, and the smallholder vs mechanized costing profiles among the platform's key features.

#### Scenario: Consulting Developer and Engineering Documentation
- **WHEN** an engineer, DevOps contributor, or code auditor inspects the repository
- **THEN** `DEVELOPING.md` provides turnkey local setup, architecture diagrams with microservice ports (3000, 8000, 8501, 5444), Docker profiles, and automated testing suites reflecting **278 tests passing (224 Jest in 33 suites + 54 Pytest)** without distracting non-technical readers.

#### Scenario: Running Automated Test Summary Report
- **WHEN** an evaluator or engineer runs `npm run test:summary`
- **THEN** the CLI outputs a clean, categorized breakdown of all **278 automated tests (224 Jest across 33 suites + 54 Pytest across 17 modules)** and 32 production routes by subsystem with validation descriptions, explicitly listing `roiCostEngine.test.ts` and `ImpactRoiWidget.test.ts`.

#### Scenario: Reviewing Test Verification Without Local Execution
- **WHEN** an evaluator inspects the testing section of `README.md` on GitHub
- **THEN** an expandable details block displays the full categorized summary of all 278 passing automated tests without requiring the visitor to clone the repo or run Jest/Pytest.
