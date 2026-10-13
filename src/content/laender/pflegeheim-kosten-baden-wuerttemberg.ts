import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, rangliste } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Baden-Württemberg: zweithöchster Pflegeanteil, Rang 4 im ersten Jahr; Vergleich mit Bayern. */
const k = kosten('BW'), v = kosten('BW', 'vorher'), b = kosten('BUND'), by = kosten('BY');
const j = [1, 13, 25, 37].map((m) => heimMonat(k, m));
const platz = rangliste().indexOf('BW') + 1;
const zwei = heimVerlauf(k, 1, 24).summe;

export default defineGuide({
  id: 'pflegeheim-kosten-baden-wuerttemberg',
  group: 'land',
  order: 10,
  tool: 'heim',
  toolPreset: { land: 'BW' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-bayern', 'leistungszuschlag', 'pflegeheim-kosten-hessen', 'pflegeheim-kosten-wer-zahlt'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_43'],
  de: {
    slug: 'pflegeheim-kosten-baden-wuerttemberg',
    nav: 'Baden-Württemberg',
    card: `${DE.eur(k.mit15)} im ersten Jahr, ${DE.eur(k.mit15 - by.mit15)} mehr als in Bayern: Der Südwesten zahlt vor allem für die Pflege.`,
    title: 'Pflegeheim Kosten Baden-Württemberg 2026: Eigenanteil',
    description: `Pflegeheim in Baden-Württemberg 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten (vdek, 1.7.2026), Pflegeanteil ${DE.eur(k.eee)}. Vergleich mit Bayern.`,
    h1: 'Pflegeheim in Baden-Württemberg: was der Südwesten kostet',
    intro: 'Im Südwesten treiben vor allem die Pflegekosten den Eigenanteil. Wie stark er in den ersten zwei Jahren drückt und wie viel der Zuschlag später zurückgibt.',
    resume: `In Baden-Württemberg zahlen Heimbewohner im ersten Aufenthaltsjahr am 1. Juli 2026 durchschnittlich ${DE.eur(k.mit15)} im Monat aus eigener Tasche, Rang ${platz} unter den Ländern (vdek). Den größten Teil macht der Pflegeanteil aus: ${DE.eur(k.eee)} vor dem Zuschlag der Pflegekasse, nach Berlin der zweithöchste Wert in Deutschland und ${DE.eur(k.eee - b.eee)} über dem Bund. Allein seit Januar ist er um ${DE.eur(k.eee - v.eee)} gestiegen. Unterkunft und Verpflegung kosten ${DE.eur(k.uv)}, die Investitionskosten ${DE.eur(k.invest)}, beides näher am Durchschnitt. Weil der Leistungszuschlag nach § 43c SGB XI nur den Pflegeanteil verringert, profitieren Bewohner in Baden-Württemberg überdurchschnittlich von einer längeren Verweildauer: Im zweiten Jahr sind es ${DE.eur(j[1].eigenanteil)}, im dritten ${DE.eur(j[2].eigenanteil)}, ab dem vierten ${DE.eur(j[3].eigenanteil)}. Die ersten beiden Jahre zusammen kosten im Schnitt ${DE.eur(zwei)}. Gegenüber Bayern liegt der Eigenanteil im ersten Jahr um ${DE.eur(k.mit15 - by.mit15)} höher.`,
    faqs: [
      { q: 'Warum ist ein Heimplatz in Baden-Württemberg teurer als in Bayern?', a: `Der Unterschied steckt fast ganz im Pflegeanteil und in der Unterkunft: ${DE.eur(k.eee)} gegenüber ${DE.eur(by.eee)} beim EEE, ${DE.eur(k.uv)} gegenüber ${DE.eur(by.uv)} bei Unterkunft und Verpflegung. Die Investitionskosten sind fast gleich. Höhere Personalkosten und Vorgaben zur Personalausstattung schlagen sich im Pflegeanteil nieder.` },
      { q: 'Wie viel zahlt die Pflegekasse in einem Heim in Baden-Württemberg?', a: `Je nach Pflegegrad ${DE.eur(P.vollstationaer['2'])} bis ${DE.eur(P.vollstationaer['5'])} im Monat direkt an das Heim (§ 43 SGB XI), zusätzlich den Leistungszuschlag von zunächst ${DE.eur(j[0].zuschlag)}, ab dem vierten Jahr ${DE.eur(j[3].zuschlag)} im Monat bei einem durchschnittlichen Pflegeanteil. Beides ist in den Eigenanteilen dieser Seite schon abgezogen.` },
      { q: 'Lohnt sich bei einem Umzug ins Heim der Blick nach Bayern?', a: `Für Familien an der Landesgrenze kann es sich lohnen: Im ersten Jahr liegen im Schnitt ${DE.eur(k.mit15 - by.mit15)} im Monat dazwischen, ab dem vierten Jahr ${DE.eur(j[3].eigenanteil - heimMonat(by, 37).eigenanteil)}. In Bayern kommt das Landespflegegeld von ${DE.eur(P.landespflegegeld_by.euro_jahr)} im Jahr hinzu, das an den Hauptwohnsitz in Bayern gebunden ist.` },
    ],
    body: (h) => `
<h2>Baden-Württemberg und Bayern nebeneinander</h2>
${h.table(['', 'Baden-Württemberg', 'Bayern', 'Bund'], [
  ['Pflegeanteil (EEE)', h.eur(k.eee), h.eur(by.eee), h.eur(b.eee)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(by.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(by.invest), h.eur(b.invest)],
  ['1. Jahr', h.eur(k.mit15), h.eur(by.mit15), h.eur(b.mit15)],
  ['2. Jahr', h.eur(j[1].eigenanteil), h.eur(heimMonat(by, 13).eigenanteil), h.eur(heimMonat(b, 13).eigenanteil)],
  ['ab 4. Jahr', h.eur(j[3].eigenanteil), h.eur(heimMonat(by, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, Durchschnitt der Heime am 1. Juli 2026.', ['l', 'r', 'r', 'r'])}
<p>Die Tabelle zeigt, wie sich der Abstand mit der Zeit verkleinert. Im ersten Jahr liegt Baden-Württemberg deutlich über Bayern und dem Bund, ab dem vierten Jahr nur noch knapp darüber. Der Grund ist der hohe Pflegeanteil, von dem die Kasse dann drei Viertel übernimmt. Für Familien heißt das: Die finanziell schwierigste Phase sind die ersten 24 Monate, in denen im Schnitt ${h.eur(zwei)} zusammenkommen.</p>
<h2>Den Pflegeanteil im Heimvertrag prüfen</h2>
<p>Weil der Pflegeanteil im Südwesten der größte Posten ist, unterscheiden sich die Häuser vor allem dort. Fragen Sie nach dem aktuellen EEE und tragen Sie ihn in den Rechner ein. Erhöhungen muss das Heim vorher ankündigen und begründen, meist nach einer neuen Pflegesatzvereinbarung mit den Kassen. Die seit Januar beobachtete Steigerung um ${h.eur(k.eee - v.eee)} zeigt, dass solche Anpassungen derzeit häufig sind. Wie der Zuschlag gerechnet wird, steht unter ${h.a('leistungszuschlag', 'Leistungszuschlag')}; wer zahlt, wenn das Geld nicht reicht, unter ${h.a('pflegeheim-kosten-wer-zahlt', 'Pflegeheim: wer zahlt')}.</p>
`,
  },
  en: {
    slug: 'care-home-costs-baden-wuerttemberg',
    nav: 'Baden-Württemberg',
    card: `${EN.eur(k.mit15)} in year one, ${EN.eur(k.mit15 - by.mit15)} more than in Bavaria: the south-west pays mostly for care.`,
    title: 'Care Home Costs Baden-Württemberg 2026: Co-payment by Year',
    description: `Care home in Baden-Württemberg 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j[3].eigenanteil)} from year four (vdek, 1 July 2026), care part ${EN.eur(k.eee)}. Compared with Bavaria.`,
    h1: 'Care homes in Baden-Württemberg: what the south-west costs',
    intro: 'In the south-west it is mainly the cost of care that drives the co-payment. How heavy the first two years are and how much the supplement gives back later.',
    resume: `In Baden-Württemberg care home residents paid an average of ${EN.eur(k.mit15)} a month themselves in their first year on 1 July 2026, rank ${platz} among the German states (vdek). Most of that is the care part: ${EN.eur(k.eee)} before the long-term care fund’s supplement, the second-highest figure in Germany after Berlin and ${EN.eur(k.eee - b.eee)} above the national level. Since January alone it has risen by ${EN.eur(k.eee - v.eee)}. Board and lodging cost ${EN.eur(k.uv)} and investment costs ${EN.eur(k.invest)}, both closer to average. Because the supplement under section 43c of Book XI of the Social Code only reduces the care part, residents in Baden-Württemberg gain more than average from a longer stay: ${EN.eur(j[1].eigenanteil)} in year two, ${EN.eur(j[2].eigenanteil)} in year three and ${EN.eur(j[3].eigenanteil)} from year four. The first two years together cost about ${EN.eur(zwei)}. Compared with Bavaria the first-year co-payment is ${EN.eur(k.mit15 - by.mit15)} higher.`,
    faqs: [
      { q: 'Why is a home in Baden-Württemberg dearer than in Bavaria?', a: `The gap lies almost entirely in the care part and accommodation: ${EN.eur(k.eee)} against ${EN.eur(by.eee)} for the EEE and ${EN.eur(k.uv)} against ${EN.eur(by.uv)} for board and lodging. Investment costs are nearly identical. Higher staff costs and staffing rules show up in the care part.` },
      { q: 'How much does the care fund pay towards a home in Baden-Württemberg?', a: `Depending on the grade, ${EN.eur(P.vollstationaer['2'])} to ${EN.eur(P.vollstationaer['5'])} a month straight to the home (section 43 SGB XI), plus the supplement of ${EN.eur(j[0].zuschlag)} at first and ${EN.eur(j[3].zuschlag)} from year four on an average care part. Both are already deducted in the co-payments shown here.` },
      { q: 'Should we look at homes in Bavaria when moving a parent into care?', a: `For families near the border it can pay off: on averages ${EN.eur(k.mit15 - by.mit15)} a month separate the two in year one and ${EN.eur(j[3].eigenanteil - heimMonat(by, 37).eigenanteil)} from year four. In Bavaria the state care allowance of ${EN.eur(P.landespflegegeld_by.euro_jahr)} a year comes on top, tied to a main residence in Bavaria.` },
    ],
    body: (h) => `
<h2>Baden-Württemberg and Bavaria side by side</h2>
${h.table(['', 'Baden-Württemberg', 'Bavaria', 'Germany'], [
  ['Care co-payment (EEE)', h.eur(k.eee), h.eur(by.eee), h.eur(b.eee)],
  ['Board and lodging', h.eur(k.uv), h.eur(by.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(by.invest), h.eur(b.invest)],
  ['Year 1', h.eur(k.mit15), h.eur(by.mit15), h.eur(b.mit15)],
  ['Year 2', h.eur(j[1].eigenanteil), h.eur(heimMonat(by, 13).eigenanteil), h.eur(heimMonat(b, 13).eigenanteil)],
  ['From year 4', h.eur(j[3].eigenanteil), h.eur(heimMonat(by, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, average across homes on 1 July 2026.', ['l', 'r', 'r', 'r'])}
<p>The gap narrows over time. In year one Baden-Württemberg is well above Bavaria and the national level; from year four only slightly above. The reason is the high care part, three quarters of which the fund then covers. For families, the financially hardest phase is the first 24 months, which add up to about ${h.eur(zwei)}.</p>
<h2>Check the care part in the contract</h2>
<p>Because the care part is the largest item in the south-west, that is where homes differ. Ask for the current EEE and enter it in the calculator. A home must announce and justify any increase in advance, usually after a new rate agreement with the funds; the rise of ${h.eur(k.eee - v.eee)} since January shows such adjustments are frequent at the moment. See ${h.a('leistungszuschlag', 'the supplement')} for how it is calculated and ${h.a('pflegeheim-kosten-wer-zahlt', 'who pays for a care home')} if money runs short.</p>
`,
  },
});
