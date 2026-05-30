import Typewriter from "@/components/Typewriter";

const HEADLINE = "Your users are telling you how to build a better app.";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center pt-14">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 52%, rgba(26,61,45,0.55) 0%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-28 text-center">
        {/* Badge */}
        <div
          className="hero-in mb-7 inline-flex items-center gap-1.5 rounded-full border border-gold/25 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.08em] text-gold uppercase"
          style={{ background: "rgba(201,168,76,0.06)" }}
        >
          <span className="h-1 w-1 rounded-full bg-gold/70" aria-hidden="true" />
          Early Access
        </div>

        {/* Headline */}
        <h1
          className="hero-in-1 mx-auto max-w-3xl font-serif text-[clamp(34px,6.5vw,66px)] leading-[1.08] tracking-tight text-cream mb-6"
          aria-label={HEADLINE}
        >
          <Typewriter text={HEADLINE} speed={40} />
        </h1>

        {/* Subheadline */}
        <p className="hero-in-2 mx-auto max-w-[500px] text-[16px] leading-relaxed text-sage/90 mb-9">
          The review management platform for app developers who want to grow faster.
        </p>

        {/* CTAs */}
        <div className="hero-in-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#waitlist"
            className="rounded bg-gold px-8 py-3 text-[14px] font-medium text-bg transition-all duration-150 hover:scale-[1.02] hover:bg-gold-light active:scale-100"
          >
            Join the waitlist
          </a>
          <a
            href="#how-it-works"
            className="rounded border border-cream/15 px-8 py-3 text-[14px] text-cream/50 transition-all duration-150 hover:border-cream/35 hover:text-cream/90"
          >
            See how it works
          </a>
        </div>

        {/* Trust line */}
        <div className="hero-in-3 mt-7 flex items-center justify-center gap-4 text-[11px] text-sage/35">
          <span>No card required</span>
          <span className="text-forest">·</span>
          <span>Free to start</span>
          <span className="text-forest">·</span>
          <span>Live in 30 seconds</span>
        </div>
      </div>
    </section>
  );
}
