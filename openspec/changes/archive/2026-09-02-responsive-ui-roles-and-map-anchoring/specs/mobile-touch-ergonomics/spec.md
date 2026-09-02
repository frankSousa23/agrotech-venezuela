## ADDED Requirements

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
