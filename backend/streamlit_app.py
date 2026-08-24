"""
Agrotech Venezuela - Streamlit Interactive Spatial & AI Dashboard (Semana 3)
Plataforma interactiva de visualización geoespacial, gemelo digital de parcelas,
predicción de cosechas con Machine Learning y asesoría agronómica con Google Gemini.
"""

import streamlit as st
import time
import json
from streamlit_folium import st_folium

from src.gee_connector import GEEConnector
from src.nasa_power_client import NasaPowerClient
from src.sentinel_processor import SentinelProcessor
from src.cache_manager import CacheManager
from src.ml_feature_engine import MLFeatureEngine
from src.crop_yield_predictor import CropYieldPredictor
from src.risk_and_carbon_engine import RiskAndCarbonEngine
from src.gemini_agro_advisor import GeminiAgroAdvisor
from src.viz_utils import create_folium_map, create_mapbiomas_timeline_chart, create_crop_yield_bar_chart, create_carbon_scenarios_chart
from src.report_generator import ReportGenerator

# Configuración de Página
st.set_page_config(
    page_title="Agrotech Venezuela 🌾🛰️ | AI & WebGIS Dashboard",
    page_icon="🌾",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Inicializar Servicios en Caché de Streamlit
@st.cache_resource
def load_services():
    cache_mgr = CacheManager()
    gee_conn = GEEConnector()
    nasa_client = NasaPowerClient()
    sentinel_proc = SentinelProcessor(gee_connector=gee_conn)
    feature_engine = MLFeatureEngine()
    yield_predictor = CropYieldPredictor()
    risk_carbon_engine = RiskAndCarbonEngine()
    gemini_advisor = GeminiAgroAdvisor()
    return cache_mgr, gee_conn, nasa_client, sentinel_proc, feature_engine, yield_predictor, risk_carbon_engine, gemini_advisor

cache_mgr, gee_conn, nasa_client, sentinel_proc, feature_engine, yield_predictor, risk_carbon_engine, gemini_advisor = load_services()

# Coordenadas preestablecidas de zonas agrícolas venezolanas
PRESET_LOCATIONS = {
    "Turén, Portuguesa (Granero de Venezuela - Maíz/Soya)": (9.3240, -69.1120),
    "Sur del Lago de Maracaibo, Zulia (Plátano/Palma/Cacao)": (8.9850, -71.7240),
    "Calabozo, Guárico (Sistema de Riego - Arroz)": (8.9240, -67.4280),
    "Chuao, Aragua (Cacao Criollo Fino Ancestral)": (10.4910, -67.5310),
    "Bailadores, Mérida (Andes - Hortalizas/Papa)": (8.2250, -71.8150),
    "Maturín, Monagas (Mesas Orientales - Soya/Pino)": (9.7450, -63.1850)
}

# --- BARRA LATERAL: ENTRADA DE DATOS Y SLIDERS (Día 17) ---
with st.sidebar:
    st.image("https://img.icons8.com/color/96/wheat.png", width=64)
    st.title("Agrotech Venezuela")
    st.caption("Inteligencia Edafo-Climática y Prescripción Agronómica")
    st.divider()

    st.subheader("📍 1. Localización del Terreno")
    preset_choice = st.selectbox("Seleccionar Región Agrícola:", list(PRESET_LOCATIONS.keys()))
    default_lat, default_lon = PRESET_LOCATIONS[preset_choice]

    col_lat, col_lon = st.columns(2)
    with col_lat:
        lat = st.number_input("Latitud GPS:", value=default_lat, format="%.5f")
    with col_lon:
        lon = st.number_input("Longitud GPS:", value=default_lon, format="%.5f")

    parcel_name = st.text_input("Nombre de la Parcela:", value=f"Finca {preset_choice.split(',')[0]}")
    area_ha = st.slider("Superficie Evaluada (ha):", min_value=1.0, max_value=500.0, value=25.0, step=1.0)

    st.subheader("🧪 2. Parámetros Edafológicos")
    ph = st.slider("pH del Suelo (Acidez/Alcalinidad):", min_value=4.0, max_value=8.5, value=6.2, step=0.1)
    om = st.slider("Materia Orgánica (%):", min_value=0.5, max_value=8.0, value=3.2, step=0.1)
    texture = st.selectbox("Textura del Suelo:", ["Franco", "Franco-arcilloso", "Franco-limoso", "Arcilloso", "Franco-arenoso", "Arenoso"], index=2)

    force_refresh = st.checkbox("Forzar consulta satelital en vivo (Omitir caché)", value=False)

# --- PROCESAMIENTO ESPACIAL Y MACHINE LEARNING ---
start_t = time.time()
soil_dict = {"ph": ph, "organic_matter_pct": om, "texture": texture}

# 1. Recuperar o Ingestar Datos Espaciales
cached_data = cache_mgr.get_cached_profile(lat, lon) if not force_refresh else None
if cached_data:
    mapbiomas_data = cached_data["mapbiomas"]
    climate_data = cached_data["climate"]
    sentinel_data = cached_data["sentinel"]
    is_from_cache = True
else:
    mapbiomas_data = gee_conn.get_pixel_history(lat, lon)
    climate_data = nasa_client.fetch_daily_agroclimate(lat, lon)
    sentinel_data = sentinel_proc.get_parcel_vegetation_profile(lat, lon)
    cache_mgr.set_cached_profile(lat, lon, mapbiomas_data, climate_data, sentinel_data, soil_dict)
    is_from_cache = False

elapsed_ms = round((time.time() - start_t) * 1000, 1)

# 2. Vectorización y Predicción ML
feat_result = feature_engine.build_feature_vector(soil_dict, climate_data, sentinel_data, mapbiomas_data)
ml_predictions = yield_predictor.predict(feat_result["features_dict"])
risks_data = risk_carbon_engine.evaluate_risks(feat_result["features_dict"])
carbon_data = risk_carbon_engine.model_carbon_sequestration(feat_result["features_dict"], area_ha)

# --- HEADER Y TELEMETRÍA SUPERIOR ---
st.markdown(f"## 🌾 Gemelo Digital: **{parcel_name}**")
col_m1, col_m2, col_m3, col_m4, col_m5 = st.columns(5)
col_m1.metric("📍 Coordenadas", f"{lat:.3f}, {lon:.3f}")
col_m2.metric("🌱 Cobertura 2024", mapbiomas_data.get("latest_coverage_2024", {}).get("class_name", "Agricultura"))
col_m3.metric("🛰️ NDVI Sentinel-2", f"{sentinel_data.get('latest_metrics', {}).get('ndvi', 0.74)}")
col_m4.metric("🏆 Cultivo Sugerido", ml_predictions["top_recommended_crop"].split("(")[0])
col_m5.metric("⚡ Tiempo Respuesta", f"{elapsed_ms} ms", delta="Caché SQLite" if is_from_cache else "Satelital en Vivo")

# --- GUÍA DE ORIENTACIÓN PARA NUEVOS USUARIOS ---
with st.expander("💡 **¿Eres nuevo en Agrotech? Haz clic aquí para ver la Guía Rápida y Consejos de Uso**", expanded=False):
    st.markdown("""
    ### 🌟 Bienvenido al Gemelo Digital de Agrotech Venezuela
    Esta plataforma te permite evaluar cualquier terreno agrícola en Venezuela utilizando satélites e Inteligencia Artificial:
    
    1. **📍 Localizar tu Finca**: Usa la barra lateral izquierda para elegir una región preestablecida (ej: *Turén, Sur del Lago, Calabozo*) o escribe tus coordenadas GPS exactas.
    2. **🛰️ Pestaña 1 (Diagnóstico Satelital)**: Revisa el mapa en alta definición y el gráfico inferior para ver cómo ha cambiado la cobertura de tu suelo en los últimos 40 años (1985–2024 según **MapBiomas Venezuela**).
    3. **🌾 Pestaña 2 (Predicción de Cosechas)**: Mueve los controles de pH y Materia Orgánica en la barra lateral para ver cómo reacciona el modelo de Machine Learning y qué cultivo ofrece mayor rentabilidad en Ton/ha.
    4. **⚠️ Pestaña 3 (Riesgos y Carbono)**: Consulta las alertas automáticas de sequía o acidez crítica, junto con el stock de carbono fijado en tu suelo.
    5. **🤖 Pestaña 4 (Gemini AI)**: Pulsa **"Generar Dictamen Técnico"** para que el Dr. Agrónomo de IA elabore tu receta de encalado (Cal Dolomítica) y fertilizantes $N-P-K$ adaptados a Venezuela, y descarga tu informe oficial en Markdown o GeoJSON.
    """)

st.divider()

# --- PESTAÑAS PRINCIPALES DE VISUALIZACIÓN (Día 15) ---
tab_geo, tab_ml, tab_risk, tab_ai, tab_cache = st.tabs([
    "🛰️ Diagnóstico Espacial & WebGIS",
    "🌾 Predicción de Cosechas (ML)",
    "⚠️ Riesgos y Captura de Carbono",
    "🤖 Asesor Inteligente Gemini AI",
    "📊 Telemetría y Caché Offline"
])

# --- TAB 1: DIAGNÓSTICO ESPACIAL & FOLIUM (Día 16) ---
with tab_geo:
    col_map, col_info = st.columns([3, 2])
    
    with col_map:
        st.markdown("#### 🗺️ Visor Cartográfico Satelital de Alta Resolución")
        folium_map = create_folium_map(
            lat=lat,
            lon=lon,
            parcel_name=parcel_name,
            ndvi_val=sentinel_data.get("latest_metrics", {}).get("ndvi", 0.74),
            coverage_name=mapbiomas_data.get("latest_coverage_2024", {}).get("class_name", "Agricultura")
        )
        st_folium(folium_map, width=700, height=420)

    with col_info:
        st.markdown("#### 📊 Indicadores Biofísicos de la Parcela")
        st.info(f"**Vigor Vegetativo**: {sentinel_data.get('latest_metrics', {}).get('vegetation_vigor')}")
        st.write(f"- **EVI (Enhanced Veg. Index)**: `{sentinel_data.get('latest_metrics', {}).get('evi', 0.55)}`")
        st.write(f"- **NDWI (Estrés Hídrico)**: `{sentinel_data.get('latest_metrics', {}).get('ndwi', 0.30)}`")
        st.write(f"- **Precipitación Acumulada**: `{climate_data.get('summary', {}).get('accumulated_rainfall_mm', 1450)} mm`")
        st.write(f"- **Grados Día de Desarrollo (GDD)**: `{climate_data.get('summary', {}).get('growing_degree_days_gdd', 420)}`")
        st.write(f"- **Transiciones Históricas MapBiomas**: `{mapbiomas_data.get('detected_transitions_count', 1)} cambios de uso en 40 años`")

    st.plotly_chart(create_mapbiomas_timeline_chart(mapbiomas_data.get("annual_series", {})), use_container_width=True)

# --- TAB 2: PREDICCIÓN ML & CULTIVOS (Día 17) ---
with tab_ml:
    st.markdown("### 🌾 Zonificación y Rendimiento Proyectado por Cultivo")
    st.plotly_chart(create_crop_yield_bar_chart(ml_predictions["predictions"]), use_container_width=True)

    st.markdown("#### 📋 Matriz Detallada de Idoneidad y Manejo Agronómico")
    pred_table = []
    for p in ml_predictions["predictions"]:
        pred_table.append({
            "Cultivo": p["crop_name"],
            "Aptitud (%)": f"{p['suitability_score_pct']}%",
            "Nivel": p["suitability_level"],
            "Rendimiento Esperado": f"{p['projected_yield_ton_ha']['expected']} Ton/ha",
            "Época de Siembra Óptima": p["recommended_planting_season"],
            "Factor Limitante": p["primary_limiting_factor"] or "Ninguno (Condiciones Óptimas)"
        })
    st.dataframe(pred_table, use_container_width=True)

# --- TAB 3: RIESGOS Y CARBONO ---
with tab_risk:
    col_r1, col_r2 = st.columns(2)
    
    with col_r1:
        st.markdown("### ⚠️ Semáforo de Riesgos Agroclimáticos")
        for r_name, r_val in risks_data["risk_breakdown"].items():
            color = "red" if r_val["level"] in ["ALTO", "CRÍTICO"] else "orange" if r_val["level"] == "MODERADO" else "green"
            st.markdown(f"- **{r_name.replace('_', ' ').title()}**: :{color}[**{r_val['level']} ({r_val['score']} pts)**]")
            st.caption(f"Acción mitigadora: {r_val['mitigation']}")
    
    with col_r2:
        st.markdown("### 🌿 Balance de Carbono Orgánico del Suelo (SOC)")
        st.metric("Stock Actual de Carbono en Finca", f"{carbon_data['soil_metrics']['total_farm_soc_stock_ton_c']} Ton C", f"{carbon_data['soil_metrics']['current_soc_ton_c_per_ha']} Ton C/ha")
        st.plotly_chart(create_carbon_scenarios_chart(carbon_data["annual_sequestration_scenarios"]), use_container_width=True)

# --- TAB 4: AGENTE GEMINI AI & REPORTE (Día 18) ---
with tab_ai:
    st.markdown("### 🤖 Asesor Agronómico Inteligente (Google Gemini AI)")
    
    if st.button("🚀 Generar Dictamen Técnico Completo", type="primary"):
        with st.spinner("Consultando telemetría satelital y generando prescripción con Gemini..."):
            parcel_ctx = {
                "coordinates": {"latitude": lat, "longitude": lon},
                "mapbiomas": mapbiomas_data,
                "climate": climate_data,
                "sentinel": sentinel_data,
                "soil": soil_dict,
                "ml_predictions": ml_predictions,
                "risks": risks_data
            }
            prescription = gemini_advisor.generate_technical_prescription(parcel_ctx)
            st.session_state["prescription_text"] = prescription["prescription_markdown"]

    if "prescription_text" in st.session_state:
        st.markdown(st.session_state["prescription_text"])

        # Generador y Descarga de Informes (Día 18)
        report_md = ReportGenerator.generate_markdown_report(
            parcel_name=parcel_name,
            lat=lat,
            lon=lon,
            zone=preset_choice,
            area_ha=area_ha,
            soil=soil_dict,
            climate=climate_data,
            sentinel=sentinel_data,
            mapbiomas=mapbiomas_data,
            ml_preds=ml_predictions,
            risks=risks_data,
            ai_prescription=st.session_state["prescription_text"]
        )

        geojson_data = ReportGenerator.generate_geojson_feature(
            parcel_name=parcel_name,
            lat=lat,
            lon=lon,
            area_ha=area_ha,
            metrics={"ndvi": sentinel_data.get("latest_metrics", {}).get("ndvi", 0.74), "ph": ph, "top_crop": ml_predictions["top_recommended_crop"]}
        )

        col_d1, col_d2 = st.columns(2)
        with col_d1:
            st.download_button("📄 Descargar Dictamen Técnico (Markdown)", data=report_md, file_name=f"{parcel_name}_dictamen.md", mime="text/markdown")
        with col_d2:
            st.download_button("🗺️ Descargar Gemelo Digital (GeoJSON)", data=json.dumps(geojson_data, indent=2), file_name=f"{parcel_name}.geojson", mime="application/geo+json")

    st.divider()
    st.markdown("#### 💬 Chat Interactivo con el Dr. Agrónomo Gemini")
    user_msg = st.text_input("Haz una pregunta agronómica específica sobre tu terreno:")
    if st.button("Enviar Consulta"):
        if user_msg:
            with st.spinner("Analizando con Gemini..."):
                reply = gemini_advisor.interactive_chat(
                    parcel_context={"soil": soil_dict, "coordinates": {"latitude": lat, "longitude": lon}},
                    conversation_history=[],
                    message=user_msg
                )
                st.chat_message("assistant").write(reply["reply"])

# --- TAB 5: TELEMETRÍA Y CACHÉ OFFLINE ---
with tab_cache:
    st.markdown("### 💾 Auditoría de Base de Datos SQLite y Caché Espacial")
    stats = cache_mgr.get_stats()
    col_c1, col_c2, col_c3 = st.columns(3)
    col_c1.metric("Puntos Espaciales Cacheados", stats["total_cached_spatial_points"])
    col_c2.metric("Tasa de Aciertos (Hit Ratio)", f"{stats['cache_hit_ratio_pct']}%")
    col_c3.metric("Latencia Promedio en Caché", f"{stats['avg_cache_response_ms']} ms", "-98% vs Satélite en Vivo")

    st.success("✅ Sistema preparado para operar en modo offline en zonas rurales con conectividad limitada.")
