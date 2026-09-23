import { StillFrame } from "@/components/still-frame";
import { cn } from "@/lib/utils";

export function PlanPlate({
  src,
  alt,
  caption,
  sizes = "100vw",
  priority,
  className,
  ratio = "photo",
}: {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  ratio?: "photo" | "wide" | "tall";
}) {
  return (
    <figure className={cn("plan-plate plan-float", className)}>
      <StillFrame
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={cn(
          ratio === "wide" && "aspect-[16/9] sm:aspect-[2/1]",
          ratio === "tall" && "aspect-[3/4] sm:aspect-[4/5]",
          ratio === "photo" && "aspect-[16/10]",
        )}
      />
      {caption ? <figcaption className="plan-note">{caption}</figcaption> : null}
    </figure>
  );
}
