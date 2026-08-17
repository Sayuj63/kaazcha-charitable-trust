import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";

import { EASE, IMAGES, SmartImage } from "./shared";

const HEADLINE = "Preserving Heritage. Inspiring Generations.";

export function Hero({ start }: { start: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const words = HEADLINE.split(" ");

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden bg-deep"
    >
      {/* Slow Ken Burns image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <SmartImage
          src={IMAGES.hero}
          alt="The backwaters of Keralam at dawn"
          eager
          className="h-full w-full animate-kenburns object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-r from-[#2b0d0b]/95 via-[#33110f]/70 to-[#33110f]/25" />
      <div className="absolute inset-0 bg-linear-to-t from-[#1c0806]/95 via-transparent to-[#1c0806]/55" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-28 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className="font-display text-lg italic text-gold-light sm:text-xl"
        >
          * A cultural heritage &amp; community initiative — Keralam, India *
        </motion.p>

        <h1 className="mt-7 max-w-5xl font-display text-[2.6rem] leading-[1.04] font-medium tracking-tight text-cream text-balance text-shadow-hero sm:text-6xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
              animate={start ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.75,
                delay: 0.4 + i * 0.1,
                ease: EASE,
              }}
            >
              {word}
              {i < words.length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          Kaazcha Charitable Trust is a platform dedicated to preserving our
          cultural memory, nurturing knowledge and creating meaningful spaces
          for communities to connect, learn and grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.55, ease: EASE }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-3 border-2 border-ink bg-gold-light px-7 py-4 font-sans text-[13px] font-bold tracking-[0.16em] text-ink uppercase shadow-brutal-cream transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Explore Kaazcha
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#highlights"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/80"
      >
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-9 items-center justify-center border border-cream/40"
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
