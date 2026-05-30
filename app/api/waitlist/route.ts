import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGNUP_FILE = path.join(process.cwd(), "waitlist-signups.txt");

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------
function isDuplicate(email: string): boolean {
  if (!fs.existsSync(SIGNUP_FILE)) return false;
  return fs.readFileSync(SIGNUP_FILE, "utf8")
    .split("\n")
    .some((line) => {
      const tokens = line.trim().split(/\s+/);
      return tokens[tokens.length - 1] === email;
    });
}

function saveEmail(email: string): void {
  fs.appendFileSync(SIGNUP_FILE, `${new Date().toISOString()}  ${email}\n`, "utf8");
}

function countSignups(): number {
  if (!fs.existsSync(SIGNUP_FILE)) return 0;
  return fs.readFileSync(SIGNUP_FILE, "utf8")
    .split("\n")
    .filter((l) => l.trim().length > 0).length;
}

// ---------------------------------------------------------------------------
// Notification email HTML
// ---------------------------------------------------------------------------
// TEMPORARY: Resend free tier can only send to the account owner's verified
// email. Until a sending domain is verified at resend.com/domains, we send
// a single email to NOTIFY_EMAIL that contains both the signup notification
// AND the confirmation content for the user.
// TODO: Once domain is verified, split back into:
//   - confirmationHtml() → to the user's email
//   - plain-text notification → to NOTIFY_EMAIL
function notificationHtml(signupEmail: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0F2419;font-family:Georgia,serif;">
<div style="max-width:560px;margin:0 auto;padding:48px 32px;">

<p style="color:#C9A84C;font-size:24px;font-weight:bold;margin:0 0 24px;">revi</p>

<hr style="border:none;border-top:1px solid #1E3D32;margin:0 0 32px;"/>

<h1 style="color:#F0EDE6;font-size:20px;margin:0 0 8px;">
New waitlist signup</h1>

<p style="color:#C9A84C;font-size:18px;font-weight:bold;margin:0 0 32px;">
${signupEmail}</p>

<hr style="border:none;border-top:1px solid #1E3D32;margin:0 0 32px;"/>

<h2 style="color:#F0EDE6;font-size:28px;margin:0 0 16px;">
You&rsquo;re on the list.</h2>

<p style="color:#7A9E8E;font-size:16px;line-height:1.6;margin:0 0 24px;">
Thanks for joining the Revi waitlist.
We&rsquo;re onboarding app developers in
waves &mdash; you&rsquo;ll be among the first
to know when your spot is ready.</p>

<p style="color:#F0EDE6;font-size:14px;margin:0 0 8px;">
What Revi does for you:</p>

<p style="color:#7A9E8E;font-size:14px;line-height:2;margin:0 0 32px;">
✦ All App Store and Google Play
reviews in one dashboard<br/>
✦ AI replies to every review
in one click<br/>
✦ Understand what users love and hate<br/>
✦ Know exactly what to build next</p>

<hr style="border:none;border-top:1px solid #1E3D32;margin:0 0 24px;"/>

<p style="color:#3D6B5A;font-size:12px;margin:0;">
revi &mdash; built for developers<br/>
You received this because you signed
up at revi.vercel.app</p>

</div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// POST /api/waitlist
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  console.log("\n[waitlist] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("[waitlist] route hit —", new Date().toISOString());

  try {
    // 1. Parse + validate
    const body  = await req.json().catch(() => ({}));
    const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();
    console.log("[waitlist] email received:", email || "(empty)");

    if (!email || !EMAIL_RE.test(email)) {
      console.log("[waitlist] ✗ invalid email format");
      return NextResponse.json({ success: false, message: "invalid_email" }, { status: 400 });
    }

    // 2. Duplicate check
    if (isDuplicate(email)) {
      console.log("[waitlist] ✗ duplicate — already in file");
      return NextResponse.json({ success: false, message: "already_on_list" }, { status: 409 });
    }

    // 3. Persist
    saveEmail(email);
    const total = countSignups();
    console.log("[waitlist] ✓ saved to file — total signups:", total);

    // 4. Env var check
    const apiKey      = process.env.RESEND_API_KEY;
    const from        = process.env.RESEND_FROM_EMAIL
                        ? `Revi <${process.env.RESEND_FROM_EMAIL}>`
                        : "Revi <onboarding@resend.dev>";
    const notifyEmail = process.env.NOTIFY_EMAIL ?? "";

    console.log("[waitlist] RESEND_API_KEY present:", !!apiKey);
    console.log("[waitlist] RESEND_API_KEY prefix:", apiKey ? apiKey.slice(0, 8) + "…" : "NOT SET");
    console.log("[waitlist] from:", from);
    console.log("[waitlist] notify:", notifyEmail || "(not set)");

    if (!apiKey) {
      console.warn("[waitlist] ✗ no API key — email skipped, spot saved");
      return NextResponse.json({ success: true, emailSkipped: true, reason: "no_api_key" });
    }

    const resend = new Resend(apiKey);

    // 5. Send combined notification + confirmation content to NOTIFY_EMAIL.
    // TEMPORARY: Resend free tier blocks sending to unverified addresses.
    // We route the email to NOTIFY_EMAIL (the account owner's address) which
    // is always allowed. The email body includes the user's signup address and
    // the full confirmation content so it can be forwarded manually if needed.
    // TODO: Once a sending domain is verified at resend.com/domains, send
    //   a proper confirmation directly to `email` and a plain notification to
    //   `notifyEmail`.
    if (!notifyEmail) {
      console.warn("[waitlist] ✗ NOTIFY_EMAIL not set — cannot send email on free tier");
      return NextResponse.json({ success: true, emailSkipped: true, reason: "no_notify_email" });
    }

    console.log("[waitlist] sending signup notification to owner:", notifyEmail);
    const sendResult = await resend.emails.send({
      from,
      to:      notifyEmail,
      subject: `New waitlist signup: ${email}`,
      html:    notificationHtml(email),
    });
    console.log("[waitlist] send result:", JSON.stringify(sendResult));

    if (sendResult.error) {
      console.error("[waitlist] ✗ send failed:", JSON.stringify(sendResult.error));
      return NextResponse.json({
        success: true,
        emailSkipped: true,
        reason: "resend_error",
        resendError: sendResult.error,
      });
    }

    console.log("[waitlist] ✓ notification sent — id:", sendResult.data?.id);
    console.log("[waitlist] ✓ done\n");
    return NextResponse.json({ success: true, emailSkipped: false });

  } catch (err) {
    console.error("[waitlist] ✗ unexpected exception:", err);
    return NextResponse.json(
      { success: false, message: "server_error", detail: String(err) },
      { status: 500 }
    );
  }
}
