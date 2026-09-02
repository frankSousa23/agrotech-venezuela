"use client";

import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

interface HelpModalProps {
  title: string;
  content: React.ReactNode;
  triggerLabel?: string;
  iconOnly?: boolean;
}

export default function HelpModal({ title, content, triggerLabel, iconOnly = false }: HelpModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: iconOnly ? 'transparent' : 'rgba(56, 189, 248, 0.1)',
          border: iconOnly ? 'none' : '1px solid rgba(56, 189, 248, 0.3)',
          color: '#38bdf8',
          padding: iconOnly ? '4px' : '4px 8px',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.8rem',
          fontWeight: 600,
          transition: 'all 0.2s ease'
        }}
        aria-label="Abrir ayuda"
      >
        <HelpCircle size={iconOnly ? 18 : 14} />
        {!iconOnly && triggerLabel && <span>{triggerLabel}</span>}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              background: '#0f172a',
              zIndex: 1
            }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={20} color="#38bdf8" />
                {title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '20px', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
