# global-toast-notification-system Specification

## Purpose

Provides an ergonomic, non-blocking toast notification system to inform users about background syncs, successful parcel creation, and field record events.

## Requirements

### Requirement: Centralized Toast Notifications
The system SHALL expose a `useToast` hook that displays floating feedback toasts with auto-dismiss timers and clear visual icons.

#### Scenario: Displaying a Success Notification
- **WHEN** a farmer saves a new parcel or field log
- **THEN** a green success toast appears with the message and automatically dismisses after 3.5 seconds.
