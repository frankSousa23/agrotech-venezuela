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

  const handleGuestLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isGuest: true })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al ingresar como invitado');
      login(data.token, data.user);
      router.push('/dashboard/tierras');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      if (data.user.role === 'ADMIN') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/tierras');
      }
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

        {/* Botón Destacado: 1-Click Guest Access */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            🚀 Ingresar como Invitado (1-Click Demo)
          </button>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textAlign: 'center', marginTop: '6px' }}>
            Explora parcelas y bitácora con datos de muestra sin registro previo.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.2rem 0', color: '#64748b', fontSize: '0.75rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#334155' }}></div>
          <span style={{ padding: '0 10px', textTransform: 'uppercase', fontWeight: 600 }}>o ingresa con tu cuenta</span>
          <div style={{ flex: 1, height: '1px', background: '#334155' }}></div>
        </div>

        {error && (
          <div style={{ 
            background: error.includes('pendiente') ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
            border: error.includes('pendiente') ? '1px solid #eab308' : '1px solid #ef4444', 
            color: error.includes('pendiente') ? '#fde047' : '#fca5a5', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '16px', 
            fontSize: '0.82rem',
            lineHeight: 1.4
          }}>
            {error.includes('pendiente') ? '⏳' : '⚠️'} {error}
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
          <div className={styles.demoCredsTitle}><ShieldCheck size={14} style={{ display: 'inline', marginRight: 4 }} /> Perfiles de Prueba Rápidos:</div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={() => setDemoRole('productor@agrotech.ve')}
              style={{ fontSize: '0.72rem', background: '#334155', color: '#86efac', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Productor Aprobado
            </button>
            <button 
              type="button" 
              onClick={() => setDemoRole('solicitante.turen@agrotech.ve')}
              style={{ fontSize: '0.72rem', background: '#334155', color: '#fde047', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Productor Pendiente
            </button>
            <button 
              type="button" 
              onClick={() => setDemoRole('admin@agrotech.ve')}
              style={{ fontSize: '0.72rem', background: '#334155', color: '#38bdf8', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Admin Sistema
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
