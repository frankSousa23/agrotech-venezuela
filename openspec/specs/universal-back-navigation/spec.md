# universal-back-navigation Specification

## Purpose

Provides a standardized, touch-friendly back navigation component (`BackButton`) across application views to prevent user disorientation and dead-ends.

## Requirements

### Requirement: Reusable BackButton Component
The system SHALL provide a `BackButton` component with intelligent browser history detection (`router.back()`), a mandatory fallback URL (`fallbackHref`), touch target compliance (>= 40px), and clear descriptive text.

#### Scenario: Navigating back with active browser history
- **WHEN** user clicks the `BackButton` after navigating from another internal route
- **THEN** the system triggers `router.back()`, returning the user to their previous screen.

#### Scenario: Navigating back from direct deep-link or fresh tab
- **WHEN** user opens a URL directly and clicks `BackButton` where no prior internal history exists
- **THEN** the system navigates gracefully to the provided `fallbackHref`.

### Requirement: Contextual Back Navigation on Standalone Pages
The system SHALL render a prominent back navigation button on all standalone or un-nested screens (`/auth/login`, `/auth/register`, `/dashboard/arquitectura`, `/dashboard/postulacion`).

#### Scenario: Returning to Home from Login
- **WHEN** user is on `/auth/login` and clicks "Volver a Portada"
- **THEN** the browser navigates to `/` without submitting credentials.
