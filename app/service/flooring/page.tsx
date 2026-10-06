"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AreasWeServe from "../../components/AreasWeServe";

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

// Background images for the slider
const heroImages = [
  "/snaglist.webp?v=2",
  "/flooring.webp?v=2",
  "/Blinds.webp?v=2",
  "/wall-panels-prep.webp?v=2"
];

// Brands carousel — add a logo path (e.g. '/brands/phloor.webp') to show the logo instead of the name
const BRANDS: { name: string; url: string; logo?: string }[] = [
  { name: 'Phloor', url: 'https://www.phloor.ie/', logo: '/brands/phloor.webp' },
  { name: 'Canadia', url: 'https://canadia.ie/', logo: '/brands/canadia.svg' },
  { name: 'PFL', url: 'https://www.pfl.ie/', logo: '/brands/pfl.webp' },
  { name: 'Cormar Carpets', url: 'https://www.cormarcarpets.co.uk/', logo: '/brands/cormar.webp' },
  { name: 'Swiss Krono', url: 'https://www.swisskrono.com/global-en/', logo: '/brands/swiss-krono-logo.svg' },
  { name: 'Egger', url: 'https://www.egger.com/', logo: '/brands/egger.svg' },
  { name: 'Tile Merchant', url: 'https://www.tilemerchant.ie/', logo: '/brands/tile-merchant-logo.svg' }
];

// The 6 category blocks (3 on top, 3 below). Change an image or link here.
const CATEGORIES = [
  { name: 'Laminate', sub: 'AC4 & AC5 rated · 8mm to 14mm', href: '/service/flooring/laminate', image: '/categories/laminate.webp' },
  { name: 'Carpets', sub: 'Luxury carpets & DESSO carpet tiles', href: '/service/flooring/carpets', image: '/categories/carpets.webp' },
  { name: 'Tiles', sub: 'Porcelain & ceramic, supplied and fitted', href: '/service/flooring/tiles', image: '/categories/tiles.webp' },
  { name: 'LVT', sub: 'Waterproof luxury vinyl & SPC', href: '/service/lvt', image: '/categories/lvt.webp' },
  { name: 'Stair Solutions', sub: 'Stair cladding & carpet runners', href: '/service/stairs', image: '/categories/stairs.webp' },
  { name: 'Wall Panels', sub: 'Acoustic slat & waterproof panels', href: '/service/wall-panels', image: '/categories/wall-panels.webp' },
];

// ---------------- BROCHURES ---------------- //
// HOW TO ADD YOUR BROCHURE:
// 1. Copy your PDF into the project folder:  public/brochures/   (e.g. public/brochures/laminate-brochure.pdf)
// 2. "photo" is the picture shown on the cover. Use any image already on the site, or add your own.
//    (Prefer your real brochure cover? Use "cover" instead and it replaces the designed cover.)
// 3. Add one line below. Paths start with /brochures/ or / (leave out "public").
//    "pages" is optional. Delete a line to remove that brochure.
const BROCHURES: { title: string; category: string; pdf: string; photo?: string; cover?: string; pages?: string }[] = [
  { title: 'Laminate Collection', category: 'Laminate', pdf: '/brochures/laminate-brochure.pdf', photo: '/flooring/evolution.webp', pages: '24 pages' },
  { title: 'Carpet Tiles Collection', category: 'Carpets', pdf: '/brochures/carpet-brochure.pdf', photo: '/carpets/luxury-carpets/riva.webp', pages: '12 pages' },
  // { title: 'Tiles Collection', category: 'Tiles', pdf: '/brochures/tiles-brochure.pdf', photo: '/tiles-prep.webp', pages: '16 pages' },
];

