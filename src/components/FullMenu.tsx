import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FILTERS = [
  { id: 'all', label: 'All Items' },
  { id: 'pizza', label: 'Sourdough Pizza' },
  { id: 'mains', label: 'Mains & Pasta' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'gelato', label: 'Gelato' },
];

const MENU_CATEGORIES = [
  {
    id: "pizza",
    title: "Sourdough Pizza",
    description: "Hand-stretched, fermented sourdough base baked in our woodfired oven.",
    items: [
      { name: "Traditional Margherita", price: "499", desc: "San marzano tomatoes, basil, fresh mozzerella, parmesan & EVOO" },
      { name: "Pesto Cherry Tomato", price: "569", desc: "Home made pesto, fresh mozzerella, sundried tomatoes, cherry tomatoes, parmesan & black olives" },
      { name: "Mediterranean Pizza", price: "569", desc: "In-house white sauce, roasted herb tomatoes, green olives, basil mozzarella & EVOO" },
      { name: "Classic Pomodoro with Pesto", price: "629", desc: "In-house white sauce, fresh mozzerella, cherry tomato, basil confit garlic, fresh in-house pesto, parmesan & EVOO" },
      { name: "Pesto Chicken", price: "629", desc: "In-house pesto, grilled chicken, jalapenos, black olives, mozzarella & EVOO" },
      { name: "Quattro Formaggi", price: "629", desc: "In-house white sauce, yellow cheddar, smoked gouda, fresh mozzerella, black olives, red paprika, parmesan & EVOO" },
      { name: "Grilled Chicken", price: "649", desc: "San marzano tomatoes, fresh mozzerella, caramelized onions, grilled chicken, smoked paprika, cream cheese sauce" },
      { name: "Roasted Pepper & Chicken", price: "649", desc: "San marzano tomatoes, red & yellow bellpeppers, pickled jalapenos, grilled chicken, mozzarella & EVOO" },
      { name: "White Fungi", price: "679", desc: "In-house white sauce, fresh mozzerella, button mushroom, shitake mushroom finished with balsamic glaze & micro greens" },
      { name: "Truffle Mushroom", price: "699", desc: "San marzano tomatoes, marinated mushrooms, parmesan & truffle oil" },
      { name: "Truffle Oil & Chicken", price: "729", desc: "San marzano tomatoes, onions, grilled chicken, roasted garlic, mozzarella & truffle oil" },
      { name: "Chicken Ham & Cheese", price: "729", desc: "San marzano tomatoes, fresh mozzerella, yellow cheddar, smoked chicken ham, parmesan & capers" },
      { name: "Pork Ham & Cheese", price: "769", desc: "San marzano tomatoes, fresh mozzerella, cheddar, smoked pork ham, parmesan & capers" }
    ]
  },
  {
    id: "mains",
    title: "Mains & Pasta",
    description: "Hearty Italian classics prepared with fresh, local ingredients.",
    items: [
       { name: "Penne Arrabbiata", price: "449", desc: "Spicy tomato sauce, fresh basil, parmesan" },
       { name: "Fettuccine Alfredo", price: "499", desc: "Creamy parmesan sauce, roasted garlic" },
       { name: "Lasagna Classica", price: "599", desc: "Layers of fresh pasta, rich ragu, and bechamel" },
       { name: "Aglio E Olio", price: "429", desc: "Pasta tossed in EVOO, garlic, chili flakes & parmesan" }
    ]
  },
  {
    id: "desserts",
    title: "Artisanal Desserts",
    description: "A wide range of desserts handcrafted daily.",
    items: [
      { name: "Italian Macaron", price: "120", desc: "Delicate shell, rich ganache filling" },
      { name: "Basque Cheesecake", price: "349", desc: "Caramelized top with a smooth, molten center" },
      { name: "In House Traditional Tiramisu", price: "399", desc: "Mascarpone & espresso soaked ladyfingers" },
      { name: "Mango Tart", price: "289", desc: "Fresh alphonso chunks on a buttery pastry shell" },
      { name: "Dark Chocolate Hazelnut Praline", price: "329", desc: "Rich and nutty layers of pure indulgence" },
      { name: "Coffee Caramel Tart", price: "299", desc: "And much more to choose from..." }
    ]
  },
  {
    id: "gelato",
    title: "Gelatos & Beverages",
    description: "Authentic hand-churned gelatos and refreshing house beverages.",
    items: [
       { name: "Pistachio Gelato", price: "249", desc: "Rich, roasted Sicilian pistachios" },
       { name: "Dark Chocolate Gelato", price: "249", desc: "Decadent 70% dark chocolate" },
       { name: "Strawberry Sorbet", price: "229", desc: "Fresh seasonal strawberries, vegan" },
       { name: "Cold Brew Coffee", price: "299", desc: "House blend steeped 24 hours" }
    ]
  }
];

