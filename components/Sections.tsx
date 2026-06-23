'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SeamlessVideo = dynamic(() => import('./SeamlessVideo'), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const sectionTitle = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.12 } },
};

const titleChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 17 });
  const [display, setDisplay] = useState('0');

  useEffect(() => { if (isInView) motionVal.set(target); }, [isInView, motionVal, target]);
  useEffect(() => {
    const unsub = spring.on('change', v => {
      setDisplay(Number.isInteger(target) ? Math.round(v).toString() : v.toFixed(1));
    });
    return unsub;
  }, [spring, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
export function Ticker() {
  const items = [
    'PHARMACEUTICAL GRADE', 'HIGH PURITY ≥99%', 'LAB TESTED',
    'ADVANCED RESEARCH', 'ELITE PERFORMANCE', 'SCIENCE · QUALITY · RESULTS',
  ];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative" style={{
      background: 'var(--dark2)',
      borderTop: '1px solid rgba(184,160,106,0.15)',
      borderBottom: '1px solid rgba(184,160,106,0.15)',
      padding: '0.875rem 0',
    }}>
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--dark2), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--dark2), transparent)' }} />
      <div style={{ display: 'inline-flex', animation: 'ticker 32s linear infinite', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} className="tracking-[0.38rem] font-josefin px-8" style={{ fontSize: '0.58rem', color: 'var(--gold)' }}>
            {item} <span style={{ color: 'var(--text-muted)', margin: '0 0.75rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
export function About() {
  const badges = [
    'SÍNTESIS PEPTÍDICA DE FASE SÓLIDA (SPPS)',
    'ANÁLISIS HPLC — PUREZA GARANTIZADA ≥99%',
    'ESPECTROMETRÍA DE MASAS CERTIFICADA',
    'ALMACENAMIENTO ÓPTIMO Y EMBALAJE ESPECIALIZADO',
  ];
  const stats = [
    { num: 99.7, suffix: '%',   label: 'PUREZA PROMEDIO'  },
    { num: 50,   suffix: '+',   label: 'PÉPTIDOS ACTIVOS' },
    { num: 0,    suffix: 'COA', label: 'CADA PRODUCTO'    },
  ];

  return (
    <section id="about" className="py-14 px-5 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="mb-10"
      >
        <motion.p variants={fadeUp} custom={0} className="tracking-[0.42rem] mb-4 font-josefin" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
          QUIÉNES SOMOS
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} className="font-cormorant font-light mb-5" style={{ fontSize: 'clamp(2.2rem, 8vw, 3.8rem)' }}>
          Donde la <em className="italic" style={{ color: 'var(--gold)' }}>Ciencia</em><br />Encuentra la Excelencia
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="leading-8 mb-8" style={{ fontSize: '0.82rem', letterSpacing: '0.04rem', color: 'var(--text-dim)' }}>
          PEPTILAB representa la convergencia de rigor científico y estándares farmacéuticos de élite. Cada producto es sintetizado bajo protocolos de máxima pureza, respaldado por análisis exhaustivos de control de calidad.
        </motion.p>

        <div className="space-y-3 mb-10">
          {badges.map((b, i) => (
            <motion.div key={b} variants={fadeUp} custom={3 + i}
              className="flex items-center gap-3 p-4"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="w-0.5 h-6 flex-shrink-0" style={{ background: 'var(--gold)' }} />
              <span className="tracking-[0.14rem] font-josefin" style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="p-6"
        style={{ background: 'var(--dark2)', border: '1px solid rgba(184,160,106,0.2)' }}
      >
        <div className="absolute -top-px left-6 w-12 h-0.5 relative" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '3rem', height: '2px', background: 'var(--gold)' }} />
        </div>

        {/* Peptide chain visual */}
        <svg viewBox="0 0 340 80" className="w-full mb-5" style={{ opacity: 0.55 }} xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="14" fontFamily="'Space Mono',monospace" fontSize="6" fill="rgba(184,160,106,0.7)" letterSpacing="2">PEPTIDE CHAIN ANALYSIS</text>
          <text x="10" y="28" fontFamily="'Space Mono',monospace" fontSize="5.5" fill="rgba(255,255,255,0.2)">H2N-Ser-Tyr-Ser-Met-Glu-His-Phe-Arg-COOH</text>
          {[['H-Ser','105'],['Tyr','181'],['Ser','105'],['Met','149']].map(([aa, mw], i) => (
            <g key={aa}>
              <rect x={10 + i * 78} y="36" width="62" height="28" rx="1" fill="none"
                stroke={i % 2 === 0 ? 'rgba(184,160,106,0.4)' : 'rgba(0,212,255,0.3)'} strokeWidth="0.5" />
              <text x={10 + i * 78 + 31} y="48" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="5.5"
                fill={i % 2 === 0 ? 'rgba(184,160,106,0.8)' : 'rgba(0,212,255,0.7)'}>{aa}</text>
              <text x={10 + i * 78 + 31} y="59" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="4.5"
                fill="rgba(255,255,255,0.25)">MW:{mw}</text>
              {i < 3 && <line x1={72 + i * 78} y1="50" x2={88 + i * 78} y2="50" stroke="rgba(184,160,106,0.3)" strokeWidth="0.5" />}
            </g>
          ))}
          <text x="322" y="54" fontFamily="'Space Mono',monospace" fontSize="9" fill="rgba(184,160,106,0.3)">···</text>
          <text x="10" y="76" fontFamily="'Space Mono',monospace" fontSize="4.5" fill="rgba(255,255,255,0.12)">PURITY: 99.7% · SEQUENCE CONFIRMED · COA AVAILABLE</text>
        </svg>

        <div className="flex gap-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {stats.map((s, i) => (
            <motion.div key={i} className="text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            >
              <div className="font-cormorant font-light" style={{ fontSize: '2.2rem', color: 'var(--gold)' }}>
                {s.suffix === 'COA' ? 'COA' : (<><AnimatedCounter target={s.num} />{s.suffix !== 'COA' && s.suffix}</>)}
              </div>
              <div className="tracking-[0.2rem] mt-1 font-josefin" style={{ fontSize: '0.46rem', color: 'var(--text-dim)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── LAB SECTION ─────────────────────────────────────────────────────────────
export function LabSection() {
  const stats = [
    { val: '≥99%', label: 'PUREZA HPLC' },
    { val: 'SPPS',  label: 'TECNOLOGÍA'  },
    { val: 'COA',   label: 'CERTIFICADO' },
  ];

  return (
    <section className="relative overflow-hidden flex items-center" style={{ minHeight: '65vh', background: 'var(--black)' }}>
      <div className="absolute inset-0">
        <SeamlessVideo src="/videos/lab.mp4" opacity={0.38} />
      </div>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(105deg, rgba(5,5,7,0.96) 0%, rgba(5,5,7,0.82) 50%, rgba(5,5,7,0.35) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(5,5,7,0.5) 0%, transparent 20%, transparent 80%, rgba(5,5,7,0.6) 100%)',
      }} />

      <motion.div
        className="relative z-10 px-5 py-12 max-w-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.p variants={fadeUp} custom={0} className="tracking-[0.42rem] mb-5 font-josefin" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
          LABORATORIO DE PRECISIÓN
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} className="font-cormorant font-light mb-5 leading-tight" style={{ fontSize: 'clamp(2.4rem, 8vw, 4rem)' }}>
          Síntesis Bajo<br />
          <em className="italic" style={{ color: 'var(--gold)', textShadow: '0 0 40px rgba(184,160,106,0.5)' }}>
            Estándares Extremos
          </em>
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="leading-8 mb-10 font-josefin font-extralight" style={{ fontSize: '0.8rem', letterSpacing: '0.05rem', color: 'var(--text-dim)' }}>
          Cada péptido emerge de un entorno de síntesis controlado con precisión farmacéutica. Tecnología SPPS de última generación con protocolos de calidad internacionales.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="grid grid-cols-3 gap-3 max-w-xs">
          {stats.map(s => (
            <div key={s.label} className="text-center p-4" style={{ border: '1px solid rgba(184,160,106,0.18)', background: 'rgba(184,160,106,0.05)' }}>
              <div className="font-cormorant font-light" style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>{s.val}</div>
              <div className="tracking-[0.18rem] mt-1 font-josefin" style={{ fontSize: '0.42rem', color: 'var(--text-dim)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── MOLECULES SECTION ────────────────────────────────────────────────────────
export function MoleculesSection() {
  const features = [
    'Estructura tridimensional verificada por espectrometría de masas',
    'Secuencia de aminoácidos confirmada · identidad garantizada',
    'Síntesis en fase sólida (SPPS) con purificación por HPLC',
  ];

  return (
    <section className="py-14 px-5 relative overflow-hidden" style={{ background: 'var(--dark2)' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }}
        className="mb-8"
      >
        <motion.p variants={fadeUp} custom={0} className="tracking-[0.42rem] mb-4 font-josefin" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
          INNOVACIÓN MOLECULAR
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} className="font-cormorant font-light mb-5" style={{ fontSize: 'clamp(2.2rem, 8vw, 3.8rem)' }}>
          Ciencia al Nivel<br />
          <em className="italic" style={{ color: 'var(--gold)' }}>Molecular</em>
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="leading-8 mb-8 font-josefin font-extralight" style={{ fontSize: '0.8rem', letterSpacing: '0.04rem', color: 'var(--text-dim)' }}>
          Los péptidos son cadenas de aminoácidos con estructura molecular diseñada para interactuar con receptores biológicos específicos. Dominamos su síntesis con una precisión que garantiza identidad y bioactividad esperada.
        </motion.p>
        <div className="space-y-4">
          {features.map((item, i) => (
            <motion.div key={i} variants={fadeUp} custom={3 + i} className="flex items-start gap-4">
              <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2.5" style={{ background: 'var(--gold)', boxShadow: '0 0 6px rgba(184,160,106,0.7)' }} />
              <span className="font-josefin leading-7" style={{ fontSize: '0.75rem', letterSpacing: '0.04rem', color: 'var(--text-dim)' }}>{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* DNA helix visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
        style={{ border: '1px solid rgba(184,160,106,0.2)', background: 'var(--dark3)', aspectRatio: '16/7' }}
      >
        <div className="absolute -top-px left-6 w-12 h-0.5" style={{ background: 'var(--gold)' }} />
        <div className="absolute top-0 bottom-0 -left-px w-px" style={{ background: 'linear-gradient(to bottom, rgba(184,160,106,0.7), transparent)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 400 120" className="w-full h-full" style={{ opacity: 0.45 }} xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="14" fontFamily="'Space Mono',monospace" fontSize="5" fill="rgba(184,160,106,0.6)" letterSpacing="2">DNA · HELIX · MOLECULAR STRUCTURE</text>
            <path d="M20,60 C55,25 90,95 125,60 C160,25 195,95 230,60 C265,25 300,95 335,60 C370,25 405,95 440,60" fill="none" stroke="rgba(184,160,106,0.5)" strokeWidth="1.2" />
            <path d="M20,60 C55,95 90,25 125,60 C160,95 195,25 230,60 C265,95 300,25 335,60 C370,95 405,25 440,60" fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="0.9" />
            {[0.09,0.21,0.33,0.45,0.57,0.69,0.81,0.93].map((t, i) => {
              const x = 20 + t * 420;
              const y1 = 60 + Math.sin(t * Math.PI * 2) * 35;
              const y2 = 60 - Math.sin(t * Math.PI * 2) * 35;
              const isGold = i % 2 === 0;
              return (
                <g key={i}>
                  <line x1={x} y1={y1} x2={x} y2={y2} stroke="rgba(184,160,106,0.18)" strokeWidth="0.6" />
                  <circle cx={x} cy={y1} r={3} fill="none" stroke={isGold ? 'rgba(184,160,106,0.7)' : 'rgba(0,212,255,0.55)'} strokeWidth="0.8" />
                  <circle cx={x} cy={y2} r={3} fill="none" stroke={isGold ? 'rgba(0,212,255,0.55)' : 'rgba(184,160,106,0.7)'} strokeWidth="0.8" />
                </g>
              );
            })}
            <text x="10" y="114" fontFamily="'Space Mono',monospace" fontSize="4.5" fill="rgba(184,160,106,0.3)" letterSpacing="1">PEPTIDE · SEQUENCE · VERIFIED · COA AVAILABLE</text>
          </svg>
        </div>
        <div className="absolute bottom-2 left-4">
          <p className="font-josefin tracking-[0.25rem]" style={{ fontSize: '0.44rem', color: 'rgba(184,160,106,0.4)' }}>MOLECULAR VISUALIZATION</p>
        </div>
      </motion.div>
    </section>
  );
}

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
export function Benefits() {
  const items = [
    { num: '01', title: 'Pharmaceutical Grade', desc: 'Síntesis bajo estrictos protocolos de calidad farmacéutica. Materia prima de proveedores internacionales certificados.' },
    { num: '02', title: 'High Purity ≥99%', desc: 'Verificada por HPLC de fase reversa y espectrometría de masas ESI-MS. Certificado de análisis disponible para cada lote.' },
    { num: '03', title: 'Lab Tested & Verified', desc: 'Análisis completo por laboratorios especializados. Cada partida incluye COA con resultados de HPLC, MS y pruebas de identidad.' },
    { num: '04', title: 'Embalaje Especializado', desc: 'Productos liofilizados en presentación estéril con embalaje de alta calidad para garantizar la integridad hasta el destino.' },
    { num: '05', title: 'Asesoría Especializada', desc: 'Equipo con formación en bioquímica y farmacología disponible para orientación técnica y consultas sobre nuestros productos.' },
    { num: '06', title: 'Entrega Discreta y Segura', desc: 'Envíos con embalaje neutro y tracking completo. Cobertura a nivel nacional en Venezuela con atención personalizada.' },
  ];

  return (
    <section id="benefits" className="py-14 px-5 relative overflow-hidden" style={{ background: 'var(--dark2)' }}>
      <motion.div
        className="mb-10"
        variants={sectionTitle}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.p variants={titleChild} className="tracking-[0.42rem] mb-4 font-josefin" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
          NUESTROS ESTÁNDARES
        </motion.p>
        <motion.h2 variants={titleChild} className="font-cormorant font-light" style={{ fontSize: 'clamp(2.2rem, 8vw, 3.8rem)' }}>
          La <em className="italic" style={{ color: 'var(--gold)' }}>Diferencia</em><br />PEPTILAB
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.03)' }}>
        {items.map((item, i) => (
          <motion.div
            key={item.num}
            className="p-6"
            style={{ background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.04)' }}
            initial="hidden"
            whileInView="visible"
            custom={i}
            variants={fadeUp}
            viewport={{ once: true, margin: '-30px' }}
          >
            <div className="tracking-[0.18rem] mb-4 font-mono" style={{ fontSize: '0.54rem', color: 'var(--gold)' }}>{item.num}</div>
            <h3 className="font-cormorant font-light mb-3" style={{ fontSize: '1.45rem' }}>{item.title}</h3>
            <p className="leading-7" style={{ fontSize: '0.73rem', letterSpacing: '0.04rem', color: 'var(--text-dim)' }}>{item.desc}</p>
            <div className="h-px mt-5" style={{ background: 'var(--gold)', opacity: 0.3, transformOrigin: 'left', transform: 'scaleX(0.4)' }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export function Testimonials() {
  const [active, setActive] = useState(0);

  const items = [
    { initials: 'RM', name: 'Dr. R. Montoya', role: 'INVESTIGADOR BIOQUÍMICO · CARACAS', text: 'La calidad del BPC-157 es excepcional. El COA fue completamente transparente y los resultados fueron consistentes con lo esperado. Atención de primer nivel.' },
    { initials: 'AC', name: 'A. Castellanos', role: 'ESPECIALISTA EN RENDIMIENTO · VALENCIA', text: 'Excelente servicio y calidad sobresaliente. La Tirzepatida llegó perfectamente embalada y la asesoría del equipo fue invaluable durante todo el proceso.' },
    { initials: 'MP', name: 'M. Pérez', role: 'PROFESIONAL DE LA SALUD · MARACAIBO', text: 'PEPTILAB es la referencia en Venezuela. La consistencia entre lotes, el embalaje impecable y el nivel de documentación no tienen comparación en el mercado local.' },
    { initials: 'JV', name: 'J. Villalobos', role: 'ATLETA ÉLITE · BARQUISIMETO', text: 'El Recovery Stack (BPC-157 + TB-500) superó todas mis expectativas. El proceso de compra por WhatsApp fue rápido y la entrega discreta. Totalmente recomendado.' },
    { initials: 'LS', name: 'L. Salazar', role: 'MÉDICO INTERNISTA · CARACAS', text: 'Calidad farmacéutica real. Los COA son detallados, el HPLC es verificable y el embalaje mantiene la cadena de frío perfectamente. La mejor fuente local de péptidos.' },
  ];

  return (
    <section id="testimonials" className="py-14 relative overflow-hidden" style={{ background: 'var(--black)' }}>
      <motion.div
        className="mb-10 px-5"
        variants={sectionTitle}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.p variants={titleChild} className="tracking-[0.42rem] mb-4 font-josefin" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
          TESTIMONIOS
        </motion.p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <motion.h2 variants={titleChild} className="font-cormorant font-light" style={{ fontSize: 'clamp(2.2rem, 8vw, 3.8rem)' }}>
            Lo que Dicen Nuestros <em className="italic" style={{ color: 'var(--gold)' }}>Clientes</em>
          </motion.h2>
          <motion.div variants={titleChild} className="flex items-center gap-1.5 pb-2">
            <span className="tracking-[0.18rem] font-josefin" style={{ fontSize: '0.5rem', color: 'var(--gold)' }}>★ ★ ★ ★ ★</span>
            <span className="tracking-[0.12rem] font-josefin" style={{ fontSize: '0.48rem', color: 'var(--text-muted)' }}>{items.length} RESEÑAS</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Carousel */}
      <div className="scroll-x-touch flex gap-4 px-5 pb-2" style={{ scrollSnapType: 'x mandatory' }}>
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            className="relative p-6 flex-shrink-0"
            style={{
              background: 'var(--dark)',
              border: '1px solid rgba(184,160,106,0.1)',
              width: 'min(85vw, 360px)',
              scrollSnapAlign: 'start',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-20px' }}
            onViewportEnter={() => setActive(i)}
          >
            {/* Gold top accent */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(184,160,106,0.4), transparent)' }} />

            <span className="absolute top-3 right-5 font-cormorant pointer-events-none" style={{ fontSize: '4rem', lineHeight: 1, color: 'rgba(184,160,106,0.07)' }}>"</span>
            <div className="tracking-[0.18rem] mb-4" style={{ fontSize: '0.58rem', color: 'var(--gold)' }}>★ ★ ★ ★ ★</div>
            <p className="font-cormorant font-light italic leading-8 mb-6" style={{ fontSize: '1.08rem', color: 'var(--text-dim)', minHeight: '7rem' }}>{t.text}</p>
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center tracking-wider font-josefin flex-shrink-0"
                style={{ fontSize: '0.48rem', background: 'rgba(184,160,106,0.12)', border: '1px solid rgba(184,160,106,0.28)', color: 'var(--gold)' }}
              >
                {t.initials}
              </div>
              <div>
                <p className="tracking-[0.12rem] font-josefin" style={{ fontSize: '0.65rem', color: 'var(--text)' }}>{t.name}</p>
                <p className="tracking-[0.06rem] mt-0.5 font-josefin" style={{ fontSize: '0.5rem', color: 'var(--text-dim)' }}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6 px-5">
        {items.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: active === i ? 20 : 6,
              background: active === i ? 'var(--gold)' : 'rgba(184,160,106,0.25)',
            }}
            transition={{ duration: 0.3 }}
            style={{ height: 4 }}
          />
        ))}
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    { q: '¿Qué garantías de calidad ofrecen con cada producto?', a: 'Cada producto viene acompañado de un Certificado de Análisis (COA) completo que incluye resultados de cromatografía HPLC, espectrometría de masas y análisis de pureza. Trabajamos únicamente con materia prima de proveedores certificados bajo estándares internacionales de calidad.' },
    { q: '¿Cómo se realiza el embalaje y envío?', a: 'Todos nuestros productos son enviados en embalaje especializado que garantiza su integridad durante el transporte. Realizamos envíos a todas las ciudades principales de Venezuela con seguimiento de envío incluido.' },
    { q: '¿Cuáles son las formas de pago disponibles?', a: 'Aceptamos transferencias bancarias nacionales, divisas (USD), criptomonedas (USDT/BTC) y pago móvil. Para montos mayores, contamos con facilidades de pago. Contáctanos directamente por WhatsApp para coordinar la mejor opción.' },
    { q: '¿Tienen asesoría técnica sobre los productos?', a: 'Sí. Nuestro equipo cuenta con formación especializada en bioquímica y farmacología. Ofrecemos orientación técnica completa sobre reconstitución, almacenamiento y uso correcto de cada producto. Puedes contactarnos directamente por WhatsApp o email.' },
    { q: '¿Qué es el Agua BAC y para qué se usa?', a: 'El Agua Bacteriostática (BAC) es agua estéril con alcohol bencílico al 0.9% utilizada para la reconstitución de péptidos liofilizados. Permite múltiples usos por vial manteniendo la esterilidad. Es el disolvente recomendado para la mayoría de nuestros productos en polvo.' },
    { q: '¿Realizan envíos fuera de Venezuela?', a: 'Actualmente operamos principalmente en Venezuela con envíos a todas las ciudades principales. Para pedidos internacionales o distribución fuera del país, escríbenos directamente por WhatsApp al +58 412-9987858 y evaluamos tu caso de forma personalizada.' },
  ];

  return (
    <section id="faq" className="py-14 px-5 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
      <motion.div
        className="mb-10"
        variants={sectionTitle}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.p variants={titleChild} className="tracking-[0.42rem] mb-4 font-josefin" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
          PREGUNTAS FRECUENTES
        </motion.p>
        <motion.h2 variants={titleChild} className="font-cormorant font-light" style={{ fontSize: 'clamp(2.2rem, 8vw, 3.8rem)' }}>
          Todo lo que <em className="italic" style={{ color: 'var(--gold)' }}>Necesitas</em> Saber
        </motion.h2>
      </motion.div>

      <div>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-20px' }}
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <button
              className="w-full flex justify-between items-center py-6 text-left font-josefin tracking-[0.1rem] cursor-pointer bg-transparent border-0"
              style={{ fontSize: '0.82rem', color: openIndex === i ? 'var(--gold)' : 'var(--text)', minHeight: '60px' }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="pr-4">{item.q}</span>
              <motion.span
                className="ml-2 flex-shrink-0 text-xl"
                style={{ color: 'var(--gold)', display: 'inline-block', minWidth: '20px' }}
                animate={{ rotate: openIndex === i ? 45 : 0 }}
                transition={{ duration: 0.22 }}
              >+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="pb-6 tracking-[0.04rem] leading-8 font-josefin" style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
export function Contact() {
  const methods = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'EMAIL GENERAL', value: 'contacto@peptilabve.com', href: 'mailto:contacto@peptilabve.com',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /><line x1="8" y1="14" x2="4" y2="18" />
        </svg>
      ),
      label: 'VENTAS & PEDIDOS', value: 'ventas@peptilabve.com', href: 'mailto:ventas@peptilabve.com',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.527 5.845L0 24l6.335-1.505A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.213-3.732.886.948-3.63-.234-.373A9.795 9.795 0 012.182 12c0-5.419 4.399-9.818 9.818-9.818 5.42 0 9.818 4.399 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
        </svg>
      ),
      label: 'WHATSAPP', value: '+58 412-9987858', href: 'https://wa.me/584129987858',
    },
  ];

  return (
    <section id="contact" className="py-14 px-5 text-center relative overflow-hidden" style={{ background: 'var(--black)' }}>
      {/* Gold ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(184,160,106,0.04) 0%, transparent 60%)',
      }} />

      <motion.div
        className="relative z-10"
        variants={sectionTitle}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.p variants={titleChild} className="tracking-[0.42rem] mb-4 font-josefin" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
          CONTACTO
        </motion.p>
        <motion.h2 variants={titleChild} className="font-cormorant font-light mb-4" style={{ fontSize: 'clamp(2.2rem, 8vw, 3.8rem)' }}>
          Hablemos de <em className="italic" style={{ color: 'var(--gold)' }}>Ciencia</em>
        </motion.h2>
        <motion.p variants={titleChild} className="leading-8 mx-auto mb-10 font-josefin" style={{ fontSize: '0.78rem', letterSpacing: '0.08rem', color: 'var(--text-dim)', maxWidth: '340px' }}>
          Nuestro equipo está disponible para responder consultas, procesar pedidos y brindarte atención personalizada.
        </motion.p>
      </motion.div>

      <div className="space-y-4 mb-10 relative z-10">
        {methods.map((m, i) => (
          <motion.a
            key={m.label}
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5"
            style={{ border: '1px solid rgba(184,160,106,0.15)', textDecoration: 'none' }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{ color: 'var(--gold)', flexShrink: 0 }}>{m.icon}</div>
            <div className="text-left">
              <p className="tracking-[0.32rem] mb-1 font-josefin" style={{ fontSize: '0.52rem', color: 'var(--gold)' }}>{m.label}</p>
              <p className="tracking-[0.06rem] font-josefin" style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>{m.value}</p>
            </div>
            <div className="ml-auto" style={{ color: 'rgba(184,160,106,0.4)', fontSize: '1rem' }}>→</div>
          </motion.a>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.a
          href="https://wa.me/584129987858"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 font-josefin tracking-[0.28rem] w-full btn-premium-pulse"
          style={{ fontSize: '0.7rem', background: 'var(--gold)', color: 'var(--black)', textDecoration: 'none', padding: '1.1rem 2rem', minHeight: '52px' }}
          whileTap={{ scale: 0.97 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.527 5.845L0 24l6.335-1.505A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.213-3.732.886.948-3.63-.234-.373A9.795 9.795 0 012.182 12c0-5.419 4.399-9.818 9.818-9.818 5.42 0 9.818 4.399 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
          </svg>
          CONTACTAR POR WHATSAPP
        </motion.a>

        <p className="tracking-[0.32rem] mt-8 mb-3 font-josefin relative z-10" style={{ fontSize: '0.56rem', color: 'var(--text-muted)' }}>SÍGUENOS EN INSTAGRAM</p>
        <motion.a
          href="https://instagram.com/peptilabve"
          target="_blank" rel="noopener noreferrer"
          className="font-cormorant font-light italic inline-block"
          style={{ fontSize: '1.8rem', color: 'var(--gold)', textDecoration: 'none' }}
          whileTap={{ opacity: 0.7 }}
        >
          @peptilabve
        </motion.a>
      </motion.div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export function Footer() {
  const links = ['NOSOTROS', 'CATÁLOGO', 'ESTÁNDARES', 'TESTIMONIOS', 'FAQ', 'CONTACTO'];
  const ids   = ['about', 'products', 'benefits', 'testimonials', 'faq', 'contact'];
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ paddingBottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="px-5 py-12" style={{ borderTop: '1px solid rgba(184,160,106,0.15)', background: 'var(--dark)' }}>
        <img
          src="/logo.jpg"
          alt="PEPTILAB"
          draggable={false}
          className="select-none pointer-events-none mb-3"
          style={{ width: '110px', mixBlendMode: 'screen', filter: 'brightness(1.05)' }}
        />
        <p className="tracking-[0.38rem] font-josefin mb-5" style={{ fontSize: '0.52rem', color: 'var(--gold)' }}>SCIENCE · QUALITY · RESULTS</p>
        <p className="tracking-[0.08rem] leading-7 mb-8 font-josefin" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', maxWidth: '280px' }}>
          Productos de alta calidad farmacéutica. Consulte disponibilidad y condiciones con nuestro equipo.
        </p>

        <div className="grid grid-cols-2 gap-y-3 mb-8">
          {links.map((link, i) => (
            <button key={link}
              onClick={() => document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' })}
              className="tracking-[0.25rem] font-josefin bg-transparent border-0 cursor-pointer text-left"
              style={{ fontSize: '0.58rem', color: 'var(--text-muted)', minHeight: '36px' }}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="tracking-[0.1rem] leading-8 font-josefin mb-8" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
          <p className="font-light mb-1" style={{ color: 'var(--text)' }}>PEPTILAB</p>
          <p>contacto@peptilabve.com</p>
          <p>ventas@peptilabve.com</p>
          <p className="mt-1">+58 412-9987858</p>
          <p>@peptilabve</p>
        </div>
      </div>

      <div className="flex justify-between items-center px-5 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="tracking-[0.16rem] font-josefin" style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>
          © 2024 PEPTILAB
        </p>
        <button
          onClick={scrollTop}
          className="tracking-[0.25rem] font-josefin px-4 py-2 cursor-pointer bg-transparent"
          style={{ fontSize: '0.52rem', border: '1px solid rgba(184,160,106,0.25)', color: 'var(--text-muted)', minHeight: '36px' }}
        >
          ↑ INICIO
        </button>
        <p className="tracking-[0.22rem] font-josefin" style={{ fontSize: '0.44rem', color: 'rgba(90,88,86,0.5)' }}>
          FOR RESEARCH USE ONLY
        </p>
      </div>
    </footer>
  );
}
