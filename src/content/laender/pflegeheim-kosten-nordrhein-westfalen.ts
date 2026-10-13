import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, rangliste } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** NRW: hohe Unterkunfts- und Investitionskosten, niedriger Pflegeanteil; ab Jahr 4 das teuerste Land. */
const k = kosten('NW'), v = kosten('NW', 'vorher'), b = kosten('BUND'), by = kosten('BY');
const j = [1, 13, 25, 37].map((m) => heimMonat(k, m));
const vierRang = [...rangliste()].sort((x, y) => heimMonat(kosten(y), 37).eigenanteil - heimMonat(kosten(x), 37).eigenanteil).indexOf('NW') + 1;
const platz = rangliste().indexOf('NW') + 1;
const PW = P.pflegewohngeld_nw;
const fest = k.uv + k.invest;

export default defineGuide({
  id: 'pflegeheim-kosten-nordrhein-westfalen',
  group: 'land',
  order: 100,
  tool: 'heim',
  toolPreset: { land: 'NW' },
  related: ['pflegeheim-kosten', 'investitionskosten', 'hilfe-zur-pflege', 'leistungszuschlag', 'pflegeheim-kosten-rheinland-pfalz'],
  sources: ['vdek2607', 'vdek2601', 'vzNrwPflegewohngeld', 'sgb11_43c'],
  de: {
    slug: 'pflegeheim-kosten-nordrhein-westfalen',
    nav: 'Nordrhein-Westfalen',
    card: `${DE.eur(k.mit15)} im ersten Jahr, ab dem vierten noch ${DE.eur(j[3].eigenanteil)}: Unterkunft und Investitionskosten bestimmen die Rechnung.`,
    title: 'Pflegeheim Kosten NRW 2026: Eigenanteil und Pflegewohngeld',
    description: `Pflegeheim in NRW 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten (vdek, 1.7.2026). Unterkunft ${DE.eur(k.uv)}, Pflegewohngeld für Investitionskosten.`,
    h1: 'Pflegeheim in Nordrhein-Westfalen: was 2026 selbst zu zahlen ist',
    intro: 'In NRW wiegt nicht die Pflege am schwersten, sondern Wohnen, Essen und Gebäude. Das hat Folgen für langjährige Bewohner und für das Pflegewohngeld.',
    resume: `Nordrhein-Westfalen hat am 1. Juli 2026 mit ${DE.eur(k.uv)} die höchsten Kosten für Unterkunft und Verpflegung aller Länder und mit ${DE.eur(k.invest)} auch die höchsten Investitionskosten, so der vdek. Der Pflegeanteil (EEE) liegt dagegen mit ${DE.eur(k.eee)} unter dem Bundesschnitt von ${DE.eur(b.eee)}. Im ersten Aufenthaltsjahr zahlen Bewohner im Schnitt ${DE.eur(k.mit15)} im Monat, Platz ${platz} unter den 16 Ländern. Weil der Leistungszuschlag der Pflegekasse nur den Pflegeanteil senkt, fällt der Eigenanteil in NRW langsamer als anderswo: im zweiten Jahr ${DE.eur(j[1].eigenanteil)}, im dritten ${DE.eur(j[2].eigenanteil)} und ab dem vierten ${DE.eur(j[3].eigenanteil)}. Damit ist NRW ab dem vierten Jahr das Land mit dem höchsten Eigenanteil (Rang ${vierRang}). Unterkunft, Verpflegung und Investitionskosten machen zusammen ${DE.eur(fest)} aus und werden nie bezuschusst. Für die Investitionskosten gibt es in NRW aber das Pflegewohngeld nach dem Alten- und Pflegegesetz, wenn Einkommen und Vermögen nicht reichen.`,
    faqs: [
      { q: 'Was ist das Pflegewohngeld in NRW?', a: `Eine Leistung des Landes nach § 14 APG NRW, die die Investitionskosten im Pflegeheim übernimmt, wenn Einkommen und Vermögen dafür nicht reichen. Es gilt ab Pflegegrad 2 bei dauerhafter vollstationärer Pflege, nicht in der Kurzzeitpflege. Der Schonbetrag beim Vermögen liegt bei ${DE.eur(PW.schonbetrag)} für eine Person und ${DE.eur(PW.schonbetrag_paar)} für Paare; das Geld geht direkt an das Heim.` },
      { q: 'Warum sinkt der Eigenanteil in NRW mit den Jahren so wenig?', a: `Weil der Zuschlag nach § 43c SGB XI nur auf den Pflegeanteil wirkt. In NRW ist dieser vergleichsweise niedrig, während Unterkunft, Verpflegung und Investitionskosten mit zusammen ${DE.eur(fest)} hoch sind. Vom ersten bis zum vierten Jahr sinkt der Eigenanteil deshalb nur um ${DE.eur(j[0].eigenanteil - j[3].eigenanteil)}, in Bayern um ${DE.eur(heimMonat(by, 1).eigenanteil - heimMonat(by, 37).eigenanteil)}.` },
      { q: 'Wo stelle ich den Antrag auf Pflegewohngeld?', a: 'Beim örtlichen Sozialamt des Kreises oder der kreisfreien Stadt, mit Nachweisen zu Einkommen und Vermögen. Das Heim kann den Antrag stellen, aber nur mit Ihrer ausdrücklichen Zustimmung. Fragen Sie vor dem Einzug, ob die Einrichtung förderfähig ist; nur dann wird gezahlt. Übersteigt die Lücke die Investitionskosten, kommt zusätzlich Hilfe zur Pflege in Betracht.' },
    ],
    body: (h) => `
<h2>NRW im Zahlenvergleich</h2>
${h.table(['Bestandteil', 'NRW Juli 2026', 'NRW Januar 2026', 'Bund Juli 2026'], [
  ['Pflegeanteil (EEE) vor Zuschlag', h.eur(k.eee), h.eur(v.eee), h.eur(b.eee)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(v.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(v.invest), h.eur(b.invest)],
  ['Eigenanteil im 1. Jahr', h.eur(k.mit15), h.eur(v.mit15), h.eur(b.mit15)],
  ['Eigenanteil ab dem 4. Jahr', h.eur(j[3].eigenanteil), h.eur(heimMonat(v, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, Durchschnitt der Heime in Nordrhein-Westfalen.', ['l', 'r', 'r', 'r'])}
<p>Seit Januar ist der Eigenanteil im ersten Jahr um ${h.eur(k.mit15 - v.mit15)} gestiegen, vor allem durch den Pflegeanteil (${h.eur(k.eee - v.eee)} mehr). Die Investitionskosten haben sich kaum bewegt. Wer langfristig plant, sollte trotzdem mit den festen Posten rechnen: Sie machen nach drei Jahren mehr als drei Viertel des Eigenanteils aus.</p>
<h2>Pflegewohngeld prüfen, bevor das Ersparte aufgebraucht ist</h2>
<p>Das Pflegewohngeld ist eine Besonderheit von NRW (${h.src('vzNrwPflegewohngeld', 'Verbraucherzentrale NRW')}). Es deckt die Investitionskosten, die in NRW im Schnitt ${h.eur(k.invest)} im Monat betragen, sobald das Vermögen unter ${h.eur(PW.schonbetrag)} liegt und das Einkommen nicht reicht. Wer die Reichweite des Ersparten im Rechner oben prüft, sieht, ab welchem Monat sich der Antrag lohnt; danach kann die ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')} die restliche Lücke schließen.</p>
`,
  },
  en: {
    slug: 'care-home-costs-north-rhine-westphalia',
    nav: 'North Rhine-Westphalia',
    card: `${EN.eur(k.mit15)} in year one and still ${EN.eur(j[3].eigenanteil)} from year four: accommodation and building costs drive the bill.`,
    title: 'Care Home Costs NRW 2026: Co-payment and Pflegewohngeld',
    description: `Care home in North Rhine-Westphalia 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j[3].eigenanteil)} from year four (vdek, 1 July 2026), plus the state’s investment cost help.`,
    h1: 'Care homes in North Rhine-Westphalia: the 2026 co-payment',
    intro: 'In NRW it is not care that weighs most, but board, lodging and the building. That matters for long-term residents and for the state’s housing allowance.',
    resume: `On 1 July 2026 North Rhine-Westphalia had the highest board and lodging costs of any German state, ${EN.eur(k.uv)} a month, and the highest investment costs, ${EN.eur(k.invest)}, according to the vdek. Its care co-payment (EEE), by contrast, is ${EN.eur(k.eee)}, below the national ${EN.eur(b.eee)}. In the first year residents pay ${EN.eur(k.mit15)} a month on average, rank ${platz} of 16. Because the care fund’s supplement only reduces the care part, the co-payment falls more slowly in NRW than elsewhere: ${EN.eur(j[1].eigenanteil)} in year two, ${EN.eur(j[2].eigenanteil)} in year three and ${EN.eur(j[3].eigenanteil)} from year four. From the fourth year NRW is therefore the most expensive state (rank ${vierRang}). Board, lodging and investment costs together come to ${EN.eur(fest)} and are never subsidised by the fund. For the investment costs, however, NRW offers a care home housing allowance (Pflegewohngeld) under its Care Act when income and savings are not enough.`,
    faqs: [
      { q: 'What is Pflegewohngeld in North Rhine-Westphalia?', a: `A state benefit under section 14 of the NRW Care Act (APG NRW) that pays a resident’s investment costs when income and savings cannot. It applies from care grade 2 to permanent residential care, not to short-term care. Protected savings are ${EN.eur(PW.schonbetrag)} for a single person and ${EN.eur(PW.schonbetrag_paar)} for a couple; the money goes straight to the home.` },
      { q: 'Why does the NRW co-payment fall so little over time?', a: `The supplement under section 43c SGB XI only applies to the care part, which is relatively low in NRW, while board, lodging and investment costs are high at ${EN.eur(fest)} combined. Between year one and year four the co-payment therefore drops by only ${EN.eur(j[0].eigenanteil - j[3].eigenanteil)}, against ${EN.eur(heimMonat(by, 1).eigenanteil - heimMonat(by, 37).eigenanteil)} in Bavaria.` },
      { q: 'Where do we apply for Pflegewohngeld?', a: 'At the local social welfare office of the district or independent city, with proof of income and assets. The home may apply for you, but only with your explicit consent. Ask before moving in whether the home is eligible for funding, as only then is the allowance paid. If the gap exceeds the investment costs, social assistance for care can cover the rest.' },
    ],
    body: (h) => `
<h2>NRW in figures</h2>
${h.table(['Component', 'NRW July 2026', 'NRW January 2026', 'Germany July 2026'], [
  ['Care co-payment (EEE) before supplement', h.eur(k.eee), h.eur(v.eee), h.eur(b.eee)],
  ['Board and lodging', h.eur(k.uv), h.eur(v.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(v.invest), h.eur(b.invest)],
  ['Co-payment, year 1', h.eur(k.mit15), h.eur(v.mit15), h.eur(b.mit15)],
  ['Co-payment from year 4', h.eur(j[3].eigenanteil), h.eur(heimMonat(v, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, average across homes in North Rhine-Westphalia.', ['l', 'r', 'r', 'r'])}
<p>Since January the year-one co-payment has risen by ${h.eur(k.mit15 - v.mit15)}, mainly through the care part (${h.eur(k.eee - v.eee)} more). Investment costs barely moved. For long-term planning the fixed items still dominate: after three years they make up more than three quarters of the bill.</p>
<h2>Check Pflegewohngeld before savings run out</h2>
<p>Pflegewohngeld is specific to NRW (${h.src('vzNrwPflegewohngeld', 'Consumer Centre NRW')}). It covers investment costs, averaging ${h.eur(k.invest)} a month, once savings are below ${h.eur(PW.schonbetrag)} and income is insufficient. Use the savings run-down in the calculator above to see from which month an application makes sense; ${h.a('hilfe-zur-pflege', 'social assistance for care')} can close any remaining gap.</p>
`,
  },
});
