import type { ReactNode } from "react";
import { Link } from "react-router";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/** Navbar + footer frame for pages other than the landing page. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream font-sans text-ink antialiased">
      <div className="grain-overlay" aria-hidden />
      <Navbar />
      <main className="pt-36 sm:pt-40">{children}</main>
      <Footer />
    </div>
  );
}

export function BackHomeLink({
  label,
  to = "/",
}: {
  label: string;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className="inline-block font-sans text-[11px] font-bold tracking-[0.22em] text-maroon uppercase"
    >
      <span className="underline-draw">{label}</span>
    </Link>
  );
}
