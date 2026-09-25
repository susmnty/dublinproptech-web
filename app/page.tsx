"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import HeroSlider from "./components/HeroSlider";

// Fade up animation wrapper
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

// Custom Counter Animation Component
function AnimatedCounter({ to }: { to: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const updateCounter = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // easeOut formula for smooth deceleration at the end
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeOut * to));
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    }
  }, [isInView, to]);

  return <span ref={ref}>{count}</span>;
}

export default function Home() {
  // Added HubSpot / Custom API Form State and Handler
  const [status, setStatus] = useState("Send Message");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("Message Sent!");
        form.reset();
      } else {
        setStatus("Error. Try Again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("Error. Try Again.");
    }

    setTimeout(() => {
      setStatus("Send Message");
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white pb-1 font-sans overflow-x-hidden">
      
      {/* 4-Image Slider added right at the top - Social icons are inside this component now! */}
      <div className="relative w-full">
        <HeroSlider />
      </div>
      
      {/* Transform Spaces / Animated Stats Section */}
      <section className="px-6 max-w-6xl mx-auto w-full py-12 mt-4 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-24">
          <FadeUp className="md:w-1/2">
            <h2 className="text-6xl md:text-7xl font-serif font-bold leading-tight text-gray-900 tracking-tight">
              We transform <br /> Spaces.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="md:w-1/2">
            <p className="text-gray-500 text-[17px] leading-relaxed md:pl-12">
              From precision snagging inspections to premium flooring, blinds, and interior finishes, we help Dublin homeowners create spaces that look exceptional and stand the time.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0">
          <FadeUp delay={0.1} className="flex flex-col border-l border-gray-200 pl-6">
            <span className="text-[4rem] font-light text-[#b7935b] leading-none mb-3 tracking-tighter">
              <AnimatedCounter to={40} />+
            </span>
            <span className="text-gray-600 font-medium text-sm">Homes Improved</span>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col border-l border-gray-200 pl-6">
            <span className="text-[4rem] font-light text-[#b7935b] leading-none mb-3 tracking-tighter">
              <AnimatedCounter to={40} />+
            </span>
            <span className="text-gray-600 font-medium text-sm">Properties Inspected</span>
          </FadeUp>
          <FadeUp delay={0.5} className="flex flex-col border-l border-gray-200 pl-6">
            <span className="text-[4rem] font-light text-[#b7935b] leading-none mb-3 tracking-tighter">
              <AnimatedCounter to={30} />+
            </span>
            <span className="text-gray-600 font-medium text-sm">Years of Experience</span>
          </FadeUp>
          <FadeUp delay={0.7} className="flex flex-col border-l border-gray-200 pl-6">
            <Link href="/reviews" className="flex flex-col group cursor-pointer touch-manipulation active:opacity-70">
              <span className="text-[4rem] font-light text-[#b7935b] leading-none mb-3 tracking-tighter group-hover:opacity-80 transition-opacity">
                <AnimatedCounter to={40} />+
              </span>
              <span className="text-gray-600 font-medium text-sm underline decoration-gray-300 underline-offset-4 group-hover:decoration-[#b7935b] transition-colors">
                5-Star Reviews
              </span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* 3-Column Framed Card Section */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32 pt-12">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-16 text-center tracking-tight">
            Our Services
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Card 1: Flooring */}
          <FadeUp delay={0.1} className="h-full">
            <div className="bg-white p-4 md:p-6 shadow-sm flex flex-col h-full border border-gray-200 hover:shadow-md transition-shadow">
              <Link href="/service/flooring" className="relative w-full aspect-square mb-6 overflow-hidden bg-gray-100 block group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                <h3 className="absolute bottom-5 left-5 z-20 text-white text-4xl md:text-5xl font-serif font-bold tracking-wide transition-transform duration-300 group-hover:-translate-y-1">
                  Flooring
                </h3>
                <Image src="/flooring.jpeg" alt="Flooring" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
              </Link>
              <div className="flex flex-col flex-grow px-2">
                <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                  Premium flooring solutions and expert installation, tailored to your style and built to last.
                </p>
                <Link href="/service/flooring" className="mt-auto text-gray-900 font-medium hover:text-[#b7935b] transition-colors flex items-center gap-2">
                  Explore more &rarr;
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Card 2: Snaglist */}
          <FadeUp delay={0.2} className="h-full">
            <div className="bg-white p-4 md:p-6 shadow-sm flex flex-col h-full border border-gray-200 hover:shadow-md transition-shadow">
              <Link href="/service/snaglist" className="relative w-full aspect-square mb-6 overflow-hidden bg-gray-100 block group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                <h3 className="absolute bottom-5 left-5 z-20 text-white text-4xl md:text-5xl font-serif font-bold tracking-wide transition-transform duration-300 group-hover:-translate-y-1">
                  Snaglist
                </h3>
                <Image src="/snaglist.png" alt="Snaglist" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
              </Link>
              <div className="flex flex-col flex-grow px-2">
                <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                  Expert snagging inspections delivering a perfect property handover and complete peace of mind.
                </p>
                <Link href="/service/snaglist" className="mt-auto text-gray-900 font-medium hover:text-[#b7935b] transition-colors flex items-center gap-2">
                  Explore more &rarr;
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Card 3: Blinds - external redirect to luxblinds.ie */}
          <FadeUp delay={0.3} className="h-full">
            <div className="bg-white p-4 md:p-6 shadow-sm flex flex-col h-full border border-gray-200 hover:shadow-md transition-shadow">
              <a href="https://luxblinds.ie/" target="_blank" rel="noopener noreferrer" className="relative w-full aspect-square mb-6 overflow-hidden bg-gray-100 block group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                <h3 className="absolute bottom-5 left-5 z-20 text-white text-4xl md:text-5xl font-serif font-bold tracking-wide transition-transform duration-300 group-hover:-translate-y-1">
                  Blinds
                </h3>
                <Image src="/Blinds.png" alt="Blinds" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
              </a>
              <div className="flex flex-col flex-grow px-2">
                <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                  Custom blind installations providing the perfect blend of privacy, light control, and modern design.
                </p>
                <a href="https://luxblinds.ie/" target="_blank" rel="noopener noreferrer" className="mt-auto text-gray-900 font-medium hover:text-[#b7935b] transition-colors flex items-center gap-2">
                  Explore more &rarr;
                </a>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 max-w-7xl mx-auto w-full text-center pb-24">
        <FadeUp>
          <h2 className="text-5xl md:text-[3.5rem] font-serif font-bold text-gray-800 mb-20 tracking-tight">
            Why Choose Us?
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 md:divide-x md:divide-gray-200">
          <FadeUp delay={0.1} className="flex flex-col items-center px-4 md:px-8">
            <div className="mb-6 text-[#b7935b]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12l4 6-10 13L2 9Z" />
                <path d="M11 3 8 9l4 13" />
                <path d="M13 3l3 6-4 13" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Premium Materials</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Sourcing top-tier products for unmatched durability and style.</p>
          </FadeUp>

          <FadeUp delay={0.2} className="flex flex-col items-center px-4 md:px-8">
            <div className="mb-6 text-[#b7935b]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Expert Team</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Expert guidance and skilled craftsmanship you can completely trust.</p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-col items-center px-4 md:px-8">
            <div className="mb-6 text-[#b7935b]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="2" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Precision Installation</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Flawless execution with meticulous attention to every single detail.</p>
          </FadeUp>

          <FadeUp delay={0.4} className="flex flex-col items-center px-4 md:px-8">
            <div className="mb-6 text-[#b7935b]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Reliable Service</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">Dependable communication and on-time delivery.</p>
          </FadeUp>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="px-4 md:px-6 max-w-5xl mx-auto w-full mb-32 text-center">
        <FadeUp>
          <h2 className="text-5xl md:text-[3.5rem] font-serif font-bold text-gray-800 mb-20 tracking-tight">
            Discover
          </h2>
          <div className="elfsight-app-b2db6c3f-151d-46a5-87e0-a1d8e3bc34b7"></div>
        </FadeUp>
      </section>

      {/* Split Image / Quote Section */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <FadeUp>
          <div className="flex flex-col md:flex-row w-full overflow-hidden border border-gray-200 bg-white">
            <div className="w-full md:w-[40%] relative min-h-[400px] md:min-h-[500px] bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200">
              <Image src="/anil.jpeg" alt="Dublin PropTech Inspector" fill className="object-cover" unoptimized />
            </div>
            <div className="w-full md:w-[60%] bg-[#52452c] p-12 md:p-20 flex flex-col justify-center">
              <div className="text-[#cba052] mb-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-white text-2xl md:text-3xl lg:text-4xl font-serif font-light leading-snug tracking-wide">
                The Dublin PropTech standard: exceptional quality delivered on time. Snag lists, flooring, and blinds are consistently executed to ensure a flawless finish.
              </p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Compact Reviews Carousel */}
      <section className="px-4 md:px-6 max-w-5xl mx-auto w-full mb-20 text-center">
        <FadeUp>
          <div className="elfsight-app-6086c492-1131-4b31-b55f-06e7d2b57d8d"></div>
        </FadeUp>
      </section>

      {/* Contact Section WITH HUBSPOT INTEGRATION */}
      <section className="px-4 md:px-6 max-w-4xl mx-auto w-full mb-20">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-12 text-center tracking-tight">
            Get in Touch
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-gray-600 uppercase tracking-wider">First Name</label>
                  <input type="text" id="firstName" name="firstName" required className="bg-transparent border-b border-gray-200 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900" placeholder="your first name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Last Name</label>
                  <input type="text" id="lastName" name="lastName" required className="bg-transparent border-b border-gray-200 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900" placeholder="your last name" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Email Address</label>
                <input type="email" id="email" name="email" required className="bg-transparent border-b border-gray-200 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900" placeholder="your@example.com" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-600 uppercase tracking-wider">How can we help?</label>
                <textarea id="message" name="message" rows={4} required className="bg-transparent border-b border-gray-200 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 resize-none" placeholder="Tell us about your required services..."></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "Sending..."}
                className="mt-6 bg-[#b7935b] text-white px-8 py-4 font-semibold tracking-wide hover:bg-[#a0804f] transition-colors self-start shadow-sm rounded-md disabled:opacity-50"
              >
                {status}
              </button>
            </form>
          </div>
        </FadeUp>
      </section>

      <Script src="https://static.elfsight.com/platform/platform.js" strategy="afterInteractive" />

    </main>
  );
}