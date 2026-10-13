import { defineGuide } from '../../lib/guide-types';
import { pflegegeld } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: drei Monate gezögert bei erwartetem Grad 3; Bescheid fünf Wochen zu spät. */
const V = P.verfahren;
const verloren = pflegegeld(3) * 3;
const verzug = V.verzug_euro_woche * 5;

export default defineGuide({
  id: 'pflegegrad-beantragen',
  group: 'grad',
  order: 70,
  mini: 'antragMonat',
  related: ['begutachtung-medizinischer-dienst', 'pflegegrad-rechner', 'widerspruch-pflegegrad', 'pflegegrad-2', 'kurzzeitpflege', 'pflegezeit'],
  sources: ['sgb11_33', 'sgb11_18', 'sgb11_18a', 'sgb11_18c', 'mdBegutachtung'],
  de: {
    slug: 'pflegegrad-beantragen',
    nav: 'Pflegegrad beantragen',
    card: 'Anruf genügt, Geld ab dem Antragsmonat, Bescheid in 25 Arbeitstagen, sonst 70 € je Woche: der Antrag Schritt für Schritt.',
    title: 'Pflegegrad beantragen 2026: Antrag, Fristen, erste Zahlung',
    description: `Pflegegrad beantragen 2026: formloser Antrag bei der Pflegekasse, Leistungen ab dem Antragsmonat, Bescheid in ${V.entscheidung_arbeitstage} Arbeitstagen, sonst ${V.verzug_euro_woche} € je Woche Verzug.`,
    h1: 'Pflegegrad beantragen: so geht es schnell und vollständig',
    intro: 'Vom ersten Anruf bei der Pflegekasse bis zum Bescheid: was Sie sagen, welche Fristen die Kasse einhalten muss und warum jeder Monat Warten Geld kostet.',
    resume: `Den Pflegegrad beantragen Sie bei der Pflegekasse, die bei Ihrer Krankenkasse sitzt; bei Privatversicherten beim Versicherungsunternehmen. Ein Anruf, eine E-Mail oder ein formloser Brief reicht, das Formular kann nachgereicht werden. Entscheidend ist das Datum: Leistungen gibt es ab dem Monat, in dem der Antrag eingeht, nicht rückwirkend davor (§ 33 Abs. 1 SGB XI). Wer bei erwartetem Pflegegrad 3 drei Monate zögert, verliert ${DE.eur(verloren)} Pflegegeld. Nach dem Antrag beauftragt die Kasse den Medizinischen Dienst, der in der Regel zu Hause begutachtet. Den schriftlichen Bescheid muss die Kasse spätestens ${V.entscheidung_arbeitstage} Arbeitstage nach Eingang schicken (§ 18c). Hält sie die Frist ohne eigenen Grund nicht ein, zahlt sie ${DE.eur(V.verzug_euro_woche)} für jede angefangene Woche. Für Patienten im Krankenhaus, in der Reha, im Hospiz oder in der Palliativversorgung muss die Begutachtung schon nach ${V.frist_krankenhaus_arbeitstage} Arbeitstagen stattfinden. Voraussetzung ist eine Vorversicherung von zwei Jahren in den letzten zehn.`,
    faqs: [
      { q: 'Wer darf den Antrag auf einen Pflegegrad stellen?', a: 'Die pflegebedürftige Person selbst, oder jemand, den sie bevollmächtigt hat, etwa ein Kind mit Vorsorgevollmacht, oder eine gerichtlich bestellte Betreuerin. Angehörige können den Anruf übernehmen, die Kasse verlangt dann eine Vollmacht oder die Unterschrift der versicherten Person auf dem Formular. Der Antrag wirkt ab dem Tag, an dem er bei der Kasse eingeht.' },
      { q: 'Was zahlt die Pflegekasse, wenn der Bescheid zu spät kommt?', a: `Für jede angefangene Woche nach Ablauf von ${V.entscheidung_arbeitstage} Arbeitstagen ${DE.eur(V.verzug_euro_woche)} (§ 18c Abs. 5 SGB XI), bei fünf Wochen also ${DE.eur(verzug)}. Das gilt nicht, wenn die Kasse die Verzögerung nicht zu vertreten hat, etwa weil Unterlagen fehlten oder der Termin auf Ihren Wunsch verschoben wurde, und nicht für Heimbewohner, die schon mindestens Pflegegrad 2 haben.` },
      { q: 'Sollte ich den Antrag schon aus dem Krankenhaus stellen?', a: `Ja, wenn absehbar ist, dass die Versorgung nach der Entlassung neu geregelt werden muss. Dann gilt eine verkürzte Frist: Die Begutachtung muss spätestens am ${V.frist_krankenhaus_arbeitstage}. Arbeitstag nach Eingang stattfinden, oft nach Aktenlage im Krankenhaus (§ 18a Abs. 5 SGB XI). Der Sozialdienst der Klinik hilft beim Antrag und bei der Suche nach Kurzzeitpflege.` },
      { q: 'Muss ich vor dem Antrag beim Arzt gewesen sein?', a: 'Nein, ein ärztliches Attest ist keine Voraussetzung. Hilfreich sind aber Arztbriefe, Entlassungsberichte, der Medikamentenplan und Befunde, weil sie dem Medizinischen Dienst zeigen, welche Erkrankungen zu den Einschränkungen führen. Legen Sie sie beim Hausbesuch bereit oder schicken Sie Kopien vorab, damit nichts vergessen wird.' },
      { q: 'Was passiert, wenn meine Mutter die Begutachtung ablehnt?', a: 'Dann kann die Pflegekasse die Leistungen verweigern, weil die Untersuchung im Wohnbereich Voraussetzung ist (§ 18a Abs. 2 SGB XI). Oft hilft es, den Termin so zu legen, dass ein vertrauter Mensch dabei ist, und vorher zu erklären, dass niemand die Wohnung kontrolliert, sondern nur die nötige Hilfe festgestellt wird.' },
    ],
    body: (h) => `
<h2>Der Antrag in fünf Schritten</h2>
<ol>
<li><strong>Pflegekasse anrufen.</strong> Sie sitzt bei der Krankenkasse der pflegebedürftigen Person. Sagen Sie: „Ich beantrage Leistungen der Pflegeversicherung.“ Notieren Sie Datum und Namen des Gesprächspartners. Ab diesem Monat wird gezahlt.</li>
<li><strong>Formular zurückschicken.</strong> Die Kasse schickt einen Antrag; darin geht es um Versicherung, Wohnsituation und die gewünschte Leistung (Pflegegeld, Sachleistung oder beides). Die Entscheidung über die Leistungsart lässt sich später ändern.</li>
<li><strong>Pflegetagebuch führen.</strong> Zwei Wochen lang jede Hilfe mit Uhrzeit aufschreiben: beim Aufstehen, Waschen, Anziehen, Essen, Trinken, bei Medikamenten, nachts. Das ist die beste Vorbereitung auf das Gutachten.</li>
<li><strong>Begutachtung.</strong> Der Medizinische Dienst oder eine von der Kasse beauftragte Gutachterin kommt nach Hause, bei Privatversicherten der Dienst des Versicherers. Die Hauptpflegeperson sollte dabei sein. Mehr unter ${h.a('begutachtung-medizinischer-dienst', 'Begutachtung durch den Medizinischen Dienst')}.</li>
<li><strong>Bescheid prüfen.</strong> Mit dem Bescheid kommt das Gutachten, sofern Sie nicht widersprechen (${h.src('sgb11_18c', '§ 18c Abs. 2 SGB XI')}). Passt der Grad nicht, bleibt ein Monat für den ${h.a('widerspruch-pflegegrad', 'Widerspruch')}.</li>
</ol>

<h2>Die Fristen, die für die Pflegekasse gelten</h2>
${h.table(['Lage', 'Frist', 'Grundlage'], [
  ['Normalfall', `Bescheid spätestens ${V.entscheidung_arbeitstage} Arbeitstage nach Antrag`, '§ 18c Abs. 1'],
  ['Krankenhaus, stationäre Reha, Hospiz, ambulante Palliativversorgung (mit Bedarf)', `Begutachtung spätestens am ${V.frist_krankenhaus_arbeitstage}. Arbeitstag`, '§ 18a Abs. 5'],
  ['Zu Hause, Pflegezeit oder Familienpflegezeit beim Arbeitgeber angekündigt', `Begutachtung innerhalb von ${V.frist_pflegezeit_arbeitstage} Arbeitstagen`, '§ 18a Abs. 6'],
  ['Kurzzeitpflege direkt nach Klinik oder Reha', `abschließende Begutachtung bis zum ${V.frist_kurzzeit_nach_klinik_arbeitstage}. Arbeitstag der Kurzzeitpflege`, '§ 18a Abs. 7'],
  ['Frist überschritten, Kasse verantwortlich', `${h.eur(V.verzug_euro_woche)} je angefangene Woche`, '§ 18c Abs. 5'],
], 'Fristen für die Feststellung der Pflegebedürftigkeit, SGB XI.', ['l', 'l', 'l'])}
<p>Die Fristen laufen ab Eingang des Antrags. Fordert die Kasse noch zwingend nötige Unterlagen an, wird die Frist unterbrochen, bis diese eingehen. Wer schnell liefert, verkürzt also das Verfahren. In den verkürzten Verfahren nach Klinik oder bei angekündigter Pflegezeit stellt der Gutachter zunächst nur fest, ob mindestens Pflegegrad 2 vorliegt; die vollständige Begutachtung wird danach nachgeholt (${h.src('sgb11_18a', '§ 18a Abs. 7 SGB XI')}).</p>

<h2>Was im Antragsgespräch hilft</h2>
<p>Die Kasse fragt am Telefon meist nur nach Versichertennummer, Anschrift und der gewünschten Leistung. Nennen Sie trotzdem kurz, warum Hilfe nötig ist, etwa ein Sturz, eine Demenzdiagnose oder eine bevorstehende Entlassung aus dem Krankenhaus. Fragen Sie nach einer Pflegeberatung nach § 7a SGB XI: Die Kasse muss sie anbieten, und eine Beraterin kann auch zu Hause klären, welche Leistungen sofort möglich sind. Bitten Sie außerdem darum, dass Ihnen das Gutachten zugeschickt wird, und darum, beim Hausbesuch dabei sein zu können. Wer einen Termin im Kalender hat, kann Arbeit, Kinderbetreuung und die Anwesenheit der wichtigsten Pflegeperson planen. Und wer schon einen Pflegedienst gefunden hat, sollte den Namen nennen: Dann kann die Kasse die Kombinationsleistung gleich vorbereiten.</p>

<h2>Warum Zögern Geld kostet</h2>
<p>Viele Familien warten mit dem Antrag, bis „es wirklich nicht mehr geht“. Das ist teuer, denn Leistungen gibt es erst ab dem Monat des Antrags (${h.src('sgb11_33', '§ 33 Abs. 1 SGB XI')}). Bei erwartetem Pflegegrad 3 sind drei Monate Warten ${h.eur(verloren)} Pflegegeld, dazu verfallene Monate Entlastungsbetrag. Der Rechner oben zeigt den Betrag für jeden Grad. Wer unsicher ist, ob es schon für einen Grad reicht, kann vorher den ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} ausfüllen; schon ab ${h.num(P.nba.schwellen[0], 1)} Punkten gibt es Pflegegrad 1.</p>

<h2>Wer anspruchsberechtigt ist</h2>
<p>Leistungen setzt voraus, dass die Person in den letzten zehn Jahren vor dem Antrag mindestens zwei Jahre in der Pflegeversicherung versichert oder familienversichert war; bei Kindern genügt es, wenn ein Elternteil diese Zeit erfüllt (§ 33 Abs. 2 SGB XI). Wer aus der privaten in die gesetzliche Pflegeversicherung wechselt, bekommt die privat versicherte Zeit angerechnet. Die Pflegebedürftigkeit muss voraussichtlich mindestens sechs Monate bestehen.</p>

<h2>Welche Leistung im Antrag ankreuzen?</h2>
<p>Das Formular fragt, ob Pflegegeld, Sachleistung oder beides gewünscht ist. Pflegen Angehörige, ist das ${h.a('pflegegeld', 'Pflegegeld')} der Standard. Kommt bereits ein Pflegedienst, wählen Sie die ${h.a('kombinationsleistung', 'Kombinationsleistung')}; der Dienst rechnet dann direkt ab. Entlastungsbetrag und Pflegehilfsmittel brauchen keinen eigenen Antrag im Formular, die Hilfsmittelpauschale wird meist über einen Anbieter beantragt. Kurzzeit- und Verhinderungspflege sind nach dem Bescheid ohne weiteren Vorab-Antrag möglich.</p>
<!--mini:gradGeld-->

<h2>Wenn Angehörige im Ausland leben</h2>
<p>Der Antrag muss nicht von vor Ort gestellt werden. Mit einer Vollmacht kann ein Kind von überall anrufen oder schreiben. Für den Hausbesuch ist aber eine Person nötig, die den Alltag kennt; ist niemand in Deutschland, sollte zumindest ein schriftliches Pflegetagebuch vorliegen. Die englische Fassung dieser Seite erklärt das Verfahren für Familien, die nicht in Deutschland leben.</p>
`,
  },
  en: {
    slug: 'applying-for-a-care-grade',
    nav: 'Applying for a care grade',
    card: 'A phone call is enough, money from the month you apply, a decision in 25 working days or €70 a week: the application step by step.',
    title: 'Pflegegrad beantragen 2026: Applying for a German Care Grade',
    description: `Applying for a German care grade in 2026: informal request to the Pflegekasse, benefits from that month, decision in ${V.entscheidung_arbeitstage} working days or ${V.verzug_euro_woche} euros a week.`,
    h1: 'Applying for a German care grade, quickly and completely',
    intro: 'From the first call to the care fund to the decision letter: what to say, which deadlines the fund must meet and why every month of waiting costs money.',
    resume: `You apply for a German care grade (Pflegegrad) to the long-term care fund (Pflegekasse), which sits with the person’s statutory health insurer; for privately insured people it is the insurance company. A phone call, an email or a short letter is enough, and the form can follow. The date matters most: benefits are paid from the month the application arrives and never for earlier months (section 33(1) of Book XI of the Social Code). Waiting three months with an expected grade 3 costs ${EN.eur(verloren)} of care allowance. After the application the fund instructs the Medical Service, which usually assesses at home. The written decision is due no later than ${V.entscheidung_arbeitstage} working days after the application (section 18c); if the fund misses that deadline through its own fault it pays ${EN.eur(V.verzug_euro_woche)} for every week begun. For patients in hospital, rehabilitation, a hospice or palliative care, the assessment must take place within ${V.frist_krankenhaus_arbeitstage} working days. Benefits require two years of German long-term care insurance within the past ten.`,
    faqs: [
      { q: 'Can I apply for my parent from abroad?', a: 'Yes. The application can be made by phone, email or letter from anywhere, by the insured person or by someone they have authorised, such as an adult child with a power of attorney. The fund will ask for a signed form or proof of authority. The application takes effect on the day it reaches the fund, so call first and send documents afterwards.' },
      { q: 'What does the fund pay if the decision is late?', a: `For every week begun after ${V.entscheidung_arbeitstage} working days, ${EN.eur(V.verzug_euro_woche)} (section 18c(5) SGB XI), so ${EN.eur(verzug)} for five weeks. It does not apply if the fund is not responsible for the delay, for example missing documents or a postponement you asked for, or to care home residents who already have at least grade 2.` },
      { q: 'Should we apply while my father is still in hospital?', a: `Yes, if care after discharge needs to be organised. A shorter deadline applies: the assessment must happen by the ${V.frist_krankenhaus_arbeitstage}th working day after the application, often based on the hospital records (section 18a(5) SGB XI). The hospital social service helps with the application and with finding short-term care.` },
      { q: 'My mother recently moved to Germany. Can she get a care grade?', a: 'Only if she has been insured in the German long-term care insurance, or covered through a family member, for at least two of the past ten years (section 33(2) SGB XI). Periods in another EU country may be taken into account under EU coordination rules; ask the fund in writing, because that is assessed case by case.' },
      { q: 'Do we need a doctor’s certificate to apply?', a: 'No. A medical certificate is not required. Doctors’ letters, discharge summaries, the medication plan and test results do help the Medical Service understand which conditions cause the limitations. Have them ready at the visit or send copies beforehand so nothing is forgotten.' },
    ],
    body: (h) => `
<h2>The application in five steps</h2>
<ol>
<li><strong>Call the Pflegekasse.</strong> It sits with the person’s health insurer. Say that you are applying for long-term care insurance benefits (“Ich beantrage Leistungen der Pflegeversicherung”). Note the date and the name of the person you spoke to; payments start from this month.</li>
<li><strong>Return the form.</strong> The fund sends a form about insurance, living situation and the benefit wanted: allowance, services or both. The choice can be changed later.</li>
<li><strong>Keep a care diary.</strong> For two weeks write down every intervention with the time: getting up, washing, dressing, eating, drinking, medication, nights.</li>
<li><strong>Assessment.</strong> The Medical Service (Medizinischer Dienst) or an assessor appointed by the fund visits at home; for private policies the insurer’s own service. The main carer should be present. See ${h.a('begutachtung-medizinischer-dienst', 'the Medical Service assessment')}.</li>
<li><strong>Check the decision.</strong> The report comes with the decision unless you decline it (${h.src('sgb11_18c', 'section 18c(2) SGB XI')}). If the grade is wrong, you have one month to ${h.a('widerspruch-pflegegrad', 'object')}.</li>
</ol>

<h2>Deadlines the fund must meet</h2>
${h.table(['Situation', 'Deadline', 'Legal basis'], [
  ['Standard case', `decision within ${V.entscheidung_arbeitstage} working days`, 's. 18c(1)'],
  ['Hospital, inpatient rehab, hospice, home palliative care (with need)', `assessment by working day ${V.frist_krankenhaus_arbeitstage}`, 's. 18a(5)'],
  ['At home, carer leave announced to the employer', `assessment within ${V.frist_pflegezeit_arbeitstage} working days`, 's. 18a(6)'],
  ['Short-term care straight after hospital or rehab', `full assessment by working day ${V.frist_kurzzeit_nach_klinik_arbeitstage} of the stay`, 's. 18a(7)'],
  ['Deadline missed through the fund’s fault', `${h.eur(V.verzug_euro_woche)} per week begun`, 's. 18c(5)'],
], 'Deadlines for establishing care needs under SGB XI.', ['l', 'l', 'l'])}
<p>Deadlines run from the day the application arrives. If the fund requests essential documents, the clock stops until they arrive, so answering quickly shortens the process. In the fast-track cases the assessor first only establishes whether at least grade 2 applies; the full assessment follows (${h.src('sgb11_18a', 'section 18a(7) SGB XI')}).</p>

<h2>What helps on the first call</h2>
<p>On the phone the fund usually asks only for the insurance number, address and the benefit wanted. Still mention briefly why help is needed: a fall, a dementia diagnosis, an upcoming hospital discharge. Ask for care counselling under section 7a SGB XI, which the fund must offer, including at home, to clarify which benefits can start at once. Ask for the assessment report to be sent to you and say that you would like to be present at the visit. If you live abroad, give an email address and a phone number with country code, and ask whether the assessor can call you before or during the visit. If you already have a care service lined up, give its name so the combined benefit can be set up straight away.</p>

<h2>Why waiting costs money</h2>
<p>Many families wait until things “really don’t work any more”. That is expensive, because benefits start only in the month of application (${h.src('sgb11_33', 'section 33(1) SGB XI')}). Three months’ delay with an expected grade 3 cost ${h.eur(verloren)} of allowance, plus lapsed months of relief amount. If you are unsure whether it is enough for a grade, try the ${h.a('pflegegrad-rechner', 'care grade calculator')} first; grade 1 starts at ${h.num(P.nba.schwellen[0], 1)} points.</p>

<h2>Who is entitled</h2>
<p>The person must have been insured, or covered through a family member, in the German long-term care insurance for at least two of the ten years before applying; children qualify through a parent (section 33(2) SGB XI). Time in a German private policy counts after switching. The care need must be expected to last at least six months.</p>

<h2>Which benefit to tick on the form</h2>
<p>If relatives provide care, the ${h.a('pflegegeld', 'care allowance')} is the default. If a care service already visits, choose the ${h.a('kombinationsleistung', 'combined benefit')}; the service then bills the fund directly. The relief amount and care aids need no box on the form. Short-term and respite care are possible after the decision without a further prior application.</p>
<!--mini:gradGeld-->

<h2>When relatives live abroad</h2>
<p>With a power of attorney an adult child can phone or write from anywhere. For the home visit, though, someone who knows daily life should be there; if nobody is in Germany, at least a written care diary should be. It is worth timing a trip so that you are present for the assessment, since it shapes everything the fund pays for years.</p>
`,
  },
});
