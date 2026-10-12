import { pauschbetrag, ersparnis } from '../engine/angehoerige';
import { T, eur, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Pflege-Pauschbetrag: was er an Steuer spart', 'Carer’s lump sum: what it saves in tax'),
  cta: T(l, 'Rente aus der Pflege rechnen', 'Work out the pension from caring'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l, 2) }, { id: 'p', label: T(l, 'Pflegepersonen', 'Carers'), def: 1, max: 10 }, { id: 's', label: T(l, 'Ihr Grenzsteuersatz (Annahme)', 'Your marginal tax rate (assumption)'), def: 30, unit: '%', max: 45 }],
  run: ({ g, p, s }: Record<string, number>) => { const b = pauschbetrag(g as 2, p);
    return { head: [T(l, 'Steuerersparnis im Jahr', 'Tax saving per year'), eur(ersparnis(b.jePerson, s / 100), l)], rows: [[T(l, 'Pauschbetrag voll', 'Full lump sum'), eur(b.voll, l)], [T(l, 'Ihr Anteil', 'Your share'), eur(b.jePerson, l)]] as Rows, note: T(l, 'Nur wenn Sie für die Pflege kein Geld erhalten (§ 33b Abs. 6 EStG).', 'Only if you receive no payment for the care (section 33b(6) EStG).') }; },
});
