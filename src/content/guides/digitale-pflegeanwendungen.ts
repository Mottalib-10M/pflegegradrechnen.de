import { defineGuide } from '../../lib/guide-types';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele: Erstattung nach § 40b Abs. 1 bei angenommenen Monatspreisen (gleiche Rechnung wie der Mini-Rechner). */
const D = P.dipa, BW = P.dipa_bewilligung, X = P.dipa_erweiterung;
const erstattung = (app: number, hilfe: number) => {
  const a = Math.min(app, D.anwendung), u = Math.min(hilfe, D.unterstuetzung);
  return { app, hilfe, a, u, kasse: a + u, selbst: app - a + hilfe - u };
};
/** Annahmen: Monatspreise von Anwendung und Unterstützung, keine Marktdaten. */
const FAELLE = [erstattung(30, 0), erstattung(40, 30), erstattung(55, 20), erstattung(40, 45), erstattung(70, 50)];
const teuer = FAELLE[2];
const max = D.anwendung + D.unterstuetzung;
const datum = (iso: string, l: 'de' | 'en') => new Date(`${iso}T12:00:00Z`).toLocaleDateString(l === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const AD = datum(X.angehoerigen_apps_ab, 'de'), AE = datum(X.angehoerigen_apps_ab, 'en');

export default defineGuide({
  id: 'digitale-pflegeanwendungen',
  group: 'zuhause',
  order: 130,
  mini: 'dipa',
  related: ['pflegehilfsmittel', 'pflegegrad-1', 'pflegesachleistung', 'pflegegrad-demenz', 'entlastungsbetrag', 'beratungseinsatz'],
  sources: ['sgb11_40a', 'sgb11_40b', 'sgb11_39a', 'bmgDipa', 'bfarmDipa', 'sgb11_28a'],
  de: {
    slug: 'digitale-pflegeanwendungen',
    nav: 'Digitale Pflegeanwendungen',
    card: `Bis ${DE.eur(D.anwendung)} im Monat für Apps aus dem DiPA-Verzeichnis und ${DE.eur(D.unterstuetzung)} für die Hilfe eines Pflegedienstes dabei, ab Pflegegrad 1.`,
    title: `Digitale Pflegeanwendungen 2026: DiPA, ${DE.eur(D.anwendung)} plus ${DE.eur(D.unterstuetzung)}`,
    description: `Digitale Pflegeanwendungen 2026: bis ${DE.eur(D.anwendung)} im Monat für gelistete Apps, ${DE.eur(D.unterstuetzung)} für Hilfe des Pflegedienstes, ab Pflegegrad 1. Antrag, Probezeit, Angehörigen-Apps.`,
    h1: 'Digitale Pflegeanwendungen: Apps, die die Pflegekasse bezahlt',
    intro: 'Übungen gegen das Vergessen, Training für sicheres Gehen, Hilfe für die pflegende Tochter: Welche Anwendungen erstattet werden und was die Familie selbst zahlt.',
    resume: `Digitale Pflegeanwendungen, kurz DiPA, sind Apps, Webanwendungen oder Programme, die Pflegebedürftige allein oder zusammen mit Angehörigen oder dem Pflegedienst nutzen, um Einschränkungen der Selbständigkeit zu mindern oder einer Verschlimmerung entgegenzuwirken (§ 40a SGB XI). Seit dem ${AD} zählen auch Anwendungen, die pflegende Angehörige unterstützen und die Versorgung zu Hause stabilisieren oder sie entlasten. Bezahlt werden nur Anwendungen aus dem Verzeichnis, das das Bundesinstitut für Arzneimittel und Medizinprodukte führt. Bewilligt die Pflegekasse die Versorgung, erstattet sie bis zu ${DE.eur(D.anwendung)} im Monat für die Anwendungen und bis zu ${DE.eur(D.unterstuetzung)} im Monat für ergänzende Unterstützung durch einen zugelassenen ambulanten Pflegedienst, zusammen also höchstens ${DE.eur(max)} (§ 40b). Mehrkosten trägt die Familie: Kostet eine App ${DE.eur(teuer.app)}, bleiben ${DE.eur(teuer.app - teuer.a)} selbst zu zahlen. Der Anspruch besteht ab Pflegegrad 1. Die erste Bewilligung ist auf höchstens ${BW.befristung_max_monate} Monate befristet; danach prüft die Kasse, ob die Anwendung genutzt wird und wirkt, und bewilligt dann unbefristet, ohne neuen Antrag.`,
    faqs: [
      { q: 'Welche Apps bezahlt die Pflegekasse als digitale Pflegeanwendung?', a: 'Nur Anwendungen, die das Bundesinstitut für Arzneimittel und Medizinprodukte in das Verzeichnis für digitale Pflegeanwendungen aufgenommen hat (§ 40a Abs. 2 SGB XI). Eine App aus dem gewöhnlichen App-Store, die nicht gelistet ist, erstattet die Kasse nicht, auch wenn sie nützlich ist. Neben Smartphone-Apps können auch Webanwendungen im Browser oder Programme für den Computer gelistet sein.' },
      { q: 'Gibt es digitale Pflegeanwendungen auch bei Pflegegrad 1?', a: `Ja. Das Gesetz zählt die Versorgung mit digitalen Pflegeanwendungen und die ergänzende Unterstützung dabei ausdrücklich zu den Leistungen bei Pflegegrad 1 (§ 28a SGB XI). Die Beträge sind dieselben wie bei den höheren Graden: bis ${DE.eur(D.anwendung)} für die Anwendung und bis ${DE.eur(D.unterstuetzung)} für die Hilfe eines Pflegedienstes im Monat. Gerade früh eingesetzt kann ein Training die Selbständigkeit länger erhalten.` },
      { q: 'Wie lange gilt die Bewilligung einer digitalen Pflegeanwendung?', a: `Die erste Bewilligung ist befristet, höchstens auf ${BW.befristung_max_monate} Monate. Innerhalb dieser Zeit prüft die Kasse, ob die Anwendung tatsächlich genutzt wird und ihren Zweck in Ihrer Pflegesituation erreicht; dazu darf sie Sie befragen. Fällt die Prüfung positiv aus, bewilligt sie unbefristet. Einen neuen Antrag müssen Sie dafür nicht stellen (§ 40a Abs. 2 SGB XI).` },
      { q: 'Was zahlt die Kasse, wenn die App mehr kostet als der Höchstbetrag?', a: `Bis zu ${DE.eur(D.anwendung)} im Monat für alle bewilligten Anwendungen zusammen; den Rest trägt die pflegebedürftige Person. Mehrkosten entstehen auch, wenn Sie eine Version mit Funktionen wählen, die über die im Verzeichnis aufgenommene Anwendung hinausgehen. Die Kasse muss Sie schriftlich oder elektronisch und barrierefrei darüber informieren, welche Kosten Sie selbst tragen (§ 40b Abs. 2 SGB XI).` },
      { q: 'Dürfen pflegende Angehörige eine digitale Pflegeanwendung für sich selbst nutzen?', a: `Seit dem ${AD} ja, in einem bestimmten Rahmen. Auch Anwendungen, die pflegende Angehörige oder andere ehrenamtlich Pflegende unterstützen, gelten als digitale Pflegeanwendungen, wenn sie die häusliche Versorgung stabilisieren oder die Pflegenden entlasten (§ 40a Abs. 1a SGB XI). Den Anspruch hat weiter die pflegebedürftige Person; die Anwendung muss im Verzeichnis stehen und von der Kasse bewilligt sein.` },
      { q: 'Wofür gibt es die ergänzende Unterstützung durch den Pflegedienst?', a: `Für die Hilfe eines zugelassenen ambulanten Pflegedienstes bei der Nutzung der Anwendung, etwa beim Einrichten oder wenn eine Pflegekraft Übungen begleitet (§ 39a SGB XI). Laut Bundesgesundheitsministerium wird sie erbracht, wenn die pflegebedürftige Person das wünscht. Die Kasse zahlt dafür bis ${DE.eur(D.unterstuetzung)} im Monat, zusätzlich zur Erstattung für die Anwendung; Mehrkosten trägt die Familie.` },
    ],
    body: (h) => `
<h2>Was eine digitale Pflegeanwendung ist</h2>
<p>Das Gesetz beschreibt sie als Anwendungen, die wesentlich auf digitalen Technologien beruhen und von Pflegebedürftigen selbst oder im Zusammenspiel mit Angehörigen, Ehrenamtlichen oder einem zugelassenen Pflegedienst genutzt werden, um Beeinträchtigungen der Selbständigkeit oder der Fähigkeiten zu mindern oder einer Verschlimmerung der Pflegebedürftigkeit entgegenzuwirken (${h.src('sgb11_40a', '§ 40a SGB XI')}). Das Bundesgesundheitsministerium nennt Pflege-Apps, browserbasierte Webanwendungen und Software für klassische Computer und erwähnt Anwendungen zur Erhaltung der Mobilität oder bei Demenz (${h.src('bmgDipa', 'BMG, Digitale Pflegeanwendungen')}).</p>
${h.table(['Zählt als DiPA', 'Zählt nicht als DiPA'], [
  ['Anwendungen, die Einschränkungen der Selbständigkeit mindern', 'Anwendungen für den allgemeinen Lebensbedarf oder die allgemeine Lebensführung'],
  ['Anwendungen gegen eine Verschlimmerung der Pflegebedürftigkeit', 'Software zur Arbeitsorganisation von Pflegediensten'],
  [`seit ${h.date(X.angehoerigen_apps_ab)}: Anwendungen, die pflegende Angehörige unterstützen und die Versorgung stabilisieren oder sie entlasten`, 'reine Wissensvermittlung, Information oder Kommunikation'],
  ['Medizinprodukte nur mit niedriger Risikoklasse', 'Anwendungen zur Beantragung oder Verwaltung von Leistungen oder reine Beratung zu Sozialleistungen'],
], 'Abgrenzung nach § 40a Abs. 1, 1a und 1b SGB XI.', ['l', 'l'])}
<p>Die rechte Spalte erklärt viele Ablehnungen. Eine Kalender-App für Pflegetermine, ein Messenger für die Familie oder ein Ratgeber über Leistungen der Pflegeversicherung sind nützlich, aber keine digitale Pflegeanwendung. Erstattet wird nur, was gezielt an der Selbständigkeit, am Verlauf der Pflegebedürftigkeit oder seit Juli 2026 an der Entlastung der Pflegenden ansetzt.</p>

<h2>Das Verzeichnis beim BfArM</h2>
<p>Der Anspruch umfasst nur Anwendungen, die das Bundesinstitut für Arzneimittel und Medizinprodukte in das Verzeichnis für digitale Pflegeanwendungen aufgenommen hat; er gilt ab dem Zeitpunkt, den die Vertragsparteien für die Vergütung vereinbart haben (§ 40a Abs. 2). Das Institut prüft die Aufnahme auf Antrag der Hersteller, bietet ihnen ein elektronisches Antragsportal und stellt einen Leitfaden zum Verfahren bereit, aktuell mit Stand vom 15. Juli 2026 (${h.src('bfarmDipa', 'BfArM, DiPA')}). Für Familien heißt das: Vor dem Antrag im Verzeichnis nachsehen, ob die gewünschte Anwendung dort steht, und den genauen Namen in den Antrag schreiben.</p>

<h2>Was die Kasse zahlt</h2>
${h.table(['Preis Anwendung', 'Preis Unterstützung', 'Kasse für Anwendung', 'Kasse für Unterstützung', 'selbst zu zahlen'],
  FAELLE.map((f) => [h.eur(f.app), h.eur(f.hilfe), h.eur(f.a), h.eur(f.u), h.eur(f.selbst)]),
  `Erstattung nach ${h.src('sgb11_40b', '§ 40b Abs. 1 SGB XI')}: Anwendungen zusammen bis ${h.eur(D.anwendung)}, Unterstützung bis ${h.eur(D.unterstuetzung)} im Monat. Preise sind Rechenannahmen.`, ['r', 'r', 'r', 'r', 'r'])}
<p>Beide Grenzen gelten „insgesamt“, also für alle bewilligten Anwendungen zusammen. Wer zwei Anwendungen nutzt, teilt sich die ${h.eur(D.anwendung)}. Die beiden Töpfe lassen sich nicht verschieben: Ein ungenutzter Betrag bei der Unterstützung erhöht nicht die Erstattung für die App. Die Kasse muss Sie barrierefrei informieren, welche Kosten Sie selbst tragen, für die Anwendung genauso wie für die Unterstützung (§ 40b Abs. 2).</p>
<!--mini:hilfsmittel-->

<h2>Antrag, Probezeit, Dauerbewilligung</h2>
${h.table(['Schritt', 'Was geschieht', 'Grundlage'], [
  ['Antrag', 'die pflegebedürftige Person beantragt die Versorgung, die Kasse entscheidet über die Notwendigkeit', '§ 40a Abs. 2 Satz 2'],
  ['erste Bewilligung', `befristet, höchstens ${BW.befristung_max_monate} Monate`, '§ 40a Abs. 2 Satz 3 und 4'],
  ['Prüfung', 'wird die Anwendung genutzt und erreicht sie ihren Zweck? Die Kasse darf die Person befragen', '§ 40a Abs. 2 Satz 5 und 6'],
  ['Dauerbewilligung', 'unbefristet, ohne neuen Antrag', '§ 40a Abs. 2 Satz 7'],
  ['Bereitstellung', 'der Hersteller stellt die Anwendung barrierefrei per Download, Datenträger oder Plattform bereit', '§ 40a Abs. 4'],
], 'Ablauf nach § 40a SGB XI.', ['l', 'l', 'l'])}
<p>Die Probezeit ist ernst gemeint. Wer die App nach der Bewilligung kaum öffnet, riskiert, dass die Kasse keine Dauerbewilligung erteilt. Es lohnt sich deshalb, den Einstieg zu planen: Wer richtet die Anwendung ein, wer übt in den ersten Wochen mit, und wann wird geprüft, ob sie hilft? Genau dafür ist die Unterstützung durch einen Pflegedienst gedacht.</p>

<h2>Die Unterstützung durch einen Pflegedienst</h2>
<p>Bei der Nutzung einer bewilligten Anwendung besteht Anspruch auf ergänzende Unterstützungsleistungen durch zugelassene ambulante Pflegeeinrichtungen (${h.src('sgb11_39a', '§ 39a SGB XI')}), bis ${h.eur(D.unterstuetzung)} im Monat. Das Ministerium betont, dass diese Hilfe auf Wunsch der pflegebedürftigen Person erbracht wird. Sinnvoll ist sie vor allem, wenn niemand aus der Familie technisch helfen kann oder die Übungen fachlich begleitet werden sollen. Die Unterstützung ist kein Ersatz für die ${h.a('pflegesachleistung', 'Pflegesachleistung')} und wird auch nicht auf sie angerechnet: Andere Ansprüche des Pflegeversicherungsrechts bleiben unberührt (§ 40a Abs. 3).</p>

<h2>Neu seit Juli 2026: Anwendungen für Angehörige</h2>
<p>Seit dem ${h.date(X.angehoerigen_apps_ab)} zählen auch Anwendungen, die pflegende Angehörige oder andere ehrenamtlich Pflegende unterstützen und entweder die häusliche Versorgung stabilisieren oder die Pflegenden entlasten (§ 40a Abs. 1a). Für einen Sohn, der aus einer anderen Stadt oder aus dem Ausland mitpflegt, ist das eine wichtige Öffnung: Das Gesetz spricht ausdrücklich von der Nutzung im Zusammenspiel mit Angehörigen. Ob eine bestimmte Anwendung auch auf dem Telefon eines Angehörigen im Ausland läuft, entscheidet allerdings der Hersteller; fragen Sie vor dem Antrag nach.</p>

<h2>Abgrenzung zu anderen Leistungen</h2>
<p>Der Anspruch besteht nur, soweit die Anwendung nicht wegen Krankheit oder Behinderung von der Krankenversicherung oder einem anderen Träger zu leisten ist. Digitale Anwendungen, die eine Krankheit behandeln, können deshalb Sache der Krankenkasse sein. Geräte wie ein Hausnotruf laufen nicht über § 40a, sondern als technische ${h.a('pflegehilfsmittel', 'Pflegehilfsmittel')}. Bei ${h.a('pflegegrad-1', 'Pflegegrad 1')} gehört die digitale Pflegeanwendung ausdrücklich zu den Leistungen (${h.src('sgb11_28a', '§ 28a SGB XI')}), was sie dort besonders wertvoll macht.</p>

<h2>Checkliste</h2>
<ol>
<li>Im Verzeichnis des BfArM prüfen, ob die Anwendung gelistet ist, und Namen sowie Monatspreis notieren.</li>
<li>Den Antrag bei der Pflegekasse stellen und um die schriftliche Information über den Eigenanteil bitten.</li>
<li>Klären, ob ein Pflegedienst die Einrichtung und die ersten Übungen begleitet.</li>
<li>Die Anwendung in den ersten ${BW.befristung_max_monate} Monaten regelmäßig nutzen, damit die Prüfung für die Dauerbewilligung gelingt.</li>
</ol>
`,
  },
  en: {
    slug: 'digital-care-apps',
    nav: 'Digital care apps',
    card: `Up to ${EN.eur(D.anwendung)} a month for apps in the official DiPA directory and ${EN.eur(D.unterstuetzung)} for a care service’s help using them, from care grade 1.`,
    title: `Digitale Pflegeanwendungen 2026: DiPA Care Apps, ${EN.eur(D.anwendung)} a Month`,
    description: `German digital care apps (DiPA) 2026: up to ${EN.eur(D.anwendung)} a month for listed apps and ${EN.eur(D.unterstuetzung)} for help from a care service, from grade 1. Application, trial, carer apps.`,
    h1: 'Digital care apps in Germany: applications the care fund pays for',
    intro: 'Memory exercises, training for safe walking, help for the daughter who provides care: which applications are refunded and what the family pays itself.',
    resume: `Digital care applications (digitale Pflegeanwendungen, DiPA) are apps, web applications or programs that people needing care use alone or together with relatives or a care service to reduce limitations on their independence or slow a worsening of their condition (section 40a of Book XI of the German Social Code, SGB XI). Since ${AE}, applications that support family carers and stabilise care at home or relieve the carers also count. Only applications in the directory kept by the Federal Institute for Drugs and Medical Devices (BfArM) are paid for. Once the care fund approves them, it refunds up to ${EN.eur(D.anwendung)} a month for the applications and up to ${EN.eur(D.unterstuetzung)} a month for additional support from a registered home care service, so at most ${EN.eur(max)} together (section 40b). The family pays any extra: if an app costs ${EN.eur(teuer.app)}, ${EN.eur(teuer.app - teuer.a)} remains to be paid. The entitlement starts at care grade 1. The first approval is limited to at most ${BW.befristung_max_monate} months; the fund then checks whether the application is used and works, and approves it indefinitely without a new application.`,
    faqs: [
      { q: 'Which apps does the German care fund pay for as digital care apps?', a: 'Only applications that the Federal Institute for Drugs and Medical Devices has added to the directory of digital care applications (section 40a(2) SGB XI). An unlisted app from an ordinary app store is not refunded, however useful it is. Besides smartphone apps, browser-based web applications and programs for desktop computers can also be listed, which helps if a parent prefers a large screen.' },
      { q: 'Are digital care apps available at care grade 1?', a: `Yes. The law lists digital care applications and the additional support for using them expressly among the grade 1 benefits (section 28a SGB XI). The amounts are the same as at higher grades: up to ${EN.eur(D.anwendung)} for the application and up to ${EN.eur(D.unterstuetzung)} a month for help from a care service. Used early, a training app can help preserve independence for longer.` },
      { q: 'How long does approval of a digital care app last?', a: `The first approval is time-limited, to at most ${BW.befristung_max_monate} months. Within that period the fund checks whether the application is actually used and achieves its purpose in your care situation, and may ask you about it. If the check is positive it grants approval without a time limit. You do not need to apply again (section 40a(2) SGB XI).` },
      { q: 'What does the fund pay if the app costs more than the cap?', a: `Up to ${EN.eur(D.anwendung)} a month for all approved applications together; the person needing care pays the rest. Extra costs also arise if you choose a version with functions beyond the application listed in the directory. The fund must tell you in accessible written or electronic form which costs you bear yourself (section 40b(2) SGB XI), so ask for this before you start.` },
      { q: 'May family carers use a digital care app for themselves?', a: `Since ${AE}, yes, within a defined framework. Applications that support family carers or other volunteer carers also count as digital care applications if they stabilise care at home or relieve the carers (section 40a(1a) SGB XI). The entitlement still belongs to the person needing care; the application must be in the directory and approved by the fund.` },
      { q: 'What is the additional support from a care service for?', a: `For help from a registered home care service in using the application, for example setting it up or a nurse accompanying exercises (section 39a SGB XI). According to the Federal Ministry of Health it is provided if the person needing care wishes. The fund pays up to ${EN.eur(D.unterstuetzung)} a month for it, on top of the refund for the application; the family pays any extra.` },
    ],
    body: (h) => `
<h2>What a digital care app is</h2>
<p>The law describes these as applications based essentially on digital technology, used by people needing care themselves or together with relatives, volunteers or a registered care service, to reduce impairments of independence or abilities or to counteract a worsening of the need for care (${h.src('sgb11_40a', 'section 40a SGB XI')}). The Federal Ministry of Health names care apps, browser-based web applications and software for ordinary computers, and mentions applications for maintaining mobility or for dementia (${h.src('bmgDipa', 'BMG, digital care applications')}).</p>
${h.table(['Counts as a DiPA', 'Does not count'], [
  ['applications that reduce limitations on independence', 'applications for general living needs or general lifestyle'],
  ['applications that counteract a worsening of the need for care', 'software for organising the work of care services'],
  [`since ${h.date(X.angehoerigen_apps_ab)}: applications that support family carers and stabilise care at home or relieve them`, 'pure knowledge transfer, information or communication'],
  ['medical devices only in a low risk class', 'applications for applying for or managing benefits, or pure advice on social benefits'],
], 'Boundaries under section 40a(1), (1a) and (1b) SGB XI.', ['l', 'l'])}
<p>The right-hand column explains many refusals. A calendar app for care appointments, a family messenger or a guide to care insurance benefits may be useful, but none is a digital care application. Only applications aimed specifically at independence, at the course of the need for care or, since July 2026, at relieving carers are refunded.</p>

<h2>The BfArM directory</h2>
<p>The entitlement covers only applications that the Federal Institute for Drugs and Medical Devices has included in the directory of digital care applications; it takes effect from the date the parties agreed for the price arrangement (section 40a(2)). The institute examines inclusion at the manufacturer’s request, runs an electronic application portal for manufacturers and provides a procedural guide, currently dated 15 July 2026 (${h.src('bfarmDipa', 'BfArM, DiPA')}). For families this means: check the directory before applying to see whether the application you want is listed, and give its exact name in the application.</p>

<h2>What the fund pays</h2>
${h.table(['App price', 'Support price', 'Fund pays for app', 'Fund pays for support', 'You pay'],
  FAELLE.map((f) => [h.eur(f.app), h.eur(f.hilfe), h.eur(f.a), h.eur(f.u), h.eur(f.selbst)]),
  `Refund under ${h.src('sgb11_40b', 'section 40b(1) SGB XI')}: applications together up to ${h.eur(D.anwendung)}, support up to ${h.eur(D.unterstuetzung)} a month. Prices are assumptions for the calculation.`, ['r', 'r', 'r', 'r', 'r'])}
<p>Both limits apply “in total”, so to all approved applications together. Anyone using two applications shares the ${h.eur(D.anwendung)}. The two budgets cannot be swapped: an unused support amount does not raise the refund for the app. The fund must tell you in accessible form which costs you bear yourself, for the application as well as for the support (section 40b(2)).</p>
<!--mini:hilfsmittel-->

<h2>Application, trial period, permanent approval</h2>
${h.table(['Step', 'What happens', 'Basis'], [
  ['application', 'the person needing care applies; the fund decides whether the app is necessary', 'section 40a(2), 2nd sentence'],
  ['first approval', `time-limited, at most ${BW.befristung_max_monate} months`, 'section 40a(2), 3rd and 4th sentences'],
  ['review', 'is the application used and does it achieve its purpose? The fund may ask the person', 'section 40a(2), 5th and 6th sentences'],
  ['permanent approval', 'no time limit, no new application', 'section 40a(2), 7th sentence'],
  ['provision', 'the manufacturer supplies it accessibly by download, data carrier or platform', 'section 40a(4)'],
], 'Procedure under section 40a SGB XI.', ['l', 'l', 'l'])}
<p>The trial period matters. If the app is hardly opened after approval, the fund may not grant permanent approval. So plan the start: who sets the application up, who practises with your parent in the first weeks, and when do you check whether it helps? That is exactly what support from a care service is meant for, particularly when the family lives far away.</p>

<h2>Support from a care service</h2>
<p>When using an approved application, there is an entitlement to additional support from registered home care services (${h.src('sgb11_39a', 'section 39a SGB XI')}), up to ${h.eur(D.unterstuetzung)} a month. The ministry stresses that this help is provided at the wish of the person needing care. It is most useful when nobody in the family can help with the technology or when exercises should be guided by a professional. It does not replace the ${h.a('pflegesachleistung', 'services budget')} and is not set against it: other entitlements under care insurance law remain unaffected (section 40a(3)).</p>

<h2>New since July 2026: applications for relatives</h2>
<p>Since ${h.date(X.angehoerigen_apps_ab)}, applications that support family carers or other volunteer carers and either stabilise care at home or relieve the carers also count (section 40a(1a)). For a son who shares the care from another city or from abroad, this is an important opening: the law speaks expressly of use together with relatives. Whether a particular application also runs on a relative’s phone abroad is up to the manufacturer, so ask before you apply.</p>

<h2>How it differs from other benefits</h2>
<p>The entitlement exists only where health insurance or another body is not responsible because of illness or disability. Digital applications that treat an illness may therefore be a matter for health insurance. Devices such as a personal alarm do not fall under section 40a but count as technical ${h.a('pflegehilfsmittel', 'care aids')}. At ${h.a('pflegegrad-1', 'care grade 1')}, digital care applications are listed expressly among the benefits (${h.src('sgb11_28a', 'section 28a SGB XI')}), which makes them particularly valuable there.</p>

<h2>Checklist</h2>
<ol>
<li>Check the BfArM directory to see whether the application is listed, and note its name and monthly price.</li>
<li>Apply to the care fund and ask for the written information on your own share of the cost.</li>
<li>Clarify whether a care service will help with setting up and the first exercises.</li>
<li>Use the application regularly during the first ${BW.befristung_max_monate} months so that the review for permanent approval succeeds.</li>
</ol>
`,
  },
});
