
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Project } from '../types';

// The 3 Allowed Images
const IMG_1 = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop";
const IMG_2 = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2400&auto=format&fit=crop";
const IMG_3 = "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2400&auto=format&fit=crop";

const projects: Project[] = [
  { 
    id: 1, 
    title: "The Lake House", 
    category: "Residential", 
    location: "Pichola, Udaipur", 
    image: IMG_2 
  },
  { 
    id: 2, 
    title: "Devigarh Restoration", 
    category: "Heritage", 
    location: "Delwara", 
    image: IMG_3
  },
  { 
    id: 3, 
    title: "Onyx Private Villa", 
    category: "Modern Luxury", 
    location: "Fateh Sagar", 
    image: IMG_1
  },
  { 
    id: 4, 
    title: "Rawat Serai", 
    category: "Hospitality", 
    location: "Old City", 
    image: IMG_2
  },
];

const Works: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced Parallax: Smoother and more noticeable
      if (window.innerWidth > 768) {
          gsap.to('.col-left', {
            y: -150,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
          
          gsap.to('.col-right', {
            y: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" ref={containerRef} className="py-32 bg-stone-900 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 text-center">
             <span className="text-amber-700 uppercase tracking-widest text-sm font-bold mb-4 block">Portfolio</span>
             <h2 className="text-5xl md:text-8xl font-serif text-stone-200">Selected Works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
          {/* Column 1 */}
          <div className="col-left flex flex-col gap-16 md:gap-32 md:mt-0">
            {projects.filter((_, i) => i % 2 === 0).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="col-right flex flex-col gap-16 md:gap-32 md:mt-48">
             {projects.filter((_, i) => i % 2 !== 0).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        
        <div className="mt-32 text-center">
             <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-stone-800 px-8 font-medium text-stone-200 transition-all duration-300 hover:w-56 hover:bg-amber-800">
                <span className="mr-2">View All Projects</span>
                <div className="absolute right-0 translate-x-full opacity-0 transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-100">
                   →
                </div>
             </button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group cursor-pointer w-full">
      <div className="overflow-hidden mb-6 relative aspect-[3/4] md:aspect-[4/5] bg-stone-800">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-xs uppercase tracking-widest text-white border border-white/20">
                View Case Study
             </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl md:text-4xl font-serif text-stone-200 group-hover:text-amber-600 transition-colors duration-300">{project.title}</h3>
        <div className="flex justify-between items-center mt-2 border-t border-stone-800 pt-3">
            <p className="text-xs md:text-sm text-stone-500 uppercase tracking-widest">{project.category}</p>
            <p className="text-xs md:text-sm text-stone-500 italic font-serif">{project.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Works;
