## Context

Véase `proposal.md` para la motivación general del cambio.

Actualmente, Agrotech Venezuela cuenta con una base arquitectónica validada (Next.js 16 Turbopack, FastAPI, SQLite WAL con hash geodésico, 197 tests pasando), pero presenta tres desacoples de experiencia y producto:
1. `/api/gemini/advisor` solo usa una instrucción de sistema genérica e ignora el `uiMode` (`farmer` vs `technical`), entregando métricas de laboratorio a usuarios rurales en Modo Productor.
2. El dossier de postulación y el módulo MRV de carbono (`CarbonCreditsCalculator.tsx`) enfatizan la física de suelo sin visibilizar el modelo fintech/agtech de agregación regional para pequeños productores.
3. El frontend no cuenta con discriminación de ancho de banda: al recuperar señal en zonas rurales, intenta descargar teselas de mapas (> 20 MB) al mismo tiempo que envía texto de bitácora (< 10 KB), provocando bufferbloat y fallos de sincronización.

## Goals / Non-Goals

**Goals:**
- Proporcionar una capa de despacho dual en `/api/gemini/advisor` y en el motor determinista local según `uiMode`.
- Traducir métricas técnicas a terminología vernácula campesina ("El Compadre Agrónomo") en Modo Productor, preservando precisión cuantitativa para Modo Técnico.
- Reestructurar el dossier (`PITCH_DECK.md`, `MEMORANDO_POSTULACION.md`, `/dashboard/postulacion`) con la pirámide invertida de valor económico (ROI rural de 3.8x, ahorro de 35% en fertilizantes) al frente y especificaciones técnicas en apéndices.
- Agregar en `CarbonCreditsCalculator.tsx` la calculadora de "Pool Regional de Carbono" (85% agricultor / 15% Agrotech).
- Implementar el protocolo QoS rural de 2 capas: Canal A prioritario (Uplink < 10 KB, reintentos idempotentes con UUID) y Canal B secundario (Downlink mapas > 500 KB, pausado en 2G/EDGE o `saveData: true`).

**Non-Goals:**
- No se modificará el motor de cálculo Shoelace geodésico ni la fórmula subyacente de stock de carbono (SOC) IPCC Tier 2.
- No se reemplazará Leaflet nativo ni se migrará la base de datos PostgreSQL/SQLite.
- No se requerirá conectividad permanente para el funcionamiento del asesor (mantiene el fallback determinista local).

## Decisions

### Decisión 1: Branching de IA en Servidor vía `uiMode` en Payload
- **Enfoque seleccionado**: El cliente envía `uiMode?: 'farmer' | 'technical'` en el cuerpo JSON a `/api/gemini/advisor`. En el servidor:
  - Si `uiMode === 'farmer'`: Se inyecta la directriz de sistema "El Compadre Agrónomo", con reglas explícitas de sustitución léxica (radar SAR → humedad oculta bajo nubes; GDD → días de sol para espigar; Kamprath → sacos de cal para quitar la bravura ácida; unidades en sacos de 50 kg).
  - Si `uiMode === 'technical'` (o default): Se mantiene la directriz edafológica de alta precisión.
  - El motor determinista local `generateDeterministicAgronomicResponse(ctx, uiMode)` replica idéntico branching para garantizar resiliencia offline.
- **Alternativas consideradas**:
  - *Filtrado de texto por regex en cliente*: Frágil, no altera el razonamiento de la IA generativa.
  - *Dos endpoints separados (`/api/advisor/farmer` y `/api/advisor/tech`)*: Duplica código de telemetría y complica el mantenimiento.

### Decisión 2: Carbon Pooling Model en MRV Calculator
- **Enfoque seleccionado**: Incorporar un toggle interactivo en `CarbonCreditsCalculator.tsx` denominado "Modelo de Agregación Comercial (Carbon Pooling)". Permite modelar cómo pequeños predios (ej. 15–50 ha) que individualmente no pueden asumir costos de auditoría Verra (\$50,000+) se integran a un pool de 5,000+ ha gestionado por Agrotech con monitoreo satelital automatizado, distribuyendo 85% al productor y 15% a la plataforma.
- **Alternativas consideradas**:
  - *Mantener solo el cálculo estequiométrico de tCO2e*: No responde a la inquietud del jurado sobre viabilidad y monetización escalable.

### Decisión 3: Protocolo QoS Rural de 2 Niveles con Network Information API
- **Enfoque seleccionado**:
  - **Canal A (Uplink Crítico < 10 KB)**: Encolado de labores de bitácora y parcelas en `localStorage` con `clientLogId: uuidv4()`. Al reconectar, se procesan secuencialmente hacia `/api/field-logs` y `/api/parcels`.
  - **Canal B (Downlink Pesado > 500 KB)**: Mediante `navigator.connection` (`effectiveType === '2g' | 'slow-2g'` o `saveData === true` o RTT > 600ms), se activa un estado reactivo global `isLowBandwidthRural` que inhibe la carga masiva de teselas satelitales remotas y despliega un banner de optimización de datos en `ConnectivityStatusBadge.tsx`.
- **Alternativas consideradas**:
  - *Descargar mapas siempre y confiar en la caché del navegador*: Causa colapso de red (*bufferbloat*) y timeout en peticiones críticas cuando la señal celular rural es débil.

## Risks / Trade-offs

- **[Riesgo] Dispositivos sin soporte para `navigator.connection`** → **Mitigación**: Detección defensiva (`typeof navigator !== 'undefined' && 'connection' in navigator`). Si no existe la API, se infiere señal degradada mediante medición de latencia RTT en el ping del primer lote de texto.
- **[Riesgo] Duplicación de registros en reconexiones intermitentes** → **Mitigación**: Idempotencia obligatoria en `/api/field-logs` mediante `clientLogId`. Si el servidor ya almacenó la labor con ese UUID, devuelve `200 OK` sin duplicar.
- **[Riesgo] Sobre-simplificación del dictamen agronómico para productores** → **Mitigación**: Mantener recomendaciones concretas con cifras prácticas (dosis exactas en sacos de cal y abono orgánico por hectárea o tablón), evitando vaguedades.
