/**
 * ============================================================================
 * AGROTECH VENEZUELA — API REST DE GESTIÓN DE CONFLICTOS (/api/parcels/conflicts)
 * ============================================================================
 * 
 * Endpoint para listar y resolver disputas de concurrencia de parcelas
 * en cuarentena originadas por sincronización offline/PWA.
 */

import { NextResponse } from 'next/server';
import { extractUserFromRequest } from '@/lib/auth/authUtils';
import { PARCEL_CONFLICTS_MAP, IN_MEMORY_PARCELS, getOrCreateGuestParcels } from '../route';
import { ParcelConflict } from '@/types/parcel';

export async function GET(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    const { searchParams } = new URL(req.url);
    const requestedUserId = session ? session.id : (searchParams.get('userId') || 'usr-farmer-01');

    const conflicts = Array.from(PARCEL_CONFLICTS_MAP.values()).filter(
      c => c.userId === requestedUserId && !c.resolved
    );

    return NextResponse.json({
      success: true,
      count: conflicts.length,
      conflicts
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar conflictos de parcelas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    const body = await req.json();
    const {
      conflictId,
      resolutionChoice, // 'keep_server' | 'keep_client' | 'merged'
      mergedAttributes
    } = body;

    if (!conflictId || !resolutionChoice) {
      return NextResponse.json(
        { error: 'Parámetros conflictId y resolutionChoice requeridos' },
        { status: 400 }
      );
    }

    const conflict = PARCEL_CONFLICTS_MAP.get(conflictId);
    if (!conflict) {
      return NextResponse.json({ error: 'Conflicto no encontrado o ya resuelto' }, { status: 404 });
    }

    const effectiveUserId = session ? session.id : conflict.userId;
    const isGuest = effectiveUserId.startsWith('usr-guest');
    const targetList = isGuest ? getOrCreateGuestParcels(effectiveUserId) : IN_MEMORY_PARCELS;
    const parcel = targetList.find(p => p.id === conflict.parcelId);

    if (!parcel) {
      return NextResponse.json({ error: 'Parcela asociada no encontrada' }, { status: 404 });
    }

    const nextVersion = (conflict.serverVersion.version || 1) + 1;
    const now = new Date().toISOString();

    if (resolutionChoice === 'keep_server') {
      parcel.syncStatus = 'synced';
      parcel.version = nextVersion;
      parcel.updated_at = now;
    } else if (resolutionChoice === 'keep_client') {
      const client = conflict.clientVersion;
      parcel.name = client.name;
      parcel.stateId = client.stateId;
      parcel.municipalityId = client.municipalityId;
      parcel.areaHectares = client.areaHectares;
      parcel.polygonGeoJson = client.polygonGeoJson;
      parcel.centerLat = client.centerLat;
      parcel.centerLng = client.centerLng;
      parcel.currentCrop = client.currentCrop;
      parcel.soilTexture = client.soilTexture;
      parcel.ph = client.ph;
      parcel.organicMatter = client.organicMatter;
      parcel.syncStatus = 'synced';
      parcel.version = nextVersion;
      parcel.updated_at = now;
    } else if (resolutionChoice === 'merged' && mergedAttributes) {
      Object.assign(parcel, mergedAttributes);
      parcel.syncStatus = 'synced';
      parcel.version = nextVersion;
      parcel.updated_at = now;
    }

    // Marcar conflicto como resuelto
    conflict.resolved = true;
    conflict.resolvedAt = now;
    conflict.resolutionChoice = resolutionChoice;

    return NextResponse.json({
      success: true,
      message: `Conflicto resuelto satisfactoriamente (${resolutionChoice})`,
      parcel,
      conflict
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar resolución de conflicto' }, { status: 500 });
  }
}
