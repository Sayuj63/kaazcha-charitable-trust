import { ConflictError, load, save } from "./_lib/store.js";
import { SCHEMAS } from "./_lib/schema.js";
import {
  checkCredentials,
  clearedCookie,
  isAuthed,
  sessionCookie,
} from "./_lib/session.js";
import { isCollection } from "../src/cms/types.js";

const NO_STORE = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { ...NO_STORE, ...headers } });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Single admin endpoint: POST { action, ... }. Every action except `login`
 *  requires the signed session cookie. */
export async function POST(request: Request) {
  // SameSite=Strict cookie + a JSON-only body blocks cross-site form posts.
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json({ error: "Expected JSON" }, 415);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Bad JSON" }, 400);
  }

  if (body.action === "login") {
    const ok = checkCredentials(String(body.username ?? ""), String(body.password ?? ""));
    if (!ok) {
      await sleep(1200); // slow down guessing
      return json({ error: "Wrong username or password" }, 401);
    }
    return json({ ok: true }, 200, { "Set-Cookie": sessionCookie() });
  }

  if (body.action === "logout")
    return json({ ok: true }, 200, { "Set-Cookie": clearedCookie() });

  if (!isAuthed(request)) return json({ error: "Not signed in" }, 401);

  if (body.action === "me") return json({ ok: true });

  const collection = body.collection;
  if (!isCollection(collection)) return json({ error: "Unknown collection" }, 400);

  if (body.action === "load") {
    const { items, etag } = await load(collection);
    return json({ items, etag });
  }

  if (body.action === "save") {
    const parsed = SCHEMAS[collection].safeParse(body.items);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return json(
        { error: `${issue?.message ?? "Invalid data"} (${issue?.path.join(".")})` },
        400,
      );
    }
    const etag = typeof body.etag === "string" ? body.etag : null;
    try {
      const next = await save(collection, parsed.data as never, etag);
      return json({ ok: true, etag: next, items: parsed.data });
    } catch (err) {
      if (err instanceof ConflictError)
        return json(
          { error: "Someone else saved changes first. Reload and try again." },
          409,
        );
      throw err;
    }
  }

  return json({ error: "Unknown action" }, 400);
}
