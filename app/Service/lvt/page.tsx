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

export default function TilesPage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden -mb-16">
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block">Waterproof Elegance</span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Luxury Tiles. <br />
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            From large-format porcelain to advanced engineering of LVT & core SPC.
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
            <p className="text-sm text-gray-500">Perfect for wet areas</p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Impact Resistant</h4>
            <p className="text-sm text-gray-500">Rigid core SPC</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">UFH Compatible</h4>
            <p className="text-sm text-gray-500">Excellent heat transfer</p>
          </FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Precision Finish</h4>
            <p className="text-sm text-gray-500">Laser-leveled subfloors</p>
          </FadeUp>
        </div>
      </section>

      {/* Feature Split: LVT vs SPC */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row-reverse w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">Vinyl Engineering</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">LVT vs. SPC: <br /> What's the difference?</h2>
              
              <div className="mt-8 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Both are 100% waterproof luxury vinyl, but the secret is in the core. We consult with you to select the exact right material for your subfloor and lifestyle.
                </p>
                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                      LVT (Luxury Vinyl Tile)
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">Features a flexible PVC core. It feels softer and slightly warmer underfoot. However, because it flexes, it requires a flawlessly flat subfloor to prevent molding to bumps.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      SPC (Stone Plastic Composite)
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">The heavy-duty upgrade. SPC features a rigid core made from limestone powder and PVC. It is highly dent-resistant and its rigidity easily bridges minor subfloor imperfections.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              <Image src="/tiles-prep.png" alt="Tile and LVT Fitting" fill className="object-cover" unoptimized />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Massive Image-Driven Collections Grid */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Our Formats</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore high-end ceramics, porcelains, and luxury vinyl click systems.</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Porcelain Tiles */}
          <FadeUp delay={0.1}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/porcelain-tiles.png" alt="Porcelain Tiles" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Porcelain</h3>
                <p className="text-gray-200 text-sm mb-6 max-w-sm">Denser and more durable than standard ceramic. The ultimate choice for high-traffic hallways and open-plan kitchen diners.</p>
                <Link href="/service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

          {/* LVT */}
          <FadeUp delay={0.2}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/lvt-cat.png" alt="LVT Flooring" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900 bg-white px-2 py-1 rounded">Flexible Core</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-2">Luxury Vinyl Tile (LVT)</h3>
                <p className="text-gray-200 text-sm mb-6 max-w-sm">The visual appeal of natural stone or wood, with a softer, warmer underfoot feel. Fully waterproof and highly scratch-resistant.</p>
                <Link href="/service/contact" className="text-[#b7935b] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Inquire Now &rarr;</Link>
              </div>
            </div>
          </FadeUp>

          {/* SPC Rigid Core */}
          <FadeUp delay={0.3}>
            <div className="group relative h-[450px] overflow-hidden rounded-xl bg-gray-200">
              <Image src="/spc-flooring.png" alt="SPC Rigid Core Flooring" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                 <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-[#b7935b] px-2 py-1 rounded">Rigid Core</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-2">SPC Rigid Core</h3>
                <p className="text-gray-200 text-sm mb-6 max-w-sm">Engineered with a limestone core for extreme dent resistance and stability. The heavy-duty upgrade for demanding spaces.</p>
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
                Exceptional realism, delivered exactly on time. We demand outstanding quality in every luxury vinyl tile fit-out so your space is flawlessly finished.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

    </main>
  );
}