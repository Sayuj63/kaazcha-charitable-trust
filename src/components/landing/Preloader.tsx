import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { EASE } from "./shared";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDoneRef.current();
      return;
    }
    const fallback = window.setTimeout(() => setExiting(true), 6000);
    return () => window.clearTimeout(fallback);
  }, []);

  const handleEnded = () => {
    window.setTimeout(() => setExiting(true), 250);
  };

  return (
    <AnimatePresence onExitComplete={onDoneRef.current}>
      {!exiting && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-deep text-cream"
        >
          <div className="grain-overlay" />
          <video
            ref={videoRef}
            src="/kcc-intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            className="h-full w-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
