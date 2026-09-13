/**
 * ============================================================================
 * AGROTECH VENEZUELA — EVALUACIÓN DE DISCREPANCIAS MAPBIOMAS (/api/mapbiomas/discrepancy)
 * ============================================================================
 * 
 * Endpoint REST para la detección de discrepancias y validación Ground-Truth
 * de MapBiomas Venezuela Colección 3 frente a Sentinel-2 y Sentinel-1 SAR.
 */

import { NextResponse } from 'next/server';
import { evaluateMapBiomasDiscrepancy } from '@/lib/geo/discrepancyService';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat') || '9.324');
    const lon = parseFloat(searchParams.get('lon') || searchParams.get('lng') || '-69.112');
    const classId = parseInt(searchParams.get('classId') || '18', 10);
    const ndvi = searchParams.get('ndvi') ? parseFloat(searchParams.get('ndvi')!) : undefined;
    const evi = searchParams.get('evi') ? parseFloat(searchParams.get('evi')!) : undefined;
    const ndwi = searchParams.get('ndwi') ? parseFloat(searchParams.get('ndwi')!) : undefined;
    const sarDb = searchParams.get('sarDb') ? parseFloat(searchParams.get('sarDb')!) : undefined;

    const evaluation = evaluateMapBiomasDiscrepancy(lat, lon, classId, { ndvi, evi, ndwi, sarDb });

    return NextResponse.json({
      success: true,
      service: 'Agrotech MapBiomas Colección 3 Discrepancy Detector',
      data: evaluation,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al evaluar discrepancia MapBiomas' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lat = typeof body.lat === 'number' ? body.lat : 9.324;
    const lon = typeof body.lon === 'number' ? body.lon : (typeof body.lng === 'number' ? body.lng : -69.112);
    const classId = typeof body.classId === 'number' ? body.classId : 18;
    const metrics = body.metrics || {
      ndvi: body.ndvi,
      evi: body.evi,
      ndwi: body.ndwi,
      sarDb: body.sarDb,
    };

    const evaluation = evaluateMapBiomasDiscrepancy(lat, lon, classId, metrics);

    return NextResponse.json({
      success: true,
      service: 'Agrotech MapBiomas Colección 3 Discrepancy Detector',
      data: evaluation,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al procesar solicitud de discrepancia MapBiomas' },
      { status: 400 }
    );
  }
}
