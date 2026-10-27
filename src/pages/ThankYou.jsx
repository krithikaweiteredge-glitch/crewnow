import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { config } from '../config.js';

export default function ThankYou() {
  return (
    <section className="done">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="tick"><Check size={46} strokeWidth={3} /></div>
        <h1 style={{ fontSize: 'clamp(2.8rem,6vw,4.4rem)' }}>Thank you. We’ve got it.</h1>
        <p className="lead">
          Your booking request is with our team. Expect a confirmation and a fixed quote by email within one business day.
        </p>
        <p style={{ color: 'var(--muted)' }}>Urgent? Call us on <a href={`tel:${config.phoneLink}`} style={{ color: 'var(--royal)', fontWeight: 700 }}>{config.phone}</a>.</p>
        <Link to="/" className="btn btn-dark" style={{ marginTop: 16 }}>Back to home <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
