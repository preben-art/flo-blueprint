"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    __FLO_FILM?: boolean;
  }
}

/**
 * Short, silent camera-move loop rendered on top of the real photo in the
 * same frame. Loads lazily, plays only while visible, and stays a still when
 * the visitor prefers reduced motion, saves data, or during film capture.
 */
export function StillMotion({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__FLO_FILM) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;
    setArmed(true);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!armed || !video) return;

    const onReady = () => setLive(true);
    video.addEventListener("playing", onReady);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (video.preload !== "auto") video.preload = "auto";
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "20% 0px", threshold: 0.15 },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      video.removeEventListener("playing", onReady);
      video.pause();
    };
  }, [armed]);

  if (!armed) return null;

  return (
    <video
      ref={ref}
      className={cn("still-motion hdr-still", live && "is-live", className)}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}
