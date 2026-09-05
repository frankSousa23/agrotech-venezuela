/**
 * Parser Fonético y Semántico de Léxico Vernáculo Agrícola Venezolano (Offline-First)
 * Permite a productores y técnicos registrar labores por voz sin fricción tecnológica,
 * traduciendo modismos campesinos y unidades tradicionales a registros estructurados.
 */

export type VernacularLaborType = 
  | 'SIEMBRA' 
  | 'ENCALADO' 
  | 'FERTILIZACION' 
  | 'FITOSANITARIO' 
  | 'RIEGO' 
  | 'COSECHA' 
  | 'OBSERVACION';

export interface ParsedAgronomicAction {
  rawTranscript: string;
  normalizedAction: VernacularLaborType;
  actionConfidence: number; // 0 a 1
  actionLabel: string;
  detectedCrop?: string;
  detectedInput?: string;
  metricQuantity?: number;
  metricUnit?: 'kg' | 'L' | 'ha' | 'sacos' | 'ton';
  traditionalUnitFound?: string;
  detectedParcelName?: string;
  summary: string;
}

// Factores de conversión de unidades tradicionales campesinas a métrico
export const TRADITIONAL_UNIT_CONVERSIONS: Record<string, { factor: number; metricUnit: 'kg' | 'L' | 'ha' }> = {
  saco: { factor: 50, metricUnit: 'kg' },
  sacos: { factor: 50, metricUnit: 'kg' },
  bulto: { factor: 50, metricUnit: 'kg' },
  bultos: { factor: 50, metricUnit: 'kg' },
  tambor: { factor: 200, metricUnit: 'L' },
  tambores: { factor: 200, metricUnit: 'L' },
  pipote: { factor: 200, metricUnit: 'L' },
  pipotes: { factor: 200, metricUnit: 'L' },
  caneca: { factor: 20, metricUnit: 'L' },
  canecas: { factor: 20, metricUnit: 'L' },
  bomba: { factor: 20, metricUnit: 'L' },
  bombas: { factor: 20, metricUnit: 'L' },
  asperjadora: { factor: 20, metricUnit: 'L' },
  tablon: { factor: 1.0, metricUnit: 'ha' },
  tablones: { factor: 1.0, metricUnit: 'ha' },
  tablita: { factor: 0.5, metricUnit: 'ha' },
  tablitas: { factor: 0.5, metricUnit: 'ha' },
};

// Mapeo léxico de verbos y expresiones campesinas a labores formales
const ACTION_PATTERNS: Array<{
  type: VernacularLaborType;
  label: string;
  regex: RegExp;
  weight: number;
}> = [
  {
    type: 'FERTILIZACION',
    label: 'Fertilización / Nutrición',
    regex: /\b(fertiliz|urea|reabono|reabonar|abono|abone|tirar abono|echar urea|eche urea|echar abono|nitrogeno|formula|npk|potasio|fosforo|foliar|echarle comida)\b/i,
    weight: 0.95,
  },
  {
    type: 'ENCALADO',
    label: 'Encalado / Corrección de Suelos',
    regex: /\b(encal|cal dolomitica|cal agricola|carbonato|tirar cal|echar cal|eche cal|yeso agricola|desalitrar)\b/i,
    weight: 0.95,
  },
  {
    type: 'FITOSANITARIO',
    label: 'Control Fitosanitario / Sanidad',
    regex: /\b(fumig|veneno|curar|plaga|candelilla|cogollero|gusano|bicho|insecticida|fungicida|herbicida|matar monte|limpia|enfermedad|engurruñad)\b/i,
    weight: 0.90,
  },
  {
    type: 'SIEMBRA',
    label: 'Siembra / Establecimiento',
    regex: /\b(sembr|siembra|sembre|meter semilla|tirar semilla|chuzear|semillero|transplante|postura)\b/i,
    weight: 0.90,
  },
  {
    type: 'RIEGO',
    label: 'Riego / Hidráulica Agrícola',
    regex: /\b(rieg|regar|regue|abrir el agua|mojar|bombeo|goteo|aspersion|canal de riego)\b/i,
    weight: 0.85,
  },
  {
    type: 'COSECHA',
    label: 'Cosecha / Recolección',
    regex: /\b(cosech|coger|recolect|cortar|arrancar|sacar cosecha|rendimiento|cogi|recogi)\b/i,
    weight: 0.85,
  },
];

// Detección de Cultivos Principales
const CROP_PATTERNS = [
  { name: 'Maíz', regex: /\b(maiz|maizal|choclo|jojoto)\b/i },
  { name: 'Arroz', regex: /\b(arroz|arrozal)\b/i },
  { name: 'Café', regex: /\b(cafe|cafetal|cereza)\b/i },
  { name: 'Cacao', regex: /\b(cacao|cacaotal|mazorca)\b/i },
  { name: 'Caña de Azúcar', regex: /\b(caña|cañamelar)\b/i },
  { name: 'Tomate Cherry', regex: /\b(tomate|tomates|cherry|hortaliza)\b/i },
  { name: 'Plátano / Cambur', regex: /\b(platano|cambur|banano|platanal)\b/i },
  { name: 'Yuca', regex: /\b(yuca|yucal)\b/i },
  { name: 'Frijol Bayo', regex: /\b(frijol|caraota|leguminosa)\b/i },
  { name: 'Pastos Mejorados', regex: /\b(pasto|potrero|brachiaria|brizantha)\b/i },
];

