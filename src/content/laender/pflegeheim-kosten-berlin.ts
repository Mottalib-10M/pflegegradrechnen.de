import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Berlin: höchster Pflegeanteil aller Länder, aber günstigste Unterkunft; großer Abschlag mit der Zeit. */
const k = kosten('BE'), v = kosten('BE', 'vorher'), b = kosten('BUND'), bb = kosten('BB');
const j = [1, 13, 25, 37].map((m) => heimMonat(k, m));
const sinkt = j[0].eigenanteil - j[3].eigenanteil;
const vier = heimVerlauf(k, 1, 48).summe;

export default defineGuide({
  id: 'pflegeheim-kosten-berlin',
  group: 'land',
  order: 30,
  tool: 'heim',
  toolPreset: { land: 'BE' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-brandenburg', 'leistungszuschlag', 'eigenanteil-pflegeheim', 'hilfe-zur-pflege'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_84'],
  de: {
    slug: 'pflegeheim-kosten-berlin',
    nav: 'Berlin',
    card: `Höchster Pflegeanteil Deutschlands, aber günstige Unterkunft: ${DE.eur(k.mit15)} im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten.`,
    title: 'Pflegeheim Kosten Berlin 2026: Eigenanteil nach Heimjahren',
    description: `Pflegeheim in Berlin 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr (vdek, 1.7.2026), höchster Pflegeanteil aller Länder, ab dem vierten Jahr ${DE.eur(j[3].eigenanteil)} im Monat.`,
    h1: 'Pflegeheim in Berlin: teure Pflege, günstiges Wohnen',
    intro: 'In Berlin kostet die Pflege im Heim mehr als irgendwo sonst, Unterkunft und Essen dagegen weniger. Für Bewohner, die lange bleiben, ist das eine gute Nachricht.',
    resume: `Berliner Pflegeheime haben am 1. Juli 2026 den höchsten einrichtungseinheitlichen Eigenanteil für die Pflege aller Länder: ${DE.eur(k.eee)} im Monat vor dem Zuschlag der Pflegekasse, darin ${DE.eur(k.ausbildung)} Ausbildungsumlage, die zweithöchste nach dem Saarland. Unterkunft und Verpflegung sind mit ${DE.eur(k.uv)} dagegen so günstig wie in keinem anderen Land, die Investitionskosten liegen mit ${DE.eur(k.invest)} unter dem Bundesschnitt. Im ersten Jahr ergibt das ${DE.eur(k.mit15)} im Monat (vdek). Weil der Leistungszuschlag nur den Pflegeanteil senkt und dieser in Berlin besonders hoch ist, wirkt er hier besonders stark: Vom ersten zum vierten Jahr fällt der Eigenanteil um ${DE.eur(sinkt)} auf ${DE.eur(j[3].eigenanteil)}, einen der niedrigsten Werte für Langzeitbewohner im Westen wie im Osten. Über vier Jahre zahlt eine Bewohnerin im Schnitt ${DE.eur(vier)}. Seit Januar ist der Pflegeanteil um ${DE.eur(k.eee - v.eee)} gestiegen.`,
    faqs: [
      { q: 'Warum ist der Pflegeanteil in Berliner Heimen so hoch?', a: `Der EEE spiegelt vor allem die Personalkosten wider. In Berlin kommen eine hohe Ausbildungsumlage von ${DE.eur(k.ausbildung)} im Monat und gestiegene Löhne zusammen. Die Höhe hängt auch davon ab, wie viel Personal ein Heim nach den Vereinbarungen mit den Pflegekassen einsetzt; deshalb unterscheidet sich der EEE schon zwischen zwei Häusern derselben Bezirke deutlich.` },
      { q: 'Ist ein Heim in Brandenburg günstiger als in Berlin?', a: `Im ersten Jahr ja: Brandenburg liegt bei ${DE.eur(bb.mit15)}, ${DE.eur(k.mit15 - bb.mit15)} unter Berlin, vor allem wegen niedrigerer Investitionskosten. Ab dem vierten Jahr dreht sich das Bild fast: Berlin kommt dann auf ${DE.eur(j[3].eigenanteil)}, Brandenburg auf ${DE.eur(heimMonat(bb, 37).eigenanteil)}. Für lange Aufenthalte ist der Unterschied also klein.` },
      { q: 'Wie viel spart ein Berliner Heimbewohner nach drei Jahren?', a: `Ab dem 37. Monat übernimmt die Pflegekasse 75 Prozent des Pflegeanteils (§ 43c SGB XI). In Berlin sinkt der Eigenanteil dadurch um ${DE.eur(sinkt)} im Monat gegenüber dem ersten Jahr. Die Kasse rechnet den Zuschlag seit Juli 2026 selbst aus und zahlt ihn direkt an das Heim.` },
    ],
    body: (h) => `
<h2>Was in Berlin anders ist</h2>
${h.table(['Jahr im Heim', 'Zuschlag', 'Pflegeanteil nach Zuschlag', 'Eigenanteil Berlin', 'Eigenanteil Bund'],
  j.map((x, i) => [`${i + 1}.`, h.pct(x.satz, 0), h.eur(x.eeeNachZuschlag), h.eur(x.eigenanteil), h.eur(heimMonat(b, [1, 13, 25, 37][i]).eigenanteil)]),
  'vdek, 1. Juli 2026; Unterkunft, Verpflegung und Investitionskosten bleiben gleich.', ['l', 'r', 'r', 'r', 'r'])}
<p>Im ersten Jahr liegt Berlin über dem Bund, ab dem dritten darunter. Das liegt an der Zusammensetzung: Der hohe Pflegeanteil schrumpft mit dem Zuschlag, die niedrigen festen Posten von zusammen ${h.eur(k.uv + k.invest)} bleiben. Für die Planung heißt das, dass die ersten zwei Jahre die teuersten sind. Wer mit dem Ersparten rechnet, sollte genau diese Zeit absichern; der Rechner zeigt die Reichweite.</p>
<p>Bei der Wahl des Heims lohnt der Blick in die Preisliste: Weil der Pflegeanteil in Berlin den größten Teil ausmacht, unterscheiden sich die Häuser vor allem dort. Ein EEE, der ${h.eur(300)} unter dem Durchschnitt liegt, spart im ersten Jahr ${h.eur(300 * 0.85)} im Monat, ab dem vierten aber nur noch ${h.eur(300 * 0.25)}. Mehr dazu unter ${h.a('eigenanteil-pflegeheim', 'Eigenanteil im Pflegeheim')}.</p>
<p>Fragen Sie jedes Haus nach der aktuellen Preisliste und nach dem Datum der letzten Pflegesatzvereinbarung. Ein Heim, das gerade neu verhandelt hat, erhöht seltener in den nächsten Monaten als eines, dessen Vereinbarung bald ausläuft.</p>
`,
  },
  en: {
    slug: 'care-home-costs-berlin',
    nav: 'Berlin',
    card: `Germany’s highest care part but cheap accommodation: ${EN.eur(k.mit15)} in year one, ${EN.eur(j[3].eigenanteil)} from year four.`,
    title: 'Care Home Costs Berlin 2026: Co-payment by Year of Stay',
    description: `Care home in Berlin 2026: ${EN.eur(k.mit15)} co-payment in year one (vdek, 1 July 2026), the highest care part of any state, and only ${EN.eur(j[3].eigenanteil)} a month from year four.`,
    h1: 'Care homes in Berlin: expensive care, cheap accommodation',
    intro: 'In Berlin the care part of a home’s price is higher than anywhere else, while board and lodging cost less. For residents who stay long, that is good news.',
    resume: `On 1 July 2026 Berlin care homes had the highest uniform care co-payment (EEE) of any German state: ${EN.eur(k.eee)} a month before the care fund’s supplement, including a nursing training levy of ${EN.eur(k.ausbildung)}, second only to Saarland. Board and lodging, at ${EN.eur(k.uv)}, are cheaper than in any other state, and investment costs of ${EN.eur(k.invest)} are below the national average. In the first year that comes to ${EN.eur(k.mit15)} a month (vdek). Because the supplement only reduces the care part, and that part is especially high in Berlin, the supplement has a strong effect here: between year one and year four the co-payment falls by ${EN.eur(sinkt)} to ${EN.eur(j[3].eigenanteil)}, one of the lowest figures for long-term residents anywhere in Germany. Over four years a resident pays about ${EN.eur(vier)}. Since January the care part has risen by ${EN.eur(k.eee - v.eee)}.`,
    faqs: [
      { q: 'Why is the care part so high in Berlin homes?', a: `The EEE mainly reflects staff costs. In Berlin a high training levy of ${EN.eur(k.ausbildung)} a month and rising wages come together. It also depends on how many staff a home employs under its agreement with the care funds, which is why the EEE varies noticeably between two homes in the same district.` },
      { q: 'Is a home in Brandenburg cheaper than one in Berlin?', a: `In the first year, yes: Brandenburg averages ${EN.eur(bb.mit15)}, ${EN.eur(k.mit15 - bb.mit15)} less, mostly because of lower investment costs. From year four the picture almost reverses, with Berlin at ${EN.eur(j[3].eigenanteil)} and Brandenburg at ${EN.eur(heimMonat(bb, 37).eigenanteil)}. For long stays the difference between the two states is small.` },
      { q: 'How much does a Berlin resident save after three years?', a: `From month 37 the care fund covers 75 percent of the care part (section 43c SGB XI). In Berlin the co-payment then drops by ${EN.eur(sinkt)} a month compared with the first year. Since July 2026 the fund calculates the supplement itself and pays it straight to the home.` },
    ],
    body: (h) => `
<h2>What is different in Berlin</h2>
${h.table(['Year in the home', 'Supplement', 'Care part after supplement', 'Co-payment Berlin', 'Co-payment Germany'],
  j.map((x, i) => [`${i + 1}`, h.pct(x.satz, 0), h.eur(x.eeeNachZuschlag), h.eur(x.eigenanteil), h.eur(heimMonat(b, [1, 13, 25, 37][i]).eigenanteil)]),
  'vdek, 1 July 2026; board, lodging and investment costs stay the same.', ['l', 'r', 'r', 'r', 'r'])}
<p>In year one Berlin is above the national figure, from year three below it. The reason is the mix: the high care part shrinks with the supplement, while the low fixed items of ${h.eur(k.uv + k.invest)} combined stay put. The first two years are therefore the most expensive, and that is the period savings need to cover; the calculator shows how long they last.</p>
<p>When comparing homes, look at the price list: because the care part dominates in Berlin, that is where homes differ most. An EEE ${h.eur(300)} below average saves ${h.eur(300 * 0.85)} a month in year one but only ${h.eur(300 * 0.25)} from year four. See ${h.a('eigenanteil-pflegeheim', 'the care home co-payment')}.</p>
<p>For families abroad choosing between homes in different Berlin districts, ask each home for its current price list and the date of its last rate agreement. A home that has just renegotiated is less likely to raise prices again soon than one whose agreement is about to expire.</p>
`,
  },
});
