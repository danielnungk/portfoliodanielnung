"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type WorkItem = {
  title: string;
  category: string; // Autos / Motos / Retrato
  type: "Foto" | "Video";
  cover: string; // solo para el grid
  href?: string; // link opcional
  gallery?: string[]; // solo fotos reales dentro del folder
};

const WORK: WorkItem[] = [
  {
    title: "GAC Emzoom R",
    category: "Autos",
    type: "Foto",
    cover: "/work/covers/gac-emzoom-r.jpg",
    gallery: [
      "/work/gac-emzoom-r/1.jpg",
      "/work/gac-emzoom-r/2.jpg",
      "/work/gac-emzoom-r/3.jpg",
      "/work/gac-emzoom-r/4.jpg",
      "/work/gac-emzoom-r/5.jpg",
      "/work/gac-emzoom-r/6.jpg",
      "/work/gac-emzoom-r/7.jpg",
      "/work/gac-emzoom-r/8.jpg",
      "/work/gac-emzoom-r/9.jpg"
    ],
  },
  {
    title: "Ducati Lamborghini",
    category: "Motos",
    type: "Foto",
    cover: "/work/covers/ducati-lamborghini.jpg",
    gallery: [
      "/work/ducati-lamborghini/1.jpg",
      "/work/ducati-lamborghini/2.jpg",
      "/work/ducati-lamborghini/3.jpg",
      "/work/ducati-lamborghini/4.jpg",
      "/work/ducati-lamborghini/5.jpg",
      "/work/ducati-lamborghini/6.jpg",
      "/work/ducati-lamborghini/7.jpg"
    ],
  },
  {
    title: "CHANGAN HUNTER",
    category: "Autos",
    type: "Foto",
    cover: "/work/covers/changan-hunter.jpg",
    gallery: [
      "/work/changan-hunter/1.jpg",
      "/work/changan-hunter/2.jpg",
      "/work/changan-hunter/3.jpg",
      "/work/changan-hunter/4.jpg",
      "/work/changan-hunter/5.jpg",
    ],
  },
  {
    title: "Ducati Panigale V2",
    category: "Retrato",
    type: "Foto",
    cover: "/work/covers/ducati-panigale-v2.jpg",
    gallery: [
      "/work/ducati-panigale-v2/1.jpg",
      "/work/ducati-panigale-v2/2.jpg",
      "/work/ducati-panigale-v2/3.jpg",
      "/work/ducati-panigale-v2/4.jpg",
      "/work/ducati-panigale-v2/5.jpg",
      "/work/ducati-panigale-v2/6.jpg",
    ],
  },
  {
    title: "Ducati Monster",
    category: "Retrato",
    type: "Foto",
    cover: "/work/covers/ducati-monster-nocturna.jpg",
    gallery: [
      "/work/ducati-monster-nocturna/1.jpg",
      "/work/ducati-monster-nocturna/2.jpg",
      "/work/ducati-monster-nocturna/3.jpg",
      "/work/ducati-monster-nocturna/4.jpg",
      "/work/ducati-monster-nocturna/5.jpg",
    ],
  },
  {
    title: "Ducati Multistrada V4S",
    category: "Motos",
    type: "Foto",
    cover: "/work/covers/ducati-multistrada-v4s.jpg",
    gallery: [
      "/work/ducati-multistrada-v4s/1.jpg",
      "/work/ducati-multistrada-v4s/2.jpg",
      "/work/ducati-multistrada-v4s/3.jpg",
      "/work/ducati-multistrada-v4s/4.jpg",
      "/work/ducati-multistrada-v4s/5.jpg",
      "/work/ducati-multistrada-v4s/6.jpg",
      "/work/ducati-multistrada-v4s/7.jpg",
    ],
  },
  {
    title: "Ducati SuperSport",
    category: "Motos",
    type: "Foto",
    cover: "/work/covers/ducati-supersport.jpg",
    gallery: [
      "/work/ducati-supersport/1.jpg",
      "/work/ducati-supersport/2.jpg",
      "/work/ducati-supersport/3.jpg",
      "/work/ducati-supersport/4.jpg",
      "/work/ducati-supersport/5.jpg",
      "/work/ducati-supersport/6.jpg",
      "/work/ducati-supersport/7.jpg",
      "/work/ducati-supersport/8.jpg",
      "/work/ducati-supersport/9.jpg",
    ],
  },
  {
    title: "CFMOTO 450 SRS",
    category: "Motos",
    type: "Foto",
    cover: "/work/covers/cfmoto-450-srs.jpg",
    gallery: [
      "/work/cfmoto-450-srs/1.jpg",
      "/work/cfmoto-450-srs/2.jpg",
      "/work/cfmoto-450-srs/3.jpg",
      "/work/cfmoto-450-srs/4.jpg",
    ],
  },
  {
    title: "GAC GS8 MAX HEV",
    category: "Autos",
    type: "Foto",
    cover: "/work/covers/gac-gs8-max-hev.jpg",
    gallery: [
      "/work/gac-gs8-max-hev/1.jpg",
      "/work/gac-gs8-max-hev/2.jpg",
      "/work/gac-gs8-max-hev/3.jpg",
      "/work/gac-gs8-max-hev/4.jpg",
      "/work/gac-gs8-max-hev/5.jpg",
      "/work/gac-gs8-max-hev/6.jpg",
    ],
  },
  {
    title: "CHANGAN CS55",
    category: "Autos",
    type: "Foto",
    cover: "/work/covers/changan-cs55.jpg",
    gallery: [
      "/work/changan-cs55/1.jpg",
      "/work/changan-cs55/2.jpg",
      "/work/changan-cs55/3.jpg",
      "/work/changan-cs55/4.jpg",
      "/work/changan-cs55/5.jpg",
    ],
  },
  
];

