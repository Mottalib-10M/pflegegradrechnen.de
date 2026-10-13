import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, rangliste, LAENDER } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Mecklenburg-Vorpommern: niedrige feste Kosten, zweitniedrigster Eigenanteil ab dem vierten Jahr. */
const k = kosten('MV'), v = kosten('MV', 'vorher'), b = kosten('BUND'), sh = kosten('SH'), bb = kosten('BB');
const j = [1, 13, 25, 37].map((m) => heimMonat(k, m));
const platz = rangliste().indexOf('MV') + 1;
const rang4 = [...LAENDER].sort((x, y) => heimMonat(kosten(x), 37).eigenanteil - heimMonat(kosten(y), 37).eigenanteil).indexOf('MV') + 1;
const fest = k.uv + k.invest;

export default defineGuide({
  id: 'pflegeheim-kosten-mecklenburg-vorpommern',
  group: 'land',
  order: 80,
  tool: 'heim',
  toolPreset: { land: 'MV' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-schleswig-holstein', 'pflegeheim-kosten-brandenburg', 'leistungszuschlag', 'hilfe-zur-pflege'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_43'],
  de: {
    slug: 'pflegeheim-kosten-mecklenburg-vorpommern',
    nav: 'Mecklenburg-Vorpommern',
    card: `${DE.eur(k.mit15)} im ersten Jahr, ab dem vierten ${DE.eur(j[3].eigenanteil)}: für Langzeitbewohner eines der günstigsten Länder.`,
    title: 'Pflegeheim Kosten Mecklenburg-Vorpommern 2026: Eigenanteil',
    description: `Pflegeheim in Mecklenburg-Vorpommern 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten (vdek, 1.7.2026); niedrige Unterkunfts- und Gebäudekosten.`,
    h1: 'Pflegeheim in Mecklenburg-Vorpommern: günstig auf Dauer',
    intro: 'Im Nordosten sind Wohnen, Essen und Gebäude im Heim günstig. Das macht Mecklenburg-Vorpommern besonders für lange Aufenthalte zu einem der preiswertesten Länder.',
    resume: `In Mecklenburg-Vorpommern zahlen Pflegeheimbewohner am 1. Juli 2026 im ersten Jahr durchschnittlich ${DE.eur(k.mit15)} im Monat, Platz ${platz} unter den 16 Ländern (vdek). Günstig sind vor allem die Posten, die nie bezuschusst werden: Unterkunft und Verpflegung mit ${DE.eur(k.uv)} und Investitionskosten mit ${DE.eur(k.invest)}, zusammen ${DE.eur(fest)} und damit ${DE.eur(b.uv + b.invest - fest)} unter dem Bundesschnitt. Der Pflegeanteil liegt mit ${DE.eur(k.eee)} vor dem Zuschlag knapp unter dem Bund. Weil die festen Kosten niedrig sind und der Pflegeanteil mit der Zeit zu 75 Prozent übernommen wird, sinkt der Eigenanteil bis zum vierten Jahr auf ${DE.eur(j[3].eigenanteil)}, den ${rang4 === 2 ? 'zweitniedrigsten' : `${rang4}.-niedrigsten`} Wert aller Länder nach Sachsen-Anhalt. Im zweiten Jahr sind es ${DE.eur(j[1].eigenanteil)}, im dritten ${DE.eur(j[2].eigenanteil)}. Seit Januar 2026 stieg der Pflegeanteil um ${DE.eur(k.eee - v.eee)}. Im westlichen Nachbarland Schleswig-Holstein liegt der Eigenanteil im ersten Jahr bei ${DE.eur(sh.mit15)}.`,
    faqs: [
      { q: 'Für wen ist ein Heim in Mecklenburg-Vorpommern finanziell günstig?', a: `Vor allem für Menschen, die voraussichtlich lange im Heim leben. Ab dem vierten Jahr kostet ein Platz im Schnitt ${DE.eur(j[3].eigenanteil)}, weil Unterkunft und Investitionskosten niedrig sind und der Pflegeanteil dann zu drei Vierteln bezuschusst wird. Im ersten Jahr ist der Abstand zum Bund mit ${DE.eur(b.mit15 - k.mit15)} kleiner.` },
      { q: 'Wie unterscheidet sich Mecklenburg-Vorpommern von Schleswig-Holstein?', a: `Schleswig-Holstein hat einen niedrigeren Pflegeanteil (${DE.eur(sh.eee)} zu ${DE.eur(k.eee)}), aber höhere Unterkunft und deutlich höhere Investitionskosten (${DE.eur(sh.invest)} zu ${DE.eur(k.invest)}). Im ersten Jahr ist Schleswig-Holstein deshalb etwas teurer, ab dem vierten Jahr wird der Abstand größer, weil seine festen Kosten nicht bezuschusst werden.` },
      { q: 'Wie viel zahlt die Pflegekasse in einem Heim in Mecklenburg-Vorpommern?', a: `Den festen Betrag nach § 43 SGB XI, je nach Grad zwischen ${DE.eur(P.vollstationaer['2'])} und ${DE.eur(P.vollstationaer['5'])} im Monat, plus den Leistungszuschlag auf den Pflegeanteil: im ersten Jahr ${DE.eur(j[0].zuschlag)}, ab dem vierten ${DE.eur(j[3].zuschlag)} beim Landesdurchschnitt. Beides geht direkt an das Heim und ist im Eigenanteil schon abgezogen.` },
    ],
    body: (h) => `
<h2>Mecklenburg-Vorpommern im Verlauf</h2>
${h.table(['Jahr', 'Mecklenburg-Vorpommern', 'Schleswig-Holstein', 'Brandenburg', 'Bund'],
  [1, 13, 25, 37].map((m, i) => [`${i + 1}.`, h.eur(j[i].eigenanteil), h.eur(heimMonat(sh, m).eigenanteil), h.eur(heimMonat(bb, m).eigenanteil), h.eur(heimMonat(b, m).eigenanteil)]),
  'Eigenanteil im Monat nach Aufenthaltsjahr, vdek, 1. Juli 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>Mit jedem Jahr wächst der Vorsprung gegenüber dem Bund. Das liegt daran, dass in Mecklenburg-Vorpommern der Anteil der festen Kosten am Eigenanteil kleiner ist als anderswo. Für Familien, die ihre Eltern aus einer westdeutschen Stadt in ein Heim in der Nähe eines Kindes an der Ostseeküste holen, kann das ein Argument sein; ausschlaggebend bleibt aber, wo die Menschen leben, die regelmäßig zu Besuch kommen.</p>
<h2>Den Einzug planen</h2>
<p>Das erste Jahr ist auch hier das teuerste. Tragen Sie Rente und Ersparnisse in den Rechner ein, um zu sehen, ob und wann eine Lücke entsteht. Ab dem 13. Monat steigt der Zuschuss der Kasse von 15 auf 30 Prozent des Pflegeanteils; die Kasse berechnet das seit Juli 2026 selbst (${h.src('sgb11_43c', '§ 43c SGB XI')}). Wer die Regel genauer verstehen möchte, findet sie unter ${h.a('leistungszuschlag', 'Leistungszuschlag')}.</p>
`,
  },
  en: {
    slug: 'care-home-costs-mecklenburg-western-pomerania',
    nav: 'Mecklenburg-Western Pomerania',
    card: `${EN.eur(k.mit15)} in year one, ${EN.eur(j[3].eigenanteil)} from year four: one of the cheapest states for long-term residents.`,
    title: 'Care Home Costs Mecklenburg-Western Pomerania 2026',
    description: `Care home in Mecklenburg-Western Pomerania 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j[3].eigenanteil)} from year four (vdek, 1 July 2026); low accommodation and building costs.`,
    h1: 'Care homes in Mecklenburg-Western Pomerania: cheap in the long run',
    intro: 'In the north-east, accommodation, meals and buildings in care homes are inexpensive, which makes the state one of the cheapest for long stays.',
    resume: `In Mecklenburg-Western Pomerania care home residents paid an average of ${EN.eur(k.mit15)} a month in their first year on 1 July 2026, rank ${platz} of the 16 states (vdek). What makes it cheap are the items the care fund never subsidises: board and lodging at ${EN.eur(k.uv)} and investment costs at ${EN.eur(k.invest)}, ${EN.eur(fest)} together and ${EN.eur(b.uv + b.invest - fest)} below the national level. The care part is slightly below average at ${EN.eur(k.eee)} before the supplement. Because fixed costs are low and the care part is 75 percent covered later on, the co-payment falls to ${EN.eur(j[3].eigenanteil)} by year four, the second-lowest of any state after Saxony-Anhalt. In year two it is ${EN.eur(j[1].eigenanteil)}, in year three ${EN.eur(j[2].eigenanteil)}. Since January 2026 the care part has risen by ${EN.eur(k.eee - v.eee)}. In neighbouring Schleswig-Holstein the first-year co-payment is ${EN.eur(sh.mit15)}.`,
    faqs: [
      { q: 'Who benefits most from a care home in Mecklenburg-Western Pomerania?', a: `Mainly people likely to stay a long time. From year four a place costs about ${EN.eur(j[3].eigenanteil)}, because accommodation and investment costs are low and the care part is then three-quarters subsidised. In year one the gap to the national average is smaller at ${EN.eur(b.mit15 - k.mit15)}.` },
      { q: 'How does it compare with Schleswig-Holstein?', a: `Schleswig-Holstein has a lower care part (${EN.eur(sh.eee)} against ${EN.eur(k.eee)}) but higher accommodation and much higher investment costs (${EN.eur(sh.invest)} against ${EN.eur(k.invest)}). It is slightly dearer in year one, and the gap widens from year four because its fixed costs are never subsidised.` },
      { q: 'How much does the care fund pay towards a home here?', a: `The fixed amount under section 43 SGB XI, between ${EN.eur(P.vollstationaer['2'])} and ${EN.eur(P.vollstationaer['5'])} a month depending on the grade, plus the supplement on the care part: ${EN.eur(j[0].zuschlag)} in year one and ${EN.eur(j[3].zuschlag)} from year four at the state average. Both go straight to the home and are already deducted from the co-payment.` },
    ],
    body: (h) => `
<h2>Mecklenburg-Western Pomerania over time</h2>
${h.table(['Year', 'Mecklenburg-W. Pomerania', 'Schleswig-Holstein', 'Brandenburg', 'Germany'],
  [1, 13, 25, 37].map((m, i) => [`${i + 1}`, h.eur(j[i].eigenanteil), h.eur(heimMonat(sh, m).eigenanteil), h.eur(heimMonat(bb, m).eigenanteil), h.eur(heimMonat(b, m).eigenanteil)]),
  'Monthly co-payment by year of stay, vdek, 1 July 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>The lead over the national average grows each year, because fixed costs make up a smaller share of the co-payment here than elsewhere. Families who bring a parent from a western city to a home near a child on the Baltic coast may find that an argument; what matters most is still where regular visitors live.</p>
<h2>Planning the move</h2>
<p>The first year is the most expensive here too. Enter pension and savings in the calculator to see whether and when a gap appears. From month 13 the fund’s supplement rises from 15 to 30 percent of the care part, which it has calculated itself since July 2026 (${h.src('sgb11_43c', 'section 43c SGB XI')}). See ${h.a('leistungszuschlag', 'the care home supplement')} for details. Relatives living abroad can follow the bills online if the home agrees to send them by email, which makes it easier to spot a missing supplement early.</p>
`,
  },
});
