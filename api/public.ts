import { loadPublic } from "./_lib/store.js";

/** Public, CDN-cached reads for the website.
 *  GET /api/public?c=media              → magazines, articles, albums
 *  GET /api/public?c=person&slug=<slug> → one published personality */
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

  return Response.json({ error: "Unknown request" }, { status: 400 });
}
