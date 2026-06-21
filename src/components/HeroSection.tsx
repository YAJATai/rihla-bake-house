import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SCROLL_PER_SLIDE_VH = 60;
const VIDEOS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260515_113235_88e0d62e-8103-40c1-948e-f0a4f886ffd1.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260515_114315_ee3663e6-bd79-41b4-9e5b-0fae62827eb9.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260515_114559_dca18b14-90f5-47c4-8a84-3cbae9bd8a0c.mp4',
];

const SLIDES_TEXT = [
  {
    subtitle: "La Dolce Vita • Pune's Best Gelatos",
    title: "Rihla Bake House",
    caption: "Hand-Churned Italian Gelatos & Gourmet Sorbets"
  },
  {
    subtitle: "Woodfired Bistro & Pizzeria",
    title: "Artisanal Pizzas",
    caption: "Fermented Sourdough & Rich House-Made Pesto"
  },
  {
    subtitle: "Heavenly Sweet Indulgences",
    title: "Decadent Cakes",
    caption: "Featuring Tiramisu, Basque Cheesecake, & Tres Leches"
  }
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);

  // Measure window height for responsive calculations
  useEffect(() => {
    const updateSize = () => setWindowHeight(window.innerHeight);
    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Entrance animations for the initial slide
  useGSAP(() => {
    gsap.fromTo(
      '.layer-content-0',
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  // Lerp and sample logic running inside a requestAnimationFrame loop
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      if (windowHeight && containerRef.current) {
        // Read window.scrollY and container offset to avoid layout thrashing
        const offsetTop = containerRef.current.offsetTop;
        const scrollMoved = window.scrollY - offsetTop;
        
        let rawProgress = scrollMoved / (windowHeight * (SCROLL_PER_SLIDE_VH / 100));
        rawProgress = Math.max(0, Math.min(rawProgress, VIDEOS.length - 1));
        
        targetProgress.current = rawProgress;
      }

      const diff = targetProgress.current - currentProgress.current;
      
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.3;
        setDisplayedProgress(currentProgress.current);
      } else if (currentProgress.current !== targetProgress.current) {
        // Clean snap to the exact target when very close, ensuring full visual convergence
        currentProgress.current = targetProgress.current;
        setDisplayedProgress(targetProgress.current);
      }
      
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [windowHeight]);

  const easeInOutCubic = (p: number) => {
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `calc(100vh + ${(VIDEOS.length - 1) * SCROLL_PER_SLIDE_VH}vh)` }}
    >
      <section className="sticky top-0 w-full h-screen overflow-visible bg-black">
        {VIDEOS.map((src, index) => {
          let clipPath = '';
          const localProgress = displayedProgress - index + 1;

          if (index === 0) {
            clipPath = 'none';
          } else {
            if (localProgress <= 0) {
              clipPath = 'inset(100% 0% 0% 0%)';
            } else if (localProgress >= 1) {
              clipPath = 'inset(0% 0% 0% 0%)';
            } else {
              const eased = easeInOutCubic(localProgress);
              const top = (1 - eased) * 100;
              clipPath = `inset(${top}% 0% 0% 0%)`;
            }
          }

          return (
            <div
              key={src}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath,
                zIndex: index,
              }}
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src={src}
              />
              
              {/* Premium dark visual grade overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75 pointer-events-none" />

              {/* Dynamic, Per-Video Text Overlay that clips together with the mask */}
              <div className={`layer-content-${index} absolute inset-0 flex flex-col items-center justify-between select-none pb-24 pt-[18vh] md:pt-[22vh]`}>
                {/* Upper Subtitle Category */}
                <div className="text-center px-4">
                  <span className="font-manrope text-[10px] md:text-xs tracking-[0.35em] text-gold font-bold uppercase block mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {SLIDES_TEXT[index].subtitle}
                  </span>
                  <div className="h-[1px] w-8 bg-gold/50 mx-auto" />
                </div>

                {/* Massive Centre Title & Desc */}
                <div className="w-full px-4 text-center">
                  <h1 className="font-accent text-[12vw] md:text-[6.5vw] text-white font-normal tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] select-all leading-tight">
                    {index === 0 ? (
                      <>
                        <span className="italic text-gold">Rihla</span> Bake House
                      </>
                    ) : index === 1 ? (
                      <>
                        Artisanal <span className="italic text-gold">Pizzas</span>
                      </>
                    ) : (
                      <>
                        Decadent <span className="italic text-gold">Cakes</span>
                      </>
                    )}
                  </h1>
                  <p className="font-manrope text-[10px] md:text-[13px] text-white/90 tracking-[0.2em] md:tracking-[0.35em] uppercase font-bold mt-5 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                    {SLIDES_TEXT[index].caption}
                  </p>
                </div>

                {/* Dummy alignment block to push typography to center-bottom rhythm */}
                <div className="h-[20px] invisible" />
              </div>

            </div>
          );
        })}

        {/* Global base shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-[15] pointer-events-none" />

        {/* Premium Dynamic Scroll Indicator */}
        <div 
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none transition-all duration-300"
          style={{ opacity: Math.max(0, 1 - displayedProgress * 4) }}
        >
          <span className="font-manrope text-[9px] tracking-[0.3em] uppercase text-white/60 font-bold">Scroll</span>
          <div className="w-[1.5px] h-9 bg-white/10 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full h-[40%] bg-gold rounded-full animate-scroll-line" />
          </div>
        </div>

      </section>
    </div>
  );
}
