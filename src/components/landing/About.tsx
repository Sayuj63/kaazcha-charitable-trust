import { motion } from "framer-motion";

import { useLanguage } from "@/i18n/LanguageProvider";

import { EASE, Eyebrow } from "./shared";

export function About() {
  const { t, lang } = useLanguage();
  const words = t.about.headline.split(" ");

  return (
    <section
      id="about"
      className="relative overflow-x-clip bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Eyebrow className="text-center">{t.about.eyebrow}</Eyebrow>

        <motion.h2
          initial={{
            opacity: 0,
            y: 40,
            letterSpacing: "0.12em",
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            letterSpacing: "-0.02em",
            filter: "blur(0px)",
          }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
          className="mt-6 whitespace-nowrap font-display text-[7vw] leading-[1.02] font-medium text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.85,
                delay: 0.35 + i * 0.14,
                ease: EASE,
              }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 && " "}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
          className="mx-auto mt-8 h-[3px] w-24 origin-center bg-gold"
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-ink/75 sm:text-lg">
          {t.about.paragraphs.map((para, i) => (
            <motion.p
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 1.0 + i * 0.1, ease: EASE }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
