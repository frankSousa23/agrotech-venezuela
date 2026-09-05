# Agrotech Venezuela 🌾🛰️

**Plataforma Integral de Inteligencia Edafo-Climática, Visión Satelital Multi-Escala, Radar SAR Sentinel-1 Sin Nubes, Balance Hídrico & Grados Día (GDD), Cuantificación de Créditos de Carbono MRV, Machine Learning Agronómico, Accesibilidad Rural Dual-Mode UI y Asesoría Gemini AI.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Next.js 16](https://img.shields.io/badge/Next.js-16%20(Turbopack)-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-2.0-009688.svg)](https://fastapi.tiangolo.com/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.62-FF4B4B.svg)](https://streamlit.io/)
[![Python 3.13](https://img.shields.io/badge/Python-3.13-blue.svg)](https://www.python.org/)
[![PostgreSQL 15](https://img.shields.io/badge/PostgreSQL-15-336791.svg)](https://www.postgresql.org/)
[![Tests: 197 Passing](https://img.shields.io/badge/Tests-197%20Passing-brightgreen.svg)]()
[![TRL: 7](https://img.shields.io/badge/TRL-7%20(Validado%20en%20Campo)-orange.svg)]()

Inspirada y potenciada con las clasificaciones de cobertura y uso del suelo (LULC) de **MapBiomas Venezuela** (1985–2024), **Sentinel-1 SAR Radar**, **Sentinel-2 L2A (Copernicus)** y **NASA POWER**, Agrotech transforma la teledetección espacial en **decisiones agronómicas prescriptivas y de acción directa** para productores, extensionistas agrícolas e investigadores.

---

> 🛠️ **¿Eres desarrollador, ingeniero de software o auditor de código?**  
> Para consultar los diagramas de arquitectura de microservicios con mapeo de puertos, instrucciones de despliegue local en menos de 2 minutos (Turnkey Zero-Config), perfiles Docker y comandos de testing automatizado, visita la **[Guía de Arquitectura, Desarrollo y Despliegue (DEVELOPING.md)](DEVELOPING.md)**.

---

## ⚡ Acceso Inmediato y Modo Evaluación (1-Click Demo)

Para evaluadores, jurados de premiación e inversores, la plataforma cuenta con mecanismos de exploración inmediata sin barreras de entrada:

- **Modo Invitado (1-Click Sandbox)**: Acceso instantáneo en un clic a la experiencia completa sin necesidad de registrarse ni ingresar contraseñas. Cada sesión cuenta con almacenamiento efímero aislado para probar parcelas y bitácora sin interferir con otros usuarios.
- **Tour Demostrativo Guiado (`🎬 Tour Demo`)**: Recorrido de 5 paradas estratégicas accesible desde la cabecera principal y la barra móvil, diseñado para sintetizar los hitos del ecosistema en menos de 3 minutos.
- **Centro Oficial de Postulación (`/dashboard/postulacion`)**: Dossier institucional de madurez tecnológica **TRL 7**, descarga directa de los 5 PDFs oficiales del premio y artículo científico de validación en campo.

---

## 🌟 Visión e Innovación Tecnológica

| Dimensión | MapBiomas Venezuela (Observacional) | Agrotech Venezuela (Prescriptivo y Acción) |
| :--- | :--- | :--- |
| **Jerarquía Cartográfica** | Nivel Macro-Nacional estático. | **WebGIS Multi-Escala de 3 Niveles**: Nacional (24 Estados) ➔ Municipal (335 Polos Agrícolas) ➔ Micro-Parcela Sentinel-2 / Sentinel-1 SAR. |
| **Penetración de Nubes** | Obstruido en temporada de lluvias (satélites ópticos). | **Radar Sentinel-1 SAR (Banda C - 5.4 GHz)**: Monitoreo de humedad edáfica y anegamiento all-weather sin interferencia de nubes. |
| **Modelado Agroclimático** | Climatología general histórica. | **Grados Día de Desarrollo ($GDD_{10}^{30}$) & Balance Hídrico ($P - ET_c$)**: Predicción fenológica de fechas de floración y madurez fisiológica. |
| **Certificación de Carbono** | No disponible. | **Calculadora MRV de Créditos de Carbono**: Stock de SOC (tC/ha), secuestro anual ($\text{tCO}_2\text{e}/\text{ha}$) y valoración económica en USD (IPCC Tier 2 / Verra). |
| **Resiliencia Rural & PWA** | Dependencia de internet continuo. | **Modo Finca Offline**: PWA con almacenamiento IndexedDB local, sincronización reactiva y reaseguro de persistencia en el teléfono. |
| **Accesibilidad Campesina** | Interfaz analítica compleja. | **Dual-Mode UI**: *Modo Productor Fácil* (4 Puertas de acción, glosario coloquial, dictado por voz) vs *Modo Técnico* para especialistas. |
| **Modelado de Cosecha** | No disponible. | **Machine Learning Agronómico**: Proyección de rendimiento en **Ton/ha** para 8 cadenas agrícolas estratégicas venezolanas. |
| **Prescripción de Campo** | No prescriptivo. | **Calculadora de Encalado ($CaCO_3$) y Plan Nutricional $N-P-K$** adaptado a los insumos comerciales del país. |
| **Calibración Regional** | No disponible. | **Modelos Edafológicos Geo-Diferenciados**: Kamprath $Al^{3+}$ en sabanas orientales, balance Ca:Mg en Sur del Lago y Yeso Agrícola ($CaSO_4 \cdot 2H_2O$) en Quíbor/Lara. |
| **Normalización Campesina** | No disponible. | **Parser Vernacular por Voz**: Mapeo offline de medidas tradicionales (saco = 50kg, tambor = 200L, caneca = 20L, tablón = 1.0ha) directo a la Bitácora. |
| **Maquinaria & Drones** | No disponible. | **Suite Tri-Modal VRA**: Shapefiles ESRI UTM 19N para tractores GPS, misiones de vuelo KML para drones y fichas analógicas de cabina (1 pág). |
| **Gestión del Productor** | No disponible. | **Mis Tierras & Cuaderno de Campo Digital**: Registro cronológico de siembras, encalados, fertilizaciones y cosechas reales. |
| **Inteligencia Artificial** | No disponible. | **Agente Google Gemini AI**: Diagnósticos edafológicos y chat agronómico contextualizado con 40 años de datos históricos. |

---

## 🎯 De la Característica Técnica al Beneficio Tangible

Aplicamos de forma estricta la fórmula de valor agronómico:  
$$\mathbf{Característica\ Técnica} + \mathbf{Problema\ del\ Campo\ Resuelto} = \mathbf{Beneficio\ Tangible\ para\ la\ Cosecha}$$

| Capacidad Técnica | Problema Agrícola Real | Beneficio Tangible / Impacto Directo |
| :--- | :--- | :--- |
| **Radar SAR Sentinel-1 (Banda C - 5.4 GHz)** | En el invierno lluvioso (mayo-noviembre), las nubes densas bloquean los satélites ópticos tradicionales durante semanas críticas. | **Monitoreo Ininterrumpido de Cultivos y Anegamiento**: Detecta a tiempo la saturación hídrica a través de las nubes, salvando la cosecha antes de que el exceso de agua pudra las raíces. |
| **Grados Día ($GDD_{10}^{30}$) & Balance Hídrico** | Los agricultores suelen sembrar y fertilizar guiándose por fechas fijas de calendario o intuición empírica, fallando ante variaciones climáticas. | **Certeza Fenológica de Cosecha**: Modela el crecimiento térmico real según temperatura y lluvia de NASA POWER, indicando el momento exacto para fertilizar y entrar a cosechar con grano maduro. |
| **Dual-Mode UI (4 Puertas Campesinas)** | La mayoría de las aplicaciones AgTech son diseñadas para pantallas grandes y con lenguaje inaccesible para campesinos de campo. | **Inclusión Digital Inmediata**: Reduce la curva de aprendizaje a cero mediante 4 botones táctiles gigantes en lenguaje cotidiano, operable bajo pleno sol y con una sola mano. |
| **Modo Finca Offline & PWA Resiliente** | La señal celular 3G/4G es casi nula o intermitente en la gran mayoría de las parcelas y potreros rurales de Venezuela. | **Cero Pérdida de Datos en Lote**: Toda la información de parcelas y labores se guarda segura en el móvil y se sincroniza automáticamente al llegar al pueblo o recuperar cobertura. |
| **Calculadora MRV de Créditos de Carbono** | Los agricultores que aplican siembra directa o coberturas no tienen forma de cuantificar ni monetizar su aporte ecológico. | **Monetización de Prácticas Regenerativas**: Traduce la conservación del suelo en toneladas de $\text{CO}_2$ secuestradas, permitiendo certificar y negociar bonos de carbono bajo metodologías IPCC / Verra. |
| **Delimitador de Parcela Shoelace WGS84** | Medir fincas con topógrafos o GPS diferenciales es costoso y lento para pequeños y medianos productores. | **Catastro Autónomo Instantáneo**: Permite trazar el polígono del lote en segundos sobre la imagen satelital y obtener el área exacta en hectáreas con corrección de curvatura terrestre. |
| **Machine Learning de Cosecha (8 Cadenas)** | La incertidumbre sobre cuántos kilos rendirá el lote complica negociar compras de insumos, créditos bancarios y fletes. | **Previsibilidad Financiera**: Proyecta el rendimiento en Ton/ha cruzando suelo, clima y manejo, permitiendo al productor pactar precios de venta y planificar fletes con anticipación. |
| **Dictado por Voz Nativo (Web Speech API)** | Campesinos con manos sucias de tierra o poca destreza para escribir en teclados táctiles evitan registrar sus tareas. | **Bitácora por Voz Sin Teclado**: Permite registrar labores hablando naturalmente en español venezolano (*"Hoy apliqué urea al lote 2"*), transcribiéndose automáticamente a la bitácora. |

---

## 🌾 El Viaje del Productor: Los 3 Pilares del Ecosistema

En lugar de una lista plana de módulos dispersos, la plataforma estructura sus capacidades siguiendo la secuencia natural de adopción y toma de decisiones del agricultor:

```
                      EL VIAJE INTEGRAL DEL PRODUCTOR AGRÍCOLA
                      
     ┌────────────────────────┐    ┌────────────────────────┐    ┌────────────────────────┐
     │        PILAR I         │    │        PILAR II        │    │       PILAR III        │
     │  Accesibilidad Rural   │───▶│ Inteligencia Agronómica│───▶│ Sostenibilidad y Éxito │
     │ (Cero Barrera Entrada) │    │(Decisión y Diagnóstico)│    │(Rendimiento y Retorno) │
     └────────────────────────┘    └────────────────────────┘    └────────────────────────┘
      • Dual-Mode UI (4 Puertas)    • WebGIS Multi-Escala         • MRV Créditos Carbono
      • Modo Offline + IndexedDB    • Radar SAR All-Weather       • Plan Encalado & N-P-K
      • Dictado por Voz Campesino   • Grados Día (GDD) & Clima    • Riego Agro-IoT Ahorro
      • Omnibox & Guest Sandbox     • ML Cosecha (8 Cadenas)      • Expediente TRL 7 Premio
```

---

### 🚪 Pilar I: Accesibilidad y Adopción Rural (Cero Barrera de Entrada)
*¿Cómo logra un agricultor de campo sin internet estable ni destreza tecnológica adoptar esta herramienta?*

1. **Interfaz Dual-Mode (Modo Productor Fácil vs Modo Técnico)**: Switch persistente en la cabecera que transforma el sistema entre un panel ultra-simplificado para el campesino y una consola avanzada con capas GIS completas para ingenieros y científicos.
2. **Las 4 Puertas Campesinas**: Acceso táctil directo a intenciones clave:
   - 🌾 *Saber cómo está mi tierra* (`/dashboard?tab=tierras`)
   - 🛰️ *Ver si va a llover o secar* (`/dashboard?tab=clima`)
   - 📐 *Medir mi parcela* (`/dashboard?tab=tierras&action=draw`)
   - 📝 *Anotar lo que hice hoy* (`/dashboard?tab=bitacora`)
3. **Modo Finca Offline & Reaseguro Psicológico**: Almacenamiento local en IndexedDB con un mensaje de certeza al productor: *"🔒 Tranquilo, tu finca está guardada en este teléfono y sincronizará en cuanto tengas señal"*.
4. **Navegador de Intenciones & Dictado por Voz Nativo**: Modal con 6 tarjetas de acción guiada y reconocimiento de voz mediante **Web Speech API (`es-VE`)** para operar sin necesidad de teclear.
5. **Glosario Edáfico Cultural**: Traducción de términos científicos al vocabulario del campo venezolano (*Tierra Mansa* vs *Tierra Brava*, *Ojos Satelitales Radar SAR*, *Medida Shoelace*).
6. **Omnibox Global (Ctrl+K) & Modo Pleno Sol**: Buscador universal tipo Spotlight para saltar entre estados, municipios y herramientas en 1 segundo, junto con un tema de ultra-alto contraste optimizado para pantallas bajo radiación solar intensa (WCAG AAA).

---

### 🛰️ Pilar II: Inteligencia Agronómica y Observación Satelital Sin Nubes
*¿Qué información crítica e inédita recibe el productor para tomar decisiones agronómicas preventivas?*

7. **Visor WebGIS Multi-Escala de 3 Niveles (`/dashboard/mapa`)**:
   - **Nivel 1 (Nacional)**: Cobertura de los 24 estados venezolanos con semáforo de pH edáfico, precipitación acumulada y capas satelitales en vivo.
   - **Nivel 2 (Municipal)**: Zoom automático a 335 municipios y polos agrícolas clave (Turén, Calabozo, Colón, Pedraza, Quíbor) con centros de acopio y pH zonal.
   - **Nivel 3 (Micro-Parcela)**: Delimitación de lotes con cálculo esferoidal de hectáreas mediante **Shoelace geodésico proyectado sobre WGS84**.
8. **Radar SAR Sentinel-1 Banda C (5.4 GHz) All-Weather**: Monitoreo de retrodispersión dual ($\gamma^\circ_{\text{VV}}/\gamma^\circ_{\text{VH}}$) capaz de atravesar nubes densas y determinar el índice de saturación de humedad en suelo sin depender de días despejados.
9. **Motor Hidro-Térmico (GDD & Balance Hídrico)**: Predicción cronológica de estadios fenológicos ($V_E$, $V_6-V_8$, $R_1$, $R_3-R_4$, $R_6$) cruzando grados día acumulados ($10.0^\circ\text{C}$ a $30.0^\circ\text{C}$) con balance hídrico mensual ($P - ET_c$) de NASA POWER.
10. **Machine Learning de Rendimiento Agronómico**: Modelos de regresión calibrados para predecir el rendimiento comercial en **Ton/ha** para 8 cadenas estratégicas: Maíz Blanco, Arroz, Cacao Criollo, Café Arábica, Caña de Azúcar, Plátano, Soya y Tomate Cherry / Hortalizas Protegidas.
11. **Simulador Edafológico & Asesor Gemini AI (`/dashboard/recomendaciones`)**: Ajuste interactivo de pH, materia orgánica y textura, generando dictámenes agronómicos con IA contextualizados a 40 años de transiciones MapBiomas.
12. **Espacio del Productor: "Mis Tierras" y "Cuaderno de Campo Digital"**: Catálogo de parcelas delimitadas y bitácora cronológica de labores (siembra, encalado, fertilización, riego y cosecha real) para contrastar el pronóstico con la cosecha real.

---

### 📈 Pilar III: Sostenibilidad, Retorno Económico y Madurez Institucional
*¿Cómo se traduce la tecnología en mayores ingresos para el productor y respaldo formal para el proyecto?*

13. **Calculadora MRV de Créditos de Carbono (`CarbonCreditsCalculator`)**: Cuantificación de Stock de Carbono Orgánico en Suelo ($SOC$) y secuestro anual ($\text{tCO}_2\text{e}/\text{ha}/\text{año}$) bajo manejo regenerativo (Siembra Directa + Coberturas vs Agroforestería) con valoración económica en USD (IPCC Tier 2 / Verra VCS).
14. **Calculadora de Encalado ($CaCO_3$) y Plan Nutricional $N-P-K$**: Cálculo estequiométrico de enmiendas calcáreas según saturación de aluminio y curvas de fertilización ajustadas a los fertilizantes disponibles en Venezuela.
15. **Laboratorio Agro-IoT de Micro-Cultivo & Riego Predictivo (`/dashboard/iot`)**: Banco interactivo de experimentación con sensores de humedad edáfica (% VWC), esquemas de hardware económicos (< $35 USD) y algoritmo de supresión de riego sincronizado con NASA POWER para ahorro hídrico y energético.
16. **Centro Oficial de Postulación MapBiomas 2026 (`/dashboard/postulacion`)**: Expediente integral con madurez tecnológica **TRL 7 (Sistema Validado en Entorno Real)**, matriz de cumplimiento ante el jurado calificador y descarga directa de los 5 documentos oficiales en PDF y Markdown.

---

## 🧪 Validación y Calidad Técnica (197 Tests Aprobados)

El proyecto mantiene una suite rigurosa de pruebas automatizadas que se ejecuta antes de cualquier integración a la rama principal:

| Suite de Validación | Comando | Métricas Verificadas | Estado |
| :--- | :--- | :--- | :---: |
| **Pruebas Frontend Jest** | `npm test` | **145 tests aprobados** (24 suites: WebGIS, Radar SAR, GDD, Auth, PWA, IoT, UX Rural, Vernacular Parser, Machinery) | ✅ 100% |
| **Verificación TypeScript** | `npm run typecheck` | **0 errores** de compilación estricta | ✅ 100% |
| **Compilación Turbopack** | `npm run build` | **28 rutas de producción limpias** en Next.js 16 | ✅ 100% |
| **Pruebas Backend Pytest** | `npm run test:backend` | **52 tests aprobados** (FastAPI, ML Cosecha, Algoritmos Geoespaciales) | ✅ 100% |
| **Suite Automatizada Completa** | `npm run test:all` | **197 de 197 pruebas en verde** | ✅ 100% |

> Para consultar la guía de ejecución paso a paso de cada suite, consulta [DEVELOPING.md](DEVELOPING.md#4-suite-completa-de-pruebas-y-verificación-197-tests).

---

## 📜 Licenciamiento y Atribución

- **Código Fuente**: Licencia **MIT** (Copyright © 2026 Frank Sousa - Agrotech Venezuela).
- **Datos de Cobertura y Uso del Suelo**: Referencian y construyen sobre la iniciativa **MapBiomas Venezuela** (Provita, LSIGMA USB, Wataniba y RAISG), disponible bajo licencia **Creative Commons Atribución 4.0 Internacional (CC BY 4.0)**.

**Uso de MapBiomas en el Proyecto:**  
Agrotech Venezuela integra los datos de cobertura vegetal de MapBiomas para comprender la evolución histórica del suelo (1985–2024). Esta información se procesa junto con datos climáticos (NASA POWER), radar SAR (Sentinel-1) y modelos de IA para generar **prescripciones agronómicas de alta precisión**. El objetivo de esta integración es ayudar al productor a elegir el cultivo adecuado, evaluar el secuestro de carbono y aplicar prácticas regenerativas, con el fin último de **mejorar la productividad de las siembras y garantizar la sostenibilidad agrícola**.
