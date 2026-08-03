"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { tools } from "@/lib/data/tools";
import { cn } from "@/lib/utils";

/* ── Tiny particle canvas for MailDefender featured tile ── */
function FeaturedBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }
    const nodes: Node[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      /* Draw edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.18;
            ctx.strokeStyle = `rgba(0,176,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* Draw nodes */
      nodes.forEach((n) => {
        ctx.fillStyle = "rgba(0,176,255,0.25)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}

/* ── Bento tile ── */
interface TileProps {
  tool: (typeof tools)[number];
  index: number;
  featured?: boolean;
  stretch?: boolean;
}

function Tile({ tool, index, featured, stretch }: TileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const slug = tool.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  /* 3D tilt on hover */
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / rect.height) * -6;
    const rotY = ((x - rect.width / 2) / rect.width) * 6;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <motion.article
      ref={ref}
      className={cn(
        "group relative rounded-xl overflow-hidden cursor-pointer flex flex-col border border-[rgba(0,176,255,0.22)]",
        "transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,176,255,0.12)]",
        "hover:border-[rgba(0,176,255,0.6)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(0,176,255,0.25)]",
        featured ? "min-h-[280px] sm:min-h-[440px]" : "min-h-[260px] sm:min-h-[320px]",
        stretch && "h-full",
      )}
      style={{
        background: "rgba(8, 12, 18, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        willChange: "transform",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* ── macOS Terminal Window Header Bar ── */}
      <div
        className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b shrink-0 select-none gap-2"
        style={{
          background: "linear-gradient(180deg, rgba(22, 28, 38, 0.95) 0%, rgba(14, 18, 26, 0.95) 100%)",
          borderColor: "rgba(0, 176, 255, 0.15)",
        }}
      >
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] inline-flex items-center justify-center text-[7px] sm:text-[8px] font-mono text-black/70 opacity-90 group-hover:opacity-100 transition-opacity">
            <span className="opacity-0 group-hover:opacity-100 font-bold">×</span>
          </span>
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] inline-flex items-center justify-center text-[7px] sm:text-[8px] font-mono text-black/70 opacity-90 group-hover:opacity-100 transition-opacity">
            <span className="opacity-0 group-hover:opacity-100 font-bold">–</span>
          </span>
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] inline-flex items-center justify-center text-[7px] sm:text-[8px] font-mono text-black/70 opacity-90 group-hover:opacity-100 transition-opacity">
            <span className="opacity-0 group-hover:opacity-100 font-bold">+</span>
          </span>
        </div>

        {/* macOS Window Title Prompt — hidden on very small screens, truncated on mid */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-muted-foreground/80 tracking-wide min-w-0 truncate">
          <span className="text-[var(--accent)] font-semibold shrink-0">zsh</span>
          <span className="text-white/20 shrink-0">—</span>
          <span className="text-gray-400 truncate">vishal@macbook: ~/{slug}</span>
        </div>

        {/* Tag Pill / Badge */}
        {tool.tag ? (
          <span
            className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded border shrink-0 whitespace-nowrap"
            style={
              tool.tagColor === "red"
                ? {
                    color: "var(--neon-red-soft)",
                    borderColor: "rgba(0,229,255,0.3)",
                    background: "rgba(0,229,255,0.08)",
                  }
                : {
                    color: "var(--accent-soft)",
                    borderColor: "rgba(0,176,255,0.25)",
                    background: "rgba(0,176,255,0.08)",
                  }
            }
          >
            {tool.tag}
          </span>
        ) : (
          <span className="font-mono text-[10px] text-gray-500 shrink-0">80×24</span>
        )}
      </div>

      {/* Spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(0,176,255,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Featured animated background */}
      {featured && <FeaturedBg />}

      {/* Grid bg pattern for grid variant */}
      {tool.bgVariant === "grid" && (
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Terminal Content Body ── */}
      <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-6 gap-3 sm:gap-4 font-mono">
        {/* Terminal ZSH CLI Prompt */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs flex-wrap">
          <span className="text-[#39ff14] font-bold">➜</span>
          <span className="text-[#00b0ff] font-semibold">{slug}</span>
          <span className="text-gray-400">git:(<span className="text-[#ff5f56]">main</span>)</span>
          <span className="text-gray-500">cat README.md</span>
        </div>

        {/* Title Output */}
        <div className="flex items-baseline gap-3 pt-1">
          <span className="text-[var(--accent)] font-bold text-sm select-none">&gt;</span>
          <h3
            className={cn(
              "font-display font-bold leading-tight tracking-wide",
              featured ? "text-xl sm:text-2xl lg:text-3xl" : "text-lg sm:text-xl",
            )}
            style={{ color: "var(--text-primary)" }}
          >
            {tool.title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="font-sans text-xs sm:text-sm leading-relaxed flex-1 text-gray-300/90 pl-4 sm:pl-6 border-l-2"
          style={{ borderColor: "rgba(0,176,255,0.25)" }}
        >
          {tool.description}
        </p>

        {/* Stack Flags / Terminal Pills */}
        {tool.stack.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2">
            <span className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-wider mr-1">$ --deps:</span>
            {tool.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[rgba(0,176,255,0.06)] border border-[rgba(0,176,255,0.18)] text-[var(--accent-soft)]"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Terminal Command Execution Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 mt-auto relative z-20">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-md transition-all duration-200 focus-visible:ring-2 cursor-pointer"
              style={{
                color: "#e8eef5",
                background: "rgba(0,176,255,0.12)",
                border: "1px solid rgba(0,176,255,0.45)",
                boxShadow: "0 0 16px rgba(0,176,255,0.15)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(0,176,255,0.22)";
                el.style.borderColor = "rgba(0,176,255,0.9)";
                el.style.boxShadow = "0 0 24px rgba(0,176,255,0.35)";
                el.style.color = "#40c4ff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(0,176,255,0.12)";
                el.style.borderColor = "rgba(0,176,255,0.45)";
                el.style.boxShadow = "0 0 16px rgba(0,176,255,0.15)";
                el.style.color = "#e8eef5";
              }}
            >
              <span className="text-[#39ff14]">$</span>
              <span>
                {tool.id === "03"
                  ? "./explore.sh →"
                  : tool.stack.includes("Guide") || tool.stack.includes("eBOOK")
                    ? "./read-docs.sh →"
                    : "./run-source.sh →"}
              </span>
            </a>

            {tool.docsHref && (
              <a
                href={tool.docsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-md transition-all duration-200"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,176,255,0.4)";
                  el.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                  el.style.color = "var(--text-muted)";
                }}
              >
                $ cat docs.md →
              </a>
            )}
          </div>

          {/* Active Terminal Cursor */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
            <span className="w-2 h-3 bg-[#00b0ff] animate-pulse inline-block" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ── */
export default function Arsenal() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="tools"
      className="w-full py-24"
      style={{ background: "transparent" }}
      aria-labelledby="arsenal-heading"
    >
      <div className="max-w-350 mx-auto px-6 lg:px-20">
        {/* Section header */}
        <div ref={headingRef} className="flex items-end gap-6 mb-14">
          <div className="flex flex-col gap-2">
            <motion.span
              className="font-orbitron text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)", opacity: 0.6 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.5 }}
            >
              02 / 06
            </motion.span>

            <motion.h2
              id="arsenal-heading"
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
              TOOLS &amp; PROJECTS
            </motion.h2>
          </div>

          {/* Draw-on line */}
          <motion.div
            className="flex-1 h-px mb-3 origin-left hidden md:block"
            style={{ background: "var(--grid-line)" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
        </div>

        {/* Four equal cards in a 2x2 grid with consistent height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4">
          <Tile tool={tools[0]} index={0} featured stretch />
          <Tile tool={tools[1]} index={1} stretch />
          <Tile tool={tools[2]} index={2} stretch />
          <Tile tool={tools[3]} index={3} stretch />
        </div>
      </div>
    </section>
  );
}
