"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AreasWeServe from "../../components/AreasWeServe";
import { JsonLd } from "../../lib/seo";

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
  { src: "/snaglist.webp?v=2", alt: "Home inspector carrying out a snag list inspection in Dublin" },
  { src: "/flooring.webp?v=2", alt: "New floor fitted in a Dublin new build after snagging" },
  { src: "/Blinds.webp?v=2", alt: "Made-to-measure window blinds in a new build home" },
  { src: "/wall-panels-prep.webp?v=2", alt: "Wall panels being fitted in a Dublin home" },
];

// "Why a snag list" benefits
const BENEFITS = [
  {
    title: "Catch costly defects early",
    text: "Find problems before your warranty clock starts running out.",
    icon: <path d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />,
  },
  {
    title: "Builder pays, not you",
    text: "A clear report means the developer fixes issues at their own cost.",
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
  {
    title: "Checked against regulations",
    text: "BCAR-standard checks across plumbing, electrics and ventilation.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];

// Sample findings shown in the report preview card (illustration only)
const SAMPLE_SNAGS = [
  { room: "Bedroom 2", issue: "Window not closing flush, draught at seal", level: "Major" },
  { room: "Utility", issue: "Heat pump pipework insulation missing", level: "Major" },
  { room: "Bathroom", issue: "Extractor fan not running", level: "Major" },
  { room: "Kitchen", issue: "Silicone gap behind sink", level: "Minor" },
  { room: "Hallway", issue: "Hairline crack at ceiling joint", level: "Minor" },
];

// NEW: Us vs a basic snag list (comparison table)
const COMPARISON = [
  { feature: "Fixed price published by bedrooms", us: "€200 - €300", basic: "Quote on request" },
  { feature: "Thermal imaging", us: "Included", basic: "Often extra" },
  { feature: "Calibrated RCD & socket testing", us: "Included", basic: "Visual only" },
  { feature: "Laser-level floor & stair checks", us: "Included", basic: "Rarely" },
  { feature: "Flooring specialists on the team", us: "Yes", basic: "No" },
  { feature: "Photo report, room by room", us: "48 hours", basic: "Varies" },
  { feature: "Re-inspection after fixes", us: "€150", basic: "Full price again" },
];

// NEW: defects we see most in new builds (no stats, illustration of what we check)
const COMMON_DEFECTS = [
  { area: "Windows & Doors", items: ["Draughts at seals", "Scratched glazing", "Misaligned hinges", "Doors catching frames"] },
  { area: "Ventilation & Heat Pump", items: ["Extract fans not running", "Missing pipe insulation", "Noisy or loose units", "Blocked vents"] },
  { area: "Floors & Stairs", items: ["Uneven subfloor", "Squeaking boards", "Loose spindles", "Gaps at skirting"] },
  { area: "Finishes", items: ["Paint runs & patches", "Plaster cracks", "Missing grout & silicone", "Loose architraves"] },
];

// NEW: snagging timeline from booking to moving in
const TIMELINE = [
  { when: "Closing date confirmed", what: "Book your snag. Tell us your development and handover date." },
  { when: "Inspection day", what: "3 to 5 hours on site. You're welcome to walk round with us." },
  { when: "Within 48 hours", what: "Photo report lands in your inbox. Forward it to the developer." },
  { when: "Developer fixes", what: "Builder works through every item on the list at their cost." },
  { when: "Re-inspection", what: "We come back and sign off each fix for €150." },
  { when: "Move in", what: "Want new floors? Our flooring team fits once the snags are cleared." },
];

// NEW: handover-day checklist for the buyer
const HANDOVER_CHECKLIST = [
  "Take photos of all meter readings (electric, water, heat pump)",
  "Collect every key, fob and window key, and test each one",
  "Get your BER certificate and guarantee/warranty documents",
  "Ask for appliance, boiler and heat pump manuals",
  "Check the consumer unit is labelled circuit by circuit",
  "Note the developer's aftercare contact and email address",
  "Run every tap and shower for a few minutes, check for leaks",
  "Keep our snag report and all emails with the developer in one folder",
];

// NEW: internal links shown above the FAQ
const RELATED_LINKS = [
  {
    href: "/blogs/snag-list-dublin-cost/",
    label: "Snag list cost in Dublin (2026)",
    text: "2026 prices, what a snag list includes and how it saves you money.",
    tag: "Pricing",
    cta: "Read guide",
    img: "/report-mockup.webp",
    pos: "object-top",
  },
  {
    href: "/blogs/snag-list-vs-house-survey/",
    label: "Snag list vs house survey",
    text: "What each one checks and which you need for a new build.",
    tag: "Compare",
    cta: "Read guide",
    img: "/snagging-inspection.webp",
    pos: "object-center",
  },
  {
    href: "/new-build-guides/",
    label: "New build guides",
    text: "Prices, buying schemes and snagging checklists for Dublin developments.",
    tag: "Developments",
    cta: "Explore guides",
    img: "/instagram/07-floor.webp",
    pos: "object-top",
  },
  {
    href: "/service/flooring/",
    label: "Flooring after your snag",
    text: "Snags cleared? Our team supplies and fits floors from the same visit.",
    tag: "Flooring",
    cta: "Explore flooring",
    img: "/flooring-details.webp",
    pos: "object-center",
  },
];

// FAQ: shown on the page AND sent to Google as FAQ schema (keep both in sync automatically)
const FAQS = [
  {
    q: "What is a snag list?",
    a: "A snag list is a written report of every defect in a newly built home, from paint and plaster marks to doors, windows, plumbing and electrics. It is also called a snagging survey or snagging inspection. Your developer uses it to fix the issues before or soon after you move in.",
  },
  {
    q: "How much does a snag list inspection cost in Dublin?",
    a: "Our home inspections are fixed price: €200 for a 1 or 2-bed property, €250 for a 3-bed and €300 for a 4-bed. A re-inspection to check the developer has fixed everything costs €150.",
  },
  {
    q: "When should I book my new build snagging inspection?",
    a: "Book as soon as you have a completion or handover date. The best time is just before you close, so the developer can fix defects before you move in. We can also inspect after you get the keys.",
  },
  {
    q: "How long does a home inspection take?",
    a: "Our home inspector spends 3 to 5 hours on site checking over 300 points inside and out. You receive a photographic, developer-ready report within 48 hours.",
  },
  {
    q: "Do you inspect apartments and duplexes as well as houses?",
    a: "Yes. We carry out snag list and home inspections on new build houses, apartments and duplexes across Dublin, Kildare, Westmeath and Drogheda (Co. Louth). Somewhere else? Ask us and we will confirm.",
  },
  {
    q: "What is included in the snag report?",
    a: "Every defect is photographed, grouped room by room and explained in clear building terms, with thermal imaging and moisture readings included. You can forward it straight to your builder's customer care team.",
  },
  {
    q: "Can I be there during the snag list inspection?",
    a: "Yes, and we recommend it. You can walk round with our inspector, see the issues first hand and ask questions about your new home as we go.",
  },
  {
    q: "What if the developer won't fix something on the snag list?",
    a: "Our report uses clear building terms and photo evidence, which makes defects hard to dispute. If an item is still open, our €150 re-inspection documents what is outstanding so you can raise it with the developer or your solicitor.",
  },
  {
    q: "Is it too late to snag if I've already moved in?",
    a: "No. We can inspect after you get the keys. The sooner the better, so defects are reported to the developer while they are still responsible for fixing them.",
  },
  {
    q: "Can you fit new floors after the snag list is done?",
    a: "Yes. Dublin PropTech is also a flooring company. Once your snags are cleared we can supply and fit laminate, LVT, carpet, stair cladding and wall panels, so one team looks after your new home from inspection to finish.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

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
    <main className="w-full bg-[#f0ede6] text-gray-900 selection:bg-[#b7935b] selection:text-white pb-0 overflow-x-hidden">
      
      {/* Hero Section with Integrated Slider */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#1a1814]">
        
        {/* Background Sliding Images */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={currentIndex}
            src={heroImages[currentIndex].src}
            alt={heroImages[currentIndex].alt}
            fetchPriority={currentIndex === 0 ? "high" : "auto"}
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
        <div className="relative z-20 pt-36 md:pt-32 pb-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          <FadeUp>
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-6 block drop-shadow-md">Independent Home Inspector · Dublin</span>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
              Snag List Dublin{" "}
              <span className="block text-xl md:text-2xl mt-4 font-sans font-medium text-gray-200">New Build Home Inspections from €200</span>
            </h1>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed mb-10 drop-shadow-md">
              300+ point check, thermal imaging and a photo report in 48 hours.
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

          {/* Circular Social Media Icons directly under the buttons */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }} className="mt-12">
            <div className="flex justify-center gap-6 relative z-20">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/dublinproptech/" 
                aria-label="Dublin PropTech on Instagram"
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
                aria-label="Dublin PropTech on Facebook"
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
                aria-label="Dublin PropTech on YouTube"
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
          </motion.div>

        </div>
      </section>

      {/* Trust & Features Banner */}
      <section className="border-y border-gray-200 bg-white py-12 mb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <FadeUp delay={0.1} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <p className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">300+ Point Check</p>
            <p className="text-sm text-gray-500">Exhaustive detail</p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <p className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">48-Hour Turnaround</p>
            <p className="text-sm text-gray-500">Rapid report delivery</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M2 12h4l2-9 5 18 2-9h5"></path></svg>
            <p className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Thermal Imaging</p>
            <p className="text-sm text-gray-500">Detect hidden issues</p>
          </FadeUp>
          <FadeUp delay={0.4} className="flex flex-col items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <p className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Developer Ready</p>
            <p className="text-sm text-gray-500">Actionable formatting</p>
          </FadeUp>
        </div>
      </section>

      {/* NEW: Why You Need a Snag List (redesigned, no photo) */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: message + benefits */}
          <FadeUp className="h-full">
            <div className="h-full bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-14 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-[#b7935b] font-bold tracking-[0.2em] uppercase text-xs mb-5">
                <span className="w-8 h-px bg-[#b7935b]" />
                Hold Developers Accountable
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                New doesn&apos;t always <span className="italic text-[#b7935b]">mean flawless.</span>
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                Rushed timelines and multiple contractors overlapping on site often lead to cosmetic defects,
                poor finishing, and sometimes serious compliance issues with Irish Building Regulations.
              </p>

              <div className="mt-10 space-y-5">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex items-start gap-4">
                    <span className="w-12 h-12 flex-shrink-0 rounded-full bg-[#f6f4f0] border border-[#e8e4db] flex items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
                    </span>
                    <div>
                      <p className="font-serif text-lg font-bold text-gray-900">{b.title}</p>
                      <p className="text-gray-600 text-[15px] leading-relaxed">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/service/contact"
                className="mt-10 self-start inline-block bg-[#1a1814] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#b7935b] transition-colors rounded-full shadow-lg"
              >
                Book Your Inspection
              </Link>
            </div>
          </FadeUp>

          {/* Right: sample snag report preview */}
          <FadeUp delay={0.15} className="h-full">
            <div className="relative h-full overflow-hidden bg-[#1a1814] text-white rounded-3xl shadow-xl p-6 md:p-10">
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#b7935b]/20 blur-3xl" />

              {/* Report header */}
              <div className="relative flex items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-[#b7935b] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  </span>
                  <div>
                    <p className="font-serif text-lg font-bold leading-tight">Snag Report</p>
                    <p className="text-xs text-gray-400">3-bed new build · Dublin</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest border border-white/20 rounded-full px-3 py-1 text-gray-300">
                  Sample
                </span>
              </div>

              {/* Snag rows */}
              <ul className="relative mt-4 divide-y divide-white/10">
                {SAMPLE_SNAGS.map((s) => (
                  <li key={s.issue} className="py-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#d9bc8c]">{s.room}</p>
                      <p className="mt-1 text-sm text-gray-200">{s.issue}</p>
                    </div>
                    <span
                      className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-widest rounded-full px-3 py-1 ${
                        s.level === "Major" ? "bg-[#b7935b] text-white" : "border border-white/25 text-gray-300"
                      }`}
                    >
                      {s.level}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Report footer */}
              <div className="relative mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                {[
                  ["Photo", "every defect"],
                  ["Room", "by room"],
                  ["48h", "delivery"],
                ].map(([big, small]) => (
                  <div key={big} className="rounded-xl bg-white/5 border border-white/10 py-3">
                    <p className="font-serif text-xl font-bold text-[#d9bc8c]">{big}</p>
                    <p className="text-[11px] uppercase tracking-widest text-gray-400">{small}</p>
                  </div>
                ))}
              </div>
              <p className="relative mt-4 text-[11px] text-gray-500">Example findings for illustration. Every home is different.</p>
            </div>
          </FadeUp>
        </div>

        {/* Foothills guide banner */}
        <FadeUp delay={0.2}>
          <Link
            href="/new-build-guides/foothills-killinarden/"
            className="group mt-6 relative overflow-hidden flex flex-col md:flex-row md:items-center gap-6 md:gap-10 rounded-3xl bg-[#b7935b] text-white p-8 md:p-10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">New Build Guide</span>
              <p className="mt-2 font-serif text-2xl md:text-4xl font-bold leading-tight">Buying at Foothills, Killinarden?</p>
              <p className="mt-2 text-white/85">Prices, buying schemes and a snagging checklist for A-rated homes.</p>
            </div>
            <div className="relative flex gap-6 md:gap-8">
              {[
                ["635", "Homes"],
                ["1–4", "Bed"],
                ["A", "Rated"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl font-bold">{v}</p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/75">{l}</p>
                </div>
              ))}
            </div>
            <span className="relative inline-flex items-center justify-center gap-2 self-start md:self-center bg-white text-[#1a1814] px-7 py-4 rounded-full text-xs font-bold uppercase tracking-widest group-hover:bg-[#1a1814] group-hover:text-white transition-colors">
              Read the Guide <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </FadeUp>
      </section>

      {/* Pricing & Services Section */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Snag List Prices</h2>
            <p className="text-gray-600 text-lg">Transparent, fixed home inspection pricing based on your property size.</p>
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
                <p className="font-serif font-bold text-xl md:text-2xl tracking-wide mb-2">Snaglist Specialist - Dublin&apos;s #1</p>
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

      {/* NEW: Why Dublin PropTech vs a basic snag list */}
      <section className="px-6 max-w-5xl mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Compare Before You Book</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Not All Snag Lists Are Equal</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Same price range, very different report. Here is what is included with us as standard.</p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-[#1a1814] text-white text-xs md:text-sm font-bold uppercase tracking-widest">
              <div className="p-4 md:p-5">What you get</div>
              <div className="p-4 md:p-5 text-center bg-[#b7935b]">Dublin PropTech</div>
              <div className="p-4 md:p-5 text-center text-gray-400">Basic snag list</div>
            </div>
            {COMPARISON.map((row) => (
              <div key={row.feature} className="grid grid-cols-[1.4fr_1fr_1fr] border-t border-gray-100 text-sm md:text-[15px]">
                <div className="p-4 md:p-5 font-medium text-gray-900">{row.feature}</div>
                <div className="p-4 md:p-5 text-center font-bold text-[#1a1814] bg-[#f6f4f0]">
                  <span className="text-[#b7935b] mr-1">✓</span>{row.us}
                </div>
                <div className="p-4 md:p-5 text-center text-gray-500">{row.basic}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Grid: What We Inspect */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">What Our Home Inspection Covers</h2>
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

      {/* NEW: Most common new build defects */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-32">
        <FadeUp>
          <div className="text-center mb-14">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">From Our Inspections</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Defects We Find Most in Dublin New Builds</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Easy to miss on a viewing. Easy to prove with a proper snag report.</p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMON_DEFECTS.map((d, i) => (
            <FadeUp key={d.area} delay={0.1 * (i + 1)} className="bg-[#1a1814] text-white rounded-2xl p-7 shadow-lg">
              <p className="font-serif text-xl font-bold text-[#d9bc8c] mb-5">{d.area}</p>
              <ul className="space-y-3">
                {d.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-gray-300">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#b7935b] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
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
                We hand this over to you so you can forward it straight to your builder&apos;s customer care team, making it impossible for them to dispute the findings.
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
              <Image src="/report-mockup.webp" alt="Sample snag list report from a Dublin home inspection" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover opacity-90" />
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
                src="/anil.webp" 
                alt="Dublin PropTech snag list inspector on site in Dublin" 
                fill 
                className="object-cover" 
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

      {/* NEW: Snagging timeline + handover checklist */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: timeline */}
          <FadeUp className="h-full">
            <div className="h-full bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-12">
              <span className="inline-flex items-center gap-2 text-[#b7935b] font-bold tracking-[0.2em] uppercase text-xs mb-5">
                <span className="w-8 h-px bg-[#b7935b]" />
                Booking to Moving In
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight mb-10">
                Your Snagging <span className="italic text-[#b7935b]">Timeline.</span>
              </h2>
              <ol className="relative border-l border-[#e8e4db] ml-3 space-y-8">
                {TIMELINE.map((t, i) => (
                  <li key={t.when} className="pl-8 relative">
                    <span className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-[#b7935b] text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                    <p className="font-serif text-lg font-bold text-gray-900">{t.when}</p>
                    <p className="text-gray-600 text-[15px] leading-relaxed">{t.what}</p>
                  </li>
                ))}
              </ol>
            </div>
          </FadeUp>

          {/* Right: handover checklist */}
          <FadeUp delay={0.15} className="h-full">
            <div className="relative h-full overflow-hidden bg-[#1a1814] text-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#b7935b]/20 blur-3xl" />
              <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-[#d9bc8c]">Free Checklist</span>
              <h2 className="relative mt-3 text-3xl md:text-4xl font-serif font-bold leading-tight mb-3">Handover Day Checklist</h2>
              <p className="relative text-gray-400 mb-8">Do these yourself on the day you get the keys. Our snag covers the build quality.</p>
              <ul className="relative space-y-4">
                {HANDOVER_CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-gray-200">
                    <span className="mt-0.5 w-5 h-5 rounded border border-[#b7935b] flex-shrink-0 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/service/contact"
                className="relative mt-10 inline-block bg-[#b7935b] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#1a1814] transition-colors rounded-full shadow-lg"
              >
                Book Your Snag
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* NEW: Internal links to related guides (SEO + helps buyers) */}
      <section className="px-4 md:px-6 max-w-[1400px] mx-auto w-full pt-24">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-[#b7935b] font-bold tracking-[0.2em] uppercase text-xs mb-4">
                <span className="w-8 h-px bg-[#b7935b]" />
                Snagging Guides
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Read before <span className="italic text-[#b7935b]">you book.</span>
              </h2>
              <p className="mt-3 text-gray-600 text-lg max-w-xl">Free guides from our inspectors to help you buy, snag and finish your new home.</p>
            </div>
            <Link
              href="/blogs/"
              className="group self-start md:self-auto inline-flex items-center gap-2 border border-[#1a1814] text-[#1a1814] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1a1814] hover:text-white transition-colors"
            >
              All guides <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RELATED_LINKS.map((l, i) => (
            <FadeUp key={l.href} delay={0.08 * (i + 1)} className="h-full">
              <Link
                href={l.href}
                className="group h-full flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#b7935b] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#1a1814]">
                  <Image
                    src={l.img}
                    alt={l.label}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover ${l.pos} transition-transform duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814]/80 via-[#1a1814]/10 to-transparent" />
                  <span className="absolute top-4 left-4 bg-white/95 text-[#1a1814] text-[10px] font-bold uppercase tracking-widest rounded-full px-3 py-1.5 shadow-sm">
                    {l.tag}
                  </span>
                  <span className="absolute bottom-3 right-5 font-serif text-4xl font-bold text-white/90 drop-shadow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug group-hover:text-[#b7935b] transition-colors">
                    {l.label}
                  </h3>
                  <p className="mt-2 text-gray-600 text-[15px] leading-relaxed flex-1">{l.text}</p>
                  <span className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#b7935b]">
                    {l.cta}
                    <span className="w-9 h-9 rounded-full border border-[#e8e4db] flex items-center justify-center group-hover:bg-[#b7935b] group-hover:border-[#b7935b] group-hover:text-white transition-colors">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 max-w-4xl mx-auto w-full py-24">
        <JsonLd data={faqJsonLd} />
        <FadeUp>
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">Good to Know</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">Snag List &amp; Home Inspection FAQs</h2>
          </div>
        </FadeUp>
        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <FadeUp key={f.q} delay={0.05 * i}>
              <details className="group bg-white border border-gray-200 rounded-xl shadow-sm open:shadow-md transition-shadow">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6 md:p-7 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900">{f.q}</h3>
                  <span className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-[#b7935b] transition-transform duration-300 group-open:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </span>
                </summary>
                <p className="px-6 md:px-7 pb-6 md:pb-7 -mt-2 text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Areas We Serve */}
      <AreasWeServe />

    </main>
  );
}