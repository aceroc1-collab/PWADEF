'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const SeamlessVideo = dynamic(() => import('./SeamlessVideo'), { ssr: false });

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Video background */}
      <div className="absolute inset-0 pointer-events-none">
        <SeamlessVideo src="/videos/hero.mp4" opacity={0.28} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(5,5,7,0.05) 0%, rgba(5,5,7,0.75) 60%, var(--black) 100%)',
        }} />
      </div>

      {/* Subtle gold ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 60%, rgba(184,160,106,0.06) 0%, transparent 65%)',
      }} />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 w-full max-w-2xl mx-auto"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex justify-center mb-4">
          <img
            src="/logo.jpg"
            alt="PEPTILAB"
            draggable={false}
            className="select-none pointer-events-none"
            style={{
              width: 'clamp(150px, 40vw, 230px)',
              mixBlendMode: 'screen',
              filter: 'brightness(1.08) contrast(1.05)',
            }}
          />
        </motion.div>

        {/* Brand tag */}
        <motion.p
          variants={itemVariants}
          className="font-josefin tracking-[0.45rem] mb-6"
          style={{ fontSize: '0.58rem', color: 'var(--gold)' }}
        >
          PHARMACEUTICAL GRADE · HPLC VERIFIED
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-cormorant font-light leading-none mb-6"
          style={{ fontSize: 'clamp(3.4rem, 14vw, 6rem)' }}
        >
          Precision{' '}
          <em
            className="italic"
            style={{
              color: 'var(--gold)',
              textShadow: '0 0 40px rgba(184,160,106,0.5)',
            }}
          >
            Peptide
          </em>
          <br />Science
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-josefin font-extralight leading-9 mb-10 mx-auto"
          style={{ fontSize: '0.78rem', letterSpacing: '0.18rem', color: 'var(--text-dim)', maxWidth: '340px' }}
        >
          ADVANCED PHARMACEUTICAL OPTIMIZATION · ENGINEERED FOR ELITE PERFORMANCE
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <motion.button
            onClick={() => scrollTo('products')}
            whileTap={{ scale: 0.96 }}
            className="font-josefin tracking-[0.24rem] py-4 transition-all duration-300 w-full sm:w-auto sm:px-10"
            style={{ fontSize: '0.7rem', background: 'var(--gold)', color: 'var(--black)', minHeight: '52px' }}
          >
            EXPLORAR CATÁLOGO
          </motion.button>

          <motion.button
            onClick={() => scrollTo('about')}
            whileTap={{ scale: 0.96 }}
            className="font-josefin font-thin tracking-[0.24rem] py-4 transition-all duration-300 w-full sm:w-auto sm:px-10"
            style={{ fontSize: '0.7rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'var(--text)', minHeight: '52px' }}
          >
            NUESTRA CIENCIA
          </motion.button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-josefin tracking-[0.22rem] mt-8"
          style={{ fontSize: '0.45rem', color: 'rgba(90,88,86,0.5)' }}
        >
          FOR RESEARCH USE ONLY
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.div
          className="w-px h-10 mx-auto"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--gold))' }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
