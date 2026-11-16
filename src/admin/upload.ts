import { upload } from "@vercel/blob/client";

/** Downscale an image in the browser before upload (keeps phone photos from
 *  being 8 MB). Returns JPEG unless the source is a PNG with transparency
 *  we'd otherwise flatten — PNGs stay PNG. */
async function resize(file: File, maxEdge: number, quality = 0.86): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const keepPng = file.type === "image/png";
  if (scale === 1 && (keepPng || file.type === "image/jpeg") && file.size < 1.5e6) {
    bitmap.close();
    return file;
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  if (!keepPng) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not process image"))),
      keepPng ? "image/png" : "image/jpeg",
      quality,
    ),
  );
}

function baseName(file: File) {
  return (
    file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image"
  );
}

async function send(folder: string, name: string, body: Blob) {
  const ext = body.type === "image/png" ? "png" : body.type === "application/pdf" ? "pdf" : "jpg";
  const result = await upload(`uploads/${folder}/${name}.${ext}`, body, {
    access: "public",
    handleUploadUrl: "/api/upload",
    contentType: body.type,
  });
  return result.url;
}

export async function uploadImage(file: File, folder: string, maxEdge = 2000) {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file");
  return send(folder, baseName(file), await resize(file, maxEdge));
}

/** Full-size photo plus a small square-grid thumbnail. */
export async function uploadPhoto(file: File, folder: string) {
  const name = baseName(file);
  const [src, thumb] = await Promise.all([
    resize(file, 2000).then((b) => send(folder, name, b)),
    resize(file, 640, 0.8).then((b) => send(`${folder}/thumbs`, name, b)),
  ]);
  return { src, thumb };
}
