"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-14 transition-all duration-200 ${
        scrolled
          ? "border-b border-forest bg-bg/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <a href="/" className="select-none font-serif text-[21px] tracking-normal text-cream" aria-label="Revi">
          rev
          <span className="relative inline-block">
            i
            <span
              className="absolute left-0 right-0 bg-gold"
              style={{ bottom: "2px", height: "1px" }}
              aria-hidden="true"
            />
          </span>
        </a>

        <a
          href="#waitlist"
          className="rounded border border-gold/45 px-4 py-1.5 text-[13px] font-medium text-gold transition-all duration-150 hover:scale-[1.02] hover:border-gold hover:bg-gold hover:text-bg active:scale-100"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}
