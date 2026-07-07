import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Papa from 'papaparse';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No se proveyó ningún archivo' }, { status: 400 });
    }

    const text = await file.text();
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    
    const rows = result.data.map((row: any) => ({
      name: row.name || 'Cultivo Desconocido',
      scientificName: row.scientificName || null,
      description: row.description || null,
      idealPhMin: row.idealPhMin ? parseFloat(row.idealPhMin) : null,
      idealPhMax: row.idealPhMax ? parseFloat(row.idealPhMax) : null,
      waterReq: row.waterReq || null
    }));

    const created = await prisma.crop.createMany({
      data: rows,
      skipDuplicates: true
    });

    return NextResponse.json({ message: 'Éxito', count: created.count }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error procesando el archivo CSV' }, { status: 500 });
  }
}
