import { defineGuide } from '../../lib/guide-types';
import { wohnumfeld } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Zuschuss nach § 40 Abs. 4 bei angenommenen Handwerkerpreisen und Haushaltsgrößen. */
const W = P.wohnumfeld, H = P.pflegehilfsmittel, A = P.wohngruppe_anschub;
/** Annahmen für die Beispielrechnung: Preise sind keine Marktdaten, nur Rechenwerte. */
const FAELLE: Array<[string, string, number, number]> = [
  ['Haltegriffe und fest montierter Duschklappsitz', 'grab rails and a wall-mounted shower seat', 900, 1],
  ['bodengleiche Dusche statt Badewanne', 'level-access shower instead of a bath', 7500, 1],
  ['Rampe und zwei verbreiterte Türen, Ehepaar mit Pflegegrad', 'ramp and two widened doors, couple both with a care grade', 7500, 2],
  ['Bad und Flur einer Wohngruppe, vier Pflegebedürftige', 'bathroom and hall of a shared flat, four people with a care grade', 20000, 4],
  ['gleiche Arbeiten, acht Pflegebedürftige', 'same work, eight people with a care grade', 20000, 8],
];
const R = FAELLE.map(([de, en, k, n]) => ({ de, en, k, n, ...wohnumfeld(k, n) }));
const dusche = R[1], paar = R[2], acht = R[4];

