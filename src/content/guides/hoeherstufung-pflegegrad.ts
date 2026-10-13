import { defineGuide } from '../../lib/guide-types';
import { gewichtet, gradAusPunkten, bisNaechsterGrad } from '../../lib/engine/nba';
import { pflegegeld, sachleistung, tagespflege, vollstationaer } from '../../lib/engine/leistungen';
import { rentenpunkte, pauschbetrag } from '../../lib/engine/angehoerige';
import type { Grad } from '../../lib/engine/params';
import { P, DE, EN } from '../../lib/fmt';

/**
 * Beispiele aus dem Motor: Gutachten vor einem Sturz (Grad 3), nach dem Sturz mit schlechterer Mobilität und
 * Selbstversorgung (weiter Grad 3), dazu gestörter Tagesablauf und Schlaf (Grad 4). Wert eines Grades mehr.
 */
const V = P.verfahren;
const R = P.rechtsweg;
const S = P.nba.schwellen;
const fall = (m1: number, m2: number, m4: number, m5: number, m6: number) => {
  const g = { m1: gewichtet('m1', m1), m23: gewichtet('m2', m2), m4: gewichtet('m4', m4), m5: gewichtet('m5', m5), m6: gewichtet('m6', m6) };
  const gesamt = g.m1 + g.m23 + g.m4 + g.m5 + g.m6;
  return { ...g, gesamt, grad: gradAusPunkten(gesamt), naechster: bisNaechsterGrad(gesamt) };
};
const vorher = fall(4, 12, 18, 2, 6);
const sturz = fall(6, 12, 21, 2, 6);
const alltag = fall(6, 12, 21, 2, 12);
const mehr23 = pflegegeld(3) - pflegegeld(2);
const mehr34 = pflegegeld(4) - pflegegeld(3);
const sach34 = sachleistung(4) - sachleistung(3);
const r3 = rentenpunkte(3, 'geld');
const r4 = rentenpunkte(4, 'geld');
const pb3 = pauschbetrag(3).voll;
const pb4 = pauschbetrag(4).voll;
const stufen: Array<[Grad, Grad]> = [[1, 2], [2, 3], [3, 4], [4, 5]];
const rd = (a: Grad, b: Grad) => rentenpunkte(b, 'geld').renteProJahr - rentenpunkte(a, 'geld').renteProJahr;
const fehltSturz = sturz.naechster ? sturz.naechster.fehlt : 0;

