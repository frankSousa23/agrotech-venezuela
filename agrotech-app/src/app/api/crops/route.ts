import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const crops = await prisma.crop.findMany();
    return NextResponse.json(crops);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los cultivos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newCrop = await prisma.crop.create({
      data: {
        name: body.name,
        scientificName: body.scientificName,
        description: body.description,
        idealPhMin: body.idealPhMin,
        idealPhMax: body.idealPhMax,
        waterReq: body.waterReq,
      },
    });
    
    return NextResponse.json(newCrop, { status: 201 });
  } catch (error) {
    console.error("Error al crear cultivo:", error);
    return NextResponse.json({ error: 'Error al crear el registro del cultivo' }, { status: 500 });
  }
}
