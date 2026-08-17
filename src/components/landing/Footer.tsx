import { Facebook, Instagram, Mail, Youtube } from "lucide-react";

const EXPLORE = [
  { label: "About Us", href: "#about" },
  { label: "Our Initiatives", href: "#initiatives" },
  { label: "Culture & Heritage", href: "#heritage" },
  { label: "News & Media", href: "#news" },
  { label: "Be Part of Kaazcha", href: "#invitation" },
];

const SOCIALS = [
  { label: "Instagram", icon: Instagram },
  { label: "Facebook", icon: Facebook },
  { label: "YouTube", icon: Youtube },
  { label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-deep text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center border-2 border-cream bg-maroon font-display text-2xl text-gold-light shadow-brutal-cream">
                ക
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl font-medium tracking-tight">
                  Kaazcha
                </span>
                <span className="mt-0.5 text-[9px] font-semibold tracking-[0.3em] text-gold-light uppercase">
                  Charitable Trust
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">
              A cultural heritage and community initiative from Keralam —
              preserving heritage, inspiring generations, one story at a time.
            </p>
            <p className="mt-6 font-display text-sm italic text-gold-light">
              “The past is not behind us. It lives in the stories we carry
              forward.”
            </p>
          </div>

          <div>
            <p className="font-sans text-[11px] font-bold tracking-[0.3em] text-gold uppercase">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="underline-draw text-sm text-cream/75 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[11px] font-bold tracking-[0.3em] text-gold uppercase">
              Follow
            </p>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 text-sm text-cream/75 transition-colors hover:text-gold-light"
                  >
                    <social.icon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-7 border-l-4 border-gold pl-4">
              <p className="font-sans text-[11px] font-semibold tracking-[0.2em] text-cream/60 uppercase">
                Write to us
              </p>
              <a
                href="mailto:hello@kaazcha.in"
                className="mt-1 block font-display text-lg italic text-cream/85 hover:text-gold-light"
              >
                hello@kaazcha.in
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-7 sm:flex-row">
          <p className="font-sans text-xs text-cream/50">
            © 2026 Kaazcha Charitable Trust · Registered charitable trust,
            Keralam
          </p>
          <p className="font-display text-xs italic text-cream/50">
            Crafted with care, in the land of the Pampa river
          </p>
        </div>
      </div>
    </footer>
  );
}
