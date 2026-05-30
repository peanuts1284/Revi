import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Revi",
  description: "Terms and conditions for using the Revi service.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: (
      <p>By accessing or using Revi (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use the Service. These Terms apply to all visitors, users, and others who access the Service. If you are using the Service on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.</p>
    ),
  },
  {
    title: "Description of Service",
    body: (
      <>
        <p>Revi is a review management platform that connects to your Apple App Store Connect and Google Play Console accounts via their respective official APIs to import, display, and help you manage customer reviews. The Service provides:</p>
        <ul>
          <li>A unified dashboard for viewing App Store and Google Play reviews.</li>
          <li>AI-generated reply suggestions for customer reviews.</li>
          <li>Sentiment analysis and trend reporting based on your review data.</li>
          <li>An AI chat assistant for querying your review data.</li>
          <li>An update advisor that surfaces prioritised improvement suggestions.</li>
          <li>Social media content generation from review excerpts.</li>
        </ul>
        <p className="mt-4">Revi is an independent service and is not affiliated with, endorsed by, or sponsored by Apple Inc. or Google LLC.</p>
      </>
    ),
  },
  {
    title: "Account Registration",
    body: (
      <>
        <p>To use the Service you must create an account with a valid email address and password. You are responsible for:</p>
        <ul>
          <li>Maintaining the confidentiality of your account credentials.</li>
          <li>All activity that occurs under your account.</li>
          <li>Notifying us immediately at <a href="mailto:hello@revi.dev" className="text-gold hover:underline">hello@revi.dev</a> if you suspect unauthorised access.</li>
        </ul>
        <p className="mt-4">You must provide accurate and complete information when registering. Accounts created using false information may be terminated without notice.</p>
      </>
    ),
  },
  {
    title: "User Responsibilities",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service in any way that violates applicable laws or regulations.</li>
          <li>Use the Service to send spam, harass, or abuse other users or reviewers.</li>
          <li>Attempt to gain unauthorised access to any part of the Service or its infrastructure.</li>
          <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
          <li>Use the Service to publish or distribute content that infringes intellectual property rights.</li>
          <li>Share your account with others or resell access to the Service.</li>
          <li>Use the Service in a manner that could damage, disable, or impair it.</li>
        </ul>
        <p className="mt-4">You are responsible for any replies you publish to the App Store or Google Play through Revi. AI-generated suggestions are starting points — you are solely responsible for reviewing and approving all content before publishing.</p>
      </>
    ),
  },
  {
    title: "API Connections and Third-Party Services",
    body: (
      <>
        <p>To use core features of Revi, you must authorise Revi to access your App Store Connect and/or Google Play Console accounts. By connecting these accounts, you:</p>
        <ul>
          <li>Grant Revi permission to read and manage your app reviews via the relevant APIs.</li>
          <li>Confirm that you have the necessary rights and permissions to grant such access.</li>
          <li>Acknowledge that Apple and Google may revoke or change API access at any time, which may affect Service functionality.</li>
        </ul>
        <p className="mt-4">You may revoke Revi&apos;s access to these accounts at any time through your Apple or Google developer account settings. Revocation will prevent Revi from importing new reviews but will not automatically delete previously imported data.</p>
      </>
    ),
  },
  {
    title: "Payment Terms",
    body: (
      <>
        <p>Revi offers the following subscription plans, billed monthly:</p>
        <ul>
          <li><strong>Starter — $49/month.</strong> Includes core features as described on the pricing page.</li>
          <li><strong>Growth — $99/month.</strong> Includes all Starter features plus advanced analytics and higher AI reply limits.</li>
          <li><strong>Pro — $249/month.</strong> Includes all Growth features plus unlimited replies, competitor tracking, and priority support.</li>
        </ul>
        <p className="mt-4">All prices are in US dollars and exclude applicable taxes. Subscriptions renew automatically on the same date each month until cancelled. Payments are processed by Stripe. By subscribing, you authorise us to charge your payment method on a recurring basis.</p>
        <p className="mt-4">We reserve the right to change pricing with 30 days&apos; written notice. Price changes will not affect your current billing period.</p>
      </>
    ),
  },
  {
    title: "Cancellation and Refunds",
    body: (
      <>
        <p>You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of your current billing period — you retain access to paid features until then.</p>
        <p className="mt-4">We do not offer refunds for partial billing periods. If you believe you have been charged in error, contact us within 14 days at <a href="mailto:hello@revi.dev" className="text-gold hover:underline">hello@revi.dev</a> and we will review your case.</p>
        <p className="mt-4">If we cancel your account due to a violation of these Terms, no refund will be issued.</p>
      </>
    ),
  },
  {
    title: "Intellectual Property",
    body: (
      <>
        <p><strong>Your data.</strong> You own the review data imported from your connected app store accounts and any content you create using the Service. You grant Revi a limited licence to store, process, and display your data solely to provide the Service.</p>
        <p className="mt-4"><strong>Our IP.</strong> Revi owns all rights in the Service, including its software, design, trademarks, and documentation. These Terms do not grant you any right to use Revi&apos;s name, logo, or branding.</p>
        <p className="mt-4"><strong>Feedback.</strong> If you submit ideas, suggestions, or feedback about the Service, you grant Revi the right to use that feedback without restriction or compensation.</p>
      </>
    ),
  },
  {
    title: "Disclaimer of Warranties",
    body: (
      <p>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or free from harmful components. AI-generated content — including reply suggestions, summaries, and update recommendations — is provided for informational purposes only and may contain inaccuracies. You use it at your own discretion and risk.</p>
    ),
  },
  {
    title: "Limitation of Liability",
    body: (
      <>
        <p>To the maximum extent permitted by applicable law, Revi and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, loss of data, or business interruption, arising out of or related to your use of the Service.</p>
        <p className="mt-4">Our total liability to you for any claim arising from or related to these Terms or the Service shall not exceed the amount you paid to Revi in the 12 months preceding the claim, or $100, whichever is greater.</p>
        <p className="mt-4">Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so the above may not apply to you in full.</p>
      </>
    ),
  },
  {
    title: "Indemnification",
    body: (
      <p>You agree to indemnify and hold harmless Revi and its affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of the Service, your violation of these Terms, or your infringement of any third-party rights.</p>
    ),
  },
  {
    title: "Termination",
    body: (
      <>
        <p>We may suspend or terminate your account at any time, with or without cause, and with or without notice, including for violation of these Terms. Upon termination:</p>
        <ul>
          <li>Your right to use the Service ceases immediately.</li>
          <li>We may delete your account data after 30 days, except where retention is required by law.</li>
          <li>Provisions of these Terms that by their nature should survive termination will remain in effect.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Governing Law",
    body: (
      <p>These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be resolved exclusively in the state or federal courts located in Delaware, and you consent to personal jurisdiction in those courts.</p>
    ),
  },
  {
    title: "Changes to Terms",
    body: (
      <p>We may update these Terms from time to time. We will notify you of material changes by email or through a notice in the Revi dashboard at least 14 days before changes take effect. Your continued use of the Service after changes take effect constitutes your acceptance of the revised Terms. If you do not agree to the changes, you must stop using the Service and cancel your subscription before the effective date.</p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>Questions about these Terms? Contact us at <a href="mailto:hello@revi.dev" className="text-gold hover:underline">hello@revi.dev</a>.</p>
    ),
  },
];

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-3 text-[13px] text-ink">Effective date: May 30, 2026</p>
        </div>

        <div className="mb-12 h-px bg-forest" />

        <p className="mb-12 text-[15px] leading-[1.8] text-sage">
          Please read these Terms of Service carefully before using Revi. These Terms constitute a legally binding agreement between you and Revi regarding your use of the Service.
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
