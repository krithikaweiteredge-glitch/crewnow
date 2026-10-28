import { useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Inertia scrolling for mouse and trackpad users. Touch devices keep their native scrolling,
   which already feels right, and visitors who ask for reduced motion get none of it. */
export function SmoothScroll() {
  useEffect(() => {
    if (reduced() || !finePointer()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis; };
  }, []);
  return null;
}

// Jump to the top without animating (used when the page changes).
export function scrollTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

/* Headline reveal: every h1 / h2 is split into words that rise out of a mask, one after another,
   the first time the heading scrolls into view. */
function splitWords(el) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  let i = 0;
  const walk = (node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const mask = document.createElement('span');
          mask.className = 'rw';
          const word = document.createElement('span');
          word.className = 'rwi';
          word.style.setProperty('--i', String(i++));
          word.textContent = part;
          mask.appendChild(word);
          frag.appendChild(mask);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1 && n.tagName.toLowerCase() !== 'svg') {
        walk(n);
      }
    });
  };
  walk(el);
}

export function HeadingReveals({ routeKey }) {
  useLayoutEffect(() => {
    if (reduced()) return;
    const heads = Array.from(document.querySelectorAll('main h1, main h2')).filter((h) => !h.closest('.story'));
    heads.forEach(splitWords);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [routeKey]);
  return null;
}
