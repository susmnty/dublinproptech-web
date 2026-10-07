"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Catalogue from "../catalogue";
import AreasWeServe from "../../../components/AreasWeServe";
import ServiceFAQ, { type Faq } from "../../../components/ServiceFAQ";

// FAQ: shown on the page and sent to Google as FAQ schema
const FAQS: Faq[] = [
  { q: "Do you supply and fit carpets in Dublin?", a: "Yes. We supply and fit luxury carpets and carpet tiles across Dublin and the surrounding counties, from bedrooms and stairs to home offices." },
  { q: "Carpet or carpet tiles: which is better?", a: "Broadloom carpet gives a soft, seamless finish for bedrooms, living rooms and stairs. Carpet tiles are hard-wearing and easy to replace one at a time, which makes them ideal for home offices and busy areas." },
  { q: "Do you fit underlay with new carpet?", a: "Yes. A good underlay makes your carpet feel softer, last longer and keeps rooms warmer and quieter. We fit the right underlay and grippers for each room." },
  { q: "Can you fit carpet on stairs?", a: "Yes. We fit full stair carpets and carpet runners. For a modern look we also offer stair cladding in wood, laminate or LVT." },
  { q: "How long does carpet fitting take?", a: "Most rooms are fitted in a few hours, and a full house can usually be done in a day or two." },
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

export default function CarpetsPage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden">

      {/* Hero */}
      <section className="pt-24 pb-14 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <nav aria-label="Breadcrumb" className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">
            <Link href="/service/flooring" className="hover:text-[#b7935b] transition-colors">Flooring</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-[#b7935b]">Carpets</span>
          </nav>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Luxury Carpets.
            <span className="block text-2xl md:text-3xl mt-4 font-sans font-medium text-gray-600">Carpets &amp; Carpet Tiles Fitted in Dublin</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Deep-pile luxury carpets for bedrooms and living rooms, plus Tarkett DESSO Essence carpet tiles for offices and high-traffic spaces.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/service/contact" className="inline-block bg-[#1a1814] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#b7935b] transition-colors rounded-full shadow-md text-center">Request a Quote</Link>
            <a href="#range" className="inline-block border border-[#1a1814] text-[#1a1814] px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#1a1814] hover:text-white transition-colors rounded-full text-center">Browse the Range</a>
          </div>
        </FadeUp>
      </section>

      {/* Trust Banner */}
      <section className="border-y border-gray-200 bg-white py-12 mb-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <FadeUp delay={0.1} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M3 12h18M3 6h18M3 18h18"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Deep & Loop Pile</h4><p className="text-sm text-gray-500">Soft home or hard-wearing</p></FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Carpet Tiles</h4><p className="text-sm text-gray-500">Tarkett DESSO Essence</p></FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Stain Resistant</h4><p className="text-sm text-gray-500">Easy-care fibres</p></FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polyline points="20 6 9 17 4 12"></polyline></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Supplied & Fitted</h4><p className="text-sm text-gray-500">Underlay, grippers & trims</p></FadeUp>
        </div>
      </section>

      {/* Collections */}
      <section id="range" className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-24 scroll-mt-20">
        <FadeUp>
          <div className="text-center mb-8">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Ultimate Comfort</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Carpets & Carpet Tiles</h2>
          </div>
        </FadeUp>
        <Catalogue type="carpet" />
      </section>

      {/* CTA */}
      <section className="bg-[#1a1814] text-white py-20 px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-5 tracking-tight">Need help choosing?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">Tell us the rooms and the look you want. We&apos;ll suggest the right carpet and send you a free quote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full">Get a Free Quote</Link>
            <Link href="/service/flooring" className="inline-block border border-white/40 text-white px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full">All Flooring</Link>
          </div>
        </FadeUp>
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
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">Exceptional craftsmanship, delivered exactly on time. We demand outstanding comfort in every carpet fitting so your rooms are flawlessly finished.</p>
            </FadeUp>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <ServiceFAQ title="Carpet Fitting FAQs" faqs={FAQS} />


      {/* Areas We Serve */}
      <AreasWeServe />
    </main>
  );
}