import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Testimonials: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!marqueeRef.current) return;

      const width = marqueeRef.current.scrollWidth;
      
      gsap.to(marqueeRef.current, {
        x: -width / 2, // Assuming doubled content
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const text = " • VISIONARY • ROOTED IN CULTURE • EXQUISITE CRAFTSMANSHIP • TIMELESS ELEGANCE • UDAIPUR'S FINEST";

  return (
    <section className="py-20 bg-amber-900 overflow-hidden text-stone-950">
      <div className="relative flex overflow-hidden whitespace-nowrap">
        <div ref={marqueeRef} className="flex text-[8vw] font-serif font-bold leading-none uppercase">
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;