import { MediaPhoto } from "@/components/media-photo";

type Person = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  photo?: string;
};

export function PersonCard({ person, index }: { person: Person; index: number }) {
  const room = String(index + 1).padStart(2, "0");
  const initials = person.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

  return (
    <article className="border border-flo-ink/12 bg-[#fbf8f2]">
      <div className="still-crop still-depth relative aspect-[4/5]">
        {person.photo ? (
          <MediaPhoto src={person.photo} alt={person.name} sizes="(max-width: 768px) 50vw, 240px" />
        ) : (
          <span className="absolute left-4 top-6 font-mono text-5xl tracking-widest text-flo-red/40">
            {initials}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="ed-kicker">08{room}</p>
        <h3 className="mt-2 text-lg font-medium leading-tight">{person.name}</h3>
        {person.role ? <p className="mt-1 text-sm text-flo-muted">{person.role}</p> : null}
        <p className="mt-1 text-xs uppercase tracking-wider text-flo-muted">{person.location}</p>
        <p className="mt-3 text-sm">
          <a href={`mailto:${person.email}`} className="text-flo-red hover:underline">
            {person.email}
          </a>
        </p>
        {person.phone ? (
          <p className="text-sm">
            <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="hover:text-flo-red">
              {person.phone}
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
}
