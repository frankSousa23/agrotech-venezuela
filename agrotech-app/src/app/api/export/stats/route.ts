import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Papa from 'papaparse';
import * as xlsx from 'xlsx';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'csv';

  try {
    const soils = await prisma.soil.findMany({ include: { region: true } });
    
    const data = soils.map(s => ({
      ID: s.id,
      Nombre_Suelo: s.name,
      Region: s.region?.name || 'N/A',
      Textura: s.texture || 'N/A',
      pH: s.ph || 0,
      Nitrogeno: s.nitrogen || 0,
      Fosforo: s.phosphorus || 0,
      Potasio: s.potassium || 0,
      Materia_Organica: s.organicMatter || 0
    }));

    if (format === 'csv') {
      const csv = Papa.unparse(data);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="estadisticas_suelos.csv"'
        }
      });
    } else {
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, "Suelos");
      const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="estadisticas_suelos.xlsx"'
        }
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error al exportar datos' }, { status: 500 });
  }
}
