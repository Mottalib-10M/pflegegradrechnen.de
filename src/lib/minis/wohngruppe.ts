import { P } from '../engine/params';
import { pflegegeld } from '../engine/leistungen';
import { T, eur, gradOpt, janein, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Wohngruppenzuschlag: erfüllt Ihre WG die Bedingungen?', 'Shared-flat supplement: does your flat qualify?'),
  cta: T(l, 'Alle Leistungen rechnen', 'Work out all benefits'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l) }, { id: 'n', label: T(l, 'Mitbewohner außer Ihnen', 'Flatmates besides you'), def: 5, max: 30 }, { id: 'p', label: T(l, 'davon pflegebedürftig', 'of whom need care'), def: 4, max: 30 }, { id: 'k', label: T(l, 'Präsenzkraft beauftragt?', 'Shared assistant hired?'), def: 1, options: janein(l) }],
  run: ({ g, n, p, k }: Record<string, number>) => { const W = P.wohngruppe; const ok = n >= W.min_mitbewohner && n <= W.max_mitbewohner && p >= W.min_pflegebeduerftige_mitbewohner && k === 1;
    return { head: [T(l, 'Zuschlag pro Monat', 'Supplement per month'), eur(ok ? W.zuschlag : 0, l)], rows: [[T(l, 'Gruppengröße erlaubt', 'Group size allowed'), `${W.min_mitbewohner + 1}–${W.max_mitbewohner + 1}`], [T(l, 'Pflegegeld daneben', 'Allowance alongside'), eur(pflegegeld(g as 2), l)]] as Rows, note: ok ? undefined : T(l, 'Voraussetzungen nach § 45f SGB XI nicht erfüllt.', 'Conditions of section 45f SGB XI not met.') }; },
});
