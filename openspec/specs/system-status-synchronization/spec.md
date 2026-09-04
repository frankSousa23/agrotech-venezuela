# system-status-synchronization Specification

## Purpose

Ensures consistent, synchronized project metrics and capabilities across all documentation, guidelines, and technical UI surfaces of the Agrotech Venezuela platform.

## Requirements

### Requirement: Cross-System Metric Accuracy
The system and project documentation SHALL consistently reflect the verified quality metrics: 179 automated tests passing (128 Jest + 51 Pytest), 28 clean Next.js 16 routes, and 0 TypeScript compilation errors across all public-facing and in-app technical materials (`README.md`, `AGENTS.md`, `PITCH_DECK.md`, `.github/workflows/ci.yml`, and `/dashboard/postulacion`).

#### Scenario: Inspecting Project Verification Badges
- **WHEN** an evaluator reviews the README, Pitch Deck, or `/dashboard/postulacion`
- **THEN** all badges and text blocks show identical, verified test metrics (179 tests passing: 128 Jest + 51 Pytest, 28 routes, 0 TypeScript errors).

#### Scenario: Running Continuous Integration on GitHub Actions
- **WHEN** CI runs on pushes to `main`
- **THEN** the workflow execution titles and steps reflect 22 Jest test suites (128 tests) and 51 Pytest tests without outdated label numbers.

### Requirement: Complete Module Representation
The project overview (`README.md` and `PITCH_DECK.md`) SHALL document all core operational capabilities, explicitly including Module 12: "Laboratorio Agro-IoT de Micro-Cultivo & Riego Predictivo" (`/dashboard/iot`), the Zero-Barrier Farmer UX & Dual-Mode UI (`Modo Productor Fácil` vs `Modo Técnico`), the Intentions Navigator with native Voice Dictation, the 4-Door Field Dashboard with colloquial Venezuelan glossary, and the 1-Click Multi-Guest Isolated Sandbox.

#### Scenario: Discovering System Capabilities from README
- **WHEN** a developer, evaluator, or farmer inspects `README.md`
- **THEN** the documentation details the full scope of capabilities including both technical WebGIS/ML features and zero-barrier colloquial farmer accessibility features.
