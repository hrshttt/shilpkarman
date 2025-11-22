
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial Reveal
      tl.fromTo('.hero-bg-img', 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
      )
      .fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
        "-=1.5"
      );

      // Subtle Scroll Parallax
      gsap.to('.hero-bg-img', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      gsap.to(textRef.current, {
        y: '-50%',
        opacity: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-stone-950 flex flex-col justify-center items-center">
      
      {/* Background Image - The one requested to keep */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2574&auto=format&fit=crop" 
          alt="Shilpkarman Hero"
          className="hero-bg-img w-full h-full object-cover origin-center"
        />
      </div>

      {/* Main Typography */}
      <div className="relative z-20 text-center mix-blend-overlay px-4">
        <p className="text-stone-300 text-sm md:text-lg tracking-[0.5em] uppercase mb-4 font-sans font-light">
          Udaipur &bull; Rajasthan
        </p>
        <h1 ref={textRef} className="text-[16vw] md:text-[14vw] leading-[0.8] font-serif font-bold text-white tracking-tighter">
          SHILP<br className="md:hidden" />KARMAN
        </h1>
      </div>

      {/* Footer of Hero */}
      <div className="absolute bottom-10 w-full px-10 flex justify-between items-end text-white/60 text-xs uppercase tracking-widest z-20 hidden md:flex">
        <div className="w-1/3">
           Est. 1998
        </div>
        <div className="w-1/3 text-center">
           Scroll to Explore
        </div>
        <div className="w-1/3 text-right">
           Modern Heritage
        </div>
      </div>
    </section>
  );
};

export default Hero;
