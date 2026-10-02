import { motion } from "framer-motion";

import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

import { EASE } from "./shared";

const HERO_COLORS = ["#E07B2E", "#D44B7A", "#7B3FA0"];

export function Hero({ start }: { start: boolean }) {
  const { t, lang } = useLanguage();
  const lines = t.hero.lines;

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center bg-white pt-32 pb-16 sm:pt-36"
    >
      <h1
        className={cn(
          "mx-auto grid w-full max-w-7xl gap-y-6 px-5 text-center font-hero font-black uppercase tracking-tight sm:px-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0",
          lang === "ml"
            ? "text-[9vw] leading-[1.35] sm:text-[7vw] lg:text-[2.6vw] xl:text-[2.4rem]"
            : "text-[15vw] leading-[1.1] sm:text-[10vw] sm:leading-[1.05] lg:text-[5vw] lg:leading-[1.08] xl:text-[4.5rem]",
        )}
      >
        {lines.map((line, i) => {
          const spaceIdx = line.indexOf(" ");
          const firstWord = spaceIdx > 0 ? line.slice(0, spaceIdx) : line;
          const rest = spaceIdx > 0 ? line.slice(spaceIdx + 1) : "";

          return (
            <motion.span
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={start ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.2, ease: EASE }}
              className="block"
              style={{ color: HERO_COLORS[i] }}
            >
              {firstWord}
              {rest && (
                <>
                  <br />
                  {rest}
                </>
              )}
            </motion.span>
          );
        })}
      </h1>
    </section>
  );
}
