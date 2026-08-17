import { motion } from "framer-motion";
import {
  BookMarked,
  CalendarDays,
  Feather,
  GraduationCap,
  HeartHandshake,
  Landmark,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { EASE, Eyebrow, Reveal, SectionHeader } from "./shared";

const INITIATIVES = [
  {
    num: "01",
    icon: Landmark,
    title: "Culture & Heritage",
    copy: "Preserving, documenting and presenting the history, traditions, stories and cultural memory of our communities.",
    tone: "light" as const,
  },
  {
    num: "02",
    icon: GraduationCap,
    title: "Education & Knowledge",
    copy: "Creating opportunities for learning, discussion, research, seminars and knowledge exchange.",
    tone: "dark" as const,
  },
  {
    num: "03",
    icon: HeartHandshake,
    title: "Community & Social Development",
    copy: "Supporting initiatives that contribute to the wellbeing, participation and development of communities.",
    tone: "light" as const,
  },
  {
    num: "04",
    icon: Feather,
    title: "Arts & Literature",
    copy: "Encouraging literature, storytelling, visual arts, performing arts and other forms of cultural expression.",
    tone: "dark" as const,
  },
  {
    num: "05",
    icon: BookMarked,
    title: "Research & Documentation",
    copy: "Recording stories, histories, traditions and knowledge that deserve to be preserved for future generations.",
    tone: "light" as const,
  },
  {
    num: "06",
    icon: CalendarDays,
    title: "Events & Cultural Programmes",
    copy: "Creating platforms where scholars, artists, communities, young people and the wider public can come together.",
    tone: "dark" as const,
  },
];

export function Initiatives() {
  return (
    <section id="initiatives" className="relative bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Our initiatives"
          title={
            <>
              Creating Meaningful Impact Through{" "}
              <span className="italic text-maroon">
                Culture, Knowledge &amp; Community
              </span>
            </>
          }
          description="Kaazcha brings together a range of initiatives designed to create lasting cultural, educational and social value."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INITIATIVES.map((item, i) => {
            const dark = item.tone === "dark";
            return (
              <Reveal key={item.num} delay={(i % 3) * 0.12} className="h-full">
                <div
                  className={cn(
                    "group flex h-full flex-col border-2 border-ink p-7 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-brutal-lg",
                    dark
                      ? "bg-maroon text-cream shadow-brutal-sm hover:bg-deep"
                      : item.num === "05"
                        ? "bg-forest text-cream shadow-brutal-sm hover:bg-forest-deep"
                        : "bg-cream text-ink shadow-brutal-sm hover:bg-ivory",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "flex size-13 items-center justify-center border-2 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
                        dark
                          ? "border-cream/60 bg-cream/10 text-gold-light"
                          : item.num === "05"
                            ? "border-cream/60 bg-cream/10 text-gold-light"
                            : "border-ink bg-ivory text-terracotta shadow-brutal-sm",
                      )}
                    >
                      <item.icon className="size-6" />
                    </span>
                    <span
                      className={cn(
                        "font-display text-4xl italic",
                        dark || item.num === "05"
                          ? "text-gold-light/80"
                          : "text-gold",
                      )}
                    >
                      {item.num}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl leading-tight font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-h-0 overflow-hidden text-sm leading-relaxed opacity-0 transition-all duration-500 ease-out group-hover:max-h-36 group-hover:opacity-100 max-md:max-h-36 max-md:opacity-100",
                      dark || item.num === "05"
                        ? "text-cream/70"
                        : "text-ink/65",
                    )}
                  >
                    {item.copy}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Closing statement */}
        <Reveal className="mt-20">
          <div className="relative overflow-hidden border-2 border-ink bg-maroon px-6 py-12 text-center shadow-brutal-sm sm:px-12 sm:py-16">
            <div className="absolute -top-10 -left-10 size-40 rounded-full bg-gold/10 blur-2xl" aria-hidden />
            <div className="absolute -right-10 -bottom-10 size-40 rounded-full bg-gold/10 blur-2xl" aria-hidden />
            <Eyebrow className="relative text-center text-gold-light">
              Our initiatives are built around one idea
            </Eyebrow>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="relative mx-auto mt-6 max-w-3xl font-display text-2xl leading-snug font-medium text-cream text-balance sm:text-4xl"
            >
              “Culture is not something we simply inherit. It is something we
              keep alive.”
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="relative mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-cream/75 sm:text-base"
            >
              Through every initiative, Kaazcha aims to create opportunities to
              learn from the past, engage with the present and imagine the
              future.
            </motion.p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
