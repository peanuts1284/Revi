import AnimateIn from "@/components/AnimateIn";

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for solo developers.",
    featured: false,
    features: [
      "Connect App Store + Google Play",
      "All reviews dashboard",
      "AI reply generator",
      "100 AI replies / month",
      "AI chat assistant",
    ],
  },
  {
    name: "Growth",
    price: "$99",
    description: "For developers serious about growth.",
    featured: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Sentiment analysis",
      "Update advisor",
      "Social media generator",
      "500 AI replies / month",
      "Weekly digest email",
    ],
  },
  {
    name: "Pro",
    price: "$249",
    description: "For studios and power users.",
    featured: false,
    features: [
      "Everything in Growth",
      "Competitor tracking",
      "Screenshot generator",
      "Custom AI tone training",
      "Unlimited replies",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-forest py-28">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn className="mb-3">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gold/60">
            Pricing
          </p>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.08] tracking-tight text-cream">
            Simple, honest pricing
          </h2>
        </AnimateIn>
        <AnimateIn delay={60} className="mb-14">
          <p className="text-[14px] text-sage/70">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {plans.map((plan, i) => (
            <AnimateIn key={plan.name} delay={i * 70}>
              <div
                className={`relative flex h-full flex-col rounded-xl border p-6 transition-all duration-200 ${
                  plan.featured
                    ? "border-gold/45 bg-surface hover:-translate-y-0.5 hover:border-gold/60"
                    : "border-forest bg-surface hover:-translate-y-0.5 hover:border-forest/70"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gold px-3 py-0.5 text-[10px] font-medium tracking-wide text-bg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {plan.featured && (
                  <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
                )}

                <div className="mb-6">
                  <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-sage/60">
                    {plan.name}
                  </div>
                  <div className="mb-1.5 flex items-baseline gap-1">
                    <span className="font-serif text-[36px] leading-none tracking-tight text-cream">
                      {plan.price}
                    </span>
                    <span className="text-[12px] text-sage/40">/month</span>
                  </div>
                  <p className="text-[13px] text-sage/70">{plan.description}</p>
                </div>

                <a
                  href="#waitlist"
                  className={`mb-7 block rounded py-2.5 text-center text-[13px] font-medium transition-all duration-150 hover:scale-[1.02] active:scale-100 ${
                    plan.featured
                      ? "bg-gold text-bg hover:bg-gold-light"
                      : "border border-forest text-sage/70 hover:border-gold/25 hover:text-cream"
                  }`}
                >
                  Join waitlist
                </a>

                <ul className="mt-auto space-y-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <span className="mt-[4px] shrink-0 text-[8px] text-gold/70">✦</span>
                      <span className="text-[12px] leading-snug text-sage/75">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
