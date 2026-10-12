import { jahr } from '../engine/leistungen';
import { T, eur, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Was nach geltendem Recht 2026 zusteht', 'What current 2026 law gives you'),
  cta: T(l, 'Alle Leistungen rechnen', 'Work out all benefits'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l) }],
  run: ({ g }: Record<string, number>) => { const j = jahr({ grad: g as 2, versorgung: 'angehoerige' });
    return { head: [T(l, 'Pflegegeld im Monat (geltendes Recht)', 'Allowance per month (current law)'), eur(j.pflegegeld, l)], rows: [[T(l, 'Entlastungsbetrag', 'Relief amount'), eur(j.entlastungsbetrag, l)], [T(l, 'Jahresbetrag Verhinderung/Kurzzeit', 'Annual respite/short-term budget'), eur(j.jahresbetrag, l)], [T(l, 'im Jahr zusammen', 'per year in total'), eur(j.jahrGesamt, l)]] as Rows, note: T(l, 'Der Reformentwurf ändert diese Werte erst, wenn er Gesetz wird.', 'The draft reform changes these only once it becomes law.') }; },
});
