'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('peptilab_pwa_dismissed')) return;
    } catch {}

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 30000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShow(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    try { localStorage.setItem('peptilab_pwa_dismissed', '1'); } catch {}
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed left-4 right-4 z-[70]"
          style={{ bottom: 'calc(var(--bottom-nav-h) + 1rem)' }}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <div
            className="p-4"
            style={{
              background: 'var(--dark2)',
              borderTop: '2px solid var(--gold)',
              border: '1px solid rgba(184,160,106,0.25)',
              borderTopWidth: '2px',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(184,160,106,0.08)', border: '1px solid rgba(184,160,106,0.25)' }}
              >
                <span className="font-josefin font-thin tracking-[0.1rem]" style={{ fontSize: '0.52rem', color: 'var(--gold)' }}>PL</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="tracking-[0.18rem] font-josefin" style={{ fontSize: '0.58rem', color: 'var(--text)' }}>
                  INSTALAR PEPTILAB APP
                </p>
                <p className="tracking-[0.08rem] mt-0.5 font-josefin" style={{ fontSize: '0.48rem', color: 'var(--text-muted)' }}>
                  ACCESO RÁPIDO · FUNCIONA SIN INTERNET
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="w-7 h-7 flex items-center justify-center flex-shrink-0 cursor-pointer"
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.7rem' }}
                aria-label="Cerrar"
              >✕</button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="flex-1 font-josefin tracking-[0.15rem] cursor-pointer"
                style={{
                  fontSize: '0.52rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  padding: '0.65rem 1rem',
                  minHeight: '38px',
                }}
              >
                AHORA NO
              </button>
              <motion.button
                onClick={handleInstall}
                whileTap={{ scale: 0.97 }}
                className="flex-1 font-josefin tracking-[0.15rem] cursor-pointer"
                style={{
                  fontSize: '0.52rem',
                  background: 'var(--gold)',
                  color: 'var(--black)',
                  border: 'none',
                  padding: '0.65rem 1rem',
                  minHeight: '38px',
                }}
              >
                INSTALAR GRATIS
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
