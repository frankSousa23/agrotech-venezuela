'use client';

import React from 'react';
import { AuthProvider } from '@/lib/auth/authContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
