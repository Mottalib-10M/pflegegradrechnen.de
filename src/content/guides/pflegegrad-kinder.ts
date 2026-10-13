import { defineGuide } from '../../lib/guide-types';
import { nba, leereEingabe, MODUL5_LEER, gradAusPunkten } from '../../lib/engine/nba';
import { pflegegeld } from '../../lib/engine/leistungen';
import { rentenpunkte, pauschbetrag } from '../../lib/engine/angehoerige';
import type { Grad } from '../../lib/engine/params';
import { P, DE, EN } from '../../lib/fmt';

/**
 * Beispiele aus dem Motor, zwei Säuglinge unter 18 Monaten (§ 15 Abs. 7 SGB XI): viermal täglich Medikamente
 * und Inhalationen, je einmal pro Woche Physiotherapie und Frühförderung (5.K wird wie 5.14 mit 4,3 gewertet);
 * Baby 2 zusätzlich mit gravierenden Problemen bei der Nahrungsaufnahme (4.K). Dazu die Rente der Eltern.
 */
const m5 = { ...MODUL5_LEER, aTag: 4, c514Woche: 2 };
const baby1 = nba({ ...leereEingabe(), kindBis18Monate: true, kind4K: false, m5 });
const baby2 = nba({ ...leereEingabe(), kindBis18Monate: true, kind4K: true, m5 });
const babies = [baby1, baby2];
const regulaer = (x: number) => gradAusPunkten(x);
const N = P.nba;
const S = N.schwellen;
const R = P.rechtsweg;
const RE = P.rente;
const VV = P.vorversicherung;
const r3 = rentenpunkte(3, 'geld');
const r3halb = rentenpunkte(3, 'geld', 0.5);
const pb3 = pauschbetrag(3);
const pb3zwei = pauschbetrag(3, 2);
const grade: Grad[] = [2, 3, 4, 5];
const bereiche = S.map((s, i) => ({ von: s, bis: i < S.length - 1 ? S[i + 1] : 100 }));

