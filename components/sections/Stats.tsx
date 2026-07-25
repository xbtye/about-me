"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

const stats: Stat[] = [
  { label: "Security Tools", value: 6, suffix: "+" },
  { label: "Labs Completed", value: 50, suffix: "+" },
  { label: "Hackathons", value: 2 },
];

function Counter({ value, suffix = "", prefix = "", done }: Stat & { done: boolean }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!done || started.current) return;
    started.current = true;

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [done, value]);

  return (
    <span className="font-mono tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stats"
      className="relative w-full py-16"
      style={{ background: "transparent" }}
      aria-label="Statistics"
    >
      <div
        ref={ref}
        className="mx-auto px-6 lg:px-20 flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card flex flex-col gap-4 rounded-xl"
            style={{ padding: "2rem 3rem", minWidth: 220 }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Big number */}
            <span
              className="font-display font-bold leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--text-primary)" }}
              aria-label={`${stat.value}${stat.suffix ?? ""} ${stat.label}`}
            >
              <Counter {...stat} done={inView} />
            </span>

            {/* Underline draws on when counter finishes */}
            <motion.span
              className="block h-px origin-left"
              style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 + 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Label */}
            <span
              className="font-orbitron text-xs tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
