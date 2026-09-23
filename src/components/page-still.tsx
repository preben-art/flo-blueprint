import Link from "next/link";
import Image from "next/image";

export function PageStill({
  src,
  alt,
  room,
  kicker,
  title,
  lead,
  caption,
  stamp,
  action,
}: {
  src: string;
  alt: string;
  room: string;
  kicker: string;
  title: string;
  lead?: string;
  caption?: string;
  stamp?: string;
  action?: { href: string; label: string };
  washTo?: "paper" | "ink" | "glow";
}) {
  return (
    <section className="cinema-hero cinema-hero-subpage" aria-label={title}>
      <Image src={src} alt={alt} fill priority sizes="100vw" quality={95} unoptimized={src.startsWith("/uploads/")} className="cinema-hero-image" />
      <div className="cinema-hero-shade" aria-hidden="true" />
      <div className="cinema-hero-content">
          <p className="ed-kicker cinema-hero-kicker">
            {room} · {kicker}
          </p>
          <h1>
            {title}
          </h1>
          {lead ? (
            <p className="cinema-hero-lead">{lead}</p>
          ) : null}
          {action ? <div className="cinema-hero-actions"><Link className="btn btn-lacquer inline-flex min-h-12 items-center rounded-full px-7 text-sm text-[#fbf8f2]" href={action.href}>{action.label} ↗</Link></div> : null}
          {stamp ? <p className="cinema-hero-foot">{stamp}</p> : null}
          {caption ? <p className="cinema-hero-foot">{caption}</p> : null}
      </div>
    </section>
  );
}
