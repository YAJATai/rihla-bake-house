import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, MessageSquare } from 'lucide-react';
import { SplitText } from './ui/SplitText';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: 'Pune Date Guide',
    tag: 'Aesthetic Highlights',
    rating: 5,
    text: "Rihla Bake House serves Pune's best Gelatos and pizza! Having a very cozy and aesthetic ambiance makes Rihla a perfecttt date place 💗. The food is definitely a 10/10!! A must visit place with your loved ones.",
    date: '2 years ago'
  },
  {
    name: 'Hunar Agrawal',
    tag: 'Local Guide',
    rating: 5,
    text: "I tried the basque cheesecake and tiramisu here, and both were really good, with the tiramisu being the star — super creamy and absolutely delicious; the cheesecake was equally enjoyable! Offers a great variety.",
    date: '5 months ago'
  },
  {
    name: 'Avneesh Mishra',
    tag: 'Local Guide',
    rating: 5,
    text: "I had the tiramisu cake and it was delicious: creamy with cake having nice sponge. The place is also known for the basque cheesecake and mango tres leches dessert. Seating includes cozy outdoor spaces. Gelato is wonderful.",
    date: '2 months ago'
  },
  {
    name: 'ChubbyFoodie',
    tag: 'Local Guide',
    rating: 4,
    text: "Tried the mango tres leches, chocolate mousse, and basque cheesecake. The chocolate mousse was good with nice rich undertones. The basque cake was excellent, and the cozy courtyard makes for a sweet visit.",
    date: '6 months ago'
  }
];

export function Partnering() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set('.partner-title-char', { opacity: 0, y: 30 });
    gsap.to('.partner-title-char', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    });

    gsap.set('.partner-card', { opacity: 0, y: 50 });
    gsap.to('.partner-card', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.partner-cardsGrid',
        start: 'top 85%',
        once: true
      }
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full py-20 md:py-28 bg-neutral-950 overflow-hidden"
    >
      {/* Background radial gradient decoration for cosmic premium look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Rating summary overview */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
            <span className="text-gold font-bold text-xs">4.3</span>
            <div className="flex items-center text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-bold">185 Reviews</span>
          </div>
        </div>

        <h2 className="text-center mb-14 overflow-hidden px-4">
          <SplitText
            text="Guestbook & Love"
            className="font-luxurious text-[32px] md:text-[44px] leading-[1.3] text-white"
            charClass="partner-title-char"
          />
        </h2>

        <div className="partner-cardsGrid w-[90%] md:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {REVIEWS.map((review, i) => (
            <div 
              key={i} 
              className="partner-card bg-neutral-900/60 backdrop-blur-md border border-neutral-800/80 p-6 md:p-8 flex flex-col items-start gap-4 rounded-md transition-all duration-300 hover:border-gold/30 hover:bg-neutral-900/80"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-white font-semibold font-manrope text-sm tracking-wide">{review.name}</span>
                  <span className="text-gold/80 text-[10px] tracking-wider uppercase font-semibold mt-0.5">{review.tag}</span>
                </div>
                <div className="flex items-center text-gold gap-0.5">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                  {review.rating < 5 && (
                    <Star className="w-3.5 h-3.5 text-neutral-700" />
                  )}
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute -top-3 -left-3 w-8 h-8 text-white/5 pointer-events-none" />
                <p className="text-neutral-300 text-xs md:text-sm font-manrope leading-relaxed italic pl-3 relative z-10">
                  "{review.text}"
                </p>
              </div>

              <div className="w-full h-[1px] bg-neutral-800 mt-[10px]" />

              <div className="flex items-center justify-between w-full text-[10px] text-neutral-500 font-manrope font-semibold">
                <span>Verified Google Review</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
