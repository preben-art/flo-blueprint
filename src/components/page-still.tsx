import { StillFrame } from "@/components/still-frame";

export function PageStill({
  src,
  alt,
  room,
  kicker,
  title,
  lead,
  caption,
  stamp,
}: {
  src: string;
  alt: string;
  room: string;
  kicker: string;
  title: string;
  lead?: string;
  caption?: string;
  stamp?: string;
  washTo?: "paper" | "ink" | "glow";
}) {
  return (
    <section className="plan-hero">
      <div className="plan-hero-layout">
        <div className="plan-hero-copy plan-float">
          <p className="ed-kicker">
            {room} · {kicker}
          </p>
          <h1 className="mt-6 max-w-none text-[2.15rem] font-light leading-[1.08] tracking-[0.016em] text-[#161210] sm:text-[2.65rem] lg:text-[3.15rem]">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 text-base font-normal leading-[1.65] tracking-[0.01em] text-[#221d19] sm:text-[17px]">{lead}</p>
          ) : null}
          {stamp ? <p className="ed-kicker mt-8">{stamp}</p> : null}
        </div>
        <figure className="plan-float">
          <div className="plan-hero-still">
            <StillFrame src={src} alt={alt} priority sizes="(max-width: 1024px) 100vw, 64vw" className="aspect-[16/10] lg:min-h-[34rem] lg:aspect-auto" />
          </div>
          {caption ? <figcaption className="plan-note">{caption}</figcaption> : null}
        </figure>
      </div>
    </section>
  );
}
