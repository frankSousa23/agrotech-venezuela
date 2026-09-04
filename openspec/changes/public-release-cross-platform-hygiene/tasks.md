## 1. Cross-Platform Scripts & Universal Runners

- [x] 1.1 Create `scripts/run-backend-tests.js` to auto-detect host Python binaries (`py`, `python3`, `python`) and stream Pytest execution with proper exit codes
- [x] 1.2 Update `package.json` scripts: replace `pwsh` in `clean` with cross-platform Node.js deletion (`node -e "fs.rmSync('.next', { recursive: true, force: true })"`), and route `test:backend` and `test:all` through the Node runner
- [x] 1.3 Verify `npm run clean` and `npm run test:backend` execute cleanly in the local environment

## 2. Public Release Package Metadata

- [x] 2.1 Update `package.json` with version `1.0.0`, official description, author ("Frank Sousa"), repository URL, and agrotech/geospatial keywords
- [x] 2.2 Verify `package.json` syntax is valid and `npm run build` succeeds

## 3. Documentation & Cross-Platform Execution Guidance

- [x] 3.1 Update `README.md` and `backend/README.md` to document both Windows (`py`) and Unix (`python3`) commands for manual Python executions
- [x] 3.2 Verify `.github/workflows/ci.yml` compatibility with the updated scripts

## 4. End-to-End Verification

- [x] 4.1 Run `npm test` and `npm run test:backend` to verify all 179 tests pass
- [x] 4.2 Run `npm run typecheck` to verify 0 TypeScript compilation errors
- [x] 4.3 Run `openspec validate --all` to verify full OpenSpec schema compliance
