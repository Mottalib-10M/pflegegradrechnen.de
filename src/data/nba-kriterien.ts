/** Kriterien der Module 1 bis 6 nach Anlage 1 zu § 15 SGB XI (Wortlaut des Gesetzes, englisch für Leser im Ausland erklärt). */
export type K = { nr: string; de: string; en: string };
export const M1: K[] = [
  { nr: '1.1', de: 'Positionswechsel im Bett', en: 'Changing position in bed' },
  { nr: '1.2', de: 'Halten einer stabilen Sitzposition', en: 'Keeping a stable sitting position' },
  { nr: '1.3', de: 'Umsetzen', en: 'Transferring (bed to chair, chair to toilet)' },
  { nr: '1.4', de: 'Fortbewegen innerhalb des Wohnbereichs', en: 'Moving around inside the home' },
  { nr: '1.5', de: 'Treppensteigen', en: 'Climbing stairs' },
];
export const M2: K[] = [
  { nr: '2.1', de: 'Erkennen von Personen aus dem näheren Umfeld', en: 'Recognising people close to them' },
  { nr: '2.2', de: 'Örtliche Orientierung', en: 'Knowing where they are' },
  { nr: '2.3', de: 'Zeitliche Orientierung', en: 'Knowing the time of day, date, season' },
  { nr: '2.4', de: 'Erinnern an wesentliche Ereignisse oder Beobachtungen', en: 'Remembering important events' },
  { nr: '2.5', de: 'Steuern von mehrschrittigen Alltagshandlungen', en: 'Carrying out everyday tasks with several steps' },
  { nr: '2.6', de: 'Treffen von Entscheidungen im Alltag', en: 'Making everyday decisions' },
  { nr: '2.7', de: 'Verstehen von Sachverhalten und Informationen', en: 'Understanding facts and information' },
  { nr: '2.8', de: 'Erkennen von Risiken und Gefahren', en: 'Recognising risks and dangers' },
  { nr: '2.9', de: 'Mitteilen von elementaren Bedürfnissen', en: 'Expressing basic needs' },
  { nr: '2.10', de: 'Verstehen von Aufforderungen', en: 'Understanding requests' },
  { nr: '2.11', de: 'Beteiligen an einem Gespräch', en: 'Taking part in a conversation' },
];
export const M3: K[] = [
  { nr: '3.1', de: 'Motorisch geprägte Verhaltensauffälligkeiten', en: 'Restless, aimless moving about' },
  { nr: '3.2', de: 'Nächtliche Unruhe', en: 'Restlessness at night' },
  { nr: '3.3', de: 'Selbstschädigendes und autoaggressives Verhalten', en: 'Self-harming behaviour' },
  { nr: '3.4', de: 'Beschädigen von Gegenständen', en: 'Damaging objects' },
  { nr: '3.5', de: 'Physisch aggressives Verhalten gegenüber anderen', en: 'Physical aggression towards others' },
  { nr: '3.6', de: 'Verbale Aggression', en: 'Verbal aggression' },
  { nr: '3.7', de: 'Andere pflegerelevante vokale Auffälligkeiten', en: 'Other vocal behaviour (calling out, screaming)' },
  { nr: '3.8', de: 'Abwehr pflegerischer und anderer unterstützender Maßnahmen', en: 'Resisting care or help' },
  { nr: '3.9', de: 'Wahnvorstellungen', en: 'Delusions' },
  { nr: '3.10', de: 'Ängste', en: 'Anxiety' },
  { nr: '3.11', de: 'Antriebslosigkeit bei depressiver Stimmungslage', en: 'Lack of drive with low mood' },
  { nr: '3.12', de: 'Sozial inadäquate Verhaltensweisen', en: 'Socially inappropriate behaviour' },
  { nr: '3.13', de: 'Sonstige pflegerelevante inadäquate Handlungen', en: 'Other inappropriate actions relevant to care' },
];
export const M4: K[] = [
  { nr: '4.1', de: 'Waschen des vorderen Oberkörpers', en: 'Washing the upper body (front)' },
  { nr: '4.2', de: 'Körperpflege im Bereich des Kopfes', en: 'Grooming: hair, teeth or dentures, shaving' },
  { nr: '4.3', de: 'Waschen des Intimbereichs', en: 'Washing the intimate area' },
  { nr: '4.4', de: 'Duschen und Baden einschließlich Haarewaschen', en: 'Showering or bathing, including hair' },
  { nr: '4.5', de: 'An- und Auskleiden des Oberkörpers', en: 'Dressing and undressing the upper body' },
  { nr: '4.6', de: 'An- und Auskleiden des Unterkörpers', en: 'Dressing and undressing the lower body' },
  { nr: '4.7', de: 'Mundgerechtes Zubereiten der Nahrung, Eingießen von Getränken', en: 'Cutting up food, pouring drinks' },
  { nr: '4.8', de: 'Essen (Punkte dreifach)', en: 'Eating (points count three times)' },
  { nr: '4.9', de: 'Trinken (Punkte doppelt)', en: 'Drinking (points count twice)' },
  { nr: '4.10', de: 'Benutzen einer Toilette oder eines Toilettenstuhls (doppelt)', en: 'Using a toilet or commode (counts twice)' },
  { nr: '4.11', de: 'Folgen einer Harninkontinenz, Dauerkatheter, Urostoma', en: 'Coping with urinary incontinence, catheter, urostomy' },
  { nr: '4.12', de: 'Folgen einer Stuhlinkontinenz, Stoma', en: 'Coping with faecal incontinence, stoma' },
];
export const M6: K[] = [
  { nr: '6.1', de: 'Gestaltung des Tagesablaufs und Anpassung an Veränderungen', en: 'Planning the day and adapting to changes' },
  { nr: '6.2', de: 'Ruhen und Schlafen', en: 'Resting and sleeping' },
  { nr: '6.3', de: 'Sichbeschäftigen', en: 'Keeping themselves occupied' },
  { nr: '6.4', de: 'Vornehmen von in die Zukunft gerichteten Planungen', en: 'Making plans for the future' },
  { nr: '6.5', de: 'Interaktion mit Personen im direkten Kontakt', en: 'Interacting with people face to face' },
  { nr: '6.6', de: 'Kontaktpflege zu Personen außerhalb des direkten Umfelds', en: 'Keeping in touch with people further away' },
];
export const STUFEN_SELB = { de: ['selbständig', 'überwiegend selbständig', 'überwiegend unselbständig', 'unselbständig'], en: ['independent', 'mostly independent', 'mostly dependent', 'dependent'] };
export const STUFEN_FAEH = { de: ['vorhanden, unbeeinträchtigt', 'größtenteils vorhanden', 'in geringem Maße vorhanden', 'nicht vorhanden'], en: ['intact', 'largely intact', 'only slightly present', 'not present'] };
export const STUFEN_HAEUF = { de: ['nie oder sehr selten', 'selten (1 bis 3 × in 2 Wochen)', 'häufig (2 × wöchentlich bis fast täglich)', 'täglich'], en: ['never or very rarely', 'rarely (1 to 3 times in 2 weeks)', 'often (twice a week to almost daily)', 'daily'] };
export const PUNKTE_HAEUF = [0, 1, 3, 5];
