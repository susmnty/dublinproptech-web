"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

// Add new developments here + create their page in app/new-build-guides/[slug]/
const GUIDES = [
  {
    slug: "foothills-killinarden",
    name: "Foothills",
    area: "Killinarden, Tallaght, Dublin 24",
    intro: "Prices, buying schemes, location and a full snagging checklist for buyers at Foothills.",
    stats: [
      { value: "635", label: "Homes" },
      { value: "1–4", label: "Bedrooms" },
      { value: "A", label: "BER Rated" },
      { value: "3", label: "Phases" },
    ],
    tags: ["Starter Home Scheme", "Help to Buy", "First Home Scheme"],
  },
];

type Guide = (typeof GUIDES)[number];

// Large card (used when there is only 1 guide)
function FeaturedGuide({ g }: { g: Guide }) {
  return (
    <Link
      href={`/new-build-guides/${g.slug}/`}
      className="group block max-w-4xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl hover:border-[#b7935b] transition-all duration-300 overflow-hidden"
    >
      <div className="grid md:grid-cols-5">
        {/* Left: info */}
        <div className="md:col-span-3 p-8 md:p-10">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#b7935b] text-white px-3 py-1 rounded-full">
            Featured Guide
          </span>
          <h3 className="mt-5 text-4xl md:text-5xl font-serif font-bold">{g.name}</h3>
          <p className="mt-2 text-[#d9bc8c] font-semibold flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            {g.area}
          </p>
          <p className="mt-5 text-gray-200 leading-relaxed">{g.intro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {g.tags.map((t) => (
              <span key={t} className="text-xs font-semibold border border-white/25 rounded-full px-3 py-1.5 text-gray-100">{t}</span>
            ))}
          </div>
          <span className="mt-8 inline-flex items-center gap-3 bg-[#b7935b] text-white px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase group-hover:bg-white group-hover:text-[#1a1814] transition-colors">
            Read the Guide <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>

        {/* Right: stats */}
        <div className="md:col-span-2 grid grid-cols-2 border-t md:border-t-0 md:border-l border-white/15">
          {g.stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-6 md:p-8 flex flex-col justify-center ${i % 2 === 0 ? "border-r border-white/15" : ""} ${i < 2 ? "border-b border-white/15" : ""}`}
            >
              <p className="text-4xl md:text-5xl font-serif font-bold text-[#d9bc8c]">{s.value}</p>
              <p className="mt-1 text-xs font-bold tracking-widest uppercase text-gray-300">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

// Small card (used in the slider when there are 2+ guides)
function GuideCard({ g }: { g: Guide }) {
  return (
    <Link
      href={`/new-build-guides/${g.slug}/`}
      className="group w-[290px] md:w-[330px] shrink-0 snap-start rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-7 hover:border-[#b7935b] hover:-translate-y-1 transition-all duration-300 shadow-2xl"
    >
      <h3 className="text-3xl font-serif font-bold">{g.name}</h3>
      <p className="mt-1 text-[#d9bc8c] font-semibold text-sm">{g.area}</p>
      <p className="mt-4 text-gray-200 text-sm">{g.stats[0].value} homes · {g.stats[1].value} bed</p>
      <span className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between text-xs font-bold tracking-widest uppercase">
        Read the guide
        <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#b7935b] transition-colors">→</span>
      </span>
    </Link>
  );
}

export default function BlogHeroGuides() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => sliderRef.current?.scrollBy({ left: dir * 350, behavior: "smooth" });
  const single = GUIDES.length === 1;

  return (
    <section className="relative w-full min-h-[92svh] overflow-hidden bg-[#1a1814] text-white flex items-center">
      {/* Background video: self-hosted, no controls */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/videos/blog-hero.mp4"
        poster="/videos/blog-hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1814]/85 via-[#1a1814]/55 to-[#1a1814]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1814]/70 to-transparent" />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 pt-36 pb-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-[#b7935b] font-bold tracking-[0.25em] uppercase text-xs mb-6">
            <span className="w-8 h-px bg-[#b7935b]" />
            Dublin PropTech Journal
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.05]">
            Insights &amp; <span className="text-[#b7935b] italic">Articles</span>
          </h1>
          <p className="mt-6 text-gray-200 text-lg md:text-xl max-w-xl leading-relaxed">
            Guides, tips and independent buyer guides for new build homeowners in Ireland.
          </p>
        </motion.div>

        {/* Guides */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[#b7935b] font-bold tracking-[0.25em] uppercase text-xs">New Build Guides</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-serif font-bold">Buying in a new development?</h2>
            </div>
            {!single && (
              <div className="hidden md:flex gap-3">
                <button onClick={() => scroll(-1)} aria-label="Previous" className="w-11 h-11 rounded-full border border-white/30 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-[#b7935b] transition-colors">←</button>
                <button onClick={() => scroll(1)} aria-label="Next" className="w-11 h-11 rounded-full border border-white/30 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-[#b7935b] transition-colors">→</button>
              </div>
            )}
          </div>

          {single ? (
            <FeaturedGuide g={GUIDES[0]} />
          ) : (
            <div ref={sliderRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {GUIDES.map((g) => <GuideCard key={g.slug} g={g} />)}
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <a href="#latest" aria-label="Scroll to articles" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white animate-bounce">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </a>
    </section>
  );
}