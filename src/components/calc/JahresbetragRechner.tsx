/** Gemeinsamer Jahresbetrag 3.539 € für Verhinderungs- und Kurzzeitpflege (§§ 39, 42, 42a SGB XI) mit halbem Pflegegeld während der Ersatzpflege (§ 37 Abs. 2). */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import StackedBar from '../ui/StackedBar';
import { jahresbetrag, pflegegeldWaehrendErsatz } from '../../lib/engine/leistungen';
import { P, type Grad } from '../../lib/engine/params';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, tx, fm, type L } from './kit';
import { gradOpt } from './opts';

export default function JahresbetragRechner({ lang = 'de', methodHref, preset = {} }: { lang?: L; methodHref?: string; preset?: { kz?: number; vf?: number } }) {
  const f = fm(lang);
  const [g, setG] = useState('3');
  const [kz, setKz] = useState(preset.kz ?? 0);
  const [vf, setVf] = useState(preset.vf ?? 1500);
  const [va, setVa] = useState(0);
  const [au, setAu] = useState(0);
  const [tage, setTage] = useState(14);
  useEffect(() => { const u = readParams(window.location.search); if (![...u.keys()].length) return; setG(str(u, 'g', '3')); setKz(num(u, 'kz', kz)); setVf(num(u, 'vf', vf)); setVa(num(u, 'va', 0)); setAu(num(u, 'au', 0)); setTage(num(u, 't', 14)); }, []);
  useEffect(() => { updateURL({ g, kz, vf, va, au, t: tage }); }, [g, kz, vf, va, au, tage]);
  const grad = Number(g) as Grad;
  const r = useMemo(() => jahresbetrag({ grad, kurzzeitEuro: kz, verhinderungFremdEuro: vf, verhinderungAngehoerigEuro: va, angehoerigAufwendungenEuro: au }), [grad, kz, vf, va, au]);
  const pg = pflegegeldWaehrendErsatz(grad, tage);
  const steps = [
    tx(lang, `Ein Topf von ${f.eur(r.topf)} im Kalenderjahr für beide Leistungen (§ 42a), je bis zu ${P.jahresbetrag.wochen_verhinderung} Wochen.`, `One pot of ${f.eur(r.topf)} per calendar year for both benefits (section 42a), each for up to ${P.jahresbetrag.wochen_verhinderung} weeks.`),
    tx(lang, `Nahe Angehörige, die nicht beruflich einspringen: regelmäßig höchstens ${P.jahresbetrag.angehoerige_pflegegeld_monate} × Pflegegeld = ${f.eur(r.capAngehoerig)}, plus nachgewiesene Kosten wie Fahrten oder Verdienstausfall (§ 39 Abs. 3).`, `Close relatives stepping in on a non-professional basis: normally at most ${P.jahresbetrag.angehoerige_pflegegeld_monate} × care allowance = ${f.eur(r.capAngehoerig)}, plus documented costs such as travel or lost earnings (section 39(3)).`),
    tx(lang, `Während der Ersatzpflege läuft das halbe Pflegegeld weiter: ${f.eur2(pg.halbProTag)} pro Tag, ${pg.tage} Tage = ${f.eur2(pg.summe)} (§ 37 Abs. 2).`, `During replacement care half the care allowance continues: ${f.eur2(pg.halbProTag)} a day, ${pg.tage} days = ${f.eur2(pg.summe)} (section 37(2)).`),
    tx(lang, `Erstattung beantragen bis zum Ende des Folgejahres (§ 39 Abs. 1).`, `Claim reimbursement by the end of the following year (section 39(1)).`),
  ];
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <SelectField id="jb-g" label={tx(lang, 'Pflegegrad', 'Care grade')} value={g} onChange={setG} options={gradOpt(lang)} />
            <NumberField id="jb-t" label={tx(lang, 'Tage Ersatzpflege', 'Days of replacement care')} value={tage} onChange={setTage} max={366} lang={lang} help={tx(lang, 'für das halbe Pflegegeld', 'for the half allowance')} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <NumberField id="jb-vf" label={tx(lang, 'Verhinderungspflege: Dienst, Nachbarn', 'Respite: service, neighbours')} value={vf} onChange={setVf} unit="€" max={50000} lang={lang} />
            <NumberField id="jb-kz" label={tx(lang, 'Kurzzeitpflege (Pflegeanteil)', 'Short-term care (care part)')} value={kz} onChange={setKz} unit="€" max={50000} lang={lang} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <NumberField id="jb-va" label={tx(lang, 'Ersatz durch nahe Angehörige', 'Cover by close relatives')} value={va} onChange={setVa} unit="€" max={50000} lang={lang} />
            <NumberField id="jb-au" label={tx(lang, 'deren Fahrtkosten, Verdienstausfall', 'their travel, lost earnings')} value={au} onChange={setAu} unit="€" max={50000} lang={lang} />
          </div>
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label={tx(lang, 'Von der Kasse erstattet', 'Reimbursed by the fund')} wert={f.eur2(r.erstattet)} unter={tx(lang, `Rest im Topf: ${f.eur2(r.rest)}`, `Left in the pot: ${f.eur2(r.rest)}`)} />
          {r.topf > 0 && <div className="mt-3"><StackedBar ariaPrefix={tx(lang, 'Jahresbetrag', 'Annual amount')} total={r.topf} segments={[
            { label: tx(lang, 'Kurzzeitpflege', 'Short-term care'), value: r.kurzzeit, color: '#4f0f0b' },
            { label: tx(lang, 'Verhinderung, fremd', 'Respite, others'), value: r.fremd, color: '#991e14' },
            { label: tx(lang, 'Verhinderung, Angehörige', 'Respite, relatives'), value: r.angehoerig, color: '#ed8078' },
            { label: tx(lang, 'frei', 'unused'), value: r.rest, color: '#e2e8f0' },
          ]} /></div>}
          <Zeilen rows={[
            { label: tx(lang, 'Kurzzeitpflege', 'Short-term care'), value: f.eur2(r.kurzzeit) },
            { label: tx(lang, 'Verhinderungspflege durch Dienst oder Nachbarn', 'Respite by a service or neighbours'), value: f.eur2(r.fremd) },
            { label: tx(lang, 'Verhinderungspflege durch Angehörige', 'Respite by relatives'), value: f.eur2(r.angehoerig) },
            { label: tx(lang, 'Selbst zu zahlen', 'You pay yourself'), value: f.eur2(r.selbst), strong: true, sep: true },
            { label: tx(lang, 'Halbes Pflegegeld in der Zeit', 'Half allowance meanwhile'), value: f.eur2(pg.summe), muted: true },
          ]} />
          <Rechenweg lang={lang} steps={grad < 2 ? [tx(lang, 'Verhinderungs- und Kurzzeitpflege gibt es erst ab Pflegegrad 2. Bei Grad 1 kann der Entlastungsbetrag Kurzzeitpflege bezahlen (§ 45b).', 'Respite and short-term care start at care grade 2. At grade 1 the relief amount can pay for short-term care (section 45b).')] : steps} />
          <Aktionen lang={lang} text={() => tx(lang, `Verhinderungs- und Kurzzeitpflege 2026: ${f.eur2(r.erstattet)} erstattet, ${f.eur2(r.rest)} frei`, `Respite and short-term care 2026: ${f.eur2(r.erstattet)} reimbursed, ${f.eur2(r.rest)} left`)} />
          <Hinweis lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
