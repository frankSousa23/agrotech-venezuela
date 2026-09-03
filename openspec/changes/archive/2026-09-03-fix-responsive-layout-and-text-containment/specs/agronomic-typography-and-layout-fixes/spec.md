## ADDED Requirements

### Requirement: Text and Mathematical Formula Containment
The system SHALL contain mathematical formulas, long land parcel titles, and technical identifiers inside their visual glassmorphism cards with smooth horizontal scroll capability and word-break wrapping.

#### Scenario: Rendering Shoelace and SOC Formulas on Mobile
- **WHEN** user views the mathematical formulas on the TRL 7 evaluation page on a viewport of 375px
- **THEN** the formula container provides horizontal touch scrolling without bleeding into or clipping against container borders.

#### Scenario: Long Parcel Names and Badges
- **WHEN** user views parcel cards with extensive names on `/dashboard/tierras`
- **THEN** the parcel area badge remains on a single line (`white-space: nowrap`) and card action buttons wrap onto structured rows without text clipping.

### Requirement: Responsive Grid Column Adaptation
The system SHALL automatically adapt multi-column agronomic grids (crop recommendation rankings, IoT metric rows, and culture catalogs) to single-column or fluid auto-fit layouts on viewports under 640px.

#### Scenario: Viewing Crop Rankings on Mobile
- **WHEN** user views soil simulation recommendations on a mobile device
- **THEN** the crop cards render in a single column or minimum 240px columns, preventing crop names and score badges from overlapping.

#### Scenario: Viewing IoT Lab Tabs and Metric Cards
- **WHEN** user interacts with the Microcrop IoT Lab on a mobile screen
- **THEN** navigation tabs provide smooth touch scrolling and metric KPI cards adapt cleanly without truncating savings descriptions.
