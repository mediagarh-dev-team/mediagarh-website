'use client';

import { useRef, useState, useEffect } from 'react';
import { useReducedMotion, useInView } from 'framer-motion';

const DEFAULT_SPEED = 40;

/**
 * Reusable drag + auto-scroll marquee.
 *
 * Props:
 *  - children   : React nodes (one "set" of content — auto-duplicated to fill screen)
 *  - direction  : 'left' | 'right'   (auto-scroll direction, default 'left')
 *  - speed      : px/sec             (default 40)
 *  - className   : extra classes for the outer wrapper
 *
 * Behaviour:
 *  - Auto-scrolls when in view; pauses on hover, drag, or out-of-view.
 *  - Pointer drag with inertia (fling) + snap-back into the loop.
 *  - Auto-duplicates children enough times to cover the viewport width.
 *  - Respects prefers-reduced-motion.
 *  - Click-after-drag is swallowed so links/buttons don't fire accidentally.
 */
export default function DragMarquee({
  children,
  direction = 'left',
  speed = DEFAULT_SPEED,
  className = '',
}) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const inView = useInView(wrapRef, { margin: '200px' });
  const [copies, setCopies] = useState(2);

  // Refs so the RAF loop reads live values without re-subscribing
  const copiesRef = useRef(2);
  const inViewRef = useRef(false);
  const dirRef = useRef(1);
  const reduceRef = useRef(false);
  copiesRef.current = copies;
  inViewRef.current = inView;
  dirRef.current = direction === 'left' ? -1 : 1;
  reduceRef.current = !!reduceMotion;

  const s = useRef({
    x: 0,
    vel: 0,
    setW: 0,
    pending: false,
    dragging: false,
    justDragged: false,
    hover: false,
    startX: 0,
    lastX: 0,
    lastT: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    const st = s.current;

    const measure = () => {
      const w = track.scrollWidth / copiesRef.current;
      if (!w) return;
      st.setW = w;
      // screen bharne ke liye kitni copies chahiye
      const need = Math.max(2, Math.ceil(wrap.clientWidth / w) + 1);
      if (need !== copiesRef.current) {
        copiesRef.current = need;
        setCopies(need);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let raf;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;

      if (!st.dragging && st.setW) {
        const target = reduceRef.current || st.hover || !inViewRef.current ? 0 : dirRef.current * speed;
        // inertia -> dheere dheere auto speed par wapas
        st.vel += (target - st.vel) * (1 - Math.exp(-dt / 400));
        st.x += (st.vel * dt) / 1000;
      }

      if (st.setW) {
        st.x %= st.setW;
        if (st.x > 0) st.x -= st.setW;
      }

      track.style.transform = `translate3d(${st.x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed]);

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const st = s.current;
    st.pending = true;
    st.justDragged = false;
    st.startX = st.lastX = e.clientX;
    st.lastT = performance.now();
  };

  const onPointerMove = (e) => {
    const st = s.current;
    if (!st.pending) return;

    if (!st.dragging) {
      if (Math.abs(e.clientX - st.startX) < 6) return; // chhota movement = click
      st.dragging = true;
      wrapRef.current.setPointerCapture?.(e.pointerId);
      wrapRef.current.dataset.dragging = 'true';
    }

    const now = performance.now();
    const dx = e.clientX - st.lastX;
    const dt = Math.max(now - st.lastT, 1);
    st.x += dx;
    st.vel = st.vel * 0.6 + (dx / dt) * 1000 * 0.4; // smoothed velocity
    st.lastX = e.clientX;
    st.lastT = now;
  };

  const endDrag = (e) => {
    const st = s.current;
    if (!st.pending) return;
    if (st.dragging) {
      st.justDragged = true;
      // release se pehle ruk gaye the to fling nahi
      if (performance.now() - st.lastT > 80) st.vel = 0;
      wrapRef.current.releasePointerCapture?.(e.pointerId);
      delete wrapRef.current.dataset.dragging;
    }
    st.dragging = false;
    st.pending = false;
  };

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={(e) => e.pointerType === 'mouse' && (s.current.hover = true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && (s.current.hover = false)}
      onDragStart={(e) => e.preventDefault()}
      // drag ke baad accidental click na chale
      onClickCapture={(e) => {
        if (s.current.justDragged) {
          e.stopPropagation();
          e.preventDefault();
          s.current.justDragged = false;
        }
      }}
      style={{ touchAction: 'pan-y' }}
      className={`select-none overflow-hidden ${className}`}
    >
      <div ref={trackRef} className="flex w-max will-change-transform [&_img]:pointer-events-none">
        {Array.from({ length: copies }).map((_, c) => (
          <div key={c} className="flex shrink-0" aria-hidden={c > 0 ? 'true' : undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
