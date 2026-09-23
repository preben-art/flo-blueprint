import Image from "next/image";
import { cn } from "@/lib/utils";

const stillFocus: Record<string, string> = {
  "/media/naeringsbygg.jpg": "object-[center_58%]",
  "/media/sikkerhetsvegg.jpg": "object-[62%_10%]",
  "/media/internkontroll-rom.jpg": "object-[62%_10%]",
  "/media/romningstrapp.jpg": "object-[94%_46%]",
  "/media/romning-ovenfra.jpg": "object-[94%_46%]",
  "/media/skjerm-peker.jpg": "object-[74%_40%]",
  "/media/team.jpg": "object-[74%_40%]",
  "/media/skjermarbeid.jpg": "object-[36%_18%]",
  "/media/fagmiljo.jpg": "object-[center_26%]",
  "/media/fagmiljo-to.jpg": "object-[center_26%]",
  "/media/slokkeanlegg.jpg": "object-[10%_86%]",
  "/media/slokke-manometer.jpg": "object-[10%_86%]",
  "/media/teknisk-anlegg.jpg": "object-[30%_28%]",
  "/media/anlegg-gjennomgang.jpg": "object-[46%_40%]",
  "/media/anlegg-nar.jpg": "object-[30%_28%]",
  "/media/brannskilt.jpg": "object-[90%_48%]",
  "/media/roykvarsler.jpg": "object-[center_40%]",
  "/media/classic-norway.jpg": "object-[center_52%]",
  "/partners/weenaas.jpg": "object-[center_42%]",
  "/media/coop-extra.jpg": "object-[86%_58%]",
  "/media/utgang.jpg": "object-[68%_28%]",
  "/media/skanner.jpg": "object-[50%_18%]",
  "/media/slokker-kontroll.jpg": "object-[40%_30%]",
  "/media/slokker-haand.jpg": "object-[50%_30%]",
  "/media/tavle-laptop.jpg": "object-[60%_40%]",
  "/media/nodutgang-lys.jpg": "object-[54%_40%]",
  "/media/nodutgang-korridor.jpg": "object-[50%_36%]",
};

export function MediaPhoto({
  src,
  alt,
  className,
  priority,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const focus = stillFocus[src] ?? "object-center";
  return (
    <div className="still-move" data-speed="auto">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={95}
        unoptimized={src.startsWith("/uploads/")}
        sizes={sizes}
        className={cn("hdr-still object-cover", focus, className)}
      />

    </div>
  );
}
