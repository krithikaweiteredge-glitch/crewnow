import { Heart, Target, Handshake } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { PageHero, CtaBand, Testimonials } from '../components/Sections.jsx';
import { stats } from '../data.js';
import { CountUp } from '../components/Effects.jsx';
import { px, photos, serviceImages } from '../images.js';

const values = [
  [Target, 'Obsessed with detail', 'We work from written checklists and audit every site, because the small things are what people notice.'],
  [Handshake, 'Reliable by default', 'We show up when we say we will. If something goes wrong, we fix it fast and we own it.'],
  [Heart, 'People first', 'Our crews are trained, fairly paid and proud of their work – and it shows in the results.'],
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="The crew behind your clean, safe workplace."
        text="CrewNow is a facility-services agency that keeps businesses spotless, maintained and fully staffed."
        image={photos.team}
        crumb="About"
      />

      <section className="section">
        <div className="container split">
          <Reveal className="photo-stack">
            <img className="main" src={px(photos.hero, 1000)} alt="CrewNow crew arriving on site" loading="lazy" />
            <img className="sub" src={px(serviceImages.maintenance, 600)} alt="Technician servicing an electrical panel" loading="lazy" />
            <div className="exp"><strong>10+</strong><span>Years of trusted service</span></div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Our story</span>
            <h2>Built because contractors kept <span className="hl">letting people down.</span></h2>
            <p className="lead">
              We started CrewNow after watching facility managers juggle five different vendors for cleaning, repairs and temporary staff – and chase every one of them.
            </p>
            <p style={{ color: 'var(--muted)' }}>
              So we built one agency that does it all, with trained crews, clear communication and fixed pricing. Today we look after hundreds of offices, clinics, stores and campuses – and we still answer our own phones.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          {stats.map((s) => <Reveal key={s.label}><strong><CountUp value={s.value} /></strong><span>{s.label}</span></Reveal>)}
        </div>
      </section>

      <section className="section ice">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">What we stand for</span>
            <h2>Our <span className="hl">values.</span></h2>
          </Reveal>
          <div className="values">
            {values.map(([Ico, t, p], i) => (
              <Reveal key={t} className="value" delay={i * 0.1}>
                <div className="ic"><Ico size={28} /></div>
                <h3>{t}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Kind words</span>
            <h2>What clients <span className="hl">say.</span></h2>
          </Reveal>
          <Testimonials />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
