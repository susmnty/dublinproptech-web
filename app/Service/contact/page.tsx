"use client";

import { motion } from "framer-motion";

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

export default function ContactPage() {
  return (
    <main className="w-full bg-[#f2efe8] text-gray-900 selection:bg-[#b7935b] selection:text-white pt-16 pb-24">
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
                <a href="mailto:info@dublinproptech.com" className="text-xl font-medium hover:text-[#b7935b] transition-colors">
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
          <div className="w-full lg:w-7/12">
            <FadeUp delay={0.3} className="bg-white p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10">Send us a message</h2>
              
              <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-8">
                {/* Web3Forms required access key input */}
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor="firstName" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">First Name</label>
                    <input type="text" id="firstName" name="First Name" required className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium" placeholder="Your first name"/>
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor="lastName" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">Last Name</label>
                    <input type="text" id="lastName" name="Last Name" required className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium" placeholder="Your last name"/>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 group">
                  <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">Email Address</label>
                  <input type="email" id="email" name="Email" required className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium" placeholder="your.email@example.com"/>
                </div>
                
                <div className="flex flex-col gap-2 group">
                  <label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-[#b7935b] transition-colors">How can we help?</label>
                  <textarea id="message" name="Message" rows={5} required className="bg-transparent border-b-2 border-gray-100 py-3 w-full focus:outline-none focus:border-[#b7935b] transition-colors text-gray-900 font-medium resize-none" placeholder="Tell us about your services..."></textarea>
                </div>
                
                <button type="submit" className="mt-4 bg-[#1a1814] text-white px-8 py-5 font-bold tracking-widest uppercase text-sm hover:bg-[#b7935b] transition-colors self-start shadow-md rounded-full w-full md:w-auto text-center">
                  Submit Request
                </button>
              </form>
            </FadeUp>
          </div>

        </div>
      </div>
    </main>
  );
}