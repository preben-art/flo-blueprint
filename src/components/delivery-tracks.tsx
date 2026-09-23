import Link from "next/link";
import { RoomLabel } from "@/components/blueprint";
import { MediaPhoto } from "@/components/media-photo";
import { TypeNode } from "@/components/type-node";
import { deliveryTracks } from "@/content/explain";
import { photoAlt, stills } from "@/content/site";
import { cn } from "@/lib/utils";

const trackStill = {
  digitalt: stills.skjerm,
  hybrid: stills.avklaring,
  fysisk: stills.anlegg,
} as const;

export function DeliveryTracks() {
  return (
    <section id="leveranse">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:pt-16 sm:pb-6">
        <RoomLabel number="03" title="Spor" className="mb-4" />
        <h2 className="max-w-2xl text-2xl font-normal sm:text-4xl">
          Kan dokumentene svare, eller må bygget ses?
        </h2>
      </div>
      <div className="grid lg:grid-cols-3">
        {deliveryTracks.map((track, i) => (
          <Link
            key={track.id}
            href={track.href}
            className={cn(
              "group relative isolate min-h-[58vh] overflow-hidden",
              i < deliveryTracks.length - 1 && "lg:red-cut",
            )}
          >
            <MediaPhoto
              src={trackStill[track.id as keyof typeof trackStill]}
              alt={photoAlt[trackStill[track.id as keyof typeof trackStill]] ?? track.label}
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="plan-frame" />
            <div className="relative z-[3] flex h-full min-h-[58vh] flex-col justify-end p-5 pb-8 sm:p-8">
              <TypeNode>
                <p className="room-number text-flo-red">{track.label}</p>
                <h3 className="mt-4 text-2xl font-normal text-[#fbf8f2]">{track.value}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#fbf8f2]">{track.lead}</p>
                <span className="mt-6 text-sm font-medium text-flo-red">{track.cta}</span>
              </TypeNode>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
