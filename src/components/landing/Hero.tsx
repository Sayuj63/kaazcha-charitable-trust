import { type CSSProperties } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

import { EASE } from "./shared";

/** One Kerala photograph per line: Kathakali for the past, the Alappuzha
 *  backwaters for the present, Munnar's tea hills for the future. */
const LINE_IMAGES = ["hero-img-past", "hero-img-present", "hero-img-future"];

const HERO_COLORS = ["#E07B2E", "#D44B7A", "#7B3FA0"];

/** White hero: the three lines are first written in solid ink, then a Kerala
 *  photograph fills each outlined line. The three text layers are stacked in
 *  one grid cell so they line up exactly. */
export function Hero({ start }: { start: boolean }) {
  const { t, lang } = useLanguage();
  const lines = t.hero.lines;

  const layerClass = cn(
    "col-start-1 row-start-1 grid gap-y-4 text-center font-hero font-black tracking-tight lg:grid-cols-3 lg:gap-x-10",
    lang === "ml"
      ? "text-[9vw] leading-[1.35] sm:text-[7vw] lg:text-[2.3vw] xl:text-[2.1rem]"
      : "text-[13vw] leading-[1.02] sm:text-[10vw] lg:text-[4.2vw] xl:text-[4rem]",
  );

  const renderLines = (
    animate: boolean,
    lineClass?: (i: number) => string,
    lineStyle?: (i: number) => CSSProperties | undefined,
  ) =>
    lines.map((line, i) => (
      <motion.span
        key={`${lang}-${i}`}
        initial={animate ? { opacity: 0, y: 30 } : false}
        animate={start || !animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, delay: 0.15 + i * 0.2, ease: EASE }}
        className={cn("block text-balance", lineClass?.(i))}
        style={lineStyle?.(i)}
      >
        {line}
      </motion.span>
    ));

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center bg-white pt-32 pb-16 sm:pt-36"
    >
      <h1 className="mx-auto grid w-full max-w-7xl px-5 sm:px-8">
        {/* 1 — plain colored text, written first */}
        <motion.span
          aria-hidden
          initial={{ opacity: 1 }}
          animate={start ? { opacity: 0 } : undefined}
          transition={{ duration: 1.2, delay: 1.6, ease: EASE }}
          className={layerClass}
        >
          {renderLines(
            true,
            undefined,
            (i) => ({ color: HERO_COLORS[i] }),
          )}
        </motion.span>

        {/* 2 — the photographs, visible only through the letters */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : undefined}
          transition={{ duration: 1.4, delay: 1.4, ease: EASE }}
          className={layerClass}
        >
          {renderLines(false, (i) =>
            cn("hero-text-image animate-hero-pan", LINE_IMAGES[i]),
          )}
        </motion.span>

        {/* 3 — hollow outline on top */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
          className={cn(layerClass, "hero-text-outline")}
        >
          {lines.map((line, i) => (
            <span
              key={`${lang}-${i}`}
              className="block text-balance"
              style={{ WebkitTextStroke: `1px ${HERO_COLORS[i]}` }}
            >
              {line}
            </span>
          ))}
        </motion.span>
      </h1>
    </section>
  );
}
