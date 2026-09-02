'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import BackButton from '@/components/ui/BackButton';
import styles from '../login/page.module.css';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { UserPlus, Mail, Lock, User, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'FARMER' | 'AGRONOMIST'>('FARMER');
  const [phone, setPhone] = useState('');
  const [stateId, setStateId] = useState('portuguesa');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, phone, stateId })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar usuario');
      }

      setRegisteredSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (registeredSuccess) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳🌾</div>
          <h2 style={{ color: '#4ade80', margin: '0 0 0.5rem 0' }}>¡Solicitud Registrada con Éxito!</h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Hola <b>{name}</b>, tu cuenta ha sido creada y enviada al <b>Administrador del Sistema</b> para su validación agronómica.
          </p>
          <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px dashed #38bdf8', borderRadius: '8px', padding: '12px', margin: '1.5rem 0', fontSize: '0.82rem', color: '#94a3b8' }}>
            Una vez aprobada tu cuenta, podrás ingresar con tu correo (<b>{email}</b>) y acceder a <b>Mis Tierras</b> y el <b>Cuaderno de Campo Digital</b>.
          </div>
          <Link href="/auth/login" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
            Volver a la Pantalla de Acceso
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.8rem' }}>
          <BackButton fallbackHref="/auth/login" label="Volver a Iniciar Sesión" />
        </div>
        <div className={styles.authHeader}>
          <div className={styles.logoBadge}>🌱🚜</div>
          <h1 className={styles.authTitle}>Registro de Productor</h1>
          <p className={styles.authSubtitle}>Únete a la red nacional de agricultura de precisión</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className={styles.formGroup}>
            <label className={styles.label}><User size={14} style={{ display: 'inline', marginRight: 4 }} /> Nombre Completo:</label>
            <input
              type="text"
              required
              className={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ej: Frank Sousa"
            />
          </div>

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

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label className={styles.label}>Rol en el Campo:</label>
              <select
                className={styles.input}
                value={role}
                onChange={e => setRole(e.target.value as any)}
              >
                <option value="FARMER">Productor Agrícola</option>
                <option value="AGRONOMIST">Ingeniero Agrónomo</option>
              </select>
            </div>

            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label className={styles.label}><MapPin size={14} style={{ display: 'inline', marginRight: 4 }} /> Estado Base:</label>
              <select
                className={styles.input}
                value={stateId}
                onChange={e => setStateId(e.target.value)}
              >
                {VENEZUELA_STATES_DATA.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrar mi Finca'} <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </button>
        </form>

        <div className={styles.authFooter}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className={styles.authLink}>
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
