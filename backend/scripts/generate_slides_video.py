"""
Presentation Slides & MP4 Video Generator - Agrotech Venezuela
Genera diapositivas de alta resolución (1920x1080) con diseño profesional
y las compila en un video .mp4 cinematográfico con transiciones suaves.
"""

import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio

WIDTH = 1920
HEIGHT = 1080
FPS = 30
SLIDE_DURATION_SEC = 5.0
TRANSITION_DURATION_SEC = 1.0

OUTPUT_MP4_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "agrotech_presentacion_pitch.mp4")
ARTIFACT_MP4_PATH = r"C:\Users\Windows\.gemini\antigravity-ide\brain\53e299c0-4dbe-437d-b32a-f4ed190b0ece\agrotech_presentacion_pitch.mp4"

# Intentar cargar fuentes del sistema Windows
def get_fonts():
    try:
        font_title = ImageFont.truetype("arialbd.ttf", 64)
        font_subtitle = ImageFont.truetype("arial.ttf", 36)
        font_heading = ImageFont.truetype("arialbd.ttf", 44)
        font_body = ImageFont.truetype("arial.ttf", 28)
        font_body_bold = ImageFont.truetype("arialbd.ttf", 30)
        font_badge = ImageFont.truetype("arialbd.ttf", 22)
    except Exception:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_heading = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_body_bold = ImageFont.load_default()
        font_badge = ImageFont.load_default()
    return font_title, font_subtitle, font_heading, font_body, font_body_bold, font_badge

font_title, font_subtitle, font_heading, font_body, font_body_bold, font_badge = get_fonts()

def draw_gradient_background(draw, width, height, top_color, bottom_color):
    """Dibuja un degradado vertical suave."""
    for y in range(height):
        r = int(top_color[0] + (bottom_color[0] - top_color[0]) * (y / height))
        g = int(top_color[1] + (bottom_color[1] - top_color[1]) * (y / height))
        b = int(top_color[2] + (bottom_color[2] - top_color[2]) * (y / height))
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def draw_card(draw, x, y, w, h, bg_color, border_color=(45, 120, 75)):
    """Dibuja una tarjeta redondeada con estilo glassmorphism."""
    draw.rounded_rectangle([x, y, x + w, y + h], radius=16, fill=bg_color, outline=border_color, width=2)

def create_slide_1():
    """Diapositiva 1: Portada y Visión Ejecutiva"""
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 25, 18))
    draw = ImageDraw.Draw(img)
    draw_gradient_background(draw, WIDTH, HEIGHT, (8, 28, 20), (15, 45, 30))

    # Badge superior
    draw.rounded_rectangle([120, 90, 480, 135], radius=20, fill=(22, 163, 74, 180), outline=(74, 222, 128), width=2)
    draw.text((140, 100), "INNOVACION AGTECH VENEZUELA 2026", fill=(255, 255, 255), font=font_badge)

    # Título Principal
    draw.text((120, 165), "AGROTECH VENEZUELA", fill=(255, 255, 255), font=font_title)
    draw.text((120, 245), "Plataforma Integral de Inteligencia Edafo-Climatica, WebGIS y Prescripcion con IA", fill=(74, 222, 128), font=font_subtitle)

    # Subtítulo de propósito
    draw.text((120, 320), "Transformando 40 anos de observacion satelital en decisiones agronomicas prescriptivas de alta rentabilidad.", fill=(200, 220, 210), font=font_body)

    # 3 Tarjetas de Pilares
    cards = [
        ("🛰️ INGESTA ESPACIAL", "MapBiomas Venezuela (1985-2024),\nSentinel-2 L2A (10m) y NASA POWER\npor coordenadas GPS en < 25ms."),
        ("🌾 MACHINE LEARNING", "Prediccion de rendimiento (Ton/ha)\npara 8 cultivos, riesgos de sequia y\nbalance de carbono del suelo (SOC)."),
        ("🤖 GOOGLE GEMINI AI", "Dictamen agronomico asistido por IA\ncon recetas de encalado (CaCO3)\ny dosis N-P-K para Venezuela.")
    ]

    for i, (title, desc) in enumerate(cards):
        cx = 120 + (i * 560)
        draw_card(draw, cx, 420, 520, 380, (20, 60, 40))
        draw.text((cx + 35, 460), title, fill=(255, 255, 255), font=font_heading)
        draw.line([(cx + 35, 525), (cx + 480, 525)], fill=(34, 197, 94), width=3)
        draw.text((cx + 35, 550), desc, fill=(220, 240, 230), font=font_body)

    # Footer
    draw.text((120, 940), "Autor y Desarrollador: Frank Sousa  |  Licencia MIT (Open Source)", fill=(160, 185, 175), font=font_body)
    return img

