import { useState } from "react";
import { toast } from "sonner";

import { newId, slugify } from "@/cms/client";
import type { Person } from "@/cms/types";
import { cn } from "@/lib/utils";

import {
  BTN_DANGER,
  BTN_PRIMARY,
  BTN_SOFT,
  Card,
  ErrorNote,
  ImageInput,
  INPUT,
  Field,
  Loading,
  LocalizedInput,
  SaveBar,
  TextInput,
  Toggle,
} from "./fields";
import { QrPanel } from "./QrPanel";
import { useCollection } from "./useCollection";

const empty = { en: "", ml: "" };

export function PeopleEditor({ onSignedOut }: { onSignedOut: () => void }) {
  const col = useCollection("people", onSignedOut);
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  if (!col.items) {
    return col.error ? <ErrorNote message={col.error} onRetry={col.reload} /> : <Loading />;
  }

  const people = col.items;
  const savedPeople = col.saved ?? [];
  const current = people.find((p) => p.id === openId) ?? null;

  // Functional update: uploads finish later and must not undo edits made meanwhile.
  const update = (id: string, patch: Partial<Person>) =>
    col.setItems((prev) =>
      prev ? prev.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p)) : prev,
    );

  const add = () => {
    const now = Date.now();
    const person: Person = {
      id: newId(),
      slug: "",
      aliases: [],
      name: { ...empty },
      years: "",
      role: { ...empty },
      bio: { ...empty },
      published: true,
      createdAt: now,
      updatedAt: now,
    };
    col.setItems([person, ...people]);
    setOpenId(person.id);
  };

  const save = async () => {
    const missing = people.find((p) => !p.slug || !p.name.en.trim());
    if (missing) {
      setOpenId(missing.id);
      toast.error("Each personality needs an English name and a link (slug).");
      return;
    }
    if (await col.save()) toast.success("Saved — live on the site within a minute");
  };

  const discard = () => {
    if (col.saved) col.setItems(col.saved);
    if (openId && !savedPeople.some((p) => p.id === openId)) setOpenId(null);
  };

  const remove = async (person: Person) => {
    const ok = window.confirm(
      `Delete ${person.name.en || "this personality"}?\n\nPrinted QR codes for this page will stop working. To hide the page but keep the QR valid, switch “Published” off instead.`,
    );
    if (!ok) return;
    const next = people.filter((p) => p.id !== person.id);
    setOpenId(null);
    if (savedPeople.some((p) => p.id === person.id)) {
      if (await col.save(next)) toast.success("Deleted");
    } else {
      col.setItems(next);
    }
  };

  const bar = (
    <SaveBar dirty={col.dirty} saving={col.saving} onSave={() => void save()} onDiscard={discard} />
  );

  if (current) {
    const savedVersion = savedPeople.find((p) => p.id === current.id);
    return (
      <div className="space-y-5 pb-28">
        <button type="button" className={BTN_SOFT} onClick={() => setOpenId(null)}>
          ← All personalities
        </button>
        {col.error && <ErrorNote message={col.error} onRetry={col.reload} />}
        <PersonForm
          person={current}
          savedVersion={savedVersion}
          taken={people.filter((p) => p.id !== current.id).flatMap((p) => [p.slug, ...p.aliases])}
          onChange={(patch) => update(current.id, patch)}
          onDelete={() => void remove(current)}
        />
        {bar}
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  const visible = q
    ? people.filter((p) =>
        [p.name.en, p.name.ml, p.slug].some((s) => s.toLowerCase().includes(q)),
      )
    : people;

  return (
    <div className="space-y-5 pb-28">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/60">
          {people.length} {people.length === 1 ? "personality" : "personalities"} · each has its
          own page and printable QR code
        </p>
        <button type="button" className={BTN_PRIMARY} onClick={add}>
          + Add personality
        </button>
      </div>
      {people.length > 6 && (
        <input
          className={INPUT}
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      {col.error && <ErrorNote message={col.error} onRetry={col.reload} />}

      <ul className="grid gap-3 sm:grid-cols-2">
        {visible.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setOpenId(p.id)}
              className="flex w-full cursor-pointer items-center gap-4 rounded-3xl bg-white p-3 text-left ring-1 ring-ink/8 transition-shadow hover:shadow-md"
            >
              <span className="h-20 w-16 shrink-0 overflow-hidden rounded-2xl bg-paper">
                {p.image && <img src={p.image} alt="" className="h-full w-full object-cover object-top" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-lg font-medium text-ink">
                  {p.name.en || "Untitled"}
                </span>
                {p.name.ml && <span className="block truncate text-sm text-ink/65">{p.name.ml}</span>}
                <span className="mt-1.5 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.12em] uppercase",
                      p.published ? "bg-forest/10 text-forest" : "bg-ink/8 text-ink/55",
                    )}
                  >
                    {p.published ? "Live" : "Hidden"}
                  </span>
                  {p.years && <span className="text-xs text-ink/50">{p.years}</span>}
                </span>
              </span>
              <span className="pr-2 text-ink/30" aria-hidden>
                ›
              </span>
            </button>
          </li>
        ))}
      </ul>
      {people.length === 0 && (
        <Card className="text-center text-ink/60">No personalities yet — add the first one.</Card>
      )}
      {bar}
    </div>
  );
}

