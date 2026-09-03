# user-roles-and-permissions Specification

## Purpose

Provides comprehensive role-based access control (RBAC), administrative route guards, server-side API protection, and rapid role-switching utilities with isolated ephemeral sandboxes for seamless multi-profile validation.

## Requirements

### Requirement: Administrative Route Guard
The system SHALL restrict access to `/dashboard/admin` and its backend administrative APIs (`/api/admin/users`) exclusively to users with the `ADMIN` role, verifying cryptographic Bearer tokens on the server and rendering an access-denied fallback banner for unauthorized clients.

#### Scenario: Non-Admin Access Attempt
- **WHEN** an authenticated user with role `FARMER` or `AGRONOMIST` navigates to `/dashboard/admin`
- **THEN** the system displays a friendly "Acceso Restringido - Solo Administradores" card with a button to return to `/dashboard`.

#### Scenario: Admin Access Granted
- **WHEN** an authenticated user with role `ADMIN` navigates to `/dashboard/admin`
- **THEN** the administration dashboard with user approvals and system telemetry is displayed normally.

#### Scenario: Server-Side API Admin Protection
- **WHEN** any unauthenticated client or non-ADMIN user sends a GET or PATCH request to `/api/admin/users`
- **THEN** the API returns HTTP 401 Unauthorized when no valid Bearer token is provided, or HTTP 403 Forbidden if the token does not possess the ADMIN role, preventing any data leakage.

### Requirement: Interactive Demo Role Switcher
The user profile interface SHALL allow instantaneous 1-click switching between demo roles (`FARMER`, `AGRONOMIST`, `ADMIN`, `GUEST`) to facilitate end-to-end evaluation of role-specific workflows.

#### Scenario: Switching to Agronomist Role
- **WHEN** user selects the "Ing. Agrónomo" role from the profile quick switcher
- **THEN** session state immediately updates, displaying Agronomist diagnostic badges and authorized operational views.

### Requirement: Isolated Ephemeral Guest Sandbox
The system SHALL isolate every guest user into an independent, ephemeral namespace seeded with demo data (Turén corn parcel and Calabozo rice parcel) upon session creation, ensuring that multiple concurrent guests cannot see or mutate each other's data and cannot inspect genuine production records.

#### Scenario: Concurrent Guest Sessions Isolation
- **WHEN** multiple users access the platform in Guest mode concurrently
- **THEN** each user receives a unique ephemeral guest session identifier and token (`usr-guest-*`) with isolated in-memory or client-side storage, ensuring session stability and data segregation.

#### Scenario: Blocking Guest Access to Real Producer Data
- **WHEN** a guest user queries `/api/parcels`, `/api/field-logs`, or attempts to access administrative records
- **THEN** the API serves strictly their own seeded sample parcels and blocks access to genuine producer accounts and sensitive database records.
