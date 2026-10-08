"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Catalogue from "../flooring/catalogue";
import ServiceFAQ, { type Faq } from "../../components/ServiceFAQ";
import AreasWeServe from "../../components/AreasWeServe";

// Laminate cladding system parts (numbers match the diagram)
const SYSTEM_PARTS = [
  { t: "Tread", d: "56mm tread with a built-in rounded nose, up to 1300mm wide. Fits straight over your existing step." },
  { t: "Riser", d: "8mm panel that sits upright on the step below. Match your treads or choose white." },
  { t: "Side Cover", d: "Finishes the open side of the staircase so every step looks solid." },
  { t: "Finishing Block", d: "Fixed on the open side under each tread to support and neaten the side covers." },
  { t: "Stair Nose + Aluminium Profile", d: "A safe, clean transition from the top step onto the landing floor." },
  { t: "Stair Landing", d: "Landing panels in the same decor, so the landing matches the stairs." },
  { t: "XXL Double Tread", d: "610mm deep, for winder steps, a deep bottom step or a small landing." },
];

// FAQ: shown on the page and sent to Google as FAQ schema
const FAQS: Faq[] = [
  { q: "What is stair cladding?", a: "Stair cladding covers your existing staircase with new treads, risers and nosings, so you get the look of a brand-new wood staircase without replacing the structure. It's faster, cleaner and costs far less than a full replacement." },
  { q: "Can you clad stairs to match my new floor?", a: "Yes. Our laminate stair cladding and engineered oak treads come in shades that match our flooring ranges, so your hallway, stairs and landing flow as one." },
  { q: "Laminate or engineered oak stair treads: which is better?", a: "Laminate kits are very hard-wearing and great value, which suits busy family homes. Engineered oak treads are real timber, so they feel warmer underfoot and give the most premium finish." },
  { q: "Do you fix squeaky stairs before cladding?", a: "Yes. We check every step and fix squeaks and loose treads first, so your newly clad staircase is solid and quiet." },
  { q: "Can you fit a carpet runner on wooden stairs?", a: "Yes. We fit bespoke carpet runners over clad or existing wooden stairs, which adds grip, softens noise and gives a classic look." },
  { q: "How long does stair cladding take?", a: "A standard straight staircase usually takes one to two days. Stairs with winders, a bullnose step or a landing can take a little longer." },
  { q: "Can you clad stairs with winders or a bullnose step?", a: "Yes. XXL double treads (610mm deep) cover winder steps and deep bottom steps, side covers finish open-sided stairs, and we cut custom nosings for a seamless edge." },
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

export default function StairsPage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block">Elevate Your Space</span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Stair Cladding <br /> Dublin.
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Transform your staircase with oak or laminate stair cladding, luxury carpet runners, custom nosing and seamless transitions from hallway to landing.
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

      {/* Laminate cladding system: how the parts fit together */}
      <section className="px-4 md:px-6 max-w-7xl mx-auto w-full mb-24">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Laminate Cladding System</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">How It Fits Together</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Fitted over your existing stairs with no rip-out. Every part comes in the same decor, so the whole staircase matches.</p>
          </div>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <FadeUp className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#f4f2ee] shadow-sm border border-gray-200">
            <Image src="/stairs/laminate-system-diagram.webp" alt="Laminate stair cladding system parts: tread, riser, side cover, finishing block, stair nose, landing and XXL double tread" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <ol className="space-y-5">
              {SYSTEM_PARTS.map((p, i) => (
                <li key={p.t} className="flex gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-[#b7935b] text-white font-bold flex items-center justify-center shadow-sm">{i + 1}</span>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-gray-900">{p.t}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </section>

      {/* Stair cladding range (search + filters + product pop-up) */}
      <section id="stair-range" className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32 scroll-mt-20">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Our Range</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">Stair Cladding Range</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Laminate tread-over-tread cladding (fitted over your existing stairs) in 14 decors, plus 14mm engineered oak treads. Filter by range, colour and part.</p>
          </div>
        </FadeUp>
        <Catalogue type="stair" />
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

      {/* FAQ */}
      <ServiceFAQ title="Stair Cladding FAQs" faqs={FAQS} />

      {/* Areas We Serve */}
      <AreasWeServe />
    </main>
  );
}