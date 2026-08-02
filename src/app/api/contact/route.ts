import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  if (parsed.data.company) {
    // Honeypot triggered — silently report success so bots don't learn.
    return NextResponse.json({ success: true });
  }

  // No transactional email provider is configured for this template.
  // Wire up a provider (e.g. Resend, Postmark, SendGrid) here and forward
  // `parsed.data` to it. For now, submissions are logged server-side only.
  console.info("[contact] New message:", {
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
  });

  return NextResponse.json({ success: true });
}
