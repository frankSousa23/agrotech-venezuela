import prisma from '@/lib/prisma';

describe('Data Stability and Relations (Cascades & Restrict)', () => {
  let regionId: string;
  let soilId: string;
  let cropId: string;
  let recId: string;

  beforeAll(async () => {
    // 1. Create Region
    const region = await prisma.region.create({
      data: { name: 'Test Region Stability', state: 'Test State' }
    });
    regionId = region.id;

    // 2. Create Soil attached to Region
    const soil = await prisma.soil.create({
      data: { name: 'Test Soil Stability', regionId: region.id }
    });
    soilId = soil.id;

    // 3. Create Crop
    const crop = await prisma.crop.create({
      data: { name: 'Test Crop Stability' }
    });
    cropId = crop.id;

    // 4. Create Recommendation
    const rec = await prisma.cropSoilRecommendation.create({
      data: { soilId: soil.id, cropId: crop.id, suitability: 'Alta' }
    });
    recId = rec.id;
  });

  afterAll(async () => {
    // Clean up
    await prisma.cropSoilRecommendation.deleteMany({ where: { id: recId } });
    await prisma.crop.deleteMany({ where: { id: cropId } });
    await prisma.soil.deleteMany({ where: { id: soilId } });
    await prisma.region.deleteMany({ where: { id: regionId } });
  });

  it('debería evitar borrar una Región que tiene Suelos asociados (onDelete: Restrict)', async () => {
    // Prisma tira un error de restricción de Foreign Key "Foreign key constraint failed on the field: `regionId`"
    await expect(
      prisma.region.delete({ where: { id: regionId } })
    ).rejects.toThrow();
  });

  it('debería borrar en cascada las recomendaciones si se borra un Cultivo (onDelete: Cascade)', async () => {
    // 1. Creamos un cultivo temporal
    const tempCrop = await prisma.crop.create({ data: { name: 'Temp Crop' } });
    
    // 2. Le creamos una recomendación
    const tempRec = await prisma.cropSoilRecommendation.create({
      data: { soilId: soilId, cropId: tempCrop.id, suitability: 'Baja' }
    });

    // 3. Borramos el cultivo
    await prisma.crop.delete({ where: { id: tempCrop.id } });

    // 4. Comprobamos que la recomendación desapareció automáticamente
    const foundRec = await prisma.cropSoilRecommendation.findUnique({
      where: { id: tempRec.id }
    });
    
    expect(foundRec).toBeNull();
  });
});
