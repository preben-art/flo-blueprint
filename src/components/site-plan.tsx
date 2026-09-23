"use client";

import { useEffect, useId, useRef } from "react";
import { PlanDrawing } from "@/components/plan-drawing";

const LAYERS = ["grid", "rooms", "walls", "live"] as const;
const DARK = ".ed-navy, .ed-ink, .site-footer, .join-footer";

function Board({
  tone,
  uid,
}: {
  tone: "paper" | "ink";
  uid: string;
}) {
  return (
    <div className={`site-plan-tone site-plan-${tone}`} data-density="work" data-tone={tone}>
      <div className="plan-field" data-density="work" data-tone={tone} data-live="true">
        <div className="plan-stage">
          <div className="plan-board">
            {LAYERS.map((layer) => (
              <svg
                key={layer}
                className={`plan-layer plan-layer-${layer}`}
                viewBox="0 0 1600 1000"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
              >
                <PlanDrawing layer={layer} uid={`${uid}-${tone}-${layer}`} />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SitePlan() {
  const root = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    el.dataset.live = "true";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--plan-ink", "0");
      document.documentElement.style.setProperty("--plan-ink", "0");
      return;
    }

    let flashTimer = 0;
    const onFlash = () => {
      el.dataset.inkFlash = "true";
      window.clearTimeout(flashTimer);
      flashTimer = window.setTimeout(() => {
        delete el.dataset.inkFlash;
      }, 220);
    };
    window.addEventListener("flo-plan-flash", onFlash);

    let frame = 0;
    const update = () => {
      el.style.setProperty("--plan-y", "0px");
      el.style.setProperty("--plan-x", "0px");
      // Cap the float so long pages never push content out of their own section.
      document.documentElement.style.setProperty("--float-y", "0px");

      let ink = 0;
      document.querySelectorAll(DARK).forEach((node) => {
        const r = node.getBoundingClientRect();
        const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
        if (visible <= 0) return;
        ink = Math.max(ink, Math.min(1, visible / (window.innerHeight * 0.58)));
      });
      const inkValue = ink.toFixed(3);
      el.style.setProperty("--plan-ink", inkValue);
      document.documentElement.style.setProperty("--plan-ink", inkValue);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("flo-plan-flash", onFlash);
      window.clearTimeout(flashTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className="site-plan" data-density="work" data-live="true" aria-hidden="true">
      <Board tone="paper" uid={uid} />
      <Board tone="ink" uid={uid} />
    </div>
  );
}