function BrochureCover({ b, index }: { b: (typeof BROCHURES)[number]; index: number }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  // Your own printed cover (optional)
  if (b.cover && !coverFailed) {
    return <Image src={b.cover} alt={`${b.title} brochure cover`} fill sizes="(max-width: 768px) 80vw, 300px" className="object-cover" onError={() => setCoverFailed(true)} />;
  }

  // Designed editorial cover: cream paper, framed photo, gold foil details
  return (
    <div className="absolute inset-0 bg-[#f8f5ef] p-3.5 flex flex-col">
      {/* paper grain */}
      <div className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none bg-[radial-gradient(rgba(120,100,70,0.12)_1px,transparent_1px)] [background-size:3px_3px]" />
      {/* photo window */}
      <div className="relative h-[60%] rounded-[3px] overflow-hidden bg-[#e7e1d6]">
        {b.photo && !photoFailed && (
          <Image src={b.photo} alt="" fill sizes="(max-width: 768px) 80vw, 300px" className="object-cover scale-[1.02] transition-transform duration-[1200ms] group-hover:scale-110" onError={() => setPhotoFailed(true)} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/85 backdrop-blur-sm text-[#1a1814] text-[9px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full">{b.category}</span>
        <span className="absolute bottom-2.5 right-3 font-serif italic text-white/90 text-sm drop-shadow">N° {String(index + 1).padStart(2, '0')}</span>
      </div>
      {/* title block */}
      <div className="relative flex-1 flex flex-col justify-between pt-4 px-1.5 pb-1">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="h-px w-6 bg-gradient-to-r from-[#d8b878] to-[#a8813f]" />
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-[#c9a35a] via-[#e8cf94] to-[#a8813f] bg-clip-text text-transparent">Collection {new Date().getFullYear()}</span>
          </div>
          <h3 className="font-serif font-bold text-[#1a1814] text-[22px] leading-[1.1]">{b.title}</h3>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-[8px] font-bold tracking-[0.35em] uppercase text-gray-400">Dublin PropTech</span>
          <span className="w-5 h-5 rounded-full border border-[#c9a35a]/60 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a35a]" />
          </span>
        </div>
      </div>
    </div>
  );
}

function BrochuresSection() {
  const [open, setOpen] = useState<(typeof BROCHURES)[number] | null>(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const categories = ['All', ...Array.from(new Set(BROCHURES.map(b => b.category)))];
  const shown = filter === 'All' ? BROCHURES : BROCHURES.filter(b => b.category === filter);

  // Lock page scroll + close with Esc while the reader is open
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = 'unset'; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <section id="brochures" className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32 scroll-mt-20">
      <div className="relative overflow-hidden rounded-3xl px-6 py-16 md:px-16 md:py-24 bg-[linear-gradient(180deg,#fbf9f5_0%,#f3efe7_100%)] border border-[#e8e1d4]">
        {/* soft spotlight + fine lines */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-white blur-3xl opacity-90 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.5] [background-image:linear-gradient(to_right,rgba(183,147,91,0.08)_1px,transparent_1px)] [background-size:120px_100%]" />
        <div className="relative">
        <FadeUp>
          <div className="text-center mb-10">
            <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">The Lookbooks</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">Our Brochures.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Read online or download, then share with your family or designer.</p>
          </div>
        </FadeUp>

        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${filter === c ? 'bg-[#1a1814] text-white border-[#1a1814]' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}>{c}</button>
            ))}
          </div>
        )}

        <motion.div layout className="flex flex-wrap justify-center gap-x-12 gap-y-16 md:gap-x-20">
          <AnimatePresence>
            {shown.map((b, i) => (
              <motion.button
                key={b.pdf}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpen(b)}
                className="group text-left w-[250px] md:w-[280px] [perspective:1400px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b7935b] rounded-lg"
                aria-label={`Open ${b.title} brochure`}
              >
                <div className="relative">
                  {/* page stack behind the cover */}
                  <div className="absolute inset-0 translate-x-[6px] translate-y-[3px] rounded-r-md bg-[#efe9df] shadow-sm transition-transform duration-500 group-hover:translate-x-[10px]" />
                  <div className="absolute inset-0 translate-x-[3px] translate-y-[1.5px] rounded-r-md bg-[#f6f2ea] transition-transform duration-500 group-hover:translate-x-[5px]" />

                  {/* cover */}
                  <motion.div
                    whileHover={{ rotateY: -14, rotateX: 4, y: -10 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
                    className="relative aspect-[3/4] rounded-r-md rounded-l-[3px] overflow-hidden ring-1 ring-black/5 shadow-[0_18px_40px_-12px_rgba(26,24,20,0.35)] group-hover:shadow-[0_30px_60px_-15px_rgba(26,24,20,0.45)] transition-shadow duration-500"
                  >
                    <BrochureCover b={b} index={i} />
                    {/* spine crease */}
                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 left-3 w-px bg-white/60 pointer-events-none" />
                    {/* light sweep */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute -inset-y-10 -left-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-all duration-[900ms] ease-out group-hover:left-[130%]" />
                    </div>
                  </motion.div>

                  {/* floor shadow */}
                  <div className="absolute -bottom-5 left-[8%] right-[8%] h-5 rounded-[50%] bg-black/20 blur-xl transition-all duration-500 group-hover:-bottom-7 group-hover:opacity-60" />
                </div>

                <div className="mt-9 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="block text-[#b7935b] text-[10px] font-bold uppercase tracking-[0.25em]">{b.category}{b.pages ? ` · ${b.pages}` : ''}</span>
                    <span className="block text-lg font-serif font-bold text-gray-900 mt-1 truncate">{b.cover ? b.title : 'Read online or download'}</span>
                  </div>
                  <span className="flex-shrink-0 w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 transition-all duration-300 group-hover:bg-[#1a1814] group-hover:border-[#1a1814] group-hover:text-white group-hover:rotate-[-45deg]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        </div>
      </div>

      {/* -------- Reader pop-up -------- */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div onClick={() => setOpen(null)} className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
              initial={{ opacity: 0, scale: 0.85, rotateX: 12, y: 40 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 160, damping: 20 }}
              style={{ transformPerspective: 1400 }}
              className="relative z-10 w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-4 border-b border-gray-100 bg-[#faf9f7]">
                <div className="min-w-0">
                  <span className="block text-[#b7935b] text-[10px] font-bold uppercase tracking-widest">{open.category} Brochure</span>
                  <h3 className="text-lg md:text-2xl font-serif font-bold text-gray-900 truncate">{open.title}</h3>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a href={open.pdf} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 border border-gray-300 text-gray-800 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#1a1814] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                    Full Screen
                  </a>
                  <a href={open.pdf} download className="inline-flex items-center gap-2 bg-[#1a1814] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#b7935b] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button onClick={() => setOpen(null)} aria-label="Close" className="ml-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full p-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              </div>

              {/* PDF viewer */}
              <div className="relative flex-1 bg-[#e9e6e0]">
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-500">
                    <motion.div className="w-12 h-16 rounded-sm border-2 border-[#b7935b]" animate={{ rotateY: [0, 180, 360] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
                    <span className="text-xs font-bold uppercase tracking-widest">Opening brochure…</span>
                  </div>
                )}
                <iframe src={`${open.pdf}#view=FitH`} title={open.title} onLoad={() => setLoading(false)} className="relative w-full h-full border-0" />
              </div>

              {/* Mobile helper (some phones only preview the first page inside a pop-up) */}
              <div className="sm:hidden px-5 py-3 border-t border-gray-100 text-center">
                <a href={open.pdf} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#b7935b] underline underline-offset-4">Open full brochure in a new tab</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ---------------- MAIN PAGE ---------------- //

export default function FlooringPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Background Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden relative">

      {/* Hero Section */}
      <section className="relative w-full min-h-[65vh] md:min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a1814]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img key={currentIndex} src={heroImages[currentIndex]} alt="Premium flooring fitted in a Dublin home" className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3, ease: "easeInOut" }} />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          <FadeUp><span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block drop-shadow-md">The Foundation of Beautiful Homes</span></FadeUp>
          <FadeUp delay={0.1}><h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-lg">Premium Flooring<span className="block text-2xl md:text-3xl mt-4 font-sans font-medium text-gray-200">Flooring Supply &amp; Fitting in Dublin</span></h1></FadeUp>
          <FadeUp delay={0.2}><p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed mb-10 drop-shadow-md">Elevate your space with architectural Herringbone, authentic Engineered Wood, and ultra-durable AC5 Laminates.</p></FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg text-center">Request a Quote</Link>
              <a href="#collections" className="inline-block bg-transparent text-white border border-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-sm text-center">Explore Collections</a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-t border-gray-200 bg-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <FadeUp delay={0.1} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">AC4 & AC5 Rated</h4><p className="text-sm text-gray-500">Commercial grade durability</p></FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Splash Resistant</h4><p className="text-sm text-gray-500">SPC & Aquastop options</p></FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">UFH Compatible</h4><p className="text-sm text-gray-500">For underfloor heating</p></FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><polyline points="20 6 9 17 4 12"></polyline></svg><h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Flawless Finish</h4><p className="text-sm text-gray-500">Expert installation</p></FadeUp>
        </div>
      </section>

      {/* Engineered for Life — 6 category blocks (3 top, 3 bottom) */}
      <section id="collections" className="px-4 md:px-6 max-w-[1400px] mx-auto w-full pt-16 pb-24 scroll-mt-20">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Engineered for Life</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Explore Our Flooring</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">Choose a category to browse the full range, then request a free quote.</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <FadeUp key={cat.name} delay={0.08 * (i % 3)} className="relative group h-[320px] md:h-[420px] overflow-hidden rounded-xl bg-[#2a261f]">
              <Link href={cat.href} className="relative block w-full h-full">
                <Image src={cat.image} alt={`${cat.name} flooring Dublin`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-[#b7935b] font-serif text-sm mb-2">0{i + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{cat.name}</h3>
                  <p className="text-gray-200 text-sm mt-2">{cat.sub}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#b7935b] group-hover:text-white group-hover:gap-3 transition-all">
                    Explore
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Brands We Work With — auto-scrolling carousel */}
      <section className="w-full pt-12 pb-16 md:pb-20 overflow-hidden border-t border-gray-300">
        <FadeUp>
          <div className="text-center mb-10 px-6">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Trusted Partners</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">Brands We Work With</h2>
          </div>
        </FadeUp>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max items-center gap-6 md:gap-10"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          >
            {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <a
                key={`${brand.name}-${i}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={brand.name}
                tabIndex={i < BRANDS.length ? 0 : -1}
                className="flex-shrink-0 w-[200px] md:w-[240px] h-[100px] md:h-[120px] bg-white border border-gray-200 rounded-xl flex items-center justify-center px-6 shadow-sm hover:shadow-md hover:border-[#b7935b] transition-all duration-300 group"
              >
                {brand.logo ? (
                  <div className="relative w-full h-[60px]">
                    <Image src={brand.logo} unoptimized alt={`${brand.name} logo`} fill sizes="240px" className="object-contain transition-transform duration-300 group-hover:scale-105" />
                  </div>
                ) : (
                  <span className="text-xl md:text-2xl font-serif font-bold text-gray-500 group-hover:text-[#1a1814] transition-colors text-center leading-tight">{brand.name}</span>
                )}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <section className="bg-[#1a1814] text-white py-24 mb-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp><h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">The Installation Process</h2></FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-700 z-0"></div>
            <FadeUp delay={0.1} className="relative z-10 flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">1</div><h3 className="text-xl font-bold mb-4">Site Survey</h3><p className="text-gray-400 text-sm leading-relaxed max-w-xs">We measure your space, check moisture levels, and assess the subfloor to ensure the correct preparation method is selected.</p></FadeUp>
            <FadeUp delay={0.2} className="relative z-10 flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">2</div><h3 className="text-xl font-bold mb-4">Preparation</h3><p className="text-gray-400 text-sm leading-relaxed max-w-xs">The most critical step. We repair, level, and prime the subfloor to guarantee your new flooring will not move or squeak.</p></FadeUp>
            <FadeUp delay={0.3} className="relative z-10 flex flex-col items-center"><div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">3</div><h3 className="text-xl font-bold mb-4">Precision Fit</h3><p className="text-gray-400 text-sm leading-relaxed max-w-xs">Our team installs your chosen flooring and matching accessories (skirting, beading, thresholds) for a flawless, turnkey finish.</p></FadeUp>
          </div>
          <FadeUp delay={0.4} className="mt-20"><Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg">Book a Consultation</Link></FadeUp>
        </div>
      </section>

      {/* Brochures — read online or download */}
      <div className="pt-24">
        <BrochuresSection />
      </div>

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
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">Exceptional craftsmanship, delivered exactly on time. We demand outstanding quality in every flooring installation so your new home is flawlessly finished.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <AreasWeServe />

    </main>
  );
}