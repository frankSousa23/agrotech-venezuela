# user-roles-and-permissions Specification

## Purpose

Provides comprehensive role-based access control (RBAC), administrative route guards, server-side API protection, rapid role-switching utilities with isolated ephemeral sandboxes, and role-adaptive cartographic ergonomics for seamless multi-profile validation.

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

### Requirement: Role-Adaptive Cartographic and UI Ergonomics
The platform interface and WebGIS viewers SHALL adapt their display density, vocabulary, and interactive tool availability dynamically based on the active user role (`FARMER`, `AGRONOMIST`/`TECH`, `AUDITOR`/`JURY`, `ADMIN`, `GUEST`), maintaining consistent role-adapted capabilities across both the primary WebGIS explorer (`/dashboard/mapa`) and embedded dashboard viewers.

#### Scenario: Farmer Role Experience
- **WHEN** user is logged in with `FARMER` role or operates in *Modo Productor Fácil*
- **THEN** the map and parcel controls SHALL prioritize large touch targets (minimum 44px), 1-click automatic preset boundaries ("Tablón Auto"), vernacular terminology (sacos, tablones), and direct voice-assistance handoff.

#### Scenario: Agronomist / Technical Role Experience
- **WHEN** user is logged in with `AGRONOMIST` or `TECH` role
- **THEN** the map SHALL expose advanced telemetry tools, Sentinel-1 SAR dual-polarization cross-validation layers, Kamprath soil chemistry dosers, and ESRI Shapefile/KML precision machinery export dialogs.

#### Scenario: Auditor / Jury Role Experience
- **WHEN** an evaluator or juror audits the platform
- **THEN** the interface SHALL provide direct links to the certified 252-test matrix, TRL 4 software prototype dossier, OpenAPI Swagger explorer, and MapBiomas CC BY 4.0 data compliance certifications.

#### Scenario: Role Parity Across Map Viewers
- **WHEN** a user switches role (e.g. from FARMER to TECH) while inspecting any map view
- **THEN** all map controls, layer toolbars, and contextual diagnostic badges SHALL update reactively to match the active role's operational scope without page reloads.
