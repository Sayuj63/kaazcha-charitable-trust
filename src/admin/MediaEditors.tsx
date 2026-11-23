import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { newId, slugify } from "@/cms/client";
import type {
  Album,
  Article,
  CollectionName,
  Collections,
  Magazine,
  SiteEvent,
} from "@/cms/types";
import { cn } from "@/lib/utils";

import {
  BTN_DANGER,
  BTN_PRIMARY,
  BTN_SOFT,
  Card,
  ErrorNote,
  ICON_BTN,
  ImageInput,
  Loading,
  LocalizedInput,
  SaveBar,
  TextInput,
  Toggle,
  INPUT,
} from "./fields";
import { uploadPhoto } from "./upload";
import { useCollection } from "./useCollection";

const empty = { en: "", ml: "" };

function move<T>(list: T[], from: number, to: number) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

type Item = { id: string };
/** A patch, or a function of the latest item (for edits that finish later,
 *  like uploads, so they don't overwrite changes made meanwhile). */
type Patch<T> = Partial<T> | ((latest: T) => Partial<T>);

/** Ordered list of cards (newest first on the site), each expandable to edit. */
function ListEditor<K extends CollectionName>({
  name,
  onSignedOut,
  noun,
  intro,
  create,
  summary,
  form,
}: {
  name: K;
  onSignedOut: () => void;
  noun: string;
  intro: string;
  create: () => Collections[K][number];
  summary: (item: Collections[K][number]) => { title: string; subtitle: string; image?: string };
  form: (item: Collections[K][number], update: (patch: Patch<Collections[K][number]>) => void) => ReactNode;
}) {
  const col = useCollection(name, onSignedOut);
  const [openId, setOpenId] = useState<string | null>(null);

  if (!col.items) {
    return col.error ? <ErrorNote message={col.error} onRetry={col.reload} /> : <Loading />;
  }
  const items = col.items as (Collections[K][number] & Item)[];
  const set = (next: typeof items) => col.setItems(next as Collections[K]);

  const save = async () => {
    if (await col.save()) toast.success("Saved — live on the site within a minute");
  };

  return (
    <div className="space-y-5 pb-28">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-md text-sm text-ink/60">{intro}</p>
        <button
          type="button"
          className={BTN_PRIMARY}
          onClick={() => {
            const item = create() as Collections[K][number] & Item;
            set([item, ...items]);
            setOpenId(item.id);
          }}
        >
          + Add {noun}
        </button>
      </div>
      {col.error && <ErrorNote message={col.error} onRetry={col.reload} />}

      <ul className="space-y-3">
        {items.map((item, i) => {
          const s = summary(item);
          const open = openId === item.id;
          return (
            <li key={item.id} className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/8">
              <div className="flex items-center gap-3 p-3">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
                  aria-expanded={open}
                >
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-paper">
                    {s.image && <img src={s.image} alt="" className="h-full w-full object-cover" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-lg font-medium">
                      {s.title || "Untitled"}
                    </span>
                    <span className="block truncate text-xs text-ink/55">{s.subtitle}</span>
                  </span>
                </button>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    className={ICON_BTN}
                    aria-label="Move up"
                    disabled={i === 0}
                    onClick={() => set(move(items, i, i - 1))}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={ICON_BTN}
                    aria-label="Move down"
                    disabled={i === items.length - 1}
                    onClick={() => set(move(items, i, i + 1))}
                  >
                    ↓
                  </button>
                </div>
              </div>
              {open && (
                <div className="space-y-6 border-t border-ink/8 p-5 sm:p-7">
                  {form(item, (patch) =>
                    col.setItems((prev) =>
                      prev
                        ? ((prev as typeof items).map((x) =>
                            x.id === item.id
                              ? { ...x, ...(typeof patch === "function" ? patch(x) : patch) }
                              : x,
                          ) as Collections[K])
                        : prev,
                    ),
                  )}
                  <div className="flex justify-between gap-3">
                    <button type="button" className={BTN_SOFT} onClick={() => setOpenId(null)}>
                      Done
                    </button>
                    <button
                      type="button"
                      className={BTN_DANGER}
                      onClick={() => {
                        if (window.confirm(`Delete “${s.title || noun}”?`)) {
                          set(items.filter((x) => x.id !== item.id));
                          setOpenId(null);
                        }
                      }}
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
      {items.length === 0 && (
        <Card className="text-center text-ink/60">Nothing here yet.</Card>
      )}
      <SaveBar
        dirty={col.dirty}
        saving={col.saving}
        onSave={() => void save()}
        onDiscard={() => col.saved && col.setItems(col.saved)}
      />
    </div>
  );
}

export function MagazinesEditor({ onSignedOut }: { onSignedOut: () => void }) {
  return (
    <ListEditor
      name="magazines"
      noun="magazine"
      onSignedOut={onSignedOut}
      intro="Shown under Newsletter & Media → Magazines, top first."
      create={(): Magazine => ({ id: newId(), title: { ...empty }, edition: { ...empty } })}
      summary={(m) => ({ title: m.title.en, subtitle: m.edition.en, image: m.cover })}
      form={(m, update) => (
        <>
          <ImageInput
            label="Cover"
            value={m.cover}
            onChange={(cover) => update({ cover })}
            folder="magazines"
            aspect="aspect-[3/4]"
            fit="contain"
          />
          <LocalizedInput label="Title" value={m.title} onChange={(title) => update({ title })} />
          <LocalizedInput
            label="Edition"
            value={m.edition}
            onChange={(edition) => update({ edition })}
            hint="e.g. VOLUME 1 — July to September, 2026"
          />
          <TextInput
            label="“Reach us to purchase” link"
            value={m.purchaseUrl ?? ""}
            onChange={(purchaseUrl) => update({ purchaseUrl: purchaseUrl || undefined })}
            placeholder="https://forms.gle/…"
            inputMode="url"
            hint="Leave empty to send readers to the contact section."
          />
        </>
      )}
    />
  );
}

export function ArticlesEditor({ onSignedOut }: { onSignedOut: () => void }) {
  return (
    <ListEditor
      name="articles"
      noun="article"
      onSignedOut={onSignedOut}
      intro="Shown under Newsletter & Media → Newsletters: news and articles about Kaazcha, top first."
      create={(): Article => ({ id: newId(), title: { ...empty }, source: { ...empty } })}
      summary={(a) => ({ title: a.title.en, subtitle: a.source.en, image: a.cover })}
      form={(a, update) => (
        <>
          <ImageInput
            label="Image"
            value={a.cover}
            onChange={(cover) => update({ cover })}
            folder="articles"
            aspect="aspect-[7/5]"
          />
          <LocalizedInput label="Headline" value={a.title} onChange={(title) => update({ title })} />
          <LocalizedInput
            label="Publication"
            value={a.source}
            onChange={(source) => update({ source })}
            hint="e.g. The Hindu · 12 Oct 2026"
          />
          <TextInput
            label="Article link"
            value={a.url ?? ""}
            onChange={(url) => update({ url: url || undefined })}
            placeholder="https://…"
            inputMode="url"
          />
        </>
      )}
    />
  );
}

export function AlbumsEditor({ onSignedOut }: { onSignedOut: () => void }) {
  return (
    <ListEditor
      name="albums"
      noun="album"
      onSignedOut={onSignedOut}
      intro="Photo albums under Newsletter & Media → Media Library. The first photo is the cover."
      create={(): Album => ({
        id: newId(),
        slug: "",
        title: { ...empty },
        date: { ...empty },
        photos: [],
      })}
      summary={(a) => ({
        title: a.title.en,
        subtitle: `${a.date.en}${a.date.en ? " · " : ""}${a.photos.length} photos`,
        image: a.photos[0]?.thumb ?? a.photos[0]?.src,
      })}
      form={(a, update) => (
        <>
          <LocalizedInput
            label="Title"
            value={a.title}
            onChange={(title) =>
              update({ title, ...(!a.slug && title.en && { slug: slugify(title.en) }) })
            }
          />
          <LocalizedInput label="Date" value={a.date} onChange={(date) => update({ date })} />
          <TextInput
            label="Album ID"
            value={a.slug}
            onChange={(v) => update({ slug: slugify(v) })}
            hint="A seminar with the same ID uses this album's cover and photos."
          />
          <TextInput
            label="Full album link (optional)"
            value={a.moreUrl ?? ""}
            onChange={(moreUrl) => update({ moreUrl: moreUrl || undefined })}
            placeholder="https://drive.google.com/…"
            inputMode="url"
          />
          <PhotoGrid
            album={a}
            onChange={(photos) => update({ photos })}
            onAdd={(added) => update((latest) => ({ photos: [...latest.photos, ...added] }))}
          />
        </>
      )}
    />
  );
}

function PhotoGrid({
  album,
  onChange,
  onAdd,
}: {
  album: Album;
  onChange: (photos: Album["photos"]) => void;
  onAdd: (photos: Album["photos"]) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const photos = album.photos;

  const add = async (files: FileList | null) => {
    if (!files?.length) return;
    const list = [...files].filter((f) => f.type.startsWith("image/"));
    setProgress({ done: 0, total: list.length });
    const added: Album["photos"] = [];
    // Three at a time keeps phones responsive on slow connections.
    for (let i = 0; i < list.length; i += 3) {
      const batch = await Promise.allSettled(
        list.slice(i, i + 3).map((f) => uploadPhoto(f, `gallery/${album.slug || album.id}`)),
      );
      for (const r of batch) {
        if (r.status === "fulfilled") added.push(r.value);
        else toast.error(r.reason instanceof Error ? r.reason.message : "A photo failed");
      }
      setProgress({ done: Math.min(i + 3, list.length), total: list.length });
    }
    onAdd(added);
    setProgress(null);
    if (ref.current) ref.current.value = "";
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-sans text-[11px] font-bold tracking-[0.16em] text-ink/70 uppercase">
          Photos ({photos.length})
        </p>
        <button
          type="button"
          className={BTN_PRIMARY}
          disabled={progress !== null}
          onClick={() => ref.current?.click()}
        >
          {progress ? `Uploading ${progress.done}/${progress.total}…` : "+ Add photos"}
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => void add(e.target.files)}
        />
      </div>
      {photos.length === 0 ? (
        <p className="rounded-2xl bg-paper px-4 py-6 text-center text-sm text-ink/55">
          No photos yet.
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
          {photos.map((p, i) => (
            <li key={`${p.src}-${i}`} className="group relative">
              <img
                src={p.thumb ?? p.src}
                alt=""
                loading="lazy"
                className={cn(
                  "aspect-square w-full rounded-xl object-cover",
                  i === 0 && "ring-3 ring-gold",
                )}
              />
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold tracking-[0.1em] text-white uppercase">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-1 bottom-1 flex justify-between gap-1">
                <button
                  type="button"
                  aria-label="Move earlier"
                  disabled={i === 0}
                  onClick={() => onChange(move(photos, i, i - 1))}
                  className="h-8 w-8 cursor-pointer rounded-full bg-white/90 text-sm shadow disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => onChange(photos.filter((_, j) => j !== i))}
                  className="h-8 w-8 cursor-pointer rounded-full bg-white/90 text-sm text-destructive shadow"
                >
                  ✕
                </button>
                <button
                  type="button"
                  aria-label="Move later"
                  disabled={i === photos.length - 1}
                  onClick={() => onChange(move(photos, i, i + 1))}
                  className="h-8 w-8 cursor-pointer rounded-full bg-white/90 text-sm shadow disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function EventsEditor({ onSignedOut }: { onSignedOut: () => void }) {
  return (
    <ListEditor
      name="events"
      noun="event"
      onSignedOut={onSignedOut}
      intro="Each event gets its own page. The top-most event with “Show in announcement bar” on is the one scrolling across the top of every page — use ↑ ↓ to choose."
      create={(): SiteEvent => ({
        id: newId(),
        slug: "",
        showInBar: false,
        marquee: { ...empty },
        series: { ...empty },
        chapter: { ...empty },
        title: { ...empty },
        intro: { ...empty },
        welcome: { ...empty },
        date: { ...empty },
        time: { ...empty },
        venue: { ...empty },
        contacts: [],
      })}
      summary={(e) => ({
        title: e.title.en || e.title.ml,
        subtitle: `${e.showInBar ? "● In announcement bar · " : ""}${e.date.en}`,
        image: e.poster,
      })}
      form={(e, update) => (
        <>
          <Toggle
            label="Show in announcement bar"
            description={
              e.showInBar
                ? "Scrolls across the top of every page and links to this event."
                : "Not in the bar. Its page still works if someone has the link."
            }
            checked={e.showInBar}
            onChange={(showInBar) => update({ showInBar })}
          />
          <LocalizedInput
            label="Announcement bar text"
            value={e.marquee}
            onChange={(marquee) => update({ marquee })}
            hint="e.g. Next Event — Edition 6 — 'Title' · December 12, 2026 · Kaazcha Charitable Trust"
          />
          <ImageInput
            label="Poster"
            value={e.poster}
            onChange={(poster) => update({ poster })}
            folder="events"
            aspect="aspect-[893/1260]"
            fit="contain"
            maxEdge={2000}
          />
          <LocalizedInput
            label="Title"
            value={e.title}
            onChange={(title) =>
              update({ title, ...(!e.slug && title.en && { slug: slugify(title.en) }) })
            }
          />
          <LocalizedInput
            label="Edition / chapter (optional)"
            value={e.chapter}
            onChange={(chapter) => update({ chapter })}
            hint="Shown before the title, e.g. Eedu 6"
          />
          <LocalizedInput
            label="Series (optional)"
            value={e.series}
            onChange={(series) => update({ series })}
            hint="e.g. Oru Desathinte Kadha Tedi"
          />
          <TextInput
            label="Series meaning in English (optional)"
            value={e.seriesMeaning ?? ""}
            onChange={(v) => update({ seriesMeaning: v || undefined })}
            placeholder="In Search of the Story of a Locale"
          />
          <LocalizedInput label="Date" value={e.date} onChange={(date) => update({ date })} />
          <LocalizedInput label="Time" value={e.time} onChange={(time) => update({ time })} />
          <LocalizedInput label="Venue" value={e.venue} onChange={(venue) => update({ venue })} />
          <TextInput
            label="Registration link"
            value={e.registerUrl ?? ""}
            onChange={(v) => update({ registerUrl: v || undefined })}
            placeholder="https://forms.gle/…"
            inputMode="url"
            hint="Leave empty to hide the Register button on the event page."
          />
          <LocalizedInput
            label="About the event"
            value={e.intro}
            onChange={(intro) => update({ intro })}
            multiline
            rows={6}
          />
          <LocalizedInput
            label="Welcome line"
            value={e.welcome}
            onChange={(welcome) => update({ welcome })}
            multiline
            rows={2}
          />
          <ContactsInput
            contacts={e.contacts}
            onChange={(contacts) => update({ contacts })}
          />
          <TextInput
            label="Page link"
            value={e.slug}
            onChange={(v) => update({ slug: slugify(v) })}
            hint={`The event page is /events/${e.slug || "…"}. Filled from the English title.`}
          />
        </>
      )}
    />
  );
}

function ContactsInput({
  contacts,
  onChange,
}: {
  contacts: SiteEvent["contacts"];
  onChange: (c: SiteEvent["contacts"]) => void;
}) {
  const set = (i: number, patch: Partial<SiteEvent["contacts"][number]>) =>
    onChange(contacts.map((c, j) => (j === i ? { ...c, ...patch } : c)));
  return (
    <div className="space-y-3">
      <p className="font-sans text-[11px] font-bold tracking-[0.16em] text-ink/70 uppercase">
        Contacts (“For more details”)
      </p>
      {contacts.map((c, i) => (
        <div key={i} className="grid gap-2 rounded-2xl bg-paper p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input
            className={INPUT}
            placeholder="Name (English)"
            value={c.name.en}
            onChange={(ev) => set(i, { name: { ...c.name, en: ev.target.value } })}
          />
          <input
            className={INPUT}
            lang="ml"
            placeholder="പേര് (മലയാളം)"
            value={c.name.ml}
            onChange={(ev) => set(i, { name: { ...c.name, ml: ev.target.value } })}
          />
          <input
            className={INPUT}
            type="tel"
            placeholder="+91 …"
            value={c.phone}
            onChange={(ev) => set(i, { phone: ev.target.value })}
          />
          <button
            type="button"
            className={BTN_DANGER}
            onClick={() => onChange(contacts.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className={BTN_SOFT}
        onClick={() => onChange([...contacts, { name: { en: "", ml: "" }, phone: "" }])}
      >
        + Add contact
      </button>
    </div>
  );
}
