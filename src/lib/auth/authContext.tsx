'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
    // Restaurar sesión desde localStorage
    const storedUser = localStorage.getItem('agrotech_user');
    const storedToken = localStorage.getItem('agrotech_token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('agrotech_user');
        localStorage.removeItem('agrotech_token');
      }
    } else {
      // Por defecto para demo fluida: cargar perfil del productor
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
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: UserSession) => {
    setUser(userData);
    localStorage.setItem('agrotech_token', token);
    localStorage.setItem('agrotech_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrotech_token');
    localStorage.removeItem('agrotech_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
