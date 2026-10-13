import { defineGuide } from '../../lib/guide-types';
import { kombination } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: je Grad ein Pflegedienst, der die Hälfte des Topfs nutzt; Grad 3 mit 900 € Dienst und 200 € Alltagshilfe. */
const G = [2, 3, 4, 5] as const;
const halb = G.map((g) => kombination(g, P.sachleistung[g] / 2));
const mix = kombination(3, 900, 200);

export default defineGuide({
  id: 'kombinationsleistung',
  group: 'zuhause',
  order: 30,
  tool: 'kombi',
  related: ['pflegegeld', 'pflegesachleistung', 'umwandlungsanspruch', 'entlastungsbetrag', 'pflegegrad-3', 'beratungseinsatz'],
  sources: ['sgb11_38', 'sgb11_36', 'sgb11_37', 'sgb11_45a'],
  de: {
    slug: 'kombinationsleistung',
    nav: 'Kombinationsleistung',
    card: 'Pflegegeld und Pflegedienst gemischt: wie viel Pflegegeld neben der Rechnung des Dienstes bleibt.',
    title: 'Kombinationsleistung 2026: Pflegegeld neben Pflegedienst',
    description: 'Kombinationsleistung 2026: Pflegegeld sinkt um den Anteil der genutzten Sachleistung, Alltagshilfe über die Umwandlung zählt mit. Für Pflegegrad 2 bis 5.',
    h1: 'Kombinationsleistung: Pflegegeld und Pflegedienst zusammen',
    intro: 'Tragen Sie die Monatsrechnung des Pflegedienstes ein: Der Rechner zeigt den genutzten Anteil der Sachleistung und das Pflegegeld, das daneben ausgezahlt wird.',
    resume: `Wer zu Hause von Angehörigen gepflegt wird und zusätzlich einen zugelassenen Pflegedienst nutzt, erhält die Kombinationsleistung nach § 38 SGB XI. Die Kasse zahlt die Rechnung des Dienstes bis zur Sachleistungsgrenze des Grades und überweist daneben ein anteiliges Pflegegeld. Es sinkt um genau den Prozentsatz, zu dem die Sachleistung verbraucht wurde. Nutzt der Dienst die Hälfte des Topfs, bleibt die Hälfte des Pflegegeldes: bei Pflegegrad 2 ${DE.eur(halb[0].pflegegeld, 2)}, bei Pflegegrad 3 ${DE.eur(halb[1].pflegegeld, 2)}, bei Pflegegrad 4 ${DE.eur(halb[2].pflegegeld, 2)} und bei Pflegegrad 5 ${DE.eur(halb[3].pflegegeld, 2)}. Alltagshilfen, die über den Umwandlungsanspruch aus dem Sachleistungstopf bezahlt werden, zählen wie Sachleistung. Bei Pflegegrad 3 mit ${DE.eur(900)} für den Dienst und ${DE.eur(200)} für eine Alltagshilfe sind ${DE.pct(mix.anteil, 1)} genutzt, es bleiben ${DE.eur(mix.pflegegeld, 2)}. An die gewählte Aufteilung ist man sechs Monate gebunden; der Entlastungsbetrag mindert das Pflegegeld nicht.`,
    faqs: [
      { q: 'Schwankt das Pflegegeld bei der Kombinationsleistung jeden Monat?', a: 'Ja. Die Kasse rechnet jeden Monat nach der tatsächlichen Rechnung des Pflegedienstes ab und zahlt den Rest als Pflegegeld, meist im Nachhinein. Wer im Dezember mehr Einsätze braucht, bekommt in diesem Monat weniger Pflegegeld. Die Bindung an die Aufteilung für sechs Monate betrifft die grundsätzliche Wahl, nicht jeden einzelnen Euro.' },
      { q: 'Was ist besser: reines Pflegegeld oder Kombination?', a: 'Finanziell bringt der Pflegedienst mehr Geld in die Versorgung, weil die Sachleistung deutlich höher ist als das Pflegegeld. Wer aber vor allem Bargeld für die pflegende Tochter möchte, verliert mit jedem Einsatz Pflegegeld. Viele nutzen den Dienst gezielt für das, was Angehörige nicht schaffen, etwa die Morgenpflege, und lassen den Rest beim Pflegegeld.' },
      { q: 'Zählen Entlastungsbetrag und Tagespflege in die Kombination hinein?', a: 'Nein. Der Entlastungsbetrag und die Tages- und Nachtpflege haben eigene Töpfe und mindern das Pflegegeld nicht. Nur die Sachleistung des Pflegedienstes und der Umwandlungsanspruch für Alltagshilfen werden auf die Kombination angerechnet. Rechnungen des Dienstes für Betreuung können deshalb sinnvoller über den Entlastungsbetrag laufen.' },
    ],
    body: (h) => `
<h2>Die Kombination für jeden Grad</h2>
${h.table(['Pflegegrad', 'Sachleistung bis', 'Pflegegeld voll', 'Dienst nutzt die Hälfte: Pflegegeld', 'Dienst nutzt drei Viertel: Pflegegeld'],
  G.map((g, i) => [String(g), h.eur(P.sachleistung[g]), h.eur(P.pflegegeld[g]), h.eur(halb[i].pflegegeld, 2), h.eur(kombination(g, P.sachleistung[g] * 0.75).pflegegeld, 2)]),
  'Anteiliges Pflegegeld nach § 38 SGB XI.', ['l', 'r', 'r', 'r', 'r'])}
<p>Die Rechnung ist einfach, aber nicht intuitiv: Es zählt der Prozentsatz, nicht der Eurobetrag. Ein Pflegedienst für ${h.eur(400)} kostet bei Pflegegrad 2 gut die Hälfte des Pflegegeldes, bei Pflegegrad 5 nur ein Sechstel, weil der Sachleistungstopf dort fast dreimal so groß ist (${h.src('sgb11_38', '§ 38 SGB XI')}).</p>
<p>Übersteigt die Rechnung des Dienstes den Sachleistungsbetrag, zahlt die Familie den Rest selbst und bekommt kein Pflegegeld mehr. Wer regelmäßig darüber liegt, sollte prüfen, ob ein Teil der Einsätze als Betreuung über den ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} abgerechnet werden kann. Für Alltagshilfen gibt es außerdem den ${h.a('umwandlungsanspruch', 'Umwandlungsanspruch')}, der aber ebenfalls Pflegegeld kostet.</p>
<p>Ein praktischer Tipp: Lassen Sie sich vom Pflegedienst einen Kostenvoranschlag für einen typischen Monat geben und tragen Sie ihn in den Rechner ein, bevor Sie den Vertrag unterschreiben. So sieht die Familie vorher, wie viel Pflegegeld bleibt, und kann Einsätze so legen, dass die Grenze nicht überschritten wird.</p>
`,
  },
  en: {
    slug: 'combined-benefit',
    nav: 'Combined benefit',
    card: 'Allowance and a care service together: how much allowance is left next to the service’s bill.',
    title: 'Kombinationsleistung 2026: Allowance Next to a Care Service',
    description: 'German combined benefit 2026: the care allowance drops by the share of services used; everyday help via conversion counts too. For care grades 2 to 5.',
    h1: 'Combined benefit: care allowance plus a care service',
    intro: 'Enter the care service’s monthly bill: the calculator shows the share of the services budget used and the allowance paid alongside it.',
    resume: `If relatives care for someone at home and a registered care service also visits, the German long-term care fund pays the combined benefit (Kombinationsleistung) under section 38 of Book XI of the Social Code. The fund pays the service’s bill up to the services limit for the grade and transfers a pro-rata care allowance alongside it. The allowance falls by exactly the percentage of the services budget used. If the service uses half the budget, half the allowance remains: ${EN.eur(halb[0].pflegegeld, 2)} at grade 2, ${EN.eur(halb[1].pflegegeld, 2)} at grade 3, ${EN.eur(halb[2].pflegegeld, 2)} at grade 4 and ${EN.eur(halb[3].pflegegeld, 2)} at grade 5. Everyday help paid from the services budget through the conversion claim counts like services. At grade 3 with ${EN.eur(900)} for the service and ${EN.eur(200)} for everyday help, ${EN.pct(mix.anteil, 1)} is used and ${EN.eur(mix.pflegegeld, 2)} remains. The chosen split binds for six months, and the relief amount never reduces the allowance.`,
    faqs: [
      { q: 'Does the allowance change every month with the combined benefit?', a: 'Yes. The fund settles each month against the care service’s actual bill and pays the rest as allowance, usually afterwards. A month with more visits means less allowance. The six-month commitment applies to the basic choice, not to every euro, which matters for families budgeting from abroad.' },
      { q: 'Which is better: allowance only or the combined benefit?', a: 'A care service puts more money into care, because the services budget is much larger than the allowance. If the family mainly wants cash for the relative who cares, every visit reduces it. Many use the service for what relatives cannot manage, such as morning personal care, and keep the rest as allowance.' },
      { q: 'Do the relief amount and day care count towards the combination?', a: 'No. The relief amount and day or night care have their own budgets and do not reduce the allowance. Only the care service’s services and the conversion claim for everyday help count. Supervision visits by the service may therefore be better billed to the relief amount.' },
    ],
    body: (h) => `
<h2>The combination for each grade</h2>
${h.table(['Care grade', 'Services up to', 'Full allowance', 'Service uses half: allowance', 'Service uses three quarters: allowance'],
  G.map((g, i) => [String(g), h.eur(P.sachleistung[g]), h.eur(P.pflegegeld[g]), h.eur(halb[i].pflegegeld, 2), h.eur(kombination(g, P.sachleistung[g] * 0.75).pflegegeld, 2)]),
  'Pro-rata allowance under section 38 SGB XI.', ['l', 'r', 'r', 'r', 'r'])}
<p>The rule is simple but not intuitive: the percentage counts, not the euro amount. A ${h.eur(400)} care service bill costs more than half the allowance at grade 2 but only about a sixth at grade 5, because the services budget there is almost three times larger (${h.src('sgb11_38', 'section 38 SGB XI')}).</p>
<p>If the bill exceeds the services budget, the family pays the rest and no allowance is left. Anyone regularly above the limit should check whether some visits can be billed as supervision to the ${h.a('entlastungsbetrag', 'relief amount')}. For everyday help there is also the ${h.a('umwandlungsanspruch', 'conversion claim')}, which also reduces the allowance.</p>
<p>A practical tip: ask the care service for a cost estimate for a typical month and enter it here before signing the contract. The family then sees in advance how much allowance remains and can arrange visits so the budget is not exceeded.</p>
`,
  },
});
