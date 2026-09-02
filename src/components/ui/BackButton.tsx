'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import styles from './BackButton.module.css';

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function BackButton({
  fallbackHref = '/dashboard',
  label = 'Volver',
  className = '',
  style,
  onClick
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
      return;
    }

    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.backButton} ${className}`}
      style={style}
      aria-label={label}
      title={label}
    >
      <ArrowLeft size={16} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
