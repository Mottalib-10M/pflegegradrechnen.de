import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, rangliste, LAENDER } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Rheinland-Pfalz: niedrigster Pflegeanteil, aber hohe Unterkunft; der Eigenanteil sinkt mit den Jahren am wenigsten. */
const k = kosten('RP'), v = kosten('RP', 'vorher'), b = kosten('BUND'), sl = kosten('SL');
const j = [1, 13, 25, 37].map((m) => heimMonat(k, m));
const platz1 = rangliste().indexOf('RP') + 1;
const platz4 = [...LAENDER].sort((x, y) => heimMonat(kosten(y), 37).eigenanteil - heimMonat(kosten(x), 37).eigenanteil).indexOf('RP') + 1;
const fest = k.uv + k.invest;
const drei = heimVerlauf(k, 1, 36).summe;

export default defineGuide({
  id: 'pflegeheim-kosten-rheinland-pfalz',
  group: 'land',
  order: 110,
  tool: 'heim',
  toolPreset: { land: 'RP' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-hessen', 'pflegeheim-kosten-saarland', 'pflegeheim-kosten-nordrhein-westfalen', 'investitionskosten'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_43'],
  de: {
    slug: 'pflegeheim-kosten-rheinland-pfalz',
    nav: 'Rheinland-Pfalz',
    card: `Niedrigster Pflegeanteil Deutschlands, aber hohe Unterkunft: ${DE.eur(k.mit15)} im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten.`,
    title: 'Pflegeheim Kosten Rheinland-Pfalz 2026: Eigenanteil je Jahr',
    description: `Pflegeheim in Rheinland-Pfalz 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten (vdek, 1.7.2026), niedrigster Pflegeanteil, hohe Unterkunft.`,
    h1: 'Pflegeheim in Rheinland-Pfalz: günstige Pflege, teures Wohnen',
    intro: 'Rheinland-Pfalz hat den niedrigsten Pflegeanteil aller Länder. Warum der Eigenanteil trotzdem nur langsam sinkt und Langzeitbewohner mehr zahlen als anderswo.',
    resume: `Rheinland-Pfalz hat am 1. Juli 2026 den niedrigsten einrichtungseinheitlichen Eigenanteil für die Pflege aller Länder: ${DE.eur(k.eee)} im Monat vor dem Zuschlag, gegenüber ${DE.eur(b.eee)} im Bund (vdek). Unterkunft und Verpflegung sind mit ${DE.eur(k.uv)} dagegen die zweithöchsten in Deutschland nach Nordrhein-Westfalen, die Investitionskosten liegen bei ${DE.eur(k.invest)}. Im ersten Aufenthaltsjahr ergibt das ${DE.eur(k.mit15)} im Monat, Platz ${platz1} unter den 16 Ländern, also im Mittelfeld. Doch der Leistungszuschlag der Pflegekasse senkt nur den Pflegeanteil, und der ist hier klein. Deshalb sinkt der Eigenanteil bis zum vierten Jahr nur auf ${DE.eur(j[3].eigenanteil)}, Platz ${platz4} bei den Langzeitbewohnern. Wohnen, Essen und Gebäude kosten zusammen ${DE.eur(fest)} im Monat und werden nie bezuschusst. Die ersten drei Jahre zusammen kosten im Schnitt ${DE.eur(drei)}. Seit Januar 2026 ist der Eigenanteil im ersten Jahr um ${DE.eur(k.mit15 - v.mit15)} gestiegen, weniger als in den meisten Ländern.`,
    faqs: [
      { q: 'Warum sinkt der Eigenanteil in Rheinland-Pfalz mit der Zeit so wenig?', a: `Weil der Zuschlag nach § 43c SGB XI nur auf den Pflegeanteil wirkt, der in Rheinland-Pfalz mit ${DE.eur(k.eee)} der niedrigste aller Länder ist. Unterkunft, Verpflegung und Investitionskosten von zusammen ${DE.eur(fest)} bleiben unverändert. Vom ersten zum vierten Jahr sinkt der Eigenanteil deshalb nur um ${DE.eur(j[0].eigenanteil - j[3].eigenanteil)} im Monat.` },
      { q: 'Ist Rheinland-Pfalz für einen langen Heimaufenthalt teuer?', a: `Im Vergleich ja: Ab dem vierten Jahr liegt der Eigenanteil mit ${DE.eur(j[3].eigenanteil)} über dem Bundesschnitt von ${DE.eur(heimMonat(b, 37).eigenanteil)}, obwohl er im ersten Jahr darunter liegt. Wer mit vielen Jahren im Heim rechnet, sollte bei der Wahl des Hauses vor allem auf Unterkunft, Verpflegung und Investitionskosten achten.` },
      { q: 'Wie unterscheidet sich Rheinland-Pfalz vom Saarland?', a: `Das Saarland ist im ersten Jahr mit ${DE.eur(sl.mit15)} deutlich teurer, vor allem wegen des höheren Pflegeanteils und der höchsten Ausbildungsumlage Deutschlands. Ab dem vierten Jahr liegen die beiden Länder fast gleich, weil im Saarland dann der große Pflegeanteil stark bezuschusst wird, in Rheinland-Pfalz aber die Unterkunft weiter voll zählt.` },
    ],
    body: (h) => `
<h2>Vier Jahre in Rheinland-Pfalz und im Bund</h2>
${h.table(['Jahr', 'Zuschlag', 'Rheinland-Pfalz', 'Bund', 'Unterschied'],
  j.map((x, i) => { const bx = heimMonat(b, [1, 13, 25, 37][i]); return [`${i + 1}.`, h.pct(x.satz, 0), h.eur(x.eigenanteil), h.eur(bx.eigenanteil), h.eur(x.eigenanteil - bx.eigenanteil)]; }),
  'Eigenanteil im Monat, vdek, 1. Juli 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>Die Tabelle kehrt das gewohnte Bild um: Im ersten Jahr liegt Rheinland-Pfalz unter dem Bundesschnitt, ab dem dritten Jahr darüber. Für Familien heißt das, dass die Belastung über die Zeit kaum leichter wird. Wer Ersparnisse plant, sollte im Rechner mit vielen Monaten rechnen und nicht vom ersten Jahr auf die folgenden schließen.</p>
<h2>Worauf es bei der Heimwahl ankommt</h2>
<p>Weil Unterkunft und Verpflegung hier mit ${h.eur(k.uv)} so schwer wiegen, lohnt der Vergleich dieser Position zwischen den Häusern besonders. Sie hängt von Zimmergröße, Einzel- oder Doppelzimmer und der Verpflegung ab. Ein Unterschied von ${h.eur(150)} bei der Unterkunft wirkt jeden Monat voll, ein gleich hoher Unterschied beim Pflegeanteil im vierten Jahr nur noch zu einem Viertel. Die Investitionskosten erklärt ${h.a('investitionskosten', 'Investitionskosten')}; wer mit dem Nachbarland vergleichen möchte, findet die Werte unter ${h.a('pflegeheim-kosten-hessen', 'Hessen')} und ${h.a('pflegeheim-kosten-saarland', 'Saarland')}.</p>
`,
  },
  en: {
    slug: 'care-home-costs-rhineland-palatinate',
    nav: 'Rhineland-Palatinate',
    card: `Germany’s lowest care part but costly accommodation: ${EN.eur(k.mit15)} in year one, ${EN.eur(j[3].eigenanteil)} from year four.`,
    title: 'Care Home Costs Rhineland-Palatinate 2026: Co-payment',
    description: `Care home in Rhineland-Palatinate 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j[3].eigenanteil)} from year four (vdek, 1 July 2026); lowest care part, high accommodation costs.`,
    h1: 'Care homes in Rhineland-Palatinate: cheap care, costly living',
    intro: 'Rhineland-Palatinate has the lowest care part of any state. Why the co-payment still falls slowly and long-term residents pay more than elsewhere.',
    resume: `On 1 July 2026 Rhineland-Palatinate had the lowest uniform care co-payment (EEE) of all German states: ${EN.eur(k.eee)} a month before the supplement, against ${EN.eur(b.eee)} nationally (vdek). Board and lodging, by contrast, are the second-highest in Germany after North Rhine-Westphalia at ${EN.eur(k.uv)}, and investment costs are ${EN.eur(k.invest)}. In the first year of residence that makes ${EN.eur(k.mit15)} a month, rank ${platz1} of 16, mid-table. But the care fund’s supplement only reduces the care part, which is small here. The co-payment therefore only falls to ${EN.eur(j[3].eigenanteil)} by year four, rank ${platz4} for long-term residents. Accommodation, meals and the building together cost ${EN.eur(fest)} a month and are never subsidised. The first three years together cost about ${EN.eur(drei)}. Since January 2026 the first-year co-payment has risen by ${EN.eur(k.mit15 - v.mit15)}, less than in most states.`,
    faqs: [
      { q: 'Why does the co-payment in Rhineland-Palatinate fall so little over time?', a: `The supplement under section 43c SGB XI only applies to the care part, which at ${EN.eur(k.eee)} is the lowest of any state. Board, lodging and investment costs of ${EN.eur(fest)} combined stay the same. Between year one and year four the co-payment therefore drops by only ${EN.eur(j[0].eigenanteil - j[3].eigenanteil)} a month.` },
      { q: 'Is Rhineland-Palatinate expensive for a long stay?', a: `Relatively, yes: from year four the co-payment of ${EN.eur(j[3].eigenanteil)} is above the national ${EN.eur(heimMonat(b, 37).eigenanteil)}, although it is below in year one. Families expecting many years in a home should focus on accommodation, meals and investment costs when choosing between homes in the state.` },
      { q: 'How does Rhineland-Palatinate compare with Saarland?', a: `Saarland is clearly dearer in year one at ${EN.eur(sl.mit15)}, mainly because of a higher care part and Germany’s highest training levy. From year four the two are almost level, because Saarland’s large care part is then heavily subsidised while accommodation in Rhineland-Palatinate still counts in full.` },
    ],
    body: (h) => `
<h2>Four years in Rhineland-Palatinate and nationally</h2>
${h.table(['Year', 'Supplement', 'Rhineland-Palatinate', 'Germany', 'Difference'],
  j.map((x, i) => { const bx = heimMonat(b, [1, 13, 25, 37][i]); return [`${i + 1}`, h.pct(x.satz, 0), h.eur(x.eigenanteil), h.eur(bx.eigenanteil), h.eur(x.eigenanteil - bx.eigenanteil)]; }),
  'Monthly co-payment, vdek, 1 July 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>The table reverses the usual picture: in year one Rhineland-Palatinate is below the national average, from year three above it. The burden therefore barely eases over time, unlike in most other states. When planning savings, run the calculator over many months rather than extrapolating from the first year. For relatives abroad who expect to support a parent for a long time, this is the figure to plan around.</p>
<h2>What matters when choosing a home</h2>
<p>Because board and lodging weigh so much here at ${h.eur(k.uv)}, comparing that line between homes pays off. It depends on room size, single or double room and catering. A ${h.eur(150)} difference in accommodation applies in full every month; the same difference in the care part shrinks to a quarter by year four. ${h.a('investitionskosten', 'Investment costs')} are explained separately; for neighbouring states see ${h.a('pflegeheim-kosten-hessen', 'Hesse')} and ${h.a('pflegeheim-kosten-saarland', 'Saarland')}.</p>
`,
  },
});
