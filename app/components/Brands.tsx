// app/components/Brands.tsx
"use client";

const brands = [
  { name: "Ducati", src: "/brands/ducativ1.png" },
  { name: "CFMOTO", src: "/brands/cfmotov1.png" },
  { name: "GAC", src: "/brands/gacv1.png" },
  { name: "Changan", src: "/brands/changanv1.png" },
];

export default function Brands() {
  return (
    <section id="brands" className="w-full py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">
            Colaboraciones
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Marcas con las que he trabajado
          </h2>

          <p className="mt-4 text-neutral-400">
            Algunas de las marcas y empresas con las que he colaborado en foto y video.
          </p>
        </div>

        {/* Card */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10 shadow-[0_30px_90px_-70px_rgba(0,0,0,0.9)]">
          {/* Logos grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-10 items-center">
            {brands.map((b) => (
              <div
                key={b.name}
                className="group flex items-center justify-center"
                title={b.name}
              >
                <div className="relative h-[56px] w-[160px] sm:h-[64px] sm:w-[180px]">
                  <img
                    src={b.src}
                    alt={`${b.name} logo`}
                    loading="lazy"
                    draggable={false}
                    className="
                      h-full w-full object-contain
                      opacity-90 group-hover:opacity-100
                      transition duration-300
                      select-none
                    "
                    onError={(e) => {
                      // Si algo falla, al menos lo verás en consola
                      console.error(`Logo no encontrado: ${b.src}`);
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.15";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-sm text-neutral-500">
              Desde 2021 colaborando con marcas en proyectos comerciales de foto y video para redes sociales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
