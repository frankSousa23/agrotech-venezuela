## Purpose

Provides comprehensive role-based access control (RBAC), administrative route guards, and rapid role-switching utilities for seamless multi-profile validation.

## ADDED Requirements

### Requirement: Administrative Route Guard
The system SHALL restrict access to `/dashboard/admin` exclusively to users with the `ADMIN` role, rendering an access-denied fallback banner for unauthorized roles without breaking application state.

#### Scenario: Non-Admin Access Attempt
- **WHEN** an authenticated user with role `FARMER` or `AGRONOMIST` navigates to `/dashboard/admin`
- **THEN** the system displays a friendly "Acceso Restringido - Solo Administradores" card with a button to return to `/dashboard`.

#### Scenario: Admin Access Granted
- **WHEN** an authenticated user with role `ADMIN` navigates to `/dashboard/admin`
- **THEN** the administration dashboard with user approvals and system telemetry is displayed normally.

### Requirement: Interactive Demo Role Switcher
The user profile interface SHALL allow instantaneous 1-click switching between demo roles (`FARMER`, `AGRONOMIST`, `ADMIN`, `GUEST`) to facilitate end-to-end evaluation of role-specific workflows.

#### Scenario: Switching to Agronomist Role
- **WHEN** user selects the "Ing. Agrónomo" role from the profile quick switcher
- **THEN** session state immediately updates, displaying Agronomist diagnostic badges and authorized operational views.
