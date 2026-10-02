import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";

import { useSectionNav } from "@/hooks/use-section-nav";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

import { EASE, LOGOS } from "./shared";

const SECTION_LINKS = [
  { key: "about", href: "#about" },
  { key: "heritage", href: "#highlights" },
  { key: "blessy", href: "#blessy" },
  { key: "news", href: "#news" },
  { key: "contact", href: "#contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollToSection = useSectionNav();
  const { t, lang, toggleLang } = useLanguage();
  const logo = LOGOS[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-all duration-500",
        scrolled || open ? "bg-cream/95 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        {/* Logo */}
        <a
          href="#home"
          aria-label={t.nav.backToTop}
          onClick={(e) => goToSection(e, "home")}
          className="flex min-w-0 shrink items-center"
        >
          <img
            key={lang}
            src={logo.src}
            alt={t.nav.logoAlt}
            width={logo.width}
            height={logo.height}
            className="h-12 w-auto object-contain sm:h-16"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => goToSection(e, link.href.slice(1))}
              className="underline-draw font-sans text-[13px] font-semibold tracking-[0.16em] text-ink/80 uppercase transition-colors hover:text-maroon"
            >
              {t.nav.links[link.key]}
            </a>
          ))}
          <LanguageButton
            label={t.nav.switchLanguage}
            ariaLabel={t.nav.switchLanguageLabel}
            onClick={toggleLang}
          />
        </div>

        {/* Mobile: language + menu toggle */}
        <div className="flex shrink-0 items-center gap-2.5 lg:hidden">
          <LanguageButton
            label={t.nav.switchLanguage}
            ariaLabel={t.nav.switchLanguageLabel}
            onClick={toggleLang}
            compact
          />
          <button
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full bg-paper px-4 font-sans text-[12px] font-bold tracking-[0.14em] text-ink uppercase"
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>

      {/* Sticky announcement marquee */}
      <div className="overflow-hidden bg-forest text-cream">
        <div
          className="flex w-max animate-marquee items-center gap-0 whitespace-nowrap py-2.5"
          style={{ animationDuration: "70s" }}
          aria-hidden
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center font-sans text-[11px] font-bold tracking-[0.3em] uppercase sm:text-xs"
            >
              <span className="px-6">{t.nav.marquee}</span>
              <span className="text-gold-light">✦</span>
            </span>
          ))}
        </div>
        <span className="sr-only">{t.nav.marquee}</span>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden bg-cream lg:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {SECTION_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => goToSection(e, link.href.slice(1))}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: EASE }}
                  className="border-b border-ink/10 py-3.5 font-sans text-sm font-semibold tracking-[0.18em] text-ink uppercase"
                >
                  {t.nav.links[link.key]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LanguageButton({
  label,
  ariaLabel,
  onClick,
  compact = false,
}: {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center rounded-full bg-gold font-sans font-bold text-ink transition-colors duration-300 hover:bg-gold-light",
        compact ? "h-10 px-4 text-[12px]" : "px-6 py-2.5 text-[13px]",
      )}
    >
      {label}
    </button>
  );
}
