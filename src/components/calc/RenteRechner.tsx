/** Rente für pflegende Angehörige (§ 44 SGB XI, § 166 Abs. 2 SGB VI) und Pflege-Pauschbetrag (§ 33b Abs. 6 EStG). */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { rentenpunkte, pauschbetrag, artAus } from '../../lib/engine/angehoerige';
import type { Versorgung } from '../../lib/engine/leistungen';
import { P, type Grad } from '../../lib/engine/params';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, tx, fm, type L } from './kit';
import { gradOpt, versorgungOpt } from './opts';

export default function RenteRechner({ lang = 'de', methodHref }: { lang?: L; methodHref?: string }) {
  const f = fm(lang);
  const [g, setG] = useState('3');
  const [v, setV] = useState('angehoerige');
  const [anteil, setAnteil] = useState(100);
  const [jahre, setJahre] = useState(5);
  const [personen, setPersonen] = useState(1);
  useEffect(() => { const u = readParams(window.location.search); if (![...u.keys()].length) return; setG(str(u, 'g', '3')); setV(str(u, 'v', 'angehoerige')); setAnteil(num(u, 'a', 100)); setJahre(num(u, 'j', 5)); setPersonen(num(u, 'p', 1)); }, []);
  useEffect(() => { updateURL({ g, v, a: anteil, j: jahre, p: personen }); }, [g, v, anteil, jahre, personen]);
  const grad = Number(g) as Grad;
  const r = useMemo(() => rentenpunkte(grad, artAus(v as Versorgung), anteil / 100, jahre), [grad, v, anteil, jahre]);
  const pb = pauschbetrag(grad, personen);
  const steps = [
    tx(lang, `Beitragsgrundlage: ${f.pct(r.anteil, 2)} der Bezugsgröße ${f.eur(P.rente.bezugsgroesse_monat)}${anteil < 100 ? ` × Ihr Anteil ${anteil} %` : ''} = ${f.eur2(r.einnahmeMonat)} im Monat (§ 166 Abs. 2 SGB VI).`, `Contribution base: ${f.pct(r.anteil, 2)} of the reference value ${f.eur(P.rente.bezugsgroesse_monat)}${anteil < 100 ? ` × your share ${anteil}%` : ''} = ${f.eur2(r.einnahmeMonat)} a month (section 166(2) SGB VI).`),
    tx(lang, `Jahreswert durch das vorläufige Durchschnittsentgelt ${f.eur(P.rente.durchschnittsentgelt)} = ${f.num(r.punkteJahr, 4)} Entgeltpunkte pro Jahr.`, `Annual value divided by the provisional average pay of ${f.eur(P.rente.durchschnittsentgelt)} = ${f.num(r.punkteJahr, 4)} pension points per year.`),
    tx(lang, `Mal Rentenwert ${f.eur(P.rente.rentenwert, 2)} (ab 1. Juli 2026) = ${f.eur2(r.renteProJahr)} Monatsrente je Pflegejahr.`, `Times the pension value ${f.eur(P.rente.rentenwert, 2)} (from 1 July 2026) = ${f.eur2(r.renteProJahr)} monthly pension per year of care.`),
    tx(lang, `Voraussetzung: mindestens ${P.rente.min_stunden_woche} Stunden pro Woche an ${P.rente.min_tage_woche} Tagen, höchstens ${P.rente.max_erwerb_stunden} Stunden Erwerbsarbeit (§ 44 SGB XI).`, `Conditions: at least ${P.rente.min_stunden_woche} hours a week over ${P.rente.min_tage_woche} days, no more than ${P.rente.max_erwerb_stunden} hours of paid work (section 44 SGB XI).`),
  ];
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <SelectField id="rr-g" label={tx(lang, 'Pflegegrad der gepflegten Person', 'Care grade of the person cared for')} value={g} onChange={setG} options={gradOpt(lang, 2)} />
            <SelectField id="rr-v" label={tx(lang, 'Bezogene Leistung', 'Benefit received')} value={v} onChange={setV} options={versorgungOpt(lang)} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <NumberField id="rr-a" label={tx(lang, 'Ihr Anteil an der Pflege', 'Your share of the care')} value={anteil} onChange={setAnteil} unit="%" max={100} lang={lang} help={tx(lang, 'bei mehreren Pflegepersonen', 'if several carers')} />
            <NumberField id="rr-j" label={tx(lang, 'Jahre Pflege', 'Years of care')} value={jahre} onChange={setJahre} max={50} decimals={1} lang={lang} />
          </div>
          <NumberField id="rr-p" label={tx(lang, 'Pflegepersonen für den Pauschbetrag', 'Carers sharing the tax lump sum')} value={personen} onChange={setPersonen} max={10} lang={lang} />
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label={tx(lang, 'Mehr Rente pro Monat', 'Extra pension per month')} wert={f.eur2(r.rente)} unter={tx(lang, `nach ${f.num(jahre, 1)} Jahren, ${f.num(r.punkte, 4)} Entgeltpunkte`, `after ${f.num(jahre, 1)} years, ${f.num(r.punkte, 4)} pension points`)} />
          <Zeilen rows={[
            { label: tx(lang, 'Beitragsgrundlage im Monat', 'Contribution base per month'), value: f.eur2(r.einnahmeMonat) },
            { label: tx(lang, 'Rente je Pflegejahr', 'Pension per year of care'), value: f.eur2(r.renteProJahr) },
            { label: tx(lang, 'Pflege-Pauschbetrag im Jahr', 'Carer’s tax lump sum per year'), value: f.eur(pb.jePerson), strong: true, sep: true },
          ]} />
          <Rechenweg lang={lang} steps={steps} />
          <Aktionen lang={lang} text={() => tx(lang, `Rente aus Pflege, Grad ${grad}: ${f.eur2(r.renteProJahr)} je Pflegejahr`, `Pension from caring, grade ${grad}: ${f.eur2(r.renteProJahr)} per year of care`)} />
          <Hinweis lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
