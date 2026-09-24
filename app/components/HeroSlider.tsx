"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Brought your FadeUp animation into the slider for smooth text loading
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
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

// Your exact images!
const images = [
  "/snaglist.png", 
  "/flooring.jpeg", 
  "/Blinds.png", 
  "/wall-panels-prep.png"
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Changes the image every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[75vh] md:min-h-[85vh] overflow-hidden bg-[#1a1814] flex flex-col items-center justify-center">
      
      {/* Background Sliding Images */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Dublin PropTech Service ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }} 
        />
      </AnimatePresence>

      {/* Subtle Dark Overlay to make the white text pop */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Floating Text & Button Overlay */}
      <div className="relative z-20 text-center flex flex-col items-center px-6 pt-16 pb-10 max-w-5xl mx-auto">
        <FadeUp>
          <span className="text-sm font-bold tracking-widest uppercase text-white/80 mb-6 block drop-shadow-md">New Build Specialist</span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white drop-shadow-lg">
            Crafting Perfection.
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.5}>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium leading-relaxed mb-10 drop-shadow-md">
            Expert snagging. Premium finishes. Flawless spaces.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center mt-2">
            <Link href="/service/contact" className="bg-[#b7935b] text-white px-10 py-4 font-semibold tracking-wide hover:bg-[#a0804f] transition-all shadow-lg rounded-full">
              Book a Consultation
            </Link>
          </div>
        </FadeUp>

        {/* UPDATED Social Icons - Styled to match your screenshot */}
        <FadeUp delay={0.6} className="mt-8">
          <div className="flex justify-center gap-6 relative z-20">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/dublinproptech/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all shadow-lg"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/people/Dublin-Proptech/61580488380589/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all shadow-lg"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@DublinProptech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-16 h-16 rounded-full flex items-center justify-center border border-white/40 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all shadow-lg"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}