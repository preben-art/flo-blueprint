import Link from "next/link";
import type { ReactNode } from "react";
import { MediaPhoto } from "@/components/media-photo";
import { TypeNode } from "@/components/type-node";
import { cn } from "@/lib/utils";

export function PhotoStation({
  src,
  alt,
  href,
  children,
  className,
  minClass = "min-h-[64vh] lg:min-h-[78vh]",
  sizes = "100vw",
  priority,
  nodeClass,
  cut,
}: {
  src: string;
  alt: string;
  href?: string;
  children: ReactNode;
  className?: string;
  minClass?: string;
  sizes?: string;
  priority?: boolean;
  nodeClass?: string;
  cut?: boolean;
}) {
  const body = (
    <div
      className={cn(
        "group relative isolate flex flex-col overflow-hidden",
        minClass,
        cut && "lg:red-cut",
        className,
      )}
    >
      <div className="still-crop absolute inset-0">
        <MediaPhoto src={src} alt={alt} sizes={sizes} priority={priority} />
        <div className="plan-frame" />
      </div>
      <div className="relative z-[3] mt-auto w-full p-5 pb-10 pt-24 sm:p-8 sm:pb-12">
        <TypeNode className={nodeClass}>{children}</TypeNode>
      </div>
    </div>
  );

  if (!href) return body;
  return (
    <Link href={href} className="block no-underline">
      {body}
    </Link>
  );
}
