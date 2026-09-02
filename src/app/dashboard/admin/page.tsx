'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import styles from './page.module.css';
import { 
  ShieldCheck, 
  ShieldAlert,
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Check, 
  X, 
  RefreshCw, 
  MapPin, 
  Mail, 
  Phone, 
  Radio, 
  Server 
} from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'GUEST';
  phone?: string;
  stateId?: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setStats(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (userId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newStatus })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => setMessage(null), 4000);
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED': return { bg: 'rgba(34, 197, 94, 0.2)', text: '#4ade80', label: 'Aprobado' };
      case 'PENDING': return { bg: 'rgba(234, 179, 8, 0.2)', text: '#facc15', label: 'Pendiente' };
      case 'REJECTED': return { bg: 'rgba(239, 68, 68, 0.2)', text: '#fca5a5', label: 'Rechazado' };
      default: return { bg: 'rgba(56, 189, 248, 0.2)', text: '#38bdf8', label: 'Invitado' };
    }
  };

  const pendingUsers = users.filter(u => u.status === 'PENDING');

  // Guarda de rol estricta: Solo usuarios con rol 'ADMIN' pueden acceder
  if (user && user.role !== 'ADMIN') {
    return (
      <div style={{
        maxWidth: '620px',
        margin: '3rem auto',
        padding: '2.5rem 2rem',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '16px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <ShieldAlert size={32} />
        </div>
        <h2 style={{ color: '#f8fafc', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
          Acceso Restringido a Administradores
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
          Esta vista está reservada exclusivamente para el rol <b>ADMIN</b>. Tu sesión actual ({user.name}) tiene asignado el rol <b>{user.role}</b>.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#0284c7',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          Volver al Resumen General
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>
            <ShieldCheck size={28} color="#38bdf8" />
            Panel de Administración & Control de Usuarios
          </h1>
          <p className={styles.subtitle}>
            Aprobación de nuevos productores, roles de acceso y monitoreo de la plataforma.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 14px',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RefreshCw size={14} /> Actualizar
        </button>
      </div>

      {message && (
        <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#86efac', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>
          ✓ {message}
        </div>
      )}

      {/* Tarjetas de Estadísticas Globales */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <Users size={22} />
          </div>
          <div>
            <div className={styles.statVal}>{stats.total}</div>
            <div className={styles.statLbl}>Usuarios Registrados</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>
            <Clock size={22} />
          </div>
          <div>
            <div className={styles.statVal}>{stats.pending}</div>
            <div className={styles.statLbl}>Solicitudes Pendientes</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80' }}>
            <UserCheck size={22} />
          </div>
          <div>
            <div className={styles.statVal}>{stats.approved}</div>
            <div className={styles.statLbl}>Productores Aprobados</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
            <Server size={22} />
          </div>
          <div>
            <div className={styles.statVal}>En Línea</div>
            <div className={styles.statLbl}>FastAPI & SQLite Cache</div>
          </div>
        </div>
      </div>

      {/* ⏳ Bandeja de Solicitudes Pendientes de Aprobación */}
      <div className={styles.sectionBox} style={{ border: pendingUsers.length > 0 ? '1px solid rgba(234, 179, 8, 0.4)' : undefined }}>
        <div className={styles.sectionHeader}>
          <h2 style={{ fontSize: '1.15rem', color: '#facc15', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} /> Solicitudes Pendientes de Validación ({pendingUsers.length})
          </h2>
        </div>

        {pendingUsers.length === 0 ? (
          <div style={{ color: '#94a3b8', fontSize: '0.88rem', padding: '1rem 0' }}>
            ✓ No hay solicitudes pendientes. Todos los productores registrados están al día.
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>Productor / Solicitante</th>
                  <th>Correo Electrónico</th>
                  <th>Teléfono</th>
                  <th>Estado Base</th>
                  <th>Rol Solicitado</th>
                  <th>Acción Rápida</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map(u => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600, color: '#f8fafc' }}>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || 'No especificado'}</td>
                    <td>{u.stateId?.toUpperCase() || 'VENEZUELA'}</td>
                    <td><span style={{ color: '#38bdf8' }}>{u.role}</span></td>
                    <td>
                      <button
                        onClick={() => handleUpdateStatus(u.id, 'APPROVED')}
                        className={styles.actionBtnApprove}
                      >
                        <Check size={12} style={{ display: 'inline', marginRight: 2 }} /> Aprobar
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(u.id, 'REJECTED')}
                        className={styles.actionBtnReject}
                      >
                        <X size={12} style={{ display: 'inline', marginRight: 2 }} /> Rechazar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 👥 Directorio Global de Usuarios */}
      <div className={styles.sectionBox}>
        <div className={styles.sectionHeader}>
          <h2 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
            Directorio de Usuarios & Productores Activos
          </h2>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Rol</th>
                <th>Estado Base</th>
                <th>Estado de Cuenta</th>
                <th>Gestión</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const badge = getStatusBadge(u.status);
                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600, color: '#f8fafc' }}>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role === 'ADMIN' ? '🛡️ Administrador' : u.role === 'AGRONOMIST' ? '🌱 Ing. Agrónomo' : '🚜 Productor'}</td>
                    <td>{u.stateId?.toUpperCase() || 'VENEZUELA'}</td>
                    <td>
                      <span className={styles.statusBadge} style={{ background: badge.bg, color: badge.text }}>
                        {badge.label}
                      </span>
                    </td>
                    <td>
                      {u.status !== 'APPROVED' ? (
                        <button
                          onClick={() => handleUpdateStatus(u.id, 'APPROVED')}
                          style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                        >
                          Aprobar
                        </button>
                      ) : (
                        <span style={{ color: '#4ade80', fontSize: '0.78rem' }}>✓ Activo</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
