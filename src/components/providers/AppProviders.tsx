'use client';

import React from 'react';
import { AuthProvider } from '@/lib/auth/authContext';
import { ToastProvider } from '@/components/ui/ToastProvider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}
