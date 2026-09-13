## MODIFIED Requirements

### Requirement: Interactive Demo Role Switcher
The user profile interface and main navigation sidebar SHALL allow instantaneous 1-click switching between demo roles (`FARMER`, `AGRONOMIST`, `ADMIN`, `GUEST`) with permanent visual indicators and state persistence to facilitate end-to-end evaluation of role-specific workflows from any view.

#### Scenario: Switching to Agronomist Role
- **WHEN** user selects the "Ing. Agrónomo" role from the profile quick switcher or sidebar
- **THEN** session state immediately updates, displaying Agronomist diagnostic badges and authorized operational views.

#### Scenario: Switching to Guest Role from Compact Sidebar Switcher
- **WHEN** user clicks the "🚀 Invitado" button in the compact sidebar role switcher
- **THEN** session state immediately transitions into the isolated guest sandbox (`usr-guest-*`) with pre-seeded parcels without requiring navigation to `/dashboard/admin`.

#### Scenario: Active Role Visual Feedback in Navigation Chrome
- **WHEN** user switches between any of the 4 roles (`FARMER`, `AGRONOMIST`, `ADMIN`, `GUEST`)
- **THEN** the sidebar and top navigation chrome immediately reflect the active role with dedicated color-coded badges and label indicators.
