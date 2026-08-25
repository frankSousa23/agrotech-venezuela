'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserSession } from './authUtils';


interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (token: string, userData: UserSession) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('agrotech_user');
      const storedToken = localStorage.getItem('agrotech_token');
      const isLoggedOut = localStorage.getItem('agrotech_logged_out');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      } else if (!isLoggedOut) {
        // Usuario demo inicial por defecto si el usuario nunca ha hecho logout
        const defaultUser: UserSession = {
          id: "usr-farmer-01",
          email: "productor@agrotech.ve",
          name: "Frank Sousa (Productor)",
          role: "FARMER",
          status: "APPROVED",
          isGuest: false,
          phone: "+58 412 1234567",
          stateId: "portuguesa"
        };
        setUser(defaultUser);
        localStorage.setItem('agrotech_user', JSON.stringify(defaultUser));
        localStorage.setItem('agrotech_token', 'demo_jwt_token_frank');
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error('Error initializing auth state:', e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((token: string, userData: UserSession) => {
    setUser(userData);
    try {
      localStorage.removeItem('agrotech_logged_out');
      localStorage.setItem('agrotech_token', token);
      localStorage.setItem('agrotech_user', JSON.stringify(userData));
    } catch (e) {
      console.error('Error saving session:', e);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.setItem('agrotech_logged_out', 'true');
      localStorage.removeItem('agrotech_token');
      localStorage.removeItem('agrotech_user');
    } catch (e) {
      console.error('Error removing session:', e);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

