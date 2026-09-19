import { motion } from "framer-motion";

import { EASE, Eyebrow, IMAGES, Reveal, SmartImage } from "./shared";

export function About() {
  return (
    <section id="about" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="mt-4 font-display text-4xl leading-[1.06] font-medium tracking-tight text-balance text-ink sm:text-5xl"
            >
              Kaazcha Charitable Trust
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
              className="mt-6 text-base leading-relaxed text-ink/70 sm:text-lg"
            >
              Kaazcha Charitable Trust is a charitable and cultural initiative
              committed to creating meaningful spaces for community, knowledge
              and cultural engagement.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
              className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg"
            >
              We believe that a society&apos;s strength lies not only in what it
              builds for the future, but also in how carefully it remembers and
              understands its past.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
              className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg"
            >
              Through cultural programmes, educational initiatives, community
              activities, seminars, conversations and documentation, Kaazcha
              seeks to bring people together around ideas that matter.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
              className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg"
            >
              Our work is rooted in the belief that heritage should not remain
              confined to history books or archives. It should remain alive,
              accessible and relevant to every generation.
            </motion.p>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="border-2 border-ink shadow-brutal-lg">
                <SmartImage
                  src={IMAGES.about}
                  alt="Ancient stone temple complex amid heritage ruins"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute bottom-5 left-5 right-5 border-2 border-ink bg-cream p-4 shadow-brutal-sm sm:right-auto sm:max-w-xs">
                <p className="font-display text-base font-medium text-ink">
                  Where Kaazcha began
                </p>
                <p className="mt-1 font-sans text-[11px] font-semibold tracking-[0.24em] text-maroon uppercase">
                  Niranam · Nelcynda · Nakkida
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