type Filter = "Todos" | "Autos" | "Motos" | "Retrato";
const FILTERS: Filter[] = ["Todos", "Autos", "Motos", "Retrato"];

function isValidFilter(v: string | null): v is Filter {
  return !!v && (FILTERS as string[]).includes(v);
}

export default function WorkSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sectionRef = useRef<HTMLElement | null>(null);
  const didAutoScrollRef = useRef(false);

  const initialFilterFromUrl = (() => {
    const v = searchParams.get("work");
    return isValidFilter(v) ? v : ("Todos" as Filter);
  })();

  const [filter, setFilter] = useState<Filter>(initialFilterFromUrl);
  const [isAnimating, setIsAnimating] = useState(false);

  const gridTopRef = useRef<HTMLDivElement | null>(null);
  const animTimerRef = useRef<number | null>(null);

  // --- Modal + Lightbox state ---
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredWork = useMemo(() => {
    if (filter === "Todos") return WORK;
    return WORK.filter((w) => w.category === filter);
  }, [filter]);

  const activeGallery = useMemo(() => {
    if (!activeItem?.gallery) return [];
    return activeItem.gallery.filter(Boolean);
  }, [activeItem]);

  const updateUrlFilter = (next: Filter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "Todos") params.delete("work");
    else params.set("work", next);

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const scrollToGridTop = () => {
    const el = gridTopRef.current;
    if (!el) return;

    const HEADER_OFFSET = 64;
    const STICKY_FILTERS_OFFSET = 56;

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      HEADER_OFFSET -
      STICKY_FILTERS_OFFSET -
      12;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    if (didAutoScrollRef.current) return;

    const v = searchParams.get("work");
    if (!isValidFilter(v)) return;
    if (v === "Todos") return;

    didAutoScrollRef.current = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;

        const HEADER_OFFSET = 64;
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 12;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilter = (next: Filter) => {
    if (next === filter) return;

    if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
    setIsAnimating(true);

    setFilter(next);
    updateUrlFilter(next);
    scrollToGridTop();

    animTimerRef.current = window.setTimeout(() => {
      setIsAnimating(false);
      animTimerRef.current = null;
    }, 180);
  };

  const Chip = ({ label }: { label: Filter }) => {
    const active = filter === label;

    return (
      <button
        type="button"
        onClick={() => applyFilter(label)}
        className={`shrink-0 rounded-full px-4 py-2 text-sm border transition ${
          active
            ? "bg-white text-black border-white"
            : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
        }`}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  };

  const closeLightbox = () => setLightboxIndex(null);

  const closeModal = () => {
    setLightboxIndex(null);
    setActiveItem(null);
  };

  const goNext = () => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      const n = Math.max(activeGallery.length, 1);
      return (i + 1) % n;
    });
  };

  const goPrev = () => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      const n = Math.max(activeGallery.length, 1);
      return (i - 1 + n) % n;
    });
  };

  // --- Lock scroll + ESC behavior ---
  useEffect(() => {
  const shouldLock = !!activeItem || lightboxIndex !== null;
  if (!shouldLock) return;

  const prevOverflow = document.body.style.overflow;
  const prevPaddingRight = document.body.style.paddingRight;

  // Compensa el “brinco” por desaparecer scrollbar (desktop)
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = prevOverflow;
    document.body.style.paddingRight = prevPaddingRight;
  };
}, [activeItem, lightboxIndex]);


  // --- Swipe (Lightbox) ---
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const onLbTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    isSwiping.current = false;
  };

  const onLbTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null || touchStartY.current == null) return;

    const t = e.touches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isSwiping.current = true;
      e.preventDefault();
    }
  };

  const onLbTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;

    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;

    const SWIPE_THRESHOLD = 45;

    if (isSwiping.current && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) goNext(); // swipe izq -> siguiente
      else goPrev(); // swipe der -> anterior
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  };

  return (
    <section ref={sectionRef} id="work" className="w-full scroll-mt-24 py-12">
     <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Sesiones de fotos</h2>
            <p className="mt-2 text-white/60">Selección de proyectos en fotografía.</p>
          </div>

          {/* Filters */}
          <div
            className="
              md:static
              sticky top-16 z-30 -mx-6 px-6 py-3
              bg-black/55 backdrop-blur border-b border-white/10
              md:bg-transparent md:backdrop-blur-0 md:border-b-0 md:py-0 md:px-0 md:mx-0
            "
          >
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {FILTERS.map((f) => (
                <Chip key={f} label={f} />
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="mt-6 text-sm text-white/45">
          Mostrando <span className="text-white/70">{filteredWork.length}</span>{" "}
          {filteredWork.length === 1 ? "proyecto" : "proyectos"}
          {filter !== "Todos" ? (
            <>
              {" "}
              en <span className="text-white/70">{filter}</span>
            </>
          ) : null}
        </p>

        <div ref={gridTopRef} className="h-0" />

        {/* Grid */}
        <div
          className={`mt-8 transition-all duration-300 ${
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWork.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveItem(item)}
                className="text-left"
              >
                <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <div className="relative aspect-[9/16]">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-90 transition group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-1 group-hover:translate-y-0 transition">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/70 border border-white/15 bg-black/30 backdrop-blur px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-white/70 border border-white/15 bg-black/30 backdrop-blur px-3 py-1 rounded-full">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg md:text-xl font-medium">{item.title}</h3>

                    <p className="mt-1 text-sm text-white/60">
                      Ver sesión
                      <span className="inline-block translate-x-0 group-hover:translate-x-1 transition ml-1">
                        →
                      </span>
                    </p>
                  </div>
                </article>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalle de ${activeItem.title}`}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Cerrar"
          />

          {/* Panel */}
          <div
            className="
              relative
              w-full
              md:w-[min(1120px,92vw)]
              max-h-[88vh]
              overflow-hidden
              rounded-t-3xl md:rounded-3xl
              border border-white/10
              bg-black/60
              backdrop-blur-xl
              shadow-[0_30px_120px_rgba(0,0,0,0.65)]
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-white/10">
              <div>
                <p className="text-xs tracking-[0.25em] text-white/55 uppercase">
                  {activeItem.category} • {activeItem.type}
                </p>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold">{activeItem.title}</h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition px-4 py-2 text-sm"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[calc(88vh-74px)] overflow-y-auto p-5 md:p-6">
              {activeItem.href && (
                <a
                  href={activeItem.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
                >
                  Ver link externo <span aria-hidden>↗</span>
                </a>
              )}

              {activeGallery.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
                  Próximamente.
                </div>
              ) : (
                <>
                  {/* Masonry (columns) */}
                  <div className="mt-4 columns-2 md:columns-3 gap-3 [column-fill:_balance]">
                    {activeGallery.map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="mb-3 block w-full break-inside-avoid rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                        aria-label={`Abrir foto ${idx + 1}`}
                      >
                        <img
                          src={src}
                          alt={`${activeItem.title} ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-auto block object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* hint ultra sutil móvil */}
                  
                </>
              )}
            </div>
          </div>

          {/* --- LIGHTBOX --- */}
          {lightboxIndex !== null && activeGallery[lightboxIndex] && (
            <div
              className="fixed inset-0 z-[70]"
              role="dialog"
              aria-modal="true"
              aria-label="Lightbox"
            >
              {/* Backdrop */}
              <button
                type="button"
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                onClick={closeLightbox}
                aria-label="Cerrar lightbox"
              />

             
            

            {/* Top bar (ENCIMA del touch layer) */}
            <div className="absolute top-0 inset-x-0 z-[30] p-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/75">
              {lightboxIndex + 1} / {activeGallery.length}
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition px-4 py-2 text-sm text-white"
              aria-label="Cerrar"
            >
              ✕
            </button>
            </div>


              {/* Image */}
              <div
                className="absolute inset-0 z-[20] flex items-center justify-center p-4 md:p-10"
                onTouchStart={onLbTouchStart}
                onTouchMove={onLbTouchMove}
                onTouchEnd={onLbTouchEnd}
                style={{ touchAction: "pan-y" }}
              >
              <div className="relative w-full h-full max-w-[1300px] max-h-[82vh]">
              <Image
               src={activeGallery[lightboxIndex]}
                alt={`${activeItem.title} lightbox ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                />
              </div>
              </div>


              {/* Controls */}
              {activeGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute z-[30] left-3 md:left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition w-11 h-11 grid place-items-center text-white"
                    aria-label="Anterior"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute z-[30] right-3 md:right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition w-11 h-11 grid place-items-center text-white"
                    aria-label="Siguiente"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Desktop hint */}
              <div className="absolute bottom-4 inset-x-0 hidden md:flex justify-center pointer-events-none">
                <div className="text-xs text-white/45">
                  Usa ← → para navegar • ESC para cerrar • En móvil desliza
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}