export default defineGuide({
  id: 'wohnumfeldverbesserung',
  group: 'zuhause',
  order: 90,
  mini: 'wohnumfeld',
  related: ['pflegehilfsmittel', 'pflegegrad-1', 'wohngruppenzuschlag', 'beratungseinsatz', 'pflegegrad-beantragen', 'entlastungsbetrag'],
  sources: ['sgb11_40', 'sgb11_28a', 'bmgWohnung', 'sgb11_45g'],
  de: {
    slug: 'wohnumfeldverbesserung',
    nav: 'Wohnumfeldverbesserung',
    card: `Bis ${DE.eur(W.je_massnahme)} je Maßnahme für Dusche, Rampe oder Treppenlift, bis ${DE.eur(W.max_gemeinsam)} wenn mehrere Pflegebedürftige zusammenwohnen.`,
    title: `Wohnumfeldverbesserung 2026: ${DE.eur(W.je_massnahme)} je Umbau, Antrag`,
    description: `Wohnumfeldverbesserung 2026: bis ${DE.eur(W.je_massnahme)} je Maßnahme ab Pflegegrad 1, bis ${DE.eur(W.max_gemeinsam)} für mehrere Personen, Entscheidung binnen ${H.entscheidung_wochen} Wochen. Mit Rechenbeispielen.`,
    h1: 'Wohnumfeldverbesserung: der Zuschuss für den Umbau der Wohnung',
    intro: 'Eine Schwelle weniger, eine Tür breiter, eine Dusche ohne Wannenrand: Was die Pflegekasse dazugibt, wann sie entscheiden muss und was bei mehreren Bewohnern gilt.',
    resume: `Für Umbauten, die die Pflege zu Hause ermöglichen, erheblich erleichtern oder eine möglichst selbständige Lebensführung wiederherstellen, kann die Pflegekasse einen Zuschuss von bis zu ${DE.eur(W.je_massnahme)} je Maßnahme zahlen (§ 40 Abs. 4 SGB XI). Der Anspruch besteht ab Pflegegrad 1 und gilt nachrangig, also nur, wenn kein anderer Träger zuständig ist. Das Bundesgesundheitsministerium nennt als Beispiele Türverbreiterungen, fest installierte Rampen und Treppenlifte, den pflegegerechten Umbau des Badezimmers und individuell angepasste Möbel. Leben mehrere Pflegebedürftige in einer Wohnung, gibt es für Maßnahmen am gemeinsamen Wohnumfeld ${DE.eur(W.je_massnahme)} je Person, zusammen höchstens ${DE.eur(W.max_gemeinsam)}; bei mehr als ${W.max_personen} Berechtigten wird dieser Betrag aufgeteilt. Eine Dusche für ${DE.eur(dusche.k)} kostet die Familie damit noch ${DE.eur(dusche.selbst)}. Die Kasse muss binnen ${H.entscheidung_wochen} Wochen entscheiden, mit Pflegefachperson oder Medizinischem Dienst binnen ${H.entscheidung_wochen_mit_gutachten}; ohne begründete Mitteilung gilt der Zuschuss nach Fristablauf als genehmigt.`,
    faqs: [
      { q: 'Zahlt die Pflegekasse einen Treppenlift vollständig?', a: `Nur bis zur Grenze von ${DE.eur(W.je_massnahme)} je Maßnahme. Das Bundesgesundheitsministerium nennt fest installierte Treppenlifte ausdrücklich als Beispiel für einen zuschussfähigen Umbau. Was der Lift darüber hinaus kostet, trägt die Familie selbst. Wohnen zwei Pflegebedürftige im Haus und nutzen beide den Lift, kann sich die Obergrenze verdoppeln, weil der Zuschuss dann für das gemeinsame Wohnumfeld je Person gilt.` },
      { q: 'Bekommen auch Mieter den Zuschuss für einen Badumbau?', a: 'Das Gesetz knüpft den Zuschuss an das Wohnumfeld der pflegebedürftigen Person und nennt kein Eigentum als Voraussetzung (§ 40 Abs. 4 SGB XI). Ob und unter welchen Bedingungen der Vermieter dem Umbau zustimmen muss, regelt das Mietrecht, nicht die Pflegeversicherung. Klären Sie die Zustimmung schriftlich, bevor Sie einen Handwerker beauftragen, und legen Sie sie dem Antrag bei.' },
      { q: 'Gilt der Umbauzuschuss als bewilligt, wenn die Pflegekasse schweigt?', a: `Ja, unter einer Bedingung. Die Kasse hat ${H.entscheidung_wochen} Wochen ab Antragseingang, bei Beteiligung einer Pflegefachperson oder des Medizinischen Dienstes ${H.entscheidung_wochen_mit_gutachten} Wochen. Schafft sie das nicht, muss sie rechtzeitig schriftlich mit Gründen mitteilen, warum. Kommt keine solche Mitteilung, gilt die Leistung nach Ablauf der Frist als genehmigt (§ 40 Abs. 7 SGB XI). Bewahren Sie den Nachweis über den Eingang des Antrags auf.` },
      { q: 'Wie viel Zuschuss gibt es, wenn beide Eltern einen Pflegegrad haben?', a: `Für eine Maßnahme am gemeinsamen Wohnumfeld bis zu ${DE.eur(W.je_massnahme)} je Pflegebedürftigem, bei zwei Personen also bis ${DE.eur(paar.cap)}. Eine Rampe mit verbreiterten Türen für ${DE.eur(paar.k)} wäre damit vollständig gedeckt. Beide stellen den Antrag bei ihrer eigenen Pflegekasse. Für Umbauten, die nur einem Elternteil dienen, etwa ein angepasstes Bett, gilt die einfache Grenze.` },
      { q: 'Kann man den Zuschuss für eine Wohnumfeldverbesserung zweimal bekommen?', a: 'Ja, wenn sich die Pflegesituation so verändert hat, dass erneute Maßnahmen nötig werden; so beschreibt es das Bundesgesundheitsministerium. Typisch ist ein höherer Bedarf nach einem Sturz oder einer neuen Diagnose. Wer schon heute weiß, dass Bad und Türen beide angepasst werden müssen, sollte beides im selben Antrag schildern, damit die Kasse den Bedarf vollständig prüft.' },
      { q: 'Mindert der Umbauzuschuss das Pflegegeld oder die Sachleistung?', a: 'Nein. Der Zuschuss nach § 40 Abs. 4 SGB XI ist eine eigene Leistung, für die das Gesetz keine Anrechnung auf Pflegegeld, Sachleistung oder Entlastungsbetrag vorsieht. Er wird einmal je Maßnahme gezahlt und läuft nicht monatlich. Wer bei Pflegegrad 1 eingestuft ist, kann ihn genauso beantragen; dort gehört er zu den wenigen Geldleistungen überhaupt.' },
    ],
    body: (h) => `
<h2>Was als Wohnumfeldverbesserung zählt</h2>
<p>Das Gesetz formuliert offen: gefördert werden Maßnahmen zur Verbesserung des individuellen Wohnumfeldes, beispielsweise technische Hilfen im Haushalt, wenn dadurch im Einzelfall die häusliche Pflege ermöglicht oder erheblich erleichtert wird oder die pflegebedürftige Person wieder möglichst selbständig leben kann (${h.src('sgb11_40', '§ 40 Abs. 4 SGB XI')}). Es ist eine Kann-Leistung, und sie ist nachrangig. Das Ministerium nennt als Ziel ausdrücklich auch, eine Überforderung der Pflegepersonen zu verhindern (${h.src('bmgWohnung', 'BMG, Zuschüsse zur Wohnungsanpassung')}). Ein Umbau, der nur der Tochter das Heben erspart, kann also genauso zählen wie einer, der dem Vater das Duschen allein erlaubt.</p>
${h.table(['Vorhaben', 'Weg der Finanzierung', 'Grundlage'], [
  ['Türverbreiterung, fest installierte Rampe, Treppenlift', `Zuschuss bis ${h.eur(W.je_massnahme)} je Maßnahme`, '§ 40 Abs. 4 SGB XI'],
  ['pflegegerechter Umbau des Badezimmers', `Zuschuss bis ${h.eur(W.je_massnahme)} je Maßnahme`, '§ 40 Abs. 4 SGB XI'],
  ['Möbel, die für die Pflegesituation eigens angefertigt oder umgebaut werden', 'Zuschuss', '§ 40 Abs. 4 SGB XI'],
  ['Pflegebett, Lagerungshilfen', 'technisches Pflegehilfsmittel, meist geliehen', '§ 40 Abs. 3 SGB XI'],
  ['Einmalhandschuhe, Bettschutzeinlagen', `Verbrauchspauschale bis ${h.eur(H.verbrauch_monat)} im Monat`, '§ 40 Abs. 2 SGB XI'],
  ['ärztlich verordneter Rollstuhl', 'Krankenkasse', 'SGB V'],
], 'Welche Kasse welches Vorhaben trägt; Beispiele nach Gesetz und Bundesgesundheitsministerium.', ['l', 'l', 'l'])}
<p>Die Abgrenzung zum ${h.a('pflegehilfsmittel', 'Pflegehilfsmittel')} folgt einer einfachen Faustregel: Was mit der Wohnung fest verbunden wird oder in die Bausubstanz eingreift, ist ein Umbau; was man wieder abholen und anderswo aufstellen kann, ist ein Hilfsmittel. Das Ministerium beschreibt die zuschussfähigen Maßnahmen als solche, die mit wesentlichen Eingriffen in die Bausubstanz verbunden sein können, und ergänzt den festen Einbau bestimmter technischer Hilfen.</p>

<h2>Was der Zuschuss bei typischen Kosten deckt</h2>
${h.table(['Vorhaben (Preis angenommen)', 'Kosten', 'Berechtigte', 'Zuschuss', 'Eigenanteil'],
  R.map((r) => [r.de, h.eur(r.k), r.n, h.eur(r.zuschuss), h.eur(r.selbst)]),
  `Rechnung des Motors nach § 40 Abs. 4 SGB XI: ${h.eur(W.je_massnahme)} je Person, gemeinsames Wohnumfeld höchstens ${h.eur(W.max_gemeinsam)}. Die Preise sind Rechenannahmen, keine Marktwerte.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Der Eigenanteil hängt also fast nur an zwei Größen: am Preis und an der Zahl der Pflegebedürftigen, die von derselben Maßnahme profitieren. Bei einer einzelnen Person ist die Grenze schnell erreicht. Wer mehrere Angebote einholt, sieht schnell, wie viel über dem Zuschuss bleibt, und kann mit diesem Betrag planen.</p>

<h2>Mehrere Pflegebedürftige unter einem Dach</h2>
<p>Leben mehrere Pflegebedürftige in einer gemeinsamen Wohnung, darf der Zuschuss für Maßnahmen am gemeinsamen Wohnumfeld ${h.eur(W.je_massnahme)} je Person betragen. Der Gesamtbetrag je Maßnahme endet bei ${h.eur(W.max_gemeinsam)}; sind mehr als ${W.max_personen} Personen berechtigt, wird er anteilig auf deren Versicherungsträger verteilt. Das Ministerium rechnet das am Beispiel einer Wohngemeinschaft mit acht Pflegebedürftigen vor; unser Motor kommt auf dasselbe Ergebnis: ${h.eur(acht.proPerson)} je Person. Für neu gegründete Wohngruppen kommt eine einmalige Anschubfinanzierung von bis zu ${h.eur(A.je_person)} je Person hinzu, höchstens ${h.eur(A.max_wohngruppe)} je Gruppe (${h.src('sgb11_45g', '§ 45g SGB XI')}). Mehr dazu beim ${h.a('wohngruppenzuschlag', 'Wohngruppenzuschlag')}.</p>

<h2>Fristen und Prüfung durch die Kasse</h2>
<p>Die Kasse kann die Notwendigkeit unter Beteiligung einer Pflegefachperson oder des Medizinischen Dienstes prüfen lassen; das Gesetz verweist dafür auf die Regel bei den Hilfsmitteln. Über den Antrag muss sie zügig entscheiden, spätestens nach ${H.entscheidung_wochen} Wochen, mit dieser Prüfung nach ${H.entscheidung_wochen_mit_gutachten} Wochen. Kann sie die Frist nicht halten, teilt sie das rechtzeitig schriftlich und mit Gründen mit. Fehlt eine solche Mitteilung, gilt die Leistung als genehmigt (§ 40 Abs. 7). Weil die Frist kurz ist, kostet es wenig Zeit, den Bescheid abzuwarten, bevor der Handwerker anfängt; die Familie weiß dann vorher, womit sie rechnen kann.</p>
<!--mini:hilfsmittel-->

<h2>Pflegegrad 1 und der Umbau</h2>
<p>Der Umbauzuschuss gehört zu den Leistungen, die das Gesetz ausdrücklich auch bei Pflegegrad 1 gewährt (${h.src('sgb11_28a', '§ 28a SGB XI')}). Gerade in diesem Stadium lohnt er sich: Ein Haltegriff an der richtigen Stelle oder eine Dusche ohne Rand kann einen Sturz verhindern, der sonst den Weg in einen höheren Grad beschleunigt. Wer noch keinen Pflegegrad hat, stellt zuerst den Antrag auf Einstufung (${h.a('pflegegrad-beantragen', 'Pflegegrad beantragen')}); ohne Pflegegrad gibt es keinen Zuschuss.</p>

<h2>Wenn sich die Lage ändert</h2>
<p>Ein zweiter Zuschuss ist möglich, wenn sich die Pflegesituation so verändert hat, dass erneute Maßnahmen nötig werden. Ein Beispiel: Zuerst reichte ein Duschsitz, zwei Jahre später braucht der Vater einen Treppenlift, weil er die Stufen nicht mehr schafft. Bei der Pflegefachperson, die zum ${h.a('beratungseinsatz', 'Beratungseinsatz')} kommt, lässt sich ein solcher neuer Bedarf früh ansprechen.</p>

<h2>Drei Fehler, die Geld kosten</h2>
<p><strong>Bauen, bevor der Pflegegrad feststeht.</strong> Der Zuschuss setzt einen festgestellten Pflegegrad voraus. Wer während des laufenden Einstufungsverfahrens schon die Handwerker bestellt, trägt das Risiko, dass die Einstufung ausbleibt und die Rechnung vollständig bei der Familie landet.</p>
<p><strong>Hilfsmittel als Umbau planen.</strong> Manches, was Angehörige für einen Umbau halten, ist ein Pflegehilfsmittel, etwa ein Pflegebett oder ein Lagerungskissen. Dafür gibt es einen eigenen Anspruch, der die Obergrenze von ${h.eur(W.je_massnahme)} nicht berührt. Wer beides sauber trennt, hat mehr Spielraum für die eigentlichen Bauarbeiten.</p>
<p><strong>Die gemeinsame Nutzung verschweigen.</strong> Dient eine Rampe oder ein umgebautes Bad zwei Pflegebedürftigen, gehört das in den Antrag. Nur dann rechnet die Kasse mit dem Rahmen je Person und nicht mit der einfachen Grenze. Bei Ehepaaren mit unterschiedlichen Kassen sollten beide Anträge dieselbe Maßnahme und denselben Kostenvoranschlag nennen.</p>

<h2>So gehen Sie vor</h2>
<ol>
<li>Den Bedarf beschreiben: Was genau gelingt in der Wohnung nicht mehr, und wie würde der Umbau helfen?</li>
<li>Ein oder zwei Kostenvoranschläge einholen; Mieter holen zusätzlich die schriftliche Zustimmung des Vermieters ein.</li>
<li>Den Antrag mit Kostenvoranschlag bei der Pflegekasse einreichen und das Eingangsdatum notieren.</li>
<li>Nach ${H.entscheidung_wochen} Wochen ohne Bescheid oder begründete Mitteilung nachfragen und auf § 40 Abs. 7 hinweisen.</li>
<li>Bescheid und Handwerkerrechnung aufbewahren; wie und an wen die Kasse auszahlt, steht im Bescheid.</li>
</ol>
`,
  },
  en: {
    slug: 'home-adaptation-grant',
    nav: 'Home adaptation grant',
    card: `Up to ${EN.eur(W.je_massnahme)} per measure for a shower, ramp or stairlift, up to ${EN.eur(W.max_gemeinsam)} when several people with a care grade share a home.`,
    title: `Wohnumfeldverbesserung 2026: ${EN.eur(W.je_massnahme)} Home Adaptation Grant`,
    description: `German home adaptation grant 2026: up to ${EN.eur(W.je_massnahme)} per measure from care grade 1, up to ${EN.eur(W.max_gemeinsam)} for a shared home, decision in ${H.entscheidung_wochen} weeks, with worked examples.`,
    h1: 'Home adaptation grant: what the German care fund pays towards building work',
    intro: 'One step fewer, a wider door, a shower without a rim: what the care fund contributes, how fast it must decide and what applies when several residents need care.',
    resume: `For building work that makes care at home possible, makes it considerably easier or restores the most independent life possible, the German long-term care fund can pay a grant of up to ${EN.eur(W.je_massnahme)} per measure (Wohnumfeldverbesserung, section 40(4) of Book XI of the Social Code, SGB XI). The entitlement starts at care grade 1 and is subsidiary, so it applies only where no other body is responsible. The Federal Ministry of Health gives widened doors, permanently installed ramps and stairlifts, a bathroom converted for care and furniture adapted to the individual as examples. Where several people with a care grade share a home, work on the shared space can receive ${EN.eur(W.je_massnahme)} per person, at most ${EN.eur(W.max_gemeinsam)} in total; with more than ${W.max_personen} entitled people that sum is split. A shower costing ${EN.eur(dusche.k)} thus leaves the family ${EN.eur(dusche.selbst)} to pay. The fund must decide within ${H.entscheidung_wochen} weeks, or ${H.entscheidung_wochen_mit_gutachten} with a nurse or the Medical Service involved; without a reasoned notice the grant counts as approved once the deadline passes.`,
    faqs: [
      { q: 'Does the German care fund pay for a stairlift in full?', a: `Only up to the cap of ${EN.eur(W.je_massnahme)} per measure. The Federal Ministry of Health names permanently installed stairlifts explicitly as an example of eligible work. Anything the lift costs beyond that is paid by the family. If two people with a care grade live in the house and both use the lift, the cap can double, because the grant for a shared living space applies per person.` },
      { q: 'Can tenants get the bathroom adaptation grant as well?', a: 'The law ties the grant to the living environment of the person needing care and does not require ownership (section 40(4) SGB XI). Whether and on what terms the landlord must agree to the work is a matter of tenancy law, not care insurance. Get the landlord’s consent in writing before hiring a tradesperson and attach it to the application to avoid delays.' },
      { q: 'Is the adaptation grant approved if the fund stays silent?', a: `Yes, on one condition. The fund has ${H.entscheidung_wochen} weeks from receipt, or ${H.entscheidung_wochen_mit_gutachten} weeks if a nurse or the Medical Service is involved. If it cannot meet the deadline it must say so in good time, in writing and with reasons. Without such a notice the benefit counts as approved when the deadline expires (section 40(7) SGB XI). Keep proof of the date your application arrived.` },
      { q: 'How much is the grant when both parents have a care grade?', a: `For work on the shared living space, up to ${EN.eur(W.je_massnahme)} per person, so up to ${EN.eur(paar.cap)} for two. A ramp with widened doors costing ${EN.eur(paar.k)} would be fully covered. Each parent applies to their own care fund. For changes that serve only one parent, such as an adapted bed frame, the single cap applies.` },
      { q: 'Can the home adaptation grant be paid a second time?', a: 'Yes, if the care situation has changed so much that new measures are needed; that is how the Federal Ministry of Health puts it. A typical case is greater need after a fall or a new diagnosis. If you already know that both the bathroom and the doors must change, describe both in the same application so the fund assesses the whole need at once.' },
      { q: 'Does the adaptation grant reduce the monthly care allowance?', a: 'No. The grant under section 40(4) SGB XI is a separate benefit, and the law provides for no offset against the care allowance, the services budget or the relief amount. It is paid once per measure rather than monthly. People at care grade 1 can apply in the same way; for them it is one of the very few cash benefits available.' },
    ],
    body: (h) => `
<h2>What counts as a home adaptation</h2>
<p>The law is worded openly: the fund can support measures that improve the individual living environment, for example technical aids in the household, where this makes care at home possible or considerably easier, or lets the person live as independently as possible again (${h.src('sgb11_40', 'section 40(4) SGB XI')}). It is a discretionary benefit and subsidiary to other schemes. The ministry also names preventing carers from being overstretched as an explicit aim (${h.src('bmgWohnung', 'BMG, grants for home adaptation')}). Work that only spares a daughter from lifting can therefore count as much as work that lets a father shower alone.</p>
${h.table(['Project', 'How it is funded', 'Basis'], [
  ['widened door, fixed ramp, stairlift', `grant up to ${h.eur(W.je_massnahme)} per measure`, 'section 40(4) SGB XI'],
  ['bathroom converted for care', `grant up to ${h.eur(W.je_massnahme)} per measure`, 'section 40(4) SGB XI'],
  ['furniture made or rebuilt for the care situation', 'grant', 'section 40(4) SGB XI'],
  ['care bed, positioning aids', 'technical care aid, usually lent', 'section 40(3) SGB XI'],
  ['disposable gloves, bed pads', `consumables allowance up to ${h.eur(H.verbrauch_monat)} a month`, 'section 40(2) SGB XI'],
  ['wheelchair prescribed by a doctor', 'health insurance', 'SGB V'],
], 'Which fund pays for which project; examples from the law and the Federal Ministry of Health.', ['l', 'l', 'l'])}
<p>The line between this grant and ${h.a('pflegehilfsmittel', 'care aids')} follows a simple rule of thumb: anything fixed to the home or changing its structure is an adaptation; anything that can be collected and set up elsewhere is an aid. The ministry describes eligible measures as those that may involve substantial changes to the fabric of the building and adds the fixed installation of certain technical aids.</p>

<h2>What the grant covers at typical prices</h2>
${h.table(['Project (assumed price)', 'Cost', 'Entitled people', 'Grant', 'You pay'],
  R.map((r) => [r.en, h.eur(r.k), r.n, h.eur(r.zuschuss), h.eur(r.selbst)]),
  `Engine calculation under section 40(4) SGB XI: ${h.eur(W.je_massnahme)} per person, shared space at most ${h.eur(W.max_gemeinsam)}. Prices are assumptions for the calculation, not market data.`, ['l', 'r', 'r', 'r', 'r'])}
<p>The family’s share depends almost entirely on two things: the price and the number of people with a care grade who benefit from the same work. For one person the cap is reached quickly. Comparing two quotes shows at once how much will be left above the grant, and that is the figure to budget for, whether you are on site or organising the work from abroad.</p>

<h2>Several people with a care grade under one roof</h2>
<p>Where several people with a care grade live in one home, the grant for work on the shared living space can reach ${h.eur(W.je_massnahme)} per person. The total per measure stops at ${h.eur(W.max_gemeinsam)}; with more than ${W.max_personen} entitled residents it is shared out among their insurers. The ministry works this through for a shared flat with eight residents needing care, and our engine reaches the same result: ${h.eur(acht.proPerson)} per person. Newly founded shared care flats can also receive a one-off start-up grant of up to ${h.eur(A.je_person)} per person, at most ${h.eur(A.max_wohngruppe)} per flat (${h.src('sgb11_45g', 'section 45g SGB XI')}). More on the ${h.a('wohngruppenzuschlag', 'shared-flat supplement')} page.</p>

<h2>Deadlines and the fund’s review</h2>
<p>The fund may have the need checked by a registered nurse or the Medical Service; the law refers to the rule for care aids. It must decide promptly, at the latest after ${H.entscheidung_wochen} weeks, or after ${H.entscheidung_wochen_mit_gutachten} weeks with such a review. If it cannot meet the deadline it must tell you in writing, in good time and with reasons. Without that notice the benefit counts as approved (section 40(7)). Because the deadline is short, waiting for the decision before work starts costs little time and tells the family in advance what it can count on.</p>
<!--mini:hilfsmittel-->

<h2>Care grade 1 and building work</h2>
<p>The adaptation grant is one of the benefits the law expressly grants at care grade 1 (${h.src('sgb11_28a', 'section 28a SGB XI')}). It is particularly useful at that stage: a grab rail in the right place or a shower without a rim can prevent a fall that would otherwise speed up the move to a higher grade. Without a care grade there is no grant, so the first step is the assessment (${h.a('pflegegrad-beantragen', 'applying for a care grade')}).</p>

<h2>When the situation changes</h2>
<p>A second grant is possible if the care situation has changed so that new measures become necessary. For example, a shower seat was enough at first, but two years later the father needs a stairlift because he can no longer manage the steps. The nurse who comes for the ${h.a('beratungseinsatz', 'home advice visit')} is a good person to raise such a new need with early on.</p>

<h2>Three mistakes that cost money</h2>
<p><strong>Building before the care grade is decided.</strong> The grant requires an established care grade. Anyone who books tradespeople while the assessment is still running takes the risk that no grade is awarded and the whole invoice stays with the family.</p>
<p><strong>Planning an aid as building work.</strong> Some things relatives think of as an adaptation are really care aids, such as a care bed or positioning cushions. They come under a separate entitlement that does not touch the ${h.eur(W.je_massnahme)} cap. Keeping the two apart leaves more room for the actual building work.</p>
<p><strong>Not mentioning shared use.</strong> If a ramp or a converted bathroom serves two people with a care grade, say so in the application. Only then does the fund calculate with the per-person limit rather than the single cap. Where spouses are insured with different funds, both applications should name the same measure and the same quote.</p>

<h2>How to go about it</h2>
<ol>
<li>Describe the need: what exactly no longer works in the home, and how would the change help?</li>
<li>Get one or two written quotes; tenants also obtain the landlord’s written consent.</li>
<li>Send the application with the quote to the care fund and note the date of receipt.</li>
<li>If after ${H.entscheidung_wochen} weeks there is neither a decision nor a reasoned notice, follow up and refer to section 40(7).</li>
<li>Keep the decision letter and the final invoice; how and to whom the fund pays is set out in the decision.</li>
</ol>
`,
  },
});
