import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { config } from '../config.js';

export default function ThankYou() {
  return (
    <section className="done">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="tick"><Check size={46} strokeWidth={3} /></div>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>Request received!</h1>
        <p className="lead">
          Thanks – your booking request is with our team. Expect a confirmation and fixed quote by email within one business day.
        </p>
        <p style={{ color: 'var(--muted)' }}>Urgent? Call us on <a href={`tel:${config.phoneLink}`} style={{ color: 'var(--aqua-dark)', fontWeight: 700 }}>{config.phone}</a>.</p>
        <Link to="/" className="btn btn-dark" style={{ marginTop: 16 }}>Back to home <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
