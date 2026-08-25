import { NextResponse } from 'next/server';

export interface InMemFieldLog {
  id: string;
  parcelId: string;
  userId: string;
  logType: 'SIEMBRA' | 'ENCALADO' | 'FERTILIZACION' | 'RIEGO' | 'FITOSANITARIO' | 'COSECHA' | 'OBSERVACION';
  title: string;
  description: string;
  dosage?: string;
  yieldTonHa?: number;
  date: string;
}

export const IN_MEMORY_LOGS: InMemFieldLog[] = [
  {
    id: "log-001",
    parcelId: "parc-001",
    userId: "usr-farmer-01",
    logType: "ENCALADO",
    title: "Aplicación de Cal Dolomítica",
    description: "Corrección preventiva de acidez edafológica antes del inicio de lluvias.",
    dosage: "1.8 Ton/ha (Dolomita 85% PRNT)",
    date: "2026-01-15"
  },
  {
    id: "log-002",
    parcelId: "parc-001",
    userId: "usr-farmer-01",
    logType: "SIEMBRA",
    title: "Siembra Directa Maíz Híbrido Blanco",
    description: "Densidad de siembra 72.000 plantas/ha a 0.80m entre hileras.",
    dosage: "20 kg/ha de semilla tratada",
    date: "2026-02-01"
  },
  {
    id: "log-003",
    parcelId: "parc-001",
    userId: "usr-farmer-01",
    logType: "FERTILIZACION",
    title: "Fertilización Reabono Nitrogenado",
    description: "Aplicación al voleo en etapa V6 con suelo a capacidad de campo.",
    dosage: "150 kg/ha Urea 46% N",
    date: "2026-03-01"
  },
  {
    id: "log-004",
    parcelId: "parc-002",
    userId: "usr-farmer-01",
    logType: "COSECHA",
    title: "Cosecha Ciclo Norte-Verano Arroz",
    description: "Cosecha mecanizada con humedad de grano al 21%.",
    dosage: "Rendimiento óptimo obtenido",
    yieldTonHa: 6.8,
    date: "2026-02-28"
  }
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr-farmer-01';
    const parcelId = searchParams.get('parcelId');

    let logs = IN_MEMORY_LOGS.filter(l => l.userId === userId);
    if (parcelId) {
      logs = logs.filter(l => l.parcelId === parcelId);
    }
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar bitácora de campo' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      parcelId = 'parc-001',
      userId = 'usr-farmer-01',
      logType = 'OBSERVACION',
      title,
      description,
      dosage,
      yieldTonHa,
      date = new Date().toISOString().split('T')[0]
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Título y descripción requeridos' }, { status: 400 });
    }

    const newLog: InMemFieldLog = {
      id: `log-${Date.now()}`,
      parcelId,
      userId,
      logType,
      title,
      description,
      dosage,
      yieldTonHa: yieldTonHa ? parseFloat(yieldTonHa) : undefined,
      date
    };

    IN_MEMORY_LOGS.unshift(newLog);
    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar entrada en el cuaderno de campo' }, { status: 500 });
  }
}
