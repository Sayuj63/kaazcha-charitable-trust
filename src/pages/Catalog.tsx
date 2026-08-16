import { motion } from "framer-motion";
import { Loader2, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { EASE, Eyebrow, SmartImage } from "@/components/landing/shared";
import type { Doc } from "@/convex/_generated/dataModel";
import { useCatalogItems } from "@/hooks/use-catalog";
import { cn } from "@/lib/utils";

type CatalogItem = Doc<"catalogItems">;

function ItemCard({
  item,
  index,
  onOpen,
}: {
  item: CatalogItem;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.09, ease: EASE }}
      className="group h-full cursor-pointer text-left"
    >
      <div className="flex h-full flex-col border-2 border-ink bg-card shadow-brutal-sm transition-all duration-400 group-hover:-translate-y-1.5 group-hover:border-gold group-hover:shadow-brutal-lg">
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden border-b-2 border-ink">
          <SmartImage
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {item.featured && (
            <span className="absolute top-3 left-3 border-2 border-ink bg-gold px-2.5 py-1 font-sans text-[10px] font-bold tracking-[0.2em] text-ink uppercase shadow-brutal-sm">
              Featured
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-sans text-[10px] font-bold tracking-[0.22em] text-maroon uppercase">
              {item.category}
            </span>
            <span className="font-display text-lg text-gold">{item.price}</span>
          </div>
          <h3 className="mt-2 font-display text-xl leading-snug font-medium tracking-tight text-ink">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
            {item.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default function Catalog() {
  const { items, isLoading } = useCatalogItems();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<CatalogItem | null>(null);

  const categories = useMemo(() => {
    const set = new Set((items ?? []).map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items ?? [])
      .filter(
        (item) =>
          (category === "All" || item.category === category) &&
          (!q ||
            [item.title, item.description, item.category, ...item.tags]
              .join(" ")
              .toLowerCase()
              .includes(q)),
      )
      .sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.title.localeCompare(b.title),
      );
  }, [items, query, category]);

  return (
    <div className="min-h-screen bg-cream font-sans text-ink antialiased">
      <div className="grain-overlay" aria-hidden />
      <Navbar />

      {/* Header band */}
      <header className="relative overflow-hidden bg-deep text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_-20%,rgba(184,130,31,0.28),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8 sm:pt-44 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <Eyebrow className="text-gold-light">The Kaazcha Catalogue</Eyebrow>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
              Browse the collection
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
              Publications, films, handcrafted objects and heritage
              experiences — curated with care, for collectors, scholars,
              libraries and friends of Kaazcha.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="relative mt-10 max-w-2xl"
          >
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink/45" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books, films, craft, experiences…"
              className="w-full border-2 border-ink bg-cream py-4 pr-4 pl-12 text-sm text-ink transition-colors duration-300 outline-none placeholder:text-ink/40 focus:border-gold"
            />
          </motion.div>
        </div>
      </header>

      {/* Results */}
      <main className="relative pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-2.5 pt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "cursor-pointer border-2 border-ink px-4 py-2 font-sans text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300",
                  category === cat
                    ? "bg-maroon text-cream shadow-brutal-sm"
                    : "bg-cream text-ink hover:bg-sand",
                )}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto font-display text-sm italic text-ink/50">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </span>
          </motion.div>

          {/* Grid */}
          {isLoading ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-ink/25 py-32">
              <Loader2 className="size-7 animate-spin text-maroon" />
              <p className="font-display text-lg italic text-ink/50">
                Opening the catalogue…
              </p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  index={i}
                  onOpen={() => setSelected(item)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center gap-5 border-2 border-dashed border-ink/25 px-6 py-24 text-center">
              <span className="flex size-14 items-center justify-center border-2 border-ink bg-sand font-display text-2xl text-maroon italic">
                ∅
              </span>
              <div>
                <p className="font-display text-2xl font-medium text-ink">
                  Nothing in the catalogue matches your search
                </p>
                <p className="mt-2 text-sm text-ink/60">
                  Try a different word, or clear the search to browse
                  everything.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="inline-flex cursor-pointer items-center gap-2 border-2 border-ink bg-gold px-5 py-3 font-sans text-[12px] font-bold tracking-[0.16em] text-ink uppercase shadow-brutal-sm transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <X className="size-4" />
                Clear search
              </button>
            </div>
          )}

          <p className="mt-14 border-t-2 border-ink/15 pt-6 text-center font-display text-sm italic text-ink/50">
            Every purchase supports the Kaazcha archive — manuscripts
            conserved, songs restored, stories kept.
          </p>
        </div>
      </main>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto border-2 border-ink bg-card p-0 shadow-brutal-lg">
          {selected && (
            <>
              <div className="aspect-[16/9] overflow-hidden border-b-2 border-ink">
                <SmartImage
                  src={selected.image}
                  alt={selected.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="border-2 border-ink bg-sand px-3 py-1 font-sans text-[10px] font-bold tracking-[0.22em] text-maroon uppercase shadow-brutal-sm">
                    {selected.category}
                  </span>
                  <span className="font-display text-2xl text-gold">
                    {selected.price}
                  </span>
                </div>
                <DialogTitle className="mt-5 font-display text-2xl leading-tight font-medium tracking-tight text-ink sm:text-3xl">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {selected.description}
                </DialogDescription>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-ink/30 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.14em] text-ink/60 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    toast("Enquiry noted", {
                      description: `Our office will write to you about “${selected.title}”.`,
                    })
                  }
                  className="mt-7 w-full cursor-pointer border-2 border-ink bg-maroon px-6 py-4 font-sans text-[13px] font-bold tracking-[0.18em] text-cream uppercase shadow-brutal transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-deep hover:shadow-none"
                >
                  Enquire about this piece
                </button>
                <p className="mt-4 text-center font-display text-xs italic text-ink/45">
                  Delivery across India · International shipping on request ·
                  Enquiries answered within two days
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
