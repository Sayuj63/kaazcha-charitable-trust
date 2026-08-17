import { motion, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  Compass,
  Earth,
  GraduationCap,
  HeartHandshake,
  History,
  MessagesSquare,
  Scroll,
  ScrollText,
  Sparkles,
  Sprout,
  Target,
  Users,
} from "lucide-react";
import { useRef } from "react";

import { EASE, Eyebrow, IMAGES, Reveal, SectionHeader, SmartImage } from "./shared";

const MISSION = [
  {
    num: ".01",
    icon: Scroll,
    copy: "Preserve and promote cultural heritage.",
  },
  {
    num: ".02",
    icon: GraduationCap,
    copy: "Encourage education, learning and intellectual engagement.",
  },
  {
    num: ".03",
    icon: BookOpen,
    copy: "Document stories, traditions and histories for future generations.",
  },
  {
    num: ".04",
    icon: MessagesSquare,
    copy: "Create platforms for dialogue, creativity and community participation.",
  },
  {
    num: ".05",
    icon: HeartHandshake,
    copy: "Support meaningful social and charitable initiatives.",
  },
  {
    num: ".06",
    icon: Users,
    copy: "Connect generations through shared culture, knowledge and experience.",
  },
];

const BELIEFS = [
  {
    icon: Earth,
    title: "Heritage belongs to everyone",
    copy: "Culture becomes meaningful when it is experienced, shared and passed from one generation to another.",
    wide: false,
  },
  {
    icon: ScrollText,
    title: "Stories deserve to be remembered",
    copy: "Every community carries stories, memories and experiences that contribute to its identity. Preserving them is an act of responsibility towards the future.",
    wide: false,
  },
  {
    icon: MessagesSquare,
    title: "Knowledge grows through conversation",
    copy: "Ideas become stronger when people come together to question, discuss, learn and exchange perspectives.",
    wide: false,
  },
  {
    icon: Sprout,
    title: "Every generation has something to contribute",
    copy: "The wisdom of the past, the questions of the present and the imagination of the future can come together to create something meaningful.",
    wide: false,
  },
  {
    icon: Target,
    title: "We believe in purposeful action",
    copy: "Our work seeks to move beyond conversation—to create initiatives that have lasting cultural, educational and social value.",
    wide: true,
  },
];

const APPROACH = [
  {
    num: "01",
    icon: History,
    title: "Remember",
    copy: "We gather what remains — manuscripts, songs, monuments, memories.",
  },
  {
    num: "02",
    icon: Compass,
    title: "Discover",
    copy: "We study, interpret and share, turning fragments into stories.",
  },
  {
    num: "03",
    icon: Users,
    title: "Connect",
    copy: "We bring people, places and pasts together in conversation.",
  },
  {
    num: "04",
    icon: Sparkles,
    title: "Create",
    copy: "We make new work — books, films, festivals — from old roots.",
  },
];