export function FullMenu() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories = MENU_CATEGORIES.filter(cat => 
    activeFilter === 'all' || cat.id === activeFilter
  );

  return (
    <div className="bg-[#fcfbf9] w-full py-24 md:py-32 flex justify-center border-t border-neutral-100">
      <div className="w-[90%] md:w-[70%] max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 flex flex-col items-center">
           <span className="text-gold uppercase tracking-[0.25em] text-[11px] font-bold font-manrope">Culinary Journey</span>
           <h2 className="font-luxurious text-4xl md:text-[52px] text-black mt-3 mb-6">
             The Menu
           </h2>
           <div className="w-16 h-[1px] bg-gold/50 mb-10" />

           {/* Filter Buttons */}
           <div className="flex flex-wrap justify-center gap-3">
             {FILTERS.map(filter => (
               <button
                 key={filter.id}
                 onClick={() => setActiveFilter(filter.id)}
                 className={`font-manrope text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
                   activeFilter === filter.id 
                    ? 'bg-neutral-900 text-gold shadow-md' 
                    : 'bg-white text-neutral-500 border border-neutral-200 hover:border-gold/50 hover:text-neutral-900'
                 }`}
               >
                 {filter.label}
               </button>
             ))}
           </div>
        </div>

        {/* Menu Columns/Rows */}
        <motion.div layout className="flex flex-col gap-20">
          <AnimatePresence>
            {filteredCategories.map((category) => (
              <motion.div 
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-8 md:gap-16"
              >
                
                {/* Category Title Column */}
                <div className="md:w-[35%] flex flex-col gap-2 shrink-0">
                  <motion.h3 layout className="font-luxurious text-2xl md:text-[28px] text-black">
                    {category.title}
                  </motion.h3>
                  <motion.p layout className="font-manrope text-sm text-neutral-500 leading-relaxed italic pr-4">
                    {category.description}
                  </motion.p>
                  {category.id === "pizza" && (
                     <motion.div layout className="mt-4 flex gap-3 text-[10px] uppercase font-manrope font-bold text-neutral-400 tracking-wider">
                       <span>Chef's Special</span>
                       <span className="text-gold">•</span>
                       <span>Non-Veg</span>
                       <span className="text-gold">•</span>
                       <span>Pork</span>
                     </motion.div>
                  )}
                </div>

                {/* Items List */}
                <motion.div layout className="md:w-[65%] flex flex-col gap-8">
                  {category.items.map((item, itemIdx) => (
                    <motion.div key={itemIdx} layout className="flex flex-col">
                      <div className="flex justify-between items-baseline gap-4 w-full">
                        <h4 className="font-manrope font-bold text-[15px] text-neutral-900 tracking-wide uppercase">
                          {item.name}
                        </h4>
                        {/* Dotted line leader */}
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative -top-1" />
                        {item.price && (
                          <span className="font-manrope font-bold text-[15px] text-gold shrink-0">
                            ₹{item.price}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <p className="font-manrope text-[13px] text-neutral-500 mt-2 leading-relaxed max-w-[90%]">
                          {item.desc}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