// Normalizador numérico de texto oral en español a número
const NUMBER_WORDS: Record<string, number> = {
  un: 1, una: 1, uno: 1,
  dos: 2, tres: 3, cuatro: 4, cinco: 5,
  seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10,
  quince: 15, veinte: 20, veinticinco: 25, treinta: 30,
  cuarenta: 40, cincuenta: 50, cien: 100, doscientos: 200,
};

/**
 * Parsea el texto oral dictado por el agricultor y extrae una acción agronómica normalizada.
 */
export function parseVernacularSpeech(rawText: string): ParsedAgronomicAction {
  const text = rawText.trim().toLowerCase();
  // Normalizar acentos (ej. "recogí" -> "recogi", "maíz" -> "maiz")
  const normText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // 1. Clasificar Acción Agronómica
  let bestAction: VernacularLaborType = 'OBSERVACION';
  let bestLabel = 'Observación General de Campo';
  let maxConfidence = 0.5;

  for (const pattern of ACTION_PATTERNS) {
    if (pattern.regex.test(text) || pattern.regex.test(normText)) {
      bestAction = pattern.type;
      bestLabel = pattern.label;
      maxConfidence = pattern.weight;
      break;
    }
  }

  // 2. Extraer Cultivo si se menciona
  let detectedCrop: string | undefined = undefined;
  for (const crop of CROP_PATTERNS) {
    if (crop.regex.test(text) || crop.regex.test(normText)) {
      detectedCrop = crop.name;
      break;
    }
  }

  // 3. Extraer Insumo
  let detectedInput: string | undefined = undefined;
  if (/\burea\b/i.test(text)) detectedInput = 'Urea Agrícola (46% N)';
  else if (/\bcal dolomitica\b/i.test(text)) detectedInput = 'Cal Dolomítica (CaCO₃+MgCO₃)';
  else if (/\bcal\b/i.test(text)) detectedInput = 'Cal Agrícola';
  else if (/\byeso\b/i.test(text)) detectedInput = 'Yeso Agrícola (CaSO₄)';
  else if (/\bcompost|gallinaza\b/i.test(text)) detectedInput = 'Enmienda Orgánica Compostada';
  else if (/\bveneno|insecticida\b/i.test(text)) detectedInput = 'Controlador Fitosanitario';
  else if (/\bnpk|formula\b/i.test(text)) detectedInput = 'Fertilizante Compuesto NPK';

  // 4. Extraer Cantidades y Unidades Tradicionales
  let metricQuantity: number | undefined = undefined;
  let metricUnit: 'kg' | 'L' | 'ha' | 'sacos' | 'ton' | undefined = undefined;
  let traditionalUnitFound: string | undefined = undefined;

  // Buscar patrones como "3 sacos", "un tambor", "50 kilos", "2 canecas", "10 ton"
  const unitMatch = text.match(/(\d+|un|una|uno|dos|tres|cuatro|cinco|diez|veinte|treinta|cuarenta|cincuenta|cien)\s*(sacos?|bultos?|tambor(?:es)?|pipotes?|canecas?|bombas?|asperjadoras?|kilos?|kg|litros?|l|toneladas?|ton|tabl[oó]n(?:es)?|tablitas?)/i);

  if (unitMatch) {
    const rawNum = unitMatch[1].toLowerCase();
    const rawUnit = unitMatch[2].toLowerCase();
    const count = NUMBER_WORDS[rawNum] !== undefined ? NUMBER_WORDS[rawNum] : parseFloat(rawNum);

    if (!isNaN(count)) {
      traditionalUnitFound = `${count} ${rawUnit}`;
      const conv = TRADITIONAL_UNIT_CONVERSIONS[rawUnit];
      if (conv) {
        metricQuantity = count * conv.factor;
        metricUnit = conv.metricUnit;
      } else if (/kilo|kg/i.test(rawUnit)) {
        metricQuantity = count;
        metricUnit = 'kg';
      } else if (/litro|l/i.test(rawUnit)) {
        metricQuantity = count;
        metricUnit = 'L';
      } else if (/tonelada|ton/i.test(rawUnit)) {
        metricQuantity = count * 1000;
        metricUnit = 'kg';
      }
    }
  }

  // 5. Extraer posible nombre de lote o parcela
  let detectedParcelName: string | undefined = undefined;
  const parcelMatch = text.match(/(?:en el|al|en la)\s+(lote\s+\w+|tabl[oó]n\s+\w+|parcela\s+\w+|tablita\s+\w+|potrero\s+\w+)/i);
  if (parcelMatch) {
    detectedParcelName = parcelMatch[1].charAt(0).toUpperCase() + parcelMatch[1].slice(1);
  }

  // 6. Resumen en lenguaje natural
  let summary = `${bestLabel}`;
  if (detectedCrop) summary += ` en ${detectedCrop}`;
  if (detectedInput) summary += ` con ${detectedInput}`;
  if (metricQuantity && metricUnit) summary += ` (${metricQuantity} ${metricUnit} equivalentes)`;
  if (detectedParcelName) summary += ` [${detectedParcelName}]`;

  return {
    rawTranscript: rawText,
    normalizedAction: bestAction,
    actionConfidence: maxConfidence,
    actionLabel: bestLabel,
    detectedCrop,
    detectedInput,
    metricQuantity,
    metricUnit,
    traditionalUnitFound,
    detectedParcelName,
    summary
  };
}
