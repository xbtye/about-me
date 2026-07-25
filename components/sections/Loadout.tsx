/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Tools ───────────────────────────────────────────────────────────────────

interface Tool {
  name: string;
  accentColor: string;
  logo: React.ReactNode;
}

const CDN = "https://cdn.simpleicons.org";

const tools: Tool[] = [
  {
    name: "Splunk (SIEM)",
    accentColor: "#5FBA43",
    logo: <img src={`${CDN}/splunk/5FBA43`} alt="Splunk" width={58} height={58} style={{ objectFit: "contain" }} />,
  },
  {
    name: "Wireshark",
    accentColor: "#167E9F",
    logo: <img src={`${CDN}/wireshark/167e9f`} alt="Wireshark" width={58} height={58} style={{ objectFit: "contain" }} />,
  },
  {
    name: "Nmap",
    accentColor: "#4A9EDA",
    logo: <img src={`${CDN}/nmap/4a9eda`} alt="Nmap" width={58} height={58} style={{ objectFit: "contain" }} />,
  },
  {
    name: "Linux Security",
    accentColor: "#FCC624",
    logo: <img src={`${CDN}/linux/fcc624`} alt="Linux" width={58} height={58} style={{ objectFit: "contain" }} />,
  },
  {
    name: "Python (Defense)",
    accentColor: "#3776AB",
    logo: <img src={`${CDN}/python/3776ab`} alt="Python" width={58} height={58} style={{ objectFit: "contain" }} />,
  },
  {
    name: "TryHackMe Labs",
    accentColor: "#DE2920",
    logo: <img src={`${CDN}/tryhackme/de2920`} alt="TryHackMe" width={58} height={58} style={{ objectFit: "contain" }} />,
  },
  {
    name: "React & Node",
    accentColor: "#61DAFB",
    logo: <img src={`${CDN}/react/61dafb`} alt="React" width={58} height={58} style={{ objectFit: "contain" }} />,
  },
  {
    name: "TypeScript",
    accentColor: "#3178C6",
    logo: <img src={`${CDN}/typescript/3178c6`} alt="TypeScript" width={58} height={58} style={{ objectFit: "contain" }} />,
  },
  {
    name: "AI & Automations",
    accentColor: "#00E5FF",
    logo: (
      <svg viewBox="0 0 100 100" width="58" height="58" fill="none">
        <circle cx="12" cy="20" r="8" fill="#00E5FF" />
        <circle cx="12" cy="50" r="8" fill="#00E5FF" />
        <circle cx="12" cy="80" r="8" fill="#00E5FF" />
        <circle cx="50" cy="35" r="8" fill="#00E5FF" />
        <circle cx="50" cy="65" r="8" fill="#00E5FF" />
        <circle cx="88" cy="50" r="8" fill="#00E5FF" />
        <line x1="20" y1="20" x2="42" y2="35" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
        <line x1="20" y1="50" x2="42" y2="35" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
        <line x1="20" y1="80" x2="42" y2="35" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
        <line x1="20" y1="20" x2="42" y2="65" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
        <line x1="20" y1="50" x2="42" y2="65" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
        <line x1="20" y1="80" x2="42" y2="65" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
        <line x1="58" y1="35" x2="80" y2="50" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
        <line x1="58" y1="65" x2="80" y2="50" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
      </svg>
    ),
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 shrink-0"
      style={{
        width: 160,
        height: 160,
        marginRight: 20,
        background: "rgba(10, 14, 20, 0.55)",
        border: `1px solid ${tool.accentColor}28`,
        borderRadius: 14,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: `0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      <div style={{ width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {tool.logo}
      </div>
      <span
        className="font-mono uppercase text-center leading-tight px-2"
        style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: tool.accentColor, opacity: 0.8 }}
      >
        {tool.name}
      </span>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Loadout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="loadout"
      className="w-full py-20"
      style={{ background: "transparent" }}
      aria-labelledby="loadout-heading"
    >
      {/* Header — constrained */}
      <div ref={ref} className="max-w-350 mx-auto px-6 lg:px-20 mb-12">
        <div className="flex items-end gap-6">
          <div className="flex flex-col gap-2">
            <motion.span
              className="font-orbitron text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)", opacity: 0.6 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.5 }}
            >
              04 / 06
            </motion.span>
            <motion.h2
              id="loadout-heading"
              className="font-display font-bold leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              THE LOADOUT
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
      </div>

      {/* Carousel — full bleed with edge fade */}
      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex marquee-track-quad">
          {[...tools, ...tools, ...tools, ...tools].map((tool, i) => (
            <ToolCard key={i} tool={tool} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
