import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with test data...')

  // Limpiar datos previos si existen (en orden inverso de relaciones)
  await prisma.cropSoilRecommendation.deleteMany()
  await prisma.soil.deleteMany()
  await prisma.crop.deleteMany()
  await prisma.region.deleteMany()
  await prisma.user.deleteMany()

  // 1. Crear Usuarios de prueba
  const admin = await prisma.user.create({
    data: {
      email: 'admin@agrotech.ve',
      name: 'Admin Agrotech',
      role: Role.ADMIN,
    },
  })

  const agronomist = await prisma.user.create({
    data: {
      email: 'agronomo@agrotech.ve',
      name: 'Ing. María Pérez',
      role: Role.AGRONOMIST,
    },
  })

  // 2. Crear Regiones de Venezuela
  const regionsData = [
    { name: 'Región Zuliana', state: 'Zulia' },
    { name: 'Los Llanos Occidentales', state: 'Barinas' },
    { name: 'Los Llanos Centrales', state: 'Guárico' },
    { name: 'Los Andes', state: 'Mérida' },
    { name: 'Región Central', state: 'Aragua' },
    { name: 'Guayana', state: 'Bolívar' },
    { name: 'Región Centro Occidental', state: 'Lara' },
  ]
  
  console.log('Creando regiones...')
  for (const r of regionsData) {
    await prisma.region.create({ data: r })
  }

  const regions = await prisma.region.findMany()
  const zulia = regions.find(r => r.state === 'Zulia')!
  const barinas = regions.find(r => r.state === 'Barinas')!
  const aragua = regions.find(r => r.state === 'Aragua')!
  const merida = regions.find(r => r.state === 'Mérida')!

  // 3. Crear Suelos de prueba
  console.log('Creando suelos...')
  const soilsData = [
    {
      name: 'Suelo Arcilloso Sur del Lago',
      description: 'Suelo pesado con alta retención de humedad, propenso al encharcamiento. Muy fértil.',
      ph: 5.5,
      organicMatter: 4.2,
      nitrogen: 0.15,
      phosphorus: 12.0,
      potassium: 120.0,
      texture: 'Arcilloso',
      regionId: zulia.id,
      createdBy: agronomist.id
    },
    {
      name: 'Suelo Franco Arenoso Llanero',
      description: 'Buen drenaje, requiere fertilización constante. Ideal para cereales.',
      ph: 6.2,
      organicMatter: 1.8,
      nitrogen: 0.08,
      phosphorus: 8.5,
      potassium: 80.0,
      texture: 'Franco-Arenoso',
      regionId: barinas.id,
      createdBy: admin.id
    },
    {
      name: 'Suelo Limoso de los Valles',
      description: 'Suelo equilibrado, excelente retención de nutrientes y agua.',
      ph: 6.8,
      organicMatter: 3.5,
      nitrogen: 0.12,
      phosphorus: 15.0,
      potassium: 150.0,
      texture: 'Franco-Limoso',
      regionId: aragua.id,
      createdBy: agronomist.id
    },
    {
      name: 'Suelo Andino de Laderas',
      description: 'Suelo con pendiente, alta materia orgánica pero susceptible a erosión.',
      ph: 5.2,
      organicMatter: 5.0,
      nitrogen: 0.18,
      phosphorus: 10.0,
      potassium: 100.0,
      texture: 'Franco',
      regionId: merida.id,
      createdBy: agronomist.id
    }
  ]

  for (const s of soilsData) {
    await prisma.soil.create({ data: s })
  }

  // 4. Crear Cultivos de prueba
  console.log('Creando cultivos...')
  const cropsData = [
    {
      name: 'Maíz Blanco',
      scientificName: 'Zea mays',
      description: 'Cereal de alto rendimiento en Venezuela, base de la alimentación.',
      idealPhMin: 5.8,
      idealPhMax: 7.0,
      waterReq: 'Alto (500-800 mm)'
    },
    {
      name: 'Plátano',
      scientificName: 'Musa paradisiaca',
      description: 'Cultivo tropical, excelente para el Sur del Lago de Maracaibo.',
      idealPhMin: 5.5,
      idealPhMax: 6.5,
      waterReq: 'Muy Alto (1200-2000 mm)'
    },
    {
      name: 'Frijol (Caraota Negra)',
      scientificName: 'Phaseolus vulgaris',
      description: 'Leguminosa que ayuda a fijar nitrógeno en el suelo.',
      idealPhMin: 6.0,
      idealPhMax: 7.5,
      waterReq: 'Medio (300-500 mm)'
    },
    {
      name: 'Café',
      scientificName: 'Coffea arabica',
      description: 'Cultivo tradicional de las zonas montañosas andinas.',
      idealPhMin: 5.0,
      idealPhMax: 6.0,
      waterReq: 'Alto (1500-2000 mm)'
    },
    {
      name: 'Caña de Azúcar',
      scientificName: 'Saccharum officinarum',
      description: 'Cultivo industrial muy importante en los valles centrales.',
      idealPhMin: 6.0,
      idealPhMax: 7.5,
      waterReq: 'Muy Alto (1500-2500 mm)'
    },
    {
      name: 'Sorgo',
      scientificName: 'Sorghum bicolor',
      description: 'Cereal resistente a la sequía, alternativa en los llanos orientales.',
      idealPhMin: 5.5,
      idealPhMax: 8.5,
      waterReq: 'Bajo (300-400 mm)'
    }
  ]

  for (const c of cropsData) {
    await prisma.crop.create({ data: c })
  }

  console.log('Seeding finished successfully! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
