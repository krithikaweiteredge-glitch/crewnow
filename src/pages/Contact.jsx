import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { PageHero } from '../components/Sections.jsx';
import { config } from '../config.js';

export default function Contact() {
  const rows = [
    [Phone, 'Call us', config.phone, `tel:${config.phoneLink}`],
    [Mail, 'Email us', config.email, `mailto:${config.email}`],
    [MapPin, 'Visit us', config.address],
    [Clock, 'Opening hours', config.hours],
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk about your space." text="Questions, custom requirements or an urgent job? We’re a call or email away." />
      <section className="section">
        <div className="container form-layout">
          <Reveal className="form-card">
            <h2 style={{ fontSize: '1.8rem' }}>Get in touch</h2>
            <p className="lead" style={{ marginBottom: 32 }}>
              The fastest way to get a price is our booking form – it takes about two minutes and goes straight to our team.
            </p>
            {rows.map(([Ico, label, value, href]) => (
              <div className="cl" key={label}>
                <div className="ic"><Ico size={22} /></div>
                <div>
                  <b>{label}</b>
                  {href ? <a href={href}>{value}</a> : <span>{value}</span>}
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal className="side" delay={0.1}>
            <div className="side-card">
              <h3>Need a quote?</h3>
              <p style={{ color: '#b9cbe0' }}>Tell us the service, site and date. We’ll come back within one business day with a fixed price.</p>
              <Link to="/book" className="btn btn-primary">Book a service <ArrowRight size={17} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
