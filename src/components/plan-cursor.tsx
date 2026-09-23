"use client";

import { useEffect, useRef } from "react";

const TRAIL = 12;
const EASE = 0.28;
const RING_MS = 280;
const LIFE = 160;

type Ring = { x: number; y: number; t: number };
type Pt = { x: number; y: number; t: number };

export function PlanCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const pts: Pt[] = [];
    let cx = window.innerWidth * 0.5;
    let cy = window.innerHeight * 0.4;
    let tx = cx;
    let ty = cy;
    let armed = false;
    let visible = false;
    let running = false;
    let frame = 0;
    const rings: Ring[] = [];

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = (now: number) => {
      running = true;
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;

      if (visible) {
        const last = pts[pts.length - 1];
        if (!last || Math.hypot(cx - last.x, cy - last.y) > 0.55) {
          pts.push({ x: cx, y: cy, t: now });
          if (pts.length > TRAIL) pts.shift();
        }
        glow.style.opacity = "1";
        glow.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      } else {
        glow.style.opacity = "0";
      }

      while (pts.length && now - pts[0].t > LIFE) pts.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (pts.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < pts.length; i += 1) {
          const a = pts[i - 1];
          const b = pts[i];
          const age = (now - b.t) / LIFE;
          const t = i / (pts.length - 1);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(198, 46, 50, ${(0.06 + t * 0.16) * Math.max(0, 1 - age)})`;
          ctx.lineWidth = 0.55 + t * 0.4;
          ctx.stroke();
        }
      }

      for (let i = rings.length - 1; i >= 0; i -= 1) {
        const ring = rings[i];
        const p = (now - ring.t) / RING_MS;
        if (p >= 1) {
          rings.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, 6 + p * 22, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(198, 46, 50, ${(1 - p) * 0.28})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      if (visible || pts.length > 0 || rings.length) {
        frame = requestAnimationFrame(tick);
        return;
      }
      running = false;
    };

    const start = () => {
      if (!running) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const samples = event.getCoalescedEvents?.() ?? [event];
      const last = samples[samples.length - 1];
      tx = last.clientX;
      ty = last.clientY;
      if (!armed) {
        cx = tx;
        cy = ty;
        armed = true;
      }
      visible = true;
      start();
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      rings.push({ x: event.clientX, y: event.clientY, t: performance.now() });
      if (rings.length > 3) rings.shift();
      window.dispatchEvent(new Event("flo-plan-flash"));
      visible = true;
      start();
    };

    const onLeave = () => {
      visible = false;
      start();
    };

    size();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", size);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <div className="plan-cursor" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div ref={glowRef} className="plan-cursor-glow" />
    </div>
  );
}
