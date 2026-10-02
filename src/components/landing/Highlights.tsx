import type { ReactNode } from "react";
import { Link } from "react-router";

import { useSectionNav } from "@/hooks/use-section-nav";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

import { Reveal, SectionHeader } from "./shared";

type NoteKey = "initiatives" | "news" | "join";

/** Three sticky notes, each pinned at its own slight angle. */
const NOTES: {
  key: NoteKey;
  to?: string;
  section?: string;
  tone: string;
  tilt: string;
}[] = [
  {
    key: "initiatives",
    to: "/initiatives",
    tone: "note-gold",
    tilt: "-rotate-2",
  },
  {
    key: "news",
    to: "/media/library",
    tone: "note-green",
    tilt: "rotate-[1.5deg]",
  },
  { key: "join", section: "contact", tone: "note-peach", tilt: "-rotate-1" },
];

export function Highlights() {
  const { t } = useLanguage();
  const h = t.highlights;
  const scrollToSection = useSectionNav();

  return (
    <section id="highlights" className="paper relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={h.eyebrow}
          title={
            <>
              {h.titleBefore}
              <span className="italic text-maroon">{h.titleEmphasis}</span>
              {h.titleAfter}
            </>
          }
          description={h.description}
        />

        {/* Phones: swipeable rail. Tablet up: three across. */}
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pt-6 pb-10 [scrollbar-width:none] sm:-mx-8 sm:mt-14 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 lg:gap-12">
          {NOTES.map((note, i) => {
            const body: ReactNode = (
              <>
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  {h.cards[note.key].title}
                </h3>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/75">
                  {h.cards[note.key].teaser}
                </p>
                <span className="mt-8 font-sans text-[11px] font-bold tracking-[0.22em] text-maroon uppercase">
                  <span className="underline-draw">{h.explore}</span>
                </span>
              </>
            );
            const noteClass = cn(
              "sticky-note group flex h-full min-h-[17rem] cursor-pointer flex-col px-7 pt-10 pb-9 text-left transition-[rotate,translate] duration-500 hover:-translate-y-1.5 hover:rotate-0 sm:px-8",
              note.tone,
              note.tilt,
            );

            return (
              <Reveal
                key={note.key}
                delay={i * 0.12}
                className="h-auto w-[78%] max-w-[20rem] shrink-0 snap-start md:h-full md:w-auto md:max-w-none"
              >
                {note.to ? (
                  <Link to={note.to} className={noteClass}>
                    {body}
                  </Link>
                ) : (
                  <a
                    href={`#${note.section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(note.section ?? "contact");
                    }}
                    className={noteClass}
                  >
                    {body}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
