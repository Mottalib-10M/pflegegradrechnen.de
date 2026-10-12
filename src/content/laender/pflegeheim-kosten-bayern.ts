import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, rangliste } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Bayern, vdek 1.7.2026 und 1.1.2026, alle Zahlen aus dem Motor. */
const k = kosten('BY'), v = kosten('BY', 'vorher'), b = kosten('BUND');
const j1 = heimMonat(k, 1), j4 = heimMonat(k, 37);
const drei = heimVerlauf(k, 1, 36).summe;
const platz = rangliste().indexOf('BY') + 1;
const LPG = P.landespflegegeld_by;

export default defineGuide({
  id: 'pflegeheim-kosten-bayern',
  group: 'land',
  order: 20,
  tool: 'heim',
  toolPreset: { land: 'BY' },
  related: ['pflegeheim-kosten', 'eigenanteil-pflegeheim', 'leistungszuschlag', 'hilfe-zur-pflege', 'pflegeheim-kosten-baden-wuerttemberg'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'lfpBayern'],
  de: {
    slug: 'pflegeheim-kosten-bayern',
    nav: 'Bayern',
    card: `${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ab dem vierten ${DE.eur(j4.eigenanteil)}; dazu ${DE.eur(LPG.euro_jahr)} Landespflegegeld pro Jahr.`,
    title: 'Pflegeheim Kosten Bayern 2026: Eigenanteil je Jahr im Heim',
    description: `Pflegeheim in Bayern 2026: ${DE.eur(k.mit15)} Eigenanteil im Monat im ersten Jahr, ${DE.eur(j4.eigenanteil)} ab dem vierten (vdek, 1.7.2026), dazu ${DE.eur(LPG.euro_jahr)} Landespflegegeld pro Jahr.`,
    h1: 'Was ein Pflegeheimplatz in Bayern 2026 kostet',
    intro: `Bayern liegt beim Eigenanteil auf Platz ${platz} von 16: günstiger als der Südwesten, teurer als der Osten. Der Rechner nimmt den bayerischen Durchschnitt.`,
    resume: `Im ersten Jahr im Pflegeheim zahlen Bewohnerinnen und Bewohner in Bayern im Durchschnitt ${DE.eur(k.mit15)} im Monat selbst, nach dem Leistungszuschlag der Pflegekasse von 15 Prozent. Das ergibt die Auswertung des Verbands der Ersatzkassen zum 1. Juli 2026. Der Betrag setzt sich zusammen aus dem einrichtungseinheitlichen Eigenanteil für die Pflege von ${DE.eur(k.eee)} vor Zuschlag (darin ${DE.eur(k.ausbildung)} Ausbildungskosten), ${DE.eur(k.uv)} für Unterkunft und Verpflegung und ${DE.eur(k.invest)} Investitionskosten. Mit jedem Aufenthaltsjahr steigt der Zuschlag nach § 43c SGB XI auf 30, 50 und 75 Prozent des Pflegeanteils; ab dem vierten Jahr bleiben im Schnitt ${DE.eur(j4.eigenanteil)}. In den ersten drei Jahren kommen so ${DE.eur(drei)} zusammen. Seit dem 1. Januar 2026 ist der Eigenanteil im ersten Jahr um ${DE.eur(k.mit15 - v.mit15)} gestiegen. Bayern zahlt zusätzlich ab Pflegegrad 2 ein Landespflegegeld von ${DE.eur(LPG.euro_jahr)} je Pflegegeldjahr, auch an Heimbewohner.`,
    faqs: [
      { q: 'Wie hoch ist der Eigenanteil im Pflegeheim in Bayern?', a: `Im Durchschnitt ${DE.eur(k.mit15)} im Monat im ersten Jahr, ${DE.eur(heimMonat(k, 13).eigenanteil)} im zweiten, ${DE.eur(heimMonat(k, 25).eigenanteil)} im dritten und ${DE.eur(j4.eigenanteil)} ab dem vierten (vdek, 1. Juli 2026). Das einzelne Heim kann deutlich abweichen; maßgeblich ist der Heimvertrag mit seinem EEE.` },
      { q: 'Gibt es in Bayern Landespflegegeld auch im Heim?', a: `Ja. Das Bayerische Landesamt für Pflege zahlt Menschen ab Pflegegrad 2 mit Hauptwohnsitz in Bayern ${DE.eur(LPG.euro_jahr)} je Pflegegeldjahr, unabhängig vom Einkommen und auch bei Heimaufenthalt. Bis 2025 waren es ${DE.eur(LPG.vorher_euro_jahr)}. Die Auszahlung erfolgt bis zum 31. Januar des Folgejahres; der Antrag wird einmal gestellt.` },
      { q: 'Warum sind Heime in Bayern günstiger als in Baden-Württemberg?', a: `Vor allem wegen des Pflegeanteils und der Unterkunft: Der EEE liegt in Bayern bei ${DE.eur(k.eee)}, in Baden-Württemberg bei ${DE.eur(kosten('BW').eee)}; Unterkunft und Verpflegung bei ${DE.eur(k.uv)} gegenüber ${DE.eur(kosten('BW').uv)}. Löhne und Personalschlüssel unterscheiden sich zwischen den Ländern, ebenso die Förderung der Gebäude.` },
    ],
    body: (h) => `
<h2>Bayern im Vergleich</h2>
${h.table(['Bestandteil', 'Bayern 1.7.2026', 'Bayern 1.1.2026', 'Bund 1.7.2026'], [
  ['EEE Pflege (vor Zuschlag)', h.eur(k.eee), h.eur(v.eee), h.eur(b.eee)],
  ['davon Ausbildungskosten', h.eur(k.ausbildung), h.eur(v.ausbildung), h.eur(b.ausbildung)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(v.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(v.invest), h.eur(b.invest)],
  ['Eigenanteil 1. Jahr', h.eur(k.mit15), h.eur(v.mit15), h.eur(b.mit15)],
], 'Quelle: vdek, Durchschnitt aller Heime im Land.', ['l', 'r', 'r', 'r'])}
<p>Unterkunft und Verpflegung kosten in Bayern ${h.eur(b.uv - k.uv)} weniger als im Bundesschnitt, die Investitionskosten ${h.eur(b.invest - k.invest)} weniger. Der Pflegeanteil dagegen liegt mit ${h.eur(k.eee)} über dem Bund, und er ist zwischen Januar und Juli 2026 um ${h.eur(k.eee - v.eee)} gestiegen. Genau dieser Teil wird mit der Aufenthaltsdauer bezuschusst, deshalb sinkt der Eigenanteil in Bayern vom ersten zum vierten Jahr um ${h.eur(j1.eigenanteil - j4.eigenanteil)} im Monat.</p>
<h2>Das Landespflegegeld rechnet der Rechner nicht ab</h2>
<p>Die ${h.eur(LPG.euro_jahr)} im Jahr kommen nicht vom Heim und nicht von der Pflegekasse, sondern vom Freistaat (${h.src('lfpBayern', 'Bayerisches Landesamt für Pflege')}). Sie mindern die Heimrechnung nicht, landen aber auf dem Konto und decken rechnerisch gut ${h.eur(LPG.euro_jahr / 12)} im Monat. Wer Hilfe zur Pflege vom Bezirk bekommt, sollte das Landespflegegeld trotzdem beantragen.</p>
<h2>Wenn Rente und Erspartes nicht reichen</h2>
<p>Zuständig für die ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')} im Heim sind in Bayern die Bezirke. Kinder müssen erst ab einem eigenen Jahreseinkommen von ${h.eur(P.sozialhilfe.jahreseinkommensgrenze_kinder)} mitzahlen (${h.src('sgb12_94', '§ 94 Abs. 1a SGB XII')}). Wie lange das Ersparte reicht, zeigt der Rechner oben, wenn Sie Rente und Vermögen eintragen.</p>
`,
  },
  en: {
    slug: 'care-home-costs-bavaria',
    nav: 'Bavaria',
    card: `${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j4.eigenanteil)} from year four, plus the ${EN.eur(LPG.euro_jahr)} Bavarian care allowance.`,
    title: 'Care Home Costs Bavaria 2026: Monthly Co-payment by Year',
    description: `Care home in Bavaria 2026: ${EN.eur(k.mit15)} co-payment a month in year one and ${EN.eur(j4.eigenanteil)} from year four (vdek, 1 July 2026), plus a ${EN.eur(LPG.euro_jahr)} state care allowance a year.`,
    h1: 'What a care home place in Bavaria costs in 2026',
    intro: `Bavaria ranks ${platz} of 16 states for care home co-payments: cheaper than the south-west, dearer than the east. The calculator uses the Bavarian average.`,
    resume: `Residents of Bavarian care homes paid an average of ${EN.eur(k.mit15)} a month themselves in their first year, after the 15 percent supplement from the long-term care fund, according to the vdek analysis of 1 July 2026. That total is made up of the home’s uniform care co-payment (EEE) of ${EN.eur(k.eee)} before the supplement, including ${EN.eur(k.ausbildung)} of nursing training levy, ${EN.eur(k.uv)} for board and lodging and ${EN.eur(k.invest)} of investment costs for the building. Under section 43c of Book XI of the Social Code the supplement rises to 30, 50 and 75 percent of the care part with each year of residence, so from the fourth year the average falls to ${EN.eur(j4.eigenanteil)}. Over the first three years a resident pays about ${EN.eur(drei)}. Since 1 January 2026 the first-year figure has risen by ${EN.eur(k.mit15 - v.mit15)}. Bavaria also pays its own state care allowance of ${EN.eur(LPG.euro_jahr)} per year from care grade 2, including to people living in a care home.`,
    faqs: [
      { q: 'What is the average care home co-payment in Bavaria?', a: `${EN.eur(k.mit15)} a month in the first year, ${EN.eur(heimMonat(k, 13).eigenanteil)} in the second, ${EN.eur(heimMonat(k, 25).eigenanteil)} in the third and ${EN.eur(j4.eigenanteil)} from the fourth (vdek, 1 July 2026). An individual home can differ a lot; the contract with its EEE figure is what counts.` },
      { q: 'Does the Bavarian state care allowance continue in a care home?', a: `Yes. The Bavarian State Office for Care pays ${EN.eur(LPG.euro_jahr)} per year to people from grade 2 whose main residence is in Bavaria, regardless of income and also in a care home; until 2025 it was ${EN.eur(LPG.vorher_euro_jahr)}. It is paid by 31 January of the following year, and one application covers later years.` },
      { q: 'Why are care homes in Bavaria cheaper than in Baden-Württemberg?', a: `Mainly because of the care part and accommodation: the EEE is ${EN.eur(k.eee)} in Bavaria against ${EN.eur(kosten('BW').eee)} in Baden-Württemberg, board and lodging ${EN.eur(k.uv)} against ${EN.eur(kosten('BW').uv)}. Wages, staffing ratios and public support for care home buildings all differ from one German state to the next.` },
    ],
    body: (h) => `
<h2>Bavaria compared</h2>
${h.table(['Component', 'Bavaria 1 Jul 2026', 'Bavaria 1 Jan 2026', 'Germany 1 Jul 2026'], [
  ['Care co-payment EEE (before supplement)', h.eur(k.eee), h.eur(v.eee), h.eur(b.eee)],
  ['of which training levy', h.eur(k.ausbildung), h.eur(v.ausbildung), h.eur(b.ausbildung)],
  ['Board and lodging', h.eur(k.uv), h.eur(v.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(v.invest), h.eur(b.invest)],
  ['Co-payment, year 1', h.eur(k.mit15), h.eur(v.mit15), h.eur(b.mit15)],
], 'Source: vdek, average across all homes in the state.', ['l', 'r', 'r', 'r'])}
<p>Board and lodging in Bavaria cost ${h.eur(b.uv - k.uv)} less than the national average and investment costs ${h.eur(b.invest - k.invest)} less. The care part, by contrast, is above the national figure at ${h.eur(k.eee)} and rose by ${h.eur(k.eee - v.eee)} between January and July 2026. That is the part subsidised more with each year of residence, which is why the Bavarian co-payment drops by ${h.eur(j1.eigenanteil - j4.eigenanteil)} a month between year one and year four.</p>
<h2>The state allowance is not deducted here</h2>
<p>The ${h.eur(LPG.euro_jahr)} a year comes from the Free State of Bavaria, not from the home or the fund (${h.src('lfpBayern', 'Bavarian State Office for Care')}). It does not reduce the home’s bill but is paid into the resident’s account, worth a little over ${h.eur(LPG.euro_jahr / 12)} a month. Even residents receiving social assistance for care should apply.</p>
<h2>When pension and savings are not enough</h2>
<p>In Bavaria the districts (Bezirke) handle ${h.a('hilfe-zur-pflege', 'social assistance for care')} in homes. Children only contribute if their own annual income exceeds ${h.eur(P.sozialhilfe.jahreseinkommensgrenze_kinder)} (${h.src('sgb12_94', 'section 94(1a) SGB XII')}). Enter pension and savings in the calculator above to see how long savings last.</p>
`,
  },
});
