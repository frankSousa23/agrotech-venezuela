## ADDED Requirements

### Requirement: Rural QoS Network Traffic Prioritization
The connectivity and synchronization system SHALL implement a 2-tier Quality of Service (QoS) protocol that prioritizes lightweight text payloads over heavy raster and satellite tile downloads when operating under weak or intermittent rural cellular signals.

#### Scenario: Detecting Weak or Intermittent Signal
- **WHEN** network connectivity is reestablished and network condition reflects high latency (RTT > 500ms), 2G/EDGE speeds, or `saveData: true`
- **THEN** the system immediately dispatches queued text-based field diary records (< 10 KB) with client-generated UUIDs for idempotent processing, while pausing or blocking heavy remote tile downloads (> 500 KB) and displaying a rural data-saver notice in the UI.

#### Scenario: Resuming Full High-Bandwidth Synchronization
- **WHEN** high-speed connectivity (WiFi or 4G LTE with low latency) is detected or the user manually forces full map refresh
- **THEN** the system re-enables remote tile fetching and background telemetry raster streams without blocking or dropping queued field diary mutations.