export default defineGuide({
  id: 'hoeherstufung-pflegegrad',
  group: 'grad',
  order: 100,
  mini: 'hoeherstufung',
  miniDefaults: { p: 66.25 },
  related: ['widerspruch-pflegegrad', 'begutachtung-medizinischer-dienst', 'pflegegrad-rechner', 'pflegegrad-3', 'pflegegrad-4', 'rente-pflegende-angehoerige'],
  sources: ['sgb10_48', 'sgb11_33', 'sgb11_14', 'sgb10_24', 'sgb11_140', 'sgb1_16', 'sgb11_142a', 'mdRichtlinie', 'estg33b', 'sgb6_166'],
  de: {
    slug: 'hoeherstufung-pflegegrad',
    nav: 'Höherstufung des Pflegegrads',
    card: 'Formlos beantragen, mit neuen Befunden belegen, das Risiko einer Herabstufung kennen: so kommt der höhere Grad, wenn sich der Zustand verschlechtert.',
    title: 'Höherstufung Pflegegrad 2026: Antrag, neues Gutachten, Geld',
    description: 'Höherstufung des Pflegegrads 2026: formloser Antrag, neues Gutachten, mehr Geld ab dem Antragsmonat und warum der Grad dabei im Einzelfall auch sinken kann.',
    h1: 'Höherstufung des Pflegegrads: wann sie sich lohnt und was sie riskiert',
    intro: 'Wenn der Alltag seit dem letzten Bescheid deutlich schwerer geworden ist: wie der Antrag aussieht, was die Gutachterin neu bewertet und ab wann mehr Geld kommt.',
    resume: `Eine Höherstufung beantragen Sie, wenn sich der Zustand seit dem letzten Bescheid dauerhaft verschlechtert hat. Ein formloser Antrag an die Pflegekasse genügt; sie beauftragt ein neues Gutachten, für das der Medizinische Dienst das Vorgutachten beizieht und die Entwicklung seither beschreibt. Eine Wartezeit nach dem letzten Bescheid schreibt das SGB XI nicht vor. Rechtlich ist die Höherstufung die Änderung eines Bescheids mit Dauerwirkung nach § 48 SGB X; mehr Geld gibt es frühestens ab dem Monat, in dem der Antrag eingeht (§ 33 Abs. 1 SGB XI). Der Wechsel von Grad 3 auf Grad 4 bringt ${DE.eur(mehr34)} Pflegegeld und ${DE.eur(sach34)} Sachleistung mehr im Monat; wer drei Monate zögert, verliert allein beim Pflegegeld ${DE.eur(mehr34 * 3)}. Das neue Gutachten bewertet aber alle Module neu: Zeigt es eine wesentliche Besserung, darf die Kasse den Grad nach einer Anhörung für die Zukunft auch senken. Wer 2017 aus einer Pflegestufe übergeleitet wurde, behält seinen Grad, solange überhaupt Pflegebedürftigkeit besteht (§ 140 Abs. 3 SGB XI).`,
    faqs: [
      { q: 'Wie formuliere ich den Antrag auf einen höheren Pflegegrad?', a: 'Ein Satz genügt: „Hiermit beantrage ich die Höherstufung meines Pflegegrades, weil sich mein Zustand verschlechtert hat.“ Dazu kommen Name, Versichertennummer, Datum und die Unterschrift der versicherten Person oder ihrer Bevollmächtigten. Schicken Sie das Schreiben so, dass Sie den Eingang belegen können, denn der Eingangsmonat bestimmt den Beginn der Zahlung. Neue Arztbriefe und ein Pflegetagebuch können Sie beilegen oder bis zum Termin nachreichen.' },
      { q: 'Ab welchem Monat zahlt die Kasse nach einer Höherstufung mehr?', a: `Ab dem Monat, in dem der Antrag bei der Kasse eingeht, sofern der höhere Grad zu diesem Zeitpunkt schon bestand; tritt er erst danach ein, ab diesem späteren Zeitpunkt. Für Monate vor dem Antrag gibt es nichts (§ 33 Abs. 1 SGB XI). Den Unterschied zahlt die Kasse nach dem neuen Bescheid in einer Summe nach. Von Grad 2 auf Grad 3 sind das ${DE.eur(mehr23)} Pflegegeld für jeden Monat seit dem Antrag.` },
      { q: 'Kann der Pflegegrad bei einem Antrag auf Höherstufung auch sinken?', a: 'Ja, das ist möglich, aber an Bedingungen geknüpft. Das neue Gutachten bewertet alle Kriterien neu. Ergibt es weniger Punkte, weil sich etwas wesentlich gebessert hat, darf die Kasse den Bescheid für die Zukunft ändern (§ 48 SGB X). Vorher muss sie Sie anhören (§ 24 SGB X), und das Gutachten muss darlegen, wodurch sich die Selbständigkeit verbessert hat. Gegen einen niedrigeren Grad steht Ihnen der Widerspruch offen.' },
      { q: 'Wie lange muss man nach dem letzten Bescheid mit einem neuen Antrag warten?', a: 'Das SGB XI schreibt keine Wartezeit vor. Entscheidend ist, ob sich der Hilfebedarf seit dem letzten Gutachten tatsächlich verändert hat, und zwar voraussichtlich für mindestens sechs Monate. Wer kurz nach einem Bescheid nur dieselben Einschränkungen noch einmal schildert, bringt keine neuen Tatsachen vor. Hält die Familie schon den ersten Bescheid für falsch, ist innerhalb der Monatsfrist der Widerspruch der passende Weg.' },
      { q: 'Kommt bei einer Höherstufung immer jemand ins Haus?', a: `Nicht zwingend. Bei Höherstufungen ab ${R.telefon_hoeherstufung_ab_jahren} Jahren erlauben die Begutachtungs-Richtlinien ein strukturiertes Telefon- oder Videointerview, wenn die versicherte Person zustimmt und die Gutachterin es fachlich für geeignet hält. Bei kognitiven Einschränkungen geht das nur mit einer Unterstützungsperson. Stimmen Sie nicht zu, wenn sich der Alltag am Telefon schlecht zeigen lässt. Ist die Aktenlage eindeutig, kann ausnahmsweise auch ohne Gespräch entschieden werden.` },
      { q: 'Was ändert eine Höherstufung für pflegende Angehörige?', a: `Mit dem Grad steigen die Rentenbeiträge, die die Kasse für die Pflegeperson zahlt. Bei reinem Pflegegeld bringt ein Jahr Pflege bei Grad 3 ${DE.eur(r3.renteProJahr, 2)} Monatsrente, bei Grad 4 ${DE.eur(r4.renteProJahr, 2)}. Der Pflege-Pauschbetrag wächst von ${DE.eur(pb3)} auf ${DE.eur(pb4)} im Jahr, sofern die Pflegeperson kein Geld für die Pflege annimmt. Steuerlich zählt der höchste Grad, der im Kalenderjahr festgestellt war.` },
    ],
    body: (h) => `
<h2>Wann eine Höherstufung der richtige Weg ist</h2>
<p>Ein Bescheid über den Pflegegrad gilt, bis er geändert wird. Verschlechtert sich der Zustand danach, passt er nicht mehr, aber die Pflegekasse ändert ihn in aller Regel erst, wenn die Familie das anstößt. Typische Anlässe sind ein Sturz mit Bruch, ein Schlaganfall, eine fortschreitende Demenz, eine neu aufgetretene Inkontinenz oder ein Krankenhausaufenthalt, nach dem die Person nicht mehr allein aufsteht. Maßgeblich ist, dass die neuen Einschränkungen voraussichtlich mindestens sechs Monate bestehen (${h.src('sgb11_14', '§ 14 Abs. 1 SGB XI')}); eine schwere Grippe oder die ersten Wochen nach einer Operation genügen dafür nicht.</p>
<p>War der Bescheid schon bei Erlass zu niedrig, ist der ${h.a('widerspruch-pflegegrad', 'Widerspruch')} das Mittel der Wahl. Die vier Verfahren rund um den Pflegegrad unterscheiden sich vor allem darin, wer sie auslöst und ab wann Geld fließt.</p>
${h.table(['Verfahren', 'passt, wenn', 'Frist', 'Wirkung'], [
  ['Antrag auf Höherstufung', 'der Zustand sich nach dem Bescheid verschlechtert hat', 'keine', 'mehr Geld frühestens ab dem Antragsmonat'],
  ['Widerspruch', 'der Bescheid von Anfang an zu niedrig war', `${h.num(V.widerspruch_monate)} Monat ab Bekanntgabe`, 'Nachzahlung ab dem ursprünglichen Antrag'],
  ['Überprüfungsantrag', 'die Frist verpasst ist und das Gutachten falsch war', 'keine', `Nachzahlung bis ${h.num(R.ueberpruefung_rueckwirkung_jahre)} Jahre zurück`],
  ['Wiederholungsbegutachtung', 'die Kasse konkrete Hinweise auf eine Besserung hat', 'kein Antrag', 'eine Senkung wirkt nur für die Zukunft'],
], 'Grundlagen: § 33 SGB XI, §§ 44 und 48 SGB X, § 84 SGG, Begutachtungs-Richtlinien des Medizinischen Dienstes Bund.', ['l', 'l', 'l', 'l'])}

<h2>So stellen Sie den Antrag</h2>
<p>Einen Vordruck schreibt das Gesetz nicht vor. Leistungen der Pflegeversicherung gibt es auf Antrag (${h.src('sgb11_33', '§ 33 Abs. 1 SGB XI')}), und ein formloses Schreiben an die Pflegekasse reicht aus. Viele Kassen schicken danach ein eigenes Formular, das Sie ausfüllen können, aber nicht abwarten müssen: Der Monat des ersten Schreibens zählt. Nennen Sie kurz, was sich geändert hat und seit wann, etwa „seit dem Oberschenkelhalsbruch im März kann meine Mutter nicht mehr allein duschen und nachts nicht mehr allein zur Toilette“.</p>
<p>Je konkreter die Unterlagen, desto leichter fällt es der Gutachterin, die Veränderung festzuhalten:</p>
<ul>
<li><strong>Berichte seit dem letzten Gutachten</strong>: Entlassbrief der Klinik, Befunde von Fachärzten, Reha-Bericht.</li>
<li><strong>Ein Pflegetagebuch über zwei Wochen</strong>, das nicht nur die Hilfe zeigt, sondern auch, was früher allein ging und heute nicht mehr.</li>
<li><strong>Den aktuellen Medikamentenplan</strong> und Verordnungen von Therapie oder Behandlungspflege.</li>
<li><strong>Das letzte Gutachten</strong> als eigene Vergleichsgrundlage; die Gutachterin zieht es ohnehin bei.</li>
</ul>

<h2>Was das neue Gutachten anders macht</h2>
<p>Bei einer Höherstufung beginnt die Gutachterin nicht bei null. Nach den ${h.src('mdRichtlinie', 'Begutachtungs-Richtlinien')} muss sie die vorliegenden Gutachten beiziehen, die zwischenzeitliche Entwicklung würdigen und eingehend dokumentieren. Ein bloßer Verweis auf das Vorgutachten reicht nicht: In der Zwischenanamnese steht, wie die Erkrankungen verlaufen sind, was sich in jedem Modul verbessert oder verschlechtert hat und worauf das zurückgeht. Empfiehlt sie einen niedrigeren Grad, muss sie zusätzlich begründen, wodurch die Einschränkungen geringer geworden sind.</p>
<p>Anders als beim Erstantrag ist ab ${h.num(R.telefon_hoeherstufung_ab_jahren)} Jahren ein strukturiertes Telefon- oder Videointerview zulässig, wenn die versicherte Person zustimmt (${h.src('sgb11_142a', '§ 142a SGB XI')}). Bei Menschen mit kognitiven Einschränkungen, psychischen Problemlagen oder Sprachschwierigkeiten muss dann eine Unterstützungsperson dabei sein, bei allein lebenden Menschen mit Demenz prüft die Gutachterin besonders kritisch, ob das Format passt. Wer den Alltag lieber zeigt als beschreibt, lehnt das Telefon ab und bittet um einen Hausbesuch.</p>

<h2>Rechenbeispiel: warum nicht jede Verschlechterung reicht</h2>
<p>Eine Frau Ende siebzig hatte im letzten Gutachten ${h.num(vorher.gesamt, 2)} Punkte und damit Pflegegrad ${vorher.grad}. Nach einem Sturz geht sie nur noch mit Hilfe durch die Wohnung, braucht beim Duschen und Anziehen deutlich mehr Unterstützung und rutscht in Mobilität und Selbstversorgung jeweils in den nächsten Punktbereich. Der Motor ergibt ${h.num(sturz.gesamt, 2)} Punkte: Sie bleibt in Pflegegrad ${sturz.grad}, bis zum nächsten Grad fehlen ${h.num(fehltSturz, 2)} Punkte. Erst wenn auch der Alltag aus dem Takt gerät, weil sie nachts mehrfach wach wird und ihren Tag nicht mehr selbst einteilt, steigt Modul 6 in den höchsten Bereich und die Summe auf ${h.num(alltag.gesamt, 2)} Punkte, also Pflegegrad ${alltag.grad}.</p>
${h.table(['Modul (gewichtet)', 'letztes Gutachten', 'nach dem Sturz', 'mit gestörtem Alltag'], [
  ['1 Mobilität', h.num(vorher.m1, 2), h.num(sturz.m1, 2), h.num(alltag.m1, 2)],
  ['2 und 3 Kognition oder Verhalten', h.num(vorher.m23, 2), h.num(sturz.m23, 2), h.num(alltag.m23, 2)],
  ['4 Selbstversorgung', h.num(vorher.m4, 2), h.num(sturz.m4, 2), h.num(alltag.m4, 2)],
  ['5 Krankheit und Therapie', h.num(vorher.m5, 2), h.num(sturz.m5, 2), h.num(alltag.m5, 2)],
  ['6 Alltag und Kontakte', h.num(vorher.m6, 2), h.num(sturz.m6, 2), h.num(alltag.m6, 2)],
  ['Gesamtpunkte', h.num(vorher.gesamt, 2), h.num(sturz.gesamt, 2), h.num(alltag.gesamt, 2)],
  ['Pflegegrad', String(vorher.grad), String(sturz.grad), String(alltag.grad)],
], `Gewichtete Punkte nach Anlage 2 zu § 15 SGB XI; Pflegegrad 4 beginnt bei ${h.num(S[3])} Punkten.`, ['l', 'r', 'r', 'r'])}
<p>Die Lehre daraus: Schildern Sie im Antrag und beim Termin nicht nur das auslösende Ereignis, sondern jede Veränderung in allen sechs Modulen. Gerade Schlaf, Tagesstruktur und Kontakte (Modul 6) und das Begleiten zu Ärzten und Therapien (Modul 5) übersehen Familien oft, obwohl sie zusammen ${h.pct(P.nba.gewichtung.m5 + P.nba.gewichtung.m6, 0)} der Gewichtung ausmachen. Wie viel bis zum nächsten Grad fehlt, zeigt der Rechner oben; mit dem ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} gehen Sie jedes Kriterium einzeln durch. Was jeder Monat Abwarten kostet, rechnet der folgende Rechner aus.</p>
<!--mini:antragMonat-->

<h2>Was der höhere Grad außer Pflegegeld bringt</h2>
${h.table(['Wechsel', 'ab Gesamtpunkten', 'Tagespflege mehr im Monat', 'Heim: Kasse zahlt mehr', 'Monatsrente je Pflegejahr mehr', 'Pauschbetrag mehr'], stufen.map(([a, b]) => [
  `${a} auf ${b}`, h.num(S[b - 1], 1), h.eur(tagespflege(b) - tagespflege(a)), h.eur(vollstationaer(b) - vollstationaer(a)), h.eur(rd(a, b), 2), h.eur(pauschbetrag(b).voll - pauschbetrag(a).voll),
]), 'Beträge 2026 nach §§ 41 und 43 SGB XI; Rente bei reinem Pflegegeld nach § 166 Abs. 2 SGB VI; Pauschbetrag nach § 33b Abs. 6 EStG.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Der höhere Grad wirkt in viele Töpfe zugleich. Das Budget für die ${h.a('tagespflege', 'Tagespflege')} wächst, ebenso der Betrag, den die Kasse im Heim überweist. Der pflegebedingte ${h.a('eigenanteil-pflegeheim', 'Eigenanteil im Heim')} bleibt dagegen gleich, weil er innerhalb einer Einrichtung für die Grade 2 bis 5 einheitlich ist; im Heim ändert die Höherstufung also, was die Kasse überweist, nicht was die Familie zahlt. Für die Pflegeperson steigen die Rentenbeiträge (${h.src('sgb6_166', '§ 166 Abs. 2 SGB VI')}) und der steuerliche Pauschbetrag (${h.src('estg33b', '§ 33b Abs. 6 EStG')}). Wie viel Rente zusammenkommt, zeigt der ${h.a('rente-pflegende-angehoerige', 'Rentenrechner für pflegende Angehörige')}.</p>

<h2>Das Risiko: Der Grad kann auch sinken</h2>
<p>Ein Antrag auf Höherstufung öffnet das ganze Gutachten. Hat sich etwa die Mobilität nach einer Reha deutlich gebessert, während das Gedächtnis nachlässt, können die Punkte am Ende unter dem bisherigen Stand liegen. Eine Senkung setzt eine wesentliche Änderung der Verhältnisse voraus und wirkt grundsätzlich nur für die Zukunft (${h.src('sgb10_48', '§ 48 Abs. 1 SGB X')}). Bevor die Kasse einen niedrigeren Grad festsetzt, muss sie Sie anhören und Ihnen Gelegenheit geben, sich zu äußern (${h.src('sgb10_24', '§ 24 SGB X')}). Gegen den neuen Bescheid ist ein Widerspruch möglich.</p>
<p>Einen besonderen Schutz haben Menschen, die zum 1. Januar 2017 aus einer alten Pflegestufe in einen Pflegegrad übergeleitet wurden: Ihr Grad bleibt auch bei einer neuen Begutachtung erhalten, es sei denn, sie führt zu einem höheren Grad oder zu dem Ergebnis, dass überhaupt keine Pflegebedürftigkeit mehr besteht (${h.src('sgb11_140', '§ 140 Abs. 3 SGB XI')}). Für alle anderen gilt: Prüfen Sie vor dem Antrag ehrlich, ob sich in einzelnen Bereichen etwas verbessert hat, und rechnen Sie die Module einmal selbst durch.</p>

<h2>Wenn die Kinder aus der Ferne helfen</h2>
<p>Lebt die Mutter in Deutschland und der Sohn im Ausland, kann er den Antrag mit einer Vollmacht stellen. Ein Antrag gilt auch dann als gestellt, wenn er bei einer anderen Sozialbehörde, einer Gemeinde oder einer deutschen Auslandsvertretung eingeht; maßgeblich ist der Tag des Eingangs dort (${h.src('sgb1_16', '§ 16 SGB I')}). Bitten Sie die Kasse, Ihnen den Termin früh mitzuteilen, und sorgen Sie dafür, dass beim Gespräch jemand anwesend ist, der den Alltag kennt. Wird ein Telefon- oder Videointerview angeboten, können Sie als Unterstützungsperson zugeschaltet werden. Wie der Besuch selbst abläuft, steht unter ${h.a('begutachtung-medizinischer-dienst', 'Begutachtung durch den Medizinischen Dienst')}; was in den Graden ${h.a('pflegegrad-3', 'Pflegegrad 3')} und ${h.a('pflegegrad-4', 'Pflegegrad 4')} zusteht, auf den Seiten der Grade.</p>
`,
  },
  en: {
    slug: 'higher-care-grade',
    nav: 'Higher care grade',
    card: 'An informal request, fresh medical evidence and a clear view of the risk of a downgrade: how to get the higher grade when care needs grow.',
    title: 'Higher Care Grade Germany 2026: Request, Reassessment, Pay',
    description: 'Higher care grade in Germany 2026 (Höherstufung): informal request, new assessment, more money from the month of the request, and why the grade can also fall.',
    h1: 'Asking for a higher German care grade: when it pays and what it risks',
    intro: 'When daily life has become much harder since the last decision: what the request looks like, what the assessor scores again and from when more money arrives.',
    resume: `A request for a higher care grade (Höherstufung) makes sense when the person’s condition has worsened for good since the last decision. An informal letter to the long-term care fund (Pflegekasse) is enough; it then orders a new assessment, for which the Medical Service pulls the previous report and describes how things have changed. Book XI of the Social Code sets no waiting period after the last decision. Legally, the higher grade amends a decision with lasting effect under section 48 of Book X; more money is paid at the earliest from the month in which the request reaches the fund (section 33(1) SGB XI). Moving from grade 3 to grade 4 adds ${EN.eur(mehr34)} of care allowance and ${EN.eur(sach34)} of services a month, so waiting three months costs ${EN.eur(mehr34 * 3)} in allowance alone. The new report scores every module again, though: if it shows a substantial improvement, the fund may lower the grade for the future after hearing you. People transferred from an old care level in 2017 keep their grade as long as any need for care remains (section 140(3) SGB XI).`,
    faqs: [
      { q: 'How do I request a higher grade for a parent from abroad?', a: 'With a signed power of attorney you can write to the fund in your parent’s name. One sentence is enough: “Hiermit beantrage ich die Höherstufung des Pflegegrades” (I request a higher care grade), with name, insurance number and the reason. A request also counts as made on the day it reaches a German consulate or another social security office, which then forwards it. Send it by a route that proves receipt.' },
      { q: 'From which month is the higher amount paid?', a: `From the month in which the request reaches the fund, provided the higher grade already applied then; if it arose later, from that later point. Nothing is paid for months before the request (section 33(1) SGB XI). After the new decision the fund pays the difference in one sum. From grade 2 to grade 3 that is ${EN.eur(mehr23)} of allowance for every month since the request.` },
      { q: 'Can a request for a higher grade end in a lower one?', a: 'Yes, under conditions. The new report scores every criterion again. If it finds fewer points because something has improved substantially, the fund may amend the decision for the future (section 48 SGB X). It must first hear you (section 24 SGB X), and the report must explain what made the person more independent. You can lodge an objection against a lower grade within the usual deadline.' },
      { q: 'Is there a waiting period between two requests?', a: 'German law sets none. What matters is whether the need for help has really changed since the last report, and whether the change is expected to last at least six months. Repeating the same limitations shortly after a decision brings no new facts. If you think the first decision was already wrong, an objection within one month is the better route than a new request.' },
      { q: 'Will the reassessment be done by phone or video?', a: `It can be. From age ${R.telefon_hoeherstufung_ab_jahren}, the assessment guidelines allow a structured phone or video interview for a higher grade request if the insured person agrees and the assessor finds it suitable. With cognitive impairment a support person must take part, which can be a relative joining from abroad. If daily life is hard to describe on the phone, decline and ask for a home visit instead.` },
      { q: 'What does a higher grade change for the family carer?', a: `The pension contributions the fund pays for the carer rise with the grade. With allowance only, a year of caring at grade 3 adds ${EN.eur(r3.renteProJahr, 2)} of monthly German pension, at grade 4 ${EN.eur(r4.renteProJahr, 2)}. The carer’s tax lump sum grows from ${EN.eur(pb3)} to ${EN.eur(pb4)} a year if the carer takes no money for caring; the highest grade held during the calendar year counts.` },
    ],
    body: (h) => `
<h2>When a higher grade is the right route</h2>
<p>A care grade decision stays in force until it is changed. If the condition gets worse afterwards, the decision no longer fits, but the fund will usually only act once the family asks. Typical triggers are a fall with a fracture, a stroke, progressing dementia, new incontinence or a hospital stay after which the person can no longer get up alone. The new limitations must be expected to last at least six months (${h.src('sgb11_14', 'section 14(1) SGB XI')}); a bad flu or the first weeks after an operation do not qualify.</p>
<p>If the decision was already too low when it was issued, the ${h.a('widerspruch-pflegegrad', 'objection')} is the tool. The four procedures around a care grade differ mainly in who starts them and from when money flows.</p>
${h.table(['Procedure', 'fits when', 'Deadline', 'Effect'], [
  ['Request for a higher grade', 'the condition worsened after the decision', 'none', 'more money from the month of the request at the earliest'],
  ['Objection (Widerspruch)', 'the decision was too low from the start', `${h.num(V.widerspruch_monate)} month from notification`, 'back pay from the original application'],
  ['Review request (Überprüfungsantrag)', 'the deadline passed and the report was wrong', 'none', `back pay up to ${h.num(R.ueberpruefung_rueckwirkung_jahre)} years`],
  ['Repeat assessment by the fund', 'the fund has concrete signs of improvement', 'no request', 'a lower grade only applies for the future'],
], 'Legal basis: section 33 SGB XI, sections 44 and 48 SGB X, section 84 SGG, assessment guidelines of the Medizinischer Dienst Bund.', ['l', 'l', 'l', 'l'])}

<h2>How to make the request</h2>
<p>There is no compulsory form. Long-term care benefits are paid on request (${h.src('sgb11_33', 'section 33(1) SGB XI')}), and an informal letter to the fund is enough. Many funds then send their own form, which you can fill in but need not wait for: the month of your first letter is what counts. Say briefly what has changed and since when, for example that since a hip fracture in March your mother can no longer shower alone or get to the toilet alone at night.</p>
<p>The more concrete the paperwork, the easier it is for the assessor to record the change:</p>
<ul>
<li><strong>Reports since the last assessment</strong>: hospital discharge letter, specialist findings, rehabilitation report.</li>
<li><strong>A two-week care diary</strong> showing not just the help given but what the person used to manage alone and no longer can.</li>
<li><strong>The current medication plan</strong> and prescriptions for therapy or nursing care.</li>
<li><strong>The last report</strong> for your own comparison; the assessor will pull it anyway.</li>
</ul>
<p>Write a short German summary at the top if your notes are in English; the case handler and the assessor work in German.</p>

<h2>What the new report does differently</h2>
<p>For a higher grade request the assessor does not start from scratch. Under the ${h.src('mdRichtlinie', 'assessment guidelines')} she must pull the existing reports, assess the development since then and document it in detail. Simply referring to the earlier report is not enough: the interim history records how the illnesses developed, what improved or worsened in each module and why. If she recommends a lower grade, she must also explain what reduced the limitations.</p>
<p>Unlike a first application, a structured phone or video interview is allowed from age ${h.num(R.telefon_hoeherstufung_ab_jahren)} if the insured person agrees (${h.src('sgb11_142a', 'section 142a SGB XI')}). For people with cognitive impairment, mental health problems or language barriers a support person must then take part, and for someone with dementia living alone the assessor must check especially carefully whether the format works. If daily life is easier to show than to describe, decline the call and ask for a home visit.</p>

<h2>Worked example: why not every decline is enough</h2>
<p>A woman in her late seventies had ${h.num(vorher.gesamt, 2)} points in her last report, which is care grade ${vorher.grad}. After a fall she can only walk around the flat with help, needs much more support showering and dressing, and moves up one band in both mobility and self-care. The engine gives ${h.num(sturz.gesamt, 2)} points: she stays at grade ${sturz.grad}, ${h.num(fehltSturz, 2)} points short of the next grade. Only when daily life also falls apart, because she wakes several times a night and can no longer plan her day, does module 6 reach the top band and the total rise to ${h.num(alltag.gesamt, 2)} points, which is grade ${alltag.grad}.</p>
${h.table(['Module (weighted)', 'last report', 'after the fall', 'with daily life disrupted'], [
  ['1 Mobility', h.num(vorher.m1, 2), h.num(sturz.m1, 2), h.num(alltag.m1, 2)],
  ['2 and 3 Cognition or behaviour', h.num(vorher.m23, 2), h.num(sturz.m23, 2), h.num(alltag.m23, 2)],
  ['4 Self-care', h.num(vorher.m4, 2), h.num(sturz.m4, 2), h.num(alltag.m4, 2)],
  ['5 Illness and treatment', h.num(vorher.m5, 2), h.num(sturz.m5, 2), h.num(alltag.m5, 2)],
  ['6 Daily life and contact', h.num(vorher.m6, 2), h.num(sturz.m6, 2), h.num(alltag.m6, 2)],
  ['Total points', h.num(vorher.gesamt, 2), h.num(sturz.gesamt, 2), h.num(alltag.gesamt, 2)],
  ['Care grade', String(vorher.grad), String(sturz.grad), String(alltag.grad)],
], `Weighted points under Annex 2 to section 15 SGB XI; grade 4 starts at ${h.num(S[3])} points.`, ['l', 'r', 'r', 'r'])}
<p>The lesson: in the request and at the visit, describe not only the event that triggered it but every change across all six modules. Sleep, daily structure and contacts (module 6) and accompanying the person to doctors and therapy (module 5) are often overlooked, although together they carry ${h.pct(P.nba.gewichtung.m5 + P.nba.gewichtung.m6, 0)} of the weighting. The calculator at the top shows how far the next grade is; the ${h.a('pflegegrad-rechner', 'care grade calculator')} takes you through every criterion. The calculator below shows what each month of waiting costs.</p>
<!--mini:antragMonat-->

<h2>What the higher grade brings beyond the allowance</h2>
${h.table(['Change', 'from total points', 'Extra day care per month', 'Care home: fund pays more', 'Extra monthly pension per year of care', 'Extra tax lump sum'], stufen.map(([a, b]) => [
  `${a} to ${b}`, h.num(S[b - 1], 1), h.eur(tagespflege(b) - tagespflege(a)), h.eur(vollstationaer(b) - vollstationaer(a)), h.eur(rd(a, b), 2), h.eur(pauschbetrag(b).voll - pauschbetrag(a).voll),
]), '2026 amounts under sections 41 and 43 SGB XI; pension with allowance only under section 166(2) SGB VI; lump sum under section 33b(6) Income Tax Act.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>A higher grade feeds several budgets at once. The ${h.a('tagespflege', 'day care')} budget grows, and so does the amount the fund pays a care home. The care-related ${h.a('eigenanteil-pflegeheim', 'co-payment in a home')} stays the same, because within one home it is uniform for grades 2 to 5; in a home the higher grade changes what the fund pays, not what the family pays. For the carer, pension contributions (${h.src('sgb6_166', 'section 166(2) SGB VI')}) and the tax lump sum (${h.src('estg33b', 'section 33b(6) Income Tax Act')}) rise. The ${h.a('rente-pflegende-angehoerige', 'carer pension calculator')} shows how much pension builds up.</p>

<h2>The risk: the grade can also fall</h2>
<p>A request for a higher grade opens up the whole assessment. If mobility has improved markedly after rehabilitation while memory is fading, the total may end up below the old score. A reduction requires a substantial change in circumstances and in principle only applies for the future (${h.src('sgb10_48', 'section 48(1) SGB X')}). Before setting a lower grade the fund must hear you and give you the chance to comment (${h.src('sgb10_24', 'section 24 SGB X')}). You can object to the new decision.</p>
<p>People who were transferred from an old care level into a care grade on 1 January 2017 enjoy special protection: their grade is kept at any new assessment unless it leads to a higher grade or finds that there is no longer any need for care at all (${h.src('sgb11_140', 'section 140(3) SGB XI')}). Everyone else should check honestly before applying whether anything has improved, and work through the modules once themselves.</p>

<h2>Helping from another country</h2>
<p>If your father lives in Germany and you live abroad, you can make the request with a power of attorney. It counts as made on the day it reaches another social security office, a municipality or a German mission abroad (${h.src('sgb1_16', 'section 16 SGB I')}). Ask the fund to tell you the date of the assessment early, and make sure someone who knows daily life is present. If a phone or video interview is offered, you can join as the support person. How the visit itself works is explained under ${h.a('begutachtung-medizinischer-dienst', 'the Medical Service assessment')}; what each grade pays is on the pages for ${h.a('pflegegrad-3', 'care grade 3')} and ${h.a('pflegegrad-4', 'care grade 4')}.</p>
`,
  },
});
