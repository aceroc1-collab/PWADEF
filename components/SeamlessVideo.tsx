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

    const isMobile = window.matchMedia('(hover: none)').matches;

    if (isMobile) {
      va.loop = true;

      // Restore cached poster from previous visit
      const posterKey = `peptilab_poster_${src.replace(/\W/g, '_')}`;
      try {
        const cached = localStorage.getItem(posterKey);
        if (cached) va.poster = cached;
      } catch {}

      const tryPlay = () => va.play().catch(() => {});
      tryPlay();

      // iOS blocks autoplay until a user gesture occurs.
      // touchstart is a trusted gesture — play() called here always works.
      document.addEventListener('touchstart', tryPlay, { once: true, passive: true });

      // Capture first frame and cache as poster for next visit
      const captureFrame = () => {
        try {
          const canvas = document.createElement('canvas');
          const w = va.videoWidth || 640;
          const h = va.videoHeight || 360;
          canvas.width = Math.min(w, 640);
          canvas.height = Math.round((Math.min(w, 640) / w) * h);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(va, 0, 0, canvas.width, canvas.height);
            localStorage.setItem(posterKey, canvas.toDataURL('image/jpeg', 0.55));
          }
        } catch {}
      };

      if (va.readyState >= 2) captureFrame();
      else va.addEventListener('loadeddata', captureFrame, { once: true });

      return () => {
        document.removeEventListener('touchstart', tryPlay);
        va.removeEventListener('loadeddata', captureFrame);
      };
    }

    // Desktop: seamless crossfade between video A and video B
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
  }, [opacity, src]);

  const base: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', pointerEvents: 'none',
  };

  return (
    <>
      <video
        ref={refA} autoPlay muted playsInline preload="auto"
        style={{ ...base, opacity }}
        onCanPlay={e => { (e.target as HTMLVideoElement).play().catch(() => {}); }}
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
