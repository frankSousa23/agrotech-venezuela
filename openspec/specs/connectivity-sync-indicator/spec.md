# connectivity-sync-indicator Specification

## Purpose

Provides a persistent, real-time visual indicator of network connectivity and offline synchronization state for agricultural producers working in low-connectivity rural zones.

## Requirements

### Requirement: Real-Time Connectivity Badge
The system SHALL display an indicator badge reflecting browser online/offline status with pending synchronization counts.

#### Scenario: Network Transition to Offline
- **WHEN** the browser loses internet connection
- **THEN** the badge transitions to "Modo Finca Offline 🟠" and shows the count of local pending mutations stored in IndexedDB.

#### Scenario: Restoring Connection and Triggering Sync
- **WHEN** the user regains internet access or clicks "Sincronizar Ahora"
- **THEN** the badge transitions to "Sincronizando 🔄" and updates to "En Línea 🟢" once all queued field logs and parcel edits are synchronized.
