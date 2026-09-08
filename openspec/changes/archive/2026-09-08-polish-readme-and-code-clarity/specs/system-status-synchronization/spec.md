## MODIFIED Requirements

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities organized under an agile, non-redundant structure (< 150 lines in README), isolating technical environment setup into `DEVELOPING.md`, articulating capabilities via clear visual ASCII pipelines, and framing economic ROI and carbon accounting as algorithmic projection tools and simulated modeling scenarios.

#### Scenario: Discovering System Capabilities from README
- **WHEN** an evaluator, investor, or agricultural decision-maker inspects `README.md`
- **THEN** the document introduces Agrotech Venezuela through a concise, single-read overview with 3 core pillars, an ASCII pipeline diagram, turnkey 3-command execution, and direct author attribution without duplicate comparative tables.

#### Scenario: Consulting Developer and Engineering Documentation
- **WHEN** an engineer, DevOps contributor, or code auditor inspects the repository
- **THEN** `DEVELOPING.md` provides turnkey local setup, architecture diagrams with microservice ports (3000, 8000, 8501, 5444), Docker profiles, and automated testing suites without distracting non-technical readers.

#### Scenario: Running Automated Test Summary Report
- **WHEN** an evaluator or engineer runs `npm run test:summary`
- **THEN** the CLI outputs a clean, categorized breakdown of all 233 automated tests (179 Jest + 54 Pytest) by subsystem with validation descriptions.
