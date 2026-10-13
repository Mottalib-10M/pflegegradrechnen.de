import { defineGuide } from '../../lib/guide-types';
import { hilfsmittelZuzahlung } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Zuzahlung für technische Hilfsmittel zu verschiedenen Preisen. */
const H = P.pflegehilfsmittel, R = P.hilfsmittel_regeln;
const V = H.verbrauch_monat;
const PREISE = [60, 150, 250, 900, 2500];
const z250 = hilfsmittelZuzahlung(250), z900 = hilfsmittelZuzahlung(900);
/** Preis, ab dem die Höchstzuzahlung greift. */
const kappe = H.zuzahlung_max / H.zuzahlung_anteil;

export default defineGuide({
  id: 'pflegehilfsmittel',
  group: 'zuhause',
  order: 80,
  mini: 'hilfsmittel',
  related: ['wohnumfeldverbesserung', 'pflegegrad-1', 'beratungseinsatz', 'begutachtung-medizinischer-dienst', 'digitale-pflegeanwendungen', 'pflegesachleistung'],
  sources: ['sgb11_40', 'sgb11_78', 'sgb11_28a', 'sgb11_17a', 'bmgHilfsmittel'],
  de: {
    slug: 'pflegehilfsmittel',
    nav: 'Pflegehilfsmittel',
    card: `Bis ${DE.eur(V)} im Monat für Handschuhe und Bettschutz, technische Hilfen wie das Pflegebett leihweise, Zuzahlung höchstens ${DE.eur(H.zuzahlung_max)}.`,
    title: 'Pflegehilfsmittel 2026: Pauschale, Pflegebett, Antrag',
    description: `Pflegehilfsmittel 2026: bis ${DE.eur(V)} im Monat für Verbrauchsprodukte, technische Hilfen meist leihweise, ${DE.pct(H.zuzahlung_anteil, 0)} Zuzahlung, höchstens ${DE.eur(H.zuzahlung_max)}. Fristen und Genehmigung.`,
    h1: 'Pflegehilfsmittel: was die Pflegekasse liefert und bezahlt',
    intro: 'Vom Einmalhandschuh bis zum Pflegebett: zwei Arten von Hilfsmitteln, zwei Regeln für die Kosten und eine Frist, nach der ein Antrag als genehmigt gilt.',
    resume: `Pflegehilfsmittel sind Geräte und Sachmittel, die die Pflege zu Hause erleichtern, Beschwerden lindern oder eine selbständigere Lebensführung ermöglichen (§ 40 SGB XI). Der Anspruch besteht ab Pflegegrad 1 und nur, soweit nicht die Krankenkasse zuständig ist. Das Gesetz unterscheidet zwei Gruppen. Für Produkte zum Verbrauch wie Einmalhandschuhe oder Bettschutzeinlagen zahlt die Pflegekasse bis zu ${DE.eur(V)} im Monat, ${DE.eur(V * 12)} im Jahr, ohne Zuzahlung. Technische Pflegehilfsmittel wie Pflegebett, Lagerungshilfen oder ein Notrufsystem soll die Kasse vorrangig leihweise überlassen; Volljährige zahlen ${DE.pct(H.zuzahlung_anteil, 0)} der Kosten zu, höchstens ${DE.eur(H.zuzahlung_max)} je Hilfsmittel, bei ${DE.eur(250)} also ${DE.eur(z250)}, bei ${DE.eur(900)} nur ${DE.eur(z900)}. Über den Antrag entscheidet die Kasse binnen ${H.entscheidung_wochen} Wochen, mit Gutachten binnen ${H.entscheidung_wochen_mit_gutachten}. Teilt sie keinen hinreichenden Grund für eine Verzögerung mit, gilt die Leistung nach Fristablauf als genehmigt. Empfiehlt eine Pflegefachperson das Hilfsmittel, wird die Notwendigkeit vermutet.`,
    faqs: [
      { q: 'Welche Produkte zum Verbrauch bezahlt die Pflegekasse jeden Monat?', a: `Produkte, die nach einmaligem Gebrauch weggeworfen werden und die Pflege zu Hause erleichtern; das Bundesgesundheitsministerium nennt als Beispiele Einmalhandschuhe und Bettschutzeinlagen. Welche Produkte genau dazugehören, ergibt sich aus dem Pflegehilfsmittelverzeichnis der Pflegekassen (§ 78 SGB XI), in dem die Produktgruppen aufgeführt sind. Die Grenze liegt bei ${DE.eur(V)} im Monat; teurere Mengen zahlt die Familie selbst.` },
      { q: 'Muss ein Pflegebett gekauft werden, oder stellt die Kasse es leihweise?', a: 'Die Pflegekasse soll technische Pflegehilfsmittel in allen geeigneten Fällen vorrangig leihen (§ 40 Abs. 3 SGB XI). Ein Pflegebett kommt deshalb meist als Leihgerät, wird geliefert, aufgebaut und später wieder abgeholt. Reparatur, Ersatz und die Einweisung im Gebrauch gehören zum Anspruch. Wer die Leihe ohne zwingenden Grund ablehnt und lieber kauft, trägt die Kosten vollständig selbst.' },
      { q: 'Was gilt, wenn die Pflegekasse die Entscheidungsfrist verstreichen lässt?', a: `Die Kasse muss über einen Antrag auf Pflegehilfsmittel spätestens nach ${H.entscheidung_wochen} Wochen entscheiden, wenn eine Pflegefachperson oder der Medizinische Dienst beteiligt ist nach ${H.entscheidung_wochen_mit_gutachten} Wochen. Kann sie das nicht, muss sie rechtzeitig schriftlich und mit Gründen Bescheid geben. Fehlt eine solche Mitteilung, gilt die Leistung nach Ablauf der Frist als genehmigt (§ 40 Abs. 7 SGB XI). Notieren Sie deshalb das Datum des Antragseingangs.` },
      { q: 'Wer zahlt den Rollator, die Pflegekasse oder die Krankenkasse?', a: 'In der Regel die Krankenkasse. Rollstühle und Gehhilfen, die ein Arzt verordnet, sind Hilfsmittel der Krankenversicherung, nicht der Pflegeversicherung. Die Pflegekasse springt nur ein, wenn kein anderer Träger zuständig ist. Bei Produkten, die beiden Zwecken dienen, prüft die Stelle, bei der der Antrag eingeht, wer zahlt, und entscheidet selbst (§ 40 Abs. 5 SGB XI). Ein Antrag bei der falschen Kasse geht also nicht verloren.' },
      { q: 'Zählt ein Hausnotruf zu den Pflegehilfsmitteln?', a: 'Das Bundesgesundheitsministerium nennt Notrufsysteme ausdrücklich als Beispiel für technische Pflegehilfsmittel. Ob und in welcher Höhe die Kasse ein bestimmtes Gerät und die laufenden Gebühren übernimmt, ergibt sich aus dem Pflegehilfsmittelverzeichnis und dem Bescheid; einen Betrag nennen wir hier bewusst nicht. Stellen Sie den Antrag vor Vertragsschluss mit einem Anbieter, damit die Kasse vorher entscheiden kann.' },
      { q: 'Kann man sich von der Zuzahlung für technische Hilfsmittel befreien lassen?', a: `Ja. Wer die Belastungsgrenze der Krankenversicherung nach § 62 SGB V erreicht, zahlt für den übersteigenden Betrag nichts mehr zu, und in Härtefällen kann die Kasse ganz oder teilweise befreien (§ 40 Abs. 3 SGB XI). Kinder und Jugendliche unter ${R.zuzahlung_ab_alter} Jahren zahlen ohnehin nichts zu. Für Verbrauchsprodukte bis ${DE.eur(V)} gibt es keine Zuzahlung.` },
    ],
    body: (h) => `
<h2>Zwei Arten von Pflegehilfsmitteln</h2>
<p>Die Pflegeversicherung unterscheidet technische Pflegehilfsmittel und Produkte zum Verbrauch (${h.src('bmgHilfsmittel', 'BMG, Pflegehilfsmittel')}). Technisch sind Geräte, die lange halten; das Ministerium nennt das Pflegebett, Lagerungshilfen und ein Notrufsystem. Zum Verbrauch bestimmt sind Dinge, die nach einmaligem Gebrauch in den Müll wandern, vor allem Einmalhandschuhe und saugende Bettschutzeinlagen. Für beide Gruppen gelten eigene Regeln bei den Kosten.</p>
${h.table(['', 'Produkte zum Verbrauch', 'Technische Pflegehilfsmittel'], [
  ['Beispiele', 'Einmalhandschuhe, Bettschutzeinlagen', 'Pflegebett, Lagerungshilfen, Notrufsystem'],
  ['Kassenleistung', `bis ${h.eur(V)} im Monat`, 'Leihe oder Kauf, Reparatur und Ersatz inklusive'],
  ['Zuzahlung', 'keine', `${h.pct(H.zuzahlung_anteil, 0)}, höchstens ${h.eur(H.zuzahlung_max)} je Hilfsmittel, ab ${R.zuzahlung_ab_alter} Jahren`],
  ['Form', 'Lieferung oder Kostenerstattung', 'vorrangig leihweise'],
  ['Grundlage', '§ 40 Abs. 2 SGB XI', '§ 40 Abs. 3 SGB XI'],
], 'Regeln für Pflegehilfsmittel 2026 nach § 40 SGB XI.', ['l', 'l', 'l'])}
<p>Welche Produkte im Einzelnen erfasst sind, steht im Pflegehilfsmittelverzeichnis, das der Spitzenverband der Pflegekassen als Anlage zum Hilfsmittelverzeichnis führt (${h.src('sgb11_78', '§ 78 SGB XI')}). Geräte, die sich zur Leihe eignen, sind dort gesondert gekennzeichnet. Das Ministerium beschreibt das Verzeichnis als Orientierung darüber, welche Pflegehilfsmittel zur Verfügung gestellt oder verliehen werden. Neuartige Produkte können auf Antrag des Herstellers aufgenommen werden; der Spitzenverband entscheidet darüber binnen drei Monaten nach Vorlage der Unterlagen.</p>

<h2>Was die Zuzahlung tatsächlich ausmacht</h2>
${h.table(['Preis des technischen Hilfsmittels', 'Zuzahlung', 'Kasse zahlt'],
  PREISE.map((p) => [h.eur(p), h.eur(hilfsmittelZuzahlung(p), 2), h.eur(p - hilfsmittelZuzahlung(p), 2)]),
  `Zuzahlung ${h.pct(H.zuzahlung_anteil, 0)} des Preises, höchstens ${h.eur(H.zuzahlung_max)}; ab einem Preis von ${h.eur(kappe)} greift die Obergrenze.`, ['r', 'r', 'r'])}
<p>Bei teuren Geräten ist die Zuzahlung im Verhältnis klein, weil sie bei ${h.eur(H.zuzahlung_max)} endet. Gezahlt wird sie an die abgebende Stelle, also an den Lieferanten, nicht an die Kasse. Die Kasse kann in Härtefällen befreien, und wer die Belastungsgrenze nach § 62 SGB V erreicht, zahlt darüber hinaus nichts mehr. Wer bewusst eine bessere Ausstattung wählt als nötig, etwa ein Bett mit Zusatzfunktionen, trägt die Mehrkosten und die Folgekosten selbst (${h.src('sgb11_40', '§ 40 Abs. 1 SGB XI')}).</p>

<h2>Die Monatspauschale für Verbrauchsprodukte</h2>
<p>Bis zu ${h.eur(V)} im Monat stehen für Verbrauchsprodukte bereit, ab Pflegegrad 1 (${h.src('sgb11_28a', '§ 28a SGB XI')}). Die Kasse kann die Produkte liefern lassen oder die Kosten erstatten (§ 40 Abs. 2). In der Praxis läuft das oft über einen Lieferanten, der mit der Kasse abrechnet und monatlich liefert. Wer mehr braucht, als die Pauschale deckt, zahlt die Differenz. Der Betrag wird nicht angespart; was ein Monat nicht verbraucht, verfällt. Die Pauschale mindert weder Pflegegeld noch Sachleistung.</p>

<h2>Abgrenzung zur Krankenkasse</h2>
<p>Die Pflegekasse zahlt nur, soweit nicht die Krankenversicherung oder ein anderer Träger wegen Krankheit oder Behinderung zuständig ist. Ärztlich verordnete Rollstühle und Gehhilfen trägt die Krankenkasse. Weil die Grenze im Alltag schwer zu ziehen ist, regelt das Gesetz einen einfachen Weg: Die Stelle, bei der der Antrag eingeht, prüft, ob Kranken- oder Pflegekasse zuständig ist, und entscheidet (${h.src('sgb11_40', '§ 40 Abs. 5 SGB XI')}). Ein Antrag bei der „falschen“ Kasse ist also kein Fehler.</p>

<h2>Der schnellste Weg zum Hilfsmittel</h2>
<p>Seit den letzten Reformen gibt es drei Abkürzungen. Erstens: Empfiehlt der Medizinische Dienst im Gutachten zum Pflegegrad bestimmte Hilfsmittel, gilt die Empfehlung mit Zustimmung der versicherten Person als Antrag, und die Notwendigkeit gilt als bestätigt (${h.src('bmgHilfsmittel', 'BMG')}). Zweitens: Eine Pflegefachperson kann bei ihren Einsätzen, etwa beim ${h.a('beratungseinsatz', 'Beratungseinsatz')}, eine konkrete Empfehlung abgeben. Liegt sie dem Antrag bei und ist sie nicht älter als ${R.empfehlung_max_wochen} Wochen, wird die Notwendigkeit unter den Voraussetzungen der Richtlinien nach ${h.src('sgb11_17a', '§ 17a SGB XI')} vermutet, eine ärztliche Verordnung ist dann nicht nötig (§ 40 Abs. 6). Drittens: Die Entscheidungsfrist. Die Kasse hat ${H.entscheidung_wochen} Wochen, mit Beteiligung einer Pflegefachperson oder des Medizinischen Dienstes ${H.entscheidung_wochen_mit_gutachten} Wochen. Ohne begründete schriftliche Mitteilung gilt der Antrag nach Fristablauf als genehmigt (§ 40 Abs. 7).</p>
<!--mini:wohnumfeld-->

<h2>Wenn ein Hilfsmittel nicht reicht</h2>
<p>Manchmal hilft kein Gerät, sondern nur ein Umbau: eine bodengleiche Dusche statt einer Badewanne, ein Treppenlift, breitere Türen. Dafür gibt es einen eigenen Zuschuss bis ${h.eur(P.wohnumfeld.je_massnahme)} je Maßnahme, die ${h.a('wohnumfeldverbesserung', 'Wohnumfeldverbesserung')}. Auch hier gelten dieselben Fristen von ${H.entscheidung_wochen} und ${H.entscheidung_wochen_mit_gutachten} Wochen. Wer bei Pflegegrad 1 eingestuft ist, hat ebenfalls Anspruch auf beides; Pflegehilfsmittel und Umbauzuschuss gehören zu den wenigen Leistungen dieses Grades (${h.a('pflegegrad-1', 'Pflegegrad 1')}).</p>
<p>Ein Wort zu digitalen Hilfen: Apps und Webanwendungen, die im Verzeichnis des BfArM stehen, laufen nicht über § 40, sondern über einen eigenen Anspruch. Mehr dazu unter ${h.a('digitale-pflegeanwendungen', 'Digitale Pflegeanwendungen')}.</p>

<h2>Checkliste für den Antrag</h2>
<ol>
<li>Beim Hausbesuch des Medizinischen Dienstes den Bedarf an Hilfsmitteln offen ansprechen und der Weiterleitung als Antrag zustimmen.</li>
<li>Für weitere Geräte die Empfehlung einer Pflegefachperson einholen und innerhalb von ${R.empfehlung_max_wochen} Wochen mit dem formlosen Antrag einreichen.</li>
<li>Das Eingangsdatum notieren und nach ${H.entscheidung_wochen} Wochen nachfragen, wenn kein Bescheid gekommen ist.</li>
<li>Für Verbrauchsprodukte einen Lieferanten wählen, der mit der Pflegekasse abrechnet, und die Menge an die Monatspauschale anpassen.</li>
</ol>
`,
  },
  en: {
    slug: 'care-aids',
    nav: 'Care aids',
    card: `Up to ${EN.eur(V)} a month for gloves and bed pads, technical aids such as a care bed on loan, co-payment capped at ${EN.eur(H.zuzahlung_max)}.`,
    title: 'Pflegehilfsmittel 2026: Care Aids, Monthly Allowance, Beds',
    description: `German care aids (Pflegehilfsmittel) 2026: up to ${EN.eur(V)} a month for consumables, technical aids mostly on loan, ${EN.pct(H.zuzahlung_anteil, 0)} co-payment capped at ${EN.eur(H.zuzahlung_max)}. Deadlines.`,
    h1: 'Care aids in Germany: what the care fund supplies and pays',
    intro: 'From disposable gloves to a care bed: two kinds of aids, two cost rules and a deadline after which an application counts as approved.',
    resume: `Care aids (Pflegehilfsmittel) are devices and supplies that make care at home easier, relieve discomfort or allow a more independent life (section 40 of Book XI of the German Social Code, SGB XI). The entitlement starts at care grade 1 and applies only where health insurance is not responsible. The law distinguishes two groups. For consumables such as disposable gloves or absorbent bed pads, the long-term care fund pays up to ${EN.eur(V)} a month, ${EN.eur(V * 12)} a year, with no co-payment. Technical aids such as a care bed, positioning aids or an alarm system should preferably be lent; adults pay ${EN.pct(H.zuzahlung_anteil, 0)} of the cost, at most ${EN.eur(H.zuzahlung_max)} per item, so ${EN.eur(z250)} on ${EN.eur(250)} and only ${EN.eur(z900)} on ${EN.eur(900)}. The fund must decide within ${H.entscheidung_wochen} weeks, or ${H.entscheidung_wochen_mit_gutachten} weeks with an expert review. If it gives no adequate written reason for a delay, the aid counts as approved once the deadline passes. A recommendation by a registered nurse creates a presumption of need.`,
    faqs: [
      { q: 'Which disposable supplies does the German care fund pay for each month?', a: `Items thrown away after one use that make home care easier; the Federal Ministry of Health gives disposable gloves and bed pads as examples. The exact list follows the official directory of care aids kept by the care funds (section 78 SGB XI), which sets out the product groups. The cap is ${EN.eur(V)} a month; larger quantities are paid by the family, and an unused month does not carry over.` },
      { q: 'Do we have to buy a care bed, or is it lent?', a: 'The fund should lend technical aids wherever suitable (section 40(3) SGB XI). A care bed therefore usually arrives on loan, delivered, assembled and later collected. Repairs, replacement and instruction in its use are included. Anyone who refuses the loan without a compelling reason and prefers to buy pays the full cost, so accept the loan unless there is a real reason not to.' },
      { q: 'What if the care fund misses its deadline on an aid application?', a: `The fund must decide within ${H.entscheidung_wochen} weeks, or ${H.entscheidung_wochen_mit_gutachten} weeks if a nurse or the Medical Service is involved. If it cannot, it must tell you in good time, in writing and with reasons. Without such a notice the aid counts as approved once the deadline passes (section 40(7) SGB XI). Keep a record of the date the application arrived, ideally a fax or upload receipt.` },
      { q: 'Who pays for a walking frame, the care fund or health insurance?', a: 'Usually health insurance. Wheelchairs and walking aids prescribed by a doctor are health insurance aids, not care aids. The care fund only steps in where no other body is responsible. For items that serve both purposes, whichever fund receives the application checks who pays and decides (section 40(5) SGB XI), so applying to the wrong one does not lose you time.' },
      { q: 'Is a personal alarm system a care aid in Germany?', a: 'The Federal Ministry of Health names alarm systems explicitly as an example of technical care aids. Whether and how much the fund pays for a particular device and its running fees follows from the directory of aids and the decision letter; we deliberately give no amount here. Apply before signing with a provider so that the fund can decide first.' },
      { q: 'Can the co-payment on technical aids be waived?', a: `Yes. Anyone reaching the health insurance burden limit under section 62 SGB V pays nothing beyond it, and in hardship cases the fund can waive the co-payment fully or partly (section 40(3) SGB XI). Children and young people under ${R.zuzahlung_ab_alter} pay none at all. Consumables up to ${EN.eur(V)} never carry a co-payment.` },
    ],
    body: (h) => `
<h2>Two kinds of care aids</h2>
<p>German long-term care insurance distinguishes technical aids from consumables (${h.src('bmgHilfsmittel', 'BMG, care aids')}). Technical aids last; the ministry names the care bed, positioning aids and an alarm system. Consumables are thrown away after one use, above all disposable gloves and absorbent bed pads. Each group has its own cost rules, which matters when you compare offers from suppliers.</p>
${h.table(['', 'Consumables', 'Technical aids'], [
  ['Examples', 'disposable gloves, bed pads', 'care bed, positioning aids, alarm system'],
  ['Fund pays', `up to ${h.eur(V)} a month`, 'loan or purchase, repair and replacement included'],
  ['Co-payment', 'none', `${h.pct(H.zuzahlung_anteil, 0)}, at most ${h.eur(H.zuzahlung_max)} per item, from age ${R.zuzahlung_ab_alter}`],
  ['Form', 'delivery or refund', 'preferably on loan'],
  ['Basis', 'section 40(2) SGB XI', 'section 40(3) SGB XI'],
], 'Rules for care aids in 2026 under section 40 SGB XI.', ['l', 'l', 'l'])}
<p>The products covered are listed in the directory of care aids (Pflegehilfsmittelverzeichnis), kept by the national association of care funds as an annex to the health insurance aids directory (${h.src('sgb11_78', 'section 78 SGB XI')}). Items suitable for lending are marked separately. The ministry describes it as a guide to which aids are supplied or lent. New products can be added at the manufacturer’s request; the association decides within three months of receiving complete documents.</p>

<h2>What the co-payment really amounts to</h2>
${h.table(['Price of the technical aid', 'Co-payment', 'Fund pays'],
  PREISE.map((p) => [h.eur(p), h.eur(hilfsmittelZuzahlung(p), 2), h.eur(p - hilfsmittelZuzahlung(p), 2)]),
  `Co-payment ${h.pct(H.zuzahlung_anteil, 0)} of the price, at most ${h.eur(H.zuzahlung_max)}; the cap applies from a price of ${h.eur(kappe)}.`, ['r', 'r', 'r'])}
<p>For expensive devices the co-payment is small in relative terms because it stops at ${h.eur(H.zuzahlung_max)}. It is paid to the supplier, not to the fund. The fund can waive it in hardship cases, and once the burden limit under section 62 SGB V is reached nothing more is due. Anyone choosing better equipment than necessary, such as a bed with extra functions, pays the extra cost and the follow-on costs (${h.src('sgb11_40', 'section 40(1) SGB XI')}).</p>

<h2>The monthly allowance for consumables</h2>
<p>Up to ${h.eur(V)} a month is available for consumables from grade 1 (${h.src('sgb11_28a', 'section 28a SGB XI')}). The fund can have them delivered or refund the cost (section 40(2)). In practice this often runs through a supplier who bills the fund and delivers monthly, which can be arranged from abroad by phone or online. If more is needed, the family pays the difference. The amount does not build up; what a month does not use lapses. It reduces neither allowance nor services.</p>

<h2>Where health insurance takes over</h2>
<p>The care fund pays only where health insurance or another body is not responsible because of illness or disability. Wheelchairs and walking aids prescribed by a doctor are covered by health insurance. Because the boundary is hard to draw in daily life, the law offers a simple route: whichever fund receives the application checks whether health or care insurance is responsible and decides (${h.src('sgb11_40', 'section 40(5) SGB XI')}). Sending it to the “wrong” fund is therefore not a mistake.</p>

<h2>The quickest way to an aid</h2>
<p>Recent reforms created three short cuts. First, if the Medical Service recommends aids in the care grade assessment, the recommendation counts as an application with the person’s consent and the need is treated as confirmed (${h.src('bmgHilfsmittel', 'BMG')}). Second, a registered nurse (Pflegefachperson) can make a specific recommendation during visits, for example at the ${h.a('beratungseinsatz', 'advice visit')}. If it accompanies the application and is no older than ${R.empfehlung_max_wochen} weeks, the need is presumed under the guidelines of ${h.src('sgb11_17a', 'section 17a SGB XI')} and no doctor’s prescription is required (section 40(6)). Third, the deadline: ${H.entscheidung_wochen} weeks, or ${H.entscheidung_wochen_mit_gutachten} weeks with a nurse or the Medical Service involved. Without a reasoned written notice the application counts as approved once it expires (section 40(7)).</p>
<!--mini:wohnumfeld-->

<h2>When an aid is not enough</h2>
<p>Sometimes the answer is building work rather than a device: a level-access shower instead of a bath, a stairlift, wider doors. A separate grant of up to ${h.eur(P.wohnumfeld.je_massnahme)} per measure covers this, the ${h.a('wohnumfeldverbesserung', 'home adaptation grant')}, with the same ${H.entscheidung_wochen} and ${H.entscheidung_wochen_mit_gutachten} week deadlines. People at grade 1 are entitled to both; aids and the adaptation grant are among the few benefits at that grade (${h.a('pflegegrad-1', 'care grade 1')}).</p>
<p>On digital help: apps and web applications listed in the directory of the Federal Institute for Drugs and Medical Devices (BfArM) are not paid under section 40 but under a separate entitlement, explained under ${h.a('digitale-pflegeanwendungen', 'digital care apps')}.</p>

<h2>Checklist for the application</h2>
<ol>
<li>At the Medical Service home visit, raise the need for aids openly and agree that recommendations are forwarded as an application.</li>
<li>For further items, get a nurse’s recommendation and submit it with an informal application within ${R.empfehlung_max_wochen} weeks.</li>
<li>Note the date of receipt and follow up after ${H.entscheidung_wochen} weeks if no decision has arrived.</li>
<li>For consumables, choose a supplier that bills the care fund and match the quantity to the monthly allowance.</li>
</ol>
`,
  },
});
