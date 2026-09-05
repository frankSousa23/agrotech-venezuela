## Context

See proposal.md - Why.
The platform already features a dual UI mode (`UIModeContext.tsx`), an offline queue with connectivity badge (`ConnectivityStatusBadge.tsx`), multi-crop prediction models in Python (`crop_yield_predictor.py`), and spatial soil utilities (`spatialUtils.ts`). This design details the targeted technical integration to align colloquial rural messaging and complete the 8th strategic ML crop chain (`tomate_hortalizas`).

## Goals / Non-Goals

**Goals:**
- Update `FarmerHomeDoors.tsx` to include the 5th colloquial edaphic glossary card ("Humedad en punto"), the literal reassurance text ("Tranquilo, tu finca está guardada en este teléfono"), and the 4 canonical peasant door titles.
- Calibrate and register `tomate_hortalizas` in `backend/src/crop_yield_predictor.py` and `src/lib/geo/spatialUtils.ts` with accurate agronomic parameters: pH 6.0-7.0, optimal temperature 18.0-28.0°C, baseline yield 45.0 Ton/ha, and GDD 1200.0.
- Ensure all 179 existing unit and integration tests continue to pass, updating relevant Jest and Pytest assertions.

**Non-Goals:**
- Modifying the Leaflet GIS canvas or vector layer pipelines.
- Changing database schema or Prisma models (offline queue and crop models are handled in memory and runtime).
- Redesigning the IoT hardware lab simulator.

## Decisions

### 1. Colloquial Glossary Entry & Door Titles
- **Rationale**: The user research and field experience document stresses that terminology like "Retrodispersión Banda C" or "Shoelace WGS84" creates digital barriers if presented without cultural translation.
- **Implementation**:
  - Door 1: "Saber cómo está mi tierra" (Link to `/dashboard/recomendaciones?intent=soil`)
  - Door 2: "Ver si va a llover o secar" (Link to `/dashboard/estadisticas?intent=weather`)
  - Door 3: "Medir mi parcela" (Link to `/dashboard/tierras` or `/dashboard/mapa?intent=draw`)
  - Door 4: "Anotar lo que hice hoy" (Link to `/dashboard/bitacora?intent=new`)
  - Glossary item 5: "🟠 Humedad en punto (Retrodispersión de Banda C)" with explanation on space radar microwave cloud penetration.
  - Reassurance text: "🔒 Tranquilo, tu finca está guardada en este teléfono: Toda la información de tus potreros se guarda de forma local y segura incluso sin internet."

### 2. Agronomic Calibration for Tomate Cherry & Protected Vegetables
- **Rationale**: The 8 strategic chains in Venezuela highlighted in national plans and the strategic recommendations comprise: Maíz, Arroz, Plátano, Cacao, Café, Caña de Azúcar, Soya, and Hortalizas (Tomate Cherry).
- **Model Parameters (`tomate_hortalizas`)**:
  - `name`: "Tomate Cherry & Hortalizas Protegidas"
  - `scientific_name`: "Solanum lycopersicum var. cerasiforme"
  - `optimal_ph`: (6.0, 7.0)
  - `optimal_temp_c`: (18.0, 28.0)
  - `optimal_rain_mm`: (600.0, 1200.0) [con fertirriego por goteo]
  - `base_yield_ton_ha`: 45.0
  - `max_potential_ton_ha`: 70.0
  - `gdd_required`: 1200.0
  - `planting_season`: "Todo el año bajo ambiente protegido / Norte-Verano"

## Risks / Trade-offs

- **[Risk]** Existing tests expecting exact door titles in `FarmerHomeDoors.tsx` might fail.
  - **Mitigation**: Update `__tests__/api/farmer-ux-and-intentions.test.ts` to assert the new peasant door labels and the new glossary entry.
- **[Risk]** Pytest tests expecting exactly 8 predefined crop keys in `CROPS_AGRONOMIC_MODELS`.
  - **Mitigation**: Update `backend/tests/test_crop_yield_predictor.py` and `test_predict_endpoints.py` to recognize `tomate_hortalizas` alongside the other strategic crops.
