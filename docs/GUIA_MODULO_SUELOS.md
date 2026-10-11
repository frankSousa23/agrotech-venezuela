# 🌾 Guía de Operación y Simulación: Módulo de Suelos de MapBiomas Venezuela 🛰️
### *Del Píxel Satelital al Surco Campesino: Manual de Uso en Terreno y Simulación Agronómica*

**Autor:** Ing. Frank Alfonso Sousa Mota — Agrotech Venezuela  
**Licencia:** MIT (Software Libre) | Atribución de Coberturas: MapBiomas Venezuela (CC BY 4.0)  
**Nivel de Madurez:** TRL 4 (Prototipo Operacional Validado con 306 Pruebas Automatizadas)  

---

## 🧭 1. Visión General del Módulo de Suelos

El **Módulo de Suelos de MapBiomas Venezuela** fue diseñado como la extensión edafológica de código abierto para complementar la Colección 3.0 (1985–2024) de MapBiomas Venezuela. Mientras que los mapas de cobertura tradicionales muestran la superficie de la vegetación, este módulo traduce **40 años de memoria territorial** en:
1. **Física del Suelo Subsuperficial**: Curvas de retención de humedad ($pF$), Capacidad de Campo ($\theta_{FC}$), Punto de Marchitez Permanente ($\theta_{PWP}$) y Agua Fácilmente Disponible ($\text{PAW} \%$) mediante el modelo regionalizado de Saxton-Rawls.
2. **Química Edafológica y Enmiendas**: Dosificación cuantitativa de enmiendas para sabanas ácidas (modelo Kamprath modificado para neutralizar $Al^{3+}$ fitotóxico), equilibrio Ca:Mg con cal dolomítica para el Sur del Lago, y Yeso Agrícola ($CaSO_4 \cdot 2H_2O$) para suelos salino-sódicos en Quíbor ($pH \ge 7.4$).
3. **Prescripción Operativa Tri-Modal**: Generación directa de Shapefiles VRA para tractores GPS, misiones de vuelo KML para drones y fichas analógicas impresas de cabina en unidades tradicionales (sacos de cal por tablón).
4. **Federación Cloud & GEE**: Generación de scripts para el Google Earth Engine Code Editor y endpoints REST federados con CORS habilitado.

---

## 🗺️ 2. Flujo 1: Cómo Usar el Módulo desde los Mapas WebGIS

El visor WebGIS interactivo (`/dashboard/mapa`) cuenta con tres puertas de entrada directas hacia el simulador de suelos:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        3 ENTRADAS DESDE EL MAPA                        │
├──────────────────────────┬─────────────────────────────┬───────────────┤
│ Entrada 1: Chincheta     │ Entrada 2: Tarjeta          │ Entrada 3:    │
│ de Suelo (Punto)         │ Municipal (Nivel 3)         │ Parcela (Pol) │
├──────────────────────────┼─────────────────────────────┼───────────────┤
│ Clic en marcador         │ Clic en municipio           │ Delimitar     │
│ verde/azul/ámbar.        │ en el selector multi-nivel. │ polígono con  │
│ Popup con textura,       │ Panel derecho muestra       │ Shoelace.     │
│ pH y MO%.                │ textura dominante y pH prom.│ Modal con     │
│ Botón:                   │ Botón:                      │ análisis.     │
│ [🔬 Simular en Módulo]   │ [🔬 Simular Suelo Municipio]│ [🔬 Simular]  │
└────────────┬─────────────┴──────────────┬──────────────┴───────┬───────┘
             │                            │                      │
             └───────────────────┬────────┴──────────────────────┘
                                 ▼
         Redirección automática con parámetros de consulta:
  /dashboard/suelos?tab=simulator&texture=franco_arcilloso&ph=5.2&om=2.8
```

### Paso a Paso en el Mapa:
1. **Ingreso al Visor**: Abre el navegador en `http://localhost:3000/dashboard/mapa`.
2. **Activación de Capas**: En el menú de capas, asegúrate de activar la capa **"Muestreo Edafológico"** o navegar a través de la jerarquía territorial (Nivel 1 Nacional ➔ Nivel 2 Municipal ➔ Nivel 3 Parcela).
3. **Selección del Punto o Región**:
   - **Opción A (Punto de Muestreo)**: Haz clic sobre cualquiera de las 1.245 estaciones edafológicas calibradas. En el popup emergente verás el botón azul: **`🔬 Simular en Módulo de Suelos ➔`**.
   - **Opción B (Municipio)**: Al seleccionar un municipio productivo (por ejemplo, *Turén*, *Calabozo* o *Torres*), el visor despliega la ficha del municipio con el botón: **`🔬 Simular Suelo del Municipio`**.
   - **Opción C (Parcela Propia)**: Dibuja tu predio con la herramienta de polígono. El modal de diagnóstico calculará el área geodésica WGS84 y mostrará el botón: **`🔬 Simular Suelo pF`**.
