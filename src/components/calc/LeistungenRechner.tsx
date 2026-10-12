/** Startseite: Was der Haushalt 2026 bei häuslicher Pflege erhält (§§ 36, 37, 38, 40, 41, 42a, 45b, 45f SGB XI). */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { jahr, kombination, sachleistung, type Versorgung } from '../../lib/engine/leistungen';
import { P, type Grad } from '../../lib/engine/params';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, tx, fm, type L, type Zeile } from './kit';
import { gradOpt, versorgungOpt, janeinOpt } from './opts';

export default function LeistungenRechner({ lang = 'de', methodHref, gradHref, preset = {} }: { lang?: L; methodHref?: string; gradHref?: string; preset?: { g?: number; v?: Versorgung } }) {
  const f = fm(lang);
  const [g, setG] = useState(String(preset.g ?? 3));
  const [v, setV] = useState<string>(preset.v ?? 'angehoerige');
  const [pd, setPd] = useState(600);
  const [tp, setTp] = useState('0');
  const [wg, setWg] = useState('0');
  useEffect(() => {
    const u = readParams(window.location.search); if (![...u.keys()].length) return;
    setG(str(u, 'g', g)); setV(str(u, 'v', v)); setPd(num(u, 'pd', 600)); setTp(str(u, 'tp', '0')); setWg(str(u, 'wg', '0'));
  }, []);
  useEffect(() => { updateURL({ g, v, pd, tp, wg }); }, [g, v, pd, tp, wg]);
  const grad = Number(g) as Grad;
  const r = useMemo(() => jahr({ grad, versorgung: v as Versorgung, pflegedienstEuro: pd, tagespflegeGenutzt: tp === '1', wohngruppe: wg === '1' }), [grad, v, pd, tp, wg]);
  const k = kombination(grad, pd);
  const rows: Zeile[] = [];
  if (grad >= 2 && v !== 'pflegedienst') rows.push({ label: tx(lang, v === 'kombi' ? `Pflegegeld anteilig (${f.pct(1 - k.anteil, 0)})` : 'Pflegegeld aufs Konto', v === 'kombi' ? `Care allowance, pro rata (${f.pct(1 - k.anteil, 0)})` : 'Care allowance paid to you'), value: f.eur2(r.pflegegeld), strong: true });
  if (grad >= 2 && v !== 'angehoerige') rows.push({ label: tx(lang, 'Sachleistung für den Pflegedienst', 'Care service paid directly'), value: f.eur2(r.sachleistung) });
  rows.push({ label: tx(lang, 'Entlastungsbetrag (gegen Rechnung)', 'Relief amount (against receipts)'), value: f.eur(r.entlastungsbetrag) });
  rows.push({ label: tx(lang, 'Pflegehilfsmittel zum Verbrauch', 'Consumable care aids'), value: f.eur(r.hilfsmittel) });
  if (r.tagespflege) rows.push({ label: tx(lang, 'Tagespflege, eigener Topf', 'Day care, separate budget'), value: f.eur(r.tagespflege) });
  if (r.wohngruppe) rows.push({ label: tx(lang, 'Wohngruppenzuschlag', 'Shared-flat supplement'), value: f.eur(r.wohngruppe) });
  rows.push({ label: tx(lang, 'Summe im Monat', 'Total per month'), value: f.eur2(r.gesamt), strong: true, sep: true });
  if (r.jahresbetrag) rows.push({ label: tx(lang, 'dazu im Jahr: Verhinderungs- und Kurzzeitpflege', 'plus per year: respite and short-term care'), value: f.eur(r.jahresbetrag), muted: true });
  const steps = grad < 2 ? [tx(lang, `Pflegegrad 1 hat kein Pflegegeld und keine Sachleistung (§ 28a SGB XI). Es bleiben der Entlastungsbetrag von ${f.eur(P.entlastungsbetrag.monat)}, Pflegehilfsmittel bis ${f.eur(P.pflegehilfsmittel.verbrauch_monat)} und Zuschüsse zum Umbau.`, `Care grade 1 brings no care allowance and no care services in kind (section 28a SGB XI). What remains is the ${f.eur(P.entlastungsbetrag.monat)} relief amount, care aids up to ${f.eur(P.pflegehilfsmittel.verbrauch_monat)} and grants for home adaptations.`)] : [
    tx(lang, `Pflegegeld Grad ${grad}: ${f.eur(P.pflegegeld[g as '2'])} (§ 37), Sachleistung höchstens ${f.eur(sachleistung(grad))} (§ 36).`, `Grade ${grad}: care allowance ${f.eur(P.pflegegeld[g as '2'])} (section 37), services in kind up to ${f.eur(sachleistung(grad))} (section 36).`),
    ...(v === 'kombi' ? [tx(lang, `Pflegedienst ${f.eur(pd)} von ${f.eur(k.max)} = ${f.pct(k.anteil, 1)} der Sachleistung genutzt; das Pflegegeld sinkt um denselben Prozentsatz (§ 38).`, `Care service ${f.eur(pd)} of ${f.eur(k.max)} = ${f.pct(k.anteil, 1)} of the budget used; the allowance falls by the same percentage (section 38).`)] : []),
    tx(lang, `Entlastungsbetrag ${f.eur(P.entlastungsbetrag.monat)} für alle Grade zu Hause, Rest bis 30. Juni des Folgejahres übertragbar (§ 45b).`, `Relief amount ${f.eur(P.entlastungsbetrag.monat)} at every grade at home, unused money carries over to 30 June of the next year (section 45b).`),
    tx(lang, `Gemeinsamer Jahresbetrag ${f.eur(P.jahresbetrag.euro)} für Verhinderungs- und Kurzzeitpflege (§ 42a).`, `Joint annual amount ${f.eur(P.jahresbetrag.euro)} for respite and short-term care (section 42a).`),
  ];
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <SelectField id="lr-g" label={tx(lang, 'Pflegegrad', 'Care grade (Pflegegrad)')} value={g} onChange={setG} options={gradOpt(lang)} />
            <SelectField id="lr-v" label={tx(lang, 'Wer pflegt?', 'Who provides the care?')} value={v} onChange={setV} options={versorgungOpt(lang)} />
          </div>
          {v === 'kombi' && grad >= 2 && (
            <NumberField id="lr-pd" label={tx(lang, 'Rechnung des Pflegedienstes im Monat', 'Care service bill per month')} value={pd} onChange={setPd} unit="€" max={20000} lang={lang} help={tx(lang, `Sachleistung Grad ${grad}: bis ${f.eur(k.max)}`, `Grade ${grad} budget: up to ${f.eur(k.max)}`)} />
          )}
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <Toggle id="lr-tp" label={tx(lang, 'Tagespflege genutzt?', 'Uses day care?')} value={tp} onChange={setTp} options={janeinOpt(lang)} />
            <Toggle id="lr-wg" label={tx(lang, 'Ambulante Wohngruppe?', 'Assisted shared flat?')} value={wg} onChange={setWg} options={janeinOpt(lang)} />
          </div>
          {gradHref && <p className="text-sm text-navy-700">{tx(lang, 'Noch kein Pflegegrad? ', 'No care grade yet? ')}<a className="font-medium text-accent-700 underline" href={gradHref}>{tx(lang, 'Pflegegrad aus den 64 Kriterien schätzen', 'Estimate the grade from the 64 criteria')}</a></p>}
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label={tx(lang, grad >= 2 && v !== 'pflegedienst' ? 'Pflegegeld pro Monat' : 'Leistungen pro Monat', grad >= 2 && v !== 'pflegedienst' ? 'Care allowance per month' : 'Benefits per month')} wert={f.eur2(grad >= 2 && v !== 'pflegedienst' ? r.pflegegeld : r.gesamt)} unter={tx(lang, `${f.eur2(r.jahrGesamt)} im Jahr mit allen Töpfen`, `${f.eur2(r.jahrGesamt)} a year counting every budget`)} />
          <Zeilen rows={rows} />
          <Rechenweg lang={lang} steps={steps} />
          <Aktionen lang={lang} text={() => tx(lang, `Pflegegrad ${grad}, 2026: ${f.eur2(r.gesamt)} Leistungen im Monat, davon ${f.eur2(r.pflegegeld)} Pflegegeld`, `Care grade ${grad}, 2026: ${f.eur2(r.gesamt)} in benefits a month, of which ${f.eur2(r.pflegegeld)} care allowance`)} />
          <Hinweis lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
