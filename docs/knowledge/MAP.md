# FLO fire-safety knowledge map

Research output before copy froze. Public brand: FLO. Structure: VCTRA. Level 5 inference is not published as fact.

Authoritative reads used (not competitor copy):

- Lovdata: forskrift om brannforebygging (FOB) kap. 2 eier §§ 4–10, kap. 3 bruker §§ 11–13
- DSB: veiledning til FOB — bruker = formell bruksrett
- DiBK: TEK17 kap. 11 innledning — bruk, persontall, areal, etasjer, brannenergi, særskilt risiko
- Lovdata: internkontrollforskriften § 5
- Lovdata: SAK10
- DiBK sentral godkjenning FLO BRANNSIKRING AS 979582064 (TK3 konsept, TK3 uavhengig kontroll, TK1 søker)

Live encoding: `src/content/knowledge/*`, hub `/fag-og-kunnskap`, graph `/api/knowledge`.

---

## A. Fire-safety knowledge map

### Algorithm (every public answer)

Hvem spør → situasjon → hva har endret seg → bygg → bruk → ansvar → risiko → dokumentasjon → faktisk krav → alternativer → neste steg.

### Roles

Eier · bruker/virksomhet · leietaker · forvalter · byggherre · arkitekt · RIBr · ansvarlig søker · entreprenør · uavhengig kontrollerende · tilsynsmyndighet · privat/bolig.

Owner vs user is two duty-sets (FOB kap. 2 vs kap. 3). Lease allocates tasks. Public-law duty cannot be contracted away.

### Building / state / change

States include existing, change of use, tenant change, missing documentation, as-built mismatch, deviation, handover, normal operation.

Change types: use, occupancy, layout, tenant, escape, fire load, equipment, organisation, installation, documentation.

A change can make old premises insufficient. This is the central new node.

### Documents

Strategy, concept, drawings, detail design, as built, control, deviation, inspection, risk, internal control, evacuation, training.

Document → building → use → responsible role → requirement → version → current state → source → evidence.

Signature question: does what is documented match what is built and used?

### Requirement decision

Claim → fact → source → classification (requirement / pre-accepted / recommendation / professional assessment / unknown) → alternative → decision.

### Lifecycle

Idea → premises → concept → detail → procurement → execution → control → handover → operation → change → inspection → deviation → correction.

### Graphs

- Ny leietaker: bruk → persontall → brannenergi → rømning → konsept → prosjektering → utførelse → dokumentasjon → driftansvar
- Påstand eller krav: påstand → fakta → kilde → klasse → alternativer → beslutning
- Dokumentasjon mot bygg: dokumentert → bygget → endret → mangler → digitalt/befaring → spor
- Utleiedel (eget spor): situasjon → bygg → bruk → endring → dokumentasjon → krav → løsninger → digitalt/befaring → neste

---

## B. ICP × question map

| ICP | Confirmed | Top problems | Buying moment | Evidence | Service | Mode | CTA |
|---|---|---|---|---|---|---|---|
| Eiendom / forvaltning | yes | mismatch, tenant change, wandering deviations | tilsyn, overtakelse, leietaker | konsept, tegning, avvik, kontrakt | rådgivning | digitalt | Få oversikt over porteføljen |
| Virksomhet / bruker | yes | perm uten spor, uklart eier/bruker | tilsyn mot virksomhet | internkontroll, øvelse | rådgivning | digitalt | Kartlegg roller og kompetanse |
| Arkitekt / byggherre | no case | brann etter planlås | før plan og anbud | plan, bruk, persontall | RIBr | digitalt | Avklar før prosjektet låses |
| Entreprenør | no case | «må» uten kilde | anleggsmøte | det som er sagt + tegning | RIBr | hybrid | Få vurdert hva som faktisk gjelder |
| Industri / kraft | no case | ny drift mot gammelt konsept | nytt utstyr | prosess + konsept | RIBr | hybrid | Avklar før driften låses |
| Kommune | no fire-case | mange bygg, tynn spor | tilsyn, årshjul | per bygg | rådgivning | digitalt | Få oversikt over bygningsmassen |
| Privat / bolig | **own track, not a confirmed market** | utleiedel, kjeller, loft | før ombygging / utleie | tegning, bilder | RIBr when needed | digitalt | Send inn tegninger eller bilder |

Privat is not mixed into the commercial who-grid.

---

## C. Content gap map

**Answered:** påstand/krav, eier/bruker, endring, dokumentasjon mot bygg, avvik, gammel dokumentasjon, konsept vs detalj, når RIBr, digitalt/befaring, overtakelse, utleiedel.

**Weak — not invented:** project effect, 3D as a product, privat as market, kommune-case, role-specific training depth.

**Missing as own nodes:** portfolio prioritisation in depth, GMB as automated channel, training-per-role node.

**EVIDENCE_REQUIRED:** privat as FLO core market, Bremanger as fire case, «alle områder» passiv sikring, 3D as FLO main offering.

---

## D. Article / cluster map

Pillars: påstand eller krav · eier eller leietaker · hva har endret seg · stemmer dokumentasjonen · avvik · utleiedel (privat).

Support: bruksendring · konsept/detalj · RIBr-timing · gammel dokumentasjon · 3D · overtakelse · digitalt/befaring · NS 3924 · flere krav samme bygg.

Clusters carry FAQ + ICP variation + GMB/LinkedIn projection from the same node. No second truth.

---

## E. Distribution map

Every knowledge node projects to:

- Answer page `/fag-og-kunnskap/{slug}`
- Hub card
- FAQ contract (10 points)
- GMB short (same facts)
- LinkedIn short (same facts)
- AI snapshot `/api/knowledge/{slug}` and `/llms.txt`

GMB does not introduce unique facts.

---

## F. Source map

| Id | Level | Use |
|---|---|---|
| bl | 1 | Overordnet plikt |
| fob / fob-eier / fob-bruker | 1 | Eier vs bruker |
| tek17-11 | 1 | Premisser og tiltak |
| ik | 1 | Skriftlig internkontroll |
| sak10 | 1 | Ansvar i byggesak |
| dsb-fob | 2 | Tolking av bruker |
| ns3924 | 2 | Tegnespråk, ikke automatisk ugyldig eldre tegning |
| dibk-sg | 3 | FLO TK3 dokumentert |
| Customer file | 4 | Bygg, bruk, det som er sagt |
| VCTRA structure | 5 | Unpublished as fact |

FLO evidence currently publishable: DiBK godkjenning, named relations without fire-effect (shown as named, not as proof).
