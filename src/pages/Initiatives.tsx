import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import { BackHomeLink, PageShell } from "@/components/landing/PageShell";
import { EASE, Eyebrow } from "@/components/landing/shared";
import { initiatives, type Initiative } from "@/content/initiatives";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const LABEL =
  "font-sans text-[11px] font-bold tracking-[0.24em] text-maroon uppercase";

const articleId = (slug: string) => `initiative-${slug}`;

/** Accordion of the three initiatives: each shows a preview, "Read more"
 *  opens the full detail and closes whichever one was open. The open one is
 *  kept in the URL (/initiatives/:slug) so it can be linked to. */
export default function InitiativesPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const p = t.initiatives;
  const list = initiatives[lang];
  const toggled = useRef<string | null>(slug ?? null);
  const openSlug = slug ?? null;

  // Bring the item the visitor just opened or closed back into view.
  useEffect(() => {
    const id = toggled.current;
    if (!id) return;
    const frame = window.requestAnimationFrame(() => {
      const el = document.getElementById(articleId(id));
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 120 || top > window.innerHeight * 0.6) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [openSlug]);

  if (slug && !list.some((item) => item.slug === slug)) {
    return <Navigate to="/initiatives" replace />;
  }

  const toggle = (next: string) => {
    toggled.current = next;
    navigate(openSlug === next ? "/initiatives" : `/initiatives/${next}`, {
      replace: true,
      preventScrollReset: true,
    });
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <BackHomeLink label={p.backHome} />
        <Eyebrow className="mt-8">{p.eyebrow}</Eyebrow>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          className="mt-4 font-display text-4xl leading-[1.08] font-medium tracking-tight text-ink sm:text-6xl"
        >
          {p.titleBefore}
          <span className="italic text-maroon">{p.titleEmphasis}</span>
          {p.titleAfter}
        </motion.h1>

        <div className="mt-10 space-y-5 sm:mt-14" aria-label={p.tabsLabel}>
          {list.map((item) => (
            <InitiativePanel
              key={item.slug}
              item={item}
              open={item.slug === openSlug}
              onToggle={() => toggle(item.slug)}
              readMore={p.readMore}
              showLess={p.showLess}
              contentsHeading={p.contentsHeading}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function InitiativePanel({
  item,
  open,
  onToggle,
  readMore,
  showLess,
  contentsHeading,
}: {
  item: Initiative;
  open: boolean;
  onToggle: () => void;
  readMore: string;
  showLess: string;
  contentsHeading: string;
}) {
  const contentId = `${item.slug}-content`;
  const anchor = (code: string) => `${item.slug}-${code}`;
  // Folder 3 has no vision statement; preview its three areas instead.
  const preview =
    item.vision?.text ?? item.sections.map((s) => s.title).join(" · ");

  return (
    <article
      id={articleId(item.slug)}
      className={cn(
        "scroll-mt-36 rounded-3xl transition-colors duration-300",
        open ? "bg-paper" : "bg-paper/70 hover:bg-paper",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="block w-full cursor-pointer px-6 pt-7 text-left sm:px-10 sm:pt-9"
      >
        <h2 className="max-w-4xl font-display text-2xl leading-[1.15] font-medium tracking-tight text-ink text-balance sm:text-4xl">
          {item.title}
        </h2>
      </button>

      <div className="px-6 pb-7 sm:px-10 sm:pb-9">
        {item.vision && <p className={cn(LABEL, "mt-5")}>{item.vision.label}</p>}
        <p
          className={cn(
            "max-w-4xl font-display text-lg leading-relaxed italic text-ink/80 sm:text-xl",
            item.vision ? "mt-2" : "mt-5",
            !open && "line-clamp-3",
          )}
        >
          {preview}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={contentId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-10 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
                <aside className="hidden lg:block">
                  <nav className="sticky top-36" aria-label={contentsHeading}>
                    <p className={LABEL}>{contentsHeading}</p>
                    <ol className="mt-4 space-y-1">
                      {item.sections.map((section) => (
                        <li key={section.code}>
                          <a
                            href={`#${anchor(section.code)}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById(anchor(section.code))
                                ?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                            }}
                            className="flex gap-2 py-1.5 text-sm leading-snug text-ink/70 transition-colors hover:text-maroon"
                          >
                            <span className="font-display text-gold italic">
                              {section.code}
                            </span>
                            <span>{section.title}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </aside>

                <div className="space-y-14">
                  {item.sections.map((section) => (
                    <section
                      key={section.code}
                      id={anchor(section.code)}
                      className="scroll-mt-36 border-t border-ink/10 pt-8"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="shrink-0 font-display text-3xl text-gold italic sm:text-4xl">
                          {section.code}
                        </span>
                        <h3 className="font-display text-2xl leading-snug font-medium tracking-tight text-ink text-balance sm:text-3xl">
                          {section.title}
                        </h3>
                      </div>

                      {section.summary && (
                        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/75 sm:text-lg">
                          {item.summaryLabel && (
                            <span className={cn(LABEL, "mr-3")}>
                              {item.summaryLabel}
                            </span>
                          )}
                          {section.summary}
                        </p>
                      )}

                      {item.itemsLabel && (
                        <p className={cn(LABEL, "mt-8")}>{item.itemsLabel}</p>
                      )}
                      <ul
                        className={cn(
                          "divide-y divide-ink/10 border-y border-ink/10",
                          item.itemsLabel ? "mt-3" : "mt-7",
                        )}
                      >
                        {section.items.map((entry) => (
                          <li
                            key={entry.title}
                            className="grid gap-2 py-5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-8"
                          >
                            <p className="font-display text-lg leading-snug font-medium text-ink">
                              {entry.code && (
                                <span className="mr-2 text-gold italic">
                                  {entry.code}
                                </span>
                              )}
                              {entry.title}
                            </p>
                            <p className="text-[15px] leading-relaxed text-ink/70">
                              {entry.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={contentId}
          className={cn(
            "mt-7 cursor-pointer rounded-full px-6 py-3 font-sans text-[12px] font-bold tracking-[0.16em] uppercase transition-colors duration-300",
            open
              ? "bg-cream text-ink hover:bg-manila"
              : "bg-forest text-cream hover:bg-forest-deep",
          )}
        >
          {open ? showLess : readMore}
        </button>
      </div>
    </article>
  );
}