def create_slide_2():
    """Diapositiva 2: El Problema y la Oportunidad"""
    img = Image.new("RGB", (WIDTH, HEIGHT), (15, 20, 30))
    draw = ImageDraw.Draw(img)
    draw_gradient_background(draw, WIDTH, HEIGHT, (15, 23, 42), (30, 41, 59))

    draw.rounded_rectangle([120, 80, 420, 125], radius=20, fill=(220, 38, 38), outline=(248, 113, 113), width=2)
    draw.text((140, 90), "EL RETO DEL CAMPO", fill=(255, 255, 255), font=font_badge)

    draw.text((120, 150), "La Brecha entre la Observacion y la Accion Agronomica", fill=(255, 255, 255), font=font_title)

    # Comparativa de dos columnas
    # Columna 1: Situación Actual
    draw_card(draw, 120, 270, 780, 600, (40, 30, 40), border_color=(239, 68, 68))
    draw.text((160, 310), "❌ Situacion Tradicional / Observacional", fill=(248, 113, 113), font=font_heading)
    draw.line([(160, 370), (840, 370)], fill=(239, 68, 68), width=2)
    
    trad_points = [
        "• Analisis de laboratorio costosos ($80 - $150 por muestra).",
        "• Semanas de espera para recibir resultados fisicoquimicos.",
        "• Plataformas satelitales descriptivas (solo muestran mapas).",
        "• No indican que sembrar, cuanta cal aplicar ni cuanto cosechar.",
        "• Acidez no corregida (pH < 5.2) reduce fertilizacion en hasta 45%."
    ]
    for idx, pt in enumerate(trad_points):
        draw.text((160, 410 + (idx * 85)), pt, fill=(240, 210, 210), font=font_body)

    # Columna 2: Solución Agrotech
    draw_card(draw, 980, 270, 820, 600, (20, 50, 40), border_color=(34, 197, 94))
    draw.text((1020, 310), "✅ Solucion Agrotech (Prescriptiva)", fill=(74, 222, 128), font=font_heading)
    draw.line([(1020, 370), (1740, 370)], fill=(34, 197, 94), width=2)

    agro_points = [
        "• Ingesta automatica por coordenadas GPS (Zero-friction).",
        "• Diagnostico edafoclimatico satelital instantaneo (< 25 ms).",
        "• Precision de 10m con Sentinel-2 y 40 anos de MapBiomas.",
        "• Prediccion de rendimiento en Ton/ha para 8 cultivos.",
        "• Receta de encalado exacta (CaCO3) y N-P-K para Venezuela."
    ]
    for idx, pt in enumerate(agro_points):
        draw.text((1020, 410 + (idx * 85)), pt, fill=(210, 245, 225), font=font_body)

    return img

