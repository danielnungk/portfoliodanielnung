"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SectionId = "home" | "work" | "brands" | "about" | "contact";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Inicio" },
  { id: "work", label: "Trabajo" },
  { id: "brands", label: "Colaboraciones" },
  { id: "about", label: "Sobre mí" },
  { id: "contact", label: "Contacto" },
];

export default function TopbarClient() {
  const [active, setActive] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const lockObserverRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);

  const activeLabel = useMemo(
    () => SECTIONS.find((s) => s.id === active)?.label ?? "Inicio",
    [active]
  );

  const cta = useMemo(() => {
    if (active === "contact") return { href: "#work", label: "Ver trabajo" };
    return { href: "#contact", label: "Contacto" };
  }, [active]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Header fijo: h-16 => 64px
    const HEADER_OFFSET = 64;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 12;

    // Bloquea un momento el cálculo para que no “rebote” mientras haces smooth scroll
    lockObserverRef.current = true;
    if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
    lockTimerRef.current = window.setTimeout(() => {
      lockObserverRef.current = false;
      lockTimerRef.current = null;
    }, 450);

    // Setea activo inmediatamente (UX)
    setActive(id);

    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

    // Actualiza hash (sin brincar)
    history.replaceState(null, "", `#${id}`);
  };

  // ✅ Sección activa por SCROLL (más estable en mobile que IntersectionObserver)
  useEffect(() => {
    const HEADER_OFFSET = 64; // h-16

    const getActiveFromScroll = () => {
      if (lockObserverRef.current) return;

      // Punto de lectura debajo del header (evita que "home" robe cuando ya estás en work)
      const y = window.scrollY + HEADER_OFFSET + 24;

      // Tomamos la última sección cuyo top ya pasó
      let current: SectionId = "home";

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;

        const top = el.offsetTop;
        if (y >= top) current = s.id;
      }

      setActive(current);
    };

    window.addEventListener("scroll", getActiveFromScroll, { passive: true });
    window.addEventListener("resize", getActiveFromScroll);

    // inicial
    getActiveFromScroll();

    return () => {
      window.removeEventListener("scroll", getActiveFromScroll);
      window.removeEventListener("resize", getActiveFromScroll);
    };
  }, []);

  // UX: cerrar menú al cambiar a desktop o al scrollear
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    const onScrollClose = () => {
      if (menuOpen) setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScrollClose, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScrollClose);
    };
  }, [menuOpen]);

  // UX: bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Limpieza timers
  useEffect(() => {
    return () => {
      if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-8xl px-6 h-16 grid grid-cols-3 items-center">
        {/* Izquierda: marca */}
        <div className="flex items-center gap-4">
          <a
  href="#home"
  onClick={(e) => {
    e.preventDefault();
    scrollToSection("home");
  }}
  className="flex items-center gap-3 group"
>
  <span className="text-xs tracking-[0.45em] font-medium text-white/80 group-hover:text-white transition">
    DNG
  </span>

  <div className="hidden sm:block leading-tight">
    <p className="text-sm font-semibold text-white tracking-tight">
      Daniel Núñez
    </p>
    <p className="text-xs text-white/50">
      Filmmaker & Photographer
    </p>
  </div>
</a>

        </div>

        {/* Centro: nav desktop / mini pill mobile */}
        <div className="flex items-center justify-center">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-10 text-sm text-white/70">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;

              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }}
                  className={`transition relative ${
                    isActive ? "text-white" : "hover:text-white"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {s.label}
                  <span
                    className={`pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                      isActive ? "w-8 bg-white/80" : "w-0 bg-transparent"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile mini pill (active section) */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 backdrop-blur px-3.5 py-2 text-xs text-white/85 hover:bg-black/45 transition"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="max-w-[130px] truncate">{activeLabel}</span>
            <span className="opacity-60">▾</span>
          </button>
        </div>

        {/* Derecha: CTA (desktop) + Menú (mobile) */}
        <div className="flex justify-end items-center gap-3">
          {/* CTA desktop */}
          <a
            href={cta.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(cta.href.replace("#", "") as SectionId);
            }}
            className="hidden md:inline-flex px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
          >
            {cta.label}
          </a>

          {/* Botón menú mobile (extra) */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 backdrop-blur px-3.5 py-2 text-xs text-white/85 hover:bg-black/45 transition"
            >
             Menú
            </button>

        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          id="mobile-menu"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Cerrar menú"
            onClick={closeMenu}
          />

          {/* Panel */}
          <div className="absolute top-0 left-0 right-0 pt-16">
            <div className="mx-4 mt-4 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.65)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <p className="text-sm text-white/80">Navegación</p>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-sm text-white/80 hover:bg-white/10 transition"
                >
                  Cerrar
                </button>
              </div>

              <div className="px-5 py-4">
                <div className="grid gap-2">
                  {SECTIONS.map((s) => {
                    const isActive = active === s.id;
                    return (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          closeMenu();
                          scrollToSection(s.id);
                        }}
                        className={`rounded-2xl px-4 py-3 transition border ${
                          isActive
                            ? "bg-white text-black border-white"
                            : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base font-medium">
                            {s.label}
                          </span>
                          <span
                            className={`text-sm ${
                              isActive ? "opacity-70" : "opacity-50"
                            }`}
                          >
                            →
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    scrollToSection(cta.href.replace("#", "") as SectionId);
                  }}
                  className="mt-4 w-full rounded-2xl bg-white text-black px-5 py-4 text-center font-semibold hover:bg-white/90 transition"
                >
                  {cta.label}
                </button>

                <p className="mt-4 text-xs text-white/45 text-center">
                  Torreón, Coahuila · Disponible para proyectos
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
