import { ArrowRight, BookOpen, Landmark, Newspaper, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal, SectionHeader } from "./shared";

type Card = {
  num: string;
  title: string;
  teaser: string;
  href: string;
  Icon: LucideIcon;
};

const CARDS: Card[] = [
  {
    num: "01",
    title: "Our Initiatives",
    teaser:
      "Discover the programmes and initiatives through which Kaazcha works towards social, cultural and educational enrichment.",
    href: "#blessy",
    Icon: BookOpen,
  },
  {
    num: "02",
    title: "Culture & Heritage",
    teaser:
      "Explore stories, traditions, people, places and histories that have shaped our cultural identity.",
    href: "#blessy",
    Icon: Landmark,
  },
  {
    num: "03",
    title: "News & Media",
    teaser:
      "Stay connected with our latest events, programmes, stories and activities.",
    href: "#news",
    Icon: Newspaper,
  },
  {
    num: "04",
    title: "Be Part of Kaazcha",
    teaser:
      "Join us in preserving the past, engaging with the present and creating possibilities for future generations.",
    href: "#contact",
    Icon: Users,
  },
];

export function Highlights() {
  return (
    <section id="highlights" className="paper relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="A home for heritage"
          title={
            <>
              Four doors into one <span className="italic text-maroon">living</span> tradition
            </>
          }
          description="Kaazcha is not a museum with glass cases. It is a working trust — gathering, teaching, documenting and celebrating the heritage of Keralam, every single day."
        />
      </div>

      {/* Mobile: horizontal scroll rail. Desktop: 4-up grid. */}
      <div className="mt-14 sm:mt-16">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 sm:hidden">
          {CARDS.map((card) => (
            <a
              key={card.num}
              href={card.href}
              className="group flex w-[78%] min-w-[260px] shrink-0 snap-start flex-col border-2 border-ink bg-card p-6 shadow-brutal-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-gold hover:shadow-brutal"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-14 items-center justify-center border-2 border-ink bg-maroon text-cream shadow-brutal-sm transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  <card.Icon className="size-6" />
                </span>
                <span className="font-display text-3xl italic text-gold">
                  .{card.num}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                {card.teaser}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] font-bold tracking-[0.22em] text-maroon uppercase">
                <span className="underline-draw">Explore</span>
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>

        <div className="mx-auto hidden max-w-7xl gap-7 px-5 sm:grid sm:grid-cols-2 sm:px-8 xl:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.num} delay={i * 0.12} className="h-full">
              <a
                href={card.href}
                className="group flex h-full flex-col border-2 border-ink bg-card p-7 shadow-brutal-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-gold hover:shadow-brutal-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center border-2 border-ink bg-maroon text-cream shadow-brutal-sm transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                    <card.Icon className="size-6" />
                  </span>
                  <span className="font-display text-4xl italic text-gold">
                    .{card.num}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-2xl font-medium tracking-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                  {card.teaser}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-bold tracking-[0.22em] text-maroon uppercase">
                  <span className="underline-draw">Explore</span>
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
