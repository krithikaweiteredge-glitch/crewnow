import { useEffect, useRef } from 'react';
import { px } from '../images.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// One rAF-throttled scroll listener. `cb` only ever writes styles straight to DOM nodes,
// so scrolling never triggers a React render.
function onScrollFrame(cb) {
  let raf = 0;
  const run = () => { raf = 0; cb(); };
  const on = () => { if (!raf) raf = requestAnimationFrame(run); };
  window.addEventListener('scroll', on, { passive: true });
  window.addEventListener('resize', on);
  cb();
  return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
}

/* ------------------------------------------------------------------
   Scroll-driven story: a pinned full-screen "film" that changes scene
   as the visitor scrolls. Photos cross-fade with a slow zoom.
------------------------------------------------------------------ */
export function StoryScroll({ scenes }) {
  const reduced = prefersReduced();
  const root = useRef(null);
  const imgs = useRef([]);
  const copies = useRef([]);
  const dots = useRef([]);
  const bar = useRef(null);
  const count = useRef(null);
  const n = scenes.length;

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;
    return onScrollFrame(() => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return; // off-screen: do nothing
      const p = clamp(-r.top / total);
      const x = p * (n - 1);
      let near = 0;
      for (let i = 0; i < n; i++) {
        const d = x - i;
        const w = clamp((1 - Math.abs(d)) * 2.6); // hold each scene, fade only near the hand-over
        if (Math.abs(d) < Math.abs(x - near)) near = i;
        const im = imgs.current[i];
        if (im) {
          im.style.opacity = w.toFixed(3);
          im.style.transform = `scale(${(1.14 - 0.1 * w).toFixed(3)}) translate3d(0, ${(d * -2.2).toFixed(2)}%, 0)`;
        }
        const cp = copies.current[i];
        if (cp) {
          const t = clamp(1 - Math.abs(d) * 2.1);
          cp.style.opacity = t.toFixed(3);
          cp.style.transform = `translate3d(0, ${(-d * 46).toFixed(1)}px, 0)`;
          cp.style.visibility = t > 0.01 ? 'visible' : 'hidden';
        }
        if (dots.current[i]) dots.current[i].dataset.on = String(i === near);
      }
      if (bar.current) bar.current.style.setProperty('--p', p.toFixed(3));
      if (count.current) count.current.textContent = String(near + 1).padStart(2, '0');
    });
  }, [n, reduced]);

  if (reduced) {
    return (
      <div className="story-static">
        {scenes.map((s, i) => (
          <article key={s.title}>
            <img src={px(s.photo, 900)} alt="" loading="lazy" />
            <div><span>{String(i + 1).padStart(2, '0')}</span><h3>{s.title}</h3><p>{s.text}</p></div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="story" ref={root} style={{ '--n': n }}>
      <div className="story-stick">
        {scenes.map((s, i) => (
          <div className="story-img" key={s.photo} ref={(el) => (imgs.current[i] = el)} style={{ opacity: i === 0 ? 1 : 0 }}>
            <img src={px(s.photo, 1600)} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
        <div className="story-shade" />
        <div className="story-top">
          <span className="eyebrow">How a job goes</span>
        </div>
        <div className="story-copy">
          {scenes.map((s, i) => (
            <div className="story-scene" key={s.title} ref={(el) => (copies.current[i] = el)} style={{ opacity: i === 0 ? 1 : 0 }}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="story-rail" aria-hidden="true">
          <span className="story-count"><b ref={count}>01</b> / {String(n).padStart(2, '0')}</span>
          <div className="story-line"><i ref={bar} /></div>
          <div className="story-dots">
            {scenes.map((s, i) => <em key={s.title} ref={(el) => (dots.current[i] = el)} data-on={i === 0 ? 'true' : 'false'} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Statement: a big sentence whose words light up as you scroll past.
------------------------------------------------------------------ */
export function Statement({ text, accent = [] }) {
  const root = useRef(null);
  const words = text.split(' ');
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const spans = el.querySelectorAll('.w');
    if (prefersReduced()) { spans.forEach((s) => { s.style.opacity = 1; }); return; }
    return onScrollFrame(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.32));
      const k = p * (spans.length + 4);
      spans.forEach((s, i) => { s.style.opacity = (0.16 + 0.84 * clamp(k - i)).toFixed(3); });
    });
  }, []);
  return (
    <p className="statement-text" ref={root}>
      {words.map((w, i) => (
        <span key={i} className={`w ${accent.includes(w.replace(/[.,]/g, '').toLowerCase()) ? 'acc' : ''}`}>{w}{' '}</span>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------
   Tilt: 3D tilt + soft glare on hover for any child with .scard / .ind.
   Uses one delegated listener on the grid, so it does not touch the
   cards' own refs or the scroll-reveal logic.
------------------------------------------------------------------ */
export function Tilt({ className = '', max = 6, children }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced() || !canHover()) return;
    el.classList.add('tilt-on');
    let raf = 0;
    const move = (e) => {
      const card = e.target.closest('.scard, .ind');
      if (!card || !el.contains(card)) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--rx', `${((0.5 - y) * max * 2).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${((x - 0.5) * max * 2).toFixed(2)}deg`);
        card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      });
    };
    const leave = (e) => {
      const card = e.target.closest && e.target.closest('.scard, .ind');
      if (!card) return;
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerout', leave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', move); el.removeEventListener('pointerout', leave); el.classList.remove('tilt-on'); };
  }, [max]);
  return <div ref={root} className={className}>{children}</div>;
}

/* ------------------------------------------------------------------
   Hero depth: layers drift at different speeds with the mouse and
   with scroll, giving the hero a sense of space.
------------------------------------------------------------------ */
export function HeroFx() {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero || prefersReduced()) return;
    let raf = 0;
    const move = (e) => {
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        hero.style.setProperty('--px', x.toFixed(3));
        hero.style.setProperty('--py', y.toFixed(3));
      });
    };
    if (canHover()) hero.addEventListener('pointermove', move);
    const off = onScrollFrame(() => {
      const h = hero.offsetHeight;
      hero.style.setProperty('--hp', clamp(window.scrollY / h).toFixed(3));
    });
    return () => { cancelAnimationFrame(raf); hero.removeEventListener('pointermove', move); off(); };
  }, []);
  return null;
}
