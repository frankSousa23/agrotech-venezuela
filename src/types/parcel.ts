/**
 * ============================================================================
 * AGROTECH VENEZUELA — DEFINICIONES DE TIPOS DE PARCELA & CONFLICTOS OFFLINE
 * ============================================================================
 * 
 * Contratos de datos para el versionamiento optimista y resolución determinista
 * de disputas concurrentes en modo offline/PWA rural.
 */

export type RegionalSoilTexture = 'arenoso' | 'franco' | 'arcilloso' | string;

export interface Parcel {
  id: string;
  userId: string;
  name: string;
  stateId: string;
  municipalityId: string;
  areaHectares: number;
  polygonGeoJson: string;
  centerLat: number;
  centerLng: number;
  currentCrop?: string;
  soilTexture?: RegionalSoilTexture;
  ph?: number;
  organicMatter?: number;
  version?: number;
  updated_at?: string;
  createdAt: string;
  syncStatus?: 'synced' | 'pending' | 'conflict';
}

export interface ParcelConflict {
  conflictId: string;
  parcelId: string;
  userId: string;
  detectedAt: string;
  serverVersion: Parcel;
  clientVersion: Parcel;
  resolved: boolean;
  resolvedAt?: string;
  resolutionChoice?: 'keep_server' | 'keep_client' | 'merged';
}
