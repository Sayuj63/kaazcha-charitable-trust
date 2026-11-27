import { z } from "zod";

import { storeMessage } from "./_lib/messages.js";

const field = (max: number) => z.string().trim().max(max);

const schema = z.object({
  name: field(120).min(1),
  email: z.string().trim().max(200).email(),
  phone: field(40).optional(),
  organisation: field(200).optional(),
  interest: field(100).optional(),
  subject: field(200).optional(),
  message: field(5000).min(1),
  lang: z.enum(["en", "ml"]).optional(),
  /** Honeypot: hidden from people; bots that fill it are dropped. */
  website: z.string().optional(),
});

/** Public endpoint for the "Send us a message" form. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });

  const { website, ...data } = parsed.data;
  // Pretend success to bots so they don't retry.
  if (website) return Response.json({ ok: true });

  const clean = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== "" && v !== undefined),
  ) as typeof data;
  await storeMessage({ ...clean, receivedAt: Date.now() });
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
