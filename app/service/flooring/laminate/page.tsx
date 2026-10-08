"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Catalogue from "../catalogue";
import AreasWeServe from "../../../components/AreasWeServe";
import ServiceFAQ, { type Faq } from "../../../components/ServiceFAQ";

// FAQ: shown on the page and sent to Google as FAQ schema
const FAQS: Faq[] = [
  { q: "How much does laminate flooring installation cost in Dublin?", a: "Every job is priced after a free survey. The cost depends on the laminate you choose, the size of the room, how much subfloor preparation is needed, and the underlay, skirting and trims. Request a free quote and we'll send you a fixed price for supply and fitting." },
  { q: "What does AC5 rated laminate mean?", a: "The AC rating shows how well the surface resists wear. AC5 is the toughest grade, built for commercial traffic, and it's the only grade we supply, so your floor stands up to hallways, kitchens, pets and children." },
  { q: "Should I choose 8mm, 12mm or 14mm laminate?", a: "Thicker boards feel more solid underfoot, sound quieter and handle small subfloor dips better. 8mm is a good value option for bedrooms, 12mm is the most popular choice for living areas, and 14mm wide planks give the most premium look and feel." },
  { q: "Can laminate flooring go in a kitchen or bathroom?", a: "Water-resistant laminate works well in kitchens, utility rooms and hallways. For bathrooms and wet rooms we recommend waterproof LVT or SPC flooring instead, because standing water can still damage laminate over time." },
  { q: "Can you fit laminate over underfloor heating?", a: "Yes. Most of our laminate range is suitable for underfloor heating when it's fitted on the correct underlay and the heating stays within the manufacturer's temperature limits. We'll confirm the right board and underlay during the survey." },
  { q: "How long does it take to fit laminate flooring?", a: "A typical room is usually fitted in a day. A full ground floor normally takes two to three days, depending on how much levelling and preparation the subfloor needs." },
  { q: "Do you supply and fit skirting, beading and thresholds?", a: "Yes. We supply and fit matching skirting boards, beading and door thresholds so your laminate floor is fully finished, with no gaps or loose edges." },
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

export default function LaminatePage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden">

      {/* Hero */}
      <section className="pt-24 pb-14 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <nav aria-label="Breadcrumb" className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">
            <Link href="/service/flooring" className="hover:text-[#b7935b] transition-colors">Flooring</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-[#b7935b]">Laminate</span>
          </nav>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Premium Laminate.
            <span className="block text-2xl md:text-3xl mt-4 font-sans font-medium text-gray-600">Laminate Flooring Supply &amp; Fitting in Dublin</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            AC5 rated laminate from 8mm to 14mm, including herringbone and the waterproof 12mm Story range. Search by colour, collection or thickness below.
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
          <FadeUp delay={0.1} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">AC5 Rated</h4><p className="text-sm text-gray-500">Commercial grade durability</p></FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Splash Resistant</h4><p className="text-sm text-gray-500">Waterproof 12mm Story range</p></FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">UFH Compatible</h4><p className="text-sm text-gray-500">For underfloor heating</p></FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polyline points="20 6 9 17 4 12"></polyline></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Supplied & Fitted</h4><p className="text-sm text-gray-500">Skirting, trims & thresholds</p></FadeUp>
        </div>
      </section>

      {/* Collections */}
      <section id="range" className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-24 scroll-mt-20">
        <FadeUp>
          <div className="text-center mb-8">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Engineered for Life</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">The Laminate Range</h2>
          </div>
        </FadeUp>
        <Catalogue type="laminate" />
      </section>

      {/* CTA */}
      <section className="bg-[#1a1814] text-white py-20 px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-5 tracking-tight">Not sure which laminate?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">Tell us the room and how it&apos;s used. We&apos;ll recommend the right thickness and rating and send you a free quote.</p>
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
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">Exceptional craftsmanship, delivered exactly on time. We demand outstanding precision in every laminate installation so your floors are flawlessly finished.</p>
            </FadeUp>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <ServiceFAQ title="Laminate Flooring FAQs" faqs={FAQS} />


      {/* Areas We Serve */}
      <AreasWeServe />
    </main>
  );
}