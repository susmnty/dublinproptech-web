"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AreasWeServe from "../../components/AreasWeServe";

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

// Brands carousel — add a logo path (e.g. '/brands/phloor.webp') to show the logo instead of the name
const BRANDS: { name: string; url: string; logo?: string }[] = [
  { name: 'Phloor', url: 'https://www.phloor.ie/', logo: '/brands/phloor.webp' },
  { name: 'Canadia', url: 'https://canadia.ie/', logo: '/brands/canadia.svg' },
  { name: 'PFL', url: 'https://www.pfl.ie/', logo: '/brands/pfl.webp' },
  { name: 'Cormar Carpets', url: 'https://www.cormarcarpets.co.uk/', logo: '/brands/cormar.webp' },
];

// The 6 category blocks (3 on top, 3 below). Change an image or link here.
const CATEGORIES = [
  { name: 'Laminate', sub: 'AC4 & AC5 rated · 8mm to 14mm', href: '/service/flooring/laminate', image: '/flooring/evolution.webp' },
  { name: 'Carpets', sub: 'Luxury carpets & DESSO carpet tiles', href: '/service/flooring/carpets', image: '/carpets/luxury-carpets/riva.webp' },
  { name: 'Tiles', sub: 'Porcelain & ceramic, supplied and fitted', href: '/service/flooring/tiles', image: '/tiles-prep.webp' },
  { name: 'LVT', sub: 'Waterproof luxury vinyl & SPC', href: '/service/lvt', image: '/lvt-cat.webp' },
  { name: 'Stair Solutions', sub: 'Stair cladding & carpet runners', href: '/service/stairs', image: '/stair-solutions.webp' },
  { name: 'Wall Panels', sub: 'Acoustic slat & waterproof panels', href: '/service/wall-panels', image: '/wall-panels-cat.webp' },
];

// ---------------- MAIN PAGE ---------------- //

export default function FlooringPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Background Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden relative">

      {/* Hero Section */}
      <section className="relative w-full min-h-[65vh] md:min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a1814]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img key={currentIndex} src={heroImages[currentIndex]} alt="Premium flooring fitted in a Dublin home" className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3, ease: "easeInOut" }} />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          <FadeUp><span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block drop-shadow-md">The Foundation of Beautiful Homes</span></FadeUp>
          <FadeUp delay={0.1}><h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-lg">Premium Flooring <br /> & Fit-outs.<span className="block text-2xl md:text-3xl mt-4 font-sans font-medium text-gray-200">Flooring Supply &amp; Fitting in Dublin</span></h1></FadeUp>
          <FadeUp delay={0.2}><p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed mb-10 drop-shadow-md">Elevate your space with architectural Herringbone, authentic Engineered Wood, and ultra-durable AC5 Laminates.</p></FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg text-center">Request a Quote</Link>
              <a href="#collections" className="inline-block bg-transparent text-white border border-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-sm text-center">Explore Collections</a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-t border-gray-200 bg-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <FadeUp delay={0.1} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">AC4 & AC5 Rated</h4><p className="text-sm text-gray-500">Commercial grade durability</p></FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Splash Resistant</h4><p className="text-sm text-gray-500">SPC & Aquastop options</p></FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">UFH Compatible</h4><p className="text-sm text-gray-500">For underfloor heating</p></FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polyline points="20 6 9 17 4 12"></polyline></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Flawless Finish</h4><p className="text-sm text-gray-500">Expert installation</p></FadeUp>
        </div>
      </section>

      {/* Engineered for Life — 6 category blocks (3 top, 3 bottom) */}
      <section id="collections" className="px-4 md:px-6 max-w-[1400px] mx-auto w-full pt-16 pb-24 scroll-mt-20">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Engineered for Life</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Explore Our Flooring</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">Choose a category to browse the full range, then request a free quote.</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <FadeUp key={cat.name} delay={0.08 * (i % 3)} className="relative group h-[320px] md:h-[420px] overflow-hidden rounded-xl bg-[#2a261f]">
              <Link href={cat.href} className="relative block w-full h-full">
                <Image src={cat.image} alt={`${cat.name} flooring Dublin`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-[#b7935b] font-serif text-sm mb-2">0{i + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{cat.name}</h3>
                  <p className="text-gray-200 text-sm mt-2">{cat.sub}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#b7935b] group-hover:text-white group-hover:gap-3 transition-all">
                    Explore
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Brands We Work With — auto-scrolling carousel */}
      <section className="w-full pt-12 pb-16 md:pb-20 overflow-hidden border-t border-gray-300">
        <FadeUp>
          <div className="text-center mb-10 px-6">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Trusted Partners</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">Brands We Work With</h2>
          </div>
        </FadeUp>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max items-center gap-6 md:gap-10"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          >
            {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <a
                key={`${brand.name}-${i}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={brand.name}
                tabIndex={i < BRANDS.length ? 0 : -1}
                className="flex-shrink-0 w-[200px] md:w-[240px] h-[100px] md:h-[120px] bg-white border border-gray-200 rounded-xl flex items-center justify-center px-6 shadow-sm hover:shadow-md hover:border-[#b7935b] transition-all duration-300 group"
              >
                {brand.logo ? (
                  <div className="relative w-full h-[60px]">
                    <Image src={brand.logo} unoptimized alt={`${brand.name} logo`} fill sizes="240px" className="object-contain transition-transform duration-300 group-hover:scale-105" />
                  </div>
                ) : (
                  <span className="text-xl md:text-2xl font-serif font-bold text-gray-500 group-hover:text-[#1a1814] transition-colors text-center leading-tight">{brand.name}</span>
                )}
              </a>
            ))}
          </motion.div>
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
                <div><h4 className="text-xl font-serif font-bold text-gray-900 mb-2">Skirting & Architrave</h4><p className="text-gray-600 leading-relaxed">We don't just lay floors; we seamlessly integrate them. We offer professional skirting board removal and refitting to avoid unsightly beading, or color-matched scotia for a neat border finish.</p></div>
                <div><h4 className="text-xl font-serif font-bold text-gray-900 mb-2">Door Profiles & Transitions</h4><p className="text-gray-600 leading-relaxed">Premium solid wood, brushed steel, or color-matched thresholds ensure a smooth, trip-free transition between rooms and different flooring types.</p></div>
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
          <FadeUp><h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">The Installation Process</h2></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-700 z-0"></div>
            <FadeUp delay={0.1} className="relative z-10 flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">1</div><h3 className="text-xl font-bold mb-4">Site Survey</h3><p className="text-gray-400 text-sm leading-relaxed max-w-xs">We measure your space, check moisture levels, and assess the subfloor to ensure the correct preparation method is selected.</p></FadeUp>
            <FadeUp delay={0.2} className="relative z-10 flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">2</div><h3 className="text-xl font-bold mb-4">Preparation</h3><p className="text-gray-400 text-sm leading-relaxed max-w-xs">The most critical step. We repair, level, and prime the subfloor to guarantee your new flooring will not move or squeak.</p></FadeUp>
            <FadeUp delay={0.3} className="relative z-10 flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">3</div><h3 className="text-xl font-bold mb-4">Precision Fit</h3><p className="text-gray-400 text-sm leading-relaxed max-w-xs">Our team installs your chosen flooring and matching accessories (skirting, beading, thresholds) for a flawless, turnkey finish.</p></FadeUp>
          </div>
          <FadeUp delay={0.4} className="mt-20"><Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg">Book a Consultation</Link></FadeUp>
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
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">Exceptional craftsmanship, delivered exactly on time. We demand outstanding quality in every flooring installation so your new home is flawlessly finished.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <AreasWeServe />

    </main>
  );
}