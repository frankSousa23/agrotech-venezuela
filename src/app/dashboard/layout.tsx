"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import { useAuth } from '@/lib/auth/authContext';
import { DEMO_USERS } from '@/lib/auth/authUtils';
import ConnectivityStatusBadge from '@/components/layout/ConnectivityStatusBadge';
import CommandPalette from '@/components/layout/CommandPalette';
import SunlightThemeToggle from '@/components/layout/SunlightThemeToggle';
import FarmerModeToggle from '@/components/layout/FarmerModeToggle';
import { useUIMode } from '@/lib/context/UIModeContext';
import HelpModal from '@/components/layout/HelpModal';
import BackButton from '@/components/ui/BackButton';
import DemoTourModal from '@/components/layout/DemoTourModal';
import IntentionsModal from '@/components/layout/IntentionsModal';
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
      { href: '/dashboard/iot', label: 'Laboratorio IoT', icon: Radio, badge: 'LAB' },
    ]
  }
];

const ADVANCED_ITEMS: NavItem[] = [
  { href: '/dashboard/postulacion', label: 'Ficha de Postulación', icon: Building2, badge: 'TRL 6' },
  { href: '/dashboard/estadisticas', label: 'Geoestadísticas', icon: BarChart3 },
  { href: '/dashboard/arquitectura', label: 'Arquitectura E2E', icon: Workflow, badge: 'E2E' },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [intentionsOpen, setIntentionsOpen] = useState(false);
  const { user, login, logout, isAuthenticated } = useAuth();
  const { isFarmerMode } = useUIMode();
  const isGuest = user?.isGuest || user?.status === 'GUEST';

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  const handleSwitchRole = (targetRole: 'FARMER' | 'AGRONOMIST' | 'ADMIN') => {
    const target = DEMO_USERS.find(u => u.role === targetRole);
    if (target) {
      login(`demo_token_${target.id}`, target);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Visual Intentions Modal ("¿Qué necesitas hacer hoy?") */}
      <IntentionsModal 
        isOpen={intentionsOpen} 
        onClose={() => setIntentionsOpen(false)} 
      />

      {/* Mobile Top Header */}
      <div className={styles.mobileBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {pathname !== '/dashboard' && (
            <BackButton fallbackHref="/dashboard" label="" style={{ minHeight: '32px', padding: '4px 8px' }} />
          )}
          <Link href="/" className={styles.mobileLogo}>
            <div className={styles.logoBadge}>🌱</div>
            <span>Agrotech</span>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setIntentionsOpen(true)}
            style={{
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              color: '#4ade80',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="¿Qué necesitas hacer hoy?"
            aria-label="¿Qué necesitas hacer hoy?"
          >
            <Sparkles size={16} />
          </button>
          <FarmerModeToggle iconOnly />
          <DemoTourModal iconOnly />
          <SunlightThemeToggle />
          <button 
            onClick={handleLogout}
            title="Cerrar Sesión"
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              color: '#ef4444', 
              cursor: 'pointer', 
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
            aria-label="Cerrar Sesión"
          >
            <LogOut size={16} />
          </button>
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
        <div className={styles.brandArea} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
            <div className={styles.logoIconContainer}>
              <Sprout size={24} className={styles.logoSprout} />
            </div>
            <div>
              <div className={styles.brandTitle}>Agrotech</div>
              <div className={styles.brandSubtitle}>VENEZUELA • MAPBIOMAS</div>
            </div>
          </Link>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* User Session Pill & Role Indicator (Compact) */}
        <div style={{
          padding: '5px 8px',
          background: isGuest ? 'rgba(234, 179, 8, 0.12)' : 'rgba(30, 41, 59, 0.7)',
          borderRadius: '8px',
          border: isGuest ? '1px solid rgba(234, 179, 8, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '6px',
                background: isGuest ? 'rgba(234, 179, 8, 0.25)' : 'rgba(34, 197, 94, 0.2)',
                color: isGuest ? '#facc15' : '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}>
                {isGuest ? '🚀' : (user?.name ? user.name[0].toUpperCase() : 'P')}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {user?.name || 'Productor Invitado'}
                </div>
                <div style={{ fontSize: '0.67rem', color: isGuest ? '#fde047' : '#94a3b8' }}>
                  {isGuest ? 'Modo Sandbox (Efímero)' : (user?.role === 'ADMIN' ? '🛡️ Admin' : user?.role === 'AGRONOMIST' ? '🌱 Agrónomo' : '🌾 Productor')}
                </div>
              </div>
            </div>

            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                title="Cerrar Sesión"
                style={{ 
                  background: 'rgba(239, 68, 68, 0.15)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)', 
                  color: '#ef4444', 
                  cursor: 'pointer', 
                  padding: '3px 6px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.7rem'
                }}
              >
                <LogOut size={12} />
              </button>
            ) : (
              <Link 
                href="/auth/login"
                title="Iniciar Sesión"
                style={{ color: '#4ade80', display: 'flex', alignItems: 'center' }}
              >
                <LogIn size={15} />
              </Link>
            )}
          </div>

          {/* Selector Rápido de Roles (Compact Segmented Control) */}
          <div style={{
            display: 'flex',
            gap: '3px',
            padding: '2px',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <button
              type="button"
              onClick={() => handleSwitchRole('FARMER')}
              title="Cambiar a Productor"
              style={{
                flex: 1,
                padding: '2px 1px',
                borderRadius: '4px',
                border: user?.role === 'FARMER' && !isGuest ? '1px solid #16a34a' : 'none',
                background: user?.role === 'FARMER' && !isGuest ? 'rgba(34, 197, 94, 0.25)' : 'transparent',
                color: user?.role === 'FARMER' && !isGuest ? '#86efac' : '#94a3b8',
                fontSize: '0.64rem',
                cursor: 'pointer',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              🚜 Prod
            </button>
            <button
              type="button"
              onClick={() => handleSwitchRole('AGRONOMIST')}
              title="Cambiar a Ingeniero Agrónomo"
              style={{
                flex: 1,
                padding: '2px 1px',
                borderRadius: '4px',
                border: user?.role === 'AGRONOMIST' ? '1px solid #3b82f6' : 'none',
                background: user?.role === 'AGRONOMIST' ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                color: user?.role === 'AGRONOMIST' ? '#93c5fd' : '#94a3b8',
                fontSize: '0.64rem',
                cursor: 'pointer',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              🌱 Agrón
            </button>
            <button
              type="button"
              onClick={() => handleSwitchRole('ADMIN')}
              title="Cambiar a Administrador"
              style={{
                flex: 1,
                padding: '2px 1px',
                borderRadius: '4px',
                border: user?.role === 'ADMIN' ? '1px solid #38bdf8' : 'none',
                background: user?.role === 'ADMIN' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                color: user?.role === 'ADMIN' ? '#7dd3fc' : '#94a3b8',
                fontSize: '0.64rem',
                cursor: 'pointer',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Live Status & Connectivity Indicator (Compact Pill) */}
        <div className={styles.statusBox}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
            <div className={styles.statusHeader}>
              <span className={styles.statusLiveDot}></span>
              <span className={styles.statusLiveText} style={{ fontSize: '0.66rem' }}>Red Territorial</span>
            </div>
            <ConnectivityStatusBadge />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '3px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              <Radio size={11} className={styles.statusIcon} />
              <span>MapBiomas</span>
              <HelpModal 
                title="Integración MapBiomas" 
                content={
                  <div>
                    <p>Agrotech Venezuela integra espacialmente los datos históricos (1985-2024) de la iniciativa <strong>MapBiomas Venezuela</strong>.</p>
                    <p>Esto permite a la IA y a la Calculadora de Carbono saber si el suelo fue bosque, pastura o si tiene vocación agrícola, ayudándote a mejorar la toma de decisiones sin necesidad de salir del sistema.</p>
                  </div>
                } 
                iconOnly 
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={11} className={styles.statusIcon} />
              <span>NASA POWER</span>
              <HelpModal 
                title="Clima NASA POWER" 
                content={
                  <div>
                    <p>Los datos agroclimáticos se obtienen en tiempo real del proyecto <strong>NASA POWER</strong>.</p>
                    <p>El sistema cruza esta información con los modelos predictivos para calcular el balance hídrico y las fechas óptimas de siembra de tu finca.</p>
                  </div>
                } 
                iconOnly 
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <div className={styles.navSectionLabel} style={{ marginTop: group.title.includes('Fase 1') ? '0' : '0.2rem' }}>
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
                    <Icon size={16} className={styles.navIcon} />
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          ))}

          <div className={styles.navSectionLabel} style={{ marginTop: '0.2rem' }}>HERRAMIENTAS AVANZADAS</div>
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
                <Icon size={16} className={styles.navIcon} />
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
              <ShieldCheck size={16} className={styles.navIcon} color="#38bdf8" />
              <span className={styles.navLabel} style={{ color: '#38bdf8', fontWeight: 700 }}>Panel Admin</span>
              <span className={styles.navBadge} style={{ background: '#0284c7' }}>Gestión</span>
            </Link>
          )}

          <div className={styles.navSectionLabel} style={{ marginTop: '0.45rem' }}>RECURSOS & DESARROLLO</div>
          <Link 
            href="/api-docs" 
            className={`${styles.navItem} ${pathname === '/api-docs' ? styles.navItemActive : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <FileCode2 size={16} className={styles.navIcon} />
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

          {/* Botón de Cerrar Sesión Sticky (Final del Sidebar) */}
          <div className={styles.stickyLogoutContainer}>
            <button 
              onClick={handleLogout}
              className={styles.navItem}
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.2)', 
                color: '#f87171', 
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                fontWeight: 600,
                padding: '10px 16px',
                borderRadius: '8px',
                textAlign: 'left',
                boxSizing: 'border-box'
              }}
            >
              <LogOut size={18} className={styles.navIcon} />
              <span className={styles.navLabel}>Cerrar Sesión</span>
            </button>
          </div>
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
        {/* Top Floating Utility Bar (Desktop - Se oculta en móviles automáticamente) */}
        <div className={styles.desktopUtilityBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {pathname !== '/dashboard' && (
              <BackButton fallbackHref="/dashboard" label="Atrás" />
            )}
            <CommandPalette />
            <button
              type="button"
              onClick={() => setIntentionsOpen(true)}
              style={{
                background: isFarmerMode ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.15)',
                border: isFarmerMode ? '1px solid #22c55e' : '1px solid rgba(74, 222, 128, 0.4)',
                boxShadow: isFarmerMode ? '0 0 12px rgba(34, 197, 94, 0.25)' : 'none',
                color: isFarmerMode ? '#bbf7d0' : '#4ade80',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              title="Guía de 6 tareas principales para el productor"
              aria-label="Abrir guía de qué necesitas hacer hoy"
            >
              <Sparkles size={14} />
              <span>{isFarmerMode ? '✨ ¿Qué necesitas hacer hoy?' : '¿Qué necesitas hacer?'}</span>
            </button>
          </div>
          
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
            <FarmerModeToggle />
            <DemoTourModal />
            <SunlightThemeToggle />
            <button 
              onClick={handleLogout}
              title="Cerrar Sesión"
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.2)', 
                color: '#f87171', 
                cursor: 'pointer', 
                padding: '6px 12px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              <LogOut size={16} />
              <span>Salir</span>
            </button>
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
