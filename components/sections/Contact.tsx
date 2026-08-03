"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const LINKEDIN_URL = "https://linkedin.com/in/vishal-kumar-319668325/";
const GITHUB_URL = "https://github.com/Vishaal0003";
const EMAIL_URL = "mailto:vs1120204@gmail.com";

const channels = [
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "vishal-kumar-319668325",
    href: LINKEDIN_URL,
    description: "Connect with me for professional networking, SOC roles, and industry collaborations.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    handle: "https://github.com/Vishaal0003",
    href: GITHUB_URL,
    description: "Check out my open-source defensive security tools, Python automations, and lab scripts.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    handle: "vs1120204@gmail.com",
    href: EMAIL_URL,
    description: "Direct channel. Feel free to reach out for career opportunities or project inquiries.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base: React.CSSProperties = { position: "absolute", width: 16, height: 16, border: "1.5px solid rgba(0,176,255,0.55)" };
  const sides: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
    tr: { top: 0, right: 0, borderLeft: "none", borderBottom: "none" },
    bl: { bottom: 0, left: 0, borderRight: "none", borderTop: "none" },
    br: { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
  };
  return <div style={{ ...base, ...sides[pos] }} aria-hidden="true" />;
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="w-full py-24"
      style={{ background: "transparent" }}
      aria-labelledby="contact-heading"
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
              05 / 06
            </motion.span>
            <motion.h2
              id="contact-heading"
              className="font-display font-bold leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              INITIATE CONTACT
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

        {/* Intro — full width so it doesn't push the portrait down */}
        <motion.p
          className="text-base mb-12 max-w-lg"
          style={{ color: "var(--text-muted)", lineHeight: 1.8 }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Looking to strengthen your security posture?{" "}
          <span style={{ color: "var(--text-primary)" }}>Let&apos;s build together.</span>
          {" "}Available for SOC internships, security engineering discussions, or collaborating on defensive tools and automation.
        </motion.p>

        {/* Body — two columns on desktop */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

          {/* Left: channel cards */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {channels.map((ch, i) => (
                <motion.a
                  key={ch.id}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card group flex flex-col gap-5 p-7 rounded-sm focus-visible:ring-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  aria-label={`Contact on ${ch.label}`}
                >
                  <div
                    className="w-11 h-11 rounded-sm flex items-center justify-center"
                    style={{
                      color: "var(--text-muted)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--grid-line)",
                    }}
                  >
                    {ch.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                      {ch.label}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--accent)", opacity: 0.7 }}>
                      {ch.handle}
                    </span>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {ch.description}
                    </p>
                  </div>
                  <span
                    className="font-mono text-xs mt-auto transition-all duration-200 group-hover:translate-x-1"
                    style={{ color: "var(--accent)" }}
                  >
                    Open {ch.label} →
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: portrait — desktop only */}
          <motion.div
            className="hidden lg:flex flex-col items-center gap-5 shrink-0 glass-card rounded-sm overflow-hidden"
            style={{ width: 240, padding: "1.25rem" }}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Framed portrait */}
            <div className="relative w-full" style={{ height: 200 }}>
              <Corner pos="tl" />
              <Corner pos="tr" />
              <Corner pos="bl" />
              <Corner pos="br" />

              <Image
                src="/electron.png"
                alt="VISHAL KUMAR"
                fill
                unoptimized
                className="object-contain object-top"
                style={{
                  filter: "drop-shadow(0 0 28px rgba(0,176,255,0.45)) drop-shadow(0 0 10px rgba(0,229,255,0.2))",
                }}
              />

              {/* Bottom dissolve */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "38%",
                  background: "linear-gradient(to bottom, transparent, var(--bg-void))",
                  zIndex: 10,
                }}
                aria-hidden="true"
              />
            </div>

            {/* Meta labels */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              <span
                className="font-mono text-xs tracking-[0.18em]"
                style={{ color: "var(--text-muted)", opacity: 0.5 }}
              >
                // DEFENDER
              </span>
              <span
                className="font-display font-bold tracking-wide text-center"
                style={{ color: "var(--text-primary)", fontSize: "1.1rem" }}
              >
                VISHAL KUMAR
              </span>
              {/* Pulsing status dot */}
              <div className="flex items-center gap-2 mt-1">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <span className="font-mono text-xs tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                  SECURE
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