function Approach() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeader
        eyebrow="Our approach"
        title={
          <>
            Remember. Discover. Connect.{" "}
            <span className="italic text-maroon">Create.</span>
          </>
        }
        description="We seek to connect the past with the present and the present with the future—through culture, education, community and meaningful experiences."
      />

      <div ref={lineRef} className="relative mt-16">
        {/* Desktop connecting line */}
        <div className="absolute top-7 right-6 left-6 hidden h-0.5 bg-ink/15 md:block" aria-hidden>
          <motion.div
            style={{ scaleX }}
            className="h-full origin-left bg-gold"
          />
        </div>
        {/* Mobile connecting line */}
        <div
          className="absolute top-7 bottom-7 left-[27px] w-0.5 bg-ink/15 md:hidden"
          aria-hidden
        >
          <motion.div
            style={{ scaleY }}
            className="h-full w-full origin-top bg-gold"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
          {APPROACH.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.12} className="relative">
              <div className="flex items-start gap-4 md:flex-col md:gap-0">
                <span className="flex size-14 shrink-0 items-center justify-center border-2 border-ink bg-cream font-display text-lg text-gold shadow-brutal-sm">
                  {step.num}
                </span>
                <div className="md:mt-6">
                  <div className="flex items-center gap-2.5">
                    <step.icon className="size-5 text-terracotta" />
                    <h4 className="font-display text-2xl font-medium tracking-tight text-ink">
                      {step.title}
                    </h4>
                  </div>
                  <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-ink/65">
                    {step.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative bg-cream py-24 sm:py-32">
      {/* ——— Who we are ——— */}
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

      {/* ——— Vision ——— */}
      <div className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
        <Reveal>
          <div className="border-2 border-ink bg-sand p-8 shadow-brutal-sm sm:p-12">
            <Eyebrow>Our vision</Eyebrow>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="mt-5 max-w-4xl font-display text-2xl leading-snug font-light text-ink italic sm:text-4xl"
            >
              “To build a future where culture, knowledge and community thrive
              together.”
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 sm:text-lg"
            >
              We envision a society that understands its heritage, values its
              diversity, encourages meaningful dialogue and creates
              opportunities for future generations to learn, participate and
              contribute.
            </motion.p>
          </div>
        </Reveal>
      </div>

      {/* ——— Mission ——— */}
      <div className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
        <SectionHeader
          eyebrow="Our mission"
          title={
            <>
              To create and support initiatives{" "}
              <span className="italic text-maroon">that:</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {MISSION.map((item, i) => (
            <Reveal key={item.num} delay={(i % 3) * 0.12} className="h-full">
              <div className="flex h-full flex-col border-2 border-ink bg-card p-7 shadow-brutal-sm transition-all duration-400 hover:-translate-y-1 hover:border-gold hover:shadow-brutal">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center border-2 border-ink bg-terracotta text-cream shadow-brutal-sm">
                    <item.icon className="size-5" />
                  </span>
                  <span className="font-display text-4xl text-gold italic">
                    {item.num}
                  </span>
                </div>
                <p className="mt-6 text-base leading-relaxed text-ink/75">
                  {item.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ——— What we believe ——— */}
      <div className="mt-24 border-y-2 border-ink bg-forest py-24 sm:mt-32 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            dark
            eyebrow="What we believe"
            title={
              <>
                Convictions that carry our <span className="italic text-gold-light">work</span>
              </>
            }
            description="Values are not plaques on a wall. They are the reasons we show up on a rainy morning in a village archive."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {BELIEFS.map((belief, i) => (
              <Reveal
                key={belief.title}
                delay={i * 0.1}
                className={belief.wide ? "sm:col-span-2" : "h-full"}
              >
                <div
                  className={
                    belief.wide
                      ? "group flex h-full flex-col gap-5 border-2 border-gold-light/40 bg-forest-deep/70 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-light sm:flex-row sm:items-center"
                      : "group flex h-full flex-col border-2 border-cream/25 bg-forest-deep/70 p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-light"
                  }
                >
                  <span
                    className={
                      belief.wide
                        ? "flex size-14 shrink-0 items-center justify-center border-2 border-gold-light/60 bg-gold/15 text-gold-light transition-colors duration-300 group-hover:bg-gold group-hover:text-ink"
                        : "flex size-12 items-center justify-center border-2 border-gold-light/60 bg-gold/15 text-gold-light transition-colors duration-300 group-hover:bg-gold group-hover:text-ink"
                    }
                  >
                    <belief.icon className="size-5" />
                  </span>
                  <div className={belief.wide ? "sm:flex-1" : ""}>
                    <h3 className="font-display text-xl leading-snug font-medium text-cream">
                      {belief.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-cream/65">
                      {belief.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ——— Approach ——— */}
      <div className="pt-24 sm:pt-32">
        <Approach />
      </div>
    </section>
  );
}
