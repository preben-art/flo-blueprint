import { people } from "@/content/site";

// Presentation groups follow published roles, not an inferred legal organisation chart.
export const peopleGroups = [
  { id: "ledelse", title: "Daglig ledelse", intro: "Kontakt for virksomheten og overordnede spørsmål.", members: people.filter(p => p.role.startsWith("Daglig leder")) },
  { id: "brannvernradgivning", title: "Brannvernrådgivning", intro: "Rådgivere i Stryn og Nordfjordeid.", members: people.filter(p => p.role.toLowerCase().includes("brannvernrådgiv")) },
  { id: "branningeniorer", title: "Branningeniører og teknisk tegning", intro: "Fagfolk innen prosjektering og brannteknisk dokumentasjon.", members: people.filter(p => !p.role.startsWith("Daglig leder") && (p.role.toLowerCase().includes("branningeniør") || p.role === "Teknisk tegning")) },
  { id: "utforelse", title: "Utførelse og kontroll", intro: "Kontaktpersoner for arbeidet ute i byggene.", members: people.filter(p => p.role.includes("utførelse") || p.role === "Kontrollør") },
  { id: "larling", title: "Lærling", intro: "En del av fagmiljøet i Stryn.", members: people.filter(p => p.role === "Lærling") },
];
