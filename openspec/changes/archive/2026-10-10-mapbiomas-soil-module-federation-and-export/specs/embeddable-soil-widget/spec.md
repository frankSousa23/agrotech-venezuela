# Spec Delta

## Purpose

Provides a standalone, zero-shell embeddable microfrontend designed to be embedded via iframe or web component in external web portals such as MapBiomas Venezuela, featuring theme awareness and bidirectional postMessage synchronization.

## ADDED Requirements

### Requirement: Standalone Zero-Shell Embed Page
The system SHALL provide route `/embed/soil-module` rendering a dedicated soil diagnostic view without application shell headers, navigation sidebars, or footer elements.

#### Scenario: Loading embed view with coordinates
- **WHEN** an external portal loads `/embed/soil-module?lat=9.324&lon=-69.112&theme=dark`
- **THEN** system renders a compact glassmorphic soil diagnosis card with dark theme styling displaying texture, pH status, PAW percentage, and lime requirement.

### Requirement: Bidirectional postMessage Protocol
The embeddable soil widget SHALL listen for inbound `postMessage` coordinate update events from the parent window and dispatch diagnostic completion events.

#### Scenario: Parent window coordinate update
- **WHEN** the host window posts `{ type: 'SET_LOCATION', coords: { lat: 9.324, lon: -69.112 } }`
- **THEN** the widget recalculates the soil profile for the specified location and dispatches an event to the host window with the updated diagnostic payload.
