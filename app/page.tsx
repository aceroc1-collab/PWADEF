'use client';

import { CartProvider } from '../components/CartContext';
import BottomNav from '../components/BottomNav';
import Hero from '../components/Hero';
import Products from '../components/Products';
import CartPanel from '../components/CartPanel';
import InstallPrompt from '../components/InstallPrompt';
import { Ticker, About, LabSection, MoleculesSection, Benefits, Testimonials, FAQ, Contact, Footer } from '../components/Sections';

export default function Home() {
  return (
    <CartProvider>
      <CartPanel />
      <InstallPrompt />
      <main>
        <Hero />
        <Ticker />
        <About />
        <LabSection />
        <Products />
        <MoleculesSection />
        <Benefits />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
    </CartProvider>
  );
}
