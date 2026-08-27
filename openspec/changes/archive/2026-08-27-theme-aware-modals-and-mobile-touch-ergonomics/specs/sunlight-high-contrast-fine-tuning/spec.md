## Purpose

Guarantees full WCAG 2.1 AAA contrast compliance across all application screens when Daylight Sunlight Mode is active.

## ADDED Requirements

### Requirement: Global Sunlight Mode High Contrast
The system SHALL apply dark high-contrast typography (`#0f172a`), solid borders (`#94a3b8` / `#cbd5e1`), and clean card backgrounds when `[data-theme="sunlight"]` is active.

#### Scenario: Navigating Data Tables in Sunlight Mode
- **WHEN** user views soil tables or farm logs under sunlight
- **THEN** table cells and headers display dark text against light rows with clear grid lines.
