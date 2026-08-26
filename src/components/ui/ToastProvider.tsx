/**
 * ============================================================================
 * AGROTECH VENEZUELA — SISTEMA DE NOTIFICACIONES TOAST (ToastProvider.tsx)
 * ============================================================================
 * 
 * Contexto global de notificaciones toast para feedback inmediato en:
 * - Creación y delimitación de parcelas.
 * - Registro de labores en la bitácora.
 * - Sincronización offline en fincas rurales.
 * - Exportación de Gemelos Digitales GeoJSON.
 */

'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  durationMs?: number;
}

interface ToastContextValue {
  toast: {
    success: (title: string, description?: string, durationMs?: number) => void;
    info: (title: string, description?: string, durationMs?: number) => void;
    warning: (title: string, description?: string, durationMs?: number) => void;
    error: (title: string, description?: string, durationMs?: number) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, title: string, description?: string, durationMs = 3800) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, type, title, description, durationMs };

    setToasts((prev) => [...prev, newToast]);

    if (durationMs > 0) {
      setTimeout(() => {
        removeToast(id);
      }, durationMs);
    }
  }, [removeToast]);

  const toast = {
    success: (title: string, description?: string, durationMs?: number) => addToast('success', title, description, durationMs),
    info: (title: string, description?: string, durationMs?: number) => addToast('info', title, description, durationMs),
    warning: (title: string, description?: string, durationMs?: number) => addToast('warning', title, description, durationMs),
    error: (title: string, description?: string, durationMs?: number) => addToast('error', title, description, durationMs),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Contenedor Flotante de Toasts */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '380px',
          width: 'calc(100% - 48px)',
          pointerEvents: 'none'
        }}
      >
        {toasts.map((t) => {
          let bg = 'rgba(15, 23, 42, 0.95)';
          let border = '1px solid rgba(255, 255, 255, 0.15)';
          let icon = <Info size={20} color="#38bdf8" />;

          if (t.type === 'success') {
            border = '1px solid rgba(34, 197, 94, 0.4)';
            icon = <CheckCircle2 size={20} color="#22c55e" />;
          } else if (t.type === 'warning') {
            border = '1px solid rgba(245, 158, 11, 0.4)';
            icon = <AlertTriangle size={20} color="#f59e0b" />;
          } else if (t.type === 'error') {
            border = '1px solid rgba(239, 68, 68, 0.4)';
            icon = <XCircle size={20} color="#ef4444" />;
          }

          return (
            <div
              key={t.id}
              style={{
                background: bg,
                backdropFilter: 'blur(16px)',
                border,
                borderRadius: '12px',
                padding: '12px 14px',
                color: '#fff',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                pointerEvents: 'auto',
                animation: 'slideInToast 0.25s ease-out forwards',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ marginTop: '2px', flexShrink: 0 }}>{icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>
                  {t.title}
                </div>
                {t.description && (
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px', lineHeight: 1.35 }}>
                    {t.description}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.15s'
                }}
                aria-label="Cerrar notificación"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
}
