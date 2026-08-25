import { NextResponse } from 'next/server';
import { VENEZUELA_MUNICIPALITIES_DATA, getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { VENEZUELA_MUNICIPALITIES_GEOJSON, getMunicipalGeoJsonByState } from '@/lib/geo/venezuelaMunicipalitiesGeoJson';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const stateId = searchParams.get('stateId');
    const format = searchParams.get('format'); // 'geojson' o 'json'

    if (format === 'geojson') {
      if (stateId) {
        return NextResponse.json(getMunicipalGeoJsonByState(stateId));
      }
      return NextResponse.json(VENEZUELA_MUNICIPALITIES_GEOJSON);
    }

    if (stateId) {
      return NextResponse.json(getMunicipalitiesByState(stateId));
    }

    return NextResponse.json(VENEZUELA_MUNICIPALITIES_DATA);
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar municipios' }, { status: 500 });
  }
}
