import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Star, Quote, Phone } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { faqs, testimonials } from '../data.js';
import { px, photos } from '../images.js';
import { config } from '../config.js';

export function PageHero({ eyebrow, title, text, image = photos.office, crumb }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url(${px(image, 1600)})` }}>
      <div className="container">
        <div className="crumbs"><Link to="/">Home</Link> / <span>{crumb || eyebrow}</span></div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export function CtaBand({ title = <>Let’s make your workplace <span className="hl">effortlessly spotless.</span></>, text = 'Tell us what you need and we’ll send a fixed quote within one business day. No obligation.' }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta" style={{ backgroundImage: `url(${px(photos.openOffice, 1600)})` }}>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="row-btns">
            <Link to="/book" className="btn btn-primary btn-lg">Book a service <ArrowRight size={18} /></Link>
            <a href={`tel:${config.phoneLink}`} className="btn btn-ghost btn-lg"><Phone size={18} /> {config.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <div className="quotes">
      {testimonials.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.1} className="quote">
          <Quote className="qm" size={64} fill="currentColor" strokeWidth={0} />
          <div className="stars" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={18} fill="currentColor" strokeWidth={0} />)}
          </div>
          <blockquote>“{t.quote}”</blockquote>
          <div className="who">
            <span className="avatar">{t.name[0]}</span>
            <div><b>{t.name}</b><small>{t.role}</small></div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Faq({ limit }) {
  return (
    <div className="faqs">
      {faqs.slice(0, limit).map((f) => (
        <details key={f.q} className="faq">
          <summary>{f.q}<span className="pl"><Plus size={20} /></span></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
