import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, rangliste } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Thüringen: Mittelfeld im Osten, Pflegeanteil stark gestiegen; Dreiländervergleich mit Sachsen und Hessen. */
const k = kosten('TH'), v = kosten('TH', 'vorher'), b = kosten('BUND'), sn = kosten('SN'), he = kosten('HE');
const j = [1, 13, 25, 37].map((m) => heimMonat(k, m));
const platz = rangliste().indexOf('TH') + 1;
const vier = heimVerlauf(k, 1, 48).summe;
const proz = (k.eee - v.eee) / v.eee;

export default defineGuide({
  id: 'pflegeheim-kosten-thueringen',
  group: 'land',
  order: 160,
  tool: 'heim',
  toolPreset: { land: 'TH' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-sachsen', 'pflegeheim-kosten-sachsen-anhalt', 'pflegeheim-kosten-hessen', 'leistungszuschlag'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_84'],
  de: {
    slug: 'pflegeheim-kosten-thueringen',
    nav: 'Thüringen',
    card: `${DE.eur(k.mit15)} im ersten Jahr, Pflegeanteil seit Januar ${DE.pct(proz, 1)} höher: Thüringen im Vergleich mit Sachsen und Hessen.`,
    title: 'Pflegeheim Kosten Thüringen 2026: Eigenanteil im Vergleich',
    description: `Pflegeheim in Thüringen 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten (vdek, 1.7.2026); Pflegeanteil seit Januar um ${DE.pct(proz, 1)} gestiegen.`,
    h1: 'Pflegeheim in Thüringen: Mitte im Osten, Tempo beim Anstieg',
    intro: 'Thüringen liegt beim Eigenanteil im Mittelfeld, aber der Pflegeanteil wächst schnell. Wie das Land gegen Sachsen und das westliche Nachbarland Hessen abschneidet.',
    resume: `Ein Pflegeheimplatz in Thüringen kostet am 1. Juli 2026 im ersten Jahr durchschnittlich ${DE.eur(k.mit15)} im Monat aus eigener Tasche, Platz ${platz} der 16 Länder (vdek). Der Pflegeanteil liegt mit ${DE.eur(k.eee)} vor Zuschlag knapp unter dem Bund, ist aber seit Januar um ${DE.eur(k.eee - v.eee)} gestiegen, ein Plus von ${DE.pct(proz, 1)} in sechs Monaten. Unterkunft und Verpflegung kosten ${DE.eur(k.uv)}, die Investitionskosten ${DE.eur(k.invest)}; beide liegen unter dem Bundesschnitt. Mit dem Leistungszuschlag der Pflegekasse sinkt der Eigenanteil im zweiten Jahr auf ${DE.eur(j[1].eigenanteil)}, im dritten auf ${DE.eur(j[2].eigenanteil)} und ab dem vierten auf ${DE.eur(j[3].eigenanteil)}. Vier Jahre im Heim summieren sich im Schnitt auf ${DE.eur(vier)}. Gegenüber Sachsen ist Thüringen im ersten Jahr fast gleichauf (${DE.eur(sn.mit15)}), gegenüber Hessen spart ein Platz ${DE.eur(he.mit15 - k.mit15)} im Monat. Für Familien entlang der Landesgrenzen sind das spürbare Unterschiede.`,
    faqs: [
      { q: 'Ist Thüringen teurer als Sachsen?', a: `Kaum: Im ersten Jahr liegen beide Länder im Schnitt nur ${DE.eur(Math.abs(k.mit15 - sn.mit15))} auseinander. Thüringen hat den niedrigeren Pflegeanteil (${DE.eur(k.eee)} zu ${DE.eur(sn.eee)}), aber höhere Kosten für Unterkunft und Verpflegung (${DE.eur(k.uv)} zu ${DE.eur(sn.uv)}). Ab dem vierten Jahr ist Sachsen etwas günstiger, weil sein höherer Pflegeanteil dann stärker bezuschusst wird.` },
      { q: 'Lohnt für Familien aus Hessen ein Heim in Thüringen?', a: `Im ersten Jahr spart ein Platz in Thüringen im Schnitt ${DE.eur(he.mit15 - k.mit15)} im Monat, ab dem vierten Jahr ${DE.eur(heimMonat(he, 37).eigenanteil - j[3].eigenanteil)}. Ob sich das lohnt, hängt von den Besuchswegen und vom einzelnen Haus ab. Bedenken Sie, dass für die Hilfe zur Pflege in der Regel das Sozialamt am Ort des Heims zuständig wird.` },
      { q: 'Warum steigt der Pflegeanteil in Thüringen so schnell?', a: 'Der Pflegeanteil folgt vor allem den Personalkosten. Seit Pflegeheime ihre Beschäftigten mindestens nach Tarif bezahlen müssen und neue Personalvorgaben gelten, steigen die Pflegesätze in allen Ländern, im Osten besonders stark, weil die Löhne dort lange niedriger lagen. Die Pflegekasse übernimmt davon je nach Aufenthaltsdauer 15 bis 75 Prozent.' },
    ],
    body: (h) => `
<h2>Thüringen zwischen Sachsen und Hessen</h2>
${h.table(['', 'Thüringen', 'Sachsen', 'Hessen', 'Bund'], [
  ['Pflegeanteil (EEE)', h.eur(k.eee), h.eur(sn.eee), h.eur(he.eee), h.eur(b.eee)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(sn.uv), h.eur(he.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(sn.invest), h.eur(he.invest), h.eur(b.invest)],
  ['1. Jahr', h.eur(k.mit15), h.eur(sn.mit15), h.eur(he.mit15), h.eur(b.mit15)],
  ['ab 4. Jahr', h.eur(j[3].eigenanteil), h.eur(heimMonat(sn, 37).eigenanteil), h.eur(heimMonat(he, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, 1. Juli 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>Thüringen ist ein gutes Beispiel dafür, dass der Landesdurchschnitt nur eine Orientierung gibt. Innerhalb des Landes liegen Häuser in Erfurt oder Jena oft über dem Schnitt, Heime im ländlichen Raum darunter. Entscheidend ist deshalb der Pflegeanteil des einzelnen Hauses, denn er macht im ersten Jahr den größten Teil der Rechnung aus und ist im Heimvertrag ausgewiesen.</p>
<h2>Was der Anstieg bedeutet</h2>
<p>Steigt der Pflegeanteil wie hier in sechs Monaten um ${h.eur(k.eee - v.eee)}, zahlen neue Bewohner davon 85 Prozent, Bewohner im vierten Jahr nur 25 Prozent. Die Pflegekasse rechnet den Zuschlag seit Juli 2026 selbst aus; angebrochene Monate zählen voll (${h.src('sgb11_43c', '§ 43c SGB XI')}). Wie sich die Stufen auswirken, zeigt ${h.a('leistungszuschlag', 'Leistungszuschlag')}.</p>
`,
  },
  en: {
    slug: 'care-home-costs-thuringia',
    nav: 'Thuringia',
    card: `${EN.eur(k.mit15)} in year one, care part up ${EN.pct(proz, 1)} since January: Thuringia against Saxony and Hesse.`,
    title: 'Care Home Costs Thuringia 2026: Co-payment Compared',
    description: `Care home in Thuringia 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j[3].eigenanteil)} from year four (vdek, 1 July 2026); the care part has risen by ${EN.pct(proz, 1)} since January.`,
    h1: 'Care homes in Thuringia: mid-table in the east, rising fast',
    intro: 'Thuringia sits mid-table for care home co-payments, but its care part is growing quickly. How the state compares with Saxony and with Hesse to the west.',
    resume: `A care home place in Thuringia cost an average of ${EN.eur(k.mit15)} a month out of pocket in the first year on 1 July 2026, rank ${platz} of 16 states (vdek). The care part, at ${EN.eur(k.eee)} before the supplement, is just below the national figure but has risen by ${EN.eur(k.eee - v.eee)} since January, ${EN.pct(proz, 1)} in six months. Board and lodging cost ${EN.eur(k.uv)} and investment costs ${EN.eur(k.invest)}, both below the national average. With the care fund’s supplement the co-payment falls to ${EN.eur(j[1].eigenanteil)} in year two, ${EN.eur(j[2].eigenanteil)} in year three and ${EN.eur(j[3].eigenanteil)} from year four. Four years in a home add up to about ${EN.eur(vier)}. Thuringia is almost level with Saxony in year one (${EN.eur(sn.mit15)}), while compared with Hesse a place saves ${EN.eur(he.mit15 - k.mit15)} a month. For families living near the state borders these are noticeable differences.`,
    faqs: [
      { q: 'Is Thuringia more expensive than Saxony?', a: `Hardly: in year one the two states are only ${EN.eur(Math.abs(k.mit15 - sn.mit15))} apart on average. Thuringia has the lower care part (${EN.eur(k.eee)} against ${EN.eur(sn.eee)}) but higher board and lodging (${EN.eur(k.uv)} against ${EN.eur(sn.uv)}). From year four Saxony is slightly cheaper, as its higher care part is subsidised more.` },
      { q: 'Is a home in Thuringia worth it for a family living in Hesse?', a: `In year one a place in Thuringia saves about ${EN.eur(he.mit15 - k.mit15)} a month on average, from year four ${EN.eur(heimMonat(he, 37).eigenanteil - j[3].eigenanteil)}. Whether it is worth it depends on travel for visits and on the individual home. Note that the welfare office where the home is usually becomes responsible for social assistance for care.` },
      { q: 'Why is the care part rising so fast in Thuringia?', a: 'The care part mainly follows staff costs. Since care homes must pay at least collectively agreed wages and new staffing rules apply, rates are rising in every state, especially in the east where wages were long lower. The care fund covers 15 to 75 percent of the care part depending on the length of stay.' },
    ],
    body: (h) => `
<h2>Thuringia between Saxony and Hesse</h2>
${h.table(['', 'Thuringia', 'Saxony', 'Hesse', 'Germany'], [
  ['Care co-payment (EEE)', h.eur(k.eee), h.eur(sn.eee), h.eur(he.eee), h.eur(b.eee)],
  ['Board and lodging', h.eur(k.uv), h.eur(sn.uv), h.eur(he.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(sn.invest), h.eur(he.invest), h.eur(b.invest)],
  ['Year 1', h.eur(k.mit15), h.eur(sn.mit15), h.eur(he.mit15), h.eur(b.mit15)],
  ['From year 4', h.eur(j[3].eigenanteil), h.eur(heimMonat(sn, 37).eigenanteil), h.eur(heimMonat(he, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, 1 July 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>Thuringia shows that a state average is only a guide. Homes in Erfurt or Jena are often above it, rural homes below. What matters, therefore, is the care part of the individual home, which is the largest part of the bill in year one and is stated in the contract.</p>
<h2>What the rise means</h2>
<p>When the care part rises by ${h.eur(k.eee - v.eee)} in six months, new residents pay 85 percent of it and residents in year four only 25 percent. Since July 2026 the care fund calculates the supplement itself, counting part months in full (${h.src('sgb11_43c', 'section 43c SGB XI')}). See ${h.a('leistungszuschlag', 'the care home supplement')} for how the steps work in practice.</p>
`,
  },
});
