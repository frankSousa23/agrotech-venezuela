import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Agrotech Venezuela 🌾🛰️ — Inteligencia Geoespacial & Agronomía Predictiva",
  description: "Plataforma WebGIS de precisión agronómica, monitoreo satelital Sentinel-2 L2A, series temporales MapBiomas y prescripción edafológica asistida por IA para el campo venezolano.",
  keywords: ["Agrotech", "Venezuela", "WebGIS", "MapBiomas", "Sentinel-2", "NASA POWER", "Suelos", "Agricultura de Precisión"],
  authors: [{ name: "Frank Sousa" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#22c55e" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('agrotech-theme');
                  var theme = storedTheme || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: 'var(--background, #0b1329)', color: 'var(--text-main, #f8fafc)', fontFamily: 'var(--font-inter), sans-serif' }}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

