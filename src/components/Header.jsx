import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Clock } from 'lucide-react';
import { config } from '../config.js';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${config.brand} home`}>
      <span className="logo-mark" aria-hidden="true">C</span>
      {config.brand}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="left">
            <a href={`tel:${config.phoneLink}`}><Phone size={15} /> {config.phone}</a>
            <span><Clock size={15} /> {config.hours}</span>
          </div>
          <div className="right">
            {config.offer
              ? <Link to="/book" className="hot">{config.offer} <ArrowRight size={14} /></Link>
              : <span className="hot">Free fixed-price quote within 24 hours</span>}
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <Logo />
          <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end className={({ isActive }) => (isActive ? 'active' : '')}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/book" className="btn btn-primary btn-sm">Book a service <ArrowRight size={16} /></Link>
          </nav>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>
      {pathname !== '/book' && pathname !== '/thanks' && (
        <div className="mobile-cta">
          <Link to="/book" className="btn btn-primary btn-lg">Book a service <ArrowRight size={18} /></Link>
        </div>
      )}
    </>
  );
}
