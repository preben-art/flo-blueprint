# FLO — Preliminary Gap Report

**Status:** Etter source mapping. Sortert CRITICAL → LOW.  
**Ikke utført:** design, copywriting, implementering.

---

## CRITICAL

1. **Live site er BFN, ikke FLO**  
   Titles, meta, partnere, kundehistorier, to av tre artikler, LinkedIn, e-post-parenteser, eierskaps-tidslinje. Ethvert «viderebygg på dagens Webflow» reproduserer feil merkevare.

2. **Ingen source of truth i kode**  
   Tomt repo. Sannhet ligger i `data/source/` etter denne kjøringen, ikke i komponenter.

3. **Onboarding-PDF mangler**  
   `FLO_Brannsikring_onboarding_utfylt.pdf` ble ikke med i workspace. Identitet/ICP/pris/konkurranse fra VCTRA-skjema er `CUSTOMER_INPUT_REQUIRED`.

4. **`/kundehistorier` 404**  
   Intern hovedlenke død. Authority og proof-fløy er brutt.

5. **Kommersiell kjerne finnes ikke som IA**  
   Situasjon → bygg → bruk → dokumentasjon → ansvar → risiko → krav → alternativer → prioritering er ikke ruter, ikke entiteter, ikke navigasjon. Forsiden er hero + 3 tjenester + BFN-cases + FAQ.

6. **Claims uten evidens som i dag presenteres som faktum**  
   - «Vi garanterer* full kontroll…» i meta (stjerne uten fotnote)  
   - BFN-eiertabell som om den er FLO  
   - VR som «lovpålagt brannøvelse»  
   - «kompetanse på alle områder innen passiv brannsikring»  
   - 3D-scanning uten case/metode/person

7. **SEO-fundament mangler**  
   Ingen sitemap, canonical, schema, robots-regler, personvern. Lorem-meta. Google viser gamle nynorsk-ruter.

---

## HIGH

8. **Tjeneste-slug ≠ tjenestenavn**  
   `/teknisk-forvaltning` = rådgivning. `/brannforebygging` = RIBr. Ødelegger både menneske- og maskinforståelse.

9. **Proof er ikke FLO-proof**  
   Tre cases, BFN-stemme, ingen bygg, ingen dokumentert branneffekt. Logo-stripe uten relasjon.

10. **Kundemodell for tynn mot brief**  
    Live: 2 grupper. Brief: 6. Privat/kommune/industri/entreprenør/arkitekt er ikke evidensbasert. Å bygge seks ICP-fløyer nå ville være fiksjon.

11. **Knowledge hub mangler**  
    Ingen `/fag-og-kunnskap`, guider, regelverksbibliotek, sammenligninger, verktøy. Nyheter er ikke kunnskapsreise.

12. **Påstand eller krav mangler**  
    Sentral FLO-differensiator i briefen. Ingen modell, ingen UI, ingen innhold.

13. **Kurs og industrivern borte live, synlige i Google**  
    `/kurs` → kontakt. Authority lekker. `OUTDATED_POSSIBLE` innhold må enten gjenopprettes, 301-forklares eller erstattes med ekte sider.

14. **Personer uten rolle og uten foto**  
    10 av 14 uten portrett. Flere uten tittel. 15 vs 14 mot Brreg.

15. **SVG-logo mangler**  
    Kun PNG. Skjult SVG i DOM er **BFN**, ikke FLO. Trengs master SVG før seriøs implementering.

15b. **BFN-gult i FLO-UI**  
    `#FFC563` i skjult SVG + `rgb(255,197,99)` på knapper. Skal ikke overleve som FLO-aksent.

16. **Brand-konflikt oransje (brief/kart) vs rød (live wordmark)**  
    Må avgjøres. Default i neste fase: videreutvikle **live rød + svart + off-white**, ikke VCTRA-oransje, med mindre FLO sier nei.

17. **A1–A11 per tjeneste**  
    Mangler: hvem/når, utløsere, alternativer, hva kunden må levere, tid, pris, misforståelser, related, neste steg. Delvis: hva og leveranse.

---

## MEDIUM

18. **3D-scanning** som løfte uten tjenesterom.  
19. **Ansvarlig søker TK1** i DiBK, uforklart på nett.  
20. **FAQ Q/A-mismatch** på øvelsesinnhold.  
21. **Weenaas vs Wenaas**.  
22. **Norfjordeid-typo**.  
23. **Skjema method=get**.  
24. **Ingen analytics** observert (ingen GTM/GA i HTML).  
25. **Målform:** nynorsk i Brreg, bokmål live, nynorsk rest på én H1.  
26. **Legacy 404 uten 301:** `/tenester-utforing`, `/tenester-produktar`, `/tenester-dokumentasjon`, `/tenester-prosjektering`.  
27. **AI-generert bilde** allerede i produksjon.  
28. **Beausite Classic** som FLO-typografi er template, ikke dokumentert identitet.  
29. **Buyer questions** fra brief (avvik, second opinion, digitalt, pris, tid) har ikke egne landinger.  
30. **Comparisons** (FLO vs «bare slokkeapparat-firms», vs totalentreprenør, vs kun RIBr-kontor) mangler.

