import Link from "next/link";
import { RoomLabel } from "@/components/blueprint";
import { MediaPhoto } from "@/components/media-photo";
import { photoAlt } from "@/content/site";
import { cn } from "@/lib/utils";

export function LinkRoom({
  href,
  number,
  kicker,
  title,
  body,
  stamp,
  image,
  imageAlt,
  className,
}: {
  href: string;
  number: string;
  kicker?: string;
  title: string;
  body: string;
  stamp?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("panel group relative flex h-full flex-col overflow-hidden hover:border-[#c62e32]", className)}
    >
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <MediaPhoto src={image} alt={imageAlt ?? photoAlt[image] ?? title} sizes="(max-width: 1024px) 100vw, 33vw" />
          <div className="plan-frame" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <RoomLabel number={number} title={kicker} className="mb-4" />
        <h3 className="text-xl font-normal text-[#161210] group-hover:text-[#c62e32]">{title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#161210]">{body}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-[#c62e32]">Les mer</span>
          {stamp ? <span className="room-number text-[#161210]">{stamp}</span> : null}
        </div>
      </div>
    </Link>
  );
}
