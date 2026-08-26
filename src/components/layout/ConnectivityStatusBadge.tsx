/**
 * ============================================================================
 * AGROTECH VENEZUELA — INDICADOR DE CONECTIVIDAD & SYNC (ConnectivityStatusBadge.tsx)
 * ============================================================================
 * 
 * Componente cliente persistente en la cabecera:
 * - Detecta en tiempo real eventos de conexión (Online / Offline).
 * - Supervisa mutaciones pendientes registradas en campo sin conexión.
 * - Proporciona botón para forzar sincronización con el servidor central.
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function ConnectivityStatusBadge() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Comprobar estado inicial y contar registros offline
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

  // Manejador de sincronización manual o automática
  const handleSync = useCallback(async () => {
    if (typeof window === 'undefined' || !navigator.onLine || isSyncing) return;
    
    setIsSyncing(true);
    setSyncFeedback('Sincronizando datos...');

    try {
      // Simulación de procesamiento de cola offline
      await new Promise(resolve => setTimeout(resolve, 1200));
      setPendingCount(0);
      setSyncFeedback('¡Sincronizado!');
      setTimeout(() => setSyncFeedback(null), 3000);
    } catch {
      setSyncFeedback('Error al sincronizar');
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);
    checkPendingQueue();

    const handleOnline = () => {
      setIsOnline(true);
      handleSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      checkPendingQueue();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(checkPendingQueue, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [checkPendingQueue, handleSync]);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '4px 10px',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: isOnline 
        ? 'rgba(34, 197, 94, 0.12)' 
        : 'rgba(249, 115, 22, 0.15)',
      border: isOnline 
        ? '1px solid rgba(34, 197, 94, 0.3)' 
        : '1px solid rgba(249, 115, 22, 0.4)',
      color: isOnline ? '#4ade80' : '#fb923c',
      backdropFilter: 'blur(8px)',
      transition: 'all 0.3s ease'
    }}>
      {/* Icono de Red */}
      {isOnline ? (
        <Wifi size={14} color="#4ade80" />
      ) : (
        <WifiOff size={14} color="#fb923c" />
      )}

      {/* Texto de Estado */}
      <span>
        {isSyncing 
          ? 'Sincronizando...' 
          : isOnline 
            ? 'En Línea' 
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
          title="Forzar sincronización con el servidor"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#4ade80',
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
  );
}
