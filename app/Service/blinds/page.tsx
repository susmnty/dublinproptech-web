"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }} // Changed margin to 0px so it triggers earlier on scroll
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BlindsPage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden -mb-16">
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block">Made to Measure Excellence</span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Premium Blinds.
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            From hand-finished wooden Venetians to thermal blackout rollers. We combine the vast selection of a superstore with the flawless, personalized fitting of Dublin PropTech.
          </p>
        </FadeUp>
      </section>

      {/* Trust & Features Banner */}
      <section className="border-y border-gray-200 bg-white py-12 mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <FadeUp delay={0.1} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Child Safe</h4>
            <p className="text-sm text-gray-500">Strict safety standards</p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Made to Measure</h4>
            <p className="text-sm text-gray-500">Millimeter perfect fit</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Energy Efficient</h4>
            <p className="text-sm text-gray-500">Thermal lining options</p>
          </FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Expert Fitting</h4>
            <p className="text-sm text-gray-500">Flawless installation</p>
          </FadeUp>
        </div>
      </section>

      {/* Massive Image-Driven Collections Grid */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Shop by Style</h2>
            <p className="text-gray-600 text-lg">Curated collections for every aesthetic and requirement.</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Wooden Blinds */}
          <FadeUp delay={0.1}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/wooden-blinds.png" alt="Wooden Blinds" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Wooden Blinds</h3>
                <p className="text-gray-200 text-sm mb-4">Real wood & moisture-proof faux wood.</p>
                <Link href="/Service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

          {/* Roller Blinds */}
          <FadeUp delay={0.2}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/roller-blinds.png" alt="Roller Blinds" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Roller Blinds</h3>
                <p className="text-gray-200 text-sm mb-4">Sleek, simple, and available in blackout.</p>
                <Link href="/Service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

          {/* Roman Blinds */}
          <FadeUp delay={0.3}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/roman-blinds.png" alt="Roman Blinds" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Roman Blinds</h3>
                <p className="text-gray-200 text-sm mb-4">Luxurious fabrics with thermal linings.</p>
                <Link href="/Service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

          {/* Vertical Blinds */}
          <FadeUp delay={0.4}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/vertical-blinds.png" alt="Vertical Blinds" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Vertical Blinds</h3>
                <p className="text-gray-200 text-sm mb-4">Perfect for large windows and sliding doors.</p>
                <Link href="/Service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

          {/* Perfect Fit Blinds */}
          <FadeUp delay={0.5}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/perfect-fit.png" alt="Perfect Fit Blinds" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Perfect Fit</h3>
                <p className="text-gray-200 text-sm mb-4">No-drill installation. Clicks into the frame.</p>
                <Link href="/Service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

          {/* Venetian Blinds (Aluminum) */}
          <FadeUp delay={0.6}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/venetian-blinds.png" alt="Aluminum Venetian Blinds" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Aluminum Venetians</h3>
                <p className="text-gray-200 text-sm mb-4">Modern, highly durable, and easy to clean.</p>
                <Link href="/Service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* Feature Split: Room Specific Solutions */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">Room Solutions</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">Engineered for your environment.</h2>
              
              <div className="mt-8 space-y-8">
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">Bathrooms & Kitchens</h4>
                  <p className="text-gray-600 leading-relaxed">Our PVC and faux-wood collections are 100% moisture-resistant. They wont warp, crack, or fade in high-humidity areas, making them the ultimate easy-wipe solution.</p>
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">Bedrooms & Nurseries</h4>
                  <p className="text-gray-600 leading-relaxed">Achieve total darkness and improved temperature control with our premium thermal blackout linings, available on Roman and Roller collections.</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              {/* Added priority tag to fix LCP warning from terminal */}
              <Image src="/blinds-detail.png" alt="Blinds Close Up Detail" fill className="object-cover" unoptimized priority />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* The Process */}
      <section className="bg-[#1a1814] text-white py-24 mb-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">The Dublin PropTech Process</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-700 z-0"></div>

            <FadeUp delay={0.1} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Consultation</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">We bring fabric samples and material swatches directly to your property so you can see them in your own lighting.</p>
            </FadeUp>

            <FadeUp delay={0.2} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Precision Measure</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Our snagging experts take millimeter-perfect measurements of your window recesses to ensure a flawless, custom fit.</p>
            </FadeUp>

            <FadeUp delay={0.3} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Expert Fitting</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Your bespoke blinds are manufactured and then installed by our team, leaving your space spotless and transformed.</p>
            </FadeUp>
          </div>
          
          <FadeUp delay={0.4} className="mt-20">
             <Link href="/Service/contact" className="inline-block bg-[#b7935b] text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg">
              Book Your Free Measure
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* The Standard / Testimonial Section */}
      <section className="bg-[#483b27] w-full">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Column: Image */}
          <div className="w-full md:w-5/12 p-8 md:p-16 flex items-center justify-center md:justify-end">
            <FadeUp>
              {/* Rigid internal div with strict boundaries and a fallback color */}
              <div className="relative w-[280px] md:w-[320px] h-[350px] md:h-[400px] shadow-2xl rounded-lg overflow-hidden bg-[#2a2215]">
                <Image 
                  src="/anil.jpeg" 
                  alt="Dublin PropTech Quality Standard" 
                  fill 
                  className="object-cover" 
                  unoptimized 
                />
              </div>
            </FadeUp>
          </div>
          
          {/* Right Column: Quote Text */}
          <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
            <FadeUp delay={0.1}>
              {/* Custom Gold Quote Icon */}
              <svg width="42" height="42" viewBox="0 0 24 24" fill="#b7935b" className="mb-6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">
                Exceptional precision, delivered exactly on time. We demand outstanding quality in every snagging report so your new home is flawlessly finished.
              </p>
            </FadeUp>
          </div>

        </div>
      </section>

    </main>
  );
}