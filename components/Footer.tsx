export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-forest">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
        <a href="/" className="select-none font-serif text-[18px] text-cream/80" aria-label="Revi">
          rev
          <span className="relative inline-block">
            i
            <span
              className="absolute left-0 right-0 bg-gold/70"
              style={{ bottom: "2px", height: "1px" }}
              aria-hidden="true"
            />
          </span>
        </a>

        <p className="text-[11px] text-sage/30">© {year} Revi</p>

        <div className="flex items-center gap-4 text-[11px] text-sage/35">
          <a href="/privacy" className="transition-colors duration-150 hover:text-sage/70">Privacy</a>
          <span className="text-forest">·</span>
          <a href="/terms" className="transition-colors duration-150 hover:text-sage/70">Terms</a>
        </div>
      </div>
    </footer>
  );
}
