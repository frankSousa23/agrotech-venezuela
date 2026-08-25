'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import styles from './page.module.css';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('productor@agrotech.ve');
  const [password, setPassword] = useState('Agro2026*');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      login(data.token, data.user);
      router.push('/dashboard/tierras');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setDemoRole = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Agro2026*');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={styles.logoBadge}>🌾🛰️</div>
          <h1 className={styles.authTitle}>Agrotech Venezuela</h1>
          <p className={styles.authSubtitle}>Acceso a Mis Tierras & Cuaderno de Campo Digital</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}><Mail size={14} style={{ display: 'inline', marginRight: 4 }} /> Correo Electrónico:</label>
            <input
              type="email"
              required
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu-correo@agrotech.ve"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}><Lock size={14} style={{ display: 'inline', marginRight: 4 }} /> Contraseña:</label>
            <input
              type="password"
              required
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Validando credenciales...' : 'Ingresar a mi Cuenta'} <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </button>
        </form>

        <div className={styles.demoCreds}>
          <div className={styles.demoCredsTitle}><ShieldCheck size={14} style={{ display: 'inline', marginRight: 4 }} /> Perfiles Demo Disponibles:</div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={() => setDemoRole('productor@agrotech.ve')}
              style={{ fontSize: '0.72rem', background: '#334155', color: '#86efac', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Productor Agrícola
            </button>
            <button 
              type="button" 
              onClick={() => setDemoRole('agronomo@agrotech.ve')}
              style={{ fontSize: '0.72rem', background: '#334155', color: '#93c5fd', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Ing. Agrónomo
            </button>
            <button 
              type="button" 
              onClick={() => setDemoRole('admin@agrotech.ve')}
              style={{ fontSize: '0.72rem', background: '#334155', color: '#fde047', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Admin
            </button>
          </div>
        </div>

        <div className={styles.authFooter}>
          ¿No tienes una cuenta de productor?{' '}
          <Link href="/auth/register" className={styles.authLink}>
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
