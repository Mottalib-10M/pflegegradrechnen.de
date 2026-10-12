import { P } from '../engine/params';
import { pflegegeld } from '../engine/leistungen';
import { T, eur, gradOpt, versorgungOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Beratungseinsatz: wie oft Sie ihn abrufen müssen', 'Home advice visit: how often it is required'),
  cta: T(l, 'Pflegegeld rechnen', 'Work out the allowance'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l) }, { id: 'v', label: T(l, 'Leistung', 'Benefit'), def: 0, options: versorgungOpt(l) }],
  run: ({ g, v }: Record<string, number>) => { const B = P.beratung; const pflicht = v === 0 && g >= 2;     return { head: [pflicht ? T(l, 'Pflichtbesuch', 'Required visit') : T(l, 'Freiwilliger Besuch', 'Optional visit'), T(l, `alle ${B.pg23_monate} Monate`, `every ${B.pg23_monate} months`)], rows: [[T(l, 'bei Grad 4 und 5 auf Wunsch', 'at grades 4 and 5 on request'), T(l, `alle ${B.pg45_monate} Monate`, `every ${B.pg45_monate} months`)], [T(l, 'Pflegegeld bei Versäumnis gefährdet', 'Allowance at risk if missed'), pflicht ? eur(pflegegeld(g as 2), l) : '–'], [T(l, 'Kosten für Sie', 'Cost to you'), eur(0, l)]] as Rows, note: T(l, `Jeder zweite Besuch auf Wunsch per Video, bis 31. März 2027.`, `Every second visit can be by video on request, until 31 March 2027.`) }; },
});
