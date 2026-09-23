import type { ReactNode } from "react";
import { FlowSheet } from "@/components/flow-layer";
import { cn } from "@/lib/utils";

export function RoomLabel({
  number,
  title,
  className,
  onDark,
}: {
  number: string;
  title?: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className={cn("room-number", onDark ? "text-flo-red" : "text-flo-red")}>
        {number}
      </span>
      {title ? (
        <span className={cn("room-number", onDark ? "text-[#fbf8f2]" : "text-flo-ink")}>
          {title}
        </span>
      ) : null}
    </div>
  );
}

export function TechnicalNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-4 max-w-xl text-sm leading-relaxed text-flo-ink", className)}>
      {children}
    </p>
  );
}

export function BlueprintLayout({
  children,
  className,
  flow = false,
}: {
  children: ReactNode;
  className?: string;
  flow?: boolean;
}) {
  const inner = (
    <div className={cn("join-from-ink mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14", className)}>
      {children}
    </div>
  );
  return flow ? <FlowSheet>{inner}</FlowSheet> : inner;
}

export function BlueprintRoom({
  number,
  kicker,
  title,
  children,
  className,
  as: Tag = "section",
}: {
  number: string;
  kicker?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "div";
}) {
  return (
    <Tag className={cn("panel p-5 sm:p-8", className)}>
      <RoomLabel number={number} title={kicker} className="mb-4" />
      {title ? (
        <h2 className="mb-4 max-w-3xl text-2xl font-normal sm:text-3xl">
          {title}
        </h2>
      ) : null}
      {children}
    </Tag>
  );
}

export function ProcessPath({
  steps,
}: {
  steps: readonly { id: string; label: string }[];
}) {
  return (
    <ol className="grid grid-cols-1 divide-y divide-flo-ink/15 border-y border-flo-ink/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-9">
      {steps.map((step, i) => (
        <li key={step.id} className="px-3 py-4">
          <div className="room-number mb-2 text-flo-red">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="text-sm font-medium leading-snug">{step.label}</div>
        </li>
      ))}
    </ol>
  );
}