export default defineGuide({
  id: 'pflegegrad-kinder',
  group: 'grad',
  order: 120,
  mini: 'kind18',
  miniDefaults: { p: 45, k: 1 },
  related: ['pflegegrad-rechner', 'pflegegrad-beantragen', 'begutachtung-medizinischer-dienst', 'pflege-pauschbetrag', 'rente-pflegende-angehoerige', 'pflegegeld'],
  sources: ['sgb11_15', 'sgb11_anlage1', 'sgb11_18a', 'sgb11_142a', 'sgb11_33', 'sgb11_34', 'sgb11_13', 'mdRichtlinie', 'estg33b', 'sgb6_3', 'sgb6_166'],
  de: {
    slug: 'pflegegrad-kinder',
    nav: 'Pflegegrad für Kinder',
    card: 'Vergleich mit gesunden Gleichaltrigen, bis 18 Monate ein Grad höher: wie Kinder eingestuft werden und was Eltern an Geld, Steuer und Rente zusteht.',
    title: 'Pflegegrad für Kinder 2026: Einstufung, Babys, Eltern-Rechte',
    description: 'Pflegegrad für Kinder 2026: Vergleich mit gesunden Gleichaltrigen, bis 18 Monate ein Grad höher, Pflegegeld, Pflege-Pauschbetrag und Rentenpunkte für Eltern.',
    h1: 'Pflegegrad für Kinder: wie eingestuft wird und was Eltern zusteht',
    intro: 'Ein Kind wird nicht an Erwachsenen gemessen, sondern an gesunden Kindern seines Alters: die Regeln der Einstufung, die Sonderregel für Babys und die Rechte der Eltern.',
    resume: `Auch Kinder können einen Pflegegrad bekommen, vom Säuglingsalter an. Maßstab ist nach § 15 Abs. 6 SGB XI der Vergleich mit einem altersentsprechend entwickelten Kind: Gezählt wird nur die Hilfe, die über das hinausgeht, was jedes Kind dieses Alters braucht. Bis zum ${R.kinder_erwachsenenmassstab_ab_jahren}. Geburtstag gelten dafür Alterstabellen der Begutachtungs-Richtlinien, danach die Punkte für Erwachsene. Für Kinder bis 18 Monate gilt eine Sonderregel (§ 15 Abs. 7): Bewertet werden nur Verhalten, der Umgang mit Krankheit und Therapie und gravierende Probleme bei der Nahrungsaufnahme, die pauschal ${N.m4_kind_unter_18_monate} Punkte bringen, und das Kind kommt mit denselben Punkten einen Grad höher als ein älteres. Im Rechenbeispiel erreicht ein Säugling mit Ernährungsproblemen ${DE.num(baby2.gesamt, 2)} Punkte und Pflegegrad ${baby2.grad}, nach der regulären Tabelle wäre es Grad ${regulaer(baby2.gesamt)}. Das Pflegegeld von ${DE.eur(pflegegeld(3))} bei Grad 3 empfangen die Eltern für das Kind. Bei einem Kind mit Behinderungen nimmt es ihnen nicht den Pflege-Pauschbetrag von ${DE.eur(pb3.voll)}, und wer mindestens ${RE.min_stunden_woche} Stunden pro Woche pflegt, erwirbt Rentenansprüche.`,
    faqs: [
      { q: 'Ab welchem Alter kann ein Kind einen Pflegegrad bekommen?', a: 'Eine Untergrenze gibt es nicht. Auch ein Neugeborenes kann einen Pflegegrad erhalten, wenn der besondere Hilfebedarf voraussichtlich mindestens sechs Monate besteht, etwa bei einem schweren Herzfehler oder einer Stoffwechselerkrankung. Für die ersten 18 Lebensmonate gelten eigene Regeln, weil Säuglinge von Natur aus unselbständig sind. Den Antrag stellen die Eltern als gesetzliche Vertreter formlos bei der Pflegekasse, bei der das Kind versichert ist.' },
      { q: 'Was passiert mit dem Pflegegrad, wenn das Kind 18 Monate alt wird?', a: 'Nach den Begutachtungs-Richtlinien bleibt ein Kind bis dahin ohne weitere Begutachtung in seinem Grad, außer die Eltern beantragen eine Höherstufung oder eine Wiederholung ist fachlich nötig, etwa nach einer erfolgreichen Herzoperation. Danach wird es nach der regulären Tabelle des § 15 Abs. 3 SGB XI eingestuft, ohne dass es dafür einer neuen Begutachtung bedarf. Prüfen Sie den neuen Bescheid genau; ein Widerspruch ist möglich.' },
      { q: 'Wer erhält das Pflegegeld für ein pflegebedürftiges Kind?', a: `Der Anspruch steht dem Kind als versicherter Person zu; beantragt und empfangen wird das Geld von den Eltern als gesetzlichen Vertretern. Bei Pflegegrad 2 sind es ${DE.eur(pflegegeld(2))} im Monat, bei Grad 3 ${DE.eur(pflegegeld(3))}. Über die Verwendung muss die Familie keine Belege führen. Leistungen der Pflegeversicherung zählen bei anderen Sozialleistungen wie Bürgergeld oder Wohngeld nicht als Einkommen (§ 13 Abs. 5 SGB XI).` },
      { q: 'Dürfen Eltern trotz Pflegegeld den Pflege-Pauschbetrag geltend machen?', a: `Ja. Wer Geld für die Pflege erhält, verliert den Pauschbetrag normalerweise; das Pflegegeld, das Eltern eines Kindes mit Behinderungen für dieses Kind empfangen, zählt aber ausdrücklich nicht dazu (§ 33b Abs. 6 Satz 2 EStG). Bei Grad 3 sind es ${DE.eur(pb3.voll)} im Jahr. Pflegen beide Eltern, wird geteilt: je ${DE.eur(pb3zwei.jePerson)}. Voraussetzung ist die persönliche Pflege in einer Wohnung in der EU oder im EWR.` },
      { q: 'Bekommen Eltern Rentenpunkte, wenn sie ihr Kind pflegen?', a: `Ja, ab Pflegegrad 2, wenn ein Elternteil mindestens ${RE.min_stunden_woche} Stunden pro Woche an mindestens ${RE.min_tage_woche} Tagen pflegt und höchstens ${RE.max_erwerb_stunden} Stunden erwerbstätig ist (§ 3 SGB VI). Bei Grad 3 und reinem Pflegegeld bringt ein Jahr ${DE.num(r3.punkteJahr, 4)} Entgeltpunkte, nach heutigem Rentenwert ${DE.eur(r3.renteProJahr, 2)} Monatsrente. Pflegen beide Eltern je zur Hälfte, wird der Beitrag geteilt, jeder erhält dann ${DE.eur(r3halb.renteProJahr, 2)}.` },
      { q: 'Wer begutachtet ein Kind und darf das am Telefon geschehen?', a: `Kinder begutachten in der Regel besonders geschulte Gutachterinnen und Gutachter mit Ausbildung in der Kinderkrankenpflege oder Kinderärzte (§ 18a Abs. 10 SGB XI). Ein Telefoninterview ist bei Kindern ausgeschlossen (§ 142a SGB XI); die Begutachtungs-Richtlinien lassen es erst bei einer Höherstufung ab dem vollendeten ${R.telefon_hoeherstufung_ab_jahren}. Lebensjahr mit Unterstützungsperson zu. Halten Sie Berichte von Kinderklinik, Therapeuten und Frühförderung bereit.` },
    ],
    body: (h) => `
<h2>Der Maßstab: ein gesundes Kind im selben Alter</h2>
<p>Ein Zweijähriger kann sich nicht allein anziehen, und eine Vierjährige geht nicht allein zum Arzt. Das ist keine Pflegebedürftigkeit, sondern Kindheit. Das Gesetz misst deshalb nicht am Erwachsenen, sondern vergleicht die Selbständigkeit und die Fähigkeiten des Kindes mit denen altersentsprechend entwickelter Kinder (${h.src('sgb11_15', '§ 15 Abs. 6 SGB XI')}). Gezählt wird nur der Mehrbedarf: die Hilfe, die ein gesundes Kind im selben Alter nicht bräuchte.</p>
<p>Für die praktische Bewertung enthalten die ${h.src('mdRichtlinie', 'Begutachtungs-Richtlinien')} Tabellen, die für jedes Kriterium der Module 1, 2, 4 und 6 festhalten, ab welchem Alter Kinder üblicherweise selbständig sind. Kriterien, bei denen auch ein gesundes Kind in diesem Alter noch unselbständig ist, werden nicht bewertet. Diese Tabellen reichen bis zum vollendeten ${h.num(R.kinder_erwachsenenmassstab_ab_jahren)}. Lebensjahr; danach gilt die Punktesystematik für Erwachsene, wobei bis 18 Jahre ein eigenes Formular für Kinder genutzt wird. Anleitung und Aufforderung, die jeder Teenager in der Pubertät braucht, zählen dabei nicht.</p>
<p>Zwei Module kennen keine Altersgrenzen und werden bei jedem Kind voll bewertet: Modul 3 (Verhaltensweisen und psychische Problemlagen) und Modul 5 (Umgang mit krankheits- und therapiebedingten Anforderungen). Gerade Modul 5 ist bei chronisch kranken Kindern oft entscheidend. Dort zählen das Blutzuckermessen und Insulinspritzen, Inhalationen und Absaugen, Übungen aus Krankengymnastik, Logopädie oder Atemtherapie, die Eltern zu Hause anleiten, und die Begleitung zu Ärzten, Therapeuten und ausdrücklich auch zur Frühförderung (${h.src('sgb11_anlage1', 'Anlage 1, Modul 5')}).</p>

<h2>Bis 18 Monate: eigene Regeln und ein Grad mehr</h2>
<p>Säuglinge sind in allen Bereichen von Natur aus unselbständig. Ohne Sonderregel könnten sie kaum einen Pflegegrad erreichen und müssten wegen der schnellen Entwicklung ständig neu begutachtet werden. Deshalb gilt für Kinder bis 18 Monate: Bewertet werden nur Modul 3 und Modul 5. An die Stelle der Selbstversorgung tritt eine einzige Frage, nämlich ob gravierende Probleme bei der Nahrungsaufnahme bestehen, die einen außergewöhnlich pflegeintensiven Hilfebedarf auslösen. Wird sie bejaht, gibt es pauschal ${h.num(N.m4_kind_unter_18_monate)} Einzelpunkte im Modul Selbstversorgung. Außerdem wird stets geprüft, ob beide Arme und beide Beine gebrauchsunfähig sind, weil das unabhängig vom Alter eine besondere Bedarfslage begründet.</p>
<p>Mit den so ermittelten Punkten kommt das Kind einen Grad höher als ein älteres Kind oder ein Erwachsener (${h.src('sgb11_15', '§ 15 Abs. 7 SGB XI')}):</p>
${h.table(['Gesamtpunkte', 'Grad ab 18 Monaten und für Erwachsene', 'Grad bis 18 Monate', 'Pflegegeld bis 18 Monate'], bereiche.map(({ von, bis }) => {
  const gk = gradAusPunkten(von, true);
  return [`${h.num(von, 1)} bis ${bis === 100 ? h.num(bis) : 'unter ' + h.num(bis, 1)}`, String(gradAusPunkten(von)), String(gk), h.eur(pflegegeld(gk))];
}), 'Einstufung nach § 15 Abs. 3 und Abs. 7 SGB XI; Pflegegeld 2026 nach § 37 SGB XI.', ['l', 'r', 'r', 'r'])}
<p>Nach den Begutachtungs-Richtlinien bleibt das Kind in diesem Grad bis zum Ende des 18. Lebensmonats, ohne erneut begutachtet zu werden, solange die Eltern keine Höherstufung beantragen und keine Wiederholung fachlich nötig ist, etwa weil eine Operation den Bedarf voraussichtlich deutlich ändert. Danach erfolgt die reguläre Einstufung nach § 15 Abs. 3, ohne dass es dafür einer neuen Begutachtung bedarf. Für die Familie bedeutet das: Die Höhe der Leistungen kann sich ändern, sobald das Kind 18 Monate alt ist. Achten Sie auf den Bescheid und prüfen Sie, ob die Bewertung zur Entwicklung Ihres Kindes passt.</p>

<h2>Zwei Rechenbeispiele</h2>
<p>Ein Säugling mit einer chronischen Lungenerkrankung bekommt viermal täglich Medikamente und Inhalationen und wird je einmal pro Woche zur Physiotherapie und zur Frühförderung gebracht. Das ergibt in Modul 5 ${h.num(baby1.summen.m5)} Einzelpunkte und ${h.num(baby1.gewichtet.m5, 2)} gewichtete Punkte. Ein zweites Kind hat dieselben Therapien, trinkt aber so schlecht, dass jede Mahlzeit lange dauert und eng überwacht werden muss: Die Frage nach gravierenden Problemen bei der Nahrungsaufnahme wird bejaht.</p>
${h.table(['', 'Baby 1: Therapie, keine Ernährungsprobleme', 'Baby 2: zusätzlich Ernährungsprobleme'], [
  ['Modul 5 gewichtet', ...babies.map((b) => h.num(b.gewichtet.m5, 2))],
  ['Selbstversorgung (Nahrungsaufnahme) gewichtet', ...babies.map((b) => h.num(b.gewichtet.m4, 2))],
  ['Gesamtpunkte', ...babies.map((b) => h.num(b.gesamt, 2))],
  ['Pflegegrad bis 18 Monate', ...babies.map((b) => String(b.grad))],
  ['Grad nach der regulären Tabelle', ...babies.map((b) => String(regulaer(b.gesamt)))],
  ['Pflegegeld bis 18 Monate', ...babies.map((b) => h.eur(pflegegeld(b.grad)))],
], 'Berechnet mit dem Begutachtungsinstrument nach § 15 Abs. 7 SGB XI und Anlage 1 und 2.', ['l', 'r', 'r'])}
<p>Die Ernährungsfrage wiegt schwer: Die pauschalen ${h.num(N.m4_kind_unter_18_monate)} Einzelpunkte heben die Selbstversorgung in den Bereich mit ${h.num(baby2.gewichtet.m4, 2)} gewichteten Punkten und das zweite Baby auf Pflegegrad ${baby2.grad}. Den eigenen Fall prüfen Sie im Rechner oben: Gesamtpunkte eintragen und angeben, ob das Kind jünger als 18 Monate ist. Für ältere Kinder geht der ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} die Kriterien einzeln durch; denken Sie dabei an den Vergleich mit gesunden Gleichaltrigen.</p>

<h2>Die Begutachtung eines Kindes</h2>
<p>Den Antrag stellen die Eltern formlos bei der Pflegekasse, wie unter ${h.a('pflegegrad-beantragen', 'Pflegegrad beantragen')} beschrieben. Kinder begutachten in der Regel besonders geschulte Gutachterinnen und Gutachter mit einer Qualifikation in der Kinderkrankenpflege oder als Kinderärztin oder Kinderarzt (${h.src('sgb11_18a', '§ 18a Abs. 10 SGB XI')}). Ein Telefoninterview ist bei Kindern ausgeschlossen (${h.src('sgb11_142a', '§ 142a SGB XI')}). Die Gutachterin erhebt eine ausführliche kindbezogene Vorgeschichte und macht sich ein eigenes Bild. Legen Sie Berichte der Kinderklinik und des Kinderarztes, Therapie- und Förderpläne, den Medikamentenplan und ein Pflegetagebuch bereit, in dem Sie besonders das festhalten, was über den Alltag eines gesunden Kindes hinausgeht: nächtliches Absaugen, Sondieren, das Überwachen von Anfällen, die Fahrten zur Therapie.</p>

<h2>Geld, Steuer und Rente für die Eltern</h2>
${h.table(['Pflegegrad', 'Pflegegeld im Monat', 'Pflegegeld im Jahr', 'Pflege-Pauschbetrag im Jahr', 'Monatsrente je Pflegejahr'], grade.map((g) => [
  String(g), h.eur(pflegegeld(g)), h.eur(pflegegeld(g) * 12), h.eur(pauschbetrag(g).voll), h.eur(rentenpunkte(g, 'geld').renteProJahr, 2),
]), 'Pflegegeld nach § 37 SGB XI; Pauschbetrag nach § 33b Abs. 6 EStG für eine Pflegeperson; Rente bei reinem Pflegegeld nach § 166 Abs. 2 SGB VI.', ['l', 'r', 'r', 'r', 'r'])}
<p><strong>Pflegegeld.</strong> Es steht dem Kind zu, die Eltern empfangen es (${h.src('sgb11_37', '§ 37 SGB XI')}). Wie die Familie es verwendet, entscheidet sie selbst. Bei Bürgergeld, Wohngeld oder anderen Sozialleistungen bleibt es als Einkommen unberücksichtigt (${h.src('sgb11_13', '§ 13 Abs. 5 SGB XI')}). Den Rest der Leistungen zu Hause, etwa den Entlastungsbetrag, beschreibt die Seite zum ${h.a('pflegegeld', 'Pflegegeld')}.</p>
<p><strong>Pflege-Pauschbetrag.</strong> Wer Geld für die Pflege bekommt, verliert normalerweise den Pauschbetrag. Für Eltern macht das Gesetz eine Ausnahme: Das Pflegegeld, das sie für ihr Kind mit Behinderungen empfangen, gilt unabhängig von seiner Verwendung nicht als Einnahme (${h.src('estg33b', '§ 33b Abs. 6 Satz 2 EStG')}). Eltern können also beides haben. Pflegen beide, wird der Betrag nach der Zahl der Pflegepersonen geteilt, bei Grad 3 je ${h.eur(pb3zwei.jePerson)}. Maßgeblich ist der höchste Grad, der im Kalenderjahr festgestellt war, und in der Steuererklärung muss die Steuer-Identifikationsnummer des Kindes stehen. Mehr unter ${h.a('pflege-pauschbetrag', 'Pflege-Pauschbetrag')}.</p>
<p><strong>Rente.</strong> Ein Elternteil, der das Kind ab Pflegegrad 2 mindestens ${h.num(RE.min_stunden_woche)} Stunden pro Woche an mindestens ${h.num(RE.min_tage_woche)} Tagen pflegt und daneben höchstens ${h.num(RE.max_erwerb_stunden)} Stunden arbeitet, ist in der Rentenversicherung pflichtversichert; die Pflegekasse zahlt die Beiträge (${h.src('sgb6_3', '§ 3 SGB VI')}). Bei Grad 3 und reinem Pflegegeld bringt ein Jahr ${h.eur(r3.renteProJahr, 2)} Monatsrente. Teilen sich beide Eltern die Pflege je zur Hälfte, wird die Beitragsgrundlage nach dem Anteil aufgeteilt (${h.src('sgb6_166', '§ 166 Abs. 2 SGB VI')}), und jeder erwirbt ${h.eur(r3halb.renteProJahr, 2)}. Über Jahre gerechnet zeigt das der ${h.a('rente-pflegende-angehoerige', 'Rentenrechner für pflegende Angehörige')}.</p>

<!--mini:pauschbetrag-->
<h2>Wenn die Familie international lebt</h2>
<p>Für den Anspruch muss die versicherte Person in den letzten ${h.num(VV.zeitraum_jahre)} Jahren vor dem Antrag mindestens ${h.num(VV.jahre)} Jahre in der Pflegeversicherung gewesen sein. Bei Kindern genügt es, wenn ein Elternteil diese Vorversicherungszeit erfüllt (${h.src('sgb11_33', '§ 33 Abs. 2 SGB XI')}). Reist die Familie in ein Land der EU, des EWR oder in die Schweiz, läuft das Pflegegeld weiter; außerhalb davon ruht es nach ${h.num(P.ausland.wochen_vorruebergehend)} Wochen im Kalenderjahr (${h.src('sgb11_34', '§ 34 SGB XI')}). Beim Pflege-Pauschbetrag kommt es dagegen darauf an, dass die Pflege in einer Wohnung in der EU oder im EWR stattfindet.</p>
`,
  },
  en: {
    slug: 'care-grade-children',
    nav: 'Care grade for children',
    card: 'Compared with healthy children of the same age, one grade higher up to 18 months: how German care grades work for children and what parents receive.',
    title: 'Care Grade for Children Germany 2026: Babies, Parents, Tax',
    description: 'Care grade for children in Germany 2026: compared with healthy peers, one grade higher up to 18 months, allowance, carer tax lump sum and pension for parents.',
    h1: 'German care grades for children: how they are assessed and what parents get',
    intro: 'A child is measured not against adults but against healthy children of the same age: the assessment rules, the special rule for babies and the rights of expat parents.',
    resume: `Children can receive a German care grade (Pflegegrad) from infancy. Under section 15(6) of Book XI of the Social Code the yardstick is a child of the same age developing normally: only help beyond what any child of that age needs counts. Up to the child’s ${EN.num(R.kinder_erwachsenenmassstab_ab_jahren)}th birthday the assessment guidelines use age tables; after that the adult points apply. Children up to 18 months have a special rule (section 15(7)): only behaviour, illness and treatment, and serious feeding problems are assessed, the latter worth a flat ${N.m4_kind_unter_18_monate} points, and the child is placed one grade higher than an older child with the same score. In our worked example a baby with feeding problems reaches ${EN.num(baby2.gesamt, 2)} points and care grade ${baby2.grad}; on the regular scale it would be grade ${regulaer(baby2.gesamt)}. The care allowance, ${EN.eur(pflegegeld(3))} a month at grade 3, is received by the parents for the child. For a disabled child it does not cost them the carer’s tax lump sum of ${EN.eur(pb3.voll)}, and a parent caring at least ${RE.min_stunden_woche} hours a week builds up German pension rights.`,
    faqs: [
      { q: 'Can our child get a care grade if we only recently moved to Germany?', a: `The insured person must have been covered by German long-term care insurance, as a member or family member, for at least ${VV.jahre} of the ${VV.zeitraum_jahre} years before the application (section 33(2) SGB XI). For an insured child, this condition is met if one parent meets it. So the time a parent has been insured in Germany is what counts, not the child’s age or arrival date.` },
      { q: 'What happens to the grade when our baby turns 18 months?', a: 'Under the assessment guidelines the child stays in the grade until then without a new assessment, unless you request a higher grade or a reassessment is clinically necessary, for example after successful heart surgery. After 18 months the child is placed on the regular scale of section 15(3) SGB XI, without a new assessment being required. Check the new decision carefully; you can object to it.' },
      { q: 'Who is paid the care allowance for a child?', a: `The entitlement belongs to the child as the insured person; the parents, as legal representatives, apply for it and receive it. At grade 2 it is ${EN.eur(pflegegeld(2))} a month, at grade 3 ${EN.eur(pflegegeld(3))}. The family does not have to account for how it is spent. Long-term care benefits are not counted as income for other German social benefits such as citizen’s income or housing benefit (section 13(5) SGB XI).` },
      { q: 'Can parents claim the carer’s tax lump sum on top of the allowance?', a: `Yes. Normally anyone who receives money for caring loses the lump sum, but the allowance parents receive for their disabled child is expressly excluded (section 33b(6) sentence 2 Income Tax Act). At grade 3 it is ${EN.eur(pb3.voll)} a year; if both parents care it is split, ${EN.eur(pb3zwei.jePerson)} each. The care must take place in a home located in the EU or the EEA.` },
      { q: 'Do parents earn German pension rights by caring for their child?', a: `Yes, from grade 2, if a parent cares at least ${RE.min_stunden_woche} hours a week on at least ${RE.min_tage_woche} days and works no more than ${RE.max_erwerb_stunden} hours (section 3 SGB VI). At grade 3 with allowance only, one year earns ${EN.num(r3.punkteJahr, 4)} pension points, worth ${EN.eur(r3.renteProJahr, 2)} of monthly pension at today’s value. If both parents share the care equally, the contribution is split and each earns ${EN.eur(r3halb.renteProJahr, 2)}.` },
      { q: 'Does the allowance continue if we spend the summer in our home country?', a: `In an EU or EEA country or in Switzerland it continues without a time limit (section 34(1a) SGB XI). Elsewhere it is paid for up to ${P.ausland.wochen_vorruebergehend} weeks per calendar year and then suspended until you return (section 34(1)). Services from a home care provider are only covered abroad if the provider’s carer travels with the child. Plan longer stays outside Europe with this in mind.` },
    ],
    body: (h) => `
<h2>The yardstick: a healthy child of the same age</h2>
<p>A two-year-old cannot dress alone and a four-year-old does not go to the doctor alone. That is not a need for care, it is childhood. The law therefore does not measure children against adults but compares their independence and abilities with those of children of the same age developing normally (${h.src('sgb11_15', 'section 15(6) SGB XI')}). Only the extra need counts: help that a healthy child of the same age would not require.</p>
<p>For the practical scoring, the ${h.src('mdRichtlinie', 'assessment guidelines')} contain tables recording, for every criterion in modules 1, 2, 4 and 6, the age from which children usually manage independently. Criteria where a healthy child of that age would still be dependent are not scored. These tables run up to the child’s ${h.num(R.kinder_erwachsenenmassstab_ab_jahren)}th birthday; after that the adult points system applies, although a separate children’s form is used up to 18. Prompting and reminders that any teenager needs do not count.</p>
<p>Two modules have no age limits and are scored in full for every child: module 3 (behaviour and psychological problems) and module 5 (managing the demands of illness and treatment). For chronically ill children module 5 is often decisive. It covers blood sugar testing and insulin injections, inhalations and suction, physiotherapy, speech or breathing exercises that parents carry out at home, and taking the child to doctors, therapists and, expressly, early intervention services (Frühförderung) (${h.src('sgb11_anlage1', 'Annex 1, module 5')}).</p>

<h2>Up to 18 months: separate rules and one grade more</h2>
<p>Babies are naturally dependent in every area. Without a special rule they could hardly reach a care grade and would need constant reassessment as they develop. So for children up to 18 months only modules 3 and 5 are scored. Self-care is replaced by a single question: are there serious feeding problems that cause an exceptionally care-intensive need for help? If yes, the self-care module receives a flat ${h.num(N.m4_kind_unter_18_monate)} raw points. The assessor also always checks whether both arms and both legs are unusable, which creates a special need regardless of age.</p>
<p>With the points found this way the child is placed one grade higher than an older child or an adult (${h.src('sgb11_15', 'section 15(7) SGB XI')}):</p>
${h.table(['Total points', 'Grade from 18 months and for adults', 'Grade up to 18 months', 'Allowance up to 18 months'], bereiche.map(({ von, bis }) => {
  const gk = gradAusPunkten(von, true);
  return [`${h.num(von, 1)} to ${bis === 100 ? h.num(bis) : 'under ' + h.num(bis, 1)}`, String(gradAusPunkten(von)), String(gk), h.eur(pflegegeld(gk))];
}), 'Grades under section 15(3) and (7) SGB XI; 2026 allowance under section 37 SGB XI.', ['l', 'r', 'r', 'r'])}
<p>Under the assessment guidelines the child keeps this grade until the end of the 18th month of life without being reassessed, as long as the parents do not request a higher grade and a repeat is not clinically necessary, for instance because surgery is expected to change the need markedly. After that the regular scale of section 15(3) applies, without a new assessment being required. For the family this means the benefits may change around the child’s eighteen-month mark, so watch for the decision and check that it matches how your child is developing.</p>

<h2>Two worked examples</h2>
<p>A baby with a chronic lung condition receives medication and inhalations four times a day and is taken once a week each to physiotherapy and early intervention. That makes ${h.num(baby1.summen.m5)} raw points and ${h.num(baby1.gewichtet.m5, 2)} weighted points in module 5. A second baby has the same therapies but feeds so poorly that every meal takes a long time and needs close supervision: the question about serious feeding problems is answered yes.</p>
${h.table(['', 'Baby 1: therapy, no feeding problems', 'Baby 2: feeding problems as well'], [
  ['Module 5 weighted', ...babies.map((b) => h.num(b.gewichtet.m5, 2))],
  ['Self-care (feeding) weighted', ...babies.map((b) => h.num(b.gewichtet.m4, 2))],
  ['Total points', ...babies.map((b) => h.num(b.gesamt, 2))],
  ['Care grade up to 18 months', ...babies.map((b) => String(b.grad))],
  ['Grade on the regular scale', ...babies.map((b) => String(regulaer(b.gesamt)))],
  ['Allowance up to 18 months', ...babies.map((b) => h.eur(pflegegeld(b.grad)))],
], 'Calculated with the assessment instrument under section 15(7) SGB XI and Annexes 1 and 2.', ['l', 'r', 'r'])}
<p>The feeding question weighs heavily: the flat ${h.num(N.m4_kind_unter_18_monate)} raw points lift self-care into the band worth ${h.num(baby2.gewichtet.m4, 2)} weighted points and the second baby to grade ${baby2.grad}. Check your own case with the calculator at the top: enter the total points and say whether the child is under 18 months. For older children the ${h.a('pflegegrad-rechner', 'care grade calculator')} goes through the criteria one by one; keep the comparison with healthy children of the same age in mind.</p>

<h2>How a child is assessed</h2>
<p>Parents apply informally to the care fund, as described under ${h.a('pflegegrad-beantragen', 'applying for a care grade')}. Children are normally assessed by specially trained assessors qualified in paediatric nursing or as paediatricians (${h.src('sgb11_18a', 'section 18a(10) SGB XI')}). A phone interview is ruled out for children (${h.src('sgb11_142a', 'section 142a SGB XI')}). The assessor takes a detailed child-specific history and forms her own picture. Have the reports from the children’s hospital and paediatrician, therapy and support plans, the medication plan and a care diary ready, recording above all what goes beyond the routine of a healthy child: suction at night, tube feeding, watching for seizures, the drives to therapy. If your documents are in English, a short German summary helps.</p>

<h2>Money, tax and pension for parents</h2>
${h.table(['Care grade', 'Allowance per month', 'Allowance per year', 'Carer’s tax lump sum per year', 'Monthly pension per year of care'], grade.map((g) => [
  String(g), h.eur(pflegegeld(g)), h.eur(pflegegeld(g) * 12), h.eur(pauschbetrag(g).voll), h.eur(rentenpunkte(g, 'geld').renteProJahr, 2),
]), 'Allowance under section 37 SGB XI; lump sum under section 33b(6) Income Tax Act for one carer; pension with allowance only under section 166(2) SGB VI.', ['l', 'r', 'r', 'r', 'r'])}
<p><strong>Care allowance.</strong> It belongs to the child and the parents receive it (${h.src('sgb11_37', 'section 37 SGB XI')}). The family decides how to use it. It is not counted as income for citizen’s income, housing benefit or other social benefits (${h.src('sgb11_13', 'section 13(5) SGB XI')}). The other home care budgets, such as the relief amount, are explained on the ${h.a('pflegegeld', 'care allowance')} page.</p>
<p><strong>Carer’s tax lump sum.</strong> Anyone paid for caring normally loses the lump sum. For parents the law makes an exception: allowance they receive for their disabled child is not treated as income, however it is used (${h.src('estg33b', 'section 33b(6) sentence 2 Income Tax Act')}). Parents can therefore have both. If both care, the amount is divided by the number of carers, ${h.eur(pb3zwei.jePerson)} each at grade 3. The highest grade held during the calendar year counts, and the child’s tax identification number must be on the return. More under ${h.a('pflege-pauschbetrag', 'carer’s tax lump sum')}.</p>
<p><strong>Pension.</strong> A parent who cares for a child with at least grade 2 for at least ${h.num(RE.min_stunden_woche)} hours a week on at least ${h.num(RE.min_tage_woche)} days, and works no more than ${h.num(RE.max_erwerb_stunden)} hours alongside, is compulsorily insured in the German pension scheme, with contributions paid by the care fund (${h.src('sgb6_3', 'section 3 SGB VI')}). At grade 3 with allowance only, one year adds ${h.eur(r3.renteProJahr, 2)} of monthly pension. If both parents share the care equally, the contribution base is split by share (${h.src('sgb6_166', 'section 166(2) SGB VI')}) and each earns ${h.eur(r3halb.renteProJahr, 2)}. For an expat parent these are German pension periods like any other. The ${h.a('rente-pflegende-angehoerige', 'carer pension calculator')} adds them up over several years.</p>

<!--mini:pauschbetrag-->
<h2>Families living between countries</h2>
<p>To qualify, the insured person must have been in the German care insurance for at least ${h.num(VV.jahre)} of the ${h.num(VV.zeitraum_jahre)} years before the application; for a child it is enough if one parent meets this prior insurance period (${h.src('sgb11_33', 'section 33(2) SGB XI')}). On trips to an EU or EEA country or to Switzerland the allowance continues; elsewhere it is suspended after ${h.num(P.ausland.wochen_vorruebergehend)} weeks per calendar year (${h.src('sgb11_34', 'section 34 SGB XI')}). For the tax lump sum, by contrast, what matters is that the care takes place in a home in the EU or the EEA.</p>
`,
  },
});
