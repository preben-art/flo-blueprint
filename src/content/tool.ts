export const defaultTool = {
  intro:
    "Lim inn det noen har sagt, og hvem som sier det. Verktøyet klassifiserer kilden du oppgir. Det er et arbeidsrom, ikke et vedtak.",
  disclaimer:
    "Dette er et arbeidsverktøy, ikke et vedtak. FLO konkluderer ikke juridisk uten kildedokument. Feil klasse er mulig. Da er svaret uklart, og vi henter grunnlag.",
  classes: [
    {
      id: "krav",
      label: "Faktisk krav",
      meaning: "Kan vises til lov, forskrift, vedtak eller vilkår som gjelder dette bygget.",
      keywords: ["pålegg", "forskrift", "lov", "vedtak", "påbud", "tvangsmulkt"],
    },
    {
      id: "anbefaling",
      label: "Anbefaling",
      meaning: "Bør gjøres ut fra veiledning eller god praksis, uten at det er dokumentert som krav.",
      keywords: ["veileder", "anbefal", "bør", "god praksis"],
    },
    {
      id: "vurdering",
      label: "Faglig vurdering",
      meaning: "FLO eller annen fagpart mener dette er riktig nivå. Det er ikke automatisk et pålegg.",
      keywords: ["ribr", "rådgiver", "ingeniør", "faglig", "vurdering"],
    },
    {
      id: "prosjektvalg",
      label: "Prosjektvalg",
      meaning: "En løsning blant flere. Kostnad og fremdrift, ikke nødvendigvis minstekrav.",
      keywords: ["anbud", "entreprenør", "prosjekt", "tilbud", "løsning"],
    },
    {
      id: "praksis",
      label: "Praksis",
      meaning: "Slik det «pleier» å gjøres. Praksis er ikke bevis.",
      keywords: ["pleier", "alltid", "bruker å", "pleier å", "vanligvis"],
    },
    {
      id: "uklart",
      label: "Uklart",
      meaning: "Kilden mangler, eller den er for svak til å klassifisere. Da stopper vi og henter grunnlag.",
      keywords: [],
    },
  ],
} as const;

export type ToolClass = {
  id: string;
  label: string;
  meaning: string;
  keywords: string[];
};

export type ToolConfig = {
  intro: string;
  disclaimer: string;
  classes: ToolClass[];
};

export function classifyClaim(source: string, classes: readonly ToolClass[]) {
  const text = source.trim().toLowerCase();
  if (!text) return "uklart";
  for (const klass of classes) {
    if (klass.id === "uklart") continue;
    if (klass.keywords.some((word) => word && text.includes(word.toLowerCase()))) {
      return klass.id;
    }
  }
  return "uklart";
}
