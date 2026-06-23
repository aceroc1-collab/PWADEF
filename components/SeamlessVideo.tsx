'use client';

import { useEffect, useRef } from 'react';

const FADE = 1.4;

export default function SeamlessVideo({
  src,
  opacity = 1,
  className = '',
}: {
  src: string;
  opacity?: number;
  className?: string;
}) {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const busy = useRef(false);

  useEffect(() => {
    const va = refA.current;
    const vb = refB.current;
    if (!va || !vb) return;

    va.play().catch(() => {});

    function crossfade(from: HTMLVideoElement, to: HTMLVideoElement) {
      if (busy.current) return;
      busy.current = true;
      to.currentTime = 0;
      to.play().catch(() => {});
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / (FADE * 1000), 1);
        from.style.opacity = String(opacity * (1 - p));
        to.style.opacity = String(opacity * p);
        if (p < 1) requestAnimationFrame(tick);
        else busy.current = false;
      };
      requestAnimationFrame(tick);
    }

    const checkA = () => {
      if (!busy.current && va.duration && va.duration - va.currentTime <= FADE + 0.15) crossfade(va, vb);
    };
    const checkB = () => {
      if (!busy.current && vb.duration && vb.duration - vb.currentTime <= FADE + 0.15) crossfade(vb, va);
    };

    va.addEventListener('timeupdate', checkA);
    vb.addEventListener('timeupdate', checkB);
    return () => {
      va.removeEventListener('timeupdate', checkA);
      vb.removeEventListener('timeupdate', checkB);
    };
  }, [opacity]);

  const base: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', pointerEvents: 'none',
  };

  return (
    <>
      <video
        ref={refA} autoPlay muted playsInline preload="auto"
        style={{ ...base, opacity }}
        onError={e => { (e.target as HTMLVideoElement).style.display = 'none'; }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={refB} muted playsInline preload="auto"
        style={{ ...base, opacity: 0 }}
        onError={e => { (e.target as HTMLVideoElement).style.display = 'none'; }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
