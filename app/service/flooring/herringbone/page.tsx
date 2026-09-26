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

export default function HerringbonePage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block">Architectural Statement</span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Herringbone & Chevron.
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Make a striking architectural statement. Available in engineered wood and premium laminate to bring classic luxury to any modern build.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <Link href="/service/contact" className="inline-block bg-[#1a1814] text-white px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#b7935b] transition-colors rounded-full shadow-lg">
            Request Samples
          </Link>
        </FadeUp>
      </section>

      {/* Detail Section */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">Timeless Design</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">A foundation of elegance.</h2>
              
              <div className="mt-8 space-y-8">
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">The Herringbone Pattern</h4>
                  <p className="text-gray-600 leading-relaxed">Characterized by staggered rectangular planks, this traditional interlocking pattern creates a subtle zig-zag effect that adds depth, texture, and a sense of expanded space to any room.</p>
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">The Chevron Pattern</h4>
                  <p className="text-gray-600 leading-relaxed">Cut at a perfect angle to create a continuous "V" shape. Chevron flooring delivers a sharper, more contemporary geometric flow that draws the eye and elevates modern interiors.</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              {/* Added priority tag here to fix the LCP warning */}
              <Image src="/herringbone-detail.png" alt="Herringbone Floor Detail" fill className="object-cover" priority />
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}