def create_slide_3():
    """Diapositiva 3: Arquitectura y Stack Tecnológico"""
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 20, 25))
    draw = ImageDraw.Draw(img)
    draw_gradient_background(draw, WIDTH, HEIGHT, (10, 25, 30), (18, 40, 50))

    draw.rounded_rectangle([120, 80, 450, 125], radius=20, fill=(37, 99, 235), outline=(96, 165, 250), width=2)
    draw.text((140, 90), "ARQUITECTURA DE DATOS", fill=(255, 255, 255), font=font_badge)

    draw.text((120, 150), "Ecosistema Tecnologico Multi-Capa", fill=(255, 255, 255), font=font_title)

    layers = [
        ("1. CAPA DE PRESENTACION", "Next.js 16 WebGIS (React 19, Leaflet, Turbopack) + Streamlit Dashboard Interactivo"),
        ("2. BACKEND & APIS SPATIAL", "FastAPI (Python 3.13), Route Handlers, OpenAPI 3.0 Swagger y Schemas Pydantic"),
        ("3. PIPELINES DE INGESTA", "Google Earth Engine (MapBiomas Col 3 1985-2024), Sentinel-2 L2A SCL y NASA POWER"),
        ("4. INTELIGENCIA ARTIFICIAL", "Machine Learning Predictivo (Scikit-Learn, NumPy) + Agente Experto Google Gemini AI"),
        ("5. PERSISTENCIA & CACHE", "PostgreSQL 15 (Docker, Prisma ORM) + SQLite WAL Mode (< 5ms latencia en zonas rurales)")
    ]

    for i, (title, desc) in enumerate(layers):
        y = 260 + (i * 125)
        draw_card(draw, 120, y, 1680, 105, (25, 45, 60))
        draw.text((150, y + 20), title, fill=(96, 165, 250), font=font_heading)
        draw.text((150, y + 65), desc, fill=(230, 240, 250), font=font_body)

    return img

def create_slide_4():
    """Diapositiva 4: Ingesta Satelital y Telemetría"""
    img = Image.new("RGB", (WIDTH, HEIGHT), (12, 28, 22))
    draw = ImageDraw.Draw(img)
    draw_gradient_background(draw, WIDTH, HEIGHT, (8, 30, 24), (20, 55, 40))

    draw.rounded_rectangle([120, 80, 480, 125], radius=20, fill=(16, 185, 129), outline=(110, 231, 183), width=2)
    draw.text((140, 90), "SENSORES Y TELEMETRIA", fill=(255, 255, 255), font=font_badge)

    draw.text((120, 150), "Pipelines Espaciales Automatizados por GPS", fill=(255, 255, 255), font=font_title)

    cards = [
        ("🌱 MapBiomas Venezuela", "Coleccion 3 (1985-2024)\nResolucion: 30 metros\n• Serie historica de 40 anos\n• Deteccion de transiciones\n• Clasificacion oficial LULC\n• Atribucion CC BY 4.0"),
        ("🛰️ Sentinel-2 (Copernicus)", "Level-2A BOA (10 metros)\n• Mascara de Nubes SCL\n• NDVI (Vigor Fotosintetico)\n• EVI (Indice Mejorado)\n• NDWI (Contenido Hidrico)\n• Monitoreo de parcela"),
        ("☀️ NASA POWER API", "Agroclimatologia Diaria\n• Temperatura Media/Max/Min\n• Grados Dia Desarrollo (GDD)\n• Radiacion Solar (MJ/m2)\n• Precipitacion corregida\n• Humedad y viento")
    ]

    for i, (title, desc) in enumerate(cards):
        cx = 120 + (i * 560)
        draw_card(draw, cx, 270, 520, 560, (20, 50, 38), border_color=(34, 197, 94))
        draw.text((cx + 30, 310), title, fill=(74, 222, 128), font=font_heading)
        draw.line([(cx + 30, 365), (cx + 490, 365)], fill=(34, 197, 94), width=2)
        draw.text((cx + 30, 390), desc, fill=(225, 245, 235), font=font_body)

    draw.text((120, 900), "⚡ Integrado con Cache SQLite Local: Las consultas repetidas responden en menos de 5 ms.", fill=(160, 230, 190), font=font_body_bold)
    return img

