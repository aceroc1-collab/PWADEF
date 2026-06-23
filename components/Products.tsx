'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { useState } from 'react';

export interface Product {
  id: string;
  category: string;
  formula: string;
  name: string;
  description: string;
  benefits: string[];
  variants: { mg: string; price: number }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'tirzepatida',
    category: 'METABOLIC PEPTIDES',
    formula: 'C₂₂₅H₃₄₈N₄₈O₆₈ · Agonista dual GIP/GLP-1',
    name: 'Tirzepatida',
    description: 'Agonista dual de los receptores GIP y GLP-1. Investigado por su impacto en la regulación del metabolismo glucídico y el balance energético.',
    benefits: ['AGONISTA GIP/GLP-1', 'METABOLISMO GLUCÍDICO', 'BALANCE ENERGÉTICO'],
    variants: [{ mg: '10 mg', price: 130 }, { mg: '20 mg', price: 240 }],
  },
  {
    id: 'retatrutida',
    category: 'METABOLIC PEPTIDES',
    formula: 'Agonista triple GLP-1/GIP/Glucagón',
    name: 'Retatrutida',
    description: 'Agonista triple de receptores GLP-1, GIP y glucagón. Nueva generación en la investigación del metabolismo energético y composición corporal.',
    benefits: ['AGONISTA TRIPLE', 'COMPOSICIÓN CORPORAL', 'METABOLISMO AVANZADO'],
    variants: [{ mg: '10 mg', price: 150 }, { mg: '20 mg', price: 200 }],
  },
  {
    id: 'bpc-157',
    category: 'RECOVERY PEPTIDES',
    formula: 'C₇₈H₁₃₃N₂₃O₂₃S₂ · MW: 1837.05 Da',
    name: 'BPC-157',
    description: 'Penta-decapéptido de origen gástrico. Ampliamente investigado por sus propiedades citoprotectoras y su rol en la recuperación de tejidos musculoesqueléticos.',
    benefits: ['REGENERACIÓN TISULAR', 'CITOPROTECTOR', 'ANGIOGÉNESIS'],
    variants: [{ mg: '5 mg', price: 70 }, { mg: '10 mg', price: 90 }],
  },
  {
    id: 'tb-500',
    category: 'RECOVERY PEPTIDES',
    formula: 'C₄₁H₆₄N₁₄O₁₂ · MW: 937.04 Da',
    name: 'TB-500',
    description: 'Fragmento sintético de la timosina beta-4. Investigado por su rol en la modulación de la actina y la respuesta inflamatoria sistémica.',
    benefits: ['MODULACIÓN INFLAMATORIA', 'MOVILIDAD CELULAR', 'RECUPERACIÓN'],
    variants: [{ mg: '5 mg', price: 110 }, { mg: '10 mg', price: 170 }],
  },
  {
    id: 'nad-plus',
    category: 'LONGEVITY',
    formula: 'C₂₁H₂₇N₇O₁₄P₂ · MW: 663.43 Da',
    name: 'NAD+',
    description: 'Dinucleótido de nicotinamida y adenina. Coenzima fundamental investigada por su rol en la bioenergética celular, reparación del ADN y vías de longevidad.',
    benefits: ['BIOENERGÉTICA CELULAR', 'REPARACIÓN ADN', 'VÍAS SIRTUINAS'],
    variants: [{ mg: '500 mg', price: 80 }],
  },
  {
    id: 'ghk-cu',
    category: 'REGENERATIVE PEPTIDES',
    formula: 'C₁₄H₂₄CuN₆O₄ · MW: 403.91 Da',
    name: 'GHK-Cu',
    description: 'Tripéptido de cobre de origen endógeno. Investigado por su participación en la síntesis de colágeno, remodelación tisular y respuesta antioxidante.',
    benefits: ['SÍNTESIS COLÁGENO', 'REMODELACIÓN TISULAR', 'ANTIOXIDANTE'],
    variants: [{ mg: '50 mg', price: 40 }],
  },
  {
    id: 'tesamorelin',
    category: 'GH SECRETAGOGUES',
    formula: 'C₂₂₁H₃₆₆N₆₄O₆₂S · MW: 5135.77 Da',
    name: 'Tesamorelin',
    description: 'Análogo sintético del factor liberador de hormona de crecimiento (GHRH). Investigado por sus efectos sobre la secreción de GH y la composición corporal.',
    benefits: ['ANÁLOGO GHRH', 'SECRECIÓN GH', 'COMPOSICIÓN CORPORAL'],
    variants: [{ mg: '20 mg', price: 250 }],
  },
  {
    id: 'klow-blend',
    category: 'BLENDS',
    formula: 'Fórmula patentada · 80 mg',
    name: 'KLOW Blend',
    description: 'Formulación en blend de péptidos de acción sinérgica diseñada para investigación avanzada en recuperación, composición corporal y rendimiento metabólico.',
    benefits: ['SINERGIA PEPTÍDICA', 'ACCIÓN MÚLTIPLE', 'PROTOCOLO AVANZADO'],
    variants: [{ mg: '80 mg', price: 220 }],
  },
  {
    id: 'agua-bac',
    category: 'RECONSTITUCIÓN',
    formula: 'Agua bacteriostática USP · 0.9% Benzyl Alcohol',
    name: 'Agua BAC',
    description: 'Agua bacteriostática estéril para reconstitución de péptidos liofilizados. Formulada con alcohol bencílico al 0.9% para inhibición bacteriana y múltiples usos por vial.',
    benefits: ['RECONSTITUCIÓN PÉPTIDOS', 'ESTÉRIL USP', 'MULTIDOSIS'],
    variants: [{ mg: '10 ml', price: 20 }],
  },
];

