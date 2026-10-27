import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Header.jsx';
import { config } from '../config.js';
import { services } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p style={{ maxWidth: 300 }}>
              Commercial cleaning, maintenance and staffing for businesses that expect more than “good enough”.
            </p>
            <Link to="/book" className="btn btn-primary btn-sm">Get a free quote</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/about">About us</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/book">Book online</Link>
          </div>
          <div>
            <h4>Services</h4>
            {services.slice(0, 5).map((s) => (
              <Link key={s.id} to={`/book?service=${s.id}`}>{s.title}</Link>
            ))}
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href={`tel:${config.phoneLink}`} style={{ display: 'flex', gap: 10 }}><Phone size={18} /> {config.phone}</a>
            <a href={`mailto:${config.email}`} style={{ display: 'flex', gap: 10 }}><Mail size={18} /> {config.email}</a>
            <span style={{ display: 'flex', gap: 10, fontSize: '.95rem' }}><MapPin size={18} style={{ flex: 'none', marginTop: 4 }} /> {config.address}</span>
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} {config.brand}. All rights reserved.</span>
          <span>{config.hours}</span>
        </div>
      </div>
    </footer>
  );
}
