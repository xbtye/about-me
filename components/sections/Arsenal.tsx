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

  /* 3D tilt on hover */
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / rect.height) * -8;
    const rotY = ((x - rect.width / 2) / rect.width) * 8;
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
        "glass-card group relative rounded-lg overflow-hidden cursor-pointer flex flex-col",
        "transition-[transform,border-color,box-shadow]",
        featured ? "min-h-105" : "min-h-50",
        stretch && "h-full",
      )}
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
      style={{ willChange: "transform" }}
    >
      {/* Defender ambient background */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/electron.png"
          alt=""
          fill
          unoptimized
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0,
          }}
        />
      </div>

      {/* Spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        style={{
          background:
            "radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), rgba(0,176,255,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Featured animated background */}
      {featured && <FeaturedBg />}

      {/* Grid bg pattern for grid variant */}
      {tool.bgVariant === "grid" && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-6 pb-8 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <span
            className="font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {`// ${tool.id}`}
          </span>
          {tool.tag && (
            <span
              className="font-mono text-xs px-2 py-0.5 rounded-sm border"
              style={
                tool.tagColor === "red"
                  ? {
                    color: "var(--neon-red-soft)",
                    borderColor: "rgba(0,229,255,0.3)",
                    background: "rgba(0,229,255,0.08)",
                  }
                  : {
                    color: "var(--accent-soft)",
                    borderColor: "rgba(0,176,255,0.2)",
                    background: "rgba(0,176,255,0.06)",
                  }
              }
            >
              {tool.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-display font-bold leading-tight",
            featured ? "text-3xl" : "text-xl",
          )}
          style={{ color: "var(--text-primary)" }}
        >
          {tool.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {tool.description}
        </p>

        {/* Stack pills */}
        {tool.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tool.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-xs px-2 py-0.5 rounded-sm"
                style={{
                  color: "var(--text-muted)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-1"
            style={{
              color: "var(--text-primary)",
              background: "rgba(0,176,255,0.08)",
              border: "1px solid rgba(0,176,255,0.45)",
              boxShadow: "0 0 14px rgba(0,176,255,0.15)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(0,176,255,0.14)";
              el.style.borderColor = "rgba(0,176,255,0.8)";
              el.style.boxShadow = "0 0 24px rgba(0,176,255,0.35)";
              el.style.color = "#40c4ff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(0,176,255,0.08)";
              el.style.borderColor = "rgba(0,176,255,0.45)";
              el.style.boxShadow = "0 0 14px rgba(0,176,255,0.15)";
              el.style.color = "var(--text-primary)";
            }}
          >
            {tool.id === "03"
              ? "Explore →"
              : tool.stack.includes("Guide") || tool.stack.includes("eBOOK")
                ? "Read →"
                : "View Source →"}
          </a>
          {tool.docsHref && (
            <a
              href={tool.docsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 rounded-sm transition-all duration-200"
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
              Read Docs →
            </a>
          )}
        </div>
      </div>

      {/* Hover border sweep on featured tile */}
      {featured && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,176,255,0.07) 0%, transparent 50%, rgba(0,100,180,0.07) 100%)",
          }}
          aria-hidden="true"
        />
      )}
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
