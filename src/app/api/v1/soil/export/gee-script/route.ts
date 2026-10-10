import { NextResponse } from 'next/server';
import { generateMapBiomasGeeScript } from '@/lib/soil-module/geeTemplateGenerator';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const prntParam = searchParams.get('prnt');
    const prnt = prntParam ? parseFloat(prntParam) : 85.0;

    const scriptContent = generateMapBiomasGeeScript({
      defaultPrnt: isNaN(prnt) ? 85.0 : prnt,
      maxLimingRateTonHa: 3.0,
      generatedDate: new Date().toISOString().split('T')[0]
    });

    return new Response(scriptContent, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/javascript; charset=utf-8',
        'Content-Disposition': 'attachment; filename="mapbiomas_soil_engine.js"'
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al generar script para Google Earth Engine', message: error?.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
