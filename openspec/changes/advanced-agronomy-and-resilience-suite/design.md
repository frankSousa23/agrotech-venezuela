## Context

This design outlines the technical architecture for the four requested resilience and agronomic modules:
1. Client-side connectivity & offline mutation monitor (`ConnectivityStatusBadge.tsx`).
2. Synthetic Aperture Radar (SAR) backscatter service for cloud penetration (`sarRadarService.ts`).
3. Hydro-thermal balance and GDD phenology predictor (`hydroThermalEngine.ts`).
4. Soil Organic Carbon (SOC) and MRV carbon credits calculator (`CarbonCreditsCalculator.tsx`).

## Goals / Non-Goals

**Goals:**
- Provide clear visual telemetry of network status and pending offline entries in the top header.
- Allow farmers to inspect soil saturation and waterlogging via SAR radar during heavy tropical cloud coverage.
- Compute cumulative GDD ($10^\circ\text{C} - 30^\circ\text{C}$) and soil water balance ($P - ET_c$) for Venezuelan agro-climates.
- Provide an interactive MRV calculator for soil carbon credits with certified IPCC conversion factors.

**Non-Goals:**
- Direct blockchain token minting on public crypto networks (calculations are certified for voluntary carbon registry export).

## Decisions

### Decision 1: Client-Side Network State & Sync Queue
- **Choice**: Native browser events `window.addEventListener('online'/'offline')` combined with IndexedDB query for unsynced logs.
- **Rationale**: Minimal footprint, instantaneous feedback, zero dependency overhead.

### Decision 2: SAR Radar Emulation & GEE Backscatter
- **Choice**: Dual polarization VV/VH backscatter calculation normalized to $-25\text{ dB}$ to $-5\text{ dB}$ with moisture anomaly classification.
- **Rationale**: Works seamlessly both online (GEE) and in offline fallback mode with geodesic SQLite cache.

### Decision 3: GDD Mathematical Modeling
- **Choice**: Standard agronomic thermal unit aggregation:
  $$\text{GDD} = \sum_{i=1}^n \max\left(0, \frac{\min(T_{\max}, 30) + \max(T_{\min}, 10)}{2} - 10\right)$$
- **Rationale**: Standard FAO and INIA Venezuela benchmark for tropical maize, rice, and sugarcane.

### Decision 4: SOC Sequestration & MRV Modeling
- **Choice**: Bulk density estimated by soil texture with van Bemmelen factor ($0.58$) and IPCC Tier 2 regenerative conversion factor ($0.35$ to $0.85\text{ tC/ha/yr}$).
- **Rationale**: Mathematically sound, transparent, and readily auditable by international verification bodies.

## Risks / Trade-offs

- **[Risk]** Heavy computation on client during GDD timeseries simulation → **[Mitigation]** Memoize historical NASA POWER daily grids with `useMemo`.
