import { P } from '../engine/params';
import { T, num, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Welche Freistellung Ihnen im Betrieb zusteht', 'Which time off your employer must give you'),
  cta: T(l, 'Rente aus der Pflege rechnen', 'Work out the pension from caring'),
  inputs: [{ id: 'b', label: T(l, 'Beschäftigte im Betrieb', 'Employees at your employer'), def: 40, max: 1000000 }],
  run: ({ b }: Record<string, number>) => { const Z = P.pflegezeit;
    const ja = T(l, 'Anspruch', 'right'), nein = T(l, 'kein Anspruch', 'no right');
    return { head: [T(l, 'Kurzzeitige Arbeitsverhinderung', 'Short-term leave'), T(l, `${Z.unterstuetzungsgeld_tage} Tage`, `${Z.unterstuetzungsgeld_tage} days`)], rows: [[T(l, `Pflegezeit bis ${Z.pflegezeit_monate} Monate`, `Care leave up to ${Z.pflegezeit_monate} months`), b > Z.pflegezeit_ab_beschaeftigte ? ja : nein], [T(l, `Familienpflegezeit bis ${Z.familienpflegezeit_monate} Monate`, `Family care leave up to ${Z.familienpflegezeit_monate} months`), b > Z.familienpflegezeit_ab_beschaeftigte ? ja : nein], [T(l, 'Beschäftigte', 'Employees'), num(b, l)]] as Rows }; },
});
