import { company } from "@/content/site";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ReactNode> = {
  facebook: (
    <path d="M13.5 21v-7.2h2.4l.4-2.9h-2.8V9.1c0-.8.3-1.4 1.4-1.4h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.9h2.5V21h3z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.2" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <path d="M7.4 9.6v8.2M7.4 6.6v.1" />
      <path d="M11.2 17.8V9.6M11.2 13.2c0-2.1 1.3-3.6 3.1-3.6s2.9 1.2 2.9 3.5v4.7" />
    </>
  ),
};

export function SocialLinks({
  tone = "dark",
  className,
  showLabels = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  showLabels?: boolean;
}) {
  return (
    <ul className={cn("social-links", tone === "dark" ? "social-links-dark" : "social-links-light", className)}>
      {company.social.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${company.brandName} på ${s.label}`}
            title={`${s.label}: ${s.handle}`}
            className="social-link"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="social-icon"
              fill={s.id === "facebook" ? "currentColor" : "none"}
              stroke={s.id === "facebook" ? "none" : "currentColor"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icons[s.id]}
            </svg>
            {showLabels ? <span className="social-label">{s.label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
