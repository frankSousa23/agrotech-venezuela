## MODIFIED Requirements

### Requirement: Mandatory Parcel Gateway
The system SHALL detect if a user has zero defined parcels when navigating to data-dependent views (e.g., IA Recommendations). The empty state action link SHALL include any available parcel context as query params when forwarding the user back to the map.

#### Scenario: Navigating without parcels
- **WHEN** a user with no parcels visits the IA Recommendations page
- **THEN** the system displays a friendly empty state card explaining that a parcel is required, with a primary action button linking directly to `/dashboard/mapa?mode=multilevel&intent=draw`

## ADDED Requirements

### Requirement: Query Param Pre-Population from Saved Parcel
The Recomendaciones page SHALL accept `?state`, `?ph`, `?soilTexture`, and `?crop` query parameters and use them to initialise the simulator inputs.

#### Scenario: User arrives via parcel save handoff
- **WHEN** the page loads with `?state=portuguesa&ph=6.2&soilTexture=Franco&crop=Maíz Blanco`
- **THEN** the state selector is set to "portuguesa", the pH slider to 6.2, the texture selector to "Franco", and the top recommended crop defaults to "Maíz Blanco" without requiring any manual interaction
