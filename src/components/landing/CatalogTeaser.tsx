import { Link } from "react-router";
import { ArrowRight, Loader2 } from "lucide-react";

import { useCatalogItems } from "@/hooks/use-catalog";
import { Reveal, SectionHeader, SmartImage } from "./shared";

export function CatalogTeaser() {
  const { items, isLoading } = useCatalogItems();
  const featured = (items ?? []).filter((i) => i.featured).slice(0, 3);

  return (
    <section
      id="catalogue"
      className="relative border-y-2 border-ink bg-sand py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="For friends & patrons"
          title={
            <>
              The Kaazcha <span className="italic text-maroon">Catalogue</span>
            </>
          }
          description="Curated publications, films, handcrafted objects and heritage experiences — browse, search and take a piece of Keralam home. Every purchase keeps the archive alive."
        />

        {isLoading ? (
          <div className="mt-14 flex items-center justify-center gap-3 py-16">
            <Loader2 className="size-6 animate-spin text-maroon" />
            <span className="font-display text-lg italic text-ink/50">
              Gathering the collection…
            </span>
          </div>
        ) : featured.length > 0 ? (
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {featured.map((item, i) => (
              <Reveal key={item._id} delay={i * 0.12} className="h-full">
                <Link
                  to="/catalogue"
                  className="group block h-full border-2 border-ink bg-card shadow-brutal-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-gold hover:shadow-brutal-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 border-2 border-ink bg-gold px-2.5 py-1 font-sans text-[10px] font-bold tracking-[0.2em] text-ink uppercase shadow-brutal-sm">
                      Featured
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 p-5">
                    <div>
                      <p className="font-sans text-[10px] font-bold tracking-[0.22em] text-maroon uppercase">
                        {item.category}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl leading-snug font-medium tracking-tight text-ink">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-display text-lg whitespace-nowrap text-gold">
                      {item.price}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : null}

        <Reveal delay={0.15} className="mt-12 text-center">
          <Link
            to="/catalogue"
            className="group inline-flex items-center gap-3 border-2 border-ink bg-maroon px-8 py-4 font-sans text-[13px] font-bold tracking-[0.16em] text-cream uppercase shadow-brutal transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-deep hover:shadow-none"
          >
            Browse &amp; search the full catalogue
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 font-display text-sm italic text-ink/50">
            Search by title, theme or craft — from books to brass lamps
          </p>
        </Reveal>
      </div>
    </section>
  );
}
