# Design: Agrotech Ecosystem Identity and Soil Module Harmony

## Context

El ecosistema Agrotech Venezuela abarca una amplia suite de capacidades tecnológicas: Visor WebGIS en 3 niveles, Radar SAR Sentinel-1 Banda C (all-weather), Laboratorio didáctico Agro-IoT con ESP32, Cuaderno de Campo con voz vernacular, Costeo operativo (ROI) desacoplado, y Prescripción agronómica de precisión.

La reciente incorporación de la complementariedad hacia el Módulo de Suelos de MapBiomas Venezuela fortaleció la postulación institucional al premio, pero es indispensable que la narrativa no reduzca a Agrotech a un sub-componente. El sistema es y continúa siendo **Agrotech Venezuela**, una solución integral que, gracias a sus capacidades de modelado de suelo, física Saxton-Rawls y prescripción química, está prediseñada para integrarse y operar además como el Módulo de Suelos de MapBiomas Venezuela.

## Goals / Non-Goals

**Goals:**
- Presentar en la cabecera principal (`src/app/page.tsx`) la marca e identidad de Agrotech Venezuela en primer plano, acompañada armoniosamente del distintivo de honor como Módulo de Suelos de MapBiomas Venezuela (TRL 4).
- Equilibrar el hero subtitle y las descripciones del catálogo de suelos (`/dashboard/suelos`) para destacar que Agrotech es el sistema integral que además aporta esta capa base para MapBiomas.
- Mantener la coherencia en `README.md`, la matriz de evaluación y el artículo técnico, reforzando la complementariedad de doble vía.
- Garantizar que los 294 tests automatizados sigan pasando al 100% con 0 errores TypeScript.

**Non-Goals:**
- No eliminar las menciones al Módulo de Suelos de MapBiomas, sino armonizarlas con la identidad central de Agrotech.
- No alterar modelos matemáticos (Shoelace, Kamprath, Saxton-Rawls, SAR).
- No modificar endpoints ni contratos de API.

## Decisions

### Decisión 1: Hero Badge & Subtítulo Equilibrados en Landing Page
- **Elección**:
  - Badge: `Agrotech Venezuela • Inteligencia Territorial & Módulo de Suelos MapBiomas (TRL 4)`
  - Subtítulo: Reafirmar a Agrotech Venezuela como la plataforma madre integral que fusiona los 40 años de MapBiomas, radar SAR, clima NASA, IoT y Gemini AI, prediseñada además para operar como el Módulo de Suelos de MapBiomas.

### Decisión 2: Badges del Módulo de Suelos
- **Elección**: En `/dashboard/suelos`, combinar `Agrotech Edafología Nacional`, `1,245 Perfiles Georreferenciados` y `Capa Base para MapBiomas Suelos (TRL 4)`.

### Decisión 3: Armonización en Pruebas de Jest
- **Elección**: Actualizar las aserciones en `__tests__/api/security-and-dossier.test.ts` para verificar la presencia conjunta de la identidad de Agrotech y de MapBiomas Suelos.

## Risks / Trade-offs

- **[Riesgo]** Confusión en evaluadores si los textos parecieran contradictorios.
  - *Mitigación*: Explicar con precisión la complementariedad: Agrotech es la plataforma completa, y su arquitectura modular permite adoptarla directamente como el Módulo de Suelos de MapBiomas.
