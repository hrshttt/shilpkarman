
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhilosophyStep } from '../types';

// The 3 Allowed Images
const IMG_1 = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop";
const IMG_2 = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400&auto=format&fit=crop";
const IMG_3 = "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2400&auto=format&fit=crop";

const philosophyData: PhilosophyStep[] = [
  {
    title: "Concept Sketches",
    description: "Every legacy begins with a line. Our process starts with hand-drawn abstractions, interpreting the site's energy before digital tools ever touch the canvas.",
    image: IMG_3
  },
  {
    title: "Material Honesty",
    description: "We source local sandstone and marble from the Aravalli range. We believe the material dictates the form, not the other way around. Raw, tactile, and eternal.",
    image: IMG_1
  },
  {
    title: "The Living Void",
    description: "Architecture is the art of wasting space beautifully. Our courtyards allow the home to breathe, channeling light and air through the intricate Jali work.",
    image: IMG_2
  }
];

const Philosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray('.philo-text-block');
      
      texts.forEach((text: any, i) => {
        ScrollTrigger.create({
          trigger: text,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative w-full bg-stone-900 text-stone-200">
      <div className="flex flex-col md:flex-row">
        {/* Sticky Image Side */}
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen sticky top-0 overflow-hidden border-r border-stone-800 bg-stone-800">
          {philosophyData.map((step, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/20 z-10 mix-blend-multiply"></div>
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover filter contrast-110"
                loading="lazy"
              />
              <div className="absolute bottom-10 left-10 z-20">
                <div className="flex items-center gap-4">
                     <span className="text-8xl font-serif font-bold text-white/20">0{index + 1}</span>
                     <div className="h-[1px] w-24 bg-white/30"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scrolling Text Side */}
        <div className="w-full md:w-1/2 bg-stone-950">
          {philosophyData.map((step, index) => (
            <div
              key={index}
              className="philo-text-block min-h-[80vh] md:min-h-screen flex flex-col justify-center px-8 md:px-24"
            >
              <span className="text-amber-700 uppercase tracking-widest text-xs mb-4">Phase {index + 1}</span>
              <h3 className="text-4xl md:text-6xl font-serif mb-8 text-stone-100">{step.title}</h3>
              <p className="text-lg md:text-xl font-light leading-relaxed text-stone-400 max-w-md">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
