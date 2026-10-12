import { jahr, kombination } from '../engine/leistungen';
import { P } from '../engine/params';
import { T, eur, gradOpt, versorgungOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Was dieser Pflegegrad 2026 im Monat bringt', 'What this care grade brings per month in 2026'),
  cta: T(l, 'Alle Leistungen mit Tagespflege und Wohngruppe rechnen', 'All benefits incl. day care and shared flats'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l) }, { id: 'v', label: T(l, 'Versorgung', 'Care set-up'), def: 0, options: versorgungOpt(l) }],
  run: ({ g, v }: Record<string, number>) => {
    const vers = v === 0 ? 'angehoerige' : v === 1 ? 'kombi' : 'pflegedienst';
    const j = jahr({ grad: g as 2, versorgung: vers, pflegedienstEuro: P.sachleistung[String(Math.max(2, g)) as '2'] / 2 });
    const k = kombination(g as 2, P.sachleistung[String(Math.max(2, g)) as '2'] / 2);
    return { head: [T(l, 'Leistungen im Monat', 'Benefits per month'), eur(j.gesamt, l)], rows: [[T(l, 'davon aufs Konto', 'paid to you'), eur(j.aufsKonto, l)], [T(l, 'Sachleistung', 'services'), eur(j.sachleistung, l)], [T(l, 'im Jahr mit Jahresbetrag', 'per year incl. annual budget'), eur(j.jahrGesamt, l)]] as Rows,
      note: v === 1 && g >= 2 ? T(l, `Annahme: Pflegedienst nutzt die Hälfte der Sachleistung (${eur(k.genutzt, l)}).`, `Assumes the care service uses half the budget (${eur(k.genutzt, l)}).`) : g < 2 ? T(l, 'Pflegegrad 1: kein Pflegegeld, keine Sachleistung (§ 28a SGB XI).', 'Grade 1: no allowance, no services in kind (section 28a SGB XI).') : undefined };
  },
});
