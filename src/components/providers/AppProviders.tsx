'use client';

import React from 'react';
import { AuthProvider } from '@/lib/auth/authContext';
import { ToastProvider } from '@/components/ui/ToastProvider';
import { UIModeProvider } from '@/lib/context/UIModeContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UIModeProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </UIModeProvider>
    </AuthProvider>
  );
}
