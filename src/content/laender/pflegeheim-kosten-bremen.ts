import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, rangliste } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Bremen: höchster Eigenanteil im ersten Jahr; Vergleich mit dem Nachbarn Niedersachsen. */
const k = kosten('HB'), v = kosten('HB', 'vorher'), ni = kosten('NI'), b = kosten('BUND');
const j1 = heimMonat(k, 1), j4 = heimMonat(k, 37);
const jahre = heimVerlauf(k, 1, 48).jahre;
const billig = rangliste().slice(-1)[0];
const abstandNI = k.mit15 - ni.mit15;

export default defineGuide({
  id: 'pflegeheim-kosten-bremen',
  group: 'land',
  order: 50,
  tool: 'heim',
  toolPreset: { land: 'HB' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-niedersachsen', 'pflegeheim-kosten-hamburg', 'investitionskosten', 'hilfe-zur-pflege'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb12_90'],
  de: {
    slug: 'pflegeheim-kosten-bremen',
    nav: 'Bremen',
    card: `Das teuerste Land im ersten Jahr: ${DE.eur(k.mit15)} im Monat, ${DE.eur(abstandNI)} mehr als im Umland in Niedersachsen.`,
    title: 'Pflegeheim Kosten Bremen 2026: höchster Eigenanteil im Land',
    description: `Pflegeheim in Bremen 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, bundesweit der höchste (vdek, 1.7.2026), ab dem vierten Jahr ${DE.eur(j4.eigenanteil)}. Vergleich zu Niedersachsen`,
    h1: 'Pflegeheim in Bremen: der höchste Eigenanteil Deutschlands',
    intro: 'Kein Land ist im ersten Heimjahr so teuer wie Bremen. Lohnt der Blick über die Landesgrenze, und was bleibt nach vier Jahren?',
    resume: `Mit durchschnittlich ${DE.eur(k.mit15)} im Monat hat Bremen am 1. Juli 2026 den höchsten Eigenanteil für das erste Jahr im Pflegeheim, ermittelt vom Verband der Ersatzkassen. Das sind ${DE.eur(k.mit15 - b.mit15)} mehr als im Bundesschnitt. Teuer ist dort fast alles zugleich: Der Pflegeanteil (EEE) liegt bei ${DE.eur(k.eee)}, Unterkunft und Verpflegung bei ${DE.eur(k.uv)}, die Investitionskosten bei ${DE.eur(k.invest)}, die zweithöchsten nach Nordrhein-Westfalen. Mit dem steigenden Zuschlag der Pflegekasse sinkt die Belastung auf ${DE.eur(heimMonat(k, 13).eigenanteil)} im zweiten, ${DE.eur(heimMonat(k, 25).eigenanteil)} im dritten und ${DE.eur(j4.eigenanteil)} ab dem vierten Jahr. In den ersten vier Jahren zusammen zahlt eine Bewohnerin rund ${DE.eur(jahre.reduce((s, x) => s + x, 0))}. Im benachbarten Niedersachsen liegt der Eigenanteil im ersten Jahr bei ${DE.eur(ni.mit15)}, also ${DE.eur(abstandNI)} niedriger. Seit Januar 2026 ist der Bremer Wert um ${DE.eur(k.mit15 - v.mit15)} gestiegen.`,
    faqs: [
      { q: 'Lohnt sich ein Heim in Niedersachsen statt in Bremen?', a: `Rein rechnerisch spart ein Platz im Umland im ersten Jahr rund ${DE.eur(abstandNI)} im Monat, weil Unterkunft, Verpflegung und Pflegeanteil dort deutlich günstiger sind. Wichtiger als der Landesdurchschnitt ist aber das einzelne Haus. Bedenken Sie Besuchswege, die Nähe zu Ärzten und Freunden und dass ein Umzug in ein anderes Land die Zuständigkeit des Sozialamts ändern kann.` },
      { q: 'Warum ist Bremen so teuer?', a: 'Als Stadtstaat hat Bremen hohe Kosten für Grundstücke und Gebäude, was sich in den Investitionskosten zeigt, und vergleichsweise hohe Personalkosten in der Pflege. Hinzu kommen Unterkunft und Verpflegung über dem Bundesschnitt. Der vdek nennt als Gründe für die Länderunterschiede allgemein Investitionskosten, Personalkosten und unterschiedliche Personalvorgaben.' },
      { q: 'Was passiert, wenn Rente und Ersparnisse in Bremen nicht reichen?', a: `Dann wird das Vermögen bis auf den Schonbetrag eingesetzt und danach hilft das Sozialamt mit der Hilfe zur Pflege (§§ 61 ff., § 90 SGB XII). Bei einem Eigenanteil von ${DE.eur(k.mit15)} und einer Rente von ${DE.eur(1600)} fehlen ${DE.eur(k.mit15 - 1600)} im Monat; der Rechner oben zeigt, wie lange das Ersparte reicht.` },
    ],
    body: (h) => `
<h2>Bremen gegen Umland und Bund</h2>
${h.table(['', 'Bremen', 'Niedersachsen', 'Bund'], [
  ['Pflegeanteil (EEE)', h.eur(k.eee), h.eur(ni.eee), h.eur(b.eee)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(ni.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(ni.invest), h.eur(b.invest)],
  ['1. Jahr', h.eur(k.mit15), h.eur(ni.mit15), h.eur(b.mit15)],
  ['ab 4. Jahr', h.eur(j4.eigenanteil), h.eur(heimMonat(ni, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, Durchschnittswerte am 1. Juli 2026.', ['l', 'r', 'r', 'r'])}
<p>Der Abstand zum günstigsten Land, ${billig === 'ST' ? 'Sachsen-Anhalt' : billig}, beträgt im ersten Jahr ${h.eur(k.mit15 - kosten(billig).mit15)} im Monat. Über vier Jahre gerechnet ist das der Preis eines Kleinwagens. Ein Teil davon verschwindet mit dem Zuschlag, denn der Bremer Pflegeanteil ist hoch und wird ab dem vierten Jahr zu drei Vierteln übernommen. Die Investitionskosten von ${h.eur(k.invest)} aber bleiben jeden Monat gleich.</p>
<h2>Jahr für Jahr</h2>
<p>Im ersten Jahr zahlen Bremer Heimbewohner zusammen ${h.eur(jahre[0])}, im zweiten ${h.eur(jahre[1])}, im dritten ${h.eur(jahre[2])} und im vierten ${h.eur(jahre[3])}. Wer schon länger im Heim lebt, trägt die bisherige Aufenthaltsdauer in den Rechner ein; die Pflegekasse zählt dabei auch angebrochene Monate voll. Mehr zur Rechenregel unter ${h.a('leistungszuschlag', 'Leistungszuschlag')}. Für Pflegegrad 1 gibt es keinen Zuschlag; dann gilt der Preis, den das Heim für diesen Grad festlegt.</p>
`,
  },
  en: {
    slug: 'care-home-costs-bremen',
    nav: 'Bremen',
    card: `The most expensive state in year one: ${EN.eur(k.mit15)} a month, ${EN.eur(abstandNI)} more than in neighbouring Lower Saxony.`,
    title: 'Care Home Costs Bremen 2026: Highest Co-payment in Germany',
    description: `Care home in Bremen 2026: ${EN.eur(k.mit15)} co-payment a month in year one, the highest in Germany (vdek, 1 July 2026), and ${EN.eur(j4.eigenanteil)} from year four. Lower Saxony compared.`,
    h1: 'Care homes in Bremen: Germany’s highest co-payment',
    intro: 'No state costs as much in the first year of a care home as Bremen. Is it worth looking across the border, and what is left after four years?',
    resume: `At an average of ${EN.eur(k.mit15)} a month, Bremen had the highest first-year care home co-payment of all German states on 1 July 2026, according to the vdek, the association of substitute health funds. That is ${EN.eur(k.mit15 - b.mit15)} above the national average. Almost every component is expensive: the care co-payment (EEE) is ${EN.eur(k.eee)}, board and lodging ${EN.eur(k.uv)} and investment costs ${EN.eur(k.invest)}, second only to North Rhine-Westphalia. As the care fund’s supplement rises, the burden falls to ${EN.eur(heimMonat(k, 13).eigenanteil)} in year two, ${EN.eur(heimMonat(k, 25).eigenanteil)} in year three and ${EN.eur(j4.eigenanteil)} from year four. Over the first four years a resident pays about ${EN.eur(jahre.reduce((s, x) => s + x, 0))} in total. In neighbouring Lower Saxony the first-year co-payment is ${EN.eur(ni.mit15)}, ${EN.eur(abstandNI)} lower. Since January 2026 the Bremen figure has risen by ${EN.eur(k.mit15 - v.mit15)}.`,
    faqs: [
      { q: 'Should we choose a care home in Lower Saxony instead of Bremen?', a: `On averages, a place just outside the city saves around ${EN.eur(abstandNI)} a month in year one, because board, lodging and the care part are much cheaper. The individual home matters more than the state average, though. Think about travel for visits, access to doctors and friends, and that moving to another state can change which welfare office is responsible.` },
      { q: 'Why is Bremen so expensive?', a: 'As a city state Bremen has high land and building costs, which show in its investment costs, and comparatively high staff costs in care, plus board and lodging above the national average. The vdek generally attributes the gaps between states to investment costs, staff costs and differing staffing rules.' },
      { q: 'What if pension and savings do not cover a home in Bremen?', a: `Savings are used down to the protected amount and then the welfare office pays social assistance for care (sections 61 and 90 SGB XII). With a co-payment of ${EN.eur(k.mit15)} and a pension of ${EN.eur(1600)}, ${EN.eur(k.mit15 - 1600)} is missing each month; the calculator above shows how long savings last.` },
    ],
    body: (h) => `
<h2>Bremen against its surroundings</h2>
${h.table(['', 'Bremen', 'Lower Saxony', 'Germany'], [
  ['Care co-payment (EEE)', h.eur(k.eee), h.eur(ni.eee), h.eur(b.eee)],
  ['Board and lodging', h.eur(k.uv), h.eur(ni.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(ni.invest), h.eur(b.invest)],
  ['Year 1', h.eur(k.mit15), h.eur(ni.mit15), h.eur(b.mit15)],
  ['From year 4', h.eur(j4.eigenanteil), h.eur(heimMonat(ni, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek averages, 1 July 2026.', ['l', 'r', 'r', 'r'])}
<p>The gap to the cheapest state, Saxony-Anhalt, is ${h.eur(k.mit15 - kosten(billig).mit15)} a month in year one; over four years that adds up to the price of a small car. Part of it disappears with the supplement, because Bremen’s high care part is three-quarters covered from year four, but investment costs of ${h.eur(k.invest)} stay the same every month.</p>
<h2>Year by year</h2>
<p>Residents in Bremen pay ${h.eur(jahre[0])} in the first year, ${h.eur(jahre[1])} in the second, ${h.eur(jahre[2])} in the third and ${h.eur(jahre[3])} in the fourth. If your relative has already lived in the home for a while, enter the months in the calculator; part months count in full. See ${h.a('leistungszuschlag', 'the care home supplement')}. There is no supplement at care grade 1; the home then charges its own price for that grade.</p>
`,
  },
});
