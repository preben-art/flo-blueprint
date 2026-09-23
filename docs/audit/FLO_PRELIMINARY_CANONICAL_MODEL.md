# FLO — Preliminary Canonical Model

**Status:** PRELIMINARY. Ikke godkjent for implementering.  
**Sannhetsfiler:** `data/source/*.json` + `data/canonical/preliminary-model.json`  
**Regel:** Inferred blir aldri faktum i UI.

Dette er én modell — ikke innhold spredt i React-komponenter. Den er fylt med det som faktisk finnes. Tomme felt er bevisst tomme.

---

## Kjerneentiteter

```
Company
  Location
  Person
  Partner
  Approval (DiBK)

Situation → CustomerType → BuildingType → Problem → Risk
  → Responsibility → Requirement → Service/Capability
  → Evidence → Project → Knowledge → CTA
```

Claim er tverrgående: `Claim → Source → Regulation → Classification → Consequence → Alternatives → Next step`

---

## Company

| Felt | Verdi | Klasse |
|---|---|---|
| id | `company.flo-brannsikring` | — |
| legalName | FLO BRANNSIKRING AS | SOURCE_CONFIRMED |
| orgnr | 979582064 | SOURCE_CONFIRMED |
| brandName | Flo Brannsikring | SOURCE_CONFIRMED |
| purpose (vedtekter) | Produksjon og salg av brannvernutstyr + tilknyttet | SOURCE_CONFIRMED |
| activity | Konsulent + utførelse + produkter brannsikring | SOURCE_CONFIRMED |
| employees | 15 | SOURCE_CONFIRMED (Brreg) |
| hq | Stryn | SOURCE_CONFIRMED |
| branch | Nordfjordeid | SOURCE_CONFIRMED |
| parent | Byggforvaltning Norge AS | CUSTOMER_INPUT_REQUIRED |
| maalform | Nynorsk i Brreg / bokmål live | CONFLICTING |

**Ikke i modellen som FLO-fakta:** energiledelse, digital FDV som kjerneprodukt, Enova, PropTech-plattform.

---

## Situation (hovedinnganger)

Disse kommer fra startordren og markedskartet (`data/source/vctra-markedskart.json`). De er **ikke** live ruter. De er den kommersielle kjernen vi *foreslår*, fordi live forside ikke har dem.

| id | Label | Live evidens | Status |
|---|---|---|---|
| `sit.papekt` | Noe er påpekt | FAQ om pålegg/konsekvenser, internkontroll-dokumentasjon | PROPOSED, delvis understøttet |
| `sit.endres` | Noe skal endres | FAQ oppdatert brannkonsept, RIBr-side | PROPOSED, delvis understøttet |
| `sit.uklart` | Noe er uklart | FAQ ansvar, konsept vs prosjektering, TEK17 | PROPOSED, delvis understøttet |

Eksemplene (tilsyn, avvik, bruksendring, ny leietaker, second opinion …) er `CUSTOMER_INPUT_REQUIRED` som FLO-volum, selv om de er faglig plausible.

---

## CustomerType

### Live (2)

| id | Label | Path |
|---|---|---|
| `cust.eier-forvalter` | Byggeiere, forvaltere, fagmiljø i byggeprosess | `/kundegrupper/eiendomsselskaper-og-byggeiere` |
| `cust.virksomhet-bruker` | Virksomheter og brukere | `/kundegrupper/storre-leietakere` |

Copy på begge er BFN-kontaminert. Entitetene kan beholdes; teksten må skrives om etter godkjenning.

### Brief / markedskart (ikke verifisert som FLO-ICP)

| id | Status |
|---|---|
| Privat | EVIDENCE_REQUIRED — ikke i live IA |
| Kommune / offentlig | EVIDENCE_REQUIRED |
| Eiendom / forvaltning | SOURCE_CONFIRMED (Coop, Weenaas) — men proof er BFN-stemme |
| Arkitekt / byggherre | INFERRED — nevnt i copy, ingen case |
| Industri / kraft | INFERRED — ticker |
| Entreprenør | INFERRED — nevnt i copy |
| Hotell / overnatting | SOURCE_CONFIRMED via Classic Norway, svakt proof |

---

## Service + Capability

Tre **Service**-noder. Resten er capabilities som kan henge under dem, ikke egne markedsførte hovedfløyer før FLO bekrefter.

