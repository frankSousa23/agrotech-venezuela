"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import { useAuth } from '@/lib/auth/authContext';
import ConnectivityStatusBadge from '@/components/layout/ConnectivityStatusBadge';
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
  Workflow
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Resumen General', icon: LayoutDashboard },
  { href: '/dashboard/mapa', label: 'Visor WebGIS', icon: MapIcon, badge: '3 Niveles' },
  { href: '/dashboard/tierras', label: 'Mis Tierras & Fincas', icon: Tractor, badge: 'Mi Finca' },
  { href: '/dashboard/bitacora', label: 'Cuaderno de Campo', icon: BookOpen },
  { href: '/dashboard/recomendaciones', label: 'Simulador & IA', icon: Sparkles, highlight: true },
  { href: '/dashboard/arquitectura', label: 'Diagramas & Datos', icon: Workflow, badge: 'E2E' },
  { href: '/dashboard/estadisticas', label: 'Geoestadísticas', icon: BarChart3 },
  { href: '/dashboard/cultivos', label: 'Catálogo de Cultivos', icon: Sprout },
  { href: '/dashboard/suelos', label: 'Perfiles Edafológicos', icon: FlaskConical },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();


  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Top Header */}
      <div className={styles.mobileBar}>
        <Link href="/" className={styles.mobileLogo}>
          <div className={styles.logoBadge}>🌱</div>
          <span>Agrotech</span>
        </Link>
        <button 
          id="btn_toggle_mobile_menu"
          className={styles.menuToggle} 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Alternar Menú"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
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
          background: 'rgba(30, 41, 59, 0.7)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: user?.role === 'AGRONOMIST' ? '#0284c7' : '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              {user?.name ? user.name.charAt(0) : 'P'}
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f8fafc', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || 'Productor'}
              </div>
              <div style={{ fontSize: '0.68rem', color: user?.role === 'AGRONOMIST' ? '#38bdf8' : '#4ade80' }}>
                {user?.role === 'AGRONOMIST' ? 'Ing. Agrónomo' : user?.role === 'ADMIN' ? 'Administrador' : 'Productor Agrícola'}
              </div>
            </div>
          </div>

          {isAuthenticated ? (
            <button 
              onClick={() => logout()}
              title="Cerrar Sesión"
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }}
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
          <div className={styles.navSectionLabel}>HERRAMIENTAS TERRITORIALES</div>
          {NAV_ITEMS.map((item) => {
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


