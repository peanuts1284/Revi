import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Revi",
  description: "How Revi collects, uses, and protects your data.",
};

const sections = [
  {
    title: "Information We Collect",
    body: (
      <>
        <p>We collect information you provide directly and information generated as you use the service.</p>
        <h4 className="mt-5 mb-2 text-[14px] font-medium text-cream">Information you provide</h4>
        <ul>
          <li><strong>Email address</strong> — collected when you join our waitlist or create an account. Used to communicate product updates, onboarding instructions, and account notices.</li>
          <li><strong>Account credentials</strong> — a password you create when registering. Stored as a salted hash; we never store it in plaintext.</li>
          <li><strong>Billing information</strong> — if you subscribe to a paid plan, payment details are collected and stored by our payment processor (Stripe). Revi does not store full card numbers.</li>
        </ul>
        <h4 className="mt-5 mb-2 text-[14px] font-medium text-cream">Information from connected services</h4>
        <ul>
          <li><strong>App Store Connect</strong> — when you connect your Apple developer account, Revi receives an OAuth access token scoped to reading customer reviews. We import review text, star ratings, reviewer display names, and review dates.</li>
          <li><strong>Google Play Console</strong> — same as above via Google's Play Developer API. We import review content, ratings, and reply status.</li>
          <li>We do not access your app's financial data, sales reports, or any information outside the reviews scope.</li>
        </ul>
        <h4 className="mt-5 mb-2 text-[14px] font-medium text-cream">Usage data</h4>
        <ul>
          <li>Pages visited, features used, and actions taken within the dashboard.</li>
          <li>Browser type, operating system, and IP address.</li>
          <li>Error logs and crash reports to help us improve reliability.</li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    body: (
      <>
        <p>We use collected information to:</p>
        <ul>
          <li>Provide, operate, and improve the Revi service.</li>
          <li>Send transactional emails — account confirmations, password resets, billing receipts.</li>
          <li>Send product update emails and early access notifications to waitlist members. You can unsubscribe at any time.</li>
          <li>Process your review data through AI models to generate reply suggestions, sentiment summaries, and update recommendations.</li>
          <li>Respond to support requests and communicate with you about your account.</li>
          <li>Detect and prevent fraud, abuse, and security incidents.</li>
          <li>Comply with legal obligations.</li>
        </ul>
        <p className="mt-4">We do not sell your personal information to third parties. We do not use your review data to train shared AI models without your explicit consent.</p>
      </>
    ),
  },
  {
    title: "Third-Party Services",
    body: (
      <>
        <p>Revi uses the following third-party processors. Each operates under its own privacy policy.</p>
        <ul>
          <li><strong>Stripe</strong> — payment processing. <a href="https://stripe.com/privacy" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a></li>
          <li><strong>Apple App Store Connect API</strong> — review data retrieval.</li>
          <li><strong>Google Play Developer API</strong> — review data retrieval.</li>
          <li><strong>AI inference providers</strong> — review text is sent to AI providers to generate reply suggestions and summaries. Data is not used to train their base models under our agreements.</li>
          <li><strong>Cloud infrastructure</strong> — servers and databases hosted on SOC 2 compliant cloud providers.</li>
        </ul>
        <p className="mt-4">We only share data with third parties to the extent necessary to provide the service.</p>
      </>
    ),
  },
  {
    title: "Cookies and Tracking",
    body: (
      <>
        <p>Revi uses the following types of cookies:</p>
        <ul>
          <li><strong>Strictly necessary</strong> — session cookies required for authentication and security. These cannot be disabled.</li>
          <li><strong>Functional</strong> — remember your preferences such as dashboard layout and filter settings.</li>
          <li><strong>Analytics</strong> — aggregate, anonymised usage statistics to understand how the product is used. No cross-site tracking.</li>
        </ul>
        <p className="mt-4">We do not use advertising cookies or share cookie data with ad networks. You can control cookies through your browser settings, though disabling strictly necessary cookies will prevent you from logging in.</p>
      </>
    ),
  },
  {
    title: "Data Storage and Security",
    body: (
      <>
        <p>Your data is stored on servers located in the United States. If you are located in the European Economic Area, data transfers are made under Standard Contractual Clauses.</p>
        <p className="mt-4">We implement industry-standard security measures including encryption in transit (TLS 1.2+), encryption at rest, access controls, and regular security reviews. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
      </>
    ),
  },
  {
    title: "Data Retention",
    body: (
      <>
        <p>We retain your personal information for as long as your account is active or as needed to provide the service.</p>
        <ul>
          <li>If you delete your account, we remove your personal data within 30 days, except where retention is required by law or for fraud prevention.</li>
          <li>Waitlist email addresses are retained until you unsubscribe or request deletion.</li>
          <li>Anonymised aggregate usage statistics may be retained indefinitely.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Your Rights",
    body: (
      <>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
          <li><strong>Correction</strong> — request correction of inaccurate data.</li>
          <li><strong>Deletion</strong> — request deletion of your personal data.</li>
          <li><strong>Portability</strong> — request your data in a machine-readable format.</li>
          <li><strong>Objection</strong> — object to processing based on legitimate interests.</li>
          <li><strong>Opt-out of marketing</strong> — unsubscribe from marketing emails at any time using the link in any email we send.</li>
        </ul>
        <p className="mt-4">To exercise any of these rights, contact us at <a href="mailto:hello@revi.dev" className="text-gold hover:underline">hello@revi.dev</a>. We will respond within 30 days.</p>
      </>
    ),
  },
  {
    title: "Children's Privacy",
    body: (
      <p>Revi is not directed to children under 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us and we will delete it promptly.</p>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <p>We may update this Privacy Policy from time to time. We will notify you of material changes by email or by a notice in the Revi dashboard at least 14 days before changes take effect. Your continued use of Revi after changes take effect constitutes acceptance of the updated policy.</p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>Questions about this Privacy Policy? Contact us at <a href="mailto:hello@revi.dev" className="text-gold hover:underline">hello@revi.dev</a>.</p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pb-32 pt-28">
        {/* Back */}
        <a
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-[13px] text-sage transition-colors duration-150 hover:text-cream"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to home
        </a>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] leading-[1.1] tracking-tight text-cream">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[13px] text-ink">Effective date: May 30, 2026</p>
        </div>

        <div className="mb-12 h-px bg-forest" />

        <p className="mb-12 text-[15px] leading-[1.8] text-sage">
          Revi (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the Revi service. This Privacy Policy explains how we collect, use, and protect information about you when you use our website and application. By using Revi, you agree to the practices described in this policy.
        </p>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={section.title} className="border-l border-forest pl-6">
              <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-ink">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h2 className="mb-4 font-serif text-[22px] text-cream">{section.title}</h2>
              <div className="prose-legal">{section.body}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
