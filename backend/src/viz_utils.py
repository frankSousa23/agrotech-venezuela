"""
Visualization & Cartography Utilities - Agrotech Venezuela (Semana 3 - Día 16)
Módulo para la generación de mapas interactivos Folium y gráficos analíticos Plotly.
"""

from typing import Any, Dict, List

import folium
import plotly.graph_objects as go
from folium import plugins

# Colores estándar para clases MapBiomas Venezuela
MAPBIOMAS_COLORS = {
    "Bosque / Formación Forestal": "#129912",
    "Bosque Inundable": "#006400",
    "Manglar": "#04381d",
    "Humedal / Herbazal Inundable": "#45c2a5",
    "Formación Campestre / Sabana": "#bbfcac",
    "Pastizal / Ganadería": "#ffd966",
    "Agricultura / Cultivos": "#e974ed",
    "Mosaico Agropecuario": "#ffe082",
    "Área Urbana e Infraestructura": "#af2a2a",
    "Otra Área No Vegetada": "#ffaa5f",
    "Cuerpo de Agua / Río / Lago": "#0064ff",
}


def create_folium_map(
    lat: float,
    lon: float,
    zoom_start: int = 12,
    parcel_name: str = "Mi Parcela Agrícola",
    ndvi_val: float = 0.74,
    coverage_name: str = "Agricultura",
) -> folium.Map:
    """Crea un mapa interactivo Folium con múltiples capas base y marcadores de parcela."""
    m = folium.Map(location=[lat, lon], zoom_start=zoom_start, tiles=None)

    # 1. Capas Base
    folium.TileLayer(
        tiles="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attr="Esri World Imagery",
        name="Satélite Esri HD",
        overlay=False,
        control=True,
    ).add_to(m)

    folium.TileLayer(
        tiles="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attr="CartoDB Dark Matter",
        name="Modo Oscuro CartoDB",
        overlay=False,
        control=True,
    ).add_to(m)

    folium.TileLayer(
        tiles="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        attr="OpenTopoMap",
        name="Relieve Topográfico",
        overlay=False,
        control=True,
    ).add_to(m)

    folium.TileLayer(
        tiles="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attr="OpenStreetMap",
        name="OpenStreetMap Estándar",
        overlay=False,
        control=True,
    ).add_to(m)

    # 2. Marcador de Parcela y Gemelo Digital
    popup_html = f"""
    <div style="font-family: Arial; min-width: 180px; padding: 4px;">
        <h4 style="margin: 0 0 6px 0; color: #166534;">🌾 {parcel_name}</h4>
        <p style="margin: 2px 0; font-size: 13px;"><b>Coordenadas:</b> {lat:.4f}, {lon:.4f}</p>
        <p style="margin: 2px 0; font-size: 13px;"><b>Cobertura 2024:</b> {coverage_name}</p>
        <p style="margin: 2px 0; font-size: 13px;"><b>NDVI Sentinel-2:</b> <span style="color:#15803d; font-weight:bold;">{ndvi_val}</span></p>
    </div>
    """

    folium.Marker(
        location=[lat, lon],
        tooltip=f"{parcel_name} ({lat:.4f}, {lon:.4f})",
        popup=folium.Popup(popup_html, max_width=250),
        icon=folium.Icon(color="green", icon="leaf", prefix="fa"),
    ).add_to(m)

    # Círculo representativo de la parcela (~10 ha = radio ~180m)
    folium.Circle(
        location=[lat, lon],
        radius=180,
        color="#16a34a",
        weight=2,
        fill=True,
        fill_color="#22c55e",
        fill_opacity=0.25,
        tooltip="Área estimada de la parcela (10 ha)",
    ).add_to(m)

    folium.LayerControl(position="topright").add_to(m)
    plugins.Fullscreen(position="topleft").add_to(m)
    plugins.Draw(
        export=True,
        filename=f"parcela_{parcel_name.replace(' ', '_').lower()}.geojson",
        position="topleft",
        draw_options={
            "polyline": False,
            "polygon": {"allowIntersection": False, "showArea": True},
            "circle": False,
            "rectangle": True,
            "marker": True,
            "circlemarker": False,
        },
    ).add_to(m)

    return m


def create_mapbiomas_timeline_chart(annual_series: Dict[str, Any]) -> go.Figure:
    """Genera un gráfico de línea temporal de los 40 años de cobertura (1985-2024)."""
    years = sorted([int(y) for y in annual_series.keys()])
    classes = [annual_series[str(y)]["class_name"] for y in years]
    categories = [annual_series[str(y)].get("category", "Otros") for y in years]

    # Asignar colores
    colors = [MAPBIOMAS_COLORS.get(c, "#94a3b8") for c in classes]

    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=years,
            y=classes,
            mode="lines+markers",
            marker=dict(size=8, color=colors, line=dict(width=1, color="white")),
            line=dict(color="#10b981", width=2),
            text=[f"Año {y}: {c} ({cat})" for y, c, cat in zip(years, classes, categories)],
            hoverinfo="text",
        )
    )

    fig.update_layout(
        title="Historial de Uso y Cobertura del Suelo (MapBiomas Venezuela 1985 - 2024)",
        xaxis_title="Año",
        yaxis_title="Clase de Cobertura",
        template="plotly_white",
        margin=dict(l=20, r=20, t=40, b=20),
        height=320,
    )
    return fig


def create_crop_yield_bar_chart(predictions: List[Dict[str, Any]]) -> go.Figure:
    """Genera un gráfico horizontal con rendimientos proyectados y scores de idoneidad."""
    crops = [p["crop_name"] for p in predictions][::-1]
    scores = [p["suitability_score_pct"] for p in predictions][::-1]
    yields = [p["projected_yield_ton_ha"]["expected"] for p in predictions][::-1]

    colors = ["#16a34a" if s >= 80 else "#ca8a04" if s >= 60 else "#dc2626" for s in scores]

    fig = go.Figure()
    fig.add_trace(
        go.Bar(
            y=crops,
            x=scores,
            orientation="h",
            marker=dict(color=colors),
            text=[f"{s}% (Rend: {y} Ton/ha)" for s, y in zip(scores, yields)],
            textposition="auto",
        )
    )

    fig.update_layout(
        title="Aptitud Agroecológica y Rendimiento Proyectado por Cultivo",
        xaxis_title="Score de Aptitud (%)",
        xaxis=dict(range=[0, 105]),
        template="plotly_white",
        margin=dict(l=20, r=20, t=40, b=20),
        height=350,
    )
    return fig


def create_carbon_scenarios_chart(scenarios: Dict[str, Any]) -> go.Figure:
    """Genera gráfico comparativo de secuestro de carbono por escenario."""
    practices = [v["practice"] for v in scenarios.values()]
    co2_vals = [v["total_annual_co2_seq_ton"] for v in scenarios.values()]
    colors = ["#059669" if v > 0 else "#e11d48" for v in co2_vals]

    fig = go.Figure()
    fig.add_trace(
        go.Bar(
            x=practices,
            y=co2_vals,
            marker=dict(color=colors),
            text=[f"{v} Ton CO2e/año" for v in co2_vals],
            textposition="outside",
        )
    )

    fig.update_layout(
        title="Potencial Anual de Captura de Carbono (Ton CO2e / Parcela)",
        yaxis_title="Ton CO2 equivalente / año",
        template="plotly_white",
        margin=dict(l=20, r=20, t=40, b=50),
        height=320,
    )
    return fig
