import { defineGuide } from '../../lib/guide-types';
import { nba, leereEingabe, MODUL5_LEER, gradAusPunkten, type NbaEingabe } from '../../lib/engine/nba';
import { pflegegeld, sachleistung, tagespflege } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/**
 * Drei Beispiele aus dem Motor (Einstufungen je Kriterium nach Anlage 1):
 * Frau A. vergesslich und ruhig, Herr B. mit Unruhe und nächtlichem Umherlaufen, Frau C. fortgeschritten.
 * Dazu jeweils das Ergebnis, wenn nur Modul 2 zählen würde.
 */
const mk = (e: Partial<NbaEingabe>) => {
  const r = nba({ ...leereEingabe(), ...e });
  const nurM2 = r.gesamt - r.gewichtet.m23 + r.gewichtet.m2;
  return { ...r, nurM2, gradNurM2: gradAusPunkten(nurM2) };
};
const A = mk({ m2: [1, 2, 2, 2, 2, 2, 1, 2, 0, 1, 1], m3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0], m4: [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0], m5: { ...MODUL5_LEER, aTag: 3 }, m6: [2, 1, 2, 3, 1, 2] });
const B = mk({ m2: [0, 1, 1, 1, 1, 1, 1, 2, 0, 1, 0], m3: [3, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0], m4: [1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 0, 0], m5: { ...MODUL5_LEER, aTag: 3 }, m6: [1, 2, 1, 1, 0, 1] });
const C = mk({ m1: [1, 1, 1, 1, 1], m2: [2, 3, 3, 3, 3, 3, 2, 3, 1, 1, 1], m3: [3, 3, 0, 0, 0, 1, 0, 3, 1, 1, 0, 0, 0], m4: [2, 2, 2, 3, 2, 2, 3, 1, 1, 2, 0, 0], m5: { ...MODUL5_LEER, aTag: 4 }, m6: [3, 3, 2, 3, 2, 3] });
const N = P.nba;
const SK = P.nba_skalen.m3_punkte;
const umw3 = sachleistung(3) * P.umwandlung.anteil_max;
const fall = [A, B, C];
const mod = (x: string, l: 'de' | 'en') => (x === 'm3' ? (l === 'de' ? 'Modul 3' : 'module 3') : (l === 'de' ? 'Modul 2' : 'module 2'));

