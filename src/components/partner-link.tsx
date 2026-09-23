import type { ReactNode } from "react";

/** Wraps a partner mark in an outbound link when the partner has a verified website. */
export function PartnerLink({
  url,
  name,
  className,
  children,
}: {
  url: string | null | undefined;
  name: string;
  className?: string;
  children: ReactNode;
}) {
  if (!url) return <span className={className}>{children}</span>;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={`${name}, åpner nettstedet i ny fane`}
      title={`${name}: ${url.replace(/^https?:\/\//, "").replace(/\/$/, "")}`}
    >
      {children}
    </a>
  );
}
