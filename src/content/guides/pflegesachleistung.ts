import { defineGuide } from '../../lib/guide-types';
import { kombination } from '../../lib/engine/leistungen';
import { rentenpunkte } from '../../lib/engine/angehoerige';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Grad 3 mit Dienst für 900 €; eine Rechnung von 1.200 € in jedem Grad; Rente bei Sachleistung und Geld. */
const SL = P.sachleistung, PG = P.pflegegeld;
const G = ['2', '3', '4', '5'] as const;
const k900 = kombination(3, 900);
const r1200 = (g: 2 | 3 | 4 | 5) => kombination(g, 1200);
const k2voll = kombination(2, 1200);
const rSach = rentenpunkte(3, 'sach'), rGeld = rentenpunkte(3, 'geld');
const U = P.umwandlung.anteil_max;
const bind = P.kombination.bindung_monate;

export default defineGuide({
  id: 'pflegesachleistung',
  group: 'zuhause',
  order: 20,
  mini: 'sachRest',
  related: ['kombinationsleistung', 'pflegegeld', 'umwandlungsanspruch', 'entlastungsbetrag', 'beratungseinsatz', 'hilfe-zur-pflege'],
  sources: ['sgb11_36', 'sgb11_38', 'sgb11_120', 'sgb11_45a', 'sgb5_37', 'bmgLeistungen'],
  de: {
    slug: 'pflegesachleistung',
    nav: 'Pflegesachleistung',
    card: `Das Budget für den Pflegedienst: bis ${DE.eur(SL['5'])} im Monat, direkt abgerechnet, mit anteiligem Pflegegeld für den Rest.`,
    title: 'Pflegesachleistung 2026: Beträge, Abrechnung, Restgeld',
    description: `Pflegesachleistung 2026: ${DE.eur(SL['2'])} bis ${DE.eur(SL['5'])} im Monat für den Pflegedienst, direkt mit der Kasse abgerechnet. Was über dem Topf liegt, was als Pflegegeld bleibt.`,
    h1: 'Pflegesachleistung: was der Pflegedienst aus dem Topf bekommt',
    intro: 'Kein Geld aufs Konto, sondern ein Monatsbudget, das der Pflegedienst direkt bei der Kasse abruft. Wer es versteht, plant den Dienst passend und behält einen Teil des Pflegegeldes.',
    resume: `Die Pflegesachleistung ist das Monatsbudget, aus dem die Pflegekasse einen zugelassenen ambulanten Pflegedienst bezahlt, wenn er zu Hause körperbezogene Pflege, pflegerische Betreuung oder Hilfe im Haushalt übernimmt (§ 36 SGB XI). Sie steht ab Pflegegrad 2 zu und beträgt 2026 bis zu ${DE.eur(SL['2'])} bei Pflegegrad 2, ${DE.eur(SL['3'])} bei Grad 3, ${DE.eur(SL['4'])} bei Grad 4 und ${DE.eur(SL['5'])} bei Grad 5. Das Geld erreicht nie das Konto der Familie: Der Dienst rechnet direkt mit der Kasse ab, und was seine Monatsrechnung über dem Betrag liegt, zahlt der Haushalt selbst. Bleibt ein Teil des Topfes ungenutzt, gibt es daneben anteiliges Pflegegeld. Bei Pflegegrad 3 und einer Rechnung von ${DE.eur(900)} sind ${DE.pct(k900.anteil, 1)} verbraucht, vom Pflegegeld bleiben ${DE.eur(k900.pflegegeld, 2)}. Bis zu ${DE.pct(U, 0)} des Betrags lassen sich für anerkannte Alltagshilfen umwandeln. Tagespflege, Entlastungsbetrag und Pflegehilfsmittel kommen ungekürzt hinzu, und an das gewählte Verhältnis von Geld und Dienst ist man ${bind} Monate gebunden (§ 38).`,
    faqs: [
      { q: 'Welche Aufgaben darf der Pflegedienst über die Sachleistung abrechnen?', a: 'Alles, was § 36 SGB XI häusliche Pflegehilfe nennt: Hilfe bei Körperpflege, Essen, Anziehen und Bewegung, pflegerische Betreuung wie Tagesstruktur, Gespräche und kognitive Aktivierung, dazu Hilfen bei der Haushaltsführung. Auch die Anleitung der Angehörigen gehört dazu, etwa wenn eine Pflegefachkraft der Tochter zeigt, wie sie die Mutter rückenschonend umsetzt. Welche Leistungskomplexe der Dienst konkret anbietet, steht mit Preisen im Pflegevertrag.' },
      { q: 'Was passiert, wenn die Rechnung des Pflegedienstes höher ist als die Sachleistung?', a: `Den Betrag über dem Höchstwert zahlt die pflegebedürftige Person selbst. Der Dienst darf dafür aber keine höheren Preise verlangen als die mit den Kassen vereinbarten (§ 120 Abs. 4 SGB XI). Bei Pflegegrad 2 und einer Rechnung von ${DE.eur(1200)} bleiben ${DE.eur(k2voll.ueberMax)} offen und das Pflegegeld entfällt. Reichen Rente und Erspartes nicht, kann beim Sozialamt Hilfe zur Pflege beantragt werden.` },
      { q: 'Kann die Sachleistung auch in der Wohnung der Tochter genutzt werden?', a: 'Ja. Häusliche Pflegehilfe ist ausdrücklich auch dann zulässig, wenn die pflegebedürftige Person nicht im eigenen Haushalt gepflegt wird (§ 36 Abs. 4 SGB XI). Zieht der Vater zur Tochter, kann ein Pflegedienst in deren Wohnung kommen und über die Sachleistung abrechnen. Ausgeschlossen ist nur die Pflege in einem Pflegeheim oder in Einrichtungen, die einem Heim gleichgestellt sind.' },
      { q: 'Gehört die medizinische Behandlungspflege zur Pflegesachleistung?', a: 'Nein. Behandlungspflege, die zur Sicherung einer ärztlichen Behandlung nötig ist, zahlt die Krankenkasse als häusliche Krankenpflege (§ 37 Abs. 2 SGB V). Kommt derselbe Pflegedienst für beides, stellt er zwei Rechnungen: eine an die Krankenkasse, eine an die Pflegekasse. Nur die zweite verbraucht das Budget nach § 36 und mindert damit das anteilige Pflegegeld.' },
      { q: 'Wie lange gilt die Entscheidung für einen bestimmten Mix aus Pflegedienst und Pflegegeld?', a: `Nach § 38 SGB XI ist man ${bind} Monate an das gewählte Verhältnis von Pflegegeld und Sachleistung gebunden. Das betrifft die Grundentscheidung, nicht jede Monatsrechnung. Wenn sich die Lage wesentlich ändert, etwa nach einem Krankenhausaufenthalt oder einer Höherstufung, akzeptieren die Kassen in der Regel einen Wechsel. Den Pflegevertrag selbst kann man jederzeit ohne Frist kündigen.` },
      { q: 'Dürfen zwei Pflegebedürftige in einer Wohnung denselben Einsatz teilen?', a: 'Ja, das Gesetz erlaubt ausdrücklich, dass mehrere Pflegebedürftige häusliche Pflegehilfe gemeinsam in Anspruch nehmen (§ 36 Abs. 4 SGB XI). Ein Ehepaar kann sich etwa die Hilfe im Haushalt oder die Betreuung am Nachmittag teilen, jeder rechnet seinen Anteil gegen das eigene Budget ab. Dadurch reicht der Topf weiter, und jeder behält einen größeren Rest für anteiliges Pflegegeld.' },
    ],
    body: (h) => `
<h2>Was hinter dem Begriff steckt</h2>
<p>Sachleistung heißt im Sozialrecht: Die Kasse zahlt nicht der versicherten Person Geld, sondern bezahlt eine Leistung, die ein Dritter erbringt. Bei der Pflege zu Hause ist das der zugelassene ambulante Pflegedienst, also ein Dienst mit Versorgungsvertrag. Er schickt Pflegekräfte, schreibt auf, was sie getan haben, und stellt die Rechnung unmittelbar der Pflegekasse (${h.src('sgb11_120', '§ 120 Abs. 4 SGB XI')}). Die Familie sieht davon nur die Kopie und einen Anteil, falls der Monatsbetrag nicht reicht.</p>
<p>Der Inhalt ist weiter, als viele denken. ${h.src('sgb11_36', '§ 36 SGB XI')} nennt körperbezogene Pflegemaßnahmen, pflegerische Betreuung und Hilfen bei der Haushaltsführung. Betreuung umfasst Unterstützung bei Orientierung und Tagesstruktur, bei Gesprächen und sozialen Kontakten sowie Übungen zur geistigen Aktivierung. Auch die fachliche Anleitung von Angehörigen ist Teil der Leistung. Neben klassischen Pflegediensten können Einzelpersonen mit eigenem Vertrag mit der Pflegekasse Sachleistung erbringen, und Dienste dürfen mit Anbietern haushaltsnaher Dienstleistungen kooperieren.</p>

<h2>Die Beträge 2026 im Vergleich zum Pflegegeld</h2>
${h.table(['Pflegegrad', 'Sachleistung bis', 'Pflegegeld', 'Pflegegeld in Prozent der Sachleistung', 'davon umwandelbar'],
  G.map((g) => [g, h.eur(SL[g]), h.eur(PG[g]), h.pct(PG[g] / SL[g], 1), h.eur(SL[g] * U, 2)]),
  `Monatsbeträge nach §§ 36, 37 und 45a Abs. 4 SGB XI; umwandelbar sind höchstens ${h.pct(U, 0)} für anerkannte Alltagshilfen.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Die Tabelle zeigt, warum der Pflegedienst für die Kasse teurer ist als die Familie: In jedem Grad ist die Sachleistung mehr als doppelt so hoch wie das Pflegegeld. Wer ausschließlich einen Dienst nutzt, schöpft also einen größeren Betrag aus, verzichtet aber vollständig auf das frei verfügbare Geld. Für viele Haushalte liegt die beste Lösung dazwischen: einige feste Einsätze für das, was Angehörige nicht leisten können, und der Rest als ${h.a('pflegegeld', 'Pflegegeld')} für die Person, die den Alltag trägt.</p>

<h2>Wenn die Rechnung über dem Topf liegt</h2>
<p>Ambulante Pflegedienste rechnen nach Leistungskomplexen oder nach Zeit ab, mit Preisen, die sie mit den Kassen im Land vereinbart haben. Zweimal täglich Hilfe beim Waschen und Anziehen kann schnell mehr kosten als die Sachleistung. Den Unterschied zahlt die Familie, allerdings nur zu den vereinbarten Preisen: Ein Aufschlag für Privatzahler ist nicht erlaubt (${h.src('sgb11_120', '§ 120 Abs. 4')}). Was dieselbe Monatsrechnung in den vier Graden bedeutet:</p>
${h.table(['Pflegegrad', 'Rechnung', 'Topf genutzt', 'Pflegegeld daneben', 'selbst zu zahlen'],
  ([2, 3, 4, 5] as const).map((g) => { const k = r1200(g); return [String(g), h.eur(1200), h.pct(k.anteil, 1), h.eur(k.pflegegeld, 2), h.eur(k.ueberMax)]; }),
  `Beispielrechnung des Motors: Pflegedienst mit ${h.eur(1200)} Monatsrechnung (Annahme), ohne Umwandlung.`, ['l', 'r', 'r', 'r', 'r'])}
<!--mini:kombiSchnell-->
<p>Bei Pflegegrad 2 reißt eine solche Rechnung das Budget, bei Pflegegrad 5 bleibt fast die Hälfte frei und wird zu anteiligem Pflegegeld. Wer selbst zuzahlen muss und dafür kein ausreichendes Einkommen hat, kann beim Sozialamt die ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')} beantragen. Vorher lohnt sich der Blick auf den Pflegevertrag: Manche Einsätze lassen sich kürzen, verlegen oder durch Tagespflege ersetzen, die aus einem eigenen Budget kommt.</p>

<h2>Der Pflegevertrag: was drinstehen muss</h2>
<p>Spätestens mit dem ersten Einsatz entsteht zwischen Dienst und pflegebedürftiger Person ein Pflegevertrag (${h.src('sgb11_120', '§ 120 SGB XI')}). Er muss Art, Inhalt und Umfang jeder Leistung mit dem vereinbarten Preis beschreiben, und der Dienst muss vor Vertragsschluss in der Regel schriftlich mitteilen, was voraussichtlich auf die Familie zukommt. Der Vertrag lässt sich jederzeit ohne Frist kündigen. Das ist wichtig, wenn ein Dienst unzuverlässig kommt oder die Familie wechseln will: Niemand muss eine Kündigungsfrist abwarten, und die Sachleistung lässt sich ab dem Wechsel bei einem anderen Dienst einsetzen.</p>
<p>Der Vertrag soll außerdem berücksichtigen, dass mehrere Anbieter nebeneinander tätig sein können und dass ein Teil des Budgets für den ${h.a('umwandlungsanspruch', 'Umwandlungsanspruch')} frei bleiben kann. Eine Familie darf also einen Dienst für die Morgenpflege haben und eine anerkannte Alltagshilfe für den Nachmittag, ohne dass der erste Dienst das ganze Budget beansprucht.</p>

<h2>Was nicht aus diesem Topf kommt</h2>
<p>Medizinische Behandlungspflege gehört zur Krankenversicherung (${h.src('sgb5_37', '§ 37 Abs. 2 SGB V')}). Kommt der Dienst wegen eines ärztlich nötigen Einsatzes, rechnet er diesen Teil mit der Krankenkasse ab, ohne die Sachleistung zu belasten. Ebenso getrennt laufen die ${h.a('tagespflege', 'Tagespflege')} mit eigenem Budget, der ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} und die Pflegehilfsmittel zum Verbrauch. Keiner dieser Beträge mindert das Pflegegeld. Wer alle Töpfe zusammenrechnen will, nutzt die ${h.a('kombinationsleistung', 'Kombinationsleistung')}.</p>

<h2>Beratung, Rente und Bindung</h2>
<p>Wer Sachleistung bezieht, muss keinen ${h.a('beratungseinsatz', 'Beratungseinsatz')} nachweisen, darf ihn aber halbjährlich freiwillig abrufen. Für pflegende Angehörige hat die Wahl Folgen bei der Rente: Bei Pflegegrad 3 und reiner Sachleistung zahlt die Kasse Beiträge auf ${h.pct(rSach.anteil, 1)} der Bezugsgröße, bei reinem Pflegegeld auf ${h.pct(rGeld.anteil, 0)}. Ein Jahr Pflege bringt damit ${h.eur(rSach.renteProJahr, 2)} statt ${h.eur(rGeld.renteProJahr, 2)} Monatsrente, sofern die Pflegeperson mindestens ${P.rente.min_stunden_woche} Stunden an ${P.rente.min_tage_woche} Tagen pro Woche pflegt. An das gewählte Verhältnis von Geld und Dienst bindet ${h.src('sgb11_38', '§ 38 SGB XI')} für ${bind} Monate.</p>

<h2>So starten Sie mit einem Pflegedienst</h2>
<ol>
<li>Nach dem Bescheid mit Pflegegrad 2 oder höher mehrere zugelassene Dienste in der Nähe anfragen; der Pflegestützpunkt hat Listen.</li>
<li>Einen Kostenvoranschlag mit Leistungskomplexen und Preisen verlangen und mit dem Monatsbetrag aus der Tabelle vergleichen.</li>
<li>Festlegen, was die Familie selbst übernimmt, und den Rest an den Dienst geben; der Mini-Rechner oben zeigt das verbleibende Pflegegeld.</li>
<li>Die monatlichen Abrechnungen prüfen. Stimmt eine Rechnung nicht mit den erbrachten Einsätzen überein, zuerst den Dienst ansprechen, dann die Kasse.</li>
</ol>
<p>Ein kurzer Hinweis für Familien, die zum ersten Mal mit einem Dienst arbeiten: Die Pflegekräfte wechseln häufiger, als man erwartet, und Einsatzzeiten sind selten auf die Minute fest. Vereinbaren Sie Zeitfenster, die zum Tagesablauf passen, und notieren Sie Wünsche zu festen Ansprechpersonen im Vertrag. Das erspart Ärger und erleichtert es der pflegebedürftigen Person, fremde Hilfe zu akzeptieren.</p>
`,
  },
  en: {
    slug: 'home-care-services',
    nav: 'Home care services',
    card: `The budget for a home care service: up to ${EN.eur(SL['5'])} a month, billed directly, with part of the allowance for what is left.`,
    title: 'Pflegesachleistung 2026: Home Care Service Budget by Grade',
    description: `German home care budget (Pflegesachleistung) 2026: ${EN.eur(SL['2'])} to ${EN.eur(SL['5'])} a month, billed by the care service to the fund. What exceeds it, what allowance is left.`,
    h1: 'Home care services in Germany: how the monthly budget works',
    intro: 'No money paid to you, but a monthly budget the care service draws on directly. Understanding it helps you plan visits and keep part of the care allowance.',
    resume: `The services benefit (Pflegesachleistung) is the monthly budget from which the German long-term care fund pays a registered home care service for personal care, care-related supervision and help with the household (section 36 of Book XI of the Social Code, SGB XI). It applies from care grade 2 and in 2026 is worth up to ${EN.eur(SL['2'])} at grade 2, ${EN.eur(SL['3'])} at grade 3, ${EN.eur(SL['4'])} at grade 4 and ${EN.eur(SL['5'])} at grade 5. The money never reaches the family’s account: the service bills the fund directly, and anything above the cap is paid privately. If part of the budget is left unused, a partial care allowance is paid alongside. At grade 3 with a bill of ${EN.eur(900)}, ${EN.pct(k900.anteil, 1)} of the budget is used and ${EN.eur(k900.pflegegeld, 2)} of allowance remains. Up to ${EN.pct(U, 0)} can be converted for recognised everyday help. Day care, the relief amount and care aids come on top, and the chosen split between money and services binds for ${bind} months (section 38).`,
    faqs: [
      { q: 'What exactly can a German care service charge to the services budget?', a: 'Everything section 36 SGB XI calls home care assistance: help with washing, eating, dressing and moving, care-related supervision such as daily structure, conversation and cognitive activation, and help running the household. Training relatives also counts, for example a nurse showing a son how to transfer his mother safely. The service’s contract lists the exact service packages and their prices.' },
      { q: 'Who pays when the care service bill is higher than the budget?', a: `The person receiving care pays the difference, but the service may not charge more than the prices agreed with the funds (section 120(4) SGB XI). At grade 2 a monthly bill of ${EN.eur(1200)} leaves ${EN.eur(k2voll.ueberMax)} to pay and no allowance. If pension and savings are not enough, the local social welfare office can cover care costs through Hilfe zur Pflege.` },
      { q: 'Can my parent use the services budget while staying in my home in Germany?', a: 'Yes. Home care assistance is explicitly allowed when the person is not cared for in their own household (section 36(4) SGB XI). If your mother moves in with you, a care service can visit your flat and bill the budget. It is only excluded in a care home or an equivalent residential facility. The budget cannot be used outside Germany.' },
      { q: 'Are medical tasks such as wound care paid from this budget?', a: 'No. Medical treatment care needed to support a doctor’s treatment is paid by the health insurer as home nursing care (section 37(2) SGB V). If the same service does both, it sends two bills, one to the health insurer and one to the care fund. Only the second uses the section 36 budget and reduces the partial allowance.' },
      { q: 'Can we cancel a care service we are unhappy with?', a: `Yes, at any time and without notice (section 120(2) SGB XI). The contract with the service is not a long-term commitment, and the services budget moves with you to the next provider. What does bind for ${bind} months is the split between allowance and services under section 38, though funds usually accept a change after a hospital stay or a new grade.` },
      { q: 'Can two people with a care grade in one flat share a visit?', a: 'Yes. The law expressly allows several people to use home care assistance together (section 36(4) SGB XI). A couple can share household help or an afternoon of supervision, each paying their share from their own budget. The budgets then stretch further and each partner keeps more unused budget, which turns into partial care allowance.' },
    ],
    body: (h) => `
<h2>What “benefit in kind” means here</h2>
<p>German social law distinguishes cash benefits from benefits in kind. With home care, the benefit in kind is a registered home care service (ambulanter Pflegedienst) with a contract with the care funds. It sends carers, records what they did and invoices the long-term care fund (Pflegekasse) directly (${h.src('sgb11_120', 'section 120(4) SGB XI')}). The family only sees a copy, plus a bill of its own if the month’s cap is exceeded. For a son or daughter abroad this is convenient: nobody has to advance money or file receipts.</p>
<p>The scope is wider than many expect. ${h.src('sgb11_36', 'Section 36 SGB XI')} covers personal care, care-related supervision and help running the household. Supervision includes support with orientation, daily routine, conversation and social contact, and exercises that keep the mind active. Training relatives in care techniques is part of it too. Besides classic agencies, individuals with their own contract with the care fund can provide services, and agencies may cooperate with household service providers.</p>

<h2>The 2026 amounts compared with the allowance</h2>
${h.table(['Care grade', 'Services up to', 'Care allowance', 'Allowance as share of services', 'convertible'],
  G.map((g) => [g, h.eur(SL[g]), h.eur(PG[g]), h.pct(PG[g] / SL[g], 1), h.eur(SL[g] * U, 2)]),
  `Monthly amounts under sections 36, 37 and 45a(4) SGB XI; at most ${h.pct(U, 0)} may be converted for recognised everyday help.`, ['l', 'r', 'r', 'r', 'r'])}
<p>At every grade the services budget is more than twice the allowance. Using only a care service therefore draws a larger sum from the fund but gives up all freely usable money. For many households the best answer lies in between: a few fixed visits for what relatives cannot do, with the remainder paid as ${h.a('pflegegeld', 'care allowance')} to whoever handles daily life. If you live abroad and a neighbour or sibling does the everyday part, that partial allowance is how they can be compensated.</p>

<h2>When the bill exceeds the budget</h2>
<p>Care services bill by service package or by time, at prices agreed with the funds in each federal state. Help with washing and dressing twice a day can easily cost more than the budget. The family pays the gap, but only at the agreed prices: no surcharge for private payers is allowed (${h.src('sgb11_120', 'section 120(4)')}). The same monthly bill across the four grades:</p>
${h.table(['Care grade', 'Bill', 'Budget used', 'Allowance alongside', 'you pay'],
  ([2, 3, 4, 5] as const).map((g) => { const k = r1200(g); return [String(g), h.eur(1200), h.pct(k.anteil, 1), h.eur(k.pflegegeld, 2), h.eur(k.ueberMax)]; }),
  `Engine example: a care service bill of ${h.eur(1200)} a month (assumption), no conversion.`, ['l', 'r', 'r', 'r', 'r'])}
<!--mini:kombiSchnell-->
<p>At grade 2 such a bill breaks the budget; at grade 5 almost half stays free and becomes partial allowance. Anyone who must top up but lacks the income can apply to the social welfare office for ${h.a('hilfe-zur-pflege', 'social assistance for care')}. Before that, look at the contract: some visits can be shortened, moved or replaced by day care, which has its own budget.</p>

<h2>The care contract and what it must contain</h2>
<p>A care contract (Pflegevertrag) arises at the latest with the first visit (${h.src('sgb11_120', 'section 120 SGB XI')}). It must describe the type, content and extent of each service with its agreed price, and the service must normally tell you in writing beforehand what the expected private cost will be. The contract can be cancelled at any time without notice, which matters when a service is unreliable or the family wants to switch. Ask for the written cost estimate by email if you are handling things from another country; it is the document you will need if a bill is disputed.</p>
<p>The contract should also allow for several providers working side by side and for part of the budget to stay free for the ${h.a('umwandlungsanspruch', 'conversion claim')}. A family may therefore use one agency for morning care and a recognised everyday helper for afternoons without the first agency claiming the whole budget.</p>

<h2>What does not come out of this budget</h2>
<p>Medical treatment care belongs to health insurance (${h.src('sgb5_37', 'section 37(2) SGB V')}). If the service comes for a medically required task, it bills that part to the health insurer without touching the services budget. Kept separate as well are ${h.a('tagespflege', 'day care')} with its own budget, the ${h.a('entlastungsbetrag', 'relief amount')} and consumable care aids. None of them reduces the allowance. To add everything up, use the ${h.a('kombinationsleistung', 'combined benefit calculator')}.</p>

<h2>Advice visits, pension and the six-month rule</h2>
<p>People receiving services do not have to prove an ${h.a('beratungseinsatz', 'advice visit')} but may request one every six months. For family carers the choice affects pension: at grade 3 with services only, the fund pays contributions on ${h.pct(rSach.anteil, 1)} of the reference value, with allowance only on ${h.pct(rGeld.anteil, 0)}. A year of caring then adds ${h.eur(rSach.renteProJahr, 2)} rather than ${h.eur(rGeld.renteProJahr, 2)} of monthly pension, provided the carer cares at least ${P.rente.min_stunden_woche} hours over ${P.rente.min_tage_woche} days a week. ${h.src('sgb11_38', 'Section 38 SGB XI')} binds the chosen split for ${bind} months.</p>

<h2>Getting started with a care service</h2>
<ol>
<li>Once grade 2 or higher is confirmed, contact several registered services near your relative; the local Pflegestützpunkt keeps lists.</li>
<li>Ask for a written estimate listing service packages and prices, and compare it with the monthly cap in the table.</li>
<li>Decide what family members cover and give the rest to the service; the calculator above shows the remaining allowance.</li>
<li>Check the monthly statements. If a bill does not match the visits, raise it with the service first, then with the fund.</li>
</ol>
<p>One practical note for families new to care services: carers change more often than expected, and visit times are rarely fixed to the minute. Agree time windows that fit your parent’s routine and write wishes about regular staff into the contract. It avoids friction and makes it easier for your parent to accept help from strangers, which is often the hardest part when the family is far away.</p>
`,
  },
});
