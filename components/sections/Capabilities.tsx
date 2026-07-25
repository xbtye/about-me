"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { capabilities } from "@/lib/data/capabilities";

function CapabilityCard({ cap, index }: { cap: (typeof capabilities)[number]; index: number }) {
  const isCyan = cap.accentColor === "cyan";
  const accentVar  = isCyan ? "var(--accent)"      : "var(--neon-red)";
  const accentSoft = isCyan ? "var(--accent-soft)"  : "var(--neon-red-soft)";
  const borderBase = isCyan ? "rgba(0,176,255,0.12)"     : "rgba(0,229,255,0.12)";
  const borderHover= isCyan ? "rgba(0,176,255,0.5)"      : "rgba(0,229,255,0.45)";
  const glowBase   = isCyan
    ? "0 0 20px rgba(0,176,255,0.08), inset 0 1px 0 rgba(0,176,255,0.05)"
    : "0 0 20px rgba(0,229,255,0.08), inset 0 1px 0 rgba(0,229,255,0.05)";
  const glowHover  = isCyan
    ? "0 0 40px rgba(0,176,255,0.15), inset 0 1px 0 rgba(0,176,255,0.08)"
    : "0 0 40px rgba(0,229,255,0.12), inset 0 1px 0 rgba(0,229,255,0.08)";

  return (
    <motion.article
      className="relative flex flex-col gap-6 p-7 rounded-sm"
      style={{
        background: "rgba(10, 14, 20, 0.4)",
        border: `1px solid ${borderBase}`,
        backdropFilter: "blur(24px)",
        boxShadow: glowBase,
        transition: "border-color 300ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = borderHover;
        el.style.boxShadow = glowHover;
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = borderBase;
        el.style.boxShadow = glowBase;
        el.style.transform = "";
      }}
    >
      {/* Top row: index + accent line */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs" style={{ color: accentVar, opacity: 0.6 }}>
          // {cap.id}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${accentVar}, transparent)`, opacity: 0.3 }}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold leading-tight"
        style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: "var(--text-primary)" }}
      >
        {cap.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {cap.description}
      </p>

      {/* Technique list */}
      <ul className="flex flex-col gap-0" role="list">
        {cap.techniques.map((t) => (
          <li
            key={t}
            className="flex items-center gap-3 py-2.5 border-b last:border-b-0"
            style={{ borderColor: "var(--grid-line)" }}
          >
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: accentSoft, opacity: 0.7 }}
              aria-hidden="true"
            />
            <span className="font-mono text-xs" style={{ color: "var(--text-primary)" }}>
              {t}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="capabilities"
      className="w-full py-24"
      style={{ background: "transparent" }}
      aria-labelledby="cap-heading"
    >
      <div ref={ref} className="max-w-350 mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="flex items-end gap-6 mb-14">
          <div className="flex flex-col gap-2">
            <motion.span
              className="font-orbitron text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)", opacity: 0.6 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.5 }}
            >
              03 / 06
            </motion.span>
            <motion.h2
              id="cap-heading"
              className="font-display font-bold leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              CAPABILITIES
            </motion.h2>
          </div>
          <motion.div
            className="flex-1 h-px mb-3 origin-left hidden md:block"
            style={{ background: "var(--grid-line)" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            aria-hidden="true"
          />
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
