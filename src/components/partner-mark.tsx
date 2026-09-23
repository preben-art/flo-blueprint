import Image from "next/image";
import { cn } from "@/lib/utils";

export function PartnerMark({
  src,
  name,
  mark = "logo",
  className,
  size = "card",
}: {
  src?: string;
  name: string;
  mark?: "logo" | "type";
  className?: string;
  size?: "card" | "strip";
}) {
  if (mark === "type" || !src) {
    return (
      <p
        className={cn(
          "font-medium tracking-tight text-[#161210]",
          size === "card"
            ? "max-w-[18rem] text-[1.85rem] leading-[1.05]"
            : "text-center text-[12px] leading-[1.15] sm:text-[13px]",
          className,
        )}
      >
        {name}
      </p>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={240}
      height={88}
      unoptimized={src.endsWith(".svg")}
      className={cn("h-12 w-auto max-w-[220px] object-contain object-left", className)}
    />
  );
}
