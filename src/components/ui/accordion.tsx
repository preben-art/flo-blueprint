"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-flo-ink/20", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-baseline justify-between gap-4 py-4 text-left text-base font-normal hover:text-flo-red data-[state=open]:text-flo-red",
          className,
        )}
        {...props}
      >
        {children}
        <span className="room-number shrink-0 text-[#6b645c] data-[state=open]:hidden [[data-state=open]_&]:hidden">
          åpne
        </span>
        <span className="room-number hidden shrink-0 text-flo-red [[data-state=open]_&]:inline">
          lukk
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden data-[state=closed]:animate-[flo-accordion-close_180ms_ease-out] data-[state=open]:animate-[flo-accordion-open_180ms_ease-out]",
        className,
      )}
      {...props}
    >
      <div className="pb-5 text-[15px] leading-relaxed text-flo-muted">{children}</div>
    </AccordionPrimitive.Content>
  );
}
