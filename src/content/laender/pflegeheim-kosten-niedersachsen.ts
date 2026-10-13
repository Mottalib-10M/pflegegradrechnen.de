import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, rangliste } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Niedersachsen: günstigste Unterkunft und Verpflegung, zweitniedrigster Eigenanteil; Investitionskosten aber über dem Bund. */
const k = kosten('NI'), v = kosten('NI', 'vorher'), b = kosten('BUND'), hb = kosten('HB');
const j4 = heimMonat(k, 37);
const platz = rangliste().indexOf('NI') + 1;
const fuenf = heimVerlauf(k, 1, 60).summe;
const investAnteil = k.invest / k.mit15;

export default defineGuide({
  id: 'pflegeheim-kosten-niedersachsen',
  group: 'land',
  order: 90,
  tool: 'heim',
  toolPreset: { land: 'NI' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-bremen', 'pflegeheim-kosten-hamburg', 'investitionskosten', 'pflegeheim-kosten-wer-zahlt'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb12_90'],
  de: {
    slug: 'pflegeheim-kosten-niedersachsen',
    nav: 'Niedersachsen',
    card: `Günstigste Unterkunft und Verpflegung Deutschlands: ${DE.eur(k.mit15)} im ersten Jahr, Platz ${platz} der Länder.`,
    title: 'Pflegeheim Kosten Niedersachsen 2026: Eigenanteil je Jahr',
    description: `Pflegeheim in Niedersachsen 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j4.eigenanteil)} ab dem vierten (vdek, 1.7.2026); Unterkunft ${DE.eur(k.uv)}, die niedrigste bundesweit.`,
    h1: 'Pflegeheim in Niedersachsen: zweitgünstigstes Land im ersten Jahr',
    intro: 'Niedersachsen liegt beim Heim-Eigenanteil fast ganz unten. Wo das Land spart, wo nicht, und was fünf Jahre im Heim zusammen kosten.',
    resume: `Wer in Niedersachsen ins Pflegeheim zieht, zahlt am 1. Juli 2026 im ersten Jahr durchschnittlich ${DE.eur(k.mit15)} im Monat selbst; nur in Sachsen-Anhalt ist es weniger (vdek, Platz ${platz} von 16). Der wichtigste Grund sind Unterkunft und Verpflegung: Mit ${DE.eur(k.uv)} sind sie die günstigsten aller Länder, ${DE.eur(b.uv - k.uv)} unter dem Bund. Auch der Pflegeanteil liegt mit ${DE.eur(k.eee)} vor dem Zuschlag deutlich unter dem Durchschnitt. Eine Ausnahme bilden die Investitionskosten: ${DE.eur(k.invest)} im Monat, mehr als im Bundesschnitt von ${DE.eur(b.invest)}; sie machen ${DE.pct(investAnteil, 0)} des Eigenanteils im ersten Jahr aus. Mit dem steigenden Leistungszuschlag sinkt der Eigenanteil ab dem vierten Jahr auf ${DE.eur(j4.eigenanteil)}. Fünf Jahre im Heim kosten im Schnitt zusammen ${DE.eur(fuenf)}. Gegenüber dem Stadtstaat Bremen, den Niedersachsen umschließt, spart ein Platz im ersten Jahr ${DE.eur(hb.mit15 - k.mit15)} im Monat. Seit Januar ist der Eigenanteil um ${DE.eur(k.mit15 - v.mit15)} gestiegen.`,
    faqs: [
      { q: 'Warum sind Pflegeheime in Niedersachsen vergleichsweise günstig?', a: `Vor allem wegen Unterkunft und Verpflegung, die mit ${DE.eur(k.uv)} so niedrig sind wie in keinem anderen Land, und eines Pflegeanteils unter dem Bundesschnitt. Die Investitionskosten liegen dagegen höher als im Bund. Innerhalb des Landes unterscheiden sich Städte wie Hannover oder Braunschweig und ländliche Kreise deutlich.` },
      { q: 'Was kosten fünf Jahre im Pflegeheim in Niedersachsen?', a: `Rund ${DE.eur(fuenf)} an Eigenanteilen, wenn die Durchschnittswerte vom Juli 2026 gleich blieben. Das erste Jahr ist mit ${DE.eur(k.mit15 * 12)} das teuerste; ab dem vierten Jahr sinkt die Belastung auf ${DE.eur(j4.eigenanteil * 12)} im Jahr. Künftige Erhöhungen sind nicht eingerechnet und kommen erfahrungsgemäß hinzu.` },
      { q: 'Wann muss das Haus der Eltern für das Pflegeheim verkauft werden?', a: 'Ein selbst bewohntes, angemessenes Haus ist geschützt, solange der Ehepartner oder andere Angehörige darin wohnen (§ 90 Abs. 2 SGB XII). Steht es nach dem Umzug ins Heim leer, zählt es grundsätzlich als einzusetzendes Vermögen, bevor das Sozialamt Hilfe zur Pflege zahlt. Das Sozialamt kann statt eines Verkaufs auch ein Darlehen gewähren.' },
    ],
    body: (h) => `
<h2>Niedersachsen, Bremen und der Bund</h2>
${h.table(['', 'Niedersachsen', 'Bremen', 'Bund'], [
  ['Pflegeanteil (EEE)', h.eur(k.eee), h.eur(hb.eee), h.eur(b.eee)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(hb.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(hb.invest), h.eur(b.invest)],
  ['1. Jahr', h.eur(k.mit15), h.eur(hb.mit15), h.eur(b.mit15)],
  ['ab 4. Jahr', h.eur(j4.eigenanteil), h.eur(heimMonat(hb, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, 1. Juli 2026.', ['l', 'r', 'r', 'r'])}
<p>Im Vergleich mit Bremen spart Niedersachsen bei allen drei Bestandteilen, am meisten bei Unterkunft und Verpflegung. Bei den Investitionskosten bleibt der Abstand kleiner, weil sie in Niedersachsen über dem Bund liegen. Für Bremer Familien, die einen Platz im Umland suchen, ergibt sich daraus ein messbarer Vorteil, der sich mit der Aufenthaltsdauer nur wenig verringert.</p>
<h2>Investitionskosten nicht unterschätzen</h2>
<p>Die Investitionskosten von ${h.eur(k.invest)} werden in Niedersachsen nie bezuschusst und bleiben über die ganze Aufenthaltsdauer gleich. Ab dem vierten Jahr machen sie fast ein Drittel des Eigenanteils aus. Beim Vergleich zweier Heime lohnt deshalb die Frage, wie hoch dieser Posten im einzelnen Haus ist; neue Gebäude liegen oft deutlich darüber. Mehr dazu unter ${h.a('investitionskosten', 'Investitionskosten')}; wer am Ende zahlt, wenn das Geld nicht reicht, steht unter ${h.a('pflegeheim-kosten-wer-zahlt', 'Pflegeheim: wer zahlt')}.</p>
`,
  },
  en: {
    slug: 'care-home-costs-lower-saxony',
    nav: 'Lower Saxony',
    card: `Germany’s cheapest board and lodging: ${EN.eur(k.mit15)} in year one, rank ${platz} of the states.`,
    title: 'Care Home Costs Lower Saxony 2026: Co-payment by Year',
    description: `Care home in Lower Saxony 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j4.eigenanteil)} from year four (vdek, 1 July 2026); board and lodging ${EN.eur(k.uv)}, the lowest in Germany.`,
    h1: 'Care homes in Lower Saxony: second cheapest in year one',
    intro: 'Lower Saxony is near the bottom of the care home cost table. Where the state saves, where it does not, and what five years in a home cost in total.',
    resume: `Moving into a care home in Lower Saxony meant an average first-year co-payment of ${EN.eur(k.mit15)} a month on 1 July 2026; only Saxony-Anhalt was cheaper (vdek, rank ${platz} of 16). The main reason is board and lodging: at ${EN.eur(k.uv)} they are the cheapest of all states, ${EN.eur(b.uv - k.uv)} below the national figure. The care part (EEE) is also well below average at ${EN.eur(k.eee)} before the supplement. Investment costs are the exception: ${EN.eur(k.invest)} a month, above the national ${EN.eur(b.invest)}, and ${EN.pct(investAnteil, 0)} of the first-year co-payment. With the rising supplement the co-payment falls to ${EN.eur(j4.eigenanteil)} from year four. Five years in a home add up to about ${EN.eur(fuenf)}. Compared with the city state of Bremen, which Lower Saxony surrounds, a place saves ${EN.eur(hb.mit15 - k.mit15)} a month in year one. Since January the co-payment has risen by ${EN.eur(k.mit15 - v.mit15)}.`,
    faqs: [
      { q: 'Why are care homes relatively cheap in Lower Saxony?', a: `Mainly because board and lodging, at ${EN.eur(k.uv)}, are lower than in any other state, and the care part is below the national average. Investment costs, by contrast, are higher than nationally. Within the state, cities such as Hanover or Brunswick differ noticeably from rural districts.` },
      { q: 'What do five years in a Lower Saxony care home cost?', a: `About ${EN.eur(fuenf)} in co-payments if July 2026 averages stayed the same. The first year is the dearest at ${EN.eur(k.mit15 * 12)}; from year four the burden falls to ${EN.eur(j4.eigenanteil * 12)} a year. Future rises are not included and in practice come on top.` },
      { q: 'Will my parents’ house have to be sold to pay for the home?', a: 'A reasonable owner-occupied home is protected as long as a spouse or other relatives live in it (section 90(2) SGB XII). If it stands empty after the move, it generally counts as an asset to be used before the welfare office pays social assistance for care. Instead of a sale the office can also grant a loan.' },
    ],
    body: (h) => `
<h2>Lower Saxony, Bremen and Germany</h2>
${h.table(['', 'Lower Saxony', 'Bremen', 'Germany'], [
  ['Care co-payment (EEE)', h.eur(k.eee), h.eur(hb.eee), h.eur(b.eee)],
  ['Board and lodging', h.eur(k.uv), h.eur(hb.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(hb.invest), h.eur(b.invest)],
  ['Year 1', h.eur(k.mit15), h.eur(hb.mit15), h.eur(b.mit15)],
  ['From year 4', h.eur(j4.eigenanteil), h.eur(heimMonat(hb, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, 1 July 2026.', ['l', 'r', 'r', 'r'])}
<p>Compared with Bremen, Lower Saxony is cheaper on all three components, most of all on board and lodging. The gap is smaller on investment costs, which in Lower Saxony are above average. For Bremen families looking for a place just outside the city this is a measurable advantage that shrinks only a little with the length of stay.</p>
<h2>Do not underestimate investment costs</h2>
<p>Investment costs of ${h.eur(k.invest)} are never subsidised and stay the same throughout. From year four they make up almost a third of the co-payment. When comparing two homes, ask how high this item is in each; new buildings are often well above average. See ${h.a('investitionskosten', 'investment costs')} and ${h.a('pflegeheim-kosten-wer-zahlt', 'who pays for a care home')}.</p>
`,
  },
});
