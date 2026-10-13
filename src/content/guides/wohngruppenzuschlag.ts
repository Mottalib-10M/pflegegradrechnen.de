import { defineGuide } from '../../lib/guide-types';
import { monat, wohnumfeld } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Monatsbudgets je Pflegegrad in der Wohngruppe; Präsenzkraft-Budget je Gruppengröße. */
const W = P.wohngruppe, A = P.wohngruppe_anschub, X = P.wohnform_92c, E = P.entlastungsbetrag.monat;
const minGes = W.min_mitbewohner + 1, maxGes = W.max_mitbewohner + 1;
const GRADE = [1, 2, 3, 4, 5] as const;
const M = GRADE.map((g) => ({ g, ...monat({ grad: g, versorgung: 'pflegedienst', wohngruppe: true }) }));
/** Annahme: alle Mitglieder haben einen Pflegegrad und erfüllen die Bedingungen. */
const GROESSEN = [minGes, 6, 9, maxGes];
const topf = (n: number) => n * W.zuschlag;
const umbau = wohnumfeld(30000, 6);
const m3 = M[2];
/** Rechenbeispiel: neun Bewohner, davon acht mit Pflegegrad. */
const acht = topf(8);

export default defineGuide({
  id: 'wohngruppenzuschlag',
  group: 'zuhause',
  order: 100,
  mini: 'wohngruppe',
  related: ['wohnumfeldverbesserung', 'pflegesachleistung', 'entlastungsbetrag', 'tagespflege', 'pflegegrad-1', 'pflegegrad-demenz'],
  sources: ['sgb11_45f', 'sgb11_45g', 'bmgWohngruppe', 'sgb11_45h', 'sgb11_120', 'sgb11_28a'],
  de: {
    slug: 'wohngruppenzuschlag',
    nav: 'Wohngruppenzuschlag',
    card: `${DE.eur(W.zuschlag)} im Monat für jedes pflegebedürftige Mitglied einer ambulant betreuten Wohngruppe, gedacht für die gemeinsam beauftragte Präsenzkraft.`,
    title: `Wohngruppenzuschlag 2026: ${DE.eur(W.zuschlag)} im Monat, 4 Bedingungen`,
    description: `Wohngruppenzuschlag 2026: ${DE.eur(W.zuschlag)} im Monat je Mitglied einer Pflege-WG mit ${minGes} bis ${maxGes} Personen, Präsenzkraft, Unterlagen für die Kasse und Anschub bis ${DE.eur(A.je_person)}.`,
    h1: 'Wohngruppenzuschlag: Geld für die Präsenzkraft der Pflege-WG',
    intro: 'Eine eigene Wohnung ist es nicht, ein Heim auch nicht: Was eine Pflege-Wohngemeinschaft erfüllen muss, damit jedes Mitglied monatlich einen Zuschlag erhält.',
    resume: `Wer in einer ambulant betreuten Wohngruppe lebt, erhält von der Pflegekasse zusätzlich zu den übrigen Leistungen einen pauschalen Zuschlag von ${DE.eur(W.zuschlag)} im Monat (§ 45f SGB XI). Das Gesetz knüpft ihn an vier Bedingungen. Die Person lebt mit mindestens ${W.min_mitbewohner} und höchstens ${W.max_mitbewohner} weiteren Personen in einer gemeinsamen Wohnung, die Gruppe zählt also ${minGes} bis ${maxGes} Mitglieder, und mindestens ${W.min_pflegebeduerftige_mitbewohner} der anderen sind ebenfalls pflegebedürftig. Bei Pflegegrad 2 bis 5 bezieht sie Pflegegeld, Sachleistung, Kombinationsleistung, Umwandlungsanspruch oder Entlastungsbetrag; bei Pflegegrad 1 ist das laut Bundesgesundheitsministerium nicht nötig. Die Mitglieder beauftragen gemeinsam eine Präsenzkraft für Organisation, Haushalt und Gemeinschaftsleben. Und die Versorgung darf nicht weitgehend einem Pflegeheim entsprechen. Bei neun Mitgliedern kommen so ${DE.eur(topf(9))} im Monat für die Präsenzkraft zusammen. Für die Gründung gibt es einmalig bis ${DE.eur(A.je_person)} je Person, höchstens ${DE.eur(A.max_wohngruppe)} je Gruppe.`,
    faqs: [
      { q: 'Wofür darf der Wohngruppenzuschlag ausgegeben werden?', a: 'Das Bundesgesundheitsministerium beschreibt den Zweck klar: Der Zuschlag soll die Person finanzieren, die von den Mitgliedern gemeinsam beauftragt ist, also die Präsenzkraft. Sie erledigt unabhängig von der individuellen Pflege organisatorische, verwaltende und betreuende Aufgaben, fördert das Gemeinschaftsleben oder hilft im Haushalt. Die eigentliche Pflege läuft weiter über Pflegegeld oder Sachleistung jedes Mitglieds.' },
      { q: 'Bekommt man den Wohngruppenzuschlag auch mit Pflegegrad 1?', a: `Ja. Der Zuschlag steht ausdrücklich in der Liste der Leistungen bei Pflegegrad 1 (§ 28a SGB XI). Nach den Angaben des Bundesgesundheitsministeriums müssen Mitglieder mit Pflegegrad 1 dafür weder Pflegegeld noch Sachleistung, Umwandlung oder Entlastungsbetrag beziehen. Die übrigen Bedingungen gelten trotzdem: Gruppengröße, mindestens ${W.min_pflegebeduerftige_mitbewohner} weitere Pflegebedürftige, beauftragte Präsenzkraft und keine heimähnliche Versorgung.` },
      { q: 'Welche Unterlagen verlangt die Pflegekasse für den Wohngruppenzuschlag?', a: 'Das Gesetz zählt auf, was die Kasse anfordern darf (§ 45f Abs. 2 SGB XI): eine formlose Bestätigung, dass Sie mit genug Mitbewohnern zusammenleben, Adresse und Gründungsdatum der Wohngruppe, den Mietvertrag samt Grundriss, den Pflegevertrag, Name, Anschrift, Telefonnummer und Unterschrift der Präsenzkraft sowie die mit ihr vereinbarten Aufgaben. Halten Sie diese Mappe bereit, bevor der Antrag rausgeht.' },
      { q: 'Ist eine Senioren-WG, deren Vermieter auch die Pflege anbietet, eine ambulant betreute Wohngruppe?', a: 'Das hängt am Leistungsumfang, nicht an der Person des Vermieters. Ausgeschlossen ist der Zuschlag, wenn ein Anbieter oder ein Dritter Leistungen anbietet oder gewährleistet, die dem Umfang einer vollstationären Pflege weitgehend entsprechen. Der Anbieter muss vor dem Einzug darauf hinweisen, dass er diesen Umfang nicht erbringt und die Versorgung auch durch die Bewohner und ihr Umfeld getragen wird.' },
      { q: 'Was unterscheidet den Wohngruppenzuschlag vom Zuschuss nach § 45h SGB XI?', a: `Der Zuschuss nach § 45h beträgt ${DE.eur(X.zuschuss)} im Monat und gilt nur in gemeinschaftlichen Wohnformen, für die ein zugelassener Pflegedienst einen Vertrag nach § 92c mit den Kostenträgern geschlossen hat; diese Form gibt es laut Ministerium seit Januar 2026. Der Wohngruppenzuschlag nach § 45f gehört zur klassischen, selbst organisierten Pflege-WG. In § 45h ist er nicht unter den Leistungen genannt, die daneben möglich sind.` },
      { q: 'Wie viele Menschen dürfen in einer Wohngruppe mit Zuschlag leben?', a: `Mindestens ${minGes} und höchstens ${maxGes} einschließlich der Person, die den Zuschlag beantragt. Das Gesetz formuliert es aus ihrer Sicht: sie lebt mit mindestens ${W.min_mitbewohner} und höchstens ${W.max_mitbewohner} weiteren Personen zusammen, von denen mindestens ${W.min_pflegebeduerftige_mitbewohner} ebenfalls pflegebedürftig sein müssen. Mitbewohner ohne Pflegegrad zählen für die Gruppengröße mit, bekommen aber selbst keinen Zuschlag.` },
    ],
    body: (h) => `
<h2>Die vier Bedingungen des § 45f</h2>
${h.table(['Bedingung', 'Was das Gesetz verlangt', 'Woran es oft scheitert'], [
  ['Gemeinsame Wohnung', `mit mindestens ${W.min_mitbewohner} und höchstens ${W.max_mitbewohner} weiteren Personen, zum Zweck der gemeinschaftlich organisierten pflegerischen Versorgung; mindestens ${W.min_pflegebeduerftige_mitbewohner} weitere pflegebedürftig`, 'zu kleine oder zu große Gruppe, getrennte Wohnungen im selben Haus'],
  ['Leistungsbezug', 'bei Pflegegrad 2 bis 5 Pflegegeld, Sachleistung, Kombination, Umwandlung oder Entlastungsbetrag', 'selten, fast jedes Mitglied bezieht eine dieser Leistungen'],
  ['Präsenzkraft', 'von den Mitgliedern gemeinschaftlich beauftragt, für Organisation, Verwaltung, Betreuung, Gemeinschaftsleben oder Haushalt', 'vom Anbieter gestellt statt von den Mitgliedern beauftragt'],
  ['Keine heimähnliche Versorgung', 'kein Anbieter und kein Dritter gewährleistet einen Leistungsumfang, der vollstationärer Pflege weitgehend entspricht', 'Rundum-Paket, das einem Heim gleicht'],
], `Voraussetzungen für ${h.eur(W.zuschlag)} im Monat nach ${h.src('sgb11_45f', '§ 45f Abs. 1 SGB XI')}.`, ['l', 'l', 'l'])}
<p>Das Bundesgesundheitsministerium beschreibt Pflege-Wohngruppen als Wohnform, in der Bewohner eigene Zimmer haben und Gemeinschaftsräume teilen (${h.src('bmgWohngruppe', 'BMG, ambulant betreute Wohngruppen')}). Die Pflegeversicherung fördert sie, weil die Mitglieder dort länger in häuslicher Umgebung leben können, ohne auf sich allein gestellt zu sein. Rechtlich bleibt jedes Mitglied in häuslicher Pflege; deshalb gelten Pflegegeld, Sachleistung und Entlastungsbetrag wie in einer eigenen Wohnung weiter.</p>

<h2>Was ein Mitglied im Monat abrufen kann</h2>
${h.table(['Pflegegrad', 'Sachleistung', 'Wohngruppenzuschlag', 'Entlastungsbetrag', 'Verbrauchshilfsmittel', 'zusammen'],
  M.map((m) => [m.g, h.eur(m.sachleistung), h.eur(m.wohngruppe), h.eur(m.entlastungsbetrag), h.eur(m.hilfsmittel), h.eur(m.budgets)]),
  'Rechnung des Motors: Versorgung durch einen Pflegedienst, alle Bedingungen erfüllt. Pflegegrad 1 hat keine Sachleistung.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Bei Pflegegrad 3 stehen so ${h.eur(m3.budgets)} im Monat für Pflege, Präsenzkraft und Alltagshilfen bereit. Beauftragen alle Mitglieder denselben Pflegedienst, lassen sich die Einsätze leichter planen. Vorgeschrieben ist das nicht: Jedes Mitglied bleibt in der Wahl seines Dienstes frei. Wer seine Pflege durch Angehörige sichert, erhält statt der Sachleistung das Pflegegeld, der Zuschlag bleibt gleich.</p>

<h2>Wie viel Geld für die Präsenzkraft zusammenkommt</h2>
${h.table(['Mitglieder mit Pflegegrad', 'Zuschlag im Monat', 'im Jahr'],
  GROESSEN.map((n) => [n, h.eur(topf(n)), h.eur(topf(n) * 12)]),
  `Annahme: alle Mitglieder erfüllen die Bedingungen; ${h.eur(W.zuschlag)} je Person.`, ['r', 'r', 'r'])}
<p>Die Summe ist das Budget, aus dem die Gruppe die Präsenzkraft bezahlt. Wie viele Stunden sie dafür bekommt, hängt vom vereinbarten Stundensatz ab, den das Gesetz nicht vorgibt. Weil die Präsenzkraft gemeinschaftlich beauftragt sein muss, empfiehlt sich ein schriftlicher Vertrag, den alle Mitglieder oder ihre Vertreter unterzeichnen, und eine Liste der vereinbarten Aufgaben: Diese Liste kann die Kasse ohnehin anfordern.</p>

<h2>Was die Kasse prüfen darf</h2>
<p>Für die Prüfung darf die Pflegekasse eine formlose Bestätigung über das Zusammenleben, Adresse und Gründungsdatum der Wohngruppe, den Mietvertrag mit Grundriss, den Pflegevertrag nach ${h.src('sgb11_120', '§ 120 SGB XI')}, Name, Anschrift, Telefonnummer und Unterschrift der Präsenzkraft sowie ihre vereinbarten Aufgaben verlangen (§ 45f Abs. 2). Der Grundriss zeigt, ob es wirklich eine gemeinsame Wohnung ist. Wer Angehörige vertritt, die nicht mehr selbst unterschreiben können, sollte die Vollmacht gleich mitschicken.</p>
<p>Ein Sonderfall ist die ${h.a('tagespflege', 'Tagespflege')}: Neben dem Zuschlag ist sie nur möglich, wenn eine Prüfung des Medizinischen Dienstes gegenüber der Kasse belegt, dass die Pflege in der Wohngruppe ohne teilstationäre Pflege nicht ausreichend sichergestellt ist (§ 45f Abs. 1 Satz 2).</p>

<h2>Gründen und umbauen</h2>
<p>Wer eine Wohngruppe mitgründet und dort Anspruch auf den Zuschlag hat, kann für die altersgerechte oder barrierearme Umgestaltung der gemeinsamen Wohnung einmalig bis zu ${h.eur(A.je_person)} erhalten, zusätzlich zum Umbauzuschuss nach § 40 Abs. 4 (${h.src('sgb11_45g', '§ 45g SGB XI')}). Je Wohngruppe ist dieser Betrag auf ${h.eur(A.max_wohngruppe)} begrenzt. Der Antrag muss innerhalb von ${A.antrag_frist_jahre} Jahr nach Vorliegen der Voraussetzungen gestellt werden; der Umbau darf schon vor Gründung und Einzug erfolgen. Der Anspruch endet, sobald die Förderung bundesweit ${A.foerdertopf_mio} Millionen Euro erreicht hat. Daneben läuft die ${h.a('wohnumfeldverbesserung', 'Wohnumfeldverbesserung')}: Sechs Mitglieder, die ein Bad für ${h.eur(30000)} umbauen, erhalten danach höchstens ${h.eur(umbau.zuschuss)}, also ${h.eur(umbau.proPerson)} je Person.</p>
<!--mini:wohnumfeld-->

<h2>Abgrenzung zum Zuschuss nach § 45h</h2>
<p>Seit Januar 2026 gibt es eine zweite Form: gemeinschaftliche Wohnformen, für die ein zugelassener Pflegedienst einen Vertrag nach § 92c mit den Kostenträgern geschlossen hat, mit einem Basispaket aus Pflege, Betreuung, Hauswirtschaft und häuslicher Krankenpflege. Bewohner dort erhalten einen pauschalen Zuschuss von ${h.eur(X.zuschuss)} im Monat (${h.src('sgb11_45h', '§ 45h SGB XI')}). § 45h zählt abschließend auf, welche Leistungen daneben möglich sind; der Wohngruppenzuschlag gehört nicht dazu. Fragen Sie vor dem Einzug, welche der beiden Formen vorliegt, denn davon hängt ab, welche Leistungen Ihr Angehöriger beantragen kann.</p>

<h2>Ein Rechenbeispiel: Frau B. zieht in die Wohngruppe</h2>
<p>Frau B. hat Pflegegrad 3 und eine beginnende Demenz, ihr Sohn arbeitet im Ausland. Sie zieht in eine Wohngruppe mit neun Bewohnern, von denen acht einen Pflegegrad haben. Die acht erhalten je ${h.eur(W.zuschlag)}, zusammen ${h.eur(acht)} im Monat, und bezahlen daraus wie in der Gruppe vereinbart die Präsenzkraft, die einkauft, den Tagesablauf organisiert und Ansprechpartnerin für Angehörige ist. Den Pflegedienst für Waschen und Anziehen rechnet Frau B. über ihre Sachleistung von bis zu ${h.eur(m3.sachleistung)} ab, eine Betreuungsgruppe am Nachmittag über den Entlastungsbetrag von ${h.eur(E)}. Miete, Nebenkosten und Haushaltsgeld zahlt sie selbst; dafür gibt es aus der Pflegeversicherung nichts. Für den Sohn ist die Präsenzkraft oft die wichtigste Verbindung: Sie weiß, wie es der Mutter geht, auch wenn er nur am Telefon nachfragen kann.</p>

<h2>Checkliste vor dem Einzug</h2>
<ol>
<li>Gruppengröße und Zahl der Pflegebedürftigen prüfen: ${minGes} bis ${maxGes} Mitglieder, mindestens ${W.min_pflegebeduerftige_mitbewohner} weitere mit Pflegegrad.</li>
<li>Den Hinweis des Anbieters lesen, dass kein heimähnlicher Leistungsumfang erbracht wird.</li>
<li>Klären, wer die Präsenzkraft beauftragt und welche Aufgaben im Vertrag stehen.</li>
<li>Mietvertrag, Grundriss und Pflegevertrag für den Antrag bereitlegen.</li>
<li>Bei Neugründung die Frist von ${A.antrag_frist_jahre} Jahr für die Anschubfinanzierung im Kalender eintragen.</li>
</ol>
`,
  },
  en: {
    slug: 'shared-flat-supplement',
    nav: 'Shared-flat supplement',
    card: `${EN.eur(W.zuschlag)} a month for each member with a care grade in an assisted shared flat, meant for the jointly hired assistant.`,
    title: `Wohngruppenzuschlag 2026: ${EN.eur(W.zuschlag)} Shared Care Flat Supplement`,
    description: `German shared-flat supplement 2026: ${EN.eur(W.zuschlag)} a month per member of a care flat of ${minGes} to ${maxGes} people, joint assistant, documents and a start-up grant of ${EN.eur(A.je_person)}.`,
    h1: 'Shared-flat supplement: money for the assistant in a German care flat',
    intro: 'Not a private flat, not a care home either: what a shared care flat in Germany must meet so that each member receives a monthly supplement.',
    resume: `Anyone living in an assisted shared flat (ambulant betreute Wohngruppe) receives a flat-rate supplement of ${EN.eur(W.zuschlag)} a month from the German long-term care fund on top of all other benefits (Wohngruppenzuschlag, section 45f of Book XI of the Social Code, SGB XI). The law sets four conditions. The person lives with at least ${W.min_mitbewohner} and at most ${W.max_mitbewohner} other people in one shared home, so the group has ${minGes} to ${maxGes} members, and at least ${W.min_pflegebeduerftige_mitbewohner} of the others also have a care grade. At grades 2 to 5 the person draws the care allowance, the services budget, the combined benefit, the conversion claim or the relief amount; at grade 1 this is not required, according to the Federal Ministry of Health. The members jointly hire an assistant (Präsenzkraft) for organisation, housekeeping and community life. And the arrangement must not largely match the services of a care home. With nine members, ${EN.eur(topf(9))} a month is available for the assistant. Founding members can also get a one-off grant of up to ${EN.eur(A.je_person)} each, at most ${EN.eur(A.max_wohngruppe)} per flat.`,
    faqs: [
      { q: 'What may the shared-flat supplement be spent on?', a: 'The Federal Ministry of Health is clear about the purpose: the supplement is meant to pay for the person the members hire jointly, the assistant. Independently of each member’s individual care, the assistant handles organisation, administration and supervision, supports community life or helps with housekeeping. Personal care itself continues to be paid from each member’s care allowance or services budget.' },
      { q: 'Is the shared-flat supplement available at care grade 1?', a: `Yes. The supplement is listed expressly among the grade 1 benefits in section 28a SGB XI. According to the Federal Ministry of Health, members at grade 1 do not need to draw the allowance, services, conversion or the relief amount to qualify. The other conditions still apply: group size, at least ${W.min_pflegebeduerftige_mitbewohner} other residents with a care grade, a jointly hired assistant and no care-home-like package.` },
      { q: 'Which documents does the fund ask for in a shared care flat?', a: 'The law lists what the fund may request (section 45f(2) SGB XI): an informal confirmation that you live with enough flatmates, the address and founding date of the group, the tenancy agreement with a floor plan, the care contract, the assistant’s name, address, phone number and signature, and the tasks agreed with them. Put this file together before the application goes out.' },
      { q: 'Does a flat qualify if the landlord also offers the care?', a: 'It depends on the scope of services, not on who the landlord is. The supplement is excluded where a provider or a third party offers or guarantees services that largely match full residential care. The provider must tell residents before they move in that it does not deliver that scope and that care also relies on the residents themselves and the people around them.' },
      { q: `How does the supplement differ from the ${EN.eur(X.zuschuss)} grant under section 45h?`, a: `The section 45h grant of ${EN.eur(X.zuschuss)} a month applies only in shared living arrangements where a registered care service has signed a contract under section 92c with the funders; the ministry says this form has existed since January 2026. The supplement under section 45f belongs to the classic self-organised care flat. Section 45h does not list it among the benefits available alongside its own grant.` },
      { q: 'How many residents can a qualifying shared care flat have?', a: `At least ${minGes} and at most ${maxGes}, including the person applying. The law puts it from that person’s point of view: they live with at least ${W.min_mitbewohner} and at most ${W.max_mitbewohner} others, of whom at least ${W.min_pflegebeduerftige_mitbewohner} must also have a care grade. Flatmates without a care grade count towards the group size but receive no supplement themselves.` },
    ],
    body: (h) => `
<h2>The four conditions of section 45f</h2>
${h.table(['Condition', 'What the law requires', 'Where it often fails'], [
  ['Shared home', `with at least ${W.min_mitbewohner} and at most ${W.max_mitbewohner} other people, for the purpose of jointly organised care; at least ${W.min_pflegebeduerftige_mitbewohner} others with a care grade`, 'group too small or too large, separate flats in the same building'],
  ['Drawing a benefit', 'at grades 2 to 5: care allowance, services, combined benefit, conversion or relief amount', 'rarely, almost every member draws one of these'],
  ['Assistant', 'hired jointly by the members for organisation, administration, supervision, community life or housekeeping', 'supplied by the provider instead of hired by the members'],
  ['No care-home package', 'no provider or third party guarantees services largely matching full residential care', 'an all-in package that resembles a care home'],
], `Conditions for ${h.eur(W.zuschlag)} a month under ${h.src('sgb11_45f', 'section 45f(1) SGB XI')}.`, ['l', 'l', 'l'])}
<p>The Federal Ministry of Health describes care flats as a way of living where residents have their own rooms and share common areas (${h.src('bmgWohngruppe', 'BMG, assisted shared flats')}). Care insurance supports them because members can stay in a home setting longer without being left on their own. Legally each member remains in home care, so the allowance, the services budget and the relief amount continue as in a private flat. For a family abroad, a care flat near a parent’s old neighbourhood can therefore be a realistic alternative to a care home.</p>

<h2>What one member can draw each month</h2>
${h.table(['Care grade', 'Services budget', 'Shared-flat supplement', 'Relief amount', 'Consumable aids', 'Total'],
  M.map((m) => [m.g, h.eur(m.sachleistung), h.eur(m.wohngruppe), h.eur(m.entlastungsbetrag), h.eur(m.hilfsmittel), h.eur(m.budgets)]),
  'Engine calculation: care provided by a care service, all conditions met. Grade 1 has no services budget.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>At grade 3, ${h.eur(m3.budgets)} a month is therefore available for care, the assistant and everyday help. If all members use the same care service, visits are easier to plan. That is not required: each member stays free to choose their own service. Anyone whose care is provided by relatives receives the allowance instead of services, and the supplement stays the same.</p>

<h2>How much money the group has for the assistant</h2>
${h.table(['Members with a care grade', 'Supplement per month', 'per year'],
  GROESSEN.map((n) => [n, h.eur(topf(n)), h.eur(topf(n) * 12)]),
  `Assumption: all members meet the conditions; ${h.eur(W.zuschlag)} per person.`, ['r', 'r', 'r'])}
<p>The total is the budget from which the group pays the assistant. How many hours it buys depends on the agreed rate, which the law does not set. Because the assistant must be hired jointly, a written contract signed by all members or their representatives makes sense, together with a list of agreed tasks, which the fund may ask for anyway.</p>

<h2>What the fund may check</h2>
<p>To check the conditions, the care fund may ask for an informal confirmation of the living arrangement, the address and founding date of the group, the tenancy agreement with a floor plan, the care contract under ${h.src('sgb11_120', 'section 120 SGB XI')}, the assistant’s name, address, phone number and signature, and their agreed tasks (section 45f(2)). The floor plan shows whether it really is one shared home. If you act for a parent who can no longer sign, send your power of attorney along with the papers.</p>
<p>${h.a('tagespflege', 'Day care')} is a special case: alongside the supplement it is only possible if a review by the Medical Service shows the fund that care in the flat cannot be adequately ensured without it (section 45f(1), second sentence).</p>

<h2>Founding and adapting a flat</h2>
<p>Founding members who are entitled to the supplement in the new flat can receive a one-off amount of up to ${h.eur(A.je_person)} each for making the shared home age-appropriate or low-barrier, on top of the adaptation grant under section 40(4) (${h.src('sgb11_45g', 'section 45g SGB XI')}). The amount is capped at ${h.eur(A.max_wohngruppe)} per flat. The application must be made within ${A.antrag_frist_jahre} year of the conditions being met; the work may take place before founding and moving in. The entitlement ends once national funding reaches ${A.foerdertopf_mio} million euros. The ${h.a('wohnumfeldverbesserung', 'home adaptation grant')} runs alongside: six members converting a bathroom for ${h.eur(30000)} receive at most ${h.eur(umbau.zuschuss)} under it, or ${h.eur(umbau.proPerson)} each.</p>
<!--mini:wohnumfeld-->

<h2>How it differs from the section 45h grant</h2>
<p>Since January 2026 there is a second model: shared living arrangements where a registered care service has signed a contract under section 92c with the funders, with a basic package of care, supervision, housekeeping and home nursing. Residents there receive a flat-rate grant of ${h.eur(X.zuschuss)} a month (${h.src('sgb11_45h', 'section 45h SGB XI')}). Section 45h lists which benefits are possible alongside it, and the shared-flat supplement is not among them. Ask before moving in which of the two models applies, because it decides which benefits your relative can claim.</p>

<h2>A worked example: Mrs B. moves into a care flat</h2>
<p>Mrs B. has care grade 3 and early dementia; her son works abroad. She moves into a care flat with nine residents, eight of whom have a care grade. Those eight each receive ${h.eur(W.zuschlag)}, ${h.eur(acht)} a month together, and use it as agreed within the group to pay the assistant, who shops, organises the daily routine and is the contact person for relatives. Mrs B. pays the care service for washing and dressing from her services budget of up to ${h.eur(m3.sachleistung)}, and an afternoon support group from the relief amount of ${h.eur(E)}. Rent, utilities and housekeeping money she pays herself; care insurance provides nothing for these. For her son the assistant is often the most important link: she knows how his mother is doing even when he can only call.</p>

<h2>Checklist before moving in</h2>
<ol>
<li>Check group size and the number with a care grade: ${minGes} to ${maxGes} members, at least ${W.min_pflegebeduerftige_mitbewohner} others with a care grade.</li>
<li>Read the provider’s notice that no care-home-like package is delivered.</li>
<li>Clarify who hires the assistant and which tasks the contract lists.</li>
<li>Have the tenancy agreement, floor plan and care contract ready for the application.</li>
<li>For a new flat, put the ${A.antrag_frist_jahre}-year deadline for the start-up grant in the calendar.</li>
</ol>
`,
  },
});