def create_slide_5():
    """Diapositiva 5: Machine Learning y Modelado Agronómico"""
    img = Image.new("RGB", (WIDTH, HEIGHT), (20, 25, 15))
    draw = ImageDraw.Draw(img)
    draw_gradient_background(draw, WIDTH, HEIGHT, (25, 30, 15), (45, 50, 25))

    draw.rounded_rectangle([120, 80, 500, 125], radius=20, fill=(202, 138, 4), outline=(253, 224, 71), width=2)
    draw.text((140, 90), "INTELIGENCIA AGRONOMICA", fill=(255, 255, 255), font=font_badge)

    draw.text((120, 150), "Machine Learning y Curvas de Rendimiento", fill=(255, 255, 255), font=font_title)

    # 8 Cultivos Estratégicos
    draw_card(draw, 120, 260, 1680, 260, (40, 45, 25), border_color=(234, 179, 8))
    draw.text((150, 290), "🌾 8 Cultivos Estrategicos Calibrados para Venezuela", fill=(253, 224, 71), font=font_heading)
    crops_text = (
        "1. Maiz Blanco Harinero (Portuguesa/Guarico)      5. Cafe Arabica de Especialidad (Andes/Biscucuy)\n"
        "2. Arroz de Riego (Sistema Calabozo/Portuguesa)   6. Cana de Azucar (Valles de Aragua/Lara)\n"
        "3. Platano Harton (Sur del Lago de Maracaibo)     7. Soya (Mesas Orientales/Llanos)\n"
        "4. Cacao Criollo Fino (Chuao/Barlovento/Zulia)    8. Pasturas Tropicales (Brachiaria brizantha)"
    )
    draw.text((150, 360), crops_text, fill=(240, 240, 210), font=font_body)

    # Riesgos y Carbono
    draw_card(draw, 120, 550, 820, 350, (35, 40, 25), border_color=(202, 138, 4))
    draw.text((150, 580), "⚠️ Cuantificacion de Riesgos", fill=(253, 224, 71), font=font_heading)
    risk_desc = (
        "• Sequia / Deficit Hidrico (NDWI + lluvia)\n"
        "• Encharcamiento y Asfixia Radicular (Arcilla)\n"
        "• Acidez Critica y Toxicidad por Aluminio\n"
        "• Estres Termico (> 35 C en Llanos)"
    )
    draw.text((150, 650), risk_desc, fill=(230, 230, 200), font=font_body)

    draw_card(draw, 980, 550, 820, 350, (25, 45, 30), border_color=(34, 197, 94))
    draw.text((1010, 580), "🌿 Balance de Carbono (SOC)", fill=(74, 222, 128), font=font_heading)
    carbon_desc = (
        "• Stock de Carbono Organico del Suelo (Ton C/ha)\n"
        "• Agroforesteria (Cacao/Cafe): +3.85 Ton CO2e/ha/ano\n"
        "• Silvopastoreo Racional: +2.40 Ton CO2e/ha/ano\n"
        "• Siembra Directa: +1.95 Ton CO2e/ha/ano"
    )
    draw.text((1010, 650), carbon_desc, fill=(220, 245, 230), font=font_body)

    return img

