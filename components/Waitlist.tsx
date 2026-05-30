"use client";
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";

type Status = "idle" | "loading" | "done" | "already_subscribed" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Waitlist() {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res  = await fetch("/api/waitlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json().catch(() => ({}));

      if (data.message === "already_on_list") {
        setStatus("already_subscribed");
        return;
      }

      if (!res.ok || !data.success) {
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === "error") setStatus("idle");
  };

  const isDone = status === "done" || status === "already_subscribed";

  return (
    <section id="waitlist" className="border-t border-forest py-28">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn>
          <div
            className="rounded-xl border p-8 md:p-12"
            style={{ borderColor: "rgba(201,168,76,0.20)", background: "#122B23" }}
          >
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-gold/60">
              Early access
            </p>
            <h2 className="mb-2.5 font-serif text-[clamp(28px,4vw,42px)] leading-[1.08] tracking-tight text-cream">
              Get early access
            </h2>
            <p className="mb-8 max-w-md text-[14px] leading-relaxed text-sage/75">
              We&apos;re onboarding developers in waves. Join now and be first.
            </p>

            {isDone ? (
              /* ── Success / already-subscribed ── */
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  {status === "done" ? (
                    <>
                      <p className="text-[15px] font-medium text-gold">
                        You&apos;re on the list ✦
                      </p>
                      <p className="mt-1 text-[13px] text-sage/70">
                        Check your inbox for confirmation.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[15px] text-cream">
                        You&apos;re already on the list!
                      </p>
                      <p className="mt-1 text-[13px] text-sage/70">
                        We&apos;ll be in touch soon.
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* ── Form ── */
              <>
                <form
                  onSubmit={submit}
                  className="flex max-w-lg flex-col gap-2.5 sm:flex-row"
                  noValidate
                >
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your@email.com"
                    disabled={status === "loading"}
                    autoComplete="email"
                    className={`flex-1 rounded border bg-bg px-4 py-3 text-[14px] text-cream outline-none placeholder:text-sage/30 transition-colors duration-150 focus:border-gold/40 disabled:opacity-60 ${
                      status === "error" ? "border-red-500/40" : "border-forest"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 rounded bg-gold px-6 py-3 text-[14px] font-medium text-bg transition-all duration-150 hover:scale-[1.02] hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60 active:scale-100"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" />
                          <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Joining…
                      </>
                    ) : (
                      "Join waitlist"
                    )}
                  </button>
                </form>

                {status === "error" && (
                  <p className="mt-2 text-[12px] text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="mt-3.5 text-[11px] text-sage/35">No spam. Ever.</p>
              </>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
