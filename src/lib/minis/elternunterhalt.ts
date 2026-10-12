import { P } from '../engine/params';
import { T, eur, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Müssen Kinder für das Heim der Eltern zahlen?', 'Do children have to pay for a parent’s care home?'),
  cta: T(l, 'Eigenanteil im Heim rechnen', 'Work out the care home co-payment'),
  inputs: [{ id: 'e', label: T(l, 'Ihr Jahres-Gesamteinkommen (brutto, § 16 SGB IV)', 'Your total annual income (gross, s. 16 SGB IV)'), def: 85000, unit: '€', max: 10000000 }],
  run: ({ e }: Record<string, number>) => { const g = P.sozialhilfe.jahreseinkommensgrenze_kinder; const drueber = e > g;
    return { head: [T(l, 'Rückgriff des Sozialamts', 'Recourse by the welfare office'), drueber ? T(l, 'möglich', 'possible') : T(l, 'ausgeschlossen', 'excluded')], rows: [[T(l, 'Grenze je Kind', 'Threshold per child'), eur(g, l)], [T(l, 'Abstand zur Grenze', 'Distance to threshold'), eur(Math.abs(g - e), l)]] as Rows, note: T(l, 'Es zählt das Einkommen jedes Kindes einzeln, nicht das der Ehepartner (§ 94 Abs. 1a SGB XII).', 'Each child’s own income counts, not a spouse’s (section 94(1a) SGB XII).') }; },
});
