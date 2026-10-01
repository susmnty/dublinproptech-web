"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AreasWeServe from "../../../components/AreasWeServe";

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

const TILE_TYPES = [
  { name: "Porcelain", image: "/porcelain-tiles.webp", text: "Dense, hard-wearing and almost non-porous. The best choice for kitchens, hallways and open-plan living areas that see heavy daily use." },
  { name: "Large-Format", image: "/flooring.webp", text: "Bigger tiles mean fewer grout lines and a calm, seamless look. Ideal for modern homes and making smaller rooms feel larger." },
  { name: "Ceramic", image: "/tiles-prep.webp", text: "A great-value option with a huge choice of colours, patterns and finishes. Perfect for bathrooms, utility rooms and lighter-traffic areas." },
];

const ROOMS = [
  { title: "Kitchens", text: "Stands up to spills, heat and heavy traffic, and wipes clean in seconds." },
  { title: "Bathrooms & En-suites", text: "Fully waterproof once grouted and sealed, with tanking where it's needed." },
  { title: "Hallways", text: "Handles wet shoes, grit and constant footfall without wearing." },
  { title: "Underfloor Heating", text: "Tile is one of the best conductors of heat, so rooms warm up faster." },
];

const STEPS = [
  { title: "Survey & Levelling", text: "We check the subfloor, measure up and level it so every tile sits flat with no lippage." },
  { title: "Prep & Tanking", text: "Wet areas get a waterproof tanking membrane before any tile goes down." },
  { title: "Lay, Grout & Seal", text: "Tiles are set out from the centre for balanced cuts, then grouted, sealed and trimmed." },
];

export default function TilesPage() {
  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden">

      {/* Hero */}
      <section className="pt-24 pb-14 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <FadeUp>
          <nav aria-label="Breadcrumb" className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">
            <Link href="/service/flooring" className="hover:text-[#b7935b] transition-colors">Flooring</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-[#b7935b]">Tiles</span>
          </nav>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Floor Tiles.
            <span className="block text-2xl md:text-3xl mt-4 font-sans font-medium text-gray-600">Tile Supply &amp; Fitting in Dublin</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Porcelain and ceramic floor tiles, supplied and fitted on a properly prepared, level subfloor for a finish built to last.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <Link href="/service/contact" className="inline-block bg-[#1a1814] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#b7935b] transition-colors rounded-full shadow-md text-center">Request a Quote</Link>
        </FadeUp>
      </section>

      {/* Why tiles */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-24">
        <FadeUp>
          <div className="flex flex-col md:flex-row w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">Why Tiles</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">Built to last. <br /> Easy to live with.</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                Tiles are the most durable floor you can put in a home. They resist scratches, stains and fading, they&apos;re water resistant, and they pair perfectly with underfloor heating.
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {["Water resistant", "Scratch resistant", "UFH friendly", "Low maintenance"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm font-bold text-gray-800">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              <Image src="/flooring.webp" alt="Large-format floor tiles fitted in a Dublin home" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Tile types */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-24">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">What We Fit</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">Tile Types</h2>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TILE_TYPES.map((t, i) => (
            <FadeUp key={t.name} delay={0.1 * i}>
              <div className="group relative h-[420px] overflow-hidden rounded-xl bg-gray-200">
                <Image src={t.image} alt={`${t.name} tiles`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">{t.name}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{t.text}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Where tiles work best */}
      <section className="border-y border-gray-200 bg-white py-20 mb-0">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-12 tracking-tight">Where Tiles Work Best</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ROOMS.map((r, i) => (
              <FadeUp key={r.title} delay={0.1 * i} className="border-t-2 border-[#b7935b] pt-6">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* How we fit */}
      <section className="bg-[#1a1814] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp><h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">How We Fit Tiles</h2></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-700 z-0"></div>
            {STEPS.map((s, i) => (
              <FadeUp key={s.title} delay={0.1 * (i + 1)} className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">{i + 1}</div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{s.text}</p>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.4} className="mt-20 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg">Get a Free Quote</Link>
            <Link href="/service/lvt" className="inline-block border border-white/40 text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full">Prefer LVT?</Link>
          </FadeUp>
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
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">Exceptional craftsmanship, delivered exactly on time. We demand outstanding durability in every tile installation so your floors are flawlessly finished.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <AreasWeServe />
    </main>
  );
}