import { NextResponse } from 'next/server';
import { IN_MEMORY_SOILS } from '@/app/api/soils/route';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format')?.toLowerCase() || 'csv';

    if (format === 'json') {
      return NextResponse.json({
        exportDate: new Date().toISOString(),
        totalProfiles: IN_MEMORY_SOILS.length,
        soils: IN_MEMORY_SOILS
      });
    }

    // Default to CSV export (also compatible with Excel via standard delimiter)
    const headers = [
      'ID',
      'Nombre_Lote',
      'Estado',
      'Region',
      'Latitud',
      'Longitud',
      'pH',
      'Materia_Organica_Pct',
      'Textura',
      'Nitrogeno',
      'Fosforo',
      'Potasio',
      'Fecha_Registro'
    ];

    const rows = IN_MEMORY_SOILS.map(soil => [
      soil.id,
      `"${soil.name.replace(/"/g, '""')}"`,
      soil.state,
      `"${soil.region.name.replace(/"/g, '""')}"`,
      soil.latitude,
      soil.longitude,
      soil.ph,
      soil.organicMatter,
      `"${soil.texture.replace(/"/g, '""')}"`,
      `"${(soil.nitrogen || '').replace(/"/g, '""')}"`,
      `"${(soil.phosphorus || '').replace(/"/g, '""')}"`,
      `"${(soil.potassium || '').replace(/"/g, '""')}"`,
      soil.createdAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="agrotech_edafologia_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al exportar datos edafológicos' },
      { status: 500 }
    );
  }
}
