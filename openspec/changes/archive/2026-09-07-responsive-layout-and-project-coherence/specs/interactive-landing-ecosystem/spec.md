## ADDED Requirements

### Requirement: Semantic Navigation Menus and Responsive Tablet Retention
The root landing page SHALL provide structured navigation organized into semantic dropdown categories (such as Field Modules, Science & Data, and Institutional Postulation TRL 6) and MUST maintain horizontal navigation links across viewports down to 880px before collapsing into the mobile navigation drawer.

#### Scenario: Interacting with Semantic Navigation Dropdowns on Desktop
- **WHEN** user hovers over or focuses a semantic menu trigger (e.g. "🌾 Módulos de Campo" or "🔬 Ciencia & Datos") on a viewport ≥ 880px
- **THEN** the dropdown menu opens with backdrop blur, displaying direct links to specialized submodules with icons and descriptions without clipping the hero content.

#### Scenario: Tablet Viewport Navigation Retention
- **WHEN** user accesses the landing page on a viewport between 880px and 1140px
- **THEN** the top navigation links and semantic dropdowns remain visible and interactable without prematurely collapsing into the mobile hamburger menu.

#### Scenario: Mobile Viewport Fallback
- **WHEN** user accesses the landing page on a viewport narrower than 880px
- **THEN** the top navigation bar collapses the links into the mobile hamburger drawer and displays a compact primary CTA.
