import { motion } from "framer-motion";

import { EASE, Eyebrow, Reveal } from "./shared";

export function BlessySpeaks() {
  return (
    <section id="blessy" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <figure className="relative">
              <div className="border-2 border-ink shadow-brutal-lg">
                <img
                  src="/blessy.jpeg"
                  alt="Blessy — founder of Kaazcha Charitable Trust"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="absolute -bottom-5 left-5 right-5 border-2 border-ink bg-cream p-4 shadow-brutal-sm sm:right-auto sm:max-w-xs">
                <p className="font-display text-base font-medium text-ink">
                  Blessy
                </p>
                <p className="mt-1 font-sans text-[11px] font-semibold tracking-[0.24em] text-maroon uppercase">
                  Founder · Kaazcha Charitable Trust
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Eyebrow>Blessy speaks</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="mt-5 font-display text-4xl leading-[1.06] font-medium tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl"
            >
              Kazhcha
            </motion.h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/75 sm:text-lg">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
              >
                Kazhcha represents the benevolent perspectives of a group of
                people, and its relevance emerges at a time when the world is
                passing through the experiences of a new era, bringing about
                profound transformations in society—often without us even
                realizing it.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              >
                It is a space that seeks to hold on to the heritage that is
                gradually being lost; to values rooted in goodness, beautiful
                ways of thinking, and a life enriched by art and literature.
                Above all, it seeks to preserve the awareness that one person
                should be there for another.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              >
                It was with the intention of embracing such ideas, bringing
                marginalized lives into the mainstream, and creating a common
                space where people with similar thoughts and values can come
                together that Kazhcha Charitable Trust was formed.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              >
                At a time when cultural erosion is spreading through society,
                perhaps posing a greater challenge than economic poverty itself,
                Kazhcha strives to remain a space where vision, insight, and
                perspectives come together.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
