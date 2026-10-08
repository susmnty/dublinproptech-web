"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AreasWeServe from "../../components/AreasWeServe";
import { submitEnquiry } from "../../lib/hubspot";

// Reusable animation wrapper
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Business contact number (international format, no spaces or "+")
const PHONE_DISPLAY = "+353 89 965 5102";
const PHONE_TEL = "+353899655102";
const WHATSAPP_NUMBER = "353899655102";

type Submitted = { firstName: string; lastName: string; email: string; phone: string; message: string };

export default function ContactPage() {
  const [status, setStatus] = useState("Submit Request");
  const [flipped, setFlipped] = useState(false);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Arriving from "Areas We Serve" (?area=Kildare or ?area=Galway&request=1): pre-fill the message
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const area = params.get("area");
    if (!area || !messageRef.current || messageRef.current.value) return;
    messageRef.current.value = params.get("request")
      ? `Hi, I'm based in ${area}. Do you cover this area? I'm interested in: `
      : `Hi, I'd like to book a service in ${area}. I'm interested in: `;
  }, []);

  // Hide the face that is turned away from keyboard & screen-reader users
  useEffect(() => {
    frontRef.current?.toggleAttribute("inert", flipped);
    backRef.current?.toggleAttribute("inert", !flipped);
  }, [flipped]);

  // Pre-filled WhatsApp message with everything the visitor entered
  const whatsappHref = submitted
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hi Dublin PropTech, I've just sent an enquiry from your website.\n\n` +
        `Name: ${submitted.firstName} ${submitted.lastName}\n` +
        `Email: ${submitted.email}\n` +
        (submitted.phone ? `Phone: ${submitted.phone}\n` : "") +
        `\nMessage: ${submitted.message}`
      )}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: Submitted = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const ok = await submitEnquiry(payload);

      if (ok) {
        setStatus("Message Sent!");
        setSubmitted(payload);   // keep details for the WhatsApp message
        form.reset();
        setFlipped(true);        // flip the card to the thank-you side
      } else {
        setStatus("Error. Try Again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("Error. Try Again.");
    }

    setTimeout(() => {
      setStatus("Submit Request");
    }, 3000);
  };

  return (
    <main className="w-full bg-[#f2efe8] text-gray-900 selection:bg-[#b7935b] selection:text-white pt-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Typography & Info */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <FadeUp>
              <div className="w-12 h-1 bg-[#b7935b] mb-8"></div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Let&apos;s craft <br /> your perfect <br /> space.
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <p className="text-lg text-gray-600 mb-12 max-w-md leading-relaxed">
                Whether you need a meticulous snagging inspection, premium flooring, or bespoke blinds, our team is ready to bring your vision to life.
              </p>
            </FadeUp>

            <FadeUp delay={0.2} className="flex flex-col gap-8">
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">Email Us</h3>
                <a href="mailto:dublinproptech@gmail.com" className="text-xl font-medium hover:text-[#b7935b] transition-colors">
                  dublinproptech@gmail.com
                </a>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">Headquarters</h3>
                <p className="text-xl font-medium text-gray-800">
                  Dublin, Ireland
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: The Form */}
          <div id="enquiry" className="w-full lg:w-7/12 scroll-mt-24">
            <FadeUp delay={0.3} className="[perspective:1600px]">
              <motion.div
                className="grid [transform-style:preserve-3d]"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
              {/* FRONT: the form */}
              <div ref={frontRef} className="[grid-area:1/1] [backface-visibility:hidden] bg-white p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor="firstName" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      required 
                      className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium" 
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor="lastName" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      required 
                      className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium" 
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium" 
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium" 
                      placeholder="+353 ..."
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 group">
                  <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">How can we help?</label>
                  <textarea 
                    ref={messageRef}
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium resize-none" 
                    placeholder="What can we help with? Snagging, flooring, blinds…"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === "Sending..."} 
                  className="mt-4 bg-[#1a1814] text-white px-8 py-5 font-bold tracking-widest uppercase text-sm hover:bg-[#b7935b] transition-colors self-start shadow-md rounded-full w-full md:w-auto text-center disabled:opacity-50"
                >
                  {status}
                </button>
              </form>
              </div>

              {/* BACK: thank-you + WhatsApp / Call */}
              <div
                ref={backRef}
                aria-live="polite"
                className="[grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#b7935b]/10 border border-[#b7935b] flex items-center justify-center mb-8">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                  Thank you{submitted?.firstName ? `, ${submitted.firstName}` : ""}!
                </h2>
                <p className="text-lg text-gray-600 max-w-md leading-relaxed mb-10">
                  Thanks for contacting Dublin PropTech. Need a faster reply? Reach us directly:
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#1ebe5b] transition-colors rounded-full shadow-md"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.570.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.28 11.28 0 0 0 12.05.72C5.8.72.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.28l5.7-1.5a11.3 11.3 0 0 0 5.74 1.46h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" /></svg>
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="flex items-center justify-center gap-3 bg-[#1a1814] text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#b7935b] transition-colors rounded-full shadow-md"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    Call Us
                  </a>
                </div>
                <p className="text-gray-500 font-medium mt-4">{PHONE_DISPLAY}</p>

                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  className="mt-10 text-sm font-bold text-[#b7935b] hover:text-gray-900 transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
              </motion.div>
            </FadeUp>
          </div>

        </div>
      </div>

      {/* Areas We Serve */}
      <div className="mt-24">
        <AreasWeServe />
      </div>
    </main>
  );
}