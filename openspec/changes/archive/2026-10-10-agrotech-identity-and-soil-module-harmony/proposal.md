# Proposal: Agrotech Ecosystem Identity and Soil Module Harmony

## Why

Agrotech Venezuela es ante todo una plataforma integral de inteligencia territorial, WebGIS multiescala, radar SAR Sentinel-1, telemetría IoT y asesoría prescriptiva para el agro venezolano. La reciente orientación hacia el Módulo de Suelos de MapBiomas Venezuela representa un valor agregado de complementariedad y adopción técnica de doble vía (TRL 4), pero no debe diluir la identidad soberana ni la amplitud funcional del ecosistema Agrotech Venezuela. Este cambio armoniza de forma equilibrada la narrativa visual y documental en todos los módulos del sistema, proyectando con total claridad que Agrotech Venezuela es la plataforma matriz integral y que, a su vez, está prediseñada para integrarse y operar como el Módulo de Suelos de MapBiomas Venezuela.

## What Changes

1. **Página de Inicio y Hero Banner (`src/app/page.tsx`)**:
   - Ajustar el distintivo del Hero (`awardBadge`) a una fórmula equilibrada y contundente: *"Agrotech Venezuela • Inteligencia Territorial & Módulo de Suelos MapBiomas (TRL 4)"*.
   - Equilibrar el subtítulo para presentar a Agrotech Venezuela como la solución integral que fusiona teledetección, radar SAR, IoT y climatología, prediseñada además para complementar a MapBiomas como su módulo de suelos.
2. **Catálogo de Suelos (`src/app/dashboard/suelos/page.tsx`)**:
   - Armonizar el distintivo de cabecera a *"Agrotech Edafología Nacional • Capa Base para MapBiomas Suelos"* y asegurar que la descripción técnica mantenga la jerarquía del catálogo.
3. **Portada del Repositorio (`README.md`)**:
   - Reafirmar en la cabecera y en la introducción que Agrotech Venezuela es el ecosistema completo y soberano, y que su aporte para la convocatoria 2026 incluye su entrega y prediseño como el prototipo del Módulo de Suelos para MapBiomas.
4. **Matrices y Artículos Institucionales (`MATRIZ_CUMPLIMIENTO_EVALUACION.md` y `ARTICULO_TECNICO_DRAFT.md`)**:
   - Afinar el balance conceptual en los criterios de originalidad y aporte a MapBiomas, ratificando la complementariedad integral de Agrotech.
5. **Verificación Automatizada**:
   - Actualizar las pruebas de Jest en `__tests__/api/security-and-dossier.test.ts` para verificar la armonía identitaria y preservar las 294 pruebas aprobadas.

## Capabilities

### New Capabilities
*(Ninguna)*

### Modified Capabilities
- `interactive-landing-ecosystem`: Modifica el requisito del hero badge y subtítulo para expresar con precisión la armonía entre la identidad de Agrotech Venezuela y su complementariedad con MapBiomas Suelos.

## Impact

- **Archivos Afectados**:
  - `src/app/page.tsx`
  - `src/app/dashboard/suelos/page.tsx`
  - `README.md`
  - `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md` y `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`
  - `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` y `public/docs/ARTICULO_TECNICO_DRAFT.md`
  - `__tests__/api/security-and-dossier.test.ts`
- **Riesgo Operativo**: Nulo. No altera lógica de cálculo, APIs ni dependencias.
- **Calidad**: 294 pruebas automatizadas pasando, 0 errores TypeScript y 35 rutas limpias.
