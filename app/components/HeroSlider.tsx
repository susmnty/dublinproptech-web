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
          // Ultra-slow, smooth transitions
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }} 
        />
      </AnimatePresence>

      {/* Subtle Dark Overlay to make the white text pop */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Floating Text & Button Overlay */}
      <div className="relative z-20 text-center flex flex-col items-center px-6 pt-16 max-w-5xl mx-auto">
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
      </div>
    </div>
  );
}