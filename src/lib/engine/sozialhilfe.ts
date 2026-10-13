/** Hilfe zur Pflege (SGB XII): Barbetrag im Heim (§ 27b Abs. 3, 27 % der Regelbedarfsstufe 1) und Einkommensgrenze nach § 85. */
import { P, r2 } from './params';
const S = P.sozialhilfe;
export const barbetrag = () => r2(S.regelbedarf_rbs1 * S.barbetrag_anteil);
/** Einkommensgrenze: zweifache RBS 1 + angemessene Unterkunft + Familienzuschlag (70 % der RBS 1, auf volle Euro aufgerundet) je weiterer Person. */
export function einkommensgrenze(unterkunft: number, weiterePersonen = 0) {
  const grund = S.regelbedarf_rbs1 * S.grundbetrag_faktor;
  const zuschlag = Math.ceil(S.regelbedarf_rbs1 * S.familienzuschlag_anteil - 1e-9);
  return { grund, zuschlag, grenze: grund + Math.max(0, unterkunft) + zuschlag * Math.max(0, Math.round(weiterePersonen)) };
}
