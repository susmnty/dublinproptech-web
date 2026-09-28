"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Background images for the slider
const heroImages = [
  "/snaglist.webp", 
  "/flooring.webp", 
  "/Blinds.webp", 
  "/wall-panels-prep.webp"
];

// Product Data
const laminateCollections = [
  { id: 'l1', name: '12mm Story', thickness: '12mm', rating: 'AC5 (Heavy Commercial)', dimensions: '1285mm x 192mm', image: '/flooring/12mm-story.webp', desc: '3D EIR natural touch finish with MEGALOC system for highly realistic wood grain.' },
  { id: 'l2', name: 'Authentic', thickness: '14mm', rating: 'Heavy Duty', dimensions: 'Standard Wide Plank', image: '/flooring/authentic.webp', desc: 'Premium thick plank construction closest to solid wood with maximum stability and sound absorption.' },
  { id: 'l3', name: 'Evolution', thickness: '14mm', rating: 'Heavy Duty', dimensions: '1380mm x 191mm', image: '/flooring/evolution.webp', desc: 'Exceptionally thick and stable core with deeply embossed, realistic wood aesthetics.' },
  { id: 'l5', name: 'Aqua Collection (8mm)', thickness: '8mm', rating: 'Water Resistant', dimensions: 'Standard Plank', image: '/flooring/aqua-8mm.webp', desc: 'Advanced Aqua water-resistant core technology. Suitable for kitchens and bathrooms.' },
  { id: 'l4', name: 'Xpressions Herringbone', thickness: '12mm', rating: 'Heavy Duty', dimensions: '606mm x 101mm', image: '/flooring/xpressions.webp', desc: 'Timeless elegance of traditional parquet aesthetics with deep textures for an authentic underfoot feel.' },
  { id: 'l6', name: 'Aqua Collection (12mm)', thickness: '12mm', rating: 'Water Resistant', dimensions: 'Extra Long (Up to 2003mm)', image: '/flooring/aqua-12mm.webp', desc: 'Premium 12mm water-resistant core providing a feeling closest to solid wood.' }
];

const carpetCollections = [
  { id: 'c1', name: 'Apollo Elite', pile: '10.5mm', width: '4m', weight: '40oz', image: '/carpets/apollo-elite.webp', desc: '100% Excellon Polypropylene. Luxurious look and feel with stain-resistant, easy-clean technology.' },
  { id: 'c2', name: 'Primo Grande', pile: '11.4mm', width: '4m', weight: '58oz', image: '/carpets/primo-grande.webp', desc: 'The heavyweight champion. Deep, luxurious pile structure offering an extravagant underfoot experience.' },
  { id: 'c3', name: 'Sensation Original', pile: '12.5mm', width: '4m & 5m', weight: '58oz', image: '/carpets/sensation-original.webp', desc: 'Incredibly soft, deep pile providing unparalleled softness and sophisticated elegance.' },
  { id: 'c4', name: 'Riva', pile: '13.3mm', width: '4m', weight: '53oz', image: '/carpets/riva.webp', desc: 'Ultra-deep and plush finish engineered for absolute comfort and effortless stain removal.' },
  { id: 'c5', name: 'Hampsted Supreme', pile: '9.5mm (Loop)', width: '4m', weight: '40oz', image: '/carpets/hampsted-supreme.webp', desc: 'Rich textured loop aesthetic. Highly durable and easy to maintain for hallways and stairs.' },
  { id: 'c6', name: 'Pimlico', pile: '5.5mm', width: '4m', weight: '40oz', image: '/carpets/pimlico.webp', desc: 'Sleek, low-profile finish with a tight, resilient pile. Perfect for high-traffic zones.' }
];

// Product Grid Card Component - Fully Eager-Loaded to eliminate LCP warnings
function ProductCard({ item, onClick }: { item: any, onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      className="relative h-[420px] w-full rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gray-100"
    >
      <Image 
        src={item.image} 
        alt={item.name} 
        fill 
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105" 
        priority={true}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-2xl font-serif font-bold text-white drop-shadow-md">{item.name}</h3>
        <span className="text-[#b7935b] text-sm font-bold mt-2 flex items-center gap-2 drop-shadow-sm group-hover:text-white transition-colors">
          View details 
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
    </motion.div>
  );
}

