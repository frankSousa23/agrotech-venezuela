"use client";

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  iconSize?: number;
}

export default function Tooltip({ content, children, iconSize = 16 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}
      <button 
        type="button"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'help',
          color: 'var(--text-secondary, #94a3b8)',
          display: 'flex',
          alignItems: 'center'
        }}
        aria-label="Más información"
      >
        <HelpCircle size={iconSize} />
      </button>

      {isVisible && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
          background: 'rgba(15, 23, 42, 0.95)',
          color: '#f8fafc',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '0.75rem',
          lineHeight: '1.4',
          width: 'max-content',
          maxWidth: '250px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 9999,
          pointerEvents: 'none',
          textAlign: 'left'
        }}>
          {content}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: 'rgba(15, 23, 42, 0.95) transparent transparent transparent'
          }} />
        </div>
      )}
    </div>
  );
}
