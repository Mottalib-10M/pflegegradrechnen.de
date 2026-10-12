/** Typisierter Zugriff auf params-2026.json: jeder Rechtswert der Seite steht dort, nie in Seiten oder Code. */
import raw from '../../data/params-2026.json';

export type SourceKey = keyof typeof raw.sources;
export type Params = typeof raw;
export const P: Params = raw;

export type Grad = 0 | 1 | 2 | 3 | 4 | 5;
export type Grad25 = 2 | 3 | 4 | 5;
export const GRADE25: Grad25[] = [2, 3, 4, 5];
/** Kaufmännische Rundung auf Cent. */
export const r2 = (x: number) => Math.round((x + Number.EPSILON) * 100) / 100;
/** Ein Betrag je Pflegegrad aus einem Block wie P.pflegegeld; 0 für Grade ohne Anspruch. */
export const proGrad = (block: Record<string, unknown>, g: number): number => {
  const v = block[String(g)];
  return typeof v === 'number' ? v : 0;
};
