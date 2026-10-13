import { defineGuide } from '../../lib/guide-types';
import { pflegegeld } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Pflegegeld, das je Halbjahr am Nachweis des Beratungsbesuchs hängt; Besuche im Jahr. */
const B = P.beratung, R = P.hilfsmittel_regeln;
const G = [2, 3, 4, 5] as const;
const halbjahr = (g: 2 | 3 | 4 | 5) => pflegegeld(g) * B.pg23_monate;
const proJahrPflicht = 12 / B.pg23_monate, proJahrMax45 = 12 / B.pg45_monate;
/** Bis zum Stichtag darf auf Wunsch jeder zweite Besuch per Video stattfinden; der erste ist immer zu Hause. */
const videoMax = (n: number) => Math.floor(n / 2);
const datum = (iso: string, l: 'de' | 'en') => new Date(`${iso}T12:00:00Z`).toLocaleDateString(l === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const VD = datum(B.video_bis, 'de'), VE = datum(B.video_bis, 'en');

export default defineGuide({
  id: 'beratungseinsatz',
  group: 'zuhause',
  order: 110,
  mini: 'beratung',
  related: ['pflegegeld', 'pflegegrad-4', 'pflegesachleistung', 'umwandlungsanspruch', 'pflegehilfsmittel', 'pflegegrad-1'],
  sources: ['sgb11_37', 'sgb11_7a', 'sgb11_40', 'sgb11_45a', 'sgb11_28a'],
  de: {
    slug: 'beratungseinsatz',
    nav: 'Beratungseinsatz',
    card: `Pflicht für Pflegegeld ab Pflegegrad 2, einmal im Halbjahr, kostenlos, jeder zweite Termin bis ${VD} per Video möglich.`,
    title: 'Beratungseinsatz 2026: Pflicht, Fristen, Video, Kürzung',
    description: `Beratungseinsatz 2026: halbjährlich Pflicht bei Pflegegeld ab Pflegegrad 2, bei Grad 4 und 5 auf Wunsch alle ${B.pg45_monate} Monate. Wer kommt, Video, Kosten, Kürzung.`,
    h1: 'Beratungseinsatz: der Pflichtbesuch, der das Pflegegeld sichert',
    intro: 'Eine Pflegefachkraft kommt nach Hause, schaut sich die Pflege an und gibt Tipps. Für viele Familien ist der Termin Pflicht, für alle ist er kostenlos.',
    resume: `Wer Pflegegeld bezieht und Pflegegrad 2 bis 5 hat, muss einmal im Halbjahr eine Beratung in der eigenen Häuslichkeit abrufen, den sogenannten Beratungseinsatz (§ 37 Abs. 3 SGB XI). Bei Pflegegrad 4 und 5 ist zusätzlich ein Besuch alle ${B.pg45_monate} Monate möglich, aber nicht vorgeschrieben. Pflegebedürftige mit Pflegegrad 1 und Familien, die einen Pflegedienst über die Sachleistung nutzen, haben einen Anspruch auf eine Beratung je Halbjahr, ohne Pflicht. Der Besuch kostet nichts, die Pflegekasse oder die private Pflegeversicherung trägt die Vergütung. Ihn durchführen dürfen zugelassene Pflegedienste, anerkannte Beratungsstellen, Pflegeberater und in bestimmten Fällen beauftragte Pflegefachpersonen. Der erste Termin findet immer zu Hause statt; danach darf auf Wunsch jeder zweite Termin bis zum ${VD} per Videokonferenz laufen. Wer den Pflichtbesuch nicht abruft, riskiert eine angemessene Kürzung des Pflegegeldes und im Wiederholungsfall den Entzug (§ 37 Abs. 6). Bei Pflegegrad 3 hängen so ${DE.eur(halbjahr(3))} je Halbjahr am Nachweis.`,
    faqs: [
      { q: 'Was kostet der Beratungseinsatz die Familie?', a: 'Nichts. Die Vergütung für die Beratung trägt die zuständige Pflegekasse, bei privat Versicherten das private Versicherungsunternehmen und bei Beihilfeberechtigten anteilig die Beihilfestelle (§ 37 Abs. 3c SGB XI). Der Pflegedienst rechnet direkt ab. Eine Rechnung an die Familie ist für diesen Besuch nicht vorgesehen; kommt trotzdem eine, fragen Sie bei der Kasse nach, bevor Sie zahlen.' },
      { q: 'Wer darf den Beratungsbesuch bei uns zu Hause durchführen?', a: 'Ein zugelassener Pflegedienst, eine von den Landesverbänden der Pflegekassen anerkannte Beratungsstelle oder, wenn beide vor Ort fehlen, eine von der Kasse beauftragte Pflegefachperson (§ 37 Abs. 3b). Auch Pflegeberater nach § 7a und fachlich geeignete Beratungspersonen der Kommunen dürfen kommen (Abs. 8). Ausgeschlossen sind reine Betreuungsdienste nach § 71 Abs. 1a (Abs. 9). Die Beratungsstelle muss die Durchführung der Kasse bestätigen, damit der Nachweis vorliegt.' },
      { q: 'Darf der Beratungseinsatz per Videokonferenz stattfinden?', a: `Ja, auf Wunsch der pflegebedürftigen Person jeder zweite Termin, und zwar bis einschließlich ${VD}. Die allererste Beratung muss aber in der Wohnung stattfinden. Die Videotechnik muss die Anforderungen erfüllen, die für ärztliche Videosprechstunden gelten. Ein reines Telefonat genügt nach dem Gesetz nicht. Für die Zeit nach dem Stichtag sieht das geltende Recht keine Videoberatung mehr vor.` },
      { q: 'Was passiert, wenn der Nachweis über den Beratungseinsatz fehlt?', a: 'Ruft eine pflegebedürftige Person mit Pflicht die Beratung nicht ab, muss die Pflegekasse das Pflegegeld angemessen kürzen und im Wiederholungsfall entziehen (§ 37 Abs. 6 SGB XI). Einen festen Prozentsatz nennt das Gesetz nicht. Weil der Dienst die Durchführung direkt an die Kasse meldet, reicht es, den Termin rechtzeitig vor Ablauf des Halbjahres zu vereinbaren und wahrzunehmen.' },
      { q: 'Erfährt die Pflegekasse alles, was beim Beratungsbesuch besprochen wird?', a: 'Nein. Die Beratungsstelle bestätigt der Kasse, dass der Besuch stattgefunden hat. Die Erkenntnisse zur Verbesserung der Pflegesituation erhält die pflegebedürftige Person, die Kasse nur mit deren Einwilligung (§ 37 Abs. 4). Ohne Einwilligung meldet die Stelle der Kasse lediglich, wenn sie eine weitergehende Beratung für nötig hält; die Kasse bietet dann eine Pflegeberatung nach § 7a an.' },
      { q: 'Gilt die Beratungspflicht auch, wenn Alltagshilfen über die Umwandlung bezahlt werden?', a: 'Das Gesetz erklärt die Regeln zur Beratung in der eigenen Häuslichkeit für entsprechend anwendbar, wenn jemand den Umwandlungsanspruch nutzt (§ 45a Abs. 4 SGB XI). Die Kürzung oder der Entzug bei einem versäumten Besuch trifft dann die Kostenerstattung für die Alltagshilfe. Wer also Pflegegeld und Umwandlung kombiniert, sollte die Beratungstermine genauso fest einplanen.' },
      { q: 'Kommt bei jedem Beratungsbesuch dieselbe Pflegekraft?', a: 'Das Gesetz verlangt, dass bei der Planung weitestgehend sichergestellt wird, dass möglichst auf Dauer dieselbe Pflegekraft kommt (§ 37 Abs. 4 SGB XI). Außerdem sollen die eingesetzten Kräfte das Krankheitsbild kennen und besondere Beratungskompetenz mitbringen. Am besten klappt das, wenn Sie den Folgetermin gleich beim selben Dienst vereinbaren und Ihre Fragen vorher aufschreiben.' },
    ],
    body: (h) => `
<h2>Wer muss, wer darf</h2>
${h.table(['Situation', 'Beratung', 'Häufigkeit'], [
  ['Pflegegrad 2 oder 3, nur Pflegegeld', 'Pflicht', `einmal je Halbjahr (${B.pg23_monate} Monate)`],
  ['Pflegegrad 4 oder 5, nur Pflegegeld', 'Pflicht, dazu freiwillige Zusatzbesuche', `Pflicht je Halbjahr, auf Wunsch alle ${B.pg45_monate} Monate`],
  ['Pflegegrad 1', 'Anspruch, keine Pflicht', 'einmal je Halbjahr'],
  ['Pflegesachleistung durch einen Pflegedienst', 'Anspruch, keine Pflicht', 'einmal je Halbjahr'],
  ['Umwandlungsanspruch für Alltagshilfen', 'Regeln des § 37 Abs. 3 gelten entsprechend', 'Kürzung trifft die Kostenerstattung'],
], `Beratung in der eigenen Häuslichkeit nach ${h.src('sgb11_37', '§ 37 Abs. 3 SGB XI')} und ${h.src('sgb11_45a', '§ 45a Abs. 4 SGB XI')}.`, ['l', 'l', 'l'])}
<p>Das Wort „abrufen“ im Gesetz ist ernst gemeint: Die Initiative liegt bei der pflegebedürftigen Person und ihrer Familie, nicht bei der Kasse. Am sichersten ist es, den nächsten Termin schon beim aktuellen Besuch zu vereinbaren. Für Pflegegrad 1 gehört die Beratung zu den ausdrücklich genannten Leistungen (${h.src('sgb11_28a', '§ 28a SGB XI')}), für die Sachleistung ist sie ein Angebot, das sich lohnt, weil ein zweiter Blick von außen die Pflege oft verbessert.</p>

<h2>Was bei dem Besuch passiert</h2>
<p>Die Beratung dient der Sicherung der Qualität der häuslichen Pflege und der praktischen pflegefachlichen Unterstützung der Pflegenden (§ 37 Abs. 3a). Es geht also um den Alltag: wie Körperpflege, Lagerung, Essen und Bewegung gelingen und wie stark die Angehörigen belastet sind. Stellt sie fest, dass mehr Unterstützung nötig ist, weist sie insbesondere hin auf den Pflegestützpunkt, die Pflegeberatung nach ${h.src('sgb11_7a', '§ 7a SGB XI')} mit einem Versorgungsplan, Pflegekurse auch zu Hause und sonstige Hilfsangebote. Ihre Empfehlungen nimmt sie mit Einwilligung in den Nachweis auf; die Kasse muss dann zeitnah helfen, sie umzusetzen.</p>

<h2>Wer kommt</h2>
<p>Zur Wahl stehen ein zugelassener Pflegedienst, eine anerkannte Beratungsstelle mit nachgewiesener pflegefachlicher Kompetenz und, nur wenn beides vor Ort fehlt, eine von der Kasse beauftragte, aber nicht bei ihr beschäftigte Pflegefachperson (§ 37 Abs. 3b). Daneben dürfen Pflegeberater und geeignete Beratungspersonen der Kommunen die Besuche übernehmen (Abs. 8). Reine Betreuungsdienste dürfen es nicht (Abs. 9). Die Dienste sollen Kräfte schicken, die das konkrete Krankheitsbild kennen, und möglichst dauerhaft dieselbe Person.</p>

<h2>Video und der erste Termin</h2>
<p>Auf Wunsch der pflegebedürftigen Person läuft bis einschließlich ${h.date(B.video_bis)} jede zweite Beratung per Videokonferenz. Die erste Beratung findet immer in der Wohnung statt. Die Technik muss die Anforderungen erfüllen, die für Videosprechstunden in der Krankenversicherung vereinbart sind.</p>
${h.table(['Situation', 'Besuche im Jahr', 'davon höchstens per Video'], [
  ['Pflicht je Halbjahr', proJahrPflicht, videoMax(proJahrPflicht)],
  [`Pflegegrad 4 oder 5 mit Besuchen alle ${B.pg45_monate} Monate`, proJahrMax45, videoMax(proJahrMax45)],
], `Bis ${h.date(B.video_bis)}; der allererste Besuch ist immer vor Ort.`, ['l', 'r', 'r'])}

<h2>Was mit den Ergebnissen geschieht</h2>
<p>Der Dienst bestätigt der Kasse die Durchführung auf einem einheitlichen Formular, das elektronisch oder maschinell lesbar übermittelt wird (§ 37 Abs. 4). Die Erkenntnisse zur Verbesserung der Pflegesituation gehen an die pflegebedürftige Person, an die Kasse nur mit ihrer Einwilligung. Verweigert sie die Einwilligung, hält die Fachkraft aber eine weitergehende Beratung für angezeigt, teilt die Stelle der Kasse nur diese Einschätzung mit, und die Kasse bietet eine Pflegeberatung an. Kinder, die aus der Ferne mitplanen, können die schriftlichen Ergebnisse bei den Eltern erfragen und so sehen, wo die Pflege hakt.</p>

<h2>Was auf dem Spiel steht</h2>
${h.table(['Pflegegrad', 'Pflegegeld im Monat', 'je Halbjahr am Nachweis'],
  G.map((g) => [g, h.eur(pflegegeld(g)), h.eur(halbjahr(g))]),
  `Rechnung des Motors: Pflegegeld nach § 37 Abs. 1 mal ${B.pg23_monate} Monate. Die Kürzung ist „angemessen“, einen festen Satz nennt das Gesetz nicht; beim Wiederholungsfall droht der Entzug.`, ['l', 'r', 'r'])}
<p>Gemessen an diesen Beträgen ist ein einziger Termin im Halbjahr ein kleiner Aufwand. Wichtig ist der Zeitpunkt: Die Pflicht bezieht sich auf das Halbjahr. Wer einen Pflegegrad im laufenden Jahr bekommt, sollte bei der Kasse nachfragen, bis wann der erste Besuch fällig ist, und ihn nicht auf den letzten Tag legen.</p>
<!--mini:gradGeld-->

<h2>Die Empfehlung für ein Hilfsmittel gleich mitnehmen</h2>
<p>Pflegefachpersonen dürfen im Rahmen des Beratungseinsatzes konkrete Empfehlungen für Hilfsmittel und ${h.a('pflegehilfsmittel', 'Pflegehilfsmittel')} abgeben (${h.src('sgb11_40', '§ 40 Abs. 6 SGB XI')}). Liegt die Empfehlung dem Antrag bei und ist sie nicht älter als ${R.empfehlung_max_wochen} Wochen, werden Notwendigkeit und Erforderlichkeit unter den Voraussetzungen der Richtlinien vermutet; eine ärztliche Verordnung ist dann nicht nötig. Fragen Sie also beim Besuch direkt nach einem Pflegebett, einem Duschhocker oder einer Lagerungshilfe, und schicken Sie den Antrag innerhalb dieser Frist ab.</p>

<h2>Drei Missverständnisse</h2>
<p><strong>„Der Besuch ist eine neue Begutachtung.“</strong> Nein. Über den Pflegegrad entscheidet die Kasse auf Grundlage des Gutachtens des Medizinischen Dienstes. Die Beratung ist Unterstützung und Qualitätssicherung, keine neue Einstufung. Wer meint, der Grad passe nicht mehr, stellt einen eigenen Antrag auf Höherstufung.</p>
<p><strong>„Mit Video fällt der Hausbesuch ganz weg.“</strong> Nein. Bis zum Stichtag darf nur jeder zweite Termin per Video laufen, und der allererste immer vor Ort. Wer zweimal im Jahr beraten wird, hat also mindestens einen Termin in der Wohnung.</p>
<p><strong>„Wer einen Pflegedienst hat, muss den Beratungsbesuch auch machen.“</strong> Nein. Bei reiner Sachleistung ist die Beratung ein Anspruch, keine Pflicht. Die Pflicht hängt am Pflegegeld, und bei Grad 4 und 5 sind die zusätzlichen Besuche alle ${B.pg45_monate} Monate ebenfalls freiwillig.</p>

<h2>Checkliste für den nächsten Termin</h2>
<ol>
<li>Im Kalender das Ende des laufenden Halbjahres markieren und den Termin früh vereinbaren.</li>
<li>Den ersten Termin vor Ort einplanen; danach entscheiden, ob jeder zweite Termin per Video laufen soll.</li>
<li>Vorher notieren, was im Alltag schwierig ist: Nächte, Stürze, Essen, Belastung der Pflegenden.</li>
<li>Nach Hilfsmitteln fragen und die Empfehlung innerhalb von ${R.empfehlung_max_wochen} Wochen mit dem Antrag einreichen.</li>
<li>Entscheiden, ob die Ergebnisse an die Kasse gehen dürfen, und die Kopie aufbewahren.</li>
</ol>
`,
  },
  en: {
    slug: 'home-advice-visit',
    nav: 'Home advice visit',
    card: `Compulsory with the care allowance from grade 2, once every six months, free of charge, every second visit by video until ${VE}.`,
    title: 'Beratungseinsatz 2026: Home Advice Visit, Rules and Video',
    description: `German home advice visit 2026: compulsory every six months with the care allowance from grade 2, every ${B.pg45_monate} months on request at grades 4-5. Who comes, sanctions.`,
    h1: 'Home advice visit: the required check that keeps the care allowance flowing',
    intro: 'A registered nurse comes to the home, looks at how care works and gives advice. For many families the visit is compulsory; for all of them it is free.',
    resume: `Anyone at care grade 2 to 5 who receives the care allowance (Pflegegeld) must call up an advice visit at home once every six months, known as the Beratungseinsatz (section 37(3) of Book XI of the German Social Code, SGB XI). At grades 4 and 5 a visit every ${B.pg45_monate} months is also possible, but not required. People at grade 1 and families using a care service through the services budget are entitled to one visit every six months, with no obligation. The visit costs nothing; the long-term care fund or the private insurer pays for it. It may be carried out by registered care services, recognised advice centres, care advisers and, in certain cases, nurses commissioned by the fund. The first visit always takes place at home; after that, every second visit can be held by video on request until ${VE}. Anyone who fails to call up a compulsory visit risks an appropriate cut in the allowance and, if it happens again, its withdrawal (section 37(6)). At grade 3, ${EN.eur(halbjahr(3))} per half-year depends on the proof.`,
    faqs: [
      { q: 'What does the home advice visit cost the family?', a: 'Nothing. The fee is paid by the responsible care fund, by the private insurer for privately insured people, and partly by the civil service allowance office for those entitled to Beihilfe (section 37(3c) SGB XI). The care service bills them directly. No invoice to the family is foreseen for this visit; if one arrives anyway, check with the fund before paying it.' },
      { q: 'Who may carry out the advice visit in the home?', a: 'A registered care service, an advice centre recognised by the state associations of care funds or, where neither is available locally, a nurse commissioned by the fund (section 37(3b)). Care advisers under section 7a and suitably qualified municipal advisers may also come (subsection 8). Pure supervision services under section 71(1a) are excluded (subsection 9). Whoever carries out the visit must confirm it to the fund, which is how the proof reaches the file.' },
      { q: 'Can the advice visit take place by video call?', a: `Yes, every second visit on the request of the person needing care, up to and including ${VE}. The very first visit must take place in the home. The video technology must meet the standards agreed for doctors’ video consultations. A simple phone call is not enough under the law. Current law makes no provision for video advice after that date.` },
      { q: 'What happens if proof of the advice visit is missing?', a: 'If someone who is obliged to call up the visit fails to do so, the care fund must cut the allowance appropriately and withdraw it if it happens again (section 37(6) SGB XI). The law sets no fixed percentage. Because the service reports the visit directly to the fund, it is enough to book and attend the appointment in good time before the half-year ends.' },
      { q: 'Does the care fund learn everything discussed at the visit?', a: 'No. The service confirms to the fund that the visit took place. The findings on improving the care situation go to the person needing care, and to the fund only with their consent (section 37(4)). Without consent, the service only tells the fund if it believes further advice is needed; the fund then offers care counselling under section 7a.' },
      { q: 'Do the visit rules apply when everyday help is paid via conversion?', a: 'The law declares the rules on advice at home applicable accordingly when someone uses the conversion claim (section 45a(4) SGB XI). A cut or withdrawal after a missed visit then affects the refund for everyday help. Families combining the allowance with conversion should therefore plan the visits just as firmly as those on the allowance alone.' },
      { q: 'Will the same nurse come to every advice visit?', a: 'The law requires services to plan so that, as far as possible, the same nurse comes on a lasting basis (section 37(4) SGB XI). Staff sent should also know the specific condition and have particular advisory skills. It works best if you book the follow-up visit with the same service straight away and write your questions down beforehand.' },
    ],
    body: (h) => `
<h2>Who must, who may</h2>
${h.table(['Situation', 'Advice visit', 'Frequency'], [
  ['grade 2 or 3, allowance only', 'compulsory', `once every half-year (${B.pg23_monate} months)`],
  ['grade 4 or 5, allowance only', 'compulsory, plus optional extra visits', `compulsory each half-year, on request every ${B.pg45_monate} months`],
  ['grade 1', 'entitlement, no obligation', 'once every half-year'],
  ['services from a care service', 'entitlement, no obligation', 'once every half-year'],
  ['conversion claim for everyday help', 'rules of section 37(3) apply accordingly', 'a cut affects the refund'],
], `Advice at home under ${h.src('sgb11_37', 'section 37(3) SGB XI')} and ${h.src('sgb11_45a', 'section 45a(4) SGB XI')}.`, ['l', 'l', 'l'])}
<p>The word the law uses, “abrufen” (to call up), means the initiative lies with the person needing care and their family, not with the fund. The safest approach is to book the next visit during the current one. At grade 1 the visit is one of the benefits listed by name (${h.src('sgb11_28a', 'section 28a SGB XI')}); with the services budget it is an offer worth taking, because a second pair of eyes often improves care. For a son or daughter abroad, the visit is also a regular professional check on how a parent is really managing.</p>

<h2>What happens at the visit</h2>
<p>The visit serves to secure the quality of care at home and to give carers practical professional support (section 37(3a)). It is about daily life: how personal care, positioning, eating and moving work, and how heavily the carers are burdened. If more support is needed, they point in particular to the local care support centre (Pflegestützpunkt), care counselling under ${h.src('sgb11_7a', 'section 7a SGB XI')} with a care plan, care courses including at home, and other help. With consent their recommendations go into the visit record, and the fund must then help put them into practice promptly.</p>

<h2>Who comes</h2>
<p>The options are a registered care service, a recognised advice centre with proven nursing expertise and, only where neither is available locally, a nurse commissioned but not employed by the fund (section 37(3b)). Care advisers and suitable municipal advisers may also carry out the visits (subsection 8). Pure supervision services may not (subsection 9). Services should send staff who know the specific condition and, where possible, the same person each time.</p>

<h2>Video and the first visit</h2>
<p>At the request of the person needing care, every second visit can take place by video until ${h.date(B.video_bis)} inclusive. The first visit always takes place in the home. The technology must meet the standards agreed for video consultations in health insurance.</p>
${h.table(['Situation', 'Visits per year', 'of which at most by video'], [
  ['compulsory every half-year', proJahrPflicht, videoMax(proJahrPflicht)],
  [`grade 4 or 5 with visits every ${B.pg45_monate} months`, proJahrMax45, videoMax(proJahrMax45)],
], `Until ${h.date(B.video_bis)}; the very first visit is always in person.`, ['l', 'r', 'r'])}

<h2>What happens to the findings</h2>
<p>The service confirms the visit to the fund on a standard form sent electronically or in machine-readable form (section 37(4)). The findings on improving care go to the person needing care, and to the fund only with their consent. If consent is refused but the nurse considers further advice necessary, the service passes on only that assessment and the fund offers counselling. Children planning from a distance can ask their parents for the written findings and see where care is struggling.</p>

<h2>What is at stake</h2>
${h.table(['Care grade', 'Allowance per month', 'per half-year tied to the proof'],
  G.map((g) => [g, h.eur(pflegegeld(g)), h.eur(halbjahr(g))]),
  `Engine calculation: allowance under section 37(1) times ${B.pg23_monate} months. The cut must be “appropriate”; the law sets no fixed rate, and repeated failure can lead to withdrawal.`, ['l', 'r', 'r'])}
<p>Measured against these sums, one appointment per half-year is a small effort. Timing matters: the obligation relates to the half-year. If a care grade is awarded during the year, ask the fund when the first visit is due and do not leave it to the last day.</p>
<!--mini:gradGeld-->

<h2>Take the recommendation for an aid with you</h2>
<p>During the advice visit, nurses may make specific recommendations for medical aids and ${h.a('pflegehilfsmittel', 'care aids')} (${h.src('sgb11_40', 'section 40(6) SGB XI')}). If the recommendation accompanies the application and is no older than ${R.empfehlung_max_wochen} weeks, need is presumed under the conditions of the guidelines and no doctor’s prescription is required. So ask at the visit about a care bed, a shower stool or a positioning aid, and send the application within that period.</p>

<h2>Three misunderstandings</h2>
<p><strong>“The visit is a new assessment.”</strong> No. The care grade is decided by the fund on the basis of the Medical Service report. The advice visit is support and quality assurance, not a new grading. If you think the grade no longer fits, file a separate application for a higher grade.</p>
<p><strong>“With video the home visit disappears.”</strong> No. Until the cut-off date only every second visit may be by video, and the very first is always in person. Anyone advised twice a year therefore has at least one visit in the home.</p>
<p><strong>“Anyone using a care service must have the visit too.”</strong> No. With services only, the visit is an entitlement, not an obligation. The obligation is tied to the care allowance, and at grades 4 and 5 the extra visits every ${B.pg45_monate} months are optional as well.</p>

<h2>Checklist for the next visit</h2>
<ol>
<li>Mark the end of the current half-year in the calendar and book the visit early.</li>
<li>Plan the first visit in person; then decide whether every second visit should be by video.</li>
<li>Note beforehand what is difficult day to day: nights, falls, eating, the strain on carers.</li>
<li>Ask about aids and submit the recommendation with the application within ${R.empfehlung_max_wochen} weeks.</li>
<li>Decide whether the findings may go to the fund and keep a copy.</li>
</ol>
`,
  },
});
