import { useState } from "react";

import { About } from "@/components/landing/About";
import { BlessySpeaks } from "@/components/landing/BlessySpeaks";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Highlights } from "@/components/landing/Highlights";
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
        <About />
        <Highlights />
        <BlessySpeaks />
        <NewsMedia />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
