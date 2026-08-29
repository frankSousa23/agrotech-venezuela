# Capability: Guest Persistence Banner

## Purpose

Displays visual status indicators and call-to-action prompts for guest sandbox users to preserve their farm telemetry permanently.

## Requirements

### Requirement: Guest Mode Indicator in Navigation Bar
The navigation header SHALL display a distinct "Modo Invitado / Sandbox" badge whenever the active session represents an ephemeral guest account.

#### Scenario: Visual Indication of Guest Session
- **WHEN** an unauthenticated or ephemeral guest navigates any dashboard page
- **THEN** the navigation bar displays an interactive amber badge indicating guest status and offering a 1-click link to the registration flow.

#### Scenario: Permanent Account Conversion Prompt
- **WHEN** a guest user creates a new parcel or adds a field log
- **THEN** the system SHALL display a toast or banner notifying the user that data is temporary in the sandbox and suggesting account registration.
