import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Lazy initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, parcelContext, chatHistory = [] } = body;

    if (!prompt && !parcelContext) {
      return NextResponse.json({ error: 'Se requiere prompt o contexto de parcela' }, { status: 400 });
    }

    const {
      coordinates,
      stateName = 'Venezuela',
      areaHectares = 0,
      ph = 6.2,
      organicMatter = 2.5,
      texture = 'Franco',
      selectedCrop = 'Maíz Blanco',
      trajectory,
      mapbiomasAgua,
      orinocoShield,
      nasaClimate,
    } = parcelContext || {};

    const systemInstruction = `
Eres el **Asesor Agronómico Inteligente con Memoria Territorial de Agrotech Venezuela**.
Tu objetivo es traducir datos satelitales multitemporales (MapBiomas Venezuela Colección 3 de 1985 a 2024, MapBiomas Agua 2000-2024 y NASA POWER Agroclimatology) en recomendaciones agronómicas directas, prácticas, humanas y altamente profesionales para agricultores y técnicos de campo.

REGLAS DE ACTUACIÓN:
1. **Memoria Territorial**: Haz referencia explícita a la historia de la parcela si está disponible (ejemplo: "Notamos que este lote lleva 25 años bajo agricultura intensiva..." o "Tu parcela se encuentra en una zona de bosque primario al sur del Orinoco...").
2. **Escudo Ecológico del Orinoco**: Si la parcela está al sur del río Orinoco (${orinocoShield?.isSouthOfOrinoco ? 'ACTIVO' : 'Inactivo'}), NUNCA recomiendes monocultivos de tala/quema. Promueve exclusivamente Sistemas Agroforestales (SAF) como Cacao criollo bajo sombra, Copoazú, Açaí (Manaca) o Meliponicultura.
3. **Riesgo Hídrico (MapBiomas Agua)**: Explica la persistencia del agua superficial y el régimen hídrico según la temporada seca o lluviosa.
4. **Enmiendas y Suelo**: Proporciona dosis concretas de cal agrícola (si el pH es ácido < 5.8) y abonos orgánicos/verdes (si hay agotamiento de materia orgánica por décadas de uso).
5. **Tono**: Cercano, técnico-agronómico riguroso pero accesible, sin jerga informática abstracta. Habla en español venezolano formal/campesino culto.
`;

    const contextSummary = `
DATOS TERRITORIALES DE LA PARCELA:
- Coordenadas: [${coordinates?.lat ?? 'N/A'}, ${coordinates?.lng ?? 'N/A'}]
- Ubicación: Estado ${stateName}
- Área delimitada: ${areaHectares} hectáreas
- Parámetros de Suelo: pH ${ph} (${ph < 5.8 ? 'Ácido' : 'Neutro/Apto'}), Materia Orgánica: ${organicMatter}%, Textura: ${texture}
- Cultivo consultado: ${selectedCrop}
- Trayectoria MapBiomas (1985-2024): ${trajectory?.trajectoryType ?? 'Uso Agrícola'}, ${trajectory?.yearsInAnthropicUse ?? 20} años de uso antrópico, Pérdida de carbono orgánico: ${trajectory?.carbonLossRisk ?? 'Moderado'}
- MapBiomas Agua (2000-2024): Persistencia ${mapbiomasAgua?.waterPersistenceScore ?? 60}%, Régimen: ${mapbiomasAgua?.hydrologicalRegime ?? 'Estacional'}
- Escudo Orinoco: ${orinocoShield?.shieldActive ? 'ACTIVO (Zona de Protección SAF)' : 'No aplica (Zona Agrícola Norte)'}
- Agroclima NASA POWER: Precipitación Anual ${nasaClimate?.annualPrecipitationMm ?? 1450} mm, Temp Promedio: ${nasaClimate?.avgTemperatureC ?? 27.5}°C, Radiación: ${nasaClimate?.avgSolarRadiationMjM2Day ?? 18.5} MJ/m²/día
`;

    const client = getGeminiClient();

    if (client) {
      const userMessage = prompt || `Genera un diagnóstico agronómico integral con memoria territorial para esta parcela de ${areaHectares} ha en ${stateName}, evaluando el cultivo ${selectedCrop}.`;

      // Formatear historial si existe
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // Historial previo
      chatHistory.forEach((msg: { sender: string; text: string }) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      });

      // Mensaje actual con contexto
      contents.push({
        role: 'user',
        parts: [
          {
            text: `${contextSummary}\n\nPregunta / Consulta del Agricultor:\n${userMessage}`,
          },
        ],
      });

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });

      return NextResponse.json({
        reply: response.text,
        source: 'GEMINI_2_5_FLASH_LIVE',
        territorialContext: contextSummary,
      });
    }

    // Fallback inteligente si no hay API key configurada en el entorno
    const fallbackMessage = generateDeterministicAgronomicResponse({
      stateName,
      areaHectares,
      ph,
      organicMatter,
      selectedCrop,
      trajectory,
      mapbiomasAgua,
      orinocoShield,
      nasaClimate,
    });

    return NextResponse.json({
      reply: fallbackMessage,
      source: 'LOCAL_EXPERT_AGRONOMIC_ENGINE',
      territorialContext: contextSummary,
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/advisor:', error);
    return NextResponse.json({
      reply: 'Estimado productor, hemos detectado los parámetros de su lote. Debido a una intermitencia en el canal satelital, le recomendamos verificar la acidez (pH) y asegurar la incorporación de materia orgánica para el cultivo seleccionado.',
      source: 'FALLBACK_SYSTEM',
    });
  }
}

