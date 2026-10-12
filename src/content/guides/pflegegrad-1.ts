import { defineGuide } from '../../lib/guide-types';
import { jahr, wohnumfeld } from '../../lib/engine/leistungen';
import { gradAusPunkten } from '../../lib/engine/nba';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: was Pflegegrad 1 im Jahr bringt; ein Badumbau für 6.500 €. */
const j1 = jahr({ grad: 1, versorgung: 'angehoerige' });
const bad = wohnumfeld(6500, 1);
const S = P.nba.schwellen;
const E = P.entlastungsbetrag.monat;

export default defineGuide({
  id: 'pflegegrad-1',
  group: 'grad',
  order: 20,
  mini: 'grad1',
  related: ['pflegegrad-2', 'entlastungsbetrag', 'pflegehilfsmittel', 'wohnumfeldverbesserung', 'pflegegrad-rechner', 'hoeherstufung-pflegegrad'],
  sources: ['sgb11_28a', 'sgb11_15', 'sgb11_45b', 'sgb11_40', 'sgb11_43'],
  de: {
    slug: 'pflegegrad-1',
    nav: 'Pflegegrad 1',
    card: `Kein Pflegegeld, aber ${DE.eur(E)} Entlastungsbetrag, Hilfsmittel und bis ${DE.eur(P.wohnumfeld.je_massnahme)} für den Umbau: was Grad 1 bringt.`,
    title: 'Pflegegrad 1 Leistungen 2026: was zusteht, ohne Pflegegeld',
    description: `Pflegegrad 1 Leistungen 2026: kein Pflegegeld, aber ${DE.eur(E)} Entlastungsbetrag im Monat, Pflegehilfsmittel ${DE.eur(P.pflegehilfsmittel.verbrauch_monat)}, Umbau bis ${DE.eur(P.wohnumfeld.je_massnahme)} und Beratung. Ab ${DE.num(S[0], 1)} Punkten.`,
    h1: 'Pflegegrad 1: welche Leistungen es ohne Pflegegeld gibt',
    intro: 'Der Einstiegsgrad bringt kein Geld aufs Konto, aber mehrere Budgets, die viele nicht kennen. Hier steht, welche es sind und wie man sie abruft.',
    resume: `Pflegegrad 1 erhält, wer im Gutachten ${DE.num(S[0], 1)} bis unter ${DE.num(S[1])} Gesamtpunkte erreicht; das Gesetz spricht von geringen Beeinträchtigungen der Selbständigkeit (§ 15 Abs. 3 SGB XI). Anders als ab Pflegegrad 2 gibt es kein Pflegegeld, keine Pflegesachleistung, keine Tagespflege und keinen Jahresbetrag für Verhinderungs- und Kurzzeitpflege. Die Leistungen stehen abschließend in § 28a SGB XI: vor allem der Entlastungsbetrag von ${DE.eur(E)} im Monat, der bei Pflegegrad 1 auch für die Körperpflege durch einen Pflegedienst eingesetzt werden darf, Pflegehilfsmittel zum Verbrauch bis ${DE.eur(P.pflegehilfsmittel.verbrauch_monat)} im Monat, Zuschüsse bis ${DE.eur(P.wohnumfeld.je_massnahme)} je Maßnahme für den Umbau der Wohnung, Pflegeberatung, Pflegekurse für Angehörige, digitale Pflegeanwendungen und im Heim ein Zuschuss von ${DE.eur(P.vollstationaer['1'])}. Zusammen mit den Hilfsmitteln ergeben die laufenden Leistungen ${DE.eur(j1.jahrGesamt)} im Jahr. Wer einen Badumbau für ${DE.eur(6500)} plant, bekommt davon ${DE.eur(bad.zuschuss)} erstattet.`,
    faqs: [
      { q: 'Warum gibt es bei Pflegegrad 1 kein Pflegegeld?', a: `Weil der Gesetzgeber Pflegegrad 1 als Grad für geringe Einschränkungen angelegt hat, bei dem es vor allem darum geht, die Selbständigkeit zu erhalten. Die Leistungen sind deshalb auf Beratung, Hilfsmittel, Umbau und Entlastung ausgerichtet (§ 28a SGB XI). Pflegegeld beginnt erst ab Pflegegrad 2, also ab ${DE.num(S[1])} Punkten.` },
      { q: 'Darf der Entlastungsbetrag bei Pflegegrad 1 für das Duschen genutzt werden?', a: 'Ja. Die Einschränkung, dass der Entlastungsbetrag nicht für Leistungen der Selbstversorgung durch Pflegedienste genutzt werden darf, gilt nach § 45b Abs. 1 SGB XI nur in den Pflegegraden 2 bis 5. Bei Pflegegrad 1 darf ein zugelassener Pflegedienst also auch beim Waschen, Duschen oder Anziehen helfen und über den Entlastungsbetrag abrechnen.' },
      { q: 'Bekommen pflegende Angehörige bei Pflegegrad 1 Rentenpunkte?', a: 'Nein. Die Rentenbeiträge der Pflegekasse für Pflegepersonen setzen voraus, dass sie jemanden mit mindestens Pflegegrad 2 pflegen (§ 44 SGB XI). Auch der Pflege-Pauschbetrag in der Steuererklärung beginnt erst bei Pflegegrad 2. Angehörige können bei Pflegegrad 1 aber kostenlose Pflegekurse besuchen und die kurzzeitige Arbeitsverhinderung mit Pflegeunterstützungsgeld nutzen.' },
      { q: 'Was zahlt die Pflegekasse bei Pflegegrad 1 im Pflegeheim?', a: `Einen Zuschuss von ${DE.eur(P.vollstationaer['1'])} im Monat zu den pflegebedingten Kosten (§ 43 Abs. 3 SGB XI). Einen Leistungszuschlag auf den Eigenanteil gibt es nicht, und der Pflegesatz für Pflegegrad 1 ist hausindividuell. Für die meisten Menschen mit Pflegegrad 1 ist ein Heim deshalb finanziell kaum tragbar und auch nicht nötig.` },
      { q: 'Wann lohnt sich ein neuer Antrag auf Pflegegrad 2?', a: `Sobald sich der Bedarf erkennbar erhöht hat, etwa nach einem Sturz, einem Krankenhausaufenthalt oder wenn Hilfe beim Duschen und Anziehen regelmäßig nötig wird. Der Sprung auf Pflegegrad 2 bringt ${DE.eur(P.pflegegeld['2'])} Pflegegeld im Monat und den Jahresbetrag von ${DE.eur(P.jahresbetrag.euro)}. Der Antrag auf Höherstufung ist formlos.` },
    ],
    body: (h) => `
<h2>Wer Pflegegrad 1 bekommt</h2>
<p>Zwischen ${h.num(S[0], 1)} und ${h.num(S[1])} Punkten liegen Menschen, die ihren Alltag weitgehend selbst bewältigen, aber an einzelnen Stellen Hilfe brauchen. Typisch ist die ältere Frau, die nach einer Knie-OP nicht mehr in die Badewanne steigt, die Treppe nur mit Mühe schafft und ihre Tabletten manchmal vergisst. Oder der Mann mit Parkinson im Frühstadium, der sich noch selbst anzieht, aber beim Einkaufen und bei Arztterminen Begleitung braucht. Wer weniger als ${h.num(S[0], 1)} Punkte erreicht, bekommt keinen Pflegegrad: Bei ${h.num(12)} Punkten ergibt die Bewertung Grad ${gradAusPunkten(12)}, also keinen Anspruch.</p>
<p>Gerade bei Pflegegrad 1 lohnt ein genauer Blick ins Gutachten. Wer knapp unter ${h.num(S[1])} Punkten liegt, ist oft näher an Pflegegrad 2, als die Familie denkt; der ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} zeigt den Abstand.</p>

<h2>Alle Leistungen nach § 28a</h2>
${h.table(['Leistung bei Pflegegrad 1', 'Höhe', 'Paragraf'], [
  ['Entlastungsbetrag (auch für Körperpflege)', `${h.eur(E)} im Monat`, '§ 45b'],
  ['Pflegehilfsmittel zum Verbrauch', `bis ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} im Monat`, '§ 40 Abs. 2'],
  ['Technische Pflegehilfsmittel', `Zuzahlung 10 %, höchstens ${h.eur(P.pflegehilfsmittel.zuzahlung_max)}`, '§ 40 Abs. 3'],
  ['Wohnumfeldverbesserung', `bis ${h.eur(P.wohnumfeld.je_massnahme)} je Maßnahme`, '§ 40 Abs. 4'],
  ['Digitale Pflegeanwendungen', `bis ${h.eur(P.dipa.anwendung)} plus ${h.eur(P.dipa.unterstuetzung)} Unterstützung`, '§§ 39a, 40b'],
  ['Wohngruppenzuschlag', `${h.eur(P.wohngruppe.zuschlag)} im Monat`, '§ 45f'],
  ['Zuschuss bei vollstationärer Pflege', `${h.eur(P.vollstationaer['1'])} im Monat`, '§ 43 Abs. 3'],
  ['Pflegeberatung, Beratung zu Hause, Pflegekurse', 'kostenlos', '§§ 7a, 37 Abs. 3, 45'],
], `Abschließende Aufzählung in ${h.src('sgb11_28a', '§ 28a SGB XI')}.`, ['l', 'l', 'l'])}

<h2>Der Entlastungsbetrag als wichtigste Leistung</h2>
<p>Bei Pflegegrad 1 ist der ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} die einzige laufende Geldleistung, und er ist flexibler als bei den höheren Graden. Ein Pflegedienst darf damit auch bei der Körperpflege helfen. Mit ${h.eur(E)} im Monat lassen sich je nach Region etwa zwei bis drei Einsätze eines Dienstes oder mehrere Stunden einer anerkannten Alltagshilfe bezahlen. Wer im Frühjahr wenig braucht, kann den Betrag ansammeln und später einsetzen; Reste sind bis zum 30. Juni des Folgejahres nutzbar.</p>
<!--mini:entlastungRest-->

<h2>Hilfsmittel und Umbau</h2>
<p>Die ${h.a('pflegehilfsmittel', 'Pflegehilfsmittel')} zum Verbrauch, also Einmalhandschuhe, Bettschutzeinlagen und Desinfektionsmittel, gibt es bis ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} im Monat ohne Zuzahlung; viele Familien lassen sich eine monatliche Box liefern. Technische Hilfsmittel wie ein Hausnotruf oder ein Pflegebett werden meist leihweise überlassen. Für einen Umbau, der die Pflege erleichtert oder ein selbständiges Leben ermöglicht, etwa eine bodengleiche Dusche, Haltegriffe oder ein Treppenlift, zahlt die Kasse bis ${h.eur(P.wohnumfeld.je_massnahme)} je Maßnahme (${h.src('sgb11_40', '§ 40 Abs. 4 SGB XI')}). Bei einem Badumbau für ${h.eur(6500)} bleiben ${h.eur(bad.selbst)} bei der Familie. Mehr unter ${h.a('wohnumfeldverbesserung', 'Wohnumfeldverbesserung')}.</p>

<h2>Was es bei Pflegegrad 1 nicht gibt</h2>
<p>Kein Pflegegeld, keine Sachleistung für einen Pflegedienst über den Entlastungsbetrag hinaus, keine Tages- und Nachtpflege aus eigenem Topf und kein Gemeinsamer Jahresbetrag für Verhinderungs- und Kurzzeitpflege. Auch Rentenbeiträge für pflegende Angehörige und der Pflege-Pauschbetrag beginnen erst bei Pflegegrad 2. Wer Kurzzeitpflege braucht, etwa nach einem Krankenhausaufenthalt, kann sie über den Entlastungsbetrag teilweise bezahlen oder, solange kein Pflegegrad 2 vorliegt, über die Krankenkasse erhalten.</p>

<h2>Was Angehörige bei Pflegegrad 1 schon nutzen können</h2>
<p>Auch wenn die soziale Absicherung pflegender Angehöriger erst bei Pflegegrad 2 beginnt, gibt es bei Pflegegrad 1 zwei Rechte für die Familie. Erstens kostenlose Pflegekurse, auch als Schulung zu Hause, in denen ein Pflegedienst zeigt, wie man beim Aufstehen hilft, ohne sich den Rücken zu ruinieren, oder wie man Stürzen vorbeugt (§ 45 SGB XI). Zweitens die kurzzeitige Arbeitsverhinderung: Tritt eine Pflegesituation plötzlich auf, dürfen Beschäftigte bis zu zehn Arbeitstage fernbleiben, um die Versorgung zu organisieren, und erhalten dafür Pflegeunterstützungsgeld als Lohnersatz. Mehr dazu unter ${h.a('pflegezeit', 'Pflegezeit und Pflegeunterstützungsgeld')}. Gerade bei Pflegegrad 1, wenn die Lage noch überschaubar ist, lohnt es sich, diese Zeit zu nutzen, um Hilfsmittel, Umbau und eine Alltagshilfe in Ruhe aufzusetzen.</p>

<h2>Der Weg zu Pflegegrad 2</h2>
<p>Viele Menschen mit Pflegegrad 1 brauchen nach einiger Zeit mehr Hilfe. Ein Antrag auf ${h.a('hoeherstufung-pflegegrad', 'Höherstufung')} ist jederzeit möglich, wenn sich der Zustand verschlechtert hat; die Kasse beauftragt dann ein neues Gutachten. Bis dahin hilft es, den Pflegebedarf zu dokumentieren: welche Hilfe an welchem Tag nötig war. Der Unterschied ist groß, denn ${h.a('pflegegrad-2', 'Pflegegrad 2')} bringt zusätzlich ${h.eur(P.pflegegeld['2'])} Pflegegeld im Monat, ${h.eur(P.tagespflege['2'])} für Tagespflege und ${h.eur(P.jahresbetrag.euro)} im Jahr für Vertretungen.</p>

<h2>Beratung nutzen</h2>
<p>Bei Pflegegrad 1 besteht ein Anspruch auf einen Beratungsbesuch zu Hause pro Halbjahr, aber keine Pflicht. Er lohnt sich trotzdem: Die Beratungsperson kann Hilfsmittel empfehlen, die dann ohne weitere Prüfung als notwendig gelten, und Hinweise geben, ob ein höherer Grad in Betracht kommt. Pflegestützpunkte und die Pflegeberatung der Kasse sind ebenfalls kostenlos.</p>
`,
  },
  en: {
    slug: 'care-grade-1',
    nav: 'Care grade 1',
    card: `No allowance, but a ${EN.eur(E)} relief amount, care aids and up to ${EN.eur(P.wohnumfeld.je_massnahme)} for home adaptations: what grade 1 brings.`,
    title: 'Care Grade 1 Germany 2026: Benefits Without Pflegegeld',
    description: `German care grade 1 (Pflegegrad 1) benefits 2026: no allowance, but a ${EN.eur(E)} monthly relief amount, care aids of ${EN.eur(P.pflegehilfsmittel.verbrauch_monat)}, adaptations up to ${EN.eur(P.wohnumfeld.je_massnahme)} and advice.`,
    h1: 'German care grade 1: the benefits without a care allowance',
    intro: 'The entry grade pays no money into an account, but it opens several budgets many families never hear about. Here is what they are and how to claim them.',
    resume: `German care grade 1 (Pflegegrad 1) applies when the assessment produces ${EN.num(S[0], 1)} to just under ${EN.num(S[1])} total points, described in section 15(3) of Book XI of the Social Code as minor limitations of independence. Unlike grade 2 and above, there is no care allowance, no services budget, no day care budget and no annual budget for respite or short-term care. The complete list of benefits is in section 28a: above all the relief amount of ${EN.eur(E)} a month, which at grade 1 may also pay a care service for personal care such as showering, consumable care aids up to ${EN.eur(P.pflegehilfsmittel.verbrauch_monat)} a month, grants of up to ${EN.eur(P.wohnumfeld.je_massnahme)} per measure for adapting the home, care counselling, courses for relatives, digital care apps and, in a care home, a grant of ${EN.eur(P.vollstationaer['1'])}. Together with the aids, the regular benefits are worth ${EN.eur(j1.jahrGesamt)} a year. A bathroom conversion costing ${EN.eur(6500)} would be subsidised with ${EN.eur(bad.zuschuss)}.`,
    faqs: [
      { q: 'Why is there no care allowance at grade 1?', a: `Because the law designs grade 1 for minor limitations, where the aim is to preserve independence. Its benefits therefore focus on advice, aids, adaptations and relief (section 28a SGB XI). The care allowance only starts at grade 2, from ${EN.num(S[1])} points. Many parents assessed for the first time land at grade 1 and move up a year or two later.` },
      { q: 'Can the relief amount pay for help with showering at grade 1?', a: 'Yes. The rule that the relief amount may not pay a care service for self-care tasks applies only at grades 2 to 5 (section 45b(1) SGB XI). At grade 1 a registered care service may help with washing, showering or dressing and bill the relief amount. That makes it the most useful benefit at this grade.' },
      { q: 'Does caring for someone at grade 1 earn German pension points?', a: 'No. Pension contributions for carers require caring for someone with at least grade 2 (section 44 SGB XI), and the carer’s tax lump sum also starts at grade 2. Relatives can still attend free care courses and, in an acute situation, use short-term leave from work with the carer’s leave allowance.' },
      { q: 'Is it worth applying for grade 1 if my parent only needs a little help?', a: 'Usually yes. The relief amount, free consumable aids and the home adaptation grant together are worth more than many expect, and having a grade on file makes a later request for grade 2 faster. The application is free, and the assessment also gives you a written picture of where help is needed.' },
      { q: 'What does the fund pay at grade 1 in a care home?', a: `A grant of ${EN.eur(P.vollstationaer['1'])} a month towards care costs (section 43(3) SGB XI). There is no supplement on the co-payment, and the care rate for grade 1 is set by each home. For most people at grade 1 a care home is neither affordable nor necessary.` },
    ],
    body: (h) => `
<h2>Who gets grade 1</h2>
<p>Between ${h.num(S[0], 1)} and ${h.num(S[1])} points are people who largely manage daily life but need help at certain points: the woman who cannot get into the bath after knee surgery, struggles with stairs and sometimes forgets her tablets; the man with early Parkinson’s who still dresses himself but needs company for shopping and appointments. Below ${h.num(S[0], 1)} points there is no care grade at all: ${h.num(12)} points give grade ${gradAusPunkten(12)}, meaning no entitlement.</p>
<p>At grade 1 it is worth reading the report closely. Someone just under ${h.num(S[1])} points is often closer to grade 2 than the family thinks; the ${h.a('pflegegrad-rechner', 'care grade calculator')} shows the gap.</p>

<h2>Every benefit under section 28a</h2>
${h.table(['Benefit at grade 1', 'Amount', 'Section'], [
  ['Relief amount (personal care allowed)', `${h.eur(E)} a month`, '45b'],
  ['Consumable care aids', `up to ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} a month`, '40(2)'],
  ['Technical care aids', `co-payment 10%, at most ${h.eur(P.pflegehilfsmittel.zuzahlung_max)}`, '40(3)'],
  ['Home adaptation grant', `up to ${h.eur(P.wohnumfeld.je_massnahme)} per measure`, '40(4)'],
  ['Digital care apps', `up to ${h.eur(P.dipa.anwendung)} plus ${h.eur(P.dipa.unterstuetzung)} support`, '39a, 40b'],
  ['Shared-flat supplement', `${h.eur(P.wohngruppe.zuschlag)} a month`, '45f'],
  ['Grant in residential care', `${h.eur(P.vollstationaer['1'])} a month`, '43(3)'],
  ['Counselling, home advice, care courses', 'free', '7a, 37(3), 45'],
], `Exhaustive list in ${h.src('sgb11_28a', 'section 28a SGB XI')}.`, ['l', 'l', 'l'])}

<h2>The relief amount is the key benefit</h2>
<p>At grade 1 the ${h.a('entlastungsbetrag', 'relief amount')} is the only regular cash-like benefit, and it is more flexible than at higher grades: a care service may use it for personal care too. ${h.eur(E)} a month pays for roughly two or three visits by a service or several hours of a recognised everyday helper, depending on the region. Money can be saved up within the year and used until 30 June of the following year.</p>
<!--mini:entlastungRest-->

<h2>Aids and adaptations</h2>
<p>Consumable ${h.a('pflegehilfsmittel', 'care aids')} such as gloves, bed protectors and disinfectant are free up to ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} a month; many families have a box delivered monthly. Technical aids such as a care bed are usually lent. For adaptations that make care easier or independent living possible, such as a walk-in shower, grab rails or a stairlift, the fund pays up to ${h.eur(P.wohnumfeld.je_massnahme)} per measure (${h.src('sgb11_40', 'section 40(4) SGB XI')}). A bathroom conversion costing ${h.eur(6500)} leaves ${h.eur(bad.selbst)} for the family. See ${h.a('wohnumfeldverbesserung', 'home adaptation grants')}.</p>

<h2>What grade 1 does not include</h2>
<p>No allowance, no services budget beyond the relief amount, no separate day care budget and no joint annual budget for respite or short-term care. Pension contributions for carers and the carer’s tax lump sum also start at grade 2. Short-term care after a hospital stay can be partly paid from the relief amount or, as long as there is no grade 2, through the health insurer.</p>

<h2>What relatives can already use at grade 1</h2>
<p>Although social security for carers only starts at grade 2, grade 1 gives the family two rights. First, free care courses, also as training at home, where a care service shows how to help someone stand up without injuring your back or how to prevent falls (section 45 SGB XI). Second, short-term leave from work: when a care situation arises suddenly, employees in Germany may stay away for up to ten working days to organise care and receive the carer’s leave allowance as wage replacement; see ${h.a('pflegezeit', 'carer’s leave')}. While the situation is still manageable, this is the moment to set up aids, adaptations and an everyday helper calmly rather than in a crisis.</p>

<h2>The way to grade 2</h2>
<p>Many people at grade 1 need more help after a while. A ${h.a('hoeherstufung-pflegegrad', 'request for a higher grade')} is possible at any time when the condition worsens. Keep a record of which help was needed on which day. The difference is large: ${h.a('pflegegrad-2', 'grade 2')} adds ${h.eur(P.pflegegeld['2'])} of allowance a month, ${h.eur(P.tagespflege['2'])} for day care and ${h.eur(P.jahresbetrag.euro)} a year for respite.</p>

<h2>Use the advice visit</h2>
<p>At grade 1 there is a right, not an obligation, to one advice visit at home every six months. It is worth it: aids recommended by the advisor are presumed necessary, and the advisor can say whether a higher grade is likely. For relatives abroad, asking for the visit while they are in Germany is a good way to meet the people involved in their parent’s care.</p>
`,
  },
});
