import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FlowEdge = "top" | "bottom" | "left" | "right";
type FlowTo = "paper" | "ink" | "glow";

export function FlowWash({
  edge = "bottom",
  to = "paper",
  className,
}: {
  edge?: FlowEdge;
  to?: FlowTo;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("flow-wash", `flow-wash-${edge}`, `flow-to-${to}`, className)}
    />
  );
}

export function FlowSheet({
  children,
  className,
  overlap = "none",
}: {
  children: ReactNode;
  className?: string;
  overlap?: "default" | "deep" | "none";
}) {
  return (
    <div
      className={cn(
        "flow-sheet",
        overlap === "deep" && "flow-sheet-deep",
        overlap === "none" && "flow-sheet-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
