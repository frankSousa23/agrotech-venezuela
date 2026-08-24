import { PrismaClient, Role } from '@prisma/client';

// Initial in-memory dataset for full resilience when PostgreSQL is not connected
const defaultRegions = [
  { id: 'reg-zulia', name: 'Región Zuliana', state: 'Zulia', geojson: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 'reg-barinas', name: 'Los Llanos Occidentales', state: 'Barinas', geojson: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 'reg-guarico', name: 'Los Llanos Centrales', state: 'Guárico', geojson: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 'reg-merida', name: 'Los Andes', state: 'Mérida', geojson: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 'reg-aragua', name: 'Región Central', state: 'Aragua', geojson: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 'reg-bolivar', name: 'Guayana', state: 'Bolívar', geojson: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 'reg-lara', name: 'Región Centro Occidental', state: 'Lara', geojson: null, createdAt: new Date(), updatedAt: new Date() },
];

const defaultUsers = [
  { id: 'usr-admin', email: 'admin@agrotech.ve', name: 'Admin Agrotech', role: 'ADMIN' as Role, createdAt: new Date(), updatedAt: new Date() },
  { id: 'usr-agronomist', email: 'agronomo@agrotech.ve', name: 'Ing. María Pérez', role: 'AGRONOMIST' as Role, createdAt: new Date(), updatedAt: new Date() },
];

