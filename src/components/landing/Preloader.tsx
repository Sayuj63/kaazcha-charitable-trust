import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { EASE } from "./shared";

const PETALS = [
  "M100 118 C86 102 86 70 100 52 C114 70 114 102 100 118 Z",
  "M100 122 C74 112 56 88 58 62 C82 66 98 86 100 116 Z",
  "M100 122 C126 112 144 88 142 62 C118 66 102 86 100 116 Z",
  "M92 128 C60 124 34 104 28 74 C54 80 80 100 94 124 Z",
  "M108 128 C140 124 166 104 172 74 C146 80 120 100 106 124 Z",
];

/**
 * Custom intro: a lotus that draws itself with ink-stroke SVG line animation,
 * a diya whose flame fills as progress advances, then a soft curtain reveal
 * into the homepage.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDoneRef.current();
      return;
    }
    const controls = animate(0, 100, {
      duration: 2.5,
      ease: "easeInOut",
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        window.setTimeout(() => setExiting(true), 400);
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence onExitComplete={onDoneRef.current}>
      {!exiting && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-deep text-cream"
        >
          <div className="grain-overlay" />
          <div className="relative flex flex-col items-center px-6">
            <svg
              viewBox="0 0 200 176"
              className="h-40 w-44 sm:h-52 sm:w-56"
              fill="none"
              aria-hidden
            >
              {/* lotus petals drawing themselves */}
              {PETALS.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="#e0b44e"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.15,
                    delay: 0.25 + i * 0.22,
                    ease: EASE,
                  }}
                />
              ))}
              {/* diya glow */}
              <motion.circle
                cx={100}
                cy={152}
                r={24}
                fill="#e0b44e"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.28, 0.14, 0.3] }}
                transition={{ duration: 2.6, times: [0, 0.4, 0.7, 1] }}
              />
              {/* flame */}
              <motion.path
                d="M100 128 C107 138 110 148 100 160 C90 148 93 138 100 128 Z"
                fill="#f3cf6b"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1, 1.12, 0.96, 1.08], opacity: [0, 1, 0.9, 1, 0.95] }}
                transition={{ duration: 2.6, times: [0, 0.3, 0.55, 0.8, 1], ease: EASE }}
                style={{ originX: "50%", originY: "100%" }}
              />
              {/* diya bowl */}
              <motion.path
                d="M76 158 C88 150 112 150 124 158 L119 167 L81 167 Z"
                stroke="#e0b44e"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
              />
              {/* wick */}
              <motion.path
                d="M96 152 L104 152"
                stroke="#e0b44e"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
              />
              {/* ground line */}
              <motion.path
                d="M60 172 H140"
                stroke="#faf2e3"
                strokeWidth={1.5}
                strokeDasharray="3 5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.9, duration: 0.6 }}
              />
            </svg>

            <div className="mt-6 flex flex-col items-center">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl text-gold-light tabular-nums">
                  {progress}
                </span>
                <span className="font-sans text-xs tracking-[0.3em] text-cream/50 uppercase">
                  %
                </span>
              </div>
              <div className="mt-4 h-px w-60 overflow-hidden bg-cream/15">
                <motion.div
                  className="h-full origin-left bg-gold-light"
                  style={{ scaleX: progress / 100 }}
                />
              </div>
              <p className="mt-6 font-sans text-[11px] font-semibold tracking-[0.42em] text-cream/80 uppercase">
                Kaazcha Charitable Trust
              </p>
              <p className="mt-1.5 font-display text-sm italic text-cream/50">
                turning the pages…
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
