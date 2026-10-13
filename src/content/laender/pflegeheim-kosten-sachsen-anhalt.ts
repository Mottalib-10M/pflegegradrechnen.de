import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, rangliste } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Sachsen-Anhalt: günstigstes Land, aber der stärkste Anstieg im Osten seit Januar. */
const k = kosten('ST'), v = kosten('ST', 'vorher'), b = kosten('BUND'), sn = kosten('SN'), th = kosten('TH');
const j4 = heimMonat(k, 37);
const teuer = rangliste()[0];
const anstieg = k.mit15 - v.mit15;
const proz = anstieg / v.mit15;

export default defineGuide({
  id: 'pflegeheim-kosten-sachsen-anhalt',
  group: 'land',
  order: 140,
  tool: 'heim',
  toolPreset: { land: 'ST' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-sachsen', 'pflegeheim-kosten-thueringen', 'eigenanteil-pflegeheim', 'pflegeheim-kosten-wer-zahlt'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_84'],
  de: {
    slug: 'pflegeheim-kosten-sachsen-anhalt',
    nav: 'Sachsen-Anhalt',
    card: `Bundesweit am günstigsten: ${DE.eur(k.mit15)} im ersten Jahr, ${DE.eur(j4.eigenanteil)} ab dem vierten, aber kräftig steigend.`,
    title: 'Pflegeheim Kosten Sachsen-Anhalt 2026: günstigstes Land',
    description: `Pflegeheim in Sachsen-Anhalt 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, der niedrigste aller Länder (vdek, 1.7.2026), ${DE.eur(j4.eigenanteil)} ab dem vierten. Anstieg seit Januar`,
    h1: 'Pflegeheim in Sachsen-Anhalt: am günstigsten, aber nicht billig',
    intro: 'Sachsen-Anhalt hat den niedrigsten Eigenanteil Deutschlands. Warum er trotzdem für viele Renten zu hoch ist und wie schnell er wächst.',
    resume: `Sachsen-Anhalt ist am 1. Juli 2026 das Land mit dem niedrigsten Eigenanteil im Pflegeheim: ${DE.eur(k.mit15)} im Monat im ersten Aufenthaltsjahr, so die Auswertung des vdek, ${DE.eur(b.mit15 - k.mit15)} unter dem Bundesschnitt. Günstig sind vor allem die festen Posten: Unterkunft und Verpflegung kosten ${DE.eur(k.uv)}, die Investitionskosten ${DE.eur(k.invest)}, die Ausbildungsumlage im Pflegeanteil ist mit ${DE.eur(k.ausbildung)} eine der niedrigsten. Der Pflegeanteil selbst liegt mit ${DE.eur(k.eee)} dagegen nahe am Durchschnitt. Ab dem vierten Jahr sinkt der Eigenanteil auf ${DE.eur(j4.eigenanteil)}. Günstig heißt aber nicht stabil: Seit dem 1. Januar 2026 ist der Wert im ersten Jahr um ${DE.eur(anstieg)} gestiegen, das sind ${DE.pct(proz, 1)} in einem halben Jahr, einer der stärksten Anstiege unter den Ländern. Bei Renten, die im Osten oft niedriger sind, bleibt auch hier häufig eine monatliche Lücke.`,
    faqs: [
      { q: 'Warum ist das Pflegeheim in Sachsen-Anhalt günstiger als im Westen?', a: `Vor allem wegen Unterkunft, Verpflegung und Investitionskosten, die zusammen ${DE.eur(k.uv + k.invest)} betragen, gegenüber ${DE.eur(kosten(teuer).uv + kosten(teuer).invest)} in Bremen. Der Pflegeanteil ist dagegen kaum niedriger als im Bundesschnitt, weil die Löhne in der Pflege seit der Tariftreuepflicht deutlich gestiegen sind und weiter steigen.` },
      { q: 'Ist ein Heim in Sachsen-Anhalt für Angehörige aus dem Westen eine Option?', a: 'Manche Familien wählen bewusst ein Heim in einem günstigeren Land, etwa am früheren Wohnort der Eltern oder in der Nähe eines Kindes. Rechnerisch spart das mehrere hundert Euro im Monat. Prüfen Sie aber das einzelne Haus, die Erreichbarkeit für Besuche und welches Sozialamt zuständig wird, falls später Hilfe zur Pflege nötig ist.' },
      { q: 'Wie stark steigen die Heimkosten in Sachsen-Anhalt?', a: `Zwischen Januar und Juli 2026 stieg der Eigenanteil im ersten Jahr von ${DE.eur(v.mit15)} auf ${DE.eur(k.mit15)}, fast vollständig durch den Pflegeanteil (${DE.eur(k.eee - v.eee)} mehr). Heime dürfen ihre Pflegesätze nach Verhandlungen mit den Pflegekassen anpassen; der Heimvertrag muss eine Erhöhung vorher ankündigen und begründen.` },
    ],
    body: (h) => `
<h2>Das günstigste Land im Vergleich mit seinen Nachbarn</h2>
${h.table(['', 'Sachsen-Anhalt', 'Sachsen', 'Thüringen', 'Bund'], [
  ['Pflegeanteil (EEE)', h.eur(k.eee), h.eur(sn.eee), h.eur(th.eee), h.eur(b.eee)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(sn.uv), h.eur(th.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(sn.invest), h.eur(th.invest), h.eur(b.invest)],
  ['1. Jahr', h.eur(k.mit15), h.eur(sn.mit15), h.eur(th.mit15), h.eur(b.mit15)],
  ['ab 4. Jahr', h.eur(j4.eigenanteil), h.eur(heimMonat(sn, 37).eigenanteil), h.eur(heimMonat(th, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, 1. Juli 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>Gegenüber Sachsen und Thüringen ist Sachsen-Anhalt in jeder Zeile günstiger, am deutlichsten bei den Investitionskosten. Der Vorsprung schmilzt aber: Der Pflegeanteil ist im halben Jahr um ${h.eur(k.eee - v.eee)} gewachsen. Wer heute einzieht, sollte mit weiteren Erhöhungen rechnen und den EEE aus dem Heimvertrag in den Rechner eintragen.</p>
<h2>Gleicher Preis für jeden Grad</h2>
<p>Innerhalb eines Heims zahlt jede Bewohnerin der Grade 2 bis 5 denselben Pflegeanteil (${h.src('sgb11_84', '§ 84 Abs. 2 SGB XI')}). Eine Höherstufung senkt die Heimrechnung also nicht, sie erhöht nur, was die Pflegekasse überweist. Was die Familie entlastet, ist die Zeit: Ab dem 13. Monat übernimmt die Kasse 30 Prozent des Pflegeanteils, ab dem 37. Monat 75 Prozent. Wer was bezahlt, wenn die Rente nicht reicht, steht unter ${h.a('pflegeheim-kosten-wer-zahlt', 'Pflegeheim: wer zahlt')}.</p>
`,
  },
  en: {
    slug: 'care-home-costs-saxony-anhalt',
    nav: 'Saxony-Anhalt',
    card: `The cheapest state: ${EN.eur(k.mit15)} in year one and ${EN.eur(j4.eigenanteil)} from year four, but rising fast.`,
    title: 'Care Home Costs Saxony-Anhalt 2026: Cheapest German State',
    description: `Care home in Saxony-Anhalt 2026: ${EN.eur(k.mit15)} co-payment in year one, the lowest of all states (vdek, 1 July 2026), and ${EN.eur(j4.eigenanteil)} from year four. Rise since January.`,
    h1: 'Care homes in Saxony-Anhalt: the cheapest, but not cheap',
    intro: 'Saxony-Anhalt has Germany’s lowest care home co-payment. Why it is still too high for many pensions and how quickly it is growing.',
    resume: `On 1 July 2026 Saxony-Anhalt was the German state with the lowest care home co-payment: ${EN.eur(k.mit15)} a month in the first year of residence, according to the vdek, ${EN.eur(b.mit15 - k.mit15)} below the national average. The fixed items are what make it cheap: board and lodging cost ${EN.eur(k.uv)}, investment costs ${EN.eur(k.invest)}, and the nursing training levy within the care part is among the lowest at ${EN.eur(k.ausbildung)}. The care co-payment (EEE) itself, at ${EN.eur(k.eee)}, is close to the average. From the fourth year the co-payment falls to ${EN.eur(j4.eigenanteil)}. Cheap does not mean stable, though: since 1 January 2026 the first-year figure has risen by ${EN.eur(anstieg)}, ${EN.pct(proz, 1)} in six months and one of the steepest rises among the states. With pensions in eastern Germany often lower, many residents still face a monthly gap here.`,
    faqs: [
      { q: 'Why are care homes cheaper in Saxony-Anhalt than in the west?', a: `Mainly because of board, lodging and investment costs, together ${EN.eur(k.uv + k.invest)} against ${EN.eur(kosten(teuer).uv + kosten(teuer).invest)} in Bremen. The care part is barely lower than the national average, because pay in nursing has risen strongly since collective wage rules became mandatory and keeps rising.` },
      { q: 'Could a home in Saxony-Anhalt suit a family living in the west or abroad?', a: 'Some families deliberately choose a home in a cheaper state, for example where the parents used to live or near one of the children. On averages that saves several hundred euros a month. Check the individual home, travel for visits and which welfare office becomes responsible if social assistance for care is needed later.' },
      { q: 'How fast are care home costs rising in Saxony-Anhalt?', a: `Between January and July 2026 the first-year co-payment rose from ${EN.eur(v.mit15)} to ${EN.eur(k.mit15)}, almost entirely through the care part (${EN.eur(k.eee - v.eee)} more). Homes adjust their rates after negotiations with the care funds; the contract must announce and justify an increase in advance.` },
    ],
    body: (h) => `
<h2>The cheapest state against its neighbours</h2>
${h.table(['', 'Saxony-Anhalt', 'Saxony', 'Thuringia', 'Germany'], [
  ['Care co-payment (EEE)', h.eur(k.eee), h.eur(sn.eee), h.eur(th.eee), h.eur(b.eee)],
  ['Board and lodging', h.eur(k.uv), h.eur(sn.uv), h.eur(th.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(sn.invest), h.eur(th.invest), h.eur(b.invest)],
  ['Year 1', h.eur(k.mit15), h.eur(sn.mit15), h.eur(th.mit15), h.eur(b.mit15)],
  ['From year 4', h.eur(j4.eigenanteil), h.eur(heimMonat(sn, 37).eigenanteil), h.eur(heimMonat(th, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, 1 July 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>Saxony-Anhalt is cheaper than Saxony and Thuringia on every line, most clearly in investment costs. The lead is shrinking: the care part grew by ${h.eur(k.eee - v.eee)} in half a year. Anyone moving in now should expect further increases and enter the home’s EEE in the calculator.</p>
<h2>Same price at every grade</h2>
<p>Within a home every resident from grade 2 to 5 pays the same care part (${h.src('sgb11_84', 'section 84(2) SGB XI')}), so a higher grade does not lower the bill. Time does: from month 13 the fund covers 30 percent of the care part, from month 37 75 percent. Who pays when the pension falls short is explained in ${h.a('pflegeheim-kosten-wer-zahlt', 'who pays for a care home')}.</p>
`,
  },
});
