"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  mobile: string;  // vertical (mobile)
  desktop: string; // horizontal (desktop)
  alt: string;
};

export default function HeroSlider() { 
  // El hero slider es una galeria que tiene imagenes dinamicas 
  // Que se van mostrando en el inicio de la pagina, va cambiando por tiempo
  const slides: Slide[] = useMemo(
    () => [
      { mobile: "/slider/1-v.jpg", desktop: "/slider/1-h.jpg", alt: "Slide 1" },
      { mobile: "/slider/2-v.jpg", desktop: "/slider/2-h.jpg", alt: "Slide 2" },
      { mobile: "/slider/3-v.jpg", desktop: "/slider/3-h.jpg", alt: "Slide 3" },
      { mobile: "/slider/4-v.jpg", desktop: "/slider/4-h.jpg", alt: "Slide 4" },
      { mobile: "/slider/5-v.jpg", desktop: "/slider/5-h.jpg", alt: "Slide 5" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  // Detecta si es mobile (Tailwind md = 768px) — versión pro con matchMedia
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);

    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // Solo mostrar una vez (por navegador)
    try {
      const seen = localStorage.getItem("seenSwipeHint");
      if (seen) return;

      setShowSwipeHint(true);
      const t = setTimeout(() => {
        setShowSwipeHint(false);
        localStorage.setItem("seenSwipeHint", "1");
      }, 2200);

      return () => clearTimeout(t);
    } catch {
      // Si localStorage falla, al menos que no truene
      setShowSwipeHint(true);
      const t = setTimeout(() => setShowSwipeHint(false), 2200);
      return () => clearTimeout(t);
    }
  }, []);

  const go = (next: number) => {
    const total = slides.length;
    setIndex((next + total) % total);
  };

  // ---- Swipe (mobile) ----
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length !== 1) return;

    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    isSwiping.current = false;

    // pausa mientras el usuario interactúa
    setPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current == null || touchStartY.current == null) return;

    const t = e.touches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;

    // Si el gesto es más horizontal que vertical, considerarlo swipe
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isSwiping.current = true;
      // Evita que el swipe horizontal se sienta como scroll/jank
      e.preventDefault();
    }
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current == null) {
      setPaused(false);
      return;
    }

    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;

    const SWIPE_THRESHOLD = 45; // px

    if (isSwiping.current && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) go(index + 1); // swipe izquierda -> siguiente
      else go(index - 1); // swipe derecha -> anterior
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;

    // reanuda después de la interacción
    setPaused(false);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(index + 1), 6000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  return (
    <section
      id="home"
      className="scroll-mt-24 relative min-h-screen w-full overflow-hidden bg-black pt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      {/* Copy / identidad (UX) */}
      {/* CENTRADO SOLO EN MOBILE */}
      <div
        className="
          absolute
          bottom-24
          left-1/2
          -translate-x-1/2
          md:left-16
          md:translate-x-0
          z-30
          max-w-md
          w-[calc(100%-3rem)]
          md:w-auto
        "
      >
        <div className="rounded-3xl border border-white/10 bg-black/35 backdrop-blur-md p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          <p className="text-[10px] md:text-xs tracking-[0.25em] text-white/60 uppercase">
            Daniel Núñez
          </p>

          <h1 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight">
            Fotógrafo y filmmaker
          </h1>

          <p className="mt-2 text-sm md:text-[15px] text-white/70 leading-relaxed">
            Creador de contenido para autos, motos y marcas.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-white text-black px-4 py-1.5 text-xs md:px-4 md:py-1.5 md:text-sm font-medium hover:bg-white/90 transition"
            >
              Ver trabajo
            </a>

            {/* ✅ Fix: igualar tamaño del botón Contacto */}
            <a
              href="#contact"
             className="rounded-full border border-white/25 bg-black/30 backdrop-blur px-4 py-1.5 text-xs md:px-[17px] md:py-[7px] md:text-sm font-medium text-white hover:bg-black/45 transition"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>

      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={`${s.desktop}-${s.mobile}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* ✅ MOBILE = vertical | DESKTOP = horizontal */}
          <Image
            src={isMobile ? s.mobile : s.desktop}
            alt={s.alt}
            fill
            priority={i === 0}
            className="object-cover"
            // ✅ Fix: sizes más “Next-friendly”
            sizes="(max-width: 768px) 100vw, 100vw"
          />

          {/* Overlay (sutil, estilo editorial) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
        </div>
      ))}

      {/* Controls (solo desktop para que NO compitan con el panel) */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => go(index - 1)}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full border border-white/20 bg-black/30 backdrop-blur hover:bg-black/45 transition items-center justify-center"
      >
        <span className="text-xl leading-none">‹</span>
      </button>

      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => go(index + 1)}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full border border-white/20 bg-black/30 backdrop-blur hover:bg-black/45 transition items-center justify-center"
      >
        <span className="text-xl leading-none">›</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index
                ? "w-8 bg-white/90"
                : "w-2.5 bg-white/35 hover:bg-white/55"
            }`}
          />
        ))}
      </div>

      {/* Swipe hint (solo mobile, sutil) */}
      <div
        className={`md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${
          showSwipeHint
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!showSwipeHint}
      >
        <div className="rounded-full border border-white/10 bg-black/30 backdrop-blur px-4 py-2 text-xs text-white/70">
          Desliza <span className="inline-block ml-1">→</span>
        </div>
      </div>
    </section>
  );
}
