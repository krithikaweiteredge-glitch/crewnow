import { useEffect, useRef, useState } from 'react';

// Soft bands of light that sweep across the hero, like sun glinting off a window.
export function Glint() {
  return (
    <div className="glint" aria-hidden="true"><i /><i /><i /></div>
  );
}

// Thin orange bar at the top that fills as the page is scrolled.
// Updated straight on the DOM node (one rAF per frame) so scrolling never triggers a React render.
export function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const paint = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return <div className="progress" aria-hidden="true"><i ref={bar} /></div>;
}

// "500+", "12k+", "4.9★", "24h" -> animates the number, keeps the suffix.
export function CountUp({ value, duration = 1600 }) {
  const m = String(value).match(/^([\d.]+)(.*)$/);
  const target = m ? parseFloat(m[1]) : 0;
  const decimals = m && m[1].includes('.') ? m[1].split('.')[1].length : 0;
  const suffix = m ? m[2] : '';
  const [n, setN] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setN(target); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / duration);
        setN(target * (1 - Math.pow(1 - k, 4)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!m) return <span>{value}</span>;
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

// Big kinetic text strip. Duplicated once so the loop is seamless.
const WORDS = ['Deep Cleaning', 'Window Care', 'Janitorial', 'Maintenance', 'Sanitization', 'Crew Hire'];
export function Ticker() {
  const row = WORDS.map((w, i) => (
    <span key={w} className={i % 2 ? 'out' : ''}>{w}<i /></span>
  ));
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">{row}{row}</div>
    </div>
  );
}
