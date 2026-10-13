import { defineGuide } from '../../lib/guide-types';
import { gewichtet } from '../../lib/engine/nba';
import { P, DE, EN } from '../../lib/fmt';

/**
 * Beispiele aus dem Motor: Selbstversorgung ohne Hilfe; nur Aufforderung bei sieben Körperpflege- und
 * Ankleide-Kriterien (je 1 Punkt); zusätzlich „überwiegend selbständig“ beim Essen (dreifach gewertet).
 */
const N = P.nba;
const V = P.verfahren;
const R = P.rechtsweg;
const S = P.nba_skalen.skala_punkte;
const essenFaktor = N.m4_gewicht['4.8'];
const summeAuff = 7 * S[1];
const summeEssen = summeAuff + S[1] * essenFaktor;
const g0 = gewichtet('m4', 0);
const gAuff = gewichtet('m4', summeAuff);
const gEssen = gewichtet('m4', summeEssen);
const max = (m: keyof typeof N.bereiche) => N.bereiche[m].gewichtet[4];
const w = (x: number, l: 'de' | 'en') => (l === 'de' ? DE : EN).pct(x, 0);

export default defineGuide({
  id: 'begutachtung-medizinischer-dienst',
  group: 'grad',
  order: 80,
  mini: 'modulGewicht',
  related: ['pflegegrad-beantragen', 'pflegegrad-rechner', 'widerspruch-pflegegrad', 'pflegegrad-demenz', 'pflegegrad-kinder', 'pflegehilfsmittel'],
  sources: ['sgb11_18', 'sgb11_18a', 'sgb11_18b', 'sgb11_18c', 'sgb11_142a', 'sgb11_15', 'mdBegutachtung', 'mdRichtlinie'],
  de: {
    slug: 'begutachtung-medizinischer-dienst',
    nav: 'Begutachtung durch den MD',
    card: 'Was die Gutachterin beim Hausbesuch prüft, wie aus Antworten Punkte werden und welche Rechte Sie im Verfahren haben.',
    title: 'Begutachtung Medizinischer Dienst 2026: Ablauf, Vorbereitung',
    description: `Begutachtung durch den Medizinischen Dienst 2026: was beim Hausbesuch zählt, wie Punkte entstehen, welche Unterlagen helfen und wann der Bescheid kommen muss.`,
    h1: 'Begutachtung durch den Medizinischen Dienst: was beim Termin zählt',
    intro: 'Der Hausbesuch entscheidet über den Pflegegrad für Jahre: was die Gutachterin wissen will, wie sie bewertet und wie Sie sich vorbereiten.',
    resume: `Nach dem Antrag auf Pflegeleistungen beauftragt die Pflegekasse den Medizinischen Dienst oder eine unabhängige Gutachterin, die Pflegebedürftigkeit festzustellen (§ 18 SGB XI). Die Untersuchung findet grundsätzlich in der Wohnung statt; nur bei eindeutiger Aktenlage oder in einer regionalen oder nationalen Krise darf darauf verzichtet werden (§ 18a Abs. 2). Beim Erstantrag ist ein reines Telefoninterview ausgeschlossen (§ 142a). Bewertet werden die Kriterien von sechs Modulen; am stärksten zählt die Selbstversorgung mit ${DE.pct(N.gewichtung.m4, 0)}, von den Modulen Kognition und Verhalten geht nur der höhere Wert ein. Entscheidend ist nicht die Diagnose, sondern wie viel personelle Hilfe nötig ist: Schon wer beim Waschen und Anziehen nur angestoßen werden muss, gilt als „überwiegend selbständig“ und bekommt Punkte. Kommt binnen ${R.gutachterliste_nach_arbeitstagen} Arbeitstagen niemand, muss die Kasse eine Liste mit mindestens ${R.gutachterliste_mindestens} unabhängigen Gutachtern schicken. Das Gutachten kommt mit dem Bescheid, spätestens ${V.entscheidung_arbeitstage} Arbeitstage nach dem Antrag.`,
    faqs: [
      { q: 'Wie lange dauert der Hausbesuch des Medizinischen Dienstes?', a: `Nach Angaben des Medizinischen Dienstes bis zu ${R.begutachtung_dauer_bis_stunden} Stunde. In dieser Zeit geht die Gutachterin alle sechs Module durch, spricht mit der pflegebedürftigen Person und danach mit den Angehörigen. Planen Sie den Termin so, dass niemand unter Zeitdruck steht, und halten Sie Unterlagen griffbereit, damit die knappe Zeit für die Schilderung des Alltags bleibt und nicht für die Suche nach Arztbriefen.` },
      { q: 'Darf die Begutachtung beim ersten Antrag am Telefon stattfinden?', a: 'Nein. § 142a SGB XI schließt das strukturierte Telefoninterview bei der erstmaligen Begutachtung aus, ebenso bei einem Widerspruch, bei Kindern und wenn die vorherige Begutachtung keine Pflegebedürftigkeit ergeben hat. Bei späteren Begutachtungen kann telefonisch oder per Video begutachtet werden, doch der Wunsch nach einem Hausbesuch hat Vorrang und muss im Formular vermerkt werden.' },
      { q: 'Was tun, wenn nach 20 Arbeitstagen noch kein Gutachter da war?', a: `Dann muss die Pflegekasse Ihnen eine Liste mit mindestens ${R.gutachterliste_mindestens} unabhängigen Gutachterinnen oder Gutachtern schicken (§ 18 Abs. 3 SGB XI). Sie haben ${R.gutachterwahl_wochen} Woche Zeit, eine Person auszuwählen; dem Wunsch muss die Kasse folgen. Antworten Sie nicht, darf sie selbst jemanden von der Liste beauftragen. Die Pflicht entfällt, wenn die Kasse die Verzögerung nicht zu vertreten hat.` },
      { q: 'Darf ich als Tochter mit der Gutachterin allein sprechen?', a: 'Ja. Nach den Begutachtungs-Richtlinien kann es nötig sein, Pflegeperson und Antragsteller getrennt zu befragen; ein getrenntes Gespräch ist anzubieten und auf Wunsch der pflegebedürftigen Person zu führen. Weichen die Schilderungen voneinander ab, wird das im Gutachten festgehalten. Das hilft, wenn Ihr Vater vor Fremden kleinredet, was im Alltag nicht mehr klappt.' },
      { q: 'Werden Haushalt und Einkaufen bei der Begutachtung bewertet?', a: 'Sie werden erfasst, aber nicht gesondert gerechnet. § 18a Abs. 3 SGB XI verlangt Feststellungen zu Einkaufen, Kochen, Putzen, Geldangelegenheiten und Behördenpost sowie zu Aktivitäten außer Haus; sie dienen der Beratung und Versorgungsplanung. Punkte bringen solche Einschränkungen nur über die Kriterien der sechs Module, etwa Planen, Entscheiden oder Orientierung.' },
    ],
    body: (h) => `
<h2>Wer kommt und was beim Termin passiert</h2>
<p>Den Termin kündigt der Medizinische Dienst schriftlich oder telefonisch an. Er bittet dabei, Berichte von Pflegediensten, Pflegetagebücher, ärztliche Unterlagen, die aktuellen Medikamente sowie Gutachten und Bescheide anderer Sozialleistungsträger bereitzulegen (${h.src('mdRichtlinie', 'Begutachtungs-Richtlinien')}). Es kommt eine Pflegefachperson oder eine Ärztin; Kinder begutachten in der Regel besonders geschulte Fachkräfte der Kinderkrankenpflege oder Kinderärzte (${h.src('sgb11_18a', '§ 18a Abs. 10 SGB XI')}). Mit Einwilligung soll die Gutachterin Hausärztin und behandelnde Ärzte einbeziehen und die pflegenden Angehörigen befragen.</p>
<p>Der Besuch beginnt mit der Vorgeschichte: Welche Erkrankungen bestehen, seit wann, was hat sich verändert. Die bloße Aufzählung von Diagnosen reicht nach den Richtlinien nicht, gefragt ist, wie sich die Krankheit im Alltag auswirkt. Danach geht die Gutachterin die Module durch, lässt sich einzelne Handlungen zeigen und notiert, wobei jemand anderes eingreifen muss. Auch Schwankungen der Tagesform und die Belastung der Pflegenden werden aufgenommen. Zum Schluss geht es um Hilfsmittel, Reha und Vorbeugung.</p>

<h2>Was in jedem Modul geprüft wird</h2>
${h.table(['Modul', 'Worauf die Gutachterin achtet', 'Gewicht', 'höchstens'], [
  ['1 Mobilität', 'Lagewechsel im Bett, Sitzen, Umsetzen, Gehen in der Wohnung, Treppe', w(N.gewichtung.m1, 'de'), h.num(max('m1'), 2)],
  ['2 Kognition', 'Personen erkennen, Orientierung, Erinnern, Entscheiden, Risiken erkennen, Gespräch', w(N.gewichtung.m23, 'de'), h.num(max('m2'), 2)],
  ['3 Verhalten', 'Unruhe, nächtliches Umherirren, Abwehr der Pflege, Ängste, Aggression, Antriebslosigkeit', 'mit Modul 2', h.num(max('m3'), 2)],
  ['4 Selbstversorgung', 'Waschen, Duschen, Anziehen, Essen, Trinken, Toilette, Inkontinenz, Sonde', w(N.gewichtung.m4, 'de'), h.num(max('m4'), 2)],
  ['5 Krankheit und Therapie', 'Medikamente, Spritzen, Wundversorgung, Messungen, Arzt- und Therapiebesuche, Diät', w(N.gewichtung.m5, 'de'), h.num(max('m5'), 2)],
  ['6 Alltag und Kontakte', 'Tagesablauf, Schlafen, Beschäftigung, Planen, Kontakte', w(N.gewichtung.m6, 'de'), h.num(max('m6'), 2)],
], 'Kriterien nach § 14 Abs. 2 SGB XI, Gewichtung und gewichtete Höchstpunkte nach § 15 und Anlage 2. Von Modul 2 und 3 zählt nur der höhere Wert.', ['l', 'l', 'r', 'r'])}

<h2>Wie aus einer Antwort Punkte werden</h2>
<p>In den Modulen 1, 4 und 6 gibt es vier Stufen: selbständig, überwiegend selbständig, überwiegend unselbständig, unselbständig, mit ${h.num(S[0])} bis ${h.num(S[3])} Einzelpunkten. Wichtig sind die Grenzfälle, die viele Familien nicht als Hilfe erkennen. „Überwiegend selbständig“ ist nach den Richtlinien schon, wer Seife und Waschlappen in die Hand gereicht bekommen muss, wer (auch mehrfach) zum Waschen aufgefordert werden muss, wer kontrolliert werden muss oder wer wegen Sturzgefahr nicht allein duschen darf. „Überwiegend unselbständig“ ist, wer die Handlung vorgemacht oder ständig gelenkt bekommen muss, oder bei wem die Pflegeperson einen erheblichen Teil übernimmt.</p>
<p>Was das ausmacht, zeigt der Motor: Ohne jede Hilfe bei der Selbstversorgung gibt es ${h.num(g0)} gewichtete Punkte. Muss die Person bei sieben Kriterien der Körperpflege und des Ankleidens nur angestoßen werden, ergibt das ${h.num(summeAuff)} Einzelpunkte und schon ${h.num(gAuff)} gewichtete Punkte. Braucht sie zusätzlich beim Essen kleine Hilfe, zählt dieses Kriterium ${h.num(essenFaktor)}-fach, die Summe steigt auf ${h.num(summeEssen)} und die Selbstversorgung bringt ${h.num(gEssen)} Punkte (${h.src('sgb11_15', '§ 15 SGB XI')}). Allein diese unscheinbaren Hilfen liegen damit schon über der Schwelle von Pflegegrad 1 bei ${h.num(N.schwellen[0], 1)} Punkten, bevor Mobilität, Medikamente oder Alltag überhaupt gezählt sind.</p>
<p>Gewertet wird die Hilfe, die regelmäßig nötig ist. Vorübergehende oder nur vereinzelte Einschränkungen zählen nicht, und die Pflegebedürftigkeit muss voraussichtlich mindestens sechs Monate bestehen. Wer gerade nach einer Operation vorübergehend Hilfe braucht, sollte deshalb mit der Gutachterin offen über die Prognose sprechen.</p>
<!--mini:gradGeld-->

<h2>Vorbereitung in drei Schritten</h2>
<ol>
<li><strong>Zwei Wochen aufschreiben.</strong> Ein Pflegetagebuch mit Uhrzeit und Art der Hilfe: wann erinnert, wann gestützt, wann übernommen. Die Richtlinien nennen Pflegetagebuch und Anfallskalender ausdrücklich als Unterlagen, die ausgewertet werden.</li>
<li><strong>Unterlagen sortieren.</strong> Arzt- und Klinikberichte, Medikamentenplan, Pflegedokumentation des Pflegedienstes, Bescheide anderer Stellen, etwa zur Schwerbehinderung. Legen Sie die Mappe auf den Tisch, bevor die Gutachterin kommt.</li>
<li><strong>Wer dabei ist.</strong> Die Hauptpflegeperson sollte anwesend sein; eine Betreuerin oder bevollmächtigte Person muss die Kasse dem Dienst melden. Bei Verständigungsschwierigkeiten sollen Angehörige oder eine Übersetzerin helfen.</li>
</ol>
<p>Ein häufiger Fehler: Am Tag des Besuchs zeigt sich die pflegebedürftige Person von ihrer besten Seite und versichert, alles allein zu schaffen. Schreiben Sie vorher auf, was in den letzten Wochen nicht geklappt hat, und bitten Sie bei Bedarf um ein getrenntes Gespräch. Den eigenen Stand können Sie vorab mit dem ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} prüfen, der alle Kriterien der Anlage 1 abfragt. Besonderheiten bei Demenz stehen unter ${h.a('pflegegrad-demenz', 'Pflegegrad bei Demenz')}, bei Kindern unter ${h.a('pflegegrad-kinder', 'Pflegegrad für Kinder')}.</p>

<h2>Wenn die Familie nicht in der Nähe wohnt</h2>
<p>Viele Kinder pflegebedürftiger Eltern leben in einer anderen Stadt oder im Ausland. Für den Termin zählt, dass jemand dabei ist, der den Alltag wirklich kennt: die Nachbarin, die täglich nach dem Rechten sieht, die Haushaltshilfe oder die Mitarbeiterin des Pflegedienstes. Geben Sie der Kasse beim Antrag eine Telefonnummer und bitten Sie darum, den Termin früh genug zu erfahren, um anreisen zu können. Wer nicht kommen kann, schickt eine schriftliche Schilderung mit, unterschrieben und mit Datum, und legt sie zu den übrigen Unterlagen. Läuft der Antrag aus dem Krankenhaus, kann der Medizinische Dienst in dringenden Fällen zunächst nach Aktenlage begutachten und den Hausbesuch nach der Entlassung nachholen; dann bleibt Zeit, das Tagebuch zu Hause zu beginnen. Nach einer schweren Erkrankung lohnt es sich außerdem, die Empfehlung zur Reha im Gutachten ernst zu nehmen: Die Kasse muss begründet dazu Stellung nehmen, und mit Ihrer Einwilligung wird daraus ein Antrag beim Reha-Träger.</p>

<h2>Ihre Rechte im Verfahren</h2>
${h.table(['Recht', 'Inhalt', 'Grundlage'], [
  ['Untersuchung in der Wohnung', 'Ausnahmen nur bei eindeutiger Aktenlage oder Krise', '§ 18a Abs. 2'],
  ['Kein Telefoninterview beim Erstantrag', 'auch nicht bei Widerspruch oder bei Kindern', '§ 142a Abs. 2'],
  ['Liste unabhängiger Gutachter', `nach ${R.gutachterliste_nach_arbeitstagen} Arbeitstagen ohne Begutachtung, mindestens ${R.gutachterliste_mindestens} Namen`, '§ 18 Abs. 3'],
  ['Bescheid', `spätestens ${V.entscheidung_arbeitstage} Arbeitstage nach Antrag, sonst ${h.eur(V.verzug_euro_woche)} je angefangene Woche`, '§ 18c Abs. 1 und 5'],
  ['Gutachten', 'kommt mit dem Bescheid, auch später anforderbar', '§ 18c Abs. 2'],
  ['Hilfsmittel aus dem Gutachten', 'gelten mit Ihrer Zustimmung als beantragt', '§ 18b Abs. 3'],
], 'Feststellung der Pflegebedürftigkeit nach SGB XI.', ['l', 'l', 'l'])}

<h2>Nach dem Besuch</h2>
<p>Die Gutachterin schickt das Gutachten an die Pflegekasse, die entscheidet und Ihnen den Bescheid samt Gutachten schickt, sofern Sie der Übersendung nicht widersprochen haben (${h.src('sgb11_18c', '§ 18c Abs. 2 SGB XI')}). Mit dem Bescheid muss die Kasse das Ergebnis verständlich erläutern und auf die Ombudsperson hinweisen, an die Sie sich bei Beschwerden über den Medizinischen Dienst vertraulich wenden können. Empfohlene ${h.a('pflegehilfsmittel', 'Pflegehilfsmittel')} gelten als beantragt, wenn Sie beim Termin zugestimmt haben (${h.src('sgb11_18b', '§ 18b Abs. 3 SGB XI')}). Prüfen Sie das Gutachten Kriterium für Kriterium gegen Ihr Tagebuch. Stimmt eine Einstufung nicht, bleibt ein Monat für den ${h.a('widerspruch-pflegegrad', 'Widerspruch')}.</p>
`,
  },
  en: {
    slug: 'medical-service-assessment',
    nav: 'Medical Service assessment',
    card: 'What the assessor checks during the home visit, how answers turn into points and which rights you have in the process.',
    title: 'Medical Service Assessment 2026: German Care Grade Visit',
    description: `German Medical Service assessment 2026: what the home visit checks, how points arise, documents to prepare, your rights, a decision in ${V.entscheidung_arbeitstage} working days.`,
    h1: 'The Medical Service assessment: what counts on the day',
    intro: 'The home visit sets the care grade for years: what the assessor wants to know, how answers are scored and how to prepare, even from abroad.',
    resume: `Once a care application is filed, the long-term care fund (Pflegekasse) instructs the Medical Service (Medizinischer Dienst) or an independent assessor to establish whether care is needed and at which grade (section 18 of Book XI of the Social Code). The assessment normally takes place in the person’s home; it can be skipped only when the records are unambiguous or during a regional or national crisis (section 18a(2)). A first assessment may never be done purely by phone (section 142a). The assessor scores the criteria of six modules; self-care weighs most at ${EN.pct(N.gewichtung.m4, 0)}, and of cognition and behaviour only the higher score counts. What matters is not the diagnosis but how much help from another person is needed: someone who only has to be prompted to wash and dress is already rated “mostly independent” and earns points. If nobody has come within ${R.gutachterliste_nach_arbeitstagen} working days, the fund must send a list of at least ${R.gutachterliste_mindestens} independent assessors. The report arrives with the decision, at the latest ${V.entscheidung_arbeitstage} working days after the application.`,
    faqs: [
      { q: 'How long does the Medical Service home visit take?', a: `The Medical Service says up to ${R.begutachtung_dauer_bis_stunden} hour. In that time the assessor works through all six modules, talks to the person needing care and then to the family. Book a slot with no time pressure and have the documents sorted, so the visit is spent describing daily life rather than hunting for hospital letters. If you are flying in, arrive a day early.` },
      { q: 'Can the first assessment be done by phone or video?', a: 'No. Section 142a SGB XI rules out a structured telephone interview for the first assessment, for an objection, for children and where the previous assessment found no care need. Later reassessments may be done by phone or video, but a request for a home visit takes priority and must be recorded on the form, so say clearly that you want the assessor in the home.' },
      { q: 'What if no assessor has come after 20 working days?', a: `The fund must then send you a list naming at least ${R.gutachterliste_mindestens} independent assessors (section 18(3) SGB XI). You have ${R.gutachterwahl_wochen} week to choose one, and the fund must follow your choice; if you do not reply it may pick from the list itself. The duty does not apply if the fund is not responsible for the delay, so keep a record of dates.` },
      { q: 'Can I talk to the assessor without my father hearing?', a: 'Yes. The assessment guidelines say the carer and the applicant may need to be interviewed separately; a separate conversation is to be offered and held if the person needing care wishes. Where the two accounts differ, the report records it. That matters when a parent plays down problems in front of a stranger, which is very common at first visits.' },
      { q: 'Are housework and shopping part of the score?', a: 'They are recorded but not scored separately. Section 18a(3) SGB XI requires findings on shopping, cooking, cleaning, money matters, official letters and going out, which feed into advice and care planning. They only earn points indirectly, through module criteria such as planning, decision-making or orientation, so describe the reason behind the problem, not just the chore.' },
    ],
    body: (h) => `
<h2>Who comes and what happens</h2>
<p>The Medical Service announces the visit in writing or by phone and asks you to have ready any reports from care services, care diaries, medical records, current medication and decisions from other benefit agencies (${h.src('mdRichtlinie', 'assessment guidelines')}). The assessor is a nurse or a doctor; children are usually assessed by specially trained paediatric nurses or paediatricians (${h.src('sgb11_18a', 'section 18a(10) SGB XI')}). With consent, the assessor should contact the family doctor and question the relatives who provide care.</p>
<p>The visit starts with the history: which conditions, since when, what has changed. The guidelines say that listing diagnoses is not enough; the question is how the illness affects daily life. The assessor then works through the modules, may ask to see particular movements and notes where someone else has to step in. Fluctuations between good and bad days and the strain on the carer are recorded too. At the end come aids, rehabilitation and prevention.</p>

<h2>What each module covers</h2>
${h.table(['Module', 'What the assessor looks at', 'Weight', 'Maximum'], [
  ['1 Mobility', 'turning in bed, sitting, transferring, walking indoors, stairs', w(N.gewichtung.m1, 'en'), h.num(max('m1'), 2)],
  ['2 Cognition', 'recognising people, orientation, memory, decisions, spotting danger, conversation', w(N.gewichtung.m23, 'en'), h.num(max('m2'), 2)],
  ['3 Behaviour', 'restlessness, wandering at night, resisting care, anxiety, aggression, apathy', 'with module 2', h.num(max('m3'), 2)],
  ['4 Self-care', 'washing, showering, dressing, eating, drinking, toilet, incontinence, tube feeding', w(N.gewichtung.m4, 'en'), h.num(max('m4'), 2)],
  ['5 Illness and treatment', 'medication, injections, wound care, measurements, doctor and therapy visits, diet', w(N.gewichtung.m5, 'en'), h.num(max('m5'), 2)],
  ['6 Daily life and contact', 'structuring the day, sleep, keeping busy, planning, contact with others', w(N.gewichtung.m6, 'en'), h.num(max('m6'), 2)],
], 'Criteria under section 14(2) SGB XI; weights and maximum weighted points under section 15 and Annex 2. Only the higher of modules 2 and 3 counts.', ['l', 'l', 'r', 'r'])}

<h2>How an answer becomes points</h2>
<p>Modules 1, 4 and 6 use four levels (independent, mostly independent, mostly dependent, dependent), worth ${h.num(S[0])} to ${h.num(S[3])} points per criterion. The borderline cases are the ones families overlook. Under the guidelines, a person is already “mostly independent” if soap and flannel must be handed over, if they have to be prompted (even repeatedly) to start washing, if someone has to check the result or if a fall risk means they should not shower alone. “Mostly dependent” applies when the carer has to demonstrate or steer the task throughout, or take over a substantial part of it.</p>
<p>The engine shows the effect. With no help at all in self-care the module gives ${h.num(g0)} weighted points. If the person only needs prompting for seven washing and dressing criteria, that is ${h.num(summeAuff)} raw points and already ${h.num(gAuff)} weighted points. Add a little help with eating, which counts ${h.num(essenFaktor)} times, and the raw total rises to ${h.num(summeEssen)} and self-care is worth ${h.num(gEssen)} points (${h.src('sgb11_15', 'section 15 SGB XI')}). Those modest kinds of help alone already pass the grade 1 threshold of ${h.num(N.schwellen[0], 1)} points, before mobility, medication or daily life are even counted.</p>
<p>Only help that is regularly needed counts. Temporary or occasional problems are ignored, and the care need must be expected to last at least six months. After an operation with a good prognosis, talk openly with the assessor about how long help is likely to be required.</p>
<!--mini:gradGeld-->

<h2>Preparing in three steps</h2>
<ol>
<li><strong>Two weeks of notes.</strong> A care diary with time and type of help: when you reminded, supported or took over. The guidelines name care diaries and seizure logs as documents to be evaluated. Written in German if possible, or at least in plain English with times.</li>
<li><strong>Sorted documents.</strong> Doctors’ and hospital letters, medication plan, the care service’s records, decisions from other agencies such as a disability assessment. Put the folder on the table before the visit.</li>
<li><strong>Who is present.</strong> The main carer should be there. A legal guardian or the holder of a power of attorney must be notified by the fund. If language is a barrier, a relative or interpreter should help: the visit is held in German.</li>
</ol>
<p>A classic mistake: on the day, the parent rallies and insists they manage everything alone. Write down beforehand what went wrong in recent weeks and ask for a separate conversation if needed. Children living abroad should plan a trip around the date or make sure a local carer who knows the routine is present. Check the likely outcome first with the ${h.a('pflegegrad-rechner', 'care grade calculator')}, which goes through every criterion. Specific points for ${h.a('pflegegrad-demenz', 'dementia')} and for ${h.a('pflegegrad-kinder', 'children')} have their own pages.</p>

<h2>Your rights in the procedure</h2>
${h.table(['Right', 'What it means', 'Legal basis'], [
  ['Assessment at home', 'exceptions only for clear records or a crisis', 's. 18a(2)'],
  ['No phone interview for a first application', 'nor for objections or children', 's. 142a(2)'],
  ['List of independent assessors', `after ${R.gutachterliste_nach_arbeitstagen} working days without an assessment, at least ${R.gutachterliste_mindestens} names`, 's. 18(3)'],
  ['Decision', `within ${V.entscheidung_arbeitstage} working days, otherwise ${h.eur(V.verzug_euro_woche)} per week begun`, 's. 18c(1) and (5)'],
  ['Report', 'sent with the decision, can also be requested later', 's. 18c(2)'],
  ['Aids recommended in the report', 'count as applied for if you agree', 's. 18b(3)'],
], 'Establishing care needs under SGB XI.', ['l', 'l', 'l'])}

<h2>After the visit</h2>
<p>The assessor sends the report to the fund, which decides and posts you the decision with the report unless you declined it (${h.src('sgb11_18c', 'section 18c(2) SGB XI')}). The fund must explain the result in plain terms and point you to the ombudsperson who handles complaints about the Medical Service in confidence. Recommended ${h.a('pflegehilfsmittel', 'care aids')} count as applied for if you agreed during the visit (${h.src('sgb11_18b', 'section 18b(3) SGB XI')}). Compare the report criterion by criterion with your diary. If a rating is wrong, you have one month to ${h.a('widerspruch-pflegegrad', 'object')}, or three if the decision was delivered to you abroad.</p>
`,
  },
});
