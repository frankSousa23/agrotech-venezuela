/**
 * ============================================================================
 * AGROTECH VENEZUELA — INDICADOR DE CONECTIVIDAD & PROTOCOLO QOS RURAL (ConnectivityStatusBadge.tsx)
 * ============================================================================
 * 
 * Componente cliente persistente en la cabecera:
 * - Detecta en tiempo real eventos de conexión (Online / Offline).
 * - Evalúa calidad de red (2G/EDGE, RTT alto, saveData) mediante Network Information API.
 * - Ejecuta el Canal A (Uplink prioritario de texto < 10 KB) para bitácora offline.
 * - Activa el Canal B (Pausa de teselas satelitales pesadas > 500 KB) ante señal débil.
 * - Proporciona botón para forzar sincronización con el servidor central.
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Wifi, WifiOff, RefreshCw, Zap, ShieldAlert } from 'lucide-react';

export default function ConnectivityStatusBadge() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isSlowConnection, setIsSlowConnection] = useState<boolean>(false);
  const [effectiveType, setEffectiveType] = useState<string>('4g');
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Evaluar calidad de la conexión rural (2G, EDGE, saveData, alta latencia)
  const assessNetworkQuality = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn) {
        const type = conn.effectiveType || '4g';
        const isDegraded = type === '2g' || type === 'slow-2g' || conn.saveData === true || (conn.rtt && conn.rtt > 500);
        setEffectiveType(type);
        setIsSlowConnection(Boolean(isDegraded));

        // Publicar bandera global para capas de mapa y satélite
        if (typeof window !== 'undefined') {
          (window as any).__AGROTECH_RURAL_DATA_SAVER__ = Boolean(isDegraded);
        }
        return isDegraded;
      }
    }
    return false;
  }, []);

  // Comprobar registros de labores pendientes en almacenamiento local
  const checkPendingQueue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        const localLogs = localStorage.getItem('agrotech_offline_field_logs');
        if (localLogs) {
          const parsed = JSON.parse(localLogs);
          setPendingCount(Array.isArray(parsed) ? parsed.length : 0);
        } else {
          setPendingCount(0);
        }
      }
    } catch {
      setPendingCount(0);
    }
  }, []);

  // Protocolo QoS: Despacho prioritario del Canal A (Uplink < 10 KB)
  const handleSync = useCallback(async () => {
    if (typeof window === 'undefined' || !navigator.onLine || isSyncing) return;
    
    setIsSyncing(true);
    const isDegraded = assessNetworkQuality();
    setSyncFeedback(isDegraded ? 'QoS: Enviando texto ligero...' : 'Sincronizando labores...');

    try {
      const localLogs = localStorage.getItem('agrotech_offline_field_logs');
      if (localLogs) {
        const parsed = JSON.parse(localLogs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const remaining: any[] = [];
          
          // Despachar cada entrada con su clientLogId para idempotencia
          for (const item of parsed) {
            try {
              const res = await fetch('/api/field-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
              });
              if (!res.ok) {
                remaining.push(item);
              }
            } catch {
              remaining.push(item);
            }
          }

          localStorage.setItem('agrotech_offline_field_logs', JSON.stringify(remaining));
          setPendingCount(remaining.length);

          if (remaining.length === 0) {
            setSyncFeedback(isDegraded ? '¡Texto sincronizado (Mapas pausados)!' : '¡Bitácora sincronizada!');
          } else {
            setSyncFeedback(`${remaining.length} pendientes`);
          }
        } else {
          setSyncFeedback('Al día');
        }
      } else {
        setSyncFeedback('Al día');
      }

      setTimeout(() => setSyncFeedback(null), 3500);
    } catch {
      setSyncFeedback('Error al sincronizar');
      setTimeout(() => setSyncFeedback(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, assessNetworkQuality]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);
    assessNetworkQuality();
    checkPendingQueue();

    const handleOnline = () => {
      setIsOnline(true);
      assessNetworkQuality();
      handleSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      checkPendingQueue();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Escuchar cambios de velocidad en la API de Conexión
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      conn?.addEventListener?.('change', assessNetworkQuality);
    }

    const interval = setInterval(() => {
      checkPendingQueue();
      assessNetworkQuality();
    }, 6000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        conn?.removeEventListener?.('change', assessNetworkQuality);
      }
      clearInterval(interval);
    };
  }, [checkPendingQueue, handleSync, assessNetworkQuality]);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 10px',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        background: isOnline 
          ? (isSlowConnection ? 'rgba(234, 179, 8, 0.15)' : 'rgba(34, 197, 94, 0.12)')
          : 'rgba(249, 115, 22, 0.15)',
        border: isOnline 
          ? (isSlowConnection ? '1px solid rgba(234, 179, 8, 0.4)' : '1px solid rgba(34, 197, 94, 0.3)')
          : '1px solid rgba(249, 115, 22, 0.4)',
        color: isOnline 
          ? (isSlowConnection ? '#facc15' : '#4ade80') 
          : '#fb923c',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease'
      }}>
        {/* Icono de Red */}
        {isOnline ? (
          isSlowConnection ? (
            <span title={`Señal rural lenta detectada (${effectiveType})`} style={{ display: 'inline-flex' }}>
              <Zap size={14} color="#facc15" />
            </span>
          ) : (
            <Wifi size={14} color="#4ade80" />
          )
        ) : (
          <WifiOff size={14} color="#fb923c" />
        )}

        {/* Texto de Estado */}
        <span>
          {isSyncing 
            ? 'Sincronizando...' 
            : isOnline 
              ? (isSlowConnection ? `Señal Rural (${effectiveType.toUpperCase()})` : 'En Línea') 
              : 'Modo Finca Offline'}
        </span>

        {/* Contador de Pendientes */}
        {pendingCount > 0 && (
          <span style={{
            background: '#f97316',
            color: '#fff',
            padding: '1px 6px',
            borderRadius: '999px',
            fontSize: '0.68rem',
            fontWeight: 700
          }}>
            {pendingCount}
          </span>
        )}

        {/* Botón de Sincronización Manual */}
        {isOnline && (
          <button
            id="btn_trigger_sync"
            onClick={handleSync}
            disabled={isSyncing}
            title="Forzar sincronización QoS del cuaderno de campo"
            style={{
              background: 'transparent',
              border: 'none',
              color: isSlowConnection ? '#facc15' : '#4ade80',
              cursor: isSyncing ? 'not-allowed' : 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              opacity: isSyncing ? 0.6 : 1
            }}
          >
            <RefreshCw 
              size={12} 
              style={{
                animation: isSyncing ? 'spin 1s linear infinite' : 'none'
              }} 
            />
          </button>
        )}

        {syncFeedback && (
          <span style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>
            {syncFeedback}
          </span>
        )}
      </div>

      {/* Aviso de QoS Ahorro de Datos Rural */}
      {isOnline && isSlowConnection && (
        <span 
          title="Protocolo QoS activo: Las labores de texto se sincronizan con prioridad, pausando mapas pesados para evitar agotar megas y batería."
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.68rem',
            padding: '2px 8px',
            borderRadius: '6px',
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            color: '#fef08a'
          }}
        >
          <ShieldAlert size={12} color="#facc15" /> QoS: Mapas pesados pausados
        </span>
      )}
    </div>
  );
}
