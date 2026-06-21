import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { 
    label: 'Pistachio Gelato', 
    category: 'Gelato & Sorbet', 
    description: 'Rich, roasted Sicilian pistachios churned into ultra-creamy Italian gelato.',
    img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800' 
  },
  { 
    label: 'Signature Tiramisu', 
    category: 'Patisserie', 
    description: 'The star of Pune! Creamy mascarpone layed with espresso-soaked sponge.',
    img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800' 
  },
  { 
    label: 'Basque Cheesecake', 
    category: 'Patisserie', 
    description: 'Baked to baked-caramelized perfection with a smooth, custard-like center.',
    img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=800' 
  },
  { 
    label: 'Quattro Formaggi Pizza', 
    category: 'Woodfired Oven', 
    description: 'Bubbly, hand-stretched sourdough crust crowned with four premium cheeses.',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800' 
  },
  { 
    label: 'Aesthetic Cozy Bistro Ambiance', 
    category: 'The Vibe', 
    description: 'Soft lighting, warm wooden touches, and romantic indoor/outdoor shared seating designed for beautiful dates.',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200', 
    wide: true 
  },
  { 
    label: 'Pesto Paneer Grilled Sandwich', 
    category: 'Gourmet Savories', 
    description: 'Double-grilled sandwich stuffed with fresh cottage cheese and herbaceous house pesto.',
    img: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=800' 
  },
  { 
    label: 'Mango Tres Leches', 
    category: 'Patisserie', 
    description: 'Soft sponge soaked in three milks, finished with sweet chunks of fresh Alphonso mangoes.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800' 
  },
];

export function ProductGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.gallery-item');
    
    gsap.set(items, { opacity: 0, y: 80, filter: 'blur(5px)' });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true
      }
    });
  }, { scope: containerRef });

  return (
    <div className="bg-white py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>
      <div className="w-[90%] md:w-[65%]">
        
        {/* Gallery Title Block */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.25em] text-[11px] font-bold font-manrope">Artisanal Menu</span>
          <h2 className="font-luxurious text-4xl md:text-5xl text-black mt-2">
            Rihla Highlights
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto my-4" />
          <p className="text-neutral-500 font-manrope text-sm max-w-lg mx-auto leading-relaxed">
            From hand-churned Italian gelatos and fresh fruit sorbets to bubbly woodfired pizzas, discover our highly recommended creations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-6">
          {/* Row 1: First 4 items */}
          {ITEMS.slice(0, 4).map((item) => (
            <GalleryCard key={item.label} item={item} />
          ))}

          {/* Row 2: contains wide item, and final 2 items */}
          <GalleryCard item={ITEMS[4]} extraClasses="col-span-2" />
          <GalleryCard item={ITEMS[5]} />
          <GalleryCard item={ITEMS[6]} />
        </div>

      </div>
    </div>
  );
}

function GalleryCard({ item, extraClasses = '' }: { key?: string; item: any; extraClasses?: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={`p-1 gallery-item flex flex-col group ${extraClasses}`}>
      <div 
        className="overflow-hidden rounded-sm relative bg-neutral-100 shadow-sm" 
        style={{ aspectRatio: item.wide ? '8/3' : '3/4' }}
      >
        {/* Shimmer Placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 -translate-x-full animate-[shimmer_1.5s_infinite]" />
            <div className="w-6 h-6 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
          </div>
        )}

        <img 
          src={item.img}
          alt={item.label}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-[4000ms] group-hover:scale-[1.15] group-hover:ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } transition-opacity duration-700 ease-out`}
        />
        
        {/* Quick subtle tag badge overlay */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[9px] uppercase tracking-wider text-white font-manrope font-semibold">
          {item.category}
        </div>
      </div>

      <div className="text-left mt-3">
        <h3 className="text-black text-[15px] font-manrope font-semibold tracking-wide">
          {item.label}
        </h3>
        <p className="text-neutral-500 text-xs font-manrope mt-1.5 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
