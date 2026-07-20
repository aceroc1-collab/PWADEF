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
    variants: [{ mg: '10 mg', price: 140 }, { mg: '20 mg', price: 235 }],
  },
  {
    id: 'retatrutida',
    category: 'METABOLIC PEPTIDES',
    formula: 'Agonista triple GLP-1/GIP/Glucagón',
    name: 'Retatrutida',
    description: 'Agonista triple de receptores GLP-1, GIP y glucagón. Nueva generación en la investigación del metabolismo energético y composición corporal.',
    benefits: ['AGONISTA TRIPLE', 'COMPOSICIÓN CORPORAL', 'METABOLISMO AVANZADO'],
    variants: [{ mg: '10 mg', price: 185 }, { mg: '20 mg', price: 285 }, { mg: '30 mg', price: 310 }],
  },
  {
    id: 'bpc-157',
    category: 'RECOVERY PEPTIDES',
    formula: 'C₇₈H₁₃₃N₂₃O₂₃S₂ · MW: 1837.05 Da',
    name: 'BPC-157',
    description: 'Penta-decapéptido de origen gástrico. Ampliamente investigado por sus propiedades citoprotectoras y su rol en la recuperación de tejidos musculoesqueléticos.',
    benefits: ['REGENERACIÓN TISULAR', 'CITOPROTECTOR', 'ANGIOGÉNESIS'],
    variants: [{ mg: '10 mg', price: 110 }],
  },
  {
    id: 'tb-500',
    category: 'RECOVERY PEPTIDES',
    formula: 'C₄₁H₆₄N₁₄O₁₂ · MW: 937.04 Da',
    name: 'TB-500',
    description: 'Fragmento sintético de la timosina beta-4. Investigado por su rol en la modulación de la actina y la respuesta inflamatoria sistémica.',
    benefits: ['MODULACIÓN INFLAMATORIA', 'MOVILIDAD CELULAR', 'RECUPERACIÓN'],
    variants: [{ mg: '10 mg', price: 165 }],
  },
  {
    id: 'ipamorelin',
    category: 'GH SECRETAGOGUES',
    formula: 'C₃₈H₄₉N₉O₅ · MW: 711.85 Da',
    name: 'Ipamorelin',
    description: 'Pentapéptido secretagogo selectivo del receptor de grelina (GHS-R). Investigado por estimular la liberación de hormona de crecimiento sin impacto significativo sobre cortisol o prolactina.',
    benefits: ['SECRETAGOGO SELECTIVO', 'LIBERACIÓN GH', 'SIN IMPACTO CORTISOL'],
    variants: [{ mg: '10 mg', price: 90 }],
  },
  {
    id: 'cjc-1295-dac',
    category: 'GH SECRETAGOGUES',
    formula: 'Análogo GHRH con DAC · MW: 3647.9 Da',
    name: 'CJC-1295 DAC',
    description: 'Análogo sintético de GHRH unido a un complejo de afinidad a drogas (DAC) que prolonga su vida media plasmática. Investigado por sostener niveles elevados de hormona de crecimiento durante periodos extendidos.',
    benefits: ['ANÁLOGO GHRH', 'VIDA MEDIA EXTENDIDA', 'LIBERACIÓN SOSTENIDA'],
    variants: [{ mg: '5 mg', price: 140 }],
  },
  {
    id: 'cjc-1295-no-dac',
    category: 'GH SECRETAGOGUES',
    formula: 'C₁₅₂H₂₅₂N₄₄O₄₂ · MW: 3367.9 Da',
    name: 'CJC-1295 NO DAC',
    description: 'Fragmento análogo de GHRH (Mod GRF 1-29) de acción corta. Investigado por inducir pulsos naturales de hormona de crecimiento, replicando el patrón fisiológico de liberación.',
    benefits: ['ANÁLOGO GHRH', 'ACCIÓN PULSÁTIL', 'PATRÓN FISIOLÓGICO'],
    variants: [{ mg: '5 mg', price: 80 }],
  },
  {
    id: 'tesamorelin',
    category: 'GH SECRETAGOGUES',
    formula: 'C₂₂₁H₃₆₆N₆₄O₆₂S · MW: 5135.77 Da',
    name: 'Tesamorelin',
    description: 'Análogo sintético del factor liberador de hormona de crecimiento (GHRH). Investigado por sus efectos sobre la secreción de GH y la composición corporal.',
    benefits: ['ANÁLOGO GHRH', 'SECRECIÓN GH', 'COMPOSICIÓN CORPORAL'],
    variants: [{ mg: '10 mg', price: 170 }, { mg: '20 mg', price: 250 }],
  },
  {
    id: 'pt-141',
    category: 'NEURO PEPTIDES',
    formula: 'C₅₀H₆₈N₁₄O₁₀ · MW: 1025.2 Da',
    name: 'PT-141',
    description: 'Heptapéptido agonista de los receptores de melanocortina (MC3R/MC4R). Investigado por su acción a nivel del sistema nervioso central sobre el deseo sexual y la función libidinal.',
    benefits: ['AGONISTA MELANOCORTINA', 'ACCIÓN CENTRAL', 'FUNCIÓN LIBIDINAL'],
    variants: [{ mg: '10 mg', price: 90 }],
  },
  {
    id: 'selank',
    category: 'NEURO PEPTIDES',
    formula: 'C₃₃H₅₇N₁₁O₉ · MW: 751.86 Da',
    name: 'Selank',
    description: 'Heptapéptido sintético análogo de la tuftsina. Investigado por su acción ansiolítica y nootrópica, con efectos sobre la modulación del BDNF y el equilibrio del sistema nervioso central.',
    benefits: ['ANSIOLÍTICO', 'NOOTRÓPICO', 'MODULACIÓN BDNF'],
    variants: [{ mg: '5 mg', price: 60 }],
  },
  {
    id: 'semax',
    category: 'NEURO PEPTIDES',
    formula: 'C₃₇H₅₁N₉O₁₀S · MW: 813.92 Da',
    name: 'Semax',
    description: 'Heptapéptido sintético derivado del fragmento ACTH(4-10). Investigado por su efecto neuroprotector y su rol en la mejora de la memoria, el enfoque cognitivo y la neuroplasticidad.',
    benefits: ['NEUROPROTECTOR', 'FUNCIÓN COGNITIVA', 'NEUROPLASTICIDAD'],
    variants: [{ mg: '10 mg', price: 65 }],
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
    id: 'epithalon',
    category: 'LONGEVITY',
    formula: 'C₁₄H₂₂N₄O₉ · MW: 390.35 Da',
    name: 'Epithalon',
    description: 'Tetrapéptido sintético análogo de la epitalamina. Investigado por su capacidad de activar la telomerasa, regular la producción de melatonina y modular la expresión génica asociada al envejecimiento celular.',
    benefits: ['ACTIVADOR TELOMERASA', 'REGULACIÓN EPIGENÉTICA', 'LONGEVIDAD CELULAR'],
    variants: [{ mg: '50 mg', price: 125 }],
  },
  {
    id: 'mots-c',
    category: 'LONGEVITY',
    formula: 'Péptido mitocondrial de 16 aa · MW: 1479 Da',
    name: 'MOTS-c',
    description: 'Péptido codificado por el ADN mitocondrial. Investigado por su rol en la regulación metabólica vía activación de AMPK, sensibilidad a la insulina y su acción como mimético del ejercicio.',
    benefits: ['ACTIVADOR AMPK', 'SENSIBILIDAD INSULÍNICA', 'MIMÉTICO DEL EJERCICIO'],
    variants: [{ mg: '10 mg', price: 75 }, { mg: '40 mg', price: 190 }],
  },
  {
    id: 'ghk-cu',
    category: 'REGENERATIVE PEPTIDES',
    formula: 'C₁₄H₂₄CuN₆O₄ · MW: 403.91 Da',
    name: 'GHK-Cu',
    description: 'Tripéptido de cobre de origen endógeno. Investigado por su participación en la síntesis de colágeno, remodelación tisular y respuesta antioxidante.',
    benefits: ['SÍNTESIS COLÁGENO', 'REMODELACIÓN TISULAR', 'ANTIOXIDANTE'],
    variants: [{ mg: '50 mg', price: 55 }, { mg: '100 mg', price: 75 }],
  },
  {
    id: 'klow-blend',
    category: 'BLENDS',
    formula: 'GHK-Cu · BPC-157 · TB-500 · KPV',
    name: 'KLOW Blend',
    description: 'Blend de 80 mg que combina el tripéptido de cobre GHK-Cu, BPC-157, TB-500 y KPV. Investigado por su acción sinérgica en regeneración tisular, síntesis de colágeno y modulación inflamatoria, dentro de un protocolo avanzado de recuperación y composición corporal.',
    benefits: ['SINERGIA PEPTÍDICA', 'REGENERACIÓN TISULAR', 'PROTOCOLO AVANZADO'],
    variants: [{ mg: '80 mg', price: 220 }],
  },
  {
    id: 'glow-blend',
    category: 'BLENDS',
    formula: 'GHK-Cu 50 mg · BPC-157 10 mg · TB-500 10 mg',
    name: 'GLOW Blend',
    description: 'Blend regenerativo de 70 mg que combina el tripéptido de cobre GHK-Cu con BPC-157 y TB-500. Investigado por su acción sinérgica en síntesis de colágeno, regeneración cutánea, modulación inflamatoria y remodelación tisular profunda.',
    benefits: ['SÍNTESIS COLÁGENO', 'REGENERACIÓN CUTÁNEA', 'MODULACIÓN INFLAMATORIA'],
    variants: [{ mg: '70 mg', price: 150 }],
  },
  {
    id: 'wolverine-stack',
    category: 'BLENDS',
    formula: 'BPC-157 10 mg · TB-500 10 mg',
    name: 'Wolverine Stack',
    description: 'Combinación sinérgica del penta-decapéptido gástrico BPC-157 y la timosina beta-4 TB-500. El dúo más investigado en recuperación tisular avanzada, con acción citoprotectora, angiogénesis y modulación sistémica de la respuesta inflamatoria.',
    benefits: ['REGENERACIÓN TISULAR', 'MODULACIÓN INFLAMATORIA', 'ACCIÓN SINÉRGICA'],
    variants: [{ mg: '10 mg + 10 mg', price: 210 }],
  },
  {
    id: 'agua-bac',
    category: 'RECONSTITUCIÓN',
    formula: 'Agua bacteriostática USP · 0.9% Benzyl Alcohol',
    name: 'Agua BAC',
    description: 'Agua bacteriostática estéril para reconstitución de péptidos liofilizados. Formulada con alcohol bencílico al 0.9% para inhibición bacteriana y múltiples usos por vial.',
    benefits: ['RECONSTITUCIÓN PÉPTIDOS', 'ESTÉRIL USP', 'MULTIDOSIS'],
    variants: [{ mg: '10 ml', price: 15 }],
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
      className="relative p-5"
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
      <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,160,106,0.4), transparent)' }} />

      {/* Category */}
      <p className="tracking-[0.32rem] mb-2 font-josefin" style={{ fontSize: '0.54rem', color: 'var(--gold)' }}>
        {product.category}
      </p>

      {/* Formula */}
      <p className="font-mono tracking-[0.08rem] mb-2" style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>
        {product.formula}
      </p>

      {/* Name */}
      <h3 className="font-cormorant font-light leading-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 5vw, 1.75rem)' }}>
        {product.name}
      </h3>

      {/* Description */}
      <p className="leading-7 mb-4" style={{ fontSize: '0.75rem', letterSpacing: '0.04rem', color: 'var(--text-dim)' }}>
        {product.description}
      </p>

      {/* Benefits */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.benefits.map(b => (
          <span key={b} className="tracking-[0.12rem] px-2.5 py-1 font-josefin"
            style={{ fontSize: '0.48rem', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}>
            {b}
          </span>
        ))}
      </div>

      {/* Variant selector */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {product.variants.map((v, i) => (
          <button
            key={v.mg}
            onClick={() => setSelectedVariant(i)}
            className="tracking-[0.15rem] font-josefin cursor-pointer"
            style={{
              fontSize: '0.54rem',
              border: selectedVariant === i ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
              color: selectedVariant === i ? 'var(--gold)' : 'var(--text-muted)',
              background: selectedVariant === i ? 'rgba(184,160,106,0.08)' : 'transparent',
              padding: '0.4rem 0.7rem',
              minHeight: '32px',
              whiteSpace: 'nowrap',
            }}
          >
            {v.mg}
          </button>
        ))}
      </div>

      {/* Price + Add */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-mono" style={{ fontSize: '1.4rem', color: 'var(--gold)' }}>
            ${variant.price}
          </span>
          <span className="tracking-[0.12rem] ml-2 font-josefin" style={{ fontSize: '0.54rem', color: 'var(--text-muted)' }}>
            / {variant.mg}
          </span>
        </div>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.95 }}
          className="flex-1 font-josefin cursor-pointer"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.18rem',
            background: added ? 'var(--gold)' : 'transparent',
            border: '1px solid rgba(184,160,106,0.4)',
            color: added ? 'var(--black)' : 'var(--gold)',
            padding: '0.55rem 0.5rem',
            minHeight: '40px',
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

      {/* Share */}
      <motion.button
        onClick={handleShare}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center gap-2 w-full mt-4 cursor-pointer font-josefin tracking-[0.22rem] transition-colors duration-200"
        style={{
          fontSize: '0.5rem',
          color: 'rgba(184,160,106,0.65)',
          border: '1px solid rgba(184,160,106,0.22)',
          background: 'transparent',
          padding: '0.6rem 1rem',
          minHeight: '36px',
        }}
        aria-label="Compartir producto"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        COMPARTIR
      </motion.button>
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

      {/* MOBILE: horizontal snap carousel */}
      {filtered.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + '-m'}
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="overflow-x-auto"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div className="flex gap-3 px-5">
                {filtered.map((product, i) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0"
                    style={{ width: '82vw', scrollSnapAlign: 'start' }}
                  >
                    <ProductCard product={product} index={i} />
                  </div>
                ))}
                <div className="flex-shrink-0 w-5" />
              </div>
            </div>
            {filtered.length > 1 && (
              <p className="text-center tracking-[0.2rem] mt-3 font-josefin px-5" style={{ fontSize: '0.44rem', color: 'var(--text-muted)' }}>
                ← DESLIZA PARA VER MÁS →
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* DESKTOP: grid */}
      {filtered.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + '-d'}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-px"
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
      )}
    </section>
  );
}
