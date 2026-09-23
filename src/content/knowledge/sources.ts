export const sourceAuthority = [
  { level: 1, label: "Lov og forskrift", meaning: "Kan sitere som pliktgrunnlag. Gjelder ikke automatisk som vedtak for ett bygg." },
  { level: 2, label: "Offentlig veileder og standard", meaning: "Tolker eller utfyller. Ikke automatisk eneste lovlige løsning." },
  { level: 3, label: "FLO-bevis", meaning: "DiBK-godkjenning, navngitt oppdrag, dokumentert leveranse. Mangler bevis = sies ikke." },
  { level: 4, label: "Kundens kontekst", meaning: "Bygg, bruk, dokumentasjon og det som er sagt i saken." },
  { level: 5, label: "Strukturert inferens", meaning: "VCTRA-struktur. Publiseres ikke som faktum uten godkjenning." },
] as const;

export const sources = [
  {
    id: "bl",
    level: 1,
    label: "Brann- og eksplosjonsvernloven",
    href: "https://lovdata.no/dokument/NL/lov/2002-06-14-20",
    note: "Overordnet pliktgrunnlag for eier, bruker og myndighet. Forskrifter utfyller.",
  },
  {
    id: "fob",
    level: 1,
    label: "Forskrift om brannforebygging",
    href: "https://lovdata.no/dokument/SF/forskrift/2015-12-17-1710",
    note: "Kap. 2 eier (§§ 4–10). Kap. 3 bruker (§§ 11–13).",
  },
  {
    id: "fob-eier",
    level: 1,
    label: "FOB kapittel 2, eierens plikter",
    href: "https://lovdata.no/dokument/SF/forskrift/2015-12-17-1710/KAPITTEL_2",
    note: "§ 4 kunnskap og informasjon. § 5 kontroll og vedlikehold. § 9 systematisk sikkerhetsarbeid. § 10 dokumentasjon.",
  },
  {
    id: "fob-bruker",
    level: 1,
    label: "FOB kapittel 3, brukerens plikter",
    href: "https://lovdata.no/dokument/SF/forskrift/2015-12-17-1710/KAPITTEL_3",
    note: "§ 11 brannsikker bruk. § 12 systematisk sikkerhetsarbeid. § 13 dokumentasjon.",
  },
  {
    id: "dsb-fob",
    level: 2,
    label: "DSB, veiledning til forskrift om brannforebygging",
    href: "https://www.dsb.no/brannsikkerhet/veiledning-til-forskrift-om-brannforebygging/",
    note: "Offentlig veileder. Bruker er den med formell bruksrett. Eier og bruker har selvstendige plikter.",
  },
  {
    id: "tek17-11",
    level: 1,
    label: "TEK17 kapittel 11, sikkerhet ved brann",
    href: "https://www.dibk.no/regelverk/byggteknisk-forskrift-tek17/11/i/innledning",
    note: "Prosjekteringsforutsetninger: bruk, persontall, areal, etasjer, brannenergi, særskilt risiko, atkomst.",
  },
  {
    id: "ik",
    level: 1,
    label: "Internkontrollforskriften § 5",
    href: "https://lovdata.no/dokument/SF/forskrift/1996-12-06-1127/%C2%A75",
    note: "Skriftlig dokumentasjon av internkontroll for virksomheter.",
  },
  {
    id: "sak10",
    level: 1,
    label: "SAK10",
    href: "https://lovdata.no/dokument/SF/forskrift/2010-03-26-488",
    note: "Ansvar og kontroll i byggesak.",
  },
  {
    id: "dibk-sg",
    level: 3,
    label: "DiBK sentral godkjenning, FLO BRANNSIKRING AS",
    href: "https://sgregister.dibk.no/enterprises/979582064",
    note: "Prosjekterende brannkonsept TK3. Uavhengig kontrollerende brannsikkerhet TK3. Ansvarlig søker TK1. Periode 12.09.2024 til 12.09.2027.",
  },
  {
    id: "ns3924",
    level: 2,
    label: "NS 3924:2025",
    href: "/fag-og-kunnskap/ns-3924",
    note: "Felles tegnespråk for branntegninger. Standarden gjør ikke eldre tegninger automatisk ugyldige.",
  },
] as const;

export type SourceId = (typeof sources)[number]["id"];

export function sourceById(id: SourceId) {
  return sources.find((s) => s.id === id);
}

export function sourcesByIds(ids: readonly SourceId[]) {
  return ids.map((id) => sourceById(id)).filter((s): s is (typeof sources)[number] => Boolean(s));
}