---

## LOW

31. Emoji i nyhetstittel (🔥).  
32. Webflow-placeholder SVG 403.  
33. Copyright «© YYYY».  
34. Mailto med leading nbsp (`mailto: post@…`).  
35. Ingen `llms.txt`.  
36. Ingen engelsk rute (sannsynligvis bevisst).

---

## Content gaps mot briefens innholdstyper

| Type | Live | Gap |
|---|---|---|
| Questions / kjøpssignaler | Delvis FAQ | Ingen journeys |
| Services | 3 | Capabilities ikke modellert; kurs/industrivern/3D |
| Proof / cases | 3 svake | FLO-stemme, bygg, resultat |
| Comparisons | 0 | HIGH for «påstand eller krav» |
| FAQ | 10 | Feil siste svar; ikke per tjeneste/ICP; schema kun via JS |
| Buyer journeys | 0 | CRITICAL |
| Faginnhold | 1–2 relevante artikler | Hub + regelverk |
| Entity relations | 0 | Hele grafen |
| Geography | Stryn + Nordfjordeid | «Digitalt hele Norge / fysisk Sogn–Nordvest» er VCTRA-kart, ikke live |

---

## Migrering av eksisterende URL-er (foreløpig)

Ingen side fjernes uten vurdering. Dette er **anbefaling til godkjenning**, ikke utført.

| URL | Forslag | Begrunnelse |
|---|---|---|
| `/` | REWRITE | Behold authority, ny beslutningsreise |
| `/tjenester` | REWRITE | Tjenesteindeks / fagfløy |
| `/tjenester/teknisk-forvaltning` | MOVE + 301 | Slug må matche Brannvernrådgivning |
| `/tjenester/brannforebygging` | MOVE + 301 | Slug må matche RIBr |
| `/tjenester/brannteknisk-utforelse` | KEEP + REWRITE | Slug OK |
| `/tenester-radgjeving` | KEEP 301 | Virker |
| `/tenester-kontroll` | KEEP 301 | Virker |
| `/tenester-utforing` m.fl. | 301 RESTORE | Nå 404, Google husker dem |
| `/om-oss` | REWRITE | Skill FLO-historie fra BFN-eierskap |
| `/kontakt` | KEEP + REWRITE | Behold, fjern BFN-epost |
| `/partnere` | REWRITE eller MERGE | Dagens innhold er feil merkevare |
| `/nyheter` | MOVE → knowledge | Ikke blogg |
| `/nyheter/vr-brannovelse` | KEEP + REWRITE | Relevant, fjern juridisk overclaim |
| `/nyheter/brannsikkerhet-krever-…` | ARCHIVE eller MERGE til BFN | Ikke FLO |
| `/nyheter/ny-brannstandard-…` | REWRITE i FLO-stemme | Innhold relevant |
| `/kundehistorier` | RESTORE | 404 i dag |
| `/kundehistorier/*` | REWRITE | FLO-proof |
| `/kundegrupper/*` | MOVE → `/hvem-er-du/*` | 2 ruter, copy må renses |
| `/kurs` | RESTORE eller MERGE | I dag kontakt-redirect |
| `/404` | KEEP | |

VERIFY-kolonnen fylles i runtime-proof **etter** build, ikke nå.

---

## A1–A11 dekning (live, ikke merket på siden)

| Behov | Forside | Tjeneste | Case | Om |
|---|---|---|---|---|
| Direkte svar | Delvis FAQ | Delvis hva | Nei | Delvis hvem |
| Hvem gjelder det for | 2 klynger | Svakt | Logo | Nei |
| Situasjon | Nei | Nei | Nei | Nei |
| Problem | FAQ | Svakt | Nei | Nei |
| Konsekvens | FAQ | Nei | Nei | Nei |
| Faktisk krav | FAQ, usitert | Svakt | Nei | Nei |
| Alternativer | Nei | Nei | Nei | Nei |
| FLO-løsning | 3 kort | Delvis | BFN | Narrativ |
| Prosess | 3 steg | Nei | Nei | Nei |
| Proof | BFN-sitater | Nei | Svakt | Personer + DiBK-logo |
| FAQ | Ja | Nei | Nei | Nei |
| Neste steg | Skjema | Skjema | Skjema | Skjema |

---

## Hva som **ikke** er gap (bevar)

- Juridisk identitet og orgnr
- DiBK TK3-godkjenninger
- Navngitte fagfolk og kontaktpunkter
- Tre reelle fagfløyer (rådgivning / RIBr / utførelse)
- 10 FAQ som ekte DOM-tekst
- Wordmark (rød prikk) og portretter av ledergruppen
- Historisk røtter 1990-tall / slokkeutstyr — som *opphav*, ikke som eneste tilbud
- Legacy-ruter som allerede 301-er
