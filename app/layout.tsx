// Layout raíz del sitio: estructura global, SEO, estilos, topbar fija y contenedor de todas las páginas.
// ------------------------------------------------------------------------------------------------------

import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopbarClient from "./components/TopBarClient";

const siteUrl = "https://www.danielnung.com";
const siteName = "Daniel Núñez — Filmmaker & Photographer";
const defaultTitle = "Danielnung | Filmmaker & Photographer";
const defaultDescription =
  "Portafolio de Daniel Núñez: reels cinematográficos, fotografía y videos para marcas automotrices y de motos. Estética premium y entrega rápida.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: "%s | Danielnung" },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    locale: "es_MX",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Daniel Núñez — Portafolio" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  
};
export const viewport: Viewport = {
  themeColor: "#0B0B0F",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="color-scheme" content="dark" />
        {/* Performance: Cloudinary preconnect */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>

      <body>
        <TopbarClient />
        {/* h-16 = 64px, así tu contenido no queda debajo del header fijo */}
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
