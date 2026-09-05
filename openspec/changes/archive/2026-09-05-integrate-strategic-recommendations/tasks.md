## 1. Rural UX and Cultural Adaptations in Farmer Mode

- [x] 1.1 Update `FarmerHomeDoors.tsx` reassurance banner with "Tranquilo, tu finca está guardada en este teléfono" and verify banner rendering
- [x] 1.2 Update the 4 peasant action door titles in `FarmerHomeDoors.tsx` ("Saber cómo está mi tierra", "Ver si va a llover o secar", "Medir mi parcela", "Anotar lo que hice hoy") and verify navigation URLs
- [x] 1.3 Add the 5th colloquial edaphic card "🟠 Humedad en punto (Retrodispersión de Banda C)" to the field glossary in `FarmerHomeDoors.tsx` and verify layout
- [x] 1.4 Update Jest unit test `__tests__/api/farmer-ux-and-intentions.test.ts` to assert the updated doors, reassurance message, and glossary terms and verify `npm test` passes

## 2. 8th Strategic ML Crop Chain (Tomate Cherry & Hortalizas)

- [x] 2.1 Add `tomate_hortalizas` to `CROPS_AGRONOMIC_MODELS` in `backend/src/crop_yield_predictor.py` and verify prediction calculations
- [x] 2.2 Add `Tomate Cherry & Hortalizas` to `CROPS_DATABASE` in `src/lib/geo/spatialUtils.ts` and verify crop suitability ranking
- [x] 2.3 Update Jest test `__tests__/api/crops.test.ts` and Pytest test `backend/tests/test_crop_yield_predictor.py` to assert the 8th strategic crop chain
- [x] 2.4 Verify backend Pytest suite passes via `npm run test:backend`

## 3. Global End-to-End System Audit & Verification

- [x] 3.1 Run TypeScript verification (`npx tsc --noEmit`) and verify 0 errors
- [x] 3.2 Run unified test suite (`npm run test:all`) and verify all 179+ tests pass
- [x] 3.3 Run Next.js production build (`npm run build`) and verify 28 clean routes
