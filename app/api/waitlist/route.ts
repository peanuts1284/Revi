import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();

  try {
    const body  = await req.json().catch(() => ({}));
    const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();

    // Invalid format — only case we return an error to the user
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, message: "invalid_email" }, { status: 400 });
    }

    // Log to Vercel function logs — visible in the Vercel dashboard
    console.log(`[waitlist] signup: ${email} at ${timestamp}`);

    // Fire-and-forget email — never let this fail the request
    void sendNotification(email, timestamp);

    return NextResponse.json({ success: true });

  } catch (err) {
    // Log the error but still return success so the user sees the confirmation
    console.error("[waitlist] unexpected error:", err);
    return NextResponse.json({ success: true });
  }
}

async function sendNotification(email: string, timestamp: string) {
  const apiKey      = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    console.warn("[waitlist] email skipped — RESEND_API_KEY or NOTIFY_EMAIL not set");
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL
    ? `Revi <${process.env.RESEND_FROM_EMAIL}>`
    : "Revi <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to:      notifyEmail,
      subject: "New Revi waitlist signup",
      text:    `Email: ${email}\nTime: ${timestamp}`,
    });

    if (result.error) {
      console.error("[waitlist] resend error:", JSON.stringify(result.error));
    } else {
      console.log("[waitlist] notification sent — id:", result.data?.id);
    }
  } catch (err) {
    console.error("[waitlist] sendNotification exception:", err);
  }
}
