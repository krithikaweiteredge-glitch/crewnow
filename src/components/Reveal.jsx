import { useEffect, useRef } from 'react';

// Fades children in as they scroll into view. `delay` is in seconds.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    let t;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.add('in');
        // once the entrance has played, hand transitions back to the element's own hover styles
        t = setTimeout(() => el.classList.add('settled'), 1400);
        io.disconnect();
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
}
