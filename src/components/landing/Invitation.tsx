import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { EASE, Eyebrow, IMAGES, SmartImage } from "./shared";

export function Invitation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="invitation"
      ref={ref}
      className="relative overflow-hidden border-y-2 border-ink bg-deep"
    >
      {/* Slow-drifting background */}
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <SmartImage
          src={IMAGES.invitation}
          alt="Heritage architecture glowing in warm light"
          className="h-full w-full animate-drift object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-b from-deep/90 via-maroon/80 to-deep/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(30,10,8,0.55)_100%)]" />

      <div className="relative mx-auto max-w-5xl px-5 py-32 text-center sm:px-8 sm:py-44">
        <Eyebrow className="text-center text-gold-light">
          Be part of Kaazcha
        </Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mt-6 font-display text-3xl leading-[1.15] font-medium text-cream text-balance text-shadow-hero sm:text-5xl lg:text-6xl"
        >
          “This is a space for those who believe heritage is meant to be
          lived, not just remembered.”
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          Join us in preserving the past, engaging with the present and
          creating possibilities for future generations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          className="mt-11"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 border-2 border-ink bg-gold-light px-8 py-4 font-sans text-[13px] font-bold tracking-[0.16em] text-ink uppercase shadow-brutal-cream transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Be Part of Kaazcha
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
