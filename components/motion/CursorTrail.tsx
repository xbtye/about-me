"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

const MAX_POINTS = 18;
const POINT_LIFETIME = 200; // ms

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const animId = useRef<number | null>(null);
  const lastTime = useRef(0);

  useEffect(() => {
    /* Only on non-touch devices */
    if (window.matchMedia("(hover: none)").matches) return;
    /* Respect reduced motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (points.current.length > MAX_POINTS) points.current.shift();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const render = (now: number) => {
      const dt = now - lastTime.current;
      lastTime.current = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Age all points */
      points.current.forEach((p) => (p.age += dt));
      points.current = points.current.filter((p) => p.age < POINT_LIFETIME);

      if (points.current.length < 2) {
        animId.current = requestAnimationFrame(render);
        return;
      }

      /* Draw trail as a series of line segments */
      for (let i = 1; i < points.current.length; i++) {
        const p0 = points.current[i - 1];
        const p1 = points.current[i];

        const t = i / points.current.length;
        const ageFade = 1 - p1.age / POINT_LIFETIME;
        const alpha = t * ageFade * 0.18;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `rgba(200, 0, 0, ${alpha})`;
        ctx.lineWidth = 1.5 * t * ageFade;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      animId.current = requestAnimationFrame(render);
    };

    animId.current = requestAnimationFrame(render);

    return () => {
      if (animId.current) cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
