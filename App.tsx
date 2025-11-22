import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Works from './components/Works';
import Process from './components/Process';
import Materiality from './components/Materiality';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// Register GSAP Plugins outside component to ensure they are ready
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with specific settings for "luxury" feel
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Force a refresh to ensure pins work correctly after load
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-stone-950 text-stone-100 font-sans selection:bg-amber-900 selection:text-white min-h-screen">
      {/* Noise Texture Overlay for Film Grain Effect */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-noise"></div>
      
      <CustomCursor />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Manifesto />
        <Philosophy />
        <Services />
        <Works />
        <Process />
        <Materiality />
        <Team />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default App;