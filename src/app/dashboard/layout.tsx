"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
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
  FileCode2,
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Resumen', icon: LayoutDashboard },
  { href: '/dashboard/mapa', label: 'Visor WebGIS', icon: MapIcon, badge: 'En Vivo' },
  { href: '/dashboard/estadisticas', label: 'Geoestadísticas', icon: BarChart3 },
  { href: '/dashboard/cultivos', label: 'Catálogo de Cultivos', icon: Sprout },
  { href: '/dashboard/suelos', label: 'Perfiles Edafológicos', icon: FlaskConical },
  { href: '/dashboard/recomendaciones', label: 'Simulador & IA', icon: Sparkles, highlight: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* Live Status Indicator */}
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
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <div className={styles.navSectionLabel}>NAVEGACIÓN PRINCIPAL</div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

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