4. **Transferencia Instantánea**: Al presionar cualquiera de estos botones, el sistema te redirigirá a `/dashboard/suelos?tab=simulator`, abriendo directamente la pestaña de simulación y moviendo los sliders a los valores exactos capturados en el mapa.

---

## 🧮 3. Flujo 2: Experimentación en el Simulador de Suelos (`/dashboard/suelos`)

La estación de trabajo cuenta con 4 pestañas especializadas. La pestaña central es el **Simulador Saxton-Rawls & Kamprath (pF)**:

### 3.1 Controles Deslizantes (Entradas del Productor o Técnico)
- **Textura del Suelo**: Selector de 4 clases texturales representativas:
  - `Arenoso`: Suelos de sabana oriental o dunas aluviales. Baja retención hídrica ($\theta_{crit} = 9.0\%$).
  - `Franco`: Suelo ideal equilibrado en arena, limo y arcilla. Retención media ($\theta_{crit} = 20.0\%$).
  - `Franco Arcilloso`: Textura fértil de vegas de río y llanos altos occidentales.
  - `Arcilloso`: Suelos pesados vérticos (ej. Calabozo o Sur del Lago). Alta capacidad hídrica ($\theta_{crit} = 35.0\%$).
- **pH del Suelo**: Rango de 4.0 a 8.5.
  - $pH < 5.2$: Activa alerta de acidez severa y toxicidad por aluminio.
  - $5.5 \le pH \le 6.8$: Rango óptimo agronómico para cereales y leguminosas.
  - $pH \ge 7.4$: Activa alerta de alcalinidad y sodicidad en valles áridos.
- **Materia Orgánica (MO %)**: Rango de 0.5% a 6.0%. Modela el impacto de la labranza conservacionista.
- **Aluminio Intercambiable ($Al^{3+}$)**: Rango de 0.0 a 4.0 meq/100g de suelo.

---

### 3.2 Comprensión de las Salidas del Simulador

```
          Tensión de Matriz Suelo-Agua (pF / Logarítmica)
      pF 4.2 ───┐ Punto de Marchitez Permanente (PWP / Agua Inaccesible)
                │
                │ ◄─── AGUA DISPONIBLE (PAW) = θ_FC - θ_PWP ───►
                │      (Rango de absorción radicular efectiva)
      pF 2.5 ───┴─── Capacidad de Campo (FC / Humedad Óptima de Riego)
      pF 0.0 ─────── Saturación Total (Encharcamiento / Asfixia)
```

1. **Curva de Retención Hídrica en Tiempo Real (Gráfico Interactivo)**:
   - Dibuja la curva volumétrica de agua $\theta$ frente al potencial mátrico $\psi$ (desde saturación a 0 kPa hasta marchitez a 1.500 kPa / pF 4.2).
   - Muestra visualmente la franja de **Agua Disponible (PAW)**. Si incorporas materia orgánica o cambias la textura, verás cómo la franja se ensancha en vivo.
2. **Regla de Riego Crítico**:
   - El sistema calcula $\theta_{crit}$. Si la humedad actual cae por debajo del 50% de PAW, emite la alerta: *"Déficit Hídrico: Activar riego suplementario"*.
3. **Diagnóstico Químico Determinista de Enmienda**:
   - **Caso Sabana Ácida ($pH < 5.2$)**:
     $$\text{Dosis de Cal (t/ha)} = 1.5 \times Al^{3+} \times \frac{100}{\text{PRNT}}$$
     Muestra la dosis calculada tanto en toneladas métricas por hectárea como en **sacos de 50 kg por tablón criollo (1 ha)**.
   - **Caso Sur del Lago**: Recomienda Cal Dolomítica ($CaCO_3 + MgCO_3$) para mantener el balance $Ca:Mg$ entre 3:1 y 4:1.
   - **Caso Quíbor / Lara ($pH \ge 7.4$)**:
     Recomienda **Yeso Agrícola** ($CaSO_4 \cdot 2H_2O$) a razón de 2.5 t/ha para lixiviar el sodio intercambiable ($Na^+$) mediante sulfatos sin elevar más el pH.

