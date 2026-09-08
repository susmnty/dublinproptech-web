"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

export default function StairsPage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden -mb-16">
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block">Elevate Your Space</span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Staircase <br /> Transformations.
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            We specialize in premium stair cladding, luxury carpet runners, custom nosing, and seamless transitions from hallway to landing.
          </p>
        </FadeUp>
        
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/service/contact" className="inline-block bg-[#1a1814] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#b7935b] transition-colors rounded-full shadow-md text-center">
              Request a Quote
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Trust & Features Banner */}
      <section className="border-y border-gray-200 bg-white py-12 mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <FadeUp delay={0.1} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Squeak Repair</h4>
            <p className="text-sm text-gray-500">Structural integrity checks</p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Custom Nosing</h4>
            <p className="text-sm text-gray-500">Seamless edge finishes</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Color Matching</h4>
            <p className="text-sm text-gray-500">Flows with your floors</p>
          </FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Anti-Slip Profiles</h4>
            <p className="text-sm text-gray-500">Safe and durable designs</p>
          </FadeUp>
        </div>
      </section>

      {/* Feature Split: The Snagging Advantage */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row-reverse w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">The Snagging Advantage</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">Fixing the foundations first.</h2>
              
              <div className="mt-8 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Staircases in new builds are notorious for loose treads and squeaky risers. Before we install any aesthetic cladding or carpets, our snagging background ensures we secure the structural integrity of your stairs.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Screwing and securing loose MDF or plywood treads.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Precision-cut treads and risers for a gap-free finish.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Integrating seamlessly with upstairs and downstairs flooring.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              <Image src="/stair-solutions.jpeg" alt="Stair Installation Preparation" fill className="object-cover" unoptimized />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Massive Image-Driven Collections Grid - ADJUSTED FOR 2 COLUMNS */}
      <section className="px-4 md:px-6 max-w-5xl mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Stair Solutions</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore tailored cladding and classic runners.</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Stair Cladding */}
          <FadeUp delay={0.1}>
            <div className="group relative h-[500px] overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
              <Image src="/stair-cladding.png" alt="Stair Cladding" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900 bg-white px-3 py-1 rounded-full">Seamless Flow</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-3">Stair Cladding</h3>
                <p className="text-gray-200 text-sm md:text-base mb-6 leading-relaxed">Clad your existing stairs in premium Engineered Wood, Laminate, or LVT to perfectly match your hallway flooring.</p>
                <Link href="/service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

          {/* Carpet Runners */}
          <FadeUp delay={0.2}>
            <div className="group relative h-[500px] overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
              <Image src="/carpet-runners.png" alt="Carpet Runners" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-[#b7935b] px-3 py-1 rounded-full">Classic Elegance</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-3">Carpet Runners</h3>
                <p className="text-gray-200 text-sm md:text-base mb-6 leading-relaxed">Bespoke carpet runners with taped or whipped edges, finished with high-end brass, chrome, or matte black stair rods.</p>
                <Link href="/service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* The Standard / Testimonial Section */}
      <section className="bg-[#483b27] w-full">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 p-8 md:p-16 flex items-center justify-center md:justify-end">
            <FadeUp className="relative w-[280px] md:w-[320px] h-[350px] md:h-[400px] shadow-2xl overflow-hidden bg-[#2a2215]">
              <Image src="/anil.jpeg" alt="Dublin PropTech Quality Standard" fill className="object-cover" unoptimized />
            </FadeUp>
          </div>
          <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
            <FadeUp delay={0.1}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="#b7935b" className="mb-6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">
                Exceptional craftsmanship, delivered exactly on time. We demand outstanding durability in every staircase installation so your space is flawlessly finished.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

    </main>
  );
}