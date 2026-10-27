import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info } from 'lucide-react';
import { services } from '../data.js';
import { frequencies, estimate, inr } from '../pricing.js';

const PRESETS = [1000, 5000, 15000, 40000];

export default function Estimator() {
  const [service, setService] = useState('deep-cleaning');
  const [size, setSize] = useState(5000);
  const [freq, setFreq] = useState('One-time');

  const svc = services.find((s) => s.id === service);
  const est = estimate(service, size, freq);
  const pct = ((size - 500) / (50000 - 500)) * 100;
  const q = new URLSearchParams({ service, size: String(size), frequency: freq }).toString();

  return (
    <div className="est">
      <div className="est-controls">
        <div className="est-block">
          <span className="est-label"><b>1</b> What do you need?</span>
          <div className="est-chips" role="radiogroup" aria-label="Service">
            {services.map((s) => {
              const Ico = s.icon;
              return (
                <button key={s.id} type="button" role="radio" aria-checked={service === s.id}
                  className={service === s.id ? 'on' : ''} onClick={() => setService(s.id)}>
                  <Ico size={18} />{s.title}
                </button>
              );
            })}
          </div>
        </div>

        {!est.flat && (
          <>
            <div className="est-block">
              <span className="est-label"><b>2</b> How big is the space?</span>
              <div className="est-size">
                <output><strong>{size.toLocaleString('en-IN')}</strong> sq ft</output>
                <div className="presets">
                  {PRESETS.map((p) => (
                    <button key={p} type="button" className={size === p ? 'on' : ''} onClick={() => setSize(p)}>{p.toLocaleString('en-IN')}</button>
                  ))}
                </div>
              </div>
              <input className="est-range" type="range" min="500" max="50000" step="500" value={size}
                style={{ '--p': `${pct}%` }} aria-label="Site size in square feet"
                onChange={(e) => setSize(Number(e.target.value))} />
              <div className="est-scale"><span>500</span><span>50,000+</span></div>
            </div>

            <div className="est-block">
              <span className="est-label"><b>3</b> How often?</span>
              <div className="est-seg" role="radiogroup" aria-label="Frequency">
                {frequencies.map((f) => (
                  <button key={f.id} type="button" role="radio" aria-checked={freq === f.id}
                    className={freq === f.id ? 'on' : ''} onClick={() => setFreq(f.id)}>
                    {f.label}{f.discount > 0 && <em>save {Math.round(f.discount * 100)}%</em>}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="est-result">
        <span className="est-tag">Your estimate</span>
        <h3>{svc.title}</h3>

        {est.flat ? (
          <div key={service} className="est-pop">
            <div className="est-price flat">{est.text}</div>
            <p className="est-hint">{est.hint}</p>
          </div>
        ) : (
          <div key={`${service}-${size}-${freq}`} className="est-pop">
            <div className="est-per">per visit</div>
            <div className="est-price">{inr(est.low)} <span>–</span> {inr(est.high)}</div>
            {est.recurring && est.visits > 1 && (
              <div className="est-month">≈ <b>{inr(est.monthlyLow)} – {inr(est.monthlyHigh)}</b> a month · {est.visits} visits</div>
            )}
            {est.discount > 0 && <div className="est-save"><Check size={15} strokeWidth={3} /> Includes {Math.round(est.discount * 100)}% recurring-contract saving</div>}
          </div>
        )}

        <ul className="est-incl">
          {svc.items.slice(0, 4).map((it) => <li key={it}><Check size={16} strokeWidth={3} />{it}</li>)}
        </ul>

        <Link to={`/book?${q}`} className="btn btn-primary btn-lg">Book this job <ArrowRight size={18} /></Link>
        <p className="est-note"><Info size={14} /> Indicative range. You’ll get a fixed, itemised quote within 24 hours – no obligation.</p>
      </div>
    </div>
  );
}
