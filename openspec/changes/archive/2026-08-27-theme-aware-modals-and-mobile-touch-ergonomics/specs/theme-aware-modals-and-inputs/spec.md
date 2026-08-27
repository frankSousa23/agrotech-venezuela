## Purpose

Standardizes all modal dialogs and form inputs to dynamically adapt between Dark Glassmorphism and High-Contrast Sunlight themes using core CSS tokens.

## ADDED Requirements

### Requirement: Dynamic Theme Modals
The system SHALL style modal containers, inputs, labels, and action buttons using `var(--surface)`, `var(--surface-raised)`, `var(--text-main)`, and `var(--surface-border)`.

#### Scenario: Opening Soil Modal in Sunlight Mode
- **WHEN** user opens the Soil Sample creation modal while in Sunlight Mode
- **THEN** modal background renders solid white, inputs have light backgrounds with dark text, and labels have high-contrast styling.
