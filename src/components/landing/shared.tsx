import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Slow, reverent easing — heritage pacing, not startup bounce. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Curated cultural imagery (Kerala / Indian heritage). Falls back to a themed
 *  pattern if a CDN image ever fails to load. */
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=80",
  about:
    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80",
  featured:
    "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1800&q=80",
  invitation:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=80",
  highlightInitiatives:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
  highlightCulture:
    "https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&w=1000&q=80",
  highlightNews:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
  highlightPart:
    "https://images.unsplash.com/photo-1506773090264-ac0b07293a24?auto=format&fit=crop&w=1000&q=80",
  focusHistory:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
  focusLiterature:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
  focusPeople:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  focusPlaces:
    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
  focusTraditions:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
  focusOral:
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=1200&q=80",
  eventTherapy:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
  eventNiranam:
    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
  eventConversations:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
  eventArchive:
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=1000&q=80",
} as const;

/** Small italic serif eyebrow label — On Way Storytellers style. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        "font-display text-lg italic tracking-wide text-gold",
        className,
      )}
    >
      {children}
    </motion.p>
  );
}

/** Scroll-triggered fade-up reveal. */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Consistent section header: eyebrow + serif title + optional description. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow className={cn(align === "center" && "text-center")}>
        {eyebrow}
      </Eyebrow>
      <motion.h2
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
        className={cn(
          "mt-4 font-display text-3xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl",
          dark ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-cream/75" : "text-ink/70",
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/** Decorative heritage pattern used when a remote image fails to load. */
export function HeritagePattern({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-deep text-cream",
        className,
      )}
      role="img"
      aria-label={label ?? "Kaazcha heritage pattern"}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <path className="text-gold/70" d="M200 30 Q240 70 200 110 Q160 70 200 30 Z" />
          <path className="text-gold/60" d="M200 120 Q252 140 236 186 Q204 180 200 140 Z" />
          <path className="text-gold/60" d="M200 120 Q148 140 164 186 Q196 180 200 140 Z" />
          <path className="text-terracotta/70" d="M200 150 Q266 168 246 226 Q202 216 200 168 Z" />
          <path className="text-terracotta/70" d="M200 150 Q134 168 154 226 Q198 216 200 168 Z" />
          <circle className="text-gold/40" cx="200" cy="240" r="34" strokeDasharray="2 7" />
          <path className="text-gold/50" d="M70 270 H330" strokeDasharray="4 8" />
          <path className="text-cream/30" d="M100 150 H300" strokeDasharray="1 6" />
        </g>
      </svg>
      {label && (
        <span className="relative font-display text-sm italic opacity-90">
          {label}
        </span>
      )}
    </div>
  );
}

/** Image that gracefully degrades to a heritage pattern on load failure. */
export function SmartImage({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <HeritagePattern className={className} label={alt} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/** Slow drifting strip of theme tags. */
export function Marquee({
  items,
  className,
  duration = 52,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "overflow-hidden border-y-2 border-ink bg-forest text-cream",
        className,
      )}
      aria-hidden
    >
      <div
        className="flex w-max animate-marquee items-center gap-0 whitespace-nowrap py-3"
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-sans text-xs font-semibold tracking-[0.3em] uppercase"
          >
            <span className="px-6">{item}</span>
            <span className="text-gold-light">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
