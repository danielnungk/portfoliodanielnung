"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type MediaType = "image" | "video";

type PortfolioItem = {
  id: string;
  title: string;
  category: "Autos" | "Motos" | "Ciudad" | "Nocturno" | "Comercial";
  client?: string;
  year?: string;
  role?: string;
  highlight?: string; // resultado / punchline
  description?: string;
  type: MediaType;
  cover: string; // thumbnail/cover (local)
  src: string; // remote video url (Cloudinary optimized)
  aspect?: "vertical" | "horizontal" | "square";
  featured?: boolean;
};

// ✅ Helper: crea URL Cloudinary optimizada (reduce peso + mejora codec/formato)
function cloudinaryOptimized(url: string, width = 1080) {
  // Ej:
  // https://res.cloudinary.com/<cloud>/video/upload/v123/abc.mp4
  // -> https://res.cloudinary.com/<cloud>/video/upload/q_auto,f_auto,vc_auto,w_1080/abc
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);

    // Buscar "upload" y lo que viene después
    const uploadIdx = parts.findIndex((p) => p === "upload");
    if (uploadIdx === -1) return url;

    // Todo lo que está después de upload (puede incluir v123 y filename.ext)
    const afterUpload = parts.slice(uploadIdx + 1);

    // Quitar versión "v123..." si existe
    const cleaned = afterUpload[0]?.startsWith("v") ? afterUpload.slice(1) : afterUpload;

    // Último segmento es filename.ext, lo convertimos a "public_id" sin extensión
    const last = cleaned[cleaned.length - 1] ?? "";
    const publicId = last.replace(/\.[a-zA-Z0-9]+$/, ""); // quita .mp4/.mov etc.

    // Si hubiera carpetas dentro (no aplica en tus links), esto lo soporta:
    const folderPath = cleaned.length > 1 ? cleaned.slice(0, -1).join("/") + "/" : "";

    const transforms = `q_auto,f_auto,vc_auto,w_${width}`;
    u.pathname = `/${parts.slice(0, uploadIdx + 1).join("/")}/${transforms}/${folderPath}${publicId}`;
    // no extension -> f_auto decide el mejor formato
    return u.toString();
  } catch {
    return url;
  }
}

const DEFAULT_REEL_DESCRIPTION =
  "Reel diseñado para redes: ritmo, planos cortos y estética cinematográfica orientada a retención y percepción premium.";


const items: PortfolioItem[] = [
  {
    id: "cfmoto-01",
    title: "CFMOTO 450SR-S Reel",
    category: "Motos",
    client: "CFMOTO",
    year: "2024",
    role: "Cámara · Edición que atrapa",
    highlight: "Look premium con motion y detalles.",
    description: "Reel enfocado en la retención de audicencia y en mostrar el modelo.",
    type: "video",
    cover: "/portfolio/cfmoto-01-cover.jpg",
    src: cloudinaryOptimized(
      "https://res.cloudinary.com/dmoezxwgx/video/upload/v1767474138/cfmoto-450srs_jkekyw.mp4"
    ),
    aspect: "vertical",
    featured: true,
  },
  {
    id: "ducati-01",
    title: "Ducati Panigale V4S Reel",
    category: "Motos",
    client: "Ducati",
    year: "2024",
    role: "Dirección · Cámara · Edición",
    highlight: "Ritmo + detalle para máxima retención.",
    description: "Reel enfocado en la retención de audicencia y en mostrar el modelo de forma dinámica.",
    type: "video",
    cover: "/portfolio/ducati-01-cover.jpg",
    src: cloudinaryOptimized(
      "https://res.cloudinary.com/dmoezxwgx/video/upload/v1767474142/panigale-v4s_fcpabh.mp4"
    ),
    aspect: "vertical",
    featured: true,
  },
  {
    id: "changan-01",
    title: "Changan — Video promocional",
    category: "Comercial",
    client: "Changan",
    year: "2024",
    role: "Dirección · Cámara · Edición",
    highlight: "Video hecho para publicidad general de la agencia.",
    description: "Comercial hecho para redes y publicidad.",
    type: "video",
    cover: "/portfolio/changan-01-cover.jpg",
    src: cloudinaryOptimized(
      "https://res.cloudinary.com/dmoezxwgx/video/upload/v1767474142/changan-demo_zxsh5q.mp4"
    ),
    aspect: "vertical",
  },
  {
    id: "gac-01",
    title: "GAC — Reel producto (Huawei)",
    category: "Comercial",
    client: "GAC",
    year: "2025",
    role: "Dirección · Cámara · Edición",
    highlight: "Reel de promoción a campaña de GAC con Huawei",
    description: "Reel dinámico enfocado a la campaña de GAC sorteando productos Huawei.",
    type: "video",
    cover: "/portfolio/gac-01-cover.jpg",
    src: cloudinaryOptimized(
      "https://res.cloudinary.com/dmoezxwgx/video/upload/v1767474143/gac-huawei_k2z7fs.mp4"
    ),
    aspect: "vertical",
  },
  {
    id: "gac-02",
    title: "GAC GN8 — Reel de presentación",
    category: "Autos",
    client: "GAC",
    year: "2025",
    role: "Cámara · Edición",
    highlight: "Video de presentación al modelo GN8",
    description: "Video de presentación para la GAC GN8, se usaron tomas áereas con dron y en movimiento",
    type: "video",
    cover: "/portfolio/gac-gn8-cover.jpg",
    src: cloudinaryOptimized(
      "https://res.cloudinary.com/dmoezxwgx/video/upload/v1767474142/gac-gn8_h5osfu.mov"
    ),
    aspect: "vertical",
  },
];

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    // iOS/Safari proof lock
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;

      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}


