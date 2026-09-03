## MODIFIED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: 144 automated tests passing (93 Jest + 51 Pytest), 27 clean Next.js 16 routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials.

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified test metrics (144 tests passing, 27 routes).

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all 12 operational modules, explicitly including Module 12: "Laboratorio Agro-IoT de Micro-Cultivo & Riego Predictivo" (`/dashboard/iot`), the 5-step Guided Demo Tour (`DemoTourModal`), Universal Navigation (`BackButton`), and production Docker configurations (`.env.production.example`).

#### Scenario: Discovering System Capabilities from README
- **WHEN** a developer or stakeholder inspects `README.md`
- **THEN** the modules section details the 12 core capabilities including the Agro-IoT micro-crop laboratory and the 5-step Guided Demo Tour.
