'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import BackButton from '@/components/ui/BackButton';
import styles from './page.module.css';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('productor@agrotech.ve');
  const [password, setPassword] = useState('Agro2026*');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleGuestLogin = async () => {
    setGuestLoading(true);
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
      setError(err.message || 'Error de conexión');
    } finally {
      setGuestLoading(false);
    }
  };

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    const targetEmail = customEmail || email;
    const targetPass = customPass || password;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: targetPass })
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
      setError(err.message || 'Error al procesar acceso');
    } finally {
      setLoading(false);
    }
  };

  const setDemoRole = (demoEmail: string, autoLogin: boolean = false) => {
    setEmail(demoEmail);
    setPassword('Agro2026*');
    setError(null);
    if (autoLogin) {
      handleLogin(undefined, demoEmail, 'Agro2026*');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.8rem' }}>
          <BackButton fallbackHref="/" label="Volver a Portada" />
        </div>
        <div className={styles.authHeader}>
          <div className={styles.logoBadge}>🌾🛰️</div>
          <h1 className={styles.authTitle}>Agrotech Venezuela</h1>
          <p className={styles.authSubtitle}>Acceso a Mis Tierras & Cuaderno de Campo Digital</p>
        </div>

        {/* Botón Destacado: 1-Click Guest Access */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            id="btn_guest_login"
            type="button"
            onClick={handleGuestLogin}
            disabled={guestLoading || loading}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: guestLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
              transition: 'all 0.2s',
              opacity: guestLoading ? 0.8 : 1
            }}
          >
            {guestLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Iniciando sesión de invitado...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>🚀 Ingresar como Invitado (1-Click Demo)</span>
              </>
            )}
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
          <div 
            id="auth_error_alert"
            style={{ 
              background: error.includes('pendiente') ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
              border: error.includes('pendiente') ? '1px solid #eab308' : '1px solid #ef4444', 
              color: error.includes('pendiente') ? '#fde047' : '#fca5a5', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '16px', 
              fontSize: '0.82rem',
              lineHeight: 1.4
            }}
          >
            {error.includes('pendiente') ? '⏳' : '⚠️'} {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}><Mail size={14} style={{ display: 'inline', marginRight: 4 }} /> Correo Electrónico:</label>
            <input
              id="input_auth_email"
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
              id="input_auth_password"
              type="password"
              required
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            id="btn_submit_login"
            type="submit" 
            className={styles.submitBtn} 
            disabled={loading || guestLoading}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" style={{ display: 'inline', marginRight: 6 }} />
                <span>Validando credenciales...</span>
              </>
            ) : (
              <>
                <span>Ingresar a mi Cuenta</span>
                <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
              </>
            )}
          </button>
        </form>

        <div className={styles.demoCreds}>
          <div className={styles.demoCredsTitle}><ShieldCheck size={14} style={{ display: 'inline', marginRight: 4 }} /> Perfiles Demostrativos Rápidos (1-Click Switcher):</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '6px', marginTop: '8px' }}>
            <button 
              id="btn_quick_farmer"
              type="button" 
              onClick={() => setDemoRole('productor@agrotech.ve', true)}
              title="Iniciar sesión como Productor Aprobado"
              style={{ fontSize: '0.74rem', background: email === 'productor@agrotech.ve' ? '#166534' : 'rgba(30, 41, 59, 0.8)', color: '#86efac', border: '1px solid #16a34a', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textAlign: 'center' }}
            >
              🚜 Productor
            </button>
            <button 
              id="btn_quick_agronomist"
              type="button" 
              onClick={() => setDemoRole('agronomo@agrotech.ve', true)}
              title="Iniciar sesión como Ingeniero Agrónomo"
              style={{ fontSize: '0.74rem', background: email === 'agronomo@agrotech.ve' ? '#065f46' : 'rgba(30, 41, 59, 0.8)', color: '#6ee7b7', border: '1px solid #059669', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textAlign: 'center' }}
            >
              🌱 Agrónomo
            </button>
            <button 
              id="btn_quick_admin"
              type="button" 
              onClick={() => setDemoRole('admin@agrotech.ve', true)}
              title="Iniciar sesión como Administrador"
              style={{ fontSize: '0.74rem', background: email === 'admin@agrotech.ve' ? '#075985' : 'rgba(30, 41, 59, 0.8)', color: '#38bdf8', border: '1px solid #0284c7', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textAlign: 'center' }}
            >
              🛡️ Admin
            </button>
            <button 
              id="btn_quick_pending"
              type="button" 
              onClick={() => setDemoRole('solicitante.turen@agrotech.ve', true)}
              title="Probar acceso con Productor Pendiente de Aprobación"
              style={{ fontSize: '0.74rem', background: email === 'solicitante.turen@agrotech.ve' ? '#854d0e' : 'rgba(30, 41, 59, 0.8)', color: '#fde047', border: '1px solid #eab308', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textAlign: 'center' }}
            >
              ⏳ Solicitante
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

