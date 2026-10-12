import { P } from '../engine/params';
import { T, eur, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Digitale Pflegeanwendung: was die Kasse übernimmt', 'Digital care app: what the fund covers'),
  cta: T(l, 'Alle Leistungen rechnen', 'Work out all benefits'),
  inputs: [{ id: 'a', label: T(l, 'Preis der Anwendung pro Monat', 'App price per month'), def: 45, unit: '€', max: 1000 }, { id: 'u', label: T(l, 'Unterstützung durch Pflegedienst', 'Support by a care service'), def: 20, unit: '€', max: 1000 }],
  run: ({ a, u }: Record<string, number>) => { const d = P.dipa; const ka = Math.min(a, d.anwendung), ku = Math.min(u, d.unterstuetzung);
    return { head: [T(l, 'Kasse zahlt im Monat', 'Fund pays per month'), eur(ka + ku, l)], rows: [[T(l, 'Anwendung (bis 40 €)', 'App (up to €40)'), eur(ka, l)], [T(l, 'Unterstützung (bis 30 €)', 'Support (up to €30)'), eur(ku, l)], [T(l, 'selbst zu zahlen', 'you pay'), eur(a - ka + u - ku, l)]] as Rows }; },
});
