# Design: Integración de la Auditoría Integral de la Trayectoria y Ciclo de Desarrollo

## Context

El ecosistema Agrotech Venezuela cuenta con una arquitectura de microservicios robusta, 292 pruebas automatizadas y un expediente completo para el Premio MapBiomas Venezuela 2026. Tras la auditoría integral de la trayectoria de desarrollo, se identificó la necesidad de plasmar de forma explícita, visual e interactiva las 5 eras evolutivas que resumen el esfuerzo del autor (**Frank Sousa**) como desarrollador único durante sus vacaciones de trabajo.

Ver `proposal.md` y `specs/prize-publication-exporter/spec.md`.

## Goals / Non-Goals

**Goals:**
- Diseñar e integrar en `src/app/dashboard/postulacion/page.tsx` una sección interactiva de alto impacto visual con la línea de tiempo auditada en 5 eras (Semilla Académica, Choque Tropical, Inclusión Vernácula, Blindaje Científico/Legal y Síntesis TRL 4).
- Actualizar `MEMORANDO_POSTULACION.md` y su réplica pública en `public/docs/MEMORANDO_POSTULACION.md` incorporando la síntesis de la trayectoria auditada y el cuadro de madurez tecnológica.
- Extender la suite de pruebas unitarias en `__tests__/api/security-and-dossier.test.ts` para verificar la coherencia documental de estos nuevos hitos sin alterar la cifra dorada de 292 pruebas automatizadas.
- Garantizar 0 errores de TypeScript y compilación perfecta de las 35 rutas en Next.js 16 Turbopack.

**Non-Goals:**
- Modificar el backend FastAPI ni alterar el esquema relacional de Prisma.
- Alterar la lógica existente de autenticación o el visor WebGIS.

## Decisions

### Decisión 1: Estructura del Componente de Línea de Tiempo en el Dashboard
Se implementará una sección dedicada en `src/app/dashboard/postulacion/page.tsx` antes del expediente de documentos, utilizando un diseño de tarjetas glassmorphism con acentos cromáticos que identifican cada fase:
1. **Fase 1 (Ámbar / Oro)**: La Semilla Académica (UNERG), el profesor de edafología, el taller certificado de MapBiomas (40 años) y el enfoque dual de producción vegetal y pasturas.
2. **Fase 2 (Azul Cielo / Radar)**: El Choque Tropical, la muralla del 75% de nubes, el radar SAR Sentinel-1 Banda C y el WebGIS nativo Leaflet con React 19 (`useRef`).
3. **Fase 3 (Verde Esmeralda / Campo)**: Inclusión Rural Radical, Dual-Mode UI, 4 compuertas táctiles (80px), dictado por voz y parser vernáculo (sacos, tambores, tablones) con SQLite WAL (<25 ms).
4. **Fase 4 (Púrpura / Ciencia)**: Blindaje Edafológico (Kamprath, cal dolomítica, yeso), Saxton-Rawls PAW, paquetes tri-modales para maquinaria (GPS/Drones/Fichas) y marco legal internacional (Copernicus, NASA, MapBiomas CC BY 4.0).
5. **Fase 5 (Turquesa / Calidad)**: Síntesis TRL 4, pair-programming riguroso con Gemini en Antigravity, filtro soberano del autor (descartando código inflado), 292 tests automatizados (100% PASS), 0 errores TypeScript y 35 rutas de producción.

*Alternativa considerada*: Crear una página nueva (`/dashboard/auditoria`). Se descartó porque los evaluadores del Premio MapBiomas concentran su auditoría en el portal principal de postulación (`/dashboard/postulacion`), por lo que consolidarlo allí maximiza la visibilidad inmediata.

### Decisión 2: Sincronización del Memorando Oficial (`MEMORANDO_POSTULACION.md`)
Se agregará una sección explícita en `MEMORANDO_POSTULACION.md` resumiendo las 5 eras del ciclo de desarrollo y la métrica de esfuerzo de autor, replicando el archivo en `public/docs/MEMORANDO_POSTULACION.md` mediante copia byte por byte.

### Decisión 3: Verificación de Pruebas Unitarias sin Incremento de Conteo
Se incorporarán aserciones adicionales dentro de los bloques existentes de `it()` en `__tests__/api/security-and-dossier.test.ts`, asegurando que `MEMORANDO_POSTULACION.md` contenga las palabras clave (*Auditoría de Trayectoria*, *5 Eras*, *Edafología*, *Radar SAR*, *Solo Developer*), manteniendo exactamente 237 pruebas en Jest y 292 pruebas globales.

## Risks / Trade-offs

- **[Riesgo] Saturación visual en el portal de postulación**:
  - *Mitigación*: Emplear un grid responsivo modular con micro-tarjetas desplegables e íconos distintivos de Lucide React, manteniendo la estética limpia y jerárquica.
- **[Riesgo] Discrepancia entre la versión local y pública del memorando**:
  - *Mitigación*: Ejecutar copia forzada (`Copy-Item -Force`) y verificación de paridad de longitud en bytes.
