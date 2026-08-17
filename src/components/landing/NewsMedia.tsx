import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, Images, Library, Newspaper, Radio, Video } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

import {
  IMAGES,
  Marquee,
  Reveal,
  SectionHeader,
  SmartImage,
} from "./shared";

const TAGS = [
  "History",
  "Literature",
  "Traditions",
  "Oral Histories",
  "Folk Art",
  "Language",
  "Memory",
  "Community",
  "Craft",
  "Music",
];

const EVENTS = [
  {
    tag: "Event",
    title: "Oru Desathinte Kathatherapy",
    teaser:
      "A celebration of stories, memory and the cultural landscape of a place.",
    img: IMAGES.eventTherapy,
  },
  {
    tag: "Project",
    title: "Niranam–Nelcynda–Nakkida",
    teaser: "Exploring the layers of Kerala's history, culture and memory.",
    img: IMAGES.eventNiranam,
  },
  {
    tag: "Series",
    title: "Kaazcha Cultural Conversations",
    teaser: "Creating spaces for dialogue across generations.",
    img: IMAGES.eventConversations,
  },
];

const CATEGORIES = [
  {
    label: "Events",
    icon: Radio,
    copy: "Highlights and reports from Kaazcha programmes.",
  },
  {
    label: "Stories",
    icon: Newspaper,
    copy: "Articles and stories exploring culture, history and community.",
  },
  {
    label: "Videos",
    icon: Video,
    copy: "Event films, conversations, interviews and cultural content.",
  },
  {
    label: "Gallery",
    icon: Images,
    copy: "Photographs from our programmes and initiatives.",
  },
  {
    label: "Newsletters",
    icon: Library,
    copy: "Updates and stories from Kaazcha.",
  },
];

export function NewsMedia() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="news" className="relative bg-ivory py-24 sm:py-32">
      <Marquee items={TAGS} duration={64} className="mb-20" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            eyebrow="Newsletters & media"
            title={
              <>
                Stories, Events &amp;{" "}
                <span className="italic text-maroon">Updates</span> from Kaazcha
              </>
            }
            description="Stay connected with the work of Kaazcha through our events, programmes, cultural conversations and community initiatives."
          />
          <Reveal delay={0.2} className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous stories"
              className="flex size-12 cursor-pointer items-center justify-center border-2 border-ink bg-cream text-ink shadow-brutal-sm transition-all duration-300 hover:bg-gold hover:shadow-none"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next stories"
              className="flex size-12 cursor-pointer items-center justify-center border-2 border-ink bg-cream text-ink shadow-brutal-sm transition-all duration-300 hover:bg-gold hover:shadow-none"
            >
              <ChevronRight className="size-5" />
            </button>
          </Reveal>
        </div>

        {/* Draggable library carousel */}
        <Reveal className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6 touch-pan-y">
              {EVENTS.map((event) => (
                <div
                  key={event.title}
                  className="min-w-0 flex-[0_0_85%] pl-6 sm:flex-[0_0_47%] lg:flex-[0_0_31.5%]"
                >
                  <a
                    href="#contact"
                    className="group block border-2 border-ink bg-cream shadow-brutal-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-gold hover:shadow-brutal-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink">
                      <SmartImage
                        src={event.img}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 border-2 border-ink bg-gold px-2.5 py-1 font-sans text-[10px] font-bold tracking-[0.2em] text-ink uppercase shadow-brutal-sm">
                        {event.tag}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl leading-snug font-medium tracking-tight text-ink">
                        {event.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                        {event.teaser}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 font-sans text-[11px] font-bold tracking-[0.22em] text-maroon uppercase">
                        <span className="underline-draw">Read More</span>
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Mobile arrows */}
        <div className="mt-8 flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous stories"
            className="flex size-11 cursor-pointer items-center justify-center border-2 border-ink bg-cream text-ink shadow-brutal-sm transition-all duration-300 hover:bg-gold"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next stories"
            className="flex size-11 cursor-pointer items-center justify-center border-2 border-ink bg-cream text-ink shadow-brutal-sm transition-all duration-300 hover:bg-gold"
          >
            <ChevronRight className="size-5" />
          </button>
          <span className="font-display text-sm italic text-ink/50">
            drag or use the arrows
          </span>
        </div>
      </div>

      {/* Media categories */}
      <div className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="border-2 border-ink bg-sand p-8 shadow-brutal-sm sm:p-10">
            <p className="font-sans text-[11px] font-bold tracking-[0.26em] text-maroon uppercase">
              Media categories
            </p>
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() =>
                    toast(`The ${cat.label} shelf is being curated`, {
                      description:
                        "New stories arrive with every season — check back soon.",
                    })
                  }
                  className="group flex cursor-pointer flex-col items-center gap-3 border-2 border-ink bg-cream px-4 py-7 text-center text-ink transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:shadow-brutal-sm"
                >
                  <cat.icon className="size-6 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                  <span className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase">
                    {cat.label}
                  </span>
                  <span className="text-xs leading-relaxed text-ink/60 group-hover:text-ink/80">
                    {cat.copy}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
