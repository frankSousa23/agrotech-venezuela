# lifecycle-safe-map-synchronizer Specification

## Purpose

Guarantees clean map lifecycle transitions, preventing `"Map container is already initialized"` errors and automatically adapting canvas dimensions via `ResizeObserver`.

## Requirements

### Requirement: Idempotent Instance Lifecycle
The system SHALL store the `L.Map` instance in a React ref, check for previous instances before creating a new map, and call `map.remove()` during unmount.

#### Scenario: Switching Between Dashboard Tabs
- **WHEN** user rapidly switches between `/dashboard/mapa` and `/dashboard/tierras`
- **THEN** previous map instances are cleanly disposed of and new maps initialize without memory leaks or collision errors.

### Requirement: Reactive Canvas Resize
The system SHALL attach a `ResizeObserver` to the map container element that triggers `map.invalidateSize()` whenever parent layout dimensions change.

#### Scenario: Resizing Browser or Iframe
- **WHEN** browser window is resized or mobile drawer expands
- **THEN** the map immediately redraws all tiles without grey gaps.
