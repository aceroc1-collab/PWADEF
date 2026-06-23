'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';

const navItems = [
  {
    id: 'hero',
    label: 'INICIO',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'products',
    label: 'PRODUCTOS',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    id: 'benefits',
    label: 'CIENCIA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'CONTACTO',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const { cartCount, toggleCart } = useCart();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'products', 'benefits', 'faq', 'contact'];
    const handleScroll = () => {
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed left-0 right-0 bottom-0 z-50 bottom-nav-safe"
      style={{
        background: 'rgba(5,5,7,0.97)',
        borderTop: '1px solid rgba(184,160,106,0.18)',
        backdropFilter: 'blur(20px)',
        height: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div className="flex items-center justify-around h-[4.5rem]">
        {navItems.map(item => {
          const isActive = activeSection === item.id || (item.id === 'hero' && activeSection === 'hero');
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 flex-1 h-full justify-center"
              style={{ color: isActive ? 'var(--gold)' : 'var(--text-muted)' }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
              </motion.div>
              <motion.span
                className="font-josefin tracking-[0.12rem]"
                style={{ fontSize: '0.42rem' }}
                animate={{ opacity: isActive ? 1 : 0.55 }}
              >
                {item.label}
              </motion.span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 w-8 h-0.5"
                  style={{ background: 'var(--gold)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Cart button */}
        <motion.button
          onClick={toggleCart}
          className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 flex-1 h-full justify-center relative"
          style={{ color: 'var(--text-muted)' }}
          whileTap={{ scale: 0.88 }}
        >
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  style={{ background: 'var(--gold)', color: 'var(--black)', fontSize: '0.5rem' }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <span className="font-josefin tracking-[0.12rem]" style={{ fontSize: '0.42rem' }}>
            CARRITO
          </span>
        </motion.button>
      </div>
    </nav>
  );
}
