import { NextResponse } from 'next/server';

export interface RecommendationMatrixItem {
  id: string;
  cropId: string;
  cropName: string;
  scientificName: string;
  optimalPhRange: [number, number];
  preferredTexture: string[];
  baseThermalGdd: number;
  fertilizerNPKRecommendation: string;
  limingThresholdPh: number;
  waterRequirementsMmPerCycle: string;
  suitabilityRating: 'OPTIMAL' | 'MODERATE' | 'MARGINAL';
  advisorySummary: string;
}

export const CROP_RECOMMENDATIONS_CATALOG: RecommendationMatrixItem[] = [
  {
    id: 'rec-001',
    cropId: 'maiz',
    cropName: 'Maíz Blanco Harinero',
    scientificName: 'Zea mays',
    optimalPhRange: [5.8, 6.8],
    preferredTexture: ['Franco', 'Franco-limoso', 'Franco-arcilloso'],
    baseThermalGdd: 1650,
    fertilizerNPKRecommendation: '120-60-60 kg/ha N-P₂O₅-K₂O (Fraccionado: Siembra + V4 + V8)',
    limingThresholdPh: 5.5,
    waterRequirementsMmPerCycle: '550 - 650 mm',
    suitabilityRating: 'OPTIMAL',
    advisorySummary: 'Excelente vocación en los Llanos Occidentales (Portuguesa, Barinas). Requiere encalado si el pH cae por debajo de 5.5.'
  },
  {
    id: 'rec-002',
    cropId: 'arroz',
    cropName: 'Arroz Paddy',
    scientificName: 'Oryza sativa',
    optimalPhRange: [5.5, 6.5],
    preferredTexture: ['Arcilloso', 'Franco-arcilloso'],
    baseThermalGdd: 1800,
    fertilizerNPKRecommendation: '140-50-60 kg/ha N-P₂O₅-K₂O + Zinc al macollamiento',
    limingThresholdPh: 5.0,
    waterRequirementsMmPerCycle: '1100 - 1400 mm (Bajo lámina de agua)',
    suitabilityRating: 'OPTIMAL',
    advisorySummary: 'Óptimo para suelos pesados en Guárico y Portuguesa con acceso a sistemas de riego o inundación controlada.'
  },
  {
    id: 'rec-003',
    cropId: 'cacao',
    cropName: 'Cacao Criollo Porcelana',
    scientificName: 'Theobroma cacao',
    optimalPhRange: [6.0, 7.0],
    preferredTexture: ['Franco-aluvial', 'Franco-limoso'],
    baseThermalGdd: 2200,
    fertilizerNPKRecommendation: '80-40-80 kg/ha N-P₂O₅-K₂O + Abono Orgánico/Compost',
    limingThresholdPh: 5.8,
    waterRequirementsMmPerCycle: '1500 - 2000 mm bien distribuidos',
    suitabilityRating: 'OPTIMAL',
    advisorySummary: 'Sistema agroforestal de sombra. Requiere buen drenaje y materia orgánica > 3.0% en Sur del Lago y Barlovento.'
  },
  {
    id: 'rec-004',
    cropId: 'cana',
    cropName: 'Caña de Azúcar',
    scientificName: 'Saccharum officinarum',
    optimalPhRange: [6.0, 7.5],
    preferredTexture: ['Franco', 'Franco-arcilloso', 'Aluvial profundo'],
    baseThermalGdd: 2400,
    fertilizerNPKRecommendation: '150-80-120 kg/ha N-P₂O₅-K₂O',
    limingThresholdPh: 5.8,
    waterRequirementsMmPerCycle: '1200 - 1800 mm',
    suitabilityRating: 'OPTIMAL',
    advisorySummary: 'Excelente desarrollo en valles aluviales de Portuguesa, Lara y Aragua con alta insolación.'
  }
];

export async function GET() {
  try {
    return NextResponse.json(CROP_RECOMMENDATIONS_CATALOG);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al consultar matriz de recomendaciones agronómicas' },
      { status: 500 }
    );
  }
}
