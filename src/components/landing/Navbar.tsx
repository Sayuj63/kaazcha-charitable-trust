import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router";

import { cn } from "@/lib/utils";

import { EASE } from "./shared";

const SECTION_LINKS = [
  { label: "About", href: "#about" },
  { label: "Heritage", href: "#highlights" },
  { label: "Blessy Speaks", href: "#blessy" },
  { label: "News & Media", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const MARQUEE_TEXT = "NEXT EVENT ON 4TH OCTOBER";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !scrolled && !open;

  const goToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const target = () =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(target, 150);
    } else {
      target();
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-all duration-500",
        scrolled
          ? "border-b-2 border-ink bg-cream/95 backdrop-blur-sm"
          : "border-b-2 border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a
          href="#home"
          aria-label="Kaazcha Charitable Trust — back to top"
          onClick={(e) => goToSection(e, "home")}
          className={cn(
            "group flex items-center gap-3 transition-colors",
            dark ? "text-cream" : "text-ink",
          )}
        >
          <span
            className={cn(
              "flex h-14 items-center justify-center overflow-hidden border-2 bg-cream transition-all duration-300",
              dark
                ? "border-cream shadow-brutal-cream"
                : "border-ink shadow-brutal-sm",
            )}
          >
            <img
              src="/kcc-logo.jpeg"
              alt="Kaazcha Charitable Trust logo"
              className="h-full w-auto object-contain"
            />
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => goToSection(e, link.href.slice(1))}
              className={cn(
                "underline-draw font-sans text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors",
                dark
                  ? "text-cream/90 hover:text-gold-light"
                  : "text-ink/80 hover:text-maroon",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => goToSection(e, "contact")}
            className={cn(
              "inline-flex items-center gap-2 border-2 px-5 py-2.5 font-sans text-[12px] font-bold tracking-[0.14em] uppercase transition-all duration-300",
              dark
                ? "border-cream bg-gold-light text-ink shadow-brutal-cream hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                : "border-ink bg-gold text-ink shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
            )}
          >
            Get Involved
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex size-10 items-center justify-center border-2 transition-colors lg:hidden",
            dark ? "border-cream text-cream" : "border-ink bg-cream text-ink",
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Sticky announcement marquee */}
      <div className="overflow-hidden border-y-2 border-ink bg-forest text-cream">
        <div
          className="flex w-max animate-marquee items-center gap-0 whitespace-nowrap py-2.5"
          style={{ animationDuration: "40s" }}
          aria-hidden
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center font-sans text-[11px] font-bold tracking-[0.3em] uppercase sm:text-xs"
            >
              <span className="px-6">{MARQUEE_TEXT}</span>
              <span className="text-gold-light">✦</span>
            </span>
          ))}
        </div>
        <span className="sr-only">{MARQUEE_TEXT}</span>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-b-2 border-ink bg-cream lg:hidden"
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
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={(e) => goToSection(e, "contact")}
                className="mt-4 inline-flex items-center justify-center border-2 border-ink bg-gold px-5 py-3 font-sans text-[12px] font-bold tracking-[0.16em] text-ink uppercase shadow-brutal-sm"
              >
                Get Involved
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
