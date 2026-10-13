import { defineGuide } from '../../lib/guide-types';
import { pflegegeld, sachleistung } from '../../lib/engine/leistungen';
import type { Grad } from '../../lib/engine/params';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Bescheid Grad 2, Widerspruch erfolgreich mit Grad 3, vier Monate seit dem Antrag. */
const V = P.verfahren;
const R = P.rechtsweg;
const mehr23 = pflegegeld(3) - pflegegeld(2);
const nach4 = mehr23 * 4;
const stufen: Array<[Grad, Grad]> = [[1, 2], [2, 3], [3, 4], [4, 5]];

export default defineGuide({
  id: 'widerspruch-pflegegrad',
  group: 'grad',
  order: 90,
  mini: 'widerspruchWert',
  related: ['begutachtung-medizinischer-dienst', 'hoeherstufung-pflegegrad', 'pflegegrad-rechner', 'pflegegrad-beantragen', 'pflegegrad-2', 'pflegegrad-3'],
  sources: ['sgg84', 'sgg66', 'sgg87', 'sgg88', 'sgg183', 'sgg73', 'sgb10_44', 'sgb10_25', 'sgb11_18c', 'sgb11_142a', 'sgb1_36a', 'mdRichtlinie'],
  de: {
    slug: 'widerspruch-pflegegrad',
    nav: 'Widerspruch gegen den Pflegegrad',
    card: 'Ein Monat Frist, erst fristwahrend einlegen, dann mit dem Gutachten begründen: so wird aus einem zu niedrigen Grad der richtige.',
    title: 'Widerspruch Pflegegrad 2026: Frist, Begründung, Muster',
    description: `Widerspruch gegen den Pflegegrad 2026: ${V.widerspruch_monate} Monat Frist ab Bescheid, Begründung aus dem Gutachten, neues Gutachten, kostenfreie Klage und mögliche Nachzahlung.`,
    h1: 'Widerspruch gegen den Pflegegrad: Frist wahren, Gutachten zerlegen',
    intro: 'Wenn der Bescheid einen zu niedrigen Grad nennt oder den Antrag ablehnt: die Fristen, der Aufbau der Begründung und was danach passiert.',
    resume: `Gegen den Bescheid der Pflegekasse ist innerhalb von ${V.widerspruch_monate} Monat nach Bekanntgabe Widerspruch möglich, bei Bekanntgabe im Ausland innerhalb von ${R.widerspruch_ausland_monate} Monaten (§ 84 SGG). Fehlt die Rechtsbehelfsbelehrung oder ist sie falsch, verlängert sich die Frist auf ${V.widerspruch_ohne_belehrung_jahre} Jahr (§ 66 SGG). Der Widerspruch muss schriftlich, in qualifizierter elektronischer Form oder zur Niederschrift bei der Kasse eingelegt werden; eine Begründung kann nachgereicht werden. Hilft die Kasse nicht ab, folgt in der Regel ein neues Gutachten durch eine bisher nicht beteiligte Gutachterin, grundsätzlich in der Wohnung und nie als reines Telefoninterview (§ 142a SGB XI). Ist der Widerspruchsbescheid negativ, bleibt ${R.klage_monate} Monat für die Klage beim Sozialgericht, die für Versicherte gerichtskostenfrei ist (§ 183 SGG). Es lohnt sich: Wird statt Pflegegrad 2 der Grad 3 anerkannt, zahlt die Kasse ${DE.eur(mehr23)} mehr Pflegegeld im Monat, nach vier Monaten Verfahren also ${DE.eur(nach4)} nach.`,
    faqs: [
      { q: 'Muss ich den Widerspruch gegen den Pflegegrad sofort begründen?', a: 'Nein. Für die Frist genügt ein kurzer unterschriebener Satz, dass Sie gegen den Bescheid vom konkreten Datum Widerspruch einlegen und die Begründung nachreichen. Bitten Sie im selben Schreiben um das vollständige Gutachten, falls es nicht beilag. Nennen Sie selbst ein Datum, bis zu dem die Begründung folgt, und nutzen Sie die Zeit für den Abgleich mit Ihrem Pflegetagebuch.' },
      { q: 'Reicht eine E-Mail an die Pflegekasse als Widerspruch?', a: 'Darauf sollten Sie sich nicht verlassen. § 84 SGG verlangt Schriftform, die elektronische Form nach § 36a SGB I mit qualifizierter Signatur oder über bestimmte Portale mit Identitätsnachweis, oder die Niederschrift bei der Kasse. Eine einfache E-Mail gehört nicht dazu. Sicher sind ein unterschriebener Brief mit Zustellnachweis oder die persönliche Abgabe mit Eingangsstempel auf Ihrer Kopie.' },
      { q: 'Kommt beim Widerspruch derselbe Gutachter noch einmal?', a: 'Zuerst prüft die Gutachterin des ersten Gutachtens, ob Ihr Widerspruch neue Gesichtspunkte enthält. Bleibt sie bei ihrem Ergebnis, muss nach den Begutachtungs-Richtlinien eine bei der Vorbegutachtung nicht beteiligte Person das Widerspruchsgutachten erstellen, grundsätzlich bei Ihnen zu Hause. Nach Aktenlage wird nur ausnahmsweise entschieden, wenn das erste Gutachten die Lage schon ausreichend dargestellt hat.' },
      { q: 'Was kann ich tun, wenn die Widerspruchsfrist schon abgelaufen ist?', a: `Dann ist ein Überprüfungsantrag nach § 44 SGB X möglich. War der Bescheid falsch, weil von einem unrichtigen Sachverhalt ausgegangen wurde, muss die Kasse ihn auch nach Ablauf der Frist für die Vergangenheit korrigieren; Leistungen gibt es dann bis zu ${R.ueberpruefung_rueckwirkung_jahre} Jahre rückwirkend, gerechnet ab Beginn des Jahres der Antragstellung. Hat sich der Zustand seither verschlechtert, ist zusätzlich ein Antrag auf Höherstufung sinnvoll.` },
      { q: 'Kostet eine Klage vor dem Sozialgericht Geld?', a: 'Gerichtskosten fallen für Versicherte und Leistungsempfänger nicht an (§ 183 SGG). Einen Anwalt schreibt das Gesetz vor dem Sozialgericht nicht vor; Sie können den Rechtsstreit selbst führen, und volljährige Familienangehörige dürfen Sie unentgeltlich vertreten (§ 73 SGG). Die Klage ist innerhalb eines Monats nach dem Widerspruchsbescheid zu erheben.' },
      { q: 'Wie lange darf sich die Pflegekasse mit dem Widerspruch Zeit lassen?', a: `Das SGB XI nennt für den Widerspruch keine eigene Frist wie die ${V.entscheidung_arbeitstage} Arbeitstage beim Erstantrag. Ist nach ${R.untaetigkeit_widerspruch_monate} Monaten ohne zureichenden Grund nicht entschieden, ist aber eine Untätigkeitsklage beim Sozialgericht zulässig (§ 88 Abs. 2 SGG). Fragen Sie vorher schriftlich nach dem Stand und setzen Sie eine Frist, damit Sie den Verlauf belegen können.` },
    ],
    body: (h) => `
<h2>Die Fristen</h2>
${h.table(['Schritt', 'Frist', 'Grundlage'], [
  ['Widerspruch gegen den Bescheid', `${h.num(V.widerspruch_monate)} Monat ab Bekanntgabe`, '§ 84 Abs. 1 SGG'],
  ['Bescheid im Ausland bekanntgegeben', `${h.num(R.widerspruch_ausland_monate)} Monate`, '§ 84 Abs. 1 SGG'],
  ['Rechtsbehelfsbelehrung fehlt oder ist falsch', `${h.num(V.widerspruch_ohne_belehrung_jahre)} Jahr`, '§ 66 Abs. 2 SGG'],
  ['Kasse entscheidet nicht über den Widerspruch', `Untätigkeitsklage nach ${h.num(R.untaetigkeit_widerspruch_monate)} Monaten`, '§ 88 Abs. 2 SGG'],
  ['Klage nach dem Widerspruchsbescheid', `${h.num(R.klage_monate)} Monat, im Ausland ${h.num(R.klage_ausland_monate)}`, '§ 87 SGG'],
  ['Frist verpasst: Überprüfungsantrag', `rückwirkend bis ${h.num(R.ueberpruefung_rueckwirkung_jahre)} Jahre`, '§ 44 SGB X'],
], 'Rechtsweg gegen Bescheide der Pflegekasse.', ['l', 'l', 'l'])}
<p>Die Monatsfrist beginnt mit der Bekanntgabe, nicht mit dem Datum auf dem Briefkopf. Notieren Sie, wann der Bescheid im Briefkasten lag, und legen Sie den Widerspruch so ein, dass er sicher vor Ablauf bei der Kasse ist (${h.src('sgg84', '§ 84 SGG')}). Die Frist ist auch gewahrt, wenn das Schreiben bei einer anderen deutschen Behörde, einem anderen Versicherungsträger oder einer deutschen Auslandsvertretung eingeht. Fehlt im Bescheid der Hinweis auf Frist und Stelle, gilt die Jahresfrist (${h.src('sgg66', '§ 66 SGG')}).</p>

<h2>Erst die Frist sichern, dann begründen</h2>
<p>Für die Frist genügt ein kurzer Brief: Name und Versichertennummer, Datum des Bescheids, der Satz „Hiermit lege ich Widerspruch gegen den Bescheid vom … ein. Die Begründung reiche ich nach.“ und die Unterschrift der versicherten Person oder ihrer Bevollmächtigten. Die Form ist streng: schriftlich, elektronisch nur mit qualifizierter Signatur oder über ein Portal mit Identitätsnachweis (${h.src('sgb1_36a', '§ 36a SGB I')}), oder zur Niederschrift in der Geschäftsstelle. Bitten Sie im selben Schreiben um das vollständige Gutachten, falls es nicht beilag; Sie können es jederzeit nachträglich verlangen (${h.src('sgb11_18c', '§ 18c Abs. 2 SGB XI')}). Darüber hinaus haben Sie das Recht, die Akte einzusehen (${h.src('sgb10_25', '§ 25 SGB X')}).</p>

<h2>Das Gutachten Kriterium für Kriterium prüfen</h2>
<p>Eine gute Begründung sagt nicht „Meine Mutter braucht mehr Hilfe“, sondern: Bei welchem Kriterium ist welche Einstufung falsch, und woran sieht man das. Legen Sie das Gutachten neben das Pflegetagebuch und gehen Sie die Module der Reihe nach durch. Häufige Fehler, die sich belegen lassen:</p>
<ul>
<li><strong>Anleiten als „selbständig“ gewertet.</strong> Wer zum Waschen, Anziehen oder Essen aufgefordert werden muss, ist nach den Begutachtungs-Richtlinien mindestens überwiegend selbständig; wer die Handlung gelenkt bekommen muss, überwiegend unselbständig.</li>
<li><strong>Verhalten nur am Besuchstag beurteilt.</strong> In Modul 3 zählt die Häufigkeit über zwei Wochen. Nächtliche Unruhe an vier Nächten pro Woche ist „häufig“, auch wenn die Person beim Termin ruhig war.</li>
<li><strong>Arzt- und Therapiebesuche vergessen.</strong> Regelmäßige Besuche, zu denen jemand begleiten muss, zählen in Modul 5, ebenso Medikamente, die gestellt oder verabreicht werden.</li>
<li><strong>Inkontinenz nicht festgestellt.</strong> Die Kriterien dazu gehen nur ein, wenn „überwiegend“ oder „vollständig inkontinent“ vermerkt ist oder eine künstliche Ableitung besteht.</li>
</ul>
<p>Schreiben Sie zu jedem Punkt Datum, Uhrzeit und Art der Hilfe aus dem Tagebuch dazu, und legen Sie neue Arzt- oder Klinikberichte bei. Wie viele Punkte bis zum nächsten Grad fehlen, zeigt der Rechner unten; mit dem ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} lässt sich die eigene Einschätzung vollständig nachrechnen.</p>
<!--mini:hoeherstufung-->

<h2>Was danach passiert</h2>
<p>Die Kasse legt den Widerspruch mit Ihrer Begründung dem Medizinischen Dienst vor. Zunächst prüft die Erstgutachterin, ob sie aufgrund neuer Aspekte zu einem anderen Ergebnis kommt. Revidiert sie nicht, erstellt eine bei der Vorbegutachtung nicht beteiligte Person das Widerspruchsgutachten, in der Regel bei einem neuen Hausbesuch (${h.src('mdRichtlinie', 'Begutachtungs-Richtlinien')}). Ein Telefoninterview ist beim Widerspruch ausgeschlossen (${h.src('sgb11_142a', '§ 142a Abs. 2 SGB XI')}). Das neue Gutachten muss auf Ihre Begründung eingehen und angeben, ob der höhere Grad schon zum Zeitpunkt der ersten Begutachtung bestand oder erst später eingetreten ist. Davon hängt ab, ab wann nachgezahlt wird.</p>
<p>Gibt die Kasse dem Widerspruch statt, erhalten Sie einen Abhilfebescheid. Andernfalls entscheidet die von der Selbstverwaltung bestimmte Widerspruchsstelle und schickt einen schriftlich begründeten Widerspruchsbescheid (§ 85 SGG). Ab dessen Bekanntgabe läuft ${h.num(R.klage_monate)} Monat für die Klage beim Sozialgericht (${h.src('sgg87', '§ 87 SGG')}). Gerichtskosten entstehen Versicherten nicht (${h.src('sgg183', '§ 183 SGG')}), und den Prozess können Sie selbst führen (${h.src('sgg73', '§ 73 SGG')}).</p>

<h2>Was ein erfolgreicher Widerspruch wert ist</h2>
${h.table(['Von Grad zu Grad', 'Pflegegeld mehr im Monat', 'Sachleistung mehr im Monat', 'Pflegegeld mehr im Jahr'], stufen.map(([a, b]) => [
  `${a} auf ${b}`, h.eur(pflegegeld(b) - pflegegeld(a)), h.eur(sachleistung(b) - sachleistung(a)), h.eur((pflegegeld(b) - pflegegeld(a)) * 12),
]), 'Leistungsbeträge 2026 nach §§ 36 und 37 SGB XI; Pflegegrad 1 hat weder Pflegegeld noch Sachleistung.', ['l', 'r', 'r', 'r'])}
<p>Bestand der höhere Grad schon bei Antragstellung, zahlt die Kasse den Unterschied ab dem Antragsmonat nach. Im Beispiel eines Widerspruchs von Grad 2 auf Grad 3 nach vier Monaten sind das ${h.eur(nach4)} Pflegegeld, dazu höhere Beträge für Tagespflege und im Heim. Der Rechner oben zeigt den Betrag für Ihren Fall.</p>

<h2>Wenn Kinder aus der Ferne widersprechen</h2>
<p>Lebt die Mutter in Deutschland und die Tochter im Ausland, gilt die normale Monatsfrist, denn bekanntgegeben wurde der Bescheid an der deutschen Adresse. Die verlängerte Frist von ${h.num(R.widerspruch_ausland_monate)} Monaten greift nur, wenn der Bescheid selbst im Ausland zugestellt wurde. Unterschreiben muss die versicherte Person oder wer eine Vollmacht hat; schicken Sie eine Kopie der Vollmacht mit. Bitten Sie die Kasse, Schreiben zusätzlich an Ihre Anschrift zu senden, und lassen Sie sich vor Ort von einer Pflegeberatung nach § 7a SGB XI unterstützen, die den Hilfebedarf anhand der Ergebnisse der Begutachtung mit der Familie durchgeht. Für das Widerspruchsgutachten gilt dasselbe wie beim ersten Termin: Es sollte jemand anwesend sein, der den Alltag kennt.</p>

<h2>Widerspruch oder neuer Antrag?</h2>
<p>Der Widerspruch ist richtig, wenn der Bescheid schon im Moment der Begutachtung falsch war. Hat sich der Zustand erst danach verschlechtert, etwa nach einem Sturz oder einem Krankenhausaufenthalt, ist der ${h.a('hoeherstufung-pflegegrad', 'Antrag auf Höherstufung')} der passende Weg; beides lässt sich auch kombinieren. Ist die Frist verstrichen und war das Gutachten nachweislich falsch, bleibt der Überprüfungsantrag (${h.src('sgb10_44', '§ 44 SGB X')}). Wie die erste Begutachtung abläuft und worauf die Gutachterin achtet, steht unter ${h.a('begutachtung-medizinischer-dienst', 'Begutachtung durch den Medizinischen Dienst')}.</p>
`,
  },
  en: {
    slug: 'objecting-to-a-care-grade',
    nav: 'Objecting to a care grade',
    card: 'One month to object, three if the letter reached you abroad: secure the deadline first, then take the report apart point by point.',
    title: 'Pflegegrad Objection 2026: Deadline, Reasons, Next Steps',
    description: `Objecting to a German care grade in 2026: ${V.widerspruch_monate} month from the decision, ${R.widerspruch_ausland_monate} if delivered abroad, reasons from the report, new assessment, free social court.`,
    h1: 'Objecting to a German care grade: secure the deadline, test the report',
    intro: 'When the decision letter gives too low a grade or refuses care altogether: the deadlines, how to build the reasons and what happens next.',
    resume: `An objection (Widerspruch) against the care fund’s decision must be lodged within ${V.widerspruch_monate} month of notification, or within ${R.widerspruch_ausland_monate} months if the decision was delivered abroad (section 84 of the Social Courts Act, SGG). If the letter lacks correct information on how to appeal, the deadline extends to ${V.widerspruch_ohne_belehrung_jahre} year (section 66 SGG). The objection must be in writing, in qualified electronic form or recorded in person at the fund; the reasons can follow later. If the fund does not change its mind, a new assessment usually follows by an assessor not involved before, normally in the home and never as a phone interview alone (section 142a SGB XI). If the objection is rejected, there is ${R.klage_monate} month to go to the social court (Sozialgericht), which charges insured people no court fees (section 183 SGG). The effort pays: if grade 3 is recognised instead of grade 2, the allowance rises by ${EN.eur(mehr23)} a month, so after four months of proceedings ${EN.eur(nach4)} is paid back.`,
    faqs: [
      { q: 'Do I have to give reasons straight away?', a: 'No. To meet the deadline, a short signed letter saying that you object to the decision of a given date and will send reasons later is enough. In the same letter ask for the full assessment report if it was not enclosed. Name a date by which the reasons will follow, and use that time to compare the report line by line with your care diary.' },
      { q: 'Does the deadline change if the letter reached me abroad?', a: `Yes. If the decision was notified abroad, the objection period is ${R.widerspruch_ausland_monate} months instead of ${V.widerspruch_monate} (section 84(1) SGG), and the same applies to a later court action. That helps when the insured person lives outside Germany. If the letter went to the parent’s German address, the ordinary one-month period applies, even if you, the child, only saw it later.` },
      { q: 'Can I lodge the objection at a German consulate?', a: 'Yes. Under section 84(2) SGG the deadline is also met if the objection reaches another German authority, another social insurance agency or a German consular office; it is then forwarded. Keep a receipt or a stamped copy. For a parent living in Germany it is simpler to send a signed letter to the fund by tracked post or hand it in at a branch.' },
      { q: 'Is an email to the care fund a valid objection?', a: 'Do not rely on it. Section 84 SGG requires written form, the electronic form under section 36a SGB I with a qualified electronic signature or certain identity-verified portals, or a record made at the fund. A plain email is not on that list. A signed letter with proof of delivery, or a copy stamped on receipt, is the safe route, also from abroad.' },
      { q: 'What if I missed the objection deadline?', a: `File a review request under section 44 SGB X. If the decision was wrong because it relied on incorrect facts, the fund must correct it for the past even after the deadline; benefits are then paid back for up to ${R.ueberpruefung_rueckwirkung_jahre} years, counted from the start of the year of the request. If the condition has worsened since, apply for a higher grade at the same time.` },
      { q: 'Do we need a lawyer for the social court?', a: 'No. Section 73 SGG allows you to conduct the case yourself before the social court, and adult family members may represent you free of charge. Insured people pay no court fees (section 183 SGG). The action must be brought within one month of the objection decision, three months if it was notified abroad, so the date on the objection decision matters.' },
    ],
    body: (h) => `
<h2>The deadlines</h2>
${h.table(['Step', 'Deadline', 'Legal basis'], [
  ['Objection to the decision', `${h.num(V.widerspruch_monate)} month from notification`, 's. 84(1) SGG'],
  ['Decision notified abroad', `${h.num(R.widerspruch_ausland_monate)} months`, 's. 84(1) SGG'],
  ['Appeal information missing or wrong', `${h.num(V.widerspruch_ohne_belehrung_jahre)} year`, 's. 66(2) SGG'],
  ['Fund does not decide on the objection', `court action after ${h.num(R.untaetigkeit_widerspruch_monate)} months`, 's. 88(2) SGG'],
  ['Court action after the objection decision', `${h.num(R.klage_monate)} month, ${h.num(R.klage_ausland_monate)} if abroad`, 's. 87 SGG'],
  ['Deadline missed: review request', `back pay up to ${h.num(R.ueberpruefung_rueckwirkung_jahre)} years`, 's. 44 SGB X'],
], 'Legal remedies against decisions of the German care fund.', ['l', 'l', 'l'])}
<p>The month runs from notification, not from the date printed on the letter. Note when the decision arrived and make sure the objection reaches the fund before the period ends (${h.src('sgg84', 'section 84 SGG')}). The deadline is also met if the objection reaches another German authority, another insurance agency or a German consulate. If the letter does not tell you the deadline and where to object, you have a year (${h.src('sgg66', 'section 66 SGG')}).</p>

<h2>Secure the deadline first, argue later</h2>
<p>A short letter is enough to stop the clock: name and insurance number, date of the decision, the sentence “Hiermit lege ich Widerspruch gegen den Bescheid vom … ein. Die Begründung reiche ich nach.” (I object to the decision of … and will send reasons later) and the signature of the insured person or their attorney. The form is strict: on paper, electronically only with a qualified signature or through an identity-verified portal (${h.src('sgb1_36a', 'section 36a SGB I')}), or recorded in person. Ask in the same letter for the full report if it was not enclosed; you can request it at any time (${h.src('sgb11_18c', 'section 18c(2) SGB XI')}) and you have a right to inspect the file (${h.src('sgb10_25', 'section 25 SGB X')}).</p>

<h2>Testing the report criterion by criterion</h2>
<p>Strong reasons do not say “my mother needs more help”. They say which rating on which criterion is wrong and what shows it. Put the report next to your care diary and go through the modules in order. Frequent errors that can be documented:</p>
<ul>
<li><strong>Prompting scored as independent.</strong> Under the assessment guidelines, someone who must be prompted to wash, dress or eat is at least “mostly independent”; someone who must be guided through the task is “mostly dependent”.</li>
<li><strong>Behaviour judged on the day only.</strong> Module 3 counts frequency over two weeks. Restlessness on four nights a week is “often”, even if the person was calm during the visit.</li>
<li><strong>Doctor and therapy visits left out.</strong> Regular appointments where someone has to accompany count in module 5, as do tablets that have to be prepared or given.</li>
<li><strong>Incontinence not recorded.</strong> Those criteria only count if “mostly” or “fully incontinent” is noted, or there is a catheter or stoma.</li>
</ul>
<p>For each point add the date, time and type of help from the diary, and enclose new medical or hospital letters. The fund works in German, so a short German summary at the top of your notes helps the case handler. The calculator below shows how many points are missing for the next grade; the ${h.a('pflegegrad-rechner', 'care grade calculator')} lets you rework the whole assessment.</p>
<!--mini:hoeherstufung-->

<h2>What happens next</h2>
<p>The fund passes the objection and your reasons to the Medical Service. First, the original assessor checks whether new points lead to a different result. If not, an assessor who was not involved before prepares the objection report, normally at a new home visit (${h.src('mdRichtlinie', 'assessment guidelines')}). A phone interview is excluded for objections (${h.src('sgb11_142a', 'section 142a(2) SGB XI')}). The new report must address your reasons and state whether the higher grade already applied at the first assessment or only arose later; that decides how far back the money goes.</p>
<p>If the fund agrees, it issues a revised decision. Otherwise the objections body set up by the fund’s self-governing board sends a written, reasoned objection decision (section 85 SGG), and from notification you have ${h.num(R.klage_monate)} month to take the case to the social court (${h.src('sgg87', 'section 87 SGG')}). Insured people pay no court fees (${h.src('sgg183', 'section 183 SGG')}) and may represent themselves (${h.src('sgg73', 'section 73 SGG')}).</p>

<h2>What a successful objection is worth</h2>
${h.table(['From grade to grade', 'Extra allowance per month', 'Extra services per month', 'Extra allowance per year'], stufen.map(([a, b]) => [
  `${a} to ${b}`, h.eur(pflegegeld(b) - pflegegeld(a)), h.eur(sachleistung(b) - sachleistung(a)), h.eur((pflegegeld(b) - pflegegeld(a)) * 12),
]), '2026 amounts under sections 36 and 37 SGB XI; grade 1 has neither allowance nor services in kind.', ['l', 'r', 'r', 'r'])}
<p>If the higher grade already applied when the application was made, the fund pays the difference from the month of application. For an objection from grade 2 to grade 3 after four months that is ${h.eur(nach4)} of allowance, plus higher day care and care home amounts. The calculator at the top works it out for your case.</p>

<h2>Objection or new application?</h2>
<p>Object when the decision was already wrong at the time of the assessment. If the condition only worsened afterwards, after a fall or a hospital stay for instance, a ${h.a('hoeherstufung-pflegegrad', 'request for a higher grade')} is the right route; the two can be combined. If the deadline has passed and the report was demonstrably wrong, there is still the review request (${h.src('sgb10_44', 'section 44 SGB X')}). How the first visit works is explained under ${h.a('begutachtung-medizinischer-dienst', 'the Medical Service assessment')}.</p>
`,
  },
});
