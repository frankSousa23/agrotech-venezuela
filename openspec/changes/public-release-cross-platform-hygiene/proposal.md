## Why

As Agrotech Venezuela is made public for university evaluators, competition judges, teachers, and agricultural producers worldwide, users will clone and run the repository on diverse operating systems (macOS, Ubuntu/Debian Linux, Windows, WSL). A technical exploration identified that current `package.json` scripts assume Windows-only utilities (`py -m pytest` and `pwsh`), which fail on Linux and macOS with `command not found`. Furthermore, `package.json` still reflects development version `0.1.0` without public metadata (author, description, repository, keywords). Addressing these hygiene details guarantees an error-free, professional turnkey experience for anyone cloning the project on any OS.

## What Changes

- **Universal Cross-Platform Clean Script**: Replace Windows-specific `pwsh` in `npm run clean` with a native, cross-platform Node.js one-liner (`node -e "fs.rmSync('.next', { recursive: true, force: true })"`).
- **Universal Cross-Platform Backend Test Runner**: Provide a cross-platform test runner script (`scripts/run-backend-tests.js`) that automatically detects the available Python binary (`py` on Windows, `python3` or `python` on Linux/macOS/CI) and executes Pytest with identical exit code forwarding, updating `test:backend` and `test:all` accordingly.
- **Package Release Metadata**: Update `package.json` version to `1.0.0`, adding official project description, author attribution (Frank Sousa), repository link, and agricultural/geoespacial keywords.
- **README Execution Guidance**: Update `README.md` and `backend/README.md` to document both Windows (`py`) and Unix (`python3`) commands for manual virtualenv and local backend runs.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `production-readiness-and-hygiene`: Expand modern scripting requirements so all test and maintenance commands in `package.json` execute natively across Windows, Linux, and macOS without relying on platform-specific shell binaries (`pwsh`, `py`), and ensure package release metadata is declared for v1.0 public availability.

## Impact

- `package.json`: Updated `version`, `scripts` (`clean`, `test:backend`, `test:all`), and repository metadata.
- `scripts/run-backend-tests.js`: New lightweight Node.js test runner for Pytest that auto-selects `py` vs `python3` / `python`.
- `README.md` & `backend/README.md`: Cross-platform command documentation.
- No breaking changes to existing APIs, Leaflet WebGIS, database models, or backend services.
