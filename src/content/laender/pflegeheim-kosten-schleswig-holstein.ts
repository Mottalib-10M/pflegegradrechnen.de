import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, rangliste, LAENDER } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Schleswig-Holstein: niedrigste Ausbildungsumlage, niedriger Pflegeanteil, aber hohe Investitionskosten. */
const k = kosten('SH'), v = kosten('SH', 'vorher'), b = kosten('BUND'), hh = kosten('HH'), mv = kosten('MV');
const j = [1, 13, 25, 37].map((m) => heimMonat(k, m));
const platz = rangliste().indexOf('SH') + 1;
const ausbRang = [...LAENDER].sort((x, y) => kosten(x).ausbildung - kosten(y).ausbildung).indexOf('SH') + 1;
const festAnteil4 = (k.uv + k.invest) / j[3].eigenanteil;

export default defineGuide({
  id: 'pflegeheim-kosten-schleswig-holstein',
  group: 'land',
  order: 150,
  tool: 'heim',
  toolPreset: { land: 'SH' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-hamburg', 'pflegeheim-kosten-mecklenburg-vorpommern', 'investitionskosten', 'eigenanteil-pflegeheim'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_43'],
  de: {
    slug: 'pflegeheim-kosten-schleswig-holstein',
    nav: 'Schleswig-Holstein',
    card: `Niedrigste Ausbildungsumlage, niedriger Pflegeanteil, aber teure Gebäude: ${DE.eur(k.mit15)} im ersten Jahr.`,
    title: 'Pflegeheim Kosten Schleswig-Holstein 2026: Eigenanteil',
    description: `Pflegeheim in Schleswig-Holstein 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten (vdek, 1.7.2026); Investitionskosten ${DE.eur(k.invest)} im Monat.`,
    h1: 'Pflegeheim in Schleswig-Holstein: wenig Pflegeanteil, viel Gebäude',
    intro: 'Zwischen Nord- und Ostsee kostet die Pflege im Heim wenig, das Gebäude dafür viel. Warum das Land deshalb im ersten Jahr günstig, auf Dauer aber nur Mittelmaß ist.',
    resume: `Schleswig-Holstein hat am 1. Juli 2026 den zweitniedrigsten Pflegeanteil aller Länder: ${DE.eur(k.eee)} im Monat vor dem Zuschlag der Pflegekasse, darin nur ${DE.eur(k.ausbildung)} Ausbildungsumlage, die niedrigste in Deutschland (vdek). Unterkunft und Verpflegung kosten ${DE.eur(k.uv)}, etwa so viel wie im Bund, die Investitionskosten aber ${DE.eur(k.invest)}, deutlich mehr als im Bundesschnitt von ${DE.eur(b.invest)}. Im ersten Jahr ergibt das ${DE.eur(k.mit15)} im Monat, Platz ${platz} unter den 16 Ländern und damit eines der günstigeren. Weil der Leistungszuschlag nur den kleinen Pflegeanteil verringert, sinkt der Eigenanteil bis zum vierten Jahr nur auf ${DE.eur(j[3].eigenanteil)}; dann entfallen ${DE.pct(festAnteil4, 0)} auf Unterkunft, Verpflegung und Investitionen. Im benachbarten Hamburg beginnt der Eigenanteil bei ${DE.eur(hh.mit15)}, in Mecklenburg-Vorpommern bei ${DE.eur(mv.mit15)}. Seit Januar 2026 ist er in Schleswig-Holstein um ${DE.eur(k.mit15 - v.mit15)} gestiegen.`,
    faqs: [
      { q: 'Warum ist der Pflegeanteil in Schleswig-Holstein so niedrig?', a: `Ein Grund ist die Ausbildungsumlage, die mit ${DE.eur(k.ausbildung)} im Monat die niedrigste aller Länder ist (Rang ${ausbRang}). Hinzu kommen Personalkosten und Personalschlüssel, die die Heime mit den Pflegekassen vereinbaren. Der niedrige Pflegeanteil macht das erste Jahr günstig, verringert aber den Vorteil des Zuschlags in den Folgejahren.` },
      { q: 'Sind Heime im Hamburger Umland günstiger als in Hamburg?', a: `Im ersten Jahr im Schnitt um ${DE.eur(hh.mit15 - k.mit15)} im Monat, fast ausschließlich wegen des Pflegeanteils. Investitionskosten und Unterkunft sind in beiden Ländern ähnlich. Ab dem vierten Jahr schrumpft der Unterschied auf ${DE.eur(heimMonat(hh, 37).eigenanteil - j[3].eigenanteil)}, weil Hamburgs höherer Pflegeanteil dann stärker bezuschusst wird.` },
      { q: 'Was zahlt die Pflegekasse in einem Heim in Schleswig-Holstein bei Pflegegrad 3?', a: `Den festen Betrag nach § 43 SGB XI für Pflegegrad 3 an das Heim und dazu den Leistungszuschlag: beim Landesdurchschnitt ${DE.eur(j[0].zuschlag)} im ersten und ${DE.eur(j[3].zuschlag)} ab dem vierten Jahr. Der Eigenanteil ist im selben Heim für die Grade 2 bis 5 gleich hoch.` },
    ],
    body: (h) => `
<h2>Wie sich der Eigenanteil zusammensetzt</h2>
${h.table(['Jahr', 'Pflegeanteil nach Zuschlag', 'Unterkunft und Verpflegung', 'Investitionskosten', 'Eigenanteil'],
  j.map((x, i) => [`${i + 1}.`, h.eur(x.eeeNachZuschlag), h.eur(k.uv), h.eur(k.invest), h.eur(x.eigenanteil)]),
  'Schleswig-Holstein, vdek-Durchschnitt am 1. Juli 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>Die Tabelle zeigt, warum Schleswig-Holstein im Zeitverlauf an Vorsprung verliert: Der Pflegeanteil nach Zuschlag schrumpft von Jahr zu Jahr, die beiden rechten Spalten bleiben gleich. Ab dem vierten Jahr zahlt eine Bewohnerin hier mehr als in Mecklenburg-Vorpommern (${h.eur(heimMonat(mv, 37).eigenanteil)}), obwohl sie im ersten Jahr nur wenig mehr zahlt.</p>
<h2>Investitionskosten im Blick behalten</h2>
<p>Die Investitionskosten von ${h.eur(k.invest)} sind der Posten, bei dem sich Häuser in Schleswig-Holstein am stärksten unterscheiden: Neue Gebäude in Küstennähe liegen oft weit darüber, ältere Häuser im Binnenland darunter. Weil die Pflegekasse diesen Teil nie bezuschusst, lohnt bei der Heimwahl die Frage nach der genauen Höhe. Wie der Posten entsteht und welche Länder dabei helfen, steht unter ${h.a('investitionskosten', 'Investitionskosten')}; die Rechnung im Ganzen erklärt ${h.a('eigenanteil-pflegeheim', 'Eigenanteil im Pflegeheim')}.</p>
<p>Für Familien aus Hamburg, die einen Platz im Umland suchen, heißt das: Im ersten Jahr spart Schleswig-Holstein spürbar, über viele Jahre gerechnet weniger. Wer mit einem langen Aufenthalt rechnet, sollte deshalb nicht nur den Landesschnitt, sondern die Investitionskosten des einzelnen Hauses vergleichen.</p>
`,
  },
  en: {
    slug: 'care-home-costs-schleswig-holstein',
    nav: 'Schleswig-Holstein',
    card: `Lowest training levy and a low care part, but costly buildings: ${EN.eur(k.mit15)} in year one.`,
    title: 'Care Home Costs Schleswig-Holstein 2026: Co-payment',
    description: `Care home in Schleswig-Holstein 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j[3].eigenanteil)} from year four (vdek, 1 July 2026); investment costs ${EN.eur(k.invest)}, a low care part.`,
    h1: 'Care homes in Schleswig-Holstein: small care part, big building costs',
    intro: 'Between the North Sea and the Baltic, care in a home costs little and the building a lot. Why the state is cheap in year one but only average in the long run.',
    resume: `On 1 July 2026 Schleswig-Holstein had the second-lowest care part of all German states: ${EN.eur(k.eee)} a month before the care fund’s supplement, including a nursing training levy of only ${EN.eur(k.ausbildung)}, the lowest in Germany (vdek). Board and lodging cost ${EN.eur(k.uv)}, close to the national average, but investment costs are ${EN.eur(k.invest)}, well above the national ${EN.eur(b.invest)}. In the first year that makes ${EN.eur(k.mit15)} a month, rank ${platz} of 16 and one of the cheaper states. Because the supplement only reduces the small care part, the co-payment falls only to ${EN.eur(j[3].eigenanteil)} by year four, when ${EN.pct(festAnteil4, 0)} of it is accommodation, meals and investment. In neighbouring Hamburg the first-year co-payment starts at ${EN.eur(hh.mit15)}, in Mecklenburg-Western Pomerania at ${EN.eur(mv.mit15)}. Since January 2026 it has risen in Schleswig-Holstein by ${EN.eur(k.mit15 - v.mit15)}.`,
    faqs: [
      { q: 'Why is the care part so low in Schleswig-Holstein?', a: `One reason is the training levy, at ${EN.eur(k.ausbildung)} a month the lowest of any state (rank ${ausbRang}). Staff costs and staffing ratios agreed between homes and care funds play a part too. The low care part makes year one cheap but reduces the benefit of the supplement in later years.` },
      { q: 'Are homes around Hamburg cheaper than in the city?', a: `In year one by about ${EN.eur(hh.mit15 - k.mit15)} a month on average, almost entirely because of the care part. Investment costs and accommodation are similar in both states. From year four the difference shrinks to ${EN.eur(heimMonat(hh, 37).eigenanteil - j[3].eigenanteil)}, as Hamburg’s higher care part is then subsidised more.` },
      { q: 'What does the care fund pay towards a home in Schleswig-Holstein at grade 3?', a: `The fixed grade 3 amount under section 43 SGB XI to the home, plus the supplement: at the state average ${EN.eur(j[0].zuschlag)} in year one and ${EN.eur(j[3].zuschlag)} from year four. Within one home the co-payment is the same for grades 2 to 5, whatever the grade.` },
    ],
    body: (h) => `
<h2>How the co-payment is made up</h2>
${h.table(['Year', 'Care part after supplement', 'Board and lodging', 'Investment costs', 'Co-payment'],
  j.map((x, i) => [`${i + 1}`, h.eur(x.eeeNachZuschlag), h.eur(k.uv), h.eur(k.invest), h.eur(x.eigenanteil)]),
  'Schleswig-Holstein, vdek average on 1 July 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>The table shows why Schleswig-Holstein loses its lead over time: the care part after the supplement shrinks each year while the two right-hand columns stay the same. From year four a resident pays more here than in Mecklenburg-Western Pomerania (${h.eur(heimMonat(mv, 37).eigenanteil)}), although only slightly more in year one.</p>
<h2>Keep an eye on investment costs</h2>
<p>Investment costs of ${h.eur(k.invest)} are where homes in Schleswig-Holstein differ most: new buildings near the coast are often far above, older inland homes below. Because the care fund never subsidises this part, ask for the exact figure when choosing. ${h.a('investitionskosten', 'Investment costs')} explains how the item arises; ${h.a('eigenanteil-pflegeheim', 'the care home co-payment')} explains the whole bill.</p>
<p>For families from Hamburg looking just outside the city, this means a noticeable saving in year one but less over many years. If a long stay is likely, compare each home’s investment costs rather than relying on the state average, and ask whether the home plans renovation work that could push them up.</p>
`,
  },
});
