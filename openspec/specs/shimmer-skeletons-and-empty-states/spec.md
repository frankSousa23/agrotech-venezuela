# shimmer-skeletons-and-empty-states Specification

## Purpose

Replaces abrupt loading states with animated shimmering skeletons and provides illustrated, action-oriented empty states for first-time farm onboarding.

## Requirements

### Requirement: Shimmer Skeleton Placeholders
The system SHALL display smooth CSS shimmer placeholders while fetching parcels, logs, or soil recommendations.

#### Scenario: Loading Parcels in Mis Tierras
- **WHEN** the parcels list is fetching data from the API
- **THEN** shimmer cards mimicking the parcel card dimensions are rendered without causing layout shift.

### Requirement: Actionable Empty States
The system SHALL display guided 3-step onboarding cards when lists (parcels, diary logs) contain zero items.

#### Scenario: Empty Farm Parcel List
- **WHEN** user has no registered parcels
- **THEN** an empty state card appears with an illustrated badge and a primary action button to delimit the first parcel.
