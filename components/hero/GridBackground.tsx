"use client";

import { useRef, useEffect } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      const cols = 24;
      const rows = 18;
      const cellW = w / cols;

      /* perspective vanishing point */
      const vpX = w * 0.5;
      const vpY = h * 0.38;

      ctx.lineWidth = 0.5;

      /* vertical lines */
      for (let i = 0; i <= cols; i++) {
        const x = i * cellW;
        /* project x toward vanishing point */
        const dx = x - vpX;
        const endX = vpX + dx * 0.05;

        const alpha = Math.max(0, 0.28 - Math.abs((x - vpX) / (w * 0.7)) * 0.28);
        ctx.strokeStyle = `rgba(180, 0, 0, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(endX, vpY);
        ctx.stroke();
      }

      /* horizontal lines — fade toward horizon */
      for (let j = 1; j <= rows; j++) {
        const prog = j / rows;
        const y = vpY + (h - vpY) * Math.pow(prog, 1.6);
        const alpha = prog * 0.28;
        ctx.strokeStyle = `rgba(180, 0, 0, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      /* slow pulse fade on whole canvas */
      const pulse = 0.55 + 0.08 * Math.sin(t * 0.008);
      ctx.fillStyle = `rgba(4, 6, 10, ${1 - pulse})`;
      ctx.fillRect(0, 0, w, h);

      /* top fade to void */
      const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.45);
      topGrad.addColorStop(0, "rgba(4,6,10,1)");
      topGrad.addColorStop(1, "rgba(4,6,10,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, h * 0.45);

      t++;
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
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ opacity: 0.9 }}
    />
  );
}
