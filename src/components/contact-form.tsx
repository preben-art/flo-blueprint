"use client";

import { contactPrivacyReceipt, privacyAcknowledgement } from "@/lib/contact-privacy";
import { useRef, useState } from "react";
import { company } from "@/content/site";
import { emailConfigured, sendContactEmail } from "@/lib/contact-email";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";

const situasjoner = [
  { value: "papekt", label: "Vi har fått avvik, tilsyn eller pålegg" },
  { value: "endres", label: "Ombygging eller endret bruk" },
  { value: "uklart", label: "Usikker på krav eller ansvar" },
] as const;

const spor = [
  { value: "", label: "Vet ikke, les saken først" },
  { value: "digitalt", label: "Se på dokumentene først" },
  { value: "hybrid", label: "Dokumentene først, befaring hvis det trengs" },
  { value: "fysisk", label: "Vi trenger befaring" },
] as const;

export function ContactForm({
  situasjon,
  spor: sporValue,
  hvem,
}: {
  situasjon?: string;
  spor?: string;
  hvem?: string;
}) {
  const [privacyAcceptedAt, setPrivacyAcceptedAt] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const config = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  };
  const configured = emailConfigured(config);
  const isPrivate = hvem === "privat";

  if (sent) {
    return (
      <div className="border border-flo-ink bg-[#fbf8f2] p-6">
        <p className="room-number mb-2 text-flo-red">Mottatt</p>
        <p className="text-lg font-medium" role="status">Takk. Meldingen er sendt til FLO.</p>
        <p className="mt-2 text-sm text-[#3d3832]">
          Ta kontakt på telefon hvis saken haster. Dokumenter kan ettersendes på e-post.
        </p>
      </div>
    );
  }

  const defaultSit = situasjoner.some((s) => s.value === situasjon) ? situasjon : "";
  const sporDefault = spor.some((s) => s.value === sporValue) ? sporValue : "";

  return (
    <form
      className="contact-premium-form"
      aria-busy={busy}
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting.current || !configured) return;
        const data = new FormData(e.currentTarget);
        if (data.get("website")) return;
        if (data.get("privacy") !== "yes" || !privacyAcceptedAt) { setError("Bekreft at du har lest personverninformasjonen før du sender."); return; }
        submitting.current = true;
        setBusy(true); setError("");
        try {
          await sendContactEmail(config, {
            ...contactPrivacyReceipt(privacyAcceptedAt),
            from_name: String(data.get("navn") ?? ""),
            company: String(data.get("bedrift") ?? ""),
            reply_to: String(data.get("epost") ?? ""),
            phone: String(data.get("telefon") ?? ""),
            situation: String(data.get("situasjon") ?? ""),
            delivery: String(data.get("spor") ?? ""),
            audience: hvem ?? "",
            message: String(data.get("melding") ?? ""),
            page_url: window.location.origin + window.location.pathname,
          });
          setSent(true);
        } catch {
          setError("Meldingen kunne ikke sendes. Prøv igjen, eller kontakt oss direkte på e-post. Teksten din er beholdt.");
        } finally {
          submitting.current = false; setBusy(false);
        }
      }}
    >
      {!configured ? <p role="status" className="contact-availability">
        Skjemaet er ikke aktivert ennå. Send forespørselen til{" "}
        <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>, eller ring{" "}
        <a className="underline" href={`tel:${company.switchboard.replace(/\s/g, "")}`}>{company.switchboard}</a>.
      </p> : null}
      <div hidden aria-hidden="true"><label>Nettside<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {hvem ? <input type="hidden" name="hvem" value={hvem} /> : null}
      <fieldset className="contact-fields"><legend>01 · Kontaktinformasjon</legend><p className="contact-field-note">Felter merket * må fylles ut.</p>
      <div className="contact-field-grid">
      <div>
        <Label htmlFor="navn">Navn *</Label>
        <Input id="navn" name="navn" required maxLength={100} autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="bedrift">{isPrivate ? "Bedrift (hvis aktuelt)" : "Bedrift *"}</Label>
        <Input id="bedrift" name="bedrift" maxLength={150} autoComplete="organization" required={!isPrivate} />
      </div>
      </div>
      <div className="contact-field-grid">
        <div>
          <Label htmlFor="epost">E-post *</Label>
          <Input id="epost" name="epost" type="email" required maxLength={254} autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="telefon">Telefon (valgfritt)</Label>
          <Input id="telefon" name="telefon" type="tel" maxLength={40} autoComplete="tel" />
        </div>
      </div>
      </fieldset>
      <fieldset className="contact-fields"><legend>02 · Saken deres</legend>
      <div>
        <Label htmlFor="situasjon">Hva gjelder saken? *</Label>
        <select
          id="situasjon"
          name="situasjon"
          required
          className="flex h-11 w-full rounded-md border border-flo-ink bg-[#fbf8f2] px-3 text-sm"
          defaultValue={defaultSit}
        >
          <option value="" disabled={!defaultSit}>
            Velg det som passer
          </option>
          {situasjoner.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="spor">Hvordan vil du starte?</Label>
        <select
          id="spor"
          name="spor"
          className="flex h-11 w-full rounded-md border border-flo-ink bg-[#fbf8f2] px-3 text-sm"
          defaultValue={sporDefault}
        >
          {spor.map((s) => (
            <option key={s.value || "uvisst"} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="melding">{isPrivate ? "Hva skal endres? *" : "Beskriv saken kort *"}</Label>
        <Textarea
          id="melding"
          name="melding"
          maxLength={5000}
          required
          placeholder={
            isPrivate
              ? "Kjeller, loft eller utleie? Hva rommet skal brukes til. Har du tegninger eller bilder?"
              : "Bygg, bruk, hva som er sagt, og om du har underlag."
          }
        />
      </div>
      <p className="text-sm text-[#6b645c]">
        {isPrivate
          ? "Har du tegninger eller bilder? Beskriv dem her, eller si at du kan sende dem. FLO starter digitalt."
          : "Har du dokumentasjon? Beskriv den her, eller si at du kan sende den. FLO starter med det vi allerede vet."}
      </p>
      </fieldset>
      {configured ? <p className="text-sm text-[#6b645c]">FLO bruker opplysningene til å besvare forespørselen. Ikke legg sensitive opplysninger i meldingen.</p> : null}
      <div className="border-t border-flo-ink/15 pt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed" htmlFor="privacy">
          <input id="privacy" name="privacy" type="checkbox" value="yes" required checked={!!privacyAcceptedAt} onChange={e => setPrivacyAcceptedAt(e.target.checked ? new Date().toISOString() : null)} className="mt-1 h-5 w-5 shrink-0 accent-[#a82d34]" />
          <span>{privacyAcknowledgement} *</span>
        </label>
        <a className="mt-2 inline-block text-sm text-flo-red underline" href="#personvern">Les personverninformasjonen</a>
      </div>
      {error ? <p role="alert" className="text-sm text-[#a51f25]">{error}</p> : null}
      <Button type="submit" disabled={busy || !configured}>{busy ? "Sender …" : "Send saken til FLO ↗"}</Button>
    </form>
  );
}
