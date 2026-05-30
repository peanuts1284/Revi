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
      subject: `New Revi waitlist signup: ${email}`,
      html:    confirmationHtml(email, timestamp),
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

function confirmationHtml(email: string, timestamp: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
</head>
<body style="margin:0;padding:0;background-color:#0F2419;font-family:Georgia,serif;">

<div style="max-width:580px;margin:0 auto;padding:48px 32px;">

<p style="color:#C9A84C;font-size:26px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px;">revi</p>

<p style="color:#3D6B5A;font-size:12px;margin:0 0 8px;letter-spacing:2px;text-transform:uppercase;">App Review Intelligence</p>

<p style="color:#3D6B5A;font-size:12px;margin:0 0 40px;">Signup: ${email} &mdash; ${timestamp}</p>

<div style="border-top:1px solid #1E3D32;margin:0 0 40px;"></div>

<h1 style="color:#F0EDE6;font-size:34px;font-weight:400;margin:0 0 16px;line-height:1.2;">You&rsquo;re on the list.</h1>

<p style="color:#7A9E8E;font-size:16px;line-height:1.7;margin:0 0 32px;">
We&rsquo;re onboarding app developers in waves.
You&rsquo;ll be among the first to know when your spot opens up.</p>

<div style="background:#122B23;border:1px solid #1E3D32;border-radius:12px;padding:24px 28px;margin:0 0 32px;">
<p style="color:#C9A84C;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">What you&rsquo;ll get with Revi</p>
<p style="color:#7A9E8E;font-size:14px;line-height:2;margin:0;">
&#10022; All your App Store and Google Play reviews in one dashboard<br>
&#10022; AI replies to every review in one click<br>
&#10022; Know exactly what to fix next<br>
&#10022; Turn great reviews into social content</p>
</div>

<a href="https://revi-app-mauve.vercel.app" style="display:inline-block;background:#C9A84C;color:#0F2419;font-size:15px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;margin:0 0 40px;letter-spacing:0.3px;">Confirm Your Spot &rarr;</a>

<div style="border-top:1px solid #1E3D32;margin:0 0 24px;"></div>

<p style="color:#3D6B5A;font-size:12px;line-height:1.6;margin:0;">
revi &mdash; built for developers<br>
You received this because someone signed up at revi-app-mauve.vercel.app<br>
<a href="https://revi-app-mauve.vercel.app" style="color:#3D6B5A;">Unsubscribe</a></p>

</div>
</body>
</html>`;
}
