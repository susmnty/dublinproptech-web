"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ServiceFAQ, { type Faq } from "../../../components/ServiceFAQ";
import AreasWeServe from "../../../components/AreasWeServe";

// FAQ: shown on the page and sent to Google as FAQ schema
const FAQS: Faq[] = [
  { q: "What is engineered wood flooring?", a: "Engineered wood flooring has a top layer of real timber bonded to a stable multi-ply core. You get the look, feel and natural grain of solid wood, with much better stability." },
  { q: "Is engineered wood better than solid wood?", a: "For most modern homes, yes. The cross-ply core greatly reduces the swelling, shrinking and warping that solid wood can suffer with changes in heat and humidity, which makes it a safer choice for Irish homes and new builds." },
  { q: "Can engineered wood go on underfloor heating?", a: "Yes. Engineered wood is one of the best real-wood options for underfloor heating because the multi-ply core stays stable as the floor warms and cools. We check the system and the subfloor during the survey." },
  { q: "Can engineered wood flooring be sanded and refinished?", a: "Yes, if the real-wood top layer is thick enough. Boards with a thicker wear layer can be sanded and refinished, which lets the floor last for decades." },
  { q: "Engineered wood or laminate: which should I choose?", a: "Engineered wood is real timber, so it feels warmer and adds value to your home. Laminate is more scratch resistant and costs less. We can bring samples of both so you can compare them in your own light." },
  { q: "How is engineered wood flooring installed?", a: "Depending on your subfloor, we fit it as a floating click floor or glue it down. Before we start, we check moisture levels and level the subfloor so the finished floor stays flat and quiet." },
];

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

export default function EngineeredWoodPage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block">Authentic Timber</span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Engineered Wood.
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            The authentic feel of solid timber with enhanced multi-layer structural stability. Perfectly suited for underfloor heating systems.
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
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">Superior Stability</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">Nature, perfected by engineering.</h2>
              
              <div className="mt-8 space-y-8">
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">Real Wood Veneer</h4>
                  <p className="text-gray-600 leading-relaxed">The top layer is 100% real, natural timber, offering the exact warmth, grain, and authentic character of solid wood flooring. Every plank is unique.</p>
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">Multi-Ply Core Structure</h4>
                  <p className="text-gray-600 leading-relaxed">Beneath the surface, high-density layers are bonded under extreme pressure. This cross-ply construction prevents the expanding, contracting, and warping commonly associated with traditional solid wood.</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              <Image src="/engineered-detail.webp" alt="Engineered Wood Detail" fill className="object-cover" priority />
            </div>
          </div>
        </FadeUp>
      </section>
      {/* FAQ */}
      <ServiceFAQ title="Engineered Wood Flooring FAQs" faqs={FAQS} />

      {/* Areas We Serve */}
      <AreasWeServe />
    </main>
  );
}