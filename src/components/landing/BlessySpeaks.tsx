import { motion } from "framer-motion";

import { useLanguage } from "@/i18n/LanguageProvider";

import { EASE, Eyebrow, Reveal } from "./shared";

/** Newspaper-cutout layout: the portrait floats left, the article starts
 *  beside it and runs the full width once it clears the photo. */
export function BlessySpeaks() {
  const { t, lang } = useLanguage();

  return (
    <section id="blessy" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <article className="flow-root">
          <Reveal className="float-left mr-5 mb-4 w-[44%] sm:mr-9 sm:mb-6 sm:w-[14rem] lg:w-[16rem]">
            <figure>
              <img
                src="/blessy-ipe-thomas.jpg"
                alt={t.blessy.imageAlt}
                width={1066}
                height={1600}
                loading="lazy"
                decoding="async"
                className="aspect-[2/3] w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-3 sm:mt-4">
                <p className="font-display text-sm leading-snug font-medium text-ink sm:text-lg">
                  {t.blessy.name}
                </p>
                <p className="mt-1 font-sans text-[9px] font-semibold tracking-[0.16em] text-maroon uppercase sm:text-[11px] sm:tracking-[0.24em]">
                  {t.blessy.position}
                </p>
                <p className="mt-0.5 font-sans text-[9px] font-semibold tracking-[0.16em] text-maroon uppercase sm:text-[11px] sm:tracking-[0.24em]">
                  {t.blessy.org}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <Eyebrow>{t.blessy.eyebrow}</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="mt-2 font-display text-4xl leading-[1.06] font-medium tracking-tight text-ink sm:mt-4 sm:text-6xl"
          >
            {t.blessy.title}
          </motion.h2>

          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/75 sm:mt-7 sm:space-y-5 sm:text-lg">
            {t.blessy.paragraphs.map((para, i) => (
              <motion.p
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.25 + i * 0.1,
                  ease: EASE,
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
