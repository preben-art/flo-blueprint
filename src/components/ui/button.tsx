import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-normal tracking-[0.06em] transition-[color,background-color,box-shadow,transform,border-color] duration-300 ease-out hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flo-red disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "btn-lacquer text-[#fbf8f2]",
        ink: "btn-ink text-[#fbf8f2]",
        outline:
          "border border-flo-ink/70 bg-transparent text-flo-ink hover:border-flo-red hover:text-flo-red hover:shadow-[0_0_20px_rgb(237_85_89_/_0.22)]",
        ghost: "text-flo-ink hover:bg-flo-ink/6",
        sheet:
          "border border-[#fbf8f2]/45 bg-[#fbf8f2]/8 text-[#fbf8f2] backdrop-blur-sm hover:border-flo-red hover:text-flo-red hover:shadow-[0_0_22px_rgb(237_85_89_/_0.28)]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs tracking-[0.08em] uppercase",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