def create_slide_6():
    """Diapositiva 6: Asesoría Prescriptiva con Google Gemini AI"""
    img = Image.new("RGB", (WIDTH, HEIGHT), (20, 15, 30))
    draw = ImageDraw.Draw(img)
    draw_gradient_background(draw, WIDTH, HEIGHT, (25, 15, 40), (45, 25, 60))

    draw.rounded_rectangle([120, 80, 520, 125], radius=20, fill=(147, 51, 234), outline=(216, 180, 254), width=2)
    draw.text((140, 90), "INTELIGENCIA GENERATIVA", fill=(255, 255, 255), font=font_badge)

    draw.text((120, 150), "Orquestacion con Google Gemini AI", fill=(255, 255, 255), font=font_title)

    draw_card(draw, 120, 260, 1680, 620, (40, 25, 55), border_color=(168, 85, 247))
    draw.text((160, 300), "🤖 Dr. Agronomo Senior Digital (Gemini 2.5 Flash)", fill=(216, 180, 254), font=font_heading)
    draw.line([(160, 360), (1740, 360)], fill=(168, 85, 247), width=2)

    ai_features = [
        ("Inyeccion de Contexto Completo", "El modelo recibe la telemetria exacta de la finca: pH, MO%, historial de 40 anos MapBiomas, clima NASA, NDVI y predicciones ML."),
        ("Recetas con Insumos Venezolanos", "Prescripcion precisa de Cal Dolomitica (CaCO3), NPK 12-24-12, Urea y Roca Fosforica de Riecito (Falcon) segun disponibilidad local."),
        ("Calendario Nutricional y MIP", "Programa fraccionado a la siembra, 30 dias y 45 dias, con alertas tempranas de manejo integrado de plagas segun humedad relativa."),
        ("Exportacion Oficial Estandarizada", "Descarga automatica del Dictamen Tecnico en Markdown (.md) y del Gemelo Digital en GeoJSON para maquinaria con piloto automatico.")
    ]

    for idx, (title, desc) in enumerate(ai_features):
        y = 400 + (idx * 110)
        draw.text((160, y), f"• {title}:", fill=(233, 213, 255), font=font_body_bold)
        draw.text((160, y + 40), desc, fill=(245, 235, 255), font=font_body)

    return img

