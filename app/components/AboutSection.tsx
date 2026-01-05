"use client";

import { useEffect, useState } from "react";

export default function AboutSection() {
  const [open, setOpen] = useState(false);

  // Desktop: abierto por defecto. Móvil: cerrado por defecto.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)"); // md
    const apply = () => setOpen(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return (
    <section id="about" className="w-full py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Mi enfoque</h2>

          {/* Mini badges */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs text-white/80">
              Filmmaker · Foto + Video
            </span>
            <span className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs text-white/80">
              Desde 2021
            </span>
            <span className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs text-white/80">
              Reels para marcas
            </span>
            <span className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs text-white/80">
            Drone · Tomas aéreas
          </span>

          </div>
        </div>

        {/* Versión corta (siempre visible) */}
        <p className="mt-6 text-white/70 leading-relaxed max-w-3xl">
          Trabajo con marcas automotrices y de motocicletas creando contenido visual pensado
          para redes sociales: estética cinematográfica, ritmo y formatos que funcionan en
          plataformas digitales.
        </p>

        {/* Toggle (solo móvil) */}
        <div className="mt-5 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] transition"
          >
            {open ? "Ver menos" : "Leer más"}
            <span aria-hidden className="text-white/60">
              {open ? "↑" : "↓"}
            </span>
          </button>
        </div>

        {/* Contenido extendido (colapsable en móvil / siempre visible en desktop) */}
        <div className={open ? "block" : "hidden md:block"}>
          <p className="mt-6 text-white/60 leading-relaxed max-w-3xl">
            Me especializo en reels cinematográficos y fotografía para redes, cuidando desde la
            estética hasta el ritmo y el formato final. Trabajo de forma ágil, con entregas
            rápidas y una comunicación clara durante todo el proceso.
          </p>

          {/* Cards de posicionamiento */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs tracking-[0.25em] uppercase text-white/60">Enfoque</p>
              <p className="mt-3 text-lg font-medium">Marcas automotrices y motociclismo</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs tracking-[0.25em] uppercase text-white/60">Especialidad</p>
              <p className="mt-3 text-lg font-medium">Reels cinematográficos y foto para redes + tomas aéreas con dron</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs tracking-[0.25em] uppercase text-white/60">Diferencial</p>
              <p className="mt-3 text-lg font-medium">Estética cuidada, rapidez y enfoque digital</p>
            </div>
          </div>

          {/* Cierre humano + autoridad */}
          <p className="mt-12 text-sm text-white/45 max-w-3xl">
            Freelance desde 2021. He colaborado con marcas como GAC, Ducati y Changan en proyectos
            comerciales y colaboraciones continuas, trabajando siempre con un enfoque profesional y
            orientado a resultados.
          </p>
        </div>
      </div>
    </section>
  );
}
