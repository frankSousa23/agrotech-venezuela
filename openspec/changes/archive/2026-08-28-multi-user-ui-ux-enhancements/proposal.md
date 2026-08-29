## Why

To enhance the demonstration and evaluation experience for the MapBiomas Prize jury and external stakeholders, Agrotech Venezuela requires seamless multi-user role switching, immediate visual feedback of guest vs registered account states, and a richly populated multi-region dataset reflecting Venezuela's diverse agricultural biomes.

## What Changes

- **1-Click Demo User Switcher**: Add a quick-login panel on `/login` to switch between Producer, Agronomist, Administrator, Pending Applicant, and Guest accounts instantly without typing credentials.
- **Guest State Indicator & Persistence Banner**: Display an interactive badge in the navigation bar when operating in Guest/Sandbox mode, accompanied by an invitation banner to register and persist parcel data permanently.
- **Multi-Region Sample Parcel & Log Dataset**: Expand initial seed data in `IN_MEMORY_PARCELS` and `IN_MEMORY_LOGS` across 5 representative Venezuelan agricultural zones (Portuguesa, Guárico, Zulia, Mérida, Monagas) to showcase crops like plantains, coffee, and soybeans.
- **Enhanced Data Flow Validation**: Verify that parcel creations, field logs, and administrative user approvals flow cleanly across all user roles and guest sessions.

## Capabilities

### New Capabilities
- `demo-quick-switcher`: 1-click role and account switcher on the authentication interface to expedite demonstrations.
- `guest-persistence-banner`: Navigation bar indicator and notification prompt for guest/sandbox users to preserve their telemetry permanently.
- `multiregion-seed-parcels`: Comprehensive sample parcels and agronomic field logs representing Venezuela's major agricultural poles and biomes.

### Modified Capabilities
- None.

## Impact

- **Frontend**: Update `src/app/login/page.tsx`, `src/components/layout/NavigationBar.tsx`.
- **Data & APIs**: Update `src/app/api/parcels/route.ts` and `src/app/api/field-logs/route.ts` with expanded regional records.
- **Testing**: Add Jest tests covering demo user switching and multi-region data loading.
