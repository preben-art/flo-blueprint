import { SectionCta } from "@/components/section-cta";

export function CtaZone({
  title = "Send det dere har. Vi svarer innen én til to virkedager.",
  body = "Ingen forpliktelse. Har dere fått avvik, skal dere bygge om, eller er det uklart hva som kreves?",
  action = "Send det dere har",
  href = "/kontakt",
}: {
  title?: string;
  body?: string;
  action?: string;
  href?: string;
}) {
  return (
    <section className="ed-ink join-footer">
      <div className="ed-wrap">
        <div className="plan-read plan-read-ink plan-float max-w-3xl">
        <p className="ed-kicker">Kontakt</p>
        <h2 className="mt-4 max-w-xl text-3xl font-normal text-[#fbf8f2] sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#fbf8f2]/90">{body}</p>
        <SectionCta action={action} href={href} tone="dark" />
        </div>
      </div>
    </section>
  );
}
