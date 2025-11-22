import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="text-xl md:text-2xl font-serif font-bold tracking-widest text-white cursor-pointer z-50" onClick={() => window.scrollTo(0,0)}>
          SHILPKARMAN
        </div>

        <div className="hidden md:flex space-x-12">
          {['Philosophy', 'Services', 'Works', 'Contact'].map((item, i) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="group relative text-xs uppercase tracking-[0.2em] text-white overflow-hidden"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {item}
              </span>
              <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-stone-400">
                {item}
              </span>
            </button>
          ))}
        </div>

        <button 
          className="md:hidden text-white z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-stone-950 z-30 flex items-center justify-center transition-transform duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
         <div className="flex flex-col space-y-8 text-center">
            {['Philosophy', 'Services', 'Works', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-4xl font-serif text-stone-300 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
         </div>
      </div>
    </>
  );
};

export default Navbar;