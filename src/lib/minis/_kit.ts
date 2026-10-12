/** Gemeinsame Helfer der Mini-Rechner (vom Register ignoriert: Präfix „_“). */
import { formatMoney, formatPercent, formatNumber } from '../format';
import { LAENDER, LAND_NAME } from '../engine/heim';
export type L = 'de' | 'en';
export const T = <A>(l: L, de: A, en: A) => (l === 'en' ? en : de);
export const eur = (x: number, l: L, d?: number) => formatMoney(x, d ?? (Math.abs(x - Math.round(x)) > 0.004 ? 2 : 0), l);
export const pct = (x: number, l: L, d = 1) => formatPercent(x, d, l);
export const num = (x: number, l: L, d = 0) => formatNumber(x, d, l);
export const gradOpt = (l: L, ab = 1) => [1, 2, 3, 4, 5].filter((g) => g >= ab).map((g) => ({ value: String(g), label: T(l, `Pflegegrad ${g}`, `Care grade ${g}`) }));
export const versorgungOpt = (l: L) => [{ value: '0', label: T(l, 'nur Pflegegeld', 'allowance only') }, { value: '1', label: T(l, 'Kombination', 'combined') }, { value: '2', label: T(l, 'nur Sachleistung', 'services only') }];
export const landOpt = (l: L) => LAENDER.map((c, i) => ({ value: String(i), label: LAND_NAME[c][l] }));
export const janein = (l: L) => [{ value: '0', label: T(l, 'Nein', 'No') }, { value: '1', label: T(l, 'Ja', 'Yes') }];
export type Rows = [string, string][];