// ✅ Warm video: precarga ligera (mejora sensación de instantáneo al abrir modal)
const warmed = new Set<string>();
function warmVideo(url: string) {
  if (!url || warmed.has(url)) return;
  warmed.add(url);

  // Preconnect/Prefetch suave. No descargamos el video completo.
  try {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = url;
    // Algunos browsers ignoran preload video cross-origin, pero ayuda.
    document.head.appendChild(link);

    // HEAD request muy ligero (calienta CDN)
    fetch(url, { method: "HEAD", mode: "no-cors" }).catch(() => {});
  } catch {
    // noop
  }
}

export default function PortfolioModal() {
  const [modalItem, setModalItem] = useState<PortfolioItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [filter, setFilter] = useState<"Todo" | PortfolioItem["category"]>("Todo");

  // Cover loading state (skeleton)
  const [loadedCovers, setLoadedCovers] = useState<Record<string, boolean>>({});

  // Focus management
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalPanelRef = useRef<HTMLDivElement | null>(null);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["Todo", ...Array.from(set)] as const;
  }, []);

  const filtered = useMemo(() => {
    const base = filter === "Todo" ? items : items.filter((i) => i.category === filter);
    // ✅ Featured first, then year desc
    return [...base].sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;

      const ya = Number(a.year ?? 0);
      const yb = Number(b.year ?? 0);
      if (ya !== yb) return yb - ya;

      return a.title.localeCompare(b.title);
    });
  }, [filter]);

  useLockBodyScroll(modalOpen);

  // Open modal
  function open(item: PortfolioItem) {
    setModalItem(item);
    setModalOpen(true);
  }

  // Close modal (animación suave)
  function close() {
    setModalOpen(false);
  }

  // Unmount modal content after animation
  useEffect(() => {
    if (modalOpen) return;
    if (!modalItem) return;

    const t = window.setTimeout(() => {
      setModalItem(null);
    }, 180);

    return () => window.clearTimeout(t);
  }, [modalOpen, modalItem]);

  // ESC para cerrar
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (modalOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  // Focus on open
  useEffect(() => {
    if (!modalOpen) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [modalOpen]);

  // Trap focus (simple)
  useEffect(() => {
    if (!modalOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const root = modalPanelRef.current;
      if (!root) return;

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  const showModal = !!modalItem; // mounted
  const animateIn = modalOpen; // open state

  return (
    <section id="portafolio" className="w-full scroll-mt-24 py-12">
        <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">Portafolio</p>

            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              Reels cinematográficos para marcas
            </h2>

            <p className="mt-3 text-neutral-400 max-w-2xl">
              Contenido vertical optimizado para Instagram: ritmo, retención y estética premium.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const isActive = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={[
                    "rounded-full px-4 py-2 text-sm transition border",
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-white/[0.02] text-white border-white/15 hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const isVideo = item.type === "video";
            const aspectClass = isVideo ? "aspect-[9/16]" : "aspect-[4/5]";
            const coverLoaded = !!loadedCovers[item.id];

            return (
  <button
    key={item.id}
    type="button"
    onClick={() => open(item)}
    onMouseEnter={() => item.type === "video" && warmVideo(item.src)}
    onTouchStart={() => item.type === "video" && warmVideo(item.src)}
    className="group text-left rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] transition shadow-[0_30px_80px_-60px_rgba(0,0,0,0.8)]"
  >
    {/* Media cover */}
    <div className={`relative w-full ${aspectClass} overflow-hidden`}>
      {/* Skeleton placeholder (fade) */}
      <div
        className={[
          "absolute inset-0 bg-white/[0.03] animate-pulse transition-opacity duration-300",
          coverLoaded ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />

      <Image
        src={item.cover}
        alt={item.title}
        fill
        sizes="(max-width: 1024px) 50vw, 33vw"
        className={[
          "object-cover scale-[1.01] group-hover:scale-[1.05] transition duration-500",
          coverLoaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onLoadingComplete={() =>
          setLoadedCovers((p) => ({ ...p, [item.id]: true }))
        }
      />

      {/* Overlay full-height (no se corta) + intensifica en hover */}
      <div
        className={[
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-t from-black/65 via-black/20 to-transparent",
          "transition-opacity duration-300",
          "opacity-90 group-hover:opacity-100",
        ].join(" ")}
      />
      {/* Extra “boost” en hover para que se sienta premium */}
      <div
        className={[
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-t from-black/80 via-transparent to-transparent",
          "transition-opacity duration-300",
          "opacity-0 group-hover:opacity-100",
        ].join(" ")}
      />

      {/* Top chips */}
      <div className="absolute left-4 top-4 flex gap-2">
        <span className="rounded-full bg-black/40 border border-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
          {item.category}
        </span>

        {isVideo && (
          <span className="rounded-full bg-black/40 border border-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
            Reel
          </span>
        )}
      </div>
    </div>

    {/* Text */}
    <div className="p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold tracking-tight">{item.title}</h3>
        <span className="text-xs text-neutral-400">{item.year}</span>
      </div>

      <p className="mt-2 text-sm text-neutral-400">
        {item.client ? `${item.client} · ` : ""}
        {item.role ?? "Dirección · Cámara · Edición"}
      </p>

      {item.highlight && (
        <p className="mt-3 text-sm text-neutral-300">{item.highlight}</p>
      )}
    </div>
  </button>
);

          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && modalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Reel: ${modalItem.title}`}
          className={[
            "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm",
            "transition-opacity duration-200",
            animateIn ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="h-full w-full flex items-center justify-center p-4">
            <div
              ref={modalPanelRef}
              className={[
                "w-full max-w-5xl rounded-3xl border border-white/10 bg-[#0B0B0F] overflow-hidden",
                "shadow-[0_60px_160px_-80px_rgba(0,0,0,0.9)]",
                "transform transition-transform duration-200",
                "max-h-[calc(100vh-2rem)] flex flex-col",
                animateIn ? "scale-100" : "scale-[0.98]",
              ].join(" ")}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
                <div className="min-w-0">
                  <div className="text-sm text-neutral-400">
                    {modalItem.category}
                    {modalItem.client ? ` · ${modalItem.client}` : ""}
                    {modalItem.year ? ` · ${modalItem.year}` : ""}
                  </div>
                  <div className="truncate font-semibold">{modalItem.title}</div>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  className="rounded-2xl px-4 py-2 text-sm border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] transition focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Cerrar (ESC)
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y lg:overflow-hidden">
              <div className="grid lg:grid-cols-2 lg:h-full">

                {/* Media */}
                <div className="relative bg-black">
                  <div className="relative w-full aspect-[9/16] lg:aspect-auto lg:h-[70vh]">
                    {modalItem.type === "video" ? (
                      <video
                        key={modalItem.src}
                        src={modalItem.src}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={modalItem.cover}
                        className="absolute inset-0 h-full w-full object-contain"
                        onPlay={() => warmVideo(modalItem.src)}
                      />
                    ) : (
                      <Image
                        src={modalItem.src}
                        alt={modalItem.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-2rem-64px)] lg:max-h-none">
                  <div className="flex flex-wrap gap-2">
                    {modalItem.role && (
                      <span className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs text-neutral-200">
                        {modalItem.role}
                      </span>
                    )}
                    {modalItem.highlight && (
                      <span className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs text-neutral-200">
                        {modalItem.highlight}
                      </span>
                    )}
                  </div>

                  <p className="mt-6 text-neutral-300 leading-relaxed">
                    {modalItem.description ?? DEFAULT_REEL_DESCRIPTION}
                  </p>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-sm text-neutral-400">
                      ¿Quieres algo similar? Escríbeme y lo aterrizamos rápido.
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                   </div>
  <button
    type="button"
    onClick={() => {
      close();
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 220);
    }}
    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium bg-white text-black hover:opacity-90 transition"
  >
    Ir a contacto
  </button>

  <button
    type="button"
    onClick={() => {
      close();
      setTimeout(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      }, 220);
    }}
    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] transition"
  >
    Ver más trabajos
  </button>
</div>
                  </div>
                </div>
              </div>
              {/* /Content */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
