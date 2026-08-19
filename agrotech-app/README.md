# Agrotech Venezuela 🌾🛰️

**Plataforma WebGIS de Inteligencia Edafo-Climática, Zonificación de Cultivos y Prescripción Agronómica para Venezuela.**

Inspirada y potenciada con las clasificaciones de cobertura y uso del suelo (LULC) de **MapBiomas Venezuela**, Agrotech transforma la observación satelital en **decisiones agronómicas precisas, prescriptivas y de acción directa** para agrónomos, productores e investigadores agrícolas.

---

## 🌟 Visión e Innovación Tecnológica (Nivel Competición)

| Dimensión | MapBiomas Venezuela (Observacional) | Agrotech Venezuela (Prescriptivo y Acción) |
| :--- | :--- | :--- |
| **Enfoque** | Descriptivo / Histórico de coberturas (1985–2024). | Prescriptivo, predictivo y cálculo de precisión en tiempo real. |
| **Interacción** | Consulta y descarga de mapas temáticos. | **Gemelo Digital de Parcela**: Delimitación vectorial interactiva de fincas con cálculo geodésico de hectáreas. |
| **Edafología** | Cobertura vegetal general. | Cruzamiento fisicoquímico (pH, MO, N-P-K, textura) y curvas de tolerancia de cultivos autóctonos. |
| **Prescripción** | No prescriptivo. | **Calculadora de Enmiendas y Encalado**: Cálculo exacto de toneladas de Cal Agrícola/Dolomítica ($CaCO_3$) y plan de fertilización $N-P-K$. |

---

## 🏗️ Arquitectura y Stack Tecnológico

- **Frontend & WebGIS**: Next.js 16+ (App Router con Turbopack), React 19, Leaflet / React-Leaflet, CSS Modules Glassmorphism.
- **Backend & Geo-APIs**: Next.js Route Handlers (API REST con soporte GeoJSON FeatureCollection).
- **Base de Datos & ORM**: PostgreSQL 15 en contenedor Docker, Prisma ORM (Migraciones, Seeds y Trazabilidad Relacional).
- **Motor Geoespacial & Agronómico**:
  - Cálculo geodésico esferoidal de Shoelace para superficies en hectáreas (ha).
  - Algoritmo Multicriterio (AHP) de idoneidad y rendimiento de cultivos.
  - Generador y exportador nativo de polígonos GeoJSON estándar.
- **Seguridad**: Control de Acceso Basado en Roles (RBAC) con Middleware.
- **Testing & Calidad**: Suite integral de pruebas automatizadas con Jest (100% pasadas).
- **Documentación API**: Especificación OpenAPI 3.0 renderizada con Swagger UI interactivo en `/api-docs`.

---

## 🗺️ Módulos Principales del Sistema

### 1. Visor WebGIS Multidimensional (`/dashboard/mapa`)
- **Mapas Base de Alta Resolución**: Satélite Esri HD, CartoDB Dark Matter, OpenTopoMap (Relieve) y OpenStreetMap.
- **Capas Temáticas Superponibles**:
  - `🌱 Coberturas MapBiomas LULC`: Bosques, Pastizales, Agricultura, Sabanas, Agua.
  - `🧪 Semáforo de pH del Suelo`: Muy Ácido (<5.5), Moderado (5.5-6.5), Óptimo (6.5-7.5), Alcalino (>7.5).
  - `⭐ Fertilidad Edafológica`: Alta, Media y Baja.
  - `🌧️ Pluviometría Anual (mm)`.
- **Control de Opacidad Dinámico** y **Geo-Inspector Lateral** con desglose de coberturas por estado.
- **Marcadores GPS**: Puntos de muestreo de campo con trazabilidad científica (`AGRO-ZUL-042`, `AGRO-POR-108`, etc.).

### 2. Delimitador de Fincas y Gemelo Digital (`ParcelDiagnosticModal`)
- Herramienta interactiva **`📐 Delimitar Parcela`** sobre mapa satelital.
- Cálculo instantáneo de **Área en Hectáreas (ha)** y **Perímetro en km**.
- Ficha técnica descargable en **GeoJSON** y lista para impresión agronómica.

### 3. Motor Inteligente de Prescripción Edafológica (`/dashboard/recomendaciones`)
- Simulador en vivo para ajustar pH, Materia Orgánica, Textura y Hectáreas.
- Algoritmo AHP que evalúa y proyecta rendimientos en Ton/ha para:
  - **Maíz Blanco Harinero**, **Arroz de Riego**, **Plátano/Banano**, **Cacao Criollo Fino**, **Café Arábica**, **Caña de Azúcar**, **Soya** y **Pasturas Tropicales**.
- Receta de encalado con dosis recomendada por hectárea y toneladas totales requeridas.

### 4. Analítica Territorial & Geoestadísticas (`/dashboard/estadisticas`)
- Telemetría consolidada de Venezuela (~8.4M ha agrícolas, ~21.6M ha pastizales, 52.1% bosques).
- Balance edafológico nacional de acidez y estimador de captura de carbono ($CO_2$).

### 5. Catálogo Edafológico y de Cultivos (`/dashboard/suelos` y `/dashboard/cultivos`)
- Búsqueda en tiempo real, filtros dinámicos por nivel de acidez y exportador a CSV/Excel.

---

## 🔒 Sistema de Roles y Permisos (RBAC)

1. **ADMIN**: Control total del sistema, administración de usuarios y borrados destructivos (`DELETE`).
2. **AGRONOMIST (Ingeniero Agrónomo)**: Registro y edición de muestras edafológicas, catálogo de cultivos y prescripciones (`POST`, `PUT`, `GET`).
3. **PRODUCER (Productor Agrícola)**: Visualización WebGIS, simulación de parcelas, descarga de GeoJSON y exportación de reportes (`GET`).

---

## 🚀 Guía Rápida de Inicio (Entorno Local)

### 1. Requisitos Previos
- [Node.js](https://nodejs.org/en/) (v18 o superior)
- [Docker](https://www.docker.com/) y Docker Compose

### 2. Encender Base de Datos PostgreSQL
```bash
docker-compose up -d
```
*El contenedor PostgreSQL correrá en el puerto seguro `5444`.*

### 3. Configurar e Instalar Dependencias
```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 4. Ejecutar el Servidor de Desarrollo
```bash
npm run dev
```
- Visita **[http://localhost:3000](http://localhost:3000)** para la plataforma.
- Visita **[http://localhost:3000/dashboard/mapa](http://localhost:3000/dashboard/mapa)** para el Visor WebGIS.
- Visita **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)** para la Documentación Swagger OpenAPI.

### 5. Ejecutar la Suite de Pruebas Automatizadas
```bash
npm test
```

### 6. Compilación de Producción
```bash
npm run build
```

---

## 📡 API Endpoints Destacados

- `GET /api/geo`: Obtiene capas vectoriales GeoJSON (`?type=geojson`), puntos GPS (`?type=points`) o metadatos (`?type=metadata`).
- `GET /api/soils`: Listado de perfiles de suelo y datos fisicoquímicos.
- `GET /api/crops`: Catálogo de cultivos y requerimientos edafoclimáticos.
- `GET /api/recomendaciones`: Matriz de compatibilidad agronómica.
- `GET /api/export/stats?format=csv|excel`: Exportación consolidada de datos.

---

*Licencia MIT - Desarrollado por Frank Sousa (2026).*
