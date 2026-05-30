import AnimateIn from "@/components/AnimateIn";

function IconHub() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="5" height="5" rx="0.75" stroke="#0D1F1A" strokeWidth="1.2" />
      <rect x="8" y="1" width="5" height="5" rx="0.75" stroke="#0D1F1A" strokeWidth="1.2" />
      <rect x="1" y="8" width="5" height="5" rx="0.75" stroke="#0D1F1A" strokeWidth="1.2" />
      <rect x="8" y="8" width="5" height="5" rx="0.75" stroke="#0D1F1A" strokeWidth="1.2" />
    </svg>
  );
}

function IconReplies() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1L8.1 4.3L11.5 4.9L9.1 7.2L9.8 10.7L7 9.1L4.2 10.7L4.9 7.2L2.5 4.9L5.9 4.3L7 1Z"
        stroke="#0D1F1A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSentiment() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1.5 10.5L4.5 7L7 9L10 5L12.5 7" stroke="#0D1F1A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 12.5H12.5" stroke="#0D1F1A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1.5 2.5C1.5 1.95 1.95 1.5 2.5 1.5H11.5C12.05 1.5 12.5 1.95 12.5 2.5V8C12.5 8.55 12.05 9 11.5 9H8L5.5 12.5V9H2.5C1.95 9 1.5 8.55 1.5 8V2.5Z"
        stroke="#0D1F1A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="4.5" cy="5.25" r="0.75" fill="#0D1F1A" />
      <circle cx="7" cy="5.25" r="0.75" fill="#0D1F1A" />
      <circle cx="9.5" cy="5.25" r="0.75" fill="#0D1F1A" />
    </svg>
  );
}

function IconAdvisor() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="#0D1F1A" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="3" stroke="#0D1F1A" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="0.9" fill="#0D1F1A" />
    </svg>
  );
}

function IconSocial() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="11.5" cy="2.5" r="1.5" stroke="#0D1F1A" strokeWidth="1.2" />
      <circle cx="11.5" cy="11.5" r="1.5" stroke="#0D1F1A" strokeWidth="1.2" />
      <circle cx="2.5" cy="7" r="1.5" stroke="#0D1F1A" strokeWidth="1.2" />
      <path d="M4 7L10 3M4 7L10 11" stroke="#0D1F1A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const features = [
  {
    Icon: IconHub,
    title: "Review Hub",
    description: "Every App Store and Google Play review in one clean dashboard. Never miss feedback again.",
  },
  {
    Icon: IconReplies,
    title: "AI Replies",
    description: "Generate thoughtful replies to any review in one click. Sound human, save hours.",
  },
  {
    Icon: IconSentiment,
    title: "Sentiment Analysis",
    description: "See what users love and hate at a glance. Charts, trends, patterns.",
  },
  {
    Icon: IconChat,
    title: "AI Chat Assistant",
    description: "Ask anything. What should I fix? What do users love? Get instant answers from your own review data.",
  },
  {
    Icon: IconAdvisor,
    title: "Update Advisor",
    description: "Stop guessing what to build next. Revi reads your reviews and gives you a prioritized fix list.",
  },
  {
    Icon: IconSocial,
    title: "Social Generator",
    description: "Turn 5-star reviews into ready-to-post social content. One click.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn className="mb-12">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gold/60">
            What you get
          </p>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.08] tracking-tight text-cream">
            Everything in one place
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, description }, i) => (
            <AnimateIn key={title} delay={i * 100} initialY={-40} duration={600} easing="ease-out">
              <div className="group flex h-full flex-col rounded-xl border border-forest bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-xl hover:shadow-black/30">
                <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-gold">
                  <Icon />
                </div>
                <h3 className="mb-2 font-serif text-[16px] tracking-tight text-cream">{title}</h3>
                <p className="text-[13px] leading-[1.65] text-sage/80">{description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
