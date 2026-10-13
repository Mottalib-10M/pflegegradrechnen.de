import { defineGuide } from '../../lib/guide-types';
import { jahr, kombination } from '../../lib/engine/leistungen';
import { rentenpunkte, pauschbetrag } from '../../lib/engine/angehoerige';
import { gradAusPunkten } from '../../lib/engine/nba';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Grad 5 nur Familie; Pflegedienst für 1.800 €; Rente bei reinem Pflegegeld; Kind unter 18 Monaten mit 70 Punkten. */
const fam = jahr({ grad: 5, versorgung: 'angehoerige' });
const k1800 = kombination(5, 1800);
const rente = rentenpunkte(5, 'geld');
const rente10 = rentenpunkte(5, 'geld', 1, 10);
const pb = pauschbetrag(5);
const S = P.nba.schwellen;
const kind = gradAusPunkten(70, true);

export default defineGuide({
  id: 'pflegegrad-5',
  group: 'grad',
  order: 60,
  mini: 'gradGeld',
  miniDefaults: { g: 5 },
  related: ['pflegegrad-4', 'rente-pflegende-angehoerige', 'kombinationsleistung', 'pflegegrad-kinder', 'pflegeheim-kosten', 'pflege-pauschbetrag'],
  sources: ['sgb11_15', 'sgb11_37', 'sgb11_36', 'sgb6_166', 'estg33b', 'sgb11_43'],
  de: {
    slug: 'pflegegrad-5',
    nav: 'Pflegegrad 5',
    card: `Höchster Grad: ${DE.eur(P.pflegegeld['5'])} Pflegegeld, ${DE.eur(P.sachleistung['5'])} Sachleistung und fast ein Rentenpunkt pro Pflegejahr.`,
    title: 'Pflegegrad 5: wie viel Geld 2026, Voraussetzungen, Rente',
    description: `Pflegegrad 5 ab ${DE.num(S[4])} Punkten oder bei besonderer Bedarfslage: ${DE.eur(P.pflegegeld['5'])} Pflegegeld oder ${DE.eur(P.sachleistung['5'])} Sachleistung im Monat 2026 und hohe Rentenbeiträge für Angehörige.`,
    h1: 'Pflegegrad 5: Leistungen und Rente beim höchsten Grad',
    intro: 'Der Grad für Menschen, die vollständig auf Hilfe angewiesen sind. Was er 2026 bringt, wie man ihn auch unter 90 Punkten erreicht und was er für die pflegende Familie bedeutet.',
    resume: `Pflegegrad 5 erhält, wer im Gutachten ${DE.num(S[4])} bis 100 Gesamtpunkte erreicht, schwerste Beeinträchtigungen mit besonderen Anforderungen an die Versorgung (§ 15 Abs. 3 SGB XI). Daneben kann der Medizinische Dienst Menschen mit einer besonderen Bedarfskonstellation auch unter ${DE.num(S[4])} Punkten Pflegegrad 5 zuordnen (§ 15 Abs. 4). Die Pflegekasse zahlt 2026 ${DE.eur(P.pflegegeld['5'])} Pflegegeld im Monat oder Sachleistungen bis ${DE.eur(P.sachleistung['5'])}; ein Pflegedienst für ${DE.eur(1800)} verbraucht ${DE.pct(k1800.anteil, 1)} davon, sodass ${DE.eur(k1800.pflegegeld, 2)} Pflegegeld bleiben. Hinzu kommen Tages- und Nachtpflege bis ${DE.eur(P.tagespflege['5'])}, Entlastungsbetrag, Hilfsmittel und der Jahresbetrag von ${DE.eur(P.jahresbetrag.euro)}. Bei reiner Familienpflege sind das ${DE.eur(fam.jahrGesamt)} im Jahr. Für die Hauptpflegeperson zahlt die Kasse Rentenbeiträge auf die volle Bezugsgröße: ein Jahr Pflege bringt ${DE.num(rente.punkteJahr, 4)} Entgeltpunkte und ${DE.eur(rente.renteProJahr, 2)} Monatsrente. Im Heim gehen ${DE.eur(P.vollstationaer['5'])} an die Einrichtung.`,
    faqs: [
      { q: 'Was ist eine besondere Bedarfskonstellation bei Pflegegrad 5?', a: 'So nennt § 15 Abs. 4 SGB XI Fälle mit einem außergewöhnlich hohen Hilfebedarf und besonderen Anforderungen an die Pflege, die aus fachlichen Gründen Pflegegrad 5 bekommen, auch wenn die Gesamtpunkte unter 90 liegen. Welche Lagen das sind, legt der Medizinische Dienst Bund in seinen Begutachtungsrichtlinien fest. Fragen Sie im Gutachten ausdrücklich danach, wenn Arme und Beine kaum noch einsetzbar sind.' },
      { q: 'Wie viel Rente bringt die Pflege eines Angehörigen mit Pflegegrad 5?', a: `Bei reinem Pflegegeld zahlt die Pflegekasse Beiträge auf 100 Prozent der Bezugsgröße von ${DE.eur(P.rente.bezugsgroesse_monat)} im Monat (§ 166 Abs. 2 SGB VI). Das ergibt ${DE.num(rente.punkteJahr, 4)} Entgeltpunkte pro Jahr, fast so viel wie ein Jahr Arbeit zum Durchschnittslohn. Nach zehn Jahren Pflege sind das ${DE.eur(rente10.rente, 2)} Monatsrente nach heutigem Wert.` },
      { q: 'Lohnt sich bei Pflegegrad 5 die Pflege zu Hause noch?', a: 'Finanziell oft ja, weil Pflegegeld, Sachleistung, Nachtpflege und Jahresbetrag zusammen sehr viel abdecken und die Familie keinen Heim-Eigenanteil zahlt. Praktisch hängt es davon ab, ob die Pflege rund um die Uhr gesichert ist, auch nachts. Ohne Pflegedienst, Nachtpflege und regelmäßige Auszeiten überfordert Pflegegrad 5 die meisten Angehörigen.' },
      { q: 'Wie wird ein Baby oder Kleinkind in Pflegegrad 5 eingestuft?', a: `Bei Kindern bis 18 Monaten gelten eigene Schwellen (§ 15 Abs. 7 SGB XI): Schon ab 70 Gesamtpunkten gibt es Pflegegrad ${kind}. Der Grund ist, dass die Selbstversorgung bei Säuglingen kaum bewertbar ist; stattdessen zählen gravierende Probleme bei der Nahrungsaufnahme. Ab 18 Monaten gilt die übliche Einstufung im Vergleich mit gleichaltrigen gesunden Kindern.` },
      { q: 'Gibt es bei Pflegegrad 5 einen höheren Pflege-Pauschbetrag?', a: `Der Pflege-Pauschbetrag beträgt bei Pflegegrad 4 und 5 gleichermaßen ${DE.eur(pb.voll)} im Jahr (§ 33b Abs. 6 EStG). Ihn kann geltend machen, wer die Person persönlich und unentgeltlich pflegt; mehrere Pflegepersonen teilen ihn. Daneben kann die gepflegte Person selbst den Behinderten-Pauschbetrag haben, wenn ein Grad der Behinderung festgestellt ist.` },
    ],
    body: (h) => `
<h2>Wer Pflegegrad 5 bekommt</h2>
<p>Pflegegrad 5 beschreibt Menschen, die in nahezu allen Bereichen vollständig auf Hilfe angewiesen sind: bettlägerig oder nur mit Lifter mobil, ohne Kontrolle über Blase und Darm, oft mit Sonde oder mit einer Demenz im Endstadium, die keine Verständigung mehr erlaubt. Rechnerisch braucht es ${h.num(S[4])} von 100 Punkten. Weil Module 2 und 3 nur mit dem höheren Wert zählen und jedes Modul eine Obergrenze hat, gelingt das nur, wenn fast überall der höchste Punktbereich erreicht wird (${h.src('sgb11_15', '§ 15 SGB XI')}).</p>
<p>Für einige Lagen sieht das Gesetz einen zweiten Weg vor: Die besondere Bedarfskonstellation nach § 15 Abs. 4. Hier ordnet der Medizinische Dienst Pflegegrad 5 aus fachlichen Gründen zu, obwohl die Punkte darunter liegen, weil die Pflege außergewöhnlich aufwendig ist. Die Kriterien stehen in den Begutachtungsrichtlinien des Medizinischen Dienstes Bund. Wer meint, dass eine solche Lage vorliegt, sollte das vor dem Hausbesuch schriftlich schildern.</p>

<h2>Leistungen bei Pflegegrad 5</h2>
${h.table(['Leistung bei Pflegegrad 5', 'Monat', 'Jahr'], [
  ['Pflegegeld (nur Angehörige)', h.eur(P.pflegegeld['5']), h.eur(P.pflegegeld['5'] * 12)],
  ['oder Sachleistung bis', h.eur(P.sachleistung['5']), h.eur(P.sachleistung['5'] * 12)],
  ['Tages- und Nachtpflege bis (zusätzlich)', h.eur(P.tagespflege['5']), h.eur(P.tagespflege['5'] * 12)],
  ['Entlastungsbetrag', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat * 12)],
  ['Pflegehilfsmittel zum Verbrauch', h.eur(P.pflegehilfsmittel.verbrauch_monat), h.eur(P.pflegehilfsmittel.verbrauch_monat * 12)],
  ['Verhinderungs- und Kurzzeitpflege', '–', h.eur(P.jahresbetrag.euro)],
  ['Pflegeheim: Betrag an die Einrichtung', h.eur(P.vollstationaer['5']), h.eur(P.vollstationaer['5'] * 12)],
], 'Höchstbeträge 2026 nach SGB XI; Pflegegeld nach § 37, Sachleistung nach § 36.', ['l', 'r', 'r'])}
<p>Bei Pflegegrad 5 lohnt sich die genaue Planung, weil die Töpfe groß sind und sich gut ergänzen. Ein Pflegedienst für die Grundpflege morgens und abends rechnet bei diesem Grad leicht ${h.eur(1800)} ab; das sind ${h.pct(k1800.anteil, 1)} der Sachleistung, vom Pflegegeld bleiben ${h.eur(k1800.pflegegeld, 2)}. Die Nachtpflege aus dem Tagespflegetopf und der Entlastungsbetrag kommen ohne Abzug hinzu.</p>
<!--mini:kombiSchnell-->

<h2>Die Rente der pflegenden Person</h2>
<p>Bei Pflegegrad 5 ist die soziale Absicherung der Pflegeperson am höchsten. Wer mindestens zehn Stunden pro Woche an zwei Tagen pflegt und höchstens 30 Stunden arbeitet, für den zahlt die Kasse Beiträge auf die volle Bezugsgröße, wenn nur Pflegegeld bezogen wird, auf 85 Prozent bei der Kombination und auf 70 Prozent bei reiner Sachleistung (${h.src('sgb6_166', '§ 166 Abs. 2 SGB VI')}). Ein Jahr mit reinem Pflegegeld bringt ${h.num(rente.punkteJahr, 4)} Entgeltpunkte, das sind ${h.eur(rente.renteProJahr, 2)} Monatsrente ab Juli 2026. Wer zehn Jahre einen Elternteil oder den Partner pflegt, erwirbt damit ${h.eur(rente10.rente, 2)} Rente im Monat. Teilen sich mehrere Angehörige die Pflege, wird der Wert nach dem jeweiligen Anteil aufgeteilt. Der ${h.a('rente-pflegende-angehoerige', 'Rentenrechner')} zeigt alle Varianten.</p>

<h2>Steuer</h2>
<p>Der ${h.a('pflege-pauschbetrag', 'Pflege-Pauschbetrag')} beträgt bei Pflegegrad 5 ${h.eur(pb.voll)} im Jahr, ebenso viel wie bei Pflegegrad 4 (${h.src('estg33b', '§ 33b Abs. 6 EStG')}). Er steht nur zu, wer für die Pflege kein Geld bekommt. Gibt die gepflegte Person ihr Pflegegeld an die pflegende Tochter weiter, ist dieses zwar steuerfrei, aber der Pauschbetrag entfällt. Die Familie sollte also vergleichen: ${h.eur(P.pflegegeld['5'] * 12)} steuerfreies Pflegegeld im Jahr gegen die Steuerersparnis aus ${h.eur(pb.voll)} Pauschbetrag.</p>

<h2>Kinder mit Pflegegrad 5</h2>
<p>Bei Kindern wird mit gleichaltrigen gesunden Kindern verglichen. Für Kinder bis 18 Monate gelten niedrigere Schwellen, damit schwer kranke Säuglinge nicht unter die Grenze fallen: Bei ihnen genügen 70 Punkte für Pflegegrad ${kind} (${h.src('sgb11_15', '§ 15 Abs. 7 SGB XI')}). Eltern können das Pflegegeld erhalten und weitergeben, ohne dass es steuerpflichtig wird. Mehr unter ${h.a('pflegegrad-kinder', 'Pflegegrad für Kinder')}.</p>

<h2>Pflegegrad 5 im Heim</h2>
<p>Im Pflegeheim zahlt die Kasse bei Pflegegrad 5 ${h.eur(P.vollstationaer['5'])} an die Einrichtung (${h.src('sgb11_43', '§ 43 SGB XI')}). Der Eigenanteil der Familie ist trotzdem derselbe wie bei Pflegegrad 2, weil jedes Heim einen einheitlichen Eigenanteil für alle Grade berechnet. Im Bundesschnitt waren das im ersten Jahr ${h.eur(P.heim.bund.mit15)} im Monat. Für Menschen mit sehr hohem Bedarf gibt es außerdem spezialisierte Einrichtungen, etwa für Beatmung; deren Preise weichen stark ab. Der ${h.a('pflegeheim-kosten', 'Pflegeheim-Rechner')} rechnet mit einem eigenen EEE aus dem Heimvertrag.</p>

<h2>Was die Familie zusätzlich organisieren sollte</h2>
<ul>
<li>Einen Pflegedienst mit Erfahrung in Intensiv- oder Palliativpflege, wenn der Zustand es verlangt; die Behandlungspflege zahlt dabei die Krankenkasse.</li>
<li>Nachtpflege oder eine Nachtwache, damit die Hauptpflegeperson schlafen kann.</li>
<li>Den Gemeinsamen Jahresbetrag fest im Kalender: zwei Wochen Pause im Frühjahr, zwei im Herbst.</li>
<li>Pflegehilfsmittel wie Pflegebett, Lifter und Antidekubitusmatratze früh beantragen; die Kasse muss in drei Wochen entscheiden.</li>
<li>Eine Vorsorgevollmacht und eine Patientenverfügung, falls sie noch fehlen, damit Angehörige gegenüber Kasse, Ärzten und Heim handeln können; ohne sie muss oft erst ein Betreuungsgericht eine rechtliche Betreuung einrichten.</li>
<li>Den Pflegestützpunkt für eine Fallberatung, wenn mehrere Dienste, Ärzte und Hilfsmittelversorger zusammenarbeiten müssen.</li>
</ul>
`,
  },
  en: {
    slug: 'care-grade-5',
    nav: 'Care grade 5',
    card: `The top grade: ${EN.eur(P.pflegegeld['5'])} allowance, ${EN.eur(P.sachleistung['5'])} in services and almost one pension point per year of caring.`,
    title: 'Care Grade 5 Germany 2026: Pflegegeld, Criteria, Pension',
    description: `German care grade 5 (Pflegegrad 5) from ${EN.num(S[4])} points or with special needs: ${EN.eur(P.pflegegeld['5'])} allowance or ${EN.eur(P.sachleistung['5'])} in services a month in 2026, plus a high carer pension.`,
    h1: 'German care grade 5: benefits and pension at the top grade',
    intro: 'The grade for people who depend on help for everything. What it pays in 2026, how it can be reached below 90 points and what it means for the family caring.',
    resume: `German care grade 5 (Pflegegrad 5) applies at ${EN.num(S[4])} to 100 total points, the most severe limitations with special demands on care under section 15(3) of Book XI of the Social Code. In addition, the Medical Service can assign grade 5 below ${EN.num(S[4])} points where a special needs constellation exists (section 15(4)). In 2026 the long-term care fund pays ${EN.eur(P.pflegegeld['5'])} a month in care allowance or services worth up to ${EN.eur(P.sachleistung['5'])}; a care service billing ${EN.eur(1800)} uses ${EN.pct(k1800.anteil, 1)} of that budget and leaves ${EN.eur(k1800.pflegegeld, 2)} of allowance. Day and night care up to ${EN.eur(P.tagespflege['5'])}, the relief amount, care aids and the ${EN.eur(P.jahresbetrag.euro)} annual respite budget come on top. With family care only that is ${EN.eur(fam.jahrGesamt)} a year. For the main carer the fund pays pension contributions on the full reference value: one year of caring earns ${EN.num(rente.punkteJahr, 4)} pension points and ${EN.eur(rente.renteProJahr, 2)} of monthly pension. In a care home ${EN.eur(P.vollstationaer['5'])} goes to the home.`,
    faqs: [
      { q: 'What is a special needs constellation for grade 5?', a: 'Section 15(4) SGB XI uses the term for cases with an exceptionally high need for help and special demands on care, which receive grade 5 for professional reasons even below 90 points. The national Medical Service sets out which situations qualify in its assessment guidelines. If your relative can barely use arms and legs, raise it explicitly at the assessment.' },
      { q: 'How much German pension does caring at grade 5 earn?', a: `With allowance only, the fund pays contributions on 100 percent of the reference value of ${EN.eur(P.rente.bezugsgroesse_monat)} a month (section 166(2) SGB VI). That earns ${EN.num(rente.punkteJahr, 4)} pension points a year, nearly as much as a year of work at average pay. After ten years it adds ${EN.eur(rente10.rente, 2)} of monthly pension at today’s value.` },
      { q: 'Can we still manage grade 5 at home?', a: 'Financially it often works, because allowance, services, night care and the annual budget together cover a lot and there is no care home co-payment. In practice it depends on whether care is secured around the clock, including nights. Without a care service, night care and regular breaks, grade 5 overwhelms most families, especially when the main carer is a single relative.' },
      { q: 'How are babies assessed for care grade 5?', a: `Children up to 18 months have their own thresholds (section 15(7) SGB XI): from 70 points they already receive grade ${kind}. Self-care can hardly be assessed in infants, so serious feeding problems count instead. From 18 months the usual scale applies, comparing the child with healthy children of the same age.` },
    ],
    body: (h) => `
<h2>Who receives grade 5</h2>
<p>Grade 5 describes people who depend completely on help in nearly every area: bedbound or mobile only with a hoist, without bladder or bowel control, often tube-fed, or with end-stage dementia that rules out communication. Arithmetically ${h.num(S[4])} of 100 points are needed. Because modules 2 and 3 only count with the higher value and every module has a cap, that only happens when almost every module reaches its top band (${h.src('sgb11_15', 'section 15 SGB XI')}).</p>
<p>The law adds a second route, the special needs constellation of section 15(4): the Medical Service assigns grade 5 for professional reasons although the points fall short, because care is exceptionally demanding. The criteria are in the national Medical Service assessment guidelines. If you think this applies, describe it in writing before the visit.</p>

<h2>Benefits at grade 5</h2>
${h.table(['Benefit at grade 5', 'Month', 'Year'], [
  ['Care allowance (family only)', h.eur(P.pflegegeld['5']), h.eur(P.pflegegeld['5'] * 12)],
  ['or services up to', h.eur(P.sachleistung['5']), h.eur(P.sachleistung['5'] * 12)],
  ['Day or night care up to (additional)', h.eur(P.tagespflege['5']), h.eur(P.tagespflege['5'] * 12)],
  ['Relief amount', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat * 12)],
  ['Consumable care aids', h.eur(P.pflegehilfsmittel.verbrauch_monat), h.eur(P.pflegehilfsmittel.verbrauch_monat * 12)],
  ['Respite and short-term care', '–', h.eur(P.jahresbetrag.euro)],
  ['Care home: amount paid to the home', h.eur(P.vollstationaer['5']), h.eur(P.vollstationaer['5'] * 12)],
], 'Maximum amounts for 2026 under SGB XI; allowance under section 37, services under section 36.', ['l', 'r', 'r'])}
<p>Planning pays off at grade 5, because the budgets are large and complement each other. A care service for morning and evening personal care easily bills ${h.eur(1800)}: ${h.pct(k1800.anteil, 1)} of the services budget, leaving ${h.eur(k1800.pflegegeld, 2)} of allowance. Night care from the day care budget and the relief amount come on top without any deduction.</p>
<!--mini:kombiSchnell-->

<h2>The carer’s pension</h2>
<p>Social security for the carer is highest at grade 5. For a carer caring at least ten hours a week over two days and working no more than 30 hours, the fund pays contributions on the full reference value when only the allowance is drawn, 85 percent with the combined benefit and 70 percent with services only (${h.src('sgb6_166', 'section 166(2) SGB VI')}). One year with allowance only earns ${h.num(rente.punkteJahr, 4)} points, ${h.eur(rente.renteProJahr, 2)} of monthly pension from July 2026; ten years caring for a parent or partner add ${h.eur(rente10.rente, 2)} a month. For an adult child who moved back to Germany to care, these years count fully towards a German pension. See the ${h.a('rente-pflegende-angehoerige', 'carer pension calculator')}.</p>

<h2>Tax</h2>
<p>The ${h.a('pflege-pauschbetrag', 'carer’s lump sum')} at grade 5 is ${h.eur(pb.voll)} a year, the same as at grade 4 (${h.src('estg33b', 'section 33b(6) Income Tax Act')}). Only someone who receives no money for caring can claim it. If the allowance is passed on to the daughter who cares, it is tax-free for her but the lump sum is lost, so compare ${h.eur(P.pflegegeld['5'] * 12)} of tax-free allowance a year with the tax saved by the ${h.eur(pb.voll)} deduction.</p>

<h2>Children at grade 5</h2>
<p>Children are compared with healthy children of the same age. Up to 18 months lower thresholds apply so that very ill infants do not fall below the line: 70 points are enough for grade ${kind} (${h.src('sgb11_15', 'section 15(7) SGB XI')}). See ${h.a('pflegegrad-kinder', 'care grades for children')}.</p>

<h2>Grade 5 in a care home</h2>
<p>In a care home the fund pays ${h.eur(P.vollstationaer['5'])} to the home (${h.src('sgb11_43', 'section 43 SGB XI')}). The family’s co-payment is still the same as at grade 2, because each home charges one uniform co-payment for all grades; the national average was ${h.eur(P.heim.bund.mit15)} a month in year one. Specialised facilities, for example for ventilated patients, charge very different prices; the ${h.a('pflegeheim-kosten', 'care home calculator')} accepts the EEE from a specific contract.</p>

<h2>What else the family should organise</h2>
<ul>
<li>A care service experienced in intensive or palliative care where needed; medical treatment care is paid by the health insurer.</li>
<li>Night care or a night sitter so the main carer can sleep.</li>
<li>The joint annual budget booked in advance: two weeks’ break in spring, two in autumn.</li>
<li>Care aids such as a care bed, hoist and pressure-relief mattress applied for early; the fund must decide within three weeks.</li>
<li>A lasting power of attorney (Vorsorgevollmacht) and an advance directive if they are missing, so relatives can act towards the fund, doctors and the home; without them a guardianship court often has to appoint a legal guardian first.</li>
<li>A case conference at the Pflegestützpunkt when several services, doctors and aid suppliers need to work together, which is easier to arrange while a relative from abroad is in Germany.</li>
</ul>
`,
  },
});