function PersonForm({
  person,
  savedVersion,
  taken,
  onChange,
  onDelete,
}: {
  person: Person;
  savedVersion?: Person;
  taken: string[];
  onChange: (patch: Partial<Person>) => void;
  onDelete: () => void;
}) {
  const isNew = !savedVersion;
  const [editingSlug, setEditingSlug] = useState(false);
  const slugLocked = !isNew && !editingSlug;
  const clash = person.slug && taken.includes(person.slug);
  const qrReady =
    savedVersion && savedVersion.slug === person.slug && savedVersion.published;

  const setName = (name: Person["name"]) =>
    onChange({
      name,
      // Follow the English name until the page is first saved.
      ...(isNew && name.en !== person.name.en && { slug: slugify(name.en) }),
    });

  const setSlug = (raw: string) => {
    const slug = slugify(raw);
    const old = savedVersion?.slug;
    const aliases = new Set(savedVersion?.aliases ?? []);
    if (old && old !== slug) aliases.add(old);
    aliases.delete(slug);
    onChange({ slug, aliases: [...aliases] });
  };

  return (
    <>
      <Card className="space-y-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            {person.name.en || "New personality"}
          </h2>
          {!isNew && (
            <a
              href={`/people/${savedVersion.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={BTN_SOFT}
            >
              View page ↗
            </a>
          )}
        </div>

        <Toggle
          label="Published"
          description={
            person.published
              ? "The page is live and its QR code opens it."
              : "Hidden — the QR code shows “page not available”."
          }
          checked={person.published}
          onChange={(published) => onChange({ published })}
        />

        <ImageInput
          label="Portrait"
          value={person.image}
          onChange={(image) => onChange({ image })}
          folder="people"
          maxEdge={1800}
          hint="Upright photo works best (it is shown 4:5, cropped from the top)."
        />
        <TextInput
          label="Photo credit (optional)"
          value={person.imageCredit ?? ""}
          onChange={(imageCredit) => onChange({ imageCredit: imageCredit || undefined })}
          placeholder="Photo: name · licence"
        />

        <LocalizedInput label="Name" value={person.name} onChange={setName} />
        <TextInput
          label="Years"
          value={person.years}
          onChange={(years) => onChange({ years })}
          placeholder="1945 – 2024"
        />
        <LocalizedInput
          label="Known as / role"
          value={person.role}
          onChange={(role) => onChange({ role })}
          hint="A few words under the name, e.g. Actor · Poet."
        />
        <LocalizedInput
          label="Story"
          value={person.bio}
          onChange={(bio) => onChange({ bio })}
          multiline
          rows={12}
          hint={
            <>
              Leave an empty line between paragraphs. Wrap words in _underscores_ for
              <em> italics</em>. If one language is empty, the page shows the other.
            </>
          }
        />

        <Field
          label="Page link (slug)"
          hint={
            clash ? (
              <span className="text-destructive">Another personality already uses this link.</span>
            ) : slugLocked ? (
              "Locked so printed QR codes stay valid."
            ) : !isNew ? (
              "Changing it is safe: the old link keeps redirecting here, so printed QR codes still work."
            ) : (
              "Filled from the English name. Lowercase letters, numbers and dashes."
            )
          }
        >
          <div className="flex gap-2">
            <div className="flex min-w-0 flex-1 items-center rounded-xl border border-ink/12 bg-white pl-3.5">
              <span className="shrink-0 text-[15px] text-ink/40">/people/</span>
              <input
                value={person.slug}
                disabled={slugLocked}
                onChange={(e) => setSlug(e.target.value)}
                className="min-w-0 flex-1 bg-transparent py-3 pr-3 text-[16px] outline-none disabled:text-ink/60 sm:text-[15px]"
              />
            </div>
            {slugLocked && (
              <button type="button" className={BTN_SOFT} onClick={() => setEditingSlug(true)}>
                Change
              </button>
            )}
          </div>
        </Field>
        {person.aliases.length > 0 && (
          <p className="text-[12.5px] text-ink/55">
            Old links that still open this page: {person.aliases.map((a) => `/people/${a}`).join(", ")}
          </p>
        )}
      </Card>

      <Card className="space-y-4">
        <h3 className="font-display text-xl font-medium">QR code</h3>
        {qrReady ? (
          <QrPanel person={savedVersion} />
        ) : (
          <p className="text-sm text-ink/60">
            {savedVersion && !savedVersion.published
              ? "Publish and save the page to get its QR code."
              : "Save the page to generate its QR code."}
          </p>
        )}
      </Card>

      <div className="flex justify-end">
        <button type="button" className={BTN_DANGER} onClick={onDelete}>
          Delete personality
        </button>
      </div>
    </>
  );
}
