/**
 * Leistungen der Pflegeversicherung 2026 bei häuslicher Pflege (§§ 36 bis 45f SGB XI): Pflegegeld,
 * Sachleistung, Kombinationsleistung (§ 38), Umwandlungsanspruch (§ 45a Abs. 4), Entlastungsbetrag
 * (§ 45b), Tagespflege (§ 41), Pflegehilfsmittel (§ 40), Wohngruppenzuschlag (§ 45f), Gemeinsamer
 * Jahresbetrag für Verhinderungs- und Kurzzeitpflege (§§ 39, 42, 42a).
 */
import { P, proGrad, r2, type Grad } from './params';

export const pflegegeld = (g: Grad) => proGrad(P.pflegegeld, g);
export const sachleistung = (g: Grad) => proGrad(P.sachleistung, g);
export const tagespflege = (g: Grad) => proGrad(P.tagespflege, g);
export const vollstationaer = (g: Grad) => proGrad(P.vollstationaer, g);

/**
 * Kombinationsleistung: Das Pflegegeld sinkt um den Prozentsatz, zu dem die Sachleistung genutzt wurde
 * (§ 38 Satz 2). Die Umwandlung für Angebote zur Unterstützung im Alltag (§ 45a Abs. 4) zählt dabei als
 * genutzte Sachleistung, höchstens 40 % des Sachleistungsbetrags.
 */
export function kombination(g: Grad, pflegedienstEuro: number, alltagshilfeEuro = 0) {
  const max = sachleistung(g);
  if (max <= 0) return { max: 0, pflegedienst: 0, umwandlung: 0, genutzt: 0, anteil: 0, pflegegeldVoll: 0, pflegegeld: 0, rest: 0, ueberMax: Math.max(0, pflegedienstEuro) };
  const pd = Math.max(0, Math.min(pflegedienstEuro, max));
  const umwMax = Math.min(r2(max * P.umwandlung.anteil_max), max - pd);
  const umw = Math.max(0, Math.min(alltagshilfeEuro, umwMax));
  const genutzt = pd + umw;
  const anteil = genutzt / max;
  const voll = pflegegeld(g);
  return {
    max, pflegedienst: pd, umwandlung: umw, genutzt, anteil,
    pflegegeldVoll: voll, pflegegeld: r2(voll * (1 - anteil)),
    rest: r2(max - genutzt),
    /** Rechnung des Pflegedienstes über dem Sachleistungsbetrag: privat zu zahlen. */
    ueberMax: Math.max(0, r2(pflegedienstEuro - max)),
  };
}

export type Versorgung = 'angehoerige' | 'pflegedienst' | 'kombi';
export interface MonatEingabe {
  grad: Grad;
  versorgung: Versorgung;
  /** Rechnung des Pflegedienstes im Monat (nur bei „kombi“; bei „pflegedienst“ wird der volle Betrag angesetzt). */
  pflegedienstEuro?: number;
  tagespflegeGenutzt?: boolean;
  wohngruppe?: boolean;
}

/** Was der Haushalt im Monat bei häuslicher Pflege erhalten oder abrechnen kann. */
export function monat(e: MonatEingabe) {
  const g = e.grad;
  const geld = g >= 2;
  let pg = 0, sach = 0;
  if (geld) {
    if (e.versorgung === 'angehoerige') pg = pflegegeld(g);
    else if (e.versorgung === 'pflegedienst') sach = sachleistung(g);
    else { const k = kombination(g, e.pflegedienstEuro ?? 0); pg = k.pflegegeld; sach = k.pflegedienst; }
  }
  const entlastung = g >= 1 ? P.entlastungsbetrag.monat : 0;
  const hilfsmittel = g >= 1 ? P.pflegehilfsmittel.verbrauch_monat : 0;
  const tages = e.tagespflegeGenutzt && geld ? tagespflege(g) : 0;
  const wg = e.wohngruppe && g >= 1 ? P.wohngruppe.zuschlag : 0;
  const aufsKonto = pg;
  const budgets = sach + entlastung + hilfsmittel + tages + wg;
  return { pflegegeld: pg, sachleistung: sach, entlastungsbetrag: entlastung, hilfsmittel, tagespflege: tages, wohngruppe: wg, aufsKonto, budgets, gesamt: r2(aufsKonto + budgets) };
}

/** Jahreswerte: Monatsleistungen mal 12 plus der Gemeinsame Jahresbetrag (ab Pflegegrad 2). */
export function jahr(e: MonatEingabe) {
  const m = monat(e);
  const jb = e.grad >= 2 ? P.jahresbetrag.euro : 0;
  return { ...m, jahresbetrag: jb, jahrGesamt: r2(m.gesamt * 12 + jb), jahrAufsKonto: r2(m.aufsKonto * 12) };
}