---

## 🚜 4. Flujo 3: Exportación y Aplicación en Campo

Una vez ajustada la simulación, dirígete a la pestaña **Export Hub & Federación MapBiomas**:

### 1. Para Tractores con GPS y Piloto Automático (Shapefiles VRA)
- Haz clic en **"Descargar Shapefile VRA"**.
- Obtendrás un archivo comprimido `.zip` con capas ESRI vectoriales proyectadas en **UTM Zona 19N (EPSG:32619)** WGS84.
- Atributos incluidos en la tabla DBF:
  - `RATE_LIME`: Dosis variable de cal calculada (kg/ha).
  - `RATE_NPK`: Dosis recomendada de fertilizante de fondo.
  - `AREA_HA`: Superficie exacta Shoelace geodésica.
- Carga el paquete directamente en la consola del tractor (Trimble, John Deere GreenStar, Topcon).

### 2. Para Fumigación o Fertilización Aérea con Drones (Misiones KML)
- Haz clic en **"Descargar Misión KML"**.
- Compatible con DJI Agras (T30, T40, T50) y software XAG One.
- Incluye el polígono georreferenciado y las zonas de dosificación para pulverización aérea.

### 3. Para Tractores Tradicionales sin Electrónica (Ficha Analógica de Cabina)
- Haz clic en **"Imprimir Ficha de Cabina"**.
- Genera un documento analógico de 1 página optimizado para imprimir o llevar en el teléfono.
- Traduce las dosis a lenguaje campesino: *"Aplicar 29 sacos de 50 kg de cal dolomítica por tablón (1 ha)"*.

### 4. Para Científicos de MapBiomas y SIG (Script GEE)
- Haz clic en **"Generar Script GEE"**.
- Copia el código JavaScript autogenerado y pégalo en [Google Earth Engine Code Editor](https://code.earthengine.google.com/).
- El script carga la Colección 3.0 de MapBiomas Venezuela y superpone los perfiles edafológicos con leyendas clasificadas.

### 5. Para Embeber en Portales Web Institucionales (Microfrontend)
- En la pestaña **Microfrontend Embed**, copia el snippet HTML:
  ```html
  <iframe 
    src="https://agrotech.venezuela.org/embed/soil-module" 
    width="100%" 
    height="650" 
    frameborder="0">
  </iframe>
  ```
- Permite que la plataforma oficial de MapBiomas Venezuela integre la calculadora edafológica en su sitio web con una sola línea de código.

---

## 📊 5. Glosario Rápido de Parámetros Edafológicos

| Parámetro | Símbolo | Unidad | Significado Agronómico |
| :--- | :---: | :---: | :--- |
| **Capacidad de Campo** | $\theta_{FC}$ | $\%$ vol | Humedad máxima que retiene el suelo contra la gravedad (1-2 días tras lluvia/riego). |
| **Punto de Marchitez Permanente** | $\theta_{PWP}$ | $\%$ vol | Límite inferior donde las raíces de las plantas ya no pueden extraer agua. |
| **Agua Fácilmente Disponible** | $\text{PAW}$ | $\%$ vol | Rango hídrico óptimo aprovechable ($\theta_{FC} - \theta_{PWP}$). |
| **Potencial Mátrico** | $pF$ | log(cm $H_2O$) | Medida de la fuerza con la que la matriz del suelo retiene el agua. |
| **Aluminio Intercambiable** | $Al^{3+}$ | $\text{meq}/100\text{g}$ | Catión fitotóxico soluble a $pH < 5.2$ que quema las puntas de las raíces y fija fósforo. |
| **Poder Relativo de Neutralización Total** | $\text{PRNT}$ | $\%$ | Eficacia química de la cal agrícola comercial (típicamente 70% a 90% en Venezuela). |
| **Tablón Campesino** | Tablón | $1.0\text{ ha}$ | Unidad tradicional de labranza en los llanos centrales y occidentales. |
| **Saco Agrícola** | Saco | $50\text{ kg}$ | Unidad de empaque comercial de fertilizantes y enmiendas en Venezuela. |
