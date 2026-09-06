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
    const { prompt, parcelContext, chatHistory = [], uiMode = 'technical' } = body;

    if (!prompt && !parcelContext) {
      return NextResponse.json({ error: 'Se requiere prompt o contexto de parcela' }, { status: 400 });
    }

    const isFarmerMode = uiMode === 'farmer';

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

    const systemInstruction = isFarmerMode
      ? `
Eres **El Compadre Agrónomo**, el asesor de campo cercano, sabio y respetuoso de Agrotech Venezuela para pequeños y medianos productores del campo venezolano.
Tu objetivo es traducir datos satelitales y del suelo en consejos prácticos, directos, cálidos y entendibles al pie del surco, sin jerga enredada ni términos abstractos de computación.

REGLAS DE VOCABULARIO Y ESTILO (MODO PRODUCTOR FÁCIL):
1. **Cero tecnicismos incomprensibles**:
   - En vez de "retrodispersión radar SAR en dB", di: "el satélite miró por debajo de las nubes y detectó que la tierra todavía tiene buen agua guardada abajo" (o que está seca).
   - En vez de "grados día de desarrollo (GDD)" o "integral térmica", di: "días de buen sol y calor que le faltan a la mata para llenar bien la mazorca o el grano".
   - En vez de "fórmula de Kamprath / neutralización de Al3+", di: "echar cal agrícola para endulzar la tierra y quitarle la bravura ácida antes de sembrar".
   - En vez de "merma en la fracción orgánica del suelo", di: "tierra cansada por tantos años de siembra continua que necesita su descanso con bosta, compost o abono verde".
   - En vez de "balance evapotranspirativo P - ETc", di: "el agua de lluvia que le cae versus la sed que tiene el cultivo".
2. **Unidades tradicionales del campo**: Expresa dosis en sacos de 50 kg por hectárea o por tablón (1 Ton = 20 sacos de 50 kg; 1 ha = 1 tablón). Si recomiendas 2 Ton/ha de cal, di "unos 40 sacos de cal por hectárea".
3. **Memoria y Respeto por la Parcela**: Reconoce el esfuerzo del agricultor. Si la tierra lleva 20+ años sembrándose, recuérdale con cariño que ese suelo ha alimentado al país pero necesita nutrientes orgánicos.
4. **Escudo del Orinoco**: Si está al sur del Orinoco (${orinocoShield?.isSouthOfOrinoco ? 'ACTIVO' : 'Inactivo'}), recomienda con orgullo cuidar la selva mediante cacao fino bajo sombra de bucare o guamo, açaí (manaca) o abejas, sin tumbar ni quemar.
5. **Tono**: Amistoso, empático, humilde y práctico, como un buen técnico de campo tomándose un café con el productor.
`
      : `
Eres el **Asesor Agronómico Inteligente con Memoria Territorial de Agrotech Venezuela**.
Tu objetivo es traducir datos satelitales multitemporales (MapBiomas Venezuela Colección 3 de 1985 a 2024, MapBiomas Agua 2000-2024 y NASA POWER Agroclimatology) en recomendaciones agronómicas directas, prácticas, humanas y altamente profesionales para agricultores y técnicos de campo.

REGLAS DE ACTUACIÓN:
1. **Memoria Territorial**: Haz referencia explícita a la historia de la parcela si está disponible (ejemplo: "Notamos que este lote lleva 25 años bajo agricultura intensiva..." o "Tu parcela se encuentra en una zona de bosque primario al sur del Orinoco...").
2. **Escudo Ecológico del Orinoco**: Si la parcela está al sur del río Orinoco (${orinocoShield?.isSouthOfOrinoco ? 'ACTIVO' : 'Inactivo'}), NUNCA recomiendes monocultivos de tala/quema. Promueve exclusivamente Sistemas Agroforestales (SAF) como Cacao criollo bajo sombra, Copoazú, Açaí (Manaca) o Meliponicultura.
3. **Riesgo Hídrico (MapBiomas Agua)**: Explica la persistencia del agua superficial y el régimen hídrico según la temporada seca o lluviosa.
4. **Enmiendas y Suelo**: Proporciona dosis concretas de cal agrícola (si el pH es ácido < 5.8) y abonos orgánicos/verdes (si hay agotamiento de materia orgánica por décadas de uso).
5. **Tono**: Riguroso, técnico-agronómico, edafológicamente preciso pero aplicable en campo.
`;

    const contextSummary = isFarmerMode
      ? `
RESUMEN DEL LOTE PARA EL PRODUCTOR:
- Parcela: ${areaHectares} hectáreas en el Estado ${stateName}
- Estado del Suelo: ${ph < 5.8 ? 'Tierra Brava / Ácida' : 'Tierra Mansa / Dulce'} (pH ${ph}), Materia Orgánica: ${organicMatter}%, Textura: ${texture}
- Cultivo deseado: ${selectedCrop}
- Años de trabajo del suelo: ${trajectory?.yearsInAnthropicUse ?? 20} años de labor continua
- Agua y Lluvias: Régimen ${mapbiomasAgua?.hydrologicalRegime ?? 'Estacional'}, Lluvia anual: ${nasaClimate?.annualPrecipitationMm ?? 1450} mm
- Zona Ecológica Orinoco: ${orinocoShield?.shieldActive ? 'Al Sur del Orinoco (Zona Protegida SAF)' : 'Zona Agrícola Norte'}
`
      : `
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
      const userMessage = prompt || (isFarmerMode
        ? `Compadre, deme su consejo para sembrar ${selectedCrop} en este lote de ${areaHectares} ha en ${stateName}.`
        : `Genera un diagnóstico agronómico integral con memoria territorial para esta parcela de ${areaHectares} ha en ${stateName}, evaluando el cultivo ${selectedCrop}.`);

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
            text: `${contextSummary}\n\nConsulta:\n${userMessage}`,
          },
        ],
      });

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: isFarmerMode ? 0.3 : 0.4,
        },
      });

      return NextResponse.json({
        reply: response.text,
        source: 'GEMINI_2_5_FLASH_LIVE',
        territorialContext: contextSummary,
        uiMode,
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
    }, isFarmerMode);

    return NextResponse.json({
      reply: fallbackMessage,
      source: 'LOCAL_EXPERT_AGRONOMIC_ENGINE',
      territorialContext: contextSummary,
      uiMode,
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/advisor:', error);
    return NextResponse.json({
      reply: 'Estimado productor, hemos detectado los parámetros de su lote. Debido a una intermitencia en el canal satelital, le recomendamos verificar la acidez (pH) y asegurar la incorporación de materia orgánica para el cultivo seleccionado.',
      source: 'FALLBACK_SYSTEM',
    });
  }
}

function generateDeterministicAgronomicResponse(ctx: any, isFarmerMode: boolean = false): string {
  const { stateName, areaHectares, ph, organicMatter, selectedCrop, trajectory, mapbiomasAgua, orinocoShield, nasaClimate } = ctx;

  const isSouth = orinocoShield?.shieldActive;
  const anthropicYears = trajectory?.yearsInAnthropicUse ?? 15;
  const waterRegime = mapbiomasAgua?.hydrologicalRegime ?? 'Estacional';
  const rain = nasaClimate?.annualPrecipitationMm ?? 1400;

  if (isFarmerMode) {
    if (isSouth) {
      return `🌲 **Consejo de Campo: Zona de Selva al Sur del Orinoco (Estado ${stateName})**\n\n` +
        `¡Saludos, compadre! Su lote de **${areaHectares} hectáreas** está en la faja de protección ecológica de nuestra Guayana.\n\n` +
        `🛡️ **Cuidado de la Selva:** Esta tierra no es para meterle tractor pesado ni tumbar monte para monocultivo.\n` +
        `🌱 **La Mejor Siembra:** Aquí lo que mejor responde y deja ganancia sana es sembrar **Cacao Criollo Fino** bajo sombra de árboles buenos (como guamo o bucare), o también **Açaí (Manaca)**.\n` +
        `💧 **El Agua:** Llueven unos ${rain} mm al año. Asegúrese de abrir buenas zanjas para que el agua corra y no se le encharque la raíz.`;
    }

    let farmerAdvice = `🧑‍🌾 **Consejo del Compadre Agrónomo — Estado ${stateName}**\n\n`;
    farmerAdvice += `Para su parcela de **${areaHectares} ha** (${areaHectares} tablones) donde quiere sembrar **${selectedCrop}**:\n\n`;

    // Memoria histórica campesina
    farmerAdvice += `📜 **Memoria de su Tierra:** El satélite nos muestra que este suelo lleva más de **${anthropicYears} años trabajando sin descanso**. Es una tierra noble que ha dado comida, pero ya está pidiendo auxilio para recuperar su fuerza.\n\n`;

    // Prescripción en sacos y lenguaje llano
    farmerAdvice += `🌾 **Qué hacer con el Suelo:**\n`;
    if (ph < 5.8) {
      const limeTonHa = Math.round((6.2 - ph) * 1.8 * 10) / 10;
      const limeSacksHa = Math.round(limeTonHa * 20);
      farmerAdvice += `• **Quitarle la bravura ácida a la tierra (pH ${ph}):** El suelo está bravo y amarra la comida de la mata. Aplique **${limeSacksHa} sacos de cal agrícola (de 50 kg) por hectárea** (unas ${limeTonHa} Ton/ha), bien regados y mezclados un mes antes de tirar la semilla.\n`;
    } else {
      farmerAdvice += `• **Suelo Dulce y Manso (pH ${ph}):** Su tierra está en muy buen punto de acidez para que la semilla coma parejo.\n`;
    }

    if (organicMatter < 2.5 || anthropicYears > 15) {
      farmerAdvice += `• **Darle Fuerza a la Tierra Cansada:** Incorpore estiércol curado, compost o deje el rastrojo de la cosecha anterior sobre el suelo para que la tierra respire y retenga humedad.\n`;
    }

    // Agua y Clima
    farmerAdvice += `\n💧 **Las Lluvias y el Sol:**\n`;
    farmerAdvice += `• Régimen **${waterRegime}** con unos **${rain} mm de lluvia al año**. El satélite miró debajo de las nubes y vemos que si viene la sequía, es mejor asegurar agua de pozo o esperar el golpe de agua de mayo para asegurar la germinación.\n\n`;

    farmerAdvice += `¿Quiere que calculemos cuántos sacos de abono completo va a necesitar para la siembra o qué leguminosa le conviene rotar?`;

    return farmerAdvice;
  }

  // Modo Técnico
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
