import { loadPublic } from "./_lib/store.js";

/** Public, CDN-cached reads for the website.
 *  GET /api/public?c=media              → magazines, articles, albums
 *  GET /api/public?c=person&slug=<slug> → one published personality
 *  GET /api/public?c=bar                → event in the announcement bar
 *  GET /api/public?c=event&slug=<slug>  → one event page */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const headers = {
    "Cache-Control": "public, max-age=0, s-maxage=30, stale-while-revalidate=300",
  };

  if (params.get("c") === "media") {
    const [magazines, articles, albums] = await Promise.all([
      loadPublic("magazines"),
      loadPublic("articles"),
      loadPublic("albums"),
    ]);
    return Response.json(
      { magazines, articles, albums },
      { headers },
    );
  }

  if (params.get("c") === "person") {
    const slug = (params.get("slug") ?? "").toLowerCase();
    const items = await loadPublic("people");
    const person = items.find(
      (p) => p.published && (p.slug === slug || p.aliases.includes(slug)),
    );
    if (!person) return Response.json({ error: "Not found" }, { status: 404, headers });
    return Response.json({ person }, { headers });
  }

  // The event promoted in the announcement bar (or null).
  if (params.get("c") === "bar") {
    const events = await loadPublic("events");
    const event = events.find((e) => e.showInBar) ?? null;
    return Response.json({ event }, { headers });
  }

  if (params.get("c") === "event") {
    const slug = (params.get("slug") ?? "").toLowerCase();
    const event = (await loadPublic("events")).find((e) => e.slug === slug);
    if (!event) return Response.json({ error: "Not found" }, { status: 404, headers });
    return Response.json({ event }, { headers });
  }

  return Response.json({ error: "Unknown request" }, { status: 400 });
}
