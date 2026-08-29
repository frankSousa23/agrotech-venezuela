## Context

Agrotech Venezuela features automated test coverage across Frontend WebGIS, ML feature extraction, and authentication. To provide institutional auditability for the MapBiomas Prize jury and agricultural stakeholders, this change implements dedicated, modular QA suites auditing: (1) Cuaderno de Campo Digital, (2) Multi-Level WebGIS & SAR Radar, and (3) MapBiomas Ground Truth discrepancy detection.

## Goals / Non-Goals

**Goals:**
- Provide comprehensive automated QA tests in Frontend (`__tests__/api/comprehensive-audit.test.ts`) covering field diary ingestion, dosage sanity, Shoelace geodetic accuracy, and multi-level zoom.
- Provide comprehensive automated QA tests in Backend (`backend/tests/test_audit_subsystems.py`) covering SAR radar backscatter edge cases, GDD calculation limits, and MapBiomas discrepancy matrix triggers.
- Verify 100% test pass rate with 0 regressions.

**Non-Goals:**
- Modifying underlying PostgreSQL or SQLite WAL schema models.
- Changing core mathematical formulas of Shoelace or Haversine.

## Decisions

### 1. Frontend Audit Test Suite (`__tests__/api/comprehensive-audit.test.ts`)
- **Decision**: Centralize QA assertions covering:
  - Filtering and pagination of field logs.
  - Validation of minimum/maximum yield thresholds ($Ton/ha$).
  - Shoelace spheroidal WGS84 area tolerances ($<0.01\text{ ha}$ delta).
  - MapBiomas watermark and legal attribution presence.
- **Rationale**: Provides a single authoritative audit suite that evaluators can run with `npm test`.

### 2. Backend Subsystems Audit Suite (`backend/tests/test_audit_subsystems.py`)
- **Decision**: Centralize backend assertions covering:
  - Dual-polarization SAR backscatter range validation ($VV/VH$ in $-25.0\text{ dB}$ to $0.0\text{ dB}$).
  - GDD engine thermal limits ($T_{base} = 10.0^\circ\text{C}$, $T_{max} = 30.0^\circ\text{C}$).
  - Discrepancy detector classification boundaries (Forest vs Pasture vs Crop).
- **Rationale**: Ensures complete test coverage for all spatial algorithms and ML feature normalizers.

## Risks / Trade-offs

- **[Risk: Slower test execution time]** → **Mitigation**: Pure in-memory unit/integration tests with execution time $<5\text{ s}$.
