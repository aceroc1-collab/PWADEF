'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from './CartContext';

interface StackItem {
  id: string;
  name: string;
  price: number;
  mg: string;
}

interface Stack {
  id: string;
  badge: string;
  badgeColor: string;
  name: string;
  subtitle: string;
  desc: string;
  items: StackItem[];
  accentColor: string;
  bgColor: string;
}

const STACKS: Stack[] = [
  {
    id: 'recovery',
    badge: 'RECOVERY',
    badgeColor: 'rgba(0,212,255,0.7)',
    name: 'Recovery Protocol',
    subtitle: 'BPC-157 · TB-500',
    desc: 'El dúo más investigado en recuperación tisular. Acción citoprotectora y modulación inflamatoria sistémica para protocolos de recuperación avanzada.',
    items: [
      { id: 'bpc-157-5 mg', name: 'BPC-157 5 mg', price: 70, mg: '5 mg' },
      { id: 'tb-500-5 mg', name: 'TB-500 5 mg', price: 110, mg: '5 mg' },
    ],
    accentColor: 'rgba(0,212,255,0.35)',
    bgColor: 'rgba(0,212,255,0.04)',
  },
  {
    id: 'metabolic',
    badge: 'METABOLIC',
    badgeColor: 'rgba(184,160,106,0.8)',
    name: 'Metabolic Protocol',
    subtitle: 'Tirzepatida · Retatrutida',
    desc: 'Agonismo dual y triple GLP-1 en un protocolo sin precedentes. La combinación más avanzada para investigación en metabolismo energético y composición corporal.',
    items: [
      { id: 'tirzepatida-10 mg', name: 'Tirzepatida 10 mg', price: 130, mg: '10 mg' },
      { id: 'retatrutida-10 mg', name: 'Retatrutida 10 mg', price: 150, mg: '10 mg' },
    ],
    accentColor: 'rgba(184,160,106,0.4)',
    bgColor: 'rgba(184,160,106,0.04)',
  },
  {
    id: 'longevity',
    badge: 'LONGEVITY',
    badgeColor: 'rgba(192,200,212,0.7)',
    name: 'Longevity Protocol',
    subtitle: 'NAD+ · GHK-Cu · Tesamorelin',
    desc: 'Tres pilares de la investigación en longevidad: bioenergética celular, síntesis de colágeno y secreción de hormona de crecimiento. El stack de élite.',
    items: [
      { id: 'nad-plus-500 mg', name: 'NAD+ 500 mg', price: 80, mg: '500 mg' },
      { id: 'ghk-cu-50 mg', name: 'GHK-Cu 50 mg', price: 40, mg: '50 mg' },
      { id: 'tesamorelin-20 mg', name: 'Tesamorelin 20 mg', price: 250, mg: '20 mg' },
    ],
    accentColor: 'rgba(192,200,212,0.35)',
    bgColor: 'rgba(192,200,212,0.03)',
  },
];

function StackCard({ stack, index }: { stack: Stack; index: number }) {
  const { addToCart, toggleCart } = useCart();
  const [added, setAdded] = useState(false);
  const total = stack.items.reduce((s, i) => s + i.price, 0);

  const handleAddStack = () => {
    stack.items.forEach(item => addToCart(item));
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      toggleCart();
    }, 900);
  };

  return (
    <motion.div
      className="relative p-6"
      style={{
        background: stack.bgColor,
        border: `1px solid ${stack.accentColor}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${stack.accentColor}, transparent)` }} />

      {/* Badge */}
      <span
        className="inline-block tracking-[0.28rem] font-josefin mb-4 px-2 py-1"
        style={{ fontSize: '0.44rem', color: stack.badgeColor, border: `1px solid ${stack.accentColor}`, background: 'rgba(0,0,0,0.3)' }}
      >
        {stack.badge}
      </span>

      <h3 className="font-cormorant font-light mb-1" style={{ fontSize: '1.6rem' }}>
        {stack.name}
      </h3>
      <p className="tracking-[0.15rem] font-josefin mb-4" style={{ fontSize: '0.5rem', color: stack.badgeColor }}>
        {stack.subtitle}
      </p>
      <p className="leading-7 mb-5 font-josefin" style={{ fontSize: '0.72rem', letterSpacing: '0.04rem', color: 'var(--text-dim)' }}>
        {stack.desc}
      </p>

      {/* Items list */}
      <div className="space-y-2 mb-5">
        {stack.items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: stack.accentColor }} />
              <span className="font-josefin tracking-[0.08rem]" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>
                {item.name}
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
              ${item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Total + CTA */}
      <div className="flex items-center justify-between gap-4 pt-4" style={{ borderTop: `1px solid ${stack.accentColor}` }}>
        <div>
          <p className="tracking-[0.2rem] font-josefin mb-0.5" style={{ fontSize: '0.44rem', color: 'var(--text-muted)' }}>TOTAL STACK</p>
          <span className="font-mono" style={{ fontSize: '1.35rem', color: 'var(--gold)' }}>${total} USD</span>
        </div>
        <motion.button
          onClick={handleAddStack}
          whileTap={{ scale: 0.97 }}
          className="flex-1 font-josefin tracking-[0.16rem] cursor-pointer py-3 flex items-center justify-center gap-2"
          style={{
            fontSize: '0.56rem',
            background: added ? 'var(--gold)' : 'transparent',
            border: `1px solid ${added ? 'var(--gold)' : stack.accentColor}`,
            color: added ? 'var(--black)' : 'var(--text)',
            minHeight: '44px',
            transition: 'background 0.25s, color 0.25s, border-color 0.25s',
          }}
        >
          {added ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              AÑADIDO AL CARRITO
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              AGREGAR STACK
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Stacks() {
  return (
    <section className="py-14 px-5 relative overflow-hidden" style={{ background: 'var(--dark3)' }}>
      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(184,160,106,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,160,106,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10">
        <motion.p
          className="tracking-[0.42rem] mb-3 font-josefin"
          style={{ fontSize: '0.6rem', color: 'var(--gold)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          PROTOCOLOS AVANZADOS
        </motion.p>
        <motion.h2
          className="font-cormorant font-light mb-3"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Stacks <em className="italic" style={{ color: 'var(--gold)' }}>Recomendados</em>
        </motion.h2>
        <motion.p
          className="tracking-[0.1rem] mb-10 font-josefin leading-7"
          style={{ fontSize: '0.72rem', color: 'var(--text-dim)', maxWidth: '380px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Combinaciones sinérgicas diseñadas para investigación de alto rendimiento. Agrega el stack completo al carrito con un solo toque.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(184,160,106,0.06)' }}>
          {STACKS.map((stack, i) => (
            <StackCard key={stack.id} stack={stack} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
