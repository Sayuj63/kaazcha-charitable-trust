import { ArrowRight } from "lucide-react";

import { IMAGES, Reveal, SectionHeader, SmartImage } from "./shared";

const CARDS = [
  {
    num: "01",
    title: "Our Initiatives",
    teaser:
      "Discover the programmes and initiatives through which Kaazcha works towards social, cultural and educational enrichment.",
    href: "#initiatives",
    img: IMAGES.highlightInitiatives,
    alt: "Heritage architecture against a warm sky",
  },
  {
    num: "02",
    title: "Culture & Heritage",
    teaser:
      "Explore stories, traditions, people, places and histories that have shaped our cultural identity.",
    href: "#heritage",
    img: IMAGES.highlightCulture,
    alt: "Evening lamp-lit ceremony on a riverside ghat",
  },
  {
    num: "03",
    title: "News & Media",
    teaser:
      "Stay connected with our latest events, programmes, stories and activities.",
    href: "#news",
    img: IMAGES.highlightNews,
    alt: "Golden temple glowing at dusk",
  },
  {
    num: "04",
    title: "Be Part of Kaazcha",
    teaser:
      "Join us in preserving the past, engaging with the present and creating possibilities for future generations.",
    href: "#contact",
    img: IMAGES.highlightPart,
    alt: "A houseboat drifting through Kerala backwaters",
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

        <div className="mt-16 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.num} delay={i * 0.12} className="h-full">
              <a
                href={card.href}
                className="group block h-full border-2 border-ink bg-card shadow-brutal-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-gold hover:shadow-brutal-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
                  <SmartImage
                    src={card.img}
                    alt={card.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute top-3 left-3 border-2 border-ink bg-cream px-2.5 py-1 font-display text-sm italic text-maroon shadow-brutal-sm transition-colors duration-300 group-hover:bg-gold-light">
                    .{card.num}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {card.teaser}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] font-bold tracking-[0.22em] text-maroon uppercase">
                    <span className="underline-draw">Explore</span>
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
