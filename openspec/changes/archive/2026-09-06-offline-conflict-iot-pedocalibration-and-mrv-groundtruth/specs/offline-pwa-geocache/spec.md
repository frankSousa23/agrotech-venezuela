## ADDED Requirements

### Requirement: Deterministic Parcel Conflict Quarantine and Dual-Mode Resolution
The system SHALL assign incremental integer version counters and ISO-8601 update timestamps to all parcel records, detect version divergence during offline synchronization, route colliding updates to a quarantine queue, and provide visual conflict resolution adapted to both Farmer Mode and Technical Mode.

#### Scenario: Divergent Parcel Edit Quarantined
- **WHEN** an offline parcel update is transmitted with a base version lower than the server's current version
- **THEN** the system rejects immediate overwrite, stores the conflicting payload in the `parcel_conflicts` quarantine store, and marks the parcel with an active conflict state.

#### Scenario: Resolving Conflict in Farmer Mode
- **WHEN** a user in Modo Productor Fácil interacts with a quarantined parcel notification
- **THEN** the system presents rural vernacular terminology ("Copia de campo" vs "Copia de oficina") with side-by-side area and boundary previews, enabling one-tap selection of the preferred record.

#### Scenario: Resolving Conflict in Technical Mode
- **WHEN** an agronomist in Technical Mode opens the conflict inspection view
- **THEN** the system renders an attribute-level diff (GeoJSON geometry, calculated ha, soil pH, crop variety, author, and timestamp) with options to keep server, accept client, or perform selective attribute merge.
