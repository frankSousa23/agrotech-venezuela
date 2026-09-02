# mobile-touch-ergonomics Specification

## Purpose

Optimizes mobile and tablet touch ergonomics to ensure buttons, layer toggles, and form controls are easily pressable under outdoor field conditions.

## Requirements

### Requirement: Minimum 44px Touch Target Height
The system SHALL provide interactive buttons and selector pills with a minimum computed touch target of 44px on viewport widths below 640px.

#### Scenario: Switching Layers on Smartphone
- **WHEN** user taps layer options on a mobile device
- **THEN** buttons are comfortably separated and easy to tap without misclicks.

### Requirement: Responsive Mobile Layout and Topbar Optimization
The dashboard layout SHALL adapt cleanly across viewports, hiding redundant desktop utility bars on viewports under 768px and exposing full navigation, logout, and theme toggling directly within the mobile header and slide-out sidebar drawer.

#### Scenario: Mobile Viewport Rendering
- **WHEN** user loads the dashboard on a viewport narrower than 768px
- **THEN** the fixed mobile topbar displays the logo, theme toggle, and hamburger menu toggle, while the redundant desktop utility bar is hidden.

### Requirement: Persistent and Sticky Logout Access
The dashboard sidebar SHALL provide a sticky or consistently positioned Logout action reachable at all times across mobile and desktop viewport sizes.

#### Scenario: Logout from Mobile Drawer
- **WHEN** user opens the mobile navigation drawer
- **THEN** the "Cerrar Sesión" button is visible and actionable without clipping or overflow.
