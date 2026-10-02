import { Link } from "react-router";

import { useSectionNav } from "@/hooks/use-section-nav";
import { useLanguage } from "@/i18n/LanguageProvider";

import { LOGOS } from "./shared";

/** Links either scroll to a landing-page section or open a page. */
const EXPLORE = [
  { key: "about", section: "about" },
  { key: "initiatives", to: "/initiatives" },
  { key: "news", section: "news" },
  { key: "join", section: "contact" },
] as const;

const SOCIALS = ["instagram", "facebook", "youtube", "email"] as const;

const LINK_CLASS =
  "underline-draw text-sm text-cream/80 transition-colors hover:text-gold-light";

export function Footer() {
  const { t, lang } = useLanguage();
  const f = t.footer;
  const logo = LOGOS[lang];
  const scrollToSection = useSectionNav();

  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a
              href="#home"
              aria-label={f.backToTop}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="inline-flex rounded-2xl bg-white px-5 py-4 sm:px-6 sm:py-5"
            >
              <img
                key={lang}
                src={logo.src}
                alt={f.logoAlt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                className="h-20 w-auto sm:h-28"
              />
            </a>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-cream/75">
              {f.blurb}
            </p>
            <p className="mt-6 font-display text-sm italic text-gold-light">
              {f.quote}
            </p>
          </div>

          <div>
            <p className="font-sans text-[11px] font-bold tracking-[0.3em] text-gold-light uppercase">
              {f.exploreHeading}
            </p>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((link) => (
                <li key={link.key}>
                  {"to" in link ? (
                    <Link to={link.to} className={LINK_CLASS}>
                      {f.explore[link.key]}
                    </Link>
                  ) : (
                    <a
                      href={`#${link.section}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.section);
                      }}
                      className={LINK_CLASS}
                    >
                      {f.explore[link.key]}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[11px] font-bold tracking-[0.3em] text-gold-light uppercase">
              {f.followHeading}
            </p>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((key) => (
                <li key={key}>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                    className={LINK_CLASS}
                  >
                    {f.socials[key]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="font-sans text-[11px] font-semibold tracking-[0.2em] text-cream/65 uppercase">
                {f.writeToUs}
              </p>
              <a
                href="mailto:admin@kaazchacharitabletrust.com"
                className="mt-1 block font-display text-lg italic text-cream/90 hover:text-gold-light"
              >
                admin@kaazchacharitabletrust.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/20 pt-7 text-center sm:flex-row sm:text-left">
          <p className="font-sans text-xs text-cream/60">{f.copyright}</p>
          <p className="font-display text-xs italic text-cream/60">
            {f.crafted}
          </p>
        </div>
      </div>
    </footer>
  );
}
