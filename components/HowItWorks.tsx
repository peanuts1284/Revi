import AnimateIn from "@/components/AnimateIn";
import CounterStat from "@/components/CounterStat";

const steps = [
  {
    number: "1",
    title: "Connect",
    description:
      "Paste your App Store or Google Play link. Revi scans your app and imports all your reviews automatically. Takes 30 seconds.",
    badge: "Setup: 30 seconds",
  },
  {
    number: "2",
    title: "Understand",
    description:
      "Revi's AI reads every review and builds a complete picture of what your users think. Sentiment trends, feature requests, bug reports — all organized automatically.",
    badge: "Saves 3 hrs/week",
  },
  {
    number: "3",
    title: "Act",
    description:
      "Reply to reviews, generate social posts, and get a prioritized list of what to build next. All from one dashboard.",
    badge: "Saves 5 hrs/week",
  },
];

function Step({ step, number }: { step: (typeof steps)[0]; number: number }) {
  return (
    <div>
      <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-full border border-forest bg-bg">
        <span className="font-serif text-[14px] text-gold">{number}</span>
      </div>

      <h3 className="mb-2.5 font-serif text-[20px] leading-snug tracking-tight text-cream">
        {step.title}
      </h3>
      <p className="mb-5 text-[13px] leading-[1.75] text-sage/80">
        {step.description}
      </p>

      <div
        className="inline-flex items-center rounded-full border border-gold/20 px-2.5 py-1"
        style={{ background: "rgba(201,168,76,0.05)" }}
      >
        <span className="text-[10px] font-medium tracking-wide text-gold/80">{step.badge}</span>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-forest py-28">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn className="mb-16">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gold/60">
            The process
          </p>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.08] tracking-tight text-cream">
            How Revi works
          </h2>
        </AnimateIn>

        {/* Desktop: 3-col with connector lines */}
        <div className="hidden items-start gap-0 lg:flex">
          <AnimateIn className="flex-1">
            <Step step={steps[0]} number={1} />
          </AnimateIn>

          <div className="flex w-14 shrink-0 items-start justify-center" style={{ paddingTop: "16px" }}>
            <div className="h-px w-full bg-forest/60" />
          </div>

          <AnimateIn className="flex-1" delay={130}>
            <Step step={steps[1]} number={2} />
          </AnimateIn>

          <div className="flex w-14 shrink-0 items-start justify-center" style={{ paddingTop: "16px" }}>
            <div className="h-px w-full bg-forest/60" />
          </div>

          <AnimateIn className="flex-1" delay={260}>
            <Step step={steps[2]} number={3} />
          </AnimateIn>
        </div>

        {/* Mobile: stacked with vertical thread */}
        <div className="flex flex-col gap-0 lg:hidden">
          {steps.map((step, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest bg-bg">
                    <span className="font-serif text-[14px] text-gold">{i + 1}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-3 w-px flex-1 bg-forest/50" style={{ minHeight: "40px" }} />
                  )}
                </div>
                <div className={i < steps.length - 1 ? "pb-10" : ""}>
                  <Step step={step} number={i + 1} />
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Stat */}
        <AnimateIn className="mt-20 text-center" delay={80}>
          <div className="mx-auto mb-8 h-px max-w-[120px] bg-forest/40" />
          <div className="font-serif text-[clamp(52px,9vw,88px)] leading-none text-gold mb-3">
            <CounterStat end={8} suffix="+" duration={1500} /> hours
          </div>
          <p className="text-[16px] font-light text-cream">saved every week</p>
          <p className="mt-2 text-[12px] text-sage/40">
            Time you could spend building instead of managing
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
