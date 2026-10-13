import { defineGuide } from '../../lib/guide-types';
import { kombination, pflegegeld, sachleistung } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Umwandlungsrahmen je Pflegegrad, Pflegegeld-Verlust je 100 €, Grad 3 mit Dienst und Alltagshilfe. */
const U = P.umwandlung.anteil_max, E = P.entlastungsbetrag.monat;
const G = [2, 3, 4, 5] as const;
const Z = G.map((g) => { const max = sachleistung(g); const k = kombination(g, 0, max * U); return { g, max, umw: k.umwandlung, pgVoll: pflegegeld(g), pgDanach: k.pflegegeld, je100: Math.round(pflegegeld(g) / max * 100 * 100) / 100 }; });
/** Annahmen für das Rechenbeispiel: Pflegedienst 600 €, Alltagshilfe 400 € im Monat. */
const ohne = kombination(3, 600, 0), mit = kombination(3, 600, 400);
/** Pflegegrad 2, Dienst schöpft fast alles aus: nur der Rest ist umwandelbar. */
const eng = kombination(2, 600, 400);
const z3 = Z[1];
/** Jahresrechnung bei Pflegegrad 3 und voller Umwandlung jeden Monat. */
const hilfeJahr = z3.umw * 12, verlustJahr = Math.round((z3.pgVoll - z3.pgDanach) * 12 * 100) / 100;

