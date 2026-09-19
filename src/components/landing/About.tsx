import { motion } from "framer-motion";

import { EASE, Eyebrow } from "./shared";

const HEADLINE = "Kaazcha Charitable Trust";

export function About() {
  const words = HEADLINE.split(" ");

  return (
    <section id="about" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Eyebrow className="text-center">Who we are</Eyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 40, letterSpacing: "0.12em", filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.02em", filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
          className="mt-6 whitespace-nowrap font-display text-[7vw] leading-[1.02] font-medium text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.85, delay: 0.35 + i * 0.14, ease: EASE }}
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
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
          >
            Kaazcha Charitable Trust is a charitable and cultural initiative
            committed to creating meaningful spaces for community, knowledge and
            cultural engagement.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          >
            We believe that a society&apos;s strength lies not only in what it
            builds for the future, but also in how carefully it remembers and
            understands its past.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          >
            Through cultural programmes, educational initiatives, community
            activities, seminars, conversations and documentation, Kaazcha seeks
            to bring people together around ideas that matter.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
          >
            Our work is rooted in the belief that heritage should not remain
            confined to history books or archives. It should remain alive,
            accessible and relevant to every generation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
