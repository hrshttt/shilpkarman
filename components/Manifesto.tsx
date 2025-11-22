import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const lines = [
    "In the heart of Udaipur,",
    "where stone whispers history,",
    "we do not merely build.",
    "We weave shadows with light,",
    "merge the raw with the refined,",
    "and resurrect the spirit of the Jali",
    "for the modern world."
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-[80vh] flex items-center justify-center py-32 px-6 md:px-20 bg-stone-950"
    >
      <div className="max-w-5xl w-full">
        <div className="flex flex-col items-start md:items-center">
          {lines.map((line, index) => (
            <h2 
              key={index}
              ref={(el) => (textRefs.current[index] = el)}
              className={`text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.2] text-stone-200 ${index % 2 !== 0 ? 'md:ml-24 italic text-stone-400' : ''}`}
            >
              {line}
            </h2>
          ))}
        </div>
        <div className="mt-16 flex justify-center w-full">
            <div className="w-px h-24 bg-gradient-to-b from-stone-800 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;