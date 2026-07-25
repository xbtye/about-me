"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridBackground from "./GridBackground";
import MaskScene from "./MaskScene";

const PLATFORMS = ["SIEM", "SPLUNK", "WIRESHARK", "NMAP", "TRYHACKME", "INCIDENT RESPONSE", "DEFENSE"];
const marqueeText = Array(4).fill(PLATFORMS).flat();

const HUD_LINES = [
  { label: "SUBJECT", value: "VISHAL KUMAR", color: "var(--accent-soft)" },
  { label: "STATUS", value: "MONITORING", color: "var(--accent)" },
  { label: "SHIELD_LVL", value: "MAXIMUM", color: "var(--neon-red)" },
  { label: "SIG", value: "VK:00:03:91:28", color: "var(--text-muted)" },
];

const HUD_LINES_LEFT = [
  { label: "NET_STATUS", value: "SECURE", color: "var(--accent)" },
  { label: "ENC_TYPE", value: "AES-256-GCM", color: "var(--text-muted)" },
  { label: "LAST_ALERT", value: "RESOLVED", color: "var(--neon-red)" },
  { label: "MONITORS", value: "03 ACTIVE", color: "var(--accent-soft)" },
];

const HUD_RETICLE_LINES = [
  { label: "BIOMETRIC", value: "CONFIRMED" },
  { label: "CLEARANCE", value: "LEVEL-4-SOC" },
  { label: "SECURE_RATIO", value: "100.0%" },
];

function HudCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 20,
    height: 20,
    border: "1.5px solid rgba(0,176,255,0.65)",
  };
  const corners: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
    tr: { top: 0, right: 0, borderLeft: "none", borderBottom: "none" },
    bl: { bottom: 0, left: 0, borderRight: "none", borderTop: "none" },
    br: { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
  };
  return <div style={{ ...base, ...corners[pos] }} aria-hidden="true" />;
}

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const t1 = setTimeout(() => setScanning(true), 1400);
    const t2 = setTimeout(() => {
      setScanning(false);
      setLocked(true);
    }, 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [booted]);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#04060a" }}
      aria-label="Hero section"
    >
      {/* ── 0: Right-positioned character portrait ── */}
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <Image
          src="/vishal_defender_hero.png"
          alt=""
          fill
          priority
          unoptimized
          className="character-portrait"
          style={{ opacity: 5 }}
        />
        {/* Seamless left-to-character blend */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #04060a 0%, rgba(4,6,10,0.72) 18%, rgba(4,6,10,0.28) 44%, rgba(4,6,10,0.04) 68%, transparent 85%)",
          }}
        />
        {/* Atmospheric bottom dissolve */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "48%",
            background:
              "linear-gradient(to top, #04060a 0%, rgba(4,6,10,0.78) 38%, transparent 100%)",
          }}
        />
        {/* Cyber-blue ground fog */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "32%",
            background:
              "radial-gradient(ellipse 90% 55% at 55% 100%, rgba(0,176,255,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Right edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(4,6,10,0.55) 0%, transparent 25%)",
          }}
        />
        {/* Mobile full-screen darkening overlay — text must read over this */}
        <div
          className="lg:hidden absolute inset-0"
          style={{ background: "rgba(4,6,10,0.62)" }}
        />
      </div>

      {/* ── 1: Scanlines ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* ── 2: Perspective grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3, opacity: 0.4 }}
        aria-hidden="true"
      >
        <GridBackground />
      </div>

      {/* ── 3: R3F particles ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 4 }}
        aria-hidden="true"
      >
        <MaskScene />
      </div>

      {/* ── 4.5: VISHAL watermark ── */}
      <div
        className="absolute inset-x-0 pointer-events-none flex overflow-hidden"
        style={{ zIndex: 6, top: "6%" }}
        aria-hidden="true"
      >
        {"VISHAL".split("").map((letter, i) => (
          <motion.span
            key={i}
            className="hero-watermark-letter font-orbitron font-black select-none"
            style={{
              lineHeight: 1,
              letterSpacing: "0.06em",
              color: "var(--text-primary)",
              paddingLeft: i === 0 ? "clamp(0.75rem, 2.5vw, 5rem)" : undefined,
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: booted ? 0.09 : 0, y: booted ? 0 : 60 }}
            transition={{
              duration: 1.0,
              delay: 0.8 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* ── 4: Boot scan line ── */}
      <AnimatePresence>
        {!booted && (
          <motion.div
            className="boot-scan-line"
            style={{ zIndex: 9999 }}
            initial={{ top: 0, opacity: 1 }}
            animate={{ top: "100vh", opacity: [1, 1, 0] }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* ── 5: HUD overlay — desktop only, overlays character zone ── */}
      <motion.div
        className="absolute hidden lg:block pointer-events-none"
        style={{
          left: "40%",
          right: "4%",
          top: "5%",
          bottom: "18%",
          zIndex: 10,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="relative w-full h-full">
          <HudCorner pos="tl" />
          <HudCorner pos="tr" />
          <HudCorner pos="bl" />
          <HudCorner pos="br" />

          {/* SCANNING / LOCKED label */}
          <div
            style={{
              position: "absolute",
              top: "1.5%",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            <AnimatePresence mode="wait">
              {scanning && (
                <motion.span
                  key="scan"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    color: "rgba(0,176,255,0.75)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                >
                  SCANNING...
                </motion.span>
              )}
              {locked && (
                <motion.span
                  key="locked"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    color: "var(--neon-red-soft)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  [ TARGET LOCKED ]
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Scan sweep line */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,176,255,0.55), rgba(0,176,255,0.55), transparent)",
                  boxShadow: "0 0 10px rgba(0,176,255,0.4)",
                }}
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "linear" }}
              />
            )}
          </AnimatePresence>

          {/* Reticle */}
          <AnimatePresence>
            {locked && (
              <motion.div
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  className="reticle-locked"
                  aria-hidden="true"
                >
                  <circle cx="30" cy="30" r="22" stroke="rgba(0,176,255,0.45)" strokeWidth="1" className="reticle-outer-ring" />
                  <circle cx="30" cy="30" r="28" stroke="rgba(0,176,255,0.12)" strokeWidth="0.5" className="reticle-sweep-ring" />
                  <circle cx="30" cy="30" r="4" stroke="rgba(0,176,255,0.65)" strokeWidth="1" />
                  <circle cx="30" cy="30" r="1.5" fill="rgba(0,176,255,0.8)" />
                  <line x1="30" y1="4" x2="30" y2="20" stroke="rgba(0,176,255,0.5)" strokeWidth="1" />
                  <line x1="30" y1="40" x2="30" y2="56" stroke="rgba(0,176,255,0.5)" strokeWidth="1" />
                  <line x1="4" y1="30" x2="20" y2="30" stroke="rgba(0,176,255,0.5)" strokeWidth="1" />
                  <line x1="40" y1="30" x2="56" y2="30" stroke="rgba(0,176,255,0.5)" strokeWidth="1" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Data readout — bottom-right */}
          <AnimatePresence>
            {locked && (
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "6%",
                  right: "3%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                  alignItems: "flex-end",
                }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {HUD_LINES.map((line, i) => (
                  <motion.div
                    key={line.label}
                    style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.09 }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", color: "rgba(107,119,133,0.75)" }}>
                      {line.label}
                    </span>
                    <span
                      className="hud-value-live"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.08em", color: line.color, animationDelay: `${1.5 + i * 1.2}s` }}
                    >
                      {line.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top-left micro label */}
          <div
            style={{
              position: "absolute",
              top: "1.5%",
              left: "2%",
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.14em",
              color: "rgba(0,176,255,0.35)",
            }}
          >
            INTEL // CLASSIFIED
          </div>

          {/* Top-right coordinate display */}
          <AnimatePresence>
            {locked && (
              <motion.div
                style={{
                  position: "absolute",
                  top: "1.5%",
                  right: "2%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.2rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5.rem", letterSpacing: "0.12em", color: "rgba(0,176,255,0.3)" }}>
                  TARGET_COORD
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.08em", color: "rgba(107,119,133,0.6)" }}>
                  23.3441°N · 85.3096°E
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reticle annotations */}
          <AnimatePresence>
            {locked && (
              <motion.div
                style={{
                  position: "absolute",
                  top: "calc(30% + 38px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.22rem",
                  alignItems: "center",
                }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.5 }}
              >
                {HUD_RETICLE_LINES.map((line, i) => (
                  <motion.div
                    key={line.label}
                    style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 + i * 0.08 }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.48rem", letterSpacing: "0.12em", color: "rgba(107,119,133,0.55)" }}>
                      {line.label}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "rgba(0,176,255,0.55)" }}>
                      {line.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left data readout */}
          <AnimatePresence>
            {locked && (
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "6%",
                  left: "3%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                  alignItems: "flex-start",
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {HUD_LINES_LEFT.map((line, i) => (
                  <motion.div
                    key={line.label}
                    style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.09 }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", color: "rgba(107,119,133,0.75)" }}>
                      {line.label}
                    </span>
                    <span
                      className="hud-value-live"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.08em", color: line.color, animationDelay: `${2.2 + i * 1.4}s` }}
                    >
                      {line.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom center divider */}
          <AnimatePresence>
            {locked && (
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "6%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 1,
                  height: "14%",
                  background: "linear-gradient(to top, rgba(0,176,255,0.2), transparent)",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── 6: Text content ── */}
      <motion.div
        className="relative flex flex-col justify-center flex-1 px-6 lg:px-20 pt-24 pb-32 max-w-2xl"
        style={{ zIndex: 15 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Eyebrow */}
        <motion.p
          className="font-mono text-xs tracking-[0.25em] uppercase mb-6"
          style={{ color: "var(--accent)", opacity: 0.7 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {"// SOC ANALYST · BLUE TEAM"}
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold leading-[0.95] tracking-tight mb-6"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{ color: "var(--text-primary)" }}>EVERY</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>SYSTEM</span>
          <br />
          <span style={{ color: "#ff0000", textShadow: "0 0 15px #ff0000" }}>
            BLEEDS.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-base leading-relaxed max-w-sm mb-8"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          I find the wound, trace the source, and shut the door before the adversary walks through it.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-row flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#tools"
            className="hero-cta-primary group relative inline-flex items-center gap-2 px-7 py-3 rounded-sm font-mono text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: "rgba(0,176,255,0.08)",
              color: "var(--text-primary)",
              border: "1px solid rgba(0,176,255,0.5)",
              boxShadow:
                "0 0 18px rgba(0,176,255,0.15), inset 0 1px 0 rgba(0,176,255,0.06)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(0,176,255,0.14)";
              el.style.borderColor = "rgba(0,176,255,0.85)";
              el.style.boxShadow =
                "0 0 32px rgba(0,176,255,0.35), 0 0 80px rgba(0,176,255,0.12), inset 0 1px 0 rgba(0,176,255,0.1)";
              el.style.color = "#40c4ff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(0,176,255,0.08)";
              el.style.borderColor = "rgba(0,176,255,0.5)";
              el.style.boxShadow =
                "0 0 18px rgba(0,176,255,0.15), inset 0 1px 0 rgba(0,176,255,0.06)";
              el.style.color = "var(--text-primary)";
            }}
          >
            Explore Projects
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="#contact"
            className="hero-cta-secondary group inline-flex items-center gap-2 px-7 py-3 rounded-sm font-mono text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid rgba(232,238,245,0.15)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(0,176,255,0.5)";
              el.style.color = "var(--neon-red-soft)";
              el.style.boxShadow = "0 0 16px rgba(0,176,255,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(232,238,245,0.15)";
              el.style.color = "var(--text-primary)";
              el.style.boxShadow = "none";
            }}
          >
            Initiate Contact
          </a>
        </motion.div>

        {/* Section index */}
        <motion.span
          className="font-mono text-xs mt-8"
          style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          01 / 06
        </motion.span>

        {/* Mobile HUD strip */}
        <motion.div
          className="lg:hidden flex gap-6 mt-6 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: locked ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          aria-hidden="true"
        >
          {[...HUD_LINES, ...HUD_LINES_LEFT].slice(0, 5).map((line) => (
            <div key={line.label} className="flex flex-col gap-0.5 shrink-0">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.48rem",
                  letterSpacing: "0.14em",
                  color: "rgba(107,119,133,0.6)",
                }}
              >
                {line.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: line.color,
                }}
              >
                {line.value}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Platform marquee ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
        style={{
          background: "rgba(4,10,20,0.55)",
          borderTop: "1px solid rgba(0,176,255,0.12)",
          zIndex: 20,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        aria-hidden="true"
      >
        <div className="marquee-track flex gap-10 whitespace-nowrap w-max">
          {marqueeText.map((platform, i) => (
            <span
              key={i}
              className="font-mono text-xs tracking-[0.3em]"
              style={{ color: "rgba(232,238,245,0.35)" }}
            >
              {platform}
              <span
                className="ml-10"
                style={{ color: "var(--accent)", opacity: 0.35 }}
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.4 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-10 origin-top"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
          }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </motion.div>
    </section>
  );
}
