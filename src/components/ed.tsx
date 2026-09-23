import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EdSection({
  id,
  tone = "sheet",
  children,
  className,
}: {
  id?: string;
  tone?: "sheet" | "paper" | "mist" | "navy" | "ink";
  children: ReactNode;
  className?: string;
}) {
  const toneClass = {
    sheet: "ed",
    paper: "ed-paper",
    mist: "ed-mist",
    navy: "ed-navy",
    ink: "ed-ink",
  }[tone];
  return (
    <section id={id} className={cn(toneClass, className)}>
      <div className="ed-wrap">{children}</div>
    </section>
  );
}

export function EdKicker({ children }: { children: ReactNode }) {
  return <p className="ed-kicker">{children}</p>;
}

export function EdTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-4 max-w-3xl text-3xl font-normal tracking-[-0.012em] text-flo-ink sm:text-5xl">{children}</h2>
  );
}

export function EdLead({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-2xl text-[17px] font-normal leading-relaxed text-pretty text-flo-muted">{children}</p>;
}

export function RailStep({
  index,
  title,
  children,
}: {
  index: number;
  title?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <li className="ed-rail-step">
      <span className="ed-kicker ed-rail-n">{String(index + 1).padStart(2, "0")}</span>
      <div className="min-w-0">
        {title ? <p className="text-lg font-normal tracking-[-0.012em]">{title}</p> : null}
        {children}
      </div>
    </li>
  );
}
