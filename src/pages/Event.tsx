import { motion } from "framer-motion";

import { BackHomeLink, PageShell } from "@/components/landing/PageShell";
import { EASE, Eyebrow, Reveal } from "@/components/landing/shared";
import { Link, useParams } from "react-router";

import { useEvent } from "@/cms/client";
import { useLanguage } from "@/i18n/LanguageProvider";

const LABEL =
  "font-sans text-[11px] font-bold tracking-[0.24em] text-maroon uppercase";

/** An event's page (edited in the admin), linked from the announcement bar. */
export default function EventPage() {
  const { slug } = useParams();
  const status = useEvent(slug?.toLowerCase());
  const { t, lang } = useLanguage();
  const p = t.event;

  if (status.state !== "ready") {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <BackHomeLink label={p.backHome} />
          {status.state === "loading" ? (
            <div className="mt-8 grid animate-pulse gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
              <div className="space-y-4">
                <div className="h-5 w-48 rounded bg-paper" />
                <div className="h-14 w-4/5 rounded bg-paper" />
                <div className="h-24 rounded-2xl bg-paper" />
              </div>
              <div className="order-first aspect-[893/1260] rounded-2xl bg-paper lg:order-none" />
            </div>
          ) : (
            <div className="mt-16 max-w-xl">
              <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
                {status.state === "missing" ? p.missing : p.loadFailed}
              </h1>
              <Link to="/" className="mt-6 inline-block font-sans text-[11px] font-bold tracking-[0.22em] text-forest uppercase">
                <span className="underline-draw">{p.backHome}</span>
              </Link>
            </div>
          )}
        </div>
      </PageShell>
    );
  }

  const EVENT = status.data;
  const L = (v: { en: string; ml: string }) => v[lang] || v.en || v.ml;
  const details = [
    { label: p.date, value: L(EVENT.date) },
    { label: p.time, value: L(EVENT.time) },
    { label: p.venue, value: L(EVENT.venue) },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <BackHomeLink label={p.backHome} />

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <div>
            <Eyebrow>{L(EVENT.series)}</Eyebrow>
            {lang === "en" && EVENT.seriesMeaning && (
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
              {L(EVENT.chapter) && <>{L(EVENT.chapter)}:{" "}</>}
              <span className="italic text-maroon">{L(EVENT.title)}</span>
            </motion.h1>

            <dl className="mt-10 grid divide-y divide-ink/10 rounded-2xl bg-paper sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:divide-x sm:divide-y-0">
              {details.map((item) => (
                <div key={item.label} className="px-6 py-5">
                  <dt className={LABEL}>{item.label}</dt>
                  <dd className="mt-1.5 font-display text-lg leading-snug text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            {EVENT.registerUrl && (
            <a
              href={EVENT.registerUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 font-sans text-[13px] font-bold tracking-[0.18em] text-cream uppercase transition-colors duration-300 hover:bg-forest-deep"
            >
              {p.register}
              <span aria-hidden>↗</span>
            </a>
            )}

            <Reveal className="mt-12 max-w-2xl space-y-6">
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">
                {L(EVENT.intro)}
              </p>
              <p className="font-display text-xl leading-snug italic text-maroon sm:text-2xl">
                {L(EVENT.welcome)}
              </p>
            </Reveal>

            {EVENT.contacts.length > 0 && (
            <Reveal className="mt-12">
              <p className={LABEL}>{p.contactHeading}</p>
              <ul className="mt-3 space-y-2">
                {EVENT.contacts.map((c) => (
                  <li key={`${c.phone}-${c.name.en}`} className="text-base text-ink">
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
            )}
          </div>

          {/* Poster leads on phones; sits beside the details on desktop. */}
          {EVENT.poster && (
          <Reveal className="order-first lg:order-none lg:sticky lg:top-40 lg:self-start">
            <img
              src={EVENT.poster}
              alt={p.posterAlt(L(EVENT.title))}
              className="w-full rounded-2xl"
            />
          </Reveal>
          )}
        </div>
      </div>
    </PageShell>
  );
}