def create_slide_7():
    """Diapositiva 7: Auditoría y Resultados de Calidad"""
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 25, 20))
    draw = ImageDraw.Draw(img)
    draw_gradient_background(draw, WIDTH, HEIGHT, (10, 30, 22), (20, 50, 35))

    draw.rounded_rectangle([120, 80, 480, 125], radius=20, fill=(16, 185, 129), outline=(110, 231, 183), width=2)
    draw.text((140, 90), "AUDITORIA DE CALIDAD", fill=(255, 255, 255), font=font_badge)

    draw.text((120, 150), "Verificacion Exhaustiva y Benchmarking", fill=(255, 255, 255), font=font_title)

    metrics = [
        ("69 / 69", "Pruebas Automatizadas", "39 Pytest (Backend & ML) + 30 Jest (WebGIS & APIs)\n100% de cobertura y 0 errores de compilacion."),
        ("< 25 ms", "Latencia en Cache", "Base de datos SQLite en modo WAL para operacion\noffline y reduccion del 98% de tiempo de respuesta."),
        ("100%", "Multi-Contenedor Docker", "Orquestacion en docker-compose: Next.js (3000),\nFastAPI (8000), Streamlit (8501) y PostgreSQL (5444)."),
        ("CI / CD", "GitHub Actions", "Pipeline automatizado de integracion continua con\npruebas automaticas en cada push a la rama main.")
    ]

    for i, (stat, title, desc) in enumerate(metrics):
        cx = 120 + ((i % 2) * 860)
        cy = 270 + ((i // 2) * 310)
        draw_card(draw, cx, cy, 820, 270, (20, 50, 38), border_color=(34, 197, 94))
        draw.text((cx + 40, cy + 30), stat, fill=(74, 222, 128), font=font_title)
        draw.text((cx + 40, cy + 115), title, fill=(255, 255, 255), font=font_heading)
        draw.text((cx + 40, cy + 175), desc, fill=(210, 240, 225), font=font_body)

    return img

def create_slide_8():
    """Diapositiva 8: Ciclo de Mejoras a Futuro y Pitch Final"""
    img = Image.new("RGB", (WIDTH, HEIGHT), (15, 25, 35))
    draw = ImageDraw.Draw(img)
    draw_gradient_background(draw, WIDTH, HEIGHT, (15, 30, 45), (25, 45, 65))

    draw.rounded_rectangle([120, 80, 500, 125], radius=20, fill=(59, 130, 246), outline=(147, 197, 253), width=2)
    draw.text((140, 90), "ROADMAP DE INNOVACION", fill=(255, 255, 255), font=font_badge)

    draw.text((120, 150), "Ciclo de Mejoras Continuas (Agrotech 2.0)", fill=(255, 255, 255), font=font_title)

    future_cycles = [
        ("📡 Eje 1: Sensores IoT y Sondas de Humedad (LoRaWAN)", "Redes de sensores en suelo a 30cm para calibracion de riego por goteo a 15 km de alcance."),
        ("📷 Eje 2: Vision Artificial con Drones y Movil (YOLOv11)", "Diagnostico fitosanitario instantaneo de enfermedades foliares (Mancha de asfalto, Moniliasis)."),
        ("🚜 Eje 3: Integracion con Maquinaria Agricola (ISOBUS)", "Generacion de mapas de aplicacion variable (VRA / Shapefiles) para tractores y fertilizadoras."),
        ("📈 Eje 4: Inteligencia de Precios y Mercados en Tiempo Real", "Rastreo de precios diarios de granos en Venezuela para calcular el Margen Bruto Proyectado ($/ha)."),
        ("🌍 Eje 5: Certificacion de Creditos de Carbono (MRV)", "Plataforma de Medicion, Reporte y Verificacion de captura de CO2 para financiamiento verde.")
    ]

    for i, (title, desc) in enumerate(future_cycles):
        y = 260 + (i * 125)
        draw_card(draw, 120, y, 1680, 105, (30, 50, 70), border_color=(96, 165, 250))
        draw.text((150, y + 20), title, fill=(147, 197, 253), font=font_heading)
        draw.text((150, y + 65), desc, fill=(230, 240, 255), font=font_body)

    return img

def generate_video():
    print("[GENERADOR] Generando secuencia de 8 diapositivas de alta definicion (1920x1080)...")
    slides = [
        create_slide_1(),
        create_slide_2(),
        create_slide_3(),
        create_slide_4(),
        create_slide_5(),
        create_slide_6(),
        create_slide_7(),
        create_slide_8()
    ]

    # Convertir imágenes PIL a arrays numpy
    slide_arrays = [np.array(s) for s in slides]

    # Guardar diapositivas como imágenes fijas PNG
    slides_dir = os.path.join(os.path.dirname(__file__), "..", "..", "slides_png")
    os.makedirs(slides_dir, exist_ok=True)
    for idx, slide_img in enumerate(slides):
        slide_img.save(os.path.join(slides_dir, f"slide_{idx+1}.png"))
    print(f"[OK] 8 Diapositivas guardadas en: {slides_dir}")

    # Configurar VideoWriter con imageio-ffmpeg
    print("[VIDEO] Compilando video MP4 con transiciones cinematograficas...")
    writer = imageio.get_writer(OUTPUT_MP4_PATH, fps=FPS, codec="libx264", quality=8)
    
    # Frames por estado
    hold_frames = int(SLIDE_DURATION_SEC * FPS)
    trans_frames = int(TRANSITION_DURATION_SEC * FPS)

    for i in range(len(slide_arrays)):
        curr_slide = slide_arrays[i]
        
        # 1. Mantener diapositiva activa
        for _ in range(hold_frames):
            writer.append_data(curr_slide)

        # 2. Transición suave (crossfade) a la siguiente diapositiva
        if i < len(slide_arrays) - 1:
            next_slide = slide_arrays[i + 1]
            for t in range(trans_frames):
                alpha = t / float(trans_frames)
                # Interpolación coseno suave
                smooth_alpha = 0.5 * (1.0 - math.cos(alpha * math.pi))
                blended = ((1.0 - smooth_alpha) * curr_slide + smooth_alpha * next_slide).astype(np.uint8)
                writer.append_data(blended)

    writer.close()
    print(f"[EXITO] Video MP4 generado exitosamente en: {OUTPUT_MP4_PATH}")

    # Copiar también a la carpeta de artefactos
    import shutil
    try:
        shutil.copy2(OUTPUT_MP4_PATH, ARTIFACT_MP4_PATH)
        print(f"[ARTEFACTOS] Copia guardada en: {ARTIFACT_MP4_PATH}")
    except Exception as e:
        print(f"Aviso copia artefactos: {e}")

if __name__ == "__main__":
    generate_video()

