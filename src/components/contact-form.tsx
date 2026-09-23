"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";

const situasjoner = [
  { value: "papekt", label: "Vi har fått avvik, tilsyn eller pålegg" },
  { value: "endres", label: "Vi skal bygge om, endre bruk eller ta inn ny leietaker" },
  { value: "uklart", label: "Vi er usikre på hva som kreves, eller hvem som har ansvaret" },
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
  const [sent, setSent] = useState(false);
  const isPrivate = hvem === "privat";

  if (sent) {
    return (
      <div className="border border-[#161210] bg-[#fbf8f2] p-6">
        <p className="room-number mb-2 text-[#c62e32]">Mottatt</p>
        <p className="text-lg font-medium">Takk. Vi tar kontakt innen én til to virkedager.</p>
        <p className="mt-2 text-sm text-[#3d3832]">
          Dette er en lokal visning. Meldingen lagres ikke hos en ekstern tjeneste ennå.
        </p>
      </div>
    );
  }

  const defaultSit = situasjoner.some((s) => s.value === situasjon) ? situasjon : "";
  const sporDefault = spor.some((s) => s.value === sporValue) ? sporValue : "";

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {hvem ? <input type="hidden" name="hvem" value={hvem} /> : null}
      <div>
        <Label htmlFor="navn">Navn</Label>
        <Input id="navn" name="navn" required autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="bedrift">{isPrivate ? "Bedrift (hvis aktuelt)" : "Bedrift"}</Label>
        <Input id="bedrift" name="bedrift" required={!isPrivate} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="epost">E-post</Label>
          <Input id="epost" name="epost" type="email" required autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="telefon">Telefon</Label>
          <Input id="telefon" name="telefon" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div>
        <Label htmlFor="situasjon">Hva gjelder?</Label>
        <select
          id="situasjon"
          name="situasjon"
          required
          className="flex h-11 w-full rounded-md border border-[#161210] bg-[#fbf8f2] px-3 text-sm"
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
          className="flex h-11 w-full rounded-md border border-[#161210] bg-[#fbf8f2] px-3 text-sm"
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
        <Label htmlFor="melding">{isPrivate ? "Situasjonen, og hva som skal endres" : "Situasjonen, kort"}</Label>
        <Textarea
          id="melding"
          name="melding"
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
      <Button type="submit">{isPrivate ? "Send inn tegninger / bilder" : "Send det dere har"}</Button>
    </form>
  );
}
