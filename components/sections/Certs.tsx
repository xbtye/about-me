"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Cert {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  icon: "shield" | "trophy" | "terminal" | "brain";
  accentHue: string; // hsl hue string for variety
}

const certs: Cert[] = [
  {
    id: "01",
    title: "Complete Ethical Hacking Bootcamp",
    issuer: "Zero To Mastery",
    date: "2025",
    url: "#",
    icon: "shield",
    accentHue: "199",
  },
  {
    id: "02",
    title: "E-Summit 2026 Hackathon",
    issuer: "BIT Sindri",
    date: "2026",
    url: "#",
    icon: "trophy",
    accentHue: "142",
  },
  {
    id: "03",
    title: "Ranchi Hacks 2026",
    issuer: "GDG Ranchi",
    date: "2026",
    url: "#",
    icon: "terminal",
    accentHue: "270",
  },
  {
    id: "04",
    title: "Career Guidance Seminar",
    issuer: "E-Cell IIT Hyderabad",
    date: "2026",
    url: "#",
    icon: "brain",
    accentHue: "30",
  },
];

/* ── SVG Icons ── */
function CertIcon({ type, color }: { type: Cert["icon"]; color: string }) {
  const size = 32;
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 2l7 4v5c0 5.25-3.5 8.75-7 10-3.5-1.25-7-4.75-7-10V6l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...props}>
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
          <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
          <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
          <path d="M12 16v2" />
          <path d="M8 22h8" />
          <path d="M8 22v-4h8v4" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...props}>
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M7 9l3 3-3 3" />
          <path d="M13 15h4" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <path d="M12 2a4 4 0 0 1 4 4c0 .7-.2 1.3-.5 1.9A4 4 0 0 1 18 12a4 4 0 0 1-2 3.5V18a4 4 0 0 1-8 0v-2.5A4 4 0 0 1 6 12a4 4 0 0 1 2.5-4.1A3.9 3.9 0 0 1 8 6a4 4 0 0 1 4-4z" />
          <path d="M12 2v20" />
        </svg>
      );
  }
}

export default function Certs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certs"
      className="w-full py-24"
      style={{ background: "transparent" }}
      aria-labelledby="certs-heading"
    >
      <div ref={ref} className="max-w-350 mx-auto px-6 lg:px-20">
        {/* Section header */}
        <div className="flex items-end gap-6 mb-14">
          <div className="flex flex-col gap-2">
            <motion.span
              className="font-orbitron text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)", opacity: 0.6 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.5 }}
            >
              05 / 07
            </motion.span>
            <motion.h2
              id="certs-heading"
              className="font-display font-bold leading-none"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "var(--text-primary)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              CERTIFICATIONS
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

        {/* Cert cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((cert, index) => {
            const accent = `hsl(${cert.accentHue}, 85%, 60%)`;
            const accentDim = `hsl(${cert.accentHue}, 70%, 45%)`;
            const accentBg = `hsla(${cert.accentHue}, 85%, 55%, 0.08)`;
            const accentBorder = `hsla(${cert.accentHue}, 85%, 55%, 0.22)`;
            const accentBorderHover = `hsla(${cert.accentHue}, 85%, 55%, 0.55)`;
            const accentGlow = `hsla(${cert.accentHue}, 85%, 55%, 0.12)`;
            const accentGlowHover = `hsla(${cert.accentHue}, 85%, 55%, 0.25)`;

            return (
              <motion.a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-5 p-6 rounded-xl overflow-hidden outline-none focus-visible:ring-2 cursor-pointer"
                style={{
                  background: "var(--card-bg)",
                  border: `1px solid ${accentBorder}`,
                  backdropFilter: "blur(20px)",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${accentGlow}`,
                  transition:
                    "border-color 300ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.22,1,0.36,1)",
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = accentBorderHover;
                  el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.6), 0 0 35px ${accentGlowHover}`;
                  el.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = accentBorder;
                  el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${accentGlow}`;
                  el.style.transform = "";
                }}
              >
                {/* Top decorative line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
                    opacity: 0.6,
                  }}
                  aria-hidden="true"
                />

                {/* Header: ID + Icon */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs tracking-widest"
                    style={{ color: accentDim, opacity: 0.7 }}
                  >
                    #{cert.id}
                  </span>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: accentBg,
                      border: `1px solid ${accentBorder}`,
                    }}
                  >
                    <CertIcon type={cert.icon} color={accent} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold leading-tight text-base"
                  style={{ color: "var(--text-primary)" }}
                >
                  {cert.title}
                </h3>

                {/* Issuer + Date */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span
                    className="font-mono text-xs"
                    style={{ color: accent }}
                  >
                    {cert.issuer}
                  </span>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{
                      color: accentDim,
                      borderColor: accentBorder,
                      background: accentBg,
                    }}
                  >
                    {cert.date}
                  </span>
                </div>

                {/* Hover arrow indicator */}
                <div
                  className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
                  style={{ color: accent }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