const defaultSoils = [
  {
    id: 'soil-1',
    name: 'Suelo Arcilloso Sur del Lago',
    description: 'Suelo pesado con alta retención de humedad, propenso al encharcamiento. Muy fértil.',
    ph: 5.5,
    organicMatter: 4.2,
    nitrogen: 0.15,
    phosphorus: 12.0,
    potassium: 120.0,
    texture: 'Arcilloso',
    regionId: 'reg-zulia',
    createdBy: 'usr-agronomist',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'soil-2',
    name: 'Suelo Franco Arenoso Llanero',
    description: 'Buen drenaje, requiere fertilización constante. Ideal para cereales.',
    ph: 6.2,
    organicMatter: 1.8,
    nitrogen: 0.08,
    phosphorus: 8.5,
    potassium: 80.0,
    texture: 'Franco-Arenoso',
    regionId: 'reg-barinas',
    createdBy: 'usr-admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'soil-3',
    name: 'Suelo Limoso de los Valles',
    description: 'Suelo equilibrado, excelente retención de nutrientes y agua.',
    ph: 6.8,
    organicMatter: 3.5,
    nitrogen: 0.12,
    phosphorus: 15.0,
    potassium: 150.0,
    texture: 'Franco-Limoso',
    regionId: 'reg-aragua',
    createdBy: 'usr-agronomist',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'soil-4',
    name: 'Suelo Andino de Laderas',
    description: 'Suelo con pendiente, alta materia orgánica pero susceptible a erosión.',
    ph: 5.2,
    organicMatter: 5.0,
    nitrogen: 0.18,
    phosphorus: 10.0,
    potassium: 100.0,
    texture: 'Franco',
    regionId: 'reg-merida',
    createdBy: 'usr-agronomist',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const defaultCrops = [
  {
    id: 'crop-1',
    name: 'Maíz Blanco',
    scientificName: 'Zea mays',
    description: 'Cereal de alto rendimiento en Venezuela, base de la alimentación.',
    idealPhMin: 5.8,
    idealPhMax: 7.0,
    waterReq: 'Alto (500-800 mm)',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'crop-2',
    name: 'Plátano',
    scientificName: 'Musa paradisiaca',
    description: 'Cultivo tropical, excelente para el Sur del Lago de Maracaibo.',
    idealPhMin: 5.5,
    idealPhMax: 6.5,
    waterReq: 'Muy Alto (1200-2000 mm)',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'crop-3',
    name: 'Frijol (Caraota Negra)',
    scientificName: 'Phaseolus vulgaris',
    description: 'Leguminosa que ayuda a fijar nitrógeno en el suelo.',
    idealPhMin: 6.0,
    idealPhMax: 7.5,
    waterReq: 'Medio (300-500 mm)',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'crop-4',
    name: 'Café',
    scientificName: 'Coffea arabica',
    description: 'Cultivo tradicional de las zonas montañosas andinas.',
    idealPhMin: 5.0,
    idealPhMax: 6.0,
    waterReq: 'Alto (1500-2000 mm)',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'crop-5',
    name: 'Caña de Azúcar',
    scientificName: 'Saccharum officinarum',
    description: 'Cultivo industrial muy importante en los valles centrales.',
    idealPhMin: 6.0,
    idealPhMax: 7.5,
    waterReq: 'Muy Alto (1500-2500 mm)',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'crop-6',
    name: 'Sorgo',
    scientificName: 'Sorghum bicolor',
    description: 'Cereal resistente a la sequía, alternativa en los llanos orientales.',
    idealPhMin: 5.5,
    idealPhMax: 8.5,
    waterReq: 'Bajo (300-400 mm)',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const defaultRecommendations = [
  { id: 'rec-1', soilId: 'soil-1', cropId: 'crop-2', suitability: 'Alta', notes: 'Humedad óptima y textura adecuada para plátano' },
  { id: 'rec-2', soilId: 'soil-2', cropId: 'crop-1', suitability: 'Alta', notes: 'Excelente respuesta con fertilización nitrogenada' },
  { id: 'rec-3', soilId: 'soil-2', cropId: 'crop-6', suitability: 'Alta', notes: 'Resistente a la menor retención de agua' },
  { id: 'rec-4', soilId: 'soil-3', cropId: 'crop-5', suitability: 'Alta', notes: 'Suelo equilibrado ideal para caña' },
  { id: 'rec-5', soilId: 'soil-4', cropId: 'crop-4', suitability: 'Alta', notes: 'Clima de montaña y pH idóneo para café arábica' },
];

class InMemoryStore {
  regions = [...defaultRegions];
  users = [...defaultUsers];
  soils = [...defaultSoils];
  crops = [...defaultCrops];
  recommendations = [...defaultRecommendations];

  getRegion(id: string) {
    return this.regions.find((r) => r.id === id) || this.regions[0];
  }

  getCrop(id: string) {
    return this.crops.find((c) => c.id === id) || this.crops[0];
  }

  getSoil(id: string) {
    const s = this.soils.find((s) => s.id === id) || this.soils[0];
    return { ...s, region: this.getRegion(s.regionId) };
  }
}

const memoryStore = new InMemoryStore();

const createMockPrisma = () => {
  return {
    user: {
      findMany: async () => memoryStore.users,
      findFirst: async (opts?: any) => {
        if (opts?.where?.email) return memoryStore.users.find((u) => u.email === opts.where.email) ?? null;
        return memoryStore.users[0] ?? null;
      },
      create: async (opts: { data: any }) => {
        const item = { id: `usr-${Date.now()}`, createdAt: new Date(), updatedAt: new Date(), ...opts.data };
        memoryStore.users.push(item);
        return item;
      },
      deleteMany: async () => ({ count: memoryStore.users.length }),
    },
    region: {
      findMany: async () => memoryStore.regions,
      findFirst: async (opts?: any) => {
        if (opts?.where?.name) return memoryStore.regions.find((r) => r.name === opts.where.name) ?? null;
        if (opts?.where?.state) return memoryStore.regions.find((r) => r.state === opts.where.state) ?? null;
        return memoryStore.regions[0] ?? null;
      },
      create: async (opts: { data: any }) => {
        const item = { id: `reg-${Date.now()}`, geojson: null, createdAt: new Date(), updatedAt: new Date(), ...opts.data };
        memoryStore.regions.push(item);
        return item;
      },
      deleteMany: async () => ({ count: memoryStore.regions.length }),
    },
    soil: {
      findMany: async (opts?: any) => {
        return memoryStore.soils.map((s) => {
          if (opts?.include?.region) {
            return { ...s, region: memoryStore.getRegion(s.regionId) };
          }
          return s;
        });
      },
      findFirst: async (opts?: any) => {
        const s = memoryStore.soils[0] ?? null;
        if (!s) return null;
        if (opts?.include?.region) {
          return { ...s, region: memoryStore.getRegion(s.regionId) };
        }
        return s;
      },
      create: async (opts: { data: any }) => {
        const item = {
          id: `soil-${Date.now()}`,
          description: opts.data.description ?? null,
          ph: opts.data.ph ?? 6.0,
          organicMatter: opts.data.organicMatter ?? 2.0,
          nitrogen: opts.data.nitrogen ?? 0.1,
          phosphorus: opts.data.phosphorus ?? 10.0,
          potassium: opts.data.potassium ?? 100.0,
          texture: opts.data.texture ?? 'Franco',
          createdBy: opts.data.createdBy ?? null,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...opts.data,
        };
        memoryStore.soils.push(item);
        return { ...item, region: memoryStore.getRegion(item.regionId) };
      },
      deleteMany: async () => ({ count: memoryStore.soils.length }),
    },
    crop: {
      findMany: async () => memoryStore.crops,
      findFirst: async (opts?: any) => {
        if (opts?.where?.name) return memoryStore.crops.find((c) => c.name === opts.where.name) ?? null;
        return memoryStore.crops[0] ?? null;
      },
      create: async (opts: { data: any }) => {
        const item = {
          id: `crop-${Date.now()}`,
          scientificName: opts.data.scientificName ?? null,
          description: opts.data.description ?? null,
          idealPhMin: opts.data.idealPhMin ?? 5.5,
          idealPhMax: opts.data.idealPhMax ?? 7.5,
          waterReq: opts.data.waterReq ?? 'Medio',
          createdAt: new Date(),
          updatedAt: new Date(),
          ...opts.data,
        };
        memoryStore.crops.push(item);
        return item;
      },
      deleteMany: async () => ({ count: memoryStore.crops.length }),
    },
    cropSoilRecommendation: {
      findMany: async (opts?: any) => {
        return memoryStore.recommendations.map((r) => ({
          ...r,
          soil: opts?.include?.soil ? memoryStore.getSoil(r.soilId) : undefined,
          crop: opts?.include?.crop ? memoryStore.getCrop(r.cropId) : undefined,
        }));
      },
      create: async (opts: { data: any }) => {
        const item = { id: `rec-${Date.now()}`, ...opts.data };
        memoryStore.recommendations.push(item);
        return item;
      },
      deleteMany: async () => ({ count: memoryStore.recommendations.length }),
    },
    $disconnect: async () => {},
  };
};

let realPrisma: PrismaClient | null = null;
try {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
    realPrisma = new PrismaClient();
  }
} catch {
  realPrisma = null;
}

const mockPrisma = createMockPrisma();

// Proxy that forwards to real Prisma when available, and catches runtime errors falling back to in-memory store
const prisma = new Proxy({} as any, {
  get: (_, prop: string) => {
    if (prop === '$disconnect') {
      return async () => {
        if (realPrisma) {
          try {
            await realPrisma.$disconnect();
          } catch {}
        }
      };
    }

    const mockModel = (mockPrisma as any)[prop];
    const realModel = realPrisma ? (realPrisma as any)[prop] : null;

    if (!realModel) return mockModel;

    return new Proxy(mockModel, {
      get: (targetModel, method: string) => {
        return async (...args: any[]) => {
          try {
            return await realModel[method](...args);
          } catch (err) {
            console.warn(`[Prisma Fallback] ${prop}.${method} failed or database offline. Using in-memory dataset.`);
            if (targetModel && typeof targetModel[method] === 'function') {
              return await targetModel[method](...args);
            }
            return [];
          }
        };
      },
    });
  },
});

export default prisma as unknown as PrismaClient;
