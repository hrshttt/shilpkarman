
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { TeamMember } from '../types';

// The 3 Allowed Images
const IMG_1 = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop";
const IMG_2 = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400&auto=format&fit=crop";
const IMG_3 = "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2400&auto=format&fit=crop";

const team: TeamMember[] = [
  { name: "Aditya Singh", role: "Principal Architect", image: IMG_2 },
  { name: "Meera Kapoor", role: "Lead Interior Designer", image: IMG_1 },
  { name: "Rohan Verma", role: "Landscape Architect", image: IMG_3 },
  { name: "Priya Desai", role: "Restoration Specialist", image: IMG_1 },
];

const Team: React.FC = () => {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const x = e.clientX;
    const y = e.clientY;

    // Move the floating image
    gsap.to(imageRef.current, {
      x: x + 40,
      y: y - 120,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-stone-950 relative overflow-hidden cursor-none z-30"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6 md:px-20">
        <div className="flex flex-col items-center">
          <p className="text-stone-600 uppercase tracking-[0.3em] mb-12 text-sm">The Studio</p>
          {team.map((member, index) => (
            <div 
              key={index}
              className="w-full border-b border-stone-800 py-10 flex flex-col md:flex-row justify-between items-baseline group hover:px-8 transition-all duration-500 cursor-none"
              onMouseEnter={() => setActiveMember(member)}
              onMouseLeave={() => setActiveMember(null)}
            >
              <h3 className="text-4xl md:text-6xl font-serif text-stone-400 group-hover:text-white transition-colors duration-300">{member.name}</h3>
              <span className="text-xs md:text-sm uppercase tracking-widest text-stone-600 group-hover:text-amber-600 mt-2 md:mt-0 transition-colors duration-300">{member.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image Reveal */}
      <div 
        ref={imageRef}
        className={`fixed top-0 left-0 w-56 h-72 pointer-events-none z-50 transition-opacity duration-300 ${activeMember ? 'opacity-100' : 'opacity-0'}`}
      >
        {activeMember && (
          <div className="w-full h-full relative overflow-hidden rounded-none border border-stone-500/30 bg-stone-900">
             <img 
                src={activeMember.image} 
                alt={activeMember.name} 
                className="w-full h-full object-cover filter grayscale contrast-125 scale-110"
            />
            <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
