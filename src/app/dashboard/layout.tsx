"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import { useAuth } from '@/lib/auth/authContext';
import ConnectivityStatusBadge from '@/components/layout/ConnectivityStatusBadge';
import CommandPalette from '@/components/layout/CommandPalette';
import SunlightThemeToggle from '@/components/layout/SunlightThemeToggle';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  BarChart3, 
  Sprout, 
  FlaskConical, 
  Sparkles, 
  Home, 
  Menu, 
  X, 
  Radio, 
  ShieldCheck, 
  Tractor, 
  BookOpen, 
  LogOut, 
  LogIn,
  FileCode2,
  Workflow,
  Building2,
  UserPlus
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  badge?: string;
  highlight?: boolean;
}

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Fase 1: Identificación',
    items: [
      { href: '/dashboard', label: 'Resumen General', icon: LayoutDashboard },
      { href: '/dashboard/mapa', label: 'Mapa Satelital', icon: MapIcon, badge: '3 Niveles' },
      { href: '/dashboard/tierras', label: 'Mis Fincas y Lotes', icon: Tractor, badge: 'Mi Finca' },
    ]
  },
  {
    title: 'Fase 2: Diagnóstico',
    items: [
      { href: '/dashboard/suelos', label: 'Suelos y Nutrientes', icon: FlaskConical },
      { href: '/dashboard/cultivos', label: 'Catálogo de Cultivos', icon: Sprout },
    ]
  },
  {
    title: 'Fase 3: Operación',
    items: [
      { href: '/dashboard/recomendaciones', label: 'Asesor IA', icon: Sparkles, highlight: true },
      { href: '/dashboard/bitacora', label: 'Cuaderno de Campo', icon: BookOpen },
    ]
  }
];

