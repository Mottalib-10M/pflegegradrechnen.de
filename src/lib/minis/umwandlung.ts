import { kombination, sachleistung } from '../engine/leistungen';
import { P } from '../engine/params';
import { T, eur, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Umwandlungsanspruch: Alltagshilfe aus dem Sachleistungstopf', 'Conversion claim: everyday help from the services budget'),
  cta: T(l, 'Kombination genau rechnen', 'Work out the combination in detail'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 2, options: gradOpt(l, 2) }, { id: 'a', label: T(l, 'Rechnung Alltagshilfe pro Monat', 'Everyday help bill per month'), def: 250, unit: '€', max: 5000 }],
  run: ({ g, a }: Record<string, number>) => { const k = kombination(g as 2, 0, a);
    return { head: [T(l, 'Erstattet über Umwandlung', 'Refunded via conversion'), eur(k.umwandlung, l)], rows: [[T(l, 'höchstens 40 % von', 'at most 40% of'), eur(sachleistung(g as 2), l)], [T(l, 'Pflegegeld danach', 'Allowance afterwards'), eur(k.pflegegeld, l)], [T(l, 'Entlastungsbetrag zusätzlich', 'Relief amount on top'), eur(P.entlastungsbetrag.monat, l)]] as Rows }; },
});
