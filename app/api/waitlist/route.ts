import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE   = "revi-app-mauve.vercel.app";

export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();

  try {
    const body  = await req.json().catch(() => ({}));
    const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, message: "invalid_email" }, { status: 400 });
    }

    // Duplicate check
    const exists = await airtableEmailExists(email);
    if (exists) {
      console.log(`[waitlist] duplicate: ${email}`);
      return NextResponse.json({ success: false, message: "already_on_list" }, { status: 409 });
    }

    // Save to Airtable and notify owner concurrently
    const date = timestamp.slice(0, 10); // YYYY-MM-DD
    await Promise.allSettled([
      airtableInsert(email, date),
      sendNotification(email, timestamp),
    ]);

    console.log(`[waitlist] signup: ${email} at ${timestamp}`);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[waitlist] unexpected error:", err);
    return NextResponse.json({ success: true });
  }
}

// ---------------------------------------------------------------------------
// Airtable helpers
// ---------------------------------------------------------------------------
async function airtableEmailExists(email: string): Promise<boolean> {
  const key   = process.env.AIRTABLE_API_KEY;
  const base  = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME ?? "Signups";

  if (!key || !base) return false;

  const formula = encodeURIComponent(`{Email}="${email}"`);
  const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?filterByFormula=${formula}&maxRecords=1`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
    });

    if (!res.ok) {
      console.error("[waitlist] airtable lookup failed:", res.status, await res.text());
      return false;
    }

    const data = await res.json() as { records: unknown[] };
    return data.records.length > 0;
  } catch (err) {
    console.error("[waitlist] airtable lookup exception:", err);
    return false;
  }
}

async function airtableInsert(email: string, date: string) {
  const key   = process.env.AIRTABLE_API_KEY;
  const base  = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME ?? "Signups";

  if (!key || !base) {
    console.warn("[waitlist] airtable skipped — env vars not set");
    return;
  }

  const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}`;
  const res = await fetch(url, {
    method:  "POST",
    headers: {
      Authorization:  `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [{ fields: { Email: email, Date: date } }],
    }),
  });

  if (!res.ok) {
    console.error("[waitlist] airtable insert failed:", res.status, await res.text());
  } else {
    console.log("[waitlist] ✓ saved to airtable:", email);
  }
}

// ---------------------------------------------------------------------------
// Owner notification email
// ---------------------------------------------------------------------------
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
      html:    notificationHtml(email, timestamp),
    });

    if (result.error) {
      console.error("[waitlist] resend error:", JSON.stringify(result.error));
    } else {
      console.log("[waitlist] ✓ notification sent — id:", result.data?.id);
    }
  } catch (err) {
    console.error("[waitlist] sendNotification exception:", err);
  }
}

function notificationHtml(email: string, timestamp: string): string {
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

<h1 style="color:#F0EDE6;font-size:34px;font-weight:400;margin:0 0 16px;line-height:1.2;">New signup.</h1>
<p style="color:#7A9E8E;font-size:16px;line-height:1.7;margin:0 0 32px;">Someone just joined the Revi waitlist.</p>

<div style="background:#122B23;border:1px solid #1E3D32;border-radius:12px;padding:24px 28px;margin:0 0 32px;">
<p style="color:#C9A84C;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Signup details</p>
<p style="color:#F0EDE6;font-size:16px;font-weight:700;margin:0 0 6px;">${email}</p>
<p style="color:#7A9E8E;font-size:13px;margin:0 0 4px;">${timestamp}</p>
<p style="color:#3D6B5A;font-size:12px;margin:0;">${SOURCE}</p>
</div>

<div style="border-top:1px solid #1E3D32;margin:0 0 24px;"></div>
<p style="color:#3D6B5A;font-size:12px;line-height:1.6;margin:0;">revi &mdash; built for developers</p>

</div>
</body>
</html>`;
}
