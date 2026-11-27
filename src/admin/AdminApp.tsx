import { useCallback, useEffect, useState, type FormEvent } from "react";

import { AdminError, adminApi } from "@/cms/client";
import { LOGOS } from "@/components/landing/shared";
import { cn } from "@/lib/utils";

import { BTN_PRIMARY, BTN_SOFT, INPUT } from "./fields";
import {
  AlbumsEditor,
  ArticlesEditor,
  EventsEditor,
  MagazinesEditor,
  SeminarsEditor,
} from "./MediaEditors";
import { PeopleEditor } from "./PeopleEditor";
import { hasUnsaved } from "./useCollection";

const TABS = [
  { key: "people", label: "Personalities" },
  { key: "seminars", label: "Seminars" },
  { key: "magazines", label: "Magazines" },
  { key: "articles", label: "Newsletters" },
  { key: "albums", label: "Gallery" },
  { key: "events", label: "Events" },
] as const;
type Tab = (typeof TABS)[number]["key"];
const TAB_KEY = "kct-admin-tab";

function readTab(): Tab {
  try {
    const v = sessionStorage.getItem(TAB_KEY);
    if (TABS.some((t) => t.key === v)) return v as Tab;
  } catch {
    // ignore
  }
  return "people";
}

/** Content admin. Reached only through a secret URL (see main.tsx) and every
 *  API call is checked server-side against the signed session cookie. */
export default function AdminApp() {
  const [auth, setAuth] = useState<"checking" | "out" | "in">("checking");

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "Kaazcha · Admin";
    return () => meta.remove();
  }, []);

  useEffect(() => {
    adminApi
      .me()
      .then(() => setAuth("in"))
      .catch(() => setAuth("out"));
  }, []);

  const signedOut = useCallback(() => setAuth("out"), []);

  return (
    <div className="min-h-[100svh] bg-[#f4efe4] font-sans text-ink antialiased">
      {auth === "checking" && <div className="min-h-[100svh]" />}
      {auth === "out" && <Login onIn={() => setAuth("in")} />}
      {auth === "in" && <Console onSignedOut={signedOut} />}
    </div>
  );
}

function Login({ onIn }: { onIn: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await adminApi.login(username, password);
      onIn();
    } catch (err) {
      setError(err instanceof AdminError ? err.message : "Could not sign in");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-[100svh] items-center justify-center px-4 py-10">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-5 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-ink/8 sm:p-8"
      >
        <img src={LOGOS.en.src} alt="Kaazcha Charitable Trust" className="h-14 w-auto" />
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Content admin</h1>
          <p className="mt-1 text-sm text-ink/60">Sign in to edit the website.</p>
        </div>
        <input
          className={INPUT}
          placeholder="Username"
          autoComplete="username"
          autoCapitalize="none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className={INPUT}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button type="submit" className={cn(BTN_PRIMARY, "w-full")} disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function Console({ onSignedOut }: { onSignedOut: () => void }) {
  const [tab, setTabState] = useState<Tab>(readTab);
  const setTab = (t: Tab) => {
    if (t === tab) return;
    if (hasUnsaved() && !window.confirm("You have unsaved changes. Leave without saving?")) return;
    setTabState(t);
    try {
      sessionStorage.setItem(TAB_KEY, t);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0 });
  };

  const logout = async () => {
    if (hasUnsaved() && !window.confirm("You have unsaved changes. Sign out anyway?")) return;
    await adminApi.logout().catch(() => undefined);
    onSignedOut();
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#f4efe4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 pt-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <img src={LOGOS.en.src} alt="" className="h-9 w-auto sm:h-11" />
            <span className="hidden rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-cream uppercase sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className={cn(BTN_SOFT, "h-9 px-4")}>
              Site ↗
            </a>
            <button type="button" onClick={() => void logout()} className={cn(BTN_SOFT, "h-9 px-4")}>
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-5xl overflow-x-auto px-4 py-3 sm:px-6" aria-label="Sections">
          <div className="flex flex-wrap justify-center gap-1 rounded-3xl bg-white p-1 ring-1 ring-ink/8 sm:w-max sm:justify-start sm:gap-1.5 sm:rounded-full">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                aria-current={tab === t.key ? "page" : undefined}
                className={cn(
                  "h-9 cursor-pointer rounded-full px-3.5 text-[12px] font-bold whitespace-nowrap transition-colors sm:px-4 sm:text-[13px]",
                  tab === t.key ? "bg-forest text-cream" : "text-ink/65 hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-2 sm:px-6">
        {tab === "people" && <PeopleEditor key="people" onSignedOut={onSignedOut} />}
        {tab === "seminars" && <SeminarsEditor key="seminars" onSignedOut={onSignedOut} />}
        {tab === "magazines" && <MagazinesEditor key="magazines" onSignedOut={onSignedOut} />}
        {tab === "articles" && <ArticlesEditor key="articles" onSignedOut={onSignedOut} />}
        {tab === "albums" && <AlbumsEditor key="albums" onSignedOut={onSignedOut} />}
        {tab === "events" && <EventsEditor key="events" onSignedOut={onSignedOut} />}
      </main>
    </>
  );
}
