import { defineGuide } from '../../lib/guide-types';
import { jahr, kombination } from '../../lib/engine/leistungen';
import { kosten, heimMonat } from '../../lib/engine/heim';
import { rentenpunkte, pauschbetrag } from '../../lib/engine/angehoerige';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Grad 3 nur Angehörige; Grad 3 mit Pflegedienst für 750 €; Heim im Bundesschnitt. */
const nurFamilie = jahr({ grad: 3, versorgung: 'angehoerige' });
const k750 = kombination(3, 750);
const heim = heimMonat(kosten('BUND'), 1, 3);
const rente = rentenpunkte(3, 'geld');
const pb = pauschbetrag(3);
/** Gewichtete Punkte je Punktbereich aus Anlage 2, für die Tabelle. */
const gw = (m: keyof typeof P.nba.bereiche, l: 'de' | 'en') => P.nba.bereiche[m].gewichtet.map((x) => (l === 'de' ? DE : EN).num(x, Number.isInteger(x) ? 0 : Number.isInteger(x * 10) ? 1 : 2)).join(' · ');
const w = (x: number, l: 'de' | 'en') => (l === 'de' ? DE : EN).pct(x, 0);
const N = P.nba;

export default defineGuide({
  id: 'pflegegrad-3',
  group: 'grad',
  order: 40,
  mini: 'gradGeld',
  miniDefaults: { g: 3 },
  related: ['pflegegrad-2', 'pflegegrad-4', 'pflegegrad-rechner', 'kombinationsleistung', 'verhinderungspflege', 'widerspruch-pflegegrad'],
  sources: ['sgb11_15', 'sgb11_37', 'sgb11_36', 'sgb11_38', 'sgb11_42a', 'sgb11_45b'],
  de: {
    slug: 'pflegegrad-3',
    nav: 'Pflegegrad 3',
    card: `${DE.eur(P.pflegegeld['3'])} Pflegegeld oder ${DE.eur(P.sachleistung['3'])} Sachleistung: was Pflegegrad 3 im Monat und im Jahr bringt.`,
    title: 'Pflegegrad 3: wie viel Geld 2026, Punkte und Leistungen',
    description: `Pflegegrad 3 ab 47,5 Punkten: ${DE.eur(P.pflegegeld['3'])} Pflegegeld oder ${DE.eur(P.sachleistung['3'])} Sachleistung im Monat 2026, dazu Entlastungsbetrag, Jahresbetrag, Leistungen im Heim und Rente.`,
    h1: 'Pflegegrad 3: wie viel Geld es gibt und wer ihn bekommt',
    intro: 'Der häufigste Grad bei Demenz und nach einem Schlaganfall: Hier steht, was er 2026 bringt und wo die Grenze zu Grad 2 und Grad 4 liegt.',
    resume: `Pflegegrad 3 bekommt, wer im Gutachten des Medizinischen Dienstes zwischen 47,5 und unter 70 Gesamtpunkten erreicht; das Gesetz nennt das schwere Beeinträchtigungen der Selbständigkeit (§ 15 Abs. 3 SGB XI). 2026 zahlt die Pflegekasse dafür ${DE.eur(P.pflegegeld['3'])} Pflegegeld im Monat, wenn die Familie selbst pflegt, oder Sachleistungen eines Pflegedienstes bis ${DE.eur(P.sachleistung['3'])}. Wer beides mischt, erhält anteiliges Pflegegeld: Ein Pflegedienst für ${DE.eur(750)} verbraucht ${DE.pct(k750.anteil, 1)} des Topfs, dann bleiben ${DE.eur(k750.pflegegeld, 2)} Pflegegeld. Dazu kommen der Entlastungsbetrag von ${DE.eur(P.entlastungsbetrag.monat)}, Pflegehilfsmittel bis ${DE.eur(P.pflegehilfsmittel.verbrauch_monat)} im Monat, Tagespflege bis ${DE.eur(P.tagespflege['3'])} als eigener Topf und der Gemeinsame Jahresbetrag von ${DE.eur(P.jahresbetrag.euro)} für Verhinderungs- und Kurzzeitpflege. Pflegt nur die Familie, ergibt das zusammen ${DE.eur(nurFamilie.jahrGesamt)} im Jahr, davon ${DE.eur(nurFamilie.jahrAufsKonto)} als Geld aufs Konto.`,
    faqs: [
      { q: 'Wie viele Punkte braucht man für Pflegegrad 3?', a: 'Mindestens 47,5 gewichtete Gesamtpunkte, bei 70 Punkten beginnt Pflegegrad 4. Die Punkte entstehen aus sechs Modulen, von denen die Selbstversorgung mit 40 Prozent am stärksten zählt. Wer sich nicht mehr allein waschen und anziehen kann und zusätzlich bei Medikamenten und Arztterminen Hilfe braucht, landet häufig in diesem Bereich (§ 15 Abs. 3 SGB XI).' },
      { q: 'Wird das Pflegegeld bei Pflegegrad 3 im Jahr 2026 erhöht?', a: `Nein. Seit dem 1. Januar 2025 sind es ${DE.eur(P.pflegegeld['3'])} im Monat, vorher waren es ${DE.eur(P.pflegegeld_2024['3'])}. Die Pflegekasse überweist den Betrag an die pflegebedürftige Person. Die nächste gesetzliche Anpassung ist nach § 30 SGB XI für den 1. Januar 2028 vorgesehen; ein Kabinettsentwurf vom September 2026 ist noch kein Gesetz.` },
      { q: 'Was bekommt man bei Pflegegrad 3 im Pflegeheim?', a: `Die Pflegekasse zahlt ${DE.eur(P.vollstationaer['3'])} im Monat direkt an das Heim und zusätzlich einen Zuschlag auf den pflegebedingten Eigenanteil, der im ersten Jahr 15 Prozent beträgt. Der Eigenanteil hängt nicht vom Grad ab: Er ist für alle Bewohner der Grade 2 bis 5 im selben Heim gleich; im Bundesschnitt waren es im ersten Jahr ${DE.eur(heim.eigenanteil)}.` },
      { q: 'Muss bei Pflegegrad 3 regelmäßig ein Beratungsbesuch stattfinden?', a: 'Ja, wenn nur Pflegegeld bezogen wird: einmal im Halbjahr ein Beratungseinsatz zu Hause durch einen Pflegedienst oder eine anerkannte Beratungsstelle (§ 37 Abs. 3 SGB XI). Die Kasse zahlt den Besuch. Wird er nicht abgerufen, kann sie das Pflegegeld kürzen und im Wiederholungsfall streichen. Jeder zweite Besuch darf bis März 2027 per Video stattfinden.' },
      { q: 'Lohnt sich der Wechsel von Pflegegrad 3 auf 4?', a: `Ein höherer Grad bringt ${DE.eur(P.pflegegeld['4'] - P.pflegegeld['3'])} mehr Pflegegeld und ${DE.eur(P.sachleistung['4'] - P.sachleistung['3'])} mehr Sachleistung im Monat. Den Antrag auf Höherstufung stellen Sie formlos, sobald sich der Zustand dauerhaft verschlechtert hat, etwa wenn nachts Hilfe nötig wird oder die Person nicht mehr allein essen kann; es folgt ein neues Gutachten.` },
      { q: 'Wie viel Rente bekommt eine pflegende Tochter bei Pflegegrad 3?', a: `Pflegt sie mindestens zehn Stunden pro Woche an zwei Tagen und arbeitet höchstens 30 Stunden, zahlt die Pflegekasse Rentenbeiträge auf ${DE.pct(rente.anteil, 0)} der Bezugsgröße. Ein Jahr Pflege bei reinem Pflegegeld ergibt ${DE.num(rente.punkteJahr, 4)} Entgeltpunkte, das sind nach heutigem Rentenwert ${DE.eur(rente.renteProJahr, 2)} Monatsrente (§ 166 Abs. 2 SGB VI).` },
    ],
    body: (h) => `
<h2>Was Pflegegrad 3 im Gutachten bedeutet</h2>
<p>Pflegegrad 3 steht in der Mitte der Skala und ist zugleich der Grad, an dem sich viele Familien zum ersten Mal ernsthaft fragen, ob die Pflege zu Hause noch zu schaffen ist. Die Person kommt mit Hilfe durch den Tag, aber kaum ein Vormittag vergeht ohne jemanden, der beim Duschen stützt, die Tabletten richtet, an das Trinken erinnert oder nachts nachsieht. Im Gutachten zeigt sich das als Summe von 47,5 bis unter 70 Punkten.</p>
<p>Wichtig ist, wie diese Punkte zusammenkommen. Selbstversorgung (Modul 4) zählt 40 Prozent; wer dort im Punktbereich 3 landet, hat bereits 30 Punkte. Modul 2 und 3 werden nicht addiert, sondern nur der höhere Wert geht ein; bei Demenz entscheidet oft das Verhalten in Modul 3, nicht das Gedächtnis in Modul 2. Mobilität dagegen zählt nur 10 Prozent: Ein Rollstuhl allein führt selten über Pflegegrad 2 hinaus. Den eigenen Stand prüfen Sie mit dem ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')}, der jedes Kriterium der Anlage 1 abfragt.</p>
${h.table(['Modul', 'Gewicht', 'gewichtete Punkte je Bereich 0 bis 4'], [
  ['1 Mobilität', w(N.gewichtung.m1, 'de'), gw('m1', 'de')],
  ['2 oder 3 Kognition oder Verhalten (höherer Wert)', w(N.gewichtung.m23, 'de'), gw('m2', 'de')],
  ['4 Selbstversorgung', w(N.gewichtung.m4, 'de'), gw('m4', 'de')],
  ['5 Krankheit und Therapie', w(N.gewichtung.m5, 'de'), gw('m5', 'de')],
  ['6 Alltag und Kontakte', w(N.gewichtung.m6, 'de'), gw('m6', 'de')],
], 'Anlage 2 zu § 15 SGB XI: Für Pflegegrad 3 braucht es 47,5 bis unter 70 Punkte.')}
<p>Ein typischer Weg zu Grad 3: Selbstversorgung im Bereich 2 (20 Punkte), Verhalten im Bereich 4 (15 Punkte), Krankheitsbewältigung im Bereich 2 (10 Punkte), Alltag im Bereich 3 (11,25 Punkte) und Mobilität im Bereich 2 (5 Punkte) ergeben 61,25. Fehlt die Unruhe in Modul 3, fällt dieselbe Person auf 57,5 und bleibt in Grad 3; fehlt zusätzlich die Hilfe beim Duschen, rutscht sie unter 47,5.</p>

<h2>Das Geld im Monat</h2>
<p>Pflegegrad 3 öffnet drei Wege, die sich in einem Kalendermonat kombinieren lassen.</p>
<ul>
<li><strong>Pflegegeld</strong>: ${h.eur(P.pflegegeld['3'])}, wenn Angehörige, Freunde oder Nachbarn pflegen (${h.src('sgb11_37', '§ 37 SGB XI')}).</li>
<li><strong>Sachleistung</strong>: bis ${h.eur(P.sachleistung['3'])} für einen zugelassenen Pflegedienst, der direkt mit der Kasse abrechnet (${h.src('sgb11_36', '§ 36 SGB XI')}).</li>
<li><strong>Kombination</strong>: Das Pflegegeld sinkt um den Anteil, zu dem die Sachleistung genutzt wird (${h.src('sgb11_38', '§ 38 SGB XI')}). Mit dem Pflegedienst für ${h.eur(750)} sind es ${h.pct(k750.anteil, 1)} Sachleistung und ${h.eur(k750.pflegegeld, 2)} Pflegegeld. Den genauen Wert für Ihre Rechnung liefert der ${h.a('kombinationsleistung', 'Kombinationsrechner')}.</li>
</ul>
<p>Unabhängig davon stehen die Budgets, die nur gegen Beleg fließen: ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} ${h.eur(P.entlastungsbetrag.monat)}, ${h.a('pflegehilfsmittel', 'Pflegehilfsmittel')} bis ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} und ${h.a('tagespflege', 'Tagespflege')} bis ${h.eur(P.tagespflege['3'])}. Die Tagespflege wird nicht auf Pflegegeld oder Sachleistung angerechnet. Gerade bei Grad 3 lohnt sie sich: Zwei Tage pro Woche in einer Einrichtung entlasten die pflegende Person spürbar, ohne dass vom Pflegegeld etwas abgeht.</p>
<!--mini:kombiSchnell-->

<h2>Im Jahr: was zusammenkommt</h2>
${h.table(['Leistung bei Pflegegrad 3', 'Monat', 'Jahr'], [
  ['Pflegegeld (nur Angehörige)', h.eur(nurFamilie.pflegegeld), h.eur(nurFamilie.pflegegeld * 12)],
  ['Entlastungsbetrag', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat * 12)],
  ['Pflegehilfsmittel zum Verbrauch', h.eur(P.pflegehilfsmittel.verbrauch_monat), h.eur(P.pflegehilfsmittel.verbrauch_monat * 12)],
  ['Verhinderungs- und Kurzzeitpflege', '–', h.eur(P.jahresbetrag.euro)],
  ['Zusammen', h.eur(nurFamilie.gesamt), h.eur(nurFamilie.jahrGesamt)],
], 'Ohne Tagespflege und ohne Zuschüsse für den Umbau der Wohnung.', ['l', 'r', 'r'])}
<p>Der Gemeinsame Jahresbetrag von ${h.eur(P.jahresbetrag.euro)} ist der größte Posten nach dem Pflegegeld und wird am häufigsten verschenkt (${h.src('sgb11_42a', '§ 42a SGB XI')}). Er bezahlt eine Vertretung, wenn die pflegende Person in Urlaub geht oder krank wird, und einen vorübergehenden Platz in einer Einrichtung. Während dieser Zeit läuft die Hälfte des Pflegegeldes weiter, bei Grad 3 knapp ${h.eur(P.pflegegeld['3'] / 2)} im Monat. Planen lässt sich das mit dem ${h.a('verhinderungspflege', 'Rechner für Verhinderungs- und Kurzzeitpflege')}.</p>

<h2>Grad 3 im Pflegeheim</h2>
<p>Im Heim fällt das Pflegegeld weg. Die Kasse zahlt ${h.eur(P.vollstationaer['3'])} an die Einrichtung und einen Leistungszuschlag auf den pflegebedingten Eigenanteil. Der Eigenanteil selbst ist im selben Heim für die Grade 2 bis 5 gleich hoch; ein höherer Grad macht das Heim also für die Familie nicht teurer, sondern nur für die Kasse. Im Bundesschnitt lag der Eigenanteil im ersten Jahr bei ${h.eur(heim.eigenanteil)} im Monat (vdek, 1. Juli 2026). Wie viel es im eigenen Land ist, zeigt der ${h.a('pflegeheim-kosten', 'Pflegeheim-Rechner')}.</p>

<h2>Wenn der Bescheid nicht passt</h2>
<p>Viele Familien, die Grad 3 erwarten, erhalten zunächst Grad 2, weil im Gutachten Hilfe als selbständig gewertet wurde, die tatsächlich nötig ist: das Erinnern an das Trinken, das Richten der Kleidung, nächtliche Unruhe, die am Tag der Begutachtung nicht auftrat. Gegen den Bescheid können Sie innerhalb eines Monats ${h.a('widerspruch-pflegegrad', 'Widerspruch einlegen')}. Hilfreich ist ein Pflegetagebuch über zwei Wochen, in dem jede Hilfe mit Uhrzeit steht. Hat sich der Zustand erst später verschlechtert, ist der richtige Weg ein ${h.a('hoeherstufung-pflegegrad', 'Antrag auf Höherstufung')}.</p>

<h2>Für die pflegende Familie</h2>
<p>Bei Pflegegrad 3 zahlt die Pflegekasse Rentenbeiträge für Angehörige, die mindestens zehn Stunden pro Woche an zwei Tagen pflegen; bei reinem Pflegegeld bringt ein Jahr ${h.eur(rente.renteProJahr, 2)} Monatsrente (${h.a('rente-pflegende-angehoerige', 'Rentenrechner')}). Wer für die Pflege kein Geld annimmt, kann in der Steuererklärung den ${h.a('pflege-pauschbetrag', 'Pflege-Pauschbetrag')} von ${h.eur(pb.voll)} ansetzen. Das Pflegegeld zählt bei Bürgergeld und Wohngeld nicht als Einkommen.</p>
`,
  },
  en: {
    slug: 'care-grade-3',
    nav: 'Care grade 3',
    card: `${EN.eur(P.pflegegeld['3'])} allowance or ${EN.eur(P.sachleistung['3'])} in care services: what German care grade 3 brings.`,
    title: 'Care Grade 3 Germany 2026: Pflegegeld, Points, Benefits',
    description: `German care grade 3 (Pflegegrad 3) from 47.5 points: ${EN.eur(P.pflegegeld['3'])} allowance or ${EN.eur(P.sachleistung['3'])} in services a month in 2026, plus the relief amount and the annual respite budget.`,
    h1: 'German care grade 3: how much money and who qualifies',
    intro: 'The most common grade with dementia or after a stroke: what Pflegegrad 3 pays in 2026 and where the line to grades 2 and 4 runs.',
    resume: `Care grade 3 (Pflegegrad 3) applies when the Medical Service assessment produces between 47.5 and just under 70 points, which the law describes as severe limitations of independence (section 15(3) of Book XI of the Social Code). In 2026 the long-term care fund (Pflegekasse) pays ${EN.eur(P.pflegegeld['3'])} a month in care allowance if the family does the caring, or up to ${EN.eur(P.sachleistung['3'])} of services from a registered home care provider. Mixing both reduces the allowance in proportion: a care service billing ${EN.eur(750)} uses ${EN.pct(k750.anteil, 1)} of the services budget and leaves ${EN.eur(k750.pflegegeld, 2)} of allowance. On top come the ${EN.eur(P.entlastungsbetrag.monat)} relief amount, consumable care aids up to ${EN.eur(P.pflegehilfsmittel.verbrauch_monat)}, day care up to ${EN.eur(P.tagespflege['3'])} as a separate budget and the joint annual budget of ${EN.eur(P.jahresbetrag.euro)} for respite and short-term care. With family care only, that adds up to ${EN.eur(nurFamilie.jahrGesamt)} a year, of which ${EN.eur(nurFamilie.jahrAufsKonto)} is paid out as money.`,
    faqs: [
      { q: 'How many points do you need for care grade 3?', a: 'At least 47.5 weighted points; grade 4 starts at 70. The points come from six modules, and self-care weighs most at 40 percent. Someone who can no longer wash and dress alone and also needs help with medication and appointments often lands in this range. The assessor scores what the person can still do, not the diagnosis.' },
      { q: 'Did the grade 3 allowance change for 2026?', a: `No. It has been ${EN.eur(P.pflegegeld['3'])} a month since 1 January 2025, up from ${EN.eur(P.pflegegeld_2024['3'])}. It is paid to the person who needs care. The law schedules the next increase for 1 January 2028; the reform bill adopted by the cabinet in September 2026 has not been passed.` },
      { q: 'What does grade 3 pay in a German care home?', a: `The fund pays the home ${EN.eur(P.vollstationaer['3'])} a month and a supplement on the care co-payment, 15 percent in the first year. The co-payment itself is the same for every resident from grade 2 to 5 in a given home; the national average in year one was ${EN.eur(heim.eigenanteil)} a month on vdek data of 1 July 2026.` },
      { q: 'Is a regular advice visit required at grade 3?', a: 'Yes, if only the allowance is claimed: one visit at home every six months by a care service or recognised advice centre (section 37(3) SGB XI). The fund pays for it. If it is not arranged, the allowance can be cut and eventually stopped. Until March 2027 every second visit can take place by video, which helps relatives abroad join in.' },
      { q: 'How much pension does a carer earn at grade 3?', a: `If the carer looks after the person for at least ten hours a week over two days and works no more than 30 hours, the fund pays pension contributions on ${EN.pct(rente.anteil, 0)} of the reference value. One year with allowance only earns ${EN.num(rente.punkteJahr, 4)} pension points, worth ${EN.eur(rente.renteProJahr, 2)} of monthly German pension at today’s value.` },
    ],
    body: (h) => `
<h2>What grade 3 means in the assessment</h2>
<p>Grade 3 sits in the middle of the scale. In daily life it usually means the person manages with help but rarely gets through a morning without someone supporting them in the shower, preparing tablets, reminding them to drink or checking on them at night. In the Medical Service (Medizinischer Dienst) report this shows up as 47.5 to just under 70 points.</p>
<p>How the points add up matters. Self-care (module 4) weighs 40 percent; band 3 there already gives 30 points. Modules 2 and 3 are not added together: only the higher one counts, so with dementia it is often the behaviour score in module 3, not memory in module 2, that decides. Mobility weighs only 10 percent, which is why a wheelchair on its own rarely leads beyond grade 2. You can check a case against every criterion with the ${h.a('pflegegrad-rechner', 'care grade calculator')}.</p>
${h.table(['Module', 'Weight', 'Weighted points for bands 0 to 4'], [
  ['1 Mobility', w(N.gewichtung.m1, 'en'), gw('m1', 'en')],
  ['2 or 3 Cognition or behaviour (higher value)', w(N.gewichtung.m23, 'en'), gw('m2', 'en')],
  ['4 Self-care', w(N.gewichtung.m4, 'en'), gw('m4', 'en')],
  ['5 Illness and treatment', w(N.gewichtung.m5, 'en'), gw('m5', 'en')],
  ['6 Daily life and contact', w(N.gewichtung.m6, 'en'), gw('m6', 'en')],
], 'Annex 2 to section 15 SGB XI: grade 3 needs 47.5 to under 70 points.')}
<p>A typical path to grade 3: self-care in band 2 (20 points), behaviour in band 4 (15), illness management in band 2 (10), daily life in band 3 (11.25) and mobility in band 2 (5) make 61.25. Without the restlessness in module 3 the same person drops to 57.5 and stays at grade 3; take away the help with showering as well and the total falls below 47.5.</p>

<h2>The money each month</h2>
<ul>
<li><strong>Care allowance (Pflegegeld)</strong>: ${h.eur(P.pflegegeld['3'])} when relatives, friends or neighbours provide the care (${h.src('sgb11_37', 'section 37 SGB XI')}).</li>
<li><strong>Services in kind (Sachleistung)</strong>: up to ${h.eur(P.sachleistung['3'])} for a registered home care service that bills the fund directly (${h.src('sgb11_36', 'section 36 SGB XI')}).</li>
<li><strong>Combined benefit</strong>: the allowance falls by the share of the services budget used (${h.src('sgb11_38', 'section 38 SGB XI')}). A ${h.eur(750)} bill uses ${h.pct(k750.anteil, 1)} and leaves ${h.eur(k750.pflegegeld, 2)}; the ${h.a('kombinationsleistung', 'combined benefit calculator')} works it out for your bill.</li>
</ul>
<p>Separately there are budgets paid against receipts: the ${h.a('entlastungsbetrag', 'relief amount')} of ${h.eur(P.entlastungsbetrag.monat)}, ${h.a('pflegehilfsmittel', 'care aids')} up to ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} and ${h.a('tagespflege', 'day care')} up to ${h.eur(P.tagespflege['3'])}. Day care does not reduce the allowance. Two days a week at a day centre give the main carer real relief, which matters a great deal if that carer is also working or travelling between countries.</p>
<!--mini:kombiSchnell-->

<h2>Over a year</h2>
${h.table(['Benefit at grade 3', 'Month', 'Year'], [
  ['Care allowance (family care only)', h.eur(nurFamilie.pflegegeld), h.eur(nurFamilie.pflegegeld * 12)],
  ['Relief amount', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat * 12)],
  ['Consumable care aids', h.eur(P.pflegehilfsmittel.verbrauch_monat), h.eur(P.pflegehilfsmittel.verbrauch_monat * 12)],
  ['Respite and short-term care', '–', h.eur(P.jahresbetrag.euro)],
  ['Total', h.eur(nurFamilie.gesamt), h.eur(nurFamilie.jahrGesamt)],
], 'Excluding day care and home adaptation grants.', ['l', 'r', 'r'])}
<p>The joint annual budget of ${h.eur(P.jahresbetrag.euro)} is the largest item after the allowance and the one most often left unused (${h.src('sgb11_42a', 'section 42a SGB XI')}). It pays for a replacement carer while the main carer is on holiday or ill, and for a temporary bed in a care facility. During that time half the allowance continues, just under ${h.eur(P.pflegegeld['3'] / 2)} a month at grade 3. Plan it with the ${h.a('verhinderungspflege', 'respite and short-term care calculator')}.</p>

<h2>Grade 3 in a care home</h2>
<p>In a home the allowance stops. The fund pays ${h.eur(P.vollstationaer['3'])} to the home plus a supplement on the care co-payment. Within one home the co-payment is the same for grades 2 to 5, so a higher grade makes the home more expensive for the fund, not for the family. The national average co-payment in the first year was ${h.eur(heim.eigenanteil)} a month (vdek, 1 July 2026). The ${h.a('pflegeheim-kosten', 'care home calculator')} shows it for each state.</p>

<h2>If the decision looks wrong</h2>
<p>Families who expect grade 3 often first receive grade 2, because help that is really needed was scored as independent: reminders to drink, sorting out clothes, night-time restlessness that did not happen on the day of the visit. You have one month to ${h.a('widerspruch-pflegegrad', 'object')}. A two-week care diary listing every intervention with the time is the strongest evidence. If the condition got worse later, file a ${h.a('hoeherstufung-pflegegrad', 'request for a higher grade')} instead.</p>

<h2>For the carer</h2>
<p>At grade 3 the fund pays pension contributions for a relative who cares at least ten hours a week over two days; with allowance only, one year adds ${h.eur(rente.renteProJahr, 2)} of monthly pension (${h.a('rente-pflegende-angehoerige', 'carer pension calculator')}). A relative who takes no money for caring can claim the ${h.a('pflege-pauschbetrag', 'carer’s tax lump sum')} of ${h.eur(pb.voll)} on a German tax return.</p>
`,
  },
});
