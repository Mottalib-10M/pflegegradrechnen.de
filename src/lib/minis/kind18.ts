import { gradAusPunkten } from '../engine/nba';
import { pflegegeld } from '../engine/leistungen';
import { T, eur, janein, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Pflegegrad für ein Kind: die Sonderregel bis 18 Monate', 'Care grade for a child: the rule up to 18 months'),
  cta: T(l, 'Pflegegrad-Rechner öffnen', 'Open the care grade calculator'),
  inputs: [{ id: 'p', label: T(l, 'Gesamtpunkte', 'Total points'), def: 30, max: 100, decimals: 2 }, { id: 'k', label: T(l, 'Kind jünger als 18 Monate?', 'Child under 18 months?'), def: 1, options: janein(l) }],
  run: ({ p, k }: Record<string, number>) => { const g = gradAusPunkten(p, k === 1); const gn = gradAusPunkten(p);
    return { head: [T(l, 'Pflegegrad', 'Care grade'), g ? String(g) : '–'], rows: [[T(l, 'nach der Regel für Erwachsene', 'under the adult scale'), gn ? String(gn) : '–'], [T(l, 'Pflegegeld', 'Allowance'), eur(pflegegeld(g), l)]] as Rows, note: k === 1 ? T(l, 'Bis 18 Monate eine Stufe höher (§ 15 Abs. 7 SGB XI).', 'Up to 18 months one grade higher (section 15(7) SGB XI).') : undefined }; },
});
