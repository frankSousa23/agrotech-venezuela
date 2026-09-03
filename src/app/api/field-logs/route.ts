/**
 * ============================================================================
 * AGROTECH VENEZUELA — API REST DE CUADERNO DE CAMPO DIGITAL (/api/field-logs)
 * ============================================================================
 * 
 * Endpoint REST para la bitácora cronológica de labores agronómicas:
 * 1. GET /api/field-logs:
 *    - Obtiene los registros históricos agrupados por 'parcelId' o 'userId'.
 *    - Filtra por tipo de labor (Siembra, Encalado, Fertilización, Riego, Cosecha).
 * 2. POST /api/field-logs:
 *    - Registra una nueva labor técnica con dosis, insumos aplicados y rendimientos en Ton/ha.
 * 3. DELETE /api/field-logs:
 *    - Elimina un evento de bitácora específico.
 * 
 * Interacciones:
 * - Usado por: Cuaderno de Campo (/dashboard/bitacora) y Analítica Territorial (/dashboard/estadisticas).
 */

import { NextResponse } from 'next/server';
import { extractUserFromRequest } from '@/lib/auth/authUtils';

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
  },
  {
    id: "log-005",
    parcelId: "parc-003",
    userId: "usr-farmer-01",
    logType: "FERTILIZACION",
    title: "Fertilización Potásica y Foliar en Plátano",
    description: "Aplicación al cuello de la planta con alto contenido de K para llenado de racimo.",
    dosage: "220 kg/ha Cloruro de Potasio (KCl)",
    date: "2026-02-10"
  },
  {
    id: "log-006",
    parcelId: "parc-004",
    userId: "usr-farmer-01",
    logType: "OBSERVACION",
    title: "Monitoreo de Sombra y Poda de Café",
    description: "Ajuste de cobertura arbórea con Guamo (Inga sp.) para 40% de radiación difusa.",
    dosage: "Poda sanitaria manual",
    date: "2026-02-18"
  },
  {
    id: "log-007",
    parcelId: "parc-005",
    userId: "usr-farmer-01",
    logType: "SIEMBRA",
    title: "Inoculación y Siembra de Soya",
    description: "Inoculación biológica con Bradyrhizobium japonicum para fijación biológica de Nitrógeno.",
    dosage: "65 kg/ha semilla tratada",
    date: "2026-01-20"
  }
];

// Almacén aislado de labores por sesión de invitado (multi-guest isolation)
export const GUEST_LOGS_MAP = new Map<string, InMemFieldLog[]>();

export function getOrCreateGuestLogs(guestId: string): InMemFieldLog[] {
  if (!GUEST_LOGS_MAP.has(guestId)) {
    const cleanLogs: InMemFieldLog[] = IN_MEMORY_LOGS.slice(0, 3).map((l, idx) => ({
      ...l,
      id: `log-guest-${guestId.replace('usr-guest-', '')}-${idx + 1}`,
      userId: guestId,
      parcelId: idx === 2 ? `parc-guest-${guestId.replace('usr-guest-', '')}-2` : `parc-guest-${guestId.replace('usr-guest-', '')}-1`
    }));
    GUEST_LOGS_MAP.set(guestId, cleanLogs);
  }
  return GUEST_LOGS_MAP.get(guestId)!;
}

export async function GET(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    const { searchParams } = new URL(req.url);
    const requestedUserId = session ? session.id : (searchParams.get('userId') || 'usr-farmer-01');
    const parcelId = searchParams.get('parcelId');
    const isGuest = session 
      ? (session.isGuest || session.status === 'GUEST' || session.id.startsWith('usr-guest')) 
      : requestedUserId.startsWith('usr-guest');

    let logs: InMemFieldLog[];
    if (isGuest) {
      logs = getOrCreateGuestLogs(requestedUserId);
    } else {
      logs = IN_MEMORY_LOGS.filter(l => l.userId === requestedUserId);
    }

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
    const session = extractUserFromRequest(req);
    const body = await req.json();
    const {
      parcelId = 'parc-001',
      userId,
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

    const effectiveUserId = session ? session.id : (userId || 'usr-farmer-01');
    const isGuest = session 
      ? (session.isGuest || session.status === 'GUEST' || session.id.startsWith('usr-guest')) 
      : effectiveUserId.startsWith('usr-guest');

    const newLog: InMemFieldLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      parcelId,
      userId: effectiveUserId,
      logType,
      title,
      description,
      dosage,
      yieldTonHa: yieldTonHa ? parseFloat(yieldTonHa) : undefined,
      date
    };

    if (isGuest) {
      const guestLogs = getOrCreateGuestLogs(effectiveUserId);
      guestLogs.unshift(newLog);
      return NextResponse.json({ success: true, log: newLog }, { status: 201 });
    }

    IN_MEMORY_LOGS.unshift(newLog);
    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar entrada en el cuaderno de campo' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID de registro requerido' }, { status: 400 });
    }

    const effectiveUserId = session ? session.id : (searchParams.get('userId') || 'usr-farmer-01');
    const isGuest = session 
      ? (session.isGuest || session.status === 'GUEST' || session.id.startsWith('usr-guest')) 
      : effectiveUserId.startsWith('usr-guest');

    if (isGuest) {
      const guestLogs = getOrCreateGuestLogs(effectiveUserId);
      const idx = guestLogs.findIndex(l => l.id === id);
      if (idx !== -1) {
        guestLogs.splice(idx, 1);
        return NextResponse.json({ success: true, message: 'Registro eliminado exitosamente' });
      }
      return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
    }

    const idx = IN_MEMORY_LOGS.findIndex(l => l.id === id && l.userId === effectiveUserId);
    if (idx !== -1) {
      IN_MEMORY_LOGS.splice(idx, 1);
      return NextResponse.json({ success: true, message: 'Registro eliminado exitosamente' });
    }
    return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar registro de bitácora' }, { status: 500 });
  }
}
