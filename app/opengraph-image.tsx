// Genera la imagen Open Graph de la pagina.
// Es la imagen se muestra como miniatura al compartir la web en redes sociales (WhatsApp, Facebook, X, etc.).

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0B0B0F 0%, #141422 60%, #1B1B2E 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -1 }}>
            Daniel Núñez
          </div>
          <div style={{ fontSize: 30, fontWeight: 650, opacity: 0.92 }}>
            Filmmaker & Photographer
          </div>

          <div style={{ marginTop: 16, fontSize: 22, opacity: 0.8 }}>
            Reels cinematográficos · Autos & motos · Entrega rápida
          </div>

          <div style={{ marginTop: 26, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Automotriz", "Motocicletas", "Cinemático", "Premium"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 18,
                  padding: "10px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 22, fontSize: 18, opacity: 0.75 }}>
            www.danielnung.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
