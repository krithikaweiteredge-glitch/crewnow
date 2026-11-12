import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, BadgeCheck, Clock, ShieldCheck, Users, Zap, Star, Check, Award, Building2, CalendarCheck,
} from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { Testimonials, Faq, CtaBand } from '../components/Sections.jsx';
import { services, stats } from '../data.js';
import { px, photos, serviceImages, industries } from '../images.js';
import { Glint, CountUp, Ticker } from '../components/Effects.jsx';
import Estimator from '../components/Estimator.jsx';
import { StoryScroll, Statement, Tilt, HeroFx } from '../components/Cinema.jsx';

function QuoteBar() {
  const nav = useNavigate();
  const [service, setService] = useState('pest-management');
  const [size, setSize] = useState('');
  const [date, setDate] = useState('');

  const go = (e) => {
    e.preventDefault();
    const q = new URLSearchParams({ service });
    if (size) q.set('size', size);
    if (date) q.set('date', date);
    nav(`/book?${q.toString()}`);
  };

  return (
    <div className="quote-bar-wrap">
      <div className="container">
        <Reveal as="form" className="quote-bar" onSubmit={go}>
          <div className="qb-head">
            <h3>Your free quote, in two minutes</h3>
            <span><Check size={17} strokeWidth={3} /> No payment. No obligation.</span>
          </div>
          <div className="field">
            <label className="lbl" htmlFor="q-service">I need</label>
            <select id="q-service" value={service} onChange={(e) => setService(e.target.value)}>
              {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="lbl" htmlFor="q-size">Site size (sq ft)</label>
            <input id="q-size" type="number" min="0" inputMode="numeric" placeholder="e.g. 5000" value={size} onChange={(e) => setSize(e.target.value)} />
          </div>
          <div className="field">
            <label className="lbl" htmlFor="q-date">Preferred date</label>
            <input id="q-date" type="date" min={new Date().toISOString().split('T')[0]} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <button className="btn btn-primary btn-lg" type="submit">Get my quote <ArrowRight size={18} /></button>
        </Reveal>
      </div>
    </div>
  );
}

const plans = [
  {
    name: 'One-time service', for: 'For single visits, treatments, installations and one-off events.',
    items: ['Site visit and assessment', 'Fixed, itemised quote', 'Out-of-hours scheduling', 'Trained, uniformed team', 'Report or handover note'],
    id: 'pest-management', cta: 'Get a quote',
  },
  {
    name: 'Annual contract', for: 'For sites that need regular, dependable cover all year.', pop: true,
    items: ['Scheduled visits all year', 'Dedicated account manager', 'Priority emergency response', 'A report after every visit', 'One monthly invoice'],
    id: 'mep-engineering', cta: 'Ask about contracts',
  },
  {
    name: 'Dedicated team on site', for: 'For valet desks, event days and large estates.',
    items: ['Trained, uniformed staff', 'Supervisors on every shift', 'Peak-day and event crews', 'Cover for absences', 'We handle payroll and compliance'],
    id: 'valet-services', cta: 'Hire a team',
  },
];

const scenes = [
  { photo: 6794970, title: 'You tell us what you need.', text: 'Pick a service, set the size of your site and book in two minutes. A fixed quote follows within one business day.' },
  { photo: 6196677, title: 'The right team arrives on time.', text: 'Uniformed, background-checked and briefed on your site before they walk through the door.' },
  { photo: 9679179, title: 'Specialists on every job.', text: 'Skilled technicians, trained handlers and experienced coordinators, each matched to the work in hand.' },
  { photo: 4920293, title: 'Indoors, outdoors, on the day.', text: 'From gardens and car parks to plant rooms and ballrooms, we adapt to the place and the people in it.' },
  { photo: 7750129, title: 'You get your day back.', text: 'A report lands in your inbox, and your team walks into a site that is ready for work.' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <Glint />
        <HeroFx />
        <div className="container hero-grid">
          <div>
            <span className="pill-live"><span className="dot" /> Crews available this week</span>
            <h1>
              Your property,{' '}
              <span className="hl">
                fully looked after.
                <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9C60 2 140 2 298 8" stroke="#d4a647" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".55" /></svg>
              </span>
            </h1>
            <p className="lead">
              Pest management, landscaping, MEP and engineering, valet and event teams, all under one roof. One trusted partner, one simple invoice, and nothing left for you to chase.
            </p>
            <div className="hero-cta">
              <Link to="/book" className="btn btn-primary btn-lg">Book a service <ArrowRight size={18} /></Link>
              <Link to="/services" className="btn btn-ghost btn-lg">Explore services</Link>
            </div>
            <div className="checks-row">
              <span><BadgeCheck size={19} /> Fully insured</span>
              <span><ShieldCheck size={19} /> Background-checked crews</span>
              <span><Award size={19} /> Licensed specialists</span>
            </div>
          </div>

          <div className="hero-media">
            <img className="photo" src={px(photos.hero, 1100)} alt="FourSync team in uniform arriving on site" fetchpriority="high" decoding="async" />
            <div className="float f1">
              <div className="ic"><Star size={22} fill="currentColor" strokeWidth={0} /></div>
              <div><b>4.9 / 5</b><small>from 300+ client reviews</small></div>
            </div>
            <div className="float f2">
              <div className="ic"><Building2 size={22} /></div>
              <div><b>500+ businesses</b><small>trust FourSync</small></div>
            </div>
          </div>
        </div>
      </section>

      <QuoteBar />

      {/* TRUST */}
      <section className="trust">
        <div className="container trust-grid">
          {[
            [ShieldCheck, 'Fully insured', 'Public liability and workers’ compensation'],
            [BadgeCheck, 'Vetted and trained', 'Every professional background-checked'],
            [Clock, 'Out-of-hours service', 'Evenings, nights and weekends'],
          ].map(([Ico, t, s], i) => (
            <Reveal key={t} delay={i * 0.07} className="trust-item">
              <div className="ic"><Ico size={26} /></div>
              <div><b>{t}</b><small>{s}</small></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="statement">
        <div className="container">
          <span className="eyebrow">About FourSync</span>
          <Statement text="We look after the buildings, grounds and events people depend on, so the people inside can get on with their day." accent={['people', 'day']} />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">What we do</span>
            <h2>Five services. <span className="hl">One team behind them.</span></h2>
            <p className="lead">From pest control and landscaping to engineering, valet and events, you get one trusted partner and one simple invoice.</p>
          </Reveal>
          <Tilt className="svc-grid">
            {services.map((s, i) => {
              const Ico = s.icon;
              return (
                <Reveal key={s.id} delay={(i % 4) * 0.08} as={Link} to={`/book?service=${s.id}`} className="scard">
                  <div className="img">
                    <img src={px(serviceImages[s.id], 600)} alt={s.title} loading="lazy" />
                    <span className="tagx">{s.tag}</span>
                    <span className="badge"><Ico size={24} /></span>
                  </div>
                  <div className="body">
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <span className="arrow-link">Book now <ArrowRight size={16} /></span>
                  </div>
                </Reveal>
              );
            })}
          </Tilt>
          <div className="center" style={{ marginTop: 48 }}>
            <Link to="/services" className="btn btn-navy btn-lg">See all service details <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ESTIMATOR */}
      <section className="section est-section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Instant estimate</span>
            <h2>Know your price <span className="hl">before you book.</span></h2>
            <p className="lead">Choose a service, set your site size and watch the estimate update live. When it looks right, book it in one click.</p>
          </Reveal>
          <Reveal><Estimator /></Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section className="section ice">
        <div className="container split">
          <Reveal className="photo-stack">
            <img className="main" src={px(photos.team, 1000)} alt="Uniformed FourSync team on site" loading="lazy" />
            <img className="sub" src={px(serviceImages['landscape-gardening'], 600)} alt="Groundskeeper trimming conifers" loading="lazy" />
            <div className="exp"><strong>10+</strong><span>Years of trusted service</span></div>
          </Reveal>
          <div>
            <Reveal>
              <span className="eyebrow">Why FourSync</span>
              <h2>Made for people who <span className="hl">can’t afford a miss.</span></h2>
              <p className="lead">Facility managers choose FourSync because we turn up on time, do the job properly and make it easy. Here’s what that looks like.</p>
            </Reveal>
            <div className="feat-list">
              {[
                [Zap, 'Fixed, upfront quotes', 'No hidden charges. You receive a clear, itemised price within one business day.'],
                [Users, 'Trained, uniformed crews', 'Supervised teams working to written checklists, with one person always on call for you.'],
                [CalendarCheck, 'Works around your day', 'We schedule work after hours and at weekends, so your team never loses a minute.'],
                [Award, 'Quality you can see', 'Every site is checked against a written checklist and audited regularly, so standards never slip.'],
              ].map(([Ico, t, p], i) => (
                <Reveal key={t} className="feat" delay={i * 0.08}>
                  <div className="ic"><Ico size={25} /></div>
                  <div><h3>{t}</h3><p>{p}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="story-section" aria-label="How a job goes">
        <StoryScroll scenes={scenes} />
      </section>

      {/* INDUSTRIES */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Who we serve</span>
            <h2>Tailored to <span className="hl">your kind of space.</span></h2>
            <p className="lead">Every industry has its own standards. We shape our crews, checklists and schedules around yours.</p>
          </Reveal>
          <Tilt className="ind-grid" max={5}>
            {industries.map((it, i) => (
              <Reveal key={it.name} delay={(i % 3) * 0.08} as={Link} to="/book" className="ind">
                <img src={px(it.photo, 800)} alt={it.name} loading="lazy" />
                <div className="ind-body">
                  <h3>{it.name}</h3>
                  <p>{it.text}</p>
                  <span className="ind-go"><ArrowRight size={20} /></span>
                </div>
              </Reveal>
            ))}
          </Tilt>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats-grid">
          {stats.map((s) => (
            <Reveal key={s.label}><strong><CountUp value={s.value} /></strong><span>{s.label}</span></Reveal>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section className="section ice">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Ways to work with us</span>
            <h2>Choose how you’d <span className="hl">like to work.</span></h2>
            <p className="lead">Every quote is fixed and itemised, so you know the cost before we begin.</p>
          </Reveal>
          <div className="plans">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1} className={`plan ${p.pop ? 'pop' : ''}`}>
                {p.pop && <span className="flag">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="for">{p.for}</p>
                <ul>{p.items.map((it) => <li key={it}><Check size={18} strokeWidth={3} />{it}</li>)}</ul>
                <Link to={`/book?service=${p.id}`} className={`btn ${p.pop ? 'btn-primary' : 'btn-navy'}`}>{p.cta} <ArrowRight size={17} /></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Client stories</span>
            <h2>What our <span className="hl">clients say.</span></h2>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="section ice">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">FAQ</span>
            <h2>Your questions, <span className="hl">answered.</span></h2>
          </Reveal>
          <Faq limit={4} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
