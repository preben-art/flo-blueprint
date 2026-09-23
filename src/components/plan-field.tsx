import type { ReactNode } from "react";
import { PlanPlate } from "@/components/plan-plate";
import { cn } from "@/lib/utils";

export function PlanBand({
  id,
  tone = "sheet",
  className,
  children,
}: {
  id?: string;
  tone?: "sheet" | "paper";
  density?: "whisper" | "work";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn(tone === "paper" ? "ed-paper" : "ed", className)}>
      <div className="ed-wrap">{children}</div>
    </section>
  );
}

export function PlanSplit({
  id,
  tone = "sheet",
  caption = "Brannskille, rømningsvei og kontrollpunkt. Premiss i planen.",
  still,
  stillAlt,
  className,
  children,
}: {
  id?: string;
  tone?: "sheet" | "paper";
  density?: "whisper" | "work";
  caption?: string;
  still?: string;
  stillAlt?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn(tone === "paper" ? "ed-paper" : "ed", "plan-compose", className)}>
      <div className="ed-wrap grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="plan-read plan-float min-w-0 lg:col-span-6">{children}</div>
        <div className="min-w-0 lg:col-span-6">
          {still ? (
            <PlanPlate src={still} alt={stillAlt ?? caption} caption={caption} sizes="(max-width: 1024px) 100vw, 50vw" ratio="photo" />
          ) : (
            <div className="plan-reveal hidden lg:block">
              <p className="plan-slot-note">{caption}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
