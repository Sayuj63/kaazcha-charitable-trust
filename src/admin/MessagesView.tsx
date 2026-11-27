import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { AdminError, adminApi, type InboxMessage } from "@/cms/client";
import { cn } from "@/lib/utils";

import { BTN_DANGER, BTN_SOFT, Card, ErrorNote, Loading } from "./fields";

type Folder = "inbox" | "archive";

const fmt = (ms: number) =>
  new Date(ms).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

/** Messages sent from the website's "Send us a message" form. */
export function MessagesView({ onSignedOut }: { onSignedOut: () => void }) {
  const [folder, setFolder] = useState<Folder>("inbox");
  const [data, setData] = useState<{ total: number; items: InboxMessage[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setData(await adminApi.messages(folder));
    } catch (err) {
      if (err instanceof AdminError && err.status === 401) onSignedOut();
      setError(err instanceof Error ? err.message : "Could not load messages");
    }
  }, [folder, onSignedOut]);

  useEffect(() => {
    setData(null);
    void load();
  }, [load]);

  const act = async (m: InboxMessage, action: "archive" | "inbox" | "delete") => {
    if (action === "delete" && !window.confirm(`Delete the message from ${m.name}? This can't be undone.`))
      return;
    setBusy(m.id);
    try {
      if (action === "delete") await adminApi.deleteMessage(m.id);
      else await adminApi.moveMessage(m.id, action);
      setData((d) => d && { total: d.total - 1, items: d.items.filter((x) => x.id !== m.id) });
      toast.success(
        action === "delete" ? "Deleted" : action === "archive" ? "Archived" : "Moved to inbox",
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-5 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-ink/8">
          {(["inbox", "archive"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFolder(f)}
              className={cn(
                "h-9 cursor-pointer rounded-full px-4 text-[13px] font-bold transition-colors",
                folder === f ? "bg-forest text-cream" : "text-ink/65 hover:text-ink",
              )}
            >
              {f === "inbox" ? "Inbox" : "Archived"}
              {f === folder && data ? ` (${data.total})` : ""}
            </button>
          ))}
        </div>
        <button type="button" className={BTN_SOFT} onClick={() => void load()}>
          Refresh
        </button>
      </div>

      {error && <ErrorNote message={error} onRetry={() => void load()} />}
      {!data && !error && <Loading />}

      {data && data.items.length === 0 && (
        <Card className="text-center text-ink/60">
          {folder === "inbox"
            ? "No new messages. Messages sent from the website's contact form appear here."
            : "Nothing archived."}
        </Card>
      )}

      {data && (
        <ul className="space-y-3">
          {data.items.map((m) => {
            const open = openId === m.id;
            return (
              <li key={m.id} className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/8">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : m.id)}
                  aria-expanded={open}
                  className="block w-full cursor-pointer p-4 text-left sm:p-5"
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="font-display text-lg font-medium text-ink">{m.name}</span>
                    <span className="text-xs text-ink/50">{fmt(m.receivedAt)}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-semibold text-ink/75">
                    {m.subject || m.interest || "(no subject)"}
                  </span>
                  {!open && (
                    <span className="mt-1 line-clamp-2 block text-sm text-ink/60">{m.message}</span>
                  )}
                </button>
                {open && (
                  <div className="space-y-4 border-t border-ink/8 p-4 sm:p-5">
                    <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                      <Row label="Email">
                        <a href={`mailto:${m.email}`} className="text-forest underline">
                          {m.email}
                        </a>
                      </Row>
                      {m.phone && (
                        <Row label="Phone">
                          <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="text-forest underline">
                            {m.phone}
                          </a>
                        </Row>
                      )}
                      {m.organisation && <Row label="Organisation">{m.organisation}</Row>}
                      {m.interest && <Row label="Interested in">{m.interest}</Row>}
                    </dl>
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-ink">
                      {m.message}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent(
                          `Re: ${m.subject || "Your message to Kaazcha Charitable Trust"}`,
                        )}`}
                        className={cn(BTN_SOFT, "bg-forest text-cream hover:bg-forest-deep")}
                      >
                        Reply by email
                      </a>
                      <button
                        type="button"
                        className={BTN_SOFT}
                        disabled={busy === m.id}
                        onClick={() => void act(m, folder === "inbox" ? "archive" : "inbox")}
                      >
                        {folder === "inbox" ? "Archive" : "Move to inbox"}
                      </button>
                      <button
                        type="button"
                        className={BTN_DANGER}
                        disabled={busy === m.id}
                        onClick={() => void act(m, "delete")}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-bold tracking-[0.14em] text-ink/50 uppercase">{label}</dt>
      <dd className="mt-0.5 break-words text-ink">{children}</dd>
    </div>
  );
}
