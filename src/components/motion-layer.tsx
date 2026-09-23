"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

declare global {
  interface Window {
    __FLO_FILM?: boolean;
    __floSmoother?: ScrollSmoother | null;
  }
}

const HEADER_OFFSET = "top 4.6rem";

function motionAllowed() {
  if (typeof window === "undefined") return false;
  if (window.__FLO_FILM) return false;
  if (new URLSearchParams(window.location.search).get("motion") === "off") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Elements that drift slightly behind the scroll so plates and stills read as separate layers. */
function tagLagLayers() {
  document.querySelectorAll<HTMLElement>(".plan-hero-still, figure.plan-float, .scan-lead").forEach((el) => {
    if (!el.dataset.lag) el.dataset.lag = "0.14";
  });
  document.querySelectorAll<HTMLElement>(".plan-read, .plan-hero-copy, .ed-across > article").forEach((el) => {
    if (!el.dataset.lag) el.dataset.lag = "0.06";
  });
}

function buildReveals(ctx: gsap.Context) {
  ctx.add(() => {
    const plates = gsap.utils.toArray<HTMLElement>(
      ".plan-read, .plan-hero-copy, .ed-across > article, .clarify-cell, .type-node, .answer-block, .person-card",
    );
    plates.forEach((el) => {
      gsap.from(el, {
        y: 26,
        autoAlpha: 0,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>(".still-crop").forEach((el) => {
      gsap.from(el, {
        clipPath: "inset(6% 4% 6% 4%)",
        autoAlpha: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>(".scan-steps, .ed-rail, .clarify-board").forEach((list) => {
      const items = list.querySelectorAll(":scope > li, :scope > details, :scope > div");
      if (!items.length) return;
      gsap.from(items, {
        x: -14,
        autoAlpha: 0,
        stagger: 0.09,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: list, start: "top 86%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>(".plan-leader span").forEach((line) => {
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: "50% 0%",
        duration: 0.9,
        ease: "power2.inOut",
        scrollTrigger: { trigger: line, start: "top 92%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>(".ed-kicker").forEach((k) => {
      gsap.from(k, {
        letterSpacing: "0.42em",
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: k, start: "top 94%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("h1, .ed h2, .ed-paper h2, .ed-mist h2, .ed-navy h2, .ed-ink h2, .plan-read h2").forEach((h) => {
      gsap.from(h, {
        y: 18,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: h, start: "top 92%", once: true },
      });
    });
  });
}

function buildPins(ctx: gsap.Context) {
  ctx.add(() => {
    const nav = document.querySelector<HTMLElement>(".answer-nav");
    const main = document.getElementById("innhold");
    if (nav && main) {
      ScrollTrigger.create({
        trigger: nav,
        start: HEADER_OFFSET,
        endTrigger: main,
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    }
  });
}

function buildProgress(ctx: gsap.Context) {
  const bar = document.querySelector<HTMLElement>(".scroll-progress");
  if (!bar) return;
  ctx.add(() => {
    gsap.set(bar, { scaleX: 0, transformOrigin: "0 50%" });
    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: 0, end: "max", scrub: 0.25 },
    });
  });
}

function wireAnchors(smoother: ScrollSmoother | null, signal: AbortSignal) {
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      if (smoother) smoother.scrollTo(target, true, HEADER_OFFSET);
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    { signal },
  );
}

export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!motionAllowed()) {
      root.dataset.motion = "off";
      return;
    }
    root.dataset.motion = "smooth";

    const ctx = gsap.context(() => {});
    const aborter = new AbortController();
    let smoother: ScrollSmoother | null = null;

    const setup = () => {
      tagLagLayers();
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.15,
        effects: true,
        smoothTouch: 0.12,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
      window.__floSmoother = smoother;
      buildReveals(ctx);
      buildPins(ctx);
      buildProgress(ctx);
      wireAnchors(smoother, aborter.signal);

      if (window.location.hash) {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        if (target) requestAnimationFrame(() => smoother?.scrollTo(target, false, HEADER_OFFSET));
      }
    };

    // Let fonts and the first paint settle so trigger positions are measured against final layout.
    const ready = document.fonts?.ready ?? Promise.resolve();
    let cancelled = false;
    ready.then(() => {
      if (!cancelled) setup();
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const content = document.getElementById("smooth-content");
    const ro = content ? new ResizeObserver(() => ScrollTrigger.refresh()) : null;
    if (content && ro) ro.observe(content);
    // Lazy stills change section heights after they decode.
    document.querySelectorAll("img").forEach((img) => img.addEventListener("load", refresh, { once: true, signal: aborter.signal }));

    return () => {
      cancelled = true;
      aborter.abort();
      window.removeEventListener("load", refresh);
      ro?.disconnect();
      ctx.revert();
      smoother?.kill();
      window.__floSmoother = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
      root.dataset.motion = "";
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