const ADVANCED_ITEMS: NavItem[] = [
  { href: '/dashboard/postulacion', label: 'Ficha de Postulación', icon: Building2, badge: 'TRL 7' },
  { href: '/dashboard/estadisticas', label: 'Geoestadísticas', icon: BarChart3 },
  { href: '/dashboard/arquitectura', label: 'Arquitectura E2E', icon: Workflow, badge: 'E2E' },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const isGuest = user?.isGuest || user?.status === 'GUEST';

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Top Header */}
      <div className={styles.mobileBar}>
        <Link href="/" className={styles.mobileLogo}>
          <div className={styles.logoBadge}>🌱</div>
          <span>Agrotech</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SunlightThemeToggle />
          <button 
            id="btn_toggle_mobile_menu"
            className={styles.menuToggle} 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Alternar Menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div 
          className={styles.mobileBackdrop} 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brandArea}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIconContainer}>
              <Sprout size={24} className={styles.logoSprout} />
            </div>
            <div>
              <div className={styles.brandTitle}>Agrotech</div>
              <div className={styles.brandSubtitle}>VENEZUELA • MAPBIOMAS</div>
            </div>
          </Link>
        </div>

        {/* User Session Pill */}
        <div style={{
          margin: '0 1rem 0.8rem 1rem',
          padding: '8px 12px',
          background: isGuest ? 'rgba(234, 179, 8, 0.15)' : 'rgba(30, 41, 59, 0.7)',
          borderRadius: '10px',
          border: isGuest ? '1px solid rgba(234, 179, 8, 0.35)' : '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: isGuest ? 'rgba(234, 179, 8, 0.25)' : 'rgba(34, 197, 94, 0.2)',
              color: isGuest ? '#facc15' : '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              {isGuest ? '🚀' : (user?.name ? user.name[0].toUpperCase() : 'P')}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {user?.name || 'Productor Invitado'}
              </div>
              <div style={{ fontSize: '0.7rem', color: isGuest ? '#fde047' : '#94a3b8' }}>
                {isGuest ? 'Modo Sandbox (Efímero)' : (user?.role === 'ADMIN' ? '🛡️ Administrador' : user?.role === 'AGRONOMIST' ? '🌱 Ing. Agrónomo' : '🌾 Productor Agrícola')}
              </div>
            </div>
          </div>

          {isAuthenticated ? (
            <button 
              onClick={logout}
              title="Cerrar Sesión"
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: '#ef4444', 
                cursor: 'pointer', 
                padding: 4,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LogOut size={16} />
            </button>
          ) : (
            <Link 
              href="/auth/login"
              title="Iniciar Sesión"
              style={{ color: '#4ade80', display: 'flex', alignItems: 'center' }}
            >
              <LogIn size={16} />
            </Link>
          )}
        </div>

        {/* Live Status & Connectivity Indicator */}
        <div className={styles.statusBox}>
          <div className={styles.statusHeader}>
            <span className={styles.statusLiveDot}></span>
            <span className={styles.statusLiveText}>Sistema Territorial Conectado</span>
          </div>
          <div className={styles.statusDetails}>
            <div className={styles.statusItem}>
              <Radio size={12} className={styles.statusIcon} />
              <span>MapBiomas Col. 3</span>
            </div>
            <div className={styles.statusItem}>
              <ShieldCheck size={12} className={styles.statusIcon} />
              <span>NASA POWER V2.0</span>
            </div>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
            <ConnectivityStatusBadge />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <div className={styles.navSectionLabel} style={{ marginTop: group.title.includes('Fase 1') ? '0' : '1.2rem' }}>
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''} ${item.highlight ? styles.navItemHighlight : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={18} className={styles.navIcon} />
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          ))}

          <div className={styles.navSectionLabel} style={{ marginTop: '1.2rem' }}>HERRAMIENTAS AVANZADAS</div>
          {ADVANCED_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''} ${item.highlight ? styles.navItemHighlight : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} className={styles.navIcon} />
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
              </Link>
            );
          })}

          {user?.role === 'ADMIN' && (
            <Link 
              href="/dashboard/admin" 
              className={`${styles.navItem} ${pathname === '/dashboard/admin' ? styles.navItemActive : ''}`}
              style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}
              onClick={() => setMobileOpen(false)}
            >
              <ShieldCheck size={18} className={styles.navIcon} color="#38bdf8" />
              <span className={styles.navLabel} style={{ color: '#38bdf8', fontWeight: 700 }}>Panel Admin</span>
              <span className={styles.navBadge} style={{ background: '#0284c7' }}>Gestión</span>
            </Link>
          )}

          <div className={styles.navSectionLabel} style={{ marginTop: '1.2rem' }}>RECURSOS & DESARROLLO</div>
          <Link 
            href="/api-docs" 
            className={`${styles.navItem} ${pathname === '/api-docs' ? styles.navItemActive : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <FileCode2 size={18} className={styles.navIcon} />
            <span className={styles.navLabel}>API OpenAPI / Swagger</span>
          </Link>

          <Link 
            href="/" 
            className={styles.navItemHome} 
            onClick={() => setMobileOpen(false)}
          >
            <Home size={18} className={styles.navIcon} />
            <span className={styles.navLabel}>Volver a Portada</span>
          </Link>
        </nav>

        {/* User Footer in Sidebar */}
        <div className={styles.sidebarFooter}>
          <div className={styles.footerInfo}>
            <div className={styles.footerTitle}>Agrotech Venezuela</div>
            <div className={styles.footerVersion}>Edición Premio MapBiomas v2.5</div>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Top Floating Utility Bar (Desktop) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '8px',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <CommandPalette />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isGuest && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(234, 179, 8, 0.15)',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: '#facc15'
              }}>
                <span>🚀 Sesión Sandbox</span>
                <Link 
                  href="/auth/register"
                  style={{
                    background: '#eab308',
                    color: '#0f172a',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <UserPlus size={12} /> Guardar Finca
                </Link>
              </div>
            )}
            <SunlightThemeToggle />
          </div>
        </div>

        <div className={styles.contentWrapper}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardContent>{children}</DashboardContent>;
}
