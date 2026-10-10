import { motion } from "framer-motion";

import { BackHomeLink, PageShell } from "@/components/landing/PageShell";
import { EASE, Eyebrow, Reveal } from "@/components/landing/shared";
import { EVENT } from "@/content/event";
import { useLanguage } from "@/i18n/LanguageProvider";

const LABEL =
  "font-sans text-[11px] font-bold tracking-[0.24em] text-maroon uppercase";

/** Page for the upcoming event linked from the announcement bar. */
export default function EventPage() {
  const { t, lang } = useLanguage();
  const p = t.event;
  const details = [
    { label: p.date, value: EVENT.date[lang] },
    { label: p.time, value: EVENT.time[lang] },
    { label: p.venue, value: EVENT.venue[lang] },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <BackHomeLink label={p.backHome} />

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <div>
            <Eyebrow>{EVENT.series[lang]}</Eyebrow>
            {lang === "en" && (
              <p className="mt-1 font-sans text-[11px] font-bold tracking-[0.22em] text-ink/50 uppercase">
                {EVENT.seriesMeaning}
              </p>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="mt-4 font-display text-4xl leading-[1.08] font-medium tracking-tight text-ink sm:text-6xl"
            >
              {EVENT.chapter[lang]}:{" "}
              <span className="italic text-maroon">{EVENT.title[lang]}</span>
            </motion.h1>

            <dl className="mt-10 grid gap-[2px] border-2 border-ink bg-ink shadow-brutal-sm sm:grid-cols-[auto_auto_minmax(0,1fr)]">
              {details.map((item) => (
                <div key={item.label} className="bg-paper px-5 py-4">
                  <dt className={LABEL}>{item.label}</dt>
                  <dd className="mt-1.5 font-display text-lg leading-snug text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={EVENT.registerUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 border-2 border-ink bg-maroon px-8 py-4 font-sans text-[13px] font-bold tracking-[0.16em] text-cream uppercase shadow-brutal transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-deep hover:shadow-none"
            >
              {p.register}
              <span aria-hidden>↗</span>
            </a>

            <Reveal className="mt-12 max-w-2xl space-y-6">
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">
                {EVENT.intro[lang]}
              </p>
              <p className="font-display text-xl leading-snug italic text-maroon sm:text-2xl">
                {EVENT.welcome[lang]}
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <p className={LABEL}>{p.contactHeading}</p>
              <ul className="mt-3 space-y-2">
                {EVENT.contacts.map((c) => (
                  <li key={c.phone} className="text-base text-ink">
                    {c.name[lang]} —{" "}
                    <a
                      href={`tel:${c.phone.replace(/\s/g, "")}`}
                      className="font-semibold text-maroon underline-offset-4 hover:underline"
                    >
                      {c.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="lg:sticky lg:top-40 lg:self-start">
            <img
              src={EVENT.poster}
              alt={p.posterAlt}
              width={913}
              height={1280}
              className="w-full border-2 border-ink shadow-brutal-lg"
            />
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
