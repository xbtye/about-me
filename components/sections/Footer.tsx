"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="w-full py-8 relative"
      style={{
        background: "transparent",
      }}
      aria-label="Site footer"
    >
      {/* Cyber blue top line glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
          boxShadow: "0 0 16px rgba(0,176,255,0.45)",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="max-w-350 mx-auto px-6 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: identity */}
        <p
          className="font-mono text-xs text-center sm:text-left"
          style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
        >
          VISHAL KUMAR&nbsp;
          <span style={{ color: "var(--grid-line)" }}>// </span>© 2026&nbsp;
          <span style={{ color: "var(--grid-line)" }}>// </span>
          ALL RIGHTS RESERVED
        </p>

        {/* Center: linkedin */}
        <a
          href="https://linkedin.com/in/vishal-kumar-319668325/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm font-mono text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            color: "var(--text-primary)",
            background: "rgba(0,176,255,0.08)",
            border: "1px solid rgba(0,176,255,0.5)",
            boxShadow: "0 0 18px rgba(0,176,255,0.15), inset 0 1px 0 rgba(0,176,255,0.06)",
            letterSpacing: "0.06em",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(0,176,255,0.14)";
            el.style.borderColor = "rgba(0,176,255,0.85)";
            el.style.boxShadow = "0 0 32px rgba(0,176,255,0.35), 0 0 80px rgba(0,176,255,0.12), inset 0 1px 0 rgba(0,176,255,0.1)";
            el.style.color = "#40c4ff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(0,176,255,0.08)";
            el.style.borderColor = "rgba(0,176,255,0.5)";
            el.style.boxShadow = "0 0 18px rgba(0,176,255,0.15), inset 0 1px 0 rgba(0,176,255,0.06)";
            el.style.color = "var(--text-primary)";
          }}
          aria-label="Connect on LinkedIn"
        >
          CONNECT ON LINKEDIN
        </a>

        {/* Right: status */}
        <div
          className="flex items-center gap-2 font-mono text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <span style={{ letterSpacing: "0.1em" }}>STATUS:</span>
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--accent)" }}
            animate={{ opacity: [1, 0.2, 1], boxShadow: ["0 0 6px rgba(0,176,255,0.8)", "0 0 2px rgba(0,176,255,0.2)", "0 0 6px rgba(0,176,255,0.8)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Secure"
          />
          <span style={{ color: "var(--accent)", letterSpacing: "0.08em" }}>
            SECURE
          </span>
        </div>
      </div>
    </footer>
  );
}