export default function FlooringPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [productType, setProductType] = useState<'laminate' | 'carpet' | null>(null);

  // Background Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProduct]);

  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden relative">
      
      {/* -------------------- MODAL OVERLAY -------------------- */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            
            {/* Dark Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
            >
              
              {/* Left Side: Product Image (Mobile Optimized) */}
              <div className="w-full md:w-1/2 relative h-[250px] md:h-auto bg-gray-100 flex-shrink-0">
                <Image 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  fill 
                  className="object-cover" 
                />
              </div>

              {/* Right Side: Product Info */}
              <div className="w-full md:w-1/2 p-6 md:px-12 md:pt-8 md:pb-10 flex flex-col overflow-y-auto">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="absolute top-4 right-4 text-gray-500 hover:text-black hover:bg-gray-100 bg-white/50 backdrop-blur-md rounded-full p-2 transition-colors z-20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {/* Info Content */}
                <span className="text-[#b7935b] font-bold tracking-widest uppercase text-[11px] mb-2 block">
                  {productType === 'laminate' ? 'Laminate Collection' : 'Carpet Collection'}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight pr-8">
                  {selectedProduct.name}
                </h3>
                
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  {selectedProduct.desc}
                </p>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  {productType === 'laminate' ? (
                    <>
                      <div className="flex flex-col"><span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Thickness</span><span className="text-gray-900 font-semibold">{selectedProduct.thickness}</span></div>
                      <div className="flex flex-col"><span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Rating</span><span className="text-gray-900 font-semibold">{selectedProduct.rating}</span></div>
                      <div className="flex flex-col col-span-2 mt-2 pt-3 border-t border-gray-200"><span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Dimensions</span><span className="text-gray-900 font-semibold">{selectedProduct.dimensions}</span></div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col"><span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Pile Height</span><span className="text-gray-900 font-semibold">{selectedProduct.pile}</span></div>
                      <div className="flex flex-col"><span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Width</span><span className="text-gray-900 font-semibold">{selectedProduct.width}</span></div>
                      <div className="flex flex-col col-span-2 mt-2 pt-3 border-t border-gray-200"><span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Weight</span><span className="text-gray-900 font-semibold">{selectedProduct.weight}</span></div>
                    </>
                  )}
                </div>

                {/* Down/Bottom: Contact Button */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link 
                    href="/service/contact" 
                    className="flex justify-center items-center w-full bg-[#1a1814] text-white px-6 py-4 font-bold tracking-widest uppercase text-[12px] hover:bg-[#b7935b] transition-colors duration-300 rounded-md shadow-lg"
                  >
                    Inquire Price &rarr;
                  </Link>
                </div>
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ------------------------------------------------------- */}

      
      {/* Hero Section */}
      <section className="relative w-full min-h-[65vh] md:min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a1814]">
        
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={currentIndex}
            src={heroImages[currentIndex]}
            alt={`Flooring Service Background ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }} 
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          <FadeUp>
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block drop-shadow-md">The Foundation of Beautiful Homes</span>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-lg">
              Premium Flooring <br /> & Fit-outs.
            </h1>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed mb-10 drop-shadow-md">
              Elevate your space with architectural Herringbone, authentic Engineered Wood, and ultra-durable AC5 Laminates.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg text-center">
                Request a Quote
              </Link>
              <a href="#collections" className="inline-block bg-transparent text-white border border-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-sm text-center">
                Explore Collections
              </a>
            </div>
          </FadeUp>

          {/* Circular Social Media Icons */}
          <FadeUp delay={0.4} className="mt-12">
            <div className="flex justify-center gap-6 relative z-20">
              <a 
                href="https://www.instagram.com/dublinproptech/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-white hover:text-[#1a1814] backdrop-blur-md text-white transition-all duration-300 shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/people/Dublin-Proptech/61580488380589/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-white hover:text-[#1a1814] backdrop-blur-md text-white transition-all duration-300 shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-white hover:text-[#1a1814] backdrop-blur-md text-white transition-all duration-300 shadow-lg"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Trust & Features Banner */}
      <section className="border-t border-gray-200 bg-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <FadeUp delay={0.1} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">AC4 & AC5 Rated</h4>
            <p className="text-sm text-gray-500">Commercial grade durability</p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Splash Resistant</h4>
            <p className="text-sm text-gray-500">SPC & Aquastop options</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">UFH Compatible</h4>
            <p className="text-sm text-gray-500">For underfloor heating</p>
          </FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Flawless Finish</h4>
            <p className="text-sm text-gray-500">Expert installation</p>
          </FadeUp>
        </div>
      </section>

      {/* LAMINATE COLLECTIONS */}
      <section id="collections" className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32 pt-16 bg-[#f0ede6]">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Engineered for Life</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Premium Laminate</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">From high-traffic kitchens to luxurious living spaces, discover our selection of heavy-duty, water-resistant, and authentic wood laminates.</p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laminateCollections.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.1}>
              <ProductCard 
                item={item} 
                onClick={() => { 
                  setSelectedProduct(item); 
                  setProductType('laminate'); 
                }} 
              />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CARPET COLLECTIONS */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32 pt-12 border-t border-gray-300">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Ultimate Comfort</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Luxury Carpets</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Experience unparalleled softness and stain-resistant technology with our Cormar Carpet collections, expertly fitted for your home.</p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carpetCollections.map((item, index) => (
            <FadeUp key={item.id} delay={index * 0.1}>
              <ProductCard 
                item={item} 
                onClick={() => { 
                  setSelectedProduct(item); 
                  setProductType('carpet'); 
                }} 
              />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Feature Split: The Importance of Prep */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row-reverse w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">The Secret is in the Prep</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">A perfect floor starts beneath the surface.</h2>
              <div className="mt-8 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  As snagging experts, we know that poorly prepped subfloors lead to squeaking, lifting, and cracked joints. We apply our rigorous inspection standards directly to our flooring installations.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Laser-leveling and latex screeding for a perfectly flat base.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Moisture testing prior to laying any timber or laminate.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Premium acoustic and thermal underlay integrations.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              <Image src="/flooring-prep.webp" alt="Professional Flooring Preparation" fill className="object-cover" priority={true} />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* 3-Column Category Navigation Portal */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32 pt-12 border-t border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[600px]">
          
          <FadeUp delay={0.1} className="relative group h-[400px] md:h-full overflow-hidden rounded-xl bg-[#2a261f]">
            <Link href="/service/lvt" className="relative block w-full h-full">
              <Image src="/lvt-cat.webp" alt="LVT" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-center justify-center">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">LVT</h3>
              </div>
            </Link>
          </FadeUp>

          <FadeUp delay={0.2} className="relative group h-[400px] md:h-full overflow-hidden rounded-xl bg-[#2a261f]">
            <Link href="/service/stairs" className="relative block w-full h-full">
              <Image src="/stair-solutions.webp" alt="Stair Solutions" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-center justify-center">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Stair <br /> Solutions</h3>
              </div>
            </Link>
          </FadeUp>

          <FadeUp delay={0.3} className="relative group h-[400px] md:h-full overflow-hidden rounded-xl bg-[#2a261f]">
            <Link href="/service/wall-panels" className="relative block w-full h-full">
              <Image src="/wall-panels-cat.webp" alt="Wall Panels" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-center justify-center">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Wall <br /> Panels</h3>
              </div>
            </Link>
          </FadeUp>

        </div>
      </section>

      {/* Feature Split: Finishing Touches */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">The Details Matter</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">Flawless Finishing Touches.</h2>
              <div className="mt-8 space-y-8">
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">Skirting & Architrave</h4>
                  <p className="text-gray-600 leading-relaxed">We don't just lay floors; we seamlessly integrate them. We offer professional skirting board removal and refitting to avoid unsightly beading, or color-matched scotia for a neat border finish.</p>
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">Door Profiles & Transitions</h4>
                  <p className="text-gray-600 leading-relaxed">Premium solid wood, brushed steel, or color-matched thresholds ensure a smooth, trip-free transition between rooms and different flooring types.</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              <Image src="/flooring-details.webp" alt="Flooring Skirting Details" fill className="object-cover" />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* The Process */}
      <section className="bg-[#1a1814] text-white py-24 mb-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">The Installation Process</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-700 z-0"></div>
            <FadeUp delay={0.1} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Site Survey</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">We measure your space, check moisture levels, and assess the subfloor to ensure the correct preparation method is selected.</p>
            </FadeUp>
            <FadeUp delay={0.2} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Preparation</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">The most critical step. We repair, level, and prime the subfloor to guarantee your new flooring will not move or squeak.</p>
            </FadeUp>
            <FadeUp delay={0.3} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Precision Fit</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Our team installs your chosen flooring and matching accessories (skirting, beading, thresholds) for a flawless, turnkey finish.</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.4} className="mt-20">
            <Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg">
              Book a Consultation
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* The Standard / Testimonial Section */}
      <section className="bg-[#483b27] w-full">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 p-8 md:p-16 flex items-center justify-center md:justify-end">
            <FadeUp className="relative w-[280px] md:w-[320px] h-[350px] md:h-[400px] shadow-2xl overflow-hidden bg-[#2a2215]">
              <Image src="/anil.webp" alt="Dublin PropTech Quality Standard" fill className="object-cover" />
            </FadeUp>
          </div>
          <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
            <FadeUp delay={0.1}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="#b7935b" className="mb-6"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">
                Exceptional craftsmanship, delivered exactly on time. We demand outstanding quality in every flooring installation so your new home is flawlessly finished.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

    </main>
  );
}