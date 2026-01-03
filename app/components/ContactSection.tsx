export default function ContactSection() {
  const whatsappNumber = "5218721150538";
  const whatsappText = encodeURIComponent(
    "Hola Daniel, vi tu portafolio y me interesa cotizar un proyecto de foto/video."
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
  const email = "josedanielnunezgomez@gmail.com";
  const instagram = "https://instagram.com/danielnung";

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-32">
      <div className="mx-auto max-w-6xl text-center">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-semibold">
          ¿Tienes un proyecto en mente?
        </h2>

        <p className="mt-3 text-white/60 max-w-xl mx-auto">
          Trabajo con marcas, agencias y proyectos creativos en foto y video.
          Escríbeme y vemos cómo llevarlo a algo visualmente sólido.
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* WhatsApp — CTA PRINCIPAL */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl bg-white text-black p-7 transition hover:bg-white/90 text-left"
          >
            <p className="text-xs tracking-[0.25em] uppercase opacity-60">
              WhatsApp
            </p>
            <p className="mt-3 text-xl font-semibold">
              Escríbeme directo
            </p>
            <p className="mt-2 text-sm opacity-70">
              Cotizaciones · Proyectos nuevos · Respuesta rápida
            </p>

            <p className="mt-4 text-sm font-medium inline-flex items-center gap-1">
              Iniciar conversación
              <span className="translate-x-0 group-hover:translate-x-1 transition">
                →
              </span>
            </p>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="rounded-2xl border border-white/15 bg-white/5 p-7 transition hover:bg-white hover:text-black text-left"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-white/60">
              Email
            </p>
            <p className="mt-3 text-lg font-medium">
              Enviar brief
            </p>
            <p className="mt-2 text-sm text-white/60">
              Propuestas, archivos o información detallada
            </p>

            <p className="mt-4 text-xs text-white/45 break-all">
              {email}
            </p>
          </a>

          {/* Instagram */}
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/15 bg-white/5 p-7 transition hover:bg-white hover:text-black text-left"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-white/60">
              Instagram
            </p>
            <p className="mt-3 text-lg font-medium">
              @danielnung
            </p>
            <p className="mt-2 text-sm text-white/60">
              Referencias · Mensajes directos
            </p>
          </a>
        </div>

        {/* Footer copy */}
        <p className="mt-12 text-sm text-white/45">
          Torreón, Coahuila · Disponible para proyectos y colaboraciones
        </p>
      </div>
    </section>
  );
}
