# Capability: Field Diary QA Suite

## Purpose

Validates that digital field logs, dosages, and harvest yield records maintain structured schema integrity and parcel associations.

## Requirements

### Requirement: Field Diary Agronomic Validation
The system SHALL validate that field log entries specify valid agronomic operation categories, non-negative dosages/yields, and associated parcel IDs.

#### Scenario: Validating Harvest Log Ingestion
- **WHEN** a harvest entry is recorded with a positive yield in Ton/ha
- **THEN** the system validates that `yieldTonHa` is greater than 0 and updates the parcel's chronological history.

#### Scenario: Filtering Logs by Operation Type
- **WHEN** user filters field logs by `ENCALADO` or `FERTILIZACION`
- **THEN** only entries matching the specified operation type are returned.
