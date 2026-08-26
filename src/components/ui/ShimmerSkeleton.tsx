/**
 * ============================================================================
 * AGROTECH VENEZUELA — SKELETON SHIMMER PLACEHOLDER (ShimmerSkeleton.tsx)
 * ============================================================================
 * 
 * Componente de carga con efecto de brillo y pulso continuo (shimmer)
 * para evitar saltos bruscos de diseño (Zero Layout Shift - CLS).
 */

'use client';

import React from 'react';

interface ShimmerSkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ShimmerSkeleton({
  width = '100%',
  height = '20px',
  borderRadius = '8px',
  style
}: ShimmerSkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.6) 25%, rgba(51, 65, 85, 0.9) 50%, rgba(30, 41, 59, 0.6) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmerAnimation 1.5s infinite linear',
        ...style
      }}
    />
  );
}