export default defineGuide({
  id: 'umwandlungsanspruch',
  group: 'zuhause',
  order: 120,
  mini: 'umwandlung',
  related: ['entlastungsbetrag', 'kombinationsleistung', 'pflegesachleistung', 'pflegegeld', 'beratungseinsatz', 'pflegegrad-demenz'],
  sources: ['sgb11_45a', 'sgb11_38', 'sgb11_36', 'sgb11_45b', 'sgb11_37', 'sgb11_7'],
  de: {
    slug: 'umwandlungsanspruch',
    nav: 'Umwandlungsanspruch',
    card: `Bis ${DE.pct(U, 0)} der Sachleistung für anerkannte Alltagshilfen, ohne vorherigen Antrag, zusätzlich zum Entlastungsbetrag, aber auf Kosten des Pflegegeldes.`,
    title: `Umwandlungsanspruch 2026: ${DE.pct(U, 0)} Sachleistung für Alltagshilfe`,
    description: `Umwandlungsanspruch 2026: bis ${DE.pct(U, 0)} der Pflegesachleistung für Alltagshilfen ab Pflegegrad 2, ohne Antrag, neben dem Entlastungsbetrag. Pflegegeld sinkt.`,
    h1: 'Umwandlungsanspruch: Alltagshilfe aus dem Topf der Sachleistung',
    intro: 'Betreuungsgruppe, Haushaltshilfe, Alltagsbegleiterin: Wer den Pflegedienst-Topf nicht ausschöpft, kann einen Teil dafür nutzen. Was das bringt und was es kostet.',
    resume: `Pflegebedürftige ab Pflegegrad 2, die zu Hause leben, können bis zu ${DE.pct(U, 0)} ihres monatlichen Sachleistungsbetrags für nach Landesrecht anerkannte Angebote zur Unterstützung im Alltag verwenden (§ 45a Abs. 4 SGB XI). Bei Pflegegrad 3 sind das bis zu ${DE.eur(z3.umw, 2)} im Monat. Gemeint sind etwa Betreuungsgruppen für Menschen mit Demenz, Alltagsbegleiter, Helferkreise, familienentlastende Dienste und haushaltsnahe Serviceangebote. Ein vorheriger Antrag ist nicht nötig: Die Kasse erstattet die Kosten gegen Belege. Umwandeln lässt sich nur, was ein Pflegedienst in dem Monat nicht schon über die Sachleistung abgerechnet hat; seine Rechnung geht vor. Im Rahmen der Kombinationsleistung zählt die Erstattung wie genutzte Sachleistung, das Pflegegeld sinkt deshalb anteilig. Bei Pflegegrad 3 kostet jeder umgewandelte Betrag von ${DE.eur(100)} rund ${DE.eur(z3.je100, 2)} Pflegegeld. Die Umwandlung läuft unabhängig vom Entlastungsbetrag von ${DE.eur(E)}, beide lassen sich nebeneinander nutzen. Wer sie nutzt, für den gelten die Regeln zum Beratungsbesuch entsprechend.`,
    faqs: [
      { q: 'Muss ich den Umwandlungsanspruch vorher bei der Pflegekasse beantragen?', a: 'Nein. Das Gesetz sagt ausdrücklich, dass es für die Umwandlung keiner vorherigen Antragstellung bedarf (§ 45a Abs. 4 Satz 3 SGB XI). Sie nutzen das anerkannte Angebot und reichen danach die Belege ein, wenn Sie die Erstattung beantragen. Bei Beihilfeberechtigten erstattet die Beihilfestelle ihren Anteil. Prüfen Sie vor dem ersten Termin nur, ob der Anbieter nach Landesrecht anerkannt ist.' },
      { q: 'Welche Angebote dürfen über den Umwandlungsanspruch abgerechnet werden?', a: 'Nur Angebote zur Unterstützung im Alltag, die nach dem Recht Ihres Bundeslandes anerkannt sind. Das Gesetz nennt drei Arten: Betreuungsangebote, Angebote zur Entlastung von Pflegenden und Angebote zur Entlastung im Alltag, etwa im Haushalt. Als Beispiele führt es Betreuungsgruppen für Menschen mit Demenz, Helferkreise, Alltagsbegleiter, Pflegebegleiter, familienentlastende Dienste und Serviceangebote für haushaltsnahe Dienstleistungen an.' },
      { q: 'Wie viel Pflegegeld kostet jeder umgewandelte Euro?', a: `Das hängt vom Verhältnis zwischen Pflegegeld und Sachleistung des Grades ab, weil die Erstattung wie genutzte Sachleistung zählt. Bei Pflegegrad 2 kosten ${DE.eur(100)} Umwandlung ${DE.eur(Z[0].je100, 2)} Pflegegeld, bei Pflegegrad 5 ${DE.eur(Z[3].je100, 2)}. Unter dem Strich bleibt also immer mehr Hilfe, als Pflegegeld wegfällt, aber das Geld auf dem Konto wird weniger. Die Tabelle auf dieser Seite zeigt alle Grade.` },
      { q: 'Kann ich Entlastungsbetrag und Umwandlung für dieselbe Haushaltshilfe nutzen?', a: `Ja, beide Leistungen laufen nach dem Gesetz unabhängig voneinander (§ 45a Abs. 4 letzter Satz). Eine anerkannte Haushaltshilfe kann also einen Teil ihrer Stunden über den Entlastungsbetrag von ${DE.eur(E)} und einen weiteren Teil über die Umwandlung abrechnen. Dieselbe Rechnung wird aber nur einmal erstattet. Sinnvoll ist meist, zuerst den Entlastungsbetrag zu nutzen, weil er das Pflegegeld nicht mindert.` },
      { q: 'Was passiert, wenn das Pflegegeld für den Monat schon überwiesen wurde?', a: 'Dann verrechnet die Kasse. Ist für den Monat bereits mehr Pflegegeld ausgezahlt worden, als nach Abzug der Umwandlung zusteht, wird der Erstattungsbetrag insoweit mit dem schon gezahlten Pflegegeld verrechnet (§ 45a Abs. 4 SGB XI). Sie bekommen also weniger erstattet, müssen aber nichts aktiv zurückzahlen. Planen Sie das ein, wenn Belege für mehrere Monate auf einmal eingereicht werden.' },
      { q: 'Lohnt sich die Umwandlung, wenn ein Pflegedienst die Sachleistung schon fast ausschöpft?', a: `Kaum. Die Vergütung des Pflegedienstes wird vorrangig abgerechnet, umgewandelt werden kann nur der Teil, der im Monat nicht als Sachleistung bezogen wurde. Rechnet der Dienst bei Pflegegrad 2 schon ${DE.eur(600)} ab, bleiben von einer Alltagshilfe für ${DE.eur(400)} nur ${DE.eur(eng.umwandlung, 2)} erstattungsfähig. Für den Rest bleibt der Entlastungsbetrag.` },
      { q: 'Gibt es den Umwandlungsanspruch auch bei Pflegegrad 1?', a: `Nein. Der Anspruch setzt mindestens Pflegegrad 2 voraus, weil er aus dem Sachleistungsbetrag nach § 36 gespeist wird, den es bei Pflegegrad 1 nicht gibt. Für anerkannte Alltagshilfen steht bei Pflegegrad 1 der Entlastungsbetrag von ${DE.eur(E)} im Monat bereit, der dort auch für die Körperpflege durch einen zugelassenen Pflegedienst eingesetzt werden darf.` },
    ],
    body: (h) => `
<h2>Wie die Umwandlung funktioniert</h2>
<p>Die Sachleistung ist ein Monatsbudget für einen zugelassenen Pflegedienst. Nutzt die Familie es nicht vollständig, darf sie einen Teil davon in eine Kostenerstattung für anerkannte Alltagshilfen „umwandeln“ (${h.src('sgb11_45a', '§ 45a Abs. 4 SGB XI')}). Drei Regeln bestimmen, wie viel geht. Erstens die Obergrenze: höchstens ${h.pct(U, 0)} des Sachleistungsbetrags des Grades je Kalendermonat. Zweitens der Vorrang des Pflegedienstes: Seine Vergütung wird zuerst abgerechnet, umgewandelt wird nur, was im Monat übrig bleibt. Drittens die Wirkung auf das Pflegegeld: In der Kombinationsleistung nach ${h.src('sgb11_38', '§ 38 SGB XI')} zählt die Erstattung als genutzte Sachleistung.</p>
${h.table(['Pflegegrad', 'Sachleistung', 'umwandelbar höchstens', 'Pflegegeld ohne Umwandlung', 'Pflegegeld bei voller Umwandlung', 'Pflegegeld je 100 € Umwandlung'],
  Z.map((z) => [z.g, h.eur(z.max), h.eur(z.umw, 2), h.eur(z.pgVoll), h.eur(z.pgDanach, 2), h.eur(z.je100, 2)]),
  `Rechnung des Motors nach §§ 36, 37, 38 und 45a Abs. 4 SGB XI, ohne Pflegedienst im selben Monat.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Die letzte Spalte ist die wichtigste. Sie zeigt den Preis der Umwandlung in Pflegegeld. Weil das Pflegegeld bei jedem Grad deutlich kleiner ist als die Sachleistung, bekommt die Familie für jeden umgewandelten Euro mehr Hilfe, als sie an Pflegegeld verliert. Sie tauscht aber frei verfügbares Geld gegen zweckgebundene Erstattung.</p>

<h2>Ein Rechenbeispiel bei Pflegegrad 3</h2>
${h.table(['', 'nur Pflegedienst', 'Pflegedienst und Alltagshilfe'], [
  ['Rechnung Pflegedienst', h.eur(ohne.pflegedienst), h.eur(mit.pflegedienst)],
  ['Erstattung Alltagshilfe (Umwandlung)', h.eur(ohne.umwandlung), h.eur(mit.umwandlung)],
  ['genutzter Anteil der Sachleistung', h.pct(ohne.anteil, 1), h.pct(mit.anteil, 1)],
  ['anteiliges Pflegegeld', h.eur(ohne.pflegegeld, 2), h.eur(mit.pflegegeld, 2)],
  ['Entlastungsbetrag zusätzlich', h.eur(E), h.eur(E)],
], `Annahmen: Pflegedienst ${h.eur(600)}, anerkannte Alltagshilfe ${h.eur(400)} im Monat. Rechnung des Motors.`, ['l', 'r', 'r'])}
<p>Die Alltagshilfe für ${h.eur(400)} wird voll erstattet, das Pflegegeld sinkt dafür von ${h.eur(ohne.pflegegeld, 2)} auf ${h.eur(mit.pflegegeld, 2)}. Der Entlastungsbetrag bleibt in beiden Fällen unberührt, weil er unabhängig läuft (${h.src('sgb11_45b', '§ 45b SGB XI')}). Wer zunächst den ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} ausschöpft und erst den Rest umwandelt, behält mehr Pflegegeld.</p>
<!--mini:kombiSchnell-->

<h2>Welche Angebote zählen</h2>
<p>Anerkannte Angebote zur Unterstützung im Alltag sind nach dem Gesetz Betreuungsangebote, in denen vor allem Ehrenamtliche unter fachlicher Anleitung betreuen, Angebote zur Entlastung von Pflegenden und Angebote zur Entlastung im Alltag, etwa im Haushalt oder bei der Organisation von Hilfen (§ 45a Abs. 1). Das Gesetz nennt Betreuungsgruppen für Menschen mit Demenz, Helferkreise zur stundenweisen Entlastung, Tagesbetreuung in Kleingruppen, Einzelbetreuung durch anerkannte Helfer, Agenturen zur Vermittlung von Entlastungsleistungen, familienentlastende Dienste, Alltagsbegleiter, Pflegebegleiter und haushaltsnahe Serviceangebote. Die Anerkennung regelt jedes Land in einer eigenen Verordnung (§ 45a Abs. 3). Ein privater Reinigungsdienst ohne diese Anerkennung zählt nicht.</p>
<p>Wo findet man anerkannte Anbieter? Die Pflegekasse muss auf Anforderung unverzüglich eine Leistungs- und Preisvergleichsliste für Ihre Region übermitteln, die ausdrücklich auch die Angebote zur Unterstützung im Alltag mit ihren Kosten enthält (${h.src('sgb11_7', '§ 7 Abs. 3 SGB XI')}). Die Landesverbände der Pflegekassen aktualisieren diese Liste einmal im Quartal und veröffentlichen sie auf einer eigenen Internetseite. Fragen Sie die Liste schriftlich an; so lassen sich Stundensätze vergleichen, bevor die erste Rechnung kommt.</p>

<h2>Erstattung und Verrechnung</h2>
<p>Die Kasse erstattet gegen Belege über die Eigenbelastung, wenn Sie die Mittel beantragen; bei Beihilfeberechtigten trägt die Beihilfestelle ihren Anteil. Ist das Pflegegeld für einen Monat schon überwiesen, bevor die Erstattung bearbeitet wird, kann mehr Pflegegeld geflossen sein, als nach der Umwandlung zusteht. Dann zieht die Kasse den Überschuss von der Erstattung ab, statt Geld zurückzufordern. Reichen Sie Belege deshalb monatlich ein; so bleibt nachvollziehbar, welcher Monat wie abgerechnet wurde.</p>

<h2>Beratungsbesuch auch bei Umwandlung</h2>
<p>Wer den Umwandlungsanspruch nutzt, für den gelten die Regeln zur Beratung in der eigenen Häuslichkeit entsprechend. Versäumt er einen Besuch, trifft die Kürzung oder der Entzug die Kostenerstattung für die Alltagshilfe, nicht nur das Pflegegeld. Mehr zu Terminen, Video und Fristen beim ${h.a('beratungseinsatz', 'Beratungseinsatz')}.</p>

<h2>Auf das Jahr gerechnet</h2>
<p>Monatsbeträge wirken klein, Jahresbeträge machen die Entscheidung greifbarer. Wandelt eine Familie bei Pflegegrad 3 jeden Monat den vollen Rahmen um und nutzt keinen Pflegedienst, finanziert sie im Jahr Alltagshilfe für ${h.eur(hilfeJahr, 2)}. Dafür fallen ${h.eur(verlustJahr, 2)} Pflegegeld weg. Der Entlastungsbetrag von ${h.eur(E * 12)} im Jahr kommt in beiden Fällen dazu. Ob sich der Tausch lohnt, hängt daran, wofür das Pflegegeld bisher gebraucht wurde. Fließt es als Anerkennung an eine Tochter, die selbst pflegt, kostet die Umwandlung sie bares Geld; ist sie dagegen erschöpft und braucht Stunden für sich, kann eine regelmäßige Betreuung mehr wert sein als der Betrag auf dem Konto. Für Angehörige, die weit weg leben, hat die Umwandlung einen weiteren Vorteil: Eine anerkannte Alltagsbegleiterin kommt verlässlich, auch wenn niemand aus der Familie vor Ort ist, und rechnet die Stunden nachvollziehbar ab.</p>

<h2>Wann sich die Umwandlung lohnt</h2>
<ol>
<li>Angehörige pflegen selbst, brauchen aber regelmäßige Entlastung durch Betreuung oder Haushaltshilfe, die über den Entlastungsbetrag hinausgeht.</li>
<li>Ein Pflegedienst kommt nur für wenige Einsätze, sodass ein großer Teil der ${h.a('pflegesachleistung', 'Sachleistung')} ungenutzt bliebe.</li>
<li>Bei Demenz wird eine Betreuungsgruppe mehrmals pro Woche genutzt, deren Kosten der Entlastungsbetrag allein nicht trägt.</li>
<li>Das Pflegegeld wird für den Lebensunterhalt der pflegenden Person nicht dringend gebraucht.</li>
</ol>
<p>Weniger sinnvoll ist sie, wenn der Pflegedienst die Sachleistung ohnehin fast ausschöpft. Bei Pflegegrad 2 mit einer Rechnung des Dienstes von ${h.eur(600)} lassen sich von einer Alltagshilfe für ${h.eur(400)} nur noch ${h.eur(eng.umwandlung, 2)} umwandeln. Die genaue Aufteilung zwischen Dienst, Umwandlung und Pflegegeld zeigt der Rechner zur ${h.a('kombinationsleistung', 'Kombinationsleistung')}.</p>
`,
  },
  en: {
    slug: 'conversion-claim',
    nav: 'Conversion claim',
    card: `Up to ${EN.pct(U, 0)} of the services budget for recognised everyday help, without prior application, on top of the relief amount but at the cost of the allowance.`,
    title: `Umwandlungsanspruch 2026: Convert ${EN.pct(U, 0)} for Everyday Help`,
    description: `German conversion claim 2026: up to ${EN.pct(U, 0)} of the services budget for recognised everyday help from grade 2, no prior application, and what it costs in allowance.`,
    h1: 'Conversion claim: everyday help paid from the services budget',
    intro: 'A dementia support group, a household helper, a companion: anyone not using the whole care service budget can put part of it towards these. What it brings and what it costs.',
    resume: `People with care grade 2 or higher who live at home can use up to ${EN.pct(U, 0)} of their monthly services budget for everyday support services recognised under state law (Umwandlungsanspruch, section 45a(4) of Book XI of the German Social Code, SGB XI). At grade 3 that is up to ${EN.eur(z3.umw, 2)} a month. Typical examples are dementia support groups, companions, volunteer helper circles, family relief services and household services. No prior application is needed: the fund refunds the cost against receipts. Only what a care service has not already billed as services in that month can be converted; the care service’s bill comes first. Within the combined benefit the refund counts as services used, so the care allowance falls proportionally. At grade 3, every ${EN.eur(100)} converted costs about ${EN.eur(z3.je100, 2)} of allowance. Conversion runs independently of the relief amount of ${EN.eur(E)}, and both can be used side by side. For anyone using it, the rules on the home advice visit apply accordingly.`,
    faqs: [
      { q: 'Do I need to apply before using the conversion claim?', a: 'No. The law states explicitly that no prior application is required (section 45a(4), third sentence, SGB XI). You use the recognised service and then submit the receipts when you claim the refund. For people entitled to Beihilfe, the allowance office refunds its share. Before the first session, just check that the provider is recognised under the law of the federal state.' },
      { q: 'Which services can be paid through the conversion claim?', a: 'Only everyday support services recognised under the law of your federal state. The law names three kinds: supervision services, services that relieve carers, and services that relieve everyday life, for example in the household. As examples it lists dementia support groups, helper circles, everyday companions, care companions, family relief services and household-related services.' },
      { q: 'How much care allowance does each converted euro cost?', a: `It depends on the ratio between allowance and services budget at the grade, because the refund counts as services used. At grade 2, ${EN.eur(100)} converted costs ${EN.eur(Z[0].je100, 2)} of allowance; at grade 5, ${EN.eur(Z[3].je100, 2)}. So you always get more help than the allowance you lose, but the money in the account goes down. The table on this page shows all grades.` },
      { q: 'Can the relief amount and conversion pay for the same household helper?', a: `Yes, the law says the two run independently (section 45a(4), last sentence). A recognised household helper can bill some hours to the relief amount of ${EN.eur(E)} and further hours through conversion. The same invoice is refunded only once, of course. It usually makes sense to use the relief amount first, because it does not reduce the allowance.` },
      { q: 'What happens if the month’s allowance has already been paid out?', a: 'The fund offsets it. If more allowance has been paid for the month than is due after the conversion, the refund is offset against the allowance already paid (section 45a(4) SGB XI). You receive a smaller refund but do not have to repay anything actively. Bear this in mind when submitting receipts for several months at once.' },
      { q: 'Is conversion worthwhile if a care service already uses most of the budget?', a: `Hardly. The care service is billed first, and only the part not drawn as services in that month can be converted. If the service already bills ${EN.eur(600)} at grade 2, only ${EN.eur(eng.umwandlung, 2)} of a ${EN.eur(400)} everyday help bill can be refunded. The relief amount remains for the rest.` },
      { q: 'Is the conversion claim available at care grade 1?', a: `No. It requires at least grade 2, because it is funded from the services budget under section 36, which does not exist at grade 1. For recognised everyday help at grade 1 there is the relief amount of ${EN.eur(E)} a month, which at that grade may also be used for personal care by a registered care service.` },
    ],
    body: (h) => `
<h2>How conversion works</h2>
<p>The services budget is a monthly budget for a registered care service. If the family does not use all of it, part can be “converted” into a refund for recognised everyday help (${h.src('sgb11_45a', 'section 45a(4) SGB XI')}). Three rules set how much. First, the cap: at most ${h.pct(U, 0)} of the grade’s services amount per calendar month. Second, the care service comes first: its fees are billed before anything else, and only what is left in the month can be converted. Third, the effect on the allowance: within the combined benefit under ${h.src('sgb11_38', 'section 38 SGB XI')}, the refund counts as services used.</p>
${h.table(['Care grade', 'Services budget', 'convertible at most', 'Allowance without conversion', 'Allowance with full conversion', 'Allowance cost per €100 converted'],
  Z.map((z) => [z.g, h.eur(z.max), h.eur(z.umw, 2), h.eur(z.pgVoll), h.eur(z.pgDanach, 2), h.eur(z.je100, 2)]),
  'Engine calculation under sections 36, 37, 38 and 45a(4) SGB XI, with no care service in the same month.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>The last column matters most. It shows the price of conversion in allowance. Because the allowance is clearly smaller than the services budget at every grade, the family gets more help for each euro converted than it loses in allowance. But it swaps money it can spend freely for a refund tied to a purpose. For a parent whose allowance is passed on to a carer as recognition, that trade-off deserves a family conversation.</p>

<h2>A worked example at grade 3</h2>
${h.table(['', 'care service only', 'care service and everyday help'], [
  ['care service bill', h.eur(ohne.pflegedienst), h.eur(mit.pflegedienst)],
  ['refund for everyday help (conversion)', h.eur(ohne.umwandlung), h.eur(mit.umwandlung)],
  ['share of services budget used', h.pct(ohne.anteil, 1), h.pct(mit.anteil, 1)],
  ['pro-rata care allowance', h.eur(ohne.pflegegeld, 2), h.eur(mit.pflegegeld, 2)],
  ['relief amount on top', h.eur(E), h.eur(E)],
], `Assumptions: care service ${h.eur(600)}, recognised everyday help ${h.eur(400)} a month. Engine calculation.`, ['l', 'r', 'r'])}
<p>The everyday help of ${h.eur(400)} is refunded in full, and the allowance falls from ${h.eur(ohne.pflegegeld, 2)} to ${h.eur(mit.pflegegeld, 2)}. The relief amount is untouched in both cases because it runs separately (${h.src('sgb11_45b', 'section 45b SGB XI')}). Using the ${h.a('entlastungsbetrag', 'relief amount')} first and converting only the remainder keeps more allowance.</p>
<!--mini:kombiSchnell-->

<h2>Which services count</h2>
<p>Under the law, recognised everyday support services are supervision services in which mainly volunteers provide care under professional guidance, services that relieve carers, and services that relieve everyday life, for example in the household or in organising help (section 45a(1)). The law names dementia support groups, helper circles for relief by the hour, day supervision in small groups, one-to-one supervision by recognised helpers, agencies arranging relief services, family relief services, everyday companions, care companions and household services. Each federal state regulates recognition in its own ordinance (section 45a(3)). A private cleaning firm without that recognition does not count, however reliable it is.</p>
<p>Where do you find recognised providers? On request, the care fund must promptly send a list comparing services and prices for your area, which expressly includes everyday support services and their costs (${h.src('sgb11_7', 'section 7(3) SGB XI')}). The state associations of care funds update this list every quarter and publish it on their own website. Ask for it in writing; you can then compare hourly rates before the first invoice arrives.</p>

<h2>Refunds and offsetting</h2>
<p>The fund refunds against receipts for your own costs when you claim the money; for people entitled to Beihilfe the allowance office pays its share. If the allowance for a month has already been transferred before the refund is processed, more may have been paid than is due after conversion. The fund then deducts the excess from the refund instead of asking for money back. Submit receipts monthly, so it stays clear which month was billed how, especially if you handle the paperwork from abroad.</p>

<h2>Advice visits apply to conversion too</h2>
<p>For anyone using the conversion claim, the rules on advice at home apply accordingly. If a visit is missed, the cut or withdrawal affects the refund for everyday help, not just the allowance. More on dates, video and deadlines under ${h.a('beratungseinsatz', 'home advice visit')}.</p>

<h2>Counted over a year</h2>
<p>Monthly amounts look small; annual figures make the decision tangible. If a family at grade 3 converts the full amount every month and uses no care service, it funds ${h.eur(hilfeJahr, 2)} of everyday help a year. In return ${h.eur(verlustJahr, 2)} of allowance is lost. The relief amount of ${h.eur(E * 12)} a year comes on top either way. Whether the trade is worth it depends on what the allowance was used for. If it goes to a daughter who provides the care as recognition, conversion costs her real money; if she is exhausted and needs hours for herself, regular supervision may be worth more than the sum in the account. For relatives living far away, conversion has another advantage: a recognised companion comes reliably even when no family member is nearby, and bills the hours transparently.</p>

<h2>When conversion pays off</h2>
<ol>
<li>Relatives provide the care themselves but need regular relief through supervision or household help beyond what the relief amount covers.</li>
<li>A care service visits only a few times, so much of the ${h.a('pflegesachleistung', 'services budget')} would otherwise go unused.</li>
<li>With dementia, a support group is attended several times a week and the relief amount alone cannot cover it.</li>
<li>The allowance is not urgently needed for the carer’s own living costs.</li>
</ol>
<p>It makes less sense when the care service already uses most of the budget. At grade 2 with a care service bill of ${h.eur(600)}, only ${h.eur(eng.umwandlung, 2)} of a ${h.eur(400)} everyday help bill can still be converted. The exact split between care service, conversion and allowance is shown by the ${h.a('kombinationsleistung', 'combined benefit calculator')}.</p>
`,
  },
});
