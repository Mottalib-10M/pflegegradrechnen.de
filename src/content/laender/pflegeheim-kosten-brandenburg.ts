import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, rangliste, LAENDER } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Brandenburg: niedrigste Investitionskosten aller Länder; Pflegeanteil deutlich über dem Bund. */
const k = kosten('BB'), v = kosten('BB', 'vorher'), b = kosten('BUND'), be = kosten('BE');
const j4 = heimMonat(k, 37);
const investRang = [...LAENDER].sort((x, y) => kosten(x).invest - kosten(y).invest).indexOf('BB') + 1;
const platz = rangliste().indexOf('BB') + 1;
const anteilInvest = k.invest / k.mit15;

export default defineGuide({
  id: 'pflegeheim-kosten-brandenburg',
  group: 'land',
  order: 40,
  tool: 'heim',
  toolPreset: { land: 'BB' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-berlin', 'investitionskosten', 'pflegeheim-kosten-mecklenburg-vorpommern', 'hilfe-zur-pflege'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb12_94'],
  de: {
    slug: 'pflegeheim-kosten-brandenburg',
    nav: 'Brandenburg',
    card: `Die niedrigsten Investitionskosten Deutschlands: ${DE.eur(k.invest)} im Monat; Eigenanteil im ersten Jahr ${DE.eur(k.mit15)}.`,
    title: 'Pflegeheim Kosten Brandenburg 2026: Eigenanteil und Gebäude',
    description: `Pflegeheim in Brandenburg 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j4.eigenanteil)} ab dem vierten (vdek, 1.7.2026); Investitionskosten ${DE.eur(k.invest)}, bundesweit niedrigste.`,
    h1: 'Pflegeheim in Brandenburg: niedrige Gebäudekosten, hohe Pflegekosten',
    intro: 'Brandenburg verlangt für das Gebäude so wenig wie kein anderes Land. Beim Pflegeanteil liegt es dafür über dem Bund. Was das für die Monatsrechnung bedeutet.',
    resume: `Brandenburg hat am 1. Juli 2026 die niedrigsten Investitionskosten aller Länder: ${DE.eur(k.invest)} im Monat, gegenüber ${DE.eur(b.invest)} im Bundesschnitt, so der vdek. Das ist der Teil der Heimrechnung, mit dem Bau, Ausstattung und Instandhaltung des Gebäudes bezahlt werden; er macht in Brandenburg nur ${DE.pct(anteilInvest, 0)} des Eigenanteils im ersten Jahr aus. Unterkunft und Verpflegung liegen mit ${DE.eur(k.uv)} ebenfalls unter dem Schnitt. Teurer ist der Pflegeanteil: ${DE.eur(k.eee)} vor dem Zuschlag der Pflegekasse, ${DE.eur(k.eee - b.eee)} über dem Bund. Insgesamt zahlen Bewohner im ersten Jahr ${DE.eur(k.mit15)} im Monat, Rang ${platz} unter den 16 Ländern. Ab dem vierten Jahr sind es ${DE.eur(j4.eigenanteil)}, weil die Kasse dann 75 Prozent des Pflegeanteils übernimmt. Seit Januar 2026 ist der Eigenanteil um ${DE.eur(k.mit15 - v.mit15)} gestiegen, die Investitionskosten um ${DE.eur(k.invest - v.invest)}.`,
    faqs: [
      { q: 'Was sind Investitionskosten, und warum sind sie in Brandenburg niedrig?', a: `Mit den Investitionskosten legt das Heim die Kosten für Gebäude, Ausstattung und Instandhaltung auf die Bewohner um. Sie hängen vom Alter und Standard des Hauses, den Grundstückspreisen und der Förderung durch das Land ab. In Brandenburg liegen sie mit ${DE.eur(k.invest)} auf Rang ${investRang} der niedrigsten Werte; in Nordrhein-Westfalen sind es fast doppelt so viel.` },
      { q: 'Lohnt es sich für Berliner, ein Heim in Brandenburg zu suchen?', a: `Im ersten Jahr spart ein Platz in Brandenburg im Schnitt ${DE.eur(be.mit15 - k.mit15)} im Monat gegenüber Berlin. Ab dem vierten Jahr ist der Unterschied fast verschwunden, weil Berlin einen höheren Pflegeanteil hat, der stärker bezuschusst wird. Entscheidend sind Wege für Besuche, die Anbindung an Ärzte und das einzelne Haus.` },
      { q: 'Müssen Kinder in Brandenburg für das Pflegeheim der Eltern zahlen?', a: `Wie überall nur, wenn ihr eigenes Jahreseinkommen über ${DE.eur(100000)} liegt (§ 94 Abs. 1a SGB XII). Darunter springt das Sozialamt mit der Hilfe zur Pflege ein, wenn Rente und Vermögen der Eltern nicht reichen. Das Einkommen von Schwiegerkindern zählt dabei nicht.` },
    ],
    body: (h) => `
<h2>Brandenburg im Vergleich mit Berlin und dem Bund</h2>
${h.table(['', 'Brandenburg', 'Berlin', 'Bund'], [
  ['Pflegeanteil (EEE)', h.eur(k.eee), h.eur(be.eee), h.eur(b.eee)],
  ['davon Ausbildungsumlage', h.eur(k.ausbildung), h.eur(be.ausbildung), h.eur(b.ausbildung)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(be.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(be.invest), h.eur(b.invest)],
  ['Eigenanteil 1. Jahr', h.eur(k.mit15), h.eur(be.mit15), h.eur(b.mit15)],
], 'vdek, 1. Juli 2026.', ['l', 'r', 'r', 'r'])}
<p>Der Pflegeanteil ist in Brandenburg zwischen Januar und Juli um ${h.eur(k.eee - v.eee)} gewachsen, die Investitionskosten haben sich für ostdeutsche Verhältnisse ungewöhnlich stark bewegt (${h.eur(k.invest - v.invest)} mehr). Trotzdem bleibt der Gebäudeteil der kleinste Posten. Wer zwischen zwei Häusern wählt, sollte vor allem den EEE und die Unterkunft vergleichen; dort liegen in Brandenburg die Unterschiede.</p>
<p>Für die Familie zählt außerdem, wie lange der Aufenthalt voraussichtlich dauert. Mit dem steigenden Zuschlag sinkt der Eigenanteil bis zum vierten Jahr um ${h.eur(heimMonat(k, 1).eigenanteil - j4.eigenanteil)}. Wie sich die Gebäudekosten der Länder unterscheiden und wer sie tragen sollte, steht unter ${h.a('investitionskosten', 'Investitionskosten')}.</p>
<h2>Wenn die Rente nicht reicht</h2>
<p>Viele Renten in Brandenburg liegen unter dem Eigenanteil von ${h.eur(k.mit15)}. Dann wird zuerst das Ersparte eingesetzt, bis zum Schonbetrag von ${h.eur(10000)}; danach übernimmt das Sozialamt die Lücke als ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')}. Tragen Sie Rente und Ersparnisse oben in den Rechner ein: Er zeigt, ab welchem Monat der Antrag beim Sozialamt fällig wird, damit keine Rechnung offen bleibt.</p>
`,
  },
  en: {
    slug: 'care-home-costs-brandenburg',
    nav: 'Brandenburg',
    card: `Germany’s lowest investment costs at ${EN.eur(k.invest)} a month; first-year co-payment ${EN.eur(k.mit15)}.`,
    title: 'Care Home Costs Brandenburg 2026: Co-payment and Building',
    description: `Care home in Brandenburg 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j4.eigenanteil)} from year four (vdek, 1 July 2026); investment costs of ${EN.eur(k.invest)} are the lowest anywhere.`,
    h1: 'Care homes in Brandenburg: low building costs, high care costs',
    intro: 'Brandenburg charges less for the building than any other state but more than average for care. What that means for the monthly bill.',
    resume: `On 1 July 2026 Brandenburg had the lowest care home investment costs of all German states: ${EN.eur(k.invest)} a month against a national ${EN.eur(b.invest)}, according to the vdek. Investment costs pay for building, furnishing and maintenance and make up only ${EN.pct(anteilInvest, 0)} of the first-year co-payment in Brandenburg. Board and lodging, at ${EN.eur(k.uv)}, are also below average. The care part is dearer: ${EN.eur(k.eee)} before the care fund’s supplement, ${EN.eur(k.eee - b.eee)} above the national figure. Overall residents pay ${EN.eur(k.mit15)} a month in year one, rank ${platz} of 16 states. From the fourth year it is ${EN.eur(j4.eigenanteil)}, because the fund then covers 75 percent of the care part. Since January 2026 the co-payment has risen by ${EN.eur(k.mit15 - v.mit15)} and investment costs by ${EN.eur(k.invest - v.invest)}, a noticeable move for this item.`,
    faqs: [
      { q: 'What are investment costs and why are they low in Brandenburg?', a: `They are how a home passes the costs of its building, furnishings and maintenance on to residents. They depend on the age and standard of the building, land prices and state funding. In Brandenburg they are the lowest-ranked at ${EN.eur(k.invest)}; in North Rhine-Westphalia they are almost twice as high.` },
      { q: 'Is it worth looking at homes in Brandenburg if my parent lives in Berlin?', a: `In year one a place in Brandenburg saves about ${EN.eur(be.mit15 - k.mit15)} a month compared with Berlin. From year four the gap has almost disappeared, because Berlin’s higher care part is subsidised more. Travel for visits, access to doctors and the individual home matter more.` },
      { q: 'Do children in Brandenburg have to pay for a parent’s care home?', a: `As everywhere in Germany, only if their own annual income exceeds ${EN.eur(100000)} (section 94(1a) SGB XII). Below that, the welfare office pays social assistance for care when the parent’s pension and savings run out. A son- or daughter-in-law’s income does not count.` },
    ],
    body: (h) => `
<h2>Brandenburg against Berlin and Germany</h2>
${h.table(['', 'Brandenburg', 'Berlin', 'Germany'], [
  ['Care co-payment (EEE)', h.eur(k.eee), h.eur(be.eee), h.eur(b.eee)],
  ['of which training levy', h.eur(k.ausbildung), h.eur(be.ausbildung), h.eur(b.ausbildung)],
  ['Board and lodging', h.eur(k.uv), h.eur(be.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(be.invest), h.eur(b.invest)],
  ['Co-payment, year 1', h.eur(k.mit15), h.eur(be.mit15), h.eur(b.mit15)],
], 'vdek, 1 July 2026.', ['l', 'r', 'r', 'r'])}
<p>Brandenburg’s care part grew by ${h.eur(k.eee - v.eee)} between January and July, and investment costs moved unusually for an eastern state (${h.eur(k.invest - v.invest)} more). The building is still the smallest item. When choosing between homes, compare the EEE and accommodation, which is where Brandenburg homes differ.</p>
<p>How long the stay is likely to last also matters: with the rising supplement the co-payment drops by ${h.eur(heimMonat(k, 1).eigenanteil - j4.eigenanteil)} by year four. See ${h.a('investitionskosten', 'investment costs')} for how states compare and who should pay them.</p>
<h2>When the pension is not enough</h2>
<p>Many pensions in Brandenburg are below the ${h.eur(k.mit15)} co-payment. Savings are used first, down to the protected amount of ${h.eur(10000)}; after that the welfare office covers the gap as ${h.a('hilfe-zur-pflege', 'social assistance for care')}. Enter pension and savings in the calculator above to see from which month an application to the welfare office is due, so that no bill is left unpaid. Relatives abroad can make the application on the parent’s behalf with a power of attorney.</p>
`,
  },
});
