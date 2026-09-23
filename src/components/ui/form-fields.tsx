import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-md border border-flo-ink bg-[#fbf8f2] px-3 text-sm text-flo-ink placeholder:text-[#5a544c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flo-red",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-md border border-flo-ink bg-[#fbf8f2] px-3 py-2 text-sm text-flo-ink placeholder:text-[#5a544c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flo-red",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("room-number mb-1.5 block text-flo-ink", className)}
      {...props}
    />
  );
}
