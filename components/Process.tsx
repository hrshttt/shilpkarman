import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  { id: "01", title: "Consultation", desc: "Understanding the vision and the land." },
  { id: "02", title: "Ideation", desc: "Sketching forms that honor the context." },
  { id: "03", title: "Execution", desc: "Crafting with precision and local stone." },
  { id: "04", title: "Handover", desc: "A seamless transition to legacy." },
];

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the SVG line drawing down
      const lineLength = lineRef.current?.getTotalLength() || 1000;
      
      gsap.set(lineRef.current, { strokeDasharray: lineLength, strokeDashoffset: lineLength });
      
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Animate list items appearing
      const items = gsap.utils.toArray('.process-item');
      items.forEach((item: any) => {
        gsap.from(item, {
          opacity: 0,
          x: -50,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-stone-950 text-stone-200 overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
         <svg className="h-full w-20 -ml-10" preserveAspectRatio="none">
           <path ref={lineRef} d="M10,0 V5000" stroke="#d97706" strokeWidth="2" fill="none" />
         </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-center text-4xl font-serif mb-24">The Process</h2>
        
        <div className="flex flex-col space-y-32">
          {steps.map((step, i) => (
            <div 
              key={step.id} 
              className={`process-item flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
            >
              <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                <span className="text-6xl font-bold text-stone-800 block mb-4">{step.id}</span>
                <h3 className="text-3xl font-serif text-amber-700 mb-2">{step.title}</h3>
                <p className="text-stone-400 text-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;