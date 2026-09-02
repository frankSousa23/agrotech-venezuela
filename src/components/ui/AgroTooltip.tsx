'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './AgroTooltip.module.css';
import { HelpCircle } from 'lucide-react';

export interface AgroTooltipProps {
  text: string;
  title?: string;
  position?: 'top' | 'bottom';
  className?: string;
  children?: React.ReactNode;
}

export default function AgroTooltip({
  text,
  title,
  position = 'top',
  className = '',
  children
}: AgroTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span 
      ref={containerRef} 
      className={`${styles.tooltipContainer} ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={styles.triggerBtn}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={title || 'Información agronómica'}
        title={title || 'Explicación técnica'}
      >
        {children || '?'}
      </button>

      {isOpen && (
        <span 
          className={`${styles.popover} ${position === 'bottom' ? styles.popoverBottom : styles.popoverTop}`}
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <span className={styles.popoverTitle}>
              <HelpCircle size={14} />
              {title}
            </span>
          )}
          <span className={styles.popoverBody}>{text}</span>
        </span>
      )}
    </span>
  );
}