/** Entlastungsbetrag: Anspruch im Jahr, nicht genutzter Rest bis 30. Juni des Folgejahres übertragbar (§ 45b Abs. 1). */
export function entlastung(monateMitAnspruch: number, genutztEuro: number) {
  const anspruch = Math.max(0, Math.min(12, Math.round(monateMitAnspruch))) * P.entlastungsbetrag.monat;
  const genutzt = Math.max(0, Math.min(genutztEuro, anspruch));
  return { anspruch, genutzt, uebertrag: r2(anspruch - genutzt) };
}

export type Ersatz = 'fremd' | 'angehoerig';
export interface JahresbetragEingabe {
  grad: Grad;
  /** Pflegebedingte Kosten der Kurzzeitpflege (ohne Unterkunft, Verpflegung, Investitionskosten). */
  kurzzeitEuro: number;
  /** Kosten der Verhinderungspflege durch Pflegedienst, Nachbarn oder nicht verwandte Personen. */
  verhinderungFremdEuro: number;
  /** Verhinderungspflege durch nahe Angehörige (bis 2. Grad) oder Haushaltsmitglieder, nicht erwerbsmäßig. */
  verhinderungAngehoerigEuro: number;
  /** Nachgewiesene Aufwendungen der Angehörigen (Fahrtkosten, Verdienstausfall). */
  angehoerigAufwendungenEuro: number;
}

/**
 * Gemeinsamer Jahresbetrag 3.539 € (§ 42a): Kurzzeitpflege (§ 42 Abs. 2) und Verhinderungspflege (§ 39)
 * teilen sich einen Topf. Bei nicht erwerbsmäßiger Ersatzpflege durch nahe Angehörige zahlt die Kasse
 * regelmäßig höchstens zwei Monatsbeträge des Pflegegeldes, dazu nachgewiesene Aufwendungen, zusammen
 * nie mehr als der Jahresbetrag (§ 39 Abs. 3).
 */
export function jahresbetrag(e: JahresbetragEingabe) {
  const topf = e.grad >= 2 ? P.jahresbetrag.euro : 0;
  const capAng = pflegegeld(e.grad) * P.jahresbetrag.angehoerige_pflegegeld_monate;
  const angPflege = Math.min(Math.max(0, e.verhinderungAngehoerigEuro), capAng);
  const angGesamt = angPflege + Math.max(0, e.angehoerigAufwendungenEuro);
  let rest = topf;
  const kurz = Math.min(Math.max(0, e.kurzzeitEuro), rest); rest -= kurz;
  const fremd = Math.min(Math.max(0, e.verhinderungFremdEuro), rest); rest -= fremd;
  const ang = Math.min(angGesamt, rest); rest -= ang;
  const beantragt = Math.max(0, e.kurzzeitEuro) + Math.max(0, e.verhinderungFremdEuro) + Math.max(0, e.verhinderungAngehoerigEuro) + Math.max(0, e.angehoerigAufwendungenEuro);
  const erstattet = r2(kurz + fremd + ang);
  return { topf, kurzzeit: r2(kurz), fremd: r2(fremd), angehoerig: r2(ang), capAngehoerig: capAng, erstattet, rest: r2(rest), selbst: r2(Math.max(0, beantragt - erstattet)) };
}

/** Halbes Pflegegeld während Verhinderungs- oder Kurzzeitpflege, je bis zu acht Wochen (§ 37 Abs. 2 Satz 2, Monat = 30 Tage). */
export function pflegegeldWaehrendErsatz(g: Grad, tage: number) {
  const t = Math.max(0, Math.min(tage, P.jahresbetrag.wochen_verhinderung * 7));
  const tag = pflegegeld(g) / 30;
  return { tage: t, proTagVoll: r2(tag), halbProTag: r2(tag * P.jahresbetrag.pflegegeld_fortzahlung_anteil), summe: r2(tag * P.jahresbetrag.pflegegeld_fortzahlung_anteil * t) };
}

/** Pflegegeld für einen angebrochenen Monat (§ 37 Abs. 2 Satz 1: Monat mit 30 Tagen). */
export const pflegegeldTeilmonat = (g: Grad, tage: number) => r2(pflegegeld(g) / 30 * Math.max(0, Math.min(30, tage)));

/** Pflegehilfsmittel: Zuzahlung 10 %, höchstens 25 € je technischem Hilfsmittel (§ 40 Abs. 3); Verbrauchsprodukte ohne Zuzahlung bis 42 €. */
export function hilfsmittelZuzahlung(preis: number) {
  return r2(Math.min(Math.max(0, preis) * P.pflegehilfsmittel.zuzahlung_anteil, P.pflegehilfsmittel.zuzahlung_max));
}

/** Wohnumfeldverbesserung: bis 4.180 € je Maßnahme und Person, gemeinsame Wohnung höchstens 16.720 € (§ 40 Abs. 4). */
export function wohnumfeld(kosten: number, personen = 1) {
  const n = Math.max(1, Math.round(personen));
  const cap = Math.min(P.wohnumfeld.je_massnahme * n, P.wohnumfeld.max_gemeinsam);
  const zuschuss = Math.min(Math.max(0, kosten), cap);
  return { cap, zuschuss, selbst: r2(Math.max(0, kosten - zuschuss)), proPerson: r2(zuschuss / n) };
}
