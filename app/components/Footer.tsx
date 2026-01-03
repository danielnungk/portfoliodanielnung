export default function Footer() {
  return (
    <footer className="px-6 py-7">
      <div className="mx-auto max-w-6xl text-center text-sm text-white/50">
        <div className="border-t border-white/10 pt-8">
          <p>© {new Date().getFullYear()} Danielnung</p>
          <p className="mt-1">
            Filmmaker & Photographer · Torreón, MX
          </p>

          <div className="mt-4 flex justify-center gap-6">
            <a
              href="https://instagram.com/danielnung"
              target="_blank"
              className="hover:text-white transition"
            >
              Instagram
            </a>
            <a
              href="mailto:josedanielnunezgomez@gmail.com"
              className="hover:text-white transition"
            >
              Email
            </a>
            <a
              href="https://wa.me/5218721150538"
              target="_blank"
              className="hover:text-white transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
