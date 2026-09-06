/**
 * ============================================================================
 * AGROTECH VENEZUELA — ORÁCULO DE VALIDACIÓN SENTINEL-1 SAR (/api/mrv/sar-oracle)
 * ============================================================================
 * 
 * Endpoint REST para la verificación cruzada de carbono MRV bajo Verra VCS:
 * - Valida retrodispersión C-Band (polarizaciones cruzadas VH/VV).
 * - Colapsa penalizaciones de incertidumbre técnica del 40% al 10%.
 * - Emite comprobante de auditoría firmado criptográficamente.
 */

import { NextResponse } from 'next/server';
import { verifySarMrvOracle } from '@/lib/geo/sarRadarService';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat') || '9.324');
    const lng = parseFloat(searchParams.get('lng') || '-69.112');
    const rainMm = parseFloat(searchParams.get('rainMm') || '1350');

    const oracleResult = verifySarMrvOracle(lat, lng, rainMm);

    return NextResponse.json({
      success: true,
      service: 'Agrotech Sentinel-1 SAR MRV Ground-Truth Oracle',
      oracle: oracleResult
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al consultar oráculo SAR MRV' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lat = typeof body.lat === 'number' ? body.lat : 9.324;
    const lng = typeof body.lng === 'number' ? body.lng : -69.112;
    const rainMm = typeof body.rainMm === 'number' ? body.rainMm : 1350;

    const oracleResult = verifySarMrvOracle(lat, lng, rainMm);

    return NextResponse.json({
      success: true,
      service: 'Agrotech Sentinel-1 SAR MRV Ground-Truth Oracle',
      oracle: oracleResult
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al procesar solicitud del oráculo SAR MRV' },
      { status: 400 }
    );
  }
}
