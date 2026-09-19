import { useState } from "react";

import { About } from "@/components/landing/About";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { Heritage } from "@/components/landing/Heritage";
import { Hero } from "@/components/landing/Hero";
import { Highlights } from "@/components/landing/Highlights";
import { Initiatives } from "@/components/landing/Initiatives";
import { Navbar } from "@/components/landing/Navbar";
import { NewsMedia } from "@/components/landing/NewsMedia";
import { Preloader } from "@/components/landing/Preloader";

export default function Landing() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-cream font-sans text-ink antialiased">
      <Preloader onDone={() => setIntroDone(true)} />
      <div className="grain-overlay" aria-hidden />
      <Navbar />
      <main>
        <Hero start={introDone} />
        <Highlights />
        <About />
        <Initiatives />
        <Heritage />
        <NewsMedia />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
