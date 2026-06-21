import React from 'react';
import { Phone, Mail, Clock, MapPin, Compass, Globe, MessageSquare } from 'lucide-react';

export function Footer() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Rihla+Bake+House+Lalit+Estate+Baner+Pune";
  const whatsappUrl = "https://wa.me/918421633469";

  return (
    <footer className="bg-white w-full border-t border-neutral-100">
      <div className="px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-12 flex flex-col gap-12">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          
          {/* Brand/Timings */}
          <div className="flex flex-col items-start gap-4 max-w-sm">
            <h3 className="font-luxurious text-2xl tracking-wide text-black">
              Rihla - Bake House
            </h3>
            <p className="text-sm text-neutral-500 font-manrope leading-relaxed">
              Serving Pune's premier hand-churned Italian gelatos, fresh sorbets, artisanal pastries, and woodfired sourdough pizzas in a cozy, romantic garden setting.
            </p>
            <div className="flex items-center gap-2 mt-2 bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full font-manrope">
              <Clock className="w-3.5 h-3.5" />
              <span>Closed • Opens 12:00 PM – 11:30 PM Daily</span>
            </div>
          </div>

          {/* Quick info columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 font-body min-w-[280px]">
             
             {/* Contact details */}
             <div className="flex flex-col gap-4">
                <h4 className="text-[12px] text-neutral-400 uppercase tracking-widest font-bold font-manrope">Get in Touch</h4>
                <div className="flex flex-col gap-3 font-manrope">
                  <a 
                    href="tel:08421633469" 
                    className="flex items-center gap-2 text-sm font-bold text-black hover:text-gold transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-neutral-400 group-hover:text-gold" />
                    <span>084216 33469</span>
                  </a>
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-black hover:text-gold transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <div className="flex items-start gap-2 text-sm text-neutral-600 leading-relaxed max-w-[245px]">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span>Lalit Estate, Opp. Reliance Digital, Baner, Pune - 411069</span>
                  </div>
                </div>
             </div>

             {/* Navigation Links and Online Orders */}
             <div className="flex flex-col gap-4">
                <h4 className="text-[12px] text-neutral-400 uppercase tracking-widest font-bold font-manrope">Explore</h4>
                <div className="flex flex-col gap-3 font-manrope">
                  <a href="#hero" className="text-sm font-medium text-black hover:text-gold transition-colors">Hero Video Tour</a>
                  <a href="#gallery" className="text-sm font-medium text-black hover:text-gold transition-colors">Menu Highlights</a>
                  <a href="#about" className="text-sm font-medium text-black hover:text-gold transition-colors">Our Cozy Vibe</a>
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-gold hover:underline">
                    <Compass className="w-4 h-4" />
                    <span>Get Live Directions</span>
                  </a>
                </div>
             </div>

          </div>
        </div>

        {/* Elegant Embedded Maps Preview Widget */}
        <div className="w-full h-[200px] md:h-[260px] rounded-sm overflow-hidden relative border border-neutral-100 group shadow-sm bg-neutral-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m3!1i360!2i120!4m5!3m4!1s0x3bc2bec70404a7bd:0x6ca3bb3ff5b3f11d!8m2!3d18.559981!4d73.780133"
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-[600ms]"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 bg-black/5 pointer-events-none group-hover:bg-transparent transition-all duration-[600ms]" />
          
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="absolute bottom-4 right-4 bg-black hover:bg-gold text-white font-manrope text-xs font-semibold tracking-wider uppercase py-2.5 px-5 rounded-sm shadow-lg flex items-center gap-2 transition-colors duration-300 pointer-events-auto"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-black px-6 md:px-10 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4 font-manrope">
        <div className="text-[11px] text-white/40 tracking-wider">
          © {new Date().getFullYear()} Rihla Bake House, Pune. Styled with artisanal love.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[11px] text-white/40 hover:text-white transition-colors tracking-wider">Privacy Policy</a>
          <a href="#" className="text-[11px] text-white/40 hover:text-white transition-colors tracking-wider">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
