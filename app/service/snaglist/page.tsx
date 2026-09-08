"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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
  "/snaglist.png", 
  "/flooring.jpeg", 
  "/Blinds.png", 
  "/wall-panels-prep.png"
];

export default function SnaglistPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Changes the image every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden -mb-12 md:-mb-16">
      
      {/* Hero Section with Integrated Slider */}
      <section className="relative w-full min-h-[65vh] md:min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a1814]">
        
        {/* Background Sliding Images */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={heroImages[currentIndex]}
            alt={`Snagging Service Background ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }} 
          />
        </AnimatePresence>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Hero Content (Floating on top) */}
        <div className="relative z-20 pt-24 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          <FadeUp>
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block drop-shadow-md">Protect Your Investment</span>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-lg">
              Meticulous <br /> Snagging Inspections.
            </h1>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed mb-10 drop-shadow-md">
              Uncompromising detail, delivered exactly on time.<br />
              We uncover over 100 hidden issues with our rigorous snagging report so your new home is flawlessly finished.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg text-center">
                Book Inspection
              </Link>
              <a href="#report-details" className="inline-block bg-transparent text-white border border-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-sm text-center">
                View Sample Report
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Trust & Features Banner */}
      <section className="border-y border-gray-200 bg-white py-12 mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <FadeUp delay={0.1} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">300+ Point Check</h4>
            <p className="text-sm text-gray-500">Exhaustive detail</p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">48-Hour Turnaround</h4>
            <p className="text-sm text-gray-500">Rapid report delivery</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M2 12h4l2-9 5 18 2-9h5"></path></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Thermal Imaging</h4>
            <p className="text-sm text-gray-500">Detect hidden issues</p>
          </FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Developer Ready</h4>
            <p className="text-sm text-gray-500">Actionable formatting</p>
          </FadeUp>
        </div>
      </section>

      {/* Feature Split: Why You Need a Snag List */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row-reverse w-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#b7935b] font-bold tracking-widest uppercase text-sm mb-4 block">Hold Developers Accountable</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">New doesn&apos;t always mean flawless.</h2>
              
              <div className="mt-8 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Rushed timelines and multiple contractors overlapping on site often lead to cosmetic defects, poor finishing, and sometimes serious compliance issues with Irish Building Regulations. 
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Identify costly defects before your warranty expires.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Force developers to fix issues on their dime, not yours.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-800 font-medium">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Ensure BCAR standard compliance across plumbing and electrical.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-200">
              <Image src="/snagging-inspection.png" alt="Professional Snagging Inspection" fill className="object-cover" unoptimized priority />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Pricing & Services Section */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Our Services</h2>
            <p className="text-gray-600 text-lg">Transparent, fixed pricing based on your property size.</p>
          </div>
        </FadeUp>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {/* Card 1 */}
          <FadeUp delay={0.1} className="bg-[#f6f4f0] p-8 md:p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#e8e4db]">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 leading-tight">1 & 2 - bed <br/> property</h3>
            <p className="text-3xl font-bold text-gray-900">€200</p>
          </FadeUp>
          {/* Card 2 */}
          <FadeUp delay={0.2} className="bg-[#f6f4f0] p-8 md:p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#e8e4db]">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 leading-tight">3 - bed <br/> property</h3>
            <p className="text-3xl font-bold text-gray-900">€250</p>
          </FadeUp>
          {/* Card 3 */}
          <FadeUp delay={0.3} className="bg-[#f6f4f0] p-8 md:p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#e8e4db]">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 leading-tight">4 - bed <br/> property</h3>
            <p className="text-3xl font-bold text-gray-900">€300</p>
          </FadeUp>
          {/* Card 4 */}
          <FadeUp delay={0.4} className="bg-[#f6f4f0] p-8 md:p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#e8e4db]">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 leading-tight">Re-<br/>inspections <br/> cost</h3>
            <p className="text-3xl font-bold text-gray-900">€150</p>
          </FadeUp>
        </div>

        {/* Promotional Banner */}
        <FadeUp delay={0.5}>
          <div className="max-w-5xl mx-auto bg-[#1a1814] text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 mb-6 md:mb-0 text-center md:text-left">
              <div className="bg-[#b7935b] p-4 rounded-full flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl md:text-2xl tracking-wide mb-2">Snaglist Specialist - Dublin&apos;s #1</h4>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Refer a Friend and receive <strong>€50</strong>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto bg-[#2a261f] border border-[#3a352c] rounded-xl p-5 text-center md:text-right flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">Special Code for €50 Off</p>
              <div className="border border-[#b7935b] bg-[#1a1814] text-[#b7935b] font-mono text-2xl font-bold px-6 py-2 rounded-lg tracking-widest shadow-[0_0_15px_rgba(183,147,91,0.2)]">
                DubSnag50
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Grid: What We Inspect */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Comprehensive Inspection</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">We examine your property inside and out, checking against strict building tolerances and quality standards.</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <FadeUp delay={0.1} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#f9f8f6] rounded-full flex items-center justify-center mb-6 border border-[#e5e1d8]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">External & Moisture Levels</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Brickwork pointing, rendering, roof tile alignment, guttering leaks, and advanced moisture level checks for dampness.</p>
          </FadeUp>

          <FadeUp delay={0.2} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#f9f8f6] rounded-full flex items-center justify-center mb-6 border border-[#e5e1d8]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Doors & Windows</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Checking for glass scratches, correct mastic sealing, smooth hinge operation, draft issues, and secure locking mechanisms.</p>
          </FadeUp>

          <FadeUp delay={0.3} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#f9f8f6] rounded-full flex items-center justify-center mb-6 border border-[#e5e1d8]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">M&E, Plumbing & Heat Pump</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Full M&E and ventilation checks, heat pump installation review, hidden pipework leaks, and drainage flow testing.</p>
          </FadeUp>

          <FadeUp delay={0.4} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#f9f8f6] rounded-full flex items-center justify-center mb-6 border border-[#e5e1d8]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Calibrated Electrical Tests</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Calibrated RCD/Socket testing for correct wiring, light switch alignment, and consumer unit safety labeling.</p>
          </FadeUp>

          <FadeUp delay={0.5} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#f9f8f6] rounded-full flex items-center justify-center mb-6 border border-[#e5e1d8]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Finish Quality</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Identifying poor paintwork, plastering bumps, skirting board gaps, loose architraves, uneven tiling, and missing grout lines.</p>
          </FadeUp>

          <FadeUp delay={0.6} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#f9f8f6] rounded-full flex items-center justify-center mb-6 border border-[#e5e1d8]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Spirit & Laser-Level Floors</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Precision spirit and laser-level checks for uneven surfaces, squeaking floorboards, and structural integrity of staircases.</p>
          </FadeUp>

        </div>
      </section>

      {/* The Report Detail Section */}
      <section id="report-details" className="bg-[#2a261f] text-white py-24 border-b border-[#3a352c]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">The Photographic Snag Report.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Within 48 hours of your inspection, you receive a meticulously detailed, developer-ready PDF report. Every defect is photographed, categorized by room, and clearly explained using correct building terminology. 
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We hand this over to you so you can forward it straight to your builder's customer care team, making it impossible for them to dispute the findings.
              </p>
              <ul className="space-y-3 mb-8 text-sm uppercase tracking-wider font-bold text-[#b7935b]">
                <li>✓ High-Resolution Imagery</li>
                <li>✓ Room-by-room breakdown</li>
                <li>✓ Thermal Imaging Included</li>
              </ul>
            </FadeUp>
          </div>
          <div className="w-full md:w-1/2">
            <FadeUp delay={0.2} className="relative w-full aspect-[4/3] shadow-2xl rounded-xl overflow-hidden bg-[#1a1814]">
              <Image src="/report-mockup.png" alt="Sample Snagging Report" fill className="object-cover opacity-90" unoptimized />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="bg-[#1a1814] text-white py-24 mb-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">How It Works</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gray-700 z-0"></div>

            <FadeUp delay={0.1} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Book Online</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Contact us with your property details and expected completion date to secure your inspection slot.</p>
            </FadeUp>

            <FadeUp delay={0.2} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">The Inspection</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Our expert spends 3-5 hours on-site, meticulously checking over 300 data points across the interior and exterior.</p>
            </FadeUp>

            <FadeUp delay={0.3} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#2a261f] border border-[#b7935b] flex items-center justify-center text-2xl font-serif font-bold text-[#b7935b] mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">The Fix</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">You hand our irrefutable 48-hour report to your developer, requiring them to rectify all listed defects.</p>
            </FadeUp>
          </div>
          
          <FadeUp delay={0.4} className="mt-20">
             <Link href="/service/contact" className="inline-block bg-[#b7935b] text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg">
              Secure Your Date
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* The Standard / Testimonial Section */}
      <section className="bg-[#483b27] w-full">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Column: Image */}
          <div className="w-full md:w-5/12 p-8 md:p-16 flex items-center justify-center md:justify-end">
            <FadeUp className="relative w-[280px] md:w-[320px] h-[350px] md:h-[400px] shadow-2xl rounded-lg overflow-hidden bg-[#2a2215]">
              <Image 
                src="/anil.jpeg" 
                alt="Dublin PropTech Quality Standard" 
                fill 
                className="object-cover" 
                unoptimized 
              />
            </FadeUp>
          </div>
          
          {/* Right Column: Quote Text */}
          <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
            <FadeUp delay={0.1}>
              {/* Custom Gold Quote Icon */}
              <svg width="42" height="42" viewBox="0 0 24 24" fill="#b7935b" className="mb-6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.6] max-w-2xl">
                Exceptional precision, delivered exactly on time. We demand outstanding quality in every snagging report so your new home is flawlessly finished.
              </p>
            </FadeUp>
          </div>

        </div>
      </section>

    </main>
  );
}