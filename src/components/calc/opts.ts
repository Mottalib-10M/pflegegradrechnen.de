/** Auswahllisten, die mehrere Rechner teilen. */
import { tx, type L } from './kit';
export const gradOpt = (l: L, ab = 1) => [1, 2, 3, 4, 5].filter((g) => g >= ab).map((g) => ({ value: String(g), label: tx(l, `Pflegegrad ${g}`, `Care grade ${g}`) }));
export const versorgungOpt = (l: L) => [
  { value: 'angehoerige', label: tx(l, 'Angehörige pflegen', 'Family cares') },
  { value: 'kombi', label: tx(l, 'Angehörige und Pflegedienst', 'Family and a care service') },
  { value: 'pflegedienst', label: tx(l, 'nur Pflegedienst', 'Care service only') },
];
export const janeinOpt = (l: L) => [{ value: '0', label: tx(l, 'Nein', 'No') }, { value: '1', label: tx(l, 'Ja', 'Yes') }];
