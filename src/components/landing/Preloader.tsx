import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { EASE } from "./shared";

/** The intro plays once per page load, not every time a visitor returns to
 *  the landing page from another route. */
let introPlayed = false;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(introPlayed);
  const onDoneRef = useRef(onDone);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (
      introPlayed ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      introPlayed = true;
      onDoneRef.current();
      return;
    }
    const fallback = window.setTimeout(() => setExiting(true), 6000);
    return () => window.clearTimeout(fallback);
  }, []);

  const handleEnded = () => {
    window.setTimeout(() => setExiting(true), 250);
  };

  const handleExitComplete = () => {
    introPlayed = true;
    onDoneRef.current();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white text-cream sm:bg-deep"
        >
          <div className="hidden sm:block">
            <div className="grain-overlay" />
          </div>
          <video
            ref={videoRef}
            src="/kcc-intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            className="absolute inset-0 h-full w-full object-contain sm:object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
