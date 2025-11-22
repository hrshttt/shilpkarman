
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// The 3 Allowed Images
const IMG_1 = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop";
const IMG_2 = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400&auto=format&fit=crop";
const IMG_3 = "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2400&auto=format&fit=crop";

const Materiality: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const xTo = -(wrapper.scrollWidth - window.innerWidth);
      
      gsap.to(wrapper, {
        x: xTo,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: `+=${Math.abs(xTo)}`,
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const materials = [
    { name: "Banswara Purple Marble", img: IMG_3 },
    { name: "Jaisalmer Yellow", img: IMG_1 },
    { name: "Rough Hewn Granite", img: IMG_2 },
    { name: "Aravali Lime Plaster", img: IMG_3 },
    { name: "Teak Wood", img: IMG_1 }
  ];

  return (
    <section ref={containerRef} className="h-screen overflow-hidden bg-stone-200 text-stone-900 flex items-center relative z-20">
      <div className="absolute top-10 left-10 md:left-20 z-10">
        <h2 className="text-5xl font-serif text-stone-900">Material Palette</h2>
        <p className="text-xs uppercase tracking-widest mt-4 text-stone-600 font-bold border-b border-stone-900 pb-1 inline-block">Contextual & Tactile</p>
      </div>
      
      <div ref={wrapperRef} className="flex pl-10 md:pl-20 space-x-10 md:space-x-20 items-center h-full">
        {materials.map((mat, i) => (
          <div key={i} className="flex-shrink-0 w-[80vw] md:w-[30vw] h-[60vh] relative group cursor-none">
            <div className="w-full h-full overflow-hidden shadow-2xl bg-stone-300">
                 <img 
                    src={mat.img} 
                    alt={mat.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                 />
            </div>
            <div className="absolute -bottom-12 left-0">
              <span className="text-stone-400 text-xs font-mono mb-2 block">0{i+1}</span>
              <h3 className="text-3xl font-serif text-stone-900">{mat.name}</h3>
            </div>
          </div>
        ))}
        {/* Spacer */}
        <div className="w-20 h-full flex-shrink-0"></div>
      </div>
    </section>
  );
};

export default Materiality;
