import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Instagram, Star, Bookmark } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80, duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Rihla+Bake+House+Lalit+Estate+Baner+Pune";

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 transition-all duration-500',
          scrolled ? 'bg-black/95 backdrop-blur-[60px] shadow-lg py-3' : 'bg-transparent py-6'
        )}
      >
        <div className="flex items-center gap-8">
          {/* Outlet Location Indicator with Compass link */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 cursor-pointer group relative hover:opacity-90 transition-opacity"
          >
            <Compass className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-white text-[12px] uppercase tracking-widest font-manrope font-bold">Baner, Pune</span>
          </a>

          {/* Left links */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleScrollTo('hero')}
              className="text-white/80 hover:text-gold text-[12px] uppercase tracking-widest font-semibold font-manrope transition-colors cursor-pointer"
            >
              Tour
            </button>
            <button
              onClick={() => handleScrollTo('gallery')}
              className="text-white/80 hover:text-gold text-[12px] uppercase tracking-widest font-semibold font-manrope transition-colors cursor-pointer"
            >
              Highlights
            </button>
            <button
              onClick={() => handleScrollTo('full-menu')}
              className="text-white/80 hover:text-gold text-[12px] uppercase tracking-widest font-semibold font-manrope transition-colors cursor-pointer"
            >
              Full Menu
            </button>
          </div>
        </div>

        {/* Logo text: Rihla - Bake House */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto">
          <button 
            onClick={() => handleScrollTo('hero')}
            className="flex flex-col items-center gap-0.5 cursor-pointer select-none group"
          >
            <span className="font-luxurious text-white text-xl md:text-2xl tracking-[0.1em] uppercase group-hover:text-gold transition-colors duration-300">
              Rihla
            </span>
            <span className="font-manrope text-[8px] md:text-[9px] text-neutral-400 group-hover:text-white uppercase tracking-[0.35em] tracking-widest font-bold transition-colors">
              Bake House • रिहला
            </span>
          </button>
        </div>

        {/* Right Links & Action buttons */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleScrollTo('about')}
              className="text-white/80 hover:text-gold text-[12px] uppercase tracking-widest font-semibold font-manrope transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => handleScrollTo('partnering')}
              className="text-white/80 hover:text-gold text-[12px] uppercase tracking-widest font-semibold font-manrope transition-colors cursor-pointer"
            >
              Guestbook
            </button>
            <button
              onClick={() => handleScrollTo('footer')}
              className="text-white/80 hover:text-gold text-[12px] uppercase tracking-widest font-semibold font-manrope transition-colors cursor-pointer"
            >
              Connect
            </button>
          </div>

          {/* Social / Language */}
          <div className="hidden md:flex items-center border border-white/20 rounded-full p-0.5">
             <div className="px-3 py-1 bg-gold text-white text-[11px] rounded-full font-bold font-manrope">EN</div>
             <div className="px-3 py-1 text-white/50 text-[11px] hover:text-white rounded-full font-bold font-manrope">HI</div>
          </div>

          <button className="lg:hidden text-white hover:text-gold" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-lg flex flex-col pt-24 px-8 font-manrope">
          <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          
          <div className="flex flex-col gap-8 text-white mt-8">
             <button 
               onClick={() => handleScrollTo('hero')}
               className="text-left text-2xl font-luxurious tracking-wider hover:text-gold transition-colors"
             >
               Video Entry Tour
             </button>
             <button 
               onClick={() => handleScrollTo('gallery')}
               className="text-left text-2xl font-luxurious tracking-wider hover:text-gold transition-colors"
             >
               Artisanal Highlights
             </button>
             <button 
               onClick={() => handleScrollTo('full-menu')}
               className="text-left text-2xl font-luxurious tracking-wider hover:text-gold transition-colors"
             >
               Full Menu
             </button>
             <button 
               onClick={() => handleScrollTo('about')}
               className="text-left text-2xl font-luxurious tracking-wider hover:text-gold transition-colors"
             >
               About Our Story
             </button>
             <button 
               onClick={() => handleScrollTo('partnering')}
               className="text-left text-2xl font-luxurious tracking-wider hover:text-gold transition-colors"
             >
               Reviews & Love
             </button>
             <button 
               onClick={() => handleScrollTo('footer')}
               className="text-left text-2xl font-luxurious tracking-wider hover:text-gold transition-colors"
             >
               Get Directions & Hours
             </button>
          </div>
          
          {/* Mobile Footer Area */}
          <div className="mt-auto pb-12 flex flex-col gap-4 border-t border-neutral-800 pt-6">
             <a 
               href={mapUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="w-full py-3 bg-gold hover:bg-gold/90 text-white font-bold tracking-widest text-xs uppercase text-center rounded-sm flex items-center justify-center gap-2"
             >
               <Compass className="w-4 h-4" />
               <span>Directions To Baner</span>
             </a>
             <div className="flex gap-4 justify-center items-center mt-2 text-neutral-400 text-xs">
                <span className="font-bold text-white">EN</span>
                <span>/</span>
                <span className="hover:text-white cursor-pointer">HI</span>
                <span className="text-neutral-700">•</span>
                <span>Open Daily 12 PM - 11 PM</span>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
