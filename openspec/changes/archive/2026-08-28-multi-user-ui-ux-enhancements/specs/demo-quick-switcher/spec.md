## Purpose

Provides a 1-click role switcher on the login screen to demonstrate Producer, Agronomist, Administrator, Pending Applicant, and Guest workflows without manual typing.

## ADDED Requirements

### Requirement: 1-Click Demo Account Quick Login
The login page SHALL render quick-access role buttons for pre-configured demonstration accounts (Producer, Agronomist, Admin, Pending Applicant, and Ephemeral Guest).

#### Scenario: Switching to Agronomist Demo Account
- **WHEN** user clicks the "Ing. Agrónomo (Demo)" button on the login screen
- **THEN** the system SHALL automatically authenticate the user with `agronomo@agrotech.ve` credentials, redirect to the dashboard, and configure the active session with the AGRONOMIST role.

#### Scenario: Switching to Admin Demo Account
- **WHEN** user clicks the "Administrador (Demo)" button
- **THEN** the system SHALL authenticate as `admin@agrotech.ve` with full administrative privileges.