export default defineGuide({
  id: 'pflegegrad-demenz',
  group: 'grad',
  order: 110,
  mini: 'modul23',
  miniDefaults: { a: 9, b: 8 },
  related: ['begutachtung-medizinischer-dienst', 'pflegegrad-rechner', 'entlastungsbetrag', 'tagespflege', 'umwandlungsanspruch', 'hoeherstufung-pflegegrad'],
  sources: ['sgb11_15', 'sgb11_14', 'sgb11_anlage1', 'sgb11_anlage2', 'sgb11_45a', 'sgb11_45b', 'sgb11_41', 'sgb11_45f', 'mdRichtlinie'],
  de: {
    slug: 'pflegegrad-demenz',
    nav: 'Pflegegrad bei Demenz',
    card: 'Gedächtnis oder Verhalten, nur der höhere Wert zählt: wie Demenz im Gutachten Punkte bringt und welche Betreuung die Kasse bezahlt.',
    title: 'Pflegegrad bei Demenz 2026: Module 2, 3 und 6, Beispiele',
    description: 'Pflegegrad bei Demenz 2026: warum nur Modul 2 oder 3 zählt, wie Unruhe und gestörter Schlaf Punkte bringen, drei Rechenbeispiele und bezahlte Betreuung.',
    h1: 'Pflegegrad bei Demenz: wie Gedächtnis, Verhalten und Alltag zählen',
    intro: 'Bei Demenz entscheidet selten der Körper, sondern das Erinnern, das Verhalten und der Tagesablauf: so rechnet das Gutachten, an drei Beispielen.',
    resume: `Eine Demenz-Diagnose allein führt zu keinem Pflegegrad; maßgeblich ist, wie viel personelle Hilfe im Alltag nötig ist. Für Menschen mit Demenz sind drei Module entscheidend. Modul 2 misst kognitive Fähigkeiten wie Orientierung, Erinnern und das Erkennen von Gefahren, Modul 3 Verhaltensweisen wie Unruhe, nächtliches Umherlaufen oder die Abwehr von Pflege. Beide zusammen gehen mit ${DE.pct(N.gewichtung.m23, 0)} in die Gesamtpunkte ein, aber nur mit dem höheren der beiden gewichteten Werte (§ 15 Abs. 3 SGB XI). Modul 6, der Alltag mit Tagesablauf, Schlaf und Kontakten, zählt weitere ${DE.pct(N.gewichtung.m6, 0)}. Im Rechenbeispiel erreicht eine körperlich fitte, vergessliche Frau ${DE.num(A.gesamt, 2)} Punkte und Pflegegrad ${A.grad}, also ${DE.eur(pflegegeld(A.grad))} Pflegegeld im Monat. Ein Mann mit ähnlichem Gedächtnis, der aber nachts umherläuft, kommt auf ${DE.num(B.gesamt, 2)} Punkte und Grad ${B.grad}; ohne die Wertung des Verhaltens wären es nur ${DE.num(B.nurM2, 2)}. Für Betreuungsgruppen und Helferkreise gibt es den Entlastungsbetrag von ${DE.eur(P.entlastungsbetrag.monat)} im Monat.`,
    faqs: [
      { q: 'Bekommt man mit einer Demenz-Diagnose automatisch einen Pflegegrad?', a: 'Nein. Das Gutachten fragt nicht nach der Diagnose, sondern danach, wobei die Person auf Dauer Hilfe anderer braucht, voraussichtlich für mindestens sechs Monate (§ 14 Abs. 1 SGB XI). Eine frühe Demenz mit kleinen Gedächtnislücken bringt oft noch wenige Punkte. Ein Arztbrief mit der Diagnose ist trotzdem wichtig, weil er erklärt, warum Orientierung, Erinnern oder Verhalten beeinträchtigt sind und dass sich das nicht bessern wird.' },
      { q: 'Warum zählt bei Demenz nur das höhere Ergebnis aus Modul 2 und Modul 3?', a: 'Weil beide Module nach § 15 Abs. 3 SGB XI einen gemeinsamen gewichteten Wert erhalten, der aus dem höheren der beiden besteht. Gedächtnisprobleme und Verhaltensauffälligkeiten werden also nicht addiert. Für die Familie heißt das: Ist Modul 2 schon im höchsten Bereich, bringen zusätzliche Auffälligkeiten im Verhalten keine Punkte mehr. Bei leichteren kognitiven Einschränkungen kann dagegen das Verhalten den Ausschlag geben.' },
      { q: 'Zählt nächtliches Umherlaufen bei der Begutachtung?', a: `Ja, sogar zweimal an verschiedenen Stellen. In Modul 3 ist die nächtliche Unruhe ein eigenes Kriterium, bewertet nach Häufigkeit: selten bringt ${SK.selten} Punkt, häufig ${SK.haeufig}, täglich ${SK.taeglich}. In Modul 6 fließt gestörter Schlaf in das Kriterium Ruhen und Schlafen ein, wenn jemand nachts helfen oder beruhigen muss. Schreiben Sie zwei Wochen lang jede Nacht auf, wann die Person wach war und was Sie tun mussten.` },
      { q: 'Welche Betreuungsangebote bei Demenz bezahlt die Pflegekasse?', a: `Nach Landesrecht anerkannte Angebote zur Unterstützung im Alltag, darunter ausdrücklich Betreuungsgruppen für Menschen mit Demenz, Helferkreise zur stundenweisen Entlastung und Alltagsbegleiter (§ 45a SGB XI). Bezahlt werden sie über den Entlastungsbetrag von ${DE.eur(P.entlastungsbetrag.monat)} im Monat und, ab Pflegegrad 2, über den Umwandlungsanspruch aus der Sachleistung. Dazu kommen Tages- und Nachtpflege mit einem eigenen Budget.` },
      { q: 'Bekommt ein körperlich fitter Mensch mit Demenz Pflegegeld?', a: `Ja, wenn die Punkte reichen. Im Rechenbeispiel geht Frau A. sicher, isst allein und braucht nur beim Duschen kleine Hilfe. Weil sie sich zeitlich und örtlich kaum noch orientiert, Entscheidungen nicht mehr allein trifft und ihren Tag nicht mehr selbst einteilt, kommt sie trotzdem auf ${DE.num(A.gesamt, 2)} Punkte und Pflegegrad ${A.grad}. Das sind ${DE.eur(pflegegeld(A.grad))} Pflegegeld im Monat, wenn die Familie pflegt.` },
    ],
    body: (h) => `
<h2>Welche Module bei Demenz zählen</h2>
<p>Bis Ende 2016 galten Pflegestufen; seit 2017 erfasst das Gutachten neben Waschen, Anziehen und Essen ausdrücklich auch, ob jemand weiß, wo er ist, ob er Gefahren erkennt und ob er nachts aufsteht (${h.src('sgb11_14', '§ 14 Abs. 2 SGB XI')}). Für eine Demenz sind vor allem drei der sechs Module wichtig:</p>
<ul>
<li><strong>Modul 2, kognitive und kommunikative Fähigkeiten</strong>: elf Kriterien, darunter Personen erkennen, örtliche und zeitliche Orientierung, Erinnern, mehrschrittige Handlungen steuern, Entscheidungen treffen, Risiken erkennen und einem Gespräch folgen. Jede Fähigkeit wird als vorhanden, größtenteils vorhanden, in geringem Maße vorhanden oder nicht vorhanden eingestuft.</li>
<li><strong>Modul 3, Verhaltensweisen und psychische Problemlagen</strong>: dreizehn Kriterien von motorischer Unruhe und nächtlicher Unruhe über Abwehr pflegerischer Maßnahmen und Wahnvorstellungen bis zu Ängsten und Antriebslosigkeit. Hier zählt, wie oft das Verhalten auftritt und personelle Hilfe auslöst.</li>
<li><strong>Modul 6, Gestaltung des Alltagslebens und sozialer Kontakte</strong>: Tagesablauf, Ruhen und Schlafen, sich beschäftigen, in die Zukunft planen, Umgang mit Menschen im direkten Kontakt und Kontakte nach außen.</li>
</ul>
<p>Modul 2 und Modul 3 teilen sich ${h.pct(N.gewichtung.m23, 0)} der Gewichtung, Modul 6 hat eigene ${h.pct(N.gewichtung.m6, 0)} (${h.src('sgb11_15', '§ 15 Abs. 2 SGB XI')}). Dazu kommt die Selbstversorgung mit ${h.pct(N.gewichtung.m4, 0)}, in der auch das Anleiten und Beaufsichtigen beim Waschen, Anziehen und Essen Punkte bringt. Wer seine Mutter jeden Morgen zum Duschen auffordern und daneben stehen muss, leistet Hilfe, die gezählt wird.</p>

<h2>Modul 2 oder Modul 3: der höhere Wert entscheidet</h2>
<p>Die beiden Module werden nicht addiert. Das Gesetz gibt ihnen einen gemeinsamen gewichteten Wert, der aus dem höheren der beiden besteht (${h.src('sgb11_15', '§ 15 Abs. 3 SGB XI')}). In Modul 2 reicht die Summe der Einzelpunkte bis ${h.num(N.bereiche.m2.max)}, in Modul 3 bis ${h.num(N.bereiche.m3.max)}; beide werden nach eigenen Grenzen in fünf Bereiche eingeteilt (${h.src('sgb11_anlage2', 'Anlage 2')}). In Modul 3 genügen schon wenige häufige Verhaltensweisen für den höchsten Bereich: ab ${h.num(N.bereiche.m3.grenzen[3])} Einzelpunkten gibt es die vollen ${h.num(N.bereiche.m3.gewichtet[4], 2)} gewichteten Punkte. Die Häufigkeit wird nach Anlage 1 so bewertet: nie oder sehr selten ${h.num(SK.nie)}, selten (ein- bis dreimal in zwei Wochen) ${h.num(SK.selten)}, häufig (zweimal bis mehrmals pro Woche, aber nicht täglich) ${h.num(SK.haeufig)}, täglich ${h.num(SK.taeglich)} Punkte (${h.src('sgb11_anlage1', 'Anlage 1')}).</p>
<p>Deshalb lohnt es sich, beide Module getrennt vorzubereiten. Im Rechner oben tragen Sie die Summen ein und sehen, welches Modul zählt; der ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} fragt jedes Kriterium einzeln ab.</p>

<h2>Drei Rechenbeispiele aus dem Motor</h2>
<p>Die drei Fälle sind mit dem Begutachtungsinstrument dieser Seite gerechnet, Kriterium für Kriterium. <strong>Frau A.</strong> ist vergesslich, findet sich außerhalb der Wohnung nicht mehr zurecht und verpasst Termine, ist aber ruhig und körperlich beweglich. <strong>Herr B.</strong> erinnert sich noch an vieles, läuft aber mehrmals pro Woche unruhig umher, steht nachts auf und wehrt sich gelegentlich gegen Hilfe. <strong>Frau C.</strong> hat eine fortgeschrittene Demenz, braucht bei fast allem Anleitung oder Übernahme und erkennt Angehörige nur noch zeitweise.</p>
${h.table(['', 'Frau A.: vergesslich, ruhig', 'Herr B.: unruhig, nachts wach', 'Frau C.: fortgeschritten'], [
  ['Modul 2: Summe, gewichtet', ...fall.map((f) => `${h.num(f.summen.m2)} · ${h.num(f.gewichtet.m2, 2)}`)],
  ['Modul 3: Summe, gewichtet', ...fall.map((f) => `${h.num(f.summen.m3)} · ${h.num(f.gewichtet.m3, 2)}`)],
  ['Es zählt', ...fall.map((f) => mod(f.m23aus, 'de'))],
  ['Modul 4 Selbstversorgung, gewichtet', ...fall.map((f) => h.num(f.gewichtet.m4, 2))],
  ['Modul 6 Alltag, gewichtet', ...fall.map((f) => h.num(f.gewichtet.m6, 2))],
  ['Gesamtpunkte', ...fall.map((f) => h.num(f.gesamt, 2))],
  ['Pflegegrad', ...fall.map((f) => String(f.grad))],
  ['Wenn nur Modul 2 zählte', ...fall.map((f) => `${h.num(f.nurM2, 2)} · Grad ${f.gradNurM2}`)],
  ['Pflegegeld im Monat', ...fall.map((f) => h.eur(pflegegeld(f.grad)))],
], 'Einzelpunkte nach Anlage 1, gewichtete Punkte nach Anlage 2 zu § 15 SGB XI; Pflegegeld nach § 37 SGB XI.', ['l', 'r', 'r', 'r'])}
<p>Bei Frau A. zählt das Gedächtnis: Modul 2 liegt höher, die seltenen Ängste in Modul 3 spielen keine Rolle. Bei Herrn B. ist es umgekehrt. Sein Verhalten hebt den gemeinsamen Wert von ${h.num(B.gewichtet.m2, 2)} auf ${h.num(B.gewichtet.m23, 2)} Punkte, und genau das bringt ihn von ${h.num(B.nurM2, 2)} auf ${h.num(B.gesamt, 2)} Punkte und damit über die Schwelle zu Pflegegrad ${B.grad} bei ${h.num(N.schwellen[2], 1)}. Hätte die Familie die nächtlichen Runden beim Termin nicht erwähnt, wäre es Grad ${B.gradNurM2} geblieben. Bei Frau C. liegen beide Module im höchsten Bereich; mehr als ${h.num(N.bereiche.m2.gewichtet[4], 2)} Punkte sind dort nicht zu holen, die übrigen Punkte kommen aus Selbstversorgung und Alltag.</p>

<h2>Modul 6: der Alltag, der oft fehlt</h2>
<p>Modul 6 wird bei Demenz häufig unterschätzt, obwohl es mehr wiegt als die Mobilität. Es fragt, ob jemand seinen Tag selbst einteilt und sich auf Änderungen einstellt, ob er ruhig schläft, ob er sich sinnvoll beschäftigt, ob er über den Tag hinaus plant und ob er Kontakt zu anderen hält. Gemeint ist die Hilfe, die dafür nötig ist: Wer den Vater jeden Morgen durch den Tag lotst, ihm sagt, wann gegessen wird, ihn zum Spaziergang abholt und abends zur Ruhe bringt, leistet Unterstützung in mehreren Kriterien. Bei Frau A. bringt Modul 6 ${h.num(A.gewichtet.m6, 2)} Punkte, genauso viel wie ihr Gedächtnis.</p>
<p>Für die Begutachtung heißt das: Beschreiben Sie einen gewöhnlichen Tag von morgens bis nachts, mit allen Erinnerungen, Aufforderungen und Begleitungen. Menschen mit Demenz stellen sich vor Fremden oft besser dar, als sie den Alltag bewältigen. Ein getrenntes Gespräch mit der Gutachterin ist möglich, mehr dazu unter ${h.a('begutachtung-medizinischer-dienst', 'Begutachtung durch den Medizinischen Dienst')}. Verschlechtert sich die Demenz später, ist ein ${h.a('hoeherstufung-pflegegrad', 'Antrag auf Höherstufung')} der Weg zum passenden Grad.</p>

<h2>Betreuung, die die Kasse bezahlt</h2>
<p>Für Menschen mit Demenz ist Betreuung oft wichtiger als Pflege im engeren Sinn. Das SGB XI kennt dafür eigene Angebote zur Unterstützung im Alltag: Betreuungsgruppen für Menschen mit Demenz, Helferkreise zur stundenweisen Entlastung der Angehörigen zu Hause, Tagesbetreuung in Kleingruppen, Alltagsbegleiter und Pflegebegleiter (${h.src('sgb11_45a', '§ 45a Abs. 1 SGB XI')}). Sie brauchen eine Anerkennung nach dem Recht des jeweiligen Landes.</p>
${h.table(['Topf', 'bei Pflegegrad 3', 'wofür bei Demenz'], [
  ['Entlastungsbetrag', `${h.eur(P.entlastungsbetrag.monat)} im Monat`, 'anerkannte Betreuungsgruppe, Helferkreis, Alltagsbegleitung, Tages- oder Kurzzeitpflege'],
  ['Umwandlungsanspruch', `bis ${h.eur(umw3, 2)} im Monat`, 'dieselben Angebote, aus nicht genutzter Sachleistung'],
  ['Tages- und Nachtpflege', `bis ${h.eur(tagespflege(3))} im Monat`, 'Tage in einer Einrichtung mit Struktur, nachts Betreuung bei Unruhe'],
  ['Wohngruppenzuschlag', `${h.eur(P.wohngruppe.zuschlag)} im Monat`, 'ambulant betreute Wohngemeinschaft, oft speziell für Demenz'],
], 'Beträge 2026 nach §§ 41, 45a Abs. 4, 45b und 45f SGB XI.', ['l', 'r', 'l'])}
<p>Der ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} wird gegen Rechnung erstattet; ein ambulanter Pflegedienst darf daraus in den Graden 2 bis 5 nicht für die Selbstversorgung bezahlt werden, wohl aber für Betreuung (${h.src('sgb11_45b', '§ 45b Abs. 1 SGB XI')}). Was im Kalenderjahr übrig bleibt, lässt sich ins folgende Halbjahr mitnehmen. Reicht er nicht, kommt der ${h.a('umwandlungsanspruch', 'Umwandlungsanspruch')} hinzu: Bis zu ${h.pct(P.umwandlung.anteil_max, 0)} der nicht genutzten Sachleistung lassen sich für dieselben Angebote einsetzen, das anteilige Pflegegeld sinkt dann entsprechend. Die ${h.a('tagespflege', 'Tagespflege')} hat ein eigenes Budget und kürzt das Pflegegeld nicht (${h.src('sgb11_41', '§ 41 SGB XI')}). Gerade bei Unruhe am Nachmittag gibt ein fester Rhythmus in einer Einrichtung vielen Betroffenen Halt und den Angehörigen freie Stunden. Wie viele Tage das Budget trägt, rechnet der folgende Rechner.</p>
<p>Lebt die Person in einer ambulant betreuten Wohngruppe, kommt der ${h.a('wohngruppenzuschlag', 'Wohngruppenzuschlag')} hinzu (${h.src('sgb11_45f', '§ 45f SGB XI')}). Für eine Auszeit der pflegenden Familie steht außerdem der Gemeinsame Jahresbetrag von ${h.eur(P.jahresbetrag.euro)} für ${h.a('verhinderungspflege', 'Verhinderungs- und Kurzzeitpflege')} bereit.</p>
`,
  },
  en: {
    slug: 'care-grade-dementia',
    nav: 'Care grade with dementia',
    card: 'Memory or behaviour, only the higher score counts: how dementia earns points in the German assessment and which support the fund pays for.',
    title: 'Care Grade for Dementia Germany 2026: Modules 2, 3 and 6',
    description: 'Care grade for dementia in Germany 2026: why only module 2 or 3 counts, how restlessness and broken sleep add points, three worked cases and paid day support.',
    h1: 'German care grade with dementia: how memory, behaviour and daily life count',
    intro: 'With dementia the body rarely decides; memory, behaviour and the shape of the day do. How the assessment scores them, shown on three worked cases.',
    resume: `A dementia diagnosis alone does not produce a care grade in Germany; what counts is how much hands-on help daily life requires. Three modules matter most for dementia. Module 2 measures cognitive abilities such as orientation, memory and recognising danger, module 3 behaviour such as restlessness, wandering at night or resisting care. Together they carry ${EN.pct(N.gewichtung.m23, 0)} of the total, but only with the higher of the two weighted scores (section 15(3) of Book XI of the Social Code). Module 6, daily life with routine, sleep and contacts, adds another ${EN.pct(N.gewichtung.m6, 0)}. In our worked example a physically fit but forgetful woman reaches ${EN.num(A.gesamt, 2)} points and care grade ${A.grad}, which means ${EN.eur(pflegegeld(A.grad))} of care allowance (Pflegegeld) a month. A man with a similar memory who wanders at night reaches ${EN.num(B.gesamt, 2)} points and grade ${B.grad}; without his behaviour being scored he would have only ${EN.num(B.nurM2, 2)}. Support groups and volunteer helpers can be paid from the relief amount (Entlastungsbetrag) of ${EN.eur(P.entlastungsbetrag.monat)} a month.`,
    faqs: [
      { q: 'Does a dementia diagnosis guarantee a care grade in Germany?', a: 'No. The assessment does not ask about the diagnosis but about which tasks the person permanently needs other people’s help with, expected for at least six months (section 14(1) SGB XI). Early dementia with small memory gaps often scores few points. A doctor’s letter confirming the diagnosis still matters, because it explains why orientation, memory or behaviour are affected and that this will not improve.' },
      { q: 'Why does only module 2 or module 3 count, not both?', a: 'Section 15(3) SGB XI gives the two modules one shared weighted score, made up of whichever is higher. Memory problems and behavioural symptoms are not added together. In practice: once module 2 is in the top band, extra behavioural problems add no points. With milder cognitive problems, on the other hand, behaviour can tip the balance, as the second worked case on this page shows.' },
      { q: 'Does wandering at night count in the assessment?', a: `Yes, in two places. Night-time restlessness is its own criterion in module 3, scored by frequency: rarely ${SK.selten} point, often ${SK.haeufig}, daily ${SK.taeglich}. In module 6, broken sleep feeds into the criterion on resting and sleeping if someone has to help or settle the person at night. For two weeks, write down every night when your parent was awake and what had to be done.` },
      { q: 'What can the relief amount pay for when a parent has dementia?', a: `Support services recognised under state law, which the statute explicitly says include dementia support groups, volunteer circles giving relatives a few hours off and everyday companions (section 45a SGB XI). The relief amount refunds up to ${EN.eur(P.entlastungsbetrag.monat)} a month against invoices. From grade 2, unused home care budget can also be converted for the same services, and day or night care has a separate budget.` },
      { q: 'Can a parent with dementia who is physically fit get the allowance?', a: `Yes, if the points add up. In the worked example Mrs A. walks safely, eats on her own and needs only a little help in the shower. Because she has lost much of her sense of time and place, no longer makes decisions alone and cannot structure her day, she still reaches ${EN.num(A.gesamt, 2)} points and care grade ${A.grad}: ${EN.eur(pflegegeld(A.grad))} of allowance a month if the family provides the care.` },
    ],
    body: (h) => `
<!--mini:tagespflege-->
<h2>Which modules count with dementia</h2>
<p>Until the end of 2016 Germany used care levels (Pflegestufen); since 2017 the report records, besides washing, dressing and eating, whether someone knows where they are, recognises danger and gets up at night (${h.src('sgb11_14', 'section 14(2) SGB XI')}). Three of the six modules matter most for dementia:</p>
<ul>
<li><strong>Module 2, cognitive and communication abilities</strong>: eleven criteria, including recognising people, orientation in place and time, remembering, carrying out multi-step tasks, making decisions, recognising risks and following a conversation. Each ability is rated as present, largely present, present to a small degree or absent.</li>
<li><strong>Module 3, behaviour and psychological problems</strong>: thirteen criteria from physical restlessness and night-time restlessness through resisting care and delusions to anxiety and lack of drive. What counts is how often the behaviour occurs and calls for someone to step in.</li>
<li><strong>Module 6, daily life and social contact</strong>: structuring the day, resting and sleeping, keeping occupied, planning ahead, dealing with people face to face and keeping in touch with others.</li>
</ul>
<p>Modules 2 and 3 share ${h.pct(N.gewichtung.m23, 0)} of the weighting, module 6 has its own ${h.pct(N.gewichtung.m6, 0)} (${h.src('sgb11_15', 'section 15(2) SGB XI')}). Self-care adds ${h.pct(N.gewichtung.m4, 0)}, and there prompting and supervising someone while washing, dressing and eating also score. If you have to tell your mother to shower every morning and stay nearby, that is help that counts.</p>

<h2>Module 2 or module 3: the higher score decides</h2>
<p>The two modules are not added. The law gives them one shared weighted score, made up of the higher of the two (${h.src('sgb11_15', 'section 15(3) SGB XI')}). In module 2 the raw total can reach ${h.num(N.bereiche.m2.max)}, in module 3 ${h.num(N.bereiche.m3.max)}; each is divided into five bands with its own limits (${h.src('sgb11_anlage2', 'Annex 2')}). In module 3 a few frequent behaviours are enough for the top band: from ${h.num(N.bereiche.m3.grenzen[3])} raw points the full ${h.num(N.bereiche.m3.gewichtet[4], 2)} weighted points apply. Frequency is scored under Annex 1 as follows: never or very rarely ${h.num(SK.nie)}, rarely (one to three times in two weeks) ${h.num(SK.selten)}, often (twice to several times a week but not daily) ${h.num(SK.haeufig)}, daily ${h.num(SK.taeglich)} (${h.src('sgb11_anlage1', 'Annex 1')}).</p>
<p>That is why it pays to prepare both modules separately. Enter the totals in the calculator at the top to see which one counts; the ${h.a('pflegegrad-rechner', 'care grade calculator')} asks about every criterion.</p>

<h2>Three worked cases from the engine</h2>
<p>All three cases are calculated with this site’s assessment engine, criterion by criterion. <strong>Mrs A.</strong> is forgetful, gets lost outside the flat and misses appointments, but is calm and physically mobile. <strong>Mr B.</strong> still remembers a lot, but paces restlessly several times a week, gets up at night and sometimes resists help. <strong>Mrs C.</strong> has advanced dementia, needs prompting or full help with almost everything and recognises relatives only at times.</p>
${h.table(['', 'Mrs A.: forgetful, calm', 'Mr B.: restless, awake at night', 'Mrs C.: advanced'], [
  ['Module 2: raw, weighted', ...fall.map((f) => `${h.num(f.summen.m2)} · ${h.num(f.gewichtet.m2, 2)}`)],
  ['Module 3: raw, weighted', ...fall.map((f) => `${h.num(f.summen.m3)} · ${h.num(f.gewichtet.m3, 2)}`)],
  ['Counts', ...fall.map((f) => mod(f.m23aus, 'en'))],
  ['Module 4 self-care, weighted', ...fall.map((f) => h.num(f.gewichtet.m4, 2))],
  ['Module 6 daily life, weighted', ...fall.map((f) => h.num(f.gewichtet.m6, 2))],
  ['Total points', ...fall.map((f) => h.num(f.gesamt, 2))],
  ['Care grade', ...fall.map((f) => String(f.grad))],
  ['If only module 2 counted', ...fall.map((f) => `${h.num(f.nurM2, 2)} · grade ${f.gradNurM2}`)],
  ['Allowance per month', ...fall.map((f) => h.eur(pflegegeld(f.grad)))],
], 'Raw points under Annex 1, weighted points under Annex 2 to section 15 SGB XI; allowance under section 37 SGB XI.', ['l', 'r', 'r', 'r'])}
<p>For Mrs A. memory decides: module 2 is higher and her occasional anxiety in module 3 plays no part. For Mr B. it is the other way round. His behaviour lifts the shared score from ${h.num(B.gewichtet.m2, 2)} to ${h.num(B.gewichtet.m23, 2)}, and that alone takes him from ${h.num(B.nurM2, 2)} to ${h.num(B.gesamt, 2)} points, across the line to grade ${B.grad} at ${h.num(N.schwellen[2], 1)}. Had the family not mentioned his night-time rounds at the visit, he would have stayed at grade ${B.gradNurM2}. For Mrs C. both modules are in the top band; no more than ${h.num(N.bereiche.m2.gewichtet[4], 2)} points can come from them, and the rest comes from self-care and daily life.</p>

<h2>Module 6: the daily life that often goes unrecorded</h2>
<p>Module 6 is often underestimated with dementia, although it weighs more than mobility. It asks whether someone structures their own day and adapts to changes, sleeps calmly, keeps occupied, plans beyond today and stays in touch with others. What counts is the help needed for all this: guiding your father through the day, telling him when it is time to eat, collecting him for a walk and settling him in the evening are support in several criteria. For Mrs A., module 6 adds ${h.num(A.gewichtet.m6, 2)} points, exactly as much as her memory.</p>
<p>For the assessment, describe an ordinary day from morning to night, with every reminder, prompt and accompaniment. People with dementia often present better in front of strangers than they manage at home, and a separate conversation with the assessor can be requested; see ${h.a('begutachtung-medizinischer-dienst', 'the Medical Service assessment')}. If you live abroad, join by phone or send a signed, dated account of a typical week. If the dementia progresses, a ${h.a('hoeherstufung-pflegegrad', 'request for a higher grade')} is the route to the right grade.</p>

<h2>Support the fund pays for</h2>
<p>For people with dementia, supervision and company often matter more than nursing in the narrow sense. Book XI provides specific everyday support services for this: dementia support groups, volunteer circles giving relatives a few hours off at home, day care in small groups, everyday companions and care companions (${h.src('sgb11_45a', 'section 45a(1) SGB XI')}). They need recognition under the law of the federal state.</p>
${h.table(['Budget', 'at care grade 3', 'what it can pay for with dementia'], [
  ['Relief amount', `${h.eur(P.entlastungsbetrag.monat)} a month`, 'recognised support group, volunteer circle, everyday companion, day or short-term care'],
  ['Conversion of the services budget', `up to ${h.eur(umw3, 2)} a month`, 'the same services, from unused home care budget'],
  ['Day and night care', `up to ${h.eur(tagespflege(3))} a month`, 'days at a centre with a set routine, night care for restlessness'],
  ['Shared flat supplement', `${h.eur(P.wohngruppe.zuschlag)} a month`, 'assisted shared flat, often designed for dementia'],
], '2026 amounts under sections 41, 45a(4), 45b and 45f SGB XI.', ['l', 'r', 'l'])}
<p>The ${h.a('entlastungsbetrag', 'relief amount')} is refunded against invoices; at grades 2 to 5 a home care service may not be paid from it for self-care, but it may be paid for supervision and company (${h.src('sgb11_45b', 'section 45b(1) SGB XI')}). Whatever is left at the end of the calendar year can be carried into the following half-year. If it is not enough, the ${h.a('umwandlungsanspruch', 'conversion of the services budget')} adds up to ${h.pct(P.umwandlung.anteil_max, 0)} of the unused home care budget for the same services, with the partial allowance reduced accordingly. ${h.a('tagespflege', 'Day care')} has its own budget and does not reduce the allowance (${h.src('sgb11_41', 'section 41 SGB XI')}). For afternoon restlessness in particular, a fixed routine at a centre gives many people stability and the family free hours. The calculator below shows how many days the budget covers.</p>
<p>If your parent lives in an assisted shared flat, the ${h.a('wohngruppenzuschlag', 'shared flat supplement')} applies on top (${h.src('sgb11_45f', 'section 45f SGB XI')}). For a break for the family carer there is also the joint annual budget of ${h.eur(P.jahresbetrag.euro)} for ${h.a('verhinderungspflege', 'respite and short-term care')}, which can bridge the weeks when a relative flies in from abroad.</p>
<!--mini:tagespflege-->
`,
  },
});
