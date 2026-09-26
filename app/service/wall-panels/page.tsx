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

export default function WallPanelsPage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block">Redefine Your Walls</span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Feature Walls <br /> & Waterproof Panels.
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            From acoustic slatted wood that transforms your living room, to 100% waterproof, seamless SPC panels that replace bathroom tiles.
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
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">100% Waterproof</h4>
            <p className="text-sm text-gray-500">Perfect for shower enclosures</p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Zero Grout</h4>
            <p className="text-sm text-gray-500">Mold-free and easy to clean</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Acoustic Ratings</h4>
            <p className="text-sm text-gray-500">Slatted wood noise reduction</p>
          </FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Rapid Install</h4>
            <p className="text-sm text-gray-500">Faster than traditional tiling</p>
          </FadeUp>
        </div>
      </section>

      {/* Feature Split */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row-reverse w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">Aesthetic Upgrades</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">Instant character for any room.</h2>
              
              <div className="mt-8 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Whether you are looking to build a modern media wall behind your television, or replace outdated bathroom tiles with sleek, marble-effect SPC panels, we offer flawless installation.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Slatted acoustic panels for media walls and home offices.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Large-format SPC panels for showers and wet rooms.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Precision-cut edges around sockets and fixtures.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              <Image src="/wall-panels-prep.png" alt="Wall Panel Installation" fill className="object-cover" />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* The Standard / Testimonial Section */}
      <section className="bg-[#483b27] w-full">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 p-8 md:p-16 flex items-center justify-center md:justify-end">
            <FadeUp className="relative w-[280px] md:w-[320px] h-[350px] md:h-[400px] shadow-2xl overflow-hidden bg-[#2a2215]">
              {/* Added priority to clear the Next.js LCP warning */}
              <Image src="/anil.jpeg" alt="Dublin PropTech Quality Standard" fill className="object-cover" priority />
            </FadeUp>
          </div>
          <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
            <FadeUp delay={0.1}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="#b7935b" className="mb-6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">
                Exceptional craftsmanship, delivered exactly on time. We demand outstanding durability in every wall panel fit-out so your space is flawlessly finished.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

    </main>
  );
}