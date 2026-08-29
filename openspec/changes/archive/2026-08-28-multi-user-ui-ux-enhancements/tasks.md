## 1. Demo Quick Switcher & Login UX

- [x] 1.1 Implement quick-login role switcher panel in `src/app/login/page.tsx` for Producer, Agronomist, Admin, Pending, and Guest and verify visual rendering
- [x] 1.2 Add unit tests in `__tests__/api/auth.test.ts` verifying demo role state assignments and quick-login flows

## 2. Guest Session Indicator & Navbar UX

- [x] 2.1 Add interactive Guest Mode badge and registration prompt in `src/components/layout/NavigationBar.tsx` and verify responsive display
- [x] 2.2 Verify guest sandbox persistence toast on parcel and log creation actions

## 3. Multi-Region Pre-Populated Dataset

- [x] 3.1 Expand `IN_MEMORY_PARCELS` in `src/app/api/parcels/route.ts` with representative lots in Zulia (Plantains), Mérida (Coffee), and Monagas (Soybeans) and verify GET `/api/parcels`
- [x] 3.2 Expand `IN_MEMORY_LOGS` in `src/app/api/field-logs/route.ts` with corresponding regional agronomic events and verify GET `/api/field-logs`

## 4. Full Automated Verification

- [x] 4.1 Execute full frontend test suite (`npm test`) and type check (`npx tsc --noEmit`) to verify 0 regressions
- [x] 4.2 Execute full backend test suite (`cd backend && py -m pytest tests`) to verify spatial and ML test suites pass
