import { defineGuide } from '../../lib/guide-types';
import { nba } from '../../lib/engine/nba';
import { BEISPIEL } from '../../data/nba-beispiel';
import { P, DE, EN } from '../../lib/fmt';

/** Das Beispiel, mit dem der Rechner startet, vom Motor gerechnet. */
const b = nba(BEISPIEL);
const S = P.nba.schwellen;

export default defineGuide({
  id: 'pflegegrad-rechner',
  group: 'grad',
  order: 10,
  tool: 'pflegegrad',
  related: ['pflegegrad-beantragen', 'begutachtung-medizinischer-dienst', 'pflegegrad-2', 'pflegegrad-3', 'widerspruch-pflegegrad', 'pflegegrad-demenz'],
  sources: ['sgb11_15', 'sgb11_anlage1', 'sgb11_anlage2', 'mdBegutachtung'],
  de: {
    slug: 'pflegegrad-rechner',
    nav: 'Pflegegrad-Rechner',
    card: 'Alle 64 Kriterien des Gutachtens, gewichtet wie im Gesetz, und sofort das Geld, das der Grad bringt.',
    title: 'Pflegegrad-Rechner 2026: 64 Kriterien, Punkte und Geld',
    description: `Pflegegrad-Rechner 2026 mit allen 64 Kriterien aus Anlage 1 zu § 15 SGB XI: Punkte je Modul, Grad ab ${DE.num(S[0], 1)} Punkten und das Pflegegeld dazu, ohne Telefonnummer.`,
    h1: 'Pflegegrad berechnen: alle Kriterien des Gutachtens',
    intro: 'Dieselben Fragen, die der Medizinische Dienst stellt, dieselbe Gewichtung wie im Gesetz, und am Ende nicht nur ein Grad, sondern der Betrag.',
    resume: `Der Rechner bildet das Begutachtungsinstrument des § 15 SGB XI vollständig nach: fünf Kriterien zur Mobilität, elf zur Kognition, dreizehn zum Verhalten, dreizehn zur Selbstversorgung, sechzehn zum Umgang mit Krankheit und Therapie und sechs zum Alltag. Jede Antwort ergibt Einzelpunkte nach Anlage 1, jede Modulsumme einen Punktbereich nach Anlage 2, der gewichtet wird: Mobilität 10 Prozent, Kognition oder Verhalten 15 Prozent (nur der höhere Wert zählt), Selbstversorgung 40 Prozent, Krankheit und Therapie 20 Prozent, Alltag 15 Prozent. Ab ${DE.num(S[0], 1)} Gesamtpunkten gibt es Pflegegrad 1, ab ${DE.num(S[1])} Grad 2, ab ${DE.num(S[2], 1)} Grad 3, ab ${DE.num(S[3])} Grad 4 und ab ${DE.num(S[4])} Grad 5. Das voreingestellte Beispiel, eine Frau mit beginnender Demenz, die zu Hause lebt, kommt auf ${DE.num(b.gesamt, 2)} Punkte und damit Pflegegrad ${b.grad}. Neben dem Ergebnis steht sofort, welche Leistungen 2026 dazugehören. Es wird nichts gespeichert und kein Kontakt verlangt.`,
    faqs: [
      { q: 'Wie genau ist ein Pflegegrad-Rechner im Vergleich zum Gutachten?', a: 'So genau wie die Antworten. Der Rechner nutzt dieselben Kriterien und dieselbe Bewertungssystematik wie der Medizinische Dienst. Unterschiede entstehen, wenn die Gutachterin eine Fähigkeit anders einschätzt, als die Familie sie erlebt, oder wenn eine besondere Bedarfskonstellation vorliegt, die nach § 15 Abs. 4 SGB XI direkt zu Pflegegrad 5 führen kann.' },
      { q: 'Warum zählen Modul 2 und Modul 3 nicht zusammen?', a: 'Weil das Gesetz für beide zusammen nur 15 Prozent vorsieht und davon den höheren gewichteten Wert nimmt (§ 15 Abs. 3 Satz 2 SGB XI). Bei Demenz mit Unruhe, Ängsten oder nächtlichem Umherlaufen bringt oft Modul 3 mehr als die Gedächtnisfragen in Modul 2. Der Rechner zeigt, welches Modul gerade zählt.' },
      { q: 'Wie beantworte ich die Fragen in Modul 5 richtig?', a: 'Zählen Sie nur Hilfen, die regelmäßig und voraussichtlich mindestens sechs Monate nötig sind: Tabletten richten, Insulin spritzen, Kompressionsstrümpfe anziehen, Blutzucker messen. Tragen Sie die Zahl pro Tag ein; wöchentliche Hilfen teilt der Rechner durch sieben. Begleitete Arztbesuche zählen pro Monat. Was die Person selbst erledigt, zählt nicht.' },
      { q: 'Kann ich das Ergebnis der Pflegekasse vorlegen?', a: 'Es hat keine rechtliche Wirkung, hilft aber bei der Vorbereitung auf den Hausbesuch und beim Lesen des Gutachtens. Liegt der Bescheid deutlich unter Ihrer Schätzung, vergleichen Sie Modul für Modul, wo die Punkte fehlen. Genau diese Stellen begründen einen Widerspruch, der innerhalb eines Monats nach dem Bescheid eingehen muss.' },
    ],
    body: (h) => `
<h2>So füllen Sie den Rechner aus</h2>
<p>Beantworten Sie jede Frage so, wie es an einem durchschnittlichen Tag der letzten Wochen war, nicht an einem besonders guten. „Überwiegend selbständig“ heißt, dass die Person den größten Teil allein schafft und nur Anleitung oder Hilfe bei einem Schritt braucht. „Überwiegend unselbständig“ heißt, dass sie nur noch einen kleinen Teil selbst beiträgt. Bei den Verhaltensfragen zählt, wie oft etwas vorkommt, nicht wie schlimm es ist. Das Beispiel beim Öffnen zeigt einen realistischen Fall; mit „Alle Antworten auf selbständig“ starten Sie neu.</p>
<h2>Warum Selbstversorgung so stark zählt</h2>
<p>Modul 4 trägt 40 Prozent der Gesamtpunkte. Essen zählt dreifach, Trinken und Toilette doppelt (${h.src('sgb11_anlage1', 'Anlage 1 zu § 15 SGB XI')}). Wer beim Essen überwiegend unselbständig ist, hat dort allein sechs Einzelpunkte. Inkontinenz zählt nur, wenn sie überwiegend oder vollständig besteht. Wer hier ehrlich und vollständig antwortet, kommt dem Gutachten am nächsten; mehr dazu unter ${h.a('begutachtung-medizinischer-dienst', 'Begutachtung durch den Medizinischen Dienst')}.</p>
<h2>Nach dem Ergebnis</h2>
<p>Zeigt der Rechner mindestens Pflegegrad 1, lohnt sich der ${h.a('pflegegrad-beantragen', 'Antrag')} sofort, denn die Leistungen beginnen erst mit dem Antragsmonat. Wer schon einen Bescheid hat, der niedriger ausfällt, prüft die Module einzeln und legt gegebenenfalls ${h.a('widerspruch-pflegegrad', 'Widerspruch')} ein. Was der Grad im Monat bringt, rechnet die ${h.a('home', 'Startseite')} mit allen Töpfen.</p>
`,
  },
  en: {
    slug: 'care-grade-calculator',
    nav: 'Care grade calculator',
    card: 'All 64 assessment criteria, weighted as in the law, followed straight away by the money the grade brings.',
    title: 'Care Grade Calculator Germany 2026: 64 Criteria, Points',
    description: `German care grade calculator 2026 with all 64 criteria of Annex 1 to section 15 SGB XI: points per module, the resulting grade and the allowance it pays.`,
    h1: 'Estimate a German care grade from the assessment criteria',
    intro: 'The same questions the Medical Service asks, the same weighting as the law, and at the end not just a grade but the amount it pays.',
    resume: `This calculator reproduces the German assessment instrument of section 15 of Book XI of the Social Code in full: five criteria on mobility, eleven on cognition, thirteen on behaviour, thirteen on self-care, sixteen on coping with illness and treatment and six on daily life. Each answer gives item points under Annex 1, each module total falls into one of five bands under Annex 2, and the bands are weighted: mobility 10 percent, cognition or behaviour 15 percent (only the higher counts), self-care 40 percent, illness and treatment 20 percent, daily life 15 percent. From ${EN.num(S[0], 1)} total points the person has grade 1, from ${EN.num(S[1])} grade 2, from ${EN.num(S[2], 1)} grade 3, from ${EN.num(S[3])} grade 4 and from ${EN.num(S[4])} grade 5. The preset example, a woman with early dementia living at home, scores ${EN.num(b.gesamt, 2)} points, which is care grade ${b.grad}. The 2026 benefits for the result appear next to it. Nothing is stored and no contact details are requested.`,
    faqs: [
      { q: 'How close is this estimate to the real assessment?', a: 'As close as the answers. The calculator uses the same criteria and scoring as the Medical Service. Differences arise when the assessor judges an ability differently from how the family sees it, or when a special needs constellation applies, which under section 15(4) SGB XI can lead straight to grade 5 below 90 points.' },
      { q: 'Can I fill this in for a parent who lives in Germany while I live abroad?', a: 'Yes, but ask the person who sees them most days, because the questions are about what happens on an ordinary day. The assessment visit is in German; bring the calculator printout and a care diary so a relative or interpreter can point to each module where help is needed.' },
      { q: 'What should I enter in module 5?', a: 'Only regular help expected to last at least six months: preparing tablets, insulin injections, putting on compression stockings, measuring blood sugar. Enter the number per day; weekly help is divided by seven. Accompanied doctor visits are counted per month. Anything the person still manages alone counts as zero.' },
      { q: 'Does the result have any legal effect?', a: 'No. It helps you prepare for the home visit and read the report. If the decision is well below your estimate, compare module by module to see where points were lost. Those are the arguments for an objection, which must reach the Pflegekasse within one month of the decision.' },
    ],
    body: (h) => `
<h2>How to fill it in</h2>
<p>Answer each question as things were on an average day in recent weeks, not on a good day. “Mostly independent” means the person manages most of the task and needs prompting or help with one step. “Mostly dependent” means they contribute only a small part. For behaviour questions, frequency counts, not severity. The example loaded on opening is a realistic case; the reset button starts from scratch.</p>
<h2>Why self-care weighs so much</h2>
<p>Module 4 carries 40 percent of the total. Eating counts three times, drinking and toilet use twice (${h.src('sgb11_anlage1', 'Annex 1 to section 15 SGB XI')}). Incontinence only counts if it is mostly or fully present. Honest, complete answers here bring you closest to the report; see ${h.a('begutachtung-medizinischer-dienst', 'the Medical Service assessment')}.</p>
<h2>After the result</h2>
<p>If the result is grade 1 or higher, ${h.a('pflegegrad-beantragen', 'apply')} now, because benefits only start in the month of application. If a decision already came back lower, compare the modules and consider an ${h.a('widerspruch-pflegegrad', 'objection')}. The ${h.a('home', 'home page')} works out everything the grade pays per month.</p>
`,
  },
});
