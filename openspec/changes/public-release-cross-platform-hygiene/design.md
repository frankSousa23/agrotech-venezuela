## Context

See `proposal.md` for motivation. The Agrotech Venezuela repository currently includes 179 passing automated tests (128 Jest + 51 Pytest), 28 routes in Next.js 16, and comprehensive TRL 7 documentation. However, `package.json` scripts currently hardcode Windows-specific binaries (`pwsh` in `clean` and `py` in `test:backend`). Making the repository public requires that scripts execute cleanly across Linux, macOS, and Windows environments without platform-specific syntax failures.

## Goals / Non-Goals

**Goals:**
- Provide a platform-agnostic test runner (`scripts/run-backend-tests.js`) that automatically dispatches Pytest using `py` on Windows and `python3` / `python` on Linux, macOS, and CI.
- Replace `pwsh` in `npm run clean` with native Node.js filesystem deletion (`fs.rmSync`).
- Upgrade `package.json` from `0.1.0` to `1.0.0` with full open-source distribution metadata.
- Update `README.md` and `backend/README.md` with explicit dual-platform CLI examples.

**Non-Goals:**
- Altering any test logic or assertions in Jest or Pytest.
- Changing application code, Leaflet WebGIS, database models, or security headers.
- Adding heavy external npm dependencies for script execution.

## Decisions

### Decision 1: Dedicated Node.js Backend Test Runner (`scripts/run-backend-tests.js`)
- **Rationale**: Since `npm run` always runs within Node.js, a lightweight script (~20 lines) using `child_process.spawnSync` can inspect `process.platform`:
  - On Windows: prefers `py -m pytest tests`, falling back to `python -m pytest tests`.
  - On Linux/macOS: prefers `python3 -m pytest tests`, falling back to `python -m pytest tests`.
  - It streams `stdio: 'inherit'` and propagates the exact exit status code so CI and local developers see real-time color output and proper exit codes.
- **Alternatives Considered**: 
  - Dual npm scripts (`test:backend:win` / `test:backend:unix`): Confusing for users and breaks `npm run test:all`.
  - Shell chaining (`py -m pytest tests || python3 -m pytest tests`): Fails on Windows cmd and prints error noise before the fallback.

### Decision 2: Native Node.js Deletion for `npm run clean`
- **Rationale**: `node -e "fs.rmSync('.next', { recursive: true, force: true })"` is natively supported in Node 16+ (project targets Node 20/22), eliminating the need for `pwsh` or third-party packages like `rimraf`.
- **Alternatives Considered**: Keeping `pwsh` (fails on standard Ubuntu/Debian/macOS setups).

### Decision 3: Version 1.0.0 and Package Metadata Standardization
- **Rationale**: Elevates the project from initial development (`0.1.0`) to official public release (`1.0.0`), populating `description`, `author: "Frank Sousa"`, `repository`, and relevant geospatial/agrotech `keywords`.

## Risks / Trade-offs

- **[Python Not Installed on Host Machine]** → The Node.js runner catches spawn errors and outputs a helpful, friendly message informing the user that Python 3.13 is required only if they wish to run backend ML tests locally, noting that Next.js WebGIS tests (`npm test`) run independently.
- **[Cross-Platform Execution in CI]** → Ubuntu GitHub Actions runner can now execute `npm run test:backend` and `npm run test:all` directly, unifying local developer and CI script invocations.
