import pytest
from src.gemini_agro_advisor import GeminiAgroAdvisor

def test_gemini_prescription_generator():
    advisor = GeminiAgroAdvisor()
    parcel_context = {
        "coordinates": {"latitude": 9.324, "longitude": -69.112},
        "soil": {"ph": 5.4, "organic_matter_pct": 3.2, "texture": "Franco-arcilloso"},
        "ml_predictions": {"top_recommended_crop": "Maíz Blanco Harinero"},
        "climate": {"summary": {"accumulated_rainfall_mm": 1450.0, "avg_temperature_c": 27.0}}
    }

    result = advisor.generate_technical_prescription(parcel_context)
    assert result["status"] == "SUCCESS"
    assert "prescription_markdown" in result
    assert "Encalado" in result["prescription_markdown"] or "Cal" in result["prescription_markdown"]

def test_gemini_interactive_chat():
    advisor = GeminiAgroAdvisor()
    parcel_context = {"soil": {"ph": 6.4}}
    reply = advisor.interactive_chat(
        parcel_context=parcel_context,
        conversation_history=[],
        message="¿Qué fertilizante me recomiendas para este suelo?"
    )
    assert "reply" in reply
    assert len(reply["reply"]) > 20