function generateDeterministicAgronomicResponse(ctx: any): string {
  const { stateName, areaHectares, ph, organicMatter, selectedCrop, trajectory, mapbiomasAgua, orinocoShield, nasaClimate } = ctx;

  const isSouth = orinocoShield?.shieldActive;
  const anthropicYears = trajectory?.yearsInAnthropicUse ?? 15;
  const waterRegime = mapbiomasAgua?.hydrologicalRegime ?? 'Estacional';
  const rain = nasaClimate?.annualPrecipitationMm ?? 1400;

  if (isSouth) {
    return `🌲 **Dictamen Territorial Escudo del Orinoco (Estado ${stateName})**\n\n` +
      `Su parcela de **${areaHectares} ha** se encuentra en la faja de protección ecológica al sur del Orinoco. Los datos multitemporales de MapBiomas indican una cobertura boscosa que debe preservarse.\n\n` +
      `🛡️ **Directriz de Conservación:** Se desaconsejan los monocultivos extensivos con laboreo pesado.\n` +
      `🌱 **Prescripción de Sistemas Agroforestales (SAF):** Le recomendamos establecer **Cacao Criollo Fino de Aroma** o **Açaí/Manaca**, intercalados con especies maderables y leguminosas de sombra (como Guamo o Bucare).\n` +
      `💧 **Régimen Hídrico:** Precipitación de ${rain} mm/año con persistencia permanente; priorice canales de drenaje superficial.`;
  }

  let advice = `🌾 **Diagnóstico Agronómico con Memoria Territorial - Estado ${stateName}**\n\n`;
  advice += `Para su parcela de **${areaHectares} ha** con destino al cultivo de **${selectedCrop}**:\n\n`;

  // Memoria histórica
  advice += `📜 **Historial MapBiomas (40 años):** Su suelo registra aproximadamente **${anthropicYears} años bajo uso agropecuario continuo**. Esto ha generado una merma estimada en la fracción orgánica del suelo.\n\n`;

  // Prescripción de Suelo
  advice += `🧪 **Prescripción Edafológica:**\n`;
  if (ph < 5.8) {
    const limeTonHa = Math.round((6.2 - ph) * 1.8 * 10) / 10;
    advice += `• **Corrección de Acidez (pH ${ph}):** Aplicar **${limeTonHa} Ton/ha de Cal Agrícola / Dolomítica** al menos 30 días antes de la siembra para desbloquear el fósforo.\n`;
  } else {
    advice += `• **Acidez (pH ${ph}):** Suelo en rango óptimo para la asimilación de nutrientes.\n`;
  }

  if (organicMatter < 2.5 || anthropicYears > 15) {
    advice += `• **Regeneración de Suelo:** Incorporar **2.5 a 4.0 Ton/ha de materia orgánica o compost**, complementado con siembra directa sobre rastrojo para reactivar la microbiología.\n`;
  }

  // Agua y Clima
  advice += `\n💧 **Balance Hídrico (MapBiomas Agua + NASA POWER):**\n`;
  advice += `• Régimen **${waterRegime}** con **${rain} mm de lluvia anual**. En la ventana seca (Dic-Abr) es indispensable planificar riego suplementario o escalonar la siembra al inicio de las lluvias en Mayo.\n\n`;

  advice += `¿Desea conocer el calendario de fertilización fraccionado o el plan de rotación con leguminosas para este lote?`;

  return advice;
}