```
svc.brannvernradgivning
  cap.dokumentasjon
  cap.risikoanalyse
  cap.tegninger-orientering
  cap.evakuering-beredskap
  cap.kurs-ovelser
  cap.oppfolging
  cap.vr-ovelse          (nyhet, ikke produktside)

svc.ribr
  cap.brannkonsept
  cap.planleggingsfase
  cap.detaljprosjektering-installasjoner
  cap.uavhengig-kontroll-tk3     (DiBK evidence)
  cap.eksisterende-bygg
  cap.ekspertvurdering
  cap.ns3924-tegninger           (nyhet)

svc.utforelse
  cap.kontroll-installasjoner
  cap.passiv-brannsikring        (EVIDENCE_REQUIRED på bredde)
  cap.montasje-utbedring         (forside, tynn underside)
  cap.slokkeutstyr-frityr        (forside)

unplaced / needs decision
  cap.3d-scanning
  cap.industrivern
  cap.varme-arbeider-kurs
  cap.ansvarlig-soker-tk1        (DiBK, ikke forklart på nett)
```

---

## Requirement / Regulation / Claim

Live FAQ peker på, uten å modellere dem som entiteter:

- Brann- og eksplosjonsvernloven
- Forskrift om brannforebygging
- TEK17 kap. 11
- Internkontrollforskriften § 5
- DSB / særskilte brannobjekter
- SAK10 (kun via DiBK-betydningstekst, ikke FLO-copy)
- NS 3924:2025
- Forskrift om industrivern (kun i utdatert kurs-snippet)

**Claim-klasser som modellen må støtte** (ikke vis «A1–A11» i UI):

`FAKTISK_KRAV | ANBEFALING | FAGLIG_VURDERING | PROSJEKTVALG | PRAKSIS | UKLART`

Eksempel som allerede feiler i live innhold: VR-øvelse solgt inntil «lovpålagt brannøvelse» uten kilde.

---

## Project / Evidence / Knowledge / CTA

| Type | Live | Modell |
|---|---|---|
| Project | 3 URL-er, BFN-stemme | Behold entitet, krev FLO-rewrites + bevis |
| Evidence | DiBK TK3, 14 personer, 4 portretter | Sterkeste bevis. Cases er svake. |
| Knowledge | 10 FAQ + 3 nyheter | Trenger hub; 2 av 3 artikler er feil merkevare |
| CTA | Kontakt oss / «én til to virkedager» | Behold som Contact CTA. Mangler situasjons-CTA |

---

## Relasjonseksempel (mål, ikke live)

«Vi har fått et avvik»

→ `cust.eier-forvalter`  
→ `building.naeringsbygg` (BuildingType mangler som data)  
→ problem: dokumentasjon / avvik  
→ risk: pålegg, forsikring, stenging (FAQ, ikke juridisk konklusjon)  
→ responsibility: eier vs bruker (FAQ)  
→ requirement: forskrift om brannforebygging + internkontroll — `UKLART` inntil kildedokument  
→ services: brannvernrådgivning ± utførelse ± RIBr  
→ evidence: DiBK, relevant case (mangler)  
→ knowledge: FAQ ansvar + konsekvenser  
→ CTA: send situasjon, 1–2 virkedager

Denne kjeden **kan ikke** bygges fra dagens CMS uten ny content model.

---

## Foreløpig IA (ikke låst)

Retning etter modell — URL-er er **ikke** endelige:

```
/
  /situasjon/papekt | endres | uklart
/losninger
  /losninger/brannvernradgivning
  /losninger/ribr
  /losninger/brannteknisk-utforelse
  /losninger/{capability}     kun der innhold og evidens finnes
/hvem-er-du
  /hvem-er-du/eier-forvalter
  /hvem-er-du/virksomhet-bruker
  + flere kun etter FLO-bekreftet marked
/prosjekter
/fag-og-kunnskap
  artikler | guider | faq | regelverk | pastand-eller-krav | opplaering
/om-flo
/kontakt
```

Migrering av live URL-er: se gap-rapporten. Ingen 200-side fjernes uten KEEP/MOVE/MERGE/REWRITE/301.

---

## VCTRA onboarding-felter (kort)

Full mapping: `docs/onboarding/VCTRA_ONBOARDING_FILL.md`

Identitet og tjenester kan fylles fra register + live fagtekst. Pris, for/not-for, konkurranse, vekst, A1–A11 per side og godkjent ICP **mangler** uten PDF og kundesamtykke.
