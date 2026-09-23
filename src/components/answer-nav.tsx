"use client";

import { useEffect, useState } from "react";
import { answerChapters } from "@/content/answers";
import { cn } from "@/lib/utils";

export function AnswerNav() {
  const [active, setActive] = useState<(typeof answerChapters)[number]["id"]>(answerChapters[0].id);

  useEffect(() => {
    const nodes = answerChapters
      .map((ch) => document.getElementById(ch.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id as (typeof answerChapters)[number]["id"]);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.15, 0.35, 0.6] },
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Innhold"
      className="answer-nav sticky top-[3.65rem] z-40 border-b border-flo-ink/10 bg-[#fbf8f2]/72 backdrop-blur-md sm:top-[4.15rem]"
    >
      <ol className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6">
        {answerChapters.map((ch) => (
          <li key={ch.id} className="shrink-0">
            <a
              href={`#${ch.id}`}
              className={cn(
                "flex items-center rounded-full px-3 py-1.5 text-[11px] tracking-wide uppercase no-underline transition-colors",
                active === ch.id
                  ? "bg-flo-red/12 text-flo-red"
                  : "text-flo-ink/70 hover:text-flo-ink",
              )}
            >
              {ch.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
