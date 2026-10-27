import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { PageHero, CtaBand, Faq } from '../components/Sections.jsx';
import { services } from '../data.js';
import { px, serviceImages } from '../images.js';

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Every service your building needs. Handled."
        text="Choose one service or combine several into a single visit, with one quote and one invoice."
        image={34517611}
        crumb="Services"
      />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className="svc-row">
              <Reveal className="svc-photo">
                <span className="num">0{i + 1}</span>
                <img src={px(serviceImages[s.id], 1000)} alt={s.title} loading="lazy" />
              </Reveal>
              <Reveal delay={0.08}>
                <span className="pill">{s.tag}</span>
                <h2 style={{ fontSize: 'clamp(2.4rem,4.2vw,3.4rem)' }}>{s.title}</h2>
                <p className="lead">{s.short}</p>
                <ul className="ticks">
                  {s.items.map((it) => <li key={it}><Check size={18} strokeWidth={3} />{it}</li>)}
                </ul>
                <Link to={`/book?service=${s.id}`} className="btn btn-primary">
                  {s.id === 'staffing' ? 'Hire a crew' : 'Book this service'} <ArrowRight size={17} />
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="section ice">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">FAQ</span>
            <h2>Good to know.</h2>
          </Reveal>
          <Faq />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
