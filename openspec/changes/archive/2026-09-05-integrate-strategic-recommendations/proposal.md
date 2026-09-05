## Why

Following the strategic review "Recomendaciones Estratégicas y Técnicas: Agrotech Venezuela", the platform must bridge the remaining small nuances between technical capabilities and rural adoption. Specifically, the rural UI mode needs explicit colloquial edaphic mapping ("Humedad en punto"), direct psychological reassurance ("Tranquilo, tu finca está guardada en este teléfono"), exact door intention titles, and the machine learning crop predictor must formally incorporate the 8th strategic chain: Tomate Cherry & Horticultura Protegida.

## What Changes

- **Cultural Glossary Expansion**: Add "Humedad en punto (Retrodispersión de Banda C)" to the field guide in `FarmerHomeDoors.tsx` explaining how space microondas penetrate cloud cover to determine soil moisture.
- **Psychological Data Reassurance**: Update the safety banner in `FarmerHomeDoors.tsx` to display the literal rural reassurance: *"🔒 Tranquilo, tu finca está guardada en este teléfono"*, highlighting offline resilience and zero risk of accidental data loss.
- **Harmonized 4 Farmer Doors**: Update door titles and descriptions in `FarmerHomeDoors.tsx` to match the exact 4 peasant doors: *"Saber cómo está mi tierra"*, *"Ver si va a llover o secar"*, *"Medir mi parcela"* and *"Anotar lo que hice hoy"*.
- **8th Strategic ML Chain (Tomate Cherry & Hortalizas)**: Add `tomate_hortalizas` to `CROPS_AGRONOMIC_MODELS` in `backend/src/crop_yield_predictor.py` and `Tomate Cherry & Hortalizas` to `CROPS_DATABASE` in `src/lib/geo/spatialUtils.ts` with calibrated pH, water requirements, base yield (35-55 Ton/ha) and GDD thresholds.
- **Testing and Verification**: Update unit tests in Jest (`farmer-ux-and-intentions.test.ts`, `crops.test.ts`) and Pytest (`test_crop_yield_predictor.py`, `test_predict_endpoints.py`) to assert the new glossary entry, door texts, and the 8th crop chain.

## Capabilities

### Modified Capabilities
- `farmer-mode-dual-ui`: Update requirements to enforce the 5th colloquial glossary term ("Humedad en punto"), the mobile local storage reassurance message, and the 4 peasant door intention labels.
- `mapbiomas-ml-yield-integration`: Update requirements to include `tomate_hortalizas` as an officially calibrated strategic crop model in the multi-crop yield predictor engine.

## Impact

- **Frontend**: `src/components/agronomy/FarmerHomeDoors.tsx`, `src/lib/geo/spatialUtils.ts`.
- **Backend**: `backend/src/crop_yield_predictor.py`.
- **Tests**: `__tests__/api/farmer-ux-and-intentions.test.ts`, `__tests__/api/crops.test.ts`, `backend/tests/test_crop_yield_predictor.py`.
- **Compatibility**: 100% backward compatible. No breaking changes; builds and existing API contracts remain intact.
