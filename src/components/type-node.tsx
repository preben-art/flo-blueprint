import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TypeNode({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <div
      className={cn(
        "type-node px-6 py-7 sm:px-8 sm:py-9",
        tone === "paper" && "type-node-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}
