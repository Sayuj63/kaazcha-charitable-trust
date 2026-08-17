import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, Quote } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { EASE, Eyebrow, IMAGES, Reveal, SectionHeader, SmartImage } from "./shared";

const FOCUS = [
  {
    title: "History",
    img: IMAGES.focusHistory,
    copy: "Exploring the people, places and events that have shaped our cultural landscape.",
    tag: "Chronicles",
  },
  {
    title: "Literature & Language",
    img: IMAGES.focusLiterature,
    copy: "Celebrating Malayalam language, literature, poetry, storytelling and the voices that have shaped generations.",
    tag: "Manuscripts",
  },
  {
    title: "People & Personalities",
    img: IMAGES.focusPeople,
    copy: "Remembering individuals whose contributions have influenced culture, knowledge and society.",
    tag: "Biographies",
  },
  {
    title: "Places & Heritage",
    img: IMAGES.focusPlaces,
    copy: "Discovering the cultural significance of places and landscapes and the stories they carry.",
    tag: "Sites",
  },
  {
    title: "Traditions & Practices",
    img: IMAGES.focusTraditions,
    copy: "Documenting traditions, customs, arts and practices that form part of our living heritage.",
    tag: "Living tradition",
  },
  {
    title: "Oral Histories & Memories",
    img: IMAGES.focusOral,
    copy: "Preserving personal experiences, memories and stories that may otherwise disappear with time.",
    tag: "Recordings",
  },
];

/** Animated route line along the Pampa river between the three towns. */
function RiverRoute() {
  return (
    <svg
      viewBox="0 0 560 132"
      className="mt-8 w-full"
      role="img"
      aria-label="Route along the Pampa river connecting Niranam, Nelcynda and Nakkida"
    >
      <motion.path
        d="M56 92 C 140 44, 214 62, 280 62 C 346 62, 420 44, 504 92"
        fill="none"
        stroke="#b9821f"
        strokeWidth="2.5"
        strokeDasharray="1 7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 2, ease: EASE }}
      />
      {[
        { x: 56, y: 92, label: "Niranam", dy: 22 },
        { x: 280, y: 62, label: "Nelcynda", dy: -14 },
        { x: 504, y: 92, label: "Nakkida", dy: 22 },
      ].map((node, i) => (
        <g key={node.label}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={7}
            fill="none"
            stroke="#6e2323"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.5, duration: 0.5, ease: EASE }}
            style={{ originX: `${node.x}px`, originY: `${node.y}px` }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={3.5}
            fill="#b4502a"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 1] }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.5, duration: 0.4 }}
          />
          <motion.text
            x={node.x}
            y={node.y + node.dy}
            textAnchor="middle"
            className="fill-ink font-sans"
            style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 + i * 0.5, duration: 0.5 }}
          >
            {node.label.toUpperCase()}
          </motion.text>
        </g>
      ))}
      <motion.text
        x={280}
        y={124}
        textAnchor="middle"
        className="fill-ink/60 font-display italic"
        style={{ fontSize: 13 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        the Pampa river — two thousand years of memory
      </motion.text>
    </svg>
  );
}

export function Heritage() {
  const [active, setActive] = useState(0);
  const focus = FOCUS[active];

  return (
    <section id="heritage" className="relative bg-cream py-24 sm:py-32">
      {/* ——— Section intro ——— */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Culture & heritage"
          title={
            <>
              Keeping Our Cultural Memory{" "}
              <span className="italic text-maroon">Alive</span>
            </>
          }
          description="Culture is more than monuments, manuscripts and historical dates."
        />
        <Reveal className="mt-6">
          <p className="max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg">
            It lives in our stories, languages, literature, traditions,
            landscapes, communities and collective memories.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg">
            Kaazcha&apos;s Culture &amp; Heritage initiative seeks to discover,
            document, preserve and share these stories in ways that make them
            accessible and meaningful to contemporary audiences.
          </p>
        </Reveal>
      </div>

      {/* ——— Our focus ——— */}
      <div className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
        <SectionHeader
          eyebrow="Our focus"
          title="The six rooms of the archive"
          description="Heritage is too wide for one door. Step through the room that calls to you."
        />

        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2.5">
            {FOCUS.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "border-2 border-ink px-4 py-2.5 font-sans text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer",
                  i === active
                    ? "bg-maroon text-cream shadow-brutal-sm"
                    : "bg-cream text-ink hover:bg-sand",
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 border-2 border-ink bg-sand p-5 shadow-brutal-sm sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid items-center gap-8 md:grid-cols-2"
            >
              <div className="overflow-hidden border-2 border-ink">
                <SmartImage
                  src={focus.img}
                  alt={focus.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="border-2 border-ink bg-gold px-2.5 py-1 font-sans text-[10px] font-bold tracking-[0.2em] text-ink uppercase shadow-brutal-sm">
                    {focus.tag}
                  </span>
                  <span className="font-display text-sm italic text-maroon">
                    0{active + 1} / 06
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl leading-tight font-medium tracking-tight text-ink sm:text-4xl">
                  {focus.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink/70">
                  {focus.copy}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ——— Featured project ——— */}
      <div className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
        <SectionHeader
          eyebrow="Featured project"
          title="Niranam – Nelcynda – Nakkida"
          description="One of Kaazcha's significant cultural initiatives explores the historical and cultural connections surrounding Niranam, Nelcynda and Nakkida."
        />

        <Reveal className="mt-14">
          <div className="relative border-2 border-ink shadow-brutal-lg">
            <SmartImage
              src={IMAGES.featured}
              alt="Ancient temple architecture of South India"
              className="h-[320px] w-full object-cover sm:h-[440px]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-deep/85 via-deep/20 to-transparent" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 border-2 border-ink bg-cream px-3 py-1.5 font-sans text-[11px] font-bold tracking-[0.2em] text-maroon uppercase shadow-brutal-sm">
              <MapPin className="size-3.5" />
              Heritage route · Keralam
            </span>
          </div>

          <div className="relative z-10 mx-auto -mt-14 max-w-3xl border-2 border-ink bg-card p-8 shadow-brutal-lg sm:-mt-20 sm:p-10">
            <p className="font-display text-xl leading-relaxed font-light text-ink sm:text-2xl">
              Through conversations, research, seminars and storytelling, the
              project seeks to revisit the layers of history, trade,
              literature, religion and cultural exchange that have shaped
              Kerala.
            </p>
            <RiverRoute />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#news"
                className="group inline-flex items-center gap-2.5 border-2 border-ink bg-maroon px-6 py-3.5 font-sans text-[12px] font-bold tracking-[0.16em] text-cream uppercase shadow-brutal transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-deep hover:shadow-none"
              >
                Explore the Project
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ——— Pull quote ——— */}
      <div className="mt-24 border-y-2 border-ink bg-maroon py-24 text-center sm:mt-32 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Eyebrow className="text-center text-gold-light">
            Our cultural philosophy
          </Eyebrow>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto mt-7 h-1 w-20 bg-gold-light"
          />
          <Quote className="mx-auto mt-8 size-10 text-gold-light/60" aria-hidden />
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="mt-6 font-display text-3xl leading-[1.15] font-medium text-cream text-balance sm:text-5xl lg:text-6xl"
          >
            “The past is not behind us. It lives in the stories we carry
            forward.”
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-cream/75 sm:text-base"
          >
            Kaazcha seeks to make those stories visible, accessible and
            relevant to the generations that come next.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
