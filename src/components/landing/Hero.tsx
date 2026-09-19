import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero({ start: _start }: { start: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden bg-deep"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="/sightseeing-in-kerala.jpg"
          alt="Palm-lined Keralam backwaters under a monsoon sky"
          loading="eager"
          decoding="async"
          className="h-full w-full animate-kenburns object-cover"
        />
      </motion.div>
    </section>
  );
}
