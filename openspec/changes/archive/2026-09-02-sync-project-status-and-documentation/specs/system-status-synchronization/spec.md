## Purpose

Ensures consistent, synchronized project metrics and capabilities across all documentation, guidelines, and technical UI surfaces of the Agrotech Venezuela platform.

## ADDED Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: 140 automated tests passing (89 Jest + 51 Pytest), 26 clean Next.js 16 routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials.

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified test metrics (140 tests passing, 26 routes).

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all major operational features: Universal Back Navigation (`BackButton`), Guided Demo Tour (`DemoTourModal`), Parcel Deep-Linking, and Docker production profiles (`.env.production.example`).

#### Scenario: Discovering System Capabilities from README
- **WHEN** a developer or stakeholder inspects `README.md`
- **THEN** the modules section includes the Guided Demo Tour, Universal Navigation, and Production Deployment instructions.
