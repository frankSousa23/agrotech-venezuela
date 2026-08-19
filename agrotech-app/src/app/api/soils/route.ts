import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request?: Request) {
  try {
    const soils = await prisma.soil.findMany({
      include: { region: true }
    });
    return NextResponse.json(soils);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los suelos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'El nombre del suelo es obligatorio' }, { status: 400 });
    }

    // Para simplificar la prueba, si no hay región enviada, creamos una de prueba.
    // En producción, el usuario debería seleccionar la región desde el mapa.
    let regionId = body.regionId;
    if (!regionId) {
      // Buscar si existe la región por defecto
      let defaultRegion = await prisma.region.findFirst({
        where: { name: 'Región de prueba' }
      });
      
      if (!defaultRegion) {
        defaultRegion = await prisma.region.create({
          data: { name: 'Región de prueba', state: 'Desconocido' }
        });
      }
      regionId = defaultRegion.id;
    }

    const newSoil = await prisma.soil.create({
      data: {
        name: body.name,
        description: body.description,
        ph: body.ph,
        organicMatter: body.organicMatter,
        nitrogen: body.nitrogen,
        phosphorus: body.phosphorus,
        potassium: body.potassium,
        texture: body.texture,
        regionId: regionId
      },
    });
    
    return NextResponse.json(newSoil, { status: 201 });
  } catch (error) {
    console.error("Error al crear suelo:", error);
    return NextResponse.json({ error: 'Error al crear el registro de suelo' }, { status: 500 });
  }
}
