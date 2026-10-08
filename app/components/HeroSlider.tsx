"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// HERO BACKGROUND IMAGES
// Put your new images in:  public/hero/
// The file names below must match your files exactly (lowercase, .webp).
// To add or remove a slide, add or delete a line.
const slides = [
  { src: "/hero/hero-snaglist.webp", alt: "Snagging inspector checking a new build home in Dublin" },
  { src: "/hero/hero-flooring.webp", alt: "Oak herringbone flooring fitted in a Dublin living room" },
  { src: "/hero/hero-blinds.webp", alt: "Made-to-measure window blinds in a modern living room" },
  { src: "/hero/hero-wall-panels.webp", alt: "Walnut acoustic slat wall panel feature wall" },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden bg-[#1a1814] flex flex-col items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient so white text is always clear on any photo */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_70%)]" />

      <div className="relative z-20 text-center flex flex-col items-center px-6 pt-36 md:pt-32 pb-10 max-w-5xl mx-auto">
        <span className="text-sm font-bold tracking-widest uppercase text-white/90 mb-6 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Crafting Perfection · New Build Specialist
        </span>

        {/* H1 with keyword + location, not inside FadeUp so it's visible on first paint */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] max-w-4xl">
          Snagging Inspections &amp; Premium Flooring in Dublin
        </h1>

        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Expert snagging. Premium finishes. Flawless spaces.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link href="/service/snaglist" className="bg-[#b7935b] text-white px-10 py-4 font-semibold tracking-wide hover:bg-[#a0804f] transition-all shadow-lg rounded-full">
              Book a Snag List
            </Link>
            <Link href="/service/flooring" className="bg-transparent border border-white text-white px-10 py-4 font-semibold tracking-wide hover:bg-white hover:text-[#1a1814] transition-all shadow-lg rounded-full">
              Flooring Quote
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.6} className="mt-8">
          <div className="flex justify-center gap-6 relative z-20">
            <a href="https://www.instagram.com/dublinproptech/" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all shadow-lg">
              <span className="sr-only">Instagram</span>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/people/Dublin-Proptech/61580488380589/" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all shadow-lg">
              <span className="sr-only">Facebook</span>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.youtube.com/@DublinProptech" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all shadow-lg">
              <span className="sr-only">YouTube</span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}