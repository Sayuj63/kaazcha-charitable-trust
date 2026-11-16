import { useId, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";

import type { Localized } from "@/cms/types";
import { cn } from "@/lib/utils";

import { uploadImage } from "./upload";

export const INPUT =
  "w-full rounded-xl border border-ink/12 bg-white px-3.5 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold focus:ring-2 focus:ring-gold/25 sm:text-[15px]";

export const BTN =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 font-sans text-[12px] font-bold tracking-[0.12em] whitespace-nowrap uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50";
export const BTN_PRIMARY = cn(BTN, "bg-forest text-cream hover:bg-forest-deep");
export const BTN_SOFT = cn(BTN, "bg-paper text-ink hover:bg-manila");
export const BTN_DANGER = cn(BTN, "bg-transparent text-destructive hover:bg-destructive/10");
export const ICON_BTN =
  "inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-manila disabled:cursor-not-allowed disabled:opacity-40";

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block font-sans text-[11px] font-bold tracking-[0.16em] text-ink/70 uppercase"
      >
        {label}
      </label>
      {children}
      {hint && <p className="text-[12.5px] leading-snug text-ink/55">{hint}</p>}
    </div>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  hint,
  placeholder,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: ReactNode;
  placeholder?: string;
  type?: string;
  inputMode?: "url" | "text";
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT}
      />
    </Field>
  );
}

/** English + Malayalam side by side (stacked on phones). */
export function LocalizedInput({
  label,
  value,
  onChange,
  multiline = false,
  rows = 8,
  hint,
}: {
  label: string;
  value: Localized;
  onChange: (v: Localized) => void;
  multiline?: boolean;
  rows?: number;
  hint?: ReactNode;
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint}>
      <div className={cn("grid gap-3", !multiline && "sm:grid-cols-2")}>
        {(["en", "ml"] as const).map((lang) => (
          <div key={lang} className="relative">
            <span className="pointer-events-none absolute top-2 right-3 z-10 rounded-full bg-paper px-2 py-0.5 font-sans text-[10px] font-bold tracking-[0.12em] text-ink/55 uppercase">
              {lang === "en" ? "English" : "മലയാളം"}
            </span>
            {multiline ? (
              <textarea
                id={`${id}-${lang}`}
                lang={lang}
                rows={rows}
                value={value[lang]}
                onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
                className={cn(INPUT, "min-h-40 resize-y pt-9 leading-relaxed")}
              />
            ) : (
              <input
                id={`${id}-${lang}`}
                lang={lang}
                value={value[lang]}
                onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
                className={cn(INPUT, "pr-24")}
              />
            )}
          </div>
        ))}
      </div>
    </Field>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl bg-paper px-4 py-3.5 text-left"
    >
      <span>
        <span className="block font-sans text-sm font-bold text-ink">{label}</span>
        {description && (
          <span className="mt-0.5 block text-[12.5px] leading-snug text-ink/60">
            {description}
          </span>
        )}
      </span>
      <span
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition-colors",
          checked ? "bg-forest" : "bg-ink/20",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-6" : "left-1",
          )}
        />
      </span>
    </button>
  );
}

/** Image picker with preview; uploads to Blob and returns the URL. */
export function ImageInput({
  label,
  value,
  onChange,
  folder,
  aspect = "aspect-[4/5]",
  fit = "cover",
  maxEdge,
  hint,
}: {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  folder: string;
  aspect?: string;
  fit?: "cover" | "contain";
  maxEdge?: number;
  hint?: ReactNode;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadImage(file, folder, maxEdge));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className={cn(
            "relative w-36 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-paper sm:w-44",
            aspect,
          )}
        >
          {value ? (
            <img
              src={value}
              alt=""
              className={cn(
                "h-full w-full",
                fit === "contain" ? "object-contain p-2" : "object-cover object-top",
              )}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center px-3 text-center text-[12px] font-semibold text-ink/50">
              Tap to add image
            </span>
          )}
          {busy && (
            <span className="absolute inset-0 flex items-center justify-center bg-white/75 text-[12px] font-bold tracking-[0.1em] text-ink uppercase">
              Uploading…
            </span>
          )}
        </button>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className={BTN_SOFT}
            disabled={busy}
            onClick={() => ref.current?.click()}
          >
            {value ? "Replace" : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              className={BTN_DANGER}
              disabled={busy}
              onClick={() => onChange(undefined)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => void pick(e.target.files?.[0])}
      />
    </Field>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-3xl bg-white p-5 shadow-[0_1px_0_rgb(32_21_16/0.06)] ring-1 ring-ink/8 sm:p-7", className)}>
      {children}
    </section>
  );
}

/** Sticky bar shown while there are unsaved edits. */
export function SaveBar({
  dirty,
  saving,
  onSave,
  onDiscard,
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onDiscard: () => void;
}) {
  if (!dirty && !saving) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full bg-ink py-2 pr-2 pl-5 text-cream shadow-2xl">
        <span className="truncate text-sm font-semibold">Unsaved changes</span>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onDiscard}
            disabled={saving}
            className={cn(BTN, "h-10 px-4 text-cream/80 hover:text-cream")}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className={cn(BTN, "h-10 bg-gold-light px-5 text-ink hover:bg-manila")}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ErrorNote({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <span>{message}</span>
      {onRetry && (
        <button type="button" onClick={onRetry} className="shrink-0 font-bold underline">
          Reload
        </button>
      )}
    </div>
  );
}

export function Loading() {
  return (
    <div className="space-y-4" aria-busy>
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-24 animate-pulse rounded-3xl bg-white/70" />
      ))}
    </div>
  );
}
