import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router";

const AdminApp = lazy(() => import("./AdminApp"));

/** SHA-256 of the secret admin path. The path itself is never shipped in the
 *  public bundle or the repo, so it can't be read out of the site's code;
 *  the API still checks the session on every request regardless. */
const ADMIN_PATH_SHA256 =
  "97efd0ce0a2b1fb306a1a0aa5ce9c1b9162f9274257908161045ab9191b88878";

async function sha256(text: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Catch-all route: the admin at its secret path, otherwise `fallback`. */
export function AdminGate({ fallback }: { fallback: ReactNode }) {
  const path = useLocation().pathname.replace(/\/+$/, "").toLowerCase();
  const [match, setMatch] = useState<{ path: string; ok: boolean } | null>(null);

  useEffect(() => {
    let live = true;
    if (!path.startsWith("/admin/") || !crypto.subtle) {
      setMatch({ path, ok: false });
      return;
    }
    sha256(path)
      .then((h) => live && setMatch({ path, ok: h === ADMIN_PATH_SHA256 }))
      .catch(() => live && setMatch({ path, ok: false }));
    return () => {
      live = false;
    };
  }, [path]);

  if (!match || match.path !== path) return null;
  if (!match.ok) return <>{fallback}</>;
  return (
    <Suspense fallback={null}>
      <AdminApp />
    </Suspense>
  );
}
