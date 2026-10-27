import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Send, Clock, ShieldCheck, Phone } from 'lucide-react';
import { PageHero } from '../components/Sections.jsx';
import { services } from '../data.js';
import { config } from '../config.js';

const FREQ = ['One-time', 'Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Not sure yet'];
const TIMES = ['Morning (7–11 am)', 'Afternoon (11 am–4 pm)', 'Evening (4–9 pm)', 'Overnight', 'Weekend', 'Flexible'];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function Book() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const pre = params.get('service');

  const [picked, setPicked] = useState(() => (services.some((s) => s.id === pre) ? [pre] : []));
  const [v, setV] = useState({
    company: '', name: '', email: '', phone: '', address: '',
    size: params.get('size') || '', frequency: FREQ.includes(params.get('frequency')) ? params.get('frequency') : 'One-time', date: params.get('date') || '', time: 'Flexible', notes: '', _hp: '',
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [fail, setFail] = useState('');

  const set = (k) => (e) => {
    setV((o) => ({ ...o, [k]: e.target.value }));
    if (errors[k]) setErrors((o) => ({ ...o, [k]: false }));
  };
  const toggle = (id) => {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    setErrors((o) => ({ ...o, services: false }));
  };

  const validate = () => {
    const e = {};
    ['company', 'name', 'phone', 'address'].forEach((k) => { if (!v[k].trim()) e[k] = true; });
    if (!EMAIL_RE.test(v.email.trim())) e.email = true;
    if (!picked.length) e.services = true;
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setFail('');
    if (v._hp) return; // honeypot: bots fill this, people never see it
    if (!validate()) {
      requestAnimationFrame(() => document.querySelector('.invalid, .err.show')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      return;
    }

    const names = picked.map((id) => services.find((s) => s.id === id).title).join(', ');
    const data = {
      'Services requested': names,
      Company: v.company,
      'Contact person': v.name,
      Email: v.email,
      Phone: v.phone,
      'Site address': v.address,
      'Site size (sq ft)': v.size || '—',
      Frequency: v.frequency,
      'Preferred date': v.date || '—',
      'Preferred time': v.time,
      Notes: v.notes || '—',
    };

    const inbox = (config.BOOKING_EMAIL || '').trim();
    // Inbox not configured yet: open the visitor's mail app so no request is lost.
    if (!inbox || /@example\.com$/i.test(inbox)) {
      const body = Object.entries(data).map(([k, val]) => `${k}: ${val}`).join('\n');
      window.location.href = `mailto:${config.email}?subject=${encodeURIComponent('Service booking – ' + v.company)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `New booking request – ${v.company} (${names})`,
          _template: 'table',
          _captcha: 'false',
          _replyto: v.email,
        }),
      });
      const json = await res.json();
      if (!(json.success === true || json.success === 'true')) throw new Error(json.message || 'send failed');
      nav('/thanks');
    } catch {
      setFail(`Sorry, we couldn’t send your request. Please try again or call us on ${config.phone}.`);
      setSending(false);
    }
  };

  const f = (k, children) => <div className={`field ${errors[k] ? 'invalid' : ''}`}>{children}</div>;

  return (
    <>
      <PageHero eyebrow="Book a service" title="Tell us what you need." text="Takes about two minutes. We’ll reply within one business day with a fixed quote – no obligation." />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container form-layout">
          <form className="form-card" onSubmit={submit} noValidate>
            <fieldset>
              <legend><span className="n">1</span> Choose your services</legend>
              <div className="chips" role="group" aria-label="Services">
                {services.map((s) => {
                  const Ico = s.icon;
                  return (
                    <label className="chip" key={s.id}>
                      <input type="checkbox" checked={picked.includes(s.id)} onChange={() => toggle(s.id)} />
                      <span><Ico size={20} />{s.title}</span>
                    </label>
                  );
                })}
              </div>
              <p className={`err ${errors.services ? 'show' : ''}`}>Please select at least one service.</p>
            </fieldset>

            <fieldset>
              <legend><span className="n">2</span> About you</legend>
              <div className="row">
                {f('company', <><label className="lbl" htmlFor="company">Company <span className="req">*</span></label>
                  <input id="company" type="text" autoComplete="organization" value={v.company} onChange={set('company')} /><p className="err">Required</p></>)}
                {f('name', <><label className="lbl" htmlFor="name">Your name <span className="req">*</span></label>
                  <input id="name" type="text" autoComplete="name" value={v.name} onChange={set('name')} /><p className="err">Required</p></>)}
              </div>
              <div className="row">
                {f('email', <><label className="lbl" htmlFor="email">Work email <span className="req">*</span></label>
                  <input id="email" type="email" autoComplete="email" value={v.email} onChange={set('email')} /><p className="err">Enter a valid email</p></>)}
                {f('phone', <><label className="lbl" htmlFor="phone">Phone <span className="req">*</span></label>
                  <input id="phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} /><p className="err">Required</p></>)}
              </div>
            </fieldset>

            <fieldset>
              <legend><span className="n">3</span> The job</legend>
              {f('address', <><label className="lbl" htmlFor="address">Site address <span className="req">*</span></label>
                <input id="address" type="text" autoComplete="street-address" value={v.address} onChange={set('address')} /><p className="err">Required</p></>)}
              <div className="row">
                <div className="field">
                  <label className="lbl" htmlFor="size">Site size (sq ft)</label>
                  <input id="size" type="number" min="0" inputMode="numeric" value={v.size} onChange={set('size')} />
                </div>
                <div className="field">
                  <label className="lbl" htmlFor="frequency">How often?</label>
                  <select id="frequency" value={v.frequency} onChange={set('frequency')}>{FREQ.map((o) => <option key={o}>{o}</option>)}</select>
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label className="lbl" htmlFor="date">Preferred start date</label>
                  <input id="date" type="date" min={new Date().toISOString().split('T')[0]} value={v.date} onChange={set('date')} />
                </div>
                <div className="field">
                  <label className="lbl" htmlFor="time">Preferred time</label>
                  <select id="time" value={v.time} onChange={set('time')}>{TIMES.map((o) => <option key={o}>{o}</option>)}</select>
                </div>
              </div>
              <div className="field">
                <label className="lbl" htmlFor="notes">Anything else we should know?</label>
                <textarea id="notes" value={v.notes} onChange={set('notes')} placeholder="Access instructions, floors, special requirements…" />
              </div>
            </fieldset>

            <div className="hp" aria-hidden="true">
              <label>Leave empty<input type="text" tabIndex={-1} autoComplete="off" value={v._hp} onChange={set('_hp')} /></label>
            </div>

            {fail && <div className="form-error" role="alert">{fail}</div>}
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={sending}>
              {sending ? 'Sending…' : <>Send booking request <Send size={18} /></>}
            </button>
            <p className="fine">Free quote. No payment now. Your details are only used to respond to this request.</p>
          </form>

          <aside className="side">
            <div className="side-card">
              <h3>What happens next</h3>
              <ul className="promise">
                <li><Check size={18} strokeWidth={3} /> Your request lands straight in our inbox.</li>
                <li><Clock size={18} /> We reply within one business day with a fixed quote.</li>
                <li><ShieldCheck size={18} /> Insured, vetted crews. Re-clean guarantee.</li>
              </ul>
            </div>
            <div className="side-card light">
              <h3>Prefer to talk?</h3>
              <div className="cl" style={{ marginBottom: 0 }}>
                <div className="ic"><Phone size={20} /></div>
                <div><b>{config.phone}</b><a href={`tel:${config.phoneLink}`}>{config.hours}</a></div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
