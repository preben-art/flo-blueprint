export const privacyNoticeVersion = "2026-09-23";
export const privacyAcknowledgement = "Jeg har lest informasjonen om personvern og hvordan FLO behandler henvendelsen min.";

export function contactPrivacyReceipt(acceptedAt: string | null, now = new Date()) {
  if (!acceptedAt || !Number.isFinite(Date.parse(acceptedAt))) throw new Error("privacy-required");
  return {
    privacy_acknowledged: "yes",
    privacy_text: privacyAcknowledgement,
    privacy_notice_version: privacyNoticeVersion,
    privacy_acknowledged_at: new Date(acceptedAt).toISOString(),
    submitted_at_utc: now.toISOString(),
    submitted_at_oslo: new Intl.DateTimeFormat("nb-NO", { timeZone: "Europe/Oslo", dateStyle: "short", timeStyle: "long" }).format(now),
    timestamp_source: "browser",
  };
}
