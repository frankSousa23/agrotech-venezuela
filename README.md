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

1. **Visor WebGIS Multidimensional (`/dashboard/mapa`)**: 4 Mapas base (Satélite Esri HD, Dark, Relieve, OSM), 4 capas temáticas MapBiomas/pH/Fertilidad/Lluvia con control de opacidad, Geo-Inspector lateral y marcadores GPS.
2. **Delimitador de Fincas y Gemelo Digital (`ParcelDiagnosticModal`)**: Trazo vectorial de parcelas, cálculo de hectáreas, diagnóstico de cobertura y exportación a GeoJSON.
3. **Motor Inteligente de Prescripción Edafológica (`/dashboard/recomendaciones`)**: Simulador AHP en vivo con receta de encalado y dosis balanceada $N-P-K$.
4. **Analítica Territorial & Geoestadísticas (`/dashboard/estadisticas`)**: Telemetría nacional de usos de suelo y estimador de captura de $CO_2$.
5. **Catálogo Edafológico y de Cultivos (`/dashboard/suelos` y `/dashboard/cultivos`)**: Búsqueda en tiempo real, filtros dinámicos por nivel de acidez y exportador a CSV/Excel.

---

## 🚀 Guía Rápida de Inicio (Entorno Local)

```bash
# 1. Clonar e ingresar a la carpeta de la app
cd agrotech-app

# 2. Encender base de datos PostgreSQL en Docker
docker-compose up -d

# 3. Instalar y configurar base de datos
npm install
npx prisma generate
npx prisma db push
npx prisma db seed

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Correr tests automatizados
npm test
```

- Dashboard: [http://localhost:3000](http://localhost:3000)
- Visor WebGIS: [http://localhost:3000/dashboard/mapa](http://localhost:3000/dashboard/mapa)
- Documentación API (Swagger): [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📄 Licencia, Términos Open Source y Atribución

### Licencia de Software (Código Abierto)
Este proyecto está publicado bajo los términos de la **Licencia MIT**:
- **Uso libre y gratuito**: Cualquier persona u organización puede usar, estudiar, modificar, integrar y distribuir este software de forma gratuita tanto para fines académicos como comerciales.
- **Condición de atribución**: Se requiere mantener el aviso de copyright original y otorgar el debido crédito al creador del proyecto (**Frank Sousa - Agrotech Venezuela**).

### Atribución y Reconocimiento a MapBiomas Venezuela
Las clasificaciones temáticas de cobertura y uso del suelo (LULC) integradas como referencia en esta plataforma están fundamentadas en los datos abiertos de la iniciativa **MapBiomas Venezuela**, publicados bajo la licencia internacional **Creative Commons Atribución 4.0 (CC BY 4.0)**:
- **Referencia Oficial**: *Colección de Cobertura y Uso del Suelo de Venezuela*, desarrollada por **Provita**, el **Laboratorio LSIGMA de la Universidad Simón Bolívar (USB)**, **Wataniba** y la **Red Amazónica de Información Socioambiental Georreferenciada (RAISG)**.
- **Portales de Acceso**: [venezuela.mapbiomas.org](https://venezuela.mapbiomas.org) | [plataforma.venezuela.mapbiomas.org](https://plataforma.venezuela.mapbiomas.org)

---

*Desarrollado con fines de innovación científica y tecnológica por Frank Sousa (2026).*
