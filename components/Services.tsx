
import React, { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { Service } from '../types';

// The 3 Allowed Images
const IMG_1 = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop";
const IMG_2 = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400&auto=format&fit=crop";
const IMG_3 = "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2400&auto=format&fit=crop";

const services: Service[] = [
  {
    title: "Architecture",
    description: "Holistic spatial planning rooted in Vastu and climate responsiveness. We build structures that age gracefully with the land.",
    image: IMG_1
  },
  {
    title: "Heritage Restoration",
    description: "Breathing new life into Havelis while preserving their soul. Meticulous limestone plastering and stone carving restoration.",
    image: IMG_3
  },
  {
    title: "Landscape Design",
    description: "Seamless integration of built forms with the Aravalli terrain. Xeriscaping and courtyard planning.",
    image: IMG_2
  },
  {
    title: "Interior Curation",
    description: "Bespoke furniture, artisanal detailing, and lighting design that dramatizes shadow and light.",
    image: IMG_1
  }
];

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-24 bg-stone-950 px-4 md:px-10 min-h-screen flex flex-col justify-center">
      <div className="mb-16 border-b border-stone-800 pb-4 flex justify-between items-end">
        <h2 className="text-4xl md:text-6xl font-serif text-stone-100">Our Expertise</h2>
        <p className="hidden md:block text-stone-500 uppercase tracking-widest text-sm">Scope of Work</p>
      </div>

      <div className="flex flex-col">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative border-b border-stone-800 transition-all duration-500"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div 
              className="flex flex-col md:flex-row items-baseline md:items-center justify-between py-8 md:py-10 relative z-10 cursor-pointer"
              onClick={() => toggleService(index)}
            >
              <div className="flex items-center gap-8">
                <span className="text-stone-600 font-mono text-sm">0{index + 1}</span>
                <h3 className={`text-3xl md:text-5xl font-serif transition-colors duration-500 ${activeIndex === index ? 'text-white' : 'text-stone-400'}`}>
                  {service.title}
                </h3>
              </div>
              
              <div className="hidden md:block">
                 <ArrowUpRight 
                    className={`text-amber-600 transition-all duration-500 ${activeIndex === index ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-4 translate-y-4'}`} 
                    size={32} 
                 />
              </div>
              <div className="md:hidden mt-4">
                 {activeIndex === index ? <Minus size={20} className="text-white" /> : <Plus size={20} className="text-stone-500" />}
              </div>
            </div>

            {/* Reveal Content */}
            <div
              className={`overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeIndex === index ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 pt-4">
                {/* Image */}
                <div className="md:col-span-5 h-64 md:h-96 w-full overflow-hidden rounded-sm bg-stone-900">
                    <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1500ms] scale-110 group-hover:scale-100"
                        loading="lazy"
                    />
                </div>
                
                {/* Description */}
                <div className="md:col-span-7 flex flex-col justify-between">
                    <p className="text-xl md:text-3xl font-light text-stone-300 leading-snug max-w-2xl transition-all duration-[1500ms] delay-100 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                      {service.description}
                    </p>
                    <div className="mt-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] delay-200">
                        <button className="px-6 py-2 border border-stone-700 text-stone-400 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                            View Projects
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
