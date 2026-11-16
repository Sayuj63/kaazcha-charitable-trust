import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useParams } from "react-router";

import { EASE, HeritagePattern, LOGOS, SmartImage } from "@/components/landing/shared";
import { usePerson } from "@/cms/client";
import { RichText } from "@/cms/RichText";
import type { Language } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const COPY = {
  en: {
    eyebrow: "Kaazcha · Personalities",
    home: "Kaazcha Charitable Trust home",
    switchTo: "Read in Malayalam",
    missingTitle: "This page isn’t available",
    missingBody: "The link may be mistyped, or the page has been taken down.",
    errorTitle: "Couldn’t load this page",
    errorBody: "Please check your connection and try again.",
    retry: "Try again",
    visit: "Visit the Kaazcha website",
    share: "Share",
    tagline: "Preserving heritage. Inspiring generations.",
  },
  ml: {
    eyebrow: "കാഴ്ച · വ്യക്തിത്വങ്ങൾ",
    home: "കാഴ്ച ചാരിറ്റബിൾ ട്രസ്റ്റ് ഹോം",
    switchTo: "Read in English",
    missingTitle: "ഈ പേജ് ലഭ്യമല്ല",
    missingBody: "ലിങ്ക് തെറ്റായിരിക്കാം, അല്ലെങ്കിൽ പേജ് നീക്കം ചെയ്തിരിക്കാം.",
    errorTitle: "പേജ് ലോഡ് ചെയ്യാനായില്ല",
    errorBody: "ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
    retry: "വീണ്ടും ശ്രമിക്കുക",
    visit: "കാഴ്ച വെബ്സൈറ്റ് സന്ദർശിക്കുക",
    share: "പങ്കിടുക",
    tagline: "പൈതൃകം സംരക്ഷിക്കുന്നു. തലമുറകളെ പ്രചോദിപ്പിക്കുന്നു.",
  },
} satisfies Record<Language, Record<string, string>>;

/** The page a printed QR code opens: one personality, phone first. */
export default function PersonPage() {
  const { slug } = useParams();
  const status = usePerson(slug?.toLowerCase());
  const { lang, setLang } = useLanguage();
  const c = COPY[lang];
  const person = status.state === "ready" ? status.data : null;

  // The language provider also sets the title, so set ours after it.
  useEffect(() => {
    if (!person) return;
    const id = requestAnimationFrame(() => {
      document.title = `${person.name[lang] || person.name.en} — Kaazcha Charitable Trust`;
    });
    return () => cancelAnimationFrame(id);
  }, [person, lang]);

  const other: Language = lang === "en" ? "ml" : "en";
  const name = person ? person.name[lang] || person.name[other] : "";
  const role = person ? person.role[lang] || person.role[other] : "";
  const bio = person ? person.bio[lang] || person.bio[other] : "";
  const hasOther = person ? Boolean(person.bio[other]) : false;

  const share = async () => {
    const data = { title: name, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
    } catch {
      // dismissed
    }
  };

  return (
    <div className="min-h-[100svh] bg-cream font-sans text-ink antialiased">
      <div className="grain-overlay" aria-hidden />

      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-8">
        <Link to="/" aria-label={c.home} className="flex min-w-0 items-center">
          <img
            src={LOGOS[lang].src}
            alt=""
            width={LOGOS[lang].width}
            height={LOGOS[lang].height}
            className="h-10 w-auto object-contain sm:h-14"
          />
        </Link>
        <LanguageSwitch lang={lang} onChange={setLang} />
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-8 sm:pb-24">
        {status.state === "loading" && <Skeleton />}

        {(status.state === "missing" || status.state === "error") && (
          <div className="mx-auto max-w-md py-24 text-center">
            <HeritagePattern className="mx-auto h-28 w-28 rounded-full" />
            <h1 className="mt-8 font-display text-3xl font-medium tracking-tight">
              {status.state === "missing" ? c.missingTitle : c.errorTitle}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
              {status.state === "missing" ? c.missingBody : c.errorBody}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {status.state === "error" && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className={PILL_DARK}
                >
                  {c.retry}
                </button>
              )}
              <Link to="/" className={PILL_LIGHT}>
                {c.visit}
              </Link>
            </div>
          </div>
        )}

        {person && (
          <motion.article
            key={lang}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            lang={lang}
            className="grid gap-8 pt-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:pt-8"
          >
            <figure className="lg:sticky lg:top-8 lg:self-start">
              <div className="overflow-hidden rounded-[1.75rem] bg-paper p-2 sm:p-3">
                {person.image ? (
                  <SmartImage
                    src={person.image}
                    alt={name}
                    eager
                    className="aspect-[4/5] w-full rounded-[1.35rem] object-cover object-top"
                  />
                ) : (
                  <HeritagePattern className="aspect-[4/5] w-full rounded-[1.35rem]" label={name} />
                )}
              </div>
              {person.imageCredit && (
                <figcaption className="mt-2.5 px-2 text-[11px] leading-snug text-ink/50">
                  {person.imageCredit}
                </figcaption>
              )}
            </figure>

            <div className="min-w-0">
              <p className="font-display text-base italic tracking-wide text-gold sm:text-lg">
                {c.eyebrow}
              </p>
              <h1 className="mt-2 font-display text-[2.6rem] leading-[1.05] font-medium tracking-tight text-ink sm:text-6xl">
                {name}
              </h1>
              {person.years && (
                <p className="mt-4 font-hero text-[1.65rem] leading-none tracking-[0.12em] text-terracotta sm:text-3xl">
                  {person.years}
                </p>
              )}
              {role && (
                <p className="mt-3 font-sans text-[11px] font-bold tracking-[0.24em] text-maroon uppercase">
                  {role}
                </p>
              )}

              <Ornament />

              <div
                className={cn(
                  "space-y-5 font-display text-[17px] leading-[1.75] text-ink/85 sm:text-lg",
                  lang === "en" &&
                    "[&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mt-1.5 [&>p:first-child]:first-letter:mr-2.5 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-[3.4rem] [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-maroon",
                )}
              >
                <RichText text={bio} />
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {hasOther && (
                  <button
                    type="button"
                    onClick={() => {
                      setLang(other);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={PILL_DARK}
                  >
                    {c.switchTo}
                  </button>
                )}
                <button type="button" onClick={share} className={PILL_LIGHT}>
                  {c.share}
                </button>
              </div>
            </div>
          </motion.article>
        )}
      </main>

      <footer className="bg-forest-deep px-4 py-10 text-center text-cream sm:px-8">
        <p className="font-display text-xl">Kaazcha Charitable Trust</p>
        <p className="mt-1 font-display text-sm italic text-gold-light">{c.tagline}</p>
        <Link
          to="/"
          className="mt-5 inline-block font-sans text-[11px] font-bold tracking-[0.22em] text-cream/90 uppercase"
        >
          <span className="underline-draw">{c.visit} →</span>
        </Link>
      </footer>
    </div>
  );
}

const PILL_DARK =
  "inline-flex h-11 cursor-pointer items-center rounded-full bg-forest px-5 font-sans text-[11px] font-bold tracking-[0.18em] whitespace-nowrap text-cream uppercase transition-colors hover:bg-forest-deep";
const PILL_LIGHT =
  "inline-flex h-11 cursor-pointer items-center rounded-full bg-paper px-5 font-sans text-[11px] font-bold tracking-[0.18em] whitespace-nowrap text-ink uppercase transition-colors hover:bg-manila";

function LanguageSwitch({
  lang,
  onChange,
}: {
  lang: Language;
  onChange: (l: Language) => void;
}) {
  const options: { value: Language; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ml", label: "മല" },
  ];
  return (
    <div role="group" aria-label="Language" className="flex shrink-0 rounded-full bg-paper p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={lang === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-9 min-w-12 cursor-pointer rounded-full px-3.5 font-sans text-[12px] font-bold tracking-[0.08em] transition-colors",
            lang === o.value ? "bg-forest text-cream" : "text-ink/70",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Ornament() {
  return (
    <div className="my-8 flex items-center gap-3 text-gold" aria-hidden>
      <span className="h-px w-10 bg-gold/60" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <path d="M7 0l1.6 5.4L14 7l-5.4 1.6L7 14l-1.6-5.4L0 7l5.4-1.6z" />
      </svg>
      <span className="h-px flex-1 bg-gold/25" />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid animate-pulse gap-8 pt-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:pt-8">
      <div className="aspect-[4/5] w-full rounded-[1.75rem] bg-paper" />
      <div className="space-y-4">
        <div className="h-4 w-40 rounded bg-paper" />
        <div className="h-12 w-4/5 rounded bg-paper" />
        <div className="h-7 w-36 rounded bg-paper" />
        <div className="mt-10 h-4 w-full rounded bg-paper" />
        <div className="h-4 w-full rounded bg-paper" />
        <div className="h-4 w-2/3 rounded bg-paper" />
      </div>
    </div>
  );
}
