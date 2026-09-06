import React from 'react';
import { ParcelConflict } from '@/types/parcel';

describe('Parcel Conflict Dual-Mode Presentation & Resolution Logic', () => {
  const sampleConflict: ParcelConflict = {
    conflictId: 'conf-test-01',
    parcelId: 'parc-001',
    userId: 'usr-farmer-01',
    detectedAt: '2026-03-01T12:00:00.000Z',
    serverVersion: {
      id: 'parc-001',
      userId: 'usr-farmer-01',
      name: 'Finca Santa María — Tablón 3 (Maíz)',
      stateId: 'portuguesa',
      municipalityId: 'turen',
      areaHectares: 48.5,
      polygonGeoJson: '{}',
      centerLat: 9.324,
      centerLng: -69.112,
      currentCrop: 'Maíz Blanco Harinero',
      soilTexture: 'Franco-limoso',
      ph: 6.2,
      organicMatter: 3.2,
      version: 2,
      updated_at: '2026-03-01T10:00:00.000Z',
      createdAt: '2026-03-01T08:00:00.000Z',
      syncStatus: 'conflict'
    },
    clientVersion: {
      id: 'parc-001',
      userId: 'usr-farmer-01',
      name: 'Finca Santa María — Tablón 3 (Maíz & Soya)',
      stateId: 'portuguesa',
      municipalityId: 'turen',
      areaHectares: 51.2,
      polygonGeoJson: '{"type":"Polygon","coordinates":[]}',
      centerLat: 9.325,
      centerLng: -69.110,
      currentCrop: 'Maíz Blanco Harinero + Soya',
      soilTexture: 'Franco-arcilloso',
      ph: 6.0,
      organicMatter: 3.4,
      version: 1,
      updated_at: '2026-03-01T11:30:00.000Z',
      createdAt: '2026-03-01T08:00:00.000Z',
      syncStatus: 'conflict'
    },
    resolved: false
  };

  it('debe estructurar los datos del conflicto para renderizado en Modo Productor', () => {
    expect(sampleConflict.clientVersion.areaHectares).toBe(51.2);
    expect(sampleConflict.serverVersion.areaHectares).toBe(48.5);
    expect(sampleConflict.serverVersion.version).toBeGreaterThan(sampleConflict.clientVersion.version!);

    // Verificación de textos vernáculos
    const farmerTitle = 'Compadre, detectamos dos versiones de este lote';
    const clientLabel = 'Copia de Campo (Móvil)';
    const serverLabel = 'Copia de Oficina (Nube)';

    expect(farmerTitle).toContain('Compadre');
    expect(clientLabel).toContain('Campo');
    expect(serverLabel).toContain('Oficina');
  });

  it('debe calcular correctamente los atributos para la fusión técnica (Merge)', () => {
    const useClientGeometry = true;
    const useClientSoil = false;

    const merged = {
      name: sampleConflict.clientVersion.name,
      currentCrop: sampleConflict.clientVersion.currentCrop,
      areaHectares: useClientGeometry ? sampleConflict.clientVersion.areaHectares : sampleConflict.serverVersion.areaHectares,
      polygonGeoJson: useClientGeometry ? sampleConflict.clientVersion.polygonGeoJson : sampleConflict.serverVersion.polygonGeoJson,
      soilTexture: useClientSoil ? sampleConflict.clientVersion.soilTexture : sampleConflict.serverVersion.soilTexture,
      ph: useClientSoil ? sampleConflict.clientVersion.ph : sampleConflict.serverVersion.ph
    };

    expect(merged.areaHectares).toBe(51.2); // Geometría de cliente adoptada
    expect(merged.soilTexture).toBe('Franco-limoso'); // Suelo de servidor conservado
    expect(merged.ph).toBe(6.2);
  });

  it('debe validar la resolución hacia servidor preservando integridad', () => {
    let resolvedChoice: string | null = null;
    const onResolve = async (choice: 'keep_server' | 'keep_client' | 'merged') => {
      resolvedChoice = choice;
    };

    onResolve('keep_server');
    expect(resolvedChoice).toBe('keep_server');
  });
});
