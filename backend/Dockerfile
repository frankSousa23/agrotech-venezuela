# Dockerfile para el Backend de Ingesta Espacial, ML y Gemini AI
FROM python:3.13-slim

WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copiar requerimientos e instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    scikit-learn google-genai streamlit folium streamlit-folium plotly

# Copiar código fuente
COPY src/ ./src/
COPY streamlit_app.py .
COPY tests/ ./tests/

# Puerto para FastAPI (8000) y Streamlit (8501)
EXPOSE 8000 8501

# Script de arranque por defecto (FastAPI)
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
