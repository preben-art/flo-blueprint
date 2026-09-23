import { MediaPhoto } from "@/components/media-photo";
import { cn } from "@/lib/utils";

export function StillFrame({
  src,
  alt,
  sizes = "100vw",
  priority,
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("still-crop still-depth relative overflow-hidden", className)}>
      <MediaPhoto src={src} alt={alt} sizes={sizes} priority={priority} />
    </div>
  );
}