const ALL_CATEGORIES = ['TODOS', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart, cart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [added, setAdded] = useState(false);
  const variant = product.variants[selectedVariant];

  const cartQty = cart
    .filter(i => i.id.startsWith(product.id + '-'))
    .reduce((s, i) => s + i.qty, 0);

  const handleAdd = () => {
    addToCart({ id: `${product.id}-${variant.mg}`, name: `${product.name} ${variant.mg}`, price: variant.price, mg: variant.mg });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleShare = async () => {
    const shareData = {
      title: `PEPTILAB — ${product.name}`,
      text: `${product.name} ${variant.mg} — $${variant.price} USD\n${product.benefits.join(' · ')}`,
      url: window.location.href,
    };
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      }
    } catch {}
  };

  return (
    <motion.div
      className="relative p-3 md:p-5"
      style={{ background: 'var(--dark)', border: '1px solid rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Cart quantity badge */}
      <AnimatePresence>
        {cartQty > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-10 font-josefin"
            style={{ background: 'var(--gold)', color: 'var(--black)', fontSize: '0.46rem', fontWeight: 600 }}
          >
            {cartQty}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top accent */}
      <div className="h-px w-full mb-3 md:mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,160,106,0.4), transparent)' }} />

      {/* Category — desktop only */}
      <p className="hidden md:block tracking-[0.32rem] mb-2 font-josefin" style={{ fontSize: '0.54rem', color: 'var(--gold)' }}>
        {product.category}
      </p>

      {/* Formula — desktop only */}
      <p className="hidden md:block font-mono tracking-[0.08rem] mb-2" style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>
        {product.formula}
      </p>

      {/* Name */}
      <h3 className="font-cormorant font-light leading-tight mb-2 md:mb-3" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.75rem)' }}>
        {product.name}
      </h3>

      {/* Description — desktop only */}
      <p className="hidden md:block leading-7 mb-4" style={{ fontSize: '0.75rem', letterSpacing: '0.04rem', color: 'var(--text-dim)' }}>
        {product.description}
      </p>

      {/* Benefits — desktop only */}
      <div className="hidden md:flex flex-wrap gap-2 mb-4">
        {product.benefits.map(b => (
          <span key={b} className="tracking-[0.12rem] px-2.5 py-1 font-josefin"
            style={{ fontSize: '0.48rem', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}>
            {b}
          </span>
        ))}
      </div>

      {/* Variant selector */}
      <div className="flex gap-1 md:gap-2 mb-3 md:mb-5 flex-wrap">
        {product.variants.map((v, i) => (
          <button
            key={v.mg}
            onClick={() => setSelectedVariant(i)}
            className="tracking-[0.04rem] md:tracking-[0.15rem] font-josefin cursor-pointer"
            style={{
              fontSize: 'clamp(0.36rem, 1.4vw, 0.54rem)',
              border: selectedVariant === i ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
              color: selectedVariant === i ? 'var(--gold)' : 'var(--text-muted)',
              background: selectedVariant === i ? 'rgba(184,160,106,0.08)' : 'transparent',
              padding: '0.3rem 0.45rem',
              minHeight: '28px',
              whiteSpace: 'nowrap',
            }}
          >
            {v.mg}
          </button>
        ))}
      </div>

      {/* Price + Add */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1.5 md:gap-4">
        <div>
          <span className="font-mono" style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.4rem)', color: 'var(--gold)' }}>
            ${variant.price}
          </span>
          <span className="hidden md:inline tracking-[0.12rem] ml-2 font-josefin" style={{ fontSize: '0.54rem', color: 'var(--text-muted)' }}>
            / {variant.mg}
          </span>
        </div>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.95 }}
          className="w-full md:flex-1 font-josefin cursor-pointer"
          style={{
            fontSize: 'clamp(0.38rem, 1.4vw, 0.6rem)',
            letterSpacing: 'clamp(0.04rem, 0.5vw, 0.18rem)',
            background: added ? 'var(--gold)' : 'transparent',
            border: '1px solid rgba(184,160,106,0.4)',
            color: added ? 'var(--black)' : 'var(--gold)',
            padding: '0.45rem 0.3rem',
            minHeight: '34px',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={added ? 'added' : 'add'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {added ? '✓ AÑADIDO' : '+ CARRITO'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Share — desktop only */}
      <button
        onClick={handleShare}
        className="hidden md:flex items-center gap-1.5 mt-3 cursor-pointer bg-transparent border-0 opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Compartir producto"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span className="tracking-[0.12rem] font-josefin" style={{ fontSize: '0.44rem' }}>COMPARTIR</span>
      </button>
    </motion.div>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'TODOS' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.benefits.some(b => b.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <section id="products" className="py-14 relative overflow-hidden" style={{ background: 'var(--black)' }}>
      {/* Header */}
      <div className="px-5 mb-8">
        <motion.p
          className="tracking-[0.42rem] mb-3 font-josefin"
          style={{ fontSize: '0.6rem', color: 'var(--gold)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          CATÁLOGO
        </motion.p>
        <motion.h2
          className="font-cormorant font-light"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Nuestros <em className="italic" style={{ color: 'var(--gold)' }}>Productos</em>
        </motion.h2>
        <motion.p
          className="tracking-[0.15rem] mt-2 font-josefin"
          style={{ fontSize: '0.54rem', color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          PRECIOS EN USD · CONSULTAR DISPONIBILIDAD
        </motion.p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="BUSCAR PÉPTIDO..."
            className="w-full font-josefin bg-transparent"
            style={{
              fontSize: '0.54rem',
              letterSpacing: '0.15rem',
              color: 'var(--text)',
              border: '1px solid rgba(184,160,106,0.2)',
              padding: '0.75rem 2.5rem 0.75rem 1rem',
              outline: 'none',
              caretColor: 'var(--gold)',
            }}
          />
          {search ? (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-0"
              style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1 }}
              aria-label="Limpiar búsqueda"
            >✕</button>
          ) : (
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(184,160,106,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="scroll-x-touch flex gap-2 px-5 pb-1 mb-6" style={{ scrollSnapType: 'none' }}>
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="tracking-[0.15rem] font-josefin cursor-pointer flex-shrink-0"
            style={{
              fontSize: '0.5rem',
              border: activeCategory === cat ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
              color: activeCategory === cat ? 'var(--gold)' : 'var(--text-muted)',
              background: activeCategory === cat ? 'rgba(184,160,106,0.08)' : 'transparent',
              padding: '0.5rem 0.85rem',
              minHeight: '36px',
              whiteSpace: 'nowrap',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 px-5"
        >
          <p className="tracking-[0.25rem] font-josefin" style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>
            SIN RESULTADOS PARA &ldquo;{search.toUpperCase()}&rdquo;
          </p>
        </motion.div>
      )}

      {/* Products grid — 3 cols mobile, 2 cols tablet, 3 cols desktop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-px px-0"
          style={{ background: 'rgba(184,160,106,0.04)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
