import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const recommendations = await prisma.cropSoilRecommendation.findMany({
      include: {
        soil: { include: { region: true } },
        crop: true
      },
      orderBy: { soil: { name: 'asc' } }
    });
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener las recomendaciones' }, { status: 500 });
  }
}
