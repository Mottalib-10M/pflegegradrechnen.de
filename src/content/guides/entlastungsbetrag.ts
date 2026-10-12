import { defineGuide } from '../../lib/guide-types';
import { entlastung, kombination } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: 2026 nur 5 Monate genutzt (655 €); Umwandlung bei Grad 3 parallel. */
const E = P.entlastungsbetrag.monat;
const rest = entlastung(12, E * 5);
const ab = entlastung(4, 0);
const umw3 = kombination(3, 0, 400);

export default defineGuide({
  id: 'entlastungsbetrag',
  group: 'zuhause',
  order: 40,
  mini: 'entlastungRest',
  related: ['umwandlungsanspruch', 'pflegegrad-1', 'tagespflege', 'kurzzeitpflege', 'verhinderungspflege', 'pflegesachleistung'],
  sources: ['sgb11_45b', 'sgb11_45a', 'sgb11_28a', 'bmgLeistungen'],
  de: {
    slug: 'entlastungsbetrag',
    nav: 'Entlastungsbetrag',
    card: `${DE.eur(E)} im Monat für alle Pflegegrade: wofür er gilt, wie abgerechnet wird und bis wann Reste nutzbar sind.`,
    title: `Entlastungsbetrag 2026: ${E} € im Monat, wofür und bis wann`,
    description: `Entlastungsbetrag 2026: ${E} € im Monat, ${E * 12} € im Jahr für alle Pflegegrade zu Hause. Wofür er zählt, wie die Erstattung läuft und bis 30. Juni Reste nutzen.`,
    h1: `Entlastungsbetrag: ${E} Euro im Monat richtig einsetzen`,
    intro: 'Das Geld, das am häufigsten liegen bleibt: Es fließt nur gegen Rechnung, und nur für bestimmte Hilfen. Was zählt, was nicht, und wie lange Reste halten.',
    resume: `Jede pflegebedürftige Person, die zu Hause lebt, hat Anspruch auf einen Entlastungsbetrag von bis zu ${DE.eur(E)} im Monat, also ${DE.eur(E * 12)} im Jahr, ab Pflegegrad 1 (§ 45b SGB XI). Ein Antrag ist nicht nötig, aber der Betrag wird nicht überwiesen: Die Pflegekasse erstattet Rechnungen für vier Arten von Hilfen, nämlich Tages- oder Nachtpflege, Kurzzeitpflege, Leistungen eines zugelassenen Pflegedienstes (ab Pflegegrad 2 nicht für die Körperpflege) und nach Landesrecht anerkannte Angebote zur Unterstützung im Alltag wie Betreuungsgruppen, Alltagsbegleiter oder Haushaltshilfen. Was in einem Jahr nicht verbraucht wird, kann bis zum 30. Juni des Folgejahres genutzt werden; danach verfällt es. Wer 2026 nur fünf Monate abgerechnet hat, hat noch ${DE.eur(rest.uebertrag)} bis Ende Juni 2027 offen. Der Entlastungsbetrag wird nicht auf Pflegegeld oder Sachleistung angerechnet und läuft unabhängig vom Umwandlungsanspruch.`,
    faqs: [
      { q: 'Kann ich mir den Entlastungsbetrag einfach auszahlen lassen?', a: 'Nein. Der Betrag ist zweckgebunden und dient nur der Erstattung von Aufwendungen für die vier im Gesetz genannten Leistungsarten (§ 45b Abs. 1 SGB XI). Ohne Rechnung eines Pflegedienstes, einer Tages- oder Kurzzeitpflege oder eines nach Landesrecht anerkannten Angebots fließt kein Geld. Wer nichts in Anspruch nimmt, verliert den Betrag nach dem 30. Juni des Folgejahres.' },
      { q: 'Darf eine Nachbarin über den Entlastungsbetrag bezahlt werden?', a: 'Nur wenn sie als Angebot zur Unterstützung im Alltag nach dem Recht Ihres Bundeslandes anerkannt ist. Die Länder regeln die Anerkennung selbst, meist mit einem Pflichtkurs und einer Registrierung; manche lassen Einzelpersonen aus der Nachbarschaft zu, andere nur Dienste und Vereine. Fragen Sie den Pflegestützpunkt oder die Pflegekasse nach den Regeln vor Ort, bevor die Hilfe anfängt.' },
      { q: 'Wofür darf der Entlastungsbetrag bei Pflegegrad 1 genutzt werden?', a: 'Bei Pflegegrad 1 gibt es die Einschränkung bei der Körperpflege nicht: Ein zugelassener Pflegedienst darf auch beim Waschen und Anziehen helfen und über den Entlastungsbetrag abrechnen. Weil Pflegegrad 1 weder Pflegegeld noch Sachleistung bekommt, ist der Betrag dort die wichtigste laufende Leistung, zusammen mit den Pflegehilfsmitteln.' },
      { q: 'Verfällt der Entlastungsbetrag, wenn meine Mutter ins Pflegeheim zieht?', a: 'Der Anspruch besteht nur bei häuslicher Pflege. Mit dem Umzug ins Heim entsteht kein neuer Monatsbetrag mehr. Rechnungen für Leistungen, die vorher zu Hause erbracht wurden, können Sie aber noch einreichen, auch angesammelte Reste aus dem Vorjahr bis zum 30. Juni. Reichen Sie offene Belege deshalb zeitnah nach dem Umzug ein.' },
      { q: 'Wie rechne ich den Entlastungsbetrag mit der Pflegekasse ab?', a: 'Viele Dienste rechnen direkt mit der Kasse ab, wenn Sie eine Abtretungserklärung unterschreiben. Sonst reichen Sie die Rechnung mit einem formlosen Erstattungsantrag ein. Auf dem Beleg muss stehen, für welche der vier Leistungsarten er ist (§ 45b Abs. 2). Sammeln lohnt sich nicht zu lange: Reste aus dem Vorjahr verfallen am 30. Juni.' },
      { q: 'Werden Essen und Fahrtkosten der Tagespflege über den Entlastungsbetrag bezahlt?', a: 'Ja, das ist einer der häufigsten Einsätze. Die Pflegekasse übernimmt in der Tagespflege nur den Pflegeanteil aus dem eigenen Tagespflegetopf; Verpflegung und Investitionskosten zahlt die Familie. Genau diese Eigenanteile darf der Entlastungsbetrag decken, ebenso Unterkunft und Verpflegung bei einer Kurzzeitpflege.' },
    ],
    body: (h) => `
<h2>Die vier Verwendungen nach § 45b</h2>
${h.table(['Leistung', 'Was der Entlastungsbetrag zahlt', 'Einschränkung'], [
  ['Tages- und Nachtpflege', 'Eigenanteile: Verpflegung, Investitionskosten, gegebenenfalls Fahrten', 'keine'],
  ['Kurzzeitpflege', 'Unterkunft, Verpflegung, Investitionskosten, Pflegeanteil über dem Jahresbetrag', 'keine'],
  ['Zugelassener Pflegedienst', 'Betreuung, Haushaltshilfe, Begleitung', 'ab Pflegegrad 2 nicht Körperpflege, Ernährung, Mobilität (Selbstversorgung)'],
  ['Angebote zur Unterstützung im Alltag', 'Betreuungsgruppen, Alltagsbegleiter, Haushaltshilfen, Familienentlastende Dienste', 'nur nach Landesrecht anerkannte Anbieter'],
], `Bis zu ${h.eur(E)} im Monat, ${h.eur(E * 12)} im Jahr (${h.src('sgb11_45b', '§ 45b SGB XI')}).`, ['l', 'l', 'l'])}
<p>Der Satz „nicht für die Selbstversorgung“ führt oft zu abgelehnten Rechnungen. Ab Pflegegrad 2 soll die Körperpflege über die Sachleistung laufen; der Entlastungsbetrag ist für alles gedacht, was die Familie entlastet, ohne Grundpflege zu sein: jemand, der zwei Stunden mit dem demenzkranken Vater spazieren geht, die Wohnung putzt oder ihn zur Betreuungsgruppe begleitet. Bei Pflegegrad 1 gilt diese Schranke nicht.</p>

<h2>Die Anerkennung nach Landesrecht</h2>
<p>Für die vierte Gruppe, die Angebote zur Unterstützung im Alltag, verweist das Bundesrecht auf die Länder (${h.src('sgb11_45a', '§ 45a SGB XI')}). Jedes Land hat eine eigene Verordnung, die festlegt, wer anerkannt wird, welche Schulung nötig ist und welche Preise verlangt werden dürfen. Deshalb kann dieselbe Hilfe in einem Land abrechenbar sein und im Nachbarland nicht. Das betrifft besonders die Nachbarschaftshilfe durch Einzelpersonen: Einige Länder erlauben sie nach einem kurzen Kurs, andere verlangen eine Organisation. Außerdem dürfen die Preise der Angebote die Preise vergleichbarer Sachleistungen nicht übersteigen (§ 45b Abs. 4).</p>

<h2>Reste aus dem Vorjahr</h2>
<p>Der Anspruch entsteht jeden Monat neu, kann aber über das Jahr verteilt genutzt werden. Wer im Frühjahr wenig braucht und im Herbst eine Haushaltshilfe für mehrere Wochen bucht, kann die angesammelten Beträge einsetzen. Was am 31. Dezember übrig ist, darf noch bis zum 30. Juni des Folgejahres abgerechnet werden. Wer erst im September einen Pflegegrad bekommen hat, sammelt für 2026 nur vier Monate, also ${h.eur(ab.anspruch)}.</p>
<!--mini:umwandlung-->

<h2>Entlastungsbetrag und Umwandlungsanspruch nebeneinander</h2>
<p>Ab Pflegegrad 2 gibt es einen zweiten Weg, Alltagshilfen zu bezahlen: Bis zu 40 Prozent der ungenutzten Sachleistung lassen sich dafür umwandeln (${h.a('umwandlungsanspruch', 'Umwandlungsanspruch')}). Beide Wege laufen unabhängig voneinander. Bei Pflegegrad 3 könnte eine Familie also ${h.eur(E)} über den Entlastungsbetrag und bis zu ${h.eur(P.sachleistung['3'] * P.umwandlung.anteil_max, 2)} über die Umwandlung abrechnen. Der Preis dafür: Die Umwandlung zählt als genutzte Sachleistung und mindert das Pflegegeld. Wer ${h.eur(400)} umwandelt, behält bei Grad 3 noch ${h.eur(umw3.pflegegeld, 2)} Pflegegeld. Der Entlastungsbetrag dagegen kostet kein Pflegegeld.</p>

<h2>Was der Entlastungsbetrag nicht ist</h2>
<p>Er ist kein Lohn für pflegende Angehörige und keine Pauschale für Einkäufe oder Taxifahrten ohne Beleg. Er bezahlt nicht die Rechnung eines privaten Haushaltsdienstes ohne Anerkennung, auch wenn dieser seriös arbeitet. Und er ersetzt nicht die ${h.a('verhinderungspflege', 'Verhinderungspflege')}, die einen eigenen Topf hat; die Erstattung aus dem Entlastungsbetrag ist aber auch dann möglich, wenn für dieselbe Hilfe Mittel der Verhinderungspflege eingesetzt werden.</p>

<h2>Drei Familien, drei Wege</h2>
<p><strong>Frau K., Pflegegrad 1, lebt allein.</strong> Sie hat kein Pflegegeld. Ein zugelassener Pflegedienst kommt zweimal im Monat für das Duschen und rechnet ${h.eur(E)} direkt mit der Kasse ab. Bei Pflegegrad 1 ist das erlaubt, weil die Einschränkung bei der Körperpflege erst ab Grad 2 gilt.</p>
<p><strong>Herr M., Pflegegrad 3, Demenz.</strong> Seine Tochter pflegt und bekommt das Pflegegeld. Zweimal pro Woche geht er in die Tagespflege; den Pflegeanteil zahlt die Kasse aus dem eigenen Topf der Tagespflege, Essen und Investitionskosten von rund ${h.eur(E)} im Monat deckt der Entlastungsbetrag. Das Pflegegeld bleibt voll erhalten.</p>
<p><strong>Ehepaar S., beide Pflegegrad 2.</strong> Jeder hat seinen eigenen Entlastungsbetrag. Eine anerkannte Haushaltshilfe kommt einmal pro Woche und stellt jedem die Hälfte in Rechnung. Zusammen stehen dem Haushalt ${h.eur(E * 2)} im Monat zur Verfügung.</p>

<h2>In drei Schritten nutzen</h2>
<ol>
<li>Beim Pflegestützpunkt oder der Pflegekasse eine Liste der im Land anerkannten Angebote in der Nähe anfordern.</li>
<li>Mit dem Anbieter klären, ob er direkt mit der Kasse abrechnet (Abtretung) oder ob Sie in Vorleistung gehen.</li>
<li>Belege sammeln, die die Leistungsart nennen, und Reste aus dem Vorjahr vor dem 30. Juni einreichen. Ein kurzer Kalendereintrag im Mai erinnert daran, bevor der Rest des Vorjahres verfällt.</li>
</ol>
`,
  },
  en: {
    slug: 'relief-amount',
    nav: 'Relief amount',
    card: `${EN.eur(E)} a month at every care grade: what it covers, how refunds work and how long unused money lasts.`,
    title: `Entlastungsbetrag 2026: €${E} Relief Amount, Uses, Deadline`,
    description: `German relief amount (Entlastungsbetrag) 2026: ${EN.eur(E)} a month, ${EN.eur(E * 12)} a year at every care grade at home: what it pays for, refunds, leftovers until 30 June.`,
    h1: `The ${E}-euro relief amount: how to use it in Germany`,
    intro: 'The budget most often left unused: it is only paid against receipts, and only for certain kinds of help. What counts, what does not, and how long leftovers last.',
    resume: `Everyone with a German care grade who lives at home, from grade 1 upwards, is entitled to a relief amount (Entlastungsbetrag) of up to ${EN.eur(E)} a month, ${EN.eur(E * 12)} a year, under section 45b of Book XI of the Social Code. No application is needed, but the money is never simply transferred: the long-term care fund refunds bills for four kinds of help, namely day or night care, short-term care, services by a registered home care provider (from grade 2 not for personal care) and everyday support services recognised under the law of the federal state, such as dementia groups, companions or household help. Money not used in a calendar year can still be claimed until 30 June of the following year and then lapses. A household that claimed for only five months in 2026 still has ${EN.eur(rest.uebertrag)} available until the end of June 2027. The relief amount does not reduce the care allowance or the services budget and runs independently of the conversion claim.`,
    faqs: [
      { q: 'Can the relief amount be paid out to us as cash?', a: 'No. It is earmarked and only reimburses costs for the four types of service listed in section 45b(1) SGB XI. Without a bill from a care service, a day or short-term care facility, or a support service recognised in the federal state, no money is paid. Whatever stays unused lapses after 30 June of the following year.' },
      { q: 'We found a helper through an expat group. Can the relief amount pay her?', a: 'Only if she is recognised as an everyday support service under the rules of the federal state where your relative lives. Each state sets its own conditions, often a short training course and registration; some accept individual neighbours, others only agencies or associations. Ask the local Pflegestützpunkt before she starts, otherwise the fund will reject the bills.' },
      { q: 'What changes for the relief amount at care grade 1?', a: 'At grade 1 there is no exclusion for personal care: a registered care service may help with washing and dressing and bill it to the relief amount. Because grade 1 has neither a care allowance nor a services budget, the relief amount is the main regular benefit at that grade, together with consumable care aids.' },
      { q: 'Can the relief amount pay for care while I fly home for a few weeks?', a: 'Partly. It can pay a recognised everyday helper or a registered care service for supervision and household tasks, and the own share of short-term care. For a full replacement carer use the joint annual budget for respite and short-term care, which is much larger; the relief amount can top it up where that budget runs out.' },
      { q: 'How do we claim the relief amount from the Pflegekasse?', a: 'Many providers bill the fund directly once you sign an assignment form (Abtretungserklärung). Otherwise send the invoice with a short reimbursement request. The receipt must state which of the four service types it covers (section 45b(2)). Do not collect bills for too long: last year’s balance lapses on 30 June.' },
    ],
    body: (h) => `
<h2>The four permitted uses</h2>
${h.table(['Service', 'What the relief amount pays', 'Restriction'], [
  ['Day and night care', 'own share: meals, investment costs, transport where charged', 'none'],
  ['Short-term care', 'board, lodging, investment costs, care costs above the annual budget', 'none'],
  ['Registered home care service', 'supervision, household help, accompaniment', 'from grade 2 not personal care, feeding or mobility'],
  ['Recognised everyday support services', 'dementia groups, companions, household help, family relief services', 'only providers recognised under state law'],
], `Up to ${h.eur(E)} a month, ${h.eur(E * 12)} a year (${h.src('sgb11_45b', 'section 45b SGB XI')}).`, ['l', 'l', 'l'])}
<p>The rule excluding personal care from grade 2 causes many rejected claims. At those grades washing and dressing are meant to be paid from the services budget; the relief amount covers help that eases the family’s load without being basic care: someone who takes your father with dementia for a two-hour walk, cleans the flat or brings him to a group. At grade 1 the restriction does not apply.</p>

<h2>Recognition depends on the state</h2>
<p>For everyday support services federal law hands the details to the sixteen states (${h.src('sgb11_45a', 'section 45a SGB XI')}). Each state has its own regulation on who is recognised, what training is required and what prices may be charged, so the same help can be refundable in one state and not in the next. This matters most for neighbours and individual helpers. Prices may not exceed those of comparable professional services (section 45b(4)).</p>
<p>For adult children who live abroad this is often the key practical question. A reliable person on the spot is worth more than any payment, but before promising that the care fund will pay, check the state’s list of recognised providers or ask whether the helper can register.</p>

<h2>Carrying money over</h2>
<p>The entitlement accrues monthly but can be used across the year: little help in spring, several weeks of household help in autumn. What is left on 31 December can still be claimed until 30 June of the next year. Someone who was awarded a grade in September accrues only four months for 2026, ${h.eur(ab.anspruch)}.</p>
<!--mini:umwandlung-->

<h2>Relief amount and conversion claim side by side</h2>
<p>From grade 2 there is a second way to pay for everyday help: up to 40 percent of the unused services budget can be converted (${h.a('umwandlungsanspruch', 'conversion claim')}). Both run independently. At grade 3 a family could claim ${h.eur(E)} through the relief amount and up to ${h.eur(P.sachleistung['3'] * P.umwandlung.anteil_max, 2)} through conversion. The difference is the cost: conversion counts as used services and reduces the allowance, so converting ${h.eur(400)} at grade 3 leaves ${h.eur(umw3.pflegegeld, 2)} of allowance, whereas the relief amount costs no allowance at all.</p>

<h2>What it is not</h2>
<p>It is not a wage for family carers and not a flat rate for shopping or taxis without receipts. It does not pay a private cleaning firm that lacks state recognition, however reliable. It is not the same as ${h.a('verhinderungspflege', 'respite care')}, which has its own budget, although relief-amount refunds remain possible when respite money is used for the same help.</p>

<h2>Three households, three ways</h2>
<p><strong>A widow at grade 1 living alone.</strong> She has no allowance. A registered care service comes twice a month to help her shower and bills ${h.eur(E)} directly to the fund. That is allowed at grade 1 because the personal-care exclusion only starts at grade 2.</p>
<p><strong>A father at grade 3 with dementia.</strong> His daughter cares for him and receives the allowance on his behalf. He goes to a day centre twice a week; the fund pays the care part from the separate day-care budget, and the relief amount covers meals and investment costs of around ${h.eur(E)} a month. The allowance stays untouched.</p>
<p><strong>A couple, both at grade 2.</strong> Each has their own relief amount. A recognised household helper comes weekly and bills each of them half, so the household can use ${h.eur(E * 2)} a month between them.</p>

<h2>Three steps</h2>
<ol>
<li>Ask the Pflegestützpunkt or the fund for the list of recognised providers near your relative.</li>
<li>Agree with the provider whether it bills the fund directly or you pay first.</li>
<li>Keep receipts that name the service type and submit last year’s balance before 30 June.</li>
</ol>
`,
  },
});
