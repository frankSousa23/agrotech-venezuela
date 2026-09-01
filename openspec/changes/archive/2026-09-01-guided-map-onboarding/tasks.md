## 1. Intent-Aware Map Entry

- [x] 1.1 In `src/app/dashboard/mapa/page.tsx`, read `searchParams.get('intent')` inside `MapaContent` and force `initialMode` to `'multilevel'` when the value is `'draw'`. Verify by navigating to `/dashboard/mapa?intent=draw` and confirming the Multi-Scale view loads directly.
- [x] 1.2 In `src/app/dashboard/page.tsx`, update the Step 2 "Probar Trazo" link href from `/dashboard/mapa` to `/dashboard/mapa?mode=multilevel&intent=draw`. Verify the link opens the map directly in Multi-Scale mode.

## 2. Tutorial Banner & Level Breadcrumb in MultiLevelMapViewer

- [x] 2.1 Add a `showTutorial` state to `MultiLevelMapViewer.tsx` initialised from `localStorage.getItem('agrotech-map-tutorial-dismissed') !== 'true'`. On dismiss, set the localStorage key and collapse. Verify the banner appears on first load and stays dismissed after refresh.
- [x] 2.2 Render the tutorial banner (3 numbered steps: "① Selecciona tu Estado", "② Elige tu Municipio", "③ Haz clic en Trazar y dibuja tus vértices") above the panel controls when `showTutorial` is true and `currentLevel` is in Multi-Scale mode. Include a "Demo Automático" button that calls `handleAutoPresetDraw`. Verify the banner renders and the demo button draws a preset polygon.
- [x] 2.3 Add a `LevelBreadcrumb` inline sub-component inside `MultiLevelMapViewer.tsx` that renders 3 steps (País / Municipio / Lote) with ✓ for completed levels and a pulsing green dot on the current active level. Pass `currentLevel` as the only prop. Verify that the breadcrumb updates correctly as the user clicks through levels 1 → 2 → 3.
- [x] 2.4 When `currentLevel === 3`, add a pulsing CSS animation to the border or background of the `btn_draw_toggle` button to visually invite the user to start drawing. Verify the animation appears on Nivel 3.

## 3. Post-Save Success Panel & Redirect Flow

- [x] 3.1 After a successful `POST /api/parcels` in `handleSaveToUserFarm`, build the handoff URL:
  `/dashboard/recomendaciones?state=<selectedStateId>&ph=<simPh>&soilTexture=<soilTexture>&crop=<crop>` and store it in a new `successRedirectUrl` state variable. Set `saveSuccess` to `true`. Verify the URL is correctly constructed in the component state after saving.
- [x] 3.2 Replace the existing `saveSuccess` success message block with a dedicated success panel that shows: the saved parcel name, computed area, and two `Link` buttons — "Ver mis Fincas" (→ `/dashboard/tierras`) and "Obtener Recomendaciones IA" (→ `successRedirectUrl`). Verify both links navigate to the correct pages.

## 4. Clean Drawing State Reset

- [x] 4.1 Update `handleClearDraw` in `MultiLevelMapViewer.tsx` to also reset `parcelName` to the default `'Tablón Nuevo — Parcela 1'` and `saveSuccess` to `false`. Verify that clicking the clear button resets the parcel name field and hides any success message.

## 5. Simulator Pre-Population from Parcel Query Params

- [x] 5.1 In `src/app/dashboard/recomendaciones/page.tsx`, read `searchParams.get('soilTexture')` and `searchParams.get('crop')` alongside the existing `?state` and `?ph` reads. Use them to initialise `simTexture` and set the preferred crop hint (stored in a new `hintCrop` state for display only). Verify by navigating to `/dashboard/recomendaciones?state=portuguesa&ph=6.2&soilTexture=Franco&crop=Maíz Blanco` and confirming sliders and selectors load with those values.
- [x] 5.2 Update the empty state `actionHref` in `RecomendacionesContent` from `/dashboard/mapa` to `/dashboard/mapa?mode=multilevel&intent=draw`. Verify the empty state button navigates directly to drawing mode.

## 6. Verification & Testing

- [x] 6.1 Run `npm test` and confirm all 89 existing tests still pass with no regressions.
- [x] 6.2 Run `npx tsc --noEmit` and confirm 0 TypeScript errors.
