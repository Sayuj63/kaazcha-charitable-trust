import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

import { isAuthed } from "./_lib/session.js";

/** Issues short-lived client-upload tokens so the admin can send images and
 *  PDFs straight to Vercel Blob (no 4.5 MB function body limit). */
export async function POST(request: Request) {
  if (!isAuthed(request))
    return Response.json({ error: "Not signed in" }, { status: 401 });

  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("uploads/")) throw new Error("Bad path");
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "application/pdf",
          ],
          maximumSizeInBytes: 50 * 1024 * 1024,
          addRandomSuffix: true,
          // Uploaded files never change in place, so cache them for a year.
          cacheControlMaxAge: 60 * 60 * 24 * 365,
        };
      },
    });
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 400 },
    );
  }
}
