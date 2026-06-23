'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { useState, useMemo } from 'react';

const WHATSAPP_NUMBER = '584129987858';

function buildWhatsAppMessage(cart: ReturnType<typeof useCart>['cart'], total: number): string {
  const lines = cart.map(item => `• ${item.name} x${item.qty} — $${(item.price * item.qty).toFixed(2)}`);
  const msg = [
    '¡Hola PEPTILAB! Me interesa realizar el siguiente pedido:',
    '',
    ...lines,
    '',
    `*TOTAL: $${total.toFixed(2)} USD*`,
    '',
    'Por favor indíquenme disponibilidad y forma de pago. ¡Gracias!',
  ].join('\n');
  return encodeURIComponent(msg);
}

function Confetti({ active }: { active: boolean }) {
  const particles = useMemo(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.7,
      duration: 1.3 + Math.random() * 1.2,
      color: ['#B8A06A', '#D4BC88', '#ffffff', '#25D366', '#00D4FF', '#E8D9B5'][Math.floor(Math.random() * 6)],
      size: 5 + Math.random() * 8,
      rotate: Math.random() * 720 - 360,
    }))
  , []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 90 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -12,
            width: p.size,
            height: p.size * 0.55,
            background: p.color,
            borderRadius: 2,
          }}
          initial={{ y: -12, opacity: 1, rotate: 0 }}
          animate={{ y: 950, opacity: [1, 1, 0.6, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

export default function CartPanel() {
  const { cart, cartTotal, removeFromCart, changeQty, isCartOpen, toggleCart, clearCart } = useCart();
  const [sent, setSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage(cart, cartTotal);
    setShowConfetti(true);
    setSent(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    }, 1500);
    setTimeout(() => setShowConfetti(false), 2800);
  };

  const handleClose = () => {
    if (sent) clearCart();
    toggleCart();
    setTimeout(() => setSent(false), 420);
  };

  const handleNewOrder = () => {
    clearCart();
    setSent(false);
  };

  return (
    <>
      <Confetti active={showConfetti} />

      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[55]"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
            />

            {/* Bottom sheet */}
            <motion.div
              className="fixed left-0 right-0 bottom-0 z-[60] flex flex-col"
              style={{
                height: '88vh',
                background: 'var(--dark)',
                borderTop: '1px solid rgba(184,160,106,0.25)',
                borderRadius: '16px 16px 0 0',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Gold top accent */}
              <div className="h-px w-full flex-shrink-0" style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />

              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              </div>

              <div className="flex flex-col flex-1 px-6 pt-4" style={{ minHeight: 0, overflow: 'hidden' }}>
                {/* Header */}
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                  <h2 className="font-cormorant font-light" style={{ fontSize: '1.7rem' }}>
                    {sent ? 'Pedido Enviado' : 'Tu Selección'}
                  </h2>
                  <motion.button
                    onClick={handleClose}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer bg-transparent border-0"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)', fontSize: '1rem' }}
                    aria-label="Cerrar carrito"
                  >✕</motion.button>
                </div>

                {/* SUCCESS STATE vs CART STATE */}
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      className="flex flex-col items-center justify-center flex-1 text-center pb-10"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                        style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.35)' }}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-cormorant font-light mb-3"
                        style={{ fontSize: '2rem' }}
                      >
                        ¡Pedido Enviado!
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="tracking-[0.1rem] font-josefin mb-8 leading-7"
                        style={{ fontSize: '0.58rem', color: 'var(--text-dim)', maxWidth: '270px' }}
                      >
                        TU PEDIDO FUE ENVIADO A WHATSAPP. UN ASESOR DE PEPTILAB TE CONTACTARÁ EN BREVE.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col gap-3 w-full"
                      >
                        <motion.button
                          onClick={handleNewOrder}
                          whileTap={{ scale: 0.97 }}
                          className="w-full font-josefin tracking-[0.22rem] cursor-pointer py-3"
                          style={{ fontSize: '0.6rem', border: '1px solid rgba(184,160,106,0.35)', color: 'var(--gold)', background: 'transparent', minHeight: '46px' }}
                        >
                          HACER NUEVO PEDIDO
                        </motion.button>
                        <motion.button
                          onClick={handleClose}
                          whileTap={{ scale: 0.97 }}
                          className="w-full font-josefin tracking-[0.22rem] cursor-pointer py-3"
                          style={{ fontSize: '0.6rem', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', background: 'transparent', minHeight: '46px' }}
                        >
                          CERRAR
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cart"
                      className="flex flex-col flex-1"
                      style={{ minHeight: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Items */}
                      <div className="flex-1 overflow-y-auto pb-2">
                        <AnimatePresence>
                          {cart.length === 0 ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center py-20"
                            >
                              <div className="w-px h-12 mx-auto mb-6" style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,160,106,0.3))' }} />
                              <p className="tracking-[0.3rem] font-josefin" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                                TU CARRITO ESTÁ VACÍO
                              </p>
                            </motion.div>
                          ) : (
                            <div className="space-y-3">
                              <AnimatePresence>
                                {cart.map(item => (
                                  <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex gap-4 items-center p-4"
                                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                                  >
                                    <div className="flex-1 min-w-0">
                                      <p className="font-cormorant font-light leading-tight" style={{ fontSize: '1.05rem' }}>{item.name}</p>
                                      <p className="font-mono mt-0.5" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>
                                        ${(item.price * item.qty).toFixed(2)}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      <button
                                        className="w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent"
                                        style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text)', fontSize: '1rem' }}
                                        onClick={() => changeQty(item.id, -1)}
                                        aria-label="Reducir"
                                      >−</button>
                                      <span className="font-mono min-w-[20px] text-center" style={{ fontSize: '0.85rem' }}>{item.qty}</span>
                                      <button
                                        className="w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent"
                                        style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text)', fontSize: '1rem' }}
                                        onClick={() => changeQty(item.id, 1)}
                                        aria-label="Aumentar"
                                      >+</button>
                                    </div>
                                    <button
                                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0, padding: '8px' }}
                                      onClick={() => removeFromCart(item.id)}
                                      aria-label="Eliminar"
                                    >✕</button>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Footer */}
                      <AnimatePresence>
                        {cart.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pt-4 flex-shrink-0 pb-6"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                          >
                            {/* Summary */}
                            <div className="mb-4 p-4" style={{ background: 'rgba(184,160,106,0.04)', border: '1px solid rgba(184,160,106,0.12)' }}>
                              <p className="tracking-[0.3rem] font-josefin mb-3" style={{ fontSize: '0.5rem', color: 'var(--gold)' }}>
                                RESUMEN DEL PEDIDO
                              </p>
                              {cart.map(item => (
                                <div key={item.id} className="flex justify-between mb-1">
                                  <span className="font-josefin" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>
                                    {item.name} ×{item.qty}
                                  </span>
                                  <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>
                                    ${(item.price * item.qty).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-between items-center mb-4">
                              <span className="tracking-[0.3rem] font-josefin" style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>TOTAL</span>
                              <motion.span
                                key={cartTotal}
                                initial={{ scale: 1.08 }}
                                animate={{ scale: 1 }}
                                className="font-mono"
                                style={{ fontSize: '1.5rem', color: 'var(--gold)' }}
                              >
                                ${cartTotal.toFixed(2)} USD
                              </motion.span>
                            </div>

                            <motion.button
                              onClick={handleWhatsApp}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-4 tracking-[0.22rem] font-josefin cursor-pointer flex items-center justify-center gap-3 border-0"
                              style={{ background: '#25D366', color: '#000', fontSize: '0.7rem', minHeight: '52px' }}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.527 5.845L0 24l6.335-1.505A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.213-3.732.886.948-3.63-.234-.373A9.795 9.795 0 012.182 12c0-5.419 4.399-9.818 9.818-9.818 5.42 0 9.818 4.399 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
                              </svg>
                              ENVIAR PEDIDO POR WHATSAPP
                            </motion.button>
                            <p className="text-center tracking-[0.12rem] mt-2 font-josefin" style={{ fontSize: '0.45rem', color: 'var(--text-muted)' }}>
                              SE ABRIRÁ WHATSAPP CON TU PEDIDO LISTO
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
