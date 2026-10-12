/** Kombinationsleistung (§ 38 SGB XI) mit Umwandlungsanspruch (§ 45a Abs. 4): wie viel Pflegegeld neben dem Pflegedienst bleibt. */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import StackedBar from '../ui/StackedBar';
import { kombination } from '../../lib/engine/leistungen';
import { P, type Grad } from '../../lib/engine/params';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, tx, fm, type L } from './kit';
import { gradOpt } from './opts';

export default function KombiRechner({ lang = 'de', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fm(lang);
  const [g, setG] = useState('3');
  const [pd, setPd] = useState(600);
  const [ah, setAh] = useState(0);
  useEffect(() => { const u = readParams(window.location.search); if (![...u.keys()].length) return; setG(str(u, 'g', '3')); setPd(num(u, 'pd', 600)); setAh(num(u, 'ah', 0)); }, []);
  useEffect(() => { updateURL({ g, pd, ah }); }, [g, pd, ah]);
  const grad = Number(g) as Grad;
  const k = useMemo(() => kombination(grad, pd, ah), [grad, pd, ah]);
  const steps = [
    tx(lang, `Sachleistungsbetrag Grad ${grad}: ${f.eur(k.max)}; genutzt ${f.eur2(k.genutzt)} = ${f.pct(k.anteil, 1)}.`, `Grade ${grad} services budget: ${f.eur(k.max)}; used ${f.eur2(k.genutzt)} = ${f.pct(k.anteil, 1)}.`),
    tx(lang, `Pflegegeld ${f.eur(k.pflegegeldVoll)} × ${f.pct(1 - k.anteil, 1)} = ${f.eur2(k.pflegegeld)} (§ 38 Satz 2).`, `Care allowance ${f.eur(k.pflegegeldVoll)} × ${f.pct(1 - k.anteil, 1)} = ${f.eur2(k.pflegegeld)} (section 38).`),
    tx(lang, `Alltagshilfen über den Umwandlungsanspruch höchstens ${f.pct(P.umwandlung.anteil_max, 0)} des Sachleistungsbetrags; sie zählen wie Sachleistung (§ 45a Abs. 4).`, `Everyday help paid through the conversion claim is capped at ${f.pct(P.umwandlung.anteil_max, 0)} of the services budget and counts as services in kind (section 45a(4)).`),
    tx(lang, `An die Aufteilung sind Sie ${P.kombination.bindung_monate} Monate gebunden (§ 38 Satz 3).`, `You are bound to the split for ${P.kombination.bindung_monate} months (section 38).`),
  ];
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <SelectField id="kr-g" label={tx(lang, 'Pflegegrad', 'Care grade')} value={g} onChange={setG} options={gradOpt(lang, 2)} />
            <NumberField id="kr-pd" label={tx(lang, 'Rechnung Pflegedienst', 'Care service bill')} value={pd} onChange={setPd} unit="€" max={20000} lang={lang} help={tx(lang, 'pro Monat, ohne Entlastungsbetrag', 'per month, excluding relief amount')} />
          </div>
          <NumberField id="kr-ah" label={tx(lang, 'Alltagshilfe aus dem Sachleistungstopf (Umwandlung)', 'Everyday help paid from the services budget (conversion)')} value={ah} onChange={setAh} unit="€" max={20000} lang={lang} help={tx(lang, `höchstens ${f.eur(k.max * P.umwandlung.anteil_max, 2)}`, `at most ${f.eur(k.max * P.umwandlung.anteil_max, 2)}`)} />
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label={tx(lang, 'Pflegegeld, das bleibt', 'Care allowance left')} wert={f.eur2(k.pflegegeld)} unter={tx(lang, `${f.pct(1 - k.anteil, 1)} von ${f.eur(k.pflegegeldVoll)}`, `${f.pct(1 - k.anteil, 1)} of ${f.eur(k.pflegegeldVoll)}`)} />
          <div className="mt-3"><StackedBar ariaPrefix={tx(lang, 'Sachleistungstopf', 'Services budget')} total={k.max} segments={[
            { label: tx(lang, 'Pflegedienst', 'Care service'), value: k.pflegedienst, color: '#7e1911' },
            { label: tx(lang, 'Alltagshilfe', 'Everyday help'), value: k.umwandlung, color: '#ed8078' },
            { label: tx(lang, 'frei', 'unused'), value: k.rest, color: '#e2e8f0' },
          ]} /></div>
          <Zeilen rows={[
            { label: tx(lang, 'Pflegedienst über die Kasse', 'Care service via the fund'), value: f.eur2(k.pflegedienst) },
            { label: tx(lang, 'Alltagshilfe über die Kasse', 'Everyday help via the fund'), value: f.eur2(k.umwandlung) },
            { label: tx(lang, 'Pflegegeld aufs Konto', 'Allowance paid to you'), value: f.eur2(k.pflegegeld), strong: true, sep: true },
            ...(k.ueberMax ? [{ label: tx(lang, 'Rechnung über dem Topf: selbst zahlen', 'Bill above the budget: you pay'), value: f.eur2(k.ueberMax) }] : []),
          ]} />
          <Rechenweg lang={lang} steps={steps} />
          <Aktionen lang={lang} text={() => tx(lang, `Kombinationsleistung Grad ${grad}: ${f.eur2(k.pflegegeld)} Pflegegeld neben ${f.eur2(k.genutzt)} Sachleistung`, `Combined benefit grade ${grad}: ${f.eur2(k.pflegegeld)} allowance next to ${f.eur2(k.genutzt)} services`)} />
          <Hinweis lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
