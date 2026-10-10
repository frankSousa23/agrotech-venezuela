# Proposal: MapBiomas Soil Module Complementarity Blueprint

## Why

MapBiomas Venezuela (Colección 3.0, 1985–2024, coordinada por Provita, LSIGMA USB, Wataniba y RAISG) representa el hito más riguroso en el mapeo multi-temporal de cobertura y uso del suelo (LULC) en Venezuela. Sin embargo, a diferencia de la red regional MapBiomas (como *MapBiomas Solo* en Brasil), la iniciativa en Venezuela aún no cuenta con un **Módulo Operacional de Suelos (MapBiomas Suelos Venezuela)** que traduzca cuatro décadas de transiciones de cobertura en dinámicas edafológicas subsuperficiales: retención de humedad (PAW), compactación por pastoreo continuo, acidificación/toxicidad por aluminio intercambiable ($Al^{3+}$), balance de nutrientes y stock de carbono orgánico (SOC).

Agrotech Venezuela fue conceptualizado e inspirado desde sus raíces académicas para llenar precisamente ese vacío biogenético y territorial. Con el inminente cierre de las postulaciones al **Premio MapBiomas Venezuela 2026**, es fundamental plasmar de manera formal, explícita y transparente en el expediente institucional, en la interfaz del portal de postulación (`/dashboard/postulacion`) y en la memoria de ingeniería que la plataforma **cumple plenamente su cometido como prototipo operacional (TRL 4) fundacional para el futuro Módulo de Suelos de MapBiomas Venezuela**, sin introducir cambios drásticos ni comprometer los 292 tests automatizados ni las 35 rutas en producción.

## What Changes

1. **Acreditación Explícita de Complementariedad en el Portal de Postulación (`/dashboard/postulacion`)**:
   - Incorporar un distintivo visual de alta jerarquía (*Badge/Card* institucional): **"Prototipo Operacional Fundacional — Módulo de Suelos MapBiomas Venezuela"**.
   - Añadir una sección de blueprint arquitectónico que desglosa cómo los 40 años de matrices de transición de MapBiomas (bosque → pastura → agricultura) alimentan directamente los modelos edafológicos del sistema (Kamprath regionalizado, Saxton-Rawls PAW, 1.245 perfiles de suelo y oráculo SAR Sentinel-1).
2. **Actualización del Memorando Institucional y Expediente Oficial**:
   - Sincronizar `docs/MEMORANDO_POSTULACION.md`, su réplica pública `public/docs/MEMORANDO_POSTULACION.md` y `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` para consagrar el marco de *MapBiomas Suelos*: génesis académica, visión edafológica para producción vegetal y pecuaria, y hoja de ruta de absorción por el consorcio MapBiomas.
3. **Alineación de Directrices del Proyecto (`AGENTS.md`)**:
   - Reflejar en las directrices canónicas la tesis de interoperabilidad como módulo satélite/hermano de MapBiomas.
4. **Verificación Automatizada en la Suite de Tests**:
   - Actualizar las aserciones de integración en `__tests__/api/security-and-dossier.test.ts` para validar que el memorando institucional y los endpoints del expediente verifiquen la presencia y coherencia del blueprint del Módulo de Suelos de MapBiomas.

## Capabilities

### New Capabilities
*(Ninguna — se amplía la capacidad existente de exportación institucional y presentación del expediente)*

### Modified Capabilities
- `prize-publication-exporter`: Incorpora el requisito formal del **Blueprint de Complementariedad con MapBiomas Suelos** (*MapBiomas Soil Module Complementarity Blueprint*) en los expedientes institucionales, el portal de postulación interactivo y las pruebas automatizadas de integridad documental.

## Impact

- **Código Afectado**:
  - `src/app/dashboard/postulacion/page.tsx` (adición del badge y bloque arquitectónico de MapBiomas Suelos).
  - `docs/MEMORANDO_POSTULACION.md` y `public/docs/MEMORANDO_POSTULACION.md` (declaración de complementariedad con el Módulo de Suelos).
  - `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` y `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` (relato de inspiración de MapBiomas Suelos).
  - `AGENTS.md` (mención del alineamiento con MapBiomas Suelos).
  - `__tests__/api/security-and-dossier.test.ts` (aserciones de integridad de MapBiomas Suelos).
- **Riesgo Operativo**: Nulo (cambios meramente declarativos y de UI modular en página de postulación; no altera modelos matemáticos, APIs REST, ni dependencias externas).
- **Estabilidad**: Mantiene 0 errores en `npm run typecheck`, 292/292 tests pasando, y 35 rutas limpias